from typing import List, Tuple, Any
import math

from app.models import RunRequest, RunResult, RuleFinding, RunLogItem
from app.topologies import list_topologies
from app.netlist import make_rc_lowpass_netlist, stage_values_from_pairs
from app.ngspice import ngspice_available, run_ac
from app.e_series import nearest_series
from app.optimizer import PSO
from app.scoring import area_to_target, weighted_penalty


def _estimate_required_stages(fp: float, fs: float, a_s: float) -> int:
    if fs <= fp:
        return 1
    per_stage = 10.0 * math.log10(1.0 + (fs / fp) ** 2)
    if per_stage <= 0:
        return 1
    return max(1, int(math.ceil(a_s / per_stage)))


def suggest_topologies(_req) -> List[Any]:
    order = {"rc_cascade_equal": 3, "rc_cascade_staggered": 2, "rc_cascade_free": 1}
    tops = list_topologies()
    tops.sort(key=lambda t: order.get(t.id, 0), reverse=True)
    return tops


def _build_pairs(x: List[float], N: int, constraints, kind: str) -> List[Tuple[float, float]]:
    pairs: List[Tuple[float, float]] = []
    if kind in ("equal", "staggered"):
        r, c = x[0], x[1]
        if kind == "equal":
            pairs = [(r, c)] * N
        else:
            if N == 1:
                mults = [1.0]
            else:
                lo, hi = 0.75, 1.35
                mults = [lo * (hi / lo) ** (i / (N - 1)) for i in range(N)]
            pairs = [(r / m, c) for m in mults]
    else:
        pairs = [(x[2 * i], x[2 * i + 1]) for i in range(N)]

    out = []
    for r, c in pairs:
        r = min(max(r, constraints.r_min_ohm), constraints.r_max_ohm)
        c = min(max(c, constraints.c_min_f), constraints.c_max_f)
        if constraints.snap_r_to_series:
            r = nearest_series(r, constraints.e_series, constraints.r_min_ohm, constraints.r_max_ohm)
        out.append((r, c))
    return out


def run_optimization(req: RunRequest) -> RunResult:
    topo = next((t for t in list_topologies() if t.id == req.topology_id), None)
    if topo is None:
        raise ValueError("Unknown topology_id")

    findings: List[RuleFinding] = []
    if not ngspice_available():
        findings.append(
            RuleFinding(
                code="ERR_NGSPICE_MISSING",
                severity="ERROR",
                message="ngspice not found in PATH. Install ngspice to run optimization.",
                suggestion="Install ngspice and ensure `ngspice -v` works.",
            )
        )
        raise ValueError("ngspice not found")

    fp, ap, fs, a_s = req.targets.fp_hz, req.targets.ap_db, req.targets.fs_hz, req.targets.as_db
    if fs <= fp:
        raise ValueError("Invalid spec: fs must be > fp")

    N_est = _estimate_required_stages(fp, fs, a_s)
    N = max(req.constraints.stages_min, min(req.constraints.stages_max, N_est))
    if N != N_est:
        findings.append(
            RuleFinding(
                code="INFO_STAGE_CLAMP",
                severity="INFO",
                message=f"Estimated stages {N_est}, using N={N} due to constraints.",
                suggestion="Increase stages_max or relax As.",
            )
        )

    kind = topo.params.get("kind", "equal")

    c0 = math.sqrt(req.constraints.c_min_f * req.constraints.c_max_f)
    r0 = 1.0 / (2 * math.pi * fp * c0)
    r0 = min(max(r0, req.constraints.r_min_ohm), req.constraints.r_max_ohm)

    if kind in ("equal", "staggered"):
        dim = 2
        bounds = [
            (req.constraints.r_min_ohm, req.constraints.r_max_ohm),
            (req.constraints.c_min_f, req.constraints.c_max_f),
        ]
        x0 = [r0, c0]
    else:
        dim = 2 * N
        bounds = []
        for _ in range(N):
            bounds += [
                (req.constraints.r_min_ohm, req.constraints.r_max_ohm),
                (req.constraints.c_min_f, req.constraints.c_max_f),
            ]
        x0 = []
        for _ in range(N):
            x0 += [r0, c0]

    score_fn = area_to_target if req.optimizer.objective == "area_to_target" else weighted_penalty

    f_start = max(1.0, fp / 50)
    f_stop = req.optimizer.fmax_hz
    ac_points = max(80, int(req.optimizer.points / 2))

    # IMPORTANT: assumes input node is named "in" in your netlist generator.
    # If you ever rename it, just pass in_node="newname" into run_ac.
    in_node = "in"
    out_node = "out"

    def eval_x(xvec: List[float]) -> float:
        pairs = _build_pairs(xvec, N, req.constraints, kind)
        net = make_rc_lowpass_netlist(pairs, req.interfaces.rs_ohm, req.interfaces.rl_ohm)
        f, mag, ph, simlog = run_ac(net, f_start, f_stop, ac_points, out_node=out_node, in_node=in_node)
        s, _m = score_fn(f, mag, fp, ap, fs, a_s)
        return s

    pso = PSO(
        dim=dim,
        bounds=bounds,
        seed=req.optimizer.seed,
        particles=req.optimizer.particles,
        w=req.optimizer.w,
        c1=req.optimizer.c1,
        c2=req.optimizer.c2,
    )
    pso.x[0] = list(x0)

    log: List[RunLogItem] = []
    stride = max(1, int(req.optimizer.iters / 30))
    for it in range(1, req.optimizer.iters + 1):
        pso.step(eval_x)
        if it == 1 or it == req.optimizer.iters or it % stride == 0:
            log.append(RunLogItem(iter=it, best_score=float(pso.gbest_val)))

    best_pairs = _build_pairs(pso.gbest, N, req.constraints, kind)
    net = make_rc_lowpass_netlist(best_pairs, req.interfaces.rs_ohm, req.interfaces.rl_ohm)
    f, mag, ph, simlog = run_ac(net, f_start, f_stop, ac_points, out_node=out_node, in_node=in_node)
    score, metrics = score_fn(f, mag, fp, ap, fs, a_s)
    # normalize plot magnitude to DC baseline (same idea as scoring)
    dc_gain_db = metrics.get("dc_gain_db", 0.0)
    mag_plot = [m - dc_gain_db for m in mag]


    if metrics.get("sb_violation", 0) > 0:
        findings.append(
            RuleFinding(
                code="WARN_STOPBAND_NOT_MET",
                severity="WARN",
                message="Stopband not fully met by best found design.",
                suggestion="Increase stages_max or optimizer iters/particles, or relax As.",
            )
        )
    if metrics.get("pb_violation", 0) > 0:
        findings.append(
            RuleFinding(
                code="WARN_PASSBAND_NOT_MET",
                severity="WARN",
                message="Passband not fully met by best found design.",
                suggestion="Increase stages or relax Ap.",
            )
        )

    return RunResult(
        project=req.project,
        topology_id=req.topology_id,
        stages=N,
        stage_values=stage_values_from_pairs(best_pairs),
        score=float(score),
        metrics=metrics,
        netlist=net,
        plots={"frequency_hz": f, "magnitude_db": mag_plot, "phase_deg": ph},
        findings=findings,
        log=log,
        simlog=simlog,
    )
