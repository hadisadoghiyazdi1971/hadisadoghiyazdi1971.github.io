import React, { useMemo, useState } from "react";
import StepInput from "./steps/StepInput";
import StepTopology from "./steps/StepTopology";
import StepConstraints from "./steps/StepConstraints";
import StepOptimizer from "./steps/StepOptimizer";
import StepRun from "./steps/StepRun";
import StepExport from "./steps/StepExport";
import type { RunResult } from "../lib/types";

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [spec, setSpec] = useState<any>(() => defaultSpec());
  const [result, setResult] = useState<RunResult | null>(null);
  const [topologies, setTopologies] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  const findings = useMemo(() => result?.findings ?? [], [result]);

  const steps = [
    <StepInput key="in" spec={spec} setSpec={setSpec} busy={busy} setBusy={setBusy} />,
    <StepTopology key="top" spec={spec} setSpec={setSpec} topologies={topologies} setTopologies={setTopologies} busy={busy} setBusy={setBusy} />,
    <StepConstraints key="con" spec={spec} setSpec={setSpec} />,
    <StepOptimizer key="opt" spec={spec} setSpec={setSpec} />,
    <StepRun key="run" spec={spec} result={result} setResult={setResult} busy={busy} setBusy={setBusy} />,
    <StepExport key="exp" result={result} busy={busy} />,
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, padding: 16 }}>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>WiseEDA-like RC Lowpass</div>
            <div style={{ fontSize: 12, opacity: .7 }}>Free text + topology selection + ngspice loop + PSO optimization.</div>
          </div>
          <div className="badge INFO">Step {step + 1} / 6</div>
        </div>

        <hr />
        {steps[step]}
        <hr />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button disabled={step === 0 || busy} onClick={() => setStep(step - 1)}>Back</button>
          <button disabled={step === steps.length - 1 || busy} onClick={() => setStep(step + 1)}>Next</button>
          <button disabled={busy} onClick={() => { setSpec(defaultSpec()); setResult(null); setTopologies([]); setStep(0); }}>Reset</button>
        </div>
      </div>

      <aside className="card">
        <div style={{ fontSize: 16, fontWeight: 800 }}>Findings</div>
        <div style={{ fontSize: 12, opacity: .7, marginTop: 4 }}>Warnings & info from backend.</div>
        <hr />
        {findings.length === 0 ? (
          <div style={{ opacity: .7 }}>No findings yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {findings.map((f: any, i: number) => (
              <div key={i}>
                <span className={`badge ${f.severity}`}>{f.severity}</span>{" "}
                <span style={{ fontWeight: 700 }}>{f.code}</span>
                <div style={{ marginTop: 4 }}>{f.message}</div>
                {f.suggestion ? <div style={{ marginTop: 4, opacity: .8 }}>↳ {f.suggestion}</div> : null}
              </div>
            ))}
          </div>
        )}
        <hr />
      </aside>
    </div>
  );
}

function defaultSpec() {
  return {
    project: { name: "RC Lowpass Project", version: "v1" },
    targets: { fp_hz: 1000, ap_db: 1, fs_hz: 10000, as_db: 40 },
    interfaces: { rs_ohm: 0, rl_ohm: 10000 },
    constraints: { stages_min: 1, stages_max: 6, r_min_ohm: 1000, r_max_ohm: 100000, c_min_f: 1e-9, c_max_f: 1e-6, e_series: "E24", snap_r_to_series: true },
    optimizer: { algorithm: "pso", seed: 1, particles: 28, iters: 60, w: 0.72, c1: 1.4, c2: 1.4, objective: "area_to_target", fmax_hz: 1e6, points: 240 },
    topology_id: "rc_cascade_equal",
    free_text: "fp=1kHz ap=1dB fs=10kHz as=40dB"
  };
}
