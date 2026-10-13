import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Layers, 
  Filter, 
  Eye, 
  Award, 
  CheckCircle2, 
  HelpCircle,
  FileSpreadsheet,
  Zap,
  Info
} from 'lucide-react';
import { 
  competencyService, 
  Job, 
  Duty, 
  Competency, 
  CompetencyLevel, 
  CompetencyImpact 
} from '../../services/competencyService';
import { exportCompetencyMatrixToExcel, printCompetencyReport, getPersianImpact, getPersianLevel } from '../../utils/exportUtils';

export function CompetencyMatrixTab({ readOnly = false }: { readOnly?: boolean }) {
  const jobs = competencyService.getJobs();
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [selectedCompetency, setSelectedCompetency] = useState<Competency | null>(null);

  const selectedJob = jobs.find(j => j.id === selectedJobId);
  const duties = competencyService.getDutiesByJob(selectedJobId);
  const competencies = competencyService.getCompetenciesByJob(selectedJobId);
  const employees = competencyService.getEmployees();
  const evaluations = competencyService.getAllEvaluations();

  // Grid Dimensions: 4 Levels x 5 Impacts
  const functionalLevels: { key: CompetencyLevel; label: string; desc: string }[] = [
    { key: 'individual', label: 'سطح فردی', desc: 'دانش، مهارت و انگیزش فردی' },
    { key: 'team', label: 'سطح گروهی', desc: 'تعاملات، هماهنگی و هم‌افزایی تیمی' },
    { key: 'organizational', label: 'سطح سازمانی', desc: 'سیستم‌ها، قوانین و فرآیندها' },
    { key: 'social', label: 'سطح اجتماعی', desc: 'خدمت به جامعه و تکریم ارباب‌رجوع' },
  ];

  const impactLevels: { key: CompetencyImpact; label: string; desc: string; color: string }[] = [
    { key: 'input', label: '۱. درون‌داد (Input)', desc: 'منابع، آمادگی، دانش پایه', color: 'border-sky-200 bg-sky-50/40 text-sky-900' },
    { key: 'process', label: '۲. فرآیند (Process)', desc: 'روش‌ها، هوشیاری و اجرا', color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
    { key: 'product', label: '۳. محصول (Product)', desc: 'مستندات، گزارش و کشف', color: 'border-purple-200 bg-purple-50/40 text-purple-900' },
    { key: 'output', label: '۴. برون‌داد (Output)', desc: 'دستاورد، مهار و واکنش سریع', color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900' },
    { key: 'outcome', label: '۵. پیامد و اثر (Outcome)', desc: 'امنیت پایدار و رضایت عمومی', color: 'border-rose-200 bg-rose-50/40 text-rose-900' },
  ];

  const handleExportExcel = () => {
    exportCompetencyMatrixToExcel({
      jobs,
      duties: competencyService.getAllDuties(),
      competencies,
      employees,
      evaluations,
      selectedJobTitle: selectedJob?.title
    });
  };

  const handlePrint = () => {
    const tableRows = competencies.map((c, i) => `
      <tr>
        <td style="text-align: center;">${i + 1}</td>
        <td><strong>${c.title}</strong></td>
        <td>${getPersianLevel(c.level)}</td>
        <td>${getPersianImpact(c.impact)}</td>
        <td style="text-align: center;">سطح ${c.proficiencyLevel} از ۵</td>
        <td style="text-align: center;"><strong>${c.expectedScore}٪</strong></td>
        <td><small>${c.evaluationCriteria || '-'}</small></td>
      </tr>
    `).join('');

    const html = `
      <div class="person-badge-box">
        <div><span>عنوان شغل سازمانی:</span> <strong>${selectedJob?.title || 'کلیه مشاغل'}</strong></div>
        <div><span>کد ردیف شغلی:</span> <strong>${(selectedJob as any)?.code || (selectedJob as any)?.jobCode || selectedJob?.id || '-'}</strong></div>
        <div><span>رده سازمانی:</span> <strong>${selectedJob?.category || 'عملیاتی و صیانتی'}</strong></div>
        <div><span>تعداد کل شایستگی‌ها:</span> <strong>${competencies.length} مورد</strong></div>
      </div>

      <h4 style="margin: 12px 0 6px; font-weight: bold; color: #0f172a;">ماتریس رسمی شایستگی‌های شغل سازمانی</h4>
      <table>
        <thead>
          <tr>
            <th style="width: 6%;">ردیف</th>
            <th style="width: 28%;">عنوان شایستگی</th>
            <th style="width: 14%;">سطح کارکرد</th>
            <th style="width: 16%;">سطح اثرگذاری</th>
            <th style="width: 10%;">سطح تسلط</th>
            <th style="width: 10%;">نمره هدف</th>
            <th style="width: 16%;">معیار سنجش و KPI</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
    printCompetencyReport(`ماتریس_شایستگی_${selectedJob?.title}`, html);
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header & Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-black text-slate-800">
              ماتریس جامع تطابق شایستگی‌ها و سطوح اثرگذاری (۵×۴)
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              تطبیق شایستگی‌های استخراج‌شده در ۵ سطح اثرگذاری و ۴ لایه کارکرد سازمانی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedJobId}
            onChange={e => setSelectedJobId(e.target.value)}
            className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2 text-xs font-black text-slate-800 focus:outline-none focus:border-indigo-400"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>

          <button
            onClick={handleExportExcel}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-black px-3.5 py-2 rounded-2xl flex items-center gap-1.5 transition shadow-xs"
            title="دانلود فایل اکسل ماتریس"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            دانلود اکسل (.xlsx)
          </button>

          <button
            onClick={handlePrint}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 text-xs font-black px-3.5 py-2 rounded-2xl flex items-center gap-1.5 transition"
            title="چاپ و نسخه PDF"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            چاپ / PDF
          </button>
        </div>
      </div>

      {/* 5x4 Matrix Grid Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            {/* Header Columns: 5 Impact Levels */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="p-4 text-right text-xs font-black text-slate-700 w-44 border-l border-slate-200">
                  سطح کارکرد / سطح اثرگذاری
                </th>
                {impactLevels.map(impact => (
                  <th key={impact.key} className="p-3 text-right text-xs font-black border-l border-slate-200 last:border-l-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>{impact.label}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 block mt-0.5">{impact.desc}</span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Matrix Rows: 4 Functional Levels */}
            <tbody className="divide-y divide-slate-200">
              {functionalLevels.map(funcLevel => (
                <tr key={funcLevel.key} className="hover:bg-slate-50/40 transition-colors">
                  {/* Row Header */}
                  <td className="p-4 border-l border-slate-200 bg-slate-50/50 align-top">
                    <span className="text-xs font-black text-indigo-950 block">{funcLevel.label}</span>
                    <span className="text-[10px] font-medium text-slate-500 block mt-1 leading-relaxed">
                      {funcLevel.desc}
                    </span>
                  </td>

                  {/* 5 Columns for each row */}
                  {impactLevels.map(impact => {
                    const matchedComps = competencies.filter(
                      c => c.level === funcLevel.key && c.impact === impact.key
                    );

                    return (
                      <td 
                        key={impact.key} 
                        className={`p-2.5 border-l border-slate-200 last:border-l-0 align-top min-h-[110px] ${
                          matchedComps.length > 0 ? '' : 'bg-slate-50/20'
                        }`}
                      >
                        {matchedComps.length === 0 ? (
                          <div className="h-full min-h-[80px] flex items-center justify-center text-slate-300 text-[11px] font-bold border border-dashed border-slate-100 rounded-2xl">
                            -
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {matchedComps.map(comp => (
                              <div
                                key={comp.id}
                                onClick={() => setSelectedCompetency(comp)}
                                className="bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-2.5 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <h5 className="font-extrabold text-[11px] text-slate-800 group-hover:text-indigo-700 leading-snug line-clamp-2">
                                    {comp.title}
                                  </h5>
                                </div>
                                <div className="flex items-center justify-between text-[9px] font-bold pt-1 border-t border-slate-100">
                                  <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                                    سطح {comp.proficiencyLevel}/۵
                                  </span>
                                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    هدف: {comp.expectedScore}٪
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal when clicking any Competency */}
      {selectedCompetency && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200" dir="rtl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-black text-slate-800 text-sm md:text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                شناسنامه و جزئیات شایستگی
              </h3>
              <button onClick={() => setSelectedCompetency(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 block">عنوان شایستگی:</span>
                <h4 className="text-sm font-black text-indigo-900 mt-1">{selectedCompetency.title}</h4>
                {selectedCompetency.description && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {selectedCompetency.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">سطح کارکرد:</span>
                  <span className="font-bold text-slate-800">
                    {selectedCompetency.level === 'individual' ? 'فردی' : selectedCompetency.level === 'team' ? 'گروهی' : selectedCompetency.level === 'organizational' ? 'سازمانی' : 'اجتماعی'}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">سطح اثرگذاری:</span>
                  <span className="font-bold text-slate-800">
                    {selectedCompetency.impact === 'input' ? 'درون‌داد' : selectedCompetency.impact === 'process' ? 'فرآیند' : selectedCompetency.impact === 'product' ? 'محصول' : selectedCompetency.impact === 'output' ? 'برون‌داد' : 'پیامد و اثر'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">سطح تسلط مورد انتظار:</span>
                  <span className="font-bold text-indigo-700">{selectedCompetency.proficiencyLevel} از ۵</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">نمره هدف استانداردی:</span>
                  <span className="font-bold text-emerald-700">{selectedCompetency.expectedScore} از ۱۰۰</span>
                </div>
              </div>

              {selectedCompetency.evaluationCriteria && (
                <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 text-xs">
                  <span className="text-[10px] font-black text-emerald-800 block mb-1">معیار ارزیابی و شاخص عملکرد (KPI):</span>
                  <p className="text-emerald-950 font-bold leading-relaxed">{selectedCompetency.evaluationCriteria}</p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedCompetency(null)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-black px-5 py-2.5 rounded-2xl transition"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
