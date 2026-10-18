import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart2,
  ArrowRight,
  Target,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Sparkles,
  Save,
  HelpCircle,
  FileSpreadsheet,
  Printer,
  ChevronDown,
  Clock,
  ShieldAlert,
  Flame,
  FileText
} from 'lucide-react';
import {
  competencyService,
  Job,
  Duty,
  Competency,
  Employee,
  CompetencyEvaluation
} from '../../services/competencyService';

interface SimplePerformanceIndicatorsStepProps {
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onPrevStep: () => void;
  onGoToAdvanced?: () => void;
  readOnly?: boolean;
}

export function SimplePerformanceIndicatorsStep({
  selectedJobId,
  onSelectJob,
  onPrevStep,
  onGoToAdvanced,
  readOnly = false,
}: SimplePerformanceIndicatorsStepProps) {
  const jobs = useMemo(() => competencyService.getJobs(), []);
  const allEmployees = useMemo(() => competencyService.getEmployees(), []);

  const currentJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || jobs[0] || null;
  }, [jobs, selectedJobId]);

  const duties: Duty[] = useMemo(() => {
    if (!currentJob) return [];
    return competencyService.getDutiesByJob(currentJob.id);
  }, [currentJob]);

  const competencies: Competency[] = useMemo(() => {
    if (!currentJob) return [];
    return competencyService.getCompetenciesByJob(currentJob.id);
  }, [currentJob]);

  // Find employees belonging to this job, or fallback to first employee
  const jobEmployees = useMemo(() => {
    if (!currentJob) return [];
    const direct = allEmployees.filter((e) => e.jobId === currentJob.id);
    return direct.length > 0 ? direct : allEmployees.slice(0, 3);
  }, [allEmployees, currentJob]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(
    jobEmployees[0]?.id || allEmployees[0]?.id || 'e5'
  );

  useEffect(() => {
    if (jobEmployees.length > 0 && !jobEmployees.some((e) => e.id === selectedEmployeeId)) {
      setSelectedEmployeeId(jobEmployees[0].id);
    }
  }, [jobEmployees, selectedEmployeeId]);

  const selectedEmployee = useMemo(() => {
    return allEmployees.find((e) => e.id === selectedEmployeeId) || allEmployees[0];
  }, [allEmployees, selectedEmployeeId]);

  // Evaluations state
  const [evaluations, setEvaluations] = useState<CompetencyEvaluation[]>(
    competencyService.getAllEvaluations()
  );
  const [editingScores, setEditingScores] = useState<Record<string, { score: number; notes: string }>>({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Sync evaluations on update
  useEffect(() => {
    const unsub = competencyService.subscribe((eventType) => {
      if (eventType === 'evaluation_updated' || eventType === 'data_changed') {
        setEvaluations(competencyService.getAllEvaluations());
      }
    });
    return () => unsub();
  }, []);

  // Initialize or get current score for a competency
  const getCompScore = (compId: string, defaultScore: number) => {
    if (editingScores[compId] !== undefined) {
      return editingScores[compId].score;
    }
    const found = evaluations.find(
      (ev) => ev.employeeId === selectedEmployeeId && ev.competencyId === compId
    );
    return found ? found.score : defaultScore;
  };

  const getCompNotes = (compId: string) => {
    if (editingScores[compId] !== undefined) {
      return editingScores[compId].notes;
    }
    const found = evaluations.find(
      (ev) => ev.employeeId === selectedEmployeeId && ev.competencyId === compId
    );
    return found?.notes || '';
  };

  const handleScoreChange = (compId: string, newScore: number) => {
    setEditingScores((prev) => ({
      ...prev,
      [compId]: {
        score: newScore,
        notes: prev[compId]?.notes !== undefined ? prev[compId].notes : getCompNotes(compId),
      },
    }));
  };

  const handleNotesChange = (compId: string, notes: string) => {
    setEditingScores((prev) => ({
      ...prev,
      [compId]: {
        score: prev[compId]?.score !== undefined ? prev[compId].score : getCompScore(compId, 85),
        notes,
      },
    }));
  };

  const handleSaveEvaluation = (compId: string) => {
    const scoreToSave = getCompScore(compId, 85);
    const notesToSave = getCompNotes(compId);

    competencyService.saveEvaluation({
      employeeId: selectedEmployeeId,
      competencyId: compId,
      score: scoreToSave,
      evaluatorId: 'evaluator_live',
      notes: notesToSave,
    });

    setSaveSuccessMsg(`نمره ارزیابی شاخص (${scoreToSave}٪) با موفقیت ثبت گردید.`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 3000);
  };

  // Calculate Overall Job Scorecard
  const overallStats = useMemo(() => {
    if (competencies.length === 0) return { avg: 0, passed: 0, gap: 0 };
    let sum = 0;
    let passed = 0;
    competencies.forEach((c) => {
      const score = getCompScore(c.id, c.expectedScore || 80);
      sum += score;
      if (score >= (c.expectedScore || 80)) {
        passed++;
      }
    });
    const avg = Math.round(sum / competencies.length);
    return { avg, passed, gap: competencies.length - passed };
  }, [competencies, editingScores, evaluations, selectedEmployeeId]);

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-linear-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>گام سوم از فرآیند سه‌گانه ارزیابی عملکرد</span>
          </div>
          <h2 className="text-xl font-black">شاخص‌های ارزیابی عملکرد مرتبط با شایستگی‌ها (KPI)</h2>
          <p className="text-xs text-emerald-200/90 max-w-2xl leading-relaxed">
            در این گام، پیوند مستقیم میان وظیفه، شایستگی و سنجه ارزیابی عملکرد مشاهده می‌شود. شاخص‌های سنجش، فرمول محاسبه، حد نصاب استاندارد و کارنامه ارزیابی عملکرد پرسنل به ساده‌ترین شکل قابل پایش و نمره‌دهی هستند.
          </p>
        </div>

        {/* Aggregate KPI Score Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[170px] shrink-0">
          <span className="text-[11px] font-bold text-slate-300 block">نمره کل عملکرد شغل</span>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-3xl font-black text-white">{overallStats.avg}</span>
            <span className="text-xs text-emerald-300 font-bold">از ۱۰۰</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">
            {overallStats.passed} شاخص استاندارد | {overallStats.gap} نیازمند بهبود
          </span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
          <span className="text-[10px] text-emerald-700">به‌روزرسانی آنی کارنامه پرسنل</span>
        </div>
      )}

      {/* Contextual Bar: Selected Job + Evaluated Employee Picker */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 md:p-5 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Job Info & Switcher */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-400 block">شغل و ردیف سازمانی:</span>
            <select
              value={currentJob?.id || ''}
              onChange={(e) => onSelectJob(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-black rounded-xl py-1.5 px-2.5 focus:outline-none focus:border-indigo-500"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Switcher */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-400 block">پرسنل مورد ارزیابی:</span>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-black rounded-xl py-1.5 px-2.5 focus:outline-none focus:border-emerald-500"
            >
              {allEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.rank} {emp.name} (کد: {emp.personnelCode})
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Performance Indicators (KPIs) List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
              {competencies.length}
            </div>
            <h3 className="text-sm font-black text-slate-900">
              شاخص‌های کلیدی عملکرد متصل به شایستگی‌ها
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-bold">
            پرسنل ارزیابی‌شونده: {selectedEmployee?.name}
          </span>
        </div>

        <div className="space-y-4">
          {competencies.map((comp, idx) => {
            const relatedDuty = duties.find((d) => d.id === comp.dutyId);
            const currentScore = getCompScore(comp.id, comp.expectedScore || 85);
            const currentNotes = getCompNotes(comp.id);
            const targetScore = comp.expectedScore || 80;
            const isTargetMet = currentScore >= targetScore;

            // Generate formula / KPI definition
            const kpiTitle = `شاخص عملکردی: تسلط در ${comp.title}`;
            const kpiFormula =
              relatedDuty?.formula ||
              `میزان انطباق اقدامات عملیاتی با چک‌لیست استانداردهای ${comp.title}`;

            return (
              <div
                key={comp.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 md:p-6 shadow-2xs hover:border-emerald-300 transition space-y-4"
              >
                {/* Header: Number, KPI Title, Target Met Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {kpiTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        مرتبط با شایستگی: <strong className="text-slate-700">{comp.title}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span
                      className={`text-[11px] font-black px-3 py-1 rounded-xl flex items-center gap-1.5 border ${
                        isTargetMet
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isTargetMet ? 'مطلوب و منطبق بر استاندارد' : 'نیازمند بهبود مهارتی'}</span>
                    </span>
                  </div>
                </div>

                {/* KPI Metrics Box: Formula, Target, Evaluation Criteria */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
                  
                  {/* Formula / Calculation */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 block text-[11px]">
                      فرمول و شیوه سنجش شاخص:
                    </span>
                    <p className="font-bold text-slate-800 leading-relaxed">
                      {kpiFormula}
                    </p>
                  </div>

                  {/* Benchmark / Target */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 block text-[11px]">
                      حد نصاب قبولی (Target):
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                        حداقل {targetScore}٪
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        (سطح مهارتی: {comp.proficiencyLevel} از ۵)
                      </span>
                    </div>
                  </div>

                  {/* Operational Criteria */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 block text-[11px]">
                      معیار سنجش رفتاری:
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed line-clamp-2">
                      {comp.evaluationCriteria || 'تحقق کامل انتظارات مصوب در شیفت‌های ماموریتی'}
                    </p>
                  </div>

                </div>

                {/* Live Scoring & Performance Feedback */}
                <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  
                  {/* Slider Control */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-slate-700">
                        نمره ارزیابی عملکرد پرسنل:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">
                          {currentScore >= 90 ? 'عالی' : currentScore >= 75 ? 'خوب' : currentScore >= 60 ? 'متوسط' : 'ضعیف'}
                        </span>
                        <span className="text-sm font-black text-white bg-slate-900 px-3 py-0.5 rounded-xl">
                          {currentScore}٪
                        </span>
                      </div>
                    </div>

                    {!readOnly ? (
                      <input
                        type="range"
                        min="30"
                        max="100"
                        value={currentScore}
                        onChange={(e) => handleScoreChange(comp.id, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    ) : (
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${currentScore}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Notes & Save Button */}
                  <div className="flex items-center gap-2 md:w-auto">
                    {!readOnly && (
                      <>
                        <input
                          type="text"
                          placeholder="یادداشت ارزیابی..."
                          value={currentNotes}
                          onChange={(e) => handleNotesChange(comp.id, e.target.value)}
                          className="w-full md:w-48 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEvaluation(comp.id)}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition cursor-pointer shadow-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>ثبت نمره</span>
                        </button>
                      </>
                    )}
                  </div>

                </div>

              </div>
            );
          })}

          {competencies.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs">
              هیچ شاخصی برای این شغل یافت نشد.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrevStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به گام دوم: شایستگی‌های استخراج‌شده</span>
        </button>

        {onGoToAdvanced && (
          <button
            type="button"
            onClick={onGoToAdvanced}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition cursor-pointer"
          >
            <span>مشاهده ماتریس تحلیلی ۵×۴ و گزارش جامع (اختیاری)</span>
          </button>
        )}
      </div>

    </div>
  );
}
