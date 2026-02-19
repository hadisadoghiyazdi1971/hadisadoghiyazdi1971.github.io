export type Topology = { id: string; name: string; description: string; params?: Record<string, any> };
// export type ParsedDraft = { project_name: string; fp_hz: number; ap_db: number; fs_hz: number; as_db: number; stages_min: number; stages_max: number; notes: string[] };
export type ParsedDraft = {
  project_name: string;

  fp_hz: number;
  ap_db: number;
  fs_hz: number;
  as_db: number;

  stages_min: number;
  stages_max: number;

  rs_ohm?: number;
  rl_ohm?: number;
  topology_id?: string;
  e_series?: "E12" | "E24" | "E96";
  snap_r_to_series?: boolean;

  // NEW constraints
  r_min_ohm?: number;
  r_max_ohm?: number;
  c_min_f?: number;
  c_max_f?: number;

  // NEW optimizer
  objective?: "area_to_target" | "weighted_penalty";
  seed?: number;
  particles?: number;
  iters?: number;
  w?: number;
  c1?: number;
  c2?: number;
  fmax_hz?: number;
  points?: number;

  notes?: string[];
};


export type RunResult = {
  project: { name: string; version: "v1" };
  topology_id: string;
  stages: number;
  stage_values: { index: number; r_ohm: number; c_f: number; fc_stage_hz: number }[];
  score: number;
  metrics: Record<string, any>;
  netlist: string;
  plots: { frequency_hz: number[]; magnitude_db: number[]; phase_deg: number[] };
  findings: { code: string; severity: "ERROR" | "WARN" | "INFO"; message: string; suggestion?: string }[];
  log: { iter: number; best_score: number }[];
};
