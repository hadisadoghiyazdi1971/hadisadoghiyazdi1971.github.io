import React from "react";
export default function StepOptimizer({ spec, setSpec }: any) {
  const o = spec.optimizer;

  const PRESETS = {
    fast: {
      objective: "weighted_penalty",
      seed: 1,
      particles: 30,
      iters: 60,
      w: 0.72,
      c1: 1.49,
      c2: 1.49,
      fmax_hz: 1e6,
      points: 400,
    },
    balanced: {
      objective: "weighted_penalty",
      seed: 1,
      particles: 80,
      iters: 200,
      w: 0.72,
      c1: 1.49,
      c2: 1.49,
      fmax_hz: 1e6,
      points: 600,
    },
    best: {
      objective: "weighted_penalty",
      seed: 1,
      particles: 150,
      iters: 400,
      w: 0.72,
      c1: 1.49,
      c2: 1.49,
      fmax_hz: 2e6,
      points: 1000,
    },
  } as const;

  function applyPreset(name: keyof typeof PRESETS) {
    const p = PRESETS[name];
    setSpec({
      ...spec,
      optimizer: { ...o, ...p },
    });
  }


  return (
    <div>
      <h3>Optimizer</h3>
      <div className="row" style={{ gap: 8, alignItems: "center" }}>
        <div style={{ fontWeight: 600, marginRight: 8 }}>Presets</div>
        <button type="button" onClick={() => applyPreset("fast")}>Fast</button>
        <button type="button" onClick={() => applyPreset("balanced")}>Balanced</button>
        <button type="button" onClick={() => applyPreset("best")}>Best</button>
      </div>
      <hr />

      <div className="row">
        <div className="field"><div className="label">Objective</div>
          <select value={o.objective} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, objective: e.target.value } })}>
            <option value="area_to_target">area_to_target</option>
            <option value="weighted_penalty">weighted_penalty</option>
          </select>
        </div>
        <div className="field"><div className="label">Seed</div>
          <input type="number" value={o.seed} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, seed: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Particles</div>
          <input type="number" value={o.particles} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, particles: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Iterations</div>
          <input type="number" value={o.iters} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, iters: Number(e.target.value) } })} />
        </div>
      </div>
      <div className="row">
        <div className="field"><div className="label">w</div>
          <input type="number" step="0.01" value={o.w} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, w: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">c1</div>
          <input type="number" step="0.01" value={o.c1} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, c1: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">c2</div>
          <input type="number" step="0.01" value={o.c2} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, c2: Number(e.target.value) } })} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="field"><div className="label">fmax (Hz)</div>
          <input type="number" value={o.fmax_hz} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, fmax_hz: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Points (display)</div>
          <input type="number" value={o.points} onChange={(e) => setSpec({ ...spec, optimizer: { ...o, points: Number(e.target.value) } })} />
        </div>
      </div>
      <hr />
      <div style={{ fontSize: 13, opacity: .8 }}>More particles/iters = slower (ngspice runs many times).</div>
    </div>
  );
}
