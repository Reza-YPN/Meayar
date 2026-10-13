import React, { useState } from 'react';
import { 
  Candidate, 
  CandidateStatus, 
  SelectionStage, 
  FARAJA_ACADEMIES 
} from '../../data/recruitmentData';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HeartPulse, 
  Activity, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Award, 
  Building2, 
  Calendar, 
  Phone, 
  MapPin,
  GraduationCap,
  Send,
  Printer
} from 'lucide-react';

interface CandidateDetailModalProps {
  candidate: Candidate;
  onClose: () => void;
  onUpdateStatus: (
    candidateId: string, 
    newStatus: CandidateStatus, 
    newStage?: SelectionStage,
    assignedAcademy?: string,
    rejectionReason?: string,
    commissionNote?: string
  ) => void;
}

export function CandidateDetailModal({ candidate, onClose, onUpdateStatus }: CandidateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'medical' | 'sports' | 'interview' | 'security' | 'commission'>('profile');
  
  // Commission decision form state
  const [selectedAcademy, setSelectedAcademy] = useState(candidate.assignedAcademy || FARAJA_ACADEMIES[0].name);
  const [decisionNotes, setDecisionNotes] = useState(candidate.commissionVote?.commissionNotes || '');
  const [rejectionInput, setRejectionInput] = useState(candidate.rejectionReason || '');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const handleApproveFinal = () => {
    onUpdateStatus(
      candidate.id,
      'تایید نهایی و آماده اعزام',
      'کمیسیون نهایی و اعزام',
      selectedAcademy,
      undefined,
      decisionNotes || `تأیید نهایی توسط کمیسیون جذب و گزینش فراجا؛ اعزام به ${selectedAcademy}`
    );
    setActionSuccessMessage(`داوطلب با موفقیت تأیید قطعی گردید و به ${selectedAcademy} تخصیص یافت.`);
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const handleConditional = () => {
    onUpdateStatus(
      candidate.id,
      'مشروط به معاینه مجدد',
      'معاینات پزشکی بهداری',
      undefined,
      'مشروط به ارائه گواهی تکمیلی بهداری فراجا',
      decisionNotes || 'ارجاع به کمیسیون پزشکی جهت معاینه تشخیصی مجدد'
    );
    setActionSuccessMessage('پرونده جهت بررسی تکمیلی به بهداری ارجاع شد.');
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const handleReject = () => {
    if (!rejectionInput.trim()) {
      alert('لطفاً دلیل مستند رد صلاحیت را درج فرمایید.');
      return;
    }
    onUpdateStatus(
      candidate.id,
      'رد صلاحیت شده',
      candidate.currentStage,
      undefined,
      rejectionInput,
      decisionNotes || `رد صلاحیت در مرحله ${candidate.currentStage}: ${rejectionInput}`
    );
    setActionSuccessMessage('وضعیت پرونده به رد صلاحیت تغییر یافت.');
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-black">{candidate.fullName}</span>
                <span className="text-xs bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md font-mono text-slate-300">
                  {candidate.trackingCode}
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                  candidate.status === 'تایید نهایی و آماده اعزام'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : candidate.status === 'رد صلاحیت شده'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : candidate.status === 'مشروط به معاینه مجدد'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {candidate.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                مقطع: <strong className="text-slate-200">{candidate.rankTarget}</strong> | رده هدف: <strong className="text-slate-200">{candidate.targetUnit}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDossier}
              title="چاپ پرونده گزینش"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs font-black">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap cursor-pointer ${
              activeTab === 'profile' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            مشخصات فردی و سهمیه‌ها
          </button>
          <button
            onClick={() => setActiveTab('medical')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'medical' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
            معاینات بهداری فراجا
          </button>
          <button
            onClick={() => setActiveTab('sports')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sports' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            تست آمادگی جسمانی
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'interview' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            مصاحبه و روان‌سنجی
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'security' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            حفاظت و تحقیقات محلی
          </button>
          <button
            onClick={() => setActiveTab('commission')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'commission' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            تصمیم‌گیری کمیسیون نهایی
          </button>
        </div>

        {/* Modal Body with Scrolling */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {actionSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2 text-xs font-black text-emerald-800 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
          )}

          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 font-bold block">کد ملی</span>
                  <span className="text-sm font-black font-mono text-slate-900">{candidate.nationalCode}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 font-bold block">نام پدر / سن</span>
                  <span className="text-sm font-black text-slate-900">{candidate.fatherName} / {candidate.age} سال</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 font-bold block">مدرک تحصیلی / معدل</span>
                  <span className="text-sm font-black text-slate-900">{candidate.education} (معدل: {candidate.gpa})</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 font-bold block">استان و شهرستان بومی</span>
                  <span className="text-sm font-black text-slate-900">{candidate.province} - {candidate.city}</span>
                </div>
              </div>

              {/* Physical specs (BMI) */}
              <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                    BMI
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">شاخص توده بدنی (ضابطه فراجا: ۱۸.۵ تا ۲۸)</span>
                    <span className="text-sm font-black text-indigo-950">
                      قد: {candidate.height} سانتی‌متر | وزن: {candidate.weight} کیلوگرم | BMI: <strong className="font-mono text-indigo-700">{candidate.bmi}</strong>
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-lg">
                  محدوده استاندارد فراجا
                </span>
              </div>

              {/* Quotas */}
              <div>
                <h4 className="text-xs font-black text-slate-900 mb-2">سهمیه‌ها و امتیازات ویژه استخدامی:</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.quotas.map((q, idx) => (
                    <span key={idx} className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scores summary bar */}
              <div>
                <h4 className="text-xs font-black text-slate-900 mb-3">کارنامه نمرات ارزیابی داوطلب:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold block">آزمون علمی ورودی</span>
                    <span className="text-base font-black text-slate-900 font-mono">{candidate.scores.scientificExam ?? '-'}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold block">آمادگی جسمانی</span>
                    <span className="text-base font-black text-emerald-700 font-mono">{candidate.scores.sportsExam ?? '-'}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold block">مصاحبه عقیدتی</span>
                    <span className="text-base font-black text-indigo-700 font-mono">{candidate.scores.interviewScore ?? '-'}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-bold block">روان‌سنجی (MMPI)</span>
                    <span className="text-base font-black text-blue-700 font-mono">{candidate.scores.psychologicalScore ?? '-'}</span>
                  </div>
                  <div className="bg-indigo-900 text-white p-3 rounded-2xl shadow-xs">
                    <span className="text-[10px] text-indigo-200 font-bold block">نمره کل شایستگی</span>
                    <span className="text-base font-black font-mono">{candidate.scores.overallScore}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Medical */}
          {activeTab === 'medical' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <HeartPulse className="w-6 h-6 text-rose-600" />
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">وضعیت کلی بهداری کل فراجا</span>
                    <span className="text-sm font-black text-slate-900">{candidate.medicalReport.generalStatus}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-black">
                  <span>بینایی: <strong className="text-slate-800">{candidate.medicalReport.vision}</strong></span>
                  <span className="text-slate-300">|</span>
                  <span>تست دید رنگ: <strong className={candidate.medicalReport.colorBlindness === 'سالم' ? 'text-emerald-700' : 'text-rose-700'}>
                    {candidate.medicalReport.colorBlindness}
                  </strong></span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 p-3 text-xs font-black text-slate-700 border-b border-slate-200">
                  چک‌لیست متخصصین کمیسیون بهداری و سلامت جسمانی
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {candidate.medicalReport.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-black text-slate-900 block">{item.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">پزشک معاینه‌کننده: {item.doctor}</span>
                        {item.details && (
                          <p className="text-[11px] text-slate-600 mt-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200/60">
                            ملاحظات تخصصی: {item.details}
                          </p>
                        )}
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg font-black shrink-0 ${
                        item.status === 'تایید' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'مشروط'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Sports */}
          {activeTab === 'sports' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">مجموع امتیاز آمادگی جسمانی</span>
                    <span className="text-sm font-black text-emerald-950 font-mono">{candidate.scores.sportsExam} از ۱۰۰</span>
                  </div>
                </div>
                <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl">
                  حد نصاب ورزشی احراز گردید
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {candidate.sportsReport.map((sport, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-800 block">{sport.testName}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5 block">رکورد ثبت‌شده: {sport.record}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-black text-indigo-700 font-mono block">{sport.score} نمره</span>
                      <span className="text-[10px] text-emerald-700 font-bold">{sport.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Interview */}
          {activeTab === 'interview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-indigo-50/50 border border-indigo-200 p-4 rounded-2xl">
                  <span className="text-xs text-slate-500 font-bold block">نمره مصاحبه عقیدتی-سیاسی</span>
                  <span className="text-lg font-black text-indigo-900 font-mono">{candidate.interviewReport.ideologicalScore} از ۱۰۰</span>
                </div>
                <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-2xl">
                  <span className="text-xs text-slate-500 font-bold block">تناسب روان‌سنجی و تاب‌آوری</span>
                  <span className="text-lg font-black text-blue-900">{candidate.interviewReport.psychologicalFitness}</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-black text-slate-800 block">مشروح نظر تیم ارزیابی روانشناسی و گزینش:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {candidate.interviewReport.evaluatorNotes}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">وضعیت استعلام حراست و حفاظت اطلاعات</span>
                    <span className="text-sm font-black text-slate-900">{candidate.securityClearance.status}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">تاریخ استعلام: {candidate.securityClearance.inquiryDate}</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                <span className="text-xs font-black text-slate-800 block mb-1">نتیجه تحقیقات میدانی و محلی:</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md inline-block">
                  {candidate.securityClearance.localInvestigation}
                </span>
                <p className="text-xs text-slate-500 mt-2">
                  تحقیقات پیرامون حسن شهرت داوطلب، عدم سوء پیشینه کیفری موثر و تایید سلامت اخلاقی در محل سکونت و تحصیل اخذ و ضمیمه پرونده گردید.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: Commission */}
          {activeTab === 'commission' && (
            <div className="space-y-5">
              <div className="bg-indigo-900 text-white p-5 rounded-2xl space-y-2">
                <h4 className="text-sm font-black flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  میز تصمیم‌گیری کمیسیون عالی گزینش و استخدام فراجا
                </h4>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  مدیر گرامی، بر اساس جمیع نمرات علمی، بهداری، آمادگی جسمانی، استعلامات و سهمیه‌های قانونی، رأی نهایی را جهت صدور امریه ثبت فرمایید.
                </p>
              </div>

              {/* Assignment selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  انتخاب مرکز آموزشی جهت صدور امریه اعزام:
                </label>
                <select
                  value={selectedAcademy}
                  onChange={(e) => setSelectedAcademy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  {FARAJA_ACADEMIES.map((acad) => (
                    <option key={acad.id} value={acad.name}>
                      {acad.name} ({acad.type} - ظرفیت باقیمانده: {(acad.capacity - acad.currentTrainees).toLocaleString('fa-IR')} نفر)
                    </option>
                  ))}
                </select>
              </div>

              {/* Commission note */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  ملاحظات و متن رأی کمیسیون جذب:
                </label>
                <textarea
                  rows={3}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="ثبت مصوبه کمیسیون یا دستورات تکمیلی دوره آموزشی..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Rejection reason if needed */}
              <div className="space-y-2">
                <label className="text-xs font-black text-rose-800 block">
                  در صورت رد صلاحیت، دلیل مستند را مرقوم فرمایید:
                </label>
                <input
                  type="text"
                  value={rejectionInput}
                  onChange={(e) => setRejectionInput(e.target.value)}
                  placeholder="مثال: عدم انطباق دید چشم با استانداردهای رده، عدم احراز تست ورزشی..."
                  className="w-full bg-slate-50 border border-rose-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  رد صلاحیت و بایگانی پرونده
                </button>
                <button
                  onClick={handleConditional}
                  className="px-4 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4" />
                  ارجاع جهت معاینه / آزمون مجدد
                </button>
                <button
                  onClick={handleApproveFinal}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  تأیید نهایی کمیسیون و صدور امریه اعزام
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>سامانه جامع جذب و گزینش فراجا - پرونده الکترونیک گزینش</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-black hover:bg-slate-100 transition cursor-pointer"
          >
            بستن پرونده
          </button>
        </div>
      </div>
    </div>
  );
}
