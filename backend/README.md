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
| `POST` | `/api/v1/auth/register` | User Registration with password hashing & validation. | `application/json`<br>`{ "name", "email", "password" }` | `{ "success": true, "user": {...}, "token": "..." }` |
| `POST` | `/api/v1/auth/login` | User Authentication & JWT generation. | `application/json`<br>`{ "email", "password" }` | `{ "success": true, "user": {...}, "token": "..." }` |
| `POST` | `/api/v1/auth/google` | Google OAuth token verification & login/registration. | `application/json`<br>`{ "token": "google_id_token" }` | `{ "success": true, "user": {...}, "token": "..." }` |
| `GET` | `/api/v1/auth/me` | Fetches current authenticated user profile. | Bearer Token in `Authorization` header | `{ "success": true, "user": {...} }` |
| `POST` | `/api/v1/auth/logout` | Client-side session invalidation response. | Bearer Token in `Authorization` header | `{ "success": true, "message": "..." }` |
| `POST` | `/api/v1/documents/upload` | Multipart file upload via Multer → forwards stream to ML service `/process-document`. | `multipart/form-data` with field `file` (`.pdf`, `.xlsx`, `.xls`, max 50MB). | `{ message, fileName, size, summary, kpis, wordcloud, topics }` or fallback with `offline: true`. |
| `GET` | `/api/v1/reports/mock` | Returns pre-cached BCCL Jharia Basin geological report data for offline demo fallback. | None (Query / Headers optional). | Full structured report object matching prototype screens (14.82 MT coal, 32.14 M.Cu.M OBR, etc.). |
| `POST` | `/api/v1/query` | Proxies parliamentary / geological natural language queries to the ML service `/query`. | `application/json`<br>`{ "query": string, "context_doc"?: string }` | `{ "answer": string, "citations": [{ "page": number, "source": string }] }` or fallback message. |
| `GET` | `/api/health` | Gateway health check. | None | `{ "status": "ok", "service": "CMPDI GeoReport API Gateway", "timestamp": "..." }` |

---

## 4. Architecture

```
backend/
├── .env.example                  # Environment template
├── package.json                  # Express, Mongoose, JWT, bcryptjs, cors, multer dependencies
├── README.md                     # Backend gateway documentation
├── tests/                        # Automated unit & integration tests
│   └── auth.test.js              # Auth endpoints test suite (Jest + Supertest)
└── src/
    ├── server.js                 # Express application initialization, CORS, global middleware, route mounts
    ├── config/                   # Configuration files
    │   └── db.js                 # MongoDB connection logic
    ├── models/                   # Mongoose schemas & models
    │   └── User.js               # User model (local & Google OAuth schema)
    ├── routes/                   # HTTP route definitions
    │   ├── auth.js               # Auth routes (/register, /login, /google, /me, /logout)
    │   ├── documents.js          # POST /upload route wired with upload middleware
    │   ├── query.js              # POST /query route
    │   └── reports.js            # GET /mock route
    ├── controllers/              # Request handlers & proxy logic
    │   ├── authController.js     # User registration, login, Google OAuth, /me & logout
    │   ├── documentController.js # Handles Multer file staging, ML forwarding, cleanup & fallback
    │   ├── queryController.js    # Forwards Q&A queries to ML service with timeout handling
    │   └── reportController.js   # Reads and returns sample_data/mock_bccl_report.json
    ├── middleware/               # Express middleware
    │   ├── auth.js               # JWT verification & Rate Limiting middleware
    │   └── upload.js             # Multer storage configuration (temp disk storage & file filtering)
    ├── validators/               # Input schema validators
    │   └── authValidator.js      # Joi schema validation for auth requests
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

## 5.5 Authentication & User System

The backend provides a production-ready authentication system supporting local registration and Google OAuth.
Auth uses stateless JWT tokens (`Authorization: Bearer <token>`).

**Key Endpoints:**
- `POST /api/v1/auth/register` - Create a new user (requires name, email, password)
- `POST /api/v1/auth/login` - Authenticate local user and receive JWT
- `POST /api/v1/auth/google` - Authenticate via Google OAuth using Google ID token
- `GET /api/v1/auth/me` - Retrieve current authenticated user profile
- `POST /api/v1/auth/logout` - Invalidate current session (client-side token removal)

**Required Environment Variables for Auth:**
- `MONGO_URI` - MongoDB connection string (e.g., `mongodb://localhost:27017/cmpdi`)
- `JWT_SECRET` - Secure string used for signing JSON Web Tokens
- `JWT_EXPIRES_IN` - Token expiration (e.g., `7d`)
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID for verifying tokens

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

---

## 7. Action Items for Backend Developers (What To Complete Next)

Hey backend teammate! Here are the remaining tasks to complete the backend service:

### Task 1: Connect Uploaded Document Metadata to MongoDB
- Currently, `POST /api/v1/documents/upload` streams files to the ML service and returns the response without saving the file record in MongoDB.
- **Action**:
  1. Create a `Document` model in `src/models/Document.js` (fields: `userId`, `fileName`, `fileSize`, `uploadedAt`, `summary`, `kpis`, `wordcloud`, `topics`, `status`).
  2. In `src/controllers/documentController.js`, save the uploaded document into MongoDB when a user is authenticated (`req.user.id`).
  3. Add a `GET /api/v1/documents` endpoint to return the logged-in user's previously uploaded documents for the sidebar.

### Task 2: Store Conversation & Query History in MongoDB
- Currently, `POST /api/v1/query` forwards queries to the ML service without saving past conversations.
- **Action**:
  1. Create a `QueryHistory` model in `src/models/QueryHistory.js` (fields: `userId`, `query`, `answer`, `citations`, `contextDoc`, `timestamp`).
  2. In `src/controllers/queryController.js`, save every successful Q&A exchange to MongoDB.
  3. Add a `GET /api/v1/query/history` endpoint so the frontend chat stream can reload past questions.

### Task 3: Setup Local / Cloud MongoDB
- In your `.env` file, ensure `MONGO_URI` is populated:
  ```env
  MONGO_URI=mongodb://127.0.0.1:27017/cmpdi_georeport
  # Or use a free MongoDB Atlas connection URI
  JWT_SECRET=your_super_secret_jwt_key
  JWT_EXPIRES_IN=7d
  ```
