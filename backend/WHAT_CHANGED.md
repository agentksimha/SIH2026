# 📢 Backend — What Changed & Developer Guide

Hey teammate! 👋 Here is a quick orientation on what was created in the `backend/` directory, how it connects to the rest of the project, and what you can build next.

---

## 1. What Is This Backend Folder?

This directory is an **Express.js API Gateway** running on **port 5000**. 

Its role in the architecture is to sit between:
- **Frontend** (Next.js on port 3000)
- **ML Service** (FastAPI / Gemini on port 8000)

```
[ Next.js Frontend (Port 3000) ]
              │
              ▼
[ Express API Gateway (Port 5000) ]  ← THIS DIRECTORY
              │
              ▼
[ Python ML Service (Port 8000) ]
```

---

## 2. Directory Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── documentController.js  ← Handles uploads & forwards to ML service
│   │   ├── queryController.js     ← Forwards RAG chat queries to ML service
│   │   └── reportController.js    ← Serves pre-cached BCCL Jharia mock report
│   ├── middleware/
│   │   └── upload.js              ← Multer file validator (PDF, Excel, 50MB limit)
│   ├── routes/
│   │   ├── documents.js           ← POST /api/v1/documents/upload
│   │   ├── query.js               ← POST /api/v1/query
│   │   └── reports.js             ← GET /api/v1/reports/mock
│   ├── services/
│   │   └── .gitkeep               ← Place business logic / external helpers here
│   └── server.js                  ← Express server entry point (CORS, Morgan, JSON)
├── .env.example                   ← Port & ML service URL config
├── package.json                   ← Node dependencies (express, cors, multer, axios)
├── README.md                      ← Detailed technical documentation
└── WHAT_CHANGED.md                ← This guide!
```

---

## 3. Current Endpoints Overview

| Method | Endpoint | What It Does | Current Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/documents/upload` | Multipart file upload via Multer → streams to ML service `/process-document` | Functional with offline fallback |
| `POST` | `/api/v1/query` | Proxies user query `{ query, context_doc }` to ML service `/query` | Functional with offline fallback |
| `GET` | `/api/v1/reports/mock` | Returns full BCCL Jharia Basin mock report (KPIs, word cloud, pit breakdown) | Complete offline seed |
| `GET` | `/api/health` | Gateway health check | Functional |

> **Offline-First Resilience**: Both `/upload` and `/query` are wrapped in try/catch blocks. If the ML service on port 8000 is stopped or down, the gateway gracefully returns fallback data instead of crashing!

---

## 4. How to Run Locally

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start in development mode (with auto-reload)
npm run dev
```

The gateway will start on **`http://localhost:5000`**.

---

## 5. What You Can Work on Next (Backend Roadmap)

Right now, the backend is a stateless proxy. Here are impactful features you can build:

1. **Add Database Persistence (SQLite or MongoDB)**:
   - Save uploaded file metadata (filename, upload date, file size, processing status).
   - Save chat conversation history so users can resume past sessions.
   - Save custom workspaces/notebooks (e.g. "BCCL Jharia", "ECL Raniganj").

2. **Add Simple Authentication**:
   - Add `/api/v1/auth/login` supporting the 3 user roles: *Ministry Official*, *Surveyor*, *Subsidiary Manager*.
   - Include a 1-click demo bypass login for presentations.

3. **PDF Export Endpoint**:
   - Add a route `GET /api/v1/reports/:id/export-pdf` that formats an official report docket for download.

4. **Connect Frontend to Gateway**:
   - Replace the static imports in the frontend with `fetch('http://localhost:5000/api/v1/...')` to make the entire stack fully live!

Everything is set up cleanly with standard Express controllers and routes so you can dive right in! 🚀
