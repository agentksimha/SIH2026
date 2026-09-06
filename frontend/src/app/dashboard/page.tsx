"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [mainView, setMainView] = useState<'hub' | 'drilldown'>('drilldown');
  const [subView, setSubView] = useState<'analytics' | 'chat'>('analytics');
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="flex flex-col w-full">
{mainView === 'hub' && (
<div className="flex flex-col w-full px-space-xl py-space-xl space-y-space-xl">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-base pb-space-md border-b border-border-subtle">
<div className="flex flex-col">
<div className="flex items-center gap-space-sm">
<span className="p-2 rounded bg-surface-card text-mining-gold-bright">
<span className="material-symbols-outlined text-[24px]">folder_special</span>
</span>
<h1 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight">Workspaces &amp; Subsidiary Notebooks</h1>
</div>
<p className="font-body-sm text-body-sm text-text-muted mt-1">Geological dossier collections, statutory audit data lakes, and borehole lithology repositories.</p>
</div>

<div className="flex flex-wrap items-center gap-space-md">
<div className="relative w-72">
<span className="absolute inset-y-0 left-3 flex items-center text-text-muted pointer-events-none">
<span className="material-symbols-outlined text-[18px]">search</span>
</span>
<input className="w-full pl-9 pr-3 py-2 bg-surface-card text-body-sm text-text-primary rounded-lg border border-border-crisp placeholder:text-text-muted focus:outline-none focus:border-primary-container" placeholder="Filter folders or subsidiaries..." type="text"/>
</div>
<button className="flex items-center gap-space-xs px-space-base py-2 rounded-lg bg-primary-container hover:bg-mining-gold-deep text-surface-base font-body-md font-bold transition-all shadow-md" type="button">
<span className="material-symbols-outlined text-[18px]">create_new_folder</span>
<span>+ Create New Project Folder</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-base">

<div className="group relative flex flex-col justify-between p-space-lg rounded-xl bg-surface-card border border-primary-container/40 hover:border-mining-gold-bright hover:shadow-lg transition-all cursor-pointer" onClick={() => setMainView('drilldown')}>
<div className="flex items-start justify-between mb-space-base">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-mining-gold-bright">
<span className="material-symbols-outlined text-[22px]">folder</span>
</div>
<div>
<span className="font-mono-label text-mono-label text-mining-gold-bright uppercase tracking-wider font-semibold">Subsidiary: BCCL</span>
<h2 className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">BCCL Jharia Opencast</h2>
</div>
</div>
<span className="px-space-xs py-0.5 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald border border-govtech-emerald/30">Synced</span>
</div>
<p className="font-body-sm text-body-sm text-text-secondary mb-space-base line-clamp-2">
          Integrated lithology reports, Seam X-XII drill-core logs, and Q3 overburden telemetry records for Dhanbad coal belt.
        </p>
<div className="flex items-center justify-between pt-space-md border-t border-border-crisp font-mono-citation text-mono-citation text-text-muted">
<div className="flex items-center gap-space-md">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">description</span> 3 Docs</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">hard_drive</span> 38.0 MB</span>
</div>
<span className="text-mining-gold-bright flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Enter Workspace →</span>
</div>
</div>

<div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-card border border-border-crisp hover:border-text-muted transition-all cursor-pointer">
<div className="flex items-start justify-between mb-space-base">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-dim flex items-center justify-center text-text-secondary">
<span className="material-symbols-outlined text-[22px]">folder</span>
</div>
<div>
<span className="font-mono-label text-mono-label text-text-muted uppercase tracking-wider font-semibold">Subsidiary: ECL</span>
<h3 className="font-headline-md text-headline-md font-bold text-text-primary">ECL Raniganj Deep Basin</h3>
</div>
</div>
<span className="px-space-xs py-0.5 rounded text-mono-citation font-semibold bg-surface-hover text-text-secondary">Standby</span>
</div>
<p className="font-body-sm text-body-sm text-text-secondary mb-space-base line-clamp-2">
          Deep seated non-coking coal stratigraphy and seismic reflection surveys for Asansol geological subdivisions.
        </p>
<div className="flex items-center justify-between pt-space-md border-t border-border-crisp font-mono-citation text-mono-citation text-text-muted">
<div className="flex items-center gap-space-md">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">description</span> 4 Docs</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">hard_drive</span> 62.4 MB</span>
</div>
<span>Updated Yesterday</span>
</div>
</div>

<div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-card border border-border-crisp hover:border-text-muted transition-all cursor-pointer">
<div className="flex items-start justify-between mb-space-base">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-dim flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined text-[22px]">account_balance</span>
</div>
<div>
<span className="font-mono-label text-mono-label text-tertiary-container uppercase tracking-wider font-semibold">Ministry of Coal</span>
<h3 className="font-headline-md text-headline-md font-bold text-text-primary">Parliamentary Winter 2024</h3>
</div>
</div>
<span className="px-space-xs py-0.5 rounded text-mono-citation font-semibold bg-state-critical/20 text-state-critical border border-state-critical/30">High Priority</span>
</div>
<p className="font-body-sm text-body-sm text-text-secondary mb-space-base line-clamp-2">
          Lok Sabha starred questions repository regarding clean coal technologies, washery outputs, and commercial block allocations.
        </p>
<div className="flex items-center justify-between pt-space-md border-t border-border-crisp font-mono-citation text-mono-citation text-text-muted">
<div className="flex items-center gap-space-md">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">description</span> 2 Docs</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">hard_drive</span> 18.2 MB</span>
</div>
<span>Updated 3 hrs ago</span>
</div>
</div>

<div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-card border border-border-crisp hover:border-text-muted transition-all cursor-pointer">
<div className="flex items-start justify-between mb-space-base">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-dim flex items-center justify-center text-text-muted">
<span className="material-symbols-outlined text-[22px]">folder_open</span>
</div>
<div>
<span className="font-mono-label text-mono-label text-text-muted uppercase tracking-wider font-semibold">Subsidiary: WCL</span>
<h3 className="font-headline-md text-headline-md font-bold text-text-secondary">WCL Wardha Valley Expansion</h3>
</div>
</div>
<span className="px-space-xs py-0.5 rounded text-mono-citation font-semibold bg-surface-hover text-text-muted">No History</span>
</div>
<p className="font-body-sm text-body-sm text-text-muted mb-space-base">
          Geological block mapping in progress. Awaiting geophysical drill logs from Chandrapur regional surveyor branch.
        </p>
<div className="flex items-center justify-between pt-space-md border-t border-border-crisp font-mono-citation text-mono-citation text-text-muted">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">folder_off</span> 0 Documents</span>
<span>Pending Ingest</span>
</div>
</div>

<button className="group flex flex-col items-center justify-center p-space-xl rounded-xl border-2 border-dashed border-border-crisp hover:border-mining-gold-bright bg-surface-dim/50 hover:bg-surface-card transition-all text-center" type="button">
<div className="w-12 h-12 rounded-full bg-surface-card group-hover:bg-primary-container/20 flex items-center justify-center text-text-muted group-hover:text-mining-gold-bright transition-colors mb-space-sm">
<span className="material-symbols-outlined text-[26px]">add_circle</span>
</div>
<span className="font-headline-md text-headline-md font-bold text-text-primary group-hover:text-mining-gold-bright transition-colors">+ Create New Mining Workspace</span>
<span className="font-body-sm text-body-sm text-text-muted mt-1">Configure geological parameters, borehole data arrays, and document boundaries.</span>
</button>
</div>
</div>
)}




{mainView === 'drilldown' && (
<div className="flex flex-col w-full">

<div className="w-full bg-surface-card border-b border-border-crisp px-space-xl py-space-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">

<div className="flex items-center gap-space-md">
<button className="flex items-center gap-space-xs px-space-sm py-1.5 rounded bg-surface-dim hover:bg-surface-hover text-text-secondary hover:text-text-primary border border-border-crisp font-body-sm transition-colors" onClick={() => setMainView('hub')} type="button">
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
<span>All Workspaces</span>
</button>
<div className="h-5 w-px bg-border-crisp hidden sm:block"></div>
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-body-sm text-body-sm text-text-muted">Workspaces</span>
<span className="text-text-muted">/</span>
<div className="flex items-center gap-space-xs">
<span className="font-headline-md text-headline-md font-bold text-text-primary">BCCL Jharia Opencast</span>
<span className="font-mono-citation text-mono-citation px-space-xs py-0.5 rounded bg-mining-gold-bright/10 text-mining-gold-bright border border-mining-gold-bright/30 font-semibold">Active Model</span>
</div>
<span className="font-mono-label text-mono-label text-text-muted hidden md:inline ml-2">(3 Documents • 38.0 MB Indexed)</span>
</div>
</div>

<div className="flex items-center gap-space-sm self-end lg:self-auto">
<div className="flex items-center p-1 rounded-lg bg-surface-dim border border-border-crisp">
<button className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-lg transition-all ${subView === 'analytics' ? 'bg-surface-hover text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`} onClick={() => setSubView('analytics')} type="button">
<span className="material-symbols-outlined text-[18px] text-mining-gold-bright">insert_chart</span>
<span className="font-body-md text-body-md font-semibold">Analytics &amp; Stratigraphy</span>
</button>
<button className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-lg transition-all ${subView === 'chat' ? 'bg-surface-hover text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`} onClick={() => setSubView('chat')} type="button">
<span className="material-symbols-outlined text-[18px] text-tertiary-container">forum</span>
<span className="font-body-md text-body-md font-semibold">Parliamentary Q&amp;A</span>
<span className="w-2 h-2 rounded-full bg-govtech-emerald ml-1"></span>
</button>
</div>
</div>
</div>

<div className="w-full flex flex-col xl:flex-row flex-1">



<aside className="w-full xl:w-[35%] bg-surface-dim border-b xl:border-b-0 xl:border-r border-border-crisp flex flex-col justify-between p-space-lg shrink-0">
<div className="flex flex-col space-y-space-base">

<div className="flex items-center justify-between pb-space-sm border-b border-border-subtle">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[20px] text-text-secondary">folder_managed</span>
<h2 className="font-headline-md text-headline-md font-bold text-text-primary">Indexed Repository</h2>
</div>
<button className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-card hover:bg-surface-hover border border-border-crisp text-mining-gold-bright text-body-sm font-semibold transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">upload_file</span>
<span>+ Ingest Document</span>
</button>
</div>

<div className="flex items-center justify-between text-body-sm text-text-muted">
<span>Context Inclusion Selection (Active in RAG)</span>
<button className="text-mono-citation text-mining-gold-bright underline hover:text-mining-gold-deep cursor-pointer" onClick={() => setShowEmptyState(!showEmptyState)} type="button">
{showEmptyState ? 'Restore 3 Active Files' : 'View "No History" Empty State'}
</button>
</div>

{!showEmptyState ? (

<div className="flex flex-col space-y-space-sm">

<label className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-card border border-border-crisp hover:border-mining-gold-bright/40 transition-colors cursor-pointer">
<input defaultChecked className="mt-1 accent-amber-500 rounded cursor-pointer" type="checkbox"/>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between gap-2">
<span className="font-body-md text-body-md font-semibold text-text-primary truncate">BCCL_Overburden_Q3_2024.pdf</span>
<span className="px-1.5 py-0.5 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald shrink-0">Indexed</span>
</div>
<div className="flex items-center gap-space-xs mt-1 text-mono-citation text-text-muted">
<span>14.2 MB</span>
<span>•</span>
<span>Borehole &amp; OBR Survey</span>
<span>•</span>
<span>28 pages</span>
</div>
</div>
</label>

<label className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-card border border-border-crisp hover:border-mining-gold-bright/40 transition-colors cursor-pointer">
<input defaultChecked className="mt-1 accent-amber-500 rounded cursor-pointer" type="checkbox"/>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between gap-2">
<span className="font-body-md text-body-md font-semibold text-text-primary truncate">Geological_Lithology_Borehole_Data.xlsx</span>
<span className="px-1.5 py-0.5 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald shrink-0">Indexed</span>
</div>
<div className="flex items-center gap-space-xs mt-1 text-mono-citation text-text-muted">
<span>8.6 MB</span>
<span>•</span>
<span>Seams X-XII Drill Core Assay</span>
<span>•</span>
<span>14 Sheets</span>
</div>
</div>
</label>

<label className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-card/60 border border-border-subtle hover:border-border-crisp transition-colors opacity-75 cursor-pointer">
<input className="mt-1 accent-amber-500 rounded cursor-pointer" type="checkbox"/>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between gap-2">
<span className="font-body-md text-body-md font-medium text-text-secondary truncate">Coal_Washing_Beneficiation_Analysis.pdf</span>
<span className="px-1.5 py-0.5 rounded text-mono-citation font-semibold bg-surface-dim text-text-muted shrink-0">Excluded</span>
</div>
<div className="flex items-center gap-space-xs mt-1 text-mono-citation text-text-muted">
<span>15.1 MB</span>
<span>•</span>
<span>Patherdih Washery Output</span>
<span>•</span>
<span>Unchecked</span>
</div>
</div>
</label>
</div>
) : (

<div className="flex flex-col items-center justify-center p-space-xl rounded-xl border border-dashed border-border-crisp bg-surface-card/30 text-center">
<div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center text-text-muted mb-space-sm">
<span className="material-symbols-outlined text-[28px]">folder_off</span>
</div>
<h4 className="font-headline-md text-headline-md font-bold text-text-primary">No History Found</h4>
<p className="font-body-sm text-body-sm text-text-muted max-w-xs mt-1 mb-space-md">
              No geological documents uploaded yet for this mining quadrant. Add bore logs or production returns to initiate RAG indexing.
            </p>
<button className="px-3 py-1.5 bg-primary-container text-surface-base font-bold text-body-sm rounded" type="button">
              Upload First Geological File
            </button>
</div>
)}
</div>

<div className="mt-space-xl pt-space-md border-t border-border-subtle flex flex-col space-y-space-sm">
<div className="p-space-md rounded-lg border-2 border-dashed border-border-crisp hover:border-mining-gold-bright bg-surface-card/40 flex flex-col items-center justify-center text-center transition-all cursor-pointer">
<span className="material-symbols-outlined text-[22px] text-mining-gold-bright mb-1">cloud_upload</span>
<span className="font-body-sm text-body-sm font-semibold text-text-primary">Drop Drill Core Logs or Survey PDFs</span>
<span className="font-mono-citation text-mono-citation text-text-muted mt-0.5">Supports PDF, XLSX, LAS 2.0, CSV (Max 250MB)</span>
</div>
<div className="flex items-center justify-between font-mono-citation text-mono-citation text-text-muted px-1">
<span className="flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-govtech-emerald"></span>
              Parser: CMPDI Multimodal OCR v4.2
            </span>
<button className="text-text-secondary hover:text-text-primary underline" type="button">External Borehole Link</button>
</div>
</div>
</aside>



<main className="w-full xl:w-[65%] flex flex-col bg-surface-base p-space-lg space-y-space-lg overflow-y-auto">



{subView === 'analytics' && (
<div className="flex flex-col space-y-space-lg w-full">

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="p-space-md rounded-xl bg-surface-card border border-border-crisp flex flex-col justify-between">
<div className="flex items-center justify-between mb-1">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Coal Extraction</span>
<span className="px-1.5 py-0.2 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald">+6.2% YoY</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">14.82 <span className="text-headline-md font-normal text-text-muted">MT</span></div>
<div className="font-body-sm text-body-sm text-text-secondary mt-1">Target: 14.50 MT (FY24-25 Q3)</div>
</div>

<div className="p-space-md rounded-xl bg-surface-card border border-border-crisp flex flex-col justify-between">
<div className="flex items-center justify-between mb-1">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Overburden (OBR)</span>
<span className="px-1.5 py-0.2 rounded text-mono-citation font-semibold bg-mining-gold-bright/10 text-mining-gold-bright">98.2% Plan</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">32.14 <span className="text-headline-md font-normal text-text-muted">M.Cu.M</span></div>
<div className="font-body-sm text-body-sm text-text-secondary mt-1">Pits 1-6 Jharia Quadrants</div>
</div>

<div className="p-space-md rounded-xl bg-surface-card border border-border-crisp flex flex-col justify-between">
<div className="flex items-center justify-between mb-1">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Stripping Ratio</span>
<span className="px-1.5 py-0.2 rounded text-mono-citation font-semibold bg-surface-hover text-text-secondary">+0.06 Var</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-mining-gold-bright font-bold">2.16 <span className="text-headline-md font-normal text-text-muted">Cu.M/T</span></div>
<div className="font-body-sm text-body-sm text-text-secondary mt-1">Normative Baseline: 2.10</div>
</div>

<div className="p-space-md rounded-xl bg-surface-card border border-border-crisp flex flex-col justify-between">
<div className="flex items-center justify-between mb-1">
<span className="font-mono-label text-mono-label text-text-muted uppercase">Inferred Reserves</span>
<span className="px-1.5 py-0.2 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald">Audited</span>
</div>
<div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">184.5 <span className="text-headline-md font-normal text-text-muted">MT</span></div>
<div className="font-body-sm text-body-sm text-text-secondary mt-1">Seams X, XI, XII Prime Coking</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">

<div className="flex flex-col p-space-lg rounded-xl bg-surface-card border border-border-crisp justify-between">
<div>
<div className="flex items-center justify-between pb-space-sm border-b border-border-crisp mb-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-mining-gold-bright text-[20px]">bar_chart</span>
<h3 className="font-headline-md text-headline-md font-bold text-text-primary">Pit-Wise Production vs Target</h3>
</div>
<span className="font-mono-citation text-mono-citation text-text-muted">In Million Tonnes (MT)</span>
</div>
<p className="font-body-sm text-body-sm text-text-secondary mb-space-md">
                  Active opencast extraction telemetry across Jharia subsidiary operational sectors compared to monthly target benchmarks.
                </p>
</div>

<div className="space-y-space-md py-space-sm">

<div className="space-y-1">
<div className="flex justify-between text-body-sm font-semibold">
<span className="text-text-primary">Pit 1 - Lodna</span>
<span className="font-mono-label text-mono-label text-govtech-emerald">3.40 / 3.20 MT (106%)</span>
</div>
<div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
<div className="h-full bg-mining-gold-bright rounded-full" style={{ width: "85%" }}></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between text-body-sm font-semibold">
<span className="text-text-primary">Pit 2 - Kusunda</span>
<span className="font-mono-label text-mono-label text-mining-gold-bright">4.10 / 4.15 MT (98.7%)</span>
</div>
<div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
<div className="h-full bg-mining-gold-bright rounded-full" style={{ width: "98%" }}></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between text-body-sm font-semibold">
<span className="text-text-primary">Pit 3 - Katras</span>
<span className="font-mono-label text-mono-label text-govtech-emerald">2.85 / 2.70 MT (105%)</span>
</div>
<div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
<div className="h-full bg-mining-gold-bright rounded-full" style={{ width: "71%" }}></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between text-body-sm font-semibold">
<span className="text-text-primary">Pit 4 - PB Project Area</span>
<span className="font-mono-label text-mono-label text-state-warning">1.95 / 2.20 MT (88.6%)</span>
</div>
<div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
<div className="h-full bg-state-warning rounded-full" style={{ width: "58%" }}></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between text-body-sm font-semibold">
<span className="text-text-primary">Pit 5 - Bastacolla</span>
<span className="font-mono-label text-mono-label text-govtech-emerald">1.60 / 1.50 MT (106%)</span>
</div>
<div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
<div className="h-full bg-mining-gold-bright rounded-full" style={{ width: "48%" }}></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between text-body-sm font-semibold">
<span className="text-text-primary">Pit 6 - Moonidih Open Flank</span>
<span className="font-mono-label text-mono-label text-text-muted">0.92 / 0.75 MT (122%)</span>
</div>
<div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
<div className="h-full bg-tertiary-container rounded-full" style={{ width: "32%" }}></div>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-sm border-t border-border-crisp text-mono-citation text-text-muted">
<span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-mining-gold-bright"></span> Actual Extraction</span>
<span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-surface-dim border border-border-crisp"></span> Baseline Capacity</span>
</div>
</div>

<div className="flex flex-col p-space-lg rounded-xl bg-surface-card border border-border-crisp space-y-space-base">
<div className="flex items-center justify-between pb-space-sm border-b border-border-crisp">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary-container text-[20px]">psychology</span>
<h3 className="font-headline-md text-headline-md font-bold text-text-primary">Automated Word Cloud &amp; Topics</h3>
</div>
<span className="font-mono-citation text-mono-citation px-space-xs py-0.5 rounded bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/30">NLP Entity Model</span>
</div>

<div className="p-space-md rounded-lg bg-surface-dim/80 border border-border-crisp flex flex-wrap items-center justify-center gap-x-space-md gap-y-space-xs text-center py-6 select-none">
<span className="text-[32px] font-bold text-mining-gold-bright tracking-tight leading-none hover:scale-105 transition-transform cursor-pointer" title="Frequency: 48 occurrences">Overburden</span>
<span className="text-[20px] font-semibold text-tertiary-container tracking-normal hover:scale-105 transition-transform cursor-pointer" title="Frequency: 28 occurrences">Stripping Ratio</span>
<span className="text-[26px] font-bold text-govtech-emerald leading-none hover:scale-105 transition-transform cursor-pointer" title="Frequency: 39 occurrences">Opencast</span>
<span className="text-[14px] font-mono-label text-text-secondary hover:text-text-primary cursor-pointer" title="Frequency: 16 occurrences">Methane Drainage</span>
<span className="text-[24px] font-bold text-mining-gold-bright leading-none hover:scale-105 transition-transform cursor-pointer" title="Frequency: 35 occurrences">Coking Coal</span>
<span className="text-[18px] font-semibold text-text-primary hover:scale-105 transition-transform cursor-pointer" title="Frequency: 24 occurrences">Seam XII</span>
<span className="text-[15px] font-medium text-govtech-emerald hover:scale-105 transition-transform cursor-pointer" title="Frequency: 19 occurrences">HEMM Fleet</span>
<span className="text-[16px] font-semibold text-tertiary-container hover:scale-105 transition-transform cursor-pointer" title="Frequency: 21 occurrences">Beneficiation</span>
<span className="text-[12px] font-mono-citation text-text-muted hover:text-text-secondary cursor-pointer" title="Frequency: 11 occurrences">Borehole Assay</span>
</div>

<div className="space-y-space-xs">
<span className="font-mono-label text-mono-label text-text-muted uppercase tracking-wider">Identified Statutory Findings:</span>
<div className="flex flex-col space-y-space-xs pt-1">

<div className="flex items-center justify-between p-2 rounded bg-surface-dim border border-border-crisp">
<div className="flex items-center gap-space-sm min-w-0">
<span className="w-1.5 h-1.5 rounded-full bg-govtech-emerald shrink-0"></span>
<span className="font-body-sm text-body-sm font-medium text-text-primary truncate">Strata: Seam XI Hard Sandstone Roof</span>
</div>
<span className="px-2 py-0.5 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald border border-govtech-emerald/30 shrink-0">High Stability</span>
</div>

<div className="flex items-center justify-between p-2 rounded bg-surface-dim border border-border-crisp">
<div className="flex items-center gap-space-sm min-w-0">
<span className="w-1.5 h-1.5 rounded-full bg-state-warning shrink-0"></span>
<span className="font-body-sm text-body-sm font-medium text-text-primary truncate">Enviro: Pit 4 Deepening &amp; OBR Dump</span>
</div>
<span className="px-2 py-0.5 rounded text-mono-citation font-semibold bg-state-warning/20 text-state-warning border border-state-warning/30 shrink-0">Pending MoEFCC</span>
</div>

<div className="flex items-center justify-between p-2 rounded bg-surface-dim border border-border-crisp">
<div className="flex items-center gap-space-sm min-w-0">
<span className="w-1.5 h-1.5 rounded-full bg-govtech-emerald shrink-0"></span>
<span className="font-body-sm text-body-sm font-medium text-text-primary truncate">Backfilling: Quarry 12 Depleted Void</span>
</div>
<span className="px-2 py-0.5 rounded text-mono-citation font-semibold bg-govtech-emerald-dim text-govtech-emerald border border-govtech-emerald/30 shrink-0">Compliant (DGMS)</span>
</div>

<div className="flex items-center justify-between p-2 rounded bg-surface-dim border border-border-crisp">
<div className="flex items-center gap-space-sm min-w-0">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-container shrink-0"></span>
<span className="font-body-sm text-body-sm font-medium text-text-primary truncate">Mine Dewatering: Active Sump Drainage</span>
</div>
<span className="px-2 py-0.5 rounded text-mono-citation font-semibold bg-surface-hover text-text-secondary shrink-0">4,200 GPM Cont.</span>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between p-space-lg rounded-xl bg-gradient-to-r from-surface-card via-surface-card to-surface-dim border border-primary-container/30 gap-space-base shadow-sm">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-mining-gold-bright shrink-0">
<span className="material-symbols-outlined text-[26px]">task_alt</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md font-bold text-text-primary">Synthesized Executive Geological Brief Available</span>
<p className="font-body-sm text-body-sm text-text-secondary mt-0.5">Automated DGMS compliance checklist, reserve computation, and borehole cross-sections ready for official download.</p>
</div>
</div>
<Link href="/reports" className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-mining-gold-deep text-surface-base font-body-md font-bold flex items-center gap-space-xs transition-all shrink-0">
<span>Open in Statutory Report Center</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
</div>
</div>
)}



{subView === 'chat' && (
<div className="flex flex-col space-y-space-base w-full flex-1">

<div className="flex items-center justify-between px-space-md py-2 rounded-lg bg-surface-card border border-border-crisp">
<div className="flex items-center gap-space-sm text-body-sm text-text-secondary">
<span className="flex items-center gap-1 text-govtech-emerald font-semibold">
<span className="w-2 h-2 rounded-full bg-govtech-emerald animate-pulse"></span>
                RAG Context Active
              </span>
<span>•</span>
<span className="text-text-primary">2 Selected Files (22.8 MB)</span>
<span>•</span>
<span className="font-mono-citation text-text-muted">Gemini 1.5 Pro Multimodal Engine</span>
</div>
<div className="flex items-center gap-space-xs font-mono-citation text-mining-gold-bright">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>CMPDI Sovereign Safe</span>
</div>
</div>

<div className="flex flex-col space-y-space-base p-space-md rounded-xl bg-surface-dim border border-border-crisp min-h-[460px] overflow-y-auto">

<div className="flex justify-end">
<div className="max-w-xl p-space-md rounded-xl rounded-tr-none bg-surface-hover border border-border-crisp text-text-primary font-body-md leading-relaxed shadow-sm">
<div className="flex items-center justify-between gap-space-base text-mono-citation text-text-muted mb-1 pb-1 border-b border-border-crisp">
<span className="font-semibold text-mining-gold-bright">Er. Dinesh Sharma (Chief Surveyor)</span>
<span>14:32 IST</span>
</div>
                What is the certified stripping ratio variance and overburden removal status for Pit 4 in BCCL Jharia Opencast for Q3?
              </div>
</div>

<div className="flex justify-start">
<div className="max-w-2xl p-space-lg rounded-xl rounded-tl-none bg-surface-card border border-border-crisp text-text-primary space-y-space-base shadow-sm">
<div className="flex items-center justify-between pb-space-xs border-b border-border-crisp">
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-primary-container flex items-center justify-center text-surface-base font-bold text-[12px]">AI</span>
<span className="font-body-md font-bold text-text-primary">CMPDI GeoReport AI Synthesizer</span>
</div>
<span className="px-space-xs py-0.5 rounded text-mono-citation bg-govtech-emerald-dim text-govtech-emerald border border-govtech-emerald/30 font-semibold">100% Grounded</span>
</div>
<div className="font-body-md text-body-md text-text-secondary leading-relaxed space-y-space-sm">
<p>Based on certified geotechnical assay and monthly coal-survey records for <span className="text-text-primary font-semibold">BCCL Jharia Pit 4 (PB Project Area)</span> for Q3 FY24-25:</p>
<ul className="list-disc list-inside space-y-1 text-text-primary font-body-md pl-1">
<li>
<strong className="text-mining-gold-bright">Overburden Removal (OBR):</strong> Pit 4 logged <span className="font-mono-label font-semibold text-text-primary">4.82 M.Cu.M</span> against a planned target of <span className="font-mono-label text-text-primary">5.44 M.Cu.M</span> (achievement rate: <strong>88.6%</strong>). The shortfall is attributed to delayed shovel haulage clearance at bench #4.
                    </li>
<li>
<strong className="text-mining-gold-bright">Stripping Ratio:</strong> Realized composite stripping ratio stands at <span className="font-mono-label font-semibold text-text-primary">2.47 Cu.M/T</span> against the normative baseline of <span className="font-mono-label text-text-primary">2.10 Cu.M/T</span> (Variance: <span className="text-state-warning font-semibold">+0.37 Cu.M/T</span>).
                    </li>
<li>
<strong className="text-mining-gold-bright">Strata Safety Notice:</strong> Seam XI roof stability remains within DGMS parameters; however, slope inclinometer #4 reported 2.1mm displacement near western haul road.
                    </li>
</ul>
</div>

<div className="pt-space-sm border-t border-border-crisp space-y-space-xs">
<span className="font-mono-label text-mono-label text-text-muted uppercase tracking-wider block">Verifiable Audit Citations:</span>
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1 px-space-sm py-1 rounded bg-surface-dim text-tertiary-container border border-tertiary-container/40 font-mono-citation hover:bg-surface-hover cursor-pointer" title="Click to view parsed source snippet">
<span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
<span>[Source: BCCL_Overburden_Q3_2024.pdf — Page 14, Table 3.2]</span>
</span>
<span className="inline-flex items-center gap-1 px-space-sm py-1 rounded bg-surface-dim text-tertiary-container border border-tertiary-container/40 font-mono-citation hover:bg-surface-hover cursor-pointer" title="Click to view parsed sheet cells">
<span className="material-symbols-outlined text-[14px]">table_chart</span>
<span>[Source: Geological_Lithology_Borehole_Data.xlsx — Sheet: Seam_XI_Strata]</span>
</span>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col space-y-space-xs">
<span className="font-mono-citation text-mono-citation text-text-muted uppercase tracking-wider">Suggested Parliamentary Secretariat Queries:</span>
<div className="flex flex-wrap gap-space-xs">
<button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card hover:bg-surface-hover border border-border-crisp hover:border-mining-gold-bright text-text-secondary hover:text-text-primary text-body-sm transition-all" onClick={() => setChatInput('Draft Lok Sabha Unstarred Question reply on Coking Coal reserves in Jharia Seams X-XII')} type="button">
<span className="material-symbols-outlined text-[14px] text-mining-gold-bright">gavel</span>
<span>Draft Lok Sabha Unstarred Question reply on Coking Coal reserves</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card hover:bg-surface-hover border border-border-crisp hover:border-mining-gold-bright text-text-secondary hover:text-text-primary text-body-sm transition-all" onClick={() => setChatInput('Summarize environmental clearance bottlenecks for Pit 4 deepening and MoEFCC status')} type="button">
<span className="material-symbols-outlined text-[14px] text-state-warning">nature_people</span>
<span>Summarize environmental clearance bottlenecks for Seam XI</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card hover:bg-surface-hover border border-border-crisp hover:border-mining-gold-bright text-text-secondary hover:text-text-primary text-body-sm transition-all" onClick={() => setChatInput('Calculate stripping ratio variance across Pits 1 to 6 in comparative table')} type="button">
<span className="material-symbols-outlined text-[14px] text-tertiary-container">calculate</span>
<span>Calculate stripping ratio variance across Pits 1 to 6</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card hover:bg-surface-hover border border-border-crisp hover:border-mining-gold-bright text-text-secondary hover:text-text-primary text-body-sm transition-all" onClick={() => setChatInput('Extract DGMS safety compliance audit highlights and haul road slope observations')} type="button">
<span className="material-symbols-outlined text-[14px] text-govtech-emerald">health_and_safety</span>
<span>Extract DGMS safety compliance audit highlights</span>
</button>
</div>
</div>

<div className="relative w-full rounded-xl bg-surface-card border border-border-crisp p-space-xs flex items-center gap-space-xs shadow-lg focus-within:border-mining-gold-bright transition-colors">
<button className="w-9 h-9 rounded-lg bg-surface-dim hover:bg-surface-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors shrink-0" title="Attach external drill logs" type="button">
<span className="material-symbols-outlined text-[20px]">attach_file</span>
</button>
<input className="w-full bg-transparent text-body-md text-text-primary placeholder:text-text-muted focus:outline-none px-2" placeholder="Ask a geological, mining, or parliamentary inquiry on BCCL Jharia..." type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
<button className="w-9 h-9 rounded-lg bg-surface-dim hover:bg-surface-hover text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors shrink-0" title="Voice Input (Surveyor Dictation)" type="button">
<span className="material-symbols-outlined text-[20px]">mic</span>
</button>
<button className="px-space-md h-9 rounded-lg bg-primary-container hover:bg-mining-gold-deep text-surface-base font-bold text-body-sm flex items-center gap-1 transition-all shrink-0" onClick={() => alert('Query executed against multimodal RAG index.')} type="button">
<span>Send</span>
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
</div>
</div>
)}
</main>
</div>
</div>
)}
</div>
  );
}
