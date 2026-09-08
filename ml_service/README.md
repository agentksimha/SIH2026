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
| `POST` | `/process-document` | Ingests uploaded PDF or Excel document, extracts text/tables, executes multi-agent analysis, and returns structured summary, KPIs, word cloud, and topics. | `multipart/form-data`<br>`file`: binary file (`.pdf`, `.xlsx`) | ```json<br>{<br>  "summary": "Executive brief...",<br>  "kpis": {<br>    "coalProductionMT": 14.82,<br>    "overburdenRemovalMCuM": 32.14,<br>    "strippingRatio": 2.16,<br>    "inferredReservesMT": 184.5<br>  },<br>  "wordcloud": [<br>    {"value": "Overburden", "count": 64},<br>    {"value": "Stripping Ratio", "count": 48}<br>  ],<br>  "topics": [<br>    {"name": "Strata Stability", "status": "High Stability"},<br>    {"name": "Environmental Clearance", "status": "Pending MoEFCC"}<br>  ]<br>}<br>``` |
| `POST` | `/query` | Verifiable RAG Q&A for geological and parliamentary queries. Returns synthesized response with strict page number and document citations. | `application/json`<br>```json<br>{<br>  "query": "What are the inferred coking coal reserves?",<br>  "context_doc": "BCCL_Q3_Report.pdf"<br>}<br>``` | ```json<br>{<br>  "answer": "The inferred reserves across Seams X, XI, and XII stand at 184.5 MT...",<br>  "citations": [<br>    {"page": 14, "source": "BCCL Quarterly Geological Report Q3"}<br>  ]<br>}<br>``` |
| `GET` | `/health` | Health and readiness check endpoint. | None | ```json<br>{"status": "ok", "service": "CMPDI GeoReport ML Service"}<br>``` |

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

### Step 4: Build Query Agent with Citation Tracking (`agents/query_agent.py`)
- **Assignee:** ML Engineer 2
- **File:** `agents/query_agent.py`
- **Tasks:**
  - Implement page-level chunking and vector indexing (using FAISS + `sentence-transformers` or Gemini embeddings).
  - Ingest user query and retrieve top-$k$ relevant page chunks.
  - Prompt Gemini to answer parliamentary inquiries **only** using retrieved context and strictly emit citations matching `{"page": int, "source": str}`.

### Step 5: Wire Agents into FastAPI Endpoints
- **Assignees:** ML Engineers 1 & 2
- **File:** `ml_service/main.py`
- **Tasks:**
  - Replace static mock responses in `/process-document` with:
    ```python
    parsed_pages = extract_pdf_content(temp_file_path)
    summary_and_kpis = await report_agent.analyze(parsed_pages)
    topics_and_wc = await topic_agent.analyze(parsed_pages)
    ```
  - Replace static mock responses in `/query` with:
    ```python
    response = await query_agent.answer(request.query, request.context_doc)
    ```
  - Maintain the fallback return if Gemini API hits rate limits or network issues.

---

## 6. Legacy Reference (`legacy/`)

The `legacy/` directory preserves the initial prototype built during Phase 1:
- `legacy/agent.py`: Demonstrates earlier prompt chains, LangChain/FAISS vector retrieval scripts, and custom summary loops.
- `legacy/main.py`: The standalone prototype web/CLI entrypoint.
- `legacy/rss_feed.py`: Helper script for scraping Coal India news and press releases.

> **Guidance for Developers:** Use `legacy/` as an architectural reference for prompt wording and domain terminology, but write clean, modular, async code conforming to FastAPI and the modern Gemini SDK in `agents/` and `parsers/`.

---

## 7. Action Items for ML Developers (Using `cil_rag_pipeline2.zip`)

Hey ML teammate! An existing working RAG pipeline was uploaded to `ml_service/cil_rag_pipeline2.zip`. You can directly utilize it instead of starting from scratch!

### What is Inside `cil_rag_pipeline2.zip`:
```
cil_rag_pipeline/
└── cil_rag/
    ├── ingestion/
    │   ├── chunker.py           # Document chunking logic
    │   ├── vision_extract.py    # Vision-based page extraction using Gemini
    │   ├── index_builder.py     # Builds hybrid vector & keyword index
    │   ├── ingest_pipeline.py   # Full ingestion pipeline
    │   └── sqlite_store.py      # SQLite document store
    ├── query/
    │   ├── query_pipeline.py    # Hybrid search pipeline
    │   ├── router.py            # Routes queries (direct vs RAG)
    │   ├── rrf.py               # Reciprocal Rank Fusion ranking
    │   └── answer.py            # Gemini answer generation with citations
    ├── data/
    │   ├── index.pkl            # Pre-indexed BCCL embeddings
    │   └── page_images/         # Extracted page PNGs
    └── demo_query.py            # Standalone test runner
```

### Action Items to Complete:
1. **Unzip the pipeline**:
   ```bash
   cd ml_service
   # Extract the zip file:
   python -c "import zipfile; zipfile.ZipFile('cil_rag_pipeline2.zip').extractall('.')"
   ```
2. **Wire Query into `main.py`**:
   - In `ml_service/main.py`, import `QueryPipeline` from `cil_rag.query.query_pipeline`:
     ```python
     from cil_rag.query.query_pipeline import QueryPipeline
     pipeline = QueryPipeline()
     ```
   - In `@app.post("/query")`, call `pipeline.run(request.query)` to return the real Gemini response with page citations!
3. **Wire Document Processing into `main.py`**:
   - In `@app.post("/process-document")`, call `ingest_pipeline` on the uploaded temporary file to extract sections, KPIs, and generate embeddings.
4. **Test the endpoints**:
   - Run `uvicorn main:app --reload --port 8000` and test with `curl` or open `http://localhost:8000/docs`.
