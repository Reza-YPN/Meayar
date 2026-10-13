import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileSpreadsheet, Layers, CheckSquare, Square } from "lucide-react";
import { DepartmentCultureData } from "../../types/culture";
import { cn } from "../../lib/utils";

interface ReceivedQuestionnairesProps {
  departments: DepartmentCultureData[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function ReceivedQuestionnaires({
  departments,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
}: ReceivedQuestionnairesProps) {
  const [filter, setFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isAllSelected = departments.length > 0 && selectedIds.length === departments.length;

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col h-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isAllSelected ? onDeselectAll : onSelectAll}
            className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title={isAllSelected ? "عدم انتخاب همه" : "انتخاب همه"}
          >
            {isAllSelected ? (
              <CheckSquare className="w-5 h-5 text-emerald-600" />
            ) : (
              <Square className="w-5 h-5 text-slate-400" />
            )}
          </button>
          <h3 className="font-black text-slate-900 text-base md:text-lg">
            پرسشنامه‌های دریافتی ({departments.length})
          </h3>
        </div>

        {/* Date Filter Chips */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filter === "all" ? "bg-white text-slate-900 shadow-2xs font-black" : "text-slate-500 hover:text-slate-800"
            )}
          >
            همه
          </button>
          <button
            type="button"
            onClick={() => setFilter("today")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filter === "today" ? "bg-white text-slate-900 shadow-2xs font-black" : "text-slate-500 hover:text-slate-800"
            )}
          >
            امروز
          </button>
          <button
            type="button"
            onClick={() => setFilter("week")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filter === "week" ? "bg-white text-slate-900 shadow-2xs font-black" : "text-slate-500 hover:text-slate-800"
            )}
          >
            هفته اخیر
          </button>
          <button
            type="button"
            onClick={() => setFilter("month")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filter === "month" ? "bg-white text-slate-900 shadow-2xs font-black" : "text-slate-500 hover:text-slate-800"
            )}
          >
            ماه اخیر
          </button>
        </div>
      </div>

      {/* List of Sheet Questionnaires */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar max-h-[580px]">
        {departments.map((dept) => {
          const isSelected = selectedIds.includes(dept.id);
          const isExpanded = expandedId === dept.id;

          return (
            <div
              key={dept.id}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden",
                isSelected
                  ? "border-emerald-500/80 bg-emerald-50/15 shadow-2xs"
                  : "border-slate-200/90 bg-white hover:border-slate-300"
              )}
            >
              <div className="p-4 flex items-center justify-between gap-4">
                {/* Accordion toggle button */}
                <button
                  type="button"
                  onClick={() => toggleExpand(dept.id)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                  title="مشاهده جزئیات شیت"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {/* Info */}
                <div className="flex-1 text-right">
                  <div className="flex items-center gap-2 mb-1 justify-end flex-wrap">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-lg">
                      اسکن سند / شیت
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 tabular-nums" dir="ltr">
                      {dept.uploadedAt}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">{dept.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {dept.roleTitle || "پرسنل و کادر سازمانی"}
                  </p>
                </div>

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(dept.id)}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer shrink-0"
                />
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-5 pb-4 pt-1 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold py-1 border-b border-slate-200/60">
                    <span>شاخص انطباق فرهنگی: {dept.complianceScore}٪</span>
                    <span>شاخص سلامت انتظامی: {dept.healthScore}٪</span>
                    <span>تعداد پاسخ‌ها: {dept.respondentCount}</span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                    {dept.description}
                  </p>

                  <div className="pt-2">
                    <span className="font-bold text-[11px] text-slate-800 block mb-1">
                      نمونه مؤلفه‌های استخراج‌شده در مدل شاین:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {dept.sampleItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-2 rounded-xl border border-slate-200/70 text-[10px] flex items-center justify-between"
                        >
                          <span className="font-bold text-slate-800">{item.indicator}</span>
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded text-[9px] font-black",
                              item.scheinLevel.includes("مثبت")
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            )}
                          >
                            {item.scheinLevel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
