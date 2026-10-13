import React, { useState } from "react";
import { 
  Info, 
  Check, 
  ArrowLeft, 
  ArrowDown, 
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
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CareerRoleDetailModal } from "../components/CareerRoleDetailModal";
import { CareerPrerequisitesPanel } from "../components/CareerPrerequisitesPanel";
import { CareerSmartRecommendations } from "../components/CareerSmartRecommendations";
import { RankPromotionTimeline } from "../components/RankPromotionTimeline";
import { InteractiveCareerRoadmap } from "../components/InteractiveCareerRoadmap";
import { ROLE_PREREQUISITES_DATA } from "../data/careerPrerequisitesData";

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

export function CareerPathPage() {
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
  const [activeSection, setActiveSection] = useState<"all" | "roadmap" | "timeline" | "skills">("all");

  const handleToggleTarget = (roleName: string) => {
    // Find level for this role
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
      showToast(`سمت "${roleName}" از لیست اهداف شما حذف شد.`);
    } else {
      if (foundLevel) {
        const otherRolesInLevel = foundLevel.roles.map(r => r.name);
        const cleanedTargets = targetRoles.filter(r => !otherRolesInLevel.includes(r));
        setTargetRoles([...cleanedTargets, roleName]);
      } else {
        setTargetRoles([...targetRoles, roleName]);
      }
      showToast(`سمت "${roleName}" به عنوان هدف ترجیحی شما ثبت شد!`);
    }
  };

  const handleRoleCardClick = (role: CareerRole, level: CareerLevel) => {
    // Update currently inspected role in live prerequisites panel
    setSelectedRoleName(role.name);

    if (level.statusType === "future") {
      handleToggleTarget(role.name);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const findLevelTitle = (roleName: string) => {
    for (const lvl of CAREER_LEVELS) {
      if (lvl.roles.some(r => r.name === roleName)) {
        return lvl.title;
      }
    }
    return "سطح تخصصی فراجا";
  };

  return (
    <div className="space-y-6 text-right relative" dir="rtl">
      {/* Sticky Job & Identity Box (باکس شغل ثابت و شفاف) */}
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
            <h3 className="text-base font-black text-white mt-0.5">
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

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-[#1E293B] flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-600 animate-pulse" />
            مسیر ارتقای شغلی و جانشین‌پروری (کارراهه هوشمند)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            با کلیک بر روی هر سمت شغلی، پیش‌نیازهای اختصاصی و حوزه‌های مهارتی آن به‌صورت بلادرنگ تغییر یافته و در پنل زیر نمایش داده می‌شوند.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="جستجوی سمت شغلی..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute top-2.5 right-3" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute left-3 top-2.5 hover:text-slate-600 text-slate-400 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Top Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm"
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

      {/* Top Section Navigation Bar (کاهش اسکرول طولانی و تفکیک شفاف) */}
      <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 ml-2">نمایش بخش‌ها:</span>
          {[
            { id: "all", label: "نمایش همه بخش‌ها", icon: Layers },
            { id: "roadmap", label: "۱. نمودار کارراهه و پیش‌نیازها", icon: Target },
            { id: "timeline", label: "۲. تایملاین ۴ ساله درجه نظامی", icon: Clock },
            { id: "skills", label: "۳. مهارت‌های پیشنهادی هوش مصنوعی", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-slate-400 font-bold hidden md:inline">
          روی هر سمت کلیک کنید تا پیش‌نیازهای اختصاصی آن لود شود
        </span>
      </div>

      {/* 1. Career Roadmap & Live Prerequisites Panel */}
      {(activeSection === "all" || activeSection === "roadmap") && (
        <div className="space-y-6">
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

          {/* DYNAMIC LIVE PREREQUISITES PANEL BY SELECTED ROLE & DOMAINS */}
          <CareerPrerequisitesPanel
            selectedRoleName={selectedRoleName}
            onSelectRole={(role) => setSelectedRoleName(role)}
            targetRoles={targetRoles}
            onToggleTarget={(role) => handleToggleTarget(role)}
            onOpenDetailModal={(role, levelTitle) => {
              setModalRoleInfo({ roleName: role, levelTitle });
            }}
          />
        </div>
      )}

      {/* 2. Statutory 4-Year Military Rank Promotion Timeline */}
      {(activeSection === "all" || activeSection === "timeline") && (
        <div className="space-y-3">
          <RankPromotionTimeline variant="light" showTitle={true} className="shadow-sm border-slate-200" />
        </div>
      )}

      {/* 3. Intelligent AI Skill Recommendations for Next Promotion */}
      {(activeSection === "all" || activeSection === "skills") && (
        <div className="space-y-3">
          <CareerSmartRecommendations />
        </div>
      )}

      {/* Full Detailed Modal with Domain Breakdown */}
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

      {/* Information Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-indigo-950 text-xs">قوانین ارتقای طلایی (ویژه)</h4>
            <p className="text-[11px] text-indigo-800/80 leading-relaxed mt-1">
              در صورتی که برای سه دوره‌ی عملکردی مداوم، کارنامه عالی (طلایی) کسب کنید، می‌توانید زمان رسیدن به ارتقا را تا ۵۰٪ کوتاه تر کرده و به عنوان کارکنان نخبه در برنامه شتاب‌دهی رده‌ها قرار بگیرید.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-emerald-950 text-xs">برنامه جانشین‌پروری یگان‌ها</h4>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed mt-1">
              سمت‌هایی که نشان "برنامه جانشین پروری" دارند، به عنوان گرید‌های کلیدی و نیازمند کادر مجرب آینده شناخته می‌شوند. انتخاب این رده‌ها، شما را در دوره‌های توسعه سریع فاوای فراجا عضو خواهد کرد.
            </p>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-extrabold text-slate-800 text-xs">راهنمای وضعیت خانه‌ها و کادرهای مسیر شغلی:</h3>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-indigo-50 border border-indigo-100 rounded"></span>
            <span>سمت‌های گذرانده شده</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#4455A5] border border-indigo-700 rounded"></span>
            <span>سمت فعلی شما</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-emerald-600 border border-emerald-700 rounded"></span>
            <span>سمت‌های هدف ترجیحی شما</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white border border-slate-200 rounded"></span>
            <span>سمت‌های عمومی قابل احراز</span>
          </div>
        </div>
      </div>
    </div>
  );
}
