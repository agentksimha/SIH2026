# CMPDI Mining & Geological Intelligence Platform (GeoReport AI)
## Comprehensive Design Specification & System Architecture (`design.md`)
**Problem Statement ID:** 26023  
**Title:** AI-Powered Geological, Mining and other Reporting Solution for CMPDI/CIL subsidiaries  
**Organization:** Ministry of Coal / Coal India Limited (CMPDI)  
**Target Output:** High-Fidelity Next.js + TypeScript + Tailwind CSS Prototype Specification for Stitch AI / v0  

---

## 1. Executive Product Overview

### 1.1 The Problem Context
Central Mine Planning and Design Institute (CMPDI) and Coal India Limited (CIL) subsidiaries (BCCL, ECL, CCL, WCL, SECL, MCL, NCL) handle massive volumes of legacy geological surveys, borehole lithology logs, scanned administrative PDFs, production spreadsheets, and statutory returns. Compiling periodic geological reports and formulating urgent responses to Parliamentary Questions (Lok Sabha & Rajya Sabha) currently requires tedious manual data extraction, leading to reporting lags and human error.

### 1.2 Core Solution Scope (3 Mandated Outcomes)
1. **Automated Report Generation Platform:** Ingests scanned mining PDFs, spreadsheets, and production returns to auto-generate structured executive summaries, KPI tables, and formal Ministry briefs.
2. **Automated Word Cloud and Topic Identification Module:** Discovers key geological strata, operational keywords, and emergent risk themes (e.g., *Opencast, Overburden, Coking Coal, Stripping Ratio, Seam XII*).
3. **AI-Based Query and Response System:** A conversational, ChatGPT-style RAG interface with verifiable source attribution (page numbers, table citations) specifically engineered for Parliamentary and Administrative inquiries.

---

## 2. Design System, Color Palette & Typography

To evoke institutional trust, authority, and industrial precision (avoiding flashy consumer SaaS looks):

### 2.1 Color Tokens (Tailwind CSS)
- **Background Deep:** `#0B0F17` (`bg-slate-950`) - Main backdrop.
- **Surface / Card:** `#131B2E` (`bg-slate-900/90`) - Container cards, panels, and sidebars.
- **Surface Hover:** `#1E293B` (`bg-slate-800`) - Interactive element hovers.
- **Borders & Dividers:** `#24324D` (`border-slate-700/60`) - Subtle crisp structural borders.
- **Primary Accent (Mining Gold / Amber):** `#D97706` / `#F59E0B` (`text-amber-500`, `bg-amber-500`) - Primary CTAs, key highlights, mining theme.
- **Secondary Accent (GovTech Emerald):** `#10B981` (`text-emerald-500`, `bg-emerald-500/10`) - Success metrics, system online status.
- **Primary Text:** `#F8FAFC` (`text-slate-50`) - High contrast titles and readings.
- **Muted Text:** `#94A3B8` (`text-slate-400`) - Labels, timestamps, and secondary metadata.

### 2.2 Typography
- **Headings & Body:** Inter or Geist (`font-sans`) - Crisp legibility at high data density.
- **Metrics & Numbers:** JetBrains Mono or Roboto Mono (`font-mono`) - For production figures (MT), stripping ratios, and page citations.

---

## 3. Application Architecture & Routing Structure

- `/` : **Executive Landing Page** (High-impact institutional introduction, problem context, subsidiary breakdown, CTA to portal).
- `/login` : **Authentication Modal / Page** (Official Ministry / CIL Employee portal login with role selection).
- `/dashboard` : **The Intelligence Workspace** (Based directly on hand-drawn wireframes with NotebookLM-style Folder management and Two-View Toggle).

---

## 4. Detailed Screen Specifications

### 4.1 Screen 1: The Executive Landing Page (`app/page.tsx`)
1. **Navbar:**
   - Left: Emblem of India / Coal India / CMPDI Logo + "GeoReport AI".
   - Center Links: `Subsidiaries`, `Architecture`, `Capabilities`, `Compliance`.
   - Right: `Login` and `Launch Intelligence Portal` CTA button (Amber glow).
2. **Hero Section:**
   - Headline: *"AI-Powered Geological & Mining Intelligence for Coal India Subsidiaries"*.
   - Sub-headline: *"Transforming legacy borehole scans, production spreadsheets, and historical archives into automated statutory reports and instant parliamentary briefs."*
   - Metrics Banner:
     - `8 Subsidiaries Supported` (BCCL, CCL, ECL, WCL, SECL, NCL, MCL, CMPDI).
     - `90% Time Reduction in Report Formulation`.
     - `100% Traceable Source Citations`.
3. **Subsidiary Selector Grid:**
   - Visual cards for subsidiaries with quick filter by region (e.g., Jharia Coalfields, Raniganj Basin, Singrauli).

---

### 4.2 Screen 2: Authentication System (`app/login/page.tsx` or Modal)
- **Header:** Government of India Single Sign-On (SSO) / Coal India Central Directory branding.
- **Role-Based Login Selector:**
  - `Ministry of Coal Official` (Read-only high-level queries & parliamentary drafts).
  - `CMPDI Geological Surveyor` (Full upload, report compilation, borehole analysis).
  - `Subsidiary Manager (BCCL/ECL)` (Production returns, operational dashboards).
- **Form Controls:** CIL Corporate Email / ID, Password, and a 1-Click `Demo Bypass Login` (Crucial for live hackathon presentations).

---

### 4.3 Screen 3: The Intelligence Workspace (`app/dashboard/page.tsx`)
*(Translating the Samsung Tablet Hand-Drawn Wireframes into Production Code)*

#### Layout Architecture:
- **Screen Width Division:**
  - **Left Sidebar (30% - 35%):** Folders/Notebooks, Source Document Ingestion, Document History list, System Utilities.
  - **Main Interaction Area (65% - 70%):** Houses the **Top Toggle Switch** that seamlessly shifts between **State A (Report & Analytics)** and **State B (Parliamentary Q&A)**.

```text
+-----------------------------------------------------------------------------------------------------+
| Top Navigation: [CMPDI GeoReport AI] | Subsidiary: [BCCL - Dhanbad v] | User: [Dinesh (Surveyor)]  |
+-----------------------------------------------------------------------------------------------------+
| LEFT SIDEBAR (30%-35%)                 | MAIN WORKSPACE (65%-70%)                                    |
| -------------------------------------- | ---------------------------------------------------------- |
| [ + Add Folder / Resource ]            | TOP VIEW TOGGLE: [ 📊 Report & Analytics ] <-> [ 💬 Q&A ] |
|                                        | ---------------------------------------------------------- |
| FOLDERS (Notebooks):                   | (STATE A: REPORT & ANALYTICS)                              |
| > BCCL Jharia Opencast (Active)        | - File Upload Dropzone ("Upload files")                    |
| > ECL Raniganj Deep Basin              | - Mining KPI Strip (Production MT, OBR, Stripping Ratio)   |
| > Parliamentary Winter Session 2024    | - Interactive Word Cloud & Topic Badges                    |
|                                        | - Production vs Target Recharts Graph                      |
| ACTIVE FOLDER DOCUMENTS:               | - Automated Executive Report & [Export Ministry PDF]       |
| [x] BCCL_Overburden_Q3.pdf (14 MB)     | ---------------------------------------------------------- |
| [x] Geological_Lithology_Borehole.xlsx | (STATE B: CHATGPT-LIKE INTERFACE - WHEN TOGGLE PRESSED)     |
| [ ] Coal_Washing_Survey.pdf            | - Context Header: Answering from 2 selected documents      |
|                                        | - Verifiable Chat Stream with Page Number Citations        |
| EMPTY STATE (When no files in folder): | - Ready Buttons / User Queries Navigation chips            |
| "No History" (Icon + empty state text) | - Bottom Input Bar with [+] Attachment + [Ask Query...]    |
|                                        |                                                            |
| BOTTOM UTILITIES:                      |                                                            |
| [Settings]  [Analytics Overview]       |                                                            |
+-----------------------------------------------------------------------------------------------------+
```

---

#### Detailed Component Specifications for the Workspace:

#### 1. Left Sidebar Components:
- **Folder / Notebook Switcher:**
  - Button: `+ Add Folder` (Opens modal to create a new project/mine workspace).
  - List of Projects with active highlight.
- **Document List (Sources):**
  - Displays all uploaded files in the selected folder.
  - Each item has: Checkbox (to include/exclude from AI context), file-type icon (PDF, XLSX, CSV), filename, size, and delete icon.
- **Empty State (`when no files there it says "No History"` from sketch):**
  - If a folder has 0 files, display a clean slate graphic:
    - Lucide Icon: `FolderArchive` or `FileQuestion` in muted amber.
    - Title: `"No History Found"`.
    - Description: *"No geological documents uploaded yet. Upload a scanned report or survey spreadsheet to begin."*
- **Bottom Actions (from sketch):**
  - `+ Add Resource (xyz)`: Quick link to connect external CMPDI database or borehole repository.
  - `Settings`: Modal for API Keys (Gemini API), Model selection, OCR quality settings.
  - `Analytics`: Summary modal for total system queries processed and token consumption.

---

#### 2. Main Panel - State A: Report & Analytics View (Default Mode):
- **Upload Zone (`Upload files` from sketch):**
  - Modern drag-and-drop container using `react-dropzone`.
  - Accepts `.pdf`, `.xlsx`, `.csv`, `.tiff` (scanned maps).
  - Quick-Load Chips: `[📄 Load Sample: BCCL Annual Production 2024-25.pdf]` and `[📊 Load Sample: Geological Borehole Survey.xlsx]`.
- **Mining KPI Strip:**
  - 4 Cards:
    1. **Coal Production:** `14.82 MT` (`+6.2% YoY`)
    2. **Overburden Removal (OBR):** `32.14 M.Cu.M` (`On Track`)
    3. **Composite Stripping Ratio:** `2.16` (`Target: 2.10`)
    4. **Inferred Coal Reserves:** `184.5 MT` (Seams X, XI, XII)
- **Automated Word Cloud & Topic Identification (Mandated Outcome #2):**
  - **Word Cloud Widget:** Interactive SVG using `react-tagcloud` with keywords styled in gradient amber/gold (*Overburden, Opencast, Coking Coal, Stripping Ratio, Seam XII, Beneficiation, Heavy Earth Moving Machinery, Methane Drainage*).
  - **Topic Identification Pill Grid:** Extracted key themes with status badges (`Strata Stability: High`, `Environmental Clearance: Pending`, `Fly Ash Disposal: Compliant`).
- **Production Analytics Visualizer:**
  - Bar/Area Chart (using `recharts`) showing Monthly Target vs. Actual Coal Extraction across active mine pits.
- **Automated Executive Report Synthesis (Mandated Outcome #1):**
  - Formatted preview with sections: *1. Executive Abstract*, *2. Lithological Stratigraphy*, *3. Production Impediments*, *4. Recommendations*.
  - Floating Action: `Export Formal Ministry Brief (PDF)` with Coal India standard letterhead layout.

---

#### 3. Main Panel - State B: ChatGPT-Like Conversational Interface (When Toggle Pressed):
*(Directly translating the second sketch: "When toggle pressed -> chatGPT like interface -> Ask Query -> User Queries Navigation ready button")*

- **Top Context Bar:**
  - Pill badge: `Context Active: 2 Documents (BCCL_Overburden_Q3.pdf, Borehole_Data.xlsx)`.
  - Model indicator: `Gemini 1.5 Pro (Multimodal Geological Engine)`.
- **Chat History Scroll Area:**
  - User Query Bubbles (Right-aligned, slate-800).
  - AI Assistant Responses (Left-aligned, slate-900 border-slate-700/80):
    - Formatted Markdown responses with bullet points and comparison tables.
    - **Source Traceability Badge:** Every response includes clickable citation pills:
      `[Source: BCCL_Overburden_Q3.pdf — Page 14, Table 3.2]`.
- **User Queries Navigation Ready Buttons (Quick Chips from sketch):**
  - Placed horizontally above the input bar for rapid 1-click queries during the live demo:
    - 🏷️ `Draft answer for Lok Sabha Unstarred Question on Coking Coal reserves`
    - 🏷️ `Calculate current stripping ratio variance for Pit 4`
    - 🏷️ `Summarize environmental clearance bottlenecks for Seam XI`
    - 🏷️ `Extract total Overburden Removal (OBR) figures for Q3`
- **Bottom Floating Input Dock (from sketch):**
  - Capsule-shaped input bar:
    - Left icon: `+` (Add document/attachment directly into chat context).
    - Text Input: Placeholder *"Ask a geological, mining, or parliamentary inquiry..."*.
    - Right icons: Microphone icon (Voice-to-text for Hindi/English) + `Send` arrow icon (Amber accent).

---

## 5. TypeScript Interfaces & Data Contracts

```typescript
// Folder / Project Schema
export interface ProjectFolder {
  id: string;
  name: string;
  subsidiary: 'BCCL' | 'ECL' | 'CCL' | 'WCL' | 'SECL' | 'MCL' | 'NCL' | 'CMPDI';
  description?: string;
  files: MiningDocument[];
  createdAt: string;
}

// Uploaded Document Schema
export interface MiningDocument {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'xlsx' | 'csv' | 'scanned_image';
  sizeFormatted: string;
  uploadDate: string;
  isSelectedForContext: boolean;
  pageCount?: number;
}

// Mining KPI Data Schema
export interface MiningKpis {
  coalProductionMT: number;
  coalProductionTargetMT: number;
  overburdenRemovalMCuM: number;
  strippingRatio: number;
  inferredReservesMT: number;
  activeSeams: string[];
}

// Word Cloud & Topic Modeling
export interface TopicTag {
  id: string;
  name: string;
  confidence: number;
  sentiment: 'positive' | 'warning' | 'critical' | 'neutral';
}

export interface WordCloudItem {
  value: string;
  count: number;
}

// Chat & Parliamentary Q&A Message
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: {
    documentName: string;
    pageNumber: number;
    tableOrSection?: string;
  }[];
}
```

---

## 6. Exact Instructions for Stitch AI / v0 / Claude UI Generator

When passing this design specification to Stitch AI or v0, use the following execution prompt:

> **System Prompt for Stitch AI:**  
> "You are an expert full-stack engineer specialized in Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React icons, and shadcn/ui.  
> Build the complete, interactive prototype for **CMPDI GeoReport AI (Problem Statement ID 26023 - Ministry of Coal)** according to the specifications in `design.md`.  
> 
> **Strict Implementation Directives:**  
> 1. Create a modern, dark-themed institutional dashboard (`bg-slate-950` with `slate-900` cards and `amber-500` accents).  
> 2. Implement the **Left Sidebar (30%)** with Project Folders, Document List with checkboxes, and the `"No History"` empty state.  
> 3. Implement the **Main Area (70%)** with a top Tab/Toggle switching between:  
>    - **View A (Report & Analytics):** Drag & drop zone, 4 KPI cards, interactive word cloud (`react-tagcloud`), Recharts bar graph, and structured report preview.  
>    - **View B (Parliamentary Q&A Chat):** ChatGPT-style chat feed, source citation pills (`[Source: Page 14]`), 4 prompt navigation chips, and floating bottom input dock with `+` icon.  
> 4. Add `"use client";` at the top of all interactive client components.  
> 5. Preload high-quality realistic mock data for Bharat Coking Coal Limited (BCCL) so the prototype functions offline out of the box."

