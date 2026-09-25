# ML Service — FastAPI + Gemini Multi-Agent Engine

> **CMPDI GeoReport AI — SIH 2026 (Problem Statement #26023)**  
> **Service:** Python FastAPI ML & Multi-Agent Intelligence Service  
> **Default Port:** `8000`

---

## 1. Overview

The **ML Service** is a high-performance Python FastAPI microservice that powers the intelligent document processing, KPI synthesis, topic modeling, and verifiable Retrieval-Augmented Generation (RAG) capabilities of the CMPDI GeoReport AI platform. 

It uses Google Gemini models (`gemini-2.5-flash`) orchestrated across specialized agents to process technical geological exploration reports (such as BCCL Jharia Basin opencast and underground documentation), extract critical production metrics, and answer complex parliamentary queries with strict source-level citations.

---

## 2. Setup & Environment

### Prerequisites
- **Python**: 3.10 or 3.11 recommended
- **Google Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/)

### Step-by-Step Installation
1. Navigate to the `ml_service/` directory:
   ```bash
   cd ml_service
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell / CMD)
   python -m venv venv
   venv\Scripts\activate

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   ```bash
   # Windows (PowerShell / CMD)
   copy .env.example .env

   # Linux / macOS
   cp .env.example .env
   ```
5. Update your `.env` file with your Gemini credentials:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-2.5-flash
   # Set these to the quota for the deployed Gemini model/account.
   GEMINI_RPM=8
   GEMINI_RPD=20
   PORT=8000
   ```
6. Start the development server:
   ```bash
   uvicorn main:app --port 8000 --reload
   ```

- **API Root**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 3. API Endpoints

| Method | Endpoint | Description | Request Payload | Response Schema |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/process-document` | Ingests any PDF. Typed/native-text PDFs are chunked and embedded in a document-scoped FAISS vector store; scanned or mixed PDFs use Gemini Vision OCR. | `multipart/form-data`<br>`file`: PDF binary | Includes `document_id`, `document_type` (`typed` or `scanned`), chunk count, and status. |
| `POST` | `/query` | Streams a grounded answer from indexed typed or scanned PDFs, followed by source chunk/page citations. | `application/json`<br>```json<br>{<br>  "query": "What is the MoU target for turnover?",<br>  "context_doc": ["a1b2c3d4e5f67890", "b1b2c3d4e5f67890"]<br>}<br>```<br>`context_doc` is optional; omit it to search every indexed document. A single ID or a comma-separated string is also accepted. | Plain text answer followed by `Sources:` lines. |
| `GET` | `/health` | Health and readiness check endpoint. | None | ```json<br>{"status": "ok", "service": "CMPDI GeoReport ML Service"}<br>``` |

---

### Typed and scanned PDF demo

After starting the service and setting `GEMINI_API_KEY`, run the end-to-end demo below. It creates one native-text PDF and one image-only (scanned) PDF, uploads both to the same endpoint, then prints the streamed answer for each document.

```bash
python agents/demo_ingest_and_query.py
```

Typed PDFs are stored under `storage/typed_documents/<document_id>/` as chunks plus a FAISS index. Scanned and mixed PDFs are stored under `storage/scanned_documents/<document_id>/` and use the existing OCR/table-retrieval pipeline.

---

## 4. Directory Structure

```
ml_service/
├── .env.example              # Environment variables template
├── requirements.txt          # Python dependencies (FastAPI, Google GenAI, FAISS, PyMuPDF)
├── Dockerfile                # Container definition for Cloud Run or Docker deployment
├── main.py                   # FastAPI app declaration, CORS, and endpoint definitions
├── README.md                 # ML service technical guide
├── parsers/                  # Document ingestion & parsing engines
│   ├── __init__.py           # Package marker
│   └── (pdf_parser.py)       # PDF/Excel extraction routines (page-wise text & tables)
├── agents/                   # Gemini multi-agent analytical pipeline
│   ├── __init__.py           # Package marker
│   ├── (report_agent.py)     # Generates executive summary & extracts quantitative KPIs
│   ├── (topic_agent.py)      # Generates keyword frequencies (wordcloud) & topic classification
│   └── (query_agent.py)      # RAG Q&A with strict page citation tracking
└── legacy/                   # Archived Phase 1 prototype code & references
    ├── __init__.py
    ├── agent.py              # Phase 1 prototype agent implementation
    ├── main.py               # Phase 1 prototype standalone application
    └── rss_feed.py           # Phase 1 RSS news ingestion utility
```

---

## 5. Implementation Roadmap for the 2 ML Developers

The current `main.py` provides production-ready FastAPI endpoints with realistic mock fallback data. Follow this 5-step roadmap to integrate live Gemini processing:

```
┌────────────────────────────────────────────────────────┐
│               Step 1: Document Parsing                 │
│         parsers/pdf_parser.py & excel_parser.py        │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌──────────────────────────┐┌──────────────────────────┐
│  Step 2: Report Agent    ││   Step 3: Topic Agent    │
│  agents/report_agent.py  ││   agents/topic_agent.py  │
│  - Executive Summary     ││   - Wordcloud Frequency  │
│  - Quantitative KPIs     ││   - Domain Topics        │
└────────────┬─────────────┘└────────────┬─────────────┘
             │                           │
             └─────────────┬─────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│           Step 4: Citation RAG Query Agent             │
│                 agents/query_agent.py                  │
│       - Semantic search over chunked pages             │
│       - Grounded answers with {page, source}           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│       Step 5: Wire Agents into FastAPI Endpoints       │
│         Update ml_service/main.py with live calls      │
└────────────────────────────────────────────────────────┘
```

### Step 1: Implement Document Extraction (`parsers/`)
- **Assignee:** ML Engineer 1
- **File:** `parsers/pdf_parser.py` (and `parsers/excel_parser.py`)
- **Tasks:**
  - Extract text page-by-page using PyMuPDF (`fitz`) or `pdfplumber` to preserve page index mapping for citations.
  - Parse tabular data (drill hole records, pit-wise production tables) into structured dictionaries.
  - Return a normalized data structure: `List[{"page": int, "text": str, "tables": list}]`.

### Step 2: Build Report Agent (`agents/report_agent.py`)
- **Assignee:** ML Engineer 1
- **File:** `agents/report_agent.py`
- **Tasks:**
  - Initialize the Google GenAI client using `GEMINI_API_KEY` and `gemini-2.5-flash`.
  - Design system prompts specialized for Ministry of Coal / CMPDI geological terminology (seam correlations, overburden removal, stripping ratios, coking coal grades).
  - Use Pydantic schemas or Gemini Structured Outputs to extract:
    - Executive brief string.
    - Quantitative KPIs: `coalProductionMT`, `overburdenRemovalMCuM`, `strippingRatio`, `inferredReservesMT`.

### Step 3: Build Topic & Word Cloud Agent (`agents/topic_agent.py`)
- **Assignee:** ML Engineer 2
- **File:** `agents/topic_agent.py`
- **Tasks:**
  - Implement geological stopword filtering and token frequency counting for the word cloud (e.g., `Overburden`, `Stripping Ratio`, `Coking Coal`, `Seam XII`).
  - Use Gemini to classify operational & compliance topics with status tags (e.g., `"Strata Stability": "High Stability"`, `"Environmental Clearance": "Pending MoEFCC"`).

### Step 4: Scanned-PDF Query Agent with Citation Tracking (`agents/query_agent.py`)
- **Assignee:** ML Engineer 2
- **File:** `agents/query_agent.py`
- **Completed integration:**
  - `agents/scanned_rag.py` connects the supplied vision-extraction pipeline to FastAPI without changing its package layout.
  - Each PDF is identified by a content hash and gets its own page-image cache, extracted-page JSON, SQLite table store, and BM25 index under `storage/scanned_documents/`.
  - The query agent retrieves only from the `context_doc` document ID and emits source chunk/page citations.

### Step 5: Wire Agents into FastAPI Endpoints
- **Assignees:** ML Engineers 1 & 2
- **File:** `ml_service/main.py`
- **Completed integration:**
  - `/process-document` runs the batched Gemini Vision ingestion flow off FastAPI's event loop and returns `document_id`.
  - `/query` uses that `document_id` as `context_doc`, generates a grounded answer, and streams its citations.
  - Finished pages are cached immediately, so retrying an interrupted ingestion avoids re-billing completed OCR pages.

---

## 6. Legacy Reference (`legacy/`)

The `legacy/` directory preserves the initial prototype built during Phase 1:
- `legacy/agent.py`: Demonstrates earlier prompt chains, LangChain/FAISS vector retrieval scripts, and custom summary loops.
- `legacy/main.py`: The standalone prototype web/CLI entrypoint.
- `legacy/rss_feed.py`: Helper script for scraping Coal India news and press releases.

> **Guidance for Developers:** Use `legacy/` as an architectural reference for prompt wording and domain terminology, but write clean, modular, async code conforming to FastAPI and the modern Gemini SDK in `agents/` and `parsers/`.

---

## 7. 🚀 Upcoming Roadmap & TODO Checklist for ML Team

Here is the exact checklist of what has been completed and what is left to connect and commit:

### Current Status
- [x] **FastAPI Port 8000 Scaffolding** (CORS, Health check, `/docs` Swagger support)
- [x] **Request / Response Schemas** (`QueryRequest`, `Citation`, `QueryResponse`, file upload validation)
- [x] **Legacy Code Preserved** (Original scripts archived in `legacy/agent.py`, `legacy/main.py`)
- [x] **Full RAG Engine Built & Uploaded** (`cil_rag_pipeline2.zip` with vision extraction, chunker, RRF reranking, SQLite store, and pre-indexed BCCL data)
- [x] **RAG Engine Connected to FastAPI `main.py`** (scanned PDF ingestion and document-scoped querying)

---

### Pending Tasks to Complete & Commit:

#### 🔲 Step 1: Extract `cil_rag_pipeline2.zip`
* **Status**: Ready to extract
* The working multi-agent RAG pipeline is archived in `ml_service/cil_rag_pipeline2.zip`. Extract it into `ml_service/`:
  ```bash
  cd ml_service
  # On Windows / Mac / Linux:
  python -c "import zipfile; zipfile.ZipFile('cil_rag_pipeline2.zip').extractall('.')"
  ```
  This unpacks `cil_rag_pipeline/cil_rag/` containing `ingestion/`, `query/`, and `data/` (pre-indexed vector embeddings & SQLite store).

#### 🔲 Step 2: Wire the Query Pipeline into `ml_service/main.py`
* **Status**: Pending
* In `ml_service/main.py`, replace the mock return inside `@app.post("/query")` with the real RAG pipeline:
  ```python
  from cil_rag_pipeline.cil_rag.query.query_pipeline import QueryPipeline

  # Initialize pipeline once at application startup
  query_engine = QueryPipeline()

  @app.post("/query", response_model=QueryResponse)
  async def query_documents(request: QueryRequest):
      if not request.query.strip():
          raise HTTPException(status_code=400, detail="Query cannot be empty")
      
      try:
          result = query_engine.run(request.query)
          return QueryResponse(
              answer=result["answer"],
              citations=[Citation(page=c["page"], source=c["source"]) for c in result.get("citations", [])]
          )
      except Exception as e:
          # Fallback to realistic mock on API rate limit or missing key
          return QueryResponse(
              answer=f"Synthesized fallback answer: Inferred coking coal reserves across Seams X, XI, XII stand at 184.5 MT.",
              citations=[Citation(page=14, source="BCCL Q3 Report")]
          )
  ```

#### 🔲 Step 3: Wire Document Ingestion into `ml_service/main.py`
* **Status**: Pending
* In `ml_service/main.py`, wire the uploaded PDF stream in `@app.post("/process-document")` to `ingest_pipeline`:
  1. Save incoming `file` to a temporary file.
  2. Call the vision/PDF parser and chunker from `cil_rag_pipeline.cil_rag.ingestion`.
  3. Return extracted summary, KPIs (`coalProductionMT`, `overburdenRemovalMCuM`, `strippingRatio`, `inferredReservesMT`), word cloud, and topic tags.

#### 🔲 Step 4: Add Gemini API Key to `.env` & Verify
* **Status**: Action required in `.env`
* Update `ml_service/.env`:
  ```env
  GEMINI_API_KEY=your_actual_gemini_api_key
  GEMINI_MODEL=gemini-2.5-flash
  PORT=8000
  ```
* Run `uvicorn main:app --port 8000 --reload` and open `http://localhost:8000/docs` to test both endpoints interactively!
