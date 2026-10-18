import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  Award, 
  Calendar, 
  ChevronLeft, 
  Star, 
  Zap, 
  Info,
  BadgeCheck,
  TrendingUp,
  FileCheck,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface RankTimelineStep {
  id: string;
  rankTitle: string;
  rankCode: string;
  starsCount: number;
  iconType: "star" | "crown";
  yearsSpan: string;
  startYear: number;
  endYear: number;
  durationYears: number; // strictly 4 years
  status: "passed" | "current" | "future";
  currentYearInRank?: number; // e.g., 2 for 2nd year of 4
  promotionDate?: string;
  requirements: string[];
  incentiveDiscountPossible: string;
  description: string;
  positionExamples: string[];
}

const DEFAULT_RANKS: RankTimelineStep[] = [
  {
    id: "r1",
    rankTitle: "ستوان‌سوم",
    rankCode: "2nd_lieutenant_3",
    starsCount: 1,
    iconType: "star",
    yearsSpan: "۱۳۹۸ - ۱۴۰۲",
    startYear: 1398,
    endYear: 1402,
    durationYears: 4,
    status: "passed",
    promotionDate: "مهر ۱۳۹۸ تا مهر ۱۴۰۲",
    requirements: [
      "فراغت از دانشگاه علوم انتظامی امین (مقطع کارشناسی)",
      "توقف کامل ۴ سال با سوابق انضباطی مثبت",
      "گذراندن دوره مقدماتی رسته انتظامی"
    ],
    incentiveDiscountPossible: "طی شده بدون کسری",
    description: "ورود به خدمت رسمی به عنوان افسر جزء و متصدی گشت‌های اولیه انتظامی و حوزه استحفاظی.",
    positionExamples: ["افسر گشت پیاده", "کمک‌متصدی عملیات کلانتری"]
  },
  {
    id: "r2",
    rankTitle: "ستوان‌دوم",
    rankCode: "1st_lieutenant_2",
    starsCount: 2,
    iconType: "star",
    yearsSpan: "۱۴۰۲ - ۱۴۰۶",
    startYear: 1402,
    endYear: 1406,
    durationYears: 4,
    status: "current",
    currentYearInRank: 2, // 2 years done, 2 years remaining
    promotionDate: "استحقاق درجه: مهر ۱۴۰۲ • موعد ترفیع: مهر ۱۴۰۶",
    requirements: [
      "توقف قانونی ۴ سال در درجه ستوان‌دومی (ماده ۷۸ قانون ارتش/ناجا)",
      "کسب حداقل نمره ارزیابی سالانه ۸۰ از ۱۰۰",
      "قبولی در تست‌های دوره‌ای تیراندازی و آمادگی جسمانی یگان",
      "تاییدیه عقیدتی-سیاسی و حفاظت اطلاعات سرکلانتری"
    ],
    incentiveDiscountPossible: "امکان ۳ الی ۶ ماه تسریع با احراز ارشدیت تشویقی ماده ۱۶۴",
    description: "درجه مصوب فعلی افسر. فرماندهی گشت‌های ضربت، سرپرستی تیم‌های گشت موتوری فوریت‌های ۱۱۰ و مدیریت صحنه ماموریت.",
    positionExamples: ["مامور ارشد گشت موتوری ۱۱۰", "افسر بررسی صحنه", "سرپرست تیم گشت واکنش سریع"]
  },
  {
    id: "r3",
    rankTitle: "ستوان‌یکم",
    rankCode: "senior_lieutenant_1",
    starsCount: 3,
    iconType: "star",
    yearsSpan: "۱۴۰۶ - ۱۴۱۰",
    startYear: 1406,
    endYear: 1410,
    durationYears: 4,
    status: "future",
    promotionDate: "موعد قانونی ترفیع: پاییز ۱۴۰۶ (با ارشدیت تشویقی: تیر ۱۴۰۶)",
    requirements: [
      "تکمیل ۴ سال توقف قانونی در درجه ستوان‌دومی",
      "طی موفق دوره آموزشی تخصصی سرپرستی گشت و مدیریت بحران",
      "عدم سوءسابقه انضباطی و نمره اشراف فرماندهی بالای ۸۵",
      "تصویب در کمیسیون ترفیعات سالانه فراجا"
    ],
    incentiveDiscountPossible: "قابلیت تسریع سنواتی با حفظ رتبه برتر در سامانه اشراف کلانتری",
    description: "افسر ارشد عملیات، هدایت شبکه‌ای گشت‌های خودرویی و موتوری حوزه استحفاظی و جانشین افسر نگهبان ارشد.",
    positionExamples: ["سرتیم ارشد گشت خودرویی", "افسر شیفت عملیات کلانتری", "افسر رسیدگی به پرونده‌های خاص"]
  },
  {
    id: "r4",
    rankTitle: "سروان",
    rankCode: "captain",
    starsCount: 4,
    iconType: "star",
    yearsSpan: "۱۴۱۰ - ۱۴۱۴",
    startYear: 1410,
    endYear: 1414,
    durationYears: 4,
    status: "future",
    promotionDate: "موعد قانونی ترفیع: پاییز ۱۴۱۰",
    requirements: [
      "توقف کامل ۴ سال در درجه ستوان‌یکمی",
      "گذراندن دوره آموزش عالی رسته انتظامی (دوره عالی فرماندهی پاسگاه و کلانتری)",
      "حداقل ۳ سال سابقه مدیریت میدانی گشت‌های شهری"
    ],
    incentiveDiscountPossible: "ارشدیت‌های عملیاتی فرماندهی کل فراجا",
    description: "مسئولیت‌های حساس نظارتی، ریاست ایستگاه‌ها و دوایر عملیاتی کلانتری، بازرسی و برنامه‌ریزی شیفت‌های انتظامی.",
    positionExamples: ["رئیس دایره تجسس و پیشگیری", "افسر نگهبان ارشد کلانتری", "رئیس ایستگاه انتظامی"]
  },
  {
    id: "r5",
    rankTitle: "سرگرد",
    rankCode: "major",
    starsCount: 1,
    iconType: "crown",
    yearsSpan: "۱۴۱۴ - ۱۴۱۸",
    startYear: 1414,
    endYear: 1418,
    durationYears: 4,
    status: "future",
    promotionDate: "موعد قانونی ترفیع: پاییز ۱۴۱۴",
    requirements: [
      "توقف کامل ۴ سال در درجه سروانی",
      "ورود به رده افسران ارشد (دارای نشان تاج طلایی)",
      "قبولی در آزمون گزینش و طی دوره دافوس (فرماندهی و ستاد)",
      "تاییدیه عالی هیئت ممیزه و فرماندهی کل فراجا"
    ],
    incentiveDiscountPossible: "منوط به امتیازات ویژه ستادی و ماموریت‌های خطیر",
    description: "رده افسران ارشد. تصدی سمت‌های معاونت کلانتری، ریاست دوایر کلیدی سرکلانتری و ریاست کلانتری‌های مناطق شهری.",
    positionExamples: ["معاون کلانتری", "رئیس کلانتری حوزه", "معاون عملیات سرکلانتری"]
  }
];

interface RankPromotionTimelineProps {
  variant?: "dark" | "light";
  showTitle?: boolean;
  className?: string;
  onSelectRank?: (rank: RankTimelineStep) => void;
  onSelectJob?: (jobTitle: string) => void;
}

export function RankPromotionTimeline({
  variant = "dark",
  showTitle = true,
  className = "",
  onSelectRank,
  onSelectJob
}: RankPromotionTimelineProps) {
  const [selectedRankId, setSelectedRankId] = useState<string>("r2"); // default to current: ستوان‌دوم
  const isDark = variant === "dark";

  const selectedRank = DEFAULT_RANKS.find((r) => r.id === selectedRankId) || DEFAULT_RANKS[1];

  const handleRankClick = (rank: RankTimelineStep) => {
    setSelectedRankId(rank.id);
    if (onSelectRank) {
      onSelectRank(rank);
    }
  };

  return (
    <div 
      className={`rounded-2xl transition-all duration-300 text-right ${
        isDark 
          ? "bg-slate-950/80 border border-amber-500/30 text-slate-100 p-4 sm:p-6" 
          : "bg-white border border-slate-200 text-slate-800 p-4 sm:p-6 shadow-sm"
      } ${className}`}
      dir="rtl"
    >
      {/* Header Info Banner */}
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-6 border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${isDark ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-indigo-50 text-indigo-600 border border-indigo-100"}`}>
                <Clock className="w-5 h-5" />
              </span>
              <h3 className={`text-base font-black ${isDark ? "text-amber-100" : "text-slate-900"}`}>
                گاه‌شمار قانونی ارتقای درجات انتظامی (توقف سنواتی ۴ ساله)
              </h3>
            </div>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-500"}`}>
              وفق <strong className="text-amber-400 font-black">ماده ۷۸ قانون استخدام ناجا</strong>، حداقل مدت توقف قانونی در هر یک از درجات افسری جهت نیل به درجه بالاتر، <strong className="text-amber-400 font-black">۴ سال تمام</strong> است.
            </p>
          </div>

          <div className={`shrink-0 px-3.5 py-2 rounded-xl border text-xs flex items-center gap-2 ${
            isDark 
              ? "bg-slate-900 border-amber-500/30 text-amber-200" 
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}>
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] block opacity-80">وضعیت فعلی شما:</span>
              <strong className="font-black">ستوان‌دوم • سال ۲ از ۴ توقف</strong>
            </div>
          </div>
        </div>
      )}

      {/* Visual Timeline Bar with 4-Year Interval Connectors */}
      <div className="relative py-4 px-2 sm:px-4">
        {/* Horizontal Progress Track for Desktop */}
        <div className="hidden md:block absolute top-[52px] left-8 right-8 h-1 bg-slate-800 z-0">
          {/* Progress highlight up to current rank */}
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 rounded-full transition-all duration-700" 
            style={{ width: "37.5%" }} 
          />
        </div>

        {/* Milestone Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-2 relative z-10">
          {DEFAULT_RANKS.map((rank, index) => {
            const isSelected = rank.id === selectedRankId;
            const isCurrent = rank.status === "current";
            const isPassed = rank.status === "passed";
            const isFuture = rank.status === "future";

            return (
              <div
                key={rank.id}
                onClick={() => handleRankClick(rank)}
                className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 p-3 rounded-2xl border text-center select-none group ${
                  isSelected 
                    ? isDark 
                      ? "bg-slate-900/95 border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/40" 
                      : "bg-slate-50 border-indigo-600 shadow-md ring-2 ring-indigo-300"
                    : isCurrent
                    ? isDark
                      ? "bg-slate-900/80 border-amber-500/50 hover:border-amber-400"
                      : "bg-white border-amber-300 hover:border-amber-400"
                    : isDark
                    ? "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* 4-Year Badge Indicator (Crucial Requirement) */}
                <div className={`text-[10px] font-black px-2 py-0.5 rounded-full mb-2 flex items-center gap-1 border ${
                  isPassed 
                    ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40" 
                    : isCurrent 
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm animate-pulse" 
                    : isDark 
                    ? "bg-slate-900 text-slate-400 border-slate-700" 
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>۴ سال توقف</span>
                </div>

                {/* Rank Node Badge / Insignia */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-transform group-hover:scale-105 border-2 shadow-md mb-2 relative ${
                  isPassed
                    ? "bg-emerald-600/20 text-emerald-400 border-emerald-500"
                    : isCurrent
                    ? "bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-500/20"
                    : isDark
                    ? "bg-slate-900 text-slate-500 border-slate-700"
                    : "bg-slate-100 text-slate-400 border-slate-300"
                }`}>
                  {isPassed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : rank.iconType === "crown" ? (
                    <Award className={`w-6 h-6 ${isCurrent ? "text-slate-950" : "text-amber-400"}`} />
                  ) : (
                    <div className="flex items-center justify-center gap-0.5">
                      {Array.from({ length: rank.starsCount }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 fill-current ${
                            isCurrent ? "text-slate-950" : isDark ? "text-amber-400" : "text-amber-500"
                          }`} 
                        />
                      ))}
                    </div>
                  )}

                  {/* Active Indicator Glow */}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                    </span>
                  )}
                </div>

                {/* Rank Title */}
                <span className={`text-xs font-black tracking-tight ${
                  isCurrent 
                    ? isDark ? "text-amber-300" : "text-amber-700"
                    : isPassed 
                    ? "text-emerald-400 font-bold" 
                    : isDark ? "text-slate-300" : "text-slate-700"
                }`}>
                  {rank.rankTitle}
                </span>

                {/* Years Span */}
                <span className={`text-[10px] font-mono mt-0.5 font-bold ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  {rank.yearsSpan}
                </span>

                {/* Status Tag */}
                <div className="mt-2">
                  {isPassed && (
                    <span className="bg-emerald-900/40 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      طی شده ✓
                    </span>
                  )}
                  {isCurrent && (
                    <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded shadow">
                      درجه فعلی شما
                    </span>
                  )}
                  {isFuture && (
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                      isDark ? "bg-slate-900 text-slate-400" : "bg-slate-100 text-slate-500"
                    }`}>
                      {index === 2 ? "هدف بعدی" : "افق آتی"}
                    </span>
                  )}
                </div>

                {/* Current Tenure Progress Mini-Bar for Step 2 */}
                {isCurrent && (
                  <div className="w-full mt-2 pt-2 border-t border-amber-500/20">
                    <div className="flex items-center justify-between text-[9px] text-amber-200/90 font-bold mb-1">
                      <span>پیشرفت توقف:</span>
                      <span>سال ۲ از ۴ (۵۰٪)</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-amber-500/30">
                      <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full w-1/2" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Detail Card for the Selected Rank */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRank.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`mt-4 rounded-2xl p-4 sm:p-5 border text-xs leading-relaxed ${
            isDark 
              ? "bg-slate-900/90 border-slate-800 text-slate-200" 
              : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-800/80 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <BadgeCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-amber-300">
                    جزئیات دوره توقف درجه {selectedRank.rankTitle}
                  </h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border ${
                    selectedRank.status === "passed"
                      ? "bg-emerald-900/30 text-emerald-400 border-emerald-600/40"
                      : selectedRank.status === "current"
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}>
                    {selectedRank.status === "passed" && "دوره سپری شده"}
                    {selectedRank.status === "current" && "درجه کنونی (سال ۲ از ۴)"}
                    {selectedRank.status === "future" && "موعد ترفیع قانونی"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  بازه سنواتی توقف: <strong className="text-slate-200 font-mono font-bold">{selectedRank.yearsSpan} (۴ سال کامل)</strong>
                </p>
              </div>
            </div>

            <div className={`text-left font-mono font-bold text-[11px] px-3 py-1.5 rounded-xl border ${
              isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-600"
            }`}>
              {selectedRank.promotionDate}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Mandatory Legal Requirements */}
            <div className="space-y-2">
              <span className="font-black text-amber-300/90 flex items-center gap-1.5 text-[11px]">
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                الزامات و شرایط احراز نیل به درجه:
              </span>
              <ul className="space-y-1.5 pr-2">
                {selectedRank.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Acceleration & Seniority Opportunities */}
            <div className="space-y-2">
              <span className="font-black text-emerald-300/90 flex items-center gap-1.5 text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                تسهیلات و تسریع در موعد ترفیع:
              </span>
              <div className={`p-3 rounded-xl border ${
                isDark ? "bg-slate-950/70 border-slate-800/90 text-slate-300" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <p className="text-[11px] leading-relaxed">
                  {selectedRank.incentiveDiscountPossible}
                </p>
                <p className="text-[10px] text-slate-400 mt-1.5 border-t border-slate-800/80 pt-1.5">
                  طبق آیین‌نامه انضباطی، کارکنان برتر در سامانه اشراف و کارنامه عملکردی از اولویت ثبت در کمیسیون ترفیعات فراجا برخوردار می‌گردند.
                </p>
              </div>
            </div>

            {/* Column 3: Typical Assigned Roles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sky-300/90 flex items-center gap-1.5 text-[11px]">
                  <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                  مشاغل سازمانی متناظر در کلانتری (کلیک جهت مشاهده جزئیات):
                </span>
                <span className="text-[10px] text-sky-400/80 font-bold hidden sm:inline">
                  جهت بررسی شناسنامه و وظایف کلیک کنید
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedRank.positionExamples.map((pos, i) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={() => {
                      if (onSelectJob) {
                        onSelectJob(pos);
                      }
                    }}
                    title={`مشاهده شناسنامه و پیش‌نیازهای شغل سازمانی: ${pos}`}
                    className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] shadow-2xs group ${
                      isDark 
                        ? "bg-slate-900 text-sky-200 border-slate-700/80 hover:bg-sky-950/80 hover:border-sky-500 hover:text-white" 
                        : "bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-900"
                    }`}
                  >
                    <Briefcase className="w-3 h-3 text-sky-400 group-hover:text-amber-400 transition-colors" />
                    <span>{pos}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded font-normal ${
                      isDark ? "bg-slate-800 text-sky-300" : "bg-slate-100 text-slate-600"
                    }`}>
                      مشاهده
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {selectedRank.description}
              </p>
            </div>
          </div>

          {/* Legal Notice Footer */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 flex-wrap gap-2">
            <span className="flex items-center gap-1 text-amber-300/90 font-medium">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              مرجع قانونی: ماده ۷۸ و ماده ۸۲ قانون استخدام نیروی انتظامی جمهوری اسلامی ایران (توقف ۴ سال تمام در هر درجه).
            </span>
            <span className="font-mono text-slate-400">
              دبیرخانه کمیسیون ترفیعات • قرارگاه انضباطی فراجا
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
