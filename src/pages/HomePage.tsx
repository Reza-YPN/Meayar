import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Star, 
  Shield, 
  Target, 
  TrendingUp, 
  Gift, 
  FileText, 
  Users, 
  HeartPulse, 
  Compass, 
  Bell, 
  ChevronRight, 
  Sparkles, 
  ExternalLink, 
  GraduationCap, 
  CreditCard, 
  Clock, 
  Headphones, 
  User, 
  X, 
  CheckCircle2, 
  Award,
  ArrowUpRight,
  Home,
  Check,
  Calendar,
  AlertCircle,
  Edit3,
  ArrowLeftRight,
  UserPlus,
  Map,
  BookOpen,
  Search,
  Eye,
  Sliders,
  Pin,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  HelpCircle,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { useRole } from "../context/RoleContext";
import { StepsGuideModal } from "../components/StepsGuideModal";
import { FarajaStoryBar } from "../components/FarajaStoryBar";

export type ServiceCategory = "all" | "competency" | "personnel" | "service" | "specialized";

export interface QuickAccessItem {
  id: number;
  title: string;
  category: "competency" | "personnel" | "service" | "specialized";
  categoryLabel: string;
  icon: any;
  badgeValue?: string;
  badgeColor?: string;
  description: string;
  links: { label: string; to: string }[];
}

// Clean Categorized Services for Faraja
const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  // 1. Competency & Performance
  {
    id: 1,
    title: "شایستگی‌ها و ماتریس مهارتی",
    category: "competency",
    categoryLabel: "شایستگی و عملکرد",
    icon: Award,
    badgeValue: "۹۱٪ رتبه برتر",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description: "شناسنامه ۵ سطحی شایستگی، رادار مهارتی و تحلیل کارکردی",
    links: [
      { label: "ماتریس شایستگی‌ها و رادار مهارتی", to: "/performance/strengths" },
      { label: "تحلیل نقاط قوت و فرصت‌های بهبود", to: "/performance/strengths" },
    ],
  },
  {
    id: 2,
    title: "ارزیابی عملکرد و بهره‌وری",
    category: "competency",
    categoryLabel: "شایستگی و عملکرد",
    badgeValue: "نمره ۸۸.۴",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: TrendingUp,
    description: "کارنامه فصلی، خوداظهاری وظایف و اهداف نتیجه‌محور",
    links: [
      { label: "کارنامه عملکردی فصلی", to: "/performance" },
      { label: "ثبت خوداظهاری کارنامه عملکرد", to: "/performance/improvements" },
      { label: "اهداف و شاخص‌های نتیجه‌محور", to: "/performance" },
    ],
  },
  {
    id: 3,
    title: "آموزش و توسعه شخصی کارکنان",
    category: "competency",
    categoryLabel: "شایستگی و عملکرد",
    badgeValue: "۲۸ ساعت",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    icon: GraduationCap,
    description: "دوره‌های هوشمند ضمن خدمت و آزمون‌های مهارت‌افزایی",
    links: [
      { label: "دوره‌های آموزشی پیشنهادی من", to: "/training" },
      { label: "شرکت در آزمون‌های مهارت‌افزایی", to: "/training" },
      { label: "سوابق و گواهینامه‌های دوره‌ها", to: "/training" },
    ],
  },
  {
    id: 5,
    title: "مسیر شغلی و جانشین‌پروری",
    category: "competency",
    categoryLabel: "شایستگی و عملکرد",
    icon: Compass,
    description: "افق ارتقای فردی، ترفیعات و احراز جایگاه‌های مدیریتی",
    links: [
      { label: "مسیر شغلی و افق ارتقای فردی", to: "/performance/career-path" },
      { label: "شناسایی استعدادها و رتبه‌های خدمتی", to: "/performance/career-path" },
    ],
  },

  // 2. Personnel & Welfare
  {
    id: 6,
    title: "حقوق و مزایای سازمانی",
    category: "personnel",
    categoryLabel: "امور پرسنلی و رفاه",
    icon: CreditCard,
    badgeValue: "فیش صادر شد",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "فیش حقوقی الکترونیک، اضافه‌کار و پاداش عملکرد",
    links: [
      { label: "مشاهده فیش حقوقی الکترونیک", to: "/salary" },
      { label: "جزئیات اضافه‌کار و پاداش عملکرد", to: "/salary" },
      { label: "گواهی کسر از حقوق و امور مالی", to: "/service-desk/salary-deduction" },
    ],
  },
  {
    id: 4,
    title: "جبران خدمات و امور رفاهی",
    category: "personnel",
    categoryLabel: "امور پرسنلی و رفاه",
    badgeValue: "۱,۴۵۰ امتیاز",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Gift,
    description: "رزرو اقامتگاه‌های فراجا، شارژ حکمت‌کارت و امتیازات رفاهی",
    links: [
      { label: "فرصت‌های رفاهی و رزرو اقامتگاه", to: "/benefits" },
      { label: "کسب امتیازات رفاهی عملکردی", to: "/benefits/earn" },
      { label: "کارت حکمت و تاریخچه امتیازات", to: "/benefits/history" },
    ],
  },
  {
    id: 7,
    title: "حضور، غیاب و سلامت کارکنان",
    category: "personnel",
    categoryLabel: "امور پرسنلی و رفاه",
    badgeValue: "۱۴ روز مانده",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: HeartPulse,
    description: "ثبت مرخصی الکترونیک، پرونده طب کار و بهداری",
    links: [
      { label: "ثبت و پیگیری درخواست مرخصی", to: "/attendance/leave" },
      { label: "پرونده الکترونیک سلامت و طب کار", to: "/health" },
      { label: "درخواست چک‌آپ پزشکی دوره‌ای", to: "/health/requests" },
    ],
  },

  // 3. Service Desk & Administration
  {
    id: 8,
    title: "میز خدمت و امور اداری",
    category: "service",
    categoryLabel: "میز خدمت و اداری",
    icon: FileText,
    description: "درخواست‌های اداری دیجیتال، مسکن سازمانی و نامه‌نگاری",
    links: [
      { label: "ثبت درخواست اداری جدید", to: "/service-desk" },
      { label: "پیگیری وضعیت نامه‌ها و مدارک", to: "/service-desk" },
      { label: "درخواست مسکن و خانه سازمانی", to: "/service-desk/organizational-house" },
    ],
  },
  {
    id: 9,
    title: "فرهنگ سازمانی و ارزش‌های فراجا",
    category: "service",
    categoryLabel: "میز خدمت و اداری",
    icon: Users,
    description: "مدل سه‌سطحی شاین، واکاوی فرهنگی و مشارکت اجتماعی",
    links: [
      { label: "آشنایی با مدل فرهنگ سازمانی", to: "/culture" },
      { label: "مشارکت اجتماعی و رویدادها", to: "/social" },
    ],
  },

  // 4. Specialized Systems
  {
    id: 10,
    title: "انتقالات هوشمند فراجا (DSS)",
    category: "specialized",
    categoryLabel: "سامانه‌های تخصصی",
    icon: ArrowLeftRight,
    badgeValue: "سامانه ملی",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description: "سامانه تحول نظام انتقالات، ارزیابی ریسک EWS و تصمیم‌یار DSS",
    links: [
      { label: "ثبت و پیگیری درخواست انتقال پرسنلی", to: "/transfers" },
      { label: "سامانه هوشمند تصمیم‌یار و مدل پنج‌گانه", to: "/transfers" },
      { label: "استعلام ظرفیت منازل سازمانی استان‌ها", to: "/transfers" },
    ],
  },
  {
    id: 11,
    title: "جذب و گزینش فراجا",
    category: "specialized",
    categoryLabel: "سامانه‌های تخصصی",
    icon: UserPlus,
    badgeValue: "مدیریتی",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    description: "کارتابل داوطلبان، مراحل گزینش، معاینات و کمیسیون نهایی",
    links: [
      { label: "کارتابل پرونده‌های داوطلبان و استعلامات", to: "/recruitment" },
      { label: "داشبورد قیف گزینش و تحلیل‌های آماری", to: "/recruitment" },
      { label: "جلسه کمیسیون نهایی و صدور امریه اعزام", to: "/recruitment" },
    ],
  },
  {
    id: 12,
    title: "تحلیل جغرافیایی فراجا (GIS)",
    category: "specialized",
    categoryLabel: "سامانه‌های تخصصی",
    icon: Map,
    badgeValue: "بند ۳-۷",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description: "نقشه تعاملی ۳۱ استان کشور و پایش توزیع سرمایه انسانی",
    links: [
      { label: "نقشه تعاملی توزیع سرمایه انسانی", to: "/geographic-analysis" },
      { label: "داشبورد اختصاصی ۳۱ استان کشور", to: "/geographic-analysis" },
      { label: "تحلیل منطقه‌ای و مقایسه تطبیقی", to: "/geographic-analysis" },
    ],
  },
];

const SERVICE_PILLARS = [
  { id: "all", label: "همه خدمات", count: 12, icon: Sparkles },
  { id: "competency", label: "شایستگی و عملکرد", count: 4, icon: Award },
  { id: "personnel", label: "امور پرسنلی و رفاه", count: 3, icon: CreditCard },
  { id: "service", label: "میز خدمت و اداری", count: 2, icon: FileText },
  { id: "specialized", label: "سامانه‌های تخصصی و آمایش", count: 3, icon: Map },
] as const;

// Personal Radar Competency Data for the Employee (5 Dimensions)
const PERSONAL_RADAR_DATA = [
  { id: 1, subject: "موتورسواری و مانور سریع", icon: "🏍️", current: 92, target: 85, fullMark: 100 },
  { id: 2, subject: "مهار صحنه و مدیریت بحران", icon: "🚨", current: 84, target: 90, fullMark: 100 },
  { id: 3, subject: "تکریم و همراهی امدادخواه", icon: "💬", current: 96, target: 80, fullMark: 100 },
  { id: 4, subject: "سلاح و تجهیزات انتظامی", icon: "🎯", current: 89, target: 85, fullMark: 100 },
  { id: 5, subject: "گزارش‌نویسی و رخداد ۱۱۰", icon: "📋", current: 91, target: 85, fullMark: 100 },
];

const HomeRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const current = data.current ?? 0;
    const target = data.target ?? 0;
    const gap = current - target;

    return (
      <div className="bg-slate-900/95 border border-slate-700 text-white p-3 rounded-xl shadow-2xl backdrop-blur-md text-right text-xs space-y-1.5 min-w-[190px] z-50">
        <div className="flex items-center gap-2 border-b border-slate-700/80 pb-1.5">
          <span className="text-sm">{data.icon}</span>
          <span className="font-black text-white text-xs">{data.subject}</span>
        </div>
        <div className="space-y-1 pt-0.5 text-[11px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">سطح فردی شما:</span>
            <span className="font-black text-indigo-300 font-mono">{current} از ۱۰۰</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">استاندارد مصوب شغل:</span>
            <span className="font-black text-emerald-300 font-mono">{target} از ۱۰۰</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-slate-800">
            <span className="text-slate-400">وضعیت:</span>
            <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
              gap >= 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
            }`}>
              {gap >= 0 ? `+${gap} مطلوب` : `${gap} نیاز به تقویت`}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  },
} as const;

export function HomePage() {
  const { role } = useRole();

  // Mode: 'focus' (clean, minimalist, fast) vs 'full' (all analytical widgets open)
  const [uiMode, setUiMode] = useState<"focus" | "full">(() => {
    return (localStorage.getItem("faraja_home_ui_mode") as "focus" | "full") || "focus";
  });

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [pinnedItemIds, setPinnedItemIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("faraja_pinned_services");
      return saved ? JSON.parse(saved) : [2, 6, 7, 10]; // Default pinned services
    } catch {
      return [2, 6, 7, 10];
    }
  });

  const handleToggleMode = (mode: "focus" | "full") => {
    setUiMode(mode);
    localStorage.setItem("faraja_home_ui_mode", mode);
  };

  const togglePin = (id: number) => {
    setPinnedItemIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("faraja_pinned_services", JSON.stringify(updated));
      return updated;
    });
  };

  const triggerGlobalSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      })
    );
  };

  // Filtered Services
  const filteredServices = useMemo(() => {
    return QUICK_ACCESS_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.links.some((l) => l.label.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  // Pinned Services
  const pinnedServices = useMemo(() => {
    return QUICK_ACCESS_ITEMS.filter((item) => pinnedItemIds.includes(item.id));
  }, [pinnedItemIds]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 text-right"
      dir="rtl"
    >
      {/* Interactive Tour Guide Modal */}
      <StepsGuideModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      {/* TOP CONTROLLER BAR: Focus Mode Switcher & Global Search Hint */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-black text-slate-700 flex items-center gap-1.5 shrink-0">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>نمای پیشخوان:</span>
          </span>

          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 w-full sm:w-auto">
            <button
              onClick={() => handleToggleMode("focus")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial ${
                uiMode === "focus"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
              }`}
              title="نمای خلوت، سریع و دسته‌بندی‌شده"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>حالت متمرکز (Focus Mode)</span>
            </button>

            <button
              onClick={() => handleToggleMode("full")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial ${
                uiMode === "full"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
              }`}
              title="نمایش همزمان تمام ویجت‌ها و آمارها"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>نمای کامل و تحلیلی</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={triggerGlobalSearch}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition shadow-2xs group"
            title="کلید میانبر جستجوی سریع (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
            <span className="hidden md:inline">جستجوی مستقیم هر خدمت یا فرم</span>
            <kbd className="bg-white border border-slate-300 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono shadow-2xs">
              Ctrl + K
            </kbd>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-system-walkthrough"))}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition"
            title="شناسنامه و چاپ سند PDF کل سامانه"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">سند جامع ۲۴ صفحه (PDF)</span>
          </button>
        </div>
      </div>

      {/* DIGNIFIED COMPACT HERO BANNER */}
      <motion.div 
        variants={itemVariants} 
        className="bg-gradient-to-l from-[#151f2e] via-[#1E293B] to-[#151f2e] rounded-3xl shadow-md border border-slate-700/60 p-5 sm:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Identity & Personnel Status */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-400 via-emerald-400 to-indigo-500 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80"
                  alt="کاربر"
                  className="w-full h-full rounded-[14px] border border-[#1E293B] object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -left-1 bg-amber-400 text-slate-950 rounded-full p-1 border-2 border-[#1E293B] shadow-xs">
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-white">
                  محمدرضا یزدان پناه
                </h2>
                <span className="bg-slate-800 text-slate-300 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-slate-700 font-mono">
                  کد پرسنلی: ۱۲۴۵۶۷
                </span>
                {role === "manager" && (
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-400" /> فرمانده یگان
                  </span>
                )}
                {role === "evaluator" && (
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Shield className="w-3 h-3 text-amber-400" /> ارزیاب ارشد
                  </span>
                )}
              </div>

              <p className="text-slate-300 text-xs mt-1.5 font-medium flex items-center gap-1.5 flex-wrap">
                <span>کلانتری ۱۰۳ گاندی</span>
                <span className="text-slate-600">•</span>
                <span>رسته انتظامی و عملیات</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-bold">شیفت آماده‌باش فعال</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar on Hero */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-start lg:justify-end flex-wrap">
            {/* Score */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">نمره کارنامه عملکرد:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-mono">۸۸.۴</span>
                  <span className="text-[10px] text-slate-400">/ ۱۰۰</span>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-1 rounded-lg border border-emerald-500/30">
                سطح بسیار خوب
              </span>
            </div>

            {/* Direct Quick Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/performance/improvements"
                className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-xs transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>ثبت خوداظهاری</span>
              </Link>

              <button
                onClick={() => setIsTourModalOpen(true)}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>راهنمای گام‌ها</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FARAJA STORIES & HONORS (COLLAPSIBLE TO AVOID OVERCROWDING) */}
      <motion.div variants={itemVariants}>
        <FarajaStoryBar defaultCollapsed={uiMode === "focus"} />
      </motion.div>

      {/* QUICK WORKSPACE (میز کار من - ۵ عملیات پرکاربرد کارکنان) */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h3 className="text-sm font-black text-slate-900">میز کار من (دسترسی فوری به وظایف جاری)</h3>
          </div>
          <span className="text-xs text-slate-500">عملیات پرتکرار کارکنان بدون نیاز به جستجو در منوها</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Quick 1: Self assessment */}
          <Link
            to="/performance/improvements"
            className="p-3.5 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Edit3 className="w-4 h-4" />
              </div>
              <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-bold">مهلت فعال</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700">ثبت خوداظهاری</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">کارنامه فصلی بهار ۱۴۰۵</p>
            </div>
          </Link>

          {/* Quick 2: Salary Paystub */}
          <Link
            to="/salary"
            className="p-3.5 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">جدید</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700">فیش حقوقی</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">ماه جاری با پاداش عملکرد</p>
            </div>
          </Link>

          {/* Quick 3: Leave Request */}
          <Link
            to="/attendance/leave"
            className="p-3.5 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-bold">۱۴ روز</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700">ثبت مرخصی</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">استحقاقی و استعلاجی</p>
            </div>
          </Link>

          {/* Quick 4: Transfers DSS */}
          <Link
            to="/transfers"
            className="p-3.5 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded font-bold">سامانه DSS</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700">انتقالات هوشمند</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">ثبت و رهگیری جابه‌جایی</p>
            </div>
          </Link>

          {/* Quick 5: Training */}
          <Link
            to="/training"
            className="p-3.5 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[10px] bg-violet-50 text-violet-700 border border-violet-200 px-1.5 py-0.5 rounded font-bold">۱ دوره جدید</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700">دوره‌های من</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">آزمون و گواهینامه‌ها</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* CORE 4-PILLAR SERVICE PORTAL (دسته‌بندی ۴ گانه خدمات سامانه) */}
      <motion.div variants={itemVariants} className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>درگاه جامع خدمات و فرآیندهای فراجا</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              جهت جلوگیری از سردرگمی، خدمات در ۴ محور اصلی تفکیک شده‌اند.
            </p>
          </div>

          {/* Real-time search inside services */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در بین خدمات..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-8 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Pillar Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SERVICE_PILLARS.map((pillar) => {
            const isActive = activeCategory === pillar.id;
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveCategory(pillar.id as ServiceCategory)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{pillar.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 font-mono"
                }`}>
                  {pillar.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid (Clean Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredServices.map((item) => {
            const isPinned = pinnedItemIds.includes(item.id);
            const Icon = item.icon;
            return (
              <motion.div
                layout
                variants={itemVariants}
                key={item.id}
                className="bg-white rounded-2xl shadow-2xs border border-slate-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-xs hover:border-slate-300 group"
              >
                <div>
                  <div className="p-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-900 text-emerald-400 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.badgeValue && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${item.badgeColor || "bg-amber-50 text-amber-700 border-amber-200"}`}>
                          {item.badgeValue}
                        </span>
                      )}
                      <button
                        onClick={() => togglePin(item.id)}
                        className={`p-1 rounded-lg transition ${
                          isPinned
                            ? "text-amber-500 hover:bg-amber-50"
                            : "text-slate-300 hover:text-slate-500 hover:bg-slate-100"
                        }`}
                        title={isPinned ? "حذف از میز کار من" : "سنجاق به میز کار من"}
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-black text-slate-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 pb-3.5 space-y-1.5">
                  {item.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.to}
                      className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold text-slate-600 hover:text-emerald-800 bg-slate-50/80 hover:bg-emerald-50/60 rounded-xl transition-all border border-slate-100 hover:border-emerald-200 group/link"
                    >
                      <span className="truncate">{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-emerald-700 transition-transform group-hover/link:-translate-x-0.5 shrink-0" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ANALYTICS SECTION: Performance Radar & Notifications (In Focus Mode, Radar is toggleable) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <h3 className="text-sm font-black text-slate-900">تحلیل وضعیت شایستگی و اعلانات پرونده</h3>
          </div>

          {uiMode === "focus" && (
            <button
              onClick={() => setIsRadarOpen(!isRadarOpen)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition"
            >
              <span>{isRadarOpen ? "بستن نمودار رادار" : "مشاهده نمودار رادار شایستگی"}</span>
              {isRadarOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Grid for Radar & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Chart Card (Always visible in 'full' mode, toggleable in 'focus' mode) */}
          {(uiMode === "full" || isRadarOpen) && (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-600"></div>
                    <h4 className="font-black text-sm text-slate-800">رادار شایستگی‌های فردی من</h4>
                  </div>
                  <Link to="/performance/strengths" className="text-[11px] font-bold text-indigo-600 hover:underline">
                    ماتریس کامل
                  </Link>
                </div>
                <p className="text-xs text-slate-500">تطبیق ۵ شایستگی با استاندارد رسته انتظامی</p>
              </div>

              <div className="h-52 w-full my-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="60%" data={PERSONAL_RADAR_DATA}>
                    <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={false} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar 
                      name="سطح فردی من" 
                      dataKey="current" 
                      stroke="#4338ca" 
                      strokeWidth={2.5} 
                      fill="#6366f1" 
                      fillOpacity={0.4} 
                      dot={{ r: 5, fill: '#4338ca', strokeWidth: 2, stroke: '#ffffff' }}
                    />
                    <Radar 
                      name="استاندارد مصوب" 
                      dataKey="target" 
                      stroke="#059669" 
                      strokeWidth={2} 
                      fill="#10b981" 
                      fillOpacity={0.15} 
                      strokeDasharray="4 4" 
                      dot={{ r: 4, fill: '#059669', strokeWidth: 1.5, stroke: '#ffffff' }}
                    />
                    <Tooltip content={<HomeRadarTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Clean Legible Competency List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 gap-1.5">
                  {PERSONAL_RADAR_DATA.map((item) => {
                    const isAbove = item.current >= item.target;
                    return (
                      <div 
                        key={item.id}
                        className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{item.icon}</span>
                          <span className="font-bold text-slate-800 text-[11px]">{item.subject}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="font-bold text-indigo-700">{item.current}٪</span>
                          <span className="text-slate-300">/</span>
                          <span className="text-slate-500 text-[10px]">{item.target}٪</span>
                          <span className={`w-2 h-2 rounded-full ${isAbove ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Pending Alerts & Actions */}
          <motion.div
            variants={itemVariants}
            className={`${(uiMode === "full" || isRadarOpen) ? "lg:col-span-2" : "lg:col-span-3"} bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <h4 className="font-black text-sm text-slate-800">اقدامات و هشدارهای پرونده شخصی شما</h4>
                </div>
                <Link to="/notifications" className="text-xs font-bold text-slate-500 hover:text-indigo-600">
                  مرکز پیام‌ها (۳ اعلان جدید)
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">آغاز بازه زمانی خوداظهاری کارنامه تابستان ۱۴۰۵</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">لطفاً نسبت به ثبت خوداظهاری اهداف و شاخص‌های شغلی خود تا پایان ماه اقدام فرمایید.</p>
                    </div>
                  </div>
                  <Link
                    to="/performance/improvements"
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-2xs shrink-0"
                  >
                    ثبت خوداظهاری
                  </Link>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">دوره مهارتی پیشنهادی: «مدیریت صحنه و ارتباط موثر»</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">دوره آنلاین مصوب جهت تقویت شاخص‌های رفتاری کارنامه عملکرد.</p>
                    </div>
                  </div>
                  <Link
                    to="/training"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-2xs shrink-0"
                  >
                    مشاهده دوره
                  </Link>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">صدور فیش حقوقی و واریز پاداش فصلی عملکرد</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">فیش حقوقی ماه جاری با اعمال پاداش شاخص نتیجه‌ای آماده دریافت می‌باشد.</p>
                    </div>
                  </div>
                  <Link
                    to="/salary"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-2xs shrink-0"
                  >
                    مشاهده فیش
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>وضعیت حساب کاربری: <span className="text-emerald-600 font-bold">فعال و تایید شده</span></span>
              <Link to="/profile" className="font-bold text-indigo-600 hover:underline">
                ورود به صفحه پروفایل
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-[10px] text-slate-400 mt-8 pb-4 font-bold border-t border-slate-200/60 pt-4">
        سامانه معیار • تحت نظارت اداره خدمات الکترونیک منابع انسانی فاوای فراجا © کلیه حقوق متعلق به فرماندهی انتظامی جمهوری اسلامی ایران است.
      </div>
    </motion.div>
  );
}
