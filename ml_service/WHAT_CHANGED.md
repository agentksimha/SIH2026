# 📢 ML Service — What Changed & Developer Guide

Hey teammate! 👋 If you're wondering where your files went after the repository cleanup, **don't panic — nothing was deleted!**

We restructured the repository into a clean monorepo architecture (`frontend/`, `backend/`, `ml_service/`) for the hackathon submission. Here is a quick guide so you know exactly where everything is and what to work on next.

---

## 1. Where Are My Original Files?

All the original Python scripts that were sitting loose in the root folder were safely moved into `ml_service/legacy/`. You can open and reference them anytime:

| Original File (Root) | Current Location | Description |
| :--- | :--- | :--- |
| `agent.py` | `ml_service/legacy/agent.py` | Your FAISS vectorstore + Gemini RAG logic |
| `rss_feed.py` | `ml_service/legacy/rss_feed.py` | DGMS news feed scraper |
| `main.py` | `ml_service/legacy/main.py` | Original FastAPI app with SQLite L2 cache |
| `Dockerfile` | `ml_service/Dockerfile` | Docker setup for the ML service |
| `requirements (2).txt` | `ml_service/requirements.txt` | Cleaned up & renamed requirements file |

---

## 2. What New Folders Were Added?

We created modular folders inside `ml_service/` to organize the pipeline according to the problem statement:

```
ml_service/
├── agents/              ← Put Gemini multi-agent logic here
│   └── __init__.py
├── parsers/             ← Put PDF & Excel parsing logic here
│   └── __init__.py
├── legacy/              ← YOUR ORIGINAL SCRIPTS (agent.py, main.py, rss_feed.py)
│   ├── __init__.py
│   ├── agent.py
│   ├── main.py
│   └── rss_feed.py
├── main.py              ← New clean FastAPI entry point (with starter endpoints)
├── requirements.txt     ← Dependencies
├── .env.example         ← API key template
├── Dockerfile           ← Container configuration
├── README.md            ← In-depth technical documentation
└── WHAT_CHANGED.md      ← This guide!
```

---

## 3. What Does the New `main.py` Do?

The new `ml_service/main.py` is a clean FastAPI app running on **port 8000** that matches what the backend and frontend expect:

1. **`POST /process-document`**: Accepts an uploaded PDF/Excel file, extracts content, and returns:
   - Executive geological summary
   - Key Mining KPIs (`coalProductionMT`, `overburdenRemovalMCuM`, `strippingRatio`, etc.)
   - Word cloud keywords with frequencies
   - Statutory topic tags (e.g., Strata Stability, Environmental Clearance)
   *(Currently returns realistic BCCL Jharia mock data so the frontend works out-of-the-box)*

2. **`POST /query`**: Accepts `{ "query": "...", "context_doc": "..." }` and returns an answer with verifiable page-level source citations.

3. **`GET /health`**: Health check.

---

## 4. How to Run Locally

```bash
# 1. Navigate to the ML directory
cd ml_service

# 2. Create and activate a virtual environment (recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up your environment variables
cp .env.example .env
# Open .env and add your GEMINI_API_KEY

# 5. Start the server
uvicorn main:app --reload --port 8000
```

The interactive Swagger API documentation will be available at: **`http://localhost:8000/docs`**

---

## 5. What You Can Work on Next (ML Roadmap)

1. **Extract text in `parsers/`**: Create a `pdf_parser.py` (using PyPDF/pdfplumber) to extract text and tables from uploaded mining PDFs.
2. **Build `agents/report_agent.py`**: Take your Gemini prompt logic from `legacy/agent.py` and generate structured JSON outputs (KPIs + summary).
3. **Build `agents/topic_agent.py`**: Extract top keywords (for the word cloud) and categorize operational themes.
4. **Wire it into `main.py`**: Replace the starter mock responses in `main.py` with calls to your new agent functions!

Your hard work from Phase 1 is completely preserved in `legacy/`. You're in a great spot to modularize it! 🚀
