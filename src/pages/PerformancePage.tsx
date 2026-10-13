import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
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
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { useRole } from "../context/RoleContext";
import { ProductivityGrowthDashboard } from "../components/ProductivityGrowthDashboard";
import { PerformanceSalarySimulator } from "../components/PerformanceSalarySimulator";

const PAST_PERFORMANCE_DATA = [
  { name: "بهار ۱۴۰۵", result: 57, performance: 70, behavior: 30, total: 157, status: "عملکرد خوب" },
  { name: "تابستان ۱۴۰۵", result: 18, performance: 55, behavior: 85, total: 158, status: "عملکرد خوب" },
  { name: "پاییز ۱۴۰۵", result: 65, performance: 50, behavior: 22, total: 137, status: "عملکرد متوسط" },
  { name: "زمستان ۱۴۰۵", result: 38, performance: 78, behavior: 68, total: 184, status: "عملکرد خیلی خوب" },
  { name: "بهار ۱۴۰۵", result: 21, performance: 57, behavior: 85, total: 163, status: "عملکرد خوب" },
];

const EVALUATION_STATUS_DATA = [
  { name: "تکمیل شده", value: 45, color: "#10b981" },
  { name: "در حال ارزیابی", value: 15, color: "#f59e0b" },
  { name: "شروع نشده", value: 10, color: "#ef4444" },
];

const UNIT_PERFORMANCE_TREND = [
  { name: "فروردین", کلانتری۱: 65, کلانتری۲: 70, کلانتری۳: 60 },
  { name: "اردیبهشت", کلانتری۱: 75, کلانتری۲: 72, کلانتری۳: 68 },
  { name: "خرداد", کلانتری۱: 80, کلانتری۲: 78, کلانتری۳: 75 },
  { name: "تیر", کلانتری۱: 85, کلانتری۲: 80, کلانتری۳: 82 },
  { name: "مرداد", کلانتری۱: 88, کلانتری۲: 85, کلانتری۳: 84 },
  { name: "شهریور", کلانتری۱: 92, کلانتری۲: 88, کلانتری۳: 90 },
];

const METRICS = [
  {
    id: 1,
    title: "حضور و غیاب سیستمی",
    priority: "۱",
    unit: "ساعت",
    weight: "٪۸",
    result: "۹۰۰",
    lastSeason: "+۵۰٪",
    lastSeasonTrend: "up",
    target: "۱۲۰۰",
    orgAvg: "۱۰۰۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۱۲۵",
    welfarePoints: "۵",
    criterion: "نتیجه‌ای",
    actions: []
  },
  {
    id: 2,
    title: "تعداد هدف های انجام شده",
    priority: "۲",
    unit: "تعداد",
    weight: "٪۱۲",
    result: "۳۵۰",
    lastSeason: "+۲۲٪",
    lastSeasonTrend: "up",
    target: "۳۷۰",
    orgAvg: "۳۰۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۲۰۰",
    welfarePoints: "۴",
    criterion: "عملکردی",
    actions: []
  },
  {
    id: 3,
    title: "میانگین مدت زمان رسیدن سر صحنه از زمان تایید هدف",
    priority: "۳",
    unit: "دقیقه",
    weight: "٪۱۰",
    result: "۱۰۰",
    lastSeason: "۰٪",
    lastSeasonTrend: "neutral",
    target: "۱۰۰",
    orgAvg: "۹۰",
    effect: "کاهشی",
    effectTrend: "down",
    score: "۵۰",
    welfarePoints: "۳",
    criterion: "رفتاری",
    actions: [{ label: "آموزش", type: "blue" }, { label: "خود اظهاری", type: "green" }]
  },
  {
    id: 4,
    title: "میانگین مدت زمان انجام هدف از زمان رسیدن سر صحنه",
    priority: "۲",
    unit: "دقیقه",
    weight: "٪۵",
    result: "۲۰۰",
    lastSeason: "-۱۱٪",
    lastSeasonTrend: "down",
    target: "۲۵۰",
    orgAvg: "۲۳۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۳۰۰",
    welfarePoints: "۲",
    criterion: "عملکردی",
    actions: []
  },
  {
    id: 5,
    title: "تعداد جرایم ثبت شده در محدوده",
    priority: "۴",
    unit: "تعداد",
    weight: "٪۱۵",
    result: "۳۵",
    lastSeason: "+۴۰٪",
    lastSeasonTrend: "up",
    target: "۲۰",
    orgAvg: "۱۸",
    effect: "کاهشی",
    effectTrend: "down",
    score: "۴۷",
    welfarePoints: "۱",
    criterion: "نتیجه‌ای",
    actions: [{ label: "آموزش", type: "blue" }, { label: "خود اظهاری", type: "green" }]
  },
  {
    id: 6,
    title: "درصد وقوع جرم در منطقه",
    priority: "۴",
    unit: "درصد",
    weight: "٪۷",
    result: "۱۰۰",
    lastSeason: "-۱۰٪",
    lastSeasonTrend: "down",
    target: "۵۰",
    orgAvg: "۴۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۵",
    welfarePoints: "۰",
    criterion: "رفتاری",
    actions: [{ label: "کمیسیون", type: "red" }]
  },
  {
    id: 7,
    title: "درصد رضایت شاکیان",
    priority: "۱",
    unit: "درصد",
    weight: "٪۹",
    result: "۳۶",
    lastSeason: "-۵٪",
    lastSeasonTrend: "down",
    target: "۲۴",
    orgAvg: "۲۰",
    effect: "کاهشی",
    effectTrend: "down",
    score: "۱۲۳",
    welfarePoints: "۵",
    criterion: "عملکردی",
    actions: []
  },
  {
    id: 8,
    title: "مهارت ارتباط موثر",
    priority: "۱",
    unit: "تعداد",
    weight: "٪۱۴",
    result: "۲۴",
    lastSeason: "۰٪",
    lastSeasonTrend: "neutral",
    target: "۲۴",
    orgAvg: "۲۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۱۲",
    welfarePoints: "۰",
    criterion: "رفتاری",
    actions: [{ label: "آموزش", type: "blue" }]
  },
  {
    id: 9,
    title: "مدیریت زمان",
    priority: "۲",
    unit: "تعداد",
    weight: "٪۹",
    result: "۱۲",
    lastSeason: "+۳۶٪",
    lastSeasonTrend: "up",
    target: "۱۲",
    orgAvg: "۱۰",
    effect: "افزایشی",
    effectTrend: "up",
    score: "۱۱",
    welfarePoints: "۳",
    criterion: "نتیجه‌ای",
    actions: []
  },
  {
    id: 10,
    title: "درصد صحت گزارش اولیه",
    priority: "۲",
    unit: "درصد",
    weight: "٪۱۱",
    result: "۲۰",
    lastSeason: "-۲۰٪",
    lastSeasonTrend: "down",
    target: "۳۰",
    orgAvg: "۲۰",
    effect: "کاهشی",
    effectTrend: "down",
    score: "۱۴",
    welfarePoints: "۰",
    criterion: "نتیجه‌ای",
    actions: [{ label: "کمیسیون", type: "red" }]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const QUARTER_METRICS: Record<string, typeof METRICS> = {
  winter: METRICS,
  autumn: [
    { ...METRICS[0], result: "۸۱۰", score: "۱۱۰" },
    { ...METRICS[1], result: "۳۱۵", score: "۱۸۰" },
    { ...METRICS[2], result: "۱۱۰", score: "۴۰" },
  ],
  summer: [
    { ...METRICS[0], result: "۶۷۵", score: "۹۰" },
    { ...METRICS[1], result: "۲۶۰", score: "۱۴۰" },
    { ...METRICS[2], result: "۱۲۵", score: "۳۰" },
  ],
  spring: [
    { ...METRICS[0], result: "۴۰۵", score: "۵۵" },
    { ...METRICS[1], result: "۱۵۷", score: "۸۰" },
    { ...METRICS[2], result: "۱۴۰", score: "۲۰" },
  ]
};

function EmployeeView() {
  const [employeeActiveTab, setEmployeeActiveTab] = useState<"scorecard" | "productivity_growth" | "salary_simulator">("scorecard");
  const [score, setScore] = useState(56);
  const [activeQuarter, setActiveQuarter] = useState<"winter" | "autumn" | "summer" | "spring">("winter");
  const [isSelfAssessmentOpen, setIsSelfAssessmentOpen] = useState(false);
  const [selfAssessmentMetricId, setSelfAssessmentMetricId] = useState<number | null>(null);
  
  // Dynamic metrics per active quarter
  const [quarterMetricsState, setQuarterMetricsState] = useState<Record<string, typeof METRICS>>(QUARTER_METRICS);
  const metrics = quarterMetricsState[activeQuarter];

  const [isObjectionOpen, setIsObjectionOpen] = useState(false);
  const [objectionToast, setObjectionToast] = useState(false);
  const [objectionScope, setObjectionScope] = useState("کل عملکرد");
  const [objectionReason, setObjectionReason] = useState("کمبود یا خرابی تجهیزات");
  const [objectionDetails, setObjectionDetails] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([
    "تعامل ضعیف بهبود با سایر تیم ها",
    "ناتوانی در تشخیص تهدیدهای محیطی",
  ]);
  const [selfAssessmentText, setSelfAssessmentText] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bottomTab, setBottomTab] = useState<"requests" | "objections">("requests");
  const [recommendedCourse, setRecommendedCourse] = useState<{ title: string, desc: string, duration: string } | null>(null);

  // Dynamic objection state
  const [objectionsList, setObjectionsList] = useState<any[]>([
    { id: 1, scope: "شاخص‌های رفتاری", reason: "ترافیک سنگین منطقه", date: "۱۴۰۵/۰۲/۱۰", details: "به دلیل مسدود بودن اتوبان مدرس ماموریت گشت ۱۱۰ طولانی شد.", status: "در حال بررسی" }
  ]);

  // Benefits state
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      title: "سفر زیارتی همراه با خانواده به مشهد مقدس",
      cost: 24,
      received: false,
    },
    {
      id: 2,
      title: "بن خرید دو میلیون تومانی از فروشگاه‌های زنجیره اتکا",
      cost: 57,
      received: false,
    },
    {
      id: 3,
      title: "تخفیف ۴ میلیون تومانی خرید لوازم خانگی",
      cost: 10,
      received: false,
    },
    {
      id: 4,
      title: "وام ۷۰ میلیون تومانی بازپرداخت ۳۶ ماهه بهره ۲ درصد",
      cost: 70,
      received: false,
    },
  ]);

  const handleToggleReason = (reason: string) => {
    setSelectedReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    );
  };

  const handleReceiveBenefit = (id: number, cost: number) => {
    if (score >= cost) {
      setScore(prev => prev - cost);
      setBenefits(prev =>
        prev.map(b => (b.id === id ? { ...b, received: true } : b))
      );
      setSuccessMessage("فرصت رفاهی با موفقیت دریافت شد.");
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setErrorMessage("امتیاز رفاهی شما برای دریافت این فرصت رفاهی کافی نیست.");
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const handleSubmitSelfAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSelfAssessmentOpen(false);

    // Dynamically update the metric's self-assessment status in state
    if (selfAssessmentMetricId) {
      setQuarterMetricsState(prev => {
        const updatedQuarter = prev[activeQuarter].map(m => {
          if (m.id === selfAssessmentMetricId) {
            return {
              ...m,
              actions: m.actions.map(act => act.label === "خود اظهاری" ? { ...act, label: "ثبت شده" } : act)
            };
          }
          return m;
        });
        return { ...prev, [activeQuarter]: updatedQuarter };
      });
    }

    setSuccessMessage(`خوداظهاری شما برای شاخص با موفقیت ثبت شد: "${selfAssessmentText}"`);
    setSelfAssessmentText("");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleSaveObjection = () => {
    setIsObjectionOpen(false);
    
    const newObjection = {
      id: objectionsList.length + 1,
      scope: objectionScope,
      reason: objectionReason,
      date: new Date().toLocaleDateString("fa-IR"),
      details: objectionDetails || "بدون جزئیات اضافی",
      status: "در حال بررسی"
    };
    
    setObjectionsList(prev => [newObjection, ...prev]);
    setObjectionToast(true);
    setObjectionDetails("");
  };

  // Recharts data for performance
  const chartData = [
    { name: "بهار", امتیاز: 35 },
    { name: "تابستان", امتیاز: 58 },
    { name: "پاییز", امتیاز: 70 },
    { name: "زمستان", امتیاز: 78 },
  ];

  const quarterStats: Record<string, { score: number, status: string, color: string, colorBg: string, behavioral: number, performance: number, result: number }> = {
    winter: { score: 78, status: "عملکرد خوب", color: "text-emerald-600", colorBg: "bg-emerald-500", behavioral: 80, performance: 45, result: 80 },
    autumn: { score: 70, status: "عملکرد خوب", color: "text-emerald-600", colorBg: "bg-emerald-500", behavioral: 72, performance: 60, result: 70 },
    summer: { score: 58, status: "عملکرد متوسط", color: "text-amber-600", colorBg: "bg-amber-500", behavioral: 60, performance: 50, result: 58 },
    spring: { score: 35, status: "نیازمند بهبود", color: "text-rose-600", colorBg: "bg-rose-500", behavioral: 40, performance: 30, result: 35 }
  };
  const activeStats = quarterStats[activeQuarter];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Alert Banners */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 font-semibold text-xs animate-in fade-in duration-300 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center gap-3 font-semibold text-xs animate-in fade-in duration-300 shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {objectionToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between gap-3 font-bold text-xs animate-in fade-in duration-300 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#69b736] shrink-0" />
            <span>اعتراض شما با موفقیت ثبت شد. اعتراض شما به لیست اعتراضات جاری اضافه گردید.</span>
          </div>
          <button onClick={() => setObjectionToast(false)} className="text-slate-400 hover:text-slate-600 font-bold px-2">×</button>
        </div>
      )}

      {/* Sticky Job & Identity Box */}
      <div className="sticky top-2 z-40 bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center shadow-xs shrink-0 text-xl font-black">
            👮‍♂️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-lg">
                شغل مصوب سازمانی (ثابت)
              </span>
              <span className="text-xs text-slate-300 font-bold">ستوان‌دوم محمدرضا یزدان پناه</span>
            </div>
            <h3 className="text-sm md:text-base font-black text-white mt-1">
              مامور ارشد گشت انتظامی و فوریت‌های ۱۱۰ (گشت موتوری واکنش سریع)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold">یگان خدمتی:</span>
            <span className="text-slate-200 font-bold">کلانتری ۱۰۳ گاندی (سرکلانتری سوم)</span>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-center shadow-xs">
            <span className="text-[10px] text-emerald-400 block font-bold">جایگاه عملکردی:</span>
            <span className="text-white font-black text-xs">رتبه ۳ در یگان</span>
          </div>
        </div>
      </div>

      {/* Multi-Stage Performance Process & Persian Equivalents Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xs border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              فرآیند چند مرحله‌ای ارزیابی عملکرد و بهره‌وری فراجا
            </span>
            <span className="text-xs text-slate-300 font-bold">
              شاخص‌های کلیدی عملکرد (KPI) و اهداف سازمانی (OKR)
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            مراحل ارزیابی: <strong className="text-amber-400 font-black">۱. خوداظهاری شرح وظایف</strong> ← <strong className="text-amber-400 font-black">۲. ارزیابی مستقیم و تلفیق شاخص‌ها</strong> ← <strong className="text-amber-400 font-black">۳. کمیسیون رسیدگی به اعتراضات</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/performance/improvements"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition"
          >
            ثبت خوداظهاری وظایف
          </Link>
          <Link
            to="/support"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs rounded-xl border border-slate-700 transition"
          >
            کمیسیون رسیدگی
          </Link>
        </div>
      </div>

      {/* User Info Header Card */}
      <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/90 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-right">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
            <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80" alt="محمدرضا یزدان پناه" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-lg font-black text-slate-900">ستوان‌دوم محمدرضا یزدان پناه</h2>
              <span className="bg-slate-100 text-slate-800 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-slate-200">
                کد پرسنلی: ۹۸۴۴۱۰۲
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold mt-1">فرماندهی انتظامی تهران بزرگ - کلانتری ۱۰۳ گاندی (مامور گشت ۱۱۰)</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3.5 shrink-0">
          <div className="bg-slate-900 text-emerald-400 p-2 rounded-xl shadow-2xs">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-500 font-bold">جایگاه عملکردی در یگان انتظامی</span>
            <span className="text-base font-black text-slate-900 tabular-nums">رتبه ۳ <span className="text-xs font-bold text-slate-600">(از بین ۳۸ مامور گشت)</span></span>
          </div>
        </div>
      </div>

      {/* High-Level Employee Mode Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setEmployeeActiveTab("scorecard")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
              employeeActiveTab === "scorecard"
                ? "bg-indigo-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>کارنامه ارزیابی عملکرد و شاخص‌های فصلی</span>
          </button>

          <button
            onClick={() => setEmployeeActiveTab("productivity_growth")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
              employeeActiveTab === "productivity_growth"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>داشبورد تحلیلی رشد بهره‌وری (محمدرضا یزدان‌پناه)</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-md">تحلیلی</span>
          </button>

          <button
            onClick={() => setEmployeeActiveTab("salary_simulator")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
              employeeActiveTab === "salary_simulator"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>شبیه‌ساز اثر نمرات بر حقوق و پاداش</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.2 rounded-md">تعاملی</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-bold px-2 hidden sm:inline">
          کلانتری ۱۰۳ گاندی • یگان گشت موتوری
        </span>
      </div>

      {employeeActiveTab === "productivity_growth" && (
        <ProductivityGrowthDashboard />
      )}

      {employeeActiveTab === "salary_simulator" && (
        <PerformanceSalarySimulator />
      )}

      {employeeActiveTab === "scorecard" && (
        <>
      {/* Performance Section (Figma Gauge + Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left: Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500" /> عملکرد چهار فصل اخیر (جهت تغییر داده‌ها روی فصول کلیک کنید)
              </h3>
              
              {/* Dynamic quarter button selector tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-[10px] font-bold">
                {[
                  { id: "spring", name: "بهار" },
                  { id: "summer", name: "تابستان" },
                  { id: "autumn", name: "پاییز" },
                  { id: "winter", name: "زمستان" }
                ].map(q => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuarter(q.id as any)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeQuarter === q.id 
                        ? "bg-[#4455A5] text-white shadow-sm" 
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {q.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-60 w-full font-sans">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontWeight: "bold" }} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontWeight: "bold" }} />
                  <Tooltip cursor={{ fill: "#f8fafc" }} />
                  <Bar 
                    dataKey="امتیاز" 
                    fill="#4455A5" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40}
                    onClick={(data, index) => {
                      const quarters: ("spring" | "summer" | "autumn" | "winter")[] = ["spring", "summer", "autumn", "winter"];
                      setActiveQuarter(quarters[index]);
                    }}
                    className="cursor-pointer"
                  >
                    {chartData.map((entry, index) => {
                      const quarters = ["spring", "summer", "autumn", "winter"];
                      const isCurrent = activeQuarter === quarters[index];
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isCurrent ? "#10b981" : "#4455A5"} 
                          opacity={isCurrent ? 1 : 0.6}
                          stroke={isCurrent ? "#10b981" : "none"}
                          strokeWidth={2}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2.5 bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-50 text-xs text-indigo-900 font-bold">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>نیازمند بهبود بیشتر در انجام دقیق هدف ها. رشد نسبت به فصل قبل: <span className="font-mono text-emerald-600 font-black">+۱۰٪</span></span>
          </div>
        </div>

        {/* Right: Semi-circular Gauge & Sliders */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-6">
              امتیاز عملکرد شما در فصل انتخابی
            </h3>
 
            {/* Gauge Wrapper */}
            <div className="relative flex flex-col items-center justify-center pt-2">
              {/* Semicircle SVG */}
              <svg width="180" height="100" viewBox="0 0 180 100" className="overflow-visible">
                {/* Background arc */}
                <path
                  d="M 10 90 A 80 80 0 0 1 170 90"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                {/* Colored segments */}
                <path
                  d="M 10 90 A 80 80 0 0 1 60 40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 40 A 80 80 0 0 1 120 40"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="14"
                />
                <path
                  d="M 120 40 A 80 80 0 0 1 170 90"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                {/* Needle */}
                <g transform="translate(90, 90)">
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-75"
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
                <span className="block text-[10px] text-slate-400 font-bold">وضعیت عملکرد ({activeStats.score}٪)</span>
                <span className={`text-sm font-black ${activeStats.color} mt-1 block`}>{activeStats.status}</span>
              </div>
 
              <div className="flex justify-between w-full text-[9px] font-bold text-slate-400 px-2 mt-4">
                <span>نیازمند بهبود</span>
                <span>متوسط</span>
                <span>خیلی خوب</span>
              </div>
            </div>
          </div>
 
          {/* Metric sliders */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                <span>شاخص‌های رفتاری</span>
                <span className="font-mono text-indigo-600">{activeStats.behavioral}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${activeStats.behavioral}%` }}></div>
              </div>
            </div>
 
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                <span>شاخص‌های عملکردی</span>
                <span className="font-mono text-amber-500">{activeStats.performance}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${activeStats.performance}%` }}></div>
              </div>
            </div>
 
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                <span>شاخص‌های نتیجه‌ای</span>
                <span className="font-mono text-emerald-600">{activeStats.result}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${activeStats.result}%` }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Objectives Section (خلاصه وضعیت اهداف) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" /> خلاصه وضعیت اهداف (ماموریت‌ها)
          </h3>
          <div className="flex gap-2 text-[10px] font-bold">
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded border border-emerald-100">۴ هدف ثبت شده</span>
            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-100">۱ هدف تکمیل شده</span>
            <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded border border-amber-100">۲ هدف در حال پیشرفت</span>
          </div>
        </div>

        {/* Objective Tracker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Obj 1 */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black text-slate-800 text-sm">عنوان هدف: کاهش وقوع جرم (۲۰٪)</h4>
                <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold mt-2.5 inline-block">
                  رسیدن به امتیاز بالای ۹۰ در دوره بعد
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 py-1.5 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px]">✓</div>
                  <span>حضور در یک دوره آموزش تخصصی</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 py-1.5 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                  <span>کاهش ۵ درصدی میزان وقوع جرم در محدوده</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-400 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                  <span>ثبت زمان رسیدن سر صحنه کمتر از ۳ دقیقه</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
            </div>
          </div>

          {/* Obj 2 */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black text-slate-800 text-sm">عنوان هدف: میزان رضایت شاکیان</h4>
                <span className="text-[10px] text-indigo-600 bg-indigo-100 px-2.5 py-0.5 rounded-full font-bold mt-2.5 inline-block">
                  ارتقای مهارت‌های کلامی در مواجهه با حادثه‌دیدگان
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 py-1.5 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px]">✓</div>
                  <span>حضور در یک دوره آموزش تخصصی</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-400 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                  <span>بررسی پرونده‌های قبلی شاکیان با حضور ارزیاب</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible / Detailed Metrics Table (کارنامه عملکردی) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 gap-4">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" /> ریز نمرات عارضه‌یابی و کارنامه عملکردی
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">در این جدول می‌توانید در بخش عارضه‌یابی روی دکمه "خود اظهاری" کلیک کنید.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsObjectionOpen(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <AlertCircle className="w-4 h-4" />
              <span>ثبت اعتراض</span>
            </button>
            <button className="bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-900 transition flex items-center gap-1.5 shadow-sm">
              <Download className="w-4 h-4" />
              <span>دانلود کارنامه</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="p-4 font-bold text-right">شرح شاخص</th>
                <th className="p-4 font-bold text-center">اولویت</th>
                <th className="p-4 font-bold text-center">وزن شاخص</th>
                <th className="p-4 font-bold text-center">نتیجه</th>
                <th className="p-4 font-bold text-center">نتیجه فصل قبل</th>
                <th className="p-4 font-bold text-center">حد معمول</th>
                <th className="p-4 font-bold text-center">متوسط سازمان</th>
                <th className="p-4 font-bold text-center">نمره</th>
                <th className="p-4 font-bold text-center">ملاک</th>
                <th className="p-4 font-bold text-center">اقدام / عارضه‌یابی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {metrics.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-800 whitespace-nowrap text-right">{row.title}</td>
                  <td className="p-4 text-slate-500 text-center">{row.priority}</td>
                  <td className="p-4 text-slate-500 text-center">{row.weight}</td>
                  <td className="p-4 text-slate-800 text-center font-bold font-mono">{row.result}</td>
                  <td className="p-4 text-slate-600 text-center font-mono">{row.lastSeason}</td>
                  <td className="p-4 text-slate-600 text-center font-mono">{row.target}</td>
                  <td className="p-4 text-slate-600 text-center font-mono">{row.orgAvg}</td>
                  <td className="p-4 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold font-mono">{row.score}</span>
                  </td>
                  <td className="p-4 text-slate-500 text-center text-[10px]">{row.criterion}</td>
                  <td className="p-4">
                    <div className="flex gap-1.5 justify-center">
                      {row.actions
                        .filter(act => {
                          // مربی حذف شود
                          if (act.label === "مربی") return false;
                          // هنگام بودن کمیسیون آموزش حذف شود زیرا فرد به کمیسیون رسیده
                          const hasCommission = row.actions.some(a => a.label === "کمیسیون");
                          if (hasCommission && act.label === "آموزش") return false;
                          return true;
                        })
                        .map((act, idx) => (
                        <button
                          key={idx}
                          disabled={act.label === "ثبت شده"}
                          onClick={() => {
                            if (act.label === "خود اظهاری") {
                              setIsSelfAssessmentOpen(true);
                              setSelfAssessmentMetricId(row.id);
                            } else if (act.label === "آموزش") {
                              // Dynamically generate recommendation based on metric title
                              const course = row.title.includes("حضور") 
                                ? { title: "مدیریت زمان و پویایی در خدمت کلانتری", desc: "آموزش متدهای نوین استقرار گشت، حضور فعال در گشت‌زنی‌های منظم سیستماتیک و بهینه‌سازی ورود و خروج سیستمی.", duration: "۶ ساعت" }
                                : row.title.includes("هدف")
                                ? { title: "استراتژی‌های گشت‌زنی هوشمند و ماموریتی", desc: "تکنیک‌های تعامل بهینه با مرکز فرماندهی و کشف پیشگیرانه جرایم در مناطق پرخطر کلانتری به صورت هدفمند.", duration: "۱۰ ساعت" }
                                : { title: "کاهش زمان واکنش در ماموریت‌های فوری و گشت ۱۱۰", desc: "این دوره با هدف افزایش هماهنگی گشت‌های موتوری و خودرویی جهت حضور فوری در صحنه تصادفات یا سرقت‌ها طراحی شده است.", duration: "۸ ساعت" };
                              setRecommendedCourse(course);
                            } else if (act.label === "کمیسیون") {
                              setObjectionScope(row.title);
                              setBottomTab("objections");
                              setIsObjectionOpen(true);
                            }
                          }}
                          title={act.label === "کمیسیون" ? "ارجاع به کمیسیون عالی رسیدگی - آموزش حذف شده است" : undefined}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold text-white transition-all ${
                            act.label === "خود اظهاری"
                              ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                              : act.label === "ثبت شده"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed font-black"
                              : act.label === "آموزش"
                                ? "bg-[#4455A5] hover:bg-indigo-700 cursor-pointer"
                                : act.label === "کمیسیون"
                                ? "bg-rose-600 hover:bg-rose-700 cursor-pointer shadow-xs"
                                : "bg-slate-500 hover:bg-slate-600 cursor-pointer"
                          }`}
                        >
                          {act.label}
                        </button>
                      ))}
                      {row.actions.filter(a => a.label !== "مربی" && !(row.actions.some(x => x.label === "کمیسیون") && a.label === "آموزش")).length === 0 && (
                        <span className="text-slate-400 font-normal">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Attendance Summary & Latest Requests/Objections (Figma Bottom Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attendance Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 mb-5">
              خلاصه وضعیت حضور و غیاب و مرخصی
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>تشویقی های استفاده شده</span>
                  <span className="font-mono">۶ از ۱۲ روز (۵۰٪)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>استحقاقی‌های استفاده شده</span>
                  <span className="font-mono">۲ از ۳۰ روز (۶٪)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "6%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>استعلاجی‌های استفاده شده</span>
                  <span className="font-mono">۲۰ از ۲۴ روز (۸۳٪)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "83%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center border-t border-slate-100 mt-6">
            <Link to="/attendance" className="text-xs font-bold text-[#4455A5] hover:underline">جزئیات بیشتر حضور و غیاب</Link>
          </div>
        </div>

        {/* Stateful Latest Requests & Objections List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setBottomTab("requests")}
                  className={`text-sm font-bold pb-2 transition ${
                    bottomTab === "requests" 
                      ? "text-slate-800 border-b-2 border-indigo-600" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  وضعیت آخرین درخواست‌ها
                </button>
                <button
                  onClick={() => setBottomTab("objections")}
                  className={`text-sm font-bold pb-2 transition flex items-center gap-1.5 ${
                    bottomTab === "objections" 
                      ? "text-slate-800 border-b-2 border-indigo-600" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  اعتراضات ثبت‌شده عملکردی
                  {objectionsList.length > 0 && (
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                      {objectionsList.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {bottomTab === "requests" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="py-2.5 font-bold">نوع درخواست</th>
                      <th className="py-2.5 font-bold text-center">تاریخ ثبت</th>
                      <th className="py-2.5 font-bold text-center">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-3 text-slate-800">نامه اشتغال به کار</td>
                      <td className="py-3 text-center font-mono">۱۴۰۵/۰۲/۰۸</td>
                      <td className="py-3 text-center">
                        <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-100">در حال بررسی</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-800">درخواست وام ضروری</td>
                      <td className="py-3 text-center font-mono">۱۴۰۵/۰۱/۰۶</td>
                      <td className="py-3 text-center">
                        <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-100">در حال پیگیری</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-800">تغییر شماره حساب حقوق</td>
                      <td className="py-3 text-center font-mono">۱۴۰۵/۰۱/۰۵</td>
                      <td className="py-3 text-center">
                        <span className="bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-100">رد شده</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-slate-800">تغییر کلمه عبور پیشخوان</td>
                      <td className="py-3 text-center font-mono">۱۴۰۵/۰۱/۰۴</td>
                      <td className="py-3 text-center">
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100">نهایی شده</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="py-2.5 font-bold">بخش مورد اعتراض</th>
                      <th className="py-2.5 font-bold">علت اعتراض</th>
                      <th className="py-2.5 font-bold text-center">تاریخ</th>
                      <th className="py-2.5 font-bold text-center">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {objectionsList.map(obj => (
                      <tr key={obj.id}>
                        <td className="py-3 text-slate-800">{obj.scope}</td>
                        <td className="py-3 text-slate-600 max-w-[150px] truncate" title={obj.details}>{obj.reason}</td>
                        <td className="py-3 text-center font-mono text-slate-500">{obj.date}</td>
                        <td className="py-3 text-center">
                          <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-100">
                            {obj.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-4 text-center border-t border-slate-100">
            <Link to="/service-desk/requests" className="text-xs font-bold text-[#4455A5] hover:underline">پیگیری تمامی درخواست‌ها و مکاتبات</Link>
          </div>
        </div>

      </div>
      </>
      )}

      {/* Self-Assessment Modal (Figma Image 6) */}
      {isSelfAssessmentOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-base">
                خوداظهاری - میانگین مدت زمان رسیدن سر صحنه از زمان تایید هدف
              </h3>
              <button
                onClick={() => setIsSelfAssessmentOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmitSelfAssessment} className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed text-justify">
                شما می‌توانید اظهاریه خود را در این بخش ثبت نمایید. لطفاً متن مورد نظر خود را با دقت و به صورت کامل وارد کنید تا در ادامه توسط کارشناسان بررسی و مورد رسیدگی قرار گیرد.
              </p>

              {/* Checklist list */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {[
                  "بی توجهی به الگوهای زمانی وقوع جرم",
                  "استفاده نکردن از ابزارهای تحلیلی گشت",
                  "تعامل ضعیف بهبود با سایر تیم ها",
                  "ناتوانی در تشخیص تهدیدهای محیطی",
                  "عدم طراحی مسیر گشت براساس جرم خیزی",
                  "ضعف در تحلیل داده‌های جرائم گذشته",
                  "نگرش صرفاً واکنشی به مأموریت",
                  "سایر",
                ].map((reason, idx) => {
                  const isChecked = selectedReasons.includes(reason);
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition select-none text-xs font-bold text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleReason(reason)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span>{reason}</span>
                    </label>
                  );
                })}
              </div>

              {/* Textarea */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  متن خوداظهاری *
                </label>
                <textarea
                  rows={4}
                  required
                  value={selfAssessmentText}
                  onChange={(e) => setSelfAssessmentText(e.target.value)}
                  placeholder="اینجا بنویسید..."
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsSelfAssessmentOpen(false)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-lg text-xs font-bold transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-8 py-2 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  ذخیره
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Objection Modal (Figma Image 2) */}
      {isObjectionOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 text-base">ثبت اعتراض</h3>
              <button
                onClick={() => setIsObjectionOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <p className="text-xs text-slate-500 leading-relaxed text-justify bg-amber-50 border border-amber-200 rounded-lg p-3">
                شما می‌توانید اعتراض خود را بر روی یک شاخص عملکردی یا کل امتیاز عملکردی یا هر فصل، تنها ثبت یک اعتراض مجاز است و اعتراضات بعدی در کمیسیون‌ها بررسی خواهد شد.
              </p>

              {/* Scope Dropdown */}
              <div className="space-y-2 text-right">
                <label className="block text-xs font-bold text-slate-700">محل اعتراض عملکردی</label>
                <select 
                  value={objectionScope}
                  onChange={(e) => setObjectionScope(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="کل عملکرد">کل عملکرد</option>
                  <option value="شاخص‌های رفتاری">شاخص‌های رفتاری</option>
                  <option value="شاخص‌های عملکردی">شاخص‌های عملکردی</option>
                  <option value="شاخص‌های نتیجه‌ای">شاخص‌های نتیجه‌ای</option>
                  <option value="میانگین مدت زمان رسیدن سر صحنه">میانگین مدت زمان رسیدن سر صحنه</option>
                </select>
              </div>

              {/* Reason Dropdown */}
              <div className="space-y-2 text-right">
                <label className="block text-xs font-bold text-slate-700">علت اعتراض</label>
                <select 
                  value={objectionReason}
                  onChange={(e) => setObjectionReason(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="کمبود یا خرابی تجهیزات">کمبود یا خرابی تجهیزات</option>
                  <option value="ترافیک سنگین منطقه">ترافیک سنگین منطقه</option>
                  <option value="نقص در سامانه هوشمند GPS">نقص در سامانه هوشمند GPS</option>
                  <option value="دلایل شخصی و خانوادگی">دلایل شخصی و خانوادگی</option>
                </select>
              </div>

              {/* Details Textarea */}
              <div className="space-y-2 text-right">
                <label className="block text-xs font-bold text-slate-700">جزئیات اعتراض</label>
                <textarea
                  rows={4}
                  value={objectionDetails}
                  onChange={(e) => setObjectionDetails(e.target.value)}
                  placeholder="جزئیات اعتراض خود را وارد نمایید."
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsObjectionOpen(false)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-lg text-xs font-bold transition"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleSaveObjection}
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-8 py-2 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  ذخیره
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Course Recommendation Modal */}
      {recommendedCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-indigo-50 border-b border-indigo-100 py-4 px-6 flex justify-between items-center">
              <h3 className="font-extrabold text-[#4455A5] text-base flex items-center gap-2">
                <Award className="w-5 h-5" /> دوره آموزشی پیشنهادی سامانه
              </h3>
              <button
                onClick={() => setRecommendedCourse(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4 text-right">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-slate-800 text-sm">{recommendedCourse.title}</h4>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded font-black font-mono shrink-0 mr-2">
                  مدت: {recommendedCourse.duration}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed text-justify">
                {recommendedCourse.desc}
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-[10px] text-amber-800 font-bold leading-relaxed">
                گذراندن این دوره برای ارتقای نمره شاخص عملکردی مربوطه و افزایش حقوق و مزایای فصلی شما اکیداً توصیه می‌شود.
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRecommendedCourse(null)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2 rounded-lg text-xs font-bold transition"
                >
                  بستن
                </button>
                <Link
                  to="/training"
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-xs font-bold transition shadow-sm text-center"
                >
                  ثبت نام و شروع دوره
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function EvaluatorView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [evaluatingEmployee, setEvaluatingEmployee] = useState<{id: number, name: string, code: string, status: string, statusText: string, lastScore: string, rank: string} | null>(null);
  const [evaluatorSuccess, setEvaluatorSuccess] = useState<string | null>(null);

  // Stateful evaluation list
  const [evaluationList, setEvaluationList] = useState([
    { id: 1, name: "علی کریمی", code: "۴۵۸۹۶۲", status: "pending", statusText: "در انتظار ارزیابی", lastScore: "-", rank: "گروهبان یکم" },
    { id: 2, name: "محمد حسینی", code: "۱۲۴۵۶۷", status: "completed", statusText: "تکمیل شده", lastScore: "۸۸", rank: "استوار دوم" },
    { id: 3, name: "رضا احمدی", code: "۹۸۷۶۵۴", status: "in_progress", statusText: "در حال ارزیابی", lastScore: "۷۵", rank: "استوار یکم" },
    { id: 4, name: "حسین مرادی", code: "۳۴۵۶۷۸", status: "pending", statusText: "در انتظار ارزیابی", lastScore: "-", rank: "گروهبان یکم" },
    { id: 5, name: "مهدی طارمی", code: "۴۵۶۷۸۹", status: "completed", statusText: "تکمیل شده", lastScore: "۹۲", rank: "ستوان سوم" },
    { id: 6, name: "امیر عابدزاده", code: "۵۶۷۸۹۰", status: "pending", statusText: "در انتظار ارزیابی", lastScore: "-", rank: "استوار دوم" },
  ]);
  // Slider state
  const [sliderScores, setSliderScores] = useState<Record<string, number>>({
    "رعایت نظم و حضور و غیاب": 3,
    "نحوه برخورد با ارباب رجوع": 3,
    "آراستگی ظاهری و رعایت شئونات": 3,
    "سرعت عمل در انجام ماموریت‌ها": 3,
    "کیفیت گزارش‌نویسی و مستندسازی": 3,
    "میزان موفقیت در کشف جرم": 3
  });

  const [strengthText, setStrengthText] = useState("");
  const [weaknessText, setWeaknessText] = useState("");

  const filteredList = evaluationList.filter(item => {
    const matchesSearch = item.name.includes(searchTerm) || item.code.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
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

    setEvaluatorSuccess(`ارزیابی عملکرد جناب آقای "${evaluatingEmployee.name}" با موفقیت ثبت شد. امتیاز: ${scoreVal} از ۱۰۰`);
    setEvaluatingEmployee(null);
    setStrengthText("");
    setWeaknessText("");
    setSliderScores({
      "رعایت نظم و حضور و غیاب": 3,
      "نحوه برخورد با ارباب رجوع": 3,
      "آراستگی ظاهری و رعایت شئونات": 3,
      "سرعت عمل در انجام ماموریت‌ها": 3,
      "کیفیت گزارش‌نویسی و مستندسازی": 3,
      "میزان موفقیت در کشف جرم": 3
    });

    setTimeout(() => setEvaluatorSuccess(null), 5000);
  };

  if (evaluatingEmployee) {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6" dir="rtl">

         <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
             <div className="flex items-center gap-4">
                <button onClick={() => setEvaluatingEmployee(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                   <ChevronRight className="w-5 h-5 text-slate-500" />
                </button>
                <div>
                   <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                     ثبت ارزیابی عملکرد
                   </h2>
                   <div className="text-slate-500 text-sm mt-1 flex items-center gap-3">
                     <span>{evaluatingEmployee.name}</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <span>کد: {evaluatingEmployee.code}</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <span>{evaluatingEmployee.rank}</span>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-3">
               <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
                 دوره ارزیابی: تابستان ۱۴۰۵
               </span>
             </div>
          </div>
          
          <div className="space-y-8">
             <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 leading-relaxed">
                   <strong>توجه:</strong> امتیازات ثبت شده در این فرم مستقیما در نهایی‌سازی امتیاز رفاهی و دوره‌های آموزشی کارکنان تاثیرگذار خواهد بود. لطفا در ثبت امتیازات دقت لازم را به عمل آورید.
                </div>
             </div>

             {[
               { title: "شاخص‌های انضباطی و رفتاری", items: ["رعایت نظم و حضور و غیاب", "نحوه برخورد با ارباب رجوع", "آراستگی ظاهری و رعایت شئونات"] },
               { title: "شاخص‌های عملکردی و ماموریتی", items: ["سرعت عمل در انجام ماموریت‌ها", "کیفیت گزارش‌نویسی و مستندسازی", "میزان موفقیت در کشف جرم"] }
             ].map((section, idx) => (
                <div key={idx} className="space-y-4">
                   <h3 className="font-bold text-slate-800 text-base">{section.title}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item, itemIdx) => (
                         <div key={itemIdx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-right">
                            <div className="flex justify-between items-center mb-3">
                              <label className="block text-sm font-semibold text-slate-700">{item}</label>
                              <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-black">
                                {sliderScores[item] || 3} / ۵
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                               <span className="text-xs text-slate-500 font-medium">نیاز به بهبود (۱)</span>
                               <input 
                                 type="range" 
                                 min="1" 
                                 max="5" 
                                 value={sliderScores[item] || 3}
                                 onChange={(e) => handleSliderChange(item, parseInt(e.target.value))}
                                 className="flex-1 accent-indigo-600 cursor-pointer" 
                               />
                               <span className="text-xs text-emerald-600 font-medium">عالی (۵)</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             ))}

             <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base">ثبت نقاط قوت و قابل بهبود (اختیاری)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">نقاط قوت برجسته</label>
                      <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm min-h-[100px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-right resize-none" placeholder="مثال: دقت بالا در تکمیل پرونده‌ها..." value={strengthText} onChange={(e) => setStrengthText(e.target.value)}></textarea>
                   </div>
                   <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">زمینه‌های نیازمند توسعه</label>
                      <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm min-h-[100px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-right resize-none" placeholder="مثال: نیاز به آموزش بیشتر در زمینه تیراندازی..." value={weaknessText} onChange={(e) => setWeaknessText(e.target.value)}></textarea>
                   </div>
                </div>
             </div>

             <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button onClick={() => setEvaluatingEmployee(null)} className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                   انصراف
                </button>
                <button onClick={handleSaveEvaluation} className="px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                   ثبت نهایی ارزیابی
                </button>
             </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      
      {/* Top metrics for evaluator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">کل کارکنان تحت ارزیابی</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۷۰</div>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
            <Users className="w-7 h-7" />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">ارزیابی‌های تکمیل شده</div>
            <div className="text-3xl font-black text-emerald-600 mt-2">۴۵</div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">نیاز به پیگیری</div>
            <div className="text-3xl font-black text-amber-600 mt-2">۱۰</div>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl">
            <Flag className="w-7 h-7" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-indigo-500" /> وضعیت پیشرفت ارزیابی‌ها
          </h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EVALUATION_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {EVALUATION_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#1e293b', fontWeight: 600}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {EVALUATION_STATUS_DATA.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" /> میانگین امتیازات شاخص‌ها در واحدهای مختلف
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'انضباطی', واحد۱: 85, واحد۲: 90 },
                  { name: 'عملیاتی', واحد۱: 70, واحد۲: 85 },
                  { name: 'آموزشی', واحد۱: 90, واحد۲: 75 },
                  { name: 'رفتاری', واحد۱: 88, واحد۲: 82 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="واحد۱" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="واحد۲" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b border-slate-100 pb-6">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-500" /> لیست کارکنان جهت ارزیابی
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
             <div className="relative w-full sm:w-64">
               <input 
                 type="text" 
                 placeholder="جستجو نام یا کد پرسنلی (کارکنان)..." 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
               <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
             </div>
             
             <div className="relative w-full sm:w-auto">
                <select 
                  className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                   <option value="all">همه وضعیت‌ها</option>
                   <option value="pending">در انتظار ارزیابی</option>
                   <option value="in_progress">در حال ارزیابی</option>
                   <option value="completed">تکمیل شده</option>
                </select>
                <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="p-4 font-semibold">نام کارکنان</th>
                <th className="p-4 font-semibold">کد کارکنان</th>
                <th className="p-4 font-semibold">درجه</th>
                <th className="p-4 font-semibold">وضعیت ارزیابی</th>
                <th className="p-4 font-semibold">آخرین نمره</th>
                <th className="p-4 font-semibold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredList.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">{emp.name}</td>
                  <td className="p-4 text-slate-500">{emp.code}</td>
                  <td className="p-4 text-slate-500">{emp.rank}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      emp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      emp.status === 'in_progress' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {emp.statusText}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-500">
                    {emp.lastScore !== '-' ? <span className="font-black text-indigo-600">{emp.lastScore}</span> : '-'}
                  </td>
                  <td className="p-4 text-center">
                    {emp.status === 'completed' ? (
                      <button className="bg-slate-50 text-slate-600 hover:bg-slate-100 font-semibold text-xs px-4 py-2 rounded-lg transition shadow-sm border border-slate-200">
                        مشاهده جزئیات
                      </button>
                    ) : (
                      <button 
                        onClick={() => setEvaluatingEmployee(emp)}
                        className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs px-4 py-2 rounded-lg transition shadow-sm"
                      >
                        {emp.status === 'in_progress' ? 'ادامه ارزیابی' : 'ثبت ارزیابی'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                 <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                       هیچ موردی با این مشخصات یافت نشد.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ManagerView() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">میانگین نمره واحد (بهار)</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۷۶</div>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
            📊
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">کارکنان ارزیابی شده</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۴۵ <span className="text-sm font-medium text-slate-500">از ۵۰</span></div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl">
            👥
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">رتبه واحد در استان</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۴ <span className="text-sm font-medium text-emerald-500">↑ ۲ پله رشد</span></div>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl">
            🏆
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-500" /> روند عملکرد زیرمجموعه‌ها در ۶ ماه گذشته
             </h3>
           </div>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={UNIT_PERFORMANCE_TREND} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#64748b", fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#64748b", fontWeight: 500 }} dx={-10} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                    itemStyle={{fontWeight: 'bold'}}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '15px' }} />
                  <Line type="monotone" dataKey="کلانتری۱" stroke="#6366f1" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="کلانتری۲" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="کلانتری۳" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
             <Flag className="w-5 h-5 text-indigo-500" /> کارکنان برتر یگان
           </h3>
           <div className="space-y-4 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 1 ? 'bg-amber-100 text-amber-700' : i === 2 ? 'bg-slate-200 text-slate-700' : i === 3 ? 'bg-amber-700/20 text-amber-900' : 'bg-indigo-50 text-indigo-700'}`}>
                      {i}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">نام نیروی منتخب {i}</div>
                      <div className="text-[10px] text-slate-500">کد: {1000 + i}</div>
                    </div>
                  </div>
                  <div className="font-black text-indigo-600 text-base">
                    {95 - i * 3}
                  </div>
                </div>
              ))}
           </div>
        </motion.div>
      </div>
      
      {/* Unit Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
             <Target className="w-5 h-5 text-indigo-500" /> توزیع نمرات در سطح یگان
           </h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                  { name: 'عالی (۹۰-۱۰۰)', value: 15, color: '#10b981' },
                  { name: 'خوب (۷۵-۸۹)', value: 45, color: '#6366f1' },
                  { name: 'متوسط (۶۰-۷۴)', value: 25, color: '#f59e0b' },
                  { name: 'نیازمند بهبود', value: 15, color: '#ef4444' },
                ]} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} width={90} />
                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {[1, 2, 3, 4].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#10b981', '#6366f1', '#f59e0b', '#ef4444'][index % 4]} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" /> ارزیابان برتر
            </h3>
            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold">مشاهده همه</button>
          </div>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                     {i}
                   </div>
                   <div>
                     <div className="font-bold text-slate-800">ارزیاب نمونه {i}</div>
                     <div className="text-xs text-slate-500">تعداد ارزیابی: {120 - i * 15}</div>
                   </div>
                 </div>
                 <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                   ۱۰۰٪ تکمیل
                 </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}

export function PerformancePage() {
  const { role } = useRole();
  if (role === 'evaluator') return <EvaluatorView />;
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
