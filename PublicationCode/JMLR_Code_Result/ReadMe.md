# Capability-Aware Imbalance in Composite Decision Systems: An Optimal Transport View

**Authors:** Hadi Sadoghi Yazdi  
**Status:** Under review (JMLR 2026)

## Overview

This work reframes **structural imbalance** in composite decision systems (Mixture-of-Experts, Boosting, hierarchical classifiers, distributed systems) as a natural and often *optimal* outcome rather than a flaw.

Using the lens of **Optimal Transport**, we prove that when task difficulty is heterogeneous, the cost-minimizing assignment is necessarily non-uniform — a phenomenon we call **Constructive Imbalance**.

## Key Contributions

- **Fundamental Theorem of Constructive Imbalance**: Optimal routing is non-uniform whenever task difficulty is non-uniform.
- Effective Complexity as the primal transport cost.
- Complexity attenuation via rare specialization (highly complex experts add almost zero global cost if rarely used).
- Unified framework connecting MoE routing, Boosting reweighting, load balancing, and hierarchical decomposition.
- Theoretical link between transport-optimal routing and Rademacher generalization bounds.
- Empirical validation + corrections to previous claims (harmonic mean bound, marginal cost equalization).

## Repository Contents

- `run_experiments.py` — Reproducible main script
- `results.json` — All raw experimental results

## Reproducibility

```bash
python run_experiments.py