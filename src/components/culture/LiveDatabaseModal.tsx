import React, { useState } from "react";
import { X, Search, FileSpreadsheet, Download, Table, Layers } from "lucide-react";
import { DepartmentCultureData } from "../../types/culture";
import { exportCultureReportToExcel } from "../../services/cultureExcelService";
import { cn } from "../../lib/utils";

interface LiveDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: DepartmentCultureData[];
}

export function LiveDatabaseModal({ isOpen, onClose, departments }: LiveDatabaseModalProps) {
  const [activeTabId, setActiveTabId] = useState<string>(departments[0]?.id || "edari-1");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const activeDept = departments.find((d) => d.id === activeTabId) || departments[0];
  const items = activeDept?.sampleItems || [];

  const filteredItems = items.filter(
    (item) =>
      item.category.includes(searchQuery) ||
      item.indicator.includes(searchQuery) ||
      item.manifestation.includes(searchQuery) ||
      item.scheinLevel.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                جداول پایگاه داده مرجع (Live)
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                  برخط
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                مشاهده شیت‌های اکسل آپلودشده و رکوردهای خام نظرسنجی به‌صورت برخط
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportCultureReportToExcel(departments, [activeDept.id])}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              خروجی اکسل این شیت
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Tabs Header */}
        <div className="bg-slate-100/80 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-500 shrink-0 ml-2">شیت‌های اکسل:</span>
          {departments.map((dept) => {
            const isActive = dept.id === activeTabId;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => setActiveTabId(dept.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5",
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs font-black"
                    : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200/60"
                )}
              >
                <Table className="w-3.5 h-3.5" />
                {dept.name}
              </button>
            );
          })}
        </div>

        {/* Search and Filters Bar */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در شاخص‌ها، محورها یا سطوح..."
              className="w-full pr-9 pl-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
            <span>تعداد ردیف‌ها: {filteredItems.length}</span>
            <span>•</span>
            <span>شاخص انطباق: {activeDept.complianceScore}٪</span>
          </div>
        </div>

        {/* Live Table matching Screenshot 3 */}
        <div className="flex-1 overflow-auto p-6">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-800 font-black border-b border-slate-200">
                  <th className="py-3 px-4 w-12 text-center">ردیف</th>
                  <th className="py-3 px-4">انضباط مالی واقتصادی و محورها</th>
                  <th className="py-3 px-4">ارتشا و اختلاس و شاخص‌ها</th>
                  <th className="py-3 px-4">مصداق رفتاری در صحنه</th>
                  <th className="py-3 px-4 text-center">سطح در مدل شاین</th>
                  <th className="py-3 px-4 text-center">لایه اصلی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-center text-slate-400 font-bold tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {item.indicator}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.manifestation}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-black inline-block",
                          item.scheinLevel.includes("مثبت")
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        )}
                      >
                        {item.scheinLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold">
                        {item.layer === "artifacts"
                          ? "مصنوعات"
                          : item.layer === "values"
                          ? "ارزش‌ها"
                          : "مفروضات"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                موردی مطابق با جستجوی شما یافت نشد.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            پایگاه داده زنده نظرسنجی و شیت‌های اکسل فراجا — مدل فرهنگ سازمانی ادگار شاین
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            بستن جدول
          </button>
        </div>
      </div>
    </div>
  );
}
