import React, { useState, useRef, useMemo } from "react";
import {
  Upload,
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  FileText,
  Activity,
  Award,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Info,
  Scale,
  ArrowLeftRight,
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
  Cell,
} from "recharts";
import { DepartmentCultureData, CultureSheetItem, ScheinLayer } from "../../types/culture";
import {
  parseCultureExcelFile,
  determineCultureArchetype,
  downloadCultureSampleExcel,
  exportCultureReportToExcel,
} from "../../services/cultureExcelService";
import { INITIAL_DEPARTMENTS } from "../../services/cultureData";
import { CultureComparisonTool } from "./CultureComparisonTool";
import { cn } from "../../lib/utils";

interface OnlineCultureStudioProps {
  departments: DepartmentCultureData[];
  onDepartmentsChange: (newDepts: DepartmentCultureData[]) => void;
  onOpenCompare?: (unitAId?: string) => void;
}

export function OnlineCultureStudio({
  departments,
  onDepartmentsChange,
  onOpenCompare,
}: OnlineCultureStudioProps) {
  const [studioTab, setStudioTab] = useState<"dashboard" | "compare">("dashboard");
  const [compareUnitAId, setCompareUnitAId] = useState<string | undefined>(undefined);
  const [selectedDeptId, setSelectedDeptId] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [lastUploadedFileName, setLastUploadedFileName] = useState<string | null>(null);

  // Search & Filter for Extracted Rows
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<string>("all");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute Aggregated Organization Culture if "all" is selected
  const activeData = useMemo(() => {
    if (selectedDeptId !== "all") {
      return (
        departments.find((d) => d.id === selectedDeptId) ||
        departments[0] ||
        INITIAL_DEPARTMENTS[0]
      );
    }

    // Aggregate all departments
    if (departments.length === 0) return INITIAL_DEPARTMENTS[0];

    const allItems: CultureSheetItem[] = departments.flatMap((d) => d.sampleItems);
    const avgArtifacts = Math.round(
      departments.reduce((acc, d) => acc + d.artifactsScore, 0) / departments.length
    );
    const avgValues = Math.round(
      departments.reduce((acc, d) => acc + d.valuesScore, 0) / departments.length
    );
    const avgAssumptions = Math.round(
      departments.reduce((acc, d) => acc + d.assumptionsScore, 0) / departments.length
    );
    const avgCompliance = Math.round(
      departments.reduce((acc, d) => acc + d.complianceScore, 0) / departments.length
    );
    const avgHealth = Math.round(
      departments.reduce((acc, d) => acc + d.healthScore, 0) / departments.length
    );
    const totalRespondents = departments.reduce((acc, d) => acc + d.respondentCount, 0);

    const aggregatedDept: DepartmentCultureData = {
      id: "all",
      name: `کل سازمان (${departments.length} شیت سازمانی)`,
      type: "administrative",
      complianceScore: avgCompliance,
      healthScore: avgHealth,
      status: avgCompliance >= 75 ? "stable" : "needs_improvement",
      artifactsScore: avgArtifacts,
      valuesScore: avgValues,
      assumptionsScore: avgAssumptions,
      uploadedAt: departments[0]?.uploadedAt || "امروز",
      respondentCount: totalRespondents,
      roleTitle: "مجموع یگان‌ها و دوایر فراجا",
      description: `تحلیل تجمیعی کلان حاصل از پردازش برخط ${departments.length} شیت سازمانی و ${allItems.length} گویه ارزیابی‌شده.`,
      keyIssues: departments.flatMap((d) => d.keyIssues).slice(0, 4),
      actionPlans: {
        shortTerm: Array.from(new Set(departments.flatMap((d) => d.actionPlans.shortTerm))).slice(0, 3),
        midTerm: Array.from(new Set(departments.flatMap((d) => d.actionPlans.midTerm))).slice(0, 3),
        longTerm: Array.from(new Set(departments.flatMap((d) => d.actionPlans.longTerm))).slice(0, 3),
      },
      sampleItems: allItems,
    };

    return aggregatedDept;
  }, [departments, selectedDeptId]);

  // Archetype determination
  const archetype = useMemo(() => {
    return determineCultureArchetype(
      activeData.artifactsScore,
      activeData.valuesScore,
      activeData.assumptionsScore
    );
  }, [activeData]);

  // Radar Data for Edgar Schein 3-axis
  const radarData = useMemo(() => {
    return [
      { subject: "مصنوعات و نمادها", score: activeData.artifactsScore, fullMark: 100 },
      { subject: "ارزش‌های ابرازی", score: activeData.valuesScore, fullMark: 100 },
      { subject: "مفروضات بنیادین", score: activeData.assumptionsScore, fullMark: 100 },
    ];
  }, [activeData]);

  // Bar Comparison Data
  const layerBarData = useMemo(() => {
    return [
      {
        name: "مصنوعات",
        score: activeData.artifactsScore,
        fill: "#10b981", // emerald-500
        desc: "ظاهر، رفتار، ثبت سامانه‌ای",
      },
      {
        name: "ارزش‌ها",
        score: activeData.valuesScore,
        fill: "#0ea5e9", // sky-500
        desc: "منشور اخلاقی، قانون‌مداری",
      },
      {
        name: "مفروضات",
        score: activeData.assumptionsScore,
        fill: "#6366f1", // indigo-500
        desc: "باورهای ذهنی، امنیت روانی",
      },
    ];
  }, [activeData]);

  // Real Strengths & Risks extracted directly from Excel rows
  const { topStrengths, topVulnerabilities } = useMemo(() => {
    const items = [...activeData.sampleItems];
    if (items.length === 0) return { topStrengths: [], topVulnerabilities: [] };

    // Sort descending for strengths
    const sortedDesc = [...items].sort((a, b) => b.weight - a.weight);
    // Sort ascending for risks
    const sortedAsc = [...items].sort((a, b) => a.weight - b.weight);

    return {
      topStrengths: sortedDesc.slice(0, 3),
      topVulnerabilities: sortedAsc.slice(0, 3),
    };
  }, [activeData]);

  // Filtered raw items for data explorer
  const filteredItems = useMemo(() => {
    return activeData.sampleItems.filter((item) => {
      const matchQuery =
        !searchQuery.trim() ||
        item.indicator.includes(searchQuery) ||
        item.category.includes(searchQuery) ||
        item.manifestation.includes(searchQuery);

      const matchLayer =
        selectedLayerFilter === "all" || item.layer === selectedLayerFilter;

      return matchQuery && matchLayer;
    });
  }, [activeData, searchQuery, selectedLayerFilter]);

  // Handle Excel upload
  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls") && !file.name.endsWith(".csv")) {
      setUploadError("فرمت فایل معتبر نیست. لطفاً یک فایل اکسل (.xlsx, .xls) یا .csv انتخاب کنید.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    try {
      const parsed = await parseCultureExcelFile(file);
      if (parsed.length === 0) {
        setUploadError("هیچ شیتی یا سطری حاوی داده‌های نظرسنجی در این فایل یافت نشد.");
      } else {
        onDepartmentsChange(parsed);
        setSelectedDeptId("all");
        setLastUploadedFileName(file.name);
        setUploadSuccessMsg(
          `فایل «${file.name}» با موفقیت تحلیل شد. تعداد ${parsed.length} شیت سازمانی و تمامی شاخص‌های فرهنگی واکاوی گردیدند.`
        );
      }
    } catch (err: any) {
      console.error(err);
      setUploadError("خطا در پردازش هوشمند فایل اکسل. لطفاً ساختار ستون‌ها را بررسی فرمایید.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleResetToStandardSample = () => {
    onDepartmentsChange(INITIAL_DEPARTMENTS);
    setSelectedDeptId("all");
    setLastUploadedFileName("داده‌های نظرسنجی جامع فراجا (نمونه مرجع)");
    setUploadSuccessMsg("نمونه استاندارد داده‌های نظرسنجی بارگذاری و بازنشانی شد.");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const ids = selectedDeptId === "all" ? departments.map((d) => d.id) : [selectedDeptId];
    exportCultureReportToExcel(departments, ids);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Upload & Action Hub */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-4 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
              <h2 className="text-base md:text-lg font-black text-slate-900">
                واکاوی برخط فرهنگ سازمانی با فایل اکسل (مدل ادگار شاین)
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
                موتور برخط فعال
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              فایل اکسل ارزیابی فرهنگی یا نظرسنجی کارکنان را آپلود کنید. سامانه داده‌ها را پردازش، لایه‌بندی و تراز فرهنگی را استخراج می‌کند.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? "در حال پردازش اکسل..." : "آپلود فایل اکسل جدید"}
            </button>

            <button
              type="button"
              onClick={downloadCultureSampleExcel}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-2xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              title="دانلود فایل اکسل چندشیتی دارای ساختار استاندارد فراجا جهت بررسی یا پر کردن"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              دانلود قالب اکسل نمونه
            </button>

            <button
              type="button"
              onClick={handleResetToStandardSample}
              className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-2xl border border-slate-200/90 transition-all flex items-center gap-1.5 cursor-pointer"
              title="بارگذاری داده‌های جامع نظرسنجی یگان‌های فراجا جهت تست فوری"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              داده‌های نمونه (تست)
            </button>
          </div>
        </div>

        {/* Notifications */}
        {uploadError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            {uploadError}
          </div>
        )}

        {uploadSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadSuccessMsg(null)}
              className="text-xs text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              بستن
            </button>
          </div>
        )}

        {/* Live File Status Bar */}
        <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-bold">منبع داده فعال:</span>
            <span className="font-black text-slate-800 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200/80">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              {lastUploadedFileName || "داده‌های مرجع فراجا (چند شیت)"}
            </span>
            <span className="text-slate-400 font-bold">تعداد شیت‌ها:</span>
            <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
              {departments.length} شیت
            </span>
            <span className="text-slate-400 font-bold">کل مؤلفه‌های سنجش:</span>
            <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
              {departments.reduce((acc, d) => acc + d.sampleItems.length, 0)} گویه
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportExcel}
              className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-xl border border-slate-200"
            >
              <Download className="w-3.5 h-3.5" />
              خروجی کارنامه اکسل
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-xl border border-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              چاپ کارنامه (PDF)
            </button>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs: Dashboard vs Comparison */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setStudioTab("dashboard")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer",
              studioTab === "dashboard"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70"
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            کارنامه تحلیلی و واکاوی واحدها
          </button>

          <button
            type="button"
            onClick={() => {
              setCompareUnitAId(selectedDeptId !== "all" ? selectedDeptId : undefined);
              setStudioTab("compare");
            }}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer",
              studioTab === "compare"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70"
            )}
          >
            <Scale className="w-3.5 h-3.5 text-blue-500" />
            ابزار مقایسه دو استان یا اداره (همراه با نمودار و جزییات)
          </button>
        </div>

        {/* Multi-Sheet / Department Tabs */}
        {studioTab === "dashboard" && departments.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-black text-slate-500 ml-2 whitespace-nowrap">
                انتخاب شیت / واحد:
              </span>

              <button
                type="button"
                onClick={() => setSelectedDeptId("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5",
                  selectedDeptId === "all"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                کل سازمان ({departments.length} شیت)
              </button>

              {departments.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5",
                    selectedDeptId === dept.id
                      ? "bg-emerald-600 text-white shadow-2xs font-black"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  )}
                >
                  <span>{dept.name}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-md font-bold",
                      selectedDeptId === dept.id
                        ? "bg-emerald-800 text-white"
                        : "bg-slate-200 text-slate-700"
                    )}
                  >
                    {dept.complianceScore}٪
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setCompareUnitAId(selectedDeptId !== "all" ? selectedDeptId : undefined);
                  setStudioTab("compare");
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap mr-auto"
                title="مقایسه تطبیقی دو به دو این واحد با سایر استان‌ها یا ادارات"
              >
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                مقایسه دو به دو با واحد دیگر
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render Comparison View or Main Dashboard */}
      {studioTab === "compare" ? (
        <CultureComparisonTool
          departments={departments}
          initialUnitAId={compareUnitAId || (selectedDeptId !== "all" ? selectedDeptId : undefined)}
          onBack={() => setStudioTab("dashboard")}
        />
      ) : (
        /* Main Analysis Display: Minimal & Modern */
        <div className="space-y-6">
        {/* KPI Cards: 4 Sleek Minimal Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Overall Cultural Compliance */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                شاخص کل انطباق فرهنگی
              </span>
              <span
                className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-full",
                  activeData.complianceScore >= 75
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                )}
              >
                {activeData.complianceScore >= 75 ? "پایدار" : "نیاز به بهبود"}
              </span>
            </div>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {activeData.complianceScore}٪
              </span>
              <span className="text-xs font-bold text-slate-400">تراز کلی شاین</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${activeData.complianceScore}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 block">
              ترکیب وزن‌دار مصنوعات (۳۰٪)، ارزش‌ها (۳۵٪) و مفروضات (۳۵٪)
            </span>
          </div>

          {/* Metric 2: Organizational Health */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                شاخص سلامت انتظامی و صیانتی
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {activeData.healthScore}٪
              </span>
              <span className="text-xs font-bold text-emerald-600 font-black">
                {activeData.healthScore >= 70 ? "سطح مطلوب صیانتی" : "هشدار آسیب‌پذیری"}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${activeData.healthScore}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 block">
              نسبت رفتارهای صیانتی مثبت به کدهای هشدار رفتاری
            </span>
          </div>

          {/* Metric 3: Layer Alignment Gap */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                همسویی لایه باورها با رفتارها
              </span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>

            {/* Gap calculation */}
            {(() => {
              const gap = Math.abs(activeData.artifactsScore - activeData.assumptionsScore);
              const isAligned = gap <= 12;
              return (
                <>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {100 - gap}٪
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold font-black",
                        isAligned ? "text-indigo-600" : "text-amber-600"
                      )}
                    >
                      {isAligned ? "همسویی بالا" : `شکاف لایه‌ای: ${gap}٪`}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(20, 100 - gap)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2 block">
                    تطبیق انضباط ظاهری با باورهای قلبی پرسنل
                  </span>
                </>
              );
            })()}
          </div>

          {/* Metric 4: Sample Scale */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                حجم نمونه و گویه‌های سنجش
              </span>
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
            </div>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {activeData.sampleItems.length}
              </span>
              <span className="text-xs font-bold text-slate-500">گویه ارزیابی‌شده</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60">
              <span>پاسخ‌دهندگان: {activeData.respondentCount} نفر</span>
              <span className="text-emerald-700 font-black">سطح اطمینان ۹۵٪</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 block">
              بر مبنای ردیف‌های فایل اکسل آپلودشده
            </span>
          </div>
        </div>

        {/* Archetype Showcase Card & Edgar Schein Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Radar Chart Component (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  مثلث سه‌لایه ادگار شاین
                </span>
                <h3 className="text-sm font-black text-slate-900">
                  نمودار رادار هندسی فرهنگ سازمانی
                </h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-lg border border-emerald-200">
                برخط و محاسبه‌شده
              </span>
            </div>

            {/* Radar chart container */}
            <div className="w-full h-56 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#1e293b", fontSize: 11, fontWeight: "bold" }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                  <Radar
                    name="امتیاز فرهنگی"
                    dataKey="score"
                    stroke="#059669"
                    fill="#10b981"
                    fillOpacity={0.45}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="bg-emerald-50/60 p-2 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block">مصنوعات</span>
                <span className="text-sm font-black text-emerald-800">
                  {activeData.artifactsScore}٪
                </span>
              </div>
              <div className="bg-sky-50/60 p-2 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block">ارزش‌ها</span>
                <span className="text-sm font-black text-sky-800">
                  {activeData.valuesScore}٪
                </span>
              </div>
              <div className="bg-indigo-50/60 p-2 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block">مفروضات</span>
                <span className="text-sm font-black text-indigo-800">
                  {activeData.assumptionsScore}٪
                </span>
              </div>
            </div>
          </div>

          {/* Archetype Profile & Strategic Summary (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-black tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  CULTURAL ARCHETYPE DETECTED
                </span>
                <span className="bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full">
                  {archetype.badge}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                {archetype.title}
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-1">
                {archetype.subTitle}
              </p>
            </div>

            {/* Strategic Mission Profile Quote */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 md:p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black tracking-wider text-emerald-400 uppercase">
                  بیانیه راهبردی فرهنگ غالب این شیت
                </span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs md:text-sm font-bold text-slate-100 leading-relaxed">
                «{archetype.description}»
              </p>
            </div>

            {/* Diagnostic Context Note */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-black text-slate-800">
                  تحلیل زمینه بر اساس فایل اکسل ({activeData.name}):
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {activeData.description}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Schein Layer Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Layer 1: Artifacts */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <h4 className="text-xs font-black text-slate-900">
                  لایه ۱: مصنوعات و نمادها (Artifacts)
                </h4>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                {activeData.artifactsScore}٪
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              رفتارهای قابل مشاهده، آراستگی ظاهری، بهره‌گیری از تجهیزات و ثبت سامانه‌ای.
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${activeData.artifactsScore}%` }}
              ></div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[11px] font-bold text-slate-700">
              <span className="text-slate-400 block text-[10px]">شاخص منتخب این لایه:</span>
              {activeData.sampleItems.find((i) => i.layer === "artifacts")?.indicator ||
                "نظم ظاهری و تجهیزات مأموریتی"}
            </div>
          </div>

          {/* Layer 2: Values */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                <h4 className="text-xs font-black text-slate-900">
                  لایه ۲: ارزش‌های ابرازی (Espoused Values)
                </h4>
              </div>
              <span className="text-xs font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg">
                {activeData.valuesScore}٪
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              منشور اخلاقی، اهداف ابلاغی، قانون‌مداری و کدهای تکریم ارباب‌رجوع.
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full"
                style={{ width: `${activeData.valuesScore}%` }}
              ></div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[11px] font-bold text-slate-700">
              <span className="text-slate-400 block text-[10px]">شاخص منتخب این لایه:</span>
              {activeData.sampleItems.find((i) => i.layer === "values")?.indicator ||
                "تکریم ارباب رجوع و انضباط معنوی"}
            </div>
          </div>

          {/* Layer 3: Assumptions */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <h4 className="text-xs font-black text-slate-900">
                  لایه ۳: مفروضات بنیادین (Basic Assumptions)
                </h4>
              </div>
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg">
                {activeData.assumptionsScore}٪
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              باورهای ناخودآگاه، احساس امنیت روانی، تعلق سازمانی و انگیزه‌های عمیق درونی.
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full"
                style={{ width: `${activeData.assumptionsScore}%` }}
              ></div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[11px] font-bold text-slate-700">
              <span className="text-slate-400 block text-[10px]">شاخص منتخب این لایه:</span>
              {activeData.sampleItems.find((i) => i.layer === "assumptions")?.indicator ||
                "باورهای صیانتی و احساس عدالت"}
            </div>
          </div>
        </div>

        {/* Real Strengths & Risks extracted from Excel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">
                  نقاط قوت فرهنگی برجسته (شناسایی‌شده در اکسل)
                </h3>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                بالاترین امتیازات
              </span>
            </div>

            <div className="space-y-3">
              {topStrengths.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50/40 p-3.5 rounded-2xl border border-emerald-100 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">
                        {item.indicator}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      مصداق: {item.manifestation}
                    </p>
                  </div>
                  <span className="text-sm font-black text-emerald-700 shrink-0">
                    {item.weight}٪
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vulnerabilities / Needs Improvement Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black text-slate-900">
                  کانون‌های آسیب‌پذیر و گلوگاه‌ها (نیازمند اصلاح)
                </h3>
              </div>
              <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                پایین‌ترین امتیازات
              </span>
            </div>

            <div className="space-y-3">
              {topVulnerabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/40 p-3.5 rounded-2xl border border-amber-100 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">
                        {item.indicator}
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      مصداق گزارش‌شده: {item.manifestation}
                    </p>
                  </div>
                  <span className="text-sm font-black text-amber-700 shrink-0">
                    {item.weight}٪
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data-Driven Action Plans */}
        <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                STRATEGIC INTERVENTIONS
              </span>
              <h3 className="text-base font-black text-slate-900 mt-0.5">
                برنامه اقدام راهبردی و مصوبات اصلاحی (مبتنی بر یافته‌های اکسل)
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              توصیه‌های سه‌گانه زمانی
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Short-Term */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h4 className="text-xs font-black text-slate-900">
                  اقدامات کوتاه‌مدت (۱ تا ۳ ماه)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block">
                تمرکز: پایش برخط، ثبت سامانه‌ای و واکنش سریع
              </span>
              <ul className="space-y-2">
                {activeData.actionPlans.shortTerm.map((act, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-slate-200/60"
                  >
                    • {act}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mid-Term */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <h4 className="text-xs font-black text-slate-900">
                  اقدامات میان‌مدت (۳ تا ۶ ماه)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block">
                تمرکز: اصلاح رفتاری، کارگاه‌های تعالی و مشاوره صیانتی
              </span>
              <ul className="space-y-2">
                {activeData.actionPlans.midTerm.map((act, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-slate-200/60"
                  >
                    • {act}
                  </li>
                ))}
              </ul>
            </div>

            {/* Long-Term */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <h4 className="text-xs font-black text-slate-900">
                  اقدامات بلندمدت (۶ تا ۱۲ ماه)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block">
                تمرکز: ساختارسازی، نظام ارتقا و اصلاح پیوست‌های رفاهی
              </span>
              <ul className="space-y-2">
                {activeData.actionPlans.longTerm.map((act, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-slate-200/60"
                  >
                    • {act}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Raw Extracted Data Explorer */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  کاوشگر شاخص‌های استخراج‌شده از فایل اکسل ({filteredItems.length} سطر)
                </h3>
                <p className="text-[11px] text-slate-400 font-bold">
                  مشاهده سطور ارزیابی‌شده همراه با نمره و دسته‌بندی در لایه‌های شاین
                </p>
              </div>
            </div>

            {/* Search and Layer Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  placeholder="جستجو در شاخص‌ها و مصادیق..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl pr-8 pl-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedLayerFilter("all")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    selectedLayerFilter === "all"
                      ? "bg-white text-slate-900 shadow-2xs font-black"
                      : "text-slate-600"
                  )}
                >
                  همه
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayerFilter("artifacts")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    selectedLayerFilter === "artifacts"
                      ? "bg-white text-emerald-800 shadow-2xs font-black"
                      : "text-slate-600"
                  )}
                >
                  مصنوعات
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayerFilter("values")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    selectedLayerFilter === "values"
                      ? "bg-white text-sky-800 shadow-2xs font-black"
                      : "text-slate-600"
                  )}
                >
                  ارزش‌ها
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayerFilter("assumptions")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                    selectedLayerFilter === "assumptions"
                      ? "bg-white text-indigo-800 shadow-2xs font-black"
                      : "text-slate-600"
                  )}
                >
                  مفروضات
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200/80">
                <tr>
                  <th className="p-3">ردیف</th>
                  <th className="p-3">محور انضباطی</th>
                  <th className="p-3">شاخص / گویه نظرسنجی</th>
                  <th className="p-3">مصداق رفتاری</th>
                  <th className="p-3">لایه در مدل شاین</th>
                  <th className="p-3">امتیاز استخراج‌شده</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredItems.slice(0, 15).map((item, i) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-slate-400">{i + 1}</td>
                    <td className="p-3 font-bold text-slate-800">{item.category}</td>
                    <td className="p-3 text-slate-800 font-bold">{item.indicator}</td>
                    <td className="p-3 text-slate-600">{item.manifestation}</td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-lg text-[10px] font-black",
                          item.layer === "artifacts"
                            ? "bg-emerald-50 text-emerald-800"
                            : item.layer === "values"
                            ? "bg-sky-50 text-sky-800"
                            : "bg-indigo-50 text-indigo-800"
                        )}
                      >
                        {item.layer === "artifacts"
                          ? "مصنوعات"
                          : item.layer === "values"
                          ? "ارزش‌ها"
                          : "مفروضات"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "font-black text-xs",
                          item.weight >= 75
                            ? "text-emerald-700"
                            : item.weight >= 60
                            ? "text-slate-800"
                            : "text-amber-700"
                        )}
                      >
                        {item.weight}٪
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length > 15 && (
            <p className="text-[11px] text-slate-400 font-bold text-center pt-1">
              نمایش ۱۵ سطر اول از مجموع {filteredItems.length} سطر پردازش‌شده فایل اکسل
            </p>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
