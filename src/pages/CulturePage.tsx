import React, { useState } from "react";
import {
  Shield,
  User,
  Building2,
  FileSpreadsheet,
  Plus,
  Archive,
  Table,
  Sparkles,
  CheckCircle2,
  Layers,
  Scale,
} from "lucide-react";
import { useRole } from "../context/RoleContext";
import { DepartmentCultureData, ScheinLayer, ProcessingAlgorithm } from "../types/culture";
import { INITIAL_DEPARTMENTS } from "../services/cultureData";
import { SmartEngineSettings } from "../components/culture/SmartEngineSettings";
import { ReceivedQuestionnaires } from "../components/culture/ReceivedQuestionnaires";
import { StrategicReportView } from "../components/culture/StrategicReportView";
import { LiveDatabaseModal } from "../components/culture/LiveDatabaseModal";
import { ExcelUploadModal } from "../components/culture/ExcelUploadModal";
import { PersonnelCultureView } from "../components/culture/PersonnelCultureView";
import { ManagerCultureView } from "../components/culture/ManagerCultureView";
import { OnlineCultureStudio } from "../components/culture/OnlineCultureStudio";
import { CultureComparisonTool } from "../components/culture/CultureComparisonTool";
import { cn } from "../lib/utils";

type CultureViewMode = "online_studio" | "compare" | "evaluator" | "strategic_report" | "personnel" | "manager";

export function CulturePage() {
  const { role } = useRole();

  // Departments loaded in system (starts with initial data)
  const [departments, setDepartments] = useState<DepartmentCultureData[]>(INITIAL_DEPARTMENTS);

  // Selected sheet IDs for AI analysis
  const [selectedSheetIds, setSelectedSheetIds] = useState<string[]>([
    "edari-1",
    "edari-2",
  ]);

  // Default viewMode: "online_studio" gives the user immediate Excel upload, parsing, and minimal output!
  const [viewMode, setViewMode] = useState<CultureViewMode>("online_studio");

  // Smart Engine Settings state
  const [activeLayers, setActiveLayers] = useState<Record<ScheinLayer, boolean>>({
    artifacts: true,
    values: true,
    assumptions: true,
  });

  const [algorithm, setAlgorithm] = useState<ProcessingAlgorithm>("strategic");

  // Modals
  const [isLiveDbOpen, setIsLiveDbOpen] = useState(false);
  const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
  const [showArchiveToast, setShowArchiveToast] = useState(false);

  // Handlers
  const handleToggleLayer = (layer: ScheinLayer) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleToggleSelectSheet = (id: string) => {
    setSelectedSheetIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedSheetIds(departments.map((d) => d.id));
  };

  const handleDeselectAll = () => {
    setSelectedSheetIds([]);
  };

  const handleUploadSuccess = (newDepts: DepartmentCultureData[]) => {
    setDepartments((prev) => [...newDepts, ...prev]);
    // Automatically select the new sheets
    setSelectedSheetIds(newDepts.map((d) => d.id));
    // Switch to online_studio to see the immediate result
    setViewMode("online_studio");
  };

  const handleDepartmentsChange = (newDepts: DepartmentCultureData[]) => {
    setDepartments(newDepts);
    setSelectedSheetIds(newDepts.map((d) => d.id));
  };

  const handleOpenManagerReport = (deptId?: string) => {
    if (deptId) {
      setSelectedSheetIds([deptId]);
    }
    setViewMode("strategic_report");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12" dir="rtl">
      {/* Top Application Bar matching design */}
      <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200/90 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* View Mode Switcher buttons */}
        <div className="flex items-center bg-slate-100/90 p-1.5 rounded-2xl gap-1 overflow-x-auto scrollbar-none">
          {/* Online Studio (Primary & Minimalist View) */}
          <button
            type="button"
            onClick={() => setViewMode("online_studio")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap",
              viewMode === "online_studio"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Sparkles
              className={cn(
                "w-4 h-4",
                viewMode === "online_studio" ? "text-emerald-600" : "text-slate-500"
              )}
            />
            واکاوی برخط اکسل و کارنامه مینیمال
          </button>

          {/* Comparative Analysis: Two Provinces or Departments */}
          <button
            type="button"
            onClick={() => setViewMode("compare")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap",
              viewMode === "compare"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Scale
              className={cn(
                "w-4 h-4",
                viewMode === "compare" ? "text-blue-600" : "text-slate-500"
              )}
            />
            مقایسه دو استان یا اداره (تطبیقی با نمودار)
          </button>

          {/* Evaluator Engine */}
          <button
            type="button"
            onClick={() => setViewMode("evaluator")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap",
              viewMode === "evaluator" || viewMode === "strategic_report"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Shield
              className={cn(
                "w-4 h-4",
                viewMode === "evaluator" || viewMode === "strategic_report"
                  ? "text-emerald-600"
                  : "text-slate-500"
              )}
            />
            تنظیمات موتور و شیت‌ها
          </button>

          {/* Commander / Manager Dashboard */}
          <button
            type="button"
            onClick={() => setViewMode("manager")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap",
              viewMode === "manager"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Building2
              className={cn(
                "w-4 h-4",
                viewMode === "manager" ? "text-blue-600" : "text-slate-500"
              )}
            />
            داشبورد فرمانده / مدیر
          </button>

          {/* Personnel Box */}
          <button
            type="button"
            onClick={() => setViewMode("personnel")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap",
              viewMode === "personnel"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <User
              className={cn(
                "w-4 h-4",
                viewMode === "personnel" ? "text-emerald-600" : "text-slate-500"
              )}
            />
            صندوق ورود پرسنل
          </button>
        </div>

        {/* Action Buttons: New File Analysis, Archive, Live Database */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setIsExcelUploadOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            + واکاوی فایل جدید
          </button>

          <button
            type="button"
            onClick={() => setIsLiveDbOpen(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-2xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Table className="w-4 h-4 text-emerald-600" />
            جداول داده مرجع (Live)
          </button>

          <button
            type="button"
            onClick={() => {
              setShowArchiveToast(true);
              setTimeout(() => setShowArchiveToast(false), 3000);
            }}
            className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-2xl border border-slate-200/90 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Archive className="w-4 h-4 text-slate-500" />
            آرشیو گزارشات
          </button>
        </div>
      </div>

      {showArchiveToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          تمامی تحلیل‌ها و شیت‌های آپلودشده با شناسه امنیتی در آرشیو سامانه ذخیره گردیدند.
        </div>
      )}

      {/* Main View Render */}
      {viewMode === "online_studio" && (
        <OnlineCultureStudio
          departments={departments}
          onDepartmentsChange={handleDepartmentsChange}
          onOpenCompare={() => setViewMode("compare")}
        />
      )}

      {viewMode === "compare" && (
        <CultureComparisonTool
          departments={departments}
          onBack={() => setViewMode("online_studio")}
        />
      )}

      {viewMode === "evaluator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Smart Engine Settings */}
          <div className="lg:col-span-4 h-full">
            <SmartEngineSettings
              activeLayers={activeLayers}
              onToggleLayer={handleToggleLayer}
              algorithm={algorithm}
              onChangeAlgorithm={setAlgorithm}
              selectedCount={selectedSheetIds.length}
              onGenerateReport={() => setViewMode("strategic_report")}
            />
          </div>

          {/* Right Column: Received Questionnaires list with Checkboxes */}
          <div className="lg:col-span-8 h-full">
            <ReceivedQuestionnaires
              departments={departments}
              selectedIds={selectedSheetIds}
              onToggleSelect={handleToggleSelectSheet}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
            />
          </div>
        </div>
      )}

      {viewMode === "strategic_report" && (
        <StrategicReportView
          departments={departments}
          selectedIds={selectedSheetIds}
          algorithm={algorithm}
          activeLayers={activeLayers}
          onBack={() => setViewMode("evaluator")}
        />
      )}

      {viewMode === "manager" && (
        <ManagerCultureView
          departments={departments}
          onOpenReport={handleOpenManagerReport}
        />
      )}

      {viewMode === "personnel" && (
        <PersonnelCultureView departments={departments} />
      )}

      {/* Modals */}
      <LiveDatabaseModal
        isOpen={isLiveDbOpen}
        onClose={() => setIsLiveDbOpen(false)}
        departments={departments}
      />

      <ExcelUploadModal
        isOpen={isExcelUploadOpen}
        onClose={() => setIsExcelUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
