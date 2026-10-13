import React from "react";
import { Sparkles, Shield, Cpu, AlertCircle, Check } from "lucide-react";
import { ScheinLayer, ProcessingAlgorithm } from "../../types/culture";
import { cn } from "../../lib/utils";

interface SmartEngineSettingsProps {
  activeLayers: Record<ScheinLayer, boolean>;
  onToggleLayer: (layer: ScheinLayer) => void;
  algorithm: ProcessingAlgorithm;
  onChangeAlgorithm: (algo: ProcessingAlgorithm) => void;
  selectedCount: number;
  onGenerateReport: () => void;
}

export function SmartEngineSettings({
  activeLayers,
  onToggleLayer,
  algorithm,
  onChangeAlgorithm,
  selectedCount,
  onGenerateReport,
}: SmartEngineSettingsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
          <h3 className="font-black text-slate-900 text-base md:text-lg">تنظیمات موتور هوشمند</h3>
        </div>

        {/* Schein Layers Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-slate-700">
            لایه‌های ارزیابی فرهنگی:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onToggleLayer("artifacts")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer",
                activeLayers.artifacts
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {activeLayers.artifacts && <Check className="w-3.5 h-3.5" />}
              مصنوعات
            </button>

            <button
              type="button"
              onClick={() => onToggleLayer("values")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer",
                activeLayers.values
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {activeLayers.values && <Check className="w-3.5 h-3.5" />}
              ارزش‌ها
            </button>

            <button
              type="button"
              onClick={() => onToggleLayer("assumptions")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer",
                activeLayers.assumptions
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {activeLayers.assumptions && <Check className="w-3.5 h-3.5" />}
              مفروضات
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            انتخاب کنید هوش مصنوعی تحلیل خود را بر کدام سطوح از لایه‌های فرهنگی سازمانی متمرکز کند.
          </p>
        </div>

        {/* AI Processing Algorithm Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            الگوریتم پردازش هوش مصنوعی:
          </label>

          {/* Option 1 */}
          <div
            onClick={() => onChangeAlgorithm("protective")}
            className={cn(
              "p-4 rounded-2xl border transition-all cursor-pointer relative",
              algorithm === "protective"
                ? "border-blue-500 bg-blue-50/40 shadow-xs"
                : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900">تحلیل صیانتی (خوش‌بینانه)</h4>
                <p className="text-[11px] text-slate-500 mt-1">تمرکز بر تقویت نقاط قوت و انضباط معنوی پرسنل</p>
              </div>
              <span
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                  algorithm === "protective" ? "border-blue-600 bg-blue-600" : "border-slate-300"
                )}
              >
                {algorithm === "protective" && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </span>
            </div>
          </div>

          {/* Option 2 (Default) */}
          <div
            onClick={() => onChangeAlgorithm("strategic")}
            className={cn(
              "p-4 rounded-2xl border transition-all cursor-pointer relative",
              algorithm === "strategic"
                ? "border-blue-500 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/30"
                : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-xs text-blue-900">تحلیل راهبردی (متعادل)</h4>
                <p className="text-[11px] text-slate-600 mt-1">ترکیب واقع‌بینانه فرصت‌ها و تهدیدهای فرهنگی یگان</p>
              </div>
              <span
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                  algorithm === "strategic" ? "border-blue-600 bg-blue-600" : "border-slate-300"
                )}
              >
                {algorithm === "strategic" && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </span>
            </div>
          </div>

          {/* Option 3 */}
          <div
            onClick={() => onChangeAlgorithm("diagnostic")}
            className={cn(
              "p-4 rounded-2xl border transition-all cursor-pointer relative",
              algorithm === "diagnostic"
                ? "border-blue-500 bg-blue-50/40 shadow-xs"
                : "border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900">تحلیل آسیب‌شناسانه (سخت‌گیرانه)</h4>
                <p className="text-[11px] text-slate-500 mt-1">موشکافی دقیق تضادهای فرهنگی و مشکلات سیستمی فراجا</p>
              </div>
              <span
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                  algorithm === "diagnostic" ? "border-blue-600 bg-blue-600" : "border-slate-300"
                )}
              >
                {algorithm === "diagnostic" && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={onGenerateReport}
          disabled={selectedCount === 0}
          className={cn(
            "w-full py-3.5 px-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
            selectedCount > 0
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-[0.99]"
              : "bg-emerald-200/70 text-emerald-800/70 cursor-not-allowed"
          )}
        >
          <Cpu className="w-4 h-4" />
          تولید گزارش راهبردی ({selectedCount})
        </button>

        {selectedCount === 0 && (
          <p className="text-[11px] text-rose-500 font-bold text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            لطفاً ابتدا پرسشنامه‌های مورد نظر را علامت‌گذاری کنید.
          </p>
        )}
      </div>
    </div>
  );
}
