import React, { useState } from 'react';
import { 
  Candidate, 
  FARAJA_ACADEMIES, 
  CandidateStatus, 
  SelectionStage 
} from '../../data/recruitmentData';
import { 
  Award, 
  CheckCircle2, 
  Building2, 
  Printer, 
  FileCheck, 
  AlertCircle, 
  Send,
  Stamp,
  Users,
  Calendar,
  Check
} from 'lucide-react';

interface CommissionBoardViewProps {
  candidates: Candidate[];
  onApproveBatch: (candidateIds: string[], targetAcademy: string) => void;
  onOpenCandidateModal: (candidate: Candidate) => void;
}

export function CommissionBoardView({ 
  candidates, 
  onApproveBatch, 
  onOpenCandidateModal 
}: CommissionBoardViewProps) {
  // Candidates in or near commission stage
  const eligibleCandidates = candidates.filter(
    c => c.currentStage === 'کمیسیون نهایی و اعزام' || c.status === 'تایید نهایی و آماده اعزام'
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [targetAcademy, setTargetAcademy] = useState(FARAJA_ACADEMIES[0].name);
  const [showMinutesModal, setShowMinutesModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === eligibleCandidates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(eligibleCandidates.map(c => c.id));
    }
  };

  const handleBatchApprove = () => {
    if (selectedIds.length === 0) {
      alert('لطفاً حداقل یک داوطلب را انتخاب فرمایید.');
      return;
    }
    onApproveBatch(selectedIds, targetAcademy);
    setSuccessToast(`امریه اعزام برای ${selectedIds.length} داوطلب به ${targetAcademy} با موفقیت صادر گردید.`);
    setSelectedIds([]);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Commission Board Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-800 rounded-lg">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="text-base font-black text-slate-900">
              هیئت عالی کمیسیون گزینش و استخدام فرماندهی کل انتظامی (فراجا)
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            بررسی نهایی، تصویب سهمیه‌های استانی، صدور امریه آموزشی و تخصیص داوطلبان واجد شرایط به پادگان‌ها و دانشگاه پلیس
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowMinutesModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            مشاهده صورتجلسه رسمی کمیسیون
          </button>
        </div>
      </div>

      {successToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-2.5 text-xs font-black animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Academy Capacity Status Cards */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-slate-700">ظرفیت پذیرش مراکز آموزشی فراجا (دوره جدید):</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {FARAJA_ACADEMIES.map(acad => {
            const freeCapacity = acad.capacity - acad.currentTrainees;
            const fillPercentage = Math.round((acad.currentTrainees / acad.capacity) * 100);

            return (
              <div key={acad.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 line-clamp-1">{acad.name}</span>
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-500 font-medium">{acad.type}</div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">ظرفیت خالی:</span>
                  <span className="font-black text-emerald-700 font-mono">{freeCapacity.toLocaleString('fa-IR')} نفر</span>
                </div>
                {/* Micro progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${fillPercentage > 85 ? 'bg-amber-500' : 'bg-indigo-600'}`} 
                    style={{ width: `${fillPercentage}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Batch Actions Toolbar */}
      <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={selectAll}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            {selectedIds.length === eligibleCandidates.length ? 'لغو انتخاب همه' : 'انتخاب همه داوطلبان آماده'}
          </button>
          <span className="text-xs font-bold text-indigo-900">
            {selectedIds.length} داوطلب انتخاب شده است
          </span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-black text-slate-700 shrink-0">تخصیص به مرکز:</span>
            <select
              value={targetAcademy}
              onChange={(e) => setTargetAcademy(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
            >
              {FARAJA_ACADEMIES.map(acad => (
                <option key={acad.id} value={acad.name}>{acad.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleBatchApprove}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            صدور گروهی امریه اعزام
          </button>
        </div>
      </div>

      {/* Table of Candidates ready for Commission approval */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-black text-slate-800">
            فهرست داوطلبان واجد شرایط رأی کمیسیون نهایی ({eligibleCandidates.length} نفر)
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            ترتیب بر اساس بالاترین امتیاز شایستگی کل
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 font-black border-b border-slate-200">
                <th className="p-3.5 w-12 text-center">انتخاب</th>
                <th className="p-3.5">داوطلب / کدملی</th>
                <th className="p-3.5">مقطع و رده هدف</th>
                <th className="p-3.5 text-center">نمره کل شایستگی</th>
                <th className="p-3.5">امتیازات و سهمیه</th>
                <th className="p-3.5">مرکز آموزش تخصیصی</th>
                <th className="p-3.5 text-center">وضعیت رأی</th>
                <th className="p-3.5 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {eligibleCandidates.map((c) => {
                const isChecked = selectedIds.includes(c.id);

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(c.id)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-3.5">
                      <span className="font-black text-slate-900 block">{c.fullName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{c.nationalCode}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-black text-slate-800 block">{c.rankTarget}</span>
                      <span className="text-[11px] text-slate-500">{c.targetUnit}</span>
                    </td>
                    <td className="p-3.5 text-center font-mono font-black text-sm text-indigo-900">
                      {c.scores.overallScore}
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {c.quotas.map((q, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">
                            {q}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {c.assignedAcademy ? (
                        <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] inline-block">
                          {c.assignedAcademy}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">در انتظار تخصیص</span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                        c.status === 'تایید نهایی و آماده اعزام'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => onOpenCandidateModal(c)}
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-lg text-[11px] font-black transition cursor-pointer"
                      >
                        بررسی و صدور رأی
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Commission Minutes Modal */}
      {showMinutesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" dir="rtl">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Stamp className="w-5 h-5 text-indigo-700" />
                <h4 className="text-base font-black text-slate-900">
                  صورتجلسه رسمی کمیسیون عالی گزینش و استخدام فراجا
                </h4>
              </div>
              <button
                onClick={() => setShowMinutesModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-3 border border-slate-200 text-slate-800 leading-relaxed font-medium">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-200 pb-2">
                <span>شماره صورتجلسه: فراجا/گز/۱۴۰۴-۵۸</span>
                <span>تاریخ تشکیل جلسه: دی ماه ۱۴۰۴</span>
                <span>محل تشکیل: ستاد کل فراجا</span>
              </div>

              <p>
                به استناد مواد ۱۶ و ۱۷ قانون استخدام فرماندهی انتظامی جمهوری اسلامی ایران و با امعان نظر به نتایج ارزیابی‌های هفت‌گانه بهداری، آمادگی جسمانی، عقیدتی و حراستی، جلسه کمیسیون با حضور اعضای تام‌الاختیار تشکیل و پس از مداقه در پرونده‌های داوطلبان، مراتب ذیل مورد تصویب قرار گرفت:
              </p>

              <ul className="list-disc list-inside space-y-1 pr-2 text-slate-700">
                <li>تأیید قطعی صلاحیت عمومی و تخصصی داوطلبان دارای نمره شایستگی بالای ۸۰.</li>
                <li>تخصیص پذیرفته‌شدگان درجه‌داری به مراکز آموزش مالک اشتر اراک و شهید رجایی کرج جهت طی دوره رزم مقدماتی.</li>
                <li>اعزام داوطلبان مقطع افسری به دانشگاه علوم انتظامی امین و دانشکده بانوان کوثر.</li>
                <li>اعمال ۱۰۰٪ سهمیه‌های قانونی ایثارگران و فرزندان شهدای والامقام فراجا.</li>
              </ul>

              <div className="pt-4 mt-4 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-[10px] font-black text-slate-600">
                <div className="border border-slate-200 p-2 rounded-xl bg-white">
                  <span>سردار رئیس مرکز گزینش</span>
                  <div className="mt-4 text-indigo-800">امضا و مهر دیجیتال</div>
                </div>
                <div className="border border-slate-200 p-2 rounded-xl bg-white">
                  <span>سرهنگ نماینده عقیدتی سیاسی</span>
                  <div className="mt-4 text-indigo-800">امضا و تایید ولایی</div>
                </div>
                <div className="border border-slate-200 p-2 rounded-xl bg-white">
                  <span>امیر نماینده حفاظت اطلاعات</span>
                  <div className="mt-4 text-indigo-800">تایید حراستی نهایی</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                چاپ نسخه کاغذی مصوبه
              </button>

              <button
                onClick={() => setShowMinutesModal(false)}
                className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-black transition cursor-pointer"
              >
                بستن و تأیید صورتجلسه
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
