import React, { useState } from "react";
import { postJSON } from "../../lib/api";
import type { Topology } from "../../lib/types";

const API_BASE = "http://localhost:8000/v1";

export default function StepTopology({ spec, setSpec, topologies, setTopologies, busy, setBusy }: any) {
  const [err, setErr] = useState<any>(null);

  async function suggest() {
    setBusy(true);
    setErr(null);
    try {
      const res = await postJSON<{ ranked: Topology[] }>(`${API_BASE}/topologies/suggest`, { targets: spec.targets, constraints: spec.constraints });
      setTopologies(res.ranked);
      if (res.ranked?.length) setSpec({ ...spec, topology_id: res.ranked[0].id });
    } catch (e) { setErr(e); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <h3>Topology Library</h3>
      <button disabled={busy} onClick={suggest}>{busy ? "Loading..." : "Suggest topologies"}</button>
      {err ? <pre style={{ marginTop: 10 }}>{JSON.stringify(err, null, 2)}</pre> : null}
      <hr />
      {topologies.length === 0 ? (
        <div style={{ opacity: .75 }}>Click “Suggest topologies” to load ranking.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {topologies.map((t: Topology) => (
            <div key={t.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{t.name}</div>
                  <div style={{ fontSize: 12, opacity: .8, marginTop: 4 }}>{t.description}</div>
                </div>
                <div>
                  <button disabled={busy} onClick={() => setSpec({ ...spec, topology_id: t.id })}>
                    {spec.topology_id === t.id ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, opacity: .7 }}>id: <code>{t.id}</code></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
