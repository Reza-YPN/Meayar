// geographicAnalyticsData.ts - جامع‌ترین داده‌های تحلیل جغرافیایی سرمایه انسانی فراجا

export type FarajaRegion = 
  | 'منطقه ۱ (شمال و البرز)' 
  | 'منطقه ۲ (مرکز و پایتخت)' 
  | 'منطقه ۳ (غرب و شمال‌غرب)' 
  | 'منطقه ۴ (شرق و جنوب‌شرق)' 
  | 'منطقه ۵ (جنوب و سواحل)';

export type OperationalTier = 
  | 'رده الف (مرزی و عملیاتی ویژه)' 
  | 'رده ب (مرزی نیمه‌حساس)' 
  | 'رده ج (کلان‌شهری و صنعتی)' 
  | 'رده د (عادی و پشتیبانی)';

export type BalanceStatus = 'کمبود بحرانی' | 'کمبود متوسط' | 'متوازن' | 'مازاد نیرو';

export interface ProvincePersonnel {
  totalPersonnel: number;
  seniorOfficers: number;    // سرهنگ و بالاتر
  juniorOfficers: number;    // ستوان تا سرگرد
  sergeants: number;          // درجه‌داران (گروهبان و استوار)
  conscripts: number;         // سربازان وظیفه
  sanctionedPosts: number;    // پست‌های مصوب چارت سازمانی
  fillRate: number;           // درصد پرشدگی چارت سازمانی
  balanceStatus: BalanceStatus;
  
  // توزیع در رده‌های انتظامی
  unitDistribution: {
    preventionKalantari: number; // پلیس پیشگیری و کلانتری‌ها
    borderGuard: number;         // مرزبانی
    specialUnit: number;         // یگان ویژه پاسداران
    criminalInvestigation: number; // پلیس آگاهی
    trafficPolice: number;       // پلیس راهور
    cyberPolice: number;         // پلیس فتا
    securityIntelligence: number; // اطلاعات و امنیت عمومی
  };
}

export interface ProvincePerformance {
  overallScore: number;           // ۰ تا ۱۰۰
  crimeDetectionRate: number;     // درصد کشف جرائم
  responseSpeedMinutes: number;   // میانگین زمان رسیدن گشت ۱۱۰ به صحنه (دقیقه)
  publicSatisfaction197: number;  // درصد رضایت مردمی از سامانه ۱۹۷
  trend: 'improving' | 'stable' | 'declining';
  complaintCount: number;         // شکایات ثبت شده در بازرسی
}

export interface ProvinceCompetency {
  overallCompetencyScore: number; // ۰ تا ۱۰۰
  tacticalShootingScore: number;  // مهارت تیراندازی عملیاتی
  physicalFitnessScore: number;   // آمادگی جسمانی ادواری
  crisisManagementScore: number;  // مدیریت صحنه و بحران
  legalComplianceScore: number;   // اشراف حقوقی و ضابطیت قضایی
  publicDeescalationScore: number;// مهار خشم و تکریم ارباب رجوع
}

export interface ProvinceRecruitment {
  annualQuota: number;            // سهمیه جذب ابلاغی ستاد کل
  recruitedCount: number;         // جذب شده قطعی در سال جاری
  localRecruitmentRate: number;   // درصد بومی‌گزینی
  retentionRateAfter5Years: number; // نرخ ماندگاری پس از ۵ سال
  criticalVacancies: string[];    // رسته‌های با بیشترین نیاز جذب
}

export interface ProvinceTransfers {
  inboundRequests: number;        // تقاضای انتقال به این استان
  outboundRequests: number;       // تقاضای خروج از این استان
  netBalance: number;             // تراز جابجایی (ورود منهای خروج)
  familySeparationCount: number;  // پرسنل ساکن در خوابگاه بدون خانواده
  housingCoverageRate: number;    // درصد بهره‌مندی از منازل سازمانی
  avgWaitYearsForHouse: number;   // میانگین سال انتظار مسکن
}

export interface ProvinceTraining {
  perCapitaHours: number;         // سرانه ساعت آموزش در سال
  shootingRangePassRate: number;  // درصد قبولی در میدان تیر
  specializedCertRate: number;    // درصد دارندگان گواهینامه مهارت ویژه
  tacticalExercisesCount: number; // تعداد رزمایش‌های تاکتیکی برگزار شده
}

export interface ProvinceGISData {
  id: string;
  name: string;
  persianName: string;
  centerCity: string;
  region: FarajaRegion;
  operationalTier: OperationalTier;
  hardshipCoefficient: number;    // ۱.۰ تا ۲.۰
  borderLengthKm: number;         // کیلومتر مرز (در صورت مرزی بودن)
  
  // مختصات قرارگیری بر روی نقشه شماتیک/SVG
  svgCoord: {
    cx: number;
    cy: number;
    pathD?: string;
  };

  personnel: ProvincePersonnel;
  performance: ProvincePerformance;
  competency: ProvinceCompetency;
  recruitment: ProvinceRecruitment;
  transfers: ProvinceTransfers;
  training: ProvinceTraining;

  strategicNotes: string;         // یادداشت فرماندهی انتظامی و توصیه‌های ستادی
}

export const PROVINCES_GIS_DATA: ProvinceGISData[] = [
  {
    id: 'tehran',
    name: 'Tehran (FATEB)',
    persianName: 'تهران بزرگ (فاتب)',
    centerCity: 'تهران',
    region: 'منطقه ۲ (مرکز و پایتخت)',
    operationalTier: 'رده ج (کلان‌شهری و صنعتی)',
    hardshipCoefficient: 1.15,
    borderLengthKm: 0,
    svgCoord: { cx: 480, cy: 260 },
    personnel: {
      totalPersonnel: 38500,
      seniorOfficers: 3200,
      juniorOfficers: 9800,
      sergeants: 16500,
      conscripts: 9000,
      sanctionedPosts: 44000,
      fillRate: 87.5,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 14800,
        borderGuard: 0,
        specialUnit: 7200,
        criminalInvestigation: 4600,
        trafficPolice: 6500,
        cyberPolice: 1400,
        securityIntelligence: 4000,
      }
    },
    performance: {
      overallScore: 89.2,
      crimeDetectionRate: 82.4,
      responseSpeedMinutes: 7.8,
      publicSatisfaction197: 84.5,
      trend: 'improving',
      complaintCount: 142
    },
    competency: {
      overallCompetencyScore: 87.4,
      tacticalShootingScore: 88,
      physicalFitnessScore: 82,
      crisisManagementScore: 92,
      legalComplianceScore: 89,
      publicDeescalationScore: 86
    },
    recruitment: {
      annualQuota: 3800,
      recruitedCount: 3250,
      localRecruitmentRate: 48,
      retentionRateAfter5Years: 65,
      criticalVacancies: ['افسر تجسس آگاهی', 'کارشناس ادله دیجیتال فتا', 'افسر گشت فوریت‌های ۱۱۰']
    },
    transfers: {
      inboundRequests: 2150,
      outboundRequests: 4800,
      netBalance: -2650,
      familySeparationCount: 5200,
      housingCoverageRate: 28.5,
      avgWaitYearsForHouse: 6.2
    },
    training: {
      perCapitaHours: 94,
      shootingRangePassRate: 91,
      specializedCertRate: 86,
      tacticalExercisesCount: 18
    },
    strategicNotes: 'پرتراکم‌ترین حوزه ماموریتی فراجا. چالش اصلی هزینه مسکن پرسنل غیربومی، سرریز ترافیک پایتخت و ضرورت جوان‌سازی کادر تجسس آگاهی و یگان امداد.'
  },
  {
    id: 'sistan_baluchestan',
    name: 'Sistan and Baluchestan',
    persianName: 'سیستان و بلوچستان',
    centerCity: 'زاهدان',
    region: 'منطقه ۴ (شرق و جنوب‌شرق)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.95,
    borderLengthKm: 1100,
    svgCoord: { cx: 760, cy: 520 },
    personnel: {
      totalPersonnel: 26400,
      seniorOfficers: 1100,
      juniorOfficers: 4900,
      sergeants: 12200,
      conscripts: 8200,
      sanctionedPosts: 32000,
      fillRate: 82.5,
      balanceStatus: 'کمبود بحرانی',
      unitDistribution: {
        preventionKalantari: 5800,
        borderGuard: 13200,
        specialUnit: 3400,
        criminalInvestigation: 1200,
        trafficPolice: 1100,
        cyberPolice: 300,
        securityIntelligence: 1400,
      }
    },
    performance: {
      overallScore: 86.8,
      crimeDetectionRate: 88.5,
      responseSpeedMinutes: 11.2,
      publicSatisfaction197: 82.0,
      trend: 'stable',
      complaintCount: 68
    },
    competency: {
      overallCompetencyScore: 91.5,
      tacticalShootingScore: 96,
      physicalFitnessScore: 94,
      crisisManagementScore: 95,
      legalComplianceScore: 84,
      publicDeescalationScore: 88
    },
    recruitment: {
      annualQuota: 2800,
      recruitedCount: 2600,
      localRecruitmentRate: 74,
      retentionRateAfter5Years: 82,
      criticalVacancies: ['فرمانده پاسگاه مرزی', 'تکاور مرزبانی', 'کارشناس پهپاد پایش مرز']
    },
    transfers: {
      inboundRequests: 450,
      outboundRequests: 2800,
      netBalance: -2350,
      familySeparationCount: 7100,
      housingCoverageRate: 46.0,
      avgWaitYearsForHouse: 3.8
    },
    training: {
      perCapitaHours: 136,
      shootingRangePassRate: 97,
      specializedCertRate: 92,
      tacticalExercisesCount: 32
    },
    strategicNotes: 'اولویت یکم ستاد کل در تجهیز الکترواپتیک برجک‌های مرزی و تخصیص سهمیه استخدام بومی درجه‌داری. نرخ شهادت و درگیری مسلحانه نیازمند چرخش دوره‌ای پرسنل است.'
  },
  {
    id: 'khuzestan',
    name: 'Khuzestan',
    persianName: 'خوزستان',
    centerCity: 'اهواز',
    region: 'منطقه ۵ (جنوب و سواحل)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.70,
    borderLengthKm: 650,
    svgCoord: { cx: 340, cy: 450 },
    personnel: {
      totalPersonnel: 22800,
      seniorOfficers: 1350,
      juniorOfficers: 5200,
      sergeants: 9850,
      conscripts: 6400,
      sanctionedPosts: 26500,
      fillRate: 86.0,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 7400,
        borderGuard: 6800,
        specialUnit: 3100,
        criminalInvestigation: 1900,
        trafficPolice: 1800,
        cyberPolice: 450,
        securityIntelligence: 1350,
      }
    },
    performance: {
      overallScore: 84.1,
      crimeDetectionRate: 79.8,
      responseSpeedMinutes: 9.4,
      publicSatisfaction197: 80.6,
      trend: 'improving',
      complaintCount: 110
    },
    competency: {
      overallCompetencyScore: 85.9,
      tacticalShootingScore: 90,
      physicalFitnessScore: 88,
      crisisManagementScore: 89,
      legalComplianceScore: 82,
      publicDeescalationScore: 81
    },
    recruitment: {
      annualQuota: 2200,
      recruitedCount: 1950,
      localRecruitmentRate: 80,
      retentionRateAfter5Years: 85,
      criticalVacancies: ['دریابانی هورالعظیم و خلیج‌فارس', 'افسر کشف سلاح غیرمجاز', 'گشت کلانتری']
    },
    transfers: {
      inboundRequests: 820,
      outboundRequests: 1950,
      netBalance: -1130,
      familySeparationCount: 3800,
      housingCoverageRate: 52.0,
      avgWaitYearsForHouse: 3.5
    },
    training: {
      perCapitaHours: 112,
      shootingRangePassRate: 93,
      specializedCertRate: 88,
      tacticalExercisesCount: 22
    },
    strategicNotes: 'تقویت رده دریابانی و پایش هور و نخلستان‌ها. افزایش تسهیلات رفاهی و حق بدی آب‌وهوا برای کاهش درخواست‌های خروج پرسنل باسابقه.'
  },
  {
    id: 'khorasan_razavi',
    name: 'Khorasan Razavi',
    persianName: 'خراسان رضوی',
    centerCity: 'مشهد',
    region: 'منطقه ۴ (شرق و جنوب‌شرق)',
    operationalTier: 'رده ب (مرزی نیمه‌حساس)',
    hardshipCoefficient: 1.35,
    borderLengthKm: 830,
    svgCoord: { cx: 710, cy: 230 },
    personnel: {
      totalPersonnel: 25200,
      seniorOfficers: 1750,
      juniorOfficers: 6200,
      sergeants: 10850,
      conscripts: 6400,
      sanctionedPosts: 27800,
      fillRate: 90.6,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 8900,
        borderGuard: 6200,
        specialUnit: 3300,
        criminalInvestigation: 2400,
        trafficPolice: 2600,
        cyberPolice: 600,
        securityIntelligence: 1200,
      }
    },
    performance: {
      overallScore: 91.4,
      crimeDetectionRate: 85.0,
      responseSpeedMinutes: 7.2,
      publicSatisfaction197: 88.2,
      trend: 'improving',
      complaintCount: 88
    },
    competency: {
      overallCompetencyScore: 88.6,
      tacticalShootingScore: 89,
      physicalFitnessScore: 87,
      crisisManagementScore: 91,
      legalComplianceScore: 88,
      publicDeescalationScore: 90
    },
    recruitment: {
      annualQuota: 2400,
      recruitedCount: 2350,
      localRecruitmentRate: 88,
      retentionRateAfter5Years: 91,
      criticalVacancies: ['مرزبانی تایباد و دوغارون', 'پلیس امنیت اقتصادی', 'پلیس فرودگاه و زائران']
    },
    transfers: {
      inboundRequests: 2900,
      outboundRequests: 1400,
      netBalance: +1500,
      familySeparationCount: 2100,
      housingCoverageRate: 64.0,
      avgWaitYearsForHouse: 2.8
    },
    training: {
      perCapitaHours: 98,
      shootingRangePassRate: 94,
      specializedCertRate: 89,
      tacticalExercisesCount: 16
    },
    strategicNotes: 'قطب معنوی فراجا با ترافیک بالای زائران داخلی و خارجی. وضعیت تراز انسانی مطلوب بوده و تقاضای ورود به استان بالاست.'
  },
  {
    id: 'isfahan',
    name: 'Isfahan',
    persianName: 'اصفهان',
    centerCity: 'اصفهان',
    region: 'منطقه ۲ (مرکز و پایتخت)',
    operationalTier: 'رده ج (کلان‌شهری و صنعتی)',
    hardshipCoefficient: 1.10,
    borderLengthKm: 0,
    svgCoord: { cx: 470, cy: 370 },
    personnel: {
      totalPersonnel: 19800,
      seniorOfficers: 1450,
      juniorOfficers: 5100,
      sergeants: 8650,
      conscripts: 4600,
      sanctionedPosts: 21200,
      fillRate: 93.4,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 7800,
        borderGuard: 0,
        specialUnit: 2800,
        criminalInvestigation: 2500,
        trafficPolice: 3100,
        cyberPolice: 700,
        securityIntelligence: 1900,
      }
    },
    performance: {
      overallScore: 92.8,
      crimeDetectionRate: 88.0,
      responseSpeedMinutes: 6.9,
      publicSatisfaction197: 91.2,
      trend: 'improving',
      complaintCount: 54
    },
    competency: {
      overallCompetencyScore: 90.2,
      tacticalShootingScore: 88,
      physicalFitnessScore: 89,
      crisisManagementScore: 90,
      legalComplianceScore: 93,
      publicDeescalationScore: 92
    },
    recruitment: {
      annualQuota: 1800,
      recruitedCount: 1780,
      localRecruitmentRate: 92,
      retentionRateAfter5Years: 94,
      criticalVacancies: ['کارآگاه پلیس آگاهی', 'کارشناس فتا', 'افسر کنترل ترافیک محورهای شریانی']
    },
    transfers: {
      inboundRequests: 2400,
      outboundRequests: 850,
      netBalance: +1550,
      familySeparationCount: 1100,
      housingCoverageRate: 68.0,
      avgWaitYearsForHouse: 2.2
    },
    training: {
      perCapitaHours: 104,
      shootingRangePassRate: 95,
      specializedCertRate: 91,
      tacticalExercisesCount: 14
    },
    strategicNotes: 'یکی از منضبط‌ترین فرماندهی‌های انتظامی کشور. شاخص‌های شایستگی، آموزش مداوم و ثبات پرسنلی در تراز عالی کشوری قرار دارد.'
  },
  {
    id: 'fars',
    name: 'Fars',
    persianName: 'فارس',
    centerCity: 'شیراز',
    region: 'منطقه ۵ (جنوب و سواحل)',
    operationalTier: 'رده ج (کلان‌شهری و صنعتی)',
    hardshipCoefficient: 1.20,
    borderLengthKm: 0,
    svgCoord: { cx: 500, cy: 510 },
    personnel: {
      totalPersonnel: 18900,
      seniorOfficers: 1300,
      juniorOfficers: 4800,
      sergeants: 8200,
      conscripts: 4600,
      sanctionedPosts: 20800,
      fillRate: 90.8,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 7900,
        borderGuard: 0,
        specialUnit: 2900,
        criminalInvestigation: 2200,
        trafficPolice: 2700,
        cyberPolice: 600,
        securityIntelligence: 1600,
      }
    },
    performance: {
      overallScore: 88.5,
      crimeDetectionRate: 83.2,
      responseSpeedMinutes: 7.4,
      publicSatisfaction197: 86.4,
      trend: 'improving',
      complaintCount: 76
    },
    competency: {
      overallCompetencyScore: 87.8,
      tacticalShootingScore: 88,
      physicalFitnessScore: 86,
      crisisManagementScore: 89,
      legalComplianceScore: 87,
      publicDeescalationScore: 89
    },
    recruitment: {
      annualQuota: 1700,
      recruitedCount: 1620,
      localRecruitmentRate: 86,
      retentionRateAfter5Years: 88,
      criticalVacancies: ['مبارزه با مواد مخدر محورهای مواصلاتی', 'افسر گشت کلانتری', 'کارشناس فناوری اطلاعات']
    },
    transfers: {
      inboundRequests: 2100,
      outboundRequests: 1100,
      netBalance: +1000,
      familySeparationCount: 1800,
      housingCoverageRate: 61.0,
      avgWaitYearsForHouse: 2.9
    },
    training: {
      perCapitaHours: 96,
      shootingRangePassRate: 92,
      specializedCertRate: 87,
      tacticalExercisesCount: 15
    },
    strategicNotes: 'کنترل گلوگاه‌های جنوب به مرکز کشور و مبارزه بی‌امان با قاچاق کالا و مواد مخدر نیازمند تقویت پاسگاه‌های شهید دستغیب و محورهای منتهی به کویر است.'
  },
  {
    id: 'kurdistan',
    name: 'Kurdistan',
    persianName: 'کردستان',
    centerCity: 'سنندج',
    region: 'منطقه ۳ (غرب و شمال‌غرب)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.80,
    borderLengthKm: 227,
    svgCoord: { cx: 290, cy: 260 },
    personnel: {
      totalPersonnel: 15400,
      seniorOfficers: 780,
      juniorOfficers: 3400,
      sergeants: 7200,
      conscripts: 4020,
      sanctionedPosts: 18500,
      fillRate: 83.2,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 4500,
        borderGuard: 6800,
        specialUnit: 1800,
        criminalInvestigation: 750,
        trafficPolice: 650,
        cyberPolice: 200,
        securityIntelligence: 700,
      }
    },
    performance: {
      overallScore: 87.6,
      crimeDetectionRate: 86.4,
      responseSpeedMinutes: 9.1,
      publicSatisfaction197: 83.8,
      trend: 'stable',
      complaintCount: 42
    },
    competency: {
      overallCompetencyScore: 90.8,
      tacticalShootingScore: 95,
      physicalFitnessScore: 93,
      crisisManagementScore: 94,
      legalComplianceScore: 85,
      publicDeescalationScore: 87
    },
    recruitment: {
      annualQuota: 1400,
      recruitedCount: 1310,
      localRecruitmentRate: 78,
      retentionRateAfter5Years: 84,
      criticalVacancies: ['مرزبانی کوهستانی بانه و مریوان', 'پایش معابر مرزی', 'واحدهای ویژه مقابله با تروریسم']
    },
    transfers: {
      inboundRequests: 380,
      outboundRequests: 1650,
      netBalance: -1270,
      familySeparationCount: 4100,
      housingCoverageRate: 48.0,
      avgWaitYearsForHouse: 3.6
    },
    training: {
      perCapitaHours: 128,
      shootingRangePassRate: 96,
      specializedCertRate: 91,
      tacticalExercisesCount: 26
    },
    strategicNotes: 'ماموریت کوهستانی سخت در زمستان‌های طاقت‌فرسا. ضرورت به‌روزرسانی سیستم‌های حرارتی جلیقه‌ها، پهپادهای شناسایی حرارتی و تجهیز برجک‌های مریوان و بانه.'
  },
  {
    id: 'kermanshah',
    name: 'Kermanshah',
    persianName: 'کرمانشاه',
    centerCity: 'کرمانشاه',
    region: 'منطقه ۳ (غرب و شمال‌غرب)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.65,
    borderLengthKm: 371,
    svgCoord: { cx: 280, cy: 320 },
    personnel: {
      totalPersonnel: 16800,
      seniorOfficers: 980,
      juniorOfficers: 3800,
      sergeants: 7600,
      conscripts: 4420,
      sanctionedPosts: 19600,
      fillRate: 85.7,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 5600,
        borderGuard: 5900,
        specialUnit: 2200,
        criminalInvestigation: 1100,
        trafficPolice: 950,
        cyberPolice: 250,
        securityIntelligence: 800,
      }
    },
    performance: {
      overallScore: 86.2,
      crimeDetectionRate: 83.0,
      responseSpeedMinutes: 8.8,
      publicSatisfaction197: 82.5,
      trend: 'improving',
      complaintCount: 62
    },
    competency: {
      overallCompetencyScore: 89.2,
      tacticalShootingScore: 93,
      physicalFitnessScore: 91,
      crisisManagementScore: 91,
      legalComplianceScore: 85,
      publicDeescalationScore: 86
    },
    recruitment: {
      annualQuota: 1600,
      recruitedCount: 1540,
      localRecruitmentRate: 82,
      retentionRateAfter5Years: 87,
      criticalVacancies: ['مرزبانی قصرشیرین و پاوه', 'تیم‌های عملیاتی یگان امداد', 'پلیس آگاهی مبارزه با سرقت']
    },
    transfers: {
      inboundRequests: 620,
      outboundRequests: 1450,
      netBalance: -830,
      familySeparationCount: 3200,
      housingCoverageRate: 54.0,
      avgWaitYearsForHouse: 3.2
    },
    training: {
      perCapitaHours: 118,
      shootingRangePassRate: 94,
      specializedCertRate: 89,
      tacticalExercisesCount: 20
    },
    strategicNotes: 'پوشش کامل پایانه‌های مرزی خسروی و پرویزخان؛ مدیریت سالانه تردد زائران اربعین نیازمند تزریق دوره‌ای نیروهای کمکی در شهریور هر سال است.'
  },
  {
    id: 'azarbaijan_sharghi',
    name: 'East Azerbaijan',
    persianName: 'آذربایجان شرقی',
    centerCity: 'تبریز',
    region: 'منطقه ۳ (غرب و شمال‌غرب)',
    operationalTier: 'رده ب (مرزی نیمه‌حساس)',
    hardshipCoefficient: 1.25,
    borderLengthKm: 200,
    svgCoord: { cx: 280, cy: 150 },
    personnel: {
      totalPersonnel: 17200,
      seniorOfficers: 1150,
      juniorOfficers: 4300,
      sergeants: 7650,
      conscripts: 4100,
      sanctionedPosts: 18600,
      fillRate: 92.4,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 6800,
        borderGuard: 3400,
        specialUnit: 2300,
        criminalInvestigation: 1900,
        trafficPolice: 1700,
        cyberPolice: 400,
        securityIntelligence: 700,
      }
    },
    performance: {
      overallScore: 90.5,
      crimeDetectionRate: 87.2,
      responseSpeedMinutes: 7.0,
      publicSatisfaction197: 89.0,
      trend: 'stable',
      complaintCount: 48
    },
    competency: {
      overallCompetencyScore: 88.4,
      tacticalShootingScore: 89,
      physicalFitnessScore: 87,
      crisisManagementScore: 89,
      legalComplianceScore: 89,
      publicDeescalationScore: 88
    },
    recruitment: {
      annualQuota: 1500,
      recruitedCount: 1480,
      localRecruitmentRate: 90,
      retentionRateAfter5Years: 92,
      criticalVacancies: ['مرزبانی جلفا و خداآفرین', 'کارآگاه جنایی', 'پلیس راه']
    },
    transfers: {
      inboundRequests: 1850,
      outboundRequests: 950,
      netBalance: +900,
      familySeparationCount: 1400,
      housingCoverageRate: 67.0,
      avgWaitYearsForHouse: 2.4
    },
    training: {
      perCapitaHours: 92,
      shootingRangePassRate: 93,
      specializedCertRate: 88,
      tacticalExercisesCount: 14
    },
    strategicNotes: 'پایداری امنیتی و انضباط سازمانی بالا در قطب صنعتی شمال‌غرب؛ امنیت مرزی ارس و تبادل مرزی با جمهوری آذربایجان و ارمنستان بدون تنش گزارش شده است.'
  },
  {
    id: 'azarbaijan_gharbi',
    name: 'West Azerbaijan',
    persianName: 'آذربایجان غربی',
    centerCity: 'ارومیه',
    region: 'منطقه ۳ (غرب و شمال‌غرب)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.75,
    borderLengthKm: 967,
    svgCoord: { cx: 220, cy: 170 },
    personnel: {
      totalPersonnel: 21500,
      seniorOfficers: 1100,
      juniorOfficers: 4600,
      sergeants: 9800,
      conscripts: 6000,
      sanctionedPosts: 25500,
      fillRate: 84.3,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 6100,
        borderGuard: 9400,
        specialUnit: 2600,
        criminalInvestigation: 1200,
        trafficPolice: 1100,
        cyberPolice: 300,
        securityIntelligence: 800,
      }
    },
    performance: {
      overallScore: 88.0,
      crimeDetectionRate: 85.8,
      responseSpeedMinutes: 8.5,
      publicSatisfaction197: 84.2,
      trend: 'improving',
      complaintCount: 58
    },
    competency: {
      overallCompetencyScore: 90.4,
      tacticalShootingScore: 95,
      physicalFitnessScore: 92,
      crisisManagementScore: 93,
      legalComplianceScore: 84,
      publicDeescalationScore: 88
    },
    recruitment: {
      annualQuota: 2100,
      recruitedCount: 1980,
      localRecruitmentRate: 76,
      retentionRateAfter5Years: 83,
      criticalVacancies: ['مرزبانی پیرانشهر و سردشت', 'کنترل معابر کوهستانی ماکو', 'پلیس پیشگیری']
    },
    transfers: {
      inboundRequests: 540,
      outboundRequests: 2100,
      netBalance: -1560,
      familySeparationCount: 4800,
      housingCoverageRate: 49.0,
      avgWaitYearsForHouse: 3.4
    },
    training: {
      perCapitaHours: 124,
      shootingRangePassRate: 95,
      specializedCertRate: 90,
      tacticalExercisesCount: 24
    },
    strategicNotes: 'هم‌مرزی با ۳ کشور (ترکیه، عراق و آذربایجان). سنگین‌ترین حجم ماموریت انسداد فیزیکی و اپتیکی مرزهای شمال‌غرب کشور.'
  },
  {
    id: 'mazandaran',
    name: 'Mazandaran',
    persianName: 'مازندران',
    centerCity: 'ساری',
    region: 'منطقه ۱ (شمال و البرز)',
    operationalTier: 'رده ب (مرزی نیمه‌حساس)',
    hardshipCoefficient: 1.20,
    borderLengthKm: 487, // ساحلی
    svgCoord: { cx: 480, cy: 190 },
    personnel: {
      totalPersonnel: 16400,
      seniorOfficers: 1200,
      juniorOfficers: 4200,
      sergeants: 7200,
      conscripts: 3800,
      sanctionedPosts: 17800,
      fillRate: 92.1,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 7200,
        borderGuard: 2100, // دریابانی
        specialUnit: 2100,
        criminalInvestigation: 1800,
        trafficPolice: 2100,
        cyberPolice: 400,
        securityIntelligence: 700,
      }
    },
    performance: {
      overallScore: 89.6,
      crimeDetectionRate: 84.8,
      responseSpeedMinutes: 7.6,
      publicSatisfaction197: 87.5,
      trend: 'improving',
      complaintCount: 65
    },
    competency: {
      overallCompetencyScore: 87.2,
      tacticalShootingScore: 86,
      physicalFitnessScore: 85,
      crisisManagementScore: 89,
      legalComplianceScore: 88,
      publicDeescalationScore: 88
    },
    recruitment: {
      annualQuota: 1400,
      recruitedCount: 1390,
      localRecruitmentRate: 91,
      retentionRateAfter5Years: 93,
      criticalVacancies: ['پلیس راهور محور هراز و کندوان', 'پلیس پیشگیری سواحل', 'دریابانی کاسپین']
    },
    transfers: {
      inboundRequests: 2600,
      outboundRequests: 780,
      netBalance: +1820,
      familySeparationCount: 1200,
      housingCoverageRate: 65.0,
      avgWaitYearsForHouse: 2.3
    },
    training: {
      perCapitaHours: 88,
      shootingRangePassRate: 91,
      specializedCertRate: 85,
      tacticalExercisesCount: 12
    },
    strategicNotes: 'پیک بار ترافیکی و مسافری میلیونی در تعطیلات؛ دریابانی سواحل خزر و طرح‌های دریا نیازمند نیروهای کمکی فصلی است.'
  },
  {
    id: 'gilan',
    name: 'Gilan',
    persianName: 'گیلان',
    centerCity: 'رشت',
    region: 'منطقه ۱ (شمال و البرز)',
    operationalTier: 'رده ب (مرزی نیمه‌حساس)',
    hardshipCoefficient: 1.15,
    borderLengthKm: 300,
    svgCoord: { cx: 410, cy: 180 },
    personnel: {
      totalPersonnel: 13800,
      seniorOfficers: 980,
      juniorOfficers: 3600,
      sergeants: 6100,
      conscripts: 3120,
      sanctionedPosts: 14800,
      fillRate: 93.2,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 6100,
        borderGuard: 1800,
        specialUnit: 1700,
        criminalInvestigation: 1500,
        trafficPolice: 1700,
        cyberPolice: 350,
        securityIntelligence: 650,
      }
    },
    performance: {
      overallScore: 90.1,
      crimeDetectionRate: 86.1,
      responseSpeedMinutes: 7.2,
      publicSatisfaction197: 88.9,
      trend: 'stable',
      complaintCount: 52
    },
    competency: {
      overallCompetencyScore: 86.8,
      tacticalShootingScore: 85,
      physicalFitnessScore: 86,
      crisisManagementScore: 88,
      legalComplianceScore: 89,
      publicDeescalationScore: 85
    },
    recruitment: {
      annualQuota: 1200,
      recruitedCount: 1180,
      localRecruitmentRate: 92,
      retentionRateAfter5Years: 94,
      criticalVacancies: ['مرزبانی آستارا', 'پلیس نظارت بر اماکن عمومی', 'پلیس راه']
    },
    transfers: {
      inboundRequests: 2300,
      outboundRequests: 620,
      netBalance: +1680,
      familySeparationCount: 950,
      housingCoverageRate: 69.0,
      avgWaitYearsForHouse: 2.1
    },
    training: {
      perCapitaHours: 86,
      shootingRangePassRate: 92,
      specializedCertRate: 86,
      tacticalExercisesCount: 11
    },
    strategicNotes: 'پایانه مرزی آستارا و ارتباط ریلی و جاده‌ای با قفقاز؛ جذابیت بالای اقلیمی باعث شده تقاضای انتقال به استان بسیار فراتر از ظرفیت باشد.'
  },
  {
    id: 'hormozgan',
    name: 'Hormozgan',
    persianName: 'هرمزگان',
    centerCity: 'بندرعباس',
    region: 'منطقه ۵ (جنوب و سواحل)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.85,
    borderLengthKm: 1400, // ساحلی و جزایر
    svgCoord: { cx: 620, cy: 590 },
    personnel: {
      totalPersonnel: 17800,
      seniorOfficers: 1050,
      juniorOfficers: 4100,
      sergeants: 7850,
      conscripts: 4800,
      sanctionedPosts: 21500,
      fillRate: 82.8,
      balanceStatus: 'کمبود بحرانی',
      unitDistribution: {
        preventionKalantari: 4900,
        borderGuard: 7600, // پایگاه‌های دریابانی
        specialUnit: 1900,
        criminalInvestigation: 1200,
        trafficPolice: 1100,
        cyberPolice: 300,
        securityIntelligence: 800,
      }
    },
    performance: {
      overallScore: 87.2,
      crimeDetectionRate: 86.8,
      responseSpeedMinutes: 9.8,
      publicSatisfaction197: 81.4,
      trend: 'improving',
      complaintCount: 68
    },
    competency: {
      overallCompetencyScore: 89.8,
      tacticalShootingScore: 94,
      physicalFitnessScore: 91,
      crisisManagementScore: 92,
      legalComplianceScore: 84,
      publicDeescalationScore: 84
    },
    recruitment: {
      annualQuota: 1900,
      recruitedCount: 1650,
      localRecruitmentRate: 62,
      retentionRateAfter5Years: 74,
      criticalVacancies: ['ناخدا و ملوان شناورهای تندرو دریابانی', 'پلیس گمرک شهید رجایی', 'پاسگاه‌های جزایر قشم و کیش']
    },
    transfers: {
      inboundRequests: 580,
      outboundRequests: 2400,
      netBalance: -1820,
      familySeparationCount: 5100,
      housingCoverageRate: 44.0,
      avgWaitYearsForHouse: 4.1
    },
    training: {
      perCapitaHours: 130,
      shootingRangePassRate: 96,
      specializedCertRate: 93,
      tacticalExercisesCount: 28
    },
    strategicNotes: 'خط مقدم نبرد دریایی با قاچاق سوخت و کالا در تنگه هرمز. تجهیز ناوگان شناوری پیشرفته و ساخت منازل سازمانی جدید در بندرعباس و بندرلنگه در دست اقدام است.'
  },
  {
    id: 'kerman',
    name: 'Kerman',
    persianName: 'کرمان',
    centerCity: 'کرمان',
    region: 'منطقه ۴ (شرق و جنوب‌شرق)',
    operationalTier: 'رده ب (مرزی نیمه‌حساس)',
    hardshipCoefficient: 1.40,
    borderLengthKm: 0,
    svgCoord: { cx: 620, cy: 450 },
    personnel: {
      totalPersonnel: 15600,
      seniorOfficers: 1100,
      juniorOfficers: 4100,
      sergeants: 6900,
      conscripts: 3500,
      sanctionedPosts: 17500,
      fillRate: 89.1,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 5900,
        borderGuard: 0,
        specialUnit: 2600,
        criminalInvestigation: 2100,
        trafficPolice: 2400,
        cyberPolice: 500,
        securityIntelligence: 2100,
      }
    },
    performance: {
      overallScore: 88.9,
      crimeDetectionRate: 86.5,
      responseSpeedMinutes: 7.8,
      publicSatisfaction197: 85.6,
      trend: 'improving',
      complaintCount: 50
    },
    competency: {
      overallCompetencyScore: 89.0,
      tacticalShootingScore: 92,
      physicalFitnessScore: 90,
      crisisManagementScore: 91,
      legalComplianceScore: 86,
      publicDeescalationScore: 86
    },
    recruitment: {
      annualQuota: 1500,
      recruitedCount: 1420,
      localRecruitmentRate: 84,
      retentionRateAfter5Years: 88,
      criticalVacancies: ['پلیس مبارزه با مواد مخدر کهنوج و بم', 'یگان تکاوری ۱۱۵ امام جواد (ع)', 'گشت کویر']
    },
    transfers: {
      inboundRequests: 950,
      outboundRequests: 1250,
      netBalance: -300,
      familySeparationCount: 2200,
      housingCoverageRate: 58.0,
      avgWaitYearsForHouse: 2.8
    },
    training: {
      perCapitaHours: 108,
      shootingRangePassRate: 94,
      specializedCertRate: 89,
      tacticalExercisesCount: 19
    },
    strategicNotes: 'سد دفاعی مبارزه با کاروان‌های مسلح مواد مخدر ورودی از شرق کشور؛ تقویت پایگاه‌های تکاوری کویری در رودبار جنوب و ریگان اولویت مستمر است.'
  },
  {
    id: 'alborz',
    name: 'Alborz',
    persianName: 'البرز',
    centerCity: 'کرج',
    region: 'منطقه ۱ (شمال و البرز)',
    operationalTier: 'رده ج (کلان‌شهری و صنعتی)',
    hardshipCoefficient: 1.15,
    borderLengthKm: 0,
    svgCoord: { cx: 450, cy: 240 },
    personnel: {
      totalPersonnel: 14200,
      seniorOfficers: 1050,
      juniorOfficers: 3700,
      sergeants: 6250,
      conscripts: 3200,
      sanctionedPosts: 16200,
      fillRate: 87.6,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 5800,
        borderGuard: 0,
        specialUnit: 2400,
        criminalInvestigation: 2100,
        trafficPolice: 2100,
        cyberPolice: 500,
        securityIntelligence: 1300,
      }
    },
    performance: {
      overallScore: 87.5,
      crimeDetectionRate: 83.1,
      responseSpeedMinutes: 7.9,
      publicSatisfaction197: 84.1,
      trend: 'stable',
      complaintCount: 78
    },
    competency: {
      overallCompetencyScore: 86.5,
      tacticalShootingScore: 87,
      physicalFitnessScore: 84,
      crisisManagementScore: 89,
      legalComplianceScore: 88,
      publicDeescalationScore: 84
    },
    recruitment: {
      annualQuota: 1400,
      recruitedCount: 1250,
      localRecruitmentRate: 58,
      retentionRateAfter5Years: 70,
      criticalVacancies: ['کلانتری‌های پرجمعیت کرج و فردیس', 'پلیس راهور محور کرج-قزوین', 'آگاهی']
    },
    transfers: {
      inboundRequests: 1450,
      outboundRequests: 1900,
      netBalance: -450,
      familySeparationCount: 2600,
      housingCoverageRate: 42.0,
      avgWaitYearsForHouse: 4.8
    },
    training: {
      perCapitaHours: 90,
      shootingRangePassRate: 91,
      specializedCertRate: 86,
      tacticalExercisesCount: 14
    },
    strategicNotes: 'شاهراه مواصلاتی ۱۴ استان و بافت متراکم مهاجرپذیر. مجاورت با مراکز بزرگ آموزش فراجا (شهید رجایی) ظرفیت مطلوبی برای دوره‌های تکمیلی ایجاد کرده است.'
  },
  {
    id: 'khorasan_jonoubi',
    name: 'South Khorasan',
    persianName: 'خراسان جنوبی',
    centerCity: 'بیرجند',
    region: 'منطقه ۴ (شرق و جنوب‌شرق)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.65,
    borderLengthKm: 460,
    svgCoord: { cx: 700, cy: 370 },
    personnel: {
      totalPersonnel: 11200,
      seniorOfficers: 620,
      juniorOfficers: 2600,
      sergeants: 5400,
      conscripts: 2580,
      sanctionedPosts: 12800,
      fillRate: 87.5,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 3400,
        borderGuard: 5200,
        specialUnit: 1100,
        criminalInvestigation: 500,
        trafficPolice: 450,
        cyberPolice: 150,
        securityIntelligence: 400,
      }
    },
    performance: {
      overallScore: 92.0,
      crimeDetectionRate: 91.2,
      responseSpeedMinutes: 7.1,
      publicSatisfaction197: 92.4,
      trend: 'improving',
      complaintCount: 24
    },
    competency: {
      overallCompetencyScore: 91.2,
      tacticalShootingScore: 95,
      physicalFitnessScore: 92,
      crisisManagementScore: 92,
      legalComplianceScore: 89,
      publicDeescalationScore: 87
    },
    recruitment: {
      annualQuota: 1000,
      recruitedCount: 980,
      localRecruitmentRate: 84,
      retentionRateAfter5Years: 89,
      criticalVacancies: ['مرزبانی گزیک و یزدان', 'پایگاه‌های کویری طبس', 'پلیس امنیت']
    },
    transfers: {
      inboundRequests: 420,
      outboundRequests: 950,
      netBalance: -530,
      familySeparationCount: 2100,
      housingCoverageRate: 62.0,
      avgWaitYearsForHouse: 2.6
    },
    training: {
      perCapitaHours: 122,
      shootingRangePassRate: 96,
      specializedCertRate: 91,
      tacticalExercisesCount: 20
    },
    strategicNotes: 'امن‌ترین استان مرزی کشور علیرغم همسایگی مستقیم با افغانستان. نرخ رضایت مردمی ۱۹۷ در بالاترین سطح کشوری قرار دارد.'
  },
  {
    id: 'ilam',
    name: 'Ilam',
    persianName: 'ایلام',
    centerCity: 'ایلام',
    region: 'منطقه ۳ (غرب و شمال‌غرب)',
    operationalTier: 'رده الف (مرزی و عملیاتی ویژه)',
    hardshipCoefficient: 1.70,
    borderLengthKm: 425,
    svgCoord: { cx: 280, cy: 390 },
    personnel: {
      totalPersonnel: 10800,
      seniorOfficers: 580,
      juniorOfficers: 2500,
      sergeants: 4900,
      conscripts: 2820,
      sanctionedPosts: 12400,
      fillRate: 87.1,
      balanceStatus: 'کمبود متوسط',
      unitDistribution: {
        preventionKalantari: 3200,
        borderGuard: 4900,
        specialUnit: 1200,
        criminalInvestigation: 500,
        trafficPolice: 450,
        cyberPolice: 150,
        securityIntelligence: 400,
      }
    },
    performance: {
      overallScore: 89.4,
      crimeDetectionRate: 87.5,
      responseSpeedMinutes: 7.9,
      publicSatisfaction197: 87.0,
      trend: 'improving',
      complaintCount: 34
    },
    competency: {
      overallCompetencyScore: 90.5,
      tacticalShootingScore: 94,
      physicalFitnessScore: 92,
      crisisManagementScore: 94,
      legalComplianceScore: 86,
      publicDeescalationScore: 86
    },
    recruitment: {
      annualQuota: 950,
      recruitedCount: 920,
      localRecruitmentRate: 88,
      retentionRateAfter5Years: 90,
      criticalVacancies: ['مرزبانی مهران و دهلران', 'مدیریت ترافیک پایانه مرزی برکت', 'پلیس گذرنامه']
    },
    transfers: {
      inboundRequests: 320,
      outboundRequests: 880,
      netBalance: -560,
      familySeparationCount: 2300,
      housingCoverageRate: 59.0,
      avgWaitYearsForHouse: 2.9
    },
    training: {
      perCapitaHours: 120,
      shootingRangePassRate: 95,
      specializedCertRate: 90,
      tacticalExercisesCount: 22
    },
    strategicNotes: 'پایانه مرزی مهران به عنوان گلوگاه اصلی اربعین حسینی (عبور بیش از ۶۰٪ زائران کشور). زیرساخت‌های پایدار انتظامی در مهران نیازمند تقویت دائمی است.'
  },
  {
    id: 'bushehr',
    name: 'Bushehr',
    persianName: 'بوشهر',
    centerCity: 'بوشهر',
    region: 'منطقه ۵ (جنوب و سواحل)',
    operationalTier: 'رده ب (مرزی نیمه‌حساس)',
    hardshipCoefficient: 1.55,
    borderLengthKm: 937, // مرز آبی
    svgCoord: { cx: 430, cy: 530 },
    personnel: {
      totalPersonnel: 11400,
      seniorOfficers: 720,
      juniorOfficers: 2700,
      sergeants: 5100,
      conscripts: 2880,
      sanctionedPosts: 12900,
      fillRate: 88.4,
      balanceStatus: 'متوازن',
      unitDistribution: {
        preventionKalantari: 3800,
        borderGuard: 4600, // دریابانی
        specialUnit: 1100,
        criminalInvestigation: 700,
        trafficPolice: 650,
        cyberPolice: 150,
        securityIntelligence: 400,
      }
    },
    performance: {
      overallScore: 88.2,
      crimeDetectionRate: 85.0,
      responseSpeedMinutes: 8.1,
      publicSatisfaction197: 85.5,
      trend: 'stable',
      complaintCount: 38
    },
    competency: {
      overallCompetencyScore: 88.0,
      tacticalShootingScore: 91,
      physicalFitnessScore: 89,
      crisisManagementScore: 90,
      legalComplianceScore: 85,
      publicDeescalationScore: 85
    },
    recruitment: {
      annualQuota: 1050,
      recruitedCount: 980,
      localRecruitmentRate: 72,
      retentionRateAfter5Years: 80,
      criticalVacancies: ['دریابانی عسلویه و گناوه', 'حفاظت از تاسیسات هسته‌ای و نفت و گاز', 'پلیس پیشگیری']
    },
    transfers: {
      inboundRequests: 480,
      outboundRequests: 1350,
      netBalance: -870,
      familySeparationCount: 2900,
      housingCoverageRate: 55.0,
      avgWaitYearsForHouse: 3.3
    },
    training: {
      perCapitaHours: 114,
      shootingRangePassRate: 94,
      specializedCertRate: 89,
      tacticalExercisesCount: 18
    },
    strategicNotes: 'پایتخت انرژی کشور و حساسیت ویژه در حفاظت از حریم نیروگاه اتمی بوشهر و پالایشگاه‌های پارس جنوبی؛ تجهیز ناوگان گشت دریایی در آب‌های خلیج فارس در اولویت است.'
  }
];

// National Aggregated KPI Summary
export const NATIONAL_GIS_SUMMARY = {
  totalPersonnelFaraja: 342000,
  sanctionedPostsTotal: 395000,
  nationalFillRate: 86.6,
  nationalAvgPerformance: 88.4,
  nationalPublicSatisfaction: 85.8,
  nationalCompetencyAvg: 88.3,
  provincesCount: 31,
  highHardshipBorderProvinces: 8,
  transfersPendingNational: 24800,
  housingCoverageAvg: 54.2,
  annualRecruitmentTarget: 32000,
  annualRecruitedSoFar: 28400
};

// Regional Grouping definition for Faraja
export const REGIONAL_PERFORMANCE_METRICS = [
  {
    regionName: 'منطقه ۱ (شمال و البرز)',
    provincesIncluded: ['مازندران', 'گیلان', 'گلستان', 'البرز', 'سمنان'],
    totalPersonnel: 58200,
    avgPerformance: 89.2,
    avgFillRate: 91.2,
    netTransferBalance: +3450,
    leadStrength: 'پوشش ترافیکی و خدمات انتظامی گردشگری',
    criticalNeed: 'توسعه ناوگان گشت ساحلی خزر'
  },
  {
    regionName: 'منطقه ۲ (مرکز و پایتخت)',
    provincesIncluded: ['تهران بزرگ (فاتب)', 'اصفهان', 'قم', 'مرکزی', 'قزوین'],
    totalPersonnel: 86500,
    avgPerformance: 91.0,
    avgFillRate: 90.8,
    netTransferBalance: -1100,
    leadStrength: 'پلیس آگاهی تخصصی، کشف علمی جرم و فتا',
    criticalNeed: 'مسکن سازمانی و هزینه‌های معیشتی کلان‌شهرها'
  },
  {
    regionName: 'منطقه ۳ (غرب و شمال‌غرب)',
    provincesIncluded: ['کردستان', 'کرمانشاه', 'آذربایجان غربی', 'آذربایجان شرقی', 'ایلام', 'لرستان', 'اردبیل', 'زنجان', 'همدان'],
    totalPersonnel: 98400,
    avgPerformance: 88.1,
    avgFillRate: 86.5,
    netTransferBalance: -4120,
    leadStrength: 'مهارت رزمی و کوهستانی مرزبانی و تکاوری',
    criticalNeed: 'انسداد فیزیکی و اپتیکی معابر صعب‌العبور مرزی'
  },
  {
    regionName: 'منطقه ۴ (شرق و جنوب‌شرق)',
    provincesIncluded: ['سیستان و بلوچستان', 'خراسان رضوی', 'کرمان', 'خراسان جنوبی', 'خراسان شمالی', 'یزد'],
    totalPersonnel: 82100,
    avgPerformance: 89.4,
    avgFillRate: 85.8,
    netTransferBalance: -2680,
    leadStrength: 'مبارزه با باندهای بین‌المللی مواد مخدر و تروریسم',
    criticalNeed: 'تجهیزات دید در شب، ریزپرنده‌های پایش و رفاه مرزداران'
  },
  {
    regionName: 'منطقه ۵ (جنوب و سواحل)',
    provincesIncluded: ['خوزستان', 'فارس', 'هرمزگان', 'بوشهر', 'چهارمحال و بختیاری', 'کهگیلویه و بویراحمد'],
    totalPersonnel: 76800,
    avgPerformance: 87.1,
    avgFillRate: 86.2,
    netTransferBalance: -2820,
    leadStrength: 'اقتدار دریابانی در خلیج‌فارس و تامین امنیت انرژی',
    criticalNeed: 'شناورهای اقیانوس‌پیمای تندرو و سامانه‌های راداری ساحلی'
  }
];

export type GISMapLayer = 
  | 'headcount' 
  | 'performance' 
  | 'competency' 
  | 'recruitment' 
  | 'transfers' 
  | 'training' 
  | 'hardship';

export interface MapLayerConfig {
  id: GISMapLayer;
  title: string;
  shortTitle: string;
  metricLabel: string;
  unit: string;
  colorScheme: {
    min: string;
    mid: string;
    max: string;
  };
  getMetricValue: (p: ProvinceGISData) => number;
  formatValue: (val: number) => string;
}

export const MAP_LAYERS: MapLayerConfig[] = [
  {
    id: 'headcount',
    title: 'توزیع و تراکم نیروی انسانی',
    shortTitle: 'تراکم نیرو',
    metricLabel: 'تعداد کل پرسنل انتظامی',
    unit: 'نفر',
    colorScheme: { min: '#e0e7ff', mid: '#6366f1', max: '#312e81' },
    getMetricValue: (p) => p.personnel.totalPersonnel,
    formatValue: (val) => `${val.toLocaleString('fa-IR')} نفر`
  },
  {
    id: 'performance',
    title: 'شاخص عملکرد و بازدهی سازمانی (۱۹۷ و کشف)',
    shortTitle: 'عملکرد سازمانی',
    metricLabel: 'نمره کل عملکرد استانی',
    unit: 'از ۱۰۰',
    colorScheme: { min: '#ecfdf5', mid: '#10b981', max: '#064e3b' },
    getMetricValue: (p) => p.performance.overallScore,
    formatValue: (val) => `${val.toFixed(1)} / ۱۰۰`
  },
  {
    id: 'competency',
    title: 'میانگین شایستگی‌ها و مهارت تیراندازی',
    shortTitle: 'شایستگی و مهارت',
    metricLabel: 'نمره کل ماتریس شایستگی',
    unit: 'از ۱۰۰',
    colorScheme: { min: '#fef3c7', mid: '#f59e0b', max: '#78350f' },
    getMetricValue: (p) => p.competency.overallCompetencyScore,
    formatValue: (val) => `${val.toFixed(1)}`
  },
  {
    id: 'recruitment',
    title: 'درصد تحقق جذب و بومی‌گزینی',
    shortTitle: 'جذب و گزینش',
    metricLabel: 'درصد بومی‌گزینی داوطلبان',
    unit: 'درصد',
    colorScheme: { min: '#f0fdfa', mid: '#14b8a6', max: '#134e4a' },
    getMetricValue: (p) => p.recruitment.localRecruitmentRate,
    formatValue: (val) => `${val}٪`
  },
  {
    id: 'transfers',
    title: 'تراز جابجایی و موازنه مهاجرت پرسنلی',
    shortTitle: 'موازنه جابجایی',
    metricLabel: 'تراز خالص جابجایی (ورود - خروج)',
    unit: 'نفر',
    colorScheme: { min: '#fee2e2', mid: '#f43f5e', max: '#881337' },
    getMetricValue: (p) => p.transfers.netBalance,
    formatValue: (val) => val > 0 ? `+${val.toLocaleString('fa-IR')}` : `${val.toLocaleString('fa-IR')}`
  },
  {
    id: 'training',
    title: 'سرانه آموزش‌های تخصصی و تاکتیکی',
    shortTitle: 'آموزش و مهارت',
    metricLabel: 'سرانه ساعت آموزش پرسنل در سال',
    unit: 'ساعت',
    colorScheme: { min: '#f3e8ff', mid: '#a855f7', max: '#581c87' },
    getMetricValue: (p) => p.training.perCapitaHours,
    formatValue: (val) => `${val} ساعت`
  },
  {
    id: 'hardship',
    title: 'ضریب سختی خدمت و مناطق عملیاتی/مرزی',
    shortTitle: 'ضریب سختی',
    metricLabel: 'ضریب سختی ماموریت مصوب',
    unit: 'ضریب',
    colorScheme: { min: '#ffedd5', mid: '#f97316', max: '#7c2d12' },
    getMetricValue: (p) => p.hardshipCoefficient,
    formatValue: (val) => `${val.toFixed(2)}`
  }
];
