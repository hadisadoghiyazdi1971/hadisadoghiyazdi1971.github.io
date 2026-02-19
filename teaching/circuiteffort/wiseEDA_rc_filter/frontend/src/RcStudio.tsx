import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Finding = {
  severity: "INFO" | "WARN" | "ERROR";
  code: string;
  message: string;
  suggestion?: string;
};

type RunResult = {
  score: number;
  loss_at_fp_db: number;
  att_at_fs_db: number;
  stages: number;
  stage_values: Array<{ r_ohm: number; c_f: number }>;
  plots: {
    frequency_hz: number[];
    magnitude_db: number[];
    phase_deg?: number[];
  };
  best_netlist: string;
  findings: Finding[];
  log?: string;
};

type RunHistoryItem = {
  id: string;
  ts: number;
  title: string;
  inputSummary: string;
  topology: string;
  fp: number;
  fs: number;
  ap: number;
  as: number;
  stagesMax: number;
  score?: number;
  loss?: number;
  att?: number;
  result?: RunResult;
};

const LS_THEME_KEY = "rcstudio.theme";
const LS_HISTORY_KEY = "rcstudio.history.v1";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleString();
}

function severityClass(sev: Finding["severity"]) {
  if (sev === "ERROR") return "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/25";
  if (sev === "WARN") return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25";
  return "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/25";
}

export default function RcStudioModern() {
  // ---- Theme (Light/Dark) ----
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem(LS_THEME_KEY) as "light" | "dark" | null) ?? null;
    const initial = saved ?? "light";
    setTheme(initial);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_THEME_KEY, theme);
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // ---- Sidebar collapsible ----
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ---- Backend status ----
  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
  const [connected, setConnected] = useState<"unknown" | "ok" | "bad">("unknown");
  const [loading, setLoading] = useState(false);

  async function checkHealth() {
    try {
      const r = await fetch(`${apiBase}/health`);
      setConnected(r.ok ? "ok" : "bad");
    } catch {
      setConnected("bad");
    }
  }

  // ---- Inputs ----
  const [prompt, setPrompt] = useState(
    "RC lowpass for ADC anti-aliasing. fp=1kHz, fs=10kHz, Ap=1dB, As=40dB, max stages=4. Rs=50, RL=100k."
  );
  const [fp, setFp] = useState("1000");
  const [fs, setFs] = useState("10000");
  const [ap, setAp] = useState("1");
  const [as, setAs] = useState("40");
  const [stagesMax, setStagesMax] = useState("4");
  const [rs, setRs] = useState("50");
  const [rl, setRl] = useState("100000");
  const [topology, setTopology] = useState("rc_cascade_free");

  // ---- Result + History ----
  const [result, setResult] = useState<RunResult | null>(null);
  const [history, setHistory] = useState<RunHistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_HISTORY_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as RunHistoryItem[];
      setHistory(parsed);
      if (parsed.length) setActiveHistoryId(parsed[0].id);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
  }, [history]);

  const chartData = useMemo(() => {
    if (!result) return [];
    const f = result.plots.frequency_hz ?? [];
    const m = result.plots.magnitude_db ?? [];
    const n = Math.min(f.length, m.length);
    const out: Array<{ f: number; mag: number }> = [];
    for (let i = 0; i < n; i++) out.push({ f: f[i], mag: m[i] });
    return out;
  }, [result]);

  // ---- Run ----
  async function runDesign() {
    setLoading(true);
    try {
      const payload = {
        prompt,
        targets: {
          fp_hz: Number(fp),
          fs_hz: Number(fs),
          ap_db: Number(ap),
          as_db: Number(as),
          stages_max: Number(stagesMax),
          rs_ohm: Number(rs),
          rl_ohm: Number(rl),
        },
        topology,
        optimizer: {
          particles: 28,
          iterations: 60,
          w: 0.72,
          c1: 1.4,
          c2: 1.4,
          seed: 1,
          fmax_hz: 1_000_000,
        },
      };

      const resp = await fetch(`${apiBase}/v1/optimize/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.detail ?? `HTTP ${resp.status}`);
      }

      const data = (await resp.json()) as RunResult;
      setResult(data);
      setConnected("ok");

      const item: RunHistoryItem = {
        id: crypto.randomUUID(),
        ts: Date.now(),
        title: `Run @ ${new Date().toLocaleTimeString()}`,
        inputSummary: `fp=${fp}Hz, fs=${fs}Hz, Ap=${ap}dB, As=${as}dB, stages<=${stagesMax}`,
        topology,
        fp: Number(fp),
        fs: Number(fs),
        ap: Number(ap),
        as: Number(as),
        stagesMax: Number(stagesMax),
        score: data.score,
        loss: data.loss_at_fp_db,
        att: data.att_at_fs_db,
        result: data,
      };

      setHistory((prev) => [item, ...prev].slice(0, 50));
      setActiveHistoryId(item.id);
    } catch (e: any) {
      setConnected("bad");
      setResult({
        score: 0,
        loss_at_fp_db: 0,
        att_at_fs_db: 0,
        stages: 0,
        stage_values: [],
        plots: { frequency_hz: [], magnitude_db: [] },
        best_netlist: "",
        findings: [
          {
            severity: "ERROR",
            code: "RUN_FAILED",
            message: "Run failed",
            suggestion: String(e?.message ?? e),
          },
        ],
        log: String(e?.stack ?? e),
      });
    } finally {
      setLoading(false);
    }
  }

  // ---- Keyboard shortcut Ctrl+Enter ----
  const promptRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      if (isCmdOrCtrl && e.key === "Enter") {
        e.preventDefault();
        if (!loading) runDesign();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, fp, fs, ap, as, stagesMax, rs, rl, topology, prompt]);

  // ---- Export: Netlist TXT ----
  function exportNetlist() {
    const net = result?.best_netlist?.trim();
    if (!net) return;
    downloadText("rc-lowpass.netlist.cir", net + "\n");
  }

  // ---- Export: ZIP (backend) ----
  // نکته: این دکمه فقط وقتی کار می‌کند که backend یک endpoint مثل /v1/export/zip داشته باشد.
  // اگر نداری، بگو تا endpointش رو هم در backend برات اضافه کنم.
  async function exportZip() {
    try {
      const payload = {
        prompt,
        targets: {
          fp_hz: Number(fp),
          fs_hz: Number(fs),
          ap_db: Number(ap),
          as_db: Number(as),
          stages_max: Number(stagesMax),
          rs_ohm: Number(rs),
          rl_ohm: Number(rl),
        },
        topology,
        // اگر خواستی می‌تونی best_netlist هم بفرستی
        best_netlist: result?.best_netlist ?? "",
      };

      const r = await fetch(`${apiBase}/v1/export/zip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(err?.detail ?? `HTTP ${r.status}`);
      }

      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rc-filter-export.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(`ZIP export failed: ${String(e?.message ?? e)}`);
    }
  }

  // ---- History selection ----
  useEffect(() => {
    if (!activeHistoryId) return;
    const item = history.find((h) => h.id === activeHistoryId);
    if (!item) return;
    // Load inputs + result from history item
    setTopology(item.topology);
    setFp(String(item.fp));
    setFs(String(item.fs));
    setAp(String(item.ap));
    setAs(String(item.as));
    setStagesMax(String(item.stagesMax));
    // prompt را دست نمی‌زنیم مگر خودت بخوای (اختیاری)
    if (item.result) setResult(item.result);
  }, [activeHistoryId, history]);

  function clearHistory() {
    setHistory([]);
    setActiveHistoryId(null);
  }

  const statusLabel =
    connected === "unknown" ? "Not checked" : connected === "ok" ? "Connected" : "Disconnected";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              onClick={() => setSidebarOpen((v) => !v)}
              title="Toggle sidebar"
            >
              {sidebarOpen ? "⟨⟨" : "⟩⟩"}
            </button>

            <div>
              <div className="text-lg font-semibold leading-5">RC Filter Studio</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Modern UI (no wizard) • Ctrl+Enter to Run
              </div>
            </div>

            <span
              className={cn(
                "ml-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                connected === "ok"
                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : connected === "bad"
                  ? "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300"
                  : "border-slate-300/60 bg-slate-100 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-current opacity-70" />
              {statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              onClick={checkHealth}
            >
              Check
            </button>

            <button
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              title="Toggle theme"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>

            <button
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium shadow-sm",
                loading
                  ? "bg-slate-300 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              )}
              onClick={runDesign}
              disabled={loading}
            >
              {loading ? "Running..." : "Run"}
            </button>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6">
        {/* Sidebar */}
        <aside
          className={cn(
            "col-span-12 transition-all duration-200 lg:col-span-3",
            sidebarOpen ? "lg:col-span-3" : "lg:col-span-1"
          )}
        >
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm font-semibold">History</div>
              <button
                className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                onClick={clearHistory}
              >
                Clear
              </button>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800" />

            <div className={cn("p-2", sidebarOpen ? "block" : "hidden lg:block")}>
              {history.length === 0 ? (
                <div className="p-3 text-sm text-slate-500 dark:text-slate-400">No runs yet.</div>
              ) : (
                <div className="max-h-[70vh] overflow-auto p-1">
                  {history.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHistoryId(h.id)}
                      className={cn(
                        "mb-2 w-full rounded-xl border p-3 text-left text-sm transition",
                        h.id === activeHistoryId
                          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                          : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{h.title}</div>
                        <div className={cn("text-xs", h.id === activeHistoryId ? "text-white/80 dark:text-slate-700" : "text-slate-500 dark:text-slate-400")}>
                          {formatTime(h.ts)}
                        </div>
                      </div>
                      <div className={cn("mt-1 text-xs", h.id === activeHistoryId ? "text-white/80 dark:text-slate-700" : "text-slate-500 dark:text-slate-400")}>
                        {h.inputSummary}
                      </div>
                      <div className={cn("mt-2 text-xs", h.id === activeHistoryId ? "text-white/90 dark:text-slate-800" : "text-slate-600 dark:text-slate-300")}>
                        score: {h.score?.toFixed?.(2) ?? "—"} • loss: {h.loss?.toFixed?.(2) ?? "—"} dB • att:{" "}
                        {h.att?.toFixed?.(2) ?? "—"} dB
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!sidebarOpen && (
              <div className="p-3 text-xs text-slate-500 dark:text-slate-400">
                Sidebar collapsed
              </div>
            )}
          </div>
        </aside>

        {/* Inputs */}
        <section className={cn("col-span-12 lg:col-span-4", sidebarOpen ? "lg:col-span-4" : "lg:col-span-5")}>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="px-4 py-3">
              <div className="text-sm font-semibold">Inputs</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Free text + numeric specs (not wizard)
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800" />

            <div className="space-y-4 p-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Free text
                </label>
                <textarea
                  ref={promptRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-white/15"
                  placeholder="Describe your RC lowpass..."
                />
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Shortcut: Ctrl+Enter
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["fp (Hz)", fp, setFp],
                  ["fs (Hz)", fs, setFs],
                  ["Ap (dB)", ap, setAp],
                  ["As (dB)", as, setAs],
                  ["Stages max", stagesMax, setStagesMax],
                  ["Topology", topology, setTopology],
                  ["Rs (Ω)", rs, setRs],
                  ["RL (Ω)", rl, setRl],
                ].map(([label, val, setter], i) => (
                  <div key={i}>
                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                      {label as string}
                    </label>
                    <input
                      value={val as string}
                      onChange={(e) => (setter as any)(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-white/15"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  onClick={runDesign}
                  disabled={loading}
                >
                  {loading ? "Running..." : "Run"}
                </button>

                <button
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                  onClick={() => setResult(null)}
                >
                  Clear result
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className={cn("col-span-12 lg:col-span-5", sidebarOpen ? "lg:col-span-5" : "lg:col-span-6")}>
          <div className="space-y-4">
            {/* Summary + Export */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <div className="text-sm font-semibold">Results</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Magnitude plot + key metrics
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                    onClick={exportNetlist}
                    disabled={!result?.best_netlist}
                  >
                    Download Netlist
                  </button>

                  <button
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                    onClick={exportZip}
                  >
                    Download ZIP
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800" />

              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Best score</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {result ? result.score.toFixed(2) : "—"}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Stages</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {result ? result.stages : "—"}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Loss@fp</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {result ? `${result.loss_at_fp_db.toFixed(2)} dB` : "—"}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Att@fs</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {result ? `${result.att_at_fs_db.toFixed(2)} dB` : "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Plot */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 text-sm font-semibold">Magnitude (dB) vs Frequency (Hz)</div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="f" type="number" domain={["dataMin", "dataMax"]} />
                    <YAxis dataKey="mag" />
                    <Tooltip
                      formatter={(v: any) => [`${Number(v).toFixed(2)} dB`, "Magnitude"]}
                      labelFormatter={(l) => `f = ${Number(l).toFixed(0)} Hz`}
                    />
                    <Line type="monotone" dataKey="mag" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Netlist + Findings */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="px-4 py-3">
                  <div className="text-sm font-semibold">Netlist</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Best circuit</div>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800" />
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap p-4 text-xs text-slate-700 dark:text-slate-200">
                  {result?.best_netlist?.trim() || "No netlist yet."}
                </pre>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="px-4 py-3">
                  <div className="text-sm font-semibold">Findings</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Warnings & info from backend
                  </div>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800" />
                <div className="max-h-64 overflow-auto p-3">
                  {(result?.findings || []).length === 0 ? (
                    <div className="p-2 text-sm text-slate-500 dark:text-slate-400">
                      No findings.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(result?.findings || []).map((f, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "rounded-xl border p-3 text-sm",
                            severityClass(f.severity)
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-semibold">{f.severity}</div>
                            <div className="text-[11px] opacity-80">{f.code}</div>
                          </div>
                          <div className="mt-1">{f.message}</div>
                          {f.suggestion && (
                            <div className="mt-2 whitespace-pre-wrap text-xs opacity-90">
                              {f.suggestion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Logs */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="px-4 py-3">
                <div className="text-sm font-semibold">Logs</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Raw output</div>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800" />
              <pre className="max-h-56 overflow-auto whitespace-pre-wrap p-4 text-xs text-slate-700 dark:text-slate-200">
                {result?.log?.trim() || "No logs."}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
