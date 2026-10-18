import React, { useState } from "react";
import {
  ArrowRight,
  Printer,
  Download,
  Shield,
  FileCheck,
  Building2,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  FileText,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Edit3,
  TrendingUp,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  DepartmentCultureData,
  ProcessingAlgorithm,
  ScheinLayer,
} from "../../types/culture";
import {
  EXECUTIVE_PROPOSALS,
  CORE_PRINCIPLES,
} from "../../services/cultureData";
import { exportCultureReportToExcel } from "../../services/cultureExcelService";
import { cn } from "../../lib/utils";

interface StrategicReportViewProps {
  departments: DepartmentCultureData[];
  selectedIds: string[];
  algorithm: ProcessingAlgorithm;
  activeLayers: Record<ScheinLayer, boolean>;
  onBack: () => void;
}

export function StrategicReportView({
  departments,
  selectedIds,
  algorithm,
  activeLayers,
  onBack,
}: StrategicReportViewProps) {
  // Selected departments or fallback to first two
  const analyzedDepts = departments.filter((d) => selectedIds.includes(d.id));
  const effectiveDepts = analyzedDepts.length > 0 ? analyzedDepts : departments.slice(0, 2);

  const [alphaId, setAlphaId] = useState<string>(effectiveDepts[0]?.id || "edari-1");
  const [betaId, setBetaId] = useState<string>(
    effectiveDepts[1]?.id || effectiveDepts[0]?.id || "edari-2"
  );

  const deptAlpha = departments.find((d) => d.id === alphaId) || departments[0];
  const deptBeta = departments.find((d) => d.id === betaId) || departments[1] || departments[0];

  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [executiveSummaryText, setExecutiveSummaryText] = useState(
    "بررسی‌های تطبیقی در لایه‌های سه‌گانه شاین نشان می‌دهد که فرهنگ سازمانی فراجا تلفیقی از اقتدار مأموریتی در سطح مصنوعات و تعهد صیانتی در سطح مفروضات است. با این حال، ناهمسویی رفتارهای سلیقه‌ای در ساعات پرفشار و نوسان در استفاده از دوربین البسه، ضرورت استقرار راهکنش‌های اصلاحی فوری، بسته‌های رفاهی معیشتی و کارگاه‌های مدیریت خشم را ایجاب می‌کند."
  );

  // 3-axis radar data for Archetype
  const archetypeRadarData = [
    { subject: "مصنوعات سازمانی", A: 82, fullMark: 100 },
    { subject: "ارزش‌های ابرازی", A: 85, fullMark: 100 },
    { subject: "مفروضات بنیادین", A: 68, fullMark: 100 },
  ];

  // 5-axis comparative radar data
  const comparisonRadarData = [
    { subject: "مصنوعات سازمانی", Alpha: deptAlpha.artifactsScore, Beta: deptBeta.artifactsScore, fullMark: 100 },
    { subject: "ارزش‌های ابرازی", Alpha: deptAlpha.valuesScore, Beta: deptBeta.valuesScore, fullMark: 100 },
    { subject: "مفروضات بنیادین", Alpha: deptAlpha.assumptionsScore, Beta: deptBeta.assumptionsScore, fullMark: 100 },
    { subject: "انطباق کل فرهنگی", Alpha: deptAlpha.complianceScore, Beta: deptBeta.complianceScore, fullMark: 100 },
    { subject: "شاخص سلامت انتظامی", Alpha: deptAlpha.healthScore, Beta: deptBeta.healthScore, fullMark: 100 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Navigation & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به داشبورد واکاوی
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
            الگوریتم:{" "}
            {algorithm === "protective"
              ? "تحلیل صیانتی (خوش‌بینانه)"
              : algorithm === "strategic"
              ? "تحلیل راهبردی (متعادل)"
              : "تحلیل آسیب‌شناسانه (سخت‌گیرانه)"}
          </span>

          <button
            type="button"
            onClick={() => exportCultureReportToExcel(departments, selectedIds)}
            className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 px-4 py-2.5 rounded-2xl transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            گزارش‌گیری اکسل
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-black text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-2xl transition cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            خروجی PDF / چاپ
          </button>
        </div>
      </div>

      {/* Report Official Header matching Screenshot 4 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl md:text-2xl font-black text-slate-900">
                گزارش راهبردی فرهنگ انتظامی
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                تأییدشده
              </span>
            </div>
            <p className="text-xs font-bold text-slate-500">
              تحلیل‌گر هوشمند سازمانی بر اساس شناخت لایه‌های فرهنگ (مدل ادگار شاین)
            </p>
          </div>

          <div className="text-left md:border-r border-slate-200 md:pr-6">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
              ENGINE IDENTIFIER
            </span>
            <span className="text-xs font-black text-slate-900">
              CULTURAI SECURITY ANALYTICS ENGINE
            </span>
            <span className="block text-[11px] font-bold text-emerald-700 mt-0.5">
              واکاوی برخط {effectiveDepts.length} شیت سازمانی فراجا
            </span>
          </div>
        </div>

        {/* Archetype & 3D Triangle Radar matching Screenshot 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          {/* Archetype Radar Chart */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase mb-1">
              الگوی حاکم (ARCHETYPE)
            </span>
            <h3 className="text-sm font-black text-slate-900 text-center mb-2">
              فرهنگ انتظامی اقتدارگرا-جامعه‌محور (تلفیقی)
            </h3>

            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={archetypeRadarData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#334155", fontSize: 10, fontWeight: "bold" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar name="تراز فرهنگی" dataKey="A" stroke="#059669" fill="#10b981" fillOpacity={0.45} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <span className="text-[10px] font-bold text-slate-500 mt-1">
              مثلث سه‌لایه ادگار شاین در فراجا
            </span>
          </div>

          {/* Strategic Mission Profile & Quote */}
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
            <div className="bg-emerald-950 text-white rounded-2xl p-5 shadow-xs border border-emerald-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
                  STRATEGIC MISSION PROFILE
                </span>
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-sm font-black text-emerald-100 leading-relaxed">
                بیانیه راهبردی فرهنگ غالب: «اقتدار صیانتی، انضباط معنوی و خدمت بی‌منت در سایه قانون‌مداری و صیانت از حقوق عامه»
              </p>
            </div>

            {/* Executive Summary & Editing */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  تبیین تخصصی جو ارزشی و کارایی (گزیده عارضه‌یابی)
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditingSummary(!isEditingSummary)}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isEditingSummary ? "ذخیره تغییرات" : "ویرایش خلاصه"}
                </button>
              </div>

              {isEditingSummary ? (
                <textarea
                  value={executiveSummaryText}
                  onChange={(e) => setExecutiveSummaryText(e.target.value)}
                  rows={3}
                  className="w-full text-xs text-slate-800 p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {executiveSummaryText}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Department Analysis Tool matching Screenshot 5 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">
            مدل‌سازی و پایش فرهنگ سازمانی و انضباطی در استان‌ها و ادارات تابعه
          </span>
          <h2 className="text-lg md:text-xl font-black text-slate-900 mt-1">
            ابزار تحلیل تطبیقی هوشمند فراجا — مقایسه دو به دو لایه‌های فرهنگ سازمانی
          </h2>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">استان / اداره الف:</label>
            <select
              value={alphaId}
              onChange={(e) => setAlphaId(e.target.value)}
              className="w-full bg-white text-xs font-bold text-slate-800 border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.complianceScore}٪)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">استان / اداره ب:</label>
            <select
              value={betaId}
              onChange={(e) => setBetaId(e.target.value)}
              className="w-full bg-white text-xs font-bold text-slate-800 border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.complianceScore}٪)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparative Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Structural Details for 3 Layers */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl text-xs font-bold">
              <span className="text-emerald-800 font-black">
                {deptAlpha.name}: {deptAlpha.complianceScore}٪ انطباق
              </span>
              <span className="text-blue-800 font-black">
                {deptBeta.name}: {deptBeta.complianceScore}٪ انطباق
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
              <span className="text-xs font-black text-emerald-900 block">
                ۱. مصنوعات (Artifacts)
              </span>
              <p className="text-xs text-slate-600">
                یونیفرم رسمی، آراستگی بیرونی و انضباط فیزیکی در مقرها ({deptAlpha.artifactsScore}٪ در مقابل {deptBeta.artifactsScore}٪)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-1">
              <span className="text-xs font-black text-blue-900 block">
                ۲. ارزش‌های ابرازی (Values)
              </span>
              <p className="text-xs text-slate-600">
                التزام مأموران به اصول، آیین دادرسی و مأموریت‌های رسمی فراجا ({deptAlpha.valuesScore}٪ در مقابل {deptBeta.valuesScore}٪)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1">
              <span className="text-xs font-black text-amber-900 block">
                ۳. مفروضات قلبی (Assumptions)
              </span>
              <p className="text-xs text-slate-600">
                جهت‌گیری ناخودآگاه، انگیزه‌های باطنی و احساس حمایت قضایی در صحنه عمل ({deptAlpha.assumptionsScore}٪ در مقابل {deptBeta.assumptionsScore}٪)
              </p>
            </div>
          </div>

          {/* 5-axis Radar Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-black text-slate-800 mb-2">
              نمودار رادار تطبیقی ۵ محوره
            </span>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={comparisonRadarData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#334155", fontSize: 9, fontWeight: "bold" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar name={deptAlpha.name} dataKey="Alpha" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
                  <Radar name={deptBeta.name} dataKey="Beta" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold mt-2">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                {deptAlpha.name}
              </span>
              <span className="flex items-center gap-1 text-blue-700">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                {deptBeta.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Selected Department Profiles matching Screenshots 6, 7, 8, 9 */}
      <div className="space-y-6">
        <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          تحلیل تفصیلی ادارات و شیت‌های انتخاب‌شده ({effectiveDepts.length} اداره)
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {effectiveDepts.map((dept) => {
            const donutData = [
              { name: "مصنوعات", value: dept.artifactsScore, color: "#10b981" },
              { name: "ارزش‌ها", value: dept.valuesScore, color: "#3b82f6" },
              { name: "مفروضات", value: dept.assumptionsScore, color: "#f59e0b" },
            ];

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6"
              >
                {/* Department Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-slate-900">{dept.name}</h3>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[11px] font-black",
                          dept.status === "stable"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        )}
                      >
                        {dept.status === "stable" ? "وضعیت پایدار" : "نیازمند بهبود"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold">{dept.roleTitle}</p>
                  </div>

                  {/* Indicators */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="text-left bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">انطباق فرهنگی</span>
                      <span className="text-sm font-black text-emerald-700">{dept.complianceScore}٪</span>
                    </div>
                    <div className="text-left bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">سلامت انتظامی</span>
                      <span className="text-sm font-black text-blue-700">{dept.healthScore}٪</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>انطباق ارزش‌های سازمانی</span>
                      <span>{dept.complianceScore}٪</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${dept.complianceScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>شاخص سلامت انتظامی و صیانت کادری</span>
                      <span>{dept.healthScore}٪</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${dept.healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Analytical Description & Donut Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70">
                  <div className="lg:col-span-8 space-y-2">
                    <h4 className="text-xs font-black text-slate-900">
                      تحلیل وضعیت و توصیف فرهنگ سازمانی اداره:
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                      {dept.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-r border-slate-200 pt-4 lg:pt-0 lg:pr-4">
                    <span className="text-[11px] font-black text-slate-700 mb-1">
                      توزیع شاخص‌ها در مدل شاین
                    </span>
                    <div className="w-32 h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={donutData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {donutData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                      <span className="text-emerald-700">مصنوعات: {dept.artifactsScore}٪</span>
                      <span>•</span>
                      <span className="text-blue-700">ارزش‌ها: {dept.valuesScore}٪</span>
                      <span>•</span>
                      <span className="text-amber-700">مفروضات: {dept.assumptionsScore}٪</span>
                    </div>
                  </div>
                </div>

                {/* Key Issues (مشکلات کلیدی سازمان) matching Screenshot 6 */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    مشکلات کلیدی سازمان در این حوزه:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dept.keyIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="bg-rose-50/50 border border-rose-200/80 p-3.5 rounded-2xl space-y-1"
                      >
                        <span className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-[10px] flex items-center justify-center font-bold">
                            {issue.id}
                          </span>
                          {issue.title}
                        </span>
                        <p className="text-[11px] text-slate-600 leading-relaxed pr-6">
                          {issue.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Plans (3 Columns) matching Screenshot 6 */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    راهکنش‌ها و اقدامات اصلاحی پیشنهادی ارتقای رفتاری و صیانت انتظامی:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Short Term */}
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                      <span className="font-black text-emerald-800 text-[11px] bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                        اقدامات کوتاه‌مدت داده‌محور
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600 text-[11px]">
                        {dept.actionPlans.shortTerm.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Mid Term */}
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                      <span className="font-black text-blue-800 text-[11px] bg-blue-50 px-2.5 py-1 rounded-lg inline-block">
                        راهکنش‌های میان‌مدت اصلاحی
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600 text-[11px]">
                        {dept.actionPlans.midTerm.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Long Term */}
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                      <span className="font-black text-indigo-800 text-[11px] bg-indigo-50 px-2.5 py-1 rounded-lg inline-block">
                        راهبردهای طولانی‌مدت ساختاری
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600 text-[11px]">
                        {dept.actionPlans.longTerm.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Schein Layers Breakdown matching Screenshots 10, 11, 12 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">
            کالبدشکافی عمیق سازمانی
          </span>
          <h2 className="text-lg md:text-xl font-black text-slate-900 mt-1">
            بررسی جامع لایه‌های سه‌گانه مدل ادگار شاین در فراجا
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer 1: Artifacts */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              مصنوعات سازمانی (Artifacts)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              لایه‌های ملموس و ظاهری فراجا شامل نحوه استقرار در کلانتری‌ها، آراستگی یونیفرم، تجهیزات انفرادی، سرعت مواجهه با ارباب رجوع و دوربین‌های البسه.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                "سیمای صالحین",
                "آراستگی ظاهری",
                "سرعت خدمت‌رسانی",
                "دوربین البسه",
                "انضباط در مقر",
                "فناوری هوشمند",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="bg-emerald-100/90 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Layer 2: Values */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-800 font-black text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              ارزش‌های ابرازی (Values)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              اصول اعلام‌شده رسمی، آیین‌نامه‌ها، دستورالعمل‌های مأموریتی، اخلاق حرفه‌ای، دست‌پاکی و قانون‌مداری در تعاملات روزمره با مظنونین و شاکیان.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                "حفظ امنیت",
                "دست‌پاکی و امانت",
                "تکریم ارباب‌رجوع",
                "پرهیز از رشوه",
                "آیین دادرسی",
                "حفاظت گفتار",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100/90 text-blue-900 text-[10px] font-black px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Layer 3: Assumptions */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              مفروضات بنیادین (Assumptions)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              باورهای نانوشته و ریشه‌دار در ضمیر ناخودآگاه مأموران؛ روحیه ایثار و شهادت‌طلبی، میزان احساس امنیت روانی و قضایی در صحنه درگیری‌ها و اعتماد متقابل.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                "روحیه ایثار",
                "مردم‌مداری درونی",
                "احساس حمایت قضایی",
                "صیانت معنوی",
                "خودکنترلی قلبی",
                "پایبندی به ولایت",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="bg-amber-100/90 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark Executive Proposals matching Screenshot 13 */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
              CONFIDENTIAL STRATEGIC DIRECTIVES
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              پیشنهادات اجرایی و راهبردهای کلان صیانت انتظامی
            </h3>
          </div>
          <span className="text-[10px] font-black bg-rose-900/80 text-rose-300 px-3 py-1 rounded-full border border-rose-700/60 self-start sm:self-auto">
            INTERNAL SECURITY ONLY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXECUTIVE_PROPOSALS.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-lg border border-emerald-800">
                  {prop.priority}
                </span>
                <span className="text-emerald-400 font-black text-lg">#{prop.id}</span>
              </div>
              <h4 className="text-sm font-black text-slate-100">{prop.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{prop.description}</p>
              <span className="text-[10px] text-slate-500 font-bold block pt-1">
                لایه هدف: {prop.targetLayer}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence-based Desired Culture & 5 Core Principles matching Screenshot 14 */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">
            سند راهبردی تعالی رفتار
          </span>
          <h2 className="text-lg md:text-xl font-black text-slate-900 mt-1">
            طراحی فرهنگ مطلوب بر اساس شواهد — ۵ ارزش محوری فراجا
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {CORE_PRINCIPLES.map((cp) => (
            <div
              key={cp.id}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                {cp.id}
              </span>
              <h4 className="text-xs font-black text-slate-900 leading-snug">{cp.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{cp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100/90 p-5 rounded-2xl border border-slate-200 print:hidden">
        <span className="text-xs font-bold text-slate-600">
          سامانه هوشمند پایش فرهنگ سازمانی فراجا — گزارش تحلیلی مدل سه‌سطحی ادگار شاین
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-xs font-black text-slate-700 bg-white hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            بازگشت به داشبورد
          </button>

          <button
            type="button"
            onClick={() => exportCultureReportToExcel(departments, selectedIds)}
            className="px-4 py-2 text-xs font-black text-emerald-800 bg-emerald-200/80 hover:bg-emerald-300 rounded-xl transition cursor-pointer"
          >
            دانلود اکسل گزارش
          </button>
        </div>
      </div>
    </div>
  );
}
