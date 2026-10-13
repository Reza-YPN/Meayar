import React, { useState } from "react";
import { 
  Check, 
  CheckCircle2, 
  Star, 
  Clock, 
  Target, 
  BookmarkCheck, 
  Eye, 
  Zap, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Route, 
  Info, 
  Shield, 
  ArrowLeft, 
  Award,
  Layers,
  Search,
  Crosshair
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CareerRole {
  name: string;
  isCurrent?: boolean;
  isPassed?: boolean;
  badge?: string;
  category?: string;
  rankTarget?: string;
}

export interface CareerLevel {
  id: number;
  title: string;
  statusText: string;
  statusType: "passed" | "current" | "future";
  requirements?: {
    points: number;
    experienceYears: number;
    requiredRank?: string;
  };
  description?: string;
  roles: CareerRole[];
}

interface InteractiveCareerRoadmapProps {
  levels: CareerLevel[];
  selectedRoleName: string;
  onSelectRole: (role: CareerRole, level: CareerLevel) => void;
  targetRoles: string[];
  onToggleTarget: (roleName: string) => void;
  onOpenDetailModal: (roleName: string, levelTitle: string) => void;
  searchTerm?: string;
}

export function InteractiveCareerRoadmap({
  levels,
  selectedRoleName,
  onSelectRole,
  targetRoles,
  onToggleTarget,
  onOpenDetailModal,
  searchTerm = ""
}: InteractiveCareerRoadmapProps) {
  // View mode: 'journey' (compact stepper with deep dive, ZERO horizontal scroll) vs 'grid' (high-density compact 3-column matrix)
  const [viewMode, setViewMode] = useState<"journey" | "grid">("journey");
  
  // Currently active level tab in journey mode (defaults to level 2 - current position)
  const [activeLevelId, setActiveLevelId] = useState<number>(2);
  
  // Quick level filter
  const [filterMode, setFilterMode] = useState<"all" | "current" | "target" | "succession">("all");

  const currentLevel = levels.find(l => l.id === activeLevelId) || levels[1];
  const passedCount = levels.filter(l => l.statusType === "passed").length;
  const currentCount = levels.filter(l => l.statusType === "current").length;
  const overallProgressPercent = Math.round(((passedCount + currentCount * 0.5) / levels.length) * 100);

  // Fast-track primary trajectory for police patrol officers
  const fastTrackTrajectory = [
    { levelId: 1, role: "کمک‌متصدی عملیات و گشت پیاده", label: "مقدماتی", status: "passed" },
    { levelId: 2, role: "مامور ارشد گشت موتوری فوریت‌های ۱۱۰", label: "شغل فعلی شما", status: "current" },
    { levelId: 3, role: "سرتیم گشت موتوری واکنش سریع ۱۱۰", label: "هدف اول", status: "target" },
    { levelId: 4, role: "افسر شیفت عملیات کلانتری", label: "تخصصی", status: "future" },
    { levelId: 5, role: "معاون عملیات و پیشگیری کلانتری", label: "جانشین‌پروری", status: "future" },
    { levelId: 6, role: "رئیس کلانتری (فرمانده حوزه)", label: "فرماندهی عالی", status: "future" }
  ];

  // Filtered levels for grid view
  const filteredLevels = levels.filter(level => {
    if (filterMode === "current") return level.statusType === "current";
    if (filterMode === "target") return level.id === 3; // level 3 is immediate target
    if (filterMode === "succession") return level.id >= 4;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6 text-right" dir="rtl">
      {/* Top Header & View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Route className="w-5 h-5" />
            </span>
            <h3 className="text-base font-black text-slate-900">
              نمودار هوشمند کارراهه شغلی و جانشین‌پروری
            </h3>
            <span className="text-[11px] font-bold bg-indigo-500/10 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
              پیشرفت: {passedCount} از {levels.length} سطح طی شده ({overallProgressPercent}٪)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            جهت جلوگیری از اسکرول طولانی، می‌توانید از نمای گام‌به‌گام یا شبکه فشرده استفاده کرده و روی هر سمت کلیک کنید.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80">
            <button
              onClick={() => setViewMode("journey")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "journey"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>نمای مرحله‌ای تعاملی</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>نمای ماتریس کامل (۶ سطح)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fast-Track Metro Trajectory Bar (مسیر خطی مستقیم افسر) */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
            <Crosshair className="w-4 h-4 text-amber-400" />
            خط سیر پیشنهادی شما تا فرماندهی حوزه کلانتری:
          </span>
          <span className="text-[11px] text-slate-400">
            روی هر ایستگاه کلیک کنید تا جزئیات آن لود شود
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 relative">
          {fastTrackTrajectory.map((item, idx) => {
            const isSelected = activeLevelId === item.levelId;
            const isCurrent = item.status === "current";
            const isTarget = item.status === "target" || targetRoles.includes(item.role);
            const isPassed = item.status === "passed";

            return (
              <button
                key={item.levelId}
                onClick={() => {
                  setActiveLevelId(item.levelId);
                  const foundLvl = levels.find(l => l.id === item.levelId);
                  const foundRole = foundLvl?.roles.find(r => r.name === item.role) || foundLvl?.roles[0];
                  if (foundLvl && foundRole) {
                    onSelectRole(foundRole, foundLvl);
                  }
                }}
                className={`p-2.5 rounded-xl border text-right transition-all duration-200 cursor-pointer relative group flex flex-col justify-between select-none ${
                  isSelected 
                    ? "bg-indigo-950/90 border-amber-400 ring-2 ring-amber-400/30 shadow-lg" 
                    : isCurrent
                    ? "bg-indigo-900/60 border-indigo-400/80 hover:border-indigo-300"
                    : isPassed
                    ? "bg-slate-950/60 border-emerald-500/40 hover:border-emerald-400"
                    : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                  <span className={`${
                    isCurrent 
                      ? "text-amber-300 font-black" 
                      : isPassed 
                      ? "text-emerald-400" 
                      : isTarget 
                      ? "text-emerald-300" 
                      : "text-slate-400"
                  }`}>
                    گام {idx + 1}: {item.label}
                  </span>

                  {isPassed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                  ) : isTarget ? (
                    <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : null}
                </div>

                <div className={`text-[11px] font-bold leading-tight ${
                  isCurrent ? "text-white font-black" : isSelected ? "text-amber-200 font-black" : "text-slate-300"
                }`}>
                  {item.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE 1: INTERACTIVE JOURNEY MAP (COMPACT, ZERO HORIZONTAL SCROLL) */}
      {viewMode === "journey" && (
        <div className="space-y-4">
          {/* Level Stepper Buttons Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            {levels.map((level) => {
              const isActive = level.id === activeLevelId;
              const isCurrent = level.statusType === "current";
              const isPassed = level.statusType === "passed";

              return (
                <button
                  key={level.id}
                  onClick={() => setActiveLevelId(level.id)}
                  className={`py-2.5 px-3 rounded-xl text-center text-xs transition cursor-pointer flex flex-col items-center justify-center gap-1 border select-none ${
                    isActive
                      ? "bg-[#4455A5] text-white font-black border-indigo-700 shadow-md ring-2 ring-indigo-300"
                      : isCurrent
                      ? "bg-amber-50 text-amber-900 border-amber-300 font-black hover:bg-amber-100"
                      : isPassed
                      ? "bg-emerald-50/70 text-emerald-800 border-emerald-200 font-bold hover:bg-emerald-100"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-indigo-700"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {isPassed && <Check className="w-3 h-3 text-emerald-600" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                    <span className="text-[11px]">{level.title.split(":")[0]}</span>
                  </div>
                  <span className={`text-[10px] ${isActive ? "text-indigo-100" : "text-slate-400"}`}>
                    {level.title.split(":")[1]?.trim() || level.statusText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Level Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLevel.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4"
            >
              {/* Level Status & Requirement Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    currentLevel.statusType === "current"
                      ? "bg-amber-500 text-slate-950 font-black ring-4 ring-amber-500/20"
                      : currentLevel.statusType === "passed"
                      ? "bg-emerald-600 text-white font-black"
                      : "bg-[#4455A5] text-white font-black"
                  }`}>
                    {currentLevel.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-sm text-slate-900">
                        {currentLevel.title}
                      </h4>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        currentLevel.statusType === "current"
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : currentLevel.statusType === "passed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200"
                      }`}>
                        {currentLevel.statusText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      تعداد سمت‌های تعریف‌شده در این رده: <strong className="text-slate-800">{currentLevel.roles.length} شغل</strong>
                    </p>
                  </div>
                </div>

                {/* Requirements Pills */}
                {currentLevel.requirements && (
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-900 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      <span>امتیاز کارنامه: {currentLevel.requirements.points}+</span>
                    </span>
                    <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>حداقل سابقه: {currentLevel.requirements.experienceYears} سال</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Roles in Active Level Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentLevel.roles.map((role) => {
                  const isTarget = targetRoles.includes(role.name);
                  const isSelectedInPanel = selectedRoleName === role.name;
                  const isMatched = searchTerm ? role.name.includes(searchTerm) : false;

                  return (
                    <div
                      key={role.name}
                      onClick={() => onSelectRole(role, currentLevel)}
                      className={`p-4 rounded-2xl border text-right transition-all duration-200 relative group cursor-pointer flex flex-col justify-between shadow-sm select-none ${
                        isSelectedInPanel
                          ? "ring-2 ring-indigo-600 ring-offset-2 border-indigo-400 bg-white shadow-md"
                          : role.isCurrent
                          ? "bg-gradient-to-tr from-indigo-900 to-indigo-700 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300"
                          : role.isPassed
                          ? "bg-white border-emerald-200 hover:border-emerald-400 text-slate-800"
                          : isTarget
                          ? "bg-emerald-50/90 border-emerald-500 text-slate-900 ring-2 ring-emerald-400/40"
                          : "bg-white border-slate-200 hover:border-indigo-300 text-slate-800 hover:shadow"
                      } ${isMatched ? "ring-2 ring-amber-400" : ""}`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        {role.isCurrent ? (
                          <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            شغل کنونی شما
                          </span>
                        ) : isTarget ? (
                          <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <BookmarkCheck className="w-3 h-3" />
                            هدف شغلی ثبت‌شده
                          </span>
                        ) : role.isPassed ? (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            گذرانده شده
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">
                            قابل انتخاب به عنوان هدف
                          </span>
                        )}

                        {role.badge && (
                          <span className="text-[9px] font-black bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                            {role.badge}
                          </span>
                        )}
                      </div>

                      {/* Job Title */}
                      <div className="my-1">
                        <h5 className={`text-xs sm:text-sm font-black leading-relaxed ${
                          role.isCurrent ? "text-white" : isSelectedInPanel ? "text-indigo-900" : "text-slate-800"
                        }`}>
                          {role.name}
                        </h5>
                        {isSelectedInPanel && (
                          <span className="text-[10px] font-bold text-indigo-600 mt-1 block flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            در حال نمایش در پنل پیش‌نیازهای زیر
                          </span>
                        )}
                      </div>

                      {/* Action Buttons Footer */}
                      <div className={`mt-3 pt-2.5 border-t flex items-center justify-between gap-2 ${
                        role.isCurrent ? "border-white/20" : "border-slate-100"
                      }`}>
                        {/* Target Toggle Button */}
                        {currentLevel.statusType === "future" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleTarget(role.name);
                            }}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                              isTarget
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200"
                            }`}
                          >
                            <BookmarkCheck className="w-3.5 h-3.5" />
                            <span>{isTarget ? "حذف از هدف" : "ثبت به عنوان هدف"}</span>
                          </button>
                        )}

                        {/* Open Detail Modal */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetailModal(role.name, currentLevel.title);
                          }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer mr-auto ${
                            role.isCurrent
                              ? "bg-white/20 hover:bg-white/30 text-white"
                              : "bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200"
                          }`}
                          title="مشاهده پیش‌نیازها به تفکیک حوزه‌ها"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>پیش‌نیازها</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows for Levels */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveLevelId(Math.max(1, activeLevelId - 1))}
                  disabled={activeLevelId === 1}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>سطح قبلی</span>
                </button>

                <span className="text-xs text-slate-400 font-bold">
                  سطح {activeLevelId} از {levels.length}
                </span>

                <button
                  onClick={() => setActiveLevelId(Math.min(levels.length, activeLevelId + 1))}
                  disabled={activeLevelId === levels.length}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>سطح بعدی</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* MODE 2: COMPACT GRID MATRIX (ALL 6 LEVELS IN 3-COLUMN HIGH-DENSITY GRID, NO HORIZONTAL SCROLL) */}
      {viewMode === "grid" && (
        <div className="space-y-4">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500">فیلتر سریع:</span>
            {[
              { id: "all", label: "همه ۶ سطح" },
              { id: "current", label: "شغل فعلی من (سطح ۲)" },
              { id: "target", label: "اهداف کوتاه‌مدت (سطح ۳)" },
              { id: "succession", label: "برنامه جانشین‌پروری و ارشد (سطوح ۴ تا ۶)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id as any)}
                className={`text-xs font-bold px-3 py-1 rounded-xl transition cursor-pointer border ${
                  filterMode === tab.id
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLevels.map((level) => {
              const isCurrentLevel = level.statusType === "current";
              const isPassedLevel = level.statusType === "passed";

              return (
                <div
                  key={level.id}
                  className={`rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                    isCurrentLevel
                      ? "bg-indigo-50/70 border-indigo-400 shadow-md ring-2 ring-indigo-200"
                      : isPassedLevel
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white border-slate-200 hover:border-indigo-300 shadow-sm"
                  }`}
                >
                  {/* Card Header */}
                  <div className="border-b border-slate-200/80 pb-2.5 mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                        isCurrentLevel
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : isPassedLevel
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200"
                      }`}>
                        {level.title}
                      </span>

                      {level.requirements && (
                        <span className="text-[10px] text-slate-500 font-bold">
                          {level.requirements.points}+ امتیاز • {level.requirements.experienceYears} سال+
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold mt-1">
                      {level.statusText}
                    </p>
                  </div>

                  {/* Role List */}
                  <div className="space-y-2 flex-1 mb-3">
                    {level.roles.map((role) => {
                      const isTarget = targetRoles.includes(role.name);
                      const isSelectedInPanel = selectedRoleName === role.name;

                      return (
                        <div
                          key={role.name}
                          onClick={() => onSelectRole(role, level)}
                          className={`p-2.5 rounded-xl border text-xs leading-relaxed transition cursor-pointer select-none ${
                            isSelectedInPanel
                              ? "ring-2 ring-indigo-600 bg-white border-indigo-400 shadow-sm"
                              : role.isCurrent
                              ? "bg-[#4455A5] text-white font-black border-indigo-700"
                              : isTarget
                              ? "bg-emerald-600 text-white font-bold border-emerald-700"
                              : role.isPassed
                              ? "bg-white text-slate-600 border-slate-200"
                              : "bg-slate-50/70 hover:bg-white text-slate-700 border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5">
                              {role.isCurrent && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                              {isTarget && !role.isCurrent && <BookmarkCheck className="w-3.5 h-3.5 text-white shrink-0" />}
                              <span className="font-bold">{role.name}</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDetailModal(role.name, level.title);
                              }}
                              className="p-1 rounded bg-black/10 hover:bg-black/20 text-[9px] shrink-0"
                              title="مشاهده پیش‌نیازها"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer button */}
                  <button
                    onClick={() => {
                      setActiveLevelId(level.id);
                      setViewMode("journey");
                    }}
                    className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition cursor-pointer"
                  >
                    تمرکز بر این رده در نمای گام‌به‌گام
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Guide Note */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3.5 flex items-center justify-between text-xs text-indigo-900 gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 font-bold">
          <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
          پیش‌نیازها و شاخص‌های شایستگی سمت انتخابی در پنل زیر بارگذاری می‌شوند.
        </span>
        <span className="text-[11px] text-indigo-700 font-mono">
          سمت انتخاب‌شده: <strong>{selectedRoleName}</strong>
        </span>
      </div>
    </div>
  );
}
