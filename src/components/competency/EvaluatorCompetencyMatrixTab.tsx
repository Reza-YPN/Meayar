import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Layers,
  Award,
  TrendingUp,
  Save,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  Sparkles,
  Info,
  ChevronDown,
  Edit3,
  Search,
  Sliders,
  Shield,
  Activity,
  ArrowUpRight,
  Radio,
  GraduationCap,
  PlusCircle,
  Clock,
  ShieldAlert,
  Flame,
  Check
} from 'lucide-react';
import {
  competencyService,
  Employee,
  Job,
  Duty,
  Competency,
  CompetencyEvaluation,
  ProficiencyLevel,
  CompetencyImpact,
  ManagerAction,
  ManagerActionType
} from '../../services/competencyService';
import { exportCompetencyMatrixToExcel, printCompetencyReport, getPersianImpact } from '../../utils/exportUtils';
import { ManagerActionModal } from './ManagerActionModal';

const PROFICIENCY_LEVELS: { level: ProficiencyLevel; label: string; subLabel: string; badgeColor: string; bg: string }[] = [
  { level: 5, label: 'سطح ۵: خبرگی و الگو', subLabel: 'مرجع علمی و عملیاتی', badgeColor: 'bg-indigo-900 text-white', bg: 'bg-indigo-50/40' },
  { level: 4, label: 'سطح ۴: تسلط کامل', subLabel: 'اجرای مستقل و پیشرفته', badgeColor: 'bg-blue-800 text-white', bg: 'bg-blue-50/40' },
  { level: 3, label: 'سطح ۳: تسلط پایه', subLabel: 'انجام استاندارد امور', badgeColor: 'bg-teal-800 text-white', bg: 'bg-teal-50/40' },
  { level: 2, label: 'سطح ۲: در حال توسعه', subLabel: 'نیازمند راهنمایی مقطعی', badgeColor: 'bg-amber-800 text-white', bg: 'bg-amber-50/40' },
  { level: 1, label: 'سطح ۱: مقدماتی', subLabel: 'آموزش‌پذیر و تازه‌کار', badgeColor: 'bg-slate-700 text-white', bg: 'bg-slate-50/60' },
];

const IMPACT_COLUMNS: { id: CompetencyImpact; label: string; short: string; headerBg: string; border: string }[] = [
  { id: 'input', label: '۱. درون‌داد (Input)', short: 'آمادگی و ورودی', headerBg: 'bg-sky-950 text-sky-100', border: 'border-sky-200' },
  { id: 'process', label: '۲. فرآیند (Process)', short: 'متدولوژی و اجرا', headerBg: 'bg-slate-900 text-amber-200', border: 'border-amber-200' },
  { id: 'product', label: '۳. محصول (Product)', short: 'ادله و مستندسازی', headerBg: 'bg-indigo-950 text-indigo-200', border: 'border-indigo-200' },
  { id: 'output', label: '۴. برون‌داد (Output)', short: 'دستاورد و واکنش', headerBg: 'bg-emerald-950 text-emerald-200', border: 'border-emerald-200' },
  { id: 'outcome', label: '۵. پیامد و اثر (Outcome)', short: 'امنیت و رضایت', headerBg: 'bg-rose-950 text-rose-200', border: 'border-rose-200' },
];

export function EvaluatorCompetencyMatrixTab() {
  const [employees, setEmployees] = useState<Employee[]>(competencyService.getEmployees());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employees[0]?.id || 'e1');
  const [evaluations, setEvaluations] = useState<CompetencyEvaluation[]>(competencyService.getAllEvaluations());
  const [jobs, setJobs] = useState<Job[]>(competencyService.getJobs());
  const [duties, setDuties] = useState<Duty[]>(competencyService.getAllDuties());
  const [competencies, setCompetencies] = useState<Competency[]>(competencyService.getAllCompetencies());
  
  // Real-time edited local state for fast reactivity
  const [editingScores, setEditingScores] = useState<Record<string, { score: number; notes: string }>>({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterDutyId, setFilterDutyId] = useState<string>('all');

  // Manager Actions State (Direct Rewards, Penalties, Training Assignments)
  const [managerActions, setManagerActions] = useState<ManagerAction[]>(competencyService.getAllManagerActions());
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [modalActionType, setModalActionType] = useState<ManagerActionType>('reward');
  const [modalCompetencyId, setModalCompetencyId] = useState<string>('');

  const openActionModal = (type: ManagerActionType, compId?: string) => {
    setModalActionType(type);
    setModalCompetencyId(compId || '');
    setIsActionModalOpen(true);
  };

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId) || employees[0];
  const employeeJob = jobs.find(j => j.id === selectedEmployee?.jobId);
  const employeeDuties = duties.filter(d => d.jobId === selectedEmployee?.jobId);
  const employeeCompetencies = competencies.filter(c => {
    const duty = duties.find(d => d.id === c.dutyId);
    return duty && duty.jobId === selectedEmployee?.jobId;
  });

  // Actions specifically for the selected employee
  const employeeActions = managerActions.filter(a => a.employeeId === selectedEmployee?.id);

  // Subscribe to live competency service updates
  useEffect(() => {
    const unsubscribe = competencyService.subscribe((event, payload) => {
      setEmployees(competencyService.getEmployees());
      setJobs(competencyService.getJobs());
      setDuties(competencyService.getAllDuties());
      setCompetencies(competencyService.getAllCompetencies());
      setEvaluations(competencyService.getAllEvaluations());
      setManagerActions(competencyService.getAllManagerActions());
    });
    return () => unsubscribe();
  }, []);

  // Sync evaluations into editing buffer when employee changes
  useEffect(() => {
    if (!selectedEmployee) return;
    const empEvals = competencyService.getEmployeeEvaluations(selectedEmployee.id);
    const buffer: Record<string, { score: number; notes: string }> = {};
    employeeCompetencies.forEach(c => {
      const ev = empEvals.find(e => e.competencyId === c.id);
      buffer[c.id] = {
        score: ev ? ev.score : c.expectedScore,
        notes: ev?.notes || ''
      };
    });
    setEditingScores(buffer);
  }, [selectedEmployeeId, competencies]);

  const handleScoreChange = (competencyId: string, newScore: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(newScore)));
    setEditingScores(prev => ({
      ...prev,
      [competencyId]: {
        score: clamped,
        notes: prev[competencyId]?.notes || ''
      }
    }));
    
    // Live save instantly to service and notify subscribers
    if (selectedEmployee) {
      competencyService.updateScoreLive(
        selectedEmployee.id,
        competencyId,
        clamped,
        editingScores[competencyId]?.notes
      );
      setEvaluations(competencyService.getAllEvaluations());
    }
  };

  const handleNotesChange = (competencyId: string, notes: string) => {
    setEditingScores(prev => ({
      ...prev,
      [competencyId]: {
        score: prev[competencyId]?.score ?? 85,
        notes
      }
    }));
  };

  const handleSaveAll = () => {
    if (!selectedEmployee) return;
    Object.entries(editingScores).forEach(([compId, val]) => {
      competencyService.saveEvaluation({
        employeeId: selectedEmployee.id,
        competencyId: compId,
        score: val.score,
        evaluatorId: 'evaluator_panel',
        notes: val.notes
      });
    });
    setEvaluations(competencyService.getAllEvaluations());
    setSaveSuccessMsg(`امتیازات ارزیابی ${selectedEmployee.name} با موفقیت ذخیره و در سامانه همگام‌سازی شد.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleExportExcel = () => {
    exportCompetencyMatrixToExcel({
      jobs,
      duties,
      competencies: employeeCompetencies,
      employees,
      evaluations,
      selectedJobTitle: employeeJob?.title,
      selectedEmployee
    });
  };

  const handlePrintPDF = () => {
    if (!selectedEmployee) return;
    const prod = competencyService.getEmployeeProductivitySummary(selectedEmployee.id);
    const rowsHtml = employeeCompetencies.map((c, i) => {
      const duty = duties.find(d => d.id === c.dutyId);
      const ev = evaluations.find(e => e.employeeId === selectedEmployee.id && e.competencyId === c.id);
      const score = editingScores[c.id]?.score ?? ev?.score ?? 0;
      const gap = score - c.expectedScore;
      const statusBadge = gap >= 0 
        ? '<span class="badge badge-success">منطبق (' + (gap > 0 ? '+' + gap : '0') + ')</span>' 
        : '<span class="badge badge-danger">شکاف (' + gap + ')</span>';

      return `
        <tr>
          <td style="text-align: center;">${i + 1}</td>
          <td><strong>${c.title}</strong><br/><small style="color: #64748b;">${duty?.title || '-'}</small></td>
          <td>${getPersianImpact(c.impact)}</td>
          <td style="text-align: center;">سطح ${c.proficiencyLevel} از ۵</td>
          <td style="text-align: center;"><strong>${c.expectedScore}٪</strong></td>
          <td style="text-align: center; font-weight: bold; color: ${score >= c.expectedScore ? '#166534' : '#9f1239'};">${score}٪</td>
          <td style="text-align: center;">${statusBadge}</td>
          <td><small>${editingScores[c.id]?.notes || ev?.notes || c.evaluationCriteria || '-'}</small></td>
        </tr>
      `;
    }).join('');

    const contentHtml = `
      <div class="person-badge-box">
        <div><span>ارزیابی‌شونده:</span> <strong>${selectedEmployee.name}</strong></div>
        <div><span>کد پرسنلی:</span> <strong>${selectedEmployee.personnelCode}</strong></div>
        <div><span>درجه / رتبه:</span> <strong>${selectedEmployee.rank}</strong></div>
        <div><span>ردیف شغلی:</span> <strong>${employeeJob?.title || '-'}</strong></div>
        <div><span>یگان خدمتی:</span> <strong>${selectedEmployee.unit}</strong></div>
        <div><span>شاخص کل بهره‌وری:</span> <strong style="color: #166534;">${prod?.productivityIndex || 0}٪</strong></div>
        <div><span>تعداد شایستگی‌ها:</span> <strong>${employeeCompetencies.length} مورد</strong></div>
        <div><span>وضعیت ارزیابی:</span> <strong>تایید کانون ارزیابی</strong></div>
      </div>

      <h4 style="margin: 12px 0 6px; font-weight: bold; color: #0f172a;">ماتریس تفصیلی شایستگی‌های شغلی و نمرات مکتسبه</h4>
      <table>
        <thead>
          <tr>
            <th style="width: 5%;">ردیف</th>
            <th style="width: 25%;">عنوان شایستگی و شرح وظیفه</th>
            <th style="width: 14%;">سطح اثرگذاری</th>
            <th style="width: 10%;">سطح تسلط</th>
            <th style="width: 10%;">نمره هدف</th>
            <th style="width: 10%;">نمره ارزیاب</th>
            <th style="width: 11%;">وضعیت انطباق</th>
            <th style="width: 15%;">ملاحظات و معیار KPI</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    printCompetencyReport(`کارنامه_ماتریس_شایستگی_فراجا_${selectedEmployee.name}`, contentHtml);
  };

  const productivitySummary = selectedEmployee ? competencyService.getEmployeeProductivitySummary(selectedEmployee.id) : null;

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Banner: Real-time Synchronized Evaluator Workspace */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 md:p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black mb-1">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>ماتریس شایستگی و ارزیابی برخط فراجا (پنل ارزیاب و مدیر ارشد سیستم)</span>
            </div>
            <h2 className="text-base md:text-lg font-black text-white">
              ماتریس پویای سطوح تسلط مهارتی (مقدماتی تا خبرگی) و سطوح اثرگذاری (درون‌داد تا پیامد)
            </h2>
            <p className="text-xs text-slate-300 mt-1 font-medium max-w-3xl leading-relaxed">
              پرسنل مورد نظر را انتخاب نمایید تا شرح شغل‌های اختصاص‌یافته، شناسنامه شایستگی و سلول‌های ماتریس بارگذاری شوند. هرگونه ویرایش امتیاز به صورت آنی در پیشخوان کارمند ذخیره و اعمال می‌گردد.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportExcel}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 transition"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              خروجی اکسل ماتریس
            </button>

            <button
              onClick={handlePrintPDF}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              چاپ گزارش رسمی (PDF)
            </button>

            <button
              onClick={handleSaveAll}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              ثبت و همگام‌سازی نهایی
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Employee Selector Bar & Assigned Job Summary */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 text-sm">انتخاب پرسنل جهت ارزیابی در ماتریس:</h3>
          </div>

          {/* Quick Dropdown & Filter */}
          <div className="flex items-center gap-3">
            <select
              value={selectedEmployeeId}
              onChange={e => setSelectedEmployeeId(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-400 focus:bg-white transition"
            >
              {employees.map(emp => {
                const j = jobs.find(job => job.id === emp.jobId);
                return (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.rank}) - {j?.title || 'بدون شغل'}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Selected Personnel Profile Card */}
        {selectedEmployee && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
              <div className="flex items-center gap-3 md:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-black text-base shadow-sm">
                  {selectedEmployee.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{selectedEmployee.name}</h4>
                  <p className="text-xs font-bold text-slate-500">{selectedEmployee.rank} | کد: {selectedEmployee.personnelCode}</p>
                  <span className="text-[10px] text-slate-400 block font-medium mt-0.5">{selectedEmployee.unit}</span>
                </div>
              </div>

              <div className="md:col-span-2 bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col justify-center">
                <span className="text-[10px] font-black text-slate-400">ردیف شغلی اختصاص‌یافته:</span>
                <div className="text-xs font-black text-indigo-950 flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{employeeJob?.title || 'تعریف‌نشده'}</span>
                  {employeeJob?.category && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                      {employeeJob.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-slate-600">
                  <span>{employeeDuties.length} شرح وظیفه سازمانی</span>
                  <span>•</span>
                  <span className="text-indigo-600">{employeeCompetencies.length} شایستگی مرتبط در ماتریس</span>
                </div>
              </div>

              <div className="md:col-span-1 bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-slate-400 block">شاخص کل بهره‌وری:</span>
                  <span className="text-xl font-black text-emerald-700">{productivitySummary?.productivityIndex || 0}٪</span>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                    {productivitySummary?.strengthCount || 0} قوت | {productivitySummary?.gapCount || 0} نیازمند بهبود
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Direct Commander / Evaluator Control Bar for this Personnel */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-3.5 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold">
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-black text-white flex items-center gap-2">
                    اقدامات مدیریتی و فرماندهی مستقیم:
                    {employeeActions.length > 0 && (
                      <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {employeeActions.length} اقدام فعال
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-300 block">
                    اعمال فوری تشویقات (مرخصی/پاداش)، تنبیهات (اضافه کار/توبیخ) و ارجاع به آموزش
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => openActionModal('reward')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-xs"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-200" />
                  <span>ثبت تشویق پرسنل (مرخصی / پاداش)</span>
                </button>

                <button
                  onClick={() => openActionModal('penalty')}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-200" />
                  <span>ثبت تنبیه (اضافه‌کار اجباری)</span>
                </button>

                <button
                  onClick={() => openActionModal('training')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-xs"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-200" />
                  <span>ارجاع به آموزش تخصصی</span>
                </button>
              </div>
            </div>

            {/* Display active actions for this employee */}
            {employeeActions.length > 0 && (
              <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-3 space-y-2">
                <span className="text-[11px] font-black text-amber-900 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" /> سوابق اقدامات مدیریتی ثبت‌شده برای {selectedEmployee.name}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {employeeActions.map(action => (
                    <div
                      key={action.id}
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${
                        action.type === 'reward'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : action.type === 'penalty'
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : 'bg-indigo-100 text-indigo-900 border-indigo-300'
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
              </div>
            )}
          </div>
        )}

        {/* Assigned Duties Accordion/Pills */}
        {employeeDuties.length > 0 && (
          <div className="pt-1">
            <span className="text-xs font-black text-slate-700 block mb-2">
              شرح شغل‌ها و مسئولیت‌های کلیدی اختصاص‌یافته ({employeeDuties.length} وظیفه):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {employeeDuties.map((duty, dIdx) => (
                <div key={duty.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-black text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 text-[10px] flex items-center justify-center shrink-0">
                      {dIdx + 1}
                    </span>
                    <span className="truncate">{duty.title}</span>
                  </div>
                  {duty.formula && (
                    <div className="text-[10px] bg-emerald-50/80 text-emerald-900 p-1.5 rounded-lg font-bold border border-emerald-100/60 leading-tight">
                      KPI: {duty.formula}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Matrix Guide */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 text-xs font-bold text-slate-700">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>ماتریس ارزیابی ۵×۵ (سطوح شایستگی ۱ تا ۵ × ۵ سطح اثرگذاری درون‌داد تا پیامد)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-[11px] text-slate-600">منطبق بر نمره هدف</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="text-[11px] text-slate-600">دارای شکاف عملکردی</span>
          </div>
        </div>
      </div>

      {/* Main 5x5 Matrix Layout */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse text-right min-w-[1100px]">
          <thead>
            <tr>
              <th className="p-3.5 bg-slate-900 text-white font-black text-xs border-b border-l border-slate-800 w-[180px] sticky right-0 z-10">
                سطوح تسلط شایستگی
              </th>
              {IMPACT_COLUMNS.map(col => (
                <th key={col.id} className={`p-3.5 ${col.headerBg} font-black text-xs border-b border-l border-slate-800 text-center`}>
                  <div>{col.label}</div>
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">{col.short}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROFICIENCY_LEVELS.map(prof => (
              <tr key={prof.level} className="border-b border-slate-200/80 hover:bg-slate-50/40 transition">
                
                {/* Y-Axis: Proficiency Level Header */}
                <td className={`p-4 font-black text-xs border-l border-slate-200 sticky right-0 z-10 ${prof.bg} bg-opacity-95`}>
                  <div className="space-y-1">
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-md font-extrabold ${prof.badgeColor}`}>
                      {prof.label}
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold leading-tight">{prof.subLabel}</p>
                  </div>
                </td>

                {/* X-Axis: 5 Impact Level Cells */}
                {IMPACT_COLUMNS.map(impact => {
                  const cellComps = employeeCompetencies.filter(
                    c => c.proficiencyLevel === prof.level && c.impact === impact.id
                  );

                  return (
                    <td key={impact.id} className="p-3 border-l border-slate-200 align-top w-[20%]">
                      {cellComps.length === 0 ? (
                        <div className="h-24 flex items-center justify-center text-[11px] text-slate-300 font-medium">
                          —
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {cellComps.map(comp => {
                            const currentScore = editingScores[comp.id]?.score ?? comp.expectedScore;
                            const currentNotes = editingScores[comp.id]?.notes ?? '';
                            const gap = currentScore - comp.expectedScore;
                            const isStrength = gap >= 0;
                            const duty = duties.find(d => d.id === comp.dutyId);

                            const matchedCompActions = employeeActions.filter(a => a.competencyId === comp.id);

                            return (
                              <div
                                key={comp.id}
                                className={`p-3 rounded-2xl border transition-all space-y-2.5 ${
                                  isStrength 
                                    ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300' 
                                    : 'bg-rose-50/30 border-rose-200 hover:border-rose-300'
                                }`}
                              >
                                {/* Title and Type */}
                                <div>
                                  <div className="flex items-start justify-between gap-1.5">
                                    <h5 className="font-black text-xs text-slate-900 leading-snug">
                                      {comp.title}
                                    </h5>
                                  </div>
                                  {duty && (
                                    <span className="text-[10px] text-slate-500 font-bold block mt-0.5 truncate" title={duty.title}>
                                      وظیفه: {duty.title}
                                    </span>
                                  )}
                                </div>

                                {/* Target vs Actual & Gap Badge */}
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                  <span className="text-slate-500">هدف: <strong className="text-slate-800">{comp.expectedScore}٪</strong></span>
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                    isStrength ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {gap >= 0 ? `+${gap} مطلوب` : `${gap} شکاف`}
                                  </span>
                                </div>

                                {/* Live Editable Score Slider & Input */}
                                <div className="space-y-1 pt-1 bg-white/90 p-2.5 rounded-xl border border-slate-200/80">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-black text-slate-600">نمره ارزیاب:</span>
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={currentScore}
                                        onChange={e => handleScoreChange(comp.id, Number(e.target.value))}
                                        className={`w-14 text-center font-black text-xs py-1 rounded-lg border focus:outline-none transition ${
                                          isStrength 
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 focus:border-emerald-500' 
                                            : 'bg-rose-50 border-rose-300 text-rose-950 focus:border-rose-500'
                                        }`}
                                      />
                                      <span className="text-[10px] font-bold text-slate-400">از ۱۰۰</span>
                                    </div>
                                  </div>

                                  <input
                                    type="range"
                                    min="40"
                                    max="100"
                                    value={currentScore}
                                    onChange={e => handleScoreChange(comp.id, Number(e.target.value))}
                                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                                  />
                                </div>

                                {/* Inline Notes Editor */}
                                <div>
                                  <input
                                    type="text"
                                    placeholder="یادداشت / توصیه ارزیاب..."
                                    value={currentNotes}
                                    onChange={e => handleNotesChange(comp.id, e.target.value)}
                                    onBlur={() => selectedEmployee && competencyService.updateScoreLive(selectedEmployee.id, comp.id, currentScore, currentNotes)}
                                    className="w-full bg-white/80 border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-medium text-slate-700 focus:outline-none focus:border-indigo-400 transition"
                                  />
                                </div>

                                {/* Active Manager Actions for this specific competency */}
                                {matchedCompActions.length > 0 && (
                                  <div className="space-y-1 pt-1 border-t border-slate-200/60">
                                    {matchedCompActions.map(act => (
                                      <div
                                        key={act.id}
                                        className={`text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center justify-between ${
                                          act.type === 'reward' 
                                            ? 'bg-emerald-100 text-emerald-900' 
                                            : act.type === 'penalty' 
                                              ? 'bg-rose-100 text-rose-900' 
                                              : 'bg-indigo-100 text-indigo-900'
                                        }`}
                                      >
                                        <span className="truncate">{act.type === 'reward' ? '🎖️' : act.type === 'penalty' ? '⚠️' : '🎓'} {act.title}</span>
                                        {act.amountOrDuration && <span className="opacity-75 shrink-0 text-[8px]">({act.amountOrDuration})</span>}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Direct Commander / Evaluator Action Buttons */}
                                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-1">
                                  <button
                                    onClick={() => openActionModal('reward', comp.id)}
                                    title="تشویق عملکردی (مرخصی / پاداش)"
                                    className="flex-1 bg-emerald-100/90 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 rounded-lg py-1 px-1 text-[9px] font-black flex items-center justify-center gap-1 transition shadow-2xs"
                                  >
                                    <Award className="w-3 h-3 text-emerald-700" />
                                    <span>تشویق</span>
                                  </button>

                                  <button
                                    onClick={() => openActionModal('penalty', comp.id)}
                                    title="اقدام انضباطی (اضافه کار اجباری / توبیخ)"
                                    className="flex-1 bg-rose-100/90 hover:bg-rose-200 text-rose-900 border border-rose-300 rounded-lg py-1 px-1 text-[9px] font-black flex items-center justify-center gap-1 transition shadow-2xs"
                                  >
                                    <ShieldAlert className="w-3 h-3 text-rose-700" />
                                    <span>تنبیه</span>
                                  </button>

                                  <button
                                    onClick={() => openActionModal('training', comp.id)}
                                    title="ارجاع مستقیم به دوره آموزشی"
                                    className="flex-1 bg-indigo-100/90 hover:bg-indigo-200 text-indigo-900 border border-indigo-300 rounded-lg py-1 px-1 text-[9px] font-black flex items-center justify-center gap-1 transition shadow-2xs"
                                  >
                                    <GraduationCap className="w-3 h-3 text-indigo-700" />
                                    <span>آموزش</span>
                                  </button>
                                </div>

                              </div>
                            );
                          })}
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

      {/* Global Manager Action Modal for Rewards, Penalties, Training */}
      <ManagerActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        defaultEmployeeId={selectedEmployee?.id}
        defaultCompetencyId={modalCompetencyId}
        defaultActionType={modalActionType}
        onActionSuccess={() => {
          setManagerActions(competencyService.getAllManagerActions());
          setSaveSuccessMsg('اقدام مدیریتی با موفقیت ثبت و به سامانه و پرسنل ابلاغ شد.');
          setTimeout(() => setSaveSuccessMsg(null), 4000);
        }}
      />

    </div>
  );
}
