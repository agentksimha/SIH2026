"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReportsPage() {
  const [toast, setToast] = useState<{title: string; subtitle: string} | null>(null);
  const [expandedCitations, setExpandedCitations] = useState<Set<string>>(new Set(['cit-1', 'cit-2', 'cit-3']));

  const triggerAction = (title: string, subtitle: string) => {
    setToast({ title, subtitle });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleCitation = (id: string) => {
    setExpandedCitations(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Interactive Toast Notification Component */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-space-md px-space-base py-space-sm rounded-lg bg-surface-card shadow-2xl text-text-primary border-l-4 border-mining-gold-bright ${toast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`} 
        id="toastNotification"
      >
        <span className="material-symbols-outlined text-mining-gold-bright text-[22px]">verified_user</span>
        <div className="flex flex-col">
          <span className="font-body-md text-body-md font-semibold text-text-primary" id="toastTitle">{toast?.title || 'Cryptographic Hash Verified'}</span>
          <span className="font-mono-citation text-mono-citation text-text-secondary" id="toastSubtitle">{toast?.subtitle || 'Audit log record appended to MoC Ledger: 0x9e12...b4'}</span>
        </div>
      </div>
      
      {/* Document Action & Statutory Status Bar */}
      <div className="w-full bg-surface-container-low px-space-xl py-space-md shadow-md">
        <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
          {/* Left Protocol Specs */}
          <div className="flex flex-wrap items-center gap-space-md min-w-0">
            <div className="flex items-center gap-space-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-state-warning animate-ping"></div>
              <span className="font-mono-label text-mono-label text-text-muted uppercase tracking-wider">Protocol ID:</span>
              <span className="font-mono-metric-md text-mono-metric-md text-text-primary">CMPDI-GEO-2024-BCCL-091</span>
            </div>
            <div className="h-4 w-px bg-border-subtle hidden sm:block"></div>
            <span className="px-space-xs py-0.5 rounded bg-error-container/30 text-error font-mono-citation text-mono-citation tracking-wide uppercase font-semibold">
              RESTRICTED / OFFICIAL USE
            </span>
            <div className="h-4 w-px bg-border-subtle hidden md:block"></div>
            <div className="flex items-center gap-space-xs text-text-secondary font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">neurology</span>
              <span>Synthesized: <span className="text-text-primary font-mono-citation text-mono-citation">Today, 08:30 IST</span> via Gemini 1.5 Pro</span>
            </div>
          </div>
          {/* Right Actions Matrix */}
          <div className="flex flex-wrap items-center gap-space-sm w-full lg:w-auto justify-end">
            <button className="px-space-md py-2 rounded-lg bg-surface-card hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-all flex items-center gap-space-xs shadow-sm" id="printBtn" onClick={() => window.print()} title="Print Executive Docket">
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span className="font-body-sm text-body-sm hidden sm:inline">Print</span>
            </button>
            <button className="px-space-md py-2 rounded-lg bg-surface-card hover:bg-surface-hover text-text-primary transition-all flex items-center gap-space-xs shadow-sm" id="shareSecretariatBtn" onClick={() => triggerAction('Secretariat Briefing Packet Dispatched', 'Encrypted copy queued for Standing Committee Table')}>
              <span className="material-symbols-outlined text-tertiary text-[18px]">send_time_extension</span>
              <span className="font-body-sm text-body-sm font-medium">Share Secretariat</span>
            </button>
            <a className="px-space-md py-2 rounded-lg bg-surface-card hover:bg-surface-hover text-secondary transition-all flex items-center gap-space-xs shadow-sm" href="#traceability-anchor">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              <span className="font-body-sm text-body-sm font-medium">Verify Citations</span>
            </a>
            <button className="px-space-lg py-2 rounded-lg bg-primary-container hover:bg-mining-gold-deep text-surface-base font-headline-md text-body-md font-bold transition-all flex items-center gap-space-xs shadow-md shadow-primary-container/20" id="exportPdfBtn" onClick={() => triggerAction('Statutory PDF Generated', 'Official Seal and SHA-256 Digest Attached')}>
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              <span>Export Ministry Brief (PDF)</span>
            </button>
          </div>
        </div>
      </div>
      {/* Primary Workspace Canvas: Two Column Inspection Grid */}
      <div className="w-full px-space-base sm:px-space-xl py-space-xl max-w-[1680px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* LEFT COLUMN: 70% Width (Col span 8 on wide, Col span 12 on mobile) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* The Official Letterhead Docket Container */}
            <article className="bg-surface-card rounded-xl p-space-base sm:p-space-2xl md:p-space-3xl relative overflow-hidden shadow-2xl">
              {/* Institutional Watermark Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <span className="material-symbols-outlined text-[540px] select-none text-mining-gold-bright">account_balance</span>
              </div>
              {/* Letterhead Header Embellishment */}
              <header className="relative z-10 flex flex-col pb-space-xl gap-space-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-base">
                  {/* National Insignia Emblem & Agency Details */}
                  <div className="flex items-center gap-space-base text-center sm:text-left">
                    <div className="w-16 h-16 rounded-full bg-surface-base flex items-center justify-center p-2 shadow-inner">
                      <span className="material-symbols-outlined text-mining-gold-bright text-[38px]">assured_workload</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono-citation text-mono-citation tracking-[0.2em] text-mining-gold-bright uppercase font-bold">Government of India</span>
                      <span className="font-headline-md text-headline-md font-bold text-text-primary tracking-tight">Ministry of Coal</span>
                      <span className="font-body-sm text-body-sm text-text-secondary">Central Mine Planning and Design Institute (CMPDI)</span>
                    </div>
                  </div>
                  {/* Dispatch Identifiers & Classification Stamp */}
                  <div className="flex flex-col items-center sm:items-end gap-1">
                    <div className="px-space-sm py-1 rounded bg-mining-gold-bright/10 text-mining-gold-bright font-mono-citation text-mono-citation font-bold uppercase tracking-wider">
                      MoC / CMPDI-HQ / STAT-2024-Q3
                    </div>
                    <span className="font-mono-citation text-mono-citation text-text-muted">Dated: 24 October 2024</span>
                    <span className="font-mono-citation text-mono-citation text-text-muted">Security Tier: CONFIDENTIAL (CAT-II)</span>
                  </div>
                </div>
                {/* Title & Horizon Bar */}
                <div className="pt-space-md">
                  <div className="h-1 w-24 bg-mining-gold-bright mb-space-sm rounded-full"></div>
                  <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight leading-snug uppercase">
                    Executive Geological &amp; Operational Brief: BCCL Jharia Coalfield — Q3 Statutory Synthesis
                  </h1>
                  <p className="font-body-md text-body-md text-text-secondary mt-1">
                    Comprehensive audit submitted pursuant to Section 46 of the Mines Act, 1952, for scrutiny of standing committee delegates and Director General of Mines Safety (DGMS).
                  </p>
                </div>
              </header>
              {/* Metadata Structured Block Grid */}
              <section className="relative z-10 my-space-lg p-space-lg rounded-lg bg-surface-base/80 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-base">
                  <div className="flex flex-col">
                    <span className="font-mono-label text-mono-label text-text-muted uppercase">Target Subsidiary</span>
                    <span className="font-body-md text-body-md font-semibold text-text-primary mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-mining-gold-bright"></span>
                      Bharat Coking Coal Ltd.
                    </span>
                    <span className="font-mono-citation text-mono-citation text-text-muted">HQ: Koyla Bhawan, Dhanbad</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-label text-mono-label text-text-muted uppercase">Primary Coalfield</span>
                    <span className="font-body-md text-body-md font-semibold text-text-primary mt-1">Jharia Basin Sector</span>
                    <span className="font-mono-citation text-mono-citation text-tertiary">Barakar Formation (Seams X, XI, XII)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-label text-mono-label text-text-muted uppercase">Target Audience</span>
                    <span className="font-body-md text-body-md font-semibold text-text-primary mt-1">Standing Committee</span>
                    <span className="font-mono-citation text-mono-citation text-text-muted">Dept. of Coal &amp; Steel (Lok Sabha)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-label text-mono-label text-text-muted uppercase">Contributing Surveyors</span>
                    <span className="font-body-md text-body-md font-semibold text-text-primary mt-1">RI-II (Dhanbad)</span>
                    <span className="font-mono-citation text-mono-citation text-secondary">Chief Surveyor Er. D. Sharma</span>
                  </div>
                </div>
              </section>
              {/* Executive Body Sections */}
              <div className="relative z-10 flex flex-col gap-space-2xl text-text-primary">
                {/* Section 1: Executive Abstract */}
                <section className="flex flex-col gap-space-sm" id="sec-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-md text-headline-md font-bold flex items-center gap-space-xs text-text-primary">
                      <span className="font-mono-citation text-mono-citation text-mining-gold-bright px-1.5 py-0.5 rounded bg-mining-gold-deep/20">01</span>
                      Executive Abstract &amp; Production Trajectory
                    </h2>
                    <span className="font-mono-citation text-mono-citation text-text-muted">Source: Overburden Return v4</span>
                  </div>
                  <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                    Cumulative raw coal excavation across the operational open-cast and underground leases of the Jharia Basin culminated at <strong className="text-text-primary font-semibold">14.82 Million Metric Tonnes (MT)</strong> for the quarter ending September 2024, demonstrating an aggregate increase of <span className="text-secondary font-mono-citation text-mono-citation font-bold">+6.2% YoY</span> relative to Q3 FY2023-24. Heavy earth-moving machinery (HEMM) availability sustained a mean of 79.4%, driven by retrofitted telemetry across major draglines deployed at the East Katras block.
                  </p>
                  {/* Key Production Metric Strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm my-space-xs">
                    <div className="p-space-md rounded bg-surface-base">
                      <span className="font-mono-label text-mono-label text-text-muted">Raw Production</span>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-mining-gold-bright mt-1">14.82 <span className="text-xs font-normal">MT</span></div>
                      <span className="font-mono-citation text-mono-citation text-secondary">+6.2% YoY (Target: 14.5MT)</span>
                    </div>
                    <div className="p-space-md rounded bg-surface-base">
                      <span className="font-mono-label text-mono-label text-text-muted">Stripping Ratio (Actual)</span>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-text-primary mt-1">1:2.42</div>
                      <span className="font-mono-citation text-mono-citation text-state-warning">Target: 1:2.85 (Deficit)</span>
                    </div>
                    <div className="p-space-md rounded bg-surface-base">
                      <span className="font-mono-label text-mono-label text-text-muted">Active Draglines</span>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-text-primary mt-1">11 / 12</div>
                      <span className="font-mono-citation text-mono-citation text-secondary">91.6% Serviceability</span>
                    </div>
                    <div className="p-space-md rounded bg-surface-base">
                      <span className="font-mono-label text-mono-label text-text-muted">Washery Feed</span>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-tertiary mt-1">3.10 <span className="text-xs font-normal">MT</span></div>
                      <span className="font-mono-citation text-mono-citation text-text-muted">Patherdih Integrated</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs mt-1">
                    <span className="font-mono-citation text-mono-citation px-space-xs py-0.5 rounded bg-surface-base text-tertiary">
                      Ref: Doc BCCL-OB-2024 p.12
                    </span>
                    <span className="text-border-subtle">|</span>
                    <span className="font-body-sm text-body-sm text-text-muted">Verified by CMPDI Geo-Telemetry stream.</span>
                  </div>
                </section>
                {/* Section 2: Lithological Stratigraphy & Seam Thickness Analysis */}
                <section className="flex flex-col gap-space-md" id="sec-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-md text-headline-md font-bold flex items-center gap-space-xs text-text-primary">
                      <span className="font-mono-citation text-mono-citation text-mining-gold-bright px-1.5 py-0.5 rounded bg-mining-gold-deep/20">02</span>
                      Lithological Stratigraphy &amp; Seam Thickness Analysis
                    </h2>
                    <span className="font-mono-citation text-mono-citation text-secondary">Assay Precision: 99.8%</span>
                  </div>
                  <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                    Petrographic core profiling executed by Regional Institute-II across 34 diamond drill boreholes (Series BH-JH-901 to 935) substantiates significant persistence of high-volatile, metallurgical coking beds within Seams X, XI, and XII. Variations in parting depth and tectonic intrusions require revised bench slopes to mitigate face-spalling.
                  </p>
                  {/* Lithology Interactive Table */}
                  <div className="overflow-x-auto rounded-lg bg-surface-base shadow-inner">
                    <table className="w-full text-left font-body-sm text-body-sm">
                      <thead className="bg-surface-container-high text-text-secondary uppercase font-mono-label text-mono-label">
                        <tr>
                          <th className="py-3 px-4">Seam ID</th>
                          <th className="py-3 px-4">Stratigraphic Depth</th>
                          <th className="py-3 px-4">Mean Thickness</th>
                          <th className="py-3 px-4">Ash Content (%)</th>
                          <th className="py-3 px-4">Volatile Matter</th>
                          <th className="py-3 px-4 text-right">Washability Yield</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle/50 text-text-primary">
                        <tr className="hover:bg-surface-hover/50 transition-colors">
                          <td className="py-3 px-4 font-mono-metric-md text-mining-gold-bright font-bold">Seam XII</td>
                          <td className="py-3 px-4 font-mono-citation text-mono-citation text-text-secondary">85.4m - 122.0m</td>
                          <td className="py-3 px-4 font-semibold">4.82 m ± 0.3</td>
                          <td className="py-3 px-4 font-mono-metric-md text-secondary">16.4%</td>
                          <td className="py-3 px-4 font-mono-metric-md">26.1%</td>
                          <td className="py-3 px-4 text-right font-mono-metric-md text-secondary">54.2%</td>
                        </tr>
                        <tr className="hover:bg-surface-hover/50 transition-colors">
                          <td className="py-3 px-4 font-mono-metric-md text-mining-gold-bright font-bold">Seam XI</td>
                          <td className="py-3 px-4 font-mono-citation text-mono-citation text-text-secondary">138.1m - 184.6m</td>
                          <td className="py-3 px-4 font-semibold">6.45 m ± 0.2</td>
                          <td className="py-3 px-4 font-mono-metric-md text-secondary">18.6%</td>
                          <td className="py-3 px-4 font-mono-metric-md">24.5%</td>
                          <td className="py-3 px-4 text-right font-mono-metric-md text-secondary">49.8%</td>
                        </tr>
                        <tr className="hover:bg-surface-hover/50 transition-colors">
                          <td className="py-3 px-4 font-mono-metric-md text-mining-gold-bright font-bold">Seam X</td>
                          <td className="py-3 px-4 font-mono-citation text-mono-citation text-text-secondary">210.0m - 278.4m</td>
                          <td className="py-3 px-4 font-semibold">9.20 m ± 0.6</td>
                          <td className="py-3 px-4 font-mono-metric-md text-state-warning">21.8%</td>
                          <td className="py-3 px-4 font-mono-metric-md">22.4%</td>
                          <td className="py-3 px-4 text-right font-mono-metric-md text-state-warning">42.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Contextual Callout */}
                  <div className="p-space-md rounded-lg bg-surface-base/60 flex items-start gap-space-md">
                    <span className="material-symbols-outlined text-tertiary text-[22px] mt-0.5">science</span>
                    <div className="flex flex-col text-text-secondary font-body-sm text-body-sm">
                      <span className="font-semibold text-text-primary">CMPDI Petrographic Finding:</span>
                      Coking properties satisfy Steel Authority of India (SAIL) blending thresholds (Crucible Swelling Number: 4.5 to 6.0). Clean coal fraction after beneficiation at Patherdih Washery meets direct metallurgical Grade W-II specifications.
                    </div>
                  </div>
                </section>
                {/* Section 3: Operational Impediments & Stripping Ratio Discrepancies */}
                <section className="flex flex-col gap-space-sm" id="sec-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-md text-headline-md font-bold flex items-center gap-space-xs text-text-primary">
                      <span className="font-mono-citation text-mono-citation text-mining-gold-bright px-1.5 py-0.5 rounded bg-mining-gold-deep/20">03</span>
                      Operational Impediments &amp; Stripping Ratio Discrepancies
                    </h2>
                    <span className="font-mono-citation text-mono-citation text-state-critical">Requires Redressal</span>
                  </div>
                  <p className="font-body-lg text-body-lg leading-relaxed text-text-secondary">
                    A notable operational divergence is registered within <strong className="text-text-primary font-semibold">Pit 4 of the Pootkee Balihari sector</strong>, logging a <span className="text-state-critical font-bold">-20.4% shortfall</span> against statutory production targets. The causative factor is definitively attributed to the non-receipt of the MoEFCC Phase-II Environmental Clearance for the 42-hectare northern overburden dump footprint.
                  </p>
                  {/* Diagnostic Divergence Card */}
                  <div className="p-space-lg rounded-lg bg-surface-container-low shadow-sm flex flex-col gap-space-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-state-critical">warning</span>
                        <span className="font-headline-md text-headline-md font-semibold text-text-primary">Pootkee Balihari Diagnostic Summary</span>
                      </div>
                      <span className="px-space-sm py-0.5 rounded bg-state-critical/20 text-state-critical font-mono-citation text-mono-citation font-bold">CRITICAL ATTENTION</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base pt-space-xs">
                      <div className="flex flex-col">
                        <span className="font-mono-label text-mono-label text-text-muted">Dumping Capacity Saturation</span>
                        <span className="font-mono-metric-md text-mono-metric-md text-state-critical mt-0.5">97.8% Reached</span>
                        <span className="font-body-sm text-body-sm text-text-secondary">Truck cycle times inflated by 18 mins.</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono-label text-mono-label text-text-muted">Excavator Fleet Availability</span>
                        <span className="font-mono-metric-md text-mono-metric-md text-state-warning mt-0.5">72.0% (vs. 85% Benchmark)</span>
                        <span className="font-body-sm text-body-sm text-text-secondary">Hydraulic seal spares pending customs.</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono-label text-mono-label text-text-muted">MoEFCC Clearance Stage</span>
                        <span className="font-mono-metric-md text-mono-metric-md text-mining-gold-bright mt-0.5">Stage-II EAC Deferred</span>
                        <span className="font-body-sm text-body-sm text-text-secondary">Scheduled for 14 Nov 2024 committee.</span>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Section 4: Statutory Compliance & DGMS Safety Recommendations */}
                <section className="flex flex-col gap-space-sm" id="sec-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-md text-headline-md font-bold flex items-center gap-space-xs text-text-primary">
                      <span className="font-mono-citation text-mono-citation text-mining-gold-bright px-1.5 py-0.5 rounded bg-mining-gold-deep/20">04</span>
                      Statutory Directives &amp; DGMS Safety Provisos
                    </h2>
                    <span className="font-mono-citation text-mono-citation text-govtech-emerald">Audit Cleared (With Covenants)</span>
                  </div>
                  <div className="space-y-space-md">
                    <div className="p-space-base rounded-lg bg-surface-base flex items-start gap-space-md">
                      <div className="p-1 rounded bg-govtech-emerald-dim text-govtech-emerald mt-1">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md font-semibold text-text-primary">DGMS Water Inundation Circular No. 12 (Deep Pit Mandate)</span>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                          Inundation risk mitigation requires BCCL to expand active sump dewatering capacity from present 3,200 GPM to a minimum of <strong className="text-text-primary">5,500 GPM before 15 May 2025</strong>. Procurement orders for 4 high-head centrifugal slurry pumps must be finalized with Bharat Earth Movers Ltd. (BEML) by December 2024.
                        </p>
                      </div>
                    </div>
                    <div className="p-space-base rounded-lg bg-surface-base flex items-start gap-space-md">
                      <div className="p-1 rounded bg-govtech-emerald-dim text-govtech-emerald mt-1">
                        <span className="material-symbols-outlined text-[18px]">nature_people</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md font-semibold text-text-primary">Compensatory Afforestation Audit</span>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                          Verification of 180 hectares afforestation in non-mineralized zones shows 91.2% sapling survival index under drone hyperspectral inspection. Drone flight data uploaded to CMPDI Geo-Portal repo ID #26023.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Official Sign-off & Cryptographic Verification Stamp Block */}
                <footer className="pt-space-2xl mt-space-xl border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-space-xl">
                  {/* Left: Chief Surveyor Signature Block */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="h-12 flex items-end mb-1">
                      {/* Vector Signature Representation */}
                      <svg className="h-8 w-44 text-mining-gold-bright" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 200 40">
                        <path d="M10 25 C 25 10, 45 40, 60 15 C 75 -5, 85 35, 110 20 C 130 10, 140 30, 160 15 C 175 5, 185 25, 195 20" />
                        <path d="M40 32 L 140 32" strokeDasharray="2 4" />
                      </svg>
                    </div>
                    <span className="font-headline-md text-body-lg font-bold text-text-primary">Er. Dinesh Sharma, M.Tech (Mine Surv.)</span>
                    <span className="font-mono-citation text-mono-citation text-mining-gold-bright">Chief Surveyor &amp; Technical Advisor</span>
                    <span className="font-body-sm text-body-sm text-text-secondary">CMPDI Regional Institute-II, Dhanbad</span>
                    <span className="font-mono-citation text-mono-citation text-text-muted mt-0.5">Govt. Certificate of Competency No. 8914-CC</span>
                  </div>
                  {/* Center: Official Ministry Letterhead Seal */}
                  <div className="flex flex-col items-center justify-center p-space-md rounded-full bg-surface-base w-32 h-32 text-center shadow-lg relative">
                    <div className="absolute inset-1 rounded-full border border-dashed border-mining-gold-bright/30"></div>
                    <span className="material-symbols-outlined text-mining-gold-bright text-[28px]">verified</span>
                    <span className="font-mono-citation text-[9px] uppercase tracking-wider text-text-primary font-bold mt-1">Ministry of Coal</span>
                    <span className="font-mono-citation text-[8px] text-text-muted">OFFICIAL AUDIT</span>
                    <span className="font-mono-citation text-[7px] text-mining-gold-bright">2024-BCCL-HQ</span>
                  </div>
                  {/* Right: Immutable Hash & QR Verification */}
                  <div className="flex items-center gap-space-md bg-surface-base p-space-md rounded-lg shadow-sm">
                    {/* Dynamic Hash QR Representation */}
                    <div className="w-16 h-16 bg-text-primary p-1 rounded flex items-center justify-center">
                      <svg className="w-full h-full text-surface-base" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h4v4h-4v-4zm-4-2h2v2h-2v-2zm2-2h2v2h-2v-2zm-2 4h-2v-2h2v2zm2 2v2h-2v-2h2zm4-4v-2h-2v2h2zm0 4h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono-label text-mono-label text-text-muted uppercase">SHA-256 Digest</span>
                      <span className="font-mono-citation text-mono-citation text-tertiary">e3b0c44298fc1c...</span>
                      <span className="font-mono-citation text-mono-citation text-govtech-emerald mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-govtech-emerald"></span>
                        Blockchain Ledger Synced
                      </span>
                      <button className="text-left font-mono-citation text-mono-citation text-mining-gold-bright hover:underline mt-0.5" onClick={() => triggerAction('Hash Verification', 'Block height: 792,104 | Merkle root verified on NIC GovCloud')}>
                        View Verification Log →
                      </button>
                    </div>
                  </div>
                </footer>
              </div>
            </article>
            {/* Contextual Document Action Secondary Dock */}
            <div className="flex items-center justify-between p-space-base rounded-lg bg-surface-card shadow-sm">
              <div className="flex items-center gap-space-sm text-text-secondary font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-mining-gold-bright text-[20px]">history</span>
                <span>Synthesized against CMPDI DataStore Knowledge Base (Updated: 24 Oct, 04:00 IST)</span>
              </div>
              <Link className="font-mono-citation text-mono-citation text-mining-gold-bright hover:text-text-primary flex items-center gap-1" href="/dashboard">
                <span>Back to Dashboard</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          {/* RIGHT COLUMN: 30% Width (Col span 4 on wide, Col span 12 on mobile) */}
          {/* Source Attribution & Multimodal Traceability Engine Panel */}
          <aside className="lg:col-span-4 flex flex-col gap-space-lg" id="traceability-anchor">
            {/* Panel Card Container */}
            <div className="bg-surface-card rounded-xl p-space-xl shadow-xl flex flex-col gap-space-lg">
              {/* Header */}
              <div className="flex items-center justify-between pb-space-sm border-b border-border-subtle">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-mining-gold-bright text-[22px]">source_notes</span>
                  <h3 className="font-headline-md text-headline-md font-bold text-text-primary">Multimodal Traceability</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-govtech-emerald-dim text-govtech-emerald font-mono-citation text-mono-citation font-bold">
                  100% RAG Provenance
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-text-secondary -mt-2">
                Every analytical claim in the briefing docket is cross-referenced with uploaded legacy filings and geological assay core drills.
              </p>
              {/* Citation Stream / Items List */}
              <div className="flex flex-col gap-space-md">
                {/* Citation 1: Overburden Metrics */}
                <div className="p-space-md rounded-lg bg-surface-base hover:bg-surface-hover/70 transition-all cursor-pointer group shadow-sm" onClick={() => toggleCitation('cit-1')}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-space-xs min-w-0">
                      <span className="material-symbols-outlined text-state-warning text-[20px]">picture_as_pdf</span>
                      <span className="font-mono-citation text-mono-citation font-semibold text-text-primary truncate">BCCL_Overburden_Q3_2024.pdf</span>
                    </div>
                    <span className="font-mono-citation text-mono-citation px-1.5 py-0.5 rounded bg-surface-container-high text-tertiary whitespace-nowrap">
                      Pages 12–16
                    </span>
                  </div>
                  <div className="mt-2 text-text-secondary font-body-sm text-body-sm">
                    Extracted: Stripping ratios, dragline serviceability percentages, and Pit 4 overburden delays.
                  </div>
                  {/* Collapsible Preview Detail */}
                  {expandedCitations.has('cit-1') && (
                    <div className="mt-space-sm pt-space-sm border-t border-border-subtle/60 flex flex-col gap-1" id="cit-1">
                      <div className="flex items-center justify-between text-text-muted font-mono-citation text-mono-citation">
                        <span>Table 3.2: HEMM Availability</span>
                        <span className="text-govtech-emerald">Strict Match (99.8%)</span>
                      </div>
                      <div className="font-mono-citation text-mono-citation bg-surface-dim p-2 rounded text-tertiary">
                        &gt; Draglines 11/12 operational | Strip Ratio 1:2.42 | Pootkee Balihari dump sat: 97.8%
                      </div>
                    </div>
                  )}
                </div>
                {/* Citation 2: Lithology Assay Borehole Core */}
                <div className="p-space-md rounded-lg bg-surface-base hover:bg-surface-hover/70 transition-all cursor-pointer group shadow-sm" onClick={() => toggleCitation('cit-2')}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-space-xs min-w-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">table_chart</span>
                      <span className="font-mono-citation text-mono-citation font-semibold text-text-primary truncate">Geological_Lithology_Borehole.xlsx</span>
                    </div>
                    <span className="font-mono-citation text-mono-citation px-1.5 py-0.5 rounded bg-surface-container-high text-tertiary whitespace-nowrap">
                      Rows 142–289
                    </span>
                  </div>
                  <div className="mt-2 text-text-secondary font-body-sm text-body-sm">
                    Extracted: Core drill assay metrics for Seams X, XI, and XII. Proximate analysis &amp; ash yields.
                  </div>
                  {expandedCitations.has('cit-2') && (
                    <div className="mt-space-sm pt-space-sm border-t border-border-subtle/60 flex flex-col gap-1" id="cit-2">
                      <div className="flex items-center justify-between text-text-muted font-mono-citation text-mono-citation">
                        <span>Assay Register RI-II</span>
                        <span className="text-govtech-emerald">Extractive (100%)</span>
                      </div>
                      <div className="font-mono-citation text-mono-citation bg-surface-dim p-2 rounded text-mining-gold-bright">
                        &gt; Seam XII Ash: 16.4%, VM: 26.1% | Seam XI: 18.6% Ash | Seam X: 21.8% Ash
                      </div>
                    </div>
                  )}
                </div>
                {/* Citation 3: DGMS Standard Manual */}
                <div className="p-space-md rounded-lg bg-surface-base hover:bg-surface-hover/70 transition-all cursor-pointer group shadow-sm" onClick={() => toggleCitation('cit-3')}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-space-xs min-w-0">
                      <span className="material-symbols-outlined text-state-critical text-[20px]">policy</span>
                      <span className="font-mono-citation text-mono-citation font-semibold text-text-primary truncate">DGMS_Standard_Operating_23-24.pdf</span>
                    </div>
                    <span className="font-mono-citation text-mono-citation px-1.5 py-0.5 rounded bg-surface-container-high text-tertiary whitespace-nowrap">
                      Section 4.1
                    </span>
                  </div>
                  <div className="mt-2 text-text-secondary font-body-sm text-body-sm">
                    Extracted: Safety regulations for deep-pit dewatering pump capacities prior to monsoon entry.
                  </div>
                  {expandedCitations.has('cit-3') && (
                    <div className="mt-space-sm pt-space-sm border-t border-border-subtle/60 flex flex-col gap-1" id="cit-3">
                      <div className="flex items-center justify-between text-text-muted font-mono-citation text-mono-citation">
                        <span>Govt Standard DGMS-OC-54</span>
                        <span className="text-govtech-emerald">Regulatory Baseline</span>
                      </div>
                      <div className="font-mono-citation text-mono-citation bg-surface-dim p-2 rounded text-text-primary">
                        &gt; Mandate: Minimum 5,500 GPM pump redundancy for deep opencast sumps below 150m MSL.
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Audit & LLM Engine Telemetry Box */}
              <div className="mt-space-xs p-space-base rounded-lg bg-surface-base flex flex-col gap-space-md shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-mono-label text-text-muted uppercase">Model Parameters</span>
                  <span className="font-mono-citation text-mono-citation text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Gemini 1.5 Pro
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-space-sm text-text-secondary font-body-sm text-body-sm">
                  <div className="flex flex-col">
                    <span className="font-mono-citation text-mono-citation text-text-muted">Hallucination Index</span>
                    <span className="font-mono-metric-md text-mono-metric-md text-secondary font-bold">0.00%</span>
                    <span className="text-[10px] text-text-muted leading-tight">Extractive citations only</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-citation text-mono-citation text-text-muted">Token Volume</span>
                    <span className="font-mono-metric-md text-mono-metric-md text-text-primary font-bold">25,960</span>
                    <span className="text-[10px] text-text-muted leading-tight">24,120 In / 1,840 Out</span>
                  </div>
                </div>
                <div className="pt-space-xs border-t border-border-subtle flex items-center justify-between">
                  <span className="font-mono-citation text-mono-citation text-text-muted">Auditor Verification:</span>
                  <span className="font-body-sm text-body-sm font-semibold text-text-primary">Er. Dinesh Sharma</span>
                </div>
              </div>
              {/* Quick Navigation to Interactive Q&A */}
              <div className="p-space-base rounded-lg bg-surface-container-high flex flex-col gap-space-xs">
                <span className="font-headline-md text-body-md font-bold text-text-primary">Parliamentary Query Center</span>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  Need to test counterfactual scenarios or request alternate seam washability models?
                </p>
                <Link className="mt-2 w-full py-2 px-space-md rounded-lg bg-surface-card hover:bg-surface-hover text-mining-gold-bright border-none font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm" href="/dashboard" onClick={() => triggerAction('Q&amp;A Environment Initialized', 'Context loaded with BCCL Jharia Basin data')}>
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  <span>Open in Intelligence Workspace</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
