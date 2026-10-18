import React, { useState, useMemo } from "react";
import {
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  Scale,
  Zap,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts";
import * as XLSX from "xlsx";
import { DepartmentCultureData } from "../../types/culture";
import { determineCultureArchetype } from "../../services/cultureExcelService";
import { INITIAL_DEPARTMENTS } from "../../services/cultureData";
import { cn } from "../../lib/utils";

interface CultureComparisonToolProps {
  departments: DepartmentCultureData[];
  onBack?: () => void;
  initialUnitAId?: string;
  initialUnitBId?: string;
}

export function CultureComparisonTool({
  departments,
  onBack,
  initialUnitAId,
  initialUnitBId,
}: CultureComparisonToolProps) {
  const safeDepartments = useMemo(() => {
    return departments && departments.length > 0 ? departments : INITIAL_DEPARTMENTS;
  }, [departments]);

  // Safe defaults for unit A and unit B
  const [unitAId, setUnitAId] = useState<string>(
    initialUnitAId || safeDepartments[0]?.id || "edari-1"
  );
  const [unitBId, setUnitBId] = useState<string>(
    initialUnitBId ||
      safeDepartments.find((d) => d.id !== (initialUnitAId || safeDepartments[0]?.id))?.id ||
      safeDepartments[1]?.id ||
      safeDepartments[0]?.id
  );

  const unitA = useMemo(() => {
    return (
      safeDepartments.find((d) => d.id === unitAId) ||
      safeDepartments[0] ||
      INITIAL_DEPARTMENTS[0]
    );
  }, [safeDepartments, unitAId]);

  const unitB = useMemo(() => {
    return (
      safeDepartments.find((d) => d.id === unitBId) ||
      safeDepartments[1] ||
      safeDepartments[0] ||
      INITIAL_DEPARTMENTS[1] ||
      INITIAL_DEPARTMENTS[0]
    );
  }, [safeDepartments, unitBId]);

  // Swap handler
  const handleSwap = () => {
    const temp = unitAId;
    setUnitAId(unitBId);
    setUnitBId(temp);
  };

  // Archetypes
  const archetypeA = useMemo(() => {
    return determineCultureArchetype(
      unitA.artifactsScore,
      unitA.valuesScore,
      unitA.assumptionsScore
    );
  }, [unitA]);

  const archetypeB = useMemo(() => {
    return determineCultureArchetype(
      unitB.artifactsScore,
      unitB.valuesScore,
      unitB.assumptionsScore
    );
  }, [unitB]);

  // Comparative Radar Data (5-axis Edgar Schein model)
  const radarData = useMemo(() => {
    return [
      {
        subject: "مصنوعات و نمادها",
        A: unitA.artifactsScore,
        B: unitB.artifactsScore,
        fullMark: 100,
      },
      {
        subject: "ارزش‌های ابرازی",
        A: unitA.valuesScore,
        B: unitB.valuesScore,
        fullMark: 100,
      },
      {
        subject: "مفروضات بنیادین",
        A: unitA.assumptionsScore,
        B: unitB.assumptionsScore,
        fullMark: 100,
      },
      {
        subject: "انطباق کل فرهنگی",
        A: unitA.complianceScore,
        B: unitB.complianceScore,
        fullMark: 100,
      },
      {
        subject: "سلامت انتظامی",
        A: unitA.healthScore,
        B: unitB.healthScore,
        fullMark: 100,
      },
    ];
  }, [unitA, unitB]);

  // Grouped Bar Data for direct side-by-side comparison
  const groupedBarData = useMemo(() => {
    return [
      {
        dimension: "انطباق کل",
        [unitA.name]: unitA.complianceScore,
        [unitB.name]: unitB.complianceScore,
      },
      {
        dimension: "سلامت انتظامی",
        [unitA.name]: unitA.healthScore,
        [unitB.name]: unitB.healthScore,
      },
      {
        dimension: "مصنوعات (رفتار مشهود)",
        [unitA.name]: unitA.artifactsScore,
        [unitB.name]: unitB.artifactsScore,
      },
      {
        dimension: "ارزش‌ها (منشور رسمی)",
        [unitA.name]: unitA.valuesScore,
        [unitB.name]: unitB.valuesScore,
      },
      {
        dimension: "مفروضات (باورها)",
        [unitA.name]: unitA.assumptionsScore,
        [unitB.name]: unitB.assumptionsScore,
      },
    ];
  }, [unitA, unitB]);

  // Delta Gap Data (Difference: A - B)
  const deltaData = useMemo(() => {
    return [
      {
        name: "انطباق کل",
        delta: unitA.complianceScore - unitB.complianceScore,
      },
      {
        name: "سلامت انتظامی",
        delta: unitA.healthScore - unitB.healthScore,
      },
      {
        name: "مصنوعات",
        delta: unitA.artifactsScore - unitB.artifactsScore,
      },
      {
        name: "ارزش‌های ابرازی",
        delta: unitA.valuesScore - unitB.valuesScore,
      },
      {
        name: "مفروضات بنیادین",
        delta: unitA.assumptionsScore - unitB.assumptionsScore,
      },
    ];
  }, [unitA, unitB]);

  // Overall leader
  const complianceDelta = unitA.complianceScore - unitB.complianceScore;
  const healthDelta = unitA.healthScore - unitB.healthScore;

  // Export comparison to Excel
  const handleExportComparisonExcel = () => {
    const wb = XLSX.utils.book_new();

    const comparisonSummary = [
      {
        "شاخص مقایسه‌ای": "شاخص انطباق کل فرهنگی (%)",
        [`${unitA.name} (الف)`]: unitA.complianceScore,
        [`${unitB.name} (ب)`]: unitB.complianceScore,
        "اختلاف (الف منهای ب)": complianceDelta,
        "واحد برتر": complianceDelta > 0 ? unitA.name : complianceDelta < 0 ? unitB.name : "برابر",
      },
      {
        "شاخص مقایسه‌ای": "شاخص سلامت انتظامی (%)",
        [`${unitA.name} (الف)`]: unitA.healthScore,
        [`${unitB.name} (ب)`]: unitB.healthScore,
        "اختلاف (الف منهای ب)": healthDelta,
        "واحد برتر": healthDelta > 0 ? unitA.name : healthDelta < 0 ? unitB.name : "برابر",
      },
      {
        "شاخص مقایسه‌ای": "لایه مصنوعات و نمادها (%)",
        [`${unitA.name} (الف)`]: unitA.artifactsScore,
        [`${unitB.name} (ب)`]: unitB.artifactsScore,
        "اختلاف (الف منهای ب)": unitA.artifactsScore - unitB.artifactsScore,
        "واحد برتر":
          unitA.artifactsScore > unitB.artifactsScore ? unitA.name : unitB.name,
      },
      {
        "شاخص مقایسه‌ای": "لایه ارزش‌های ابرازی (%)",
        [`${unitA.name} (الف)`]: unitA.valuesScore,
        [`${unitB.name} (ب)`]: unitB.valuesScore,
        "اختلاف (الف منهای ب)": unitA.valuesScore - unitB.valuesScore,
        "واحد برتر":
          unitA.valuesScore > unitB.valuesScore ? unitA.name : unitB.name,
      },
      {
        "شاخص مقایسه‌ای": "لایه مفروضات بنیادین (%)",
        [`${unitA.name} (الف)`]: unitA.assumptionsScore,
        [`${unitB.name} (ب)`]: unitB.assumptionsScore,
        "اختلاف (الف منهای ب)": unitA.assumptionsScore - unitB.assumptionsScore,
        "واحد برتر":
          unitA.assumptionsScore > unitB.assumptionsScore ? unitA.name : unitB.name,
      },
      {
        "شاخص مقایسه‌ای": "تعداد کل پاسخ‌دهندگان",
        [`${unitA.name} (الف)`]: unitA.respondentCount,
        [`${unitB.name} (ب)`]: unitB.respondentCount,
        "اختلاف (الف منهای ب)": unitA.respondentCount - unitB.respondentCount,
        "واحد برتر": "-",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(comparisonSummary);
    XLSX.utils.book_append_sheet(wb, ws, "مقایسه_تطبیقی");

    XLSX.writeFile(
      wb,
      `مقایسه_فرهنگی_${unitA.name.slice(0, 15)}_${unitB.name.slice(0, 15)}.xlsx`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Navigation */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition cursor-pointer"
                title="بازگشت"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <span className="w-2.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            <h2 className="text-base md:text-lg font-black text-slate-900">
              سامانه تحلیل تطبیقی و مقایسه دو استان یا اداره
            </h2>
            <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Scale className="w-3 h-3 text-blue-600" />
              ارزیابی رو در رو
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            مقایسه عمیق لایه‌های سه‌گانه ادگار شاین، نمودارهای رادار و میله‌ای، شکاف تراز و نقاط قوت نسبی دو واحد.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportComparisonExcel}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            اکسل مقایسه‌ای
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            چاپ / PDF
          </button>
        </div>
      </div>

      {/* Dual Selector Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Selector A */}
          <div className="w-full md:w-5/12 space-y-2 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                واحد الف (مبدأ / سبز):
              </label>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                نمره: {unitA.complianceScore}٪
              </span>
            </div>
            <select
              value={unitAId}
              onChange={(e) => setUnitAId(e.target.value)}
              className="w-full bg-white text-xs font-black text-slate-800 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
            >
              {safeDepartments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — انطباق: {d.complianceScore}٪ | سلامت: {d.healthScore}٪
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer hover:rotate-180 duration-300"
            title="جابجایی واحد الف و واحد ب"
          >
            <ArrowLeftRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Selector B */}
          <div className="w-full md:w-5/12 space-y-2 bg-blue-50/50 p-4 rounded-2xl border border-blue-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                واحد ب (مقصد / آبی):
              </label>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                نمره: {unitB.complianceScore}٪
              </span>
            </div>
            <select
              value={unitBId}
              onChange={(e) => setUnitBId(e.target.value)}
              className="w-full bg-white text-xs font-black text-slate-800 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              {safeDepartments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — انطباق: {d.complianceScore}٪ | سلامت: {d.healthScore}٪
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Pre-Set Comparisons */}
        <div className="pt-2 flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-slate-400 font-bold ml-1">پیش‌فرض‌های مقایسه‌ای:</span>
          {safeDepartments.length >= 2 && (
            <>
              <button
                type="button"
                onClick={() => {
                  setUnitAId(safeDepartments[0].id);
                  setUnitBId(safeDepartments[1].id);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer"
              >
                {safeDepartments[0].name.slice(0, 15)} ↔ {safeDepartments[1].name.slice(0, 15)}
              </button>
            </>
          )}

          {safeDepartments.some((d) => d.id === "edari-1") &&
            safeDepartments.some((d) => d.id === "ostan-1") && (
              <button
                type="button"
                onClick={() => {
                  setUnitAId("edari-1");
                  setUnitBId("ostan-1");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer"
              >
                اداره ۱ ↔ استان ۱
              </button>
            )}

          {safeDepartments.some((d) => d.id === "edari-2") &&
            safeDepartments.some((d) => d.id === "ostan-2") && (
              <button
                type="button"
                onClick={() => {
                  setUnitAId("edari-2");
                  setUnitBId("ostan-2");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer"
              >
                اداره ۲ ↔ استان ۲
              </button>
            )}
        </div>
      </div>

      {/* Head-to-Head Scoreboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Unit A Scorecard */}
        <div className="md:col-span-5 bg-white rounded-3xl p-5 border-2 border-emerald-500/60 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              واحد الف: {unitA.type === "province" ? "استان" : "اداره"}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {unitA.respondentCount} پاسخ‌دهنده
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900">{unitA.name}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{unitA.roleTitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">انطباق کل</span>
              <span className="text-2xl font-black text-emerald-700">
                {unitA.complianceScore}٪
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">سلامت انتظامی</span>
              <span className="text-2xl font-black text-slate-800">
                {unitA.healthScore}٪
              </span>
            </div>
          </div>

          {/* 3 Schein mini-bars */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">مصنوعات: {unitA.artifactsScore}٪</span>
              <span className="text-slate-500">ارزش‌ها: {unitA.valuesScore}٪</span>
              <span className="text-slate-500">مفروضات: {unitA.assumptionsScore}٪</span>
            </div>
            <div className="flex h-1.5 rounded-full overflow-hidden bg-slate-100">
              <div
                className="bg-emerald-500"
                style={{ width: `${unitA.artifactsScore / 3}%` }}
              ></div>
              <div
                className="bg-sky-500"
                style={{ width: `${unitA.valuesScore / 3}%` }}
              ></div>
              <div
                className="bg-indigo-500"
                style={{ width: `${unitA.assumptionsScore / 3}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 text-xs font-bold text-emerald-900">
            الگو: {archetypeA.title}
          </div>
        </div>

        {/* VS / Delta Comparison Pill in Center */}
        <div className="md:col-span-2 bg-slate-900 text-white rounded-3xl p-4 flex flex-col items-center justify-center text-center space-y-3 shadow-md">
          <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
            شکاف تراز (DELTA)
          </span>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 block">تفاضل انطباق:</span>
            <div className="flex items-center justify-center gap-1">
              {complianceDelta > 0 ? (
                <span className="text-lg font-black text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-4 h-4" />+{complianceDelta}٪ الف
                </span>
              ) : complianceDelta < 0 ? (
                <span className="text-lg font-black text-sky-400 flex items-center gap-0.5">
                  <TrendingDown className="w-4 h-4" />+{Math.abs(complianceDelta)}٪ ب
                </span>
              ) : (
                <span className="text-sm font-black text-slate-300">تراز برابر</span>
              )}
            </div>
          </div>

          <div className="space-y-1 border-t border-slate-800 pt-2 w-full">
            <span className="text-xs font-bold text-slate-400 block">تفاضل سلامت:</span>
            <div className="flex items-center justify-center gap-1">
              {healthDelta > 0 ? (
                <span className="text-sm font-black text-emerald-400">
                  +{healthDelta}٪ برتری الف
                </span>
              ) : healthDelta < 0 ? (
                <span className="text-sm font-black text-sky-400">
                  +{Math.abs(healthDelta)}٪ برتری ب
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-300">تراز برابر</span>
              )}
            </div>
          </div>

          <span className="text-[10px] text-slate-400 font-bold block pt-1">
            {complianceDelta >= 0 ? `پیشتازی ${unitA.name}` : `پیشتازی ${unitB.name}`}
          </span>
        </div>

        {/* Unit B Scorecard */}
        <div className="md:col-span-5 bg-white rounded-3xl p-5 border-2 border-blue-500/60 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              واحد ب: {unitB.type === "province" ? "استان" : "اداره"}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {unitB.respondentCount} پاسخ‌دهنده
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900">{unitB.name}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{unitB.roleTitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">انطباق کل</span>
              <span className="text-2xl font-black text-blue-700">
                {unitB.complianceScore}٪
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">سلامت انتظامی</span>
              <span className="text-2xl font-black text-slate-800">
                {unitB.healthScore}٪
              </span>
            </div>
          </div>

          {/* 3 Schein mini-bars */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">مصنوعات: {unitB.artifactsScore}٪</span>
              <span className="text-slate-500">ارزش‌ها: {unitB.valuesScore}٪</span>
              <span className="text-slate-500">مفروضات: {unitB.assumptionsScore}٪</span>
            </div>
            <div className="flex h-1.5 rounded-full overflow-hidden bg-slate-100">
              <div
                className="bg-emerald-500"
                style={{ width: `${unitB.artifactsScore / 3}%` }}
              ></div>
              <div
                className="bg-sky-500"
                style={{ width: `${unitB.valuesScore / 3}%` }}
              ></div>
              <div
                className="bg-indigo-500"
                style={{ width: `${unitB.assumptionsScore / 3}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/60 text-xs font-bold text-blue-900">
            الگو: {archetypeB.title}
          </div>
        </div>
      </div>

      {/* Advanced Dual Charts: Radar & Grouped Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Chart 1: Dual Radar Chart (5 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                RADAR OVERLAY
              </span>
              <h3 className="text-sm font-black text-slate-900">
                نمودار رادار تطبیقی ۵ محوره ادگار شاین
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                {unitA.name.slice(0, 12)}
              </span>
              <span className="flex items-center gap-1 text-blue-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                {unitB.name.slice(0, 12)}
              </span>
            </div>
          </div>

          <div className="w-full h-72 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#1e293b", fontSize: 11, fontWeight: "bold" }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar
                  name={unitA.name}
                  dataKey="A"
                  stroke="#059669"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Radar
                  name={unitB.name}
                  dataKey="B"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.35}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}٪`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1rem",
                    border: "1px solid #e2e8f0",
                    direction: "rtl",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 font-medium text-center border-t border-slate-100 pt-2">
            مساحت پوشش چندضلعی سبز نسبت به آبی نشان‌دهنده استحکام فراگیرتر لایه‌های فرهنگ سازمانی است.
          </p>
        </div>

        {/* Chart 2: Side-by-side Grouped Bar Chart (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                DIMENSION BENCHMARK
              </span>
              <h3 className="text-sm font-black text-slate-900">
                مقایسه ستونی ابعاد پنج‌گانه
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">مقیاس ۰ تا ۱۰۰٪</span>
          </div>

          <div className="w-full h-72 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={groupedBarData}
                margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="dimension"
                  tick={{ fill: "#334155", fontSize: 10, fontWeight: "bold" }}
                  interval={0}
                />
                <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}٪`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1rem",
                    border: "1px solid #e2e8f0",
                    direction: "rtl",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "11px", fontWeight: "bold" }}
                />
                <Bar dataKey={unitA.name} fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey={unitB.name} fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 font-medium text-center border-t border-slate-100 pt-2">
            مقایسه رو در روی هر بعد امکان کشف فوری نقاط قوت نسبی و گلوگاه‌های نیازمند بهبود را فراهم می‌آورد.
          </p>
        </div>
      </div>

      {/* Delta Difference Waterfall & Detailed Metrics Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Delta Difference Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  NET DIFFERENCE
                </span>
                <h3 className="text-sm font-black text-slate-900">
                  نمودار شکاف تراز (الف منهای ب)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                درصد اختلاف
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              مقادیر مثبت نشان‌دهنده برتری {unitA.name} (سبز) و مقادیر منفی نشان‌دهنده برتری {unitB.name} (آبی) است:
            </p>
          </div>

          <div className="w-full h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deltaData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[-25, 25]} tick={{ fontSize: 10 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "#1e293b", fontSize: 11, fontWeight: "bold" }}
                />
                <Tooltip
                  formatter={(val: any) => [
                    `${val > 0 ? `+${val}٪ برتری ${unitA.name}` : `${val}٪ برتری ${unitB.name}`}`,
                    "شکاف تراز",
                  ]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1rem",
                    border: "1px solid #e2e8f0",
                    direction: "rtl",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                />
                <ReferenceLine x={0} stroke="#94a3b8" />
                <Bar dataKey="delta" radius={[4, 4, 4, 4]}>
                  {deltaData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.delta >= 0 ? "#10b981" : "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
            <span className="text-emerald-700">← برتری واحد الف (+سبز)</span>
            <span className="text-blue-700">برتری واحد ب (-آبی) →</span>
          </div>
        </div>

        {/* Head-to-Head Detailed Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                GRANULAR MATRIX
              </span>
              <h3 className="text-sm font-black text-slate-900">
                ماتریس تفصیلی شاخص‌ها و تبیین شکاف‌ها
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              ۵ مؤلفه بنیادین
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                <tr>
                  <th className="p-3">مؤلفه ارزیابی</th>
                  <th className="p-3 text-emerald-800">{unitA.name.slice(0, 14)}</th>
                  <th className="p-3 text-blue-800">{unitB.name.slice(0, 14)}</th>
                  <th className="p-3">تفاضل</th>
                  <th className="p-3">تحلیل مدیریتی شکاف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {/* Row 1: Compliance */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-black text-slate-800">شاخص انطباق کل فرهنگی</td>
                  <td className="p-3 font-black text-emerald-700">{unitA.complianceScore}٪</td>
                  <td className="p-3 font-black text-blue-700">{unitB.complianceScore}٪</td>
                  <td className="p-3 font-black">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-[10px]",
                        complianceDelta > 0
                          ? "bg-emerald-100 text-emerald-800"
                          : complianceDelta < 0
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      )}
                    >
                      {complianceDelta > 0 ? `+${complianceDelta}٪` : `${complianceDelta}٪`}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-[11px]">
                    {complianceDelta > 0
                      ? `${unitA.name} دارای نظم و انطباق عمومی مستحکم‌تری است.`
                      : complianceDelta < 0
                      ? `${unitB.name} تعادل عملیاتی بالاتری را نشان می‌دهد.`
                      : "هر دو واحد در تراز انطباق یکسانی قرار دارند."}
                  </td>
                </tr>

                {/* Row 2: Health */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-black text-slate-800">سلامت انتظامی و صیانتی</td>
                  <td className="p-3 font-black text-emerald-700">{unitA.healthScore}٪</td>
                  <td className="p-3 font-black text-blue-700">{unitB.healthScore}٪</td>
                  <td className="p-3 font-black">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-[10px]",
                        healthDelta > 0
                          ? "bg-emerald-100 text-emerald-800"
                          : healthDelta < 0
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      )}
                    >
                      {healthDelta > 0 ? `+${healthDelta}٪` : `${healthDelta}٪`}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-[11px]">
                    {healthDelta > 0
                      ? `نرخ کدهای صیانتی مثبت در ${unitA.name} برجسته‌تر است.`
                      : healthDelta < 0
                      ? `سطح پایبندی به سلامت اداری در ${unitB.name} بالاتر است.`
                      : "شاخص سلامت انتظامی در هر دو یگان هم‌تراز است."}
                  </td>
                </tr>

                {/* Row 3: Artifacts */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-slate-700">مصنوعات (رفتار مشهود و البسه)</td>
                  <td className="p-3 font-bold text-slate-800">{unitA.artifactsScore}٪</td>
                  <td className="p-3 font-bold text-slate-800">{unitB.artifactsScore}٪</td>
                  <td className="p-3 font-bold">
                    {unitA.artifactsScore - unitB.artifactsScore > 0 ? (
                      <span className="text-emerald-700 text-[10px]">
                        +{unitA.artifactsScore - unitB.artifactsScore}٪
                      </span>
                    ) : (
                      <span className="text-blue-700 text-[10px]">
                        {unitA.artifactsScore - unitB.artifactsScore}٪
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    بررسی استفاده از دوربین البسه، آراستگی یونیفرم و ثبت وقایع.
                  </td>
                </tr>

                {/* Row 4: Values */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-slate-700">ارزش‌های ابرازی (منشور و تکریم)</td>
                  <td className="p-3 font-bold text-slate-800">{unitA.valuesScore}٪</td>
                  <td className="p-3 font-bold text-slate-800">{unitB.valuesScore}٪</td>
                  <td className="p-3 font-bold">
                    {unitA.valuesScore - unitB.valuesScore > 0 ? (
                      <span className="text-emerald-700 text-[10px]">
                        +{unitA.valuesScore - unitB.valuesScore}٪
                      </span>
                    ) : (
                      <span className="text-blue-700 text-[10px]">
                        {unitA.valuesScore - unitB.valuesScore}٪
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    التزام به قانون‌گرایی، صبر در مواجهه با ارباب‌رجوع و انضباط معنوی.
                  </td>
                </tr>

                {/* Row 5: Assumptions */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-slate-700">مفروضات بنیادین (باور و امنیت روانی)</td>
                  <td className="p-3 font-bold text-slate-800">{unitA.assumptionsScore}٪</td>
                  <td className="p-3 font-bold text-slate-800">{unitB.assumptionsScore}٪</td>
                  <td className="p-3 font-bold">
                    {unitA.assumptionsScore - unitB.assumptionsScore > 0 ? (
                      <span className="text-emerald-700 text-[10px]">
                        +{unitA.assumptionsScore - unitB.assumptionsScore}٪
                      </span>
                    ) : (
                      <span className="text-blue-700 text-[10px]">
                        {unitA.assumptionsScore - unitB.assumptionsScore}٪
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    احساس عدالت، تعلق سازمانی و کاهش فرسودگی شغلی در صحنه مأموریت.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Layer-by-Layer Narrative & Benchmarking Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1 Narrative */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h4 className="text-xs font-black text-slate-900">
                ۱. واکاوی تطبیقی لایه مصنوعات
              </h4>
            </div>
            <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              {unitA.artifactsScore}٪ در برابر {unitB.artifactsScore}٪
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-medium">
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <strong className="text-emerald-800 font-black block mb-0.5">
                وضعیت {unitA.name}:
              </strong>
              نصب علائم، آراستگی تجهیزات انفرادی و ثبت سامانه‌ای در این واحد در تراز {unitA.artifactsScore}٪ ارزیابی شده است.
            </p>
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <strong className="text-blue-800 font-black block mb-0.5">
                وضعیت {unitB.name}:
              </strong>
              تجهیز مأموران و دوربین البسه در تراز {unitB.artifactsScore}٪ قرار دارد.
            </p>
          </div>
        </div>

        {/* Layer 2 Narrative */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <h4 className="text-xs font-black text-slate-900">
                ۲. واکاوی تطبیقی ارزش‌های ابرازی
              </h4>
            </div>
            <span className="text-[11px] font-black text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md">
              {unitA.valuesScore}٪ در برابر {unitB.valuesScore}٪
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-medium">
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <strong className="text-emerald-800 font-black block mb-0.5">
                تکریم و منشور در {unitA.name}:
              </strong>
              پایبندی به کدهای اخلاقی با نمره {unitA.valuesScore}٪ تثبیت شده است.
            </p>
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <strong className="text-blue-800 font-black block mb-0.5">
                تکریم و منشور در {unitB.name}:
              </strong>
              رعایت ضوابط دادرسی و خدمت‌رسانی با نمره {unitB.valuesScore}٪ گزارش شده است.
            </p>
          </div>
        </div>

        {/* Layer 3 Narrative */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h4 className="text-xs font-black text-slate-900">
                ۳. واکاوی تطبیقی مفروضات بنیادین
              </h4>
            </div>
            <span className="text-[11px] font-black text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md">
              {unitA.assumptionsScore}٪ در برابر {unitB.assumptionsScore}٪
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-medium">
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <strong className="text-emerald-800 font-black block mb-0.5">
                باورها و انگیزه {unitA.name}:
              </strong>
              احساس حمایت قضایی و صیانت درونی در تراز {unitA.assumptionsScore}٪ است.
            </p>
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <strong className="text-blue-800 font-black block mb-0.5">
                باورها و انگیزه {unitB.name}:
              </strong>
              میزان تعلق سازمانی و آرامش روانی پرسنل در تراز {unitB.assumptionsScore}٪ سنجیده شد.
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Organizational Synergy & Action Plan */}
      <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-sm font-black text-slate-900">
                بسته‌های هم‌افزایی و انتقال تجربه میان دو واحد (Benchmarking)
              </h3>
              <p className="text-[11px] text-slate-400 font-bold">
                راهکنش‌های تبادل الگوهای موفق فرهنگی بین {unitA.name} و {unitB.name}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
            الگوبرداری متقابل
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Transfer from A to B */}
          <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              الگوهای قابل انتقال از «{unitA.name}» به «{unitB.name}»:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium">
              <li className="bg-white p-2.5 rounded-xl border border-emerald-100">
                • استقرار سامانه‌های ثبت برخط داده‌های انضباطی با الگوی موفق {unitA.name}.
              </li>
              <li className="bg-white p-2.5 rounded-xl border border-emerald-100">
                • اعزام مربیان تعالی رفتار و مأموران برجسته {unitA.name} جهت برگزاری کارگاه‌های میدانی.
              </li>
              <li className="bg-white p-2.5 rounded-xl border border-emerald-100">
                • استانداردسازی فرآیندهای بازرسی و نظارت مستمر صیانتی.
              </li>
            </ul>
          </div>

          {/* Transfer from B to A */}
          <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-blue-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              الگوهای قابل انتقال از «{unitB.name}» به «{unitA.name}»:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium">
              <li className="bg-white p-2.5 rounded-xl border border-blue-100">
                • بهره‌گیری از تجربیات مدیریت شرایط پرفشار و مواجهه‌های سخت میدانی در {unitB.name}.
              </li>
              <li className="bg-white p-2.5 rounded-xl border border-blue-100">
                • استقرار شیوه‌های بومی کاهش استرس شغلی و تقویت روحیه تیمی در شیفت‌ها.
              </li>
              <li className="bg-white p-2.5 rounded-xl border border-blue-100">
                • پیاده‌سازی سازوکارهای انگیزش کادر صفی متناسب با سختی کار.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
