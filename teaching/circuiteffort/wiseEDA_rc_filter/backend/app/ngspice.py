import os
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from typing import List, Tuple, Optional


@dataclass
class NgSpiceResult:
    freqs_hz: List[float]
    mag_db: List[float]
    phase_deg: List[float]
    log: str

    # Backward compatible tuple-unpack:
    def __iter__(self):
        yield self.freqs_hz
        yield self.mag_db
        yield self.phase_deg
        yield self.log


def ngspice_available() -> bool:
    return shutil.which("ngspice") is not None


def _strip_end_directive(netlist: str) -> str:
    """
    Remove any existing .end (and anything after it) so we can append .control
    safely BEFORE the final .end.
    """
    nl = netlist.strip()
    lower = nl.lower()

    idx = lower.find("\n.end")
    if idx != -1:
        return nl[:idx].rstrip()

    if lower.endswith(".end"):
        return nl[: -len(".end")].rstrip()

    return nl


def _parse_wrdata_file(path: str) -> Tuple[List[float], List[float], List[float]]:
    """
    Parse ngspice wrdata output.

    Ideal (with set wr_singlescale):
      f   mag_db   phase_deg

    Some builds produce repeated scale columns, common patterns:

    5 columns:
      f  f  0  mag_db  phase_deg

    7 columns:
      f  f  0  f  mag_db  f  phase_deg
    """
    freqs: List[float] = []
    mags: List[float] = []
    phs: List[float] = []

    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            s = line.strip()
            if not s:
                continue
            if s.startswith(("*", "#", ";")):
                continue

            parts = s.split()
            try:
                if len(parts) == 3:
                    # f, mag_db, phase_deg
                    freqs.append(float(parts[0]))
                    mags.append(float(parts[1]))
                    phs.append(float(parts[2]))
                    continue

                if len(parts) == 5:
                    # f  f  0  mag_db  phase_deg
                    freqs.append(float(parts[0]))
                    mags.append(float(parts[3]))
                    phs.append(float(parts[4]))
                    continue

                if len(parts) >= 7:
                    # f  f  0  f  mag_db  f  phase_deg
                    freqs.append(float(parts[0]))
                    mags.append(float(parts[4]))
                    phs.append(float(parts[6]))
                    continue

                # fallback (better than silently wrong)
                if len(parts) >= 2:
                    freqs.append(float(parts[0]))
                    mags.append(float(parts[-2]))
                    phs.append(float(parts[-1]))
                    continue

            except Exception:
                # ignore bad lines
                continue

    return freqs, mags, phs


def run_ac(
    netlist_text: str,
    f_start: float,
    f_stop: float,
    points: int,
    out_node: str = "out",
    in_node: str = "in",
) -> NgSpiceResult:
    """
    Run ngspice AC sweep in batch mode and extract:
      - frequency (Hz)
      - magnitude in dB of transfer: db(v(out)/v(in))
      - phase in degrees of transfer: ph(v(out)/v(in))

    Returns NgSpiceResult. Also supports tuple-unpack:
      freqs, mag_db, phase_deg, log = run_ac(...)
    """
    log = "[ngspice.py] VERSION = 2025-01-XX FIX_DB_PH\n"

    if not ngspice_available():
        raise RuntimeError("ngspice not found in PATH. Try: ngspice -v")

    # clamps
    f_start = float(max(f_start, 1e-9))
    f_stop = float(max(f_stop, f_start * 1.01))
    points = int(max(points, 10))

    with tempfile.TemporaryDirectory() as td:
        cir_path = os.path.join(td, "run.cir")
        data_path = os.path.join(td, "ac.dat")

        nl = _strip_end_directive(netlist_text)

        control = f""".control
set filetype=ascii
set wr_singlescale
ac dec {points} {f_start} {f_stop}
wrdata {data_path} frequency db(v({out_node})/v({in_node})) ph(v({out_node})/v({in_node}))
quit
.endc
"""

        full_netlist = nl.strip() + "\n\n" + control + "\n.end\n"

        with open(cir_path, "w", encoding="utf-8") as f:
            f.write(full_netlist)

        proc = subprocess.run(["ngspice", "-b", cir_path], capture_output=True, text=True)
        stdout = proc.stdout or ""
        stderr = proc.stderr or ""
        log += stdout + ("\n" + stderr if stderr else "")

        log += f"\n\n[debug] cir_path={cir_path}\n[debug] data_path={data_path}\n"
        log += f"[debug] in_node={in_node} out_node={out_node}\n"

        if proc.returncode != 0:
            raise RuntimeError(f"ngspice failed (code {proc.returncode}). Logs:\n{log[:8000]}")

        if not os.path.exists(data_path):
            raise RuntimeError(f"ngspice did not produce ac.dat. Logs:\n{log[:8000]}")

        freqs, mags, phs = _parse_wrdata_file(data_path)

        # preview file head
        try:
            preview_lines: List[str] = []
            with open(data_path, "r", encoding="utf-8", errors="ignore") as f:
                for _ in range(6):
                    line = f.readline()
                    if not line:
                        break
                    preview_lines.append(line.rstrip("\n"))
            log += "\n[ac.dat preview]\n" + "\n".join(preview_lines) + "\n"
        except Exception:
            pass

        if len(freqs) < 5:
            raise RuntimeError(f"wrdata output too small/invalid (rows={len(freqs)}). Logs:\n{log[:8000]}")

        return NgSpiceResult(freqs_hz=freqs, mag_db=mags, phase_deg=phs, log=log)
