# app/parser.py
import re
from app.models import ParsedDraft

_UNIT = {"hz": 1.0, "khz": 1e3, "mhz": 1e6}
_OHM_UNIT = {"ohm": 1.0, "ω": 1.0, "kohm": 1e3, "k": 1e3, "mohm": 1e6, "m": 1e6}

# اگر توپولوژی‌ها این ids را دارند، اینجا اضافه کن
KNOWN_TOPO_IDS = [
    "rc_cascade_equal",
    "rc_cascade_staggered",
    "rc_cascade_free",
]

def _find_float(text: str, key: str):
    # key = 1e-12  | key: 0.72 | key <= 1e6
    pat = rf"({re.escape(key)})\s*(?:[:=]|<=|>=)?\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    try:
        return float(m.group(2))
    except:
        return None

def _find_int(text: str, key: str):
    pat = rf"({re.escape(key)})\s*(?:[:=]|<=|>=)?\s*(\d+)"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    return int(m.group(2))

def _find_bool(text: str, key: str):
    pat = rf"({re.escape(key)})\s*(?:[:=]|<=|>=)?\s*(true|false|yes|no|1|0)"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    v = m.group(2).strip().lower()
    return v in ("true", "yes", "1")

def _find_word(text: str, key: str):
    pat = rf"({re.escape(key)})\s*(?:[:=]|<=|>=)?\s*([A-Za-z_][A-Za-z0-9_]*)"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    return m.group(2)

def _find_db(text: str, key: str):
    # Ap <= 1 dB   | As >= 40 dB | ap=1
    pat = rf"({key})\s*(?:[:=]|<=|>=)?\s*([0-9]*\.?[0-9]+)\s*(db)?"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    return float(m.group(2))

def _find_freq(text: str, key: str):
    # fp = 1 kHz  | fmax_hz = 1e6
    # prefer explicit *_hz fields first
    v = _find_float(text, key)
    if v is not None:
        return v

    pat = rf"({re.escape(key)})\s*[:=]?\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*(hz|khz|mhz)?"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    val = float(m.group(2))
    unit = (m.group(3) or "hz").lower()
    return val * _UNIT.get(unit, 1.0)

# def _find_freq(text: str, key: str):
#     pat = rf"({key})\s*[:=]?\s*([0-9]*\.?[0-9]+)\s*(hz|khz|mhz)?"
#     m = re.search(pat, text, flags=re.IGNORECASE)
#     if not m:
#         return None
#     val = float(m.group(2))
#     unit = (m.group(3) or "hz").lower()
#     return val * _UNIT.get(unit, 1.0)

# def _find_db(text: str, key: str):
#     pat = rf"({key})\s*[:=]?\s*([0-9]*\.?[0-9]+)\s*(db)?"
#     m = re.search(pat, text, flags=re.IGNORECASE)
#     if not m:
#         return None
#     return float(m.group(2))

def _find_ohm(text: str, key: str):
    # Rs = 50 ohm / RL = 100k ohm / Rs: 50Ω / RL=100k
    pat = rf"({key})\s*[:=]?\s*([0-9]*\.?[0-9]+)\s*([kKmM]?)(\s*(ohm|Ω|ω))?"
    m = re.search(pat, text, flags=re.IGNORECASE)
    if not m:
        return None
    val = float(m.group(2))
    mult = (m.group(3) or "").lower()
    if mult == "k":
        val *= 1e3
    elif mult == "m":
        val *= 1e6
    return val

# def _find_bool(text: str, key: str):
#     # snap_r_to_series = true/false
#     pat = rf"({key})\s*[:=]?\s*(true|false|yes|no|1|0)"
#     m = re.search(pat, text, flags=re.IGNORECASE)
#     if not m:
#         return None
#     v = m.group(2).strip().lower()
#     return v in ("true", "yes", "1")

# def _find_int(text: str, key: str):
#     pat = rf"({key})\s*[:=]?\s*(\d+)"
#     m = re.search(pat, text, flags=re.IGNORECASE)
#     if not m:
#         return None
#     return int(m.group(2))

def _find_e_series(text: str):
    m = re.search(r"\b(E12|E24|E96)\b", text, flags=re.IGNORECASE)
    if not m:
        return None
    return m.group(1).upper()

def _find_topology_id(text: str):
    # اگر متن گفت: Prefer rc_cascade_staggered
    for tid in KNOWN_TOPO_IDS:
        if re.search(rf"\b{re.escape(tid)}\b", text, flags=re.IGNORECASE):
            return tid
    return None

def parse_free_text(text: str) -> ParsedDraft:
    t = (text or "").strip()
    d = ParsedDraft()
    notes = []

    # ---------- Interfaces ----------
    rs = _find_ohm(t, "rs") or _find_ohm(t, "source impedance")
    rl = _find_ohm(t, "rl") or _find_ohm(t, "load")
    if rs is not None:
        d.rs_ohm = rs
        notes.append(f"Detected Rs={rs}Ω")
    if rl is not None:
        d.rl_ohm = rl
        notes.append(f"Detected RL={rl}Ω")

    # ---------- Targets ----------
    fp = _find_freq(t, "fp") or _find_freq(t, "passband edge")
    fs = _find_freq(t, "fs") or _find_freq(t, "stopband edge")
    ap = _find_db(t, "ap") or _find_db(t, "passband loss")
    a_s = _find_db(t, "as") or _find_db(t, "stopband attenuation")

    if fp is not None:
        d.fp_hz = fp
        notes.append(f"Detected fp_hz={fp}")
    if fs is not None:
        d.fs_hz = fs
        notes.append(f"Detected fs_hz={fs}")
    if ap is not None:
        d.ap_db = ap
        notes.append(f"Detected ap_db={ap}")
    if a_s is not None:
        d.as_db = a_s
        notes.append(f"Detected as_db={a_s}")

    # ---------- Constraints: stages ----------
    smn = _find_int(t, "stages_min")
    smx = _find_int(t, "stages_max")
    if smn is not None:
        d.stages_min = max(1, min(smn, 8))
        notes.append(f"Detected stages_min={d.stages_min}")
    if smx is not None:
        d.stages_max = max(1, min(smx, 8))
        notes.append(f"Detected stages_max={d.stages_max}")

    # fallback: "stages = 3"
    if smn is None and smx is None:
        m = re.search(r"(stages|stage|order|n)\s*(?:[:=]|<=|>=)?\s*(\d+)", t, flags=re.IGNORECASE)
        if m:
            n = int(m.group(2))
            d.stages_min = max(1, min(n, 8))
            d.stages_max = max(d.stages_min, min(n, 8))
            notes.append(f"Detected fixed stages={n}")

    # ---------- Constraints: e_series + snap ----------
    es = _find_e_series(t)
    if es:
        d.e_series = es  # type: ignore
        notes.append(f"Detected e_series={es}")

    snap = _find_bool(t, "snap_r_to_series")
    if snap is not None:
        d.snap_r_to_series = snap
        notes.append(f"Detected snap_r_to_series={snap}")

    # ---------- Constraints: r/c bounds ----------
    rmin = _find_float(t, "r_min_ohm")
    rmax = _find_float(t, "r_max_ohm")
    cmin = _find_float(t, "c_min_f")
    cmax = _find_float(t, "c_max_f")

    if rmin is not None:
        d.r_min_ohm = rmin
        notes.append(f"Detected r_min_ohm={rmin}")
    if rmax is not None:
        d.r_max_ohm = rmax
        notes.append(f"Detected r_max_ohm={rmax}")
    if cmin is not None:
        d.c_min_f = cmin
        notes.append(f"Detected c_min_f={cmin}")
    if cmax is not None:
        d.c_max_f = cmax
        notes.append(f"Detected c_max_f={cmax}")

    # ---------- Topology ----------
    tid = _find_topology_id(t)
    if tid:
        d.topology_id = tid
        notes.append(f"Detected topology_id={tid}")

    # ---------- Optimizer ----------
    obj = _find_word(t, "objective")
    if obj:
        obj_l = obj.lower()
        if obj_l in ("weighted_penalty", "area_to_target"):
            d.objective = obj_l  # type: ignore
            notes.append(f"Detected objective={obj_l}")

    seed = _find_int(t, "seed")
    particles = _find_int(t, "particles")
    iters = _find_int(t, "iters")
    w = _find_float(t, "w")
    c1 = _find_float(t, "c1")
    c2 = _find_float(t, "c2")
    fmax = _find_freq(t, "fmax_hz")
    points = _find_int(t, "points")

    if seed is not None:
        d.seed = seed
        notes.append(f"Detected seed={seed}")
    if particles is not None:
        d.particles = particles
        notes.append(f"Detected particles={particles}")
    if iters is not None:
        d.iters = iters
        notes.append(f"Detected iters={iters}")
    if w is not None:
        d.w = w
        notes.append(f"Detected w={w}")
    if c1 is not None:
        d.c1 = c1
        notes.append(f"Detected c1={c1}")
    if c2 is not None:
        d.c2 = c2
        notes.append(f"Detected c2={c2}")
    if fmax is not None:
        d.fmax_hz = fmax
        notes.append(f"Detected fmax_hz={fmax}")
    if points is not None:
        d.points = points
        notes.append(f"Detected points={points}")

    d.notes = notes
    return d
