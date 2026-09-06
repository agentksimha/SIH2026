# CMPDI GeoReport AI — SIH 2026 (PS #26023)

> **Problem Statement ID:** 26023  
> **Ministry / Organization:** Ministry of Coal / Coal India Limited (CMPDI)  
> **Project:** Intelligent Geological Reporting & Parliamentary Query System

---

## 1. Project Overview

**CMPDI GeoReport AI** is an AI-powered geological reporting, analytics, and query platform engineered for the **Central Mine Planning & Design Institute (CMPDI)** and the **Ministry of Coal, Government of India**. 

Coal exploration and geological evaluation involve processing complex, multi-hundred-page technical reports containing drill-hole stratigraphy, seam correlation data, coal quality grades, stripping ratios, and environmental clearance metrics. This system accelerates technical workflows by providing:
- **Automated Report Ingestion & Synthesis:** Extracting core executive summaries, stratigraphic overviews, and environmental assessments from raw technical PDFs and spreadsheets.
- **Geological KPI Extraction:** Precision parsing of key metrics including Gross Coal Production (MT), Overburden Removal (M.Cu.M), Composite Stripping Ratios, and Inferred/Indicated Reserves (MT).
- **Topic & Keyword Analytics:** Domain-specific word clouds and structural topic tracking (e.g., Strata Stability, Seam Gas Drainage, MoEFCC clearances).
- **Verifiable RAG Parliamentary Q&A:** Answering technical, operational, and parliamentary queries with strict, auditable page-level citations to official exploration records (e.g., BCCL Jharia Coalfield).
- **Zero-Downtime Offline Mode:** Resilient demo fallback serving pre-cached exploration data when running in offline or low-connectivity hackathon environments.

---

## 2. Monorepo Structure

```
SIH2026/
├── frontend/                     # Next.js 14 App Router, TypeScript, Tailwind CSS
│   ├── src/                      # App pages, UI components, API clients
│   ├── package.json              # Frontend scripts & dependencies
│   └── tailwind.config.ts        # Design system & color tokens
├── backend/                      # Node.js / Express.js API Gateway (Port 5000)
│   ├── src/                      # Controllers, routes, middleware, services
│   ├── .env.example              # Gateway environment template
│   ├── package.json              # Gateway dependencies
│   └── README.md                 # Backend gateway documentation
├── ml_service/                   # Python FastAPI & Gemini Multi-Agent Engine (Port 8000)
│   ├── agents/                   # Gemini report, topic, and query agents
│   ├── parsers/                  # PDF and Excel extraction modules
│   ├── legacy/                   # Phase 1 prototype code & references
│   ├── main.py                   # FastAPI service endpoints
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # ML service environment template
│   └── README.md                 # ML service documentation
├── sample_data/                  # Pre-cached BCCL Jharia Basin datasets & mock fallbacks
│   └── mock_bccl_report.json     # Standard offline demo dataset
├── docs/                         # Architecture diagrams, pitch deck assets, presentations
│   └── architecture/             # System diagrams and workflow schemas
├── CLAUDE.md                     # Engineering conventions & scaffolding directives
├── design.md                     # Comprehensive system specification
└── README.md                     # Monorepo root README
```

---

## 3. Quick Start (Running All 3 Services)

To run the complete system locally, start the three services in separate terminals:

### A. Frontend (Next.js 14) — Port 3000
```bash
cd frontend
npm install
npm run dev
```
Accessible at: [http://localhost:3000](http://localhost:3000)

### B. Backend API Gateway (Express.js) — Port 5000
```bash
cd backend
npm install
npm run dev
```
Accessible at: [http://localhost:5000](http://localhost:5000)  
Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### C. ML Service (FastAPI + Uvicorn) — Port 8000
```bash
cd ml_service
# Recommended: Create and activate a Python virtual environment
python -m venv venv
# Windows: venv\Scripts\activate | Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```
Accessible at: [http://localhost:8000](http://localhost:8000)  
API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)  
Health Check: [http://localhost:8000/health](http://localhost:8000/health)

---

## 4. Tech Stack Summary

| Layer | Technology | Key Libraries / Frameworks | Role |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 14 (App Router) | React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts | Executive geological dashboard, document upload, KPI visualization, Q&A chat |
| **Backend Gateway** | Node.js / Express.js | Express 4, Multer, Axios, Cors, Morgan, Dotenv | API gateway, request orchestration, multipart file handling, graceful offline fallbacks |
| **ML Engine** | Python 3.10+ / FastAPI | FastAPI, Uvicorn, Google GenAI SDK, PyMuPDF, pdfplumber, Pydantic | PDF/Excel text extraction, Gemini multi-agent summarization, topic modeling, RAG Q&A |
| **Foundation Models** | Google Gemini | `gemini-2.5-flash` / `gemini-1.5-pro` | Technical summarization, structured JSON schema generation, semantic citation retrieval |
| **Data & Cache** | In-Memory / File / JSON | Local filesystem staging, pre-seeded JSON cache | High-speed hackathon presentation fallback (BCCL Jharia Basin data) |

---

## 5. Team Roles & Responsibilities

| Role | Member Focus | Key Responsibilities | Primary Workspace |
| :--- | :--- | :--- | :--- |
| **Frontend Lead** | UI/UX & Client Integration | Next.js 14 dashboard UI, interactive KPI cards, file upload dropzone, citation viewer, chat interface | `frontend/` |
| **Backend API Engineer** | Gateway & System Integration | Express routes, Multer file upload pipelines, error handling, offline mode fallback logic, service proxying | `backend/` |
| **ML Engineer 1** | Ingestion & Extraction | PDF/Excel document parsing, tabular data extraction, Gemini report agent (`report_agent.py`), structured KPI formatting | `ml_service/parsers/`, `ml_service/agents/` |
| **ML Engineer 2** | RAG & Semantic Analytics | Citation-grounded Q&A agent (`query_agent.py`), topic modeling & word cloud generator (`topic_agent.py`), prompt tuning | `ml_service/agents/` |
| **Public Speaker / PPT Lead** | Presentation & Demonstration | Pitch deck, SIH problem-solution alignment, CMPDI workflow evaluation, live demonstration walkthrough | `docs/`, `sample_data/` |

---

## 6. Environment Variables

Each backend service provides a `.env.example` template. Copy these files to `.env` in their respective directories before starting.

### Backend (`backend/.env.example` → `backend/.env`)
```env
PORT=5000
ML_SERVICE_URL=http://localhost:8000
```

### ML Service (`ml_service/.env.example` → `ml_service/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=8000
```

> **Note:** The backend automatically defaults `ML_SERVICE_URL` to `http://localhost:8000` if not set. If the ML service is offline or `GEMINI_API_KEY` is not provided, the system gracefully falls back to the BCCL Jharia Basin mock data for demonstration continuity.
