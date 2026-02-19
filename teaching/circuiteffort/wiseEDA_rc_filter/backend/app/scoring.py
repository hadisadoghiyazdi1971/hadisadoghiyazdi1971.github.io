from typing import List, Dict, Tuple
import math


def _interp_logx(freqs: List[float], ys: List[float], f0: float) -> float:
    """Interpolate y(f) at f0 using linear interpolation in log10(f)."""
    if not freqs or not ys or len(freqs) != len(ys):
        return 0.0
    if f0 <= freqs[0]:
        return ys[0]
    if f0 >= freqs[-1]:
        return ys[-1]

    for i in range(1, len(freqs)):
        f1 = freqs[i - 1]
        f2 = freqs[i]
        if f1 <= f0 <= f2:
            y1 = ys[i - 1]
            y2 = ys[i]
            if f1 <= 0 or f2 <= 0 or f0 <= 0:
                t = (f0 - f1) / (f2 - f1 + 1e-30)
                return y1 + t * (y2 - y1)
            x1 = math.log10(f1)
            x2 = math.log10(f2)
            x0 = math.log10(f0)
            t = (x0 - x1) / (x2 - x1 + 1e-30)
            return y1 + t * (y2 - y1)
    return ys[-1]


def _dc_reference_db(freqs: List[float], mag_db: List[float], fp: float) -> float:
    """
    Choose a low-frequency baseline (DC-ish) reference in dB.
    We average a few lowest-frequency points (safe + robust).
    """
    if not freqs or not mag_db or len(freqs) != len(mag_db):
        return 0.0

    # Prefer points clearly below passband edge, otherwise use first N points.
    f_ref_max = max(freqs[0], fp / 10.0)  # "DC-ish" region
    idxs = [i for i, f in enumerate(freqs) if f <= f_ref_max]

    if len(idxs) < 3:
        # fallback: first 5 points
        n = min(5, len(freqs))
        return sum(mag_db[:n]) / max(1, n)

    # average first up to 10 points from that region
    idxs = idxs[: min(10, len(idxs))]
    return sum(mag_db[i] for i in idxs) / max(1, len(idxs))


def area_to_target(
    freqs: List[float],
    mag_db: List[float],
    fp: float,
    ap: float,
    fs: float,
    a_s: float,
) -> Tuple[float, Dict[str, float]]:
    """
    Score response vs target using NORMALIZED magnitude:

      mag_db_norm = mag_db - dc_gain_db

    So passband targets and stopband attenuation are measured relative
    to the circuit's low-frequency baseline (option A).
    """
    if not freqs or not mag_db or len(freqs) != len(mag_db):
        return 1e12, {
            "dc_gain_db": 0.0,
            "loss_at_fp_db": 1e6,
            "att_at_fs_db": 0.0,
            "pb_violation": 1e6,
            "sb_violation": 1e6,
        }

    dc_gain_db = _dc_reference_db(freqs, mag_db, fp)
    mag_norm = [m - dc_gain_db for m in mag_db]

    pb = 0.0
    sb = 0.0

    # Targets in normalized domain:
    # passband (f<=fp): mag_norm >= -ap
    # stopband (f>=fs): mag_norm <= -a_s
    for f, mdb in zip(freqs, mag_norm):
        if f <= fp:
            pb += max(0.0, (-ap) - mdb)
        if f >= fs:
            sb += max(0.0, mdb - (-a_s))

    score = pb + 3.0 * sb

    m_fp = _interp_logx(freqs, mag_norm, fp)
    m_fs = _interp_logx(freqs, mag_norm, fs)

    metrics = {
        "dc_gain_db": float(dc_gain_db),
        "loss_at_fp_db": float(max(0.0, -m_fp)),
        "att_at_fs_db": float(max(0.0, -m_fs)),
        "pb_violation": float(pb),
        "sb_violation": float(sb),
    }
    return score, metrics


def weighted_penalty(
    freqs: List[float],
    mag_db: List[float],
    fp: float,
    ap: float,
    fs: float,
    a_s: float,
) -> Tuple[float, Dict[str, float]]:
    # Base score: integrated violations (normalized by DC-ish reference)
    s, m = area_to_target(freqs, mag_db, fp, ap, fs, a_s)

    # Hard constraints at the key edges:
    # - Passband MUST meet Ap at fp
    # - Stopband MUST meet As at fs
    pb_edge = max(0.0, m["loss_at_fp_db"] - ap)      # >0 means passband spec violated
    sb_edge = max(0.0, a_s - m["att_at_fs_db"])      # >0 means stopband spec violated

    # Quadratic penalties (push optimizer strongly to satisfy constraints)
    # Tune these weights if needed:
    s += 200.0 * (pb_edge ** 2)
    s += 200.0 * (sb_edge ** 2)

    # Also keep a linear term for stopband (helps early guidance)
    s += 20.0 * sb_edge

    return s, m
