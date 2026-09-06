// Mock data loaded from sample_data for offline-first prototype
// This re-exports the BCCL Jharia Basin mock data with TypeScript types

import mockJson from "./mock_bccl_report.json";

/* ── TypeScript Interfaces (from design.md §5) ── */

export interface MiningKpis {
  coalProductionMT: number;
  coalProductionTargetMT: number;
  yoyGrowthPercent: number;
  overburdenRemovalMCuM: number;
  strippingRatio: number;
  strippingRatioTarget: number;
  inferredReservesMT: number;
  activeSeams: string[];
}

export interface PitProduction {
  pit: string;
  targetMT: number;
  actualMT: number;
}

export interface WordCloudItem {
  value: string;
  count: number;
}

export interface TopicTag {
  name: string;
  status: string;
  sentiment: "positive" | "warning" | "critical" | "neutral";
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface MockReport {
  metadata: {
    reportId: string;
    title: string;
    subsidiary: string;
    region: string;
    period: string;
    preparedBy: string;
    classification: string;
  };
  kpis: MiningKpis;
  productionByPit: PitProduction[];
  wordcloud: WordCloudItem[];
  topics: TopicTag[];
  executiveReport: {
    sections: ReportSection[];
  };
}

export const mockReport: MockReport = mockJson as MockReport;
export default mockReport;
