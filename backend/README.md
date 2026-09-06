# Backend — Express.js API Gateway

> **CMPDI GeoReport AI — SIH 2026 (Problem Statement #26023)**  
> **Service:** Node.js / Express API Gateway & Orchestrator  
> **Default Port:** `5000`

---

## 1. Overview

The **Backend Gateway** serves as the central orchestration and proxy layer between the **Next.js frontend** and the **Python FastAPI ML service**. It handles multipart document uploads via Multer, stages files temporarily, proxies analytical requests to the ML multi-agent engine, and provides automated graceful degradation (offline fallback) whenever the ML service is unreachable.

---

## 2. Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

### Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create the environment configuration:
   ```bash
   # Windows (PowerShell / CMD)
   copy .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```
4. Verify/update configuration variables in `.env`:
   ```env
   PORT=5000
   ML_SERVICE_URL=http://localhost:8000
   ```
5. Start the service:
   ```bash
   # Development (auto-reloading with nodemon)
   npm run dev

   # Production
   npm start
   ```

The gateway will be accessible at `http://localhost:5000`.

---

## 3. API Routes

| Method | Route | Description | Request Format | Response / Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/documents/upload` | Multipart file upload via Multer → forwards stream to ML service `/process-document`. | `multipart/form-data` with field `file` (`.pdf`, `.xlsx`, `.xls`, max 50MB). | `{ message, fileName, size, summary, kpis, wordcloud, topics }` or fallback with `offline: true`. |
| `GET` | `/api/v1/reports/mock` | Returns pre-cached BCCL Jharia Basin geological report data for offline demo fallback. | None (Query / Headers optional). | Full structured report object matching prototype screens (14.82 MT coal, 32.14 M.Cu.M OBR, etc.). |
| `POST` | `/api/v1/query` | Proxies parliamentary / geological natural language queries to the ML service `/query`. | `application/json`<br>`{ "query": string, "context_doc"?: string }` | `{ "answer": string, "citations": [{ "page": number, "source": string }] }` or fallback message. |
| `GET` | `/api/health` | Gateway health check. | None | `{ "status": "ok", "service": "CMPDI GeoReport API Gateway", "timestamp": "..." }` |

---

## 4. Architecture

```
backend/
├── .env.example                  # Environment template
├── package.json                  # Express, cors, multer, axios, morgan dependencies
├── README.md                     # Backend gateway documentation
└── src/
    ├── server.js                 # Express application initialization, CORS, global middleware, route mounts
    ├── routes/                   # HTTP route definitions
    │   ├── documents.js          # POST /upload route wired with upload middleware
    │   ├── query.js              # POST /query route
    │   └── reports.js            # GET /mock route
    ├── controllers/              # Request handlers & proxy logic
    │   ├── documentController.js # Handles Multer file staging, ML forwarding, cleanup & fallback
    │   ├── queryController.js    # Forwards Q&A queries to ML service with timeout handling
    │   └── reportController.js   # Reads and returns sample_data/mock_bccl_report.json
    ├── middleware/               # Express middleware
    │   └── upload.js             # Multer storage configuration (temp disk storage & file filtering)
    └── services/                 # External service integrations and helper utilities
```

---

## 5. Key Files to Edit for Your Tasks

| Task | File Path | Description |
| :--- | :--- | :--- |
| **Route Registration** | `src/server.js` | Mount new route prefixes, configure global CORS headers, or add logging middlewares. |
| **File Upload Handling** | `src/middleware/upload.js` | Adjust allowed file mime types (`.pdf`, `.csv`, `.xlsx`), file size limits (default: 50MB), or upload destination. |
| **Document Processing Pipeline** | `src/controllers/documentController.js` | Modify how files are streamed to the Python ML service, customize response payloads, or tune timeout settings. |
| **Parliamentary Query Routing** | `src/controllers/queryController.js` | Extend query payload attributes (e.g., user role, conversation history, filter by mine pit). |
| **Offline Seed & Mock Reports** | `src/controllers/reportController.js` | Customize the pre-cached BCCL Jharia Basin data structure or integrate additional mine datasets (ECL, SECL, NCDC). |
| **Reusable ML Gateway Service** | `src/services/` | Implement custom service abstractions for caching responses, managing persistent session state, or webhook retries. |

---

## 6. Offline Mode & Graceful Degradation

During hackathons or field deployments in remote mining areas, connectivity to external LLMs or local GPU-heavy ML workers may be intermittent. The backend gateway is designed with **dual-layer graceful degradation**:

1. **Document Upload Degradation (`uploadDocument`):**
   - When a user uploads a PDF or Excel file, Multer safely writes it to a temporary location.
   - If the ML service is unreachable (`ECONNREFUSED` or timeout), the controller cleans up the temporary file and immediately returns a clean status `200` response containing file metadata (`fileName`, `size`) and an `offline: true` flag. The frontend can seamlessly display upload success without crashing.

2. **Query Degradation (`forwardQuery`):**
   - If the ML service is unavailable during parliamentary Q&A, the controller intercepts the network error and provides a structured fallback response:
     ```json
     {
       "answer": "The ML service is currently offline. This is a fallback response. In production, this query would be processed by the Gemini-powered RAG pipeline with full source attribution.",
       "citations": [],
       "offline": true
     }
     ```
3. **Instant Mock Report (`/api/v1/reports/mock`):**
   - Always accessible without external dependencies. Reads directly from `sample_data/mock_bccl_report.json` to guarantee a 100% stable presentation demonstration.
