# CMPDI GeoReport AI â Project Scaffolding & System Directives
**Problem Statement ID:** 26023 | **Ministry of Coal / Coal India Limited (CMPDI)**  
**Objective for Agent / Anti-Gravity:** Clean up the root directory, refactor the existing code into a structured monorepo, and set up the full backend and ML service environments.

---

## 1. Immediate Root Restructuring Task
The current repository root contains legacy loose files (`agent.py`, `rss_feed.py`, `main.py`, `Dockerfile`, `requirements (2).txt`).
Execute the following refactoring steps immediately:

1. Create the target directory tree:
   mkdir -p frontend backend/src/{controllers,routes,middleware,services} ml_service/{parsers,agents,legacy} sample_data docs/architecture

2. Move legacy files into ml_service/:
   - Move rss_feed.py and agent.py into ml_service/legacy/ (archived reference).
   - Move "requirements (2).txt" to ml_service/requirements.txt.
   - Move Dockerfile to ml_service/Dockerfile.

3. Retain in root:
   - CLAUDE.md
   - design.md
   - README.md

---

## 2. Target Monorepo Architecture
SIH2026/
âââ frontend/                     # Next.js 14 (App Router) + TypeScript + Tailwind CSS
âââ backend/                      # Node.js / Express API Gateway (Port 5000)
âââ ml_service/                   # Python FastAPI & Gemini Multi-Agent Engine (Port 8000)
âââ sample_data/                  # Seed data for offline hackathon fallback
âââ docs/                         # Presentation assets for Public Speaker & PPT lead

---

## 3. Automated Code Scaffolding Directives

### A. Backend (backend/src/server.js)
Create an Express server with CORS enabled:
- POST /api/v1/documents/upload: Handles multipart PDF/Excel upload with Multer, saves to /tmp, forwards to ML service.
- GET /api/v1/reports/mock: Returns pre-cached BCCL Jharia Basin data for instant offline demo fallback.
- POST /api/v1/query: Forwards parliamentary queries to the ML FastAPI agent.

### B. ML Service (ml_service/main.py)
Set up a clean FastAPI application exposing:
- POST /process-document: Ingests uploaded PDF, extracts text, calls report_agent.py and topic_agent.py, and returns:
  {
    "summary": "Executive geological brief text...",
    "kpis": {
      "coalProductionMT": 14.82,
      "overburdenRemovalMCuM": 32.14,
      "strippingRatio": 2.16,
      "inferredReservesMT": 184.5
    },
    "wordcloud": [
      {"value": "Overburden", "count": 64},
      {"value": "Stripping Ratio", "count": 48},
      {"value": "Coking Coal", "count": 42},
      {"value": "Opencast", "count": 39},
      {"value": "Seam XII", "count": 31}
    ],
    "topics": [
      {"name": "Strata Stability", "status": "High Stability"},
      {"name": "Environmental Clearance", "status": "Pending MoEFCC"}
    ]
  }
- POST /query: Accepts {"query": string, "context_doc": string} and returns {"answer": string, "citations": [{"page": 14, "source": "BCCL Report"}]}.

### C. Offline Fallback Seed (sample_data/mock_bccl_report.json)
Create realistic mock data matching the prototype screens (BCCL Jharia Opencast, Pit 1 to 6 production metrics, 14.82 MT, 32.14 M.Cu.M OBR) so the entire web interface works seamlessly without internet or live API keys.


