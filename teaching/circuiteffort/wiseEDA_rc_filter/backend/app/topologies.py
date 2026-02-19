from typing import List
from app.models import Topology

TOPOLOGIES: List[Topology] = [
    Topology(
        id="rc_cascade_staggered",
        name="RC Cascade (staggered fc)",
        description="N RC sections with heuristic per-stage fc multipliers to reduce passband droop vs equal sections. Best balance for real-world RC filters",
        params={"kind": "staggered"},
    ),
    Topology(
        id="rc_cascade_equal",
        name="RC Cascade (equal sections)",
        description="N identical 1st-order RC lowpass sections cascaded. Good baseline; may need more stages for sharp specs. Simple & robust, but aggressive on passband",
        params={"kind": "equal"},
    ),
    Topology(
        id="rc_cascade_free",
        name="RC Cascade (free R,C per stage)",
        description="Each stage has independent R and C (within constraints). Optimizer searches best solution (most flexible). Maximum flexibility for advanced optimization",
        params={"kind": "free"},
    ),
]

def list_topologies() -> List[Topology]:
    return TOPOLOGIES
