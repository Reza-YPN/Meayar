import React, { useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Briefcase, 
  Target, 
  BookOpen, 
  Zap, 
  Compass, 
  UserCheck, 
  BarChart2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SuccessionRole {
  id: string;
  level: number;
  title: string;
  department: string;
  timeHorizon: string;
  readinessScore: number;
  readinessStatus: "آماده ارتقا فوری" | "آماده ظرف ۶ تا ۱۲ ماه" | "نیازمند توسعه میان‌مدت (۱ تا ۲ سال)";
  statusColor: string;
  competencyMatchRate: number;
  experienceYearsRequired: number;
  employeeExperienceYears: number;
  keyRequirements: {
    competencyName: string;
    category: "فردی" | "تیمی" | "سازمانی" | "اجتماعی";
    requiredScore: number;
    currentScore: number;
    gap: number;
    status: "acquired" | "in_progress" | "gap";
    suggestedAction: string;
  }[];
  readinessFactors: {
    name: string;
    weight: number;
    score: number;
  }[];
}

const SUCCESSION_TARGETS: SuccessionRole[] = [
  {
    id: "succ_lead_moto",
    level: 3,
    title: "سرتیم گشت موتوری واکنش سریع ۱۱۰",
    department: "معاونت پیشگیری و عملیات - کلانتری ۱۰۳",
    timeHorizon: "۱ تا ۳ ماه آتی (اولویت اول)",
    readinessScore: 94,
    readinessStatus: "آماده ارتقا فوری",
    statusColor: "emerald",
    competencyMatchRate: 94,
    experienceYearsRequired: 3,
    employeeExperienceYears: 3.5,
    keyRequirements: [
      {
        competencyName: "راکبی تاکتیکی و مهار ترافیک معابر پرچگال",
        category: "فردی",
        requiredScore: 90,
        currentScore: 95,
        gap: 0,
        status: "acquired",
        suggestedAction: "حفظ سطح ممتاز و تدریس تجارب به نیروهای جدید"
      },
      {
        competencyName: "واکنش ضربتی کمتر از ۵ دقیقه در صحنه ۱۱۰",
        category: "تیمی",
        requiredScore: 92,
        currentScore: 96,
        gap: 0,
        status: "acquired",
        suggestedAction: "تثبیت زمان میانگین ۳ دقیقه و ۴۰ ثانیه به عنوان رکورد حوزه"
      },
      {
        competencyName: "تعقیب چابک، مهار متهمین و متوقف‌سازی قانونی",
        category: "فردی",
        requiredScore: 90,
        currentScore: 94,
        gap: 0,
        status: "acquired",
        suggestedAction: "مهار بدون خسارت جانی و مالی با رعایت کامل قوانین به‌کارگیری سلاح"
      },
      {
        competencyName: "فرماندهی زوجی و هدایت اکیپ‌های پشتیبان خودرویی",
        category: "تیمی",
        requiredScore: 92,
        currentScore: 90,
        gap: -2,
        status: "in_progress",
        suggestedAction: "گذراندن کارگاه هماهنگی بی‌سیم و مانورهای مشترک ۱۶ ساعته"
      },
      {
        competencyName: "مستندسازی حقوقی و صورتجلسه بازداشت بی‌نقص",
        category: "سازمانی",
        requiredScore: 92,
        currentScore: 91,
        gap: -1,
        status: "in_progress",
        suggestedAction: "آشنایی با آخرین رویه‌های قضایی بازپرسی دادسرای ناحیه ۳"
      }
    ],
    readinessFactors: [
      { name: "شایستگی‌های رفتاری و عملیاتی", weight: 40, score: 95 },
      { name: "کارنامه ارزیابی عملکرد ادواری", weight: 30, score: 94 },
      { name: "سابقه خدمت و صلاحیت‌های انتظامی", weight: 20, score: 96 },
      { name: "رضایت مردمی (سامانه ۱۹۷) و سلامت اداری", weight: 10, score: 97 }
    ]
  },
  {
    id: "succ_shift_officer",
    level: 4,
    title: "افسر شیفت عملیات کلانتری",
    department: "مرکز فرماندهی و کنترل عملیات ۱۰۳",
    timeHorizon: "۶ تا ۱۲ ماه (برنامه توانمندسازی)",
    readinessScore: 79,
    readinessStatus: "آماده ظرف ۶ تا ۱۲ ماه",
    statusColor: "indigo",
    competencyMatchRate: 79,
    experienceYearsRequired: 5,
    employeeExperienceYears: 3.5,
    keyRequirements: [
      {
        competencyName: "مدیریت و پایش همزمان کدهای ۱۱۰ و واحدهای گشتی",
        category: "سازمانی",
        requiredScore: 92,
        currentScore: 84,
        gap: -8,
        status: "gap",
        suggestedAction: "دوره مدیریت دیسپچینگ و سامانه موقوف پیشرفته (۲۴ ساعت)"
      },
      {
        competencyName: "تصمیم‌گیری تاکتیکی در موقعیت‌های مسلحانه و گروگان‌گیری",
        category: "فردی",
        requiredScore: 95,
        currentScore: 88,
        gap: -7,
        status: "gap",
        suggestedAction: "کارگاه شبیه‌سازی بحران و قواعد درگیری در یگان امداد"
      },
      {
        competencyName: "هماهنگی بین دوایر تجسس، قضایی و پیشگیری",
        category: "تیمی",
        requiredScore: 88,
        currentScore: 85,
        gap: -3,
        status: "in_progress",
        suggestedAction: "گذراندن دوره چرخش شغلی ۳ ماهه در دفتر افسر جانشین"
      },
      {
        competencyName: "تسلط بر قوانین کیفری و صدور دستورات اولیه قضایی",
        category: "سازمانی",
        requiredScore: 90,
        currentScore: 89,
        gap: -1,
        status: "in_progress",
        suggestedAction: "آزمون تخصصی ضابطین عام دادگستری فراجا"
      }
    ],
    readinessFactors: [
      { name: "شایستگی‌های عملیاتی میدانی", weight: 35, score: 93 },
      { name: "مهارت‌های مدیریتی و کنترل شیفت", weight: 35, score: 72 },
      { name: "تجربه و سنوات شغلی مورد نیاز", weight: 20, score: 70 },
      { name: "انضباط خدمتی و پرونده حفاظتی", weight: 10, score: 98 }
    ]
  },
  {
    id: "succ_deputy_ops",
    level: 5,
    title: "معاون عملیات و پیشگیری کلانتری",
    department: "ستاد فرماندهی کلانتری ۱۰۳ گاندی",
    timeHorizon: "۲ تا ۳ سال آتی (افق بلندمدت جانشین‌پروری)",
    readinessScore: 61,
    readinessStatus: "نیازمند توسعه میان‌مدت (۱ تا ۲ سال)",
    statusColor: "amber",
    competencyMatchRate: 61,
    experienceYearsRequired: 8,
    employeeExperienceYears: 3.5,
    keyRequirements: [
      {
        competencyName: "تدوین طرح‌های جامع پاکسازی و بلوک‌بندی امنیتی حوزه",
        category: "سازمانی",
        requiredScore: 95,
        currentScore: 70,
        gap: -25,
        status: "gap",
        suggestedAction: "دوره عالی مدیریت انتظامی در دانشگاه علوم انتظامی امین"
      },
      {
        competencyName: "تحلیل آمار جرم و پیش‌بینی جغرافیایی کانون‌های سرقت",
        category: "سازمانی",
        requiredScore: 92,
        currentScore: 74,
        gap: -18,
        status: "gap",
        suggestedAction: "آموزش سامانه‌های پیشرفته تحلیل داده‌های جرم‌خیزی فراجا"
      },
      {
        competencyName: "رهبری سازمانی و مدیریت انگیزش افسران و درجه‌داران",
        category: "اجتماعی",
        requiredScore: 94,
        currentScore: 82,
        gap: -12,
        status: "gap",
        suggestedAction: "طی دوره‌های تعالی رفتار فرماندهی و ارزیابی روان‌سنجی"
      }
    ],
    readinessFactors: [
      { name: "شایستگی‌های راهبردی و فرماندهی", weight: 40, score: 62 },
      { name: "تحلیل آمار و برنامه‌ریزی پیشگیرانه", weight: 30, score: 65 },
      { name: "سنوات و پیش‌نیازهای ترفیع درجات", weight: 20, score: 45 },
      { name: "سابقه عملکردی درخشان در رده‌های صفی", weight: 10, score: 95 }
    ]
  }
];

export function SuccessionReadinessPanel() {
  const [selectedRole, setSelectedRole] = useState<SuccessionRole>(SUCCESSION_TARGETS[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                ماژول تحلیلی جانشین‌پروری هوشمند
              </span>
              <span className="text-xs text-slate-300 font-bold">کلانتری ۱۰۳ گاندی</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              سنجش آمادگی و تطابق شایستگی‌های ستوان‌دوم محمدرضا یزدان‌پناه برای پست‌های بالاتر
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              این ماژول شایستگی‌های مکتسبه شما در جایگاه فعلی (گشت موتوری) را با الزامات پست‌های بالاتر مقایسه کرده و میزان تطابق و نقشه رفع شکاف‌های مهارتی را نمایش می‌دهد.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-[10px] text-slate-300 block font-bold">آمادگی پست هدف اول:</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">۹۴٪</span>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-300 block font-bold">وضعیت:</span>
              <span className="text-xs font-black text-white bg-emerald-600/60 px-2 py-0.5 rounded-md inline-block">
                واجد شرایط ترفیع
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Roles Selector Tabs */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/60">
        <label className="text-xs font-black text-slate-700 block mb-3">
          پست جانشینی مورد نظر را جهت تحلیل تطابق انتخاب کنید:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SUCCESSION_TARGETS.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">سطح سازمانی {role.level}</span>
                    <h4 className="font-black text-sm text-slate-900 mt-0.5">{role.title}</h4>
                  </div>
                  <span
                    className={`text-xs font-black font-mono px-2 py-1 rounded-lg ${
                      role.readinessScore >= 90
                        ? "bg-emerald-100 text-emerald-800"
                        : role.readinessScore >= 75
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {role.readinessScore}٪
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{role.timeHorizon}</span>
                  <span
                    className={`font-black ${
                      role.readinessScore >= 90
                        ? "text-emerald-600"
                        : role.readinessScore >= 75
                        ? "text-indigo-600"
                        : "text-amber-600"
                    }`}
                  >
                    {role.readinessStatus}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Analysis for Selected Role */}
      <div className="p-6 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-500 block">درصد تطابق شایستگی‌ها</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-indigo-700 font-mono">
                {selectedRole.competencyMatchRate}٪
              </span>
              <span className="text-xs text-slate-500 font-bold">از ۱۰۰٪ الزامات</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                style={{ width: `${selectedRole.competencyMatchRate}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-500 block">سنوات شغلی مورد نیاز</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-800 font-mono">
                {selectedRole.employeeExperienceYears}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                سال (حداقل مصوب: {selectedRole.experienceYearsRequired} سال)
              </span>
            </div>
            <div className="mt-3">
              {selectedRole.employeeExperienceYears >= selectedRole.experienceYearsRequired ? (
                <span className="text-[11px] text-emerald-700 font-black flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> احراز کامل شرط سنواتی
                </span>
              ) : (
                <span className="text-[11px] text-amber-700 font-black flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> نیازمند {(selectedRole.experienceYearsRequired - selectedRole.employeeExperienceYears).toFixed(1)} سال دیگر
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-500 block">وضعیت در مخزن استعداد (Talent Pool)</span>
            <div className="mt-2">
              <span className="text-lg font-black text-emerald-800 block">
                {selectedRole.readinessScore >= 90 ? "نامزد شماره ۱ جانشینی" : "در حال پرورش استعداد"}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                تاییدیه کمیته منابع انسانی کلانتری ۱۰۳
              </span>
            </div>
            <span className="inline-block mt-3 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              اولویت فراخوان دوره عالی
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[11px] font-bold text-slate-500 block">ضریب تاثیر بر حقوق پس از ارتقا</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-emerald-700 font-mono">
                {selectedRole.level === 3 ? "۱.۲۸×" : selectedRole.level === 4 ? "۱.۳۵×" : "۱.۴۵×"}
              </span>
              <span className="text-xs text-slate-500 font-bold">افزایش کارانه ماهانه</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-3 block">
              + افزایش فوق‌العاده مدیریت و سختی شیفت
            </span>
          </div>
        </div>

        {/* Detailed Competency Gap Matrix for this Role */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  ماتریس تحلیل شکاف شایستگی (Competency Gap Analysis) برای {selectedRole.title}
                </h4>
                <p className="text-[11px] text-slate-500">
                  مقایسه دقیق نمرات ارزیابی فعلی محمدرضا یزدان‌پناه با استانداردهای پست انتخابی
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500">
              تعداد شایستگی‌های پایش‌شده: {selectedRole.keyRequirements.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100/70 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3.5 font-bold">عنوان شایستگی و حوزه</th>
                  <th className="p-3.5 font-bold text-center">نمره مورد نیاز پست</th>
                  <th className="p-3.5 font-bold text-center">نمره فعلی کارمند</th>
                  <th className="p-3.5 font-bold text-center">شکاف مهارتی (Gap)</th>
                  <th className="p-3.5 font-bold text-center">وضعیت احراز</th>
                  <th className="p-3.5 font-bold">اقدام توسعه‌ای پیشنهادی (IDP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedRole.keyRequirements.map((req, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-black text-slate-900">{req.competencyName}</div>
                      <span className="text-[10px] font-bold text-slate-400">حوزه: {req.category}</span>
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-600">
                      {req.requiredScore}
                    </td>
                    <td className="p-3.5 text-center font-mono font-black text-indigo-700">
                      {req.currentScore}
                    </td>
                    <td className="p-3.5 text-center">
                      {req.gap >= 0 ? (
                        <span className="text-emerald-700 font-mono font-black text-xs bg-emerald-50 px-2 py-0.5 rounded">
                          +{req.gap} (فراتر از انتظار)
                        </span>
                      ) : (
                        <span className="text-rose-600 font-mono font-black text-xs bg-rose-50 px-2 py-0.5 rounded">
                          {req.gap} نمره
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      {req.status === "acquired" && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> احراز کامل
                        </span>
                      )}
                      {req.status === "in_progress" && (
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> در آستانه تکمیل
                        </span>
                      )}
                      {req.status === "gap" && (
                        <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> نیازمند دوره آموزشی
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-600 leading-relaxed font-medium">
                      {req.suggestedAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Recommendation Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-indigo-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              توصیه نهایی کمیسیون جانشین‌پروری برای این همکار:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              با توجه به آمادگی <strong>{selectedRole.readinessScore}٪</strong>، پرونده ستوان‌دوم یزدان‌پناه جهت صدور حکم سرتیمی و انتصاب به عنوان جانشین اول در دستور جلسه اول هیئت رئیسه کلانتری ۱۰۳ قرار گرفته است.
            </p>
          </div>
          <button 
            onClick={() => alert("درخواست شرکت در آزمون تکمیلی شایستگی به کارگزینی کلانتری ارسال گردید.")}
            className="bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-black px-4 py-2 rounded-xl transition shadow-sm shrink-0"
          >
            تایید و صدور معرفینامه آزمون ارتقا
          </button>
        </div>
      </div>
    </div>
  );
}
