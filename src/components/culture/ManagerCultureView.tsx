import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  Shield,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { DepartmentCultureData } from "../../types/culture";
import { STRATEGIC_TRANSFORMATION_PROJECTS } from "../../services/cultureData";
import { cn } from "../../lib/utils";

interface ManagerCultureViewProps {
  departments: DepartmentCultureData[];
  onOpenReport: (deptId?: string) => void;
}

export function ManagerCultureView({ departments, onOpenReport }: ManagerCultureViewProps) {
  const [filter, setFilter] = useState<"all" | "stable" | "needs_improvement">("all");

  const filteredDepts = departments.filter((d) => {
    if (filter === "stable") return d.status === "stable";
    if (filter === "needs_improvement") return d.status === "needs_improvement";
    return true;
  });

  const avgCompliance = Math.round(
    departments.reduce((acc, d) => acc + d.complianceScore, 0) / (departments.length || 1)
  );
  const avgHealth = Math.round(
    departments.reduce((acc, d) => acc + d.healthScore, 0) / (departments.length || 1)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner for Commander */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-black">
            <Shield className="w-4 h-4" />
            داشبورد فرماندهی — پایش هوشمند فرهنگ سازمانی کلانتری
          </div>
          <h2 className="text-xl md:text-2xl font-black">
            ماتریس نظارت و ارزیابی جامع فرهنگ سازمانی فراجا (مدل شاین)
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            گزارش تحلیلی رفتار سازمانی، گلوگاه‌های انضباطی و شاخص‌های سلامت اخلاقی و صیانتی در سطح تمامی ادارات، دوایر و رده‌های تابعه.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">میانگین انطباق</span>
            <span className="text-xl font-black text-emerald-400">{avgCompliance}٪</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">میانگین سلامت</span>
            <span className="text-xl font-black text-blue-400">{avgHealth}٪</span>
          </div>
        </div>
      </div>

      {/* Department Summary Table */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              رتبه‌بندی وضعیت فرهنگی ادارات و دوایر ({departments.length} واحد)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              خروجی تحلیل پرسشنامه‌ها و اسکن‌های اکسل بر مبنای ۳ لایه مدل ادگار شاین
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-xl transition cursor-pointer",
                filter === "all" ? "bg-white text-slate-900 font-black shadow-2xs" : "text-slate-500"
              )}
            >
              همه ({departments.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("stable")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-xl transition cursor-pointer",
                filter === "stable" ? "bg-white text-emerald-800 font-black shadow-2xs" : "text-slate-500"
              )}
            >
              پایدار ({departments.filter((d) => d.status === "stable").length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("needs_improvement")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-xl transition cursor-pointer",
                filter === "needs_improvement"
                  ? "bg-white text-rose-800 font-black shadow-2xs"
                  : "text-slate-500"
              )}
            >
              نیازمند اقدام ({departments.filter((d) => d.status === "needs_improvement").length})
            </button>
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 text-slate-800 font-black border-b border-slate-200">
                <th className="py-3.5 px-4">نام اداره / دایره</th>
                <th className="py-3.5 px-4 text-center">انطباق فرهنگی</th>
                <th className="py-3.5 px-4 text-center">سلامت سازمانی</th>
                <th className="py-3.5 px-4 text-center">مصنوعات</th>
                <th className="py-3.5 px-4 text-center">ارزش‌ها</th>
                <th className="py-3.5 px-4 text-center">مفروضات</th>
                <th className="py-3.5 px-4 text-center">وضعیت صیانتی</th>
                <th className="py-3.5 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredDepts.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {d.name}
                    <span className="block text-[10px] text-slate-400 font-normal">{d.roleTitle}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-black text-emerald-700 tabular-nums">
                    {d.complianceScore}٪
                  </td>
                  <td className="py-3.5 px-4 text-center font-black text-blue-700 tabular-nums">
                    {d.healthScore}٪
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600 font-bold tabular-nums">
                    {d.artifactsScore}٪
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600 font-bold tabular-nums">
                    {d.valuesScore}٪
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600 font-bold tabular-nums">
                    {d.assumptionsScore}٪
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-black inline-block",
                        d.status === "stable"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      )}
                    >
                      {d.status === "stable" ? "پایدار" : "نیازمند بهبود"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onOpenReport(d.id)}
                      className="text-xs font-black text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      مشاهده واکاوی
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Transformation Projects from PDF */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">
            نقشه راه تحول فرهنگی فراجا (مستخرج از سند راهبردی فرهنگ سازمانی)
          </span>
          <h3 className="text-base md:text-lg font-black text-slate-900 mt-1">
            پایش پیشرفت پروژه‌های ده‌گانه تحول فرهنگ مطلوب
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STRATEGIC_TRANSFORMATION_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">{proj.title}</span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  فعال
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{proj.goal}</p>
              <div className="text-[11px] font-bold text-slate-500 pt-1 border-t border-slate-200/60">
                شاخص کلیدی (KPI): <span className="text-slate-800">{proj.kpi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
