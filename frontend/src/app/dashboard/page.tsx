"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { ProtectedPage } from "@/components/ProtectedPage";
import { ApiError, getMockReport, submitQuery, uploadDocument } from "@/lib/api";
import type {
  DocumentRecord,
  QueryResponse,
  ReportData,
} from "@/lib/report-types";

const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ["pdf", "xlsx", "csv", "tif", "tiff"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function DataModeBadge({ dataMode }: { dataMode: ReportData["dataMode"] }) {
  const isDemo = dataMode === "demo";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-1 font-mono-citation text-mono-citation font-semibold ${
        isDemo
          ? "border-mining-gold-bright/40 bg-mining-gold-bright/10 text-mining-gold-bright"
          : "border-govtech-emerald/40 bg-govtech-emerald-dim text-govtech-emerald"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isDemo ? "bg-mining-gold-bright" : "bg-govtech-emerald"}`} />
      {isDemo ? "BCCL demo data" : "Live processing"}
    </span>
  );
}

function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[440px] flex-col items-center justify-center rounded-xl border border-dashed border-border-crisp bg-surface-card/40 p-space-xl text-center">
      <span className="material-symbols-outlined mb-space-sm text-[34px] text-mining-gold-bright">
        cloud_off
      </span>
      <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary">
        Mine Workspace is unavailable
      </h1>
      <p className="mt-space-sm max-w-lg text-body-md text-text-secondary">
        We could not load the BCCL Jharia report from the service. Check that the backend is running, then try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-space-lg inline-flex items-center gap-2 rounded-lg bg-primary-container px-space-lg py-2.5 font-body-md font-bold text-surface-base transition-colors hover:bg-mining-gold-deep"
      >
        <span className="material-symbols-outlined text-[18px]">refresh</span>
        Retry report load
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const { user, token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [document, setDocument] = useState<DocumentRecord | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState<QueryResponse | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const loadReport = async () => {
    setIsLoadingReport(true);
    setReportError(null);

    try {
      setReport(await getMockReport(token ?? undefined));
    } catch (error) {
      setReportError(getErrorMessage(error));
    } finally {
      setIsLoadingReport(false);
    }
  };

  useEffect(() => {
    void loadReport();
  }, []);

  const maxProduction = useMemo(() => {
    if (!report) {
      return 1;
    }

    return Math.max(
      1,
      ...report.productionByPit.map(({ actualMT, targetMT }) => Math.max(actualMT, targetMT)),
    );
  }, [report]);

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
      setSelectedFile(null);
      setUploadError("Select a PDF, XLSX, CSV, TIF, or TIFF file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setSelectedFile(null);
      setUploadError("Files must be 50 MB or smaller.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Choose a supported file before uploading.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await uploadDocument(selectedFile, token ?? undefined);
      setDocument(response.document);
      setReport(response.report);
      setQueryResponse(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadError(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery || !report) {
      return;
    }

    setIsQuerying(true);
    setQueryError(null);

    try {
      const response = await submitQuery(trimmedQuery, document?.id ?? report.metadata.reportId, token ?? undefined);
      setQueryResponse(response);
      setQuery("");
    } catch (error) {
      setQueryError(getErrorMessage(error));
    } finally {
      setIsQuerying(false);
    }
  };

  const reportMode = queryResponse?.dataMode ?? report?.dataMode;

  return (
    <ProtectedPage>
      <div className="w-full px-space-base py-space-xl sm:px-space-xl">
        {isLoadingReport ? (
          <div className="flex min-h-[440px] flex-col items-center justify-center gap-space-sm text-text-secondary">
            <span className="material-symbols-outlined animate-spin text-[32px] text-mining-gold-bright">progress_activity</span>
            <p className="font-body-md">Loading the BCCL Jharia workspace…</p>
          </div>
        ) : reportError || !report ? (
          <EmptyState onRetry={() => void loadReport()} />
        ) : (
          <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-space-lg">
            <section className="flex flex-col justify-between gap-space-base rounded-xl border border-border-crisp bg-surface-card p-space-lg lg:flex-row lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[27px] text-mining-gold-bright">landscape</span>
                  <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary">Mine Workspace</h1>
                  <DataModeBadge dataMode={report.dataMode} />
                </div>
                <p className="mt-space-xs text-body-md text-text-secondary">
                  BCCL Jharia active demonstration workspace · {report.metadata.period}
                </p>
                <p className="mt-1 font-mono-citation text-mono-citation text-text-muted">
                  {report.metadata.title} · {report.metadata.region}
                </p>
              </div>
              <div className="rounded-lg border border-border-crisp bg-surface-dim px-space-md py-space-sm text-right">
                <p className="font-mono-citation text-mono-citation uppercase tracking-wider text-text-muted">Signed in as</p>
                <p className="text-body-sm font-semibold text-text-primary">{user?.name ?? user?.email ?? "Workspace user"}</p>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-space-lg xl:grid-cols-[minmax(280px,0.34fr)_minmax(0,0.66fr)]">
              <aside className="flex flex-col gap-space-lg rounded-xl border border-border-crisp bg-surface-dim p-space-lg">
                <div>
                  <div className="flex items-center justify-between gap-space-sm border-b border-border-crisp pb-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[20px] text-mining-gold-bright">upload_file</span>
                      <h2 className="font-headline-md text-headline-md font-bold text-text-primary">Add a source document</h2>
                    </div>
                  </div>
                  <p className="mt-space-sm text-body-sm text-text-secondary">
                    Upload one file for this session. It becomes the context for your next questions.
                  </p>
                </div>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-crisp bg-surface-card/40 p-space-xl text-center transition-colors hover:border-mining-gold-bright">
                  <span className="material-symbols-outlined text-[30px] text-mining-gold-bright">cloud_upload</span>
                  <span className="mt-space-xs text-body-sm font-semibold text-text-primary">Choose a document</span>
                  <span className="mt-1 font-mono-citation text-mono-citation text-text-muted">PDF, XLSX, CSV, TIF, TIFF · max 50 MB</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept=".pdf,.xlsx,.csv,.tif,.tiff,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,image/tiff"
                    onChange={handleFileSelection}
                  />
                </label>

                {selectedFile && (
                  <div className="rounded-lg border border-border-crisp bg-surface-card p-space-md">
                    <p className="truncate text-body-sm font-semibold text-text-primary">{selectedFile.name}</p>
                    <p className="mt-1 font-mono-citation text-mono-citation text-text-muted">{formatFileSize(selectedFile.size)} · ready to upload</p>
                  </div>
                )}

                {uploadError && <p role="alert" className="rounded-lg border border-error/30 bg-error-container/20 p-space-sm text-body-sm text-error">{uploadError}</p>}

                <button
                  type="button"
                  onClick={() => void handleUpload()}
                  disabled={!selectedFile || isUploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary-container px-space-lg font-body-md font-bold text-surface-base transition-colors hover:bg-mining-gold-deep disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isUploading ? "animate-spin" : ""}`}>{isUploading ? "progress_activity" : "upload"}</span>
                  {isUploading ? "Uploading…" : "Upload document"}
                </button>

                <div className="border-t border-border-crisp pt-space-md">
                  <h3 className="font-body-md font-semibold text-text-primary">Current session context</h3>
                  {document ? (
                    <div className="mt-space-sm rounded-lg border border-govtech-emerald/30 bg-govtech-emerald-dim/30 p-space-md">
                      <p className="truncate text-body-sm font-semibold text-text-primary">{document.fileName}</p>
                      <p className="mt-1 font-mono-citation text-mono-citation text-text-secondary">
                        {formatFileSize(document.size)} · {document.status}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-space-sm text-body-sm text-text-muted">No uploaded document yet. Questions use the BCCL report context.</p>
                  )}
                </div>
              </aside>

              <main className="flex min-w-0 flex-col gap-space-lg">
                <section className="grid grid-cols-1 gap-space-base sm:grid-cols-2 2xl:grid-cols-4">
                  <MetricCard label="Coal Production" value={`${report.kpis.coalProductionMT} MT`} detail={`Target ${report.kpis.coalProductionTargetMT} MT`} icon="factory" />
                  <MetricCard label="Overburden Removed (OBR)" value={`${report.kpis.overburdenRemovalMCuM} M.Cu.M`} detail={`Stripping ratio ${report.kpis.strippingRatio}`} icon="landslide" />
                  <MetricCard label="Stripping Ratio" value={report.kpis.strippingRatio.toFixed(2)} detail={`Target ${report.kpis.strippingRatioTarget.toFixed(2)}`} icon="balance" />
                  <MetricCard label="Inferred Coking Coal Resources" value={`${report.kpis.inferredReservesMT} MT`} detail={report.kpis.activeSeams.join(", ")} icon="layers" />
                </section>

                <section className="rounded-xl border border-border-crisp bg-surface-card p-space-lg">
                  <div className="flex flex-col justify-between gap-space-sm border-b border-border-crisp pb-space-sm sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-headline-md text-headline-md font-bold text-text-primary">Pit production</h2>
                      <p className="mt-1 text-body-sm text-text-secondary">Actual coal production compared with target, in million tonnes.</p>
                    </div>
                    <span className="font-mono-citation text-mono-citation text-text-muted">{report.metadata.period}</span>
                  </div>
                  <div className="mt-space-md space-y-space-md">
                    {report.productionByPit.map(({ pit, actualMT, targetMT }) => {
                      const achievement = (actualMT / targetMT) * 100;
                      const width = Math.min(100, (actualMT / maxProduction) * 100);
                      return (
                        <div key={pit}>
                          <div className="mb-1 flex flex-wrap justify-between gap-1 text-body-sm">
                            <span className="font-semibold text-text-primary">{pit}</span>
                            <span className={achievement >= 100 ? "font-mono-citation text-govtech-emerald" : "font-mono-citation text-state-warning"}>
                              {actualMT.toFixed(2)} / {targetMT.toFixed(2)} MT ({achievement.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-surface-dim">
                            <div className={achievement >= 100 ? "h-full rounded-full bg-govtech-emerald" : "h-full rounded-full bg-mining-gold-bright"} style={{ width: `${width}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-2">
                  <section className="rounded-xl border border-border-crisp bg-surface-card p-space-lg">
                    <h2 className="font-headline-md text-headline-md font-bold text-text-primary">Topics in the report</h2>
                    <div className="mt-space-md flex flex-wrap gap-space-sm">
                      {report.wordcloud.map(({ value, count }) => (
                        <span key={value} title={`${count} mentions`} className="rounded-full border border-border-crisp bg-surface-dim px-3 py-1.5 text-body-sm font-medium text-text-primary">
                          {value} <span className="font-mono-citation text-text-muted">{count}</span>
                        </span>
                      ))}
                    </div>
                    <div className="mt-space-lg space-y-space-xs border-t border-border-crisp pt-space-md">
                      {report.topics.map(({ name, status, sentiment }) => (
                        <div key={name} className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-dim px-space-sm py-2">
                          <span className="text-body-sm font-medium text-text-primary">{name}</span>
                          <span className={`rounded px-2 py-0.5 font-mono-citation text-mono-citation ${topicStyle(sentiment)}`}>{status}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl border border-border-crisp bg-surface-card p-space-lg">
                    <h2 className="font-headline-md text-headline-md font-bold text-text-primary">Executive sections</h2>
                    <div className="mt-space-md space-y-space-md">
                      {report.executiveReport.sections.map(({ title, content }) => (
                        <article key={title} className="border-l-2 border-mining-gold-bright pl-space-md">
                          <h3 className="text-body-sm font-semibold text-text-primary">{title}</h3>
                          <p className="mt-1 text-body-sm leading-relaxed text-text-secondary">{content}</p>
                        </article>
                      ))}
                    </div>
                    <Link href="/reports" className="mt-space-lg inline-flex items-center gap-1 text-body-sm font-semibold text-mining-gold-bright hover:text-primary">
                      Open Decision Briefs <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </section>
                </div>

                <section className="rounded-xl border border-border-crisp bg-surface-card p-space-lg">
                  <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-border-crisp pb-space-sm">
                    <div>
                      <h2 className="font-headline-md text-headline-md font-bold text-text-primary">Source-grounded Q&amp;A</h2>
                      <p className="mt-1 text-body-sm text-text-secondary">Ask about the active BCCL report or the document uploaded in this session.</p>
                    </div>
                    {reportMode && <DataModeBadge dataMode={reportMode} />}
                  </div>

                  {queryResponse && (
                    <div className="mt-space-md rounded-xl border border-border-crisp bg-surface-dim p-space-md">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[18px] text-mining-gold-bright">smart_toy</span>
                        <h3 className="text-body-sm font-semibold text-text-primary">Response</h3>
                      </div>
                      <p className="mt-space-sm whitespace-pre-wrap text-body-md leading-relaxed text-text-secondary">{queryResponse.answer}</p>
                      {queryResponse.citations.length > 0 && (
                        <div className="mt-space-md border-t border-border-crisp pt-space-sm">
                          <p className="font-mono-label text-mono-label uppercase tracking-wider text-text-muted">Sources</p>
                          <div className="mt-space-xs flex flex-wrap gap-space-xs">
                            {queryResponse.citations.map((citation, index) => (
                              <span key={`${citation.source}-${citation.page}-${index}`} className="inline-flex items-center gap-1 rounded border border-tertiary-container/40 bg-tertiary-container/10 px-2 py-1 font-mono-citation text-mono-citation text-tertiary-container">
                                <span className="material-symbols-outlined text-[14px]">description</span>
                                {citation.source}{citation.page ? ` · page ${citation.page}` : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {queryError && <p role="alert" className="mt-space-md rounded-lg border border-error/30 bg-error-container/20 p-space-sm text-body-sm text-error">{queryError}</p>}

                  <form onSubmit={handleQuery} className="mt-space-md flex flex-col gap-space-sm sm:flex-row">
                    <label className="sr-only" htmlFor="workspace-question">Ask a question about the active context</label>
                    <input
                      id="workspace-question"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      disabled={isQuerying}
                      placeholder="Ask about production, geology, or the uploaded document…"
                      className="h-11 min-w-0 flex-1 rounded-lg border border-border-crisp bg-surface-dim px-space-md text-body-md text-text-primary placeholder:text-text-muted focus:border-mining-gold-bright focus:outline-none disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={!query.trim() || isQuerying}
                      className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-primary-container px-space-lg font-body-md font-bold text-surface-base transition-colors hover:bg-mining-gold-deep disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isQuerying ? "animate-spin" : ""}`}>{isQuerying ? "progress_activity" : "arrow_upward"}</span>
                      {isQuerying ? "Asking…" : "Ask"}
                    </button>
                  </form>
                </section>
              </main>
            </div>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
}) {
  return (
    <article className="rounded-xl border border-border-crisp bg-surface-card p-space-md">
      <div className="flex items-start justify-between gap-space-sm">
        <span className="text-body-sm font-medium text-text-secondary">{label}</span>
        <span className="material-symbols-outlined text-[20px] text-mining-gold-bright">{icon}</span>
      </div>
      <p className="mt-space-sm font-mono-metric-md text-mono-metric-md font-bold text-text-primary">{value}</p>
      <p className="mt-1 text-body-sm text-text-muted">{detail}</p>
    </article>
  );
}

function topicStyle(sentiment: string): string {
  switch (sentiment) {
    case "positive":
      return "bg-govtech-emerald-dim text-govtech-emerald";
    case "warning":
      return "bg-state-warning/20 text-state-warning";
    default:
      return "bg-surface-hover text-text-secondary";
  }
}
