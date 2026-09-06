"""
CMPDI GeoReport AI — ML Service
FastAPI application exposing document processing and query endpoints.
Problem Statement ID: 26023 | Ministry of Coal / CIL (CMPDI)
"""

import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="CMPDI GeoReport AI — ML Service",
    description="Gemini Multi-Agent Engine for geological report generation, topic identification, and parliamentary Q&A.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response Models ──────────────────────────────────────────

class QueryRequest(BaseModel):
    query: str
    context_doc: Optional[str] = ""


class Citation(BaseModel):
    page: int
    source: str


class QueryResponse(BaseModel):
    answer: str
    citations: list[Citation] = []


# ── Endpoints ──────────────────────────────────────────────────────────

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "CMPDI GeoReport ML Service"}


@app.post("/process-document")
async def process_document(file: UploadFile = File(...)):
    """
    Ingests uploaded PDF, extracts text, calls report_agent and topic_agent,
    and returns structured summary, KPIs, wordcloud, and topics.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # TODO: Implement actual PDF text extraction and agent pipeline
    # For now, return realistic mock data matching BCCL Jharia prototype screens

    return {
        "summary": (
            "Bharat Coking Coal Limited (BCCL) Jharia Opencast operations reported "
            "aggregate coal production of 14.82 Million Tonnes (MT) for Q3 FY2025-26, "
            "reflecting a 6.2% year-over-year increase. Overburden removal reached "
            "32.14 Million Cubic Metres (M.Cu.M), maintaining the composite stripping "
            "ratio at 2.16 against a target of 2.10. Geological surveys of Seams X, XI, "
            "and XII indicate inferred reserves of approximately 184.5 MT of coking coal."
        ),
        "kpis": {
            "coalProductionMT": 14.82,
            "overburdenRemovalMCuM": 32.14,
            "strippingRatio": 2.16,
            "inferredReservesMT": 184.5,
        },
        "wordcloud": [
            {"value": "Overburden", "count": 64},
            {"value": "Stripping Ratio", "count": 48},
            {"value": "Coking Coal", "count": 42},
            {"value": "Opencast", "count": 39},
            {"value": "Seam XII", "count": 31},
        ],
        "topics": [
            {"name": "Strata Stability", "status": "High Stability"},
            {"name": "Environmental Clearance", "status": "Pending MoEFCC"},
        ],
    }


@app.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    """
    Accepts a query and optional context document identifier.
    Returns an answer with verifiable source citations.
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # TODO: Implement actual RAG pipeline with Gemini
    # For now, return a realistic placeholder

    return QueryResponse(
        answer=(
            "Based on the BCCL Quarterly Geological Report (Q3 FY2025-26), "
            "the total coking coal reserves inferred across Seams X, XI, and XII "
            "in the Jharia Coalfield stand at approximately 184.5 Million Tonnes. "
            "Pit-wise production analysis indicates Pit 1 exceeded its target by 4.3%, "
            "while Pit 2 experienced a 3.6% shortfall attributed to monsoon-related "
            "water ingress."
        ),
        citations=[
            Citation(page=14, source="BCCL Quarterly Geological Report Q3"),
            Citation(page=28, source="BCCL Production Returns FY2025-26"),
        ],
    )
