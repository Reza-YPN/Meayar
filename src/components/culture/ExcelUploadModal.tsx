import React, { useState, useRef } from "react";
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { parseCultureExcelFile, downloadCultureSampleExcel } from "../../services/cultureExcelService";
import { DepartmentCultureData } from "../../types/culture";

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDepartments: DepartmentCultureData[]) => void;
}

export function ExcelUploadModal({ isOpen, onClose, onUploadSuccess }: ExcelUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewDepts, setPreviewDepts] = useState<DepartmentCultureData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = async (file: File) => {
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls") && !file.name.endsWith(".csv")) {
      setError("لطفاً یک فایل معتبر اکسل (.xlsx یا .xls) انتخاب نمایید.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const parsed = await parseCultureExcelFile(file);
      if (parsed.length === 0) {
        setError("هیچ شیتی در این فایل یافت نشد.");
      } else {
        setPreviewDepts(parsed);
      }
    } catch (err: any) {
      console.error(err);
      setError("خطا در پردازش فایل اکسل. لطفاً از فرمت استاندارد نظرسنجی فراجا استفاده کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleConfirm = () => {
    if (previewDepts.length > 0) {
      onUploadSuccess(previewDepts);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">واکاوی و آپلود فایل اکسل جدید</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            فایل اکسل چندشیتی شامل پرسشنامه‌ها و نظرسنجی‌های ادارات مختلف فراجا را در این بخش آپلود کنید.
            سیستم شیت‌های موجود را به‌صورت خودکار تفکیک کرده و برای واکاوی هوش مصنوعی آماده می‌سازد.
          </p>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-emerald-500 bg-emerald-50/50 scale-[0.99]"
                : "border-slate-300 hover:border-emerald-400 bg-slate-50/50 hover:bg-slate-50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs border border-slate-200/80 mx-auto flex items-center justify-center text-emerald-600 mb-3">
              <Upload className="w-7 h-7" />
            </div>

            <p className="text-xs font-bold text-slate-800">
              کلیک کنید یا فایل اکسل را به این کادر بکشید
            </p>
            <p className="text-[11px] text-slate-400 mt-1">فرمت‌های مجاز: XLSX, XLS (چند شیت)</p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 py-3">
              <Sparkles className="w-4 h-4 animate-spin" />
              در حال خواندن شیت‌ها و پردازش ساختار داده‌ها...
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Preview of Extracted Sheets */}
          {previewDepts.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  تعداد {previewDepts.length} شیت سازمانی شناسایی شد:
                </span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                {previewDepts.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  >
                    <span className="font-bold text-slate-800">{d.name}</span>
                    <span className="text-[11px] text-slate-500">{d.sampleItems.length} مؤلفه شناسایی شده</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={downloadCultureSampleExcel}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 rotate-180" />
            دانلود قالب استاندارد نمونه
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="button"
              disabled={previewDepts.length === 0}
              onClick={handleConfirm}
              className="px-5 py-2 text-xs font-black bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              تأیید و استخراج شیت‌ها
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
