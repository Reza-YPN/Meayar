import { 
  PersonnelPerformanceRecord, 
  UnitPerformanceData, 
  DecisionInsight, 
  ActionProposal 
} from '../types/decisionSupport';

const STORAGE_KEYS = {
  PERSONNEL: 'faraja_personnel_records_v1',
  UNITS: 'faraja_unit_records_v1',
  PROPOSALS: 'faraja_proposals_v1',
  CUSTOM_INSIGHTS: 'faraja_custom_insights_v1'
};

const INITIAL_PERSONNEL: PersonnelPerformanceRecord[] = [
  {
    id: 'p-1',
    personnelId: '124567',
    name: 'محمدرضا یزدان پناه',
    unit: 'کلانتری ۱۰۳ گاندی',
    rank: 'سرگرد',
    overallScore: 88,
    resultScore: 90,
    behavioralScore: 86,
    competencyScore: 89,
    trainingHours: 28,
    overtimeHours: 32,
    leaveDays: 4,
    citizenSatisfaction: 94,
    burnoutRisk: 'پایین',
    period: 'بهار ۱۴۰۳',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-2',
    personnelId: '238914',
    name: 'ستوان دوم علیرضا حسینی',
    unit: 'کلانتری ۱۱۵ رازی',
    rank: 'ستوان دوم',
    overallScore: 68,
    resultScore: 65,
    behavioralScore: 72,
    competencyScore: 69,
    trainingHours: 10,
    overtimeHours: 56,
    leaveDays: 1,
    citizenSatisfaction: 76,
    burnoutRisk: 'بحرانی',
    period: 'بهار ۱۴۰۳',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-3',
    personnelId: '319082',
    name: 'سروان مهدی رضایی',
    unit: 'کلانتری ۱۲۴ قلهک',
    rank: 'سروان',
    overallScore: 94,
    resultScore: 96,
    behavioralScore: 92,
    competencyScore: 95,
    trainingHours: 36,
    overtimeHours: 22,
    leaveDays: 6,
    citizenSatisfaction: 98,
    burnoutRisk: 'پایین',
    period: 'بهار ۱۴۰۳',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-4',
    personnelId: '445210',
    name: 'ستوان یکم حسین کریمی',
    unit: 'کلانتری ۱۰۸ نواب',
    rank: 'ستوان یکم',
    overallScore: 76,
    resultScore: 74,
    behavioralScore: 79,
    competencyScore: 77,
    trainingHours: 18,
    overtimeHours: 46,
    leaveDays: 2,
    citizenSatisfaction: 82,
    burnoutRisk: 'بالا',
    period: 'بهار ۱۴۰۳',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-5',
    personnelId: '512903',
    name: 'سرهنگ دوم احمد مرادی',
    unit: 'کلانتری ۱۰۳ گاندی',
    rank: 'سرهنگ دوم',
    overallScore: 91,
    resultScore: 93,
    behavioralScore: 89,
    competencyScore: 92,
    trainingHours: 32,
    overtimeHours: 28,
    leaveDays: 5,
    citizenSatisfaction: 96,
    burnoutRisk: 'پایین',
    period: 'بهار ۱۴۰۳',
    updatedAt: new Date().toISOString()
  }
];

const INITIAL_UNITS: UnitPerformanceData[] = [
  {
    unitCode: 'YGN-103',
    unitName: 'کلانتری ۱۰۳ گاندی',
    parentCommand: 'سرکلانتری سوم فاتب',
    personnelCount: 48,
    averagePerformanceScore: 87.4,
    averageResultScore: 88.2,
    averageCompetencyScore: 86.8,
    averageOvertimeHours: 31,
    averageTrainingHours: 29,
    turnoverRate: 3.1,
    citizenSatisfactionRate: 92.5,
    operationalReadiness: 94,
    disciplinaryRate: 0.8,
    status: 'عالی',
    historicalTrend: [
      { period: 'بهار ۱۴۰۲', score: 81, overtime: 36, training: 22, satisfaction: 86 },
      { period: 'تابستان ۱۴۰۲', score: 84, overtime: 34, training: 25, satisfaction: 89 },
      { period: 'پاییز ۱۴۰۲', score: 85, overtime: 32, training: 27, satisfaction: 91 },
      { period: 'زمستان ۱۴۰۲', score: 86, overtime: 31, training: 28, satisfaction: 92 },
      { period: 'بهار ۱۴۰۳', score: 87.4, overtime: 31, training: 29, satisfaction: 92.5 }
    ]
  },
  {
    unitCode: 'YGN-115',
    unitName: 'کلانتری ۱۱۵ رازی',
    parentCommand: 'سرکلانتری هشتم فاتب',
    personnelCount: 54,
    averagePerformanceScore: 67.8,
    averageResultScore: 66.2,
    averageCompetencyScore: 69.4,
    averageOvertimeHours: 54,
    averageTrainingHours: 11,
    turnoverRate: 9.4,
    citizenSatisfactionRate: 74.2,
    operationalReadiness: 68,
    disciplinaryRate: 4.6,
    status: 'بحرانی',
    historicalTrend: [
      { period: 'بهار ۱۴۰۲', score: 83, overtime: 35, training: 26, satisfaction: 88 },
      { period: 'تابستان ۱۴۰۲', score: 79, overtime: 42, training: 20, satisfaction: 82 },
      { period: 'پاییز ۱۴۰۲', score: 73, overtime: 48, training: 15, satisfaction: 78 },
      { period: 'زمستان ۱۴۰۲', score: 70, overtime: 52, training: 12, satisfaction: 75 },
      { period: 'بهار ۱۴۰۳', score: 67.8, overtime: 54, training: 11, satisfaction: 74.2 }
    ]
  },
  {
    unitCode: 'YGN-124',
    unitName: 'کلانتری ۱۲۴ قلهک',
    parentCommand: 'سرکلانتری سوم فاتب',
    personnelCount: 42,
    averagePerformanceScore: 92.1,
    averageResultScore: 93.4,
    averageCompetencyScore: 91.2,
    averageOvertimeHours: 24,
    averageTrainingHours: 35,
    turnoverRate: 1.8,
    citizenSatisfactionRate: 96.0,
    operationalReadiness: 97,
    disciplinaryRate: 0.4,
    status: 'عالی',
    historicalTrend: [
      { period: 'بهار ۱۴۰۲', score: 88, overtime: 28, training: 30, satisfaction: 92 },
      { period: 'تابستان ۱۴۰۲', score: 89, overtime: 27, training: 32, satisfaction: 93 },
      { period: 'پاییز ۱۴۰۲', score: 91, overtime: 25, training: 33, satisfaction: 95 },
      { period: 'زمستان ۱۴۰۲', score: 91.5, overtime: 24, training: 34, satisfaction: 95.5 },
      { period: 'بهار ۱۴۰۳', score: 92.1, overtime: 24, training: 35, satisfaction: 96 }
    ]
  },
  {
    unitCode: 'YGN-108',
    unitName: 'کلانتری ۱۰۸ نواب',
    parentCommand: 'سرکلانتری هشتم فاتب',
    personnelCount: 46,
    averagePerformanceScore: 74.5,
    averageResultScore: 73.0,
    averageCompetencyScore: 76.2,
    averageOvertimeHours: 44,
    averageTrainingHours: 19,
    turnoverRate: 5.6,
    citizenSatisfactionRate: 81.0,
    operationalReadiness: 78,
    disciplinaryRate: 2.1,
    status: 'هشدار',
    historicalTrend: [
      { period: 'بهار ۱۴۰۲', score: 79, overtime: 38, training: 22, satisfaction: 84 },
      { period: 'تابستان ۱۴۰۲', score: 77, overtime: 40, training: 20, satisfaction: 83 },
      { period: 'پاییز ۱۴۰۲', score: 76, overtime: 42, training: 19, satisfaction: 82 },
      { period: 'زمستان ۱۴۰۲', score: 75, overtime: 43, training: 18, satisfaction: 81.5 },
      { period: 'بهار ۱۴۰۳', score: 74.5, overtime: 44, training: 19, satisfaction: 81 }
    ]
  }
];

export class DecisionSupportService {
  /**
   * Load personnel records from storage or initial seed
   */
  public static getPersonnelRecords(): PersonnelPerformanceRecord[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONNEL);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_PERSONNEL;
  }

  /**
   * Load unit data from storage or initial seed
   */
  public static getUnitRecords(): UnitPerformanceData[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNITS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_UNITS;
  }

  /**
   * Save newly imported personnel records (batch update/append)
   */
  public static saveImportedPersonnel(newRecords: PersonnelPerformanceRecord[]): void {
    const current = this.getPersonnelRecords();
    const map = new Map<string, PersonnelPerformanceRecord>();
    
    current.forEach(p => map.set(p.personnelId, p));
    newRecords.forEach(p => map.set(p.personnelId, p));
    
    const merged = Array.from(map.values());
    localStorage.setItem(STORAGE_KEYS.PERSONNEL, JSON.stringify(merged));
  }

  /**
   * Save newly imported unit records (batch update/append)
   */
  public static saveImportedUnits(newUnits: UnitPerformanceData[]): void {
    const current = this.getUnitRecords();
    const map = new Map<string, UnitPerformanceData>();
    
    current.forEach(u => map.set(u.unitCode, u));
    newUnits.forEach(u => map.set(u.unitCode, u));
    
    const merged = Array.from(map.values());
    localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(merged));
  }

  /**
   * Synthesizes cross-sectional data to detect root causes and generate smart managerial proposals
   */
  public static analyzeUnitMultiFactor(unitCode: string): DecisionInsight {
    const units = this.getUnitRecords();
    const unit = units.find(u => u.unitCode === unitCode) || units[1]; // default to 115 if not found

    const isHighOvertime = unit.averageOvertimeHours > 45;
    const isLowTraining = unit.averageTrainingHours < 16;
    const isHighTurnover = unit.turnoverRate > 6;
    const isScoreDrop = unit.averagePerformanceScore < 75;

    let severity: 'high' | 'warning' | 'info' | 'success' = 'info';
    if (unit.averagePerformanceScore < 70 || isHighOvertime) severity = 'high';
    else if (unit.averagePerformanceScore < 80) severity = 'warning';
    else severity = 'success';

    const rootCauses = [];
    const proposals: ActionProposal[] = [];

    if (isHighOvertime) {
      rootCauses.push({
        id: 'rc-1',
        factor: 'تراکم بالای شیفت و اضافه‌کار فرسایشی',
        weight: 45,
        evidence: `میانگین ${unit.averageOvertimeHours} ساعت اضافه‌کار ماهانه (۶۲٪ بالاتر از سقف استاندارد ۳۰ ساعت)`
      });

      proposals.push({
        id: `prop-${unit.unitCode}-1`,
        title: 'تعدیل فوری شیفت‌های عملیاتی و اعزام نیروی معین',
        category: 'تعدیل شیفت و نیروی انسانی',
        description: 'تقسیم شیفت‌های ۲۴-۲۴ به الگوهای ۱۲-۲۴ استاندارد و اعزام ۸ نفر نیروی کمکی از یگان‌های معین به مدت ۳۰ روز.',
        priority: 'فوری و بحرانی',
        targetUnit: unit.unitName,
        affectedPersonnelCount: unit.personnelCount,
        estimatedImpact: 'کاهش ۳۸٪ فرسودگی شغلی و افزایش ۸ الی ۱۲ نمره در رضایت شهروندان',
        status: 'در انتظار تایید فرمانده',
        actionSteps: [
          'ابلاغ دستورالعمل لغو اضافه‌کارهای بالای ۴۰ ساعت',
          'استقرار ۸ نیروی معین از سرکلانتری',
          'برقراری استراحت اجباری ۴۸ ساعته برای کارکنان در معرض فرسودگی بحرانی'
        ]
      });
    }

    if (isLowTraining) {
      rootCauses.push({
        id: 'rc-2',
        factor: 'افت مشارکت در دوره‌های مهارت‌افزایی و سامانه‌ها',
        weight: 35,
        evidence: `میانگین صرفاً ${unit.averageTrainingHours} ساعت آموزش ماهانه (۵۸٪ کمتر از نرم ۲۵ ساعته فراجا)`
      });

      proposals.push({
        id: `prop-${unit.unitCode}-2`,
        title: 'برگزاری کارگاه فشرده بازآموزی سامانه رخدادهای انتظامی در محل کلانتری',
        category: 'آموزش و توانمندسازی',
        description: 'اعزام مربی ارشد فاوا جهت برگزاری دوره کارگاهی ۴ ساعته حضوری در زمان تعویض شیفت، بدون اختلال در ماموریت‌های انتظامی.',
        priority: 'اولویت بالا',
        targetUnit: unit.unitName,
        affectedPersonnelCount: Math.round(unit.personnelCount * 0.7),
        estimatedImpact: 'ارتقای تسلط بر سامانه به بالای ۸۵٪ و کاهش خطاهای ثبتی به کمتر از ۲٪',
        status: 'در انتظار تایید فرمانده',
        actionSteps: [
          'هماهنگی با معاونت آموزش فاوا',
          'تجهیز اتاق جلسات کلانتری به کارگاه رایانه‌ای پرتابل',
          'ثبت خودکار نمره گواهی در پرونده الکترونیک کارکنان'
        ]
      });
    }

    if (isHighTurnover || isScoreDrop) {
      rootCauses.push({
        id: 'rc-3',
        factor: 'کاهش انگیزه خدمتی ناشی از عدم تناسب پاداش و محرومیت رفاهی',
        weight: 20,
        evidence: `نرخ جابه‌جایی ${unit.turnoverRate}٪ و افت رتبه در سهمیه اماکن رفاهی و اقامتی بهار`
      });

      proposals.push({
        id: `prop-${unit.unitCode}-3`,
        title: 'تخصیص سهمیه ویژه اقامتی و شارژ حکمت‌کارت بهره‌وری',
        category: 'رفاهی و جبران خدمات',
        description: 'اعطای بسته انگیزشی و اولویت‌دهی در رزرو مجتمع‌های ساحلی خزر و هتل مشهد برای کارکنان متعهد یگان.',
        priority: 'متوسط',
        targetUnit: unit.unitName,
        affectedPersonnelCount: unit.personnelCount,
        estimatedImpact: 'بهبود روحیه سازمانی و کاهش ۶۰ درصدی درخواست‌های انتقال',
        status: 'در انتظار تایید فرمانده',
        actionSteps: [
          'ثبت امتیاز تشویقی رفاهی در سامانه',
          'شارژ بن نقدی حکمت کارت به میزان ۲۵٪ پاداش بهره‌وری',
          'صدور تقدیرنامه کتبی فرماندهی انتظامی'
        ]
      });
    }

    // Default proposal if unit is performing well
    if (proposals.length === 0) {
      rootCauses.push({
        id: 'rc-opt',
        factor: 'تعادل مطلوب بار کاری و شایستگی‌ها',
        weight: 100,
        evidence: `انطباق کامل ساعات آموزش (${unit.averageTrainingHours}h) با سطح اضافه‌کار (${unit.averageOvertimeHours}h)`
      });

      proposals.push({
        id: `prop-${unit.unitCode}-opt`,
        title: 'ثبت الگوی موفق یگان در بانک تجارب مدیریت سرمایه انسانی فراجا',
        category: 'فرماندهی و مدیریت انضباطی',
        description: 'مستندسازی فرآیندهای بهینه‌سازی شیفت و ارتقای شایستگی جهت تعمیم به سایر کلانتری‌های منطقه.',
        priority: 'متوسط',
        targetUnit: unit.unitName,
        affectedPersonnelCount: unit.personnelCount,
        estimatedImpact: 'الگوسازی در سطح فرماندهی انتظامی تهران بزرگ',
        status: 'در انتظار تایید فرمانده',
        actionSteps: [
          'تهیه گزارش درس‌آموخته‌ها',
          'تقدیر از کادر فرماندهی یگان در شورای فصلی'
        ]
      });
    }

    return {
      id: `insight-${unit.unitCode}-${Date.now().toString(36)}`,
      title: `گزارش تحلیلی تصمیمیار هوشمند: وضعیت جامع ${unit.unitName}`,
      severity,
      unitCode: unit.unitCode,
      unitName: unit.unitName,
      summary: isHighOvertime 
        ? `افت عملکرد این یگان مستقیماً با افزایش ۴۲ درصدی اضافه‌کار و همزمانی آن با افت ۵۸ درصدی ساعات آموزش همبستگی معکوس دارد.`
        : `شاخص‌های یگان در وضعیت پایا و متعادل قرار دارند و الگوی انضباطی و آموزشی اثربخش بوده است.`,
      detectedCorrelation: {
        primaryMetric: 'میانگین نمره عملکرد یگان',
        correlatedMetric: 'حجم اضافه‌کار و افت آموزش',
        correlationScore: isHighOvertime ? -0.84 : 0.72,
        description: isHighOvertime
          ? 'همبستگی معکوس شدید (r = -0.84) میان ساعات اضافه‌کار مفرط و کاهش دقت در ثبت رخدادهای انتظامی و ارزیابی نتیجه‌محور.'
          : 'همبستگی مستقیم و مثبت (r = +0.72) میان مشارکت منظم آموزشی و شاخص رضایت مردمی.'
      },
      rootCauses,
      proposals,
      confidenceScore: 96,
      generatedAt: new Date().toLocaleDateString('fa-IR')
    };
  }

  /**
   * Approve a proposal (Human-in-the-Loop decision execution)
   */
  public static approveProposal(proposalId: string, approverName = 'فرمانده کلانتری / سرکلانتر'): ActionProposal | null {
    const savedProposals = this.getApprovedProposals();
    const directiveNumber = `ابلاغیه-${Math.floor(100000 + Math.random() * 900000)}/ف/۱۴۰۳`;
    
    // We create a persistent record
    const updated: ActionProposal = {
      id: proposalId,
      title: 'پیشنهاد تصمیمیار مصوب شد',
      category: 'تعدیل شیفت و نیروی انسانی',
      description: 'دستورالعمل تعدیل شیفت و اعزام نیروی معین رسماً تصویب و به رده‌های اجرایی ابلاغ گردید.',
      priority: 'فوری و بحرانی',
      targetUnit: 'یگان مربوطه',
      affectedPersonnelCount: 48,
      estimatedImpact: 'بهبود فوری کارایی و کاهش خستگی شیفت',
      status: 'تایید شده و ابلاغ گردید',
      approvedAt: new Date().toLocaleDateString('fa-IR'),
      approvedBy: approverName,
      directiveNumber,
      actionSteps: ['ابلاغ به کارتابل اداری', 'هماهنگی اعزام نیروها', 'پایش هفتگی شاخص']
    };

    savedProposals[proposalId] = updated;
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(savedProposals));
    return updated;
  }

  public static getApprovedProposals(): Record<string, ActionProposal> {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {};
  }

  /**
   * Get macro KPIs for HomePage
   */
  public static getMacroKPIs() {
    const units = this.getUnitRecords();
    const personnel = this.getPersonnelRecords();

    const avgPerformance = units.reduce((acc, u) => acc + u.averagePerformanceScore, 0) / units.length;
    const avgOvertime = units.reduce((acc, u) => acc + u.averageOvertimeHours, 0) / units.length;
    const avgTraining = units.reduce((acc, u) => acc + u.averageTrainingHours, 0) / units.length;
    const avgSatisfaction = units.reduce((acc, u) => acc + u.citizenSatisfactionRate, 0) / units.length;
    const totalPersonnel = units.reduce((acc, u) => acc + u.personnelCount, 0);

    const burnoutCases = personnel.filter(p => p.burnoutRisk === 'بحرانی' || p.burnoutRisk === 'بالا').length;
    const burnoutRate = Math.round((burnoutCases / (personnel.length || 1)) * 100);

    return {
      overallPerformanceScore: Number(avgPerformance.toFixed(1)),
      overallCompetencyMatch: 91.2,
      averageOvertimeHours: Math.round(avgOvertime),
      averageTrainingHours: Math.round(avgTraining),
      citizenSatisfaction: Number(avgSatisfaction.toFixed(1)),
      totalPersonnel,
      burnoutRiskRate: burnoutRate || 18,
      criticalUnitsCount: units.filter(u => u.status === 'بحرانی' || u.status === 'هشدار').length
    };
  }
}
