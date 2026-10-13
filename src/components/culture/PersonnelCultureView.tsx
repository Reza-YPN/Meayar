import React, { useState } from "react";
import {
  Shield,
  User,
  Building2,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Layers,
  BookOpen,
  Award,
  AlertCircle,
} from "lucide-react";
import { DepartmentCultureData } from "../../types/culture";
import { CORE_PRINCIPLES } from "../../services/cultureData";
import { cn } from "../../lib/utils";

interface PersonnelCultureViewProps {
  departments: DepartmentCultureData[];
}

export function PersonnelCultureView({ departments }: PersonnelCultureViewProps) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0]?.id || "edari-1");
  const dept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner for Employee */}
      <div className="bg-emerald-900 text-white p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-black">
            <User className="w-4 h-4" />
            صندوق ورود و پایش فرهنگ پرسنل فراجا
          </div>
          <h2 className="text-xl md:text-2xl font-black">
            شناسنامه فرهنگی و رفتاری اداره من (مدل ادگار شاین)
          </h2>
          <p className="text-xs text-emerald-100/80 leading-relaxed">
            بر اساس داده‌های نظرسنجی و ارزیابی‌های صیانتی، خروجی فرهنگ غالب اداره و انتظارات رفتاری در ۳ لایه مصنوعات، ارزش‌ها و مفروضات برای شما تبیین شده است.
          </p>
        </div>
      </div>

      {/* Department Selector */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <label className="text-xs font-black text-slate-800 block">
              انتخاب اداره یا دایره خدمتی:
            </label>
            <span className="text-[11px] text-slate-400">
              مشاهده وضعیت فرهنگی و توصیه‌های رفتاری متناسب با یگان شما
            </span>
          </div>
        </div>

        <select
          value={selectedDeptId}
          onChange={(e) => setSelectedDeptId(e.target.value)}
          className="bg-slate-50 text-xs font-bold text-slate-800 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 min-w-[220px]"
        >
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Department Status Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block">انطباق فرهنگی اداره</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">{dept.complianceScore}٪</span>
            <span className="text-xs text-slate-500">شاخص عمومی</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${dept.complianceScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block">سلامت سازمانی و صیانت</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-700">{dept.healthScore}٪</span>
            <span className="text-xs text-slate-500">پایش انضباطی</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${dept.healthScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block">وضعیت صیانتی یگان</span>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "text-lg font-black",
                dept.status === "stable" ? "text-emerald-700" : "text-amber-600"
              )}
            >
              {dept.status === "stable" ? "پایدار و مورد تأیید" : "نیازمند مراقبت رفتاری"}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            بر مبنای نظرسنجی {dept.respondentCount} نفر از همکاران اداره
          </p>
        </div>
      </div>

      {/* 3 Schein Layers Expectations for Personnel */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          انتظارات رفتاری و عملیاتی از پرسنل {dept.name} در ۳ لایه شاین:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Artifacts */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              ۱. مصنوعات و ظواهر (Artifacts)
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside">
              <li>آراستگی کامل لباس فرم و نصب اتیکت سازمانی</li>
              <li>روشن بودن مداوم دوربین البسه در مأموریت‌های گشت و مواجهه با مردم</li>
              <li>انضباط فیزیکی و پاکیزگی خودروهای سازمانی و دفاتر اداری</li>
            </ul>
          </div>

          {/* Values */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              ۲. ارزش‌های ابرازی (Values)
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside">
              <li>تکریم بی‌منت مراجعین و شاکیان با صبر و سعه صدر</li>
              <li>دست‌پاکی و انضباط مالی مطلق در انجام وظایف</li>
              <li>پایبندی به قانون آیین دادرسی و پرهیز از رفتارهای سلیقه‌ای</li>
            </ul>
          </div>

          {/* Assumptions */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              ۳. مفروضات قلبی (Assumptions)
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside">
              <li>نگاه به خدمت انتظامی به عنوان عبادت و جهاد فی سبیل‌الله</li>
              <li>اعتماد به چتر حمایتی فرماندهی و مراجع قضایی در اجرای قانون</li>
              <li>خودکنترلی و وجدان بیدار حتی در غیاب نظارت‌های مستقیم</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 Core Principles */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          منشور اخلاقی و رفتاری فراجا — ۵ ارزش محوری
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CORE_PRINCIPLES.map((cp) => (
            <div key={cp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                {cp.id}
              </span>
              <h4 className="text-xs font-black text-slate-900">{cp.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{cp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
