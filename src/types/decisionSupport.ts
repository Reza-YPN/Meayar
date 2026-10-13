export interface PersonnelPerformanceRecord {
  id: string;
  personnelId: string;
  name: string;
  unit: string;
  rank: string;
  overallScore: number; // 0-100
  resultScore: number; // 0-100
  behavioralScore: number; // 0-100
  competencyScore: number; // 0-100
  trainingHours: number;
  overtimeHours: number;
  leaveDays: number;
  citizenSatisfaction: number; // 0-100
  burnoutRisk: 'پایین' | 'متوسط' | 'بالا' | 'بحرانی';
  period: string; // e.g. "بهار ۱۴۰۳"
  updatedAt: string;
}

export interface UnitPerformanceData {
  unitCode: string;
  unitName: string;
  parentCommand: string;
  personnelCount: number;
  averagePerformanceScore: number;
  averageResultScore: number;
  averageCompetencyScore: number;
  averageOvertimeHours: number;
  averageTrainingHours: number;
  turnoverRate: number; // percentage
  citizenSatisfactionRate: number; // percentage
  operationalReadiness: number; // percentage
  disciplinaryRate: number; // per 100 personnel
  status: 'عالی' | 'مطلوب' | 'هشدار' | 'بحرانی';
  historicalTrend: {
    period: string;
    score: number;
    overtime: number;
    training: number;
    satisfaction: number;
  }[];
}

export interface ActionProposal {
  id: string;
  title: string;
  category: 'تعدیل شیفت و نیروی انسانی' | 'آموزش و توانمندسازی' | 'رفاهی و جبران خدمات' | 'فرماندهی و مدیریت انضباطی' | 'تجهیزات و پشتیبانی';
  description: string;
  priority: 'فوری و بحرانی' | 'اولویت بالا' | 'متوسط' | 'بلندمدت';
  targetUnit: string;
  affectedPersonnelCount: number;
  estimatedImpact: string;
  status: 'در انتظار تایید فرمانده' | 'تایید شده و ابلاغ گردید' | 'رد شده' | 'در حال اجرا';
  approvedAt?: string;
  approvedBy?: string;
  directiveNumber?: string;
  actionSteps: string[];
}

export interface DecisionInsight {
  id: string;
  title: string;
  severity: 'high' | 'warning' | 'info' | 'success';
  unitCode: string;
  unitName: string;
  summary: string;
  detectedCorrelation: {
    primaryMetric: string;
    correlatedMetric: string;
    correlationScore: number; // e.g. -0.85 (negative correlation)
    description: string;
  };
  rootCauses: {
    id: string;
    factor: string;
    weight: number; // percentage
    evidence: string;
  }[];
  proposals: ActionProposal[];
  confidenceScore: number; // 0-100%
  generatedAt: string;
}

export interface ExcelImportRow {
  rowNumber: number;
  raw: Record<string, any>;
  parsedData?: any;
  status: 'valid' | 'warning' | 'error';
  messages: string[];
}

export interface ExcelImportSummary {
  fileName: string;
  fileSize: number;
  totalRows: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  dataType: 'personnel' | 'unit_kpis' | 'competencies' | 'attendance';
  timestamp: string;
  rows: ExcelImportRow[];
}
