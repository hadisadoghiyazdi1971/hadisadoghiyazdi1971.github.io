import os
import json
from typing import Tuple, Optional

import httpx
from pydantic import ValidationError

from app.models import ParsedDraft

# Gemini API (Google AI for Developers / AI Studio key)
# REST endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=...
DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash-lite")
DEFAULT_BASE_URL = os.getenv("GEMINI_API_BASE_URL", "https://generativelanguage.googleapis.com/v1beta")

SYSTEM_PROMPT = """You are a circuit-design assistant. Extract a design draft for an RC lowpass filter from the user's text.
Return ONLY valid JSON. No markdown. No commentary. Output must be a single JSON object.

Schema (return exactly these keys; do not add extra keys):
{
  "project_name": string,

  "rs_ohm": number,
  "rl_ohm": number,

  "fp_hz": number,
  "ap_db": number,
  "fs_hz": number,
  "as_db": number,

  "topology_id": string | null,

  "stages_min": integer,
  "stages_max": integer,

  "e_series": "E12" | "E24" | "E48" | "E96",
  "snap_r_to_series": boolean,

  "r_min_ohm": number,
  "r_max_ohm": number,
  "c_min_f": number,
  "c_max_f": number,

  "objective": "area_to_target" | "weighted_penalty",
  "seed": integer,
  "particles": integer,
  "iters": integer,
  "w": number,
  "c1": number,
  "c2": number,
  "fmax_hz": number,
  "points": integer,

  "notes": string[]
}

Rules:
- Use numbers only (no units in values). Frequencies are in Hz unless units specified (Hz/kHz/MHz).
- ap_db is passband loss (positive dB). as_db is stopband attenuation (positive dB).
- If a field is not mentioned, keep a reasonable default (but DO NOT mention defaults in notes):
  - rs_ohm=0, rl_ohm=10000
  - stages_min=1, stages_max=6
  - e_series="E24", snap_r_to_series=true
  - r_min_ohm=100, r_max_ohm=1000000, c_min_f=1e-12, c_max_f=1e-3
  - objective="area_to_target", seed=1, particles=30, iters=60, w=0.72, c1=1.4, c2=1.4, fmax_hz=1000000, points=240
- If fs_hz is missing but fp_hz exists: set fs_hz = 10 * fp_hz (DO mention this assumption in notes).
- notes: ONLY include things you explicitly extracted from the text (e.g. "Detected rs_ohm=10") and any unit conversions or explicit assumptions.
- notes: DO NOT include defaulting messages such as "Defaulted X to Y".
"""

# Rules:
# - If a field is not mentioned, keep a reasonable default value (but DO NOT mention defaults in notes).
# - Use numbers only (no units in values). Frequencies are in Hz unless units specified (Hz/kHz/MHz).
# - ap_db is passband loss (positive dB). as_db is stopband attenuation (positive dB).
# - If a field is not mentioned, keep a reasonable default:
#   - rs_ohm=0, rl_ohm=10000
#   - stages_min=1, stages_max=6
#   - e_series="E24", snap_r_to_series=true
#   - r_min_ohm=100, r_max_ohm=1000000, c_min_f=1e-12, c_max_f=1e-3
#   - objective="weighted_penalty", seed=1, particles=25, iters=50, w=0.72, c1=1.49, c2=1.49, fmax_hz=1000000, points=400
# - If fs_hz is missing but fp_hz exists: set fs_hz = 10 * fp_hz.
# - topology_id: if mentioned, must be one of: "rc_cascade_equal", "rc_cascade_staggered", "rc_cascade_free"; otherwise null.
# - notes: include any assumptions, unit conversions, or missing fields you defaulted.


def _try_parse_json(text: str) -> Tuple[Optional[ParsedDraft], Optional[str]]:
    text = (text or "").strip()
    if not text:
        return None, "Empty model response."
    # Try to locate JSON object if extra text slipped in
    if not text.startswith("{"):
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            text = text[start:end+1]
    try:
        obj = json.loads(text)
    except Exception as e:
        return None, f"Model did not return valid JSON: {e}"
    try:
        draft = ParsedDraft.model_validate(obj)
        return draft, None
    except ValidationError as e:
        return None, f"JSON did not match schema: {e}"


def _extract_text_from_gemini(resp_json: dict) -> str:
    # Gemini REST: candidates[0].content.parts[*].text
    try:
        c0 = resp_json["candidates"][0]
        parts = c0["content"]["parts"]
        texts = []
        for p in parts:
            if "text" in p and p["text"]:
                texts.append(p["text"])
        return "\n".join(texts).strip()
    except Exception:
        return ""


async def gemini_parse_to_draft(user_text: str, model: Optional[str] = None) -> Tuple[Optional[ParsedDraft], Optional[str], Optional[str]]:
    """Call Gemini REST generateContent to produce ParsedDraft JSON.
    Returns: (draft, error, raw_text)
    """
    api_key = os.getenv("GEMINI_API_KEY","AIzaSyDLFnWM88mYQlNW7lf5IKdcu-klnQP4jm0")
    if not api_key:
        return None, "GEMINI_API_KEY is not set on the backend.", None

    model = model or DEFAULT_MODEL
    base = DEFAULT_BASE_URL.rstrip("/")
    url = f"{base}/models/{model}:generateContent"

    # REST body: contents[] with parts[].text; optional systemInstruction
    body = {
        "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": [{"role": "user", "parts": [{"text": user_text}]}],
        "generationConfig": {
            "temperature": 0.2,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Official docs show API key can be provided as query param ?key=
            resp = await client.post(url, params={"key": api_key}, headers={"Content-Type": "application/json"}, json=body)
            if resp.status_code >= 400:
                return None, f"Gemini API error {resp.status_code}: {resp.text[:800]}", None
            data = resp.json()
    except Exception as e:
        return None, f"Failed to call Gemini API: {e}", None

    raw_text = _extract_text_from_gemini(data)
    if not raw_text:
        # fallback: dump snippet of full response
        raw_text = json.dumps(data)[:1200]

    draft, err = _try_parse_json(raw_text)

    # sanitize notes: keep only actual detections/conversions, drop defaulting lines
    if draft and draft.notes:
        draft.notes = [
            n for n in draft.notes
            if not n.strip().lower().startswith("defaulted")
        ]


    return draft, err, raw_text
