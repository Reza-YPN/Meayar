import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldAlert,
  Award,
  TrendingUp,
  Clock,
  PlayCircle,
  BookOpen,
  Headphones,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  Star,
  Target,
  BarChart2,
  Check,
  RotateCcw,
  Zap,
  BookOpenCheck
} from "lucide-react";

export interface PerformanceImprovementCourse {
  id: string;
  metricTitle: string;
  metricCategory: "رفتاری" | "نتیجه‌ای" | "عملکردی" | "امنیتی";
  priority: "اولویت ۱ (فوری)" | "اولویت ۲ (مهم)" | "اولویت ۳ (عادی)";
  priorityLevel: 1 | 2 | 3;
  currentScore: number;
  targetScore: number;
  scoreGap: number;
  lastEvaluationSeason: string;
  
  // Recommended Course Details
  courseTitle: string;
  courseType: "ویدئو تعاملی" | "کارگاه عملی" | "پادکست و سناریو" | "متن و آزمون";
  courseTypeIcon: "video" | "workshop" | "podcast" | "document";
  duration: string;
  department: string;
  expectedScoreImpact: string; // e.g. "+۱۵ نمره در KPI رفتاری"
  welfareReward: number; // e.g. 25
  status: "not_started" | "in_progress" | "completed";
  progress: number;
  reason: string;
  syllabus: string[];
}

const INITIAL_RECOMMENDATIONS: PerformanceImprovementCourse[] = [
  {
    id: "rec-1",
    metricTitle: "مهارت ارتباط موثر و مدیریت تنش در صحنه جرم",
    metricCategory: "رفتاری",
    priority: "اولویت ۱ (فوری)",
    priorityLevel: 1,
    currentScore: 48,
    targetScore: 85,
    scoreGap: 37,
    lastEvaluationSeason: "ارزیابی پاییز ۱۴۰۵ (تایید مربی)",
    courseTitle: "اصول ارتباط بدون خشونت (NVC) و فن بیان انتظامی با شهروندان",
    courseType: "ویدئو تعاملی",
    courseTypeIcon: "video",
    duration: "۸ ساعت",
    department: "معاونت اجتماعی و پیشگیری فراجا",
    expectedScoreImpact: "+۱۵ امتیاز در شاخص رفتار حرفه‌ای",
    welfareReward: 30,
    status: "in_progress",
    progress: 45,
    reason: "کسب نمره ۴۸ در ارزیابی مربی و ضرورت کاهش اصطکاک و تنش کلامی در مواجهه با مراجعین کلانتری.",
    syllabus: ["تکنیک‌های آرام‌سازی افراد هیجان‌زده", "مهارت‌های زبان بدن در ماموریت", "کنترل خشم فردی تحت فشار"],
  },
  {
    id: "rec-2",
    metricTitle: "صحت گزارش‌های اولیه و مستندسازی صورت‌جلسات",
    metricCategory: "عملکردی",
    priority: "اولویت ۱ (فوری)",
    priorityLevel: 1,
    currentScore: 52,
    targetScore: 90,
    scoreGap: 38,
    lastEvaluationSeason: "افت ۲۰٪ نسبت به دوره قبل",
    courseTitle: "کارگاه تخصصی نگارش صورت‌جلسه و گزارش‌نویسی بدون نقص قضایی",
    courseType: "کارگاه عملی",
    courseTypeIcon: "workshop",
    duration: "۶ ساعت",
    department: "معاونت حقوقی و امور مجلس فراجا",
    expectedScoreImpact: "+۲۰ امتیاز در صحت گزارش‌های اولیه",
    welfareReward: 35,
    status: "not_started",
    progress: 0,
    reason: "ثبت موارد نقص ماهوی در پرونده‌های ارجاعی به مرجع قضایی در ماه گذشته و لزوم بازآموزی استانداردهای حقوقی.",
    syllabus: ["ارکان حقوقی تنظیم صورت‌جلسه کشف جرم", "مستندسازی شواهد صحنه", "رفع ایرادات متداول دادیاری"],
  },
  {
    id: "rec-3",
    metricTitle: "میانگین زمان رسیدن سر صحنه از زمان اعلام ۱۱۰",
    metricCategory: "نتیجه‌ای",
    priority: "اولویت ۲ (مهم)",
    priorityLevel: 2,
    currentScore: 50,
    targetScore: 80,
    scoreGap: 30,
    lastEvaluationSeason: "میانگین ۹.۴ دقیقه (استاندارد ۶ دقیقه)",
    courseTitle: "ناوبری تاکتیکی، اولویت‌بندی تماس‌های فوریتی و مدیریت مسیر گشت",
    courseType: "ویدئو تعاملی",
    courseTypeIcon: "video",
    duration: "۱۰ ساعت",
    department: "پلیس پیشگیری و مرکز فرماندهی و کنترل (۱۱۰)",
    expectedScoreImpact: "+۱۸ امتیاز در شاخص واکنش سریع",
    welfareReward: 25,
    status: "not_started",
    progress: 0,
    reason: "تاخیر در رسیدن به ماموریت‌های کد ۱ و ۲ در ساعات اوج ترافیک محدوده استحفاظی.",
    syllabus: ["تحلیل ترافیک محله‌محور", "الگوهای گشت‌زنی شناور", "هماهنگی بی‌سیم با یگان‌های همجوار"],
  },
  {
    id: "rec-4",
    metricTitle: "اصول حفاظت اسناد و پیشگیری از درز اطلاعات",
    metricCategory: "امنیتی",
    priority: "اولویت ۲ (مهم)",
    priorityLevel: 2,
    currentScore: 58,
    targetScore: 85,
    scoreGap: 27,
    lastEvaluationSeason: "چک‌لیست نظارتی فصلی",
    courseTitle: "امنیت داده‌ها و حفاظت فیزیکی اسناد طبقه‌بندی‌شده در پایانه‌های یگانی",
    courseType: "متن و آزمون",
    courseTypeIcon: "document",
    duration: "۴ ساعت",
    department: "سازمان حفاظت اطلاعات فراجا",
    expectedScoreImpact: "+۱۲ امتیاز در انضباط و امنیت",
    welfareReward: 20,
    status: "completed",
    progress: 100,
    reason: "الزام سازمانی جهت ارتقای ضریب امنیت اطلاعات سامانه‌های داخلی و بایگانی پرونده‌ها.",
    syllabus: ["دستورالعمل نگهداری اسناد سری و محرمانه", "امنیت دسترسی به سیستم‌ها", "پیشگیری از تخلیه تلفنی"],
  },
  {
    id: "rec-5",
    metricTitle: "آیین دادرسی کیفری و استانداردهای بازداشت متهمین",
    metricCategory: "عملکردی",
    priority: "اولویت ۳ (عادی)",
    priorityLevel: 3,
    currentScore: 62,
    targetScore: 85,
    scoreGap: 23,
    lastEvaluationSeason: "ارزیابی جامع شایستگی",
    courseTitle: "حقوق شهروندی، قواعد تفتیش قانونی و موازین بازداشت در جرایم مشهود",
    courseType: "پادکست و سناریو",
    courseTypeIcon: "podcast",
    duration: "۵ ساعت",
    department: "معاونت آموزش و بازرسی کل فراجا",
    expectedScoreImpact: "+۱۴ امتیاز در رعایت موازین قانونی",
    welfareReward: 20,
    status: "not_started",
    progress: 0,
    reason: "به‌روزرسانی قوانین جدید دادرسی و به صفر رساندن اعتراضات شهروندی در کمیسیون حقوقی.",
    syllabus: ["مرزهای قانونی اختیارات ضابطین قضایی", "قواعد تفتیش بدنی و خودرو", "حقوق متهم در تحت‌نظرگاه"],
  },
];

interface Props {
  onStartCourse: (courseData: {
    id: number;
    title: string;
    description: string;
    points: string;
    pointsNum: number;
    type: string;
    department: string;
    goals: string[];
    progress: number;
  }) => void;
  showToast: (msg: string) => void;
}

export function PerformanceTrainingRecommendations({ onStartCourse, showToast }: Props) {
  const [recommendations, setRecommendations] = useState<PerformanceImprovementCourse[]>(INITIAL_RECOMMENDATIONS);
  const [filter, setFilter] = useState<"all" | "urgent" | "in_progress" | "completed">("all");

  const completedCount = recommendations.filter((r) => r.status === "completed").length;
  const totalCount = recommendations.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredItems = recommendations.filter((item) => {
    if (filter === "urgent") return item.priorityLevel === 1 && item.status !== "completed";
    if (filter === "in_progress") return item.status === "in_progress";
    if (filter === "completed") return item.status === "completed";
    return true;
  });

  const handleLaunchCourse = (rec: PerformanceImprovementCourse) => {
    onStartCourse({
      id: parseInt(rec.id.replace("rec-", "")) + 100,
      title: rec.courseTitle,
      description: `${rec.reason} • هدف این دوره: رفع نقطه بهبود «${rec.metricTitle}» و افزایش ${rec.expectedScoreImpact}.`,
      points: `${rec.welfareReward} امتیاز`,
      pointsNum: rec.welfareReward,
      type: rec.courseType,
      department: rec.department,
      goals: rec.syllabus,
      progress: rec.progress,
    });
  };

  const handleMarkAsCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecommendations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "completed" ? "not_started" : "completed";
          const newProgress = newStatus === "completed" ? 100 : 0;
          if (newStatus === "completed") {
            showToast(`دوره "${item.courseTitle}" تکمیل شد! ${item.expectedScoreImpact} به کارنامه اضافه شد.`);
          }
          return { ...item, status: newStatus, progress: newProgress };
        }
        return item;
      })
    );
  };

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50/30 to-emerald-50/30 rounded-3xl p-5 md:p-7 text-slate-800 shadow-xl border border-indigo-100 relative overflow-hidden space-y-6" dir="rtl">
      {/* Decorative Light Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200/80 pb-5 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-indigo-100 text-indigo-800 border border-indigo-300/80 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              پیشنهاد هوشمند دوره‌ها بر اساس کارنامه عملکرد
            </span>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              {recommendations.filter(r => r.priorityLevel === 1 && r.status !== 'completed').length} نقطه بهبود نیازمند اقدام فوری
            </span>
          </div>
          <h2 className="text-base md:text-xl font-black text-slate-900">
            دوره‌های جبرانی و ارتقای شایستگی منطبق بر نقاط نیازمند بهبود شما
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed font-medium">
            این دوره‌ها بر اساس ارزیابی‌های فصلی، تحلیل نمرات مربی و نقاط نیازمند بهبود در کارنامه شخصی شما استخراج شده‌اند. با تکمیل هر دوره، علاوه بر کسب امتیاز رفاهی، نمره مربوطه در دوره ارزیابی آتی ترمیم خواهد شد.
          </p>
        </div>

        {/* Progress Card & Quick Links */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          {/* Progress Box */}
          <div className="bg-white/95 border border-slate-200/90 shadow-md shadow-slate-100 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center p-1 shrink-0">
              <span className="text-sm font-black text-emerald-700">{progressPercent}٪</span>
              <span className="text-[9px] text-emerald-600 font-bold">تحقق</span>
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">
                {completedCount} از {totalCount} دوره بهبود گذرانده شده
              </div>
              <div className="w-36 h-2.5 bg-slate-100 rounded-full mt-2 overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <Link
            to="/performance/improvements"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all text-center shadow-md shadow-indigo-200"
          >
            <BarChart2 className="w-4 h-4 text-white" />
            <span>مشاهده کارنامه و نمرات</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none relative z-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            filter === "all"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          همه پیشنهادات عملکردی ({recommendations.length})
        </button>
        <button
          onClick={() => setFilter("urgent")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            filter === "urgent"
              ? "bg-amber-600 text-white shadow-md shadow-amber-200"
              : "bg-white hover:bg-amber-50 text-amber-800 border border-amber-200"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>اقدام فوری ({recommendations.filter(r => r.priorityLevel === 1 && r.status !== 'completed').length})</span>
        </button>
        <button
          onClick={() => setFilter("in_progress")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            filter === "in_progress"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          در حال گذراندن ({recommendations.filter(r => r.status === 'in_progress').length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            filter === "completed"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
              : "bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>تکمیل‌شده ({completedCount})</span>
        </button>
      </div>

      {/* Recommended Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {filteredItems.map((item) => {
          const isCompleted = item.status === "completed";
          const isInProgress = item.status === "in_progress";

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between relative group ${
                isCompleted
                  ? "bg-gradient-to-b from-emerald-50/50 to-white border-emerald-300/80 shadow-sm text-slate-800 hover:shadow-lg"
                  : item.priorityLevel === 1
                  ? "bg-gradient-to-b from-amber-50/40 to-white hover:bg-white border-2 border-amber-300 hover:border-amber-400 shadow-md hover:shadow-xl"
                  : "bg-white hover:bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Card Top: Performance Gap Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-black px-3 py-1 rounded-xl flex items-center gap-1.5 ${
                      item.priorityLevel === 1
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-indigo-100 text-indigo-900 border border-indigo-300"
                    }`}
                  >
                    {item.priorityLevel === 1 && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                    <span>{item.priority}</span>
                  </span>

                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                    {item.metricCategory}
                  </span>
                </div>

                {/* Performance Metric Link */}
                <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-bold">نقطه بهبود مرتبط:</span>
                    <span className="text-amber-700 font-black">
                      نمره فعلی: {item.currentScore} از ۱۰۰
                    </span>
                  </div>
                  <div className="text-xs font-black text-slate-900 line-clamp-1">
                    {item.metricTitle}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200">
                    <span>{item.lastEvaluationSeason}</span>
                    <span className="text-rose-600 font-black">شکاف: -{item.scoreGap} نمره</span>
                  </div>
                </div>

                {/* Recommended Course Title & Dept */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-black mb-1">
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    <span>دوره پیشنهادی:</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {item.courseTitle}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2 font-medium">
                    {item.reason}
                  </p>
                </div>

                {/* Score Impact & Welfare Points Pill */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] text-emerald-800 block font-bold">ارتقای کارنامه</span>
                    <span className="text-xs font-black text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      {item.expectedScoreImpact}
                    </span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] text-amber-800 block font-bold">پاداش رفاهی</span>
                    <span className="text-xs font-black text-amber-700 flex items-center justify-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      +{item.welfareReward} امتیاز
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Metadata & Action */}
              <div className="pt-4 mt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {item.duration}
                  </span>
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-lg text-[10px] font-black">
                    {item.courseType}
                  </span>
                </div>

                {/* Progress bar if in progress */}
                {isInProgress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-indigo-700 font-bold">
                      <span>در حال گذراندن</span>
                      <span>{item.progress}٪</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLaunchCourse(item)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                      isCompleted
                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : isInProgress
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
                        : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-100"
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <BookOpenCheck className="w-4 h-4 text-emerald-700" />
                        <span>مشاهده مجدد دوره</span>
                      </>
                    ) : isInProgress ? (
                      <>
                        <PlayCircle className="w-4 h-4 text-white" />
                        <span>ادامه یادگیری ({item.progress}٪)</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>شروع دوره جبرانی</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => handleMarkAsCompleted(item.id, e)}
                    title={isCompleted ? "علامت‌گذاری به عنوان گذرانده نشده" : "علامت‌گذاری سریع به عنوان گذرانده شده"}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border-slate-200"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
