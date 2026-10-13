export type ScheinLayer = "artifacts" | "values" | "assumptions";

export type ProcessingAlgorithm = "protective" | "strategic" | "diagnostic";

export interface CultureSheetItem {
  id: string;
  category: string; // e.g. انضباط مالی و اقتصادی
  indicator: string; // e.g. ارتشا و اختلاس
  manifestation: string; // e.g. عدم پای‌بندی به اخلاقیات / پای‌بندی به اعتقادات مذهبی
  scheinLevel: "ارزش آشکار منفی" | "ارزش آشکار مثبت" | "مصنوعات منفی" | "مصنوعات مثبت" | "مفروضات بنیادین منفی" | "مفروضات بنیادین مثبت";
  layer: ScheinLayer;
  weight: number;
}

export interface DepartmentCultureData {
  id: string;
  name: string; // e.g. اداری ۱
  type: "administrative" | "province" | "precinct_unit";
  complianceScore: number; // 0 - 100
  healthScore: number; // 0 - 100
  status: "stable" | "needs_improvement";
  artifactsScore: number;
  valuesScore: number;
  assumptionsScore: number;
  description: string;
  keyIssues: {
    id: number;
    title: string;
    description: string;
  }[];
  actionPlans: {
    shortTerm: string[]; // داده‌محور
    midTerm: string[]; // اصلاح رفتاری
    longTerm: string[]; // ساختاری و توسعه‌ای
  };
  sampleItems: CultureSheetItem[];
  uploadedAt: string;
  respondentCount: number;
  roleTitle: string;
}

export interface StrategicReportData {
  archetype: string;
  archetypeSub: string;
  executiveSummary: string;
  strategicMissionProfile: string;
  comparisonAlphaId: string;
  comparisonBetaId: string;
  selectedDeptIds: string[];
  algorithm: ProcessingAlgorithm;
  activeLayers: Record<ScheinLayer, boolean>;
}
