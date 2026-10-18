import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Target,
  Flag,
  Download,
  ChevronDown,
  CheckCircle2,
  Users,
  Activity,
  Search,
  Filter,
  X,
  ChevronRight,
  FileText,
  AlertCircle,
  Calendar,
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Star,
  Award,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Clock,
  Layers,
  Check,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRole } from "../context/RoleContext";
import { ProductivityGrowthDashboard } from "../components/ProductivityGrowthDashboard";

// Performance Scorecard Metrics
interface MetricRow {
  id: number;
  title: string;
  priority: string;
  unit: string;
  weight: string;
  result: string;
  lastSeason: string;
  lastSeasonTrend: "up" | "down" | "neutral";
  target: string;
  orgAvg: string;
  effect: "افزایشی" | "کاهشی";
  effectTrend: "up" | "down";
  score: string;
  criterion: "نتیجه‌ای" | "عملکردی" | "رفتاری";
  selfAssessed?: boolean;
  selfAssessmentNote?: string;
  hasObjection?: boolean;
}

const INITIAL_METRICS: MetricRow[] = [
  {
    id: 1,
    title: "حضور و استقرار به موقع در گشت‌های ابلاغی ۱۱۰",
    priority: "۱",
    unit: "ساعت",
    weight: "٪۱۵",
    result: "۹۲۰",
    lastSeason: "+۱۵٪",
    lastSeasonTrend: "up",
    target: "۱۰۰۰",
    orgAvg: "۸۵۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۹۲",
    criterion: "نتیجه‌ای",
    selfAssessed: true,
    selfAssessmentNote: "پوشش کامل شیفت‌های شبانه در محور گاندی و بلوار میرداماد."
  },
  {
    id: 2,
    title: "میانگین مدت زمان رسیدن سر صحنه از زمان اعلام ۱۱۰",
    priority: "۱",
    unit: "دقیقه",
    weight: "٪۲۰",
    result: "۳.۸",
    lastSeason: "-۲۵٪",
    lastSeasonTrend: "up",
    target: "۵.۰",
    orgAvg: "۶.۲",
    effect: "کاهشی",
    effectTrend: "down",
    score: "۹۶",
    criterion: "عملکردی",
    selfAssessed: false
  },
  {
    id: 3,
    title: "تعداد ماموریت‌های ضربتی و دستگیری سارقین سر صحنه",
    priority: "۲",
    unit: "فقره",
    weight: "٪۱۵",
    result: "۱۸",
    lastSeason: "+۲۰٪",
    lastSeasonTrend: "up",
    target: "۱۵",
    orgAvg: "۱۲",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۱۰۰",
    criterion: "نتیجه‌ای",
    selfAssessed: false
  },
  {
    id: 4,
    title: "صحت گزارش‌های اولیه و مستندسازی صحنه جرم",
    priority: "۲",
    unit: "درصد",
    weight: "٪۱۰",
    result: "۸۸٪",
    lastSeason: "+۵٪",
    lastSeasonTrend: "up",
    target: "۹۰٪",
    orgAvg: "۸۲٪",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۸۸",
    criterion: "عملکردی",
    selfAssessed: false
  },
  {
    id: 5,
    title: "میزان رضایت شهروندان و شاکیان از رفتار مامور گشت",
    priority: "۲",
    unit: "درصد",
    weight: "٪۱۵",
    result: "۹۴٪",
    lastSeason: "+۸٪",
    lastSeasonTrend: "up",
    target: "۸۵٪",
    orgAvg: "۸۰٪",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۹۵",
    criterion: "رفتاری",
    selfAssessed: false
  },
  {
    id: 6,
    title: "انضباط ظاهری، نگهداری تجهیزات و سلاح و سلامت موتور",
    priority: "۳",
    unit: "نمره",
    weight: "٪۱۰",
    result: "۹۲",
    lastSeason: "۰٪",
    lastSeasonTrend: "neutral",
    target: "۹۰",
    orgAvg: "۸۴",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۹۲",
    criterion: "رفتاری",
    selfAssessed: false
  },
  {
    id: 7,
    title: "انتقال فوری گزارش‌های امنیتی مشکوک به دایره تجسس",
    priority: "۳",
    unit: "تعداد",
    weight: "٪۱۵",
    result: "۱۱",
    lastSeason: "-۱۰٪",
    lastSeasonTrend: "down",
    target: "۱۴",
    orgAvg: "۱۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۷۸",
    criterion: "نتیجه‌ای",
    selfAssessed: false
  }
];

interface QuarterlyHistory {
  season: string;
  score: number;
  status: string;
  resultScore: number;
  performanceScore: number;
  behaviorScore: number;
  multiplier: number;
  commissionStatus: string;
  hasBonus: boolean;
}

const HISTORICAL_QUARTERS: QuarterlyHistory[] = [
  {
    season: "بهار ۱۴۰۵",
    score: 70,
    status: "عملکرد خوب",
    resultScore: 72,
    performanceScore: 68,
    behaviorScore: 70,
    multiplier: 1.10,
    commissionStatus: "تایید بدون اعتراض",
    hasBonus: true
  },
  {
    season: "تابستان ۱۴۰۵",
    score: 58,
    status: "عملکرد متوسط",
    resultScore: 55,
    performanceScore: 60,
    behaviorScore: 59,
    multiplier: 1.00,
    commissionStatus: "بررسی در کمیسیون بدوی",
    hasBonus: false
  },
  {
    season: "پاییز ۱۴۰۵",
    score: 70,
    status: "عملکرد خوب",
    resultScore: 71,
    performanceScore: 69,
    behaviorScore: 70,
    multiplier: 1.15,
    commissionStatus: "تایید نهایی کمیسیون",
    hasBonus: true
  },
  {
    season: "زمستان ۱۴۰۵ (فصل جاری)",
    score: 78,
    status: "عملکرد خیلی خوب (ممتاز)",
    resultScore: 80,
    performanceScore: 76,
    behaviorScore: 82,
    multiplier: 1.24,
    commissionStatus: "تایید عالی و اعمال ارشدیت تشویقی",
    hasBonus: true
  }
];

interface ObjectionItem {
  id: string;
  metricTitle: string;
  reason: string;
  details: string;
  date: string;
  status: "در حال بررسی کمیسیون" | "تایید شده و اصلاح نمره" | "رد شده با ذکر مستندات";
  resolutionNote?: string;
}

const INITIAL_OBJECTIONS: ObjectionItem[] = [
  {
    id: "OBJ-103-882",
    metricTitle: "انتقال فوری گزارش‌های امنیتی مشکوک به دایره تجسس",
    reason: "اختلال در لینک بی‌سیم شبکه حوزه تجسس در دهه اول بهمن‌ماه",
    details: "سه مورد گزارش کتباً به افسر نگهبان تحویل شد اما به دلیل خرابی خط ثبت سامانه‌ای با تاخیر مواجه گردید.",
    date: "۱۴۰۵/۱۱/۱۵",
    status: "در حال بررسی کمیسیون"
  },
  {
    id: "OBJ-103-754",
    metricTitle: "صحت گزارش‌های اولیه و مستندسازی صحنه جرم",
    reason: "ازدحام شدید مراجعین در حادثه چهارراه جهان‌کودک",
    details: "بررسی دوربین‌های شهری صحت کروکی و گزارش اولیه را به طور کامل تایید نمود.",
    date: "۱۴۰۵/۰۹/۲۰",
    status: "تایید شده و اصلاح نمره",
    resolutionNote: "با استعلام از مرکز پیام، نمره شاخص از ۸۲ به ۸۸ ارتقا یافت."
  }
];

export type PerformanceTabType = "scorecard" | "productivity_growth" | "objections" | "history";

export function EmployeeView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") as PerformanceTabType | null;

  const resolveTab = (t: string | null): PerformanceTabType => {
    if (t === "productivity_growth" || t === "objections" || t === "history") {
      return t;
    }
    return "scorecard";
  };

  const [activeTab, setActiveTab] = useState<PerformanceTabType>(() => resolveTab(rawTab));

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t) {
      setActiveTab(resolveTab(t));
    }
  }, [searchParams]);

  const handleTabSwitch = (t: PerformanceTabType) => {
    setActiveTab(t);
    setSearchParams({ tab: t });
  };

  const [activeQuarter, setActiveQuarter] = useState<"winter" | "autumn" | "summer" | "spring">("winter");
  const [metricsList, setMetricsList] = useState<MetricRow[]>(INITIAL_METRICS);
  const [criterionFilter, setCriterionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Objections State
  const [objections, setObjections] = useState<ObjectionItem[]>(INITIAL_OBJECTIONS);
  const [isObjectionModalOpen, setIsObjectionModalOpen] = useState<boolean>(false);
  const [selectedMetricForObjection, setSelectedMetricForObjection] = useState<string>(INITIAL_METRICS[0].title);
  const [objectionReasonCategory, setObjectionReasonCategory] = useState<string>("خرابی تجهیزات یا قطعی ارتباط بی‌سیم");
  const [objectionText, setObjectionText] = useState<string>("");

  // Self-Assessment Modal State
  const [selfAssessmentMetric, setSelfAssessmentMetric] = useState<MetricRow | null>(null);
  const [selfAssessmentText, setSelfAssessmentText] = useState<string>("");

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" } | null>(null);

  const showToast = (text: string, type: "success" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered metrics
  const filteredMetrics = useMemo(() => {
    return metricsList.filter(m => {
      const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCriterion = criterionFilter === "all" || m.criterion === criterionFilter;
      return matchSearch && matchCriterion;
    });
  }, [metricsList, searchQuery, criterionFilter]);

  // Current Quarter Stats
  const quarterStats = {
    winter: { score: 78, status: "عملکرد خیلی خوب (ممتاز)", color: "text-emerald-600", multiplier: "۱.۲۴", rank: "رتبه ۳ از ۴۶", bonusAmount: "۱۴,۸۸۰,۰۰۰ تومان" },
    autumn: { score: 70, status: "عملکرد خوب", color: "text-emerald-600", multiplier: "۱.۱۵", rank: "رتبه ۵ از ۴۶", bonusAmount: "۱۰,۵۰۰,۰۰۰ تومان" },
    summer: { score: 58, status: "عملکرد متوسط", color: "text-amber-600", multiplier: "۱.۰۰", rank: "رتبه ۱۲ از ۴۶", bonusAmount: "بدون پاداش" },
    spring: { score: 70, status: "عملکرد خوب", color: "text-emerald-600", multiplier: "۱.۱۰", rank: "رتبه ۶ از ۴۶", bonusAmount: "۸,۲۰۰,۰۰۰ تومان" }
  };
  const activeStats = quarterStats[activeQuarter];

  // 4 Component Scores
  const componentScores = [
    { name: "عملکرد ماموریتی و صفی", score: 85, weight: "۳۵٪", target: 80 },
    { name: "انضباط رفتاری و حضور", score: 92, weight: "۲۵٪", target: 85 },
    { name: "نتایج عملیاتی و کشف", score: 88, weight: "۲۵٪", target: 80 },
    { name: "سرعت عمل واکنش ۱۱۰", score: 96, weight: "۱۵٪", target: 85 }
  ];

  // Submit Self-Assessment Handler
  const handleSaveSelfAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfAssessmentMetric) return;

    setMetricsList(prev => prev.map(m => {
      if (m.id === selfAssessmentMetric.id) {
        return {
          ...m,
          selfAssessed: true,
          selfAssessmentNote: selfAssessmentText || "توضیحات و مستندات خوداظهاری ثبت شد."
        };
      }
      return m;
    }));

    showToast(`خوداظهاری شما برای شاخص «${selfAssessmentMetric.title}» با موفقیت در پرونده عملکردی ثبت گردید.`);
    setSelfAssessmentMetric(null);
    setSelfAssessmentText("");
  };

  // Submit Objection Handler
  const handleSaveObjection = (e: React.FormEvent) => {
    e.preventDefault();
    const newObjection: ObjectionItem = {
      id: `OBJ-103-${Math.floor(100 + Math.random() * 900)}`,
      metricTitle: selectedMetricForObjection,
      reason: objectionReasonCategory,
      details: objectionText || "تقاضای بازنگری در سوابق مرکز پیام و کمیسیون ارزیابی.",
      date: "۱۴۰۵/۱۱/۲۸",
      status: "در حال بررسی کمیسیون"
    };

    setObjections(prev => [newObjection, ...prev]);
    setIsObjectionModalOpen(false);
    setObjectionText("");
    showToast(`اعتراض شما با شماره پیگیری «${newObjection.id}» جهت بررسی به کمیسیون ماده ۱۶۴ ارجاع شد.`);
  };

  return (
    <div className="space-y-6 text-right relative" dir="rtl">
      {/* Sticky Officer Identity & Performance Summary Box */}
      <div className="sticky top-2 z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shrink-0 text-xl">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                کارنامه رسمی عملکرد و بهره‌وری
              </span>
              <span className="text-xs text-slate-300 font-bold">ستوان‌دوم محمدرضا یزدان پناه</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white mt-0.5">
              مامور ارشد گشت انتظامی و فوریت‌های ۱۱۰ • کلانتری ۱۰۳ گاندی تهران
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">ضریب پاداش فصلی:</span>
            <span className="text-emerald-400 font-black text-sm">{activeStats.multiplier} ({activeStats.status})</span>
          </div>
          <div className="bg-indigo-600/30 border border-indigo-500/40 rounded-xl px-3 py-1.5 text-center">
            <span className="text-[10px] text-indigo-300 block">رتبه در یگان:</span>
            <span className="text-white font-black text-xs">{activeStats.rank}</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar (کاملاً تفکیک‌شده و بدون هیچ تکراری با سایر بخش‌ها) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>سامانه جامع ارزیابی عملکرد، شاخص‌های KPI و رسیدگی به اعتراضات</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              این ماژول صرفاً بر روی کارنامه عملکردی، شاخص‌های عینی و رسیدگی به اعتراضات متمرکز است و امور آموزشی و حقوقی در تب‌های تخصصی خود قرار دارند.
            </p>
          </div>
        </div>

        {/* 4 Dedicated Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            { id: "scorecard", title: "۱. کارنامه فصلی و شاخص‌ها", icon: Activity, desc: "ریز نمرات KPI، عقربه ارزیابی و ۴ بعد عملکرد" },
            { id: "productivity_growth", title: "۲. داشبورد تحلیلی بهره‌وری", icon: TrendingUp, desc: "روند شاخص‌های کشف، سرعت عمل و رضایت شاکیان" },
            { id: "objections", title: "۳. کارتابل خوداظهاری و اعتراضات", icon: ShieldAlert, desc: "ثبت اعتراض رسمی و مستندات به کمیسیون ماده ۱۶۴" },
            { id: "history", title: "۴. سوابق ارزیابی و مقایسه فصول", icon: Clock, desc: "مقایسه تطبیقی عملکرد در ۴ فصل سال ۱۴۰۵" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSwitch(tab.id as PerformanceTabType)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between gap-1.5 cursor-pointer select-none ${
                  isActive
                    ? "bg-[#4455A5] text-white border-indigo-700 shadow-md ring-2 ring-indigo-300"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black line-clamp-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                    {tab.title}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-indigo-600"}`} />
                </div>
                <p className={`text-[10px] line-clamp-1 ${isActive ? "text-indigo-100" : "text-slate-500"}`}>
                  {tab.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-600 hover:text-emerald-800 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* TAB 1: SEASONAL SCORECARD & DETAILED KPI METRICS         */}
      {/* ======================================================== */}
      {activeTab === "scorecard" && (
        <div className="space-y-6">
          {/* Top Row: Seasonal Gauge + 4 Component Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Box (7 cols): Semicircular Gauge & Quarter Switcher */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span>امتیاز نهایی کارنامه در فصل انتخابی:</span>
                  </h3>

                  {/* Quarter Selector */}
                  <div className="flex bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                    {[
                      { id: "spring", name: "بهار" },
                      { id: "summer", name: "تابستان" },
                      { id: "autumn", name: "پاییز" },
                      { id: "winter", name: "زمستان (جاری)" }
                    ].map(q => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setActiveQuarter(q.id as any)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          activeQuarter === q.id 
                            ? "bg-[#4455A5] text-white shadow-xs font-black" 
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {q.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Semicircle Gauge Visual */}
                <div className="relative flex flex-col items-center justify-center pt-2">
                  <svg width="200" height="110" viewBox="0 0 200 110" className="overflow-visible">
                    <path
                      d="M 15 100 A 85 85 0 0 1 185 100"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 15 100 A 85 85 0 0 1 70 45"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 70 45 A 85 85 0 0 1 130 45"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="16"
                    />
                    <path
                      d="M 130 45 A 85 85 0 0 1 185 100"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Needle */}
                    <g transform="translate(100, 100)">
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-80"
                        stroke="#1e293b"
                        strokeWidth="4"
                        strokeLinecap="round"
                        transform={`rotate(${-90 + (activeStats.score / 100) * 180})`}
                        className="transition-transform duration-500 ease-out"
                      />
                      <circle cx="0" cy="0" r="8" fill="#1e293b" />
                    </g>
                  </svg>

                  <div className="text-center -mt-2">
                    <span className="text-3xl font-black text-slate-900 font-mono block">
                      {activeStats.score} <span className="text-xs font-normal text-slate-400">از ۱۰۰</span>
                    </span>
                    <span className={`text-xs font-black ${activeStats.color} mt-0.5 block`}>
                      {activeStats.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 block">پاداش بهره‌وری مصوب:</span>
                  <strong className="text-slate-800 font-bold">{activeStats.bonusAmount}</strong>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block">ضریب ارزیابی:</span>
                  <strong className="text-emerald-700 font-mono font-black">{activeStats.multiplier}</strong>
                </div>
              </div>
            </div>

            {/* Right Box (7 cols): 4 Evaluation Pillars */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <span>تفکیک ۴ بعد ارزیابی عملکرد در فصل انتخابی:</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">حداقل قبولی: ۸۰٪</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  نمرات این چهار بعد از برآیند شاخص‌های کمی (حضور، سرعت عمل) و کیفی (برخورد با مراجعین) حاصل شده است.
                </p>

                <div className="space-y-3.5 mt-4">
                  {componentScores.map((c, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-800">{c.name} (وزن: {c.weight})</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">هدف: {c.target}</span>
                          <span className={`font-mono font-black ${c.score >= c.target ? "text-emerald-600" : "text-amber-600"}`}>
                            {c.score} از ۱۰۰
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            c.score >= c.target ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 flex items-center justify-between text-xs text-indigo-900 mt-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>آموزش‌های مهارتی جبرانی در تب «آموزش و توسعه فردی» متمرکز شده‌اند.</span>
                </div>
                <Link
                  to="/training?tab=remediation"
                  className="font-black text-indigo-700 hover:text-indigo-900 flex items-center gap-1 shrink-0 text-[11px]"
                >
                  <span>مشاهده دوره‌ها</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* KPI Indicators Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* Header & Filter Controls */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>جدول ریز نمرات شاخص‌های ارزیابی عملکرد (KPIs)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  برای هر شاخص می‌توانید توضیحات خوداظهاری ثبت کرده یا در صورت وجود ابهام، اعتراض رسمی تنظیم نمایید.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Search */}
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="جستجوی عنوان شاخص..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute left-2.5 top-2 text-slate-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                  {[
                    { id: "all", label: "همه شاخص‌ها" },
                    { id: "نتیجه‌ای", label: "نتیجه‌ای" },
                    { id: "عملکردی", label: "عملکردی" },
                    { id: "رفتاری", label: "رفتاری" },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCriterionFilter(tab.id)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        criterionFilter === tab.id
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Direct Objection Action Button */}
                <button
                  type="button"
                  onClick={() => setIsObjectionModalOpen(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>ثبت اعتراض جدید</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3.5 text-right">عنوان شاخص عملکردی</th>
                    <th className="p-3.5 text-center">اولویت</th>
                    <th className="p-3.5 text-center">واحد</th>
                    <th className="p-3.5 text-center">وزن</th>
                    <th className="p-3.5 text-center">عملکرد واقعی</th>
                    <th className="p-3.5 text-center">تغییر نسبت به قبل</th>
                    <th className="p-3.5 text-center">حد هدف</th>
                    <th className="p-3.5 text-center">میانگین کلانتری</th>
                    <th className="p-3.5 text-center">نمره (۱۰۰)</th>
                    <th className="p-3.5 text-center">نوع ملاک</th>
                    <th className="p-3.5 text-center">اقدامات پرسنل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredMetrics.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 text-slate-900 font-bold whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{row.title}</span>
                          {row.selfAssessed && (
                            <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded" title="توضیحات خوداظهاری ثبت شده">
                              خوداظهاری ثبت شده
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-500">{row.priority}</td>
                      <td className="p-3.5 text-center text-slate-500">{row.unit}</td>
                      <td className="p-3.5 text-center font-mono font-bold text-slate-600">{row.weight}</td>
                      <td className="p-3.5 text-center font-mono font-black text-slate-900">{row.result}</td>
                      <td className="p-3.5 text-center font-mono font-bold">
                        <span className={row.lastSeasonTrend === "up" ? "text-emerald-600" : row.lastSeasonTrend === "down" ? "text-rose-600" : "text-slate-500"}>
                          {row.lastSeason}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-500">{row.target}</td>
                      <td className="p-3.5 text-center font-mono text-slate-500">{row.orgAvg}</td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded font-mono font-black text-xs ${
                          parseInt(row.score) >= 90
                            ? "bg-emerald-100 text-emerald-800"
                            : parseInt(row.score) >= 80
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {row.score}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {row.criterion}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Self-Assessment Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelfAssessmentMetric(row);
                              setSelfAssessmentText(row.selfAssessmentNote || "");
                            }}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                              row.selfAssessed
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                            }`}
                            title="ثبت یا ویرایش توضیحات و مستندات خوداظهاری"
                          >
                            {row.selfAssessed ? "ویرایش خوداظهاری" : "خوداظهاری"}
                          </button>

                          {/* Objection Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMetricForObjection(row.title);
                              setIsObjectionModalOpen(true);
                            }}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                            title="ثبت اعتراض به نمره این شاخص در کمیسیون"
                          >
                            اعتراض
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredMetrics.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  شاخصی با مشخصات جستجو شده یافت نشد.
                </div>
              )}
            </div>

            {/* Footer Summary Notice */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>نمرات نهایی پس از طی مهلت قانونی اعتراضات در کمیسیون ماده ۱۶۴ قطعی می‌گردد.</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                آخرین به‌روزرسانی نمرات: ۲۸ بهمن ۱۴۰۵ • کارگزینی کلانتری ۱۰۳
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRODUCTIVITY GROWTH DASHBOARD                     */}
      {/* ======================================================== */}
      {activeTab === "productivity_growth" && (
        <ProductivityGrowthDashboard />
      )}

      {/* ======================================================== */}
      {/* TAB 3: SELF-ASSESSMENTS & OBJECTIONS PORTAL              */}
      {/* ======================================================== */}
      {activeTab === "objections" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>کارتابل رسمی رسیدگی به اعتراضات نمرات و سوابق خوداظهاری</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  در صورت وجود عوامل خارجی خارج از اراده مامور (خرابی تجهیزات، ترافیک، شرایط بحرانی)، می‌توانید اعتراض مستند خود را ثبت نمایید.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsObjectionModalOpen(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ثبت فرم اعتراض جدید</span>
              </button>
            </div>
          </div>

          {/* Objections List */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>لیست اعتراضات ثبت‌شده در کمیسیون ارزیابی عملکرد ({objections.length} فقره)</span>
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3.5">کد پیگیری</th>
                    <th className="p-3.5">شاخص مورد اعتراض</th>
                    <th className="p-3.5">علت استنادی</th>
                    <th className="p-3.5">شرح توضیحات</th>
                    <th className="p-3.5 text-center">تاریخ ثبت</th>
                    <th className="p-3.5 text-center">وضعیت رسیدگی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {objections.map((obj) => (
                    <tr key={obj.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-indigo-700">{obj.id}</td>
                      <td className="p-3.5 text-slate-900 font-bold">{obj.metricTitle}</td>
                      <td className="p-3.5 text-slate-600">{obj.reason}</td>
                      <td className="p-3.5 text-slate-500 max-w-xs truncate" title={obj.details}>
                        {obj.details}
                        {obj.resolutionNote && (
                          <span className="block text-[10px] text-emerald-700 font-bold mt-0.5">
                            نتیجه: {obj.resolutionNote}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-500">{obj.date}</td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                          obj.status.includes("تایید")
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : obj.status.includes("رد")
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          {obj.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Self-Assessments Recorded */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 space-y-3">
            <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>شاخص‌های دارای خوداظهاری ثبت‌شده در فصل زمستان ۱۴۰۵</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {metricsList.filter(m => m.selfAssessed).map(m => (
                <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 text-right">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900">{m.title}</h5>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      نمره: {m.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {m.selfAssessmentNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: HISTORICAL 4-QUARTER COMPARISON & COMMISSION LOG  */}
      {/* ======================================================== */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-2 shadow-2xs">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>کارنامه مقایسه تطبیقی ۴ فصل سال ۱۴۰۵ و مصوبات کمیسیون</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              وفق ماده ۱۶۴ قانون استخدام فراجا، در صورتی که فرد در ۳ دوره متوالی عملکرد «خیلی خوب یا ممتاز» کسب کند، علاوه بر حداکثر ضریب پاداش، از ارشدیت تشویقی ترفیع برخوردار می‌گردد.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3.5">دوره ارزیابی</th>
                    <th className="p-3.5 text-center">نمره کل (۱۰۰)</th>
                    <th className="p-3.5 text-center">شاخص نتیجه‌ای</th>
                    <th className="p-3.5 text-center">شاخص عملکردی</th>
                    <th className="p-3.5 text-center">شاخص رفتاری</th>
                    <th className="p-3.5 text-center">وضعیت رتبه‌بندی</th>
                    <th className="p-3.5 text-center">ضریب پاداش فصلی</th>
                    <th className="p-3.5 text-center">مصوبه کمیسیون ماده ۱۶۴</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {HISTORICAL_QUARTERS.map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{q.season}</td>
                      <td className="p-3.5 text-center font-mono font-black text-indigo-700 text-sm">{q.score}</td>
                      <td className="p-3.5 text-center font-mono">{q.resultScore}</td>
                      <td className="p-3.5 text-center font-mono">{q.performanceScore}</td>
                      <td className="p-3.5 text-center font-mono">{q.behaviorScore}</td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          q.score >= 75
                            ? "bg-emerald-100 text-emerald-800"
                            : q.score >= 65
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-emerald-700">{q.multiplier}</td>
                      <td className="p-3.5 text-center text-slate-600 font-bold">{q.commissionStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: SELF-ASSESSMENT MODAL                           */}
      {/* ======================================================== */}
      {selfAssessmentMetric && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-right"
          >
            <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  فرم ثبت خوداظهاری پرسنل
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">
                  {selfAssessmentMetric.title}
                </h3>
              </div>
              <button
                onClick={() => setSelfAssessmentMetric(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSelfAssessment} className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                لطفاً اقدامات میدانی، مستندات، و توضیحات خود را پیرامون تحقق این شاخص وارد نمایید. این توضیحات مستقیماً در کارتابل ارزیاب و کمیسیون لحاظ خواهد شد.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شرح ماموریت‌های انجام‌شده و مستندات:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="مثال: پوشش کامل محدوده گشت در ساعات ۲۲ الی ۴ بامداد و حضور به موقع در کلیه کدهای اعلامی..."
                  value={selfAssessmentText}
                  onChange={(e) => setSelfAssessmentText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelfAssessmentMetric(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                >
                  ثبت نهایی خوداظهاری
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: FORMAL OBJECTION MODAL                          */}
      {/* ======================================================== */}
      {isObjectionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-right"
          >
            <div className="bg-rose-50 border-b border-rose-100 py-4 px-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded-full">
                  ارجاع به کمیسیون ماده ۱۶۴ فراجا
                </span>
                <h3 className="font-bold text-rose-950 text-sm mt-1">
                  ثبت اعتراض رسمی به نمره شاخص ارزیابی عملکرد
                </h3>
              </div>
              <button
                onClick={() => setIsObjectionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveObjection} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  انتخاب شاخص مورد اعتراض:
                </label>
                <select
                  value={selectedMetricForObjection}
                  onChange={(e) => setSelectedMetricForObjection(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500 font-bold"
                >
                  {metricsList.map(m => (
                    <option key={m.id} value={m.title}>{m.title} (نمره: {m.score})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  علت استنادی و عامل بازدارنده:
                </label>
                <select
                  value={objectionReasonCategory}
                  onChange={(e) => setObjectionReasonCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="خرابی تجهیزات یا قطعی ارتباط بی‌سیم">خرابی تجهیزات، قطعی بی‌سیم یا تاخیر سرور سامانه موقوف</option>
                  <option value="ترافیک سنگین معابر در ساعات پیک">ترافیک سنگین معابر حوزه استحفاظی و عدم امکان تردد سریع</option>
                  <option value="تراکم همزمان کدهای ۱۱۰ و ماموریت همپوشان">تراکم همزمان تماس‌های مردمی و اولویت‌بندی جرایم خشن</option>
                  <option value="شرایط نامساعد جوی و حوادث قهری">شرایط نامساعد جوی و لغزندگی معابر</option>
                  <option value="مغایرت آماری در گزارش اولیه دیسپچ">مغایرت آماری در داده‌های ثبت‌شده اولیه مرکز پیام</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شرح تفصیلی لایحه دفاعیه مامور:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="لطفاً شماره گزارش‌های ۱۱۰، تاریخ و شرح واقعه را به دقت قید فرمایید..."
                  value={objectionText}
                  onChange={(e) => setObjectionText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsObjectionModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                >
                  ارسال به کمیسیون تجدیدنظر
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Evaluator View Component
function EvaluatorView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [evaluatingEmployee, setEvaluatingEmployee] = useState<any | null>(null);
  const [evaluatorSuccess, setEvaluatorSuccess] = useState<string | null>(null);

  const [evaluationList, setEvaluationList] = useState([
    { id: 1, name: "علی کریمی", code: "۴۵۸۹۶۲", status: "pending", statusText: "در انتظار ارزیابی", lastScore: "-", rank: "گروهبان یکم", unit: "گشت خودرویی" },
    { id: 2, name: "محمد حسینی", code: "۱۲۴۵۶۷", status: "completed", statusText: "تکمیل شده", lastScore: "۸۸", rank: "استوار دوم", unit: "گشت موتوری" },
    { id: 3, name: "رضا احمدی", code: "۹۸۷۶۵۴", status: "in_progress", statusText: "در حال ارزیابی", lastScore: "۷۵", rank: "استوار یکم", unit: "دایره تجسس" },
    { id: 4, name: "حسین مرادی", code: "۳۴۵۶۷۸", status: "pending", statusText: "در انتظار ارزیابی", lastScore: "-", rank: "گروهبان یکم", unit: "خدمات قضایی" },
    { id: 5, name: "مهدی طارمی", code: "۴۵۶۷۸۹", status: "completed", statusText: "تکمیل شده", lastScore: "۹۲", rank: "ستوان سوم", unit: "گشت ۱۱۰" },
  ]);

  const [sliderScores, setSliderScores] = useState<Record<string, number>>({
    "رعایت نظم و حضور در شیفت": 4,
    "نحوه برخورد با شهروندان و ارباب رجوع": 5,
    "آراستگی ظاهری و انضباط نظامی": 4,
    "سرعت عمل در انجام ماموریت‌های فوریتی": 5,
    "کیفیت صورتجلسه و مستندسازی صحنه": 4,
    "مهارت‌های تاکتیکی و مهار متهم": 4
  });

  const handleSliderChange = (item: string, val: number) => {
    setSliderScores(prev => ({ ...prev, [item]: val }));
  };

  const handleSaveEvaluation = () => {
    if (!evaluatingEmployee) return;

    const values = Object.values(sliderScores);
    const sum = values.reduce((a, b) => a + b, 0);
    const scoreVal = Math.round((sum / (values.length * 5)) * 100);

    setEvaluationList(prev => prev.map(emp => {
      if (emp.id === evaluatingEmployee.id) {
        return {
          ...emp,
          status: "completed",
          statusText: "تکمیل شده",
          lastScore: String(scoreVal)
        };
      }
      return emp;
    }));

    setEvaluatorSuccess(`ارزیابی عملکرد جناب آقای «${evaluatingEmployee.name}» با نمره ${scoreVal} از ۱۰۰ در سامانه ثبت گردید.`);
    setEvaluatingEmployee(null);
    setTimeout(() => setEvaluatorSuccess(null), 5000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {evaluatorSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{evaluatorSuccess}</span>
        </div>
      )}

      {evaluatingEmployee ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEvaluatingEmployee(null)}
                className="p-2 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </button>
              <div>
                <h2 className="text-base font-black text-slate-900">
                  ثبت ارزیابی عملکرد میدانی • {evaluatingEmployee.name} ({evaluatingEmployee.rank})
                </h2>
                <span className="text-xs text-slate-400">کد پرسنلی: {evaluatingEmployee.code} • دایره: {evaluatingEmployee.unit}</span>
              </div>
            </div>
            <span className="text-xs font-black bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
              دوره ارزیابی: زمستان ۱۴۰۵
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(sliderScores).map((item) => (
              <div key={item} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>{item}</span>
                  <span className="bg-indigo-600 text-white font-mono px-2 py-0.5 rounded-lg text-xs">
                    {sliderScores[item]} از ۵
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={sliderScores[item]}
                  onChange={(e) => handleSliderChange(item, parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setEvaluatingEmployee(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              انصراف
            </button>
            <button
              onClick={handleSaveEvaluation}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2 rounded-xl transition cursor-pointer shadow-xs"
            >
              ثبت و نهایی‌سازی ارزیابی
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>کارتابل ارزیاب شایستگی و عملکرد پرسنل کلانتری ۱۰۳</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">جهت ثبت نمرات فصلی کارکنان روی دکمه «ثبت ارزیابی» کلیک فرمایید.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="جستجوی پرسنل یا کد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3.5">نام و نشان پرسنل</th>
                  <th className="p-3.5">کد پرسنلی</th>
                  <th className="p-3.5">درجه نظامی</th>
                  <th className="p-3.5">رده خدمتی</th>
                  <th className="p-3.5 text-center">نمره قبلی</th>
                  <th className="p-3.5 text-center">وضعیت</th>
                  <th className="p-3.5 text-center">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {evaluationList.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{emp.name}</td>
                    <td className="p-3.5 font-mono text-slate-500">{emp.code}</td>
                    <td className="p-3.5">{emp.rank}</td>
                    <td className="p-3.5 text-slate-500">{emp.unit}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-indigo-600">{emp.lastScore}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        emp.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {emp.statusText}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => setEvaluatingEmployee(emp)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3 py-1 rounded-lg transition cursor-pointer"
                      >
                        {emp.status === "completed" ? "ویرایش نمره" : "ثبت ارزیابی"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Manager View Component
function ManagerView() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-5 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs text-slate-500 font-bold block">میانگین بهره‌وری یگان (فصل جاری)</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">۷۸.۴ <span className="text-xs text-slate-400">از ۱۰۰</span></span>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">↑ ۵.۲٪ رشد نسبت به فصل قبل</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl">
            📊
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-5 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs text-slate-500 font-bold block">کارکنان ارزیابی‌شده در کمیسیون</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">۴۲ <span className="text-xs text-slate-400">از ۴۶ پرسنل</span></span>
            <span className="text-[10px] text-indigo-600 font-bold mt-0.5 block">۹۱٪ تکمیل فرآیند</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xl">
            👥
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-5 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs text-slate-500 font-bold block">رتبه کلانتری ۱۰۳ در سرکلانتری</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">رتبه ۲ <span className="text-xs text-slate-400">از ۸ کلانتری</span></span>
            <span className="text-[10px] text-amber-600 font-bold mt-0.5 block">ناحیه برتر عملیات واکنش سریع</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xl">
            🏆
          </div>
        </div>
      </div>

      {/* Embedded Deep Dashboard */}
      <ProductivityGrowthDashboard />
    </div>
  );
}

// Master Page Routing
export function PerformancePage() {
  const { role } = useRole();
  if (role === 'evaluator') return <EvaluatorView />;
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
