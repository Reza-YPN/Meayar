import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Layers,
  Scale,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  Check,
  ChevronLeft,
  ArrowLeft,
  Info,
  SlidersHorizontal,
  BookmarkCheck
} from "lucide-react";
import { RolePrerequisiteDetail, ROLE_PREREQUISITES_DATA } from "../data/careerPrerequisitesData";

interface Props {
  selectedRoleName: string;
  onSelectRole: (roleName: string) => void;
  targetRoles: string[];
  onToggleTarget: (roleName: string) => void;
  onOpenDetailModal: (roleName: string, levelTitle: string) => void;
}

export function CareerPrerequisitesPanel({
  selectedRoleName,
  onSelectRole,
  targetRoles,
  onToggleTarget,
  onOpenDetailModal,
}: Props) {
  const [activeDomainTab, setActiveDomainTab] = useState<string>("all");

  const data: RolePrerequisiteDetail = ROLE_PREREQUISITES_DATA[selectedRoleName] || {
    roleName: selectedRoleName,
    levelTitle: "سطح تخصصی",
    category: "عملیاتی و صفی",
    summary: "پیش‌نیازها و شاخص‌های شایستگی اختصاصی این سمت شغلی.",
    minScore: 85,
    minExperienceYears: 2,
    requiredRank: "ستوان‌یکم",
    currentReadinessPercent: 65,
    domains: [
      {
        id: "d1",
        title: "مهارت‌های عمومی و عملیاتی",
        iconName: "shield",
        description: "آموزش‌ها و گواهی‌های لازم",
        progressPercent: 70,
        items: [
          { id: "i1", title: "دوره تخصصی سازمانی", description: "گذراندن ساعات مصوب", isPassed: true, type: "دوره الزامی", hoursOrScore: "۴۰ ساعت" },
          { id: "i2", title: "ارزیابی عملکرد دوره‌ای", description: "کسب حداقل نمره قبولی", isPassed: false, type: "شاخص عملکردی", hoursOrScore: "نمره ۸۵" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ارشد سازمانی",
      welfareQuotaBonus: "سهمیه مصوب حکمت",
      commandAuthority: "هدایت عملیاتی رده مربوطه"
    }
  };

  const isTarget = targetRoles.includes(selectedRoleName);
  const isCurrent = selectedRoleName.includes("مامور ارشد گشت موتوری");
  const isPassed = selectedRoleName.includes("گشت پیاده");

  const allItems = data.domains.flatMap((d) => d.items);
  const passedCount = allItems.filter((i) => i.isPassed).length;
  const totalCount = allItems.length;

  const filteredItems = activeDomainTab === "all"
    ? allItems
    : data.domains.find((d) => d.id === activeDomainTab)?.items || [];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case "shield": return Shield;
      case "book": return BookOpen;
      case "scale": return Scale;
      case "users": return Users;
      case "award": return Award;
      case "activity": return Sparkles;
      case "zap": default: return Zap;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden text-right" dir="rtl">
      {/* Panel Top Title Bar */}
      <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-0.5 rounded-full flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-indigo-400" />
              پیش‌نیازهای تفکیکی بر اساس شغل انتخابی
            </span>
            <span className="text-[11px] font-bold bg-white/10 text-slate-300 px-2.5 py-0.5 rounded-full">
              {data.levelTitle}
            </span>
            {isCurrent && (
              <span className="text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" /> شغل فعلی شما
              </span>
            )}
            {isTarget && !isCurrent && (
              <span className="text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <BookmarkCheck className="w-3 h-3" /> هدف انتخابی فعال
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span>سمت مورد بررسی:</span>
            <span className="text-amber-300 underline decoration-indigo-500 underline-offset-4 font-black">
              {data.roleName}
            </span>
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 max-w-3xl">
            {data.summary}
          </p>
        </div>

        {/* Quick Target Toggle or View Details Modal */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={() => onOpenDetailModal(data.roleName, data.levelTitle)}
            className="bg-indigo-600/40 hover:bg-indigo-600 border border-indigo-400/40 text-indigo-200 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>مشاهده ماتریس جامع پیش‌نیازها</span>
          </button>

          {!isCurrent && !isPassed && (
            <button
              onClick={() => onToggleTarget(data.roleName)}
              className={`text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isTarget
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{isTarget ? "لغو هدف" : "انتخاب به عنوان هدف"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Role Selector Quick Pills Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-black text-slate-500 shrink-0 flex items-center gap-1">
          <Target className="w-3.5 h-3.5 text-indigo-600" />
          تغییر سریع شغل جهت بررسی پیش‌نیازها:
        </span>
        {Object.keys(ROLE_PREREQUISITES_DATA).map((roleKey) => {
          const isSelected = roleKey === selectedRoleName;
          const isTargetRole = targetRoles.includes(roleKey);
          return (
            <button
              key={roleKey}
              onClick={() => {
                onSelectRole(roleKey);
                setActiveDomainTab("all");
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border ${
                isSelected
                  ? "bg-[#4455A5] text-white border-indigo-700 shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200 hover:border-indigo-300"
              }`}
            >
              {isTargetRole && !isSelected && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="هدف انتخابی" />
              )}
              <span>{roleKey}</span>
            </button>
          );
        })}
      </div>

      {/* Summary KPI Grid */}
      <div className="p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white border-b border-slate-100">
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-3.5 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-[11px] font-bold">
            <Star className="w-3.5 h-3.5 text-indigo-600" />
            <span>حداقل امتیاز کارنامه</span>
          </div>
          <div className="text-lg font-black text-indigo-900 font-mono mt-1">
            {data.minScore} <span className="text-xs text-slate-500 font-normal">از ۱۰۰</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-[11px] font-bold">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>حداقل سابقه کل</span>
          </div>
          <div className="text-lg font-black text-slate-800 font-mono mt-1">
            {data.minExperienceYears} <span className="text-xs text-slate-500 font-normal">سال خدمت</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-[11px] font-bold">
            <Shield className="w-3.5 h-3.5 text-slate-600" />
            <span>درجه سازمانی هدف</span>
          </div>
          <div className="text-sm font-black text-slate-800 mt-1 truncate">
            {data.requiredRank}
          </div>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3.5 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-800 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>درصد آمادگی فعلی شما</span>
          </div>
          <div className="text-lg font-black text-emerald-700 font-mono mt-1 flex items-center justify-center sm:justify-start gap-2">
            <span>{data.currentReadinessPercent}٪</span>
            <span className="text-[10px] font-bold text-slate-400">({passedCount} از {totalCount})</span>
          </div>
        </div>
      </div>

      {/* Domain Navigation Tabs (حوزه‌های مختلف پیش‌نیازها) */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              تفکیک پیش‌نیازها در حوزه‌های تخصصی (روی هر حوزه کلیک کنید):
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              برای احراز این سمت، باید چک‌لیست‌های مربوط به حوزه‌های زیر توسط کمیسیون شایستگی فراجا تایید گردند.
            </p>
          </div>
        </div>

        {/* Domain Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveDomainTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer border ${
              activeDomainTab === "all"
                ? "bg-[#4455A5] text-white border-indigo-700 shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            همه حوزه‌ها ({totalCount} مورد)
          </button>

          {data.domains.map((domain) => {
            const isActive = activeDomainTab === domain.id;
            const DomainIcon = getDomainIcon(domain.iconName);
            const passedInDomain = domain.items.filter((i) => i.isPassed).length;

            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainTab(domain.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? "bg-[#4455A5] text-white border-indigo-700 shadow-xs"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <DomainIcon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-indigo-600"}`} />
                <span>{domain.title}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {passedInDomain}/{domain.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Requirements Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  item.isPassed
                    ? "bg-emerald-50/40 border-emerald-200 text-slate-800"
                    : "bg-white border-slate-200/90 hover:border-indigo-300 shadow-xs"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {item.isPassed ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
                          <Clock className="w-3 h-3 text-slate-400" />
                        </div>
                      )}
                      <span className="text-xs font-black text-slate-900 leading-snug">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 pr-7 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 pr-7 flex items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    {item.hoursOrScore && (
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.hoursOrScore}
                      </span>
                    )}
                  </div>

                  {item.isPassed ? (
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> احراز شده
                    </span>
                  ) : item.type === "دوره الزامی" ? (
                    <Link
                      to="/training"
                      className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>سامانه آموزش</span>
                      <ChevronLeft className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="text-amber-600 font-bold">نیازمند آزمون/ارزیابی</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
