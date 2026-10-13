export type CandidateRank = 'درجه‌داری پیمانی' | 'افسری دانش‌آموخته' | 'دانشجوی دانشگاه امین' | 'بانوان (دانشکده کوثر)';

export type TargetUnit = 
  | 'پلیس پیشگیری (کلانتری و پاسگاه‌ها)' 
  | 'فرماندهی مرزبانی' 
  | 'یگان ویژه' 
  | 'پلیس آگاهی' 
  | 'پلیس راهور' 
  | 'پلیس فتا';

export type SelectionStage = 
  | 'ثبت‌نام و بررسی مدارک' 
  | 'آزمون علمی ورودی' 
  | 'معاینات پزشکی بهداری' 
  | 'آزمون آمادگی جسمانی' 
  | 'مصاحبه عقیدتی و روان‌سنجی' 
  | 'تحقیقات محلی و حفاظت' 
  | 'کمیسیون نهایی و اعزام';

export type CandidateStatus = 
  | 'در حال بررسی' 
  | 'قبول مرحله‌ای' 
  | 'مشروط به معاینه مجدد' 
  | 'تایید نهایی و آماده اعزام' 
  | 'رد صلاحیت شده';

export interface MedicalItem {
  name: string;
  doctor: string;
  status: 'تایید' | 'مشروط' | 'مردود' | 'در انتظار معاینه';
  details?: string;
}

export interface SportsScore {
  testName: string;
  record: string;
  score: number; // از ۱۰۰
  status: 'قبول' | 'مردود';
}

export interface Candidate {
  id: string;
  trackingCode: string;
  fullName: string;
  nationalCode: string;
  fatherName: string;
  birthDate: string;
  age: number;
  province: string;
  city: string;
  rankTarget: CandidateRank;
  targetUnit: TargetUnit;
  education: string;
  gpa: number;
  height: number; // cm
  weight: number; // kg
  bmi: number;
  quotas: string[]; // سهمیه ایثارگری، حافظ قرآن، بسیج فعال، پلیس افتخاری
  currentStage: SelectionStage;
  status: CandidateStatus;
  rejectionReason?: string;
  assignedAcademy?: string; // مرکز آموزش تعیین شده (مالک اشتر اراک، شهید رجایی کرج، شهید دستغیب جهرم، دانشگاه امین)
  
  scores: {
    scientificExam?: number; // از ۱۰۰
    sportsExam?: number; // از ۱۰۰
    interviewScore?: number; // از ۱۰۰
    psychologicalScore?: number; // از ۱۰۰
    overallScore: number; // میانگین وزنی
  };

  medicalReport: {
    generalStatus: 'سالم و بلامانع' | 'نیازمند بررسی تکمیلی' | 'عدم انطباق پزشکی';
    vision: string;
    colorBlindness: 'سالم' | 'دارای اختلال';
    items: MedicalItem[];
  };

  sportsReport: SportsScore[];

  interviewReport: {
    ideologicalScore: number;
    psychologicalFitness: 'بسیار مطلوب' | 'مطلوب' | 'متوسط' | 'نامناسب';
    evaluatorNotes: string;
  };

  securityClearance: {
    status: 'تایید کامل' | 'در دست استعلام' | 'مردود';
    localInvestigation: 'مثبت و مورد اعتماد' | 'در دست اقدام' | 'منفی';
    inquiryDate: string;
  };

  commissionVote?: {
    approvedBy: string;
    voteDate: string;
    commissionNotes: string;
  };
}

export interface RecruitmentKPIs {
  totalApplicants: number;
  activeInPipeline: number;
  finalApproved: number;
  rejected: number;
  quotaHolders: number;
  approvalRate: number; // درصد
}

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-101',
    trackingCode: 'GOZ-1404-9821',
    fullName: 'محمدرضا سلطانی',
    nationalCode: '۰۰۲۱۴۵۸۷۹۳',
    fatherName: 'عباس',
    birthDate: '۱۳۸۳/۰۲/۱۵',
    age: 21,
    province: 'تهران',
    city: 'ورامین',
    rankTarget: 'دانشجوی دانشگاه امین',
    targetUnit: 'پلیس آگاهی',
    education: 'دیپلم علوم تجربی',
    gpa: 19.25,
    height: 184,
    weight: 76,
    bmi: 22.4,
    quotas: ['حافظ ۵ جزء قرآن کریم', 'بسیج فعال (۴ سال)'],
    currentStage: 'کمیسیون نهایی و اعزام',
    status: 'تایید نهایی و آماده اعزام',
    assignedAcademy: 'دانشگاه علوم انتظامی امین (تهران)',
    scores: {
      scientificExam: 88,
      sportsExam: 94,
      interviewScore: 91,
      psychologicalScore: 95,
      overallScore: 92.0,
    },
    medicalReport: {
      generalStatus: 'سالم و بلامانع',
      vision: '۱۰/۱۰ کامل',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی و میدان دید', doctor: 'سرهنگ پزشک دکتر ابراهیمی', status: 'تایید', details: 'دید کامل بدون عینک' },
        { name: 'دندانپزشکی و فک', doctor: 'سرگرد دکتر حسینی', status: 'تایید', details: 'عدم وجود عارضه فک' },
        { name: 'اسکلتی-عضلانی و ارتوپدی', doctor: 'دکتر نامداری', status: 'تایید', details: 'تناسب اندام کامل' },
        { name: 'روانپزشکی و سلامت روان', doctor: 'دکتر شمس', status: 'تایید', details: 'ثبات هیجانی بالا' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۲ دقیقه و ۱۰ ثانیه', score: 95, status: 'قبول' },
      { testName: 'شنای سوئدی (۲ دقیقه)', record: '۶۸ حرکت', score: 92, status: 'قبول' },
      { testName: 'درازنشست (۲ دقیقه)', record: '۷۴ حرکت', score: 96, status: 'قبول' },
      { testName: 'تست چابکی ۴×۹ متر', record: '۸.۷ ثانیه', score: 93, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 93,
      psychologicalFitness: 'بسیار مطلوب',
      evaluatorNotes: 'دارای انگیزه خدمتی فوق‌العاده بالا، اخلاق‌مدار و اشراف عالی بر مبانی عقیدتی و ولایی.'
    },
    securityClearance: {
      status: 'تایید کامل',
      localInvestigation: 'مثبت و مورد اعتماد',
      inquiryDate: '۱۴۰۴/۰۹/۱۴'
    },
    commissionVote: {
      approvedBy: 'کمیسیون عالی گزینش فراجا (امضا: سردار ریاست گزینش)',
      voteDate: '۱۴۰۴/۱۰/۰۵',
      commissionNotes: 'انطباق ۱۰۰٪ با معیارهای نخبه‌گزینی دانشگاه امین؛ اولویت پذیرش در رسته تخصصی آگاهی.'
    }
  },
  {
    id: 'cand-102',
    trackingCode: 'GOZ-1404-8742',
    fullName: 'امیرحسین رضایی‌نژاد',
    nationalCode: '۱۲۷۰۹۴۳۳۲۱',
    fatherName: 'غلامرضا',
    birthDate: '۱۳۸۲/۰۷/۱۰',
    age: 22,
    province: 'اصفهان',
    city: 'کاشان',
    rankTarget: 'درجه‌داری پیمانی',
    targetUnit: 'فرماندهی مرزبانی',
    education: 'دیپلم ریاضی و فیزیک',
    gpa: 16.80,
    height: 179,
    weight: 71,
    bmi: 22.1,
    quotas: ['فرزند ایثارگر (۲۵٪)', 'پلیس افتخاری فعال'],
    currentStage: 'کمیسیون نهایی و اعزام',
    status: 'تایید نهایی و آماده اعزام',
    assignedAcademy: 'مرکز آموزش مالک اشتر اراک',
    scores: {
      scientificExam: 76,
      sportsExam: 89,
      interviewScore: 85,
      psychologicalScore: 88,
      overallScore: 84.5,
    },
    medicalReport: {
      generalStatus: 'سالم و بلامانع',
      vision: '۱۰/۱۰ کامل',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی و بینایی‌سنجی', doctor: 'سرهنگ پزشک دکتر ابراهیمی', status: 'تایید' },
        { name: 'قلب و عروق (اکو)', doctor: 'دکتر کمالی', status: 'تایید', details: 'ضربان نرمال، تحمل استرس بالا' },
        { name: 'ارتوپدی و سلامت مفاصل', doctor: 'دکتر نامداری', status: 'تایید' },
        { name: 'روانپزشکی', doctor: 'دکتر شمس', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۲ دقیقه و ۵۵ ثانیه', score: 88, status: 'قبول' },
      { testName: 'شنای سوئدی', record: '۵۹ حرکت', score: 86, status: 'قبول' },
      { testName: 'درازنشست', record: '۶۸ حرکت', score: 91, status: 'قبول' },
      { testName: 'تست چابکی ۴×۹', record: '۹.۱ ثانیه', score: 89, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 87,
      psychologicalFitness: 'بسیار مطلوب',
      evaluatorNotes: 'علاقه‌مندی ویژه به خدمت در مناطق عملیاتی و مرزی؛ تاب‌آوری روانی اثبات‌شده در آزمون کتل.'
    },
    securityClearance: {
      status: 'تایید کامل',
      localInvestigation: 'مثبت و مورد اعتماد',
      inquiryDate: '۱۴۰۴/۰۹/۲۰'
    },
    commissionVote: {
      approvedBy: 'کمیسیون استخدام درجه‌داری فراجا',
      voteDate: '۱۴۰۴/۱۰/۱۲',
      commissionNotes: 'واجد شرایط اعزام به دوره آموزشی مرزبانی در پادگان مالک اشتر اراک.'
    }
  },
  {
    id: 'cand-103',
    trackingCode: 'GOZ-1404-7619',
    fullName: 'سجاد کریمی دهکردی',
    nationalCode: '۴۶۲۸۳۰۱۱۲۵',
    fatherName: 'محسن',
    birthDate: '۱۳۸۴/۰۱/۲۰',
    age: 20,
    province: 'چهارمحال و بختیاری',
    city: 'شهرکرد',
    rankTarget: 'درجه‌داری پیمانی',
    targetUnit: 'یگان ویژه',
    education: 'دیپلم تربیت بدنی',
    gpa: 17.50,
    height: 190,
    weight: 88,
    bmi: 24.4,
    quotas: ['قهرمان جودو استانی', 'بسیج فعال'],
    currentStage: 'تحقیقات محلی و حفاظت',
    status: 'در حال بررسی',
    scores: {
      scientificExam: 72,
      sportsExam: 98,
      interviewScore: 82,
      psychologicalScore: 85,
      overallScore: 84.2,
    },
    medicalReport: {
      generalStatus: 'سالم و بلامانع',
      vision: '۱۰/۱۰ کامل',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی', doctor: 'دکتر ابراهیمی', status: 'تایید' },
        { name: 'دندانپزشکی', doctor: 'دکتر حسینی', status: 'تایید' },
        { name: 'ارتوپدی و ستون فقرات', doctor: 'دکتر نامداری', status: 'تایید', details: 'عضلات ورزیده، متناسب با یگان ویژه' },
        { name: 'روانپزشکی', doctor: 'دکتر شمس', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۱ دقیقه و ۴۵ ثانیه', score: 99, status: 'قبول' },
      { testName: 'شنای سوئدی', record: '۸۲ حرکت', score: 100, status: 'قبول' },
      { testName: 'درازنشست', record: '۸۰ حرکت', score: 97, status: 'قبول' },
      { testName: 'تست چابکی ۴×۹', record: '۸.۴ ثانیه', score: 96, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 82,
      psychologicalFitness: 'مطلوب',
      evaluatorNotes: 'توان جسمانی استثنایی؛ مستعد برای تیم‌های واکنش سریع یگان ویژه پاسداران.'
    },
    securityClearance: {
      status: 'در دست استعلام',
      localInvestigation: 'در دست اقدام',
      inquiryDate: '۱۴۰۴/۱۰/۰۲'
    }
  },
  {
    id: 'cand-104',
    trackingCode: 'GOZ-1404-6510',
    fullName: 'مهدی یعقوبی نژاد',
    nationalCode: '۰۹۳۲۴۵۶۷۸۱',
    fatherName: 'مرتضی',
    birthDate: '۱۳۸۱/۱۱/۰۴',
    age: 23,
    province: 'خراسان رضوی',
    city: 'مشهد',
    rankTarget: 'افسری دانش‌آموخته',
    targetUnit: 'پلیس فتا',
    education: 'کارشناسی مهندسی کامپیوتر (دانشگاه فردوسی)',
    gpa: 18.10,
    height: 176,
    weight: 68,
    bmi: 21.9,
    quotas: ['نخبه مسابقات برنامه‌نویسی', 'بسیج فعال'],
    currentStage: 'معاینات پزشکی بهداری',
    status: 'مشروط به معاینه مجدد',
    rejectionReason: 'ضعف جزئی بینایی در چشم چپ (نیاز به ارزیابی مجدد با عینک طبی یا کمیسیون چشم)',
    scores: {
      scientificExam: 96,
      sportsExam: 72,
      interviewScore: 89,
      psychologicalScore: 92,
      overallScore: 87.2,
    },
    medicalReport: {
      generalStatus: 'نیازمند بررسی تکمیلی',
      vision: 'چشم راست ۱۰/۱۰ - چشم چپ ۸/۱۰',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی', doctor: 'سرهنگ پزشک دکتر ابراهیمی', status: 'مشروط', details: 'معاینه مجدد انکسار نور پس از استفاده از قطره سیکلوپنتولات' },
        { name: 'دندانپزشکی', doctor: 'دکتر حسینی', status: 'تایید' },
        { name: 'ارتوپدی', doctor: 'دکتر نامداری', status: 'تایید' },
        { name: 'روانپزشکی', doctor: 'دکتر شمس', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۴ دقیقه و ۴۰ ثانیه', score: 70, status: 'قبول' },
      { testName: 'شنای سوئدی', record: '۴۸ حرکت', score: 73, status: 'قبول' },
      { testName: 'درازنشست', record: '۵۵ حرکت', score: 75, status: 'قبول' },
      { testName: 'تست چابکی ۴×۹', record: '۹.۸ ثانیه', score: 72, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 88,
      psychologicalFitness: 'بسیار مطلوب',
      evaluatorNotes: 'تسلط بی‌نظیر بر مباحث امنیت شبکه و جرایم سایبری؛ گزینه‌ای ممتاز برای قرارگاه سایبری فتا.'
    },
    securityClearance: {
      status: 'در دست استعلام',
      localInvestigation: 'مثبت و مورد اعتماد',
      inquiryDate: '۱۴۰۴/۱۰/۰۸'
    }
  },
  {
    id: 'cand-105',
    trackingCode: 'GOZ-1404-5412',
    fullName: 'فاطمه السادات موسوی',
    nationalCode: '۰۴۵۲۳۹۸۷۶۱',
    fatherName: 'سید رضا',
    birthDate: '۱۳۸۲/۰۴/۱۱',
    age: 22,
    province: 'قم',
    city: 'قم',
    rankTarget: 'بانوان (دانشکده کوثر)',
    targetUnit: 'پلیس پیشگیری (کلانتری و پاسگاه‌ها)',
    education: 'کارشناسی حقوق قضایی',
    gpa: 18.85,
    height: 168,
    weight: 59,
    bmi: 20.9,
    quotas: ['حافظ کل قرآن کریم', 'فرزند جانباز ۴۰٪'],
    currentStage: 'کمیسیون نهایی و اعزام',
    status: 'تایید نهایی و آماده اعزام',
    assignedAcademy: 'دانشکده افسری و تربیت پلیس کوثر (تهران)',
    scores: {
      scientificExam: 92,
      sportsExam: 86,
      interviewScore: 96,
      psychologicalScore: 94,
      overallScore: 92.0,
    },
    medicalReport: {
      generalStatus: 'سالم و بلامانع',
      vision: '۱۰/۱۰ کامل',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی', doctor: 'دکتر میرزایی', status: 'تایید' },
        { name: 'معاینات عمومی بهداری بانوان', doctor: 'سرگرد دکتر زمانی', status: 'تایید' },
        { name: 'روانپزشکی و مصاحبه سلامت روان', doctor: 'دکتر شمس', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۱۶۰۰ متر بانوان', record: '۷ دقیقه و ۱۰ ثانیه', score: 88, status: 'قبول' },
      { testName: 'درازنشست (۲ دقیقه)', record: '۶۲ حرکت', score: 85, status: 'قبول' },
      { testName: 'آزمون انعطاف‌پذیری و چابکی', record: 'عالی', score: 86, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 98,
      psychologicalFitness: 'بسیار مطلوب',
      evaluatorNotes: 'احراز بالاترین نمره مصاحبه عقیدتی-سیاسی، دارای تسلط عالی حقوقی و روانشناسی مددکاری کلانتری.'
    },
    securityClearance: {
      status: 'تایید کامل',
      localInvestigation: 'مثبت و مورد اعتماد',
      inquiryDate: '۱۴۰۴/۰۹/۱۱'
    },
    commissionVote: {
      approvedBy: 'کمیسیون عالی گزینش بانوان فراجا',
      voteDate: '۱۴۰۴/۱۰/۰۳',
      commissionNotes: 'پذیرش قطعی در مقطع افسری دانشکده کوثر با سهمیه نخبگان قرآنی.'
    }
  },
  {
    id: 'cand-106',
    trackingCode: 'GOZ-1404-4328',
    fullName: 'پیمان مرادی',
    nationalCode: '۳۲۵۰۹۸۴۱۱۲',
    fatherName: 'جهانبخش',
    birthDate: '۱۳۸۳/۰۹/۱۸',
    age: 21,
    province: 'کرمانشاه',
    city: 'اسلام‌آباد غرب',
    rankTarget: 'درجه‌داری پیمانی',
    targetUnit: 'پلیس راهور',
    education: 'دیپلم علوم انسانی',
    gpa: 15.40,
    height: 177,
    weight: 70,
    bmi: 22.3,
    quotas: ['بسیج فعال'],
    currentStage: 'معاینات پزشکی بهداری',
    status: 'رد صلاحیت شده',
    rejectionReason: 'عدم احراز سلامت بینایی (کوررنگی نسبی قرمز-سبز مانع از خدمت در راهور و یگان‌های عملیاتی)',
    scores: {
      scientificExam: 68,
      sportsExam: 80,
      interviewScore: 75,
      psychologicalScore: 81,
      overallScore: 76.0,
    },
    medicalReport: {
      generalStatus: 'عدم انطباق پزشکی',
      vision: '۱۰/۱۰ ولی دارای اختلال دید رنگ',
      colorBlindness: 'دارای اختلال',
      items: [
        { name: 'چشم‌پزشکی و تست ایشی‌هارا', doctor: 'دکتر ابراهیمی', status: 'مردود', details: 'خطا در تست کوررنگی ایشی‌هارا (صفحات ۵ تا ۱۰)' },
        { name: 'ارتوپدی', doctor: 'دکتر نامداری', status: 'تایید' },
        { name: 'روانپزشکی', doctor: 'دکتر شمس', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۳ دقیقه و ۳۰ ثانیه', score: 80, status: 'قبول' },
      { testName: 'شنای سوئدی', record: '۵۲ حرکت', score: 78, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 78,
      psychologicalFitness: 'مطلوب',
      evaluatorNotes: 'انگیزه بالا دارد لیکن نقص پزشکی غیرقابل اغماض است.'
    },
    securityClearance: {
      status: 'در دست استعلام',
      localInvestigation: 'در دست اقدام',
      inquiryDate: '۱۴۰۴/۱۰/۰۱'
    }
  },
  {
    id: 'cand-107',
    trackingCode: 'GOZ-1404-3209',
    fullName: 'حسین میرزایی فارسانی',
    nationalCode: '۴۶۱۰۰۹۸۷۴۳',
    fatherName: 'بهروز',
    birthDate: '۱۳۸۴/۰۳/۰۲',
    age: 20,
    province: 'فارس',
    city: 'شیراز',
    rankTarget: 'دانشجوی دانشگاه امین',
    targetUnit: 'پلیس پیشگیری (کلانتری و پاسگاه‌ها)',
    education: 'دیپلم علوم انسانی',
    gpa: 18.90,
    height: 182,
    weight: 75,
    bmi: 22.6,
    quotas: ['فرزند ایثارگر (۵۰٪)', 'بسیج فعال'],
    currentStage: 'مصاحبه عقیدتی و روان‌سنجی',
    status: 'در حال بررسی',
    scores: {
      scientificExam: 85,
      sportsExam: 90,
      interviewScore: 88,
      psychologicalScore: 89,
      overallScore: 88.0,
    },
    medicalReport: {
      generalStatus: 'سالم و بلامانع',
      vision: '۱۰/۱۰ کامل',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی', doctor: 'دکتر ابراهیمی', status: 'تایید' },
        { name: 'دندانپزشکی', doctor: 'دکتر حسینی', status: 'تایید' },
        { name: 'ارتوپدی', doctor: 'دکتر نامداری', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۲ دقیقه و ۲۰ ثانیه', score: 91, status: 'قبول' },
      { testName: 'شنای سوئدی', record: '۶۴ حرکت', score: 90, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 88,
      psychologicalFitness: 'بسیار مطلوب',
      evaluatorNotes: 'در حال تکمیل مصاحبه تخصصی و تحلیل تست MMPI.'
    },
    securityClearance: {
      status: 'تایید کامل',
      localInvestigation: 'مثبت و مورد اعتماد',
      inquiryDate: '۱۴۰۴/۰۹/۲۹'
    }
  },
  {
    id: 'cand-108',
    trackingCode: 'GOZ-1404-2190',
    fullName: 'یاسر بلوچ‌زهی',
    nationalCode: '۳۶۲۰۸۷۵۴۱۲',
    fatherName: 'عبدالغفور',
    birthDate: '۱۳۸۳/۰۵/۱۴',
    age: 21,
    province: 'سیستان و بلوچستان',
    city: 'سراوان',
    rankTarget: 'درجه‌داری پیمانی',
    targetUnit: 'فرماندهی مرزبانی',
    education: 'دیپلم علوم تجربی',
    gpa: 16.40,
    height: 180,
    weight: 74,
    bmi: 22.8,
    quotas: ['بومی مناطق مرزی درجه یک', 'بسیج فعال'],
    currentStage: 'کمیسیون نهایی و اعزام',
    status: 'تایید نهایی و آماده اعزام',
    assignedAcademy: 'مرکز آموزش شهید رجایی کرج',
    scores: {
      scientificExam: 78,
      sportsExam: 92,
      interviewScore: 84,
      psychologicalScore: 86,
      overallScore: 85.0,
    },
    medicalReport: {
      generalStatus: 'سالم و بلامانع',
      vision: '۱۰/۱۰ کامل',
      colorBlindness: 'سالم',
      items: [
        { name: 'چشم‌پزشکی', doctor: 'دکتر ابراهیمی', status: 'تایید' },
        { name: 'ارتوپدی', doctor: 'دکتر نامداری', status: 'تایید' },
        { name: 'بهداری کل', doctor: 'دکتر زمانی', status: 'تایید' },
      ]
    },
    sportsReport: [
      { testName: 'دو ۳۲۰۰ متر استقامت', record: '۱۲ دقیقه و ۱۵ ثانیه', score: 94, status: 'قبول' },
      { testName: 'درازنشست', record: '۷۰ حرکت', score: 90, status: 'قبول' },
    ],
    interviewReport: {
      ideologicalScore: 84,
      psychologicalFitness: 'بسیار مطلوب',
      evaluatorNotes: 'اشراف کامل بر جغرافیای منطقه مرزی، بومی‌گزینی هدفمند فراجا در شرق کشور.'
    },
    securityClearance: {
      status: 'تایید کامل',
      localInvestigation: 'مثبت و مورد اعتماد',
      inquiryDate: '۱۴۰۴/۰۹/۱۵'
    },
    commissionVote: {
      approvedBy: 'کمیسیون جذب مناطق مرزی',
      voteDate: '۱۴۰۴/۱۰/۰۲',
      commissionNotes: 'استخدام بومی مرزبانی استان سیستان و بلوچستان با اولویت هنگ مرزی سراوان.'
    }
  }
];

// Funnel stages with numbers for Faraja recruitment cycle
export interface FunnelStageData {
  stage: SelectionStage;
  count: number;
  passRate: number; // درصد قبولی
  dropReason: string;
}

export const FARAJA_FUNNEL_DATA: FunnelStageData[] = [
  { stage: 'ثبت‌نام و بررسی مدارک', count: 3480, passRate: 100, dropReason: 'تطبیق اولیه معدل، سن، قد و وضعیت نظام وظیفه' },
  { stage: 'آزمون علمی ورودی', count: 2750, passRate: 79, dropReason: 'عدم کسب حداقل تراز علمی ۵۰٪' },
  { stage: 'معاینات پزشکی بهداری', count: 1820, passRate: 66, dropReason: 'رد در بینایی‌سنجی، ارتوپدی، قلب و عروق و اعصاب' },
  { stage: 'آزمون آمادگی جسمانی', count: 1450, passRate: 79, dropReason: 'عدم حد نصاب دو ۳۲۰۰ متر و شنای سوئدی' },
  { stage: 'مصاحبه عقیدتی و روان‌سنجی', count: 1180, passRate: 81, dropReason: 'عدم تطابق روانشناختی یا ضعف در احکام و بصیرت' },
  { stage: 'تحقیقات محلی و حفاظت', count: 920, passRate: 78, dropReason: 'موارد حراستی، سوابق کیفری یا تحقیقات منفی محلی' },
  { stage: 'کمیسیون نهایی و اعزام', count: 640, passRate: 70, dropReason: 'تکمیل سهمیه ابلاغی ستاد کل و گزینش ممتازین' },
];

// Target Unit distribution
export const UNIT_CAPACITIES = [
  { name: 'فرماندهی مرزبانی', targetCapacity: 250, filledCount: 185, color: '#059669' },
  { name: 'پلیس پیشگیری', targetCapacity: 200, filledCount: 148, color: '#2563eb' },
  { name: 'یگان ویژه', targetCapacity: 120, filledCount: 94, color: '#7c3aed' },
  { name: 'پلیس آگاهی', targetCapacity: 80, filledCount: 58, color: '#ea580c' },
  { name: 'پلیس راهور', targetCapacity: 70, filledCount: 52, color: '#0891b2' },
  { name: 'پلیس فتا', targetCapacity: 40, filledCount: 28, color: '#dc2626' },
];

// Medical failure root causes in Faraja
export const MEDICAL_FAILURE_CAUSES = [
  { cause: 'نقص بینایی و عیوب انکساری (کوررنگی / آستیگمات بیش از حد مجاز)', percentage: 42 },
  { cause: 'مشکلات اسکلتی و ارتوپدی (پای پرانتزی، انحراف ستون فقرات)', percentage: 26 },
  { cause: 'فشار خون، آریتمی و نارسایی قلبی-عروقی', percentage: 15 },
  { cause: 'اضطراب شدید، عدم ثبات هیجانی در تست روانپزشکی', percentage: 11 },
  { cause: 'سایر موارد (دندانپزشکی پیشرفته، جراحی‌های قبلی ممنوعه)', percentage: 6 },
];

// Training academies list
export const FARAJA_ACADEMIES = [
  { id: 'acad-1', name: 'مرکز آموزش مالک اشتر اراک', capacity: 1200, currentTrainees: 980, type: 'درجه‌داری و مرزبانی' },
  { id: 'acad-2', name: 'مرکز آموزش شهید رجایی کرج', capacity: 900, currentTrainees: 740, type: 'مرزبانی و رده‌های تخصصی' },
  { id: 'acad-3', name: 'مرکز آموزش شهید دستغیب جهرم', capacity: 800, currentTrainees: 620, type: 'درجه‌داری جنوب کشور' },
  { id: 'acad-4', name: 'دانشگاه علوم انتظامی امین (تهران)', capacity: 1500, currentTrainees: 1350, type: 'مقطع افسری کارشناسی' },
  { id: 'acad-5', name: 'مجتمع آموزشی و دانشکده بانوان کوثر', capacity: 400, currentTrainees: 290, type: 'افسری و درجه‌داری بانوان' },
];
