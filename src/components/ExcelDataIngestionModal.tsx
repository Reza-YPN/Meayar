import React, { useState, useRef } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  X, 
  Filter, 
  Search, 
  RefreshCw, 
  Check, 
  ArrowRight,
  Database,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDecisionSupport } from '../hooks/useDecisionSupport';
import { SupportedExcelSchema } from '../services/excelIngestionService';

export function ExcelDataIngestionModal() {
  const { 
    isIngestionModalOpen, 
    setIsIngestionModalOpen, 
    importSummary, 
    isProcessingFile, 
    parseExcelFile, 
    commitImportedData, 
    clearImportSummary, 
    downloadSampleTemplate 
  } = useDecisionSupport();

  const [selectedSchema, setSelectedSchema] = useState<SupportedExcelSchema>('personnel');
  const [filterStatus, setFilterStatus] = useState<'all' | 'valid' | 'warning' | 'error'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [commitSuccessMessage, setCommitSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isIngestionModalOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processSelectedFile(files[0]);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const processSelectedFile = async (file: File) => {
    setUploadError(null);
    setCommitSuccessMessage(null);
    try {
      await parseExcelFile(file, selectedSchema);
    } catch (err: any) {
      setUploadError(err.message || 'خطا در خواندن یا پردازش فایل اکسل.');
    }
  };

  const handleCommit = () => {
    if (!importSummary) return;
    const count = importSummary.validCount + importSummary.warningCount;
    commitImportedData(importSummary);
    setCommitSuccessMessage(`تعداد ${count} ردیف داده با موفقیت در پایگاه داده و موتور تصمیمیار ثبت و اعمال شد.`);
    setTimeout(() => {
      setCommitSuccessMessage(null);
      setIsIngestionModalOpen(false);
    }, 1800);
  };

  const filteredRows = importSummary?.rows.filter(row => {
    if (filterStatus !== 'all' && row.status !== filterStatus) return false;
    if (!searchTerm) return true;
    const rawStr = JSON.stringify(row.raw).toLowerCase();
    return rawStr.includes(searchTerm.toLowerCase());
  }) || [];

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 text-right" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shadow-lg">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  لایه ۳ معماری: ورود دسته‌ای داده‌ها
                </span>
                <span className="text-xs text-slate-400 font-mono">XLSX / CSV Ingestion</span>
              </div>
              <h3 className="text-lg font-black mt-1">بارگذاری و پردازش هوشمند فایل‌های اکسل و شاخص‌های فراجا</h3>
            </div>
          </div>
          <button 
            onClick={() => {
              clearImportSummary();
              setIsIngestionModalOpen(false);
            }}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
          {commitSuccessMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 font-bold text-sm"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>{commitSuccessMessage}</span>
            </motion.div>
          )}

          {uploadError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 font-bold text-sm">
              <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {!importSummary ? (
            <div className="space-y-6">
              {/* Step 1: Schema Selection */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-3">
                  ۱. نوع ساختار داده‌ای فایل اکسل را انتخاب کنید:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedSchema('personnel')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedSchema === 'personnel'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm text-slate-800">کارنامه عملکرد و ارزیابی کارکنان</span>
                      <input 
                        type="radio" 
                        checked={selectedSchema === 'personnel'} 
                        onChange={() => setSelectedSchema('personnel')}
                        className="accent-indigo-600"
                      />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      شامل کد کارکنان (پرسنلی)، نام، نمره کل، شاخص‌های نتیجه‌ای و رفتاری، ساعات آموزش، اضافه‌کار و مرخصی.
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedSchema('unit_kpis')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedSchema === 'unit_kpis'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm text-slate-800">شاخص‌های کلان یگان‌ها و کلانتری‌ها</span>
                      <input 
                        type="radio" 
                        checked={selectedSchema === 'unit_kpis'} 
                        onChange={() => setSelectedSchema('unit_kpis')}
                        className="accent-indigo-600"
                      />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      شامل کد یگان، میانگین عملکرد، میانگین اضافه‌کار، ساعات آموزش و رضایت شهروندان.
                    </p>
                  </div>
                </div>
              </div>

              {/* Template Download Prompt */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">قالب اکسل استاندارد فراجا</h5>
                    <p className="text-[11px] text-slate-500">جهت جلوگیری از خطای ساختاری، ابتدا فایل نمونه را دانلود و تکمیل نمایید.</p>
                  </div>
                </div>
                <button
                  onClick={() => downloadSampleTemplate(selectedSchema)}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>دریافت فایل قالب ({selectedSchema === 'personnel' ? 'کارکنان' : 'یگان‌ها'})</span>
                </button>
              </div>

              {/* Drag & Drop Box */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-3">
                  ۲. فایل اکسل تکمیل‌شده را بارگذاری کنید:
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                    isDragOver 
                      ? 'border-indigo-500 bg-indigo-50/70 scale-[1.01]' 
                      : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20'
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept=".xlsx, .xls, .csv" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />

                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
                    {isProcessingFile ? (
                      <RefreshCw className="w-8 h-8 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8" />
                    )}
                  </div>

                  <h4 className="font-black text-sm text-slate-800 mb-1">
                    {isProcessingFile ? 'در حال خواندن و اعتبارسنجی داده‌ها...' : 'فایل اکسل (.xlsx یا .csv) را اینجا بکشید یا کلیک کنید'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm">
                    حداکثر حجم مجاز: ۲۵ مگابایت — انطباق خودکار ستون‌ها بر اساس هدرهای فارسی
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Validation Preview & Summary */
            <div className="space-y-6">
              {/* Summary Stats Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <span className="text-[11px] text-slate-500 font-bold">کل ردیف‌ها</span>
                  <p className="text-2xl font-black text-slate-800 font-mono mt-1">{importSummary.totalRows}</p>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> معتبر
                  </span>
                  <p className="text-2xl font-black text-emerald-700 font-mono mt-1">{importSummary.validCount}</p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                  <span className="text-[11px] text-amber-700 font-bold flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> هشدار
                  </span>
                  <p className="text-2xl font-black text-amber-700 font-mono mt-1">{importSummary.warningCount}</p>
                </div>
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center">
                  <span className="text-[11px] text-rose-700 font-bold flex items-center justify-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> نامعتبر / خطا
                  </span>
                  <p className="text-2xl font-black text-rose-700 font-mono mt-1">{importSummary.errorCount}</p>
                </div>
              </div>

              {/* Table Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-600">فیلتر وضعیت:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${filterStatus === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                    >
                      همه ({importSummary.totalRows})
                    </button>
                    <button
                      onClick={() => setFilterStatus('valid')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${filterStatus === 'valid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                      معتبر ({importSummary.validCount})
                    </button>
                    <button
                      onClick={() => setFilterStatus('error')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${filterStatus === 'error' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                      خطاها ({importSummary.errorCount})
                    </button>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="جستجو در ردیف‌ها..."
                    className="w-full pl-3 pr-9 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-indigo-500 font-medium"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2" />
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="max-h-72 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-100/80 sticky top-0 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-16 text-center">ردیف</th>
                        <th className="p-3">عنوان / شناسه</th>
                        <th className="p-3">شاخص‌های کلیدی</th>
                        <th className="p-3">وضعیت اعتبارسنجی</th>
                        <th className="p-3">پیام سیستم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredRows.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400 font-bold">
                            هیچ ردیفی مطابق فیلتر یافت نشد.
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((row) => (
                          <tr key={row.rowNumber} className="hover:bg-slate-50/70 transition">
                            <td className="p-3 text-center font-mono text-slate-500">{row.rowNumber}</td>
                            <td className="p-3">
                              <span className="font-bold text-slate-800">
                                {row.parsedData?.name || row.parsedData?.unitName || row.raw['نام'] || 'بدون نام'}
                              </span>
                              <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                                {row.parsedData?.personnelId || row.parsedData?.unitCode || row.raw['کد پرسنلی'] || '—'}
                              </span>
                            </td>
                            <td className="p-3">
                              {row.parsedData ? (
                                <div className="flex items-center gap-2">
                                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[11px] font-bold">
                                    نمره: {row.parsedData.overallScore ?? row.parsedData.averagePerformanceScore}
                                  </span>
                                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
                                    اضافه‌کار: {row.parsedData.overtimeHours ?? row.parsedData.averageOvertimeHours}h
                                  </span>
                                </div>
                              ) : (
                                <span className="text-slate-400 text-[11px]">—</span>
                              )}
                            </td>
                            <td className="p-3">
                              {row.status === 'valid' && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3" /> معتبر
                                </span>
                              )}
                              {row.status === 'warning' && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                  <AlertTriangle className="w-3 h-3" /> هشدار
                                </span>
                              )}
                              {row.status === 'error' && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                  <XCircle className="w-3 h-3" /> خطا
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-[11px] text-slate-600">
                              {row.messages.join(' | ')}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {importSummary ? (
            <>
              <button
                onClick={clearImportSummary}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                انتخاب فایل دیگر
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsIngestionModalOpen(false)}
                  className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition"
                >
                  انصراف
                </button>
                <button
                  onClick={handleCommit}
                  disabled={importSummary.validCount === 0 && importSummary.warningCount === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-200 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>تایید و ذخیره‌سازی در سامانه ({importSummary.validCount + importSummary.warningCount} ردیف)</span>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={() => setIsIngestionModalOpen(false)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition"
              >
                بستن
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
