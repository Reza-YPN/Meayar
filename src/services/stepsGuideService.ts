import {
  Award,
  TrendingUp,
  GraduationCap,
  Gift,
  Compass,
  CreditCard,
  Home,
  Clock,
  FileText,
  HeartPulse,
  Users,
  Headphones,
  User,
  Bell,
  Sparkles,
  Shield,
  BookOpen,
  Activity,
  CheckCircle2,
  Target,
  Star,
  FolderCheck,
  Briefcase,
  LucideIcon
} from "lucide-react";

export interface StepInfo {
  id: string;
  stepNumber?: number;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  desc: string;
  details?: string[];
  link: string;
  isCustom?: boolean;
  updatedAt?: string;
}

export const ICON_OPTIONS: { name: string; label: string; icon: LucideIcon }[] = [
  { name: "Award", label: "شایستگی و نشان", icon: Award },
  { name: "TrendingUp", label: "ارزیابی و رشد", icon: TrendingUp },
  { name: "GraduationCap", label: "آموزش و تحصیل", icon: GraduationCap },
  { name: "Gift", label: "پاداش و رفاهی", icon: Gift },
  { name: "Compass", label: "مسیر شغلی", icon: Compass },
  { name: "CreditCard", label: "حقوق و مالی", icon: CreditCard },
  { name: "Home", label: "خانه و پیشخوان", icon: Home },
  { name: "Clock", label: "حضور و مرخصی", icon: Clock },
  { name: "FileText", label: "میز خدمت و نامه", icon: FileText },
  { name: "HeartPulse", label: "سلامت و بهداشت", icon: HeartPulse },
  { name: "Users", label: "کارکنان و مشارکت", icon: Users },
  { name: "Headphones", label: "پشتیبانی و تیکت", icon: Headphones },
  { name: "User", label: "پروفایل هویتی", icon: User },
  { name: "Bell", label: "پیام‌ها و اعلان", icon: Bell },
  { name: "Sparkles", label: "هوشمند و ویژه", icon: Sparkles },
  { name: "Shield", label: "فرماندهی و امنیت", icon: Shield },
  { name: "BookOpen", label: "کتاب و مطالعه", icon: BookOpen },
  { name: "Activity", label: "پایش فعالیت", icon: Activity },
  { name: "Target", label: "اهداف و شاخص", icon: Target },
  { name: "Star", label: "برتر و منتخب", icon: Star },
  { name: "FolderCheck", label: "پرونده و اسناد", icon: FolderCheck },
  { name: "Briefcase", label: "شغل و منصب", icon: Briefcase }
];

export const COLOR_OPTIONS = [
  { value: "from-violet-600 to-purple-600", label: "بنفش / ارغوانی", bg: "bg-violet-600" },
  { value: "from-blue-600 to-indigo-600", label: "آبی / نیلی", bg: "bg-blue-600" },
  { value: "from-emerald-600 to-teal-600", label: "زمردی / سبز", bg: "bg-emerald-600" },
  { value: "from-rose-500 to-pink-600", label: "سرخابی / رز", bg: "bg-rose-500" },
  { value: "from-indigo-600 to-violet-600", label: "نیلی / بنفش", bg: "bg-indigo-600" },
  { value: "from-amber-500 to-orange-600", label: "کهربایی / نارنجی", bg: "bg-amber-500" },
  { value: "from-cyan-600 to-blue-600", label: "فیروزه‌ای / آبی", bg: "bg-cyan-600" },
  { value: "from-slate-700 to-slate-900", label: "نوک‌مدادی / زغالی", bg: "bg-slate-700" },
  { value: "from-red-500 to-rose-600", label: "قرمز / عقیقی", bg: "bg-red-500" }
];

export const ROUTE_OPTIONS = [
  { path: "/performance/strengths", label: "گام ۱: شایستگی‌ها و رادار مهارتی" },
  { path: "/performance", label: "گام ۲: ارزیابی عملکرد و کارنامه" },
  { path: "/training", label: "گام ۳: آموزش و توانمندسازی" },
  { path: "/benefits", label: "گام ۴: جبران خدمات و امور رفاهی" },
  { path: "/performance/career-path", label: "گام ۵: مسیر شغلی و ارتقا" },
  { path: "/salary", label: "گام ۶: حقوق و فیش الکترونیک" },
  { path: "/home", label: "پیشخوان خانه" },
  { path: "/attendance", label: "حضور، غیاب و شیفت‌ها" },
  { path: "/attendance/leave", label: "مرخصی و تقویم تردد" },
  { path: "/service-desk", label: "میز خدمت الکترونیک" },
  { path: "/health", label: "طب کار و پرونده سلامت" },
  { path: "/social", label: "مشارکت اجتماعی و سازمانی" },
  { path: "/support", label: "پشتیبانی و کمیسیون رسیدگی" },
  { path: "/profile", label: "پروفایل هویتی و پرسنلی" },
  { path: "/notifications", label: "مرکز اعلان‌ها و پیام‌ها" }
];

export const DEFAULT_MAIN_STEPS: StepInfo[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "شایستگی‌ها و ماتریس مهارتی",
    subtitle: "Competency Matrix & Skill Radar",
    iconName: "Award",
    color: "from-violet-600 to-purple-600",
    desc: "سنجش شایستگی‌های محوری، عمومی و تخصصی متناسب با شغل، رسم نمودار راداری و کشف نقاط قوت و فرصت‌های بهبود فردی جهت نیل به تعالی مهارتی.",
    details: [
      "شایستگی‌های محوری سازمانی، تخصصی رسته و عمومی",
      "ترسیم نمودار راداری تطبیق سطح فرد با استاندارد شغلی فراجا",
      "شناسایی دقیق نقاط قوت و فرصت‌های نیازمند بهبود"
    ],
    link: "/performance/strengths"
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "ارزیابی عملکرد و بهره‌وری",
    subtitle: "Performance & Productivity Evaluation",
    iconName: "TrendingUp",
    color: "from-blue-600 to-indigo-600",
    desc: "فرآیندی چند مرحله‌ای شامل: خوداظهاری شرح وظایف → ارزیابی مستقیم و تلفیق → کمیسیون رسیدگی به اعتراضات. در ادامه: شاخص‌های کلیدی عملکرد (KPI)، اهداف و نتایج کلیدی (OKR)، ارزیابی تیمی و ارزیابی ذینفعان.",
    details: [
      "مرحله ۱: خوداظهاری شرح وظایف و ثبت دستاوردهای فردی",
      "مرحله ۲: ارزیابی مستقیم و تلفیق شاخص‌های نتیجه‌محور و رفتاری",
      "مرحله ۳: کمیسیون رسیدگی به اعتراضات و نهایی‌سازی کارنامه",
      "شاخص‌های کلیدی عملکرد (KPI) و اهداف و نتایج کلیدی (OKR)",
      "ارزیابی عملکرد تیمی و سنجش رضایت شهروندان و ذینفعان"
    ],
    link: "/performance"
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "آموزش و توسعه شخصی کارکنان",
    subtitle: "Personalized Training & Development",
    iconName: "GraduationCap",
    color: "from-emerald-600 to-teal-600",
    desc: "شناسایی شکاف شایستگی شغلی و ارائه مدل یادگیری فردی مبتنی بر عملکرد، دوره‌های پیشنهادی هوشمند و مهارت‌افزایی متناسب با ماموریت‌های تخصصی.",
    details: [
      "کشف هوشمند شکاف‌های مهارتی متناسب با شغل و رسته",
      "مدل یادگیری فردی مبتنی بر عملکرد و اهداف رشد فرد",
      "دوره‌های تخصصی عملیاتی، تیراندازی، حقوقی و مهارتی",
      "آزمون‌های آنلاین سنجش اثربخشی آموزش و ارتقای نمره"
    ],
    link: "/training"
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "جبران خدمات و امور رفاهی",
    subtitle: "Welfare & Benefits",
    iconName: "Gift",
    color: "from-rose-500 to-pink-600",
    desc: "اتصال نمره عملکرد به پاداش و فرصت‌های رفاهی، سهمیه اماکن اقامتی و زیارتی، حکمت‌کارت و خدمات رفاهی کارکنان و خانواده محترم.",
    details: [
      "اتصال مستقیم نمره عملکرد به دریافت امتیازات رفاهی",
      "رزرو آنلاین مراکز اقامتی، سیاحتی و زیارتی فراجا",
      "تسهیلات کارت حکمت و تخفیف‌های فروشگاهی",
      "بسته‌های سلامت، ورزشی و رفاه خانواده کارکنان"
    ],
    link: "/benefits"
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "مسیر شغلی و جانشین‌پروری",
    subtitle: "Career Path & Succession Planning",
    iconName: "Compass",
    color: "from-indigo-600 to-violet-600",
    desc: "برنامه‌ریزی ارتقای رتبه و جایگاه، شناسایی استعدادهای فرماندهی و افسران شایسته، مدیریت جانشین‌پروری و ترسیم افق رشد فردی بر اساس شایستگی‌ها و کارنامه عملکردی.",
    details: [
      "ترسیم نقشه راه پیشرفت شغلی و ارتقای رتبه سازمانی",
      "شناسایی مخزن استعدادهای برتر جهت تصدی پست‌های مدیریتی و فرماندهی",
      "برنامه جانشین‌پروری مبتنی بر آمادگی مهارتی و تجارب خدمتی"
    ],
    link: "/performance/career-path"
  },
  {
    id: "step-6",
    stepNumber: 6,
    title: "حقوق و دستمزد",
    subtitle: "Payroll & Compensation",
    iconName: "CreditCard",
    color: "from-amber-500 to-orange-600",
    desc: "شفاف‌سازی اقلام فیش حقوقی، کسورات قانونی، ساعات اضافه‌کار، پاداش‌های انگیزشی و اتصال نمره عملکرد به پاداش.",
    details: [
      "مشاهده فیش حقوقی الکترونیک با تفکیک دقیق ردیف‌ها",
      "محاسبه عادلانه اضافه‌کار و سختی شرایط خدمت",
      "اتصال نمره ارزیابی عملکرد به پاداش‌ها و فوق‌العاده‌ها"
    ],
    link: "/salary"
  }
];

export const DEFAULT_OTHER_STEPS: StepInfo[] = [
  {
    id: "other-1",
    title: "راهنمای خانه و پیشخوان",
    subtitle: "Home & Personal Dashboard",
    iconName: "Home",
    color: "from-blue-500 to-indigo-600",
    desc: "نقطه ورود کاربر، نمای کلی وضعیت فردی، دسترسی سریع به تمام خدمات و خلاصه آماری عملکرد و امتیازات.",
    details: [
      "مشاهده کارت‌های آماری کلیدی و کارنامه فصلی",
      "رادار شخصی ۵ گانه انطباق با استاندارد شغلی",
      "اقدامات فوری، هشدارهای انقضا و دسترسی سریع به درگاه‌ها"
    ],
    link: "/home"
  },
  {
    id: "other-2",
    title: "حضور، غیاب و تردد",
    subtitle: "Attendance & Shifts",
    iconName: "Clock",
    color: "from-slate-600 to-slate-800",
    desc: "ثبت تردد هوشمند، ثبت و پیگیری درخواست مرخصی، مدیریت شیفت‌های پاسداری و عملیاتی و پایش ساعات خدمت.",
    details: [
      "ثبت ورود و خروج برخط و درخواست اصلاح تردد",
      "ثبت انواع مرخصی (استحقاقی، استعلاجی، تشویقی)",
      "تقویم شیفت‌ها و ساعات اضافه‌کار موظفی"
    ],
    link: "/attendance"
  },
  {
    id: "other-3",
    title: "میز خدمت الکترونیک (۵ مرحله‌ای)",
    subtitle: "E-Service Desk",
    iconName: "FileText",
    color: "from-cyan-600 to-blue-600",
    desc: "گردش کار ۵ مرحله‌ای درخواست‌ها: ثبت درخواست → رضایت‌سنجی → دبیرخانه → تایید مسئول → صدور گواهی دیجیتال.",
    details: [
      "ثبت درخواست‌های اداری، انتقالی، گواهی اشتغال و کسر اقساط",
      "ردیابی و رهگیری برخط با کد پیگیری یکتا",
      "صدور گواهی امضاشده الکترونیکی با کیوآرکد اصالت‌سنجی"
    ],
    link: "/service-desk"
  },
  {
    id: "other-4",
    title: "طب کار و پرونده سلامت",
    subtitle: "Occupational Health",
    iconName: "HeartPulse",
    color: "from-red-500 to-rose-600",
    desc: "پایش سلامت جسمی و روانی، پرونده سلامت شغلی، چک‌آپ‌های دوره‌ای و ارزیابی آمادگی جسمانی.",
    details: [
      "خوداظهاری سلامت ارگونومیک و پایش عوارض خدمتی",
      "تمرینات اصلاحی تعاملی و پیشگیری از خستگی ممتد",
      "ارجاع به بهداری و کمیسیون پزشکی ناجا"
    ],
    link: "/health"
  },
  {
    id: "other-5",
    title: "مشارکت اجتماعی و سازمانی",
    subtitle: "Social Initiatives",
    iconName: "Users",
    color: "from-teal-600 to-emerald-600",
    desc: "طرح‌های عام‌المنفعه، ساخت و تجهیز مساجد، همیاری داوطلبانه کارکنان و تقویت فرهنگ ایثار و تعاون.",
    details: [
      "همیاری در صندوق‌های قرض‌الحسنه و نیکوکاری یگانی",
      "طرح‌های عام‌المنفعه و جهادی انتظامی",
      "ثبت امتیاز مشارکت داوطلبانه در کارنامه رفتاری"
    ],
    link: "/social"
  },
  {
    id: "other-6",
    title: "پشتیبانی، راهنما و کمیسیون",
    subtitle: "Support & Appeal Committee",
    iconName: "Headphones",
    color: "from-indigo-500 to-blue-600",
    desc: "راهنمای چندرسانه‌ای، پایگاه دانش سوالات متداول و ثبت تیکت مستقیم در کمیسیون رسیدگی به اعتراضات.",
    details: [
      "پایگاه دانش جامع و مستندات آموزشی سامانه‌ها",
      "ثبت تیکت اعتراض به نمره کارنامه با بارگذاری مدارک",
      "ارتباط مستقیم با کارشناسان دبیرخانه ارزیابی عملکرد"
    ],
    link: "/support"
  },
  {
    id: "other-7",
    title: "ورود به صفحه پروفایل و پرونده جامع",
    subtitle: "Personnel Dossier",
    iconName: "User",
    color: "from-slate-700 to-slate-900",
    desc: "پرونده هویتی جامع، سوابق خدمتی، مدارک تحصیلی، تقدیرنامه‌ها و ثبت درخواست اصلاح اطلاعات.",
    details: [
      "مشاهده اطلاعات کارگزینی، رسته، مدرک و ترفیعات",
      "تاریخچه احکام خدمتی، تشویقات و تقدیرنامه‌ها",
      "درخواست رسمی اصلاح اطلاعات با بارگذاری اسناد مثبت"
    ],
    link: "/profile"
  },
  {
    id: "other-8",
    title: "مرکز پیام‌ها و اطلاع‌رسانی‌ها",
    subtitle: "System Notifications",
    iconName: "Bell",
    color: "from-amber-500 to-red-500",
    desc: "دسته‌بندی پیام‌های سیستمی، رفاهی، آموزشی، مدیریتی و عملیاتی با قابلیت اقدام فوری و پیگیری.",
    details: [
      "تفکیک پیام‌ها در دسته‌های ارزیابی، رفاهی، آموزشی و امنیتی",
      "دکمه‌های اقدام مستقیم و ارجاع سریع به فرآیند مربوطه",
      "آرشیو هوشمند و علامت‌گذاری پیام‌های خوانده‌شده"
    ],
    link: "/notifications"
  }
];

const STORAGE_KEY_MAIN = "faraja_custom_main_steps_v2";
const STORAGE_KEY_OTHER = "faraja_custom_other_steps_v2";

export function getStoredMainSteps(): StepInfo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MAIN);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading main steps from localStorage", err);
  }
  return DEFAULT_MAIN_STEPS;
}

export function getStoredOtherSteps(): StepInfo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_OTHER);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading other steps from localStorage", err);
  }
  return DEFAULT_OTHER_STEPS;
}

export function saveStoredMainSteps(steps: StepInfo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_MAIN, JSON.stringify(steps));
  } catch (err) {
    console.error("Error saving main steps to localStorage", err);
  }
}

export function saveStoredOtherSteps(steps: StepInfo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_OTHER, JSON.stringify(steps));
  } catch (err) {
    console.error("Error saving other steps to localStorage", err);
  }
}

export function resetAllStepsToDefault(): { main: StepInfo[]; other: StepInfo[] } {
  try {
    localStorage.removeItem(STORAGE_KEY_MAIN);
    localStorage.removeItem(STORAGE_KEY_OTHER);
  } catch (err) {
    console.error("Error resetting steps in localStorage", err);
  }
  return {
    main: DEFAULT_MAIN_STEPS,
    other: DEFAULT_OTHER_STEPS
  };
}

export function getIconComponent(iconName: string): LucideIcon {
  const match = ICON_OPTIONS.find(item => item.name === iconName);
  return match ? match.icon : Award;
}
