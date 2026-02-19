from typing import List, Tuple
import math
from app.models import StageValue

def fc_stage(r_ohm: float, c_f: float) -> float:
    return 1.0 / (2.0 * math.pi * r_ohm * c_f)

def make_rc_lowpass_netlist(stages: List[Tuple[float, float]], rs_ohm: float, rl_ohm: float) -> str:
    lines = ["* RC Lowpass (generated)", "V1 in 0 AC 1"]
    if rs_ohm > 0:
        lines.append(f"RS in n0 {rs_ohm}")
        prev = "n0"
    else:
        prev = "in"
    for i, (r, c) in enumerate(stages, start=1):
        node = f"n{i}"
        lines.append(f"R{i} {prev} {node} {r}")
        lines.append(f"C{i} {node} 0 {c}")
        prev = node
    lines.append(f"Rout {prev} out 1e-6")
    lines.append(f"RL out 0 {rl_ohm}")
    lines.append(".end")
    return "\n".join(lines)

def stage_values_from_pairs(pairs: List[Tuple[float,float]]) -> List[StageValue]:
    return [StageValue(index=i+1, r_ohm=r, c_f=c, fc_stage_hz=fc_stage(r,c)) for i,(r,c) in enumerate(pairs)]
