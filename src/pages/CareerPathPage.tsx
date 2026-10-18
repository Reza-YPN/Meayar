import React, { useState, useEffect, useMemo } from "react";
import { 
  Info, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Search, 
  Target, 
  Award, 
  Clock, 
  Star, 
  X, 
  ChevronRight, 
  Zap, 
  Sparkles,
  BookmarkCheck,
  Eye,
  SlidersHorizontal,
  HelpCircle,
  Layers,
  Compass,
  Briefcase,
  Shield,
  CheckCircle2,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CareerRoleDetailModal } from "../components/CareerRoleDetailModal";
import { CareerPrerequisitesPanel } from "../components/CareerPrerequisitesPanel";
import { CareerSmartRecommendations } from "../components/CareerSmartRecommendations";
import { RankPromotionTimeline } from "../components/RankPromotionTimeline";
import { InteractiveCareerRoadmap } from "../components/InteractiveCareerRoadmap";
import { SuccessionReadinessPanel } from "../components/SuccessionReadinessPanel";
import { ROLE_PREREQUISITES_DATA } from "../data/careerPrerequisitesData";
import { competencyService } from "../services/competencyService";

interface CareerRole {
  name: string;
  isCurrent?: boolean;
  isPassed?: boolean;
  badge?: string;
}

interface CareerLevel {
  id: number;
  title: string;
  statusText: string;
  statusType: "passed" | "current" | "future";
  requirements?: {
    points: number;
    experienceYears: number;
  };
  roles: CareerRole[];
}

const CAREER_LEVELS: CareerLevel[] = [
  {
    id: 1,
    title: "سطح ۱: مقدماتی",
    statusText: "گذرانده شده",
    statusType: "passed",
    roles: [
      { name: "کمک‌متصدی عملیات و گشت پیاده", isPassed: true }
    ]
  },
  {
    id: 2,
    title: "سطح ۲: متصدی (فعلی)",
    statusText: "شغل مصوب فعلی شما",
    statusType: "current",
    requirements: { points: 80, experienceYears: 1 },
    roles: [
      { name: "مامور ارشد گشت موتوری فوریت‌های ۱۱۰", isCurrent: true },
      { name: "متصدی گشت انتظامی و بدرقه متهم" },
      { name: "متصدی بررسی صحنه و گزارش اولیه" }
    ]
  },
  {
    id: 3,
    title: "سطح ۳: کاردان (هدف اول)",
    statusText: "در حال ارزیابی شایستگی",
    statusType: "future",
    requirements: { points: 90, experienceYears: 3 },
    roles: [
      { name: "سرتیم گشت موتوری واکنش سریع ۱۱۰" },
      { name: "سرتیم گشت خودرویی حوزه استحفاظی" },
      { name: "کاردان عملیات و جمع‌آوری اطلاعات" }
    ]
  },
  {
    id: 4,
    title: "سطح ۴: کارشناسی",
    statusText: "سطح تخصصی آتی",
    statusType: "future",
    requirements: { points: 94, experienceYears: 5 },
    roles: [
      { name: "افسر شیفت عملیات کلانتری" },
      { name: "کارشناس مبارزه با جرایم خاص" },
      { name: "کارشناس مدیریت صحنه و پیشگیری", badge: "برنامه جانشین‌پروری" }
    ]
  },
  {
    id: 5,
    title: "سطح ۵: ارشد و فرماندهی",
    statusText: "برنامه ارشد جانشین‌پروری",
    statusType: "future",
    requirements: { points: 98, experienceYears: 9 },
    roles: [
      { name: "رئیس ایستگاه و پایگاه انتظامی" },
      { name: "فرمانده یگان واکنش سریع گشت" },
      { name: "معاون عملیات و پیشگیری کلانتری", badge: "برنامه جانشین‌پروری" }
    ]
  },
  {
    id: 6,
    title: "سطح ۶: مدیریتی عالی",
    statusText: "سطح فرماندهی کلانتری",
    statusType: "future",
    requirements: { points: 104, experienceYears: 14 },
    roles: [
      { name: "رئیس کلانتری (فرمانده حوزه)" },
      { name: "معاون هماهنگ‌کننده سرکلانتری" }
    ]
  }
];

export type CareerSubTab = "roadmap" | "prerequisites" | "timeline" | "succession" | "ai-insights";

const SUB_TABS: { id: CareerSubTab; title: string; shortTitle: string; icon: React.ElementType; desc: string; stepNumber: number }[] = [
  { 
    id: "roadmap", 
    title: "۱. نقشه کارراهه و مسیر شغلی", 
    shortTitle: "نقشه کارراهه", 
    icon: Target, 
    desc: "۶ سطح ارتقای شغلی از گشت پیاده تا فرماندهی کلانتری", 
    stepNumber: 1 
  },
  { 
    id: "prerequisites", 
    title: "۲. پیش‌نیازها و گواهی‌های ارتقا", 
    shortTitle: "پیش‌نیازها", 
    icon: Layers, 
    desc: "دوره‌ها، آزمون‌ها و معیارهای احراز سمت شغلی هدف", 
    stepNumber: 2 
  },
  { 
    id: "timeline", 
    title: "۳. گاه‌شمار درجات نظامی (ماده ۷۸)", 
    shortTitle: "درجات نظامی", 
    icon: Clock, 
    desc: "توقف قانونی ۴ ساله و مشاغل متناظر در کلانتری", 
    stepNumber: 3 
  },
  { 
    id: "succession", 
    title: "۴. طرح جانشین‌پروری و استعدادها", 
    shortTitle: "جانشین‌پروری", 
    icon: Compass, 
    desc: "سنجش درصد انطباق شایستگی و آمادگی تصدی رده‌های کلیدی", 
    stepNumber: 4 
  },
  { 
    id: "ai-insights", 
    title: "۵. توصیه‌های شتاب‌دهی هوشمند", 
    shortTitle: "توصیه‌های هوشمند", 
    icon: Sparkles, 
    desc: "خلاصه تحلیلی موجز هوش مصنوعی و مهارت‌های اولویت‌دار", 
    stepNumber: 5 
  },
];

export function CareerPathPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") as CareerSubTab | null;

  const resolveTab = (t: string | null): CareerSubTab => {
    if (t === "prerequisites" || t === "timeline" || t === "succession" || t === "ai-insights") {
      return t;
    }
    return "roadmap";
  };

  const [activeTab, setActiveTab] = useState<CareerSubTab>(() => resolveTab(rawTab));

  // Sync tab with URL searchParams
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t) {
      setActiveTab(resolveTab(t));
    }
  }, [searchParams]);

  const handleTabChange = (newTab: CareerSubTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const [searchTerm, setSearchTerm] = useState("");
  
  // Default selected targets matching motor patrol path
  const [targetRoles, setTargetRoles] = useState<string[]>([
    "سرتیم گشت موتوری واکنش سریع ۱۱۰",
    "افسر شیفت عملیات کلانتری",
    "معاون عملیات و پیشگیری کلانتری",
    "رئیس کلانتری (فرمانده حوزه)"
  ]);

  // Selected role for inspecting dynamic prerequisites in the live panel
  const [selectedRoleName, setSelectedRoleName] = useState<string>(
    "سرتیم گشت موتوری واکنش سریع ۱۱۰"
  );

  // Modal inspection state
  const [modalRoleInfo, setModalRoleInfo] = useState<{
    roleName: string;
    levelTitle: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleTarget = (roleName: string) => {
    let foundLevel: CareerLevel | undefined;
    for (const lvl of CAREER_LEVELS) {
      if (lvl.roles.some(r => r.name === roleName)) {
        foundLevel = lvl;
        break;
      }
    }

    if (foundLevel && (foundLevel.statusType === "passed" || foundLevel.statusType === "current")) {
      showToast("سمت‌های فعلی و گذشته شما قابل تغییر به عنوان هدف شغلی نیستند.");
      return;
    }

    if (targetRoles.includes(roleName)) {
      setTargetRoles(targetRoles.filter(r => r !== roleName));
      showToast(`سمت «${roleName}» از اهداف شغلی شما خارج شد.`);
    } else {
      if (foundLevel) {
        const otherRolesInLevel = foundLevel.roles.map(r => r.name);
        const cleanedTargets = targetRoles.filter(r => !otherRolesInLevel.includes(r));
        setTargetRoles([...cleanedTargets, roleName]);
      } else {
        setTargetRoles([...targetRoles, roleName]);
      }
      showToast(`سمت «${roleName}» با موفقیت به عنوان هدف ترجیحی شما ثبت شد!`);
    }
  };

  const handleRoleCardClick = (role: CareerRole, level: CareerLevel) => {
    setSelectedRoleName(role.name);
    // Open full detail modal directly on click
    setModalRoleInfo({ roleName: role.name, levelTitle: level.title });
  };

  const handleSelectJobFromTimeline = (jobTitle: string) => {
    // Look up level or default to level 3/4
    let matchedLevelTitle = "مشاغل سازمانی کلانتری ۱۰۳";
    for (const lvl of CAREER_LEVELS) {
      if (lvl.roles.some(r => r.name.includes(jobTitle) || jobTitle.includes(r.name))) {
        matchedLevelTitle = lvl.title;
        break;
      }
    }
    setModalRoleInfo({ roleName: jobTitle, levelTitle: matchedLevelTitle });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const currentTabIndex = SUB_TABS.findIndex(t => t.id === activeTab);

  return (
    <div className="space-y-6 text-right relative" dir="rtl">
      {/* 1. Identity & Current Active Job Sticky Banner */}
      <div className="sticky top-2 z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shrink-0 text-xl">
            🏍️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                شغل مصوب فعلی (ثابت)
              </span>
              <span className="text-xs text-slate-300 font-bold">ستوان‌دوم محمدرضا یزدان پناه</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white mt-0.5">
              مامور ارشد گشت انتظامی و فوریت‌های ۱۱۰ (گشت موتوری)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">یگان خدمتی:</span>
            <span className="text-slate-200 font-bold">کلانتری ۱۰۳ گاندی (واکنش سریع)</span>
          </div>
          <div className="bg-indigo-600/30 border border-indigo-500/40 rounded-xl px-3 py-1.5 text-center">
            <span className="text-[10px] text-indigo-300 block">هدف ارتقای بعدی:</span>
            <span className="text-white font-black text-xs">سرتیم گشت موتوری ۱۱۰</span>
          </div>
        </div>
      </div>

      {/* 2. Structured Sub-Tab Stepper (تفکیک منظم و ساب‌تب‌ها جهت خلوت‌سازی و جلوگیری از سردرگمی) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
                سامانه کارراهه هوشمند فراجا
              </span>
              <span className="text-xs font-bold text-slate-500">
                تفکیک مرحله‌ای مسیر پیشرفت شغلی و جانشین‌پروری
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 mt-1">
              برنامه‌ریزی ارتقای رتبه، پیش‌نیازهای تصدی و استعدادهای جانشین‌پروری
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span>بخش فعال:</span>
            <span className="text-indigo-700 font-black">
              {SUB_TABS[currentTabIndex]?.title}
            </span>
          </div>
        </div>

        {/* 5 Distinct Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {SUB_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isPassed = idx < currentTabIndex;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 cursor-pointer select-none relative group ${
                  isActive
                    ? "bg-[#4455A5] text-white border-indigo-700 shadow-md ring-2 ring-indigo-300"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : isPassed
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-200 text-slate-700"
                  }`}>
                    گام {tab.stepNumber}
                  </span>

                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? "bg-white/20 text-white" : "bg-white text-indigo-600 border border-slate-200"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className={`text-xs font-black line-clamp-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                    {tab.shortTitle}
                  </h4>
                  <p className={`text-[10px] line-clamp-1 mt-0.5 ${isActive ? "text-indigo-100" : "text-slate-500"}`}>
                    {tab.desc}
                  </p>
                </div>

                {isActive && (
                  <div className="w-full h-1 bg-amber-400 rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-600 hover:text-emerald-800 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* SUB-TAB 1: ROADMAP & CAREER TARGETS                      */}
      {/* ======================================================== */}
      {activeTab === "roadmap" && (
        <div className="space-y-6">
          {/* Quick Search for Roles */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>روی هر سمت یا شغل کلیک نمایید تا شناسنامه و پیش‌نیازهای رسمی آن نمایش داده شود.</span>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                placeholder="جستجوی عنوان شغل در کارراهه..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute left-3 top-2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <InteractiveCareerRoadmap
            levels={CAREER_LEVELS}
            selectedRoleName={selectedRoleName}
            onSelectRole={(role, level) => handleRoleCardClick(role, level)}
            targetRoles={targetRoles}
            onToggleTarget={(roleName) => handleToggleTarget(roleName)}
            onOpenDetailModal={(roleName, levelTitle) => {
              setModalRoleInfo({ roleName, levelTitle });
            }}
            searchTerm={searchTerm}
          />

          {/* Stepper Footer Action */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <div className="text-xs text-slate-600 font-medium">
              <span>گام بعدی: </span>
              <strong className="text-slate-900 font-bold">بررسی پیش‌نیازها و گواهی‌های لازم برای سمت هدف</strong>
            </div>

            <button
              type="button"
              onClick={() => handleTabChange("prerequisites")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <span>رفتن به گام ۲: پیش‌نیازها و گواهی‌ها</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: PREREQUISITES & CERTIFICATIONS                */}
      {/* ======================================================== */}
      {activeTab === "prerequisites" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>پیش‌نیازهای احراز جایگاه انتخابی: <span className="text-indigo-600 font-black">«{selectedRoleName}»</span></span>
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold">تغییر سمت تحت بررسی:</span>
                <select
                  value={selectedRoleName}
                  onChange={(e) => setSelectedRoleName(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  {CAREER_LEVELS.flatMap(l => l.roles).map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              جهت ارتقا به این رده، احراز گواهی‌های تیراندازی و انضباطی، دوره‌های تخصصی رسته، و نمره حدنصاب کارنامه عملکرد الزامی است.
            </p>
          </div>

          <CareerPrerequisitesPanel
            selectedRoleName={selectedRoleName}
            onSelectRole={(role) => setSelectedRoleName(role)}
            targetRoles={targetRoles}
            onToggleTarget={(role) => handleToggleTarget(role)}
            onOpenDetailModal={(role, levelTitle) => {
              setModalRoleInfo({ roleName: role, levelTitle });
            }}
          />

          {/* Stepper Navigation Buttons */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <button
              type="button"
              onClick={() => handleTabChange("roadmap")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به گام ۱: نقشه کارراهه</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("timeline")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <span>رفتن به گام ۳: گاه‌شمار درجات نظامی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: 4-YEAR STATUTORY MILITARY RANK TIMELINE      */}
      {/* ======================================================== */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>تایملاین سنواتی ترفیع درجات انتظامی (ماده ۷۸ و ۸۲ قانون استخدام فراجا)</span>
              </h3>
              <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 font-black px-2.5 py-1 rounded-full">
                توقف ۴ سال تمام در هر درجه
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              با انتخاب هر درجه، مشاغل سازمانی متناظر در کلانتری ۱۰۳ نمایش داده می‌شود. با کلیک بر روی هر یک از مشاغل سازمانی، شناسنامه کامل و شرح وظایف مصوب آن لود خواهد شد.
            </p>
          </div>

          <RankPromotionTimeline 
            variant="light" 
            showTitle={true} 
            className="shadow-sm border-slate-200" 
            onSelectJob={handleSelectJobFromTimeline}
          />

          {/* Stepper Navigation Buttons */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <button
              type="button"
              onClick={() => handleTabChange("prerequisites")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به گام ۲: پیش‌نیازها</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("succession")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <span>رفتن به گام ۴: طرح جانشین‌پروری یگانی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: SUCCESSION PLANNING & TALENT POOL            */}
      {/* ======================================================== */}
      {activeTab === "succession" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>سامانه پایش استعدادها و جانشین‌پروری یگانی (Succession Readiness)</span>
              </h3>
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-black px-2.5 py-1 rounded-full">
                کلانتری ۱۰۳ گاندی تهران
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              تحلیل میزان انطباق شایستگی‌های پرسنل با رده‌های کلیدی فرماندهی و عملیات کلانتری. سمت‌های نیازمند جانشین با شاخص‌های آمادگی فوری، کوتاه‌مدت و بلندمدت تفکیک شده‌اند.
            </p>
          </div>

          <SuccessionReadinessPanel />

          {/* Stepper Navigation Buttons */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <button
              type="button"
              onClick={() => handleTabChange("timeline")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به گام ۳: درجات نظامی</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("ai-insights")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <span>رفتن به گام ۵: توصیه‌های هوشمند</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 5: SMART AI ACCELERATION RECOMMENDATIONS         */}
      {/* ======================================================== */}
      {activeTab === "ai-insights" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>توصیه‌های شتاب‌دهی هوشمند کارراهه (خلاصه تحلیلی موجز)</span>
              </h3>
              <span className="text-[11px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2.5 py-1 rounded-full">
                تحلیل هوش مصنوعی • کانون ارزیابی فراجا
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              بر مبنای شکاف‌های ارزیابی عملکرد و سمت‌های هدف انتخابی شما، مهارت‌ها و دوره‌های دارای بالاترین ضریب اثربخشی در ارتقای رتبه سازمانی استخراج شده‌اند.
            </p>
          </div>

          <CareerSmartRecommendations />

          {/* Stepper Navigation Buttons */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <button
              type="button"
              onClick={() => handleTabChange("succession")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به گام ۴: جانشین‌پروری</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("roadmap")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تکمیل و بازگشت به نقشه کارراهه</span>
            </button>
          </div>
        </div>
      )}

      {/* Global Detailed Modal with Domain Breakdown, Approved Duties, and Competencies */}
      <AnimatePresence>
        {modalRoleInfo && (
          <CareerRoleDetailModal
            roleName={modalRoleInfo.roleName}
            levelTitle={modalRoleInfo.levelTitle}
            isCurrent={modalRoleInfo.roleName.includes("مامور ارشد گشت موتوری")}
            isPassed={modalRoleInfo.roleName.includes("گشت پیاده")}
            isTarget={targetRoles.includes(modalRoleInfo.roleName)}
            onClose={() => setModalRoleInfo(null)}
            onToggleTarget={(rName) => handleToggleTarget(rName)}
          />
        )}
      </AnimatePresence>

      {/* Bento Grid Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-indigo-950 text-xs">قوانین ارتقای طلایی (ارشدیت تشویقی)</h4>
            <p className="text-[11px] text-indigo-800/80 leading-relaxed mt-1">
              در صورت کسب کارنامه عالی در سه دوره متوالی، امکان اعمال تا ۶ ماه ارشدیت تشویقی در کمیسیون ترفیعات فراجا طبق ماده ۱۶۴ وجود دارد.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-emerald-950 text-xs">نشان جانشین‌پروری سازمانی</h4>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed mt-1">
              سمت‌هایی که نشان «برنامه جانشین‌پروری» دارند، اولویت انتصاب فرماندهی بوده و دوره‌های عالی فراجا برای آنان برنامه‌ریزی می‌گردد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
