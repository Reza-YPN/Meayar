import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Candidate, 
  SelectionStage, 
  CandidateStatus, 
  CandidateRank, 
  TargetUnit, 
  INITIAL_CANDIDATES, 
  FARAJA_ACADEMIES 
} from '../data/recruitmentData';
import { RecruitmentFunnel } from '../components/recruitment/RecruitmentFunnel';
import { CandidateDetailModal } from '../components/recruitment/CandidateDetailModal';
import { RecruitmentAnalyticsView } from '../components/recruitment/RecruitmentAnalyticsView';
import { CommissionBoardView } from '../components/recruitment/CommissionBoardView';
import { SelectionCriteriaGuide } from '../components/recruitment/SelectionCriteriaGuide';
import { NewCandidateModal } from '../components/recruitment/NewCandidateModal';
import { 
  UserPlus, 
  Users, 
  Search, 
  Filter, 
  FileCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BarChart3, 
  Award, 
  BookOpen, 
  Building2, 
  HeartPulse, 
  Download,
  RotateCcw,
  Shield,
  Clock
} from 'lucide-react';

export function RecruitmentPage() {
  // Load persisted candidates
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('faraja_recruitment_candidates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing recruitment candidates', e);
      }
    }
    return INITIAL_CANDIDATES;
  });

  useEffect(() => {
    localStorage.setItem('faraja_recruitment_candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Active view tab: dossiers, analytics, commission, criteria
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'dossiers' | 'analytics' | 'commission' | 'criteria'>('dossiers');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'dossiers' || tabParam === 'analytics' || tabParam === 'commission' || tabParam === 'criteria') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<SelectionStage | 'all'>('all');
  const [selectedRank, setSelectedRank] = useState<CandidateRank | 'all'>('all');
  const [selectedUnit, setSelectedUnit] = useState<TargetUnit | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<CandidateStatus | 'all'>('all');

  // Modal states
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showNewCandidateModal, setShowNewCandidateModal] = useState(false);

  // Status update handler from detail modal
  const handleUpdateCandidateStatus = (
    candidateId: string,
    newStatus: CandidateStatus,
    newStage?: SelectionStage,
    assignedAcademy?: string,
    rejectionReason?: string,
    commissionNote?: string
  ) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          return {
            ...c,
            status: newStatus,
            currentStage: newStage || c.currentStage,
            assignedAcademy: assignedAcademy || c.assignedAcademy,
            rejectionReason: rejectionReason || c.rejectionReason,
            commissionVote: commissionNote ? {
              approvedBy: 'کمیسیون عالی گزینش و استخدام فراجا',
              voteDate: '۱۴۰۴/۱۰/۲۲',
              commissionNotes: commissionNote
            } : c.commissionVote
          };
        }
        return c;
      })
    );

    // Update opened modal state as well
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => prev ? {
        ...prev,
        status: newStatus,
        currentStage: newStage || prev.currentStage,
        assignedAcademy: assignedAcademy || prev.assignedAcademy,
        rejectionReason: rejectionReason || prev.rejectionReason,
        commissionVote: commissionNote ? {
          approvedBy: 'کمیسیون عالی گزینش و استخدام فراجا',
          voteDate: '۱۴۰۴/۱۰/۲۲',
          commissionNotes: commissionNote
        } : prev.commissionVote
      } : null);
    }
  };

  // Add new candidate handler
  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
  };

  // Batch commission approval
  const handleBatchApprove = (candidateIds: string[], targetAcademy: string) => {
    setCandidates(prev =>
      prev.map(c => {
        if (candidateIds.includes(c.id)) {
          return {
            ...c,
            status: 'تایید نهایی و آماده اعزام',
            currentStage: 'کمیسیون نهایی و اعزام',
            assignedAcademy: targetAcademy,
            commissionVote: {
              approvedBy: 'مصوبه هیئت عالی کمیسیون گزینش فراجا',
              voteDate: '۱۴۰۴/۱۰/۲۲',
              commissionNotes: `تصویب اعزام به ${targetAcademy} در جلسه رسمی کمیسیون`
            }
          };
        }
        return c;
      })
    );
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('آیا از بازنشانی اطلاعات به مقادیر پیش‌فرض اطمینان دارید؟')) {
      setCandidates(INITIAL_CANDIDATES);
      localStorage.removeItem('faraja_recruitment_candidates');
    }
  };

  // Export simple CSV / Print
  const handleExportData = () => {
    const header = ['کد داوطلبی', 'نام و نام خانوادگی', 'کدملی', 'مقطع', 'رده هدف', 'مرحله جاری', 'وضعیت', 'نمره کل', 'مرکز آموزش'];
    const rows = candidates.map(c => [
      c.trackingCode,
      c.fullName,
      c.nationalCode,
      c.rankTarget,
      c.targetUnit,
      c.currentStage,
      c.status,
      c.scores.overallScore,
      c.assignedAcademy || '-'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [header.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'faraja_recruitment_report_1404.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter candidates
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = 
      c.fullName.includes(searchQuery) || 
      c.nationalCode.includes(searchQuery) || 
      c.trackingCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = selectedFunnelStage === 'all' || c.currentStage === selectedFunnelStage;
    const matchesRank = selectedRank === 'all' || c.rankTarget === selectedRank;
    const matchesUnit = selectedUnit === 'all' || c.targetUnit === selectedUnit;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

    return matchesSearch && matchesStage && matchesRank && matchesUnit && matchesStatus;
  });

  // KPI Calculations
  const totalCount = 3480; // Full registered in cycle
  const activeSampleCount = candidates.length;
  const approvedCount = candidates.filter(c => c.status === 'تایید نهایی و آماده اعزام').length;
  const conditionalCount = candidates.filter(c => c.status === 'مشروط به معاینه مجدد').length;
  const rejectedCount = candidates.filter(c => c.status === 'رد صلاحیت شده').length;

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                مرکز گزینش و استخدام فراجا
              </span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black px-2.5 py-0.5 rounded-lg">
                دوره استخدامی سراسری زمستان ۱۴۰۴
              </span>
              <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-black px-2.5 py-0.5 rounded-lg font-mono">
                کد رهگیری ابلاغ ستاد کل: FR-REC-1404
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">
              سامانه هوشمند مدیریت فرآیندهای جذب، گزینش و ورود نیروی انسانی فراجا
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium max-w-4xl leading-relaxed">
              داشبورد تصمیم‌سازی مدیریت ارشد برای پایش خط سیر پرونده داوطلبان، نتایج معاینات بهداری، آزمون‌های آمادگی جسمانی، مصاحبه‌های عقیدتی-سیاسی، استعلامات حفاظتی و صدور امریه کمیسیون عالی.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              خروجی اکسل
            </button>
            <button
              onClick={() => setShowNewCandidateModal(true)}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              ثبت داوطلب جدید
            </button>
            <button
              onClick={handleResetData}
              title="بازنشانی داده‌ها"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dossiers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                activeTab === 'dossiers'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>کارتابل پرونده‌های گزینش ({filteredCandidates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>تحلیل داده‌محور و گزارش‌های آماری</span>
            </button>

            <button
              onClick={() => setActiveTab('commission')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                activeTab === 'commission'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span>کمیسیون نهایی و صدور امریه اعزام</span>
            </button>

            <button
              onClick={() => setActiveTab('criteria')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                activeTab === 'criteria'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>معیارها و ضوابط استخدامی فراجا</span>
            </button>
          </div>

          <div className="text-[11px] font-bold text-slate-500">
            مرحله پایش: <strong className="text-indigo-800">بررسی پرونده‌های اعزام بهمن‌ماه</strong>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">کل ثبت‌نامی‌ها</span>
            <span className="text-xl font-black text-slate-900 font-mono">{totalCount.toLocaleString('fa-IR')}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">پرونده‌های نمونه فعال</span>
            <span className="text-xl font-black text-indigo-700 font-mono">{activeSampleCount} نفر</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">تأیید نهایی کمیسیون</span>
            <span className="text-xl font-black text-emerald-600 font-mono">{approvedCount} نفر</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">مشروط / بهداری مجدد</span>
            <span className="text-xl font-black text-amber-600 font-mono">{conditionalCount} نفر</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block">رد صلاحیت شده</span>
            <span className="text-xl font-black text-rose-600 font-mono">{rejectedCount} نفر</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recruitment Funnel Visualizer (interactive filter) */}
      <RecruitmentFunnel
        selectedStage={selectedFunnelStage}
        onSelectStage={setSelectedFunnelStage}
      />

      {/* TAB CONTENT 1: Dossiers Management Desk */}
      {activeTab === 'dossiers' && (
        <div className="space-y-4">
          {/* Multi-Filter Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی داوطلب با نام، کدملی یا شماره پرونده گزینش..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-4 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Rank Filter */}
              <select
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
              >
                <option value="all">همه مقاطع تحصیلی/رتبه‌ای</option>
                <option value="درجه‌داری پیمانی">درجه‌داری پیمانی</option>
                <option value="دانشجوی دانشگاه امین">دانشجوی دانشگاه امین</option>
                <option value="افسری دانش‌آموخته">افسری دانش‌آموخته</option>
                <option value="بانوان (دانشکده کوثر)">بانوان (کوثر)</option>
              </select>

              {/* Target Unit Filter */}
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
              >
                <option value="all">همه رده‌های انتظامی</option>
                <option value="فرماندهی مرزبانی">مرزبانی</option>
                <option value="پلیس پیشگیری (کلانتری و پاسگاه‌ها)">پلیس پیشگیری</option>
                <option value="یگان ویژه">یگان ویژه</option>
                <option value="پلیس آگاهی">پلیس آگاهی</option>
                <option value="پلیس راهور">راهور</option>
                <option value="پلیس فتا">پلیس فتا</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="در حال بررسی">در حال بررسی</option>
                <option value="مشروط به معاینه مجدد">مشروط به معاینه</option>
                <option value="تایید نهایی و آماده اعزام">تایید نهایی کمیسیون</option>
                <option value="رد صلاحیت شده">رد صلاحیت شده</option>
              </select>
            </div>
          </div>

          {/* Dossiers Data Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-black border-b border-slate-200">
                    <th className="p-4">شماره پرونده / داوطلب</th>
                    <th className="p-4">مقطع / رده هدف</th>
                    <th className="p-4">مشخصات فیزیکی (BMI)</th>
                    <th className="p-4">مرحله جاری ارزیابی</th>
                    <th className="p-4 text-center">نمره کل شایستگی</th>
                    <th className="p-4">سهمیه‌ها</th>
                    <th className="p-4 text-center">وضعیت پرونده</th>
                    <th className="p-4 text-center">اقدام مدیریتی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        پرونده‌ای مطابق با فیلترهای انتخابی یافت نشد.
                      </td>
                    </tr>
                  ) : (
                    filteredCandidates.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-600 text-xs shrink-0">
                              {c.fullName.slice(0, 2)}
                            </div>
                            <div>
                              <span className="font-black text-slate-900 block">{c.fullName}</span>
                              <span className="text-[11px] text-slate-400 font-mono">{c.trackingCode} | {c.nationalCode}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="font-black text-slate-800 block">{c.rankTarget}</span>
                          <span className="text-[11px] text-indigo-700 font-bold">{c.targetUnit}</span>
                        </td>

                        <td className="p-4">
                          <span className="block font-mono text-[11px]">قد: {c.height} | وزن: {c.weight}</span>
                          <span className="text-[10px] text-slate-400 font-bold font-mono">BMI: {c.bmi}</span>
                        </td>

                        <td className="p-4">
                          <span className="bg-slate-100 text-slate-800 font-bold text-[11px] px-2.5 py-1 rounded-lg inline-block border border-slate-200">
                            {c.currentStage}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <span className="text-sm font-black font-mono text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {c.scores.overallScore}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-1 max-w-[170px]">
                            {c.quotas.map((q, idx) => (
                              <span key={idx} className="bg-amber-50 text-amber-800 border border-amber-200/80 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                {q}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-black inline-block ${
                            c.status === 'تایید نهایی و آماده اعزام'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.status === 'رد صلاحیت شده'
                              ? 'bg-rose-100 text-rose-800'
                              : c.status === 'مشروط به معاینه مجدد'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {c.status}
                          </span>
                          {c.assignedAcademy && (
                            <span className="text-[10px] text-slate-500 font-medium block mt-1 line-clamp-1">
                              {c.assignedAcademy}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedCandidate(c)}
                            className="px-3.5 py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-[11px] font-black transition cursor-pointer shadow-2xs"
                          >
                            بررسی پرونده
                          </button>
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

      {/* TAB CONTENT 2: Analytics & Reports */}
      {activeTab === 'analytics' && (
        <RecruitmentAnalyticsView candidates={candidates} />
      )}

      {/* TAB CONTENT 3: Commission Board */}
      {activeTab === 'commission' && (
        <CommissionBoardView 
          candidates={candidates}
          onApproveBatch={handleBatchApprove}
          onOpenCandidateModal={c => setSelectedCandidate(c)}
        />
      )}

      {/* TAB CONTENT 4: Faraja Selection Criteria Guide */}
      {activeTab === 'criteria' && (
        <SelectionCriteriaGuide />
      )}

      {/* Candidate Detail Inspection Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdateStatus={handleUpdateCandidateStatus}
        />
      )}

      {/* New Candidate Registration Modal */}
      {showNewCandidateModal && (
        <NewCandidateModal
          onClose={() => setShowNewCandidateModal(false)}
          onAddCandidate={handleAddCandidate}
        />
      )}

    </div>
  );
}
export default RecruitmentPage;
