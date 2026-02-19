from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import io, zipfile, json

from app.models import ParseRequest, ParsedDraft, SuggestRequest, SuggestResponse, RunRequest, RunResult, ExportZipRequest
from app.parser import parse_free_text
from app.llm import gemini_parse_to_draft
from app.engine import suggest_topologies, run_optimization

router = APIRouter()

@router.post("/parse_request", response_model=ParsedDraft)
def parse_request(req: ParseRequest):
    return parse_free_text(req.text)

@router.post("/llm/parse", response_model=ParsedDraft)
async def llm_parse(req: ParseRequest):
    draft, err, raw = await gemini_parse_to_draft(req.text)
    if err:
        # return useful error with raw snippet
        raise HTTPException(status_code=400, detail={"message": err, "raw": raw})
    return draft

@router.post("/topologies/suggest", response_model=SuggestResponse)
def topologies_suggest(req: SuggestRequest):
    ranked = suggest_topologies(req)
    return SuggestResponse(ranked=ranked)

@router.post("/optimize/run", response_model=RunResult)
def optimize_run(req: RunRequest):
    try:
        return run_optimization(req)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/export_zip")
def export_zip(req: ExportZipRequest):
    r = req.result
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("netlist.cir", r.netlist)

        report = []
        report += [f"# {r.project.name}", "", f"- Topology: {r.topology_id}", f"- Stages: {r.stages}", f"- Score: {r.score:.4f}", ""]
        report.append("## Metrics")
        for k,v in r.metrics.items():
            report.append(f"- {k}: {v}")
        report += ["", "## Stages"]
        for s in r.stage_values:
            report.append(f"- Stage {s.index}: R={s.r_ohm:.6g}Ω, C={s.c_f:.6e}F, fc_stage={s.fc_stage_hz:.2f}Hz")
        report += ["", "## Findings"]
        for f in r.findings:
            report.append(f"- [{f.severity}] {f.code}: {f.message}")
            if f.suggestion:
                report.append(f"  - Suggestion: {f.suggestion}")
        z.writestr("report.md", "\n".join(report))

        bom = ["refdes,kind,value,value_numeric"]
        for s in r.stage_values:
            bom.append(f"R{s.index},R,{s.r_ohm:.6g} Ohm,{s.r_ohm}")
            bom.append(f"C{s.index},C,{s.c_f:.6e} F,{s.c_f}")
        z.writestr("bom.csv", "\n".join(bom))

        z.writestr("plots.json", json.dumps(r.plots))
        z.writestr("run_log.json", json.dumps([x.model_dump() for x in r.log], indent=2))

    buf.seek(0)
    return StreamingResponse(buf, media_type="application/zip", headers={"Content-Disposition": "attachment; filename=rc_lowpass_result.zip"})
