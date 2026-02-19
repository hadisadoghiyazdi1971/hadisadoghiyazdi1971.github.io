from typing import List, Literal, Optional, Dict, Any
from pydantic import BaseModel, Field

Severity = Literal["ERROR", "WARN", "INFO"]

class ParseRequest(BaseModel):
    text: str

class ParsedDraft(BaseModel):
    project_name: str = "RC Lowpass Project"

    # Interfaces
    rs_ohm: float = Field(default=0, ge=0)
    rl_ohm: float = Field(default=10000, gt=0)

    # Targets
    fp_hz: float = 1000
    ap_db: float = 1
    fs_hz: float = 10000
    as_db: float = 40

    # Topology preference
    topology_id: Optional[str] = None

    # Constraints
    stages_min: int = 1
    stages_max: int = 6
    e_series: Literal["E12", "E24", "E96"] = "E24"
    snap_r_to_series: bool = True

    r_min_ohm: float = 100.0
    r_max_ohm: float = 1e6
    c_min_f: float = 1e-12
    c_max_f: float = 1e-3

    # Optimizer
    objective: Literal["area_to_target", "weighted_penalty"] = "area_to_target"
    seed: int = 1
    particles: int = 30
    iters: int = 60
    w: float = 0.72
    c1: float = 1.4
    c2: float = 1.4
    fmax_hz: float = 1e6
    points: int = 240

    # objective: Literal["area_to_target", "weighted_penalty"] = "weighted_penalty"
    # seed: int = 1
    # particles: int = 25
    # iters: int = 50
    # w: float = 0.72
    # c1: float = 1.49
    # c2: float = 1.49
    # fmax_hz: float = 1e6
    # points: int = 400

    notes: List[str] = []

class Project(BaseModel):
    name: str = "RC Lowpass Project"
    version: Literal["v1"] = "v1"

class Targets(BaseModel):
    fp_hz: float = Field(gt=0)
    ap_db: float = Field(gt=0)
    fs_hz: float = Field(gt=0)
    as_db: float = Field(gt=0)

class Interfaces(BaseModel):
    rs_ohm: float = Field(default=0, ge=0)
    rl_ohm: float = Field(default=10000, gt=0)

class Constraints(BaseModel):
    stages_min: int = Field(default=1, ge=1, le=8)
    stages_max: int = Field(default=6, ge=1, le=8)
    r_min_ohm: float = Field(default=1000, gt=0)
    r_max_ohm: float = Field(default=100000, gt=0)
    c_min_f: float = Field(default=1e-9, gt=0)
    c_max_f: float = Field(default=1e-6, gt=0)
    e_series: Literal["E12", "E24", "E96"] = "E24"
    snap_r_to_series: bool = True

class OptimizerConfig(BaseModel):
    algorithm: Literal["pso"] = "pso"
    seed: int = 1
    particles: int = Field(default=28, ge=5, le=200)
    iters: int = Field(default=60, ge=5, le=1000)
    w: float = Field(default=0.72, gt=0, lt=2)
    c1: float = Field(default=1.4, gt=0, lt=5)
    c2: float = Field(default=1.4, gt=0, lt=5)
    objective: Literal["area_to_target", "weighted_penalty"] = "area_to_target"
    fmax_hz: float = Field(default=1e6, gt=0)
    points: int = Field(default=240, ge=50, le=2000)

class Topology(BaseModel):
    id: str
    name: str
    description: str
    params: Dict[str, Any] = {}

class SuggestRequest(BaseModel):
    targets: Targets
    constraints: Constraints

class SuggestResponse(BaseModel):
    ranked: List[Topology]

class RunRequest(BaseModel):
    project: Project
    targets: Targets
    interfaces: Interfaces
    constraints: Constraints
    optimizer: OptimizerConfig
    topology_id: str

class RuleFinding(BaseModel):
    code: str
    severity: Severity
    message: str
    suggestion: Optional[str] = None

class StageValue(BaseModel):
    index: int
    r_ohm: float
    c_f: float
    fc_stage_hz: float

class RunLogItem(BaseModel):
    iter: int
    best_score: float

class RunResult(BaseModel):
    project: Project
    topology_id: str
    stages: int
    stage_values: List[StageValue]
    score: float
    metrics: Dict[str, Any]
    netlist: str
    plots: Dict[str, List[float]]
    findings: List[RuleFinding]
    log: List[RunLogItem]
    simlog: Optional[str] = None


class ExportZipRequest(BaseModel):
    result: RunResult
