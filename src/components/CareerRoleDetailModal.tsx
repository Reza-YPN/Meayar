import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Scale,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  X,
  Zap,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  BookmarkCheck,
  Check,
  Building2,
  Calendar,
  Layers,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { RolePrerequisiteDetail, ROLE_PREREQUISITES_DATA } from "../data/careerPrerequisitesData";

interface Props {
  roleName: string;
  levelTitle: string;
  isCurrent?: boolean;
  isPassed?: boolean;
  isTarget?: boolean;
  onClose: () => void;
  onToggleTarget: (roleName: string) => void;
}

export function CareerRoleDetailModal({
  roleName,
  levelTitle,
  isCurrent,
  isPassed,
  isTarget,
  onClose,
  onToggleTarget,
}: Props) {
  // Fallback in case roleName is not in data
  const data: RolePrerequisiteDetail = ROLE_PREREQUISITES_DATA[roleName] || {
    roleName,
    levelTitle,
    category: "عملیاتی و صفی",
    summary: "اطلاعات پیش‌نیازهای این سمت بر اساس استانداردهای سازمانی فراجا تعریف شده است.",
    minScore: 85,
    minExperienceYears: 2,
    requiredRank: "ستوان‌یکم",
    currentReadinessPercent: 65,
    domains: [
      {
        id: "d1",
        title: "مهارت‌ها و شایستگی‌های عمومی",
        iconName: "book",
        description: "پیش‌نیازهای آموزشی و ارزیابی‌های مربوطه",
        progressPercent: 70,
        items: [
          { id: "i1", title: "دوره ارتقای مهارت‌های شغلی", description: "گذراندن ساعات آموزشی مصوب", isPassed: true, type: "دوره الزامی", hoursOrScore: "۴۰ ساعت" },
          { id: "i2", title: "کسب حداقل نمره ارزیابی", description: "تاییدیه عملکردی دوره گذشته", isPassed: false, type: "شاخص عملکردی", hoursOrScore: "نمره ۸۵" }
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ارشد سازمانی",
      welfareQuotaBonus: "سهمیه مصوب حکمت",
      commandAuthority: "هدایت عملیاتی رده مربوطه"
    }
  };

  const [selectedDomainId, setSelectedDomainId] = useState<string>(data.domains[0]?.id || "all");
  const [selectedDomainItem, setSelectedDomainItem] = useState<any | null>(null);

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

  // Calculate totals
  const allItems = data.domains.flatMap(d => d.items);
  const passedItemsCount = allItems.filter(i => i.isPassed).length;
  const totalItemsCount = allItems.length;

  const currentDomain = data.domains.find(d => d.id === selectedDomainId) || data.domains[0];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 z-50 overflow-y-auto" dir="rtl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] text-right"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
                  {data.levelTitle}
                </span>
                <span className="text-[10px] font-bold bg-white/10 text-slate-300 px-2 py-0.5 rounded-full">
                  رسته: {data.category}
                </span>
                {isCurrent && (
                  <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> شغل فعلی شما
                  </span>
                )}
                {isTarget && !isCurrent && (
                  <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BookmarkCheck className="w-3 h-3 text-amber-400" /> هدف انتخابی شما
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {data.roleName}
              </h2>
              <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl font-normal leading-relaxed">
                {data.summary}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors flex-shrink-0"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar in Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">حداقل امتیاز کارنامه</span>
              <span className="font-mono font-black text-amber-300 text-sm mt-0.5 block">{data.minScore}+</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">حداقل سابقه کل</span>
              <span className="font-mono font-black text-indigo-200 text-sm mt-0.5 block">{data.minExperienceYears} سال</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">درجه سازمانی مورد نیاز</span>
              <span className="font-bold text-slate-200 text-xs mt-0.5 block truncate">{data.requiredRank}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">آمادگی فعلی شما</span>
              <span className="font-mono font-black text-emerald-400 text-sm mt-0.5 block">{data.currentReadinessPercent}٪</span>
            </div>
          </div>
        </div>

        {/* Modal Body with Domain Tabs */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Readiness Progress Bar */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black text-indigo-950">
                  وضعیت احراز پیش‌نیازها: {passedItemsCount} از {totalItemsCount} مورد تکمیل شده است.
                </span>
              </div>
              <p className="text-[11px] text-indigo-800/80">
                با انتخاب این سمت و تکمیل دوره‌های پیشنهادی، امتیاز شایستگی شما مستقیماً در پرونده کارگزینی ثبت می‌شود.
              </p>
            </div>

            <div className="w-full sm:w-40 shrink-0">
              <div className="flex justify-between text-[10px] font-bold text-indigo-900 mb-1">
                <span>تکمیل پیش‌نیازها</span>
                <span>{Math.round((passedItemsCount / (totalItemsCount || 1)) * 100)}٪</span>
              </div>
              <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${(passedItemsCount / (totalItemsCount || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Domain Selection Tabs (حوزه‌های مختلف پیش‌نیازها) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                حوزه‌های پیش‌نیاز تخصصی این سمت:
              </h3>
              <span className="text-[10px] text-slate-400 font-bold">
                (جهت بررسی موارد هر حوزه، تب مربوطه را انتخاب نمایید)
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {data.domains.map((domain) => {
                const isDomainActive = domain.id === currentDomain?.id;
                const DomainIcon = getDomainIcon(domain.iconName);
                const passedInDomain = domain.items.filter(i => i.isPassed).length;

                return (
                  <button
                    key={domain.id}
                    onClick={() => {
                      setSelectedDomainId(domain.id);
                      setSelectedDomainItem(null);
                    }}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                      isDomainActive
                        ? "bg-[#4455A5] text-white border-indigo-700 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <DomainIcon className={`w-3.5 h-3.5 ${isDomainActive ? "text-amber-300" : "text-indigo-600"}`} />
                    <span>{domain.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isDomainActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {passedInDomain}/{domain.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Domain Checklist */}
          {currentDomain && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    {React.createElement(getDomainIcon(currentDomain.iconName), {
                      className: "w-4 h-4 text-indigo-600"
                    })}
                    <span>{currentDomain.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{currentDomain.description}</p>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-[10px] text-slate-400 block font-bold">پیشرفت این حوزه</span>
                  <span className="text-xs font-black text-indigo-700 font-mono">
                    {currentDomain.items.filter(i => i.isPassed).length} از {currentDomain.items.length} تایید شده
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {currentDomain.items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        item.isPassed
                          ? "bg-emerald-50/60 border-emerald-200 text-slate-800"
                          : "bg-white border-slate-200 hover:border-indigo-300 text-slate-800 shadow-xs"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {item.isPassed ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs" title="احراز شده">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center" title="در انتظار احراز">
                              <Clock className="w-3 h-3 text-slate-400" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-extrabold text-slate-900">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                              {item.type}
                            </span>
                            {item.hoursOrScore && (
                              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                                {item.hoursOrScore}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Action for Item */}
                      <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {item.isPassed ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> احراز شده در پرونده
                          </span>
                        ) : item.type === "دوره الزامی" ? (
                          <Link
                            to="/training"
                            onClick={onClose}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow-xs"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>ثبت‌نام در سامانه آموزش</span>
                          </Link>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                            نیازمند ارزیابی آتی
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Career Benefits & Privileges Bento Box */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              مزایا و امتیازات احراز این سمت در ساختار فراجا:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[10px] text-slate-300 block font-medium">افزایش حقوق و گرید</span>
                <span className="font-bold text-white text-xs mt-1 block">{data.careerBenefits.salaryGradeIncrease}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[10px] text-slate-300 block font-medium">سهمیه رفاهی و تسهیلات</span>
                <span className="font-bold text-white text-xs mt-1 block">{data.careerBenefits.welfareQuotaBonus}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[10px] text-slate-300 block font-medium">اختیارات و سطح فرماندهی</span>
                <span className="font-bold text-white text-xs mt-1 block">{data.careerBenefits.commandAuthority}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 flex items-center gap-1 text-center sm:text-right">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>پیش‌نیازها به صورت بلادرنگ با ثبت دوره‌ها و نمرات ارزیابی مربی به روز می‌شوند.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              بستن
            </button>

            {!isCurrent && !isPassed && (
              <button
                onClick={() => {
                  onToggleTarget(roleName);
                  onClose();
                }}
                className={`text-xs font-black px-5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isTarget
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>{isTarget ? "حذف از اهداف شغلی من" : "انتخاب به عنوان هدف شغلی ترجیحی"}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
