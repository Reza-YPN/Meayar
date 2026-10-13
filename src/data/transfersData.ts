export interface ProvinceData {
  id: string;
  name: string;
  type: 'central' | 'border_challenging' | 'moderate' | 'other';
  avgTransferDays: number;
  satisfactionScore: number; // 1 to 5
  complaintRate: number; // Percentage
  quitRate: number; // Percentage
  housingAvailabilityRate: number; // Percentage
  activeApplications: number;
  bestPracticeNotes: string;
}

export interface EarlyWarningPersonnel {
  personnelId: string;
  name: string;
  rank: string;
  currentUnit: string;
  currentProvince: string;
  requestedProvince: string;
  distanceKm: number;
  monthsAwayFromFamily: number;
  hasOrganizationalHouse: boolean;
  quitRiskProbability: number; // 0 to 100
  riskLevel: 'high' | 'medium' | 'low';
  prescriptiveAction: string;
  estimatedCostMillionToman: number;
  satisfactionExpectedBoost: number;
  status: 'pending_review' | 'recommended_by_dss' | 'approved_by_commander' | 'rejected';
}

export interface TransferApplication {
  id: string;
  trackingCode: string;
  personnelId: string;
  fullName: string;
  rank: string;
  currentProvince: string;
  currentUnit: string;
  targetProvince: string;
  targetUnitType: string;
  primaryReason: 'family_separation' | 'housing_shortage' | 'medical' | 'career_growth';
  requestDate: string;
  status: 'submitted' | 'evaluator_review' | 'dss_prescribed' | 'commission_approved' | 'rejected';
  riskScore: number; // 0-100
  riskLevel: 'high' | 'medium' | 'low';
  housingRequested: boolean;
  recommendedPrescription?: string;
  notes?: string;
}

export const FARAJA_PROVINCES_DATA: ProvinceData[] = [
  {
    id: 'tehran',
    name: 'تهران (فاتب)',
    type: 'central',
    avgTransferDays: 23,
    satisfactionScore: 4.5,
    complaintRate: 4,
    quitRate: 1,
    housingAvailabilityRate: 68,
    activeApplications: 142,
    bestPracticeNotes: 'بهره‌گیری از سامانه الکترونیکی یکپارچه و بودجه مسکن خاص و حمایت مستقیم فرماندهی.'
  },
  {
    id: 'kermanshah',
    name: 'کرمانشاه',
    type: 'border_challenging',
    avgTransferDays: 41,
    satisfactionScore: 3.1,
    complaintRate: 12,
    quitRate: 6,
    housingAvailabilityRate: 34,
    activeApplications: 98,
    bestPracticeNotes: 'نیازمند تخصیص هدفمند سهمیه مسکن جهت کاهش نرخ خستگی مسافتی و تقویت رده‌های مرزی.'
  },
  {
    id: 'sistan',
    name: 'سیستان و بلوچستان',
    type: 'border_challenging',
    avgTransferDays: 54,
    satisfactionScore: 2.8,
    complaintRate: 19,
    quitRate: 9,
    housingAvailabilityRate: 22,
    activeApplications: 185,
    bestPracticeNotes: 'منطقه پرچالش مرزی؛ بالاترین اولویت برای بسته‌های تجویزی ترکیبی (مسکن + ۲۰٪ فوق‌العاده مأموریت).'
  },
  {
    id: 'khozestan',
    name: 'خوزستان',
    type: 'border_challenging',
    avgTransferDays: 48,
    satisfactionScore: 3.0,
    complaintRate: 15,
    quitRate: 7,
    housingAvailabilityRate: 31,
    activeApplications: 114,
    bestPracticeNotes: 'چالش مضاعف شرایط جوی و دوری از خانواده؛ پیاده‌سازی سازوکار انتقال دوره‌ای ۳ ساله.'
  },
  {
    id: 'fars',
    name: 'فارس',
    type: 'moderate',
    avgTransferDays: 29,
    satisfactionScore: 4.1,
    complaintRate: 6,
    quitRate: 2,
    housingAvailabilityRate: 60,
    activeApplications: 67,
    bestPracticeNotes: 'الگوی موفق بومی در تعامل منطقه‌ای با یگان‌های همجوار و فرآیند شفاف رسیدگی.'
  },
  {
    id: 'markazi',
    name: 'مرکزی',
    type: 'central',
    avgTransferDays: 31,
    satisfactionScore: 3.9,
    complaintRate: 7,
    quitRate: 3,
    housingAvailabilityRate: 55,
    activeApplications: 52,
    bestPracticeNotes: 'میزبان پایلوت فاز ۲ برای سنجش فرآیندهای پرترافیک و صحت‌سنجی مدل‌های داده‌محور.'
  }
];

export const RANDOM_FOREST_FEATURE_IMPORTANCE = [
  { feature: 'دسترسی به منزل سازمانی', importance: 31, color: '#4338ca', description: 'بالاترین ضریب تعیین‌کننده ماندگاری نیروها (β = -0.37)' },
  { feature: 'حقوق و مزایای مأموریت', importance: 22, color: '#6366f1', description: 'تأثیر معنادار بر جبران سختی شرایط محیطی (β = +0.21)' },
  { feature: 'فاصله جغرافیایی از خانواده', importance: 18, color: '#818cf8', description: '۴۲٪ پرسنل متقاضی با چالش جدایی از همسر و فرزند روبرو هستند' },
  { feature: 'سختی اقلیمی و شرایط یگان', importance: 15, color: '#a5b4fc', description: 'مناطق مرزی، کویری و گرمسیری بدون تسهیلات اقامتی' },
  { feature: 'تطابق فرهنگی و بومی‌گزینی', importance: 8, color: '#c7d2fe', description: 'سازگاری فرهنگی در مناطق تلفیقی و سنتی' },
  { feature: 'سابقه خدمت در مناطق عملیاتی', importance: 6, color: '#e0e7ff', description: 'تکمیل دوره موظف ایثارگری و مناطق صعب‌المعیشه' },
];

export const STATISTICAL_INSIGHTS = {
  housingVsSalary: {
    noHousingBeta: -0.37,
    salaryBoostBeta: 0.21,
    ratioText: 'تأثیر نبود منزل سازمانی تقریباً دو برابر افزایش مزایای نقدی بر افت رضایت شغلی است.',
    withHousingSatisfaction: 4.2,
    withoutHousingSatisfaction: 2.9,
    percentageGap: 31,
  },
  challengesDistribution: [
    { title: 'کمبود یا نبود منازل سازمانی', frequency: 46, category: 'سازمانی' },
    { title: 'عدم همراهی خانواده (دوری)', frequency: 42, category: 'فردی' },
    { title: 'ناکافی بودن حقوق و مزایا', frequency: 29, category: 'سازمانی' },
    { title: 'طولانی بودن فرآیندهای اداری', frequency: 24, category: 'سازمانی' },
    { title: 'فشار روانی و مشکلات خانوادگی', frequency: 21, category: 'فردی' },
    { title: 'خستگی مفرط ناشی از مسافت و تردد', frequency: 18, category: 'فردی' },
  ]
};

export const INITIAL_EARLY_WARNING_PERSONNEL: EarlyWarningPersonnel[] = [
  {
    personnelId: '۱۲۳۴۵',
    name: 'استواریکم احمد حسینی',
    rank: 'استواریکم',
    currentUnit: 'هنگ مرزی سراوان - گروهان ریگ ملک',
    currentProvince: 'سیستان و بلوچستان',
    requestedProvince: 'اصفهان',
    distanceKm: 1420,
    monthsAwayFromFamily: 38,
    hasOrganizationalHouse: false,
    quitRiskProbability: 85,
    riskLevel: 'high',
    prescriptiveAction: 'اولویت اعطای مسکن سازمانی فوری در زاهدان یا انتقال قطعی به یگان انتظامی کاشان',
    estimatedCostMillionToman: 8,
    satisfactionExpectedBoost: 55,
    status: 'recommended_by_dss'
  },
  {
    personnelId: '۱۱۲۲۳',
    name: 'ستوان‌دوم مهدی رستمی',
    rank: 'ستوان‌دوم',
    currentUnit: 'فرماندهی انتظامی قصرشیرین - پاسگاه مرزی پرویزخان',
    currentProvince: 'کرمانشاه',
    requestedProvince: 'همدان',
    distanceKm: 380,
    monthsAwayFromFamily: 22,
    hasOrganizationalHouse: false,
    quitRiskProbability: 42,
    riskLevel: 'medium',
    prescriptiveAction: 'افزایش ۱۵٪ مزایای مأموریت و اعطای سهمیه ودیعه مسکن حکمت در کرمانشاه',
    estimatedCostMillionToman: 5,
    satisfactionExpectedBoost: 32,
    status: 'pending_review'
  },
  {
    personnelId: '۱۰۹۹۱',
    name: 'سروان علی محمدی',
    rank: 'سروان',
    currentUnit: 'کلانتری ۱۲ مرکزی شیراز',
    currentProvince: 'فارس',
    requestedProvince: 'بوشهر',
    distanceKm: 290,
    monthsAwayFromFamily: 6,
    hasOrganizationalHouse: true,
    quitRiskProbability: 17,
    riskLevel: 'low',
    prescriptiveAction: 'عدم نیاز به مداخله پرهزینه؛ پیگیری وفق روال سنواتی در کمیسیون عادی اردیبهشت',
    estimatedCostMillionToman: 0,
    satisfactionExpectedBoost: 10,
    status: 'approved_by_commander'
  },
  {
    personnelId: '۱۳۴۵۱',
    name: 'ستوان‌یکم رضا شاکری',
    rank: 'ستوان‌یکم',
    currentUnit: 'یگان امداد دشت آزادگان (سوسنگرد)',
    currentProvince: 'خوزستان',
    requestedProvince: 'تهران (فاتب)',
    distanceKm: 870,
    monthsAwayFromFamily: 31,
    hasOrganizationalHouse: false,
    quitRiskProbability: 79,
    riskLevel: 'high',
    prescriptiveAction: 'تخصیص سوئیت سازمانی مجردی در اهواز یا موافقت با انتقال به یگان خودرویی فاتب',
    estimatedCostMillionToman: 8,
    satisfactionExpectedBoost: 48,
    status: 'recommended_by_dss'
  },
  {
    personnelId: '۱۴۸۹۰',
    name: 'استواردوم مصطفی ناصری',
    rank: 'استواردوم',
    currentUnit: 'کلانتری ۱۰۳ گاندی تهران',
    currentProvince: 'تهران (فاتب)',
    requestedProvince: 'قم',
    distanceKm: 145,
    monthsAwayFromFamily: 12,
    hasOrganizationalHouse: false,
    quitRiskProbability: 25,
    riskLevel: 'low',
    prescriptiveAction: 'بررسی در کمیته جابجایی درون‌ناحیه‌ای بدون بار مالی سازمانی',
    estimatedCostMillionToman: 0,
    satisfactionExpectedBoost: 18,
    status: 'pending_review'
  }
];

export const INITIAL_TRANSFER_APPLICATIONS: TransferApplication[] = [
  {
    id: 'tr-01',
    trackingCode: 'TR-1404-9821',
    personnelId: '۱۲۳۴۵',
    fullName: 'احمد حسینی',
    rank: 'استواریکم',
    currentProvince: 'سیستان و بلوچستان',
    currentUnit: 'هنگ مرزی سراوان',
    targetProvince: 'اصفهان',
    targetUnitType: 'یگان انتظامی / کلانتری',
    primaryReason: 'family_separation',
    requestDate: '۱۴۰۴/۱۰/۰۲',
    status: 'dss_prescribed',
    riskScore: 85,
    riskLevel: 'high',
    housingRequested: true,
    recommendedPrescription: 'اولویت اعطای مسکن سازمانی فوری یا انتقال به اصفهان (هزینه مداخله: ۸ م.ت)',
    notes: '۳۸ ماه دوری مفرط از خانواده و کودک بیمار؛ وضعیت هشدار قرمز EWS'
  },
  {
    id: 'tr-02',
    trackingCode: 'TR-1404-9822',
    personnelId: '۱۱۲۲۳',
    fullName: 'مهدی رستمی',
    rank: 'ستوان‌دوم',
    currentProvince: 'کرمانشاه',
    currentUnit: 'پاسگاه مرزی پرویزخان',
    targetProvince: 'همدان',
    targetUnitType: 'پلیس راهور یا انتظامی',
    primaryReason: 'housing_shortage',
    requestDate: '۱۴۰۴/۱۰/۰۸',
    status: 'evaluator_review',
    riskScore: 42,
    riskLevel: 'medium',
    housingRequested: true,
    recommendedPrescription: 'افزایش ۱۵٪ مزایای مأموریت و تسهیلات ودیعه مسکن در قصرشیرین',
    notes: 'فاقد مسکن سازمانی؛ سابقه ۲۲ ماه خدمت عملیاتی'
  },
  {
    id: 'tr-03',
    trackingCode: 'TR-1404-9823',
    personnelId: '۱۳۴۵۱',
    fullName: 'رضا شاکری',
    rank: 'ستوان‌یکم',
    currentProvince: 'خوزستان',
    currentUnit: 'یگان امداد دشت آزادگان',
    targetProvince: 'تهران (فاتب)',
    targetUnitType: 'پلیس پیشگیری / کلانتری‌های پایتخت',
    primaryReason: 'family_separation',
    requestDate: '۱۴۰۴/۱۰/۱۴',
    status: 'dss_prescribed',
    riskScore: 79,
    riskLevel: 'high',
    housingRequested: true,
    recommendedPrescription: 'انتقال به کلانتری‌های حاشیه پایتخت با سهمیه مسکن سازمانی پرند',
    notes: 'خطر ریزش انگیزه خدمتی و ترک خدمت وفق رگرسیون تصادفی'
  },
  {
    id: 'tr-04',
    trackingCode: 'TR-1404-9824',
    personnelId: '۱۴۸۹۰',
    fullName: 'مصطفی ناصری',
    rank: 'استواردوم',
    currentProvince: 'تهران (فاتب)',
    currentUnit: 'کلانتری ۱۰۳ گاندی',
    targetProvince: 'قم',
    targetUnitType: 'کلانتری یا پاسگاه',
    primaryReason: 'career_growth',
    requestDate: '۱۴۰۴/۱۰/۱۸',
    status: 'submitted',
    riskScore: 25,
    riskLevel: 'low',
    housingRequested: false,
    recommendedPrescription: 'بررسی در نوبت عادی شش ماهه اول ۱۴۰۵',
    notes: 'وضعیت نرمال، رضایت نسبی از خدمت در کلانتری ۱۰۳'
  }
];

export const PILOT_ROADMAP_PHASES = [
  {
    phase: 1,
    title: 'آماده‌سازی و طراحی ساختار',
    duration: '۳ ماه',
    timeframe: 'دی تا اسفند ۱۴۰۴',
    tasks: [
      'تشکیل کارگروه راهبری تحول نظام انتقالات',
      'یکپارچه‌سازی منابع داده‌ای (سیستم حقوق، اماکن، پرسنلی و سوابق انتظامی)',
      'تدوین چارچوب حاکمیتی، امنیت و سیاست‌های حریم خصوصی داده‌ها'
    ],
    status: 'completed'
  },
  {
    phase: 2,
    title: 'اجرای آزمایشی (Pilot) در ۳ استان منتخب',
    duration: '۶ ماه',
    timeframe: 'فروردین تا شهریور ۱۴۰۵',
    tasks: [
      'پیاده‌سازی در ۳ استان: مرکزی (فرآیندهای حجیم)، مرزی پرچالش (سیستان)، شرایط نرمال',
      'اعتبارسنجی مدل‌های پیش‌بینی ریسک ترک خدمت و الگوریتم‌های Random Forest',
      'ارزیابی اولیه نتایج، پایش بازخورد فرماندهان و سنجش میزان رضایت کارکنان'
    ],
    status: 'in_progress',
    metrics: {
      reducedTimePercent: 20,
      aucAccuracyPercent: 85,
      satisfactionBoostPercent: 15
    }
  },
  {
    phase: 3,
    title: 'توسعه و استقرار سراسری در کل کشور',
    duration: '۱۵ ماه',
    timeframe: 'مهر ۱۴۰۵ تا آذر ۱۴۰۶',
    tasks: [
      'تعمیم سامانه هوشمند انتقالات به تمامی استان‌ها و یگان‌های مستقل فراجا',
      'آموزش جامع مدیران، معاونین نیروی انسانی و کارشناسان ارزیاب',
      'پایش مستمر عملکرد، بازآموزی مدل‌های ML و بهینه‌سازی الگوریتم‌های بودجه'
    ],
    status: 'planned'
  }
];
