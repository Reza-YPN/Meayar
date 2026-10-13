import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  FileText,
  GraduationCap,
  BarChart2,
  Gift,
  Clock,
  HeartPulse,
  Laptop,
  Users,
  Compass,
  Award,
  Building2,
  Bell,
  Settings,
  HelpCircle,
  Banknote,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Home
} from "lucide-react";
import { useRole, Role } from "../context/RoleContext";

interface SearchItem {
  id: string;
  title: string;
  category: "صفحات و ماژول‌ها" | "خدمات و درخواست‌ها" | "آموزش و مهارت" | "ارزیابی و عملکرد" | "ابزارها و فرماندهی";
  description: string;
  path: string;
  icon: any;
  roles: Role[];
  keywords: string[];
  badge?: string;
  badgeColor?: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Core Pages
  {
    id: "page-home",
    title: "پیشخوان اصلی (خانه)",
    category: "صفحات و ماژول‌ها",
    description: "صفحه اصلی سامانه هوشمند سرمایه انسانی فراجا و آمار کلی",
    path: "/home",
    icon: Home,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["خانه", "داشبورد", "پیشخوان", "صفحه اصلی", "امار", "وضعیت", "home"],
  },
  {
    id: "page-perf-report",
    title: "کارنامه و نمرات ارزیابی عملکرد",
    category: "ارزیابی و عملکرد",
    description: "مشاهده کارنامه عملکرد فصلی، شاخص‌های KPI و نتایج خوداظهاری و ارزیابی مستقیم",
    path: "/performance",
    icon: BarChart2,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["کارنامه", "عملکرد", "نمره", "ارزیابی", "kpi", "شاخص", "بهره وری", "ارزیاب"],
    badge: "اصلی",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "page-perf-improvements",
    title: "نقاط نیازمند بهبود و خوداظهاری",
    category: "ارزیابی و عملکرد",
    description: "ثبت خوداظهاری شاخص‌ها و مشاهده نقاط نیازمند ارتقا در ارزیابی",
    path: "/performance/improvements",
    icon: ShieldAlert,
    roles: ["employee"],
    keywords: ["نقاط بهبود", "بهبود", "ضعف", "خوداظهاری", "کمیسیون", "اعتراض", "شاخص ها"],
    badge: "عملکردی",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "page-perf-strengths",
    title: "ماتریس شایستگی‌ها و نقاط قوت",
    category: "ارزیابی و عملکرد",
    description: "نمودار راداری شایستگی‌های عمومی و تخصصی و تحلیل نقاط قوت فردی",
    path: "/performance/strengths",
    icon: Award,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["شایستگی", "نقاط قوت", "رادار", "مهارت", "استعداد", "شایستگی محوری"],
  },
  {
    id: "page-perf-career",
    title: "مسیر شغلی و افق رشد فردی",
    category: "ارزیابی و عملکرد",
    description: "برنامه‌ریزی ارتقای رتبه، ترفیعات و پیش‌نیازهای ارشدیت شغلی",
    path: "/performance/career-path",
    icon: Compass,
    roles: ["employee", "manager"],
    keywords: ["مسیر شغلی", "ارتقا", "ترفیع", "رتبه", "درجه", "مسیر رشد", "ارشدیت"],
  },
  {
    id: "page-perf-succession",
    title: "شایستگی و جانشین‌پروری یگانی",
    category: "ابزارها و فرماندهی",
    description: "سامانه ارزیابی استعدادهای مدیریتی و جانشین‌پروری فرماندهی",
    path: "/performance/succession",
    icon: Building2,
    roles: ["manager"],
    keywords: ["جانشین پروری", "فرماندهی", "استعداد", "انتصاب", "مدیریتی"],
    badge: "فرماندهی",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "page-training",
    title: "آموزش و توسعه فردی کارکنان",
    category: "آموزش و مهارت",
    description: "دوره‌های آموزشی، یادگیری مبتنی بر عملکرد و رفع شکاف شایستگی",
    path: "/training",
    icon: GraduationCap,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["آموزش", "دوره", "کلاس", "ویدئو", "پادکست", "توسعه", "مهارت", "آزمون", "اموزش"],
    badge: "پیشنهاد هوشمند",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "page-salary",
    title: "حقوق، دستمزد و فیش مالی",
    category: "صفحات و ماژول‌ها",
    description: "مشاهده اقلام حقوق و مزایا، کسورات، اضافه‌کار و پاداش عملکردی",
    path: "/salary",
    icon: Banknote,
    roles: ["employee", "manager"],
    keywords: ["حقوق", "دستمزد", "فیش حقوقی", "کسورات", "اضافه کار", "پاداش", "مالی", "حکمت"],
  },
  {
    id: "page-benefits",
    title: "جبران خدمات و امور رفاهی",
    category: "صفحات و ماژول‌ها",
    description: "فرصت‌های رفاهی، سهمیه اقامتی، حکمت‌کارت و تخفیفات سازمانی",
    path: "/benefits",
    icon: Gift,
    roles: ["employee", "manager"],
    keywords: ["رفاهی", "اماکن اقامتی", "هتل", "سفر", "حکمت کارت", "بن خرید", "پاداش", "جبران خدمات"],
  },
  {
    id: "page-benefits-earn",
    title: "کسب امتیازات و پاداش رفاهی",
    category: "صفحات و ماژول‌ها",
    description: "ماموریت‌های امتیازی و تبدیل دستاوردهای کاری به امتیاز رفاهی",
    path: "/benefits/earn",
    icon: Award,
    roles: ["employee"],
    keywords: ["کسب امتیاز", "امتیاز رفاهی", "تبدیل امتیاز", "ماموریت"],
  },
  {
    id: "page-benefits-history",
    title: "تاریخچه و تراکنش‌های امتیاز رفاهی",
    category: "صفحات و ماژول‌ها",
    description: "سوابق دریافت و مصرف امتیازات رفاهی و تسهیلات",
    path: "/benefits/history",
    icon: Gift,
    roles: ["employee", "manager"],
    keywords: ["تاریخچه رفاهی", "تراکنش", "سوابق امتیاز", "سهمیه مصرف شده"],
  },
  {
    id: "page-attendance",
    title: "حضور و غیاب الکترونیک و تردد",
    category: "صفحات و ماژول‌ها",
    description: "مشاهده کارکرد ماهانه، ساعات تردد، تاخیر، تعجیل و کسر کار",
    path: "/attendance",
    icon: Clock,
    roles: ["employee", "manager"],
    keywords: ["حضور و غیاب", "تردد", "ساعت ورود", "خروج", "تاخیر", "اضافه کار", "کارکرد"],
  },
  {
    id: "page-attendance-leave",
    title: "سوابق و ثبت درخواست مرخصی",
    category: "خدمات و درخواست‌ها",
    description: "تاریخچه جامع مرخصی‌ها به تفکیک سال و ماه، مانده مرخصی و ثبت درخواست",
    path: "/attendance/leave",
    icon: Clock,
    roles: ["employee"],
    keywords: ["مرخصی", "درخواست مرخصی", "استحقاقی", "استعلاجی", "تشویقی", "ذخیره مرخصی", "سوابق مرخصی"],
    badge: "پرتکرار",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "page-service-desk",
    title: "میز خدمت الکترونیک فراجا",
    category: "خدمات و درخواست‌ها",
    description: "کاتالوگ جامع خدمات سازمانی، اداری، پزشکی و کارکنان فراجا",
    path: "/service-desk",
    icon: Laptop,
    roles: ["employee", "manager"],
    keywords: ["میز خدمت", "خدمات", "درخواست سازمانی", "نامه", "گواهی", "اداری"],
  },
  {
    id: "page-service-requests",
    title: "پیگیری درخواست‌های اداری من",
    category: "خدمات و درخواست‌ها",
    description: "مشاهده وضعیت بررسی و گردش‌کار نامه‌ها و درخواست‌های ثبت‌شده",
    path: "/service-desk/requests",
    icon: FileText,
    roles: ["employee", "manager"],
    keywords: ["پیگیری درخواست", "درخواست های من", "وضعیت نامه", "گردش کار"],
  },
  {
    id: "page-health",
    title: "پرونده سلامت و طب کار",
    category: "صفحات و ماژول‌ها",
    description: "نتایج چک‌آپ دوره‌ای، غربالگری سلامت روان و توصیه‌های تخصصی",
    path: "/health",
    icon: HeartPulse,
    roles: ["employee", "manager"],
    keywords: ["طب کار", "سلامت", "پزشکی", "چک آپ", "پرونده سلامت", "توصیه های پزشکی", "روانشناسی"],
  },
  {
    id: "page-health-requests",
    title: "درخواست‌های پزشکی و نوبت‌دهی",
    category: "خدمات و درخواست‌ها",
    description: "رزرو نوبت درمانگاه، درخواست کمیسیون پزشکی و معاینات دوره‌ای",
    path: "/health/requests",
    icon: HeartPulse,
    roles: ["employee"],
    keywords: ["نوبت درمانگاه", "کمیسیون پزشکی", "معاینه", "پزشکی", "درمانگاه"],
  },
  {
    id: "page-social",
    title: "مشارکت اجتماعی و نظام پیشنهادات",
    category: "صفحات و ماژول‌ها",
    description: "ثبت ایده‌ها، نظرسنجی‌ها و مشارکت در طرح‌های تحول فراجا",
    path: "/social",
    icon: Users,
    roles: ["employee"],
    keywords: ["مشارکت اجتماعی", "پیشنهادات", "ایده", "نظرسنجی", "طرح تحول"],
  },
  {
    id: "page-culture",
    title: "فرهنگ سازمانی و ارزش‌های فراجا",
    category: "صفحات و ماژول‌ها",
    description: "مدل شاین، ارزش‌های محوری، جهاد خدمت و منشور اخلاقی پلیس",
    path: "/culture",
    icon: Compass,
    roles: ["employee", "manager"],
    keywords: ["فرهنگ سازمانی", "ارزش ها", "شاین", "اخلاق حرفه ای", "منشور"],
  },
  {
    id: "page-notifications",
    title: "مرکز پیام‌ها و اعلان‌های هوشمند",
    category: "صفحات و ماژول‌ها",
    description: "صندوق اعلان‌های سیستمی، اطلاعیه‌ها، بخشنامه‌ها و هشدارهای یگانی",
    path: "/notifications",
    icon: Bell,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["پیام ها", "اعلان ها", "اطلاعیه", "بخشنامه", "نوتیفیکیشن", "هشدار"],
  },
  {
    id: "page-support",
    title: "پشتیبانی، رفع مغایرت و بازخورد",
    category: "خدمات و درخواست‌ها",
    description: "ارتباط با دبیرخانه پشتیبانی، رفع مغایرت نمرات و ثبت تیکت",
    path: "/support",
    icon: HelpCircle,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["پشتیبانی", "تیکت", "مغایرت", "شکایت", "راهنما", "پاسخگویی"],
  },
  {
    id: "page-profile",
    title: "پروفایل کارکنان و اطلاعات فردی",
    category: "صفحات و ماژول‌ها",
    description: "مشاهده مشخصات کارگزینی، رسته، یگان خدمتی و سوابق فردی",
    path: "/profile",
    icon: Award,
    roles: ["employee", "evaluator", "manager"],
    keywords: ["پروفایل", "کارگزینی", "اطلاعات فردی", "مشخصات", "کد کارکنان", "کد پرسنلی", "رسته"],
  },

  // Specific Direct Services (Services in Service Desk / Direct Submissions)
  {
    id: "srv-salary-deduction",
    title: "صدور گواهی کسر از حقوق",
    category: "خدمات و درخواست‌ها",
    description: "درخواست آنلاین گواهی کسر از حقوق جهت ضمانت بانکی و وام",
    path: "/service-desk/salary-deduction",
    icon: Banknote,
    roles: ["employee", "manager"],
    keywords: ["گواهی کسر از حقوق", "ضمانت", "وام بانکی", "تسهیلات", "بانک"],
    badge: "آنلاین",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "srv-org-house",
    title: "درخواست خانه سازمانی و اسکان",
    category: "خدمات و درخواست‌ها",
    description: "ثبت درخواست تخصیص منازل سازمانی، امتیازدهی و اولویت‌بندی",
    path: "/service-desk/organizational-house",
    icon: Home,
    roles: ["employee", "manager"],
    keywords: ["خانه سازمانی", "مسکن", "منزل سازمانی", "اسکان", "اجاره"],
    badge: "آنلاین",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },

  // Manager specific tools
  {
    id: "mgr-command-center",
    title: "مرکز فرماندهی و تصمیمیار هوشمند",
    category: "ابزارها و فرماندهی",
    description: "داشبورد ارشد فرماندهی، نظارت بلادرنگ یگان و تحلیل ریسک",
    path: "/manager/command-center",
    icon: Building2,
    roles: ["manager"],
    keywords: ["فرماندهی", "تصمیمیار", "داشبورد مدیر", "مانیتورینگ", "مرکز فرماندهی"],
    badge: "ویژه فرماندهان",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    id: "mgr-perf-compare",
    title: "مقایسه و کارنامه عملکردی نیروها",
    category: "ابزارها و فرماندهی",
    description: "رتبه‌بندی عملکردی کارکنان یگان، توزیع نمرات و مقایسه شاخص‌ها",
    path: "/manager/performance",
    icon: BarChart2,
    roles: ["manager", "evaluator"],
    keywords: ["عملکرد نیروها", "مقایسه کارکنان", "رتبه بندی", "کارنامه نیروها", "مدیریت عملکرد"],
  },
  {
    id: "mgr-perf-good",
    title: "کارکنان با عملکرد برتر و تشویقی",
    category: "ابزارها و فرماندهی",
    description: "فهرست نفرات برتر یگان جهت اعطای تشویقی و پاداش‌های ویژه",
    path: "/manager/performance/good",
    icon: Award,
    roles: ["manager", "evaluator"],
    keywords: ["عملکرد برتر", "تشویق", "نیروهای خوب", "نفرات برتر", "پاداش"],
  },
  {
    id: "mgr-perf-needs-imp",
    title: "کارکنان نیازمند توانمندسازی و آموزش",
    category: "ابزارها و فرماندهی",
    description: "شناسایی نیروهای دارای افت عملکرد و برنامه‌ریزی مداخله آموزشی",
    path: "/manager/performance/needs-improvement",
    icon: ShieldAlert,
    roles: ["manager", "evaluator"],
    keywords: ["نیازمند آموزش", "افت عملکرد", "ضعیف", "مداخله", "توانمندسازی"],
  },
  {
    id: "mgr-matrix",
    title: "ماتریس شایستگی‌های سازمانی یگان",
    category: "ابزارها و فرماندهی",
    description: "نقشه جامع مهارت‌های یگانی و شناسایی شکاف‌های تخصصی",
    path: "/manager/matrix",
    icon: Building2,
    roles: ["manager"],
    keywords: ["ماتریس شایستگی", "نقشه مهارت", "شایستگی یگان"],
  },
  {
    id: "mgr-requests",
    title: "کارتابل تایید درخواست‌های کارکنان",
    category: "ابزارها و فرماندهی",
    description: "بررسی و تایید درخواست‌های مرخصی، وام، گواهی‌ها و ارجاعات سازمانی",
    path: "/manager/requests",
    icon: FileText,
    roles: ["manager", "evaluator"],
    keywords: ["کارتابل مدیر", "تایید مرخصی", "تایید درخواست", "کارتابل فرمانده"],
  },
  {
    id: "mgr-training",
    title: "مدیریت آموزش و ارجاع دوره‌ها به کارکنان",
    category: "ابزارها و فرماندهی",
    description: "برنامه‌ریزی دوره‌های سازمانی و ارجاع دوره‌های رفع نقص به نیروها",
    path: "/manager/training",
    icon: GraduationCap,
    roles: ["manager"],
    keywords: ["مدیریت آموزش", "ارجاع دوره", "برنامه آموزشی یگان"],
  },
];

export function HeaderQuickSearch() {
  const { role } = useRole();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("همه");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items based on user role
  const roleAllowedItems = SEARCH_DATABASE.filter((item) => item.roles.includes(role));

  // Filter by query and category
  const filteredItems = roleAllowedItems.filter((item) => {
    const matchesCategory = activeCategoryFilter === "همه" || item.category === activeCategoryFilter;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.trim().toLowerCase();
    const matchesTitle = item.title.toLowerCase().includes(q);
    const matchesDesc = item.description.toLowerCase().includes(q);
    const matchesKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesTitle || matchesDesc || matchesKeywords;
  });

  // Handle keyboard shortcut (Ctrl+K or Cmd+K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setActiveCategoryFilter("همه");
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    navigate(item.path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const categories = ["همه", "صفحات و ماژول‌ها", "خدمات و درخواست‌ها", "آموزش و مهارت", "ارزیابی و عملکرد", "ابزارها و فرماندهی"];

  return (
    <div className="relative" ref={containerRef} dir="rtl">
      {/* Search Input Trigger in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 transition-all shadow-xs group w-44 sm:w-60 md:w-72 justify-between"
        title="جستجوی سریع بین صفحات و خدمات (Ctrl + K)"
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
          <span className="truncate font-medium text-[11px] sm:text-xs">جستجوی صفحات و خدمات...</span>
        </div>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold bg-white text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
          <span className="text-[9px]">Ctrl</span> K
        </kbd>
      </button>

      {/* Search Modal / Command Palette */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Input Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <Search className="w-5 h-5 text-indigo-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="جستجوی صفحات، خدمات رفاهی، دوره‌های آموزشی، مرخصی، فیش حقوقی..."
                className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition"
                  title="پاک کردن"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition text-xs font-bold shrink-0"
              >
                بستن (Esc)
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    setSelectedIndex(0);
                  }}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                    activeCategoryFilter === cat
                      ? "bg-[#4455A5] text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 divide-y divide-slate-50 flex-1">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-slate-700">موردی متناسب با جستجوی شما یافت نشد.</p>
                  <p className="text-[11px] text-slate-400">
                    عبارت دیگری را جستجو کنید؛ برای مثال: «مرخصی»، «فیش حقوق»، «کارنامه»، «آموزش» یا «گواهی کسر از حقوق»
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const ItemIcon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-indigo-50/80 border border-indigo-200 text-indigo-950 shadow-xs"
                            : "hover:bg-slate-50 border border-transparent text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <ItemIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-slate-900 truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span
                                  className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                                    item.badgeColor || "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 shrink-0">
                          {isSelected && (
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/60 px-2 py-0.5 rounded hidden sm:inline">
                              ورود (Enter)
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer with quick shortcuts */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[9px]">↑↓</kbd> پیمایش
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[9px]">Enter</kbd> انتخاب
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[9px]">Esc</kbd> بستن
                </span>
              </div>
              <div className="text-[10px] text-indigo-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>{filteredItems.length} سرویس و صفحه در دسترس نقش شما</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
