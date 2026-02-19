import React, { useState } from "react";
import { postJSON } from "../../lib/api";
import type { ParsedDraft } from "../../lib/types";

const API_BASE = "http://localhost:8000/v1";

export default function StepInput({ spec, setSpec, busy, setBusy }: any) {
  const [err, setErr] = useState<any>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [llmRaw, setLlmRaw] = useState<string>("");

  function applyDraft(draft: ParsedDraft) {
    setSpec({
      ...spec,

      project: { ...spec.project, name: draft.project_name },

      // ✅ Interfaces
      interfaces: {
        ...spec.interfaces,
        rs_ohm: draft.rs_ohm ?? spec.interfaces.rs_ohm,
        rl_ohm: draft.rl_ohm ?? spec.interfaces.rl_ohm,
      },

      // ✅ Targets
      targets: {
        fp_hz: draft.fp_hz,
        ap_db: draft.ap_db,
        fs_hz: draft.fs_hz,
        as_db: draft.as_db,
      },

      // ✅ Constraints (همه‌ی موارد)
      constraints: {
        ...spec.constraints,
        stages_min: draft.stages_min ?? spec.constraints.stages_min,
        stages_max: draft.stages_max ?? spec.constraints.stages_max,
        e_series: draft.e_series ?? spec.constraints.e_series,
        snap_r_to_series: draft.snap_r_to_series ?? spec.constraints.snap_r_to_series,
        r_min_ohm: draft.r_min_ohm ?? spec.constraints.r_min_ohm,
        r_max_ohm: draft.r_max_ohm ?? spec.constraints.r_max_ohm,
        c_min_f: draft.c_min_f ?? spec.constraints.c_min_f,
        c_max_f: draft.c_max_f ?? spec.constraints.c_max_f,
      },

      // ✅ Optimizer
      optimizer: {
        ...spec.optimizer,
        objective: draft.objective ?? spec.optimizer.objective,
        seed: draft.seed ?? spec.optimizer.seed,
        particles: draft.particles ?? spec.optimizer.particles,
        iters: draft.iters ?? spec.optimizer.iters,
        w: draft.w ?? spec.optimizer.w,
        c1: draft.c1 ?? spec.optimizer.c1,
        c2: draft.c2 ?? spec.optimizer.c2,
        fmax_hz: draft.fmax_hz ?? spec.optimizer.fmax_hz,
        points: draft.points ?? spec.optimizer.points,
      },

      // ✅ Topology
      topology_id: draft.topology_id ?? spec.topology_id,
    });
  }


  async function parseText() {
    setBusy(true);
    setErr(null);
    try {
      const draft = await postJSON<ParsedDraft>(`${API_BASE}/parse_request`, { text: spec.free_text || "" });
      applyDraft(draft);
      // setSpec({
      //   ...spec,
      //   project: { ...spec.project, name: draft.project_name },

      //   interfaces: {
      //     ...spec.interfaces,
      //     rs_ohm: draft.rs_ohm ?? spec.interfaces.rs_ohm,
      //     rl_ohm: draft.rl_ohm ?? spec.interfaces.rl_ohm,
      //   },

      //   targets: {
      //     fp_hz: draft.fp_hz,
      //     ap_db: draft.ap_db,
      //     fs_hz: draft.fs_hz,
      //     as_db: draft.as_db,
      //   },

      //   constraints: {
      //     ...spec.constraints,
      //     stages_min: draft.stages_min ?? spec.constraints.stages_min,
      //     stages_max: draft.stages_max ?? spec.constraints.stages_max,
      //     e_series: draft.e_series ?? spec.constraints.e_series,
      //     snap_r_to_series: draft.snap_r_to_series ?? spec.constraints.snap_r_to_series,

      //     r_min_ohm: draft.r_min_ohm ?? spec.constraints.r_min_ohm,
      //     r_max_ohm: draft.r_max_ohm ?? spec.constraints.r_max_ohm,
      //     c_min_f: draft.c_min_f ?? spec.constraints.c_min_f,
      //     c_max_f: draft.c_max_f ?? spec.constraints.c_max_f,
      //   },

      //   optimizer: {
      //     ...spec.optimizer,
      //     objective: draft.objective ?? spec.optimizer.objective,
      //     seed: draft.seed ?? spec.optimizer.seed,
      //     particles: draft.particles ?? spec.optimizer.particles,
      //     iters: draft.iters ?? spec.optimizer.iters,
      //     w: draft.w ?? spec.optimizer.w,
      //     c1: draft.c1 ?? spec.optimizer.c1,
      //     c2: draft.c2 ?? spec.optimizer.c2,
      //     fmax_hz: draft.fmax_hz ?? spec.optimizer.fmax_hz,
      //     points: draft.points ?? spec.optimizer.points,
      //   },

      //   topology_id: draft.topology_id ?? spec.topology_id,
      // });

      setNotes(draft.notes || []);
    } catch (e) {
      setErr(e);
    } finally {
      setBusy(false);
    }
  }

async function parseWithLLM() {
  setBusy(true);
  setErr(null);
  setLlmRaw("");
  try {
    const draft = await postJSON<ParsedDraft>(`${API_BASE}/llm/parse`, { text: spec.free_text || "" });
    applyDraft(draft);
    // setSpec({
    //     ...spec,
    //     project: { ...spec.project, name: draft.project_name },

    //     interfaces: {
    //       ...spec.interfaces,
    //       rs_ohm: draft.rs_ohm ?? spec.interfaces.rs_ohm,
    //       rl_ohm: draft.rl_ohm ?? spec.interfaces.rl_ohm,
    //     },

    //     targets: {
    //       fp_hz: draft.fp_hz,
    //       ap_db: draft.ap_db,
    //       fs_hz: draft.fs_hz,
    //       as_db: draft.as_db,
    //     },

    //     constraints: {
    //       ...spec.constraints,
    //       stages_min: draft.stages_min ?? spec.constraints.stages_min,
    //       stages_max: draft.stages_max ?? spec.constraints.stages_max,
    //       e_series: draft.e_series ?? spec.constraints.e_series,
    //       snap_r_to_series: draft.snap_r_to_series ?? spec.constraints.snap_r_to_series,

    //       r_min_ohm: draft.r_min_ohm ?? spec.constraints.r_min_ohm,
    //       r_max_ohm: draft.r_max_ohm ?? spec.constraints.r_max_ohm,
    //       c_min_f: draft.c_min_f ?? spec.constraints.c_min_f,
    //       c_max_f: draft.c_max_f ?? spec.constraints.c_max_f,
    //     },

    //     optimizer: {
    //       ...spec.optimizer,
    //       objective: draft.objective ?? spec.optimizer.objective,
    //       seed: draft.seed ?? spec.optimizer.seed,
    //       particles: draft.particles ?? spec.optimizer.particles,
    //       iters: draft.iters ?? spec.optimizer.iters,
    //       w: draft.w ?? spec.optimizer.w,
    //       c1: draft.c1 ?? spec.optimizer.c1,
    //       c2: draft.c2 ?? spec.optimizer.c2,
    //       fmax_hz: draft.fmax_hz ?? spec.optimizer.fmax_hz,
    //       points: draft.points ?? spec.optimizer.points,
    //     },

    //     topology_id: draft.topology_id ?? spec.topology_id,
    //   });
    setNotes(draft.notes || []);
  } catch (e: any) {
    setErr(e);
    if (e?.detail?.raw) setLlmRaw(String(e.detail.raw));
  } finally {
    setBusy(false);
  }
}

  return (
    <div>
      <h3>Inputs (Free text + Form)</h3>

      <div className="field" style={{ minWidth: "100%" }}>
        <div className="label">Free-text request (best-effort parser)</div>
        <textarea rows={4} value={spec.free_text || ""} onChange={(e) => setSpec({ ...spec, free_text: e.target.value })}
          placeholder="Example: fp=1kHz ap=1dB fs=10kHz as=40dB stages=3" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <button disabled={busy} onClick={parseText}>{busy ? "Parsing..." : "Parse (local)"}</button>
  <button disabled={busy} onClick={parseWithLLM}>{busy ? "Parsing..." : "Parse with Gemini"}</button>
</div>
        {notes.length ? (
          <div style={{ marginTop: 8, fontSize: 12, opacity: .85 }}>
            <b>Parser notes:</b>
            <ul style={{ margin: "6px 0 0 18px" }}>{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
          </div>
        ) : null}
      </div>

      <hr />

      <div className="row">
        <div className="field"><div className="label">Project name</div>
          <input value={spec.project.name} onChange={(e) => setSpec({ ...spec, project: { ...spec.project, name: e.target.value } })} />
        </div>
        <div className="field"><div className="label">Rs (Ω)</div>
          <input type="number" value={spec.interfaces.rs_ohm} onChange={(e) => setSpec({ ...spec, interfaces: { ...spec.interfaces, rs_ohm: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">RL (Ω)</div>
          <input type="number" value={spec.interfaces.rl_ohm} onChange={(e) => setSpec({ ...spec, interfaces: { ...spec.interfaces, rl_ohm: Number(e.target.value) } })} />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="field"><div className="label">Passband edge fp (Hz)</div>
          <input type="number" value={spec.targets.fp_hz} onChange={(e) => setSpec({ ...spec, targets: { ...spec.targets, fp_hz: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Passband loss Ap (dB)</div>
          <input type="number" value={spec.targets.ap_db} onChange={(e) => setSpec({ ...spec, targets: { ...spec.targets, ap_db: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Stopband edge fs (Hz)</div>
          <input type="number" value={spec.targets.fs_hz} onChange={(e) => setSpec({ ...spec, targets: { ...spec.targets, fs_hz: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Stopband attenuation As (dB)</div>
          <input type="number" value={spec.targets.as_db} onChange={(e) => setSpec({ ...spec, targets: { ...spec.targets, as_db: Number(e.target.value) } })} />
        </div>
      </div>

      {err ? <pre style={{ marginTop: 10 }}>{JSON.stringify(err, null, 2)}</pre> : null}
      {llmRaw ? (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, opacity: .7, marginBottom: 6 }}>Gemini raw output (for debugging)</div>
          <pre style={{ maxHeight: 220 }}>{llmRaw}</pre>
        </div>
      ) : null}
    </div>
  );
}
