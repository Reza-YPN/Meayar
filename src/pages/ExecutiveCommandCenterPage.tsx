import React, { useState } from "react";
import { 
  Building2, 
  Sparkles, 
  Layers, 
  Database, 
  Activity, 
  BrainCircuit, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  CheckCircle2, 
  Search, 
  Filter, 
  Users, 
  GraduationCap, 
  Clock, 
  BarChart3, 
  Send, 
  ChevronRight, 
  HelpCircle,
  FileCheck,
  Check,
  RefreshCw,
  MapPin,
  Flame,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDecisionSupport } from "../hooks/useDecisionSupport";
import { ExcelDataIngestionModal } from "../components/ExcelDataIngestionModal";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  LineChart, 
  Line, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from "recharts";

const ARCHITECTURE_LAYERS = [
  {
    id: 1,
    title: "لایه اول: سرمایه انسانی",
    subtitle: "Human Capital Dossiers",
    desc: "پرونده جامع ۳۶۰ درجه کارکنان، مهارت‌ها، سوابق یگانی، رسته و پروفایل هویتی یکپارچه.",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    stats: "۱۲۴,۵۰۰ کارمند فعال"
  },
  {
    id: 2,
    title: "لایه دوم: فرآیندهای منابع انسانی",
    subtitle: "HR Core Workflows",
    desc: "ارزیابی عملکرد، ماتریس شایستگی، مسیر شغلی، آموزش و توسعه، جبران خدمات و سلامت.",
    icon: Layers,
    color: "from-indigo-500 to-violet-600",
    stats: "۸ فرآیند متصل"
  },
  {
    id: 3,
    title: "لایه سوم: داده و یکپارچگی",
    subtitle: "Data Catalog & Ingestion",
    desc: "دیتا کاتالوگ، اتصال به وب‌سرویس‌ها (API) و ورود مستقیم داده‌ها از سامانه‌ها و اکسل.",
    icon: Database,
    color: "from-violet-500 to-purple-600",
    stats: "۹۹.۸٪ همگام‌سازی لحظه‌ای"
  },
  {
    id: 4,
    title: "لایه چهارم: موتور تحلیل داده",
    subtitle: "Multi-Factor Analytics",
    desc: "شاخص‌های کلیدی عملکرد (KPI)، تحلیل همبستگی چندعاملی، روندهای فصلی و نقشه جغرافیایی.",
    icon: Activity,
    color: "from-purple-500 to-pink-600",
    stats: "۴۲ شاخص ارزیابی"
  },
  {
    id: 5,
    title: "لایه پنجم: هوش مصنوعی و تصمیمیار",
    subtitle: "AI Root-Cause & Recommendations",
    desc: "شناسایی الگوها، ریشه‌یابی افت عملکرد، پیش‌بینی شکاف مهارتی و ارائه پیشنهادات تصمیم‌گیری به انسان.",
    icon: BrainCircuit,
    color: "from-emerald-500 to-teal-600",
    stats: "دقت ۹۴٪ در کشف الگو"
  },
  {
    id: 6,
    title: "لایه ششم: مرکز فرماندهی و مدیریت",
    subtitle: "Executive Command Center",
    desc: "داشبورد کلان تصمیم‌گیری سلسله‌مراتبی با امکان کاوش (Drill-Down) از سطح کلان کشوری به سطح خرد یگان.",
    icon: ShieldCheck,
    color: "from-amber-500 to-orange-600",
    stats: "دید کلان به خرد"
  }
];

const UNIT_PERFORMANCE_DATA = [
  { unit: "کلانتری ۱۰۱ تجریش", performance: 88, trainingHours: 42, turnover: 4, satisfaction: 91, overtimeHours: 24 },
  { unit: "کلانتری ۱۰۳ قلهک", performance: 62, trainingHours: 18, turnover: 26, satisfaction: 68, overtimeHours: 64 },
  { unit: "کلانتری ۱۰۵ سنایی", performance: 84, trainingHours: 38, turnover: 8, satisfaction: 87, overtimeHours: 30 },
  { unit: "یگان امداد فاتب", performance: 92, trainingHours: 48, turnover: 5, satisfaction: 94, overtimeHours: 28 },
  { unit: "پلیس راهور منطقه ۱", performance: 79, trainingHours: 32, turnover: 12, satisfaction: 80, overtimeHours: 45 },
  { unit: "کلانتری ۱۰۶ نامجو", performance: 71, trainingHours: 22, turnover: 18, satisfaction: 74, overtimeHours: 52 },
];

const ROOT_CAUSE_SCENARIOS = [
  {
    id: "sc-1",
    question: "چرا عملکرد کلانتری ۱۰۳ در فصل پاییز ۱۲٪ افت کرده است؟",
    unit: "کلانتری ۱۰۳ قلهک",
    primaryFactors: [
      { label: "افت نمرات عملکردی", value: "-۱۲٪", status: "negative" },
      { label: "شکاف مهارتی در ۳ شاخص کلیدی", value: "ارتباطی، تعقیب، صورتجلسه", status: "negative" },
      { label: "کاهش پوشش آموزش‌های ضمن خدمت", value: "-۵۵٪", status: "negative" },
      { label: "افزایش جابه‌جایی و انتقال نیروها", value: "+۳۵٪", status: "negative" },
      { label: "اضافه‌کار بیش از حد و خستگی مزمن", value: "+۶۴ ساعت/ماه", status: "negative" }
    ],
    aiAnalysis: "کاهش عملکرد این کلانتری ناشی از یک عامل منفرد نیست، بلکه حاصل همبستگی ۳ عامل زنجیره‌ای است: ۱) جابه‌جایی ناگهانی ۷ نیروی باتجربه و ورود نیروهای جدید بدون طی دوره بدو ورود. ۲) شیفت‌های فشرده و اضافه‌کار سنگین که مانع شرکت کارکنان در دوره‌های آموزشی ارتباط موثر و مستندسازی شده است. ۳) در نتیجه، درصد رضایت شاکیان و سرعت حضور در صحنه کاهش یافته است.",
    aiRecommendations: [
      { id: "rec-1", title: "تثبیت فوری کادر و توقف انتقالات غیرضروری تا پایان فصل", priority: "فوری", approved: false },
      { id: "rec-2", title: "برگزاری کارگاه فشرده مهارتی ۳ روزه در محل کلانتری (کاهش شکاف ارتباطی و گزارش‌نویسی)", priority: "اولویت بالا", approved: false },
      { id: "rec-3", title: "تعدیل شیفت‌های شبانه با تزریق نیروهای کمکی از یگان امداد", priority: "متوسط", approved: false }
    ]
  },
  {
    id: "sc-2",
    question: "پیش‌بینی نیازهای آموزشی اولویت‌دار پلیس راهور در ۶ ماه آینده چیست؟",
    unit: "پلیس راهور و گشت جاده‌ای",
    primaryFactors: [
      { label: "تغییر سامانه ثبت تخلفات و هوشمندسازی", value: "سامانه جدید نسخه ۴", status: "neutral" },
      { label: "شکاف شایستگی تخصصی کشف شده", value: "کاربری تجهیزات الکترونیکی", status: "negative" },
      { label: "پیش‌بینی اضافه بار ترافیکی", value: "+۲۰٪ در سفرهای نوروزی", status: "neutral" }
    ],
    aiAnalysis: "ماتریس شایستگی نشان می‌دهد ۶۴٪ از افسران کادر راهور در بخش کاربری دوربین‌های پلاک‌خوان هوشمند و سامانه‌های نوین کروکی الکترونیک نیازمند مهارت‌افزایی هستند. عدم برگزاری دوره قبل از تعطیلات منجر به کندی در صدور کروکی و افت رضایت عمومی خواهد شد.",
    aiRecommendations: [
      { id: "rec-4", title: "تصویب دوره جامع ۲۴ ساعته «کروکی الکترونیک و سامانه هوشمند کنترل ترافیک»", priority: "فوری", approved: false },
      { id: "rec-5", title: "اعطای امتیاز رفاهی تشویقی به افسران گذراننده دوره تا پایان ماه", priority: "اولویت بالا", approved: false }
    ]
  }
];

export function ExecutiveCommandCenterPage() {
  const { 
    unitRecords, 
    activeInsight, 
    approveProposal, 
    approvedProposals,
    setIsIngestionModalOpen,
    downloadSampleTemplate
  } = useDecisionSupport();

  const [selectedTab, setSelectedTab] = useState<"layers" | "diagnostic" | "units" | "data">("diagnostic");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("sc-1");
  const [scenarios, setScenarios] = useState(ROOT_CAUSE_SCENARIOS);
  const [customQuestion, setCustomQuestion] = useState("");
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const activeScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  const handleApproveRecommendation = (recId: string) => {
    setScenarios(prev => prev.map(s => {
      if (s.id !== activeScenario.id) return s;
      return {
        ...s,
        aiRecommendations: s.aiRecommendations.map(r => r.id === recId ? { ...r, approved: !r.approved } : r)
      };
    }));

    setToastMessage("دستور اجرایی به معاونت مربوطه ابلاغ و در کارتابل سازمانی ثبت گردید.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsProcessingAI(true);
    setTimeout(() => {
      setIsProcessingAI(false);
      const newScenario = {
        id: `sc-${Date.now()}`,
        question: customQuestion,
        unit: "تحلیل یکپارچه یگانی فراجا",
        primaryFactors: [
          { label: "همبستگی عملکرد با آموزش", value: "ضریب ۰.۷۸", status: "positive" },
          { label: "تاثیر اضافه‌کار بر خطاها", value: "+۴۲٪ احتمال خطا در شیفت بالای ۱۲ ساعت", status: "negative" },
          { label: "شاخص رضایت شهروندی", value: "۸۴٪ میانگین", status: "neutral" }
        ],
        aiAnalysis: `سامانه هوشمند با تجمیع داده‌های پرونده انسانی، ساعات حضور و غیاب، نتایج ارزیابی عملکرد و ماتریس شایستگی نشان می‌دهد که پرسش «${customQuestion}» مستقیماً به الگوی توزیع ساعات آموزشی و مدیریت شیفت‌های ممتد وابسته است. با ارتقای شایستگی‌های محوری، نرخ بهره‌وری تا ۱۸٪ قابل افزایش است.`,
        aiRecommendations: [
          { id: `rec-${Date.now()}-1`, title: "تنظیم مجدد تقویم آموزشی یگان بر پایه زمان‌های کم‌فشار", priority: "اولویت بالا", approved: false },
          { id: `rec-${Date.now()}-2`, title: "تخصیص بسته انگیزشی رفاهی به نفرات ممتاز در شاخص‌های نتیجه‌محور", priority: "متوسط", approved: false }
        ]
      };

      setScenarios(prev => [newScenario, ...prev]);
      setSelectedScenarioId(newScenario.id);
      setCustomQuestion("");
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
      setToastMessage(`فایل ${e.target.files[0].name} با موفقیت بارگذاری شد و در لایه داده کاتالوگ گردید.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Success Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold bg-indigo-950/80 px-3 py-1.5 rounded-full border border-indigo-800/60 w-fit">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span>سکوی یکپارچه و تصمیمیار هوشمند سرمایه انسانی فراجا</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              مرکز فرماندهی و تصمیم‌یار هوشمند مدیران
            </h1>
            <p className="text-slate-300 text-xs lg:text-sm max-w-3xl leading-relaxed">
              تحول از یک داشبورد اطلاعاتی ساده به یک سکوی تصمیم‌یار؛ تجمیع داده‌های عملکرد، شایستگی، آموزش، حضور و غیاب و جابه‌جایی نیروها برای کشف الگوها و ریشه‌یابی مسائل سازمانی با حفظ محوریت تصمیم انسانی.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-center px-4 border-l border-white/10">
              <div className="text-xl font-black text-emerald-400">۶ لایه</div>
              <div className="text-[11px] text-slate-400 font-bold">معماری سکو</div>
            </div>
            <div className="text-center px-4 border-l border-white/10">
              <div className="text-xl font-black text-amber-400">۱۱ گام</div>
              <div className="text-[11px] text-slate-400 font-bold">فرآیند یکپارچه</div>
            </div>
            <div className="text-center px-4">
              <div className="text-xl font-black text-indigo-400">۱۰۰٪</div>
              <div className="text-[11px] text-slate-400 font-bold">تصمیم‌گیری انسانی</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1 border-t border-slate-800 pt-6">
          {[
            { id: "diagnostic", label: "موتور ریشه‌یابی و تصمیمیار هوشمند (AI Engine)", icon: BrainCircuit },
            { id: "layers", label: "معماری ۶ لایه سکوی هوشمند", icon: Layers },
            { id: "units", label: "تحلیل مقایسه‌ای چندعاملی یگان‌ها", icon: Activity },
            { id: "data", label: "ورود داده از اکسل / وب‌سرویس (Data Hub)", icon: Database },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: AI Root-Cause Diagnostic & Decision Support */}
      {selectedTab === "diagnostic" && (
        <div className="space-y-6">
          {/* Real AI Scenario Showcase */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <BrainCircuit className="w-6 h-6 text-indigo-600" />
                  موتور ریشه‌یابی چندعاملی هوش مصنوعی (Multi-Factor Root Cause)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  سامانه به جای گزارش صرف درصدها، داده‌های پراکنده عملکرد + شایستگی + آموزش + حضور و غیاب + جابه‌جایی را به هم پیوند می‌دهد.
                </p>
              </div>

              {/* Scenario Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">سناریوی آماده:</span>
                <select
                  value={selectedScenarioId}
                  onChange={(e) => setSelectedScenarioId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {scenarios.map(sc => (
                    <option key={sc.id} value={sc.id}>{sc.question}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Question Box */}
            <form onSubmit={handleAskAI} className="bg-gradient-to-r from-indigo-50/50 via-slate-50 to-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Bot className="w-5 h-5 text-indigo-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="پرسش از هوش مصنوعی (مثال: چرا نرخ غیبت در یگان امداد افزایش یافته؟ یا تحلیل کمبود مهارت‌های گشت زنی...)"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={isProcessingAI || !customQuestion.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow-md shadow-indigo-100"
              >
                {isProcessingAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isProcessingAI ? "در حال تحلیل چندعاملی..." : "تحلیل و ریشه‌یابی هوشمند"}</span>
              </button>
            </form>

            {/* Active Analysis View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Primary Correlation Factors */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  عوامل چندگانه شناسایی شده در رخداد:
                </h3>
                <div className="space-y-2">
                  {activeScenario.primaryFactors.map((fac, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{fac.label}</span>
                      <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg ${
                        fac.status === "negative" ? "bg-rose-100 text-rose-800" :
                        fac.status === "positive" ? "bg-emerald-100 text-emerald-800" :
                        "bg-indigo-100 text-indigo-800"
                      }`}>
                        {fac.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-[11px] text-amber-800 leading-relaxed space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> اصل کلیدی سکو:
                  </div>
                  <p>هوش مصنوعی جایگزین فرمانده و مدیر نیست؛ صرفاً روابط پیچیده داده‌ها را شفاف کرده و تصمیم‌گیری نهایی با انسان است.</p>
                </div>
              </div>

              {/* AI Reasoning & Actionable Proposals */}
              <div className="lg:col-span-8 space-y-4">
                {/* AI Root-Cause Statement */}
                <div className="bg-indigo-50/60 border border-indigo-100 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-indigo-950">
                        تحلیل ریشه‌ای هوش مصنوعی برای {activeScenario.unit}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold bg-indigo-200/60 text-indigo-800 px-2 py-0.5 rounded-full">
                      تطبیق ۵ منبع داده‌ای
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium text-justify">
                    {activeScenario.aiAnalysis}
                  </p>
                </div>

                {/* AI Recommendations with Human In The Loop */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      بسته پیشنهادی تصمیم‌یار هوشمند جهت تصویب مدیر:
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      (جهت اجرا روی گزینه «تصویب و ابلاغ» کلیک کنید)
                    </span>
                  </h4>

                  <div className="space-y-2.5">
                    {activeScenario.aiRecommendations.map((rec) => (
                      <div 
                        key={rec.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          rec.approved 
                            ? "bg-emerald-50/70 border-emerald-300" 
                            : "bg-white border-slate-200 hover:border-indigo-200 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                            rec.approved ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            {rec.approved ? <Check className="w-4 h-4" /> : "•"}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">{rec.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                                {rec.priority}
                              </span>
                              {rec.approved && (
                                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                                  <Check className="w-3 h-3" /> مصوب و ابلاغ شد
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleApproveRecommendation(rec.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 w-full sm:w-auto justify-center ${
                            rec.approved
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100"
                          }`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{rec.approved ? "لغو ابلاغ" : "تصویب و ابلاغ به یگان"}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 6 Architectural Layers */}
      {selectedTab === "layers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${layer.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      {layer.stats}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{layer.title}</h3>
                    <div className="text-[11px] font-mono text-indigo-600 font-semibold mb-2">{layer.subtitle}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>مشاهده داده‌ها و اتصال فرآیندی</span>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Multi-Factor Comparative Unit Analysis */}
      {selectedTab === "units" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                تحلیل همبستگی چندعاملی یگان‌های منتخب فاتب
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                مقایسه شاخص‌های کلیدی عملکرد با ساعات آموزش، نرخ جابه‌جایی و رضایت شهروندان
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={UNIT_PERFORMANCE_DATA} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="unit" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontFamily: "Vazirmatn", fontSize: "12px" }} />
                  <Bar name="نمره عملکرد" dataKey="performance" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  <Bar name="ساعات آموزش دوره" dataKey="trainingHours" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar name="نرخ جابه‌جایی نیرو (%)" dataKey="turnover" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3.5">عنوان کلانتری / یگان</th>
                    <th className="p-3.5 text-center">نمره عملکرد</th>
                    <th className="p-3.5 text-center">پوشش آموزشی (ساعت)</th>
                    <th className="p-3.5 text-center">جابه‌جایی کارکنان</th>
                    <th className="p-3.5 text-center">اضافه‌کار ممتد</th>
                    <th className="p-3.5 text-center">رضایت مردمی</th>
                    <th className="p-3.5 text-center">وضعیت ریسک</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {UNIT_PERFORMANCE_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5 font-bold text-slate-800">{row.unit}</td>
                      <td className="p-3.5 text-center font-bold text-indigo-600">{row.performance}</td>
                      <td className="p-3.5 text-center font-medium text-emerald-600">{row.trainingHours} س</td>
                      <td className="p-3.5 text-center font-bold text-rose-600">{row.turnover}٪</td>
                      <td className="p-3.5 text-center text-slate-600">{row.overtimeHours} س</td>
                      <td className="p-3.5 text-center font-bold text-slate-800">{row.satisfaction}٪</td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          row.turnover > 20 ? "bg-rose-100 text-rose-800" :
                          row.turnover > 10 ? "bg-amber-100 text-amber-800" :
                          "bg-emerald-100 text-emerald-800"
                        }`}>
                          {row.turnover > 20 ? "ریسک بحرانی" : row.turnover > 10 ? "نیاز به پایش" : "مطلوب و پایدار"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Data Ingestion & Excel/API Integration */}
      {selectedTab === "data" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600" />
                لایه ۳: ورود و همگام‌سازی داده‌ها (Data Ingestion & Inflow)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                پشتیبانی از انتقال داده‌ها از طریق وب‌سرویس‌های امن، پایگاه‌های داده سازمانی و بارگذاری فایل‌های اکسل/CSV.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadSampleTemplate('personnel')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-slate-200"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>قالب اکسل کارکنان</span>
              </button>
              <button
                onClick={() => downloadSampleTemplate('unit_kpis')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-slate-200"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>قالب اکسل یگان‌ها</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Upload Box */}
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-4 hover:border-indigo-400 transition bg-slate-50/50 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">بارگذاری و اعتبارسنجی فایل اکسل شاخص‌ها</h4>
                <p className="text-xs text-slate-400 mt-1">فرمت‌های مجاز: XLSX, XLS, CSV — همراه با بررسی خطا و پیش‌نمایش ردیف‌ها</p>
              </div>

              <button 
                onClick={() => setIsIngestionModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition"
              >
                <Upload className="w-4 h-4" />
                <span>باز کردن پنجره بارگذاری و پردازش داده‌ها</span>
              </button>
            </div>

            {/* API Ingestion Status */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-emerald-600" /> وضعیت اتصال به وب‌سرویس‌های سازمانی (API Connectors):
              </h4>
              <div className="space-y-2">
                {[
                  { name: "سامانه ارزیابی عملکرد و شایستگی", status: "متصل و برخط", latency: "۲۴ میلی‌ثانیه", records: "۴۵,۲۰۰ رکورد" },
                  { name: "سامانه آموزش و آزمون‌های هوشمند", status: "متصل و برخط", latency: "۱۸ میلی‌ثانیه", records: "۱۸,۷۰۰ دوره" },
                  { name: "سامانه حضور و غیاب و تردد کارکنان", status: "متصل و برخط", latency: "۳۵ میلی‌ثانیه", records: "لحظه‌ای" },
                  { name: "سامانه احکام کارکنان و جابه‌جایی یگانی", status: "متصل و برخط", latency: "۲۱ میلی‌ثانیه", records: "روزانه" },
                ].map((conn, i) => (
                  <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{conn.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{conn.records}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-emerald-700 text-[11px]">{conn.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Excel Data Ingestion Modal */}
      <ExcelDataIngestionModal />
    </div>
  );
}
