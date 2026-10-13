import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  Filter, 
  Award, 
  AlertTriangle, 
  GraduationCap, 
  CheckCircle2, 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Users, 
  Sparkles, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Layers, 
  Trash2, 
  Clock, 
  Calendar, 
  Shield, 
  Info,
  Sliders
} from 'lucide-react';
import { 
  competencyService, 
  Job, 
  Employee, 
  Competency, 
  CompetencyEvaluation, 
  ManagerAction, 
  ManagerActionType 
} from '../services/competencyService';
import { ManagerActionModal } from '../components/competency/ManagerActionModal';
import { exportCompetencyMatrixToExcel } from '../utils/exportUtils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function ManagerMatrixPage() {
  const [activeView, setActiveView] = useState<'employees_matrix' | 'jobs_matrix' | 'actions_history'>('employees_matrix');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [evaluations, setEvaluations] = useState<CompetencyEvaluation[]>([]);
  const [managerActions, setManagerActions] = useState<ManagerAction[]>([]);
  
  // Filters
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'high' | 'gap'>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState<ManagerActionType>('reward');
  const [modalEmployeeId, setModalEmployeeId] = useState<string>('');
  const [modalCompetencyId, setModalCompetencyId] = useState<string>('');
  
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const printTableRef = useRef<HTMLDivElement>(null);

  // Sync data from competencyService
  const refreshData = () => {
    setJobs(competencyService.getJobs());
    setEmployees(competencyService.getEmployees());
    setCompetencies(competencyService.getAllCompetencies());
    setEvaluations(competencyService.getAllEvaluations());
    setManagerActions(competencyService.getAllManagerActions());
  };

  useEffect(() => {
    refreshData();
    const unsub = competencyService.subscribe(() => {
      refreshData();
    });
    return () => unsub();
  }, []);

  // Filtered employees list
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesJob = selectedJobFilter === 'all' || emp.jobId === selectedJobFilter;
      const matchesSearch = emp.name.includes(searchTerm) || emp.personnelCode.includes(searchTerm) || emp.unit.includes(searchTerm);
      
      if (!matchesJob || !matchesSearch) return false;

      if (statusFilter !== 'all') {
        const summary = competencyService.getEmployeeProductivitySummary(emp.id);
        if (!summary) return true;
        if (statusFilter === 'high' && summary.productivityIndex < 85) return false;
        if (statusFilter === 'gap' && summary.gapCount === 0) return false;
      }

      return true;
    });
  }, [employees, selectedJobFilter, searchTerm, statusFilter]);

  // Overall calculations for Dashboard
  const stats = useMemo(() => {
    let totalEmployees = employees.length;
    let totalEvals = evaluations.length;
    let totalScoreSum = evaluations.reduce((acc, ev) => acc + ev.score, 0);
    let avgScore = totalEvals > 0 ? Math.round((totalScoreSum / totalEvals) * 10) / 10 : 0;
    
    let rewardCount = managerActions.filter(a => a.type === 'reward').length;
    let penaltyCount = managerActions.filter(a => a.type === 'penalty').length;
    let trainingCount = managerActions.filter(a => a.type === 'training').length;

    return {
      totalEmployees,
      avgScore,
      rewardCount,
      penaltyCount,
      trainingCount
    };
  }, [employees, evaluations, managerActions]);

  // Open action modal
  const handleOpenAction = (type: ManagerActionType, empId?: string, compId?: string) => {
    setModalActionType(type);
    if (empId) setModalEmployeeId(empId);
    else if (employees.length > 0) setModalEmployeeId(employees[0].id);
    if (compId) setModalCompetencyId(compId);
    else setModalCompetencyId('');
    setIsModalOpen(true);
  };

  // Export PDF
  const exportToPDF = async () => {
    if (!printTableRef.current) return;
    setIsExportingPDF(true);
    try {
      const canvas = await html2canvas(printTableRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`faraja-competency-matrix-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportExcel = () => {
    exportCompetencyMatrixToExcel({
      jobs,
      duties: competencyService.getAllDuties(),
      competencies,
      employees,
      evaluations
    });
  };

  const handleDeleteAction = (id: string) => {
    competencyService.deleteManagerAction(id);
    refreshData();
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black shadow-xs">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black text-slate-900">
                ماتریس جامع شایستگی‌ها و پیشخوان اقدامات فرماندهی
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                رصد کل ماتریس عملکردی سازمان، ثبت تشویق (مرخصی و...)، تنبیه (اضافه کار اجباری و...) و ارجاع به آموزش‌های فعال
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs & Fast Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex gap-1">
            <button
              onClick={() => setActiveView('employees_matrix')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 transition ${
                activeView === 'employees_matrix'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              ماتریس پرسنل و شایستگی‌ها
            </button>

            <button
              onClick={() => setActiveView('jobs_matrix')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 transition ${
                activeView === 'jobs_matrix'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              ماتریس مشاغل سازمانی (۵×۴)
            </button>

            <button
              onClick={() => setActiveView('actions_history')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 transition ${
                activeView === 'actions_history'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              دستورات صادرشده مدیر ({managerActions.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToPDF}
              disabled={isExportingPDF}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              {isExportingPDF ? 'تهیه PDF...' : 'خروجی PDF'}
            </button>

            <button
              onClick={handleExportExcel}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              خروجی اکسل
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">پرسنل تحت ارزیابی</span>
            <span className="text-base font-black text-slate-900 tabular-nums">{stats.totalEmployees} نیرو</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">تشویق‌های ثبت‌شده</span>
            <span className="text-base font-black text-emerald-700 tabular-nums">{stats.rewardCount} مورد (مرخصی و...)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center font-black">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">تنبیه‌ها و اضافه کار</span>
            <span className="text-base font-black text-rose-700 tabular-nums">{stats.penaltyCount} مورد انضباطی</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center font-black">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">ارجاع به دوره‌های آموزشی</span>
            <span className="text-base font-black text-sky-700 tabular-nums">{stats.trainingCount} دوره مهارتی</span>
          </div>
        </div>
      </div>

      {/* VIEW 1: EMPLOYEES COMPREHENSIVE MATRIX WITH COMMANDER ACTIONS */}
      {activeView === 'employees_matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden space-y-4 p-5" ref={printTableRef}>
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-2.5 flex-wrap flex-1">
              {/* Job Filter */}
              <div className="relative min-w-[200px]">
                <select
                  value={selectedJobFilter}
                  onChange={e => setSelectedJobFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                >
                  <option value="all">همه مشاغل و رسته‌ها</option>
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                >
                  <option value="all">همه سطوح عملکردی</option>
                  <option value="high">شایسته تشویق (بهره‌وری بالای ۸۵٪)</option>
                  <option value="gap">دارای شکاف مهارتی (نیازمند اقدام/آموزش)</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجوی نام پرسنل، کد پرسنلی یا یگان..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Quick Action Trigger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenAction('reward')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                ثبت تشویق / مرخصی
              </button>

              <button
                onClick={() => handleOpenAction('penalty')}
                className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                ثبت اضافه کار اجباری / تنبیه
              </button>

              <button
                onClick={() => handleOpenAction('training')}
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-xs"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                ارجاع به دوره آموزشی
              </button>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 custom-scrollbar">
            <table className="w-full text-right min-w-[950px] border-collapse bg-white">
              <thead className="bg-slate-900 text-white text-xs">
                <tr>
                  <th className="p-3.5 font-black text-center w-12">#</th>
                  <th className="p-3.5 font-black">پرسنل و یگان خدمتی</th>
                  <th className="p-3.5 font-black">شغل سازمانی</th>
                  <th className="p-3.5 font-black text-center">شاخص کل بهره‌وری</th>
                  <th className="p-3.5 font-black text-center">نقاط قوت / شکاف</th>
                  <th className="p-3.5 font-black">ارزیابی شایستگی‌های کلیدی</th>
                  <th className="p-3.5 font-black text-center w-56">اقدامات فرماندهی (تشویق/تنبیه/آموزش)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400 font-bold">
                      موردی مطابق با فیلترهای جستجو یافت نشد.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp, idx) => {
                    const job = jobs.find(j => j.id === emp.jobId);
                    const empComps = competencyService.getCompetenciesByJob(emp.jobId);
                    const empEvals = competencyService.getEmployeeEvaluations(emp.id);
                    const summary = competencyService.getEmployeeProductivitySummary(emp.id);
                    const empActions = managerActions.filter(a => a.employeeId === emp.id);

                    return (
                      <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Index */}
                        <td className="p-3.5 text-center font-bold text-slate-400 tabular-nums">
                          {idx + 1}
                        </td>

                        {/* Employee info */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                              {emp.name.slice(0, 1)}
                            </div>
                            <div>
                              <span className="font-black text-slate-900 block">{emp.name}</span>
                              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                                {emp.rank} • کد: {emp.personnelCode}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold block">
                                {emp.unit}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Job Role */}
                        <td className="p-3.5">
                          <span className="font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 inline-block text-[11px]">
                            {job?.title || 'تعریف نشده'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block mt-1">
                            {job?.category || 'رسته عملیاتی'}
                          </span>
                        </td>

                        {/* Productivity Index */}
                        <td className="p-3.5 text-center">
                          {summary && summary.evaluatedCount > 0 ? (
                            <div>
                              <span className={`text-xs font-black px-2.5 py-1 rounded-lg border tabular-nums inline-block ${
                                summary.productivityIndex >= 85
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : summary.productivityIndex >= 70
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}>
                                {summary.productivityIndex}٪
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-1 font-bold">
                                میانگین: {summary.avgScore}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[10px] font-bold">ارزیابی نشده</span>
                          )}
                        </td>

                        {/* Strengths & Gaps */}
                        <td className="p-3.5 text-center">
                          {summary && (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md tabular-nums" title="تعداد شایستگی‌های بالاتر از هدف">
                                +{summary.strengthCount} قوت
                              </span>
                              {summary.gapCount > 0 ? (
                                <span className="text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md tabular-nums" title="تعداد شایستگی‌های دارای شکاف">
                                  {summary.gapCount} شکاف
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-400">بدون شکاف</span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Competencies Chips */}
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1.5 max-w-sm">
                            {empComps.slice(0, 4).map(comp => {
                              const ev = empEvals.find(e => e.competencyId === comp.id);
                              const score = ev?.score ?? 80;
                              const isGap = score < comp.expectedScore;

                              return (
                                <div
                                  key={comp.id}
                                  onClick={() => handleOpenAction(isGap ? 'training' : 'reward', emp.id, comp.id)}
                                  className={`px-2 py-1 rounded-md border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all hover:scale-105 ${
                                    isGap
                                      ? 'bg-rose-50 text-rose-800 border-rose-200/90'
                                      : 'bg-slate-50 text-slate-800 border-slate-200'
                                  }`}
                                  title={`نمره: ${score} (هدف: ${comp.expectedScore}) - کلیک جهت ثبت دستور`}
                                >
                                  <span className="truncate max-w-[110px]">{comp.title}</span>
                                  <span className={`font-black tabular-nums ${isGap ? 'text-rose-700 font-black' : 'text-slate-600'}`}>
                                    {score}
                                  </span>
                                </div>
                              );
                            })}
                            {empComps.length > 4 && (
                              <span className="text-[10px] text-slate-400 font-bold self-center">
                                +{empComps.length - 4} مورد دیگر
                              </span>
                            )}
                          </div>

                          {/* Existing Actions badge */}
                          {empActions.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[9px] font-black text-slate-400">دستورات فعال:</span>
                              {empActions.map(act => (
                                <span
                                  key={act.id}
                                  className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                                    act.type === 'reward' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                    act.type === 'penalty' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                                    'bg-sky-50 text-sky-800 border-sky-200'
                                  }`}
                                  title={`${act.title} - ${act.amountOrDuration || ''}`}
                                >
                                  {act.type === 'reward' ? '🎖️ ' : act.type === 'penalty' ? '⚠️ ' : '🎓 '}
                                  {act.category}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenAction('reward', emp.id)}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 p-2 rounded-lg transition font-black text-[11px] flex items-center gap-1"
                              title="اعطای تشویق، مرخصی تشویقی یا پاداش"
                            >
                              <Award className="w-3.5 h-3.5 text-emerald-600" />
                              تشویق
                            </button>

                            <button
                              onClick={() => handleOpenAction('penalty', emp.id)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 p-2 rounded-lg transition font-black text-[11px] flex items-center gap-1"
                              title="ثبت اضافه کار اجباری، شیفت نگهبانی یا توبیخ"
                            >
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              تنبیه
                            </button>

                            <button
                              onClick={() => handleOpenAction('training', emp.id)}
                              className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 p-2 rounded-lg transition font-black text-[11px] flex items-center gap-1"
                              title="ارجاع به دوره‌های آموزشی و لینک مهارت"
                            >
                              <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                              آموزش
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* VIEW 2: ORGANIZATIONAL 5x4 JOBS MATRIX */}
      {activeView === 'jobs_matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-500" />
                ماتریس ساختار مشاغل و سطوح ۵ گانه تسلط و اثرگذاری شایستگی‌ها
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                توزیع شایستگی‌های مصوب سازمانی بر اساس سطوح تسلط مهارتی (۱ تا ۵) و سطوح اثرگذاری فراجا
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-right min-w-[800px] border-collapse bg-white text-xs">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3.5 font-black w-48">عنوان شغل و رسته</th>
                  <th className="p-3.5 font-black text-center border-r border-slate-800">۱. مقدماتی</th>
                  <th className="p-3.5 font-black text-center border-r border-slate-800">۲. در حال توسعه</th>
                  <th className="p-3.5 font-black text-center border-r border-slate-800">۳. تسلط پایه</th>
                  <th className="p-3.5 font-black text-center border-r border-slate-800">۴. تسلط کامل</th>
                  <th className="p-3.5 font-black text-center border-r border-slate-800">۵. خبرگی و الگو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map(j => {
                  const jobComps = competencyService.getCompetenciesByJob(j.id);

                  return (
                    <tr key={j.id} className="hover:bg-slate-50/70">
                      <td className="p-4 align-top">
                        <span className="font-black text-slate-900 block text-xs">{j.title}</span>
                        <span className="text-[10px] text-slate-500 block mt-1">{j.category} - {j.department}</span>
                        <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{jobComps.length} شایستگی مصوب</span>
                      </td>

                      {[1, 2, 3, 4, 5].map(level => {
                        const levelComps = jobComps.filter(c => c.proficiencyLevel === level);

                        return (
                          <td key={level} className="p-3 border-r border-slate-100 align-top">
                            {levelComps.length === 0 ? (
                              <span className="text-slate-300 text-center block text-[11px]">-</span>
                            ) : (
                              <div className="space-y-1.5">
                                {levelComps.map(c => (
                                  <div
                                    key={c.id}
                                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-800"
                                  >
                                    <div className="font-black text-slate-900">{c.title}</div>
                                    <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1">
                                      <span>اثر: {c.impact}</span>
                                      <span className="tabular-nums font-bold">هدف: {c.expectedScore}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: MANAGER ACTIONS & COMMANDS HISTORY */}
      {activeView === 'actions_history' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                سجل و تاریخچه دستورات تشویقی، تنبیهی و ارجاع به آموزش‌های صادرشده
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                فهرست تمامی احکام صادرشده توسط فرماندهی با قابلیت پیگیری و لغو
              </p>
            </div>

            <button
              onClick={() => handleOpenAction('reward')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition"
            >
              ثبت دستور جدید
            </button>
          </div>

          <div className="space-y-3">
            {managerActions.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-bold border border-dashed border-slate-200 rounded-2xl">
                تاکنون دستوری ثبت نشده است.
              </div>
            ) : (
              managerActions.map(action => {
                const emp = employees.find(e => e.id === action.employeeId);
                const isReward = action.type === 'reward';
                const isPenalty = action.type === 'penalty';
                const isTraining = action.type === 'training';

                return (
                  <div
                    key={action.id}
                    className={`p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isReward ? 'bg-emerald-50/40 border-emerald-200' :
                      isPenalty ? 'bg-rose-50/40 border-rose-200' :
                      'bg-sky-50/40 border-sky-200'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${
                        isReward ? 'bg-emerald-600 text-white' :
                        isPenalty ? 'bg-rose-600 text-white' :
                        'bg-sky-600 text-white'
                      }`}>
                        {isReward ? <Award className="w-5 h-5" /> :
                         isPenalty ? <AlertTriangle className="w-5 h-5" /> :
                         <GraduationCap className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-black text-slate-900">{action.title}</h4>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                            isReward ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                            isPenalty ? 'bg-rose-100 text-rose-800 border-rose-300' :
                            'bg-sky-100 text-sky-800 border-sky-300'
                          }`}>
                            {action.category}
                          </span>
                          {action.amountOrDuration && (
                            <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                              {action.amountOrDuration}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                          {action.details}
                        </p>

                        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold mt-2">
                          <span>پرسنل: <strong className="text-slate-800">{emp?.name}</strong> ({emp?.rank})</span>
                          <span>مقام صادرکننده: <strong className="text-slate-800">{action.commanderName}</strong></span>
                          <span>تاریخ: {new Date(action.createdAt).toLocaleDateString('fa-IR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300">
                        ✓ ابلاغ شده در پرونده
                      </span>
                      <button
                        onClick={() => handleDeleteAction(action.id)}
                        className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-white transition"
                        title="ابطال دستور"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Action Modal */}
      <ManagerActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultActionType={modalActionType}
        defaultEmployeeId={modalEmployeeId}
        defaultCompetencyId={modalCompetencyId}
        onActionSuccess={refreshData}
      />

    </div>
  );
}
