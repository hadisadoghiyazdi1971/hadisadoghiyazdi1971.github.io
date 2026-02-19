import React, { useState } from "react";
import { postBlob } from "../../lib/api";
import type { RunResult } from "../../lib/types";

const API_BASE = "http://localhost:8000/v1";

export default function StepExport({ result, busy }: { result: RunResult | null, busy: boolean }) {
  const [err, setErr] = useState<any>(null);

  async function downloadZip() {
    if (!result) return;
    setErr(null);
    try {
      const blob = await postBlob(`${API_BASE}/export_zip`, { result });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rc_lowpass_result.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) { setErr(e); }
  }

  return (
    <div>
      <h3>Export</h3>
      {!result ? <div style={{ opacity: .75 }}>Run optimization first.</div> : (
        <>
          <button disabled={busy} onClick={downloadZip}>Download ZIP (netlist + report + bom + plots + log)</button>
          {err ? <pre style={{ marginTop: 10 }}>{JSON.stringify(err, null, 2)}</pre> : null}
          <hr />
          <div style={{ fontSize: 13, opacity: .85 }}>
            ZIP includes: <code>netlist.cir</code>, <code>report.md</code>, <code>bom.csv</code>, <code>plots.json</code>, <code>run_log.json</code>
          </div>
        </>
      )}
    </div>
  );
}
