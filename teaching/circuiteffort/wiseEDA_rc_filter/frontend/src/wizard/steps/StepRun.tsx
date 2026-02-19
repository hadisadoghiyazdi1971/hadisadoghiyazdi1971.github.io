import React, { useMemo, useState } from "react";
import { postJSON } from "../../lib/api";
import type { RunResult } from "../../lib/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_BASE = "http://localhost:8000/v1";

export default function StepRun({ spec, result, setResult, busy, setBusy }: any) {
  const [err, setErr] = useState<any>(null);

  const chartData = useMemo(() => {
    if (!result) return [];
    const f = result.plots.frequency_hz;
    const m = result.plots.magnitude_db;
    return f.map((x, i) => ({ f: x, mag: m[i] }));
  }, [result]);

  const logData = useMemo(() => (result?.log || []).map((x: any) => ({ iter: x.iter, best: x.best_score })), [result]);

  async function run() {
    setBusy(true);
    setErr(null);
    try {
      const payload = { project: spec.project, targets: spec.targets, interfaces: spec.interfaces, constraints: spec.constraints, optimizer: spec.optimizer, topology_id: spec.topology_id };
      const r = await postJSON<RunResult>(`${API_BASE}/optimize/run`, payload);
      setResult(r);
    } catch (e) { setErr(e); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <h3>Run Optimization</h3>
      <div className="row">
        <div className="field"><div className="label">Selected topology</div><div><code>{spec.topology_id}</code></div></div>
        <div className="field"><div className="label">Action</div><button disabled={busy} onClick={run}>{busy ? "Running..." : "Run PSO + ngspice"}</button></div>
      </div>
      {err ? <pre style={{ marginTop: 10 }}>{JSON.stringify(err, null, 2)}</pre> : null}
      <hr />

      {!result ? <div style={{ opacity: .75 }}>Run to see best design, plots, and netlist.</div> : (
        <>
          <div className="row">
            <div className="card" style={{ flex: 1 }}>
              <div style={{ fontSize: 12, opacity: .7 }}>Best score</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{result.score.toFixed(4)}</div>
              <div style={{ marginTop: 6, opacity: .85 }}>
                Loss@fp: <b>{Number(result.metrics.loss_at_fp_db).toFixed(2)} dB</b><br/>
                Att@fs: <b>{Number(result.metrics.att_at_fs_db).toFixed(2)} dB</b>
              </div>
              <div style={{ marginTop: 6, opacity: .75 }}>Stages: <b>{result.stages}</b></div>
            </div>

            <div className="card" style={{ flex: 1 }}>
              <div style={{ fontSize: 12, opacity: .7 }}>Stage values</div>
              <ul style={{ margin: "8px 0 0 18px" }}>
                {result.stage_values.map((s: any) => <li key={s.index}>{s.index}: R={Math.round(s.r_ohm)}Ω, C={Number(s.c_f).toExponential(2)}F</li>)}
              </ul>
            </div>
          </div>

          <hr />

          <div style={{ height: 260 }}>
            <div style={{ fontSize: 12, opacity: .7, marginBottom: 6 }}>Magnitude (dB) vs Frequency (Hz)</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="f" type="number" domain={["auto", "auto"]} />
                <YAxis dataKey="mag" domain={["auto", "auto"]} />
                <Tooltip />
                <Line dataKey="mag" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <hr />

          <div style={{ height: 200 }}>
            <div style={{ fontSize: 12, opacity: .7, marginBottom: 6 }}>Optimization progress (best score)</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={logData}>
                <XAxis dataKey="iter" />
                <YAxis dataKey="best" domain={["auto", "auto"]} />
                <Tooltip />
                <Line dataKey="best" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <hr />

          <div>
            <div style={{ fontWeight: 800 }}>Best netlist</div>
            <pre style={{ maxHeight: 260 }}>{result.netlist}</pre>
          </div>
        </>
      )}
    </div>
  );
}
