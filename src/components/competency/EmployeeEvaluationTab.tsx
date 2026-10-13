import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  Save, 
  Sparkles, 
  BarChart3, 
  Filter, 
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  GraduationCap,
  ShieldAlert,
  Flame,
  Shield
} from 'lucide-react';
import { 
  competencyService, 
  Employee, 
  Competency, 
  CompetencyEvaluation, 
  Job,
  ManagerAction,
  ManagerActionType
} from '../../services/competencyService';
import { exportCompetencyMatrixToExcel, printCompetencyReport } from '../../utils/exportUtils';
import { ManagerActionModal } from './ManagerActionModal';

export function EmployeeEvaluationTab() {
  const jobs = competencyService.getJobs();
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const allEmployees = competencyService.getEmployees();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(allEmployees[0]?.id || '');
  
  const [evalScores, setEvalScores] = useState<Record<string, { score: number; notes: string }>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Manager Actions State
  const [managerActions, setManagerActions] = useState<ManagerAction[]>(competencyService.getAllManagerActions());
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [modalActionType, setModalActionType] = useState<ManagerActionType>('reward');
  const [modalCompetencyId, setModalCompetencyId] = useState<string>('');

  const openActionModal = (type: ManagerActionType, compId?: string) => {
    setModalActionType(type);
    setModalCompetencyId(compId || '');
    setIsActionModalOpen(true);
  };

  const selectedEmployee = allEmployees.find(e => e.id === selectedEmployeeId);
  const employeeJob = selectedEmployee ? competencyService.getJobById(selectedEmployee.jobId) : null;
  const competencies = selectedEmployee ? competencyService.getCompetenciesByJob(selectedEmployee.jobId) : [];
  const existingEvaluations = selectedEmployee ? competencyService.getEmployeeEvaluations(selectedEmployee.id) : [];
  const employeeActions = managerActions.filter(a => a.employeeId === selectedEmployee?.id);

  // Subscribe to live competency service updates
  useEffect(() => {
    const unsubscribe = competencyService.subscribe(() => {
      setManagerActions(competencyService.getAllManagerActions());
    });
    return () => unsubscribe();
  }, []);

  // Filter employees by job and search term
  const filteredEmployees = allEmployees.filter(emp => {
    const matchesJob = selectedJobFilter === 'all' || emp.jobId === selectedJobFilter;
    const matchesSearch = emp.name.includes(searchTerm) || emp.personnelCode.includes(searchTerm);
    return matchesJob && matchesSearch;
  });

  // Calculate summary metrics for currently selected employee
  const productivitySummary = selectedEmployee ? competencyService.getEmployeeProductivitySummary(selectedEmployee.id) : null;

  // Initialize or update scores when employee changes
  React.useEffect(() => {
    if (selectedEmployee) {
      const initialMap: Record<string, { score: number; notes: string }> = {};
      const evals = competencyService.getEmployeeEvaluations(selectedEmployee.id);
      evals.forEach(ev => {
        initialMap[ev.competencyId] = { score: ev.score, notes: ev.notes || '' };
      });
      setEvalScores(initialMap);
      setSavedSuccess(false);
    }
  }, [selectedEmployeeId]);

  const handleScoreChange = (competencyId: string, score: number) => {
    setEvalScores(prev => ({
      ...prev,
      [competencyId]: { ...prev[competencyId], score: Math.min(100, Math.max(0, score)) }
    }));
  };

  const handleNotesChange = (competencyId: string, notes: string) => {
    setEvalScores(prev => ({
      ...prev,
      [competencyId]: { ...prev[competencyId], notes }
    }));
  };

  const handleSaveEvaluations = () => {
    if (!selectedEmployee) return;
    Object.entries(evalScores).forEach(([compId, data]) => {
      if (data && typeof data.score === 'number') {
        competencyService.saveEvaluation({
          employeeId: selectedEmployee.id,
          competencyId: compId,
          score: data.score,
          evaluatorId: 'evaluator_current',
          notes: data.notes
        });
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportExcel = () => {
    exportCompetencyMatrixToExcel({
      jobs,
      duties: competencyService.getAllDuties(),
      competencies: competencyService.getAllCompetencies(),
      employees: allEmployees,
      evaluations: competencyService.getAllEvaluations(),
      selectedJobTitle: employeeJob?.title
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header and Filter Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </span>
            گزارش جامع بهره‌وری و کارنامه ارزیابی کارکنان
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            تحلیل جامع شاخص‌های بهره‌وری سازمانی، شکاف شایستگی، تطابق با سطوح ۵ گانه و ثبت نمرات میدانی
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportExcel}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            خروجی اکسل کارنامه‌های بهره‌وری
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Right Column: Employee Directory with Job Filter */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col h-[calc(100vh-14rem)] overflow-hidden">
          <div className="p-4 border-b border-slate-200/80 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-600" /> فیلتر بر اساس شغل سازمانی:
              </span>
              <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                {filteredEmployees.length} نفر
              </span>
            </div>

            <select
              value={selectedJobFilter}
              onChange={e => setSelectedJobFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-800 transition"
            >
              <option value="all">همه مشاغل و رسته‌ها</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>

            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="جستجوی نام یا کد پرسنلی..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-800 transition placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Employee List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {filteredEmployees.map(emp => {
              const isSelected = selectedEmployeeId === emp.id;
              const job = jobs.find(j => j.id === emp.jobId);
              const summary = competencyService.getEmployeeProductivitySummary(emp.id);

              return (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmployeeId(emp.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                        isSelected ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {emp.name.slice(0, 1)}
                      </div>
                      <div>
                        <h4 className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {emp.name}
                        </h4>
                        <span className={`text-[10px] font-medium block mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {emp.rank} • کد: {emp.personnelCode}
                        </span>
                      </div>
                    </div>

                    {summary && summary.evaluatedCount > 0 && (
                      <div className="text-left">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md tabular-nums ${
                          isSelected ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                        }`}>
                          {summary.productivityIndex}٪ بهره‌وری
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] font-bold ${
                    isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'
                  }`}>
                    <span className={`truncate max-w-[170px] ${isSelected ? 'text-emerald-300' : 'text-slate-800 font-extrabold'}`}>{job?.title || 'نامشخص'}</span>
                    <span>{emp.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left Column: Evaluation Sheet & Metrics for Selected Employee */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-14rem)]">
          {selectedEmployee ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col h-full overflow-hidden">
              
              {/* Employee Summary Banner */}
              <div className="p-5 border-b border-slate-200/80 bg-slate-50/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-base shadow-xs">
                      {selectedEmployee.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm md:text-base text-slate-900">{selectedEmployee.name}</h3>
                        <span className="bg-slate-200 text-slate-800 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-slate-300">
                          {selectedEmployee.rank}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        شغل سازمانی: <strong className="text-slate-900">{employeeJob?.title}</strong> ({selectedEmployee.unit})
                      </p>
                    </div>
                  </div>

                  {/* Score Summary Metrics */}
                  {productivitySummary && (
                    <div className="flex items-center gap-3">
                      <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-center shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-500 block">شاخص بهره‌وری:</span>
                        <span className="text-sm font-black text-emerald-700 tabular-nums">%{productivitySummary.productivityIndex}</span>
                      </div>
                      <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-center shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-500 block">میانگین نمرات:</span>
                        <span className="text-sm font-black text-slate-900 tabular-nums">{productivitySummary.avgScore} از ۱۰۰</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Commander / Evaluator Action Bar */}
                <div className="bg-slate-900 text-white p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-200">
                      اقدامات مدیریتی فرمانده برای این پرسنل:
                    </span>
                    {employeeActions.length > 0 && (
                      <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {employeeActions.length} اقدام
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => openActionModal('reward')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>ثبت تشویق (مرخصی / پاداش)</span>
                    </button>

                    <button
                      onClick={() => openActionModal('penalty')}
                      className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>ثبت تنبیه (اضافه‌کار اجباری)</span>
                    </button>

                    <button
                      onClick={() => openActionModal('training')}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>ارجاع به آموزش</span>
                    </button>
                  </div>
                </div>

                {/* Badges for active actions */}
                {employeeActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {employeeActions.map(action => (
                      <div
                        key={action.id}
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                          action.type === 'reward'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : action.type === 'penalty'
                              ? 'bg-rose-50 text-rose-900 border-rose-300'
                              : 'bg-indigo-50 text-indigo-900 border-indigo-300'
                        }`}
                      >
                        <span>{action.type === 'reward' ? '🎖️' : action.type === 'penalty' ? '⚠️' : '🎓'}</span>
                        <span>{action.title}</span>
                        {action.amountOrDuration && (
                          <span className="opacity-80 font-bold">({action.amountOrDuration})</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Competencies Evaluation List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                {competencies.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 text-xs font-bold border border-dashed border-slate-200 rounded-2xl">
                    برای این رسته شغلی هنوز شایستگی‌ای تعریف نشده است.
                  </div>
                ) : (
                  competencies.map((comp, idx) => {
                    const currentVal = evalScores[comp.id]?.score ?? 80;
                    const notes = evalScores[comp.id]?.notes ?? '';
                    const gap = currentVal - comp.expectedScore;
                    const matchedCompActions = employeeActions.filter(a => a.competencyId === comp.id);

                    return (
                      <div key={comp.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 hover:border-slate-300 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center border border-slate-200">
                                {idx + 1}
                              </span>
                              <h4 className="font-black text-sm text-slate-900">{comp.title}</h4>
                            </div>
                            {comp.description && (
                              <p className="text-xs text-slate-600 mt-1 pr-8.5 leading-relaxed">{comp.description}</p>
                            )}
                          </div>

                          <div className="text-left shrink-0">
                            <span className={`text-[11px] font-black px-3 py-1 rounded-lg border tabular-nums ${
                              gap >= 0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}>
                              {gap >= 0 ? `+${gap} بالاتر از هدف` : `${gap} شکاف شایستگی`}
                            </span>
                          </div>
                        </div>

                        {/* KPI Display */}
                        {comp.evaluationCriteria && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 mr-8.5">
                            <span className="text-[10px] font-black text-slate-500 block mb-1">معیار ارزیابی میدانی (KPI):</span>
                            <span className="font-bold text-slate-900 leading-relaxed">{comp.evaluationCriteria}</span>
                          </div>
                        )}

                        {/* Active Actions on this competency */}
                        {matchedCompActions.length > 0 && (
                          <div className="mr-8.5 flex flex-wrap gap-2">
                            {matchedCompActions.map(act => (
                              <div
                                key={act.id}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                                  act.type === 'reward'
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                    : act.type === 'penalty'
                                      ? 'bg-rose-50 text-rose-900 border-rose-300'
                                      : 'bg-indigo-50 text-indigo-900 border-indigo-300'
                                }`}
                              >
                                <span>{act.type === 'reward' ? '🎖️' : act.type === 'penalty' ? '⚠️' : '🎓'}</span>
                                <span>{act.title}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Score Slider & Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mr-8.5 pt-1">
                          <div className="md:col-span-6 flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">نمره کسب‌شده:</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={currentVal}
                              onChange={e => handleScoreChange(comp.id, Number(e.target.value))}
                              className="flex-1 accent-slate-900 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs font-black text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg w-12 text-center tabular-nums">
                              {currentVal}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 tabular-nums whitespace-nowrap">هدف: {comp.expectedScore}</span>
                          </div>

                          <div className="md:col-span-6">
                            <input
                              type="text"
                              placeholder="یادداشت ارزیاب یا شواهد عملکرد سازمانی..."
                              value={notes}
                              onChange={e => handleNotesChange(comp.id, e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-slate-800 transition"
                            />
                          </div>
                        </div>

                        {/* Direct Action Buttons per Competency Row */}
                        <div className="mr-8.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-slate-400">اقدام مستقیم فرماندهی:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openActionModal('reward', comp.id)}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 transition"
                            >
                              <Award className="w-3 h-3 text-emerald-600" />
                              <span>تشویق / پاداش</span>
                            </button>

                            <button
                              onClick={() => openActionModal('penalty', comp.id)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 transition"
                            >
                              <ShieldAlert className="w-3 h-3 text-rose-600" />
                              <span>تنبیه / اضافه‌کار</span>
                            </button>

                            <button
                              onClick={() => openActionModal('training', comp.id)}
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 transition"
                            >
                              <GraduationCap className="w-3 h-3 text-indigo-600" />
                              <span>ارجاع به آموزش</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Save Bar */}
              <div className="p-4 border-t border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> نمرات با موفقیت ذخیره و در کارنامه کارمند ثبت شد.
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500">
                    تغییرات نمرات بلافاصله در ماتریس شایستگی و داشبورد کارمند منعکس می‌شود.
                  </span>
                )}

                <button
                  onClick={handleSaveEvaluations}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition"
                >
                  <Save className="w-4 h-4 text-emerald-400" />
                  ذخیره و ثبت نهایی ارزیابی
                </button>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
              <Users className="w-12 h-12 mb-3 text-slate-300" />
              <p className="font-bold text-sm text-slate-600">لطفاً یک کارمند را از لیست انتخاب کنید</p>
            </div>
          )}
        </div>

      </div>

      {/* Global Manager Action Modal */}
      <ManagerActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        defaultEmployeeId={selectedEmployee?.id}
        defaultCompetencyId={modalCompetencyId}
        defaultActionType={modalActionType}
        onActionSuccess={() => {
          setManagerActions(competencyService.getAllManagerActions());
        }}
      />

    </div>
  );
}
