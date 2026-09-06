import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">

{/* Top Sovereign Strip */}
<section className="w-full bg-surface-container-lowest py-space-sm px-space-xl">
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm text-text-muted">
<div className="flex items-center gap-space-sm">
<span className="w-2 h-2 rounded-full bg-govtech-emerald" />
<span className="font-mono-citation text-mono-citation uppercase tracking-widest text-text-secondary">Smart India Hackathon #26023 — Government of India Mandate</span>
</div>
<div className="flex items-center gap-space-lg text-text-muted font-mono-citation text-mono-citation">
<span className="hidden sm:inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-mining-gold-bright">verified_user</span> Air-Gapped / STQC Certified
        </span>
<span className="inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-govtech-emerald">database</span> 14,821,904 Embeddings Synchronized
        </span>
<span className="text-text-secondary">DGMS Portal Relay: <span className="text-govtech-emerald font-semibold">ACTIVE</span></span>
</div>
</div>
</section>
{/* Hero Section with Strategic Command Center Layout */}
<section className="relative w-full py-space-3xl px-space-xl overflow-hidden bg-gradient-to-b from-surface-dim via-surface-base to-surface-dim">
{/* Atmospheric Ambient Glows */}
<div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-mining-gold-deep/10 blur-3xl pointer-events-none -z-0"></div>
<div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] rounded-full bg-govtech-emerald/5 blur-3xl pointer-events-none -z-0"></div>
<div className="max-w-7xl mx-auto relative z-10">
{/* Institutional Emblem & Identification Header */}
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md mb-space-2xl">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-mining-gold-bright text-[28px]">terrain</span>
</div>
<div className="flex flex-col">
<span className="font-mono-label text-mono-label text-mining-gold-bright uppercase tracking-widest">Problem Statement ID: #26023</span>
<span className="font-headline-md text-headline-md font-bold text-text-primary tracking-tight">CMPDI National Geological Synthesizer</span>
</div>
</div>
<div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-card shadow-sm">
<span className="material-symbols-outlined text-govtech-emerald text-[18px]">verified</span>
<span className="font-mono-citation text-mono-citation text-text-secondary">MoC / CIL AI Direct Resolution Node</span>
</div>
</div>
{/* Hero Statement Asymmetry */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center mb-space-3xl">
<div className="lg:col-span-7 flex flex-col gap-space-lg">
<div className="inline-flex items-center gap-space-xs w-max px-space-sm py-1 rounded bg-surface-hover">
<span className="font-mono-citation text-mono-citation text-text-secondary uppercase">Unified Subsidiary Ingestion</span>
<span className="text-text-muted">•</span>
<span className="font-mono-citation text-mono-citation text-mining-gold-bright font-semibold">8 Coal Basins Connected</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight leading-none font-bold">
            AI-Powered Geological, Mining & Statutory Intelligence for <span className="text-mining-gold-bright">Coal India</span> Subsidiaries.
          </h1>
<p className="font-body-lg text-body-lg text-text-secondary max-w-2xl leading-relaxed">
            Automating borehole lithology extraction, overburden telemetry, and rapid parliamentary query formulation across all 8 major mining subsidiaries with audited cryptographic citations.
          </p>
<div className="flex flex-wrap items-center gap-space-md pt-space-xs">
<Link className="inline-flex items-center gap-space-sm px-space-xl py-space-md rounded-lg bg-primary-container text-surface-base font-bold shadow-xl shadow-primary-container/20 hover:bg-mining-gold-deep transition-all transform hover:-translate-y-0.5" href="/dashboard">
<span className="material-symbols-outlined text-[20px]">terminal</span>
<span className="font-headline-md text-body-md font-bold">Launch Intelligence Workspace</span>
</Link>
<Link className="inline-flex items-center gap-space-sm px-space-xl py-space-md rounded-lg bg-surface-card text-text-primary hover:bg-surface-hover shadow-md transition-all" href="/reports">
<span className="material-symbols-outlined text-mining-gold-bright text-[20px]">description</span>
<span className="font-body-md text-body-md font-semibold">View Statutory Reports</span>
</Link>
<div className="w-full sm:w-auto flex items-center gap-space-xs text-text-muted font-mono-citation text-mono-citation pl-space-xs">
<span className="material-symbols-outlined text-[16px] text-govtech-emerald">lock</span>
<span>Classified Access • Level 4 Clearance Required</span>
</div>
</div>
</div>
{/* Telemetry & Visual Showcase Panel */}
<div className="lg:col-span-5 relative">
<div className="relative rounded-xl overflow-hidden shadow-2xl bg-surface-card">
{/* Terminal Title Bar */}
<div className="px-space-base py-space-sm bg-surface-container-high flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-state-critical" />
<span className="w-2.5 h-2.5 rounded-full bg-state-warning" />
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
<span className="font-mono-citation text-mono-citation text-text-muted ml-2">CMPDI-SYNTH-KERNEL // BCCL-DHANBAD-LOGS</span>
</div>
<span className="font-mono-citation text-mono-citation text-mining-gold-bright uppercase">STREAM: 8.4k t/sec</span>
</div>
{/* Visual Context Image Placeholder */}
<div className="relative h-56 w-full">
<img alt="A dramatic wide industrial shot of an Indian open-cast coal colliery at twilight with highwall excavation terraces, heavy geological drilling rigs, and ambient dust illuminated by amber industrial floodlights, representing rigorous geo-technical mining operations." className="w-full h-full object-cover mix-blend-luminosity opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCutp6EkBZ87m4n9tbmRiiQGaqKIYgSF6ufxhq2z2chkAuMtS6ecb-gwC59Ly3Q2xthBVaKg-SYmMh14EX5O5kA1CX8J-aawnQiPk0OcKXxrfTkVbDHz9fGJL9mm4q2eoE04oWalB3qHnzpYkAOOub6zQWky9IUqk3tjuzR-fjhjvk1lz5qqx5t7B-SJNZG8z-5fv7dt4zMpZtGO-6lFvxU8-wBGtxVjdt8ro03u2qUMdjrTvGUVp5-"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/60 to-transparent"></div>
{/* Floating Dynamic Overlay Metrics */}
<div className="absolute top-4 right-4 p-space-sm rounded-lg bg-surface-base/90 backdrop-blur-md shadow-md">
<div className="font-mono-citation text-mono-citation text-text-muted">Stratigraphic Depth</div>
<div className="font-mono-metric-md text-mono-metric-md text-mining-gold-bright">412.80 m (Seam IX)</div>
</div>
<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
<div>
<div className="font-mono-label text-mono-label text-text-muted">Jharia Basin Log BH-449</div>
<div className="font-body-md text-body-md font-semibold text-text-primary">Lithology Core Extraction Validated</div>
</div>
<span className="px-space-xs py-1 rounded bg-govtech-emerald/20 text-govtech-emerald font-mono-citation text-mono-citation font-bold">MATCH: 99.8%</span>
</div>
</div>
{/* Ingestion Activity Ticker */}
<div className="p-space-base bg-surface-dim flex flex-col gap-space-xs font-mono-citation text-mono-citation">
<div className="flex items-center justify-between text-text-muted">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-mining-gold-bright">sync</span> Ingesting DGMS Form IV Monthly Overburden</span>
<span className="text-govtech-emerald">OK</span>
</div>
<div className="flex items-center justify-between text-text-muted">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-tertiary-container">psychology</span> Parliamentary Starred Q#1492 Synthesis</span>
<span className="text-text-primary font-bold">DONE (0.84s)</span>
</div>
</div>
</div>
</div>
</div>
{/* Live Institutional Metrics Strip */}
<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md p-space-lg rounded-xl bg-surface-card shadow-xl">
<div className="flex flex-col gap-space-2xs p-space-sm">
<div className="flex items-center justify-between">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Fleet Integration</span>
<span className="material-symbols-outlined text-mining-gold-bright text-[18px]">account_balance</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">8 Subsidiaries</div>
<div className="font-body-sm text-body-sm text-govtech-emerald flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> All CIL zones active
          </div>
</div>
<div className="flex flex-col gap-space-2xs p-space-sm">
<div className="flex items-center justify-between">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Parliamentary Turnaround</span>
<span className="material-symbols-outlined text-tertiary-container text-[18px]">bolt</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-mining-gold-bright font-bold">90% Latency Drop</div>
<div className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
<span>From 72 hrs to {"<"} 4.2 mins</span>
</div>
</div>
<div className="flex flex-col gap-space-2xs p-space-sm">
<div className="flex items-center justify-between">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Verification Audit</span>
<span className="material-symbols-outlined text-govtech-emerald text-[18px]">fact_check</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-govtech-emerald font-bold">100% Cryptographic</div>
<div className="font-body-sm text-body-sm text-text-secondary">
<span>Exact PDF coordinate RAG</span>
</div>
</div>
<div className="flex flex-col gap-space-2xs p-space-sm">
<div className="flex items-center justify-between">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Lithology Vector DB</span>
<span className="material-symbols-outlined text-secondary-fixed text-[18px]">dataset</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">14.8M+ Records</div>
<div className="font-body-sm text-body-sm text-govtech-emerald flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 42,900 Boreholes indexed
          </div>
</div>
</div>
</div>
</section>
{/* Section: Three Core Mandated Outcomes */}
<section className="w-full py-space-3xl px-space-xl bg-surface-dim">
<div className="max-w-7xl mx-auto flex flex-col gap-space-2xl">
{/* Section Intro Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div className="flex flex-col gap-space-xs max-w-2xl">
<div className="font-mono-label text-mono-label text-mining-gold-bright uppercase tracking-wider">CMPDI Strategic Deliverables</div>
<h2 className="font-headline-lg text-headline-lg font-bold text-text-primary">
            Three Mandated Pillars for Coal India Secretariat
          </h2>
<p className="font-body-md text-body-md text-text-secondary">
            Engineered exclusively to answer SIH Problem Statement #26023: transforming unstructured geological drill cores and administrative mandates into executive decisions.
          </p>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-mono-citation text-mono-citation text-text-muted">Compliant with Coal Mines Regulations (CMR 2017)</span>
</div>
</div>
{/* Outcome Cards Bento Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
{/* Mandate 1: Report Generation */}
<div className="flex flex-col justify-between p-space-xl rounded-xl bg-surface-card hover:bg-surface-hover transition-all group shadow-md">
<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-lg bg-surface-dim flex items-center justify-center text-mining-gold-bright group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[28px]">article</span>
</div>
<span className="font-mono-label text-mono-label text-text-muted uppercase">Mandate #01</span>
</div>
<div className="flex flex-col gap-space-xs">
<h3 className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">
                Automated Statutory Report Generation
              </h3>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                Ingests legacy borehole scans, geological PDF memoirs, stripping ratio charts, and production spreadsheets to auto-compile DGMS & Ministry-ready briefs in minutes.
              </p>
</div>
{/* Micro Interactive Data Visualizer */}
<div className="p-space-md rounded-lg bg-surface-base flex flex-col gap-space-xs">
<div className="flex items-center justify-between text-text-muted font-mono-citation text-mono-citation">
<span>Auto-Draft Pipeline</span>
<span className="text-govtech-emerald">Ready to Export</span>
</div>
{/* Mini Progress Indicators */}
<div className="space-y-1.5 pt-1">
<div className="flex items-center justify-between font-mono-citation text-mono-citation text-text-secondary">
<span>Stratigraphic Correlation</span>
<span className="text-text-primary">100%</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-govtech-emerald w-full"></div>
</div>
<div className="flex items-center justify-between font-mono-citation text-mono-citation text-text-secondary">
<span>Stripping Ratio (OB/Coal)</span>
<span className="text-text-primary">1:3.42 m³/t</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-mining-gold-bright w-3/4"></div>
</div>
</div>
</div>
</div>
<div className="pt-space-lg flex items-center justify-between">
<span className="font-mono-citation text-mono-citation text-text-muted">Docx / PDF / Form-IV Support</span>
<Link className="inline-flex items-center gap-1 font-body-sm text-body-sm font-semibold text-mining-gold-bright hover:underline" href="/reports">
<span>View Templates</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</Link>
</div>
</div>
{/* Mandate 2: Word Cloud & Topic Discovery */}
<div className="flex flex-col justify-between p-space-xl rounded-xl bg-surface-card hover:bg-surface-hover transition-all group shadow-md">
<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-lg bg-surface-dim flex items-center justify-center text-tertiary-container group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[28px]">bubble_chart</span>
</div>
<span className="font-mono-label text-mono-label text-text-muted uppercase">Mandate #02</span>
</div>
<div className="flex flex-col gap-space-xs">
<h3 className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-tertiary-container transition-colors">
                Automated Word Cloud & Topic Identification
              </h3>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                Discovers critical geological strata, overburden anomalies, spontaneous combustion incidents, and DGMS compliance risks using deep semantic topic modeling.
              </p>
</div>
{/* Dynamic Semantic Word Cloud Preview */}
<div className="p-space-md rounded-lg bg-surface-base flex flex-wrap gap-2 items-center justify-center min-h-[110px]">
<span className="font-mono-metric-md text-mining-gold-bright font-bold px-2 py-1 rounded bg-surface-dim">Barakar Formation</span>
<span className="font-body-sm text-govtech-emerald font-semibold px-2 py-0.5 rounded bg-surface-dim">Stripping Ratio</span>
<span className="font-body-md text-tertiary-container font-semibold px-2 py-0.5 rounded bg-surface-dim">Seam-X Thick</span>
<span className="font-mono-citation text-text-muted px-1.5 py-0.5 rounded bg-surface-dim">Overburden Slip</span>
<span className="font-body-sm text-state-warning font-medium px-2 py-0.5 rounded bg-surface-dim">DGMS S&T Reg 115</span>
<span className="font-mono-citation text-secondary-fixed px-2 py-0.5 rounded bg-surface-dim">Sandstone Influx</span>
</div>
</div>
<div className="pt-space-lg flex items-center justify-between">
<span className="font-mono-citation text-mono-citation text-text-muted">TF-IDF + BERTopic Cluster</span>
<Link className="inline-flex items-center gap-1 font-body-sm text-body-sm font-semibold text-tertiary-container hover:underline" href="/dashboard">
<span>Run Analysis</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</Link>
</div>
</div>
{/* Mandate 3: Parliamentary & Administrative Q&A */}
<div className="flex flex-col justify-between p-space-xl rounded-xl bg-surface-card hover:bg-surface-hover transition-all group shadow-md">
<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="w-12 h-12 rounded-lg bg-surface-dim flex items-center justify-center text-govtech-emerald group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[28px]">question_answer</span>
</div>
<span className="font-mono-label text-mono-label text-text-muted uppercase">Mandate #03</span>
</div>
<div className="flex flex-col gap-space-xs">
<h3 className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-govtech-emerald transition-colors">
                Parliamentary & Administrative Q&A Engine
              </h3>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                Sub-second conversational RAG delivering Lok Sabha & Rajya Sabha queries with page-by-page, paragraph-bound citations across 40 years of coal colliery records.
              </p>
</div>
{/* Parliamentary Verified Citation Snapshot */}
<div className="p-space-md rounded-lg bg-surface-base flex flex-col gap-space-xs">
<div className="font-mono-citation text-mono-citation text-mining-gold-bright flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">assured_workload</span> Starred Question: Coal Reserve at Dhanbad
              </div>
<div className="font-body-sm text-body-sm text-text-primary bg-surface-dim p-space-xs rounded">
                "BCCL holds 8,421 MT proven coking coal reserves in Jharia..."
              </div>
<div className="flex items-center gap-2 pt-1 font-mono-citation text-mono-citation">
<span className="px-2 py-0.5 rounded bg-tertiary-container/10 text-tertiary-container">BCCL-Geol-2023.pdf (p.142)</span>
<span className="text-govtech-emerald flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">check</span> Validated</span>
</div>
</div>
</div>
<div className="pt-space-lg flex items-center justify-between">
<span className="font-mono-citation text-mono-citation text-text-muted">Zero Hallucination Protocol</span>
<Link className="inline-flex items-center gap-1 font-body-sm text-body-sm font-semibold text-govtech-emerald hover:underline" href="/dashboard">
<span>Launch Chatbot</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</Link>
</div>
</div>
</div>
</div>
</section>
{/* Section: Interactive Subsidiary Fleet Grid (All 8 Subsidiaries) */}
<section className="w-full py-space-3xl px-space-xl bg-surface-base">
<div className="max-w-7xl mx-auto flex flex-col gap-space-2xl">
{/* Section Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<div className="font-mono-label text-mono-label text-mining-gold-bright uppercase tracking-wider">National Coverage</div>
<h2 className="font-headline-lg text-headline-lg font-bold text-text-primary">
            Subsidiary Intelligence Fleet
          </h2>
<p className="font-body-md text-body-md text-text-secondary max-w-xl">
            Direct operational access to the 8 Coal India Limited corporate entities and central research labs with active vector datastores.
          </p>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-1 rounded bg-primary-container text-surface-base font-body-sm text-body-sm font-bold">All 8 Zones</button>
<button className="px-space-md py-1 rounded bg-surface-card text-text-secondary hover:text-text-primary font-body-sm text-body-sm transition-colors">Coking Coal</button>
<button className="px-space-md py-1 rounded bg-surface-card text-text-secondary hover:text-text-primary font-body-sm text-body-sm transition-colors">Thermal Coal</button>
</div>
</div>
{/* Subsidiary Fleet 8-Card Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{/* 1. BCCL Dhanbad */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="coking">
<div className="absolute top-0 right-0 w-24 h-24 bg-mining-gold-bright/5 rounded-bl-full pointer-events-none"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">BCCL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" title="Telemetry Active" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">Bharat Coking Coal Ltd</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Dhanbad • Jharia Basin
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">1,420 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Offtake M-T-D:</span>
<span className="text-govtech-emerald font-semibold">14.82 MT</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Active Notebooks:</span>
<span className="text-mining-gold-bright font-semibold">3 Synthesizers</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open BCCL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 2. ECL Sanctoria */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="coking">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">ECL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">Eastern Coalfields Ltd</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Sanctoria • Raniganj Basin
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">982 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Coal Classification:</span>
<span className="text-tertiary-container font-semibold">High Volatile Non-Coking</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Active Notebooks:</span>
<span className="text-mining-gold-bright font-semibold">2 Synthesizers</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open ECL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 3. CCL Ranchi */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="noncoking">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">CCL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">Central Coalfields Ltd</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Ranchi • North Karanpura
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">1,890 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Pipelines Active:</span>
<span className="text-govtech-emerald font-semibold">Magadh & Amrapali</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Overburden Target:</span>
<span className="text-text-primary font-semibold">92.4% On-Track</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open CCL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 4. WCL Nagpur */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="noncoking">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">WCL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">Western Coalfields Ltd</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Nagpur • Wardha Valley
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">740 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Borehole Logs:</span>
<span className="text-text-primary font-semibold">3,120 Indexed</span>
</div>
<div className="flex justify-between text-text-muted">
<span>DGMS Compliance:</span>
<span className="text-govtech-emerald font-semibold">Zero Outstanding</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open WCL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 5. SECL Bilaspur */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="noncoking">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">SECL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">South Eastern Coalfields</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Bilaspur • Korba & Raigarh
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">3,204 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Capacity Mega-Mines:</span>
<span className="text-text-primary font-semibold">Gevra & Kusmunda</span>
</div>
<div className="flex justify-between text-text-muted">
<span>RAG Integrity:</span>
<span className="text-govtech-emerald font-semibold">99.6%</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open SECL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 6. MCL Sambalpur */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="noncoking">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">MCL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">Mahanadi Coalfields Ltd</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Sambalpur • Ib Valley & Talcher
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">2,810 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Annual Dispatch:</span>
<span className="text-mining-gold-bright font-semibold">Top CIL Producer</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Telemetry Node:</span>
<span className="text-govtech-emerald font-semibold">Live 10 Gbps Relay</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open MCL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 7. NCL Singrauli */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-card hover:bg-surface-hover transition-all shadow-md group relative overflow-hidden" data-type="noncoking">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">NCL</span>
<span className="w-2.5 h-2.5 rounded-full bg-govtech-emerald" />
</div>
<div className="font-body-sm text-body-sm text-mining-gold-bright font-medium">Northern Coalfields Ltd</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Singrauli • Moher Basin
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>Vector Docs:</span>
<span className="text-text-primary font-semibold">1,120 Files</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Pithead Linkage:</span>
<span className="text-tertiary-container font-semibold">Super Thermal NTPC</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Heavy Dragline Log:</span>
<span className="text-govtech-emerald font-semibold">Synchronized</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-base text-text-primary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-space-xs transition-all" href="/dashboard">
<span>Open NCL Workspace</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</Link>
</div>
</div>
{/* 8. CMPDI Central HQ */}
<div className="subsidiary-card flex flex-col justify-between p-space-lg rounded-xl bg-surface-hover border-mining-gold-bright/30 transition-all shadow-xl group relative overflow-hidden" data-type="hq">
<div className="absolute -top-6 -right-6 w-20 h-20 bg-mining-gold-bright/10 rounded-full blur-xl"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="font-headline-md text-headline-md font-bold text-mining-gold-bright">CMPDI HQ</span>
<span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-mining-gold-bright font-mono-citation text-mono-citation">MASTER</span>
</div>
<span className="w-2.5 h-2.5 rounded-full bg-mining-gold-bright animate-ping" />
</div>
<div className="font-body-sm text-body-sm text-text-primary font-medium">Planning & Design Institute</div>
<div className="font-mono-citation text-mono-citation text-text-muted flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">account_balance</span> Ranchi Headquarters • Apex Core
            </div>
<div className="p-space-sm rounded bg-surface-dim flex flex-col gap-1 my-space-xs font-mono-citation text-mono-citation">
<div className="flex justify-between text-text-muted">
<span>National Vector Aggregation:</span>
<span className="text-mining-gold-bright font-bold">100% Ingested</span>
</div>
<div className="flex justify-between text-text-muted">
<span>RI-I through RI-VII:</span>
<span className="text-govtech-emerald font-semibold">7 Regional Institutes</span>
</div>
<div className="flex justify-between text-text-muted">
<span>Sovereign Security:</span>
<span className="text-govtech-emerald font-semibold">Air-Gapped / STQC</span>
</div>
</div>
</div>
<div className="pt-space-md">
<Link className="w-full py-space-xs px-space-sm rounded bg-primary-container text-surface-base hover:bg-mining-gold-deep font-body-sm text-body-sm font-bold flex items-center justify-center gap-space-xs shadow-md transition-all" href="/dashboard">
<span>Access Apex Master Hub</span>
<span className="material-symbols-outlined text-[16px]">stars</span>
</Link>
</div>
</div>
</div>
</div>
</section>
{/* Section: Architecture & Security Compliance Banner */}
<section className="w-full py-space-3xl px-space-xl bg-surface-container-lowest">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md p-space-xl rounded-xl bg-surface-card shadow-2xl">
<div className="flex items-start gap-space-md max-w-3xl">
<div className="w-14 h-14 rounded-xl bg-govtech-emerald-dim/40 flex-shrink-0 flex items-center justify-center text-govtech-emerald">
<span className="material-symbols-outlined text-[32px]">shield</span>
</div>
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="font-headline-md text-headline-md font-bold text-text-primary">Enterprise Air-Gapped GovTech Architecture</span>
<span className="px-2 py-0.5 rounded bg-govtech-emerald/20 text-govtech-emerald font-mono-citation text-mono-citation font-bold">STQC READY</span>
</div>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
              Engineered strictly for Ministry of Coal compliance mandates. No public LLM API data transmission. All geological models, OCR extractors, and vector embeddings operate on dedicated sovereign GPU nodes within National Informatics Centre (NIC) and Coal India data perimeter.
            </p>
</div>
</div>
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm w-full md:w-auto">
<div className="flex flex-col items-center justify-center px-space-lg py-space-sm rounded bg-surface-dim text-center">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Latency Target</span>
<span className="font-mono-metric-md text-mono-metric-md text-govtech-emerald">{"<"} 1,200 ms</span>
</div>
<div className="flex flex-col items-center justify-center px-space-lg py-space-sm rounded bg-surface-dim text-center">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Access Matrix</span>
<span className="font-mono-metric-md text-mono-metric-md text-mining-gold-bright">CMR 2017 RBAC</span>
</div>
</div>
</div>
{/* Compliance Badges Strip */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
<div className="flex items-center gap-space-sm p-space-md rounded bg-surface-card shadow-sm">
<span className="material-symbols-outlined text-mining-gold-bright">gavel</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-text-primary">DGMS Statutory Ready</span>
<span className="font-mono-citation text-mono-citation text-text-muted">Form I, II, IV Compliant</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-md rounded bg-surface-card shadow-sm">
<span className="material-symbols-outlined text-govtech-emerald">cloud_done</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-text-primary">MeitY Cloud Empanelled</span>
<span className="font-mono-citation text-mono-citation text-text-muted">Data Residency in Bharat</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-md rounded bg-surface-card shadow-sm">
<span className="material-symbols-outlined text-tertiary-container">history_edu</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-text-primary">Parliamentary Secretariat</span>
<span className="font-mono-citation text-mono-citation text-text-muted">Lok/Rajya Sabha Starred Audit</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-md rounded bg-surface-card shadow-sm">
<span className="material-symbols-outlined text-mining-gold-bright">vpn_key</span>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm font-semibold text-text-primary">Role-Based RBAC</span>
<span className="font-mono-citation text-mono-citation text-text-muted">Surveyor vs Mine Manager</span>
</div>
</div>
</div>
</div>
</section>
{/* Interactive Filter Logic for Subsidiary Grid */}


    </div>
  );
}
