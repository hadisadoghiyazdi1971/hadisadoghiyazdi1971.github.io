import React from "react";
export default function StepConstraints({ spec, setSpec }: any) {
  const c = spec.constraints;
  return (
    <div>
      <h3>Constraints</h3>
      <div className="row">
        <div className="field"><div className="label">Stages min</div>
          <input type="number" value={c.stages_min} onChange={(e) => setSpec({ ...spec, constraints: { ...c, stages_min: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">Stages max</div>
          <input type="number" value={c.stages_max} onChange={(e) => setSpec({ ...spec, constraints: { ...c, stages_max: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">E-series (R)</div>
          <select value={c.e_series} onChange={(e) => setSpec({ ...spec, constraints: { ...c, e_series: e.target.value } })}>
            <option value="E12">E12</option><option value="E24">E24</option><option value="E96">E96</option>
          </select>
        </div>
        <div className="field"><div className="label">Snap R to E-series</div>
          <select value={String(c.snap_r_to_series)} onChange={(e) => setSpec({ ...spec, constraints: { ...c, snap_r_to_series: e.target.value === "true" } })}>
            <option value="true">true</option><option value="false">false</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="field"><div className="label">R min (Ω)</div>
          <input type="number" value={c.r_min_ohm} onChange={(e) => setSpec({ ...spec, constraints: { ...c, r_min_ohm: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">R max (Ω)</div>
          <input type="number" value={c.r_max_ohm} onChange={(e) => setSpec({ ...spec, constraints: { ...c, r_max_ohm: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">C min (F)</div>
          <input type="number" value={c.c_min_f} onChange={(e) => setSpec({ ...spec, constraints: { ...c, c_min_f: Number(e.target.value) } })} />
        </div>
        <div className="field"><div className="label">C max (F)</div>
          <input type="number" value={c.c_max_f} onChange={(e) => setSpec({ ...spec, constraints: { ...c, c_max_f: Number(e.target.value) } })} />
        </div>
      </div>
      <hr />
      <div style={{ fontSize: 13, opacity: .8 }}>Constraints define the optimizer search space.</div>
    </div>
  );
}
