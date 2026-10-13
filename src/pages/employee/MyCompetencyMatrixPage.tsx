import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Shield, 
  Users, 
  Layers, 
  Search, 
  Settings, 
  BarChart2, 
  Award, 
  BrainCircuit, 
  FileText, 
  ChevronDown,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  ArrowUpRight,
  GitBranch,
  Radio,
  RefreshCw,
  Zap,
  Filter
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from 'recharts';
import { 
  competencyService, 
  Competency, 
  CompetencyLevel, 
  CompetencyImpact, 
  CompetencyEvaluation,
  Employee,
  Job,
  ProficiencyLevel,
  Duty
} from '../../services/competencyService';
import { exportCompetencyMatrixToExcel, printCompetencyReport, getPersianImpact, getPersianLevel } from '../../utils/exportUtils';
import { DynamicCompetencyTree } from '../../components/competency/DynamicCompetencyTree';

const FUNCTIONAL_LEVELS: { id: CompetencyLevel; label: string; desc: string; color: string }[] = [
  { id: 'individual', label: 'فردی (Individual)', desc: 'مهارت، دانش و انگیزش فردی', color: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
  { id: 'team', label: 'گروهی (Team)', desc: 'هماهنگی و تعاملات تیمی', color: 'bg-blue-50 text-blue-900 border-blue-200' },
  { id: 'organizational', label: 'سازمانی (Organizational)', desc: 'فرآیندها و سیستم‌های سازمانی', color: 'bg-purple-50 text-purple-900 border-purple-200' },
  { id: 'social', label: 'اجتماعی (Social)', desc: 'خدمت‌رسانی و تکریم مردم', color: 'bg-teal-50 text-teal-900 border-teal-200' },
];

const IMPACT_LEVELS: { id: CompetencyImpact; label: string; desc: string; color: string }[] = [
  { id: 'input', label: '۱. درون‌داد (Input)', desc: 'آمادگی و دانش اولیه', color: 'bg-sky-50/70 text-sky-900 border-sky-200' },
  { id: 'process', label: '۲. فرآیند (Process)', desc: 'اجرا و متدولوژی', color: 'bg-amber-50/70 text-amber-900 border-amber-200' },
  { id: 'product', label: '۳. محصول (Product)', desc: 'مستندسازی و ادله', color: 'bg-purple-50/70 text-purple-900 border-purple-200' },
  { id: 'output', label: '۴. برون‌داد (Output)', desc: 'واکنش سریع و دستاورد', color: 'bg-emerald-50/70 text-emerald-900 border-emerald-200' },
  { id: 'outcome', label: '۵. پیامد (Outcome)', desc: 'امنیت پایدار و رضایت عمومی', color: 'bg-rose-50/70 text-rose-900 border-rose-200' },
];

const PROFICIENCY_LABELS: Record<number, string> = {
  1: 'مقدماتی و آشنایی',
  2: 'در حال توسعه',
  3: 'تسلط پایه و مستقل',
  4: 'تسلط کامل و پیشرفته',
  5: 'خبرگی و الگوی سازمانی'
};

type ViewMode = 'tree' | 'radar' | 'matrix' | 'profile' | 'productivity' | 'idp';

export function MyCompetencyMatrixPage() {
  const [employees, setEmployees] = useState<Employee[]>(competencyService.getEmployees());
  // Default to Mohammad Reza Yazdanpanah
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('e1');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [radarFilter, setRadarFilter] = useState<'all' | 'strengths' | 'gaps'>('all');
  
  const [evaluations, setEvaluations] = useState<CompetencyEvaluation[]>(competencyService.getAllEvaluations());
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString('fa-IR'));
  const [lastUpdatedCompId, setLastUpdatedCompId] = useState<string | null>(null);
  const [syncAlert, setSyncAlert] = useState<string | null>(null);

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const employee = employees.find(e => e.id === selectedEmployeeId) || employees[0];
  const job = competencyService.getJobById(employee?.jobId || '');
  const duties = competencyService.getDutiesByJob(employee?.jobId || '');
  const competencies = competencyService.getCompetenciesByJob(employee?.jobId || '');
  const employeeEvals = evaluations.filter(e => e.employeeId === employee?.id);

  const productivitySummary = competencyService.getEmployeeProductivitySummary(employee?.id || '');

  // Setup Real-time Listener for instantaneous evaluator updates
  useEffect(() => {
    const unsubscribe = competencyService.subscribe((eventType, payload) => {
      setEvaluations(competencyService.getAllEvaluations());
      setEmployees(competencyService.getEmployees());
      const nowStr = new Date().toLocaleTimeString('fa-IR');
      setLastSyncTime(nowStr);

      if (eventType === 'evaluation_updated' && payload?.employeeId === selectedEmployeeId) {
        setLastUpdatedCompId(payload?.competencyId || null);
        setSyncAlert(`تغییرات نمره ارزیاب در ساعت ${nowStr} دریافت و اعمال شد.`);
        setTimeout(() => {
          setSyncAlert(null);
          setLastUpdatedCompId(null);
        }, 5000);
      }
    });

    const handleWindowLiveEvent = (e: any) => {
      setEvaluations(competencyService.getAllEvaluations());
      setLastSyncTime(new Date().toLocaleTimeString('fa-IR'));
    };

    window.addEventListener('competency_live_update', handleWindowLiveEvent);

    return () => {
      unsubscribe();
      window.removeEventListener('competency_live_update', handleWindowLiveEvent);
    };
  }, [selectedEmployeeId]);

  // Load AI Analysis for IDP
  useEffect(() => {
    if (employee) {
      setLoadingAi(true);
      competencyService.fetchAIAnalysis(employee.id).then(res => {
        setAiAnalysis(res);
        setLoadingAi(false);
      });
    }
  }, [selectedEmployeeId]);

  const handleExportExcel = () => {
    exportCompetencyMatrixToExcel({
      jobs: competencyService.getJobs(),
      duties: competencyService.getAllDuties(),
      competencies,
      employees,
      evaluations,
      selectedJobTitle: job?.title,
      selectedEmployee: employee
    });
  };

  const handlePrintReport = () => {
    if (!employee) return;
    const prod = productivitySummary;
    const tableRows = competencies.map((c, i) => {
      const ev = employeeEvals.find(e => e.competencyId === c.id);
      const score = ev?.score || 0;
      const gap = score > 0 ? score - c.expectedScore : 0;
      const statusBadge = score === 0 
        ? '<span class="badge badge-warning">ارزیابی‌نشده</span>'
        : gap >= 0 
          ? '<span class="badge badge-success">منطبق (' + (gap > 0 ? '+' + gap : '0') + ')</span>' 
          : '<span class="badge badge-danger">شکاف (' + gap + ')</span>';

      return `
        <tr>
          <td style="text-align: center;">${i + 1}</td>
          <td><strong>${c.title}</strong></td>
          <td>${getPersianLevel(c.level)}</td>
          <td>${getPersianImpact(c.impact)}</td>
          <td style="text-align: center;">سطح ${c.proficiencyLevel} از ۵</td>
          <td style="text-align: center;"><strong>${c.expectedScore}٪</strong></td>
          <td style="text-align: center; font-weight: bold; color: ${score >= c.expectedScore ? '#166534' : '#9f1239'};">${score > 0 ? score + '٪' : '-'}</td>
          <td style="text-align: center;">${statusBadge}</td>
          <td><small>${ev?.notes || c.evaluationCriteria || '-'}</small></td>
        </tr>
      `;
    }).join('');

    const html = `
      <div class="person-badge-box">
        <div><span>نام پرسنل:</span> <strong>${employee.name}</strong></div>
        <div><span>کد پرسنلی:</span> <strong>${employee.personnelCode}</strong></div>
        <div><span>درجه / رتبه:</span> <strong>${employee.rank}</strong></div>
        <div><span>ردیف شغلی:</span> <strong>${job?.title || '-'}</strong></div>
        <div><span>یگان خدمتی:</span> <strong>${employee.unit}</strong></div>
        <div><span>شاخص کل بهره‌وری:</span> <strong style="color: #166534;">${prod?.productivityIndex || 0}٪</strong></div>
        <div><span>تعداد شایستگی‌ها:</span> <strong>${competencies.length} مورد</strong></div>
        <div><span>آخرین همگام‌سازی:</span> <strong>${lastSyncTime}</strong></div>
      </div>

      <h4 style="margin: 12px 0 6px; font-weight: bold; color: #0f172a;">کارنامه جامع شایستگی و ارزیابی عملکرد فراجا</h4>
      <table>
        <thead>
          <tr>
            <th style="width: 5%;">ردیف</th>
            <th style="width: 25%;">عنوان شایستگی</th>
            <th style="width: 12%;">سطح کارکرد</th>
            <th style="width: 14%;">سطح اثرگذاری</th>
            <th style="width: 9%;">سطح تسلط</th>
            <th style="width: 9%;">نمره هدف</th>
            <th style="width: 9%;">نمره مکتسبه</th>
            <th style="width: 9%;">وضعیت</th>
            <th style="width: 18%;">ملاحظات و معیار</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
    printCompetencyReport(`کارنامه_شایستگی_${employee?.name}`, html);
  };

  const getBarColor = (actual: number, expected: number) => {
    if (actual === 0) return 'bg-slate-200';
    if (actual >= expected) return 'bg-emerald-500';
    if (actual >= expected - 10) return 'bg-amber-400';
    return 'bg-rose-500';
  };

  // Group competencies by proficiency level
  const competenciesByProficiency = [5, 4, 3, 2, 1].map(level => ({
    level,
    label: PROFICIENCY_LABELS[level],
    items: competencies.filter(c => c.proficiencyLevel === level)
  })).filter(g => g.items.length > 0);

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Real-time sync alert banner if updated */}
      {syncAlert && (
        <div className="p-3.5 bg-emerald-900 text-emerald-100 border border-emerald-700 rounded-3xl flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in duration-300 shadow-md">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{syncAlert}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded-xl">
            به‌روزرسانی خودکار
          </span>
        </div>
      )}

      {/* Top Banner: Employee Profile Selector & Action Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Employee Info & Selector */}
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
            {employee?.name.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-[10px] font-black text-slate-400">مشاهده کارنامه پرسنل:</label>
              <select
                value={selectedEmployeeId}
                onChange={e => setSelectedEmployeeId(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1 text-xs font-black text-slate-900 focus:outline-none focus:bg-white"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.rank})</option>
                ))}
              </select>

              {/* Real-time Indicator */}
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>برخط (همگام: {lastSyncTime})</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-1">
              شغل: <strong className="text-slate-800">{job?.title}</strong> • کد پرسنلی: {employee?.personnelCode} • {employee?.unit}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
          
          <button 
            onClick={() => setViewMode('tree')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'tree' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            نمودار درختی پویا
          </button>

          <button 
            onClick={() => setViewMode('radar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'radar' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-rose-400" />
            رادار مهارتی و تحلیل شکاف
          </button>

          <button 
            onClick={() => setViewMode('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'matrix' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            ماتریس تطابق (۵×۴)
          </button>

          <button 
            onClick={() => setViewMode('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'profile' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
            کارنامه سطوح تسلط
          </button>

          <button 
            onClick={() => setViewMode('productivity')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'productivity' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            بهره‌وری وظایف
          </button>

          <button 
            onClick={() => setViewMode('idp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'idp' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            برنامه توسعه (IDP)
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-xs"
            title="دانلود فایل استاندارد اکسل فراجا"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            اکسل (.xlsx)
          </button>

          <button
            onClick={handlePrintReport}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition"
            title="چاپ و نسخه رسمی PDF فراجا"
          >
            <Printer className="w-4 h-4 text-sky-600" />
            چاپ / PDF
          </button>
        </div>

      </div>

      {/* VIEW 0: DYNAMIC TREE VIEW (PRIMARY REQUEST) */}
      {viewMode === 'tree' && employee && (
        <div className="animate-in fade-in duration-300">
          <DynamicCompetencyTree
            employee={employee}
            job={job}
            duties={duties}
            competencies={competencies}
            evaluations={employeeEvals}
            lastUpdatedCompId={lastUpdatedCompId}
          />
        </div>
      )}

      {/* VIEW: RADAR & GAP ANALYSIS */}
      {viewMode === 'radar' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Radar Overview & Metrics */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <Target className="w-5 h-5" />
                </span>
                <h3 className="text-base font-black text-slate-900">
                  رادار شایستگی‌های {employee?.name} در برابر استاندارد مصوب شغل
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                این نمودار راداری چند محوره، نمرات واقعی ارزیابی‌شده شما در شایستگی‌های تخصصی، عمومی و محوری را مستقیماً با حدنصاب استاندارد تعیین‌شده برای شغل سازمانی <strong className="text-slate-800">{job?.title}</strong> مقایسه می‌کند.
              </p>
            </div>

            {/* Quick Status Chips */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span>وضعیت فعلی شما (کسب‌شده)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>استاندارد مصوب شغل</span>
              </div>
            </div>
          </div>

          {/* Main Radar Card & Side Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 360 Radar Chart */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-xs md:text-sm font-black text-slate-800 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  نگاشت راداری شایستگی‌های شغلی
                </h4>
                <span className="text-[11px] font-bold text-slate-400">
                  {competencies.length} محور شایستگی
                </span>
              </div>

              <div className="h-[360px] w-full flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%" 
                    data={competencies.map(c => {
                      const ev = employeeEvals.find(e => e.competencyId === c.id);
                      return {
                        subject: c.title.length > 25 ? c.title.slice(0, 25) + '...' : c.title,
                        fullTitle: c.title,
                        actual: ev?.score || 0,
                        expected: c.expectedScore,
                        gap: (ev?.score || 0) - c.expectedScore
                      };
                    })}
                  >
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} 
                    />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-right text-xs space-y-1.5 z-50">
                              <p className="font-black text-indigo-200 border-b border-slate-800 pb-1">{data.fullTitle}</p>
                              <div className="flex justify-between items-center gap-4 text-slate-300">
                                <span>نمره کسب‌شده:</span>
                                <span className="font-mono font-black text-white">{data.actual}٪</span>
                              </div>
                              <div className="flex justify-between items-center gap-4 text-slate-300">
                                <span>استاندارد مصوب:</span>
                                <span className="font-mono font-black text-emerald-400">{data.expected}٪</span>
                              </div>
                              <div className="flex justify-between items-center gap-4 pt-1 border-t border-slate-800">
                                <span>تفاضل (شکاف):</span>
                                <span className={`font-mono font-black ${data.gap >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {data.gap >= 0 ? `+${data.gap} (مطلوب)` : `${data.gap} (نیاز به ارتقا)`}
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Radar 
                      name="نمره شما (کسب‌شده)" 
                      dataKey="actual" 
                      stroke="#4f46e5" 
                      strokeWidth={3} 
                      fill="#6366f1" 
                      fillOpacity={0.35} 
                      dot={{ r: 4, fill: '#4f46e5', strokeWidth: 1, stroke: '#ffffff' }}
                    />
                    <Radar 
                      name="استاندارد مصوب شغل" 
                      dataKey="expected" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      fill="#10b981" 
                      fillOpacity={0.15} 
                      strokeDasharray="4 4"
                      dot={{ r: 3, fill: '#10b981' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <span className="w-3 h-3 rounded-full bg-indigo-600"></span> نمره کسب‌شده
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span> استاندارد مصوب شغل
                </span>
              </div>
            </div>

            {/* Gap Analysis Cards & Statistics */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] font-black">
                    <span>نقاط قوت و ممتاز</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-slate-900">
                      {competencies.filter(c => (employeeEvals.find(e => e.competencyId === c.id)?.score || 0) >= c.expectedScore).length}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 mr-1.5">شایستگی برتر</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] font-black">
                    <span>اولویت‌های توسعه و آموزش</span>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-slate-900">
                      {competencies.filter(c => (employeeEvals.find(e => e.competencyId === c.id)?.score || 0) < c.expectedScore).length}
                    </span>
                    <span className="text-[10px] font-bold text-rose-700 mr-1.5">دارای شکاف</span>
                  </div>
                </div>
              </div>

              {/* Recommended Action Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h4 className="text-xs font-black text-white">توصیه هوشمند توسعه شایستگی</h4>
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  بر اساس تحلیل راداری فوق، نقاط قوت اصلی شما در حوزه‌های «هوشیاری محیطی» و «رضایتمندی عمومی» قرار دارد. برای رسیدن به ۱۰۰٪ حدنصاب، دوره‌های تکمیلی مسیریابی و تجسس در برنامه IDP برای شما فعال شده است.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setViewMode('idp')}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    مشاهده دوره‌های پیشنهادی در برنامه IDP
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Competency Gap List with Interactive Filters */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-indigo-600" />
                  تحلیل موشکافانه شکاف شایستگی‌ها (Competency Gap Breakdown)
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  مقایسه جزئی نمرات کسب‌شده با حدنصاب استاندارد شغل به تفکیک مهارت‌ها
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setRadarFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                    radarFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  همه ({competencies.length})
                </button>
                <button
                  onClick={() => setRadarFilter('strengths')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                    radarFilter === 'strengths' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  نقاط قوت ({competencies.filter(c => (employeeEvals.find(e => e.competencyId === c.id)?.score || 0) >= c.expectedScore).length})
                </button>
                <button
                  onClick={() => setRadarFilter('gaps')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                    radarFilter === 'gaps' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  نیازمند ارتقا ({competencies.filter(c => (employeeEvals.find(e => e.competencyId === c.id)?.score || 0) < c.expectedScore).length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competencies
                .filter(c => {
                  const ev = employeeEvals.find(e => e.competencyId === c.id);
                  const actual = ev?.score || 0;
                  if (radarFilter === 'strengths') return actual >= c.expectedScore;
                  if (radarFilter === 'gaps') return actual < c.expectedScore;
                  return true;
                })
                .map(comp => {
                  const ev = employeeEvals.find(e => e.competencyId === comp.id);
                  const actual = ev?.score || 0;
                  const expected = comp.expectedScore;
                  const gap = actual - expected;
                  const isPositive = gap >= 0;

                  return (
                    <div 
                      key={comp.id}
                      className={`p-4 rounded-2xl border bg-white shadow-2xs space-y-3 flex flex-col justify-between ${
                        actual === 0 
                          ? 'border-slate-200' 
                          : isPositive 
                            ? 'border-emerald-200 hover:border-emerald-300' 
                            : 'border-rose-200 hover:border-rose-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-black text-xs text-slate-800 leading-snug">{comp.title}</h5>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0 ${
                            isPositive ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {isPositive ? `+${gap} مطلوب` : `${gap} شکاف`}
                          </span>
                        </div>

                        {comp.description && (
                          <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                            {comp.description}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                          <span>نمره کسب‌شده: <strong className="text-slate-900 font-black">{actual}٪</strong></span>
                          <span>استاندارد مصوب: <strong className="text-slate-900 font-black">{expected}٪</strong></span>
                        </div>

                        <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                          <div 
                            className={`h-full ${getBarColor(actual, expected)}`} 
                            style={{ width: `${actual}%` }}
                          ></div>
                        </div>

                        {ev?.notes && (
                          <p className="text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <strong>ارزیاب:</strong> {ev.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 1: Profile & Proficiency Breakdown */}
      {viewMode === 'profile' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400">شاخص کل بهره‌وری:</span>
                <h4 className="text-xl font-black text-slate-900">%{productivitySummary?.productivityIndex || 0}</h4>
                <span className="text-[10px] font-bold text-emerald-700">منطبق بر شاخص‌های فراجا</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400">میانگین نمرات ارزیاب:</span>
                <h4 className="text-xl font-black text-slate-900">{productivitySummary?.avgScore || 0} <span className="text-xs text-slate-400">از ۱۰۰</span></h4>
                <span className="text-[10px] font-bold text-indigo-700">ارزیابی شده در تمام محورها</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400">شایستگی‌های ممتاز و مسلط:</span>
                <h4 className="text-xl font-black text-slate-900">{productivitySummary?.strengthCount || 0} <span className="text-xs text-slate-400">مهارت</span></h4>
                <span className="text-[10px] font-bold text-teal-700">نمره مساوی یا بالاتر از هدف</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-black">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400">شایستگی‌های در اولویت ارتقا:</span>
                <h4 className="text-xl font-black text-slate-900">{productivitySummary?.gapCount || 0} <span className="text-xs text-slate-400">مورد</span></h4>
                <span className="text-[10px] font-bold text-rose-700">پیشنهاد شده در دوره‌های آموزشی</span>
              </div>
            </div>
          </div>

          {/* Competency Grouped Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-600" />
                کارنامه تفکیکی سطوح تسلط مهارتی (۱ تا ۵)
              </h2>
              <span className="text-xs text-slate-500 font-bold">{competencies.length} شایستگی موظف</span>
            </div>

            {competenciesByProficiency.map(group => (
              <div key={group.level} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <h3 className="font-black text-slate-700 text-xs md:text-sm flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200/60">
                    سطح تسلط {group.level}: {group.label}
                    <span className="w-5 h-5 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                      {group.items.length}
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map(comp => {
                    const evalData = employeeEvals.find(e => e.competencyId === comp.id);
                    const actual = evalData?.score || 0;
                    const expected = comp.expectedScore;
                    const gap = actual - expected;
                    const gapText = actual === 0 ? 'ارزیابی نشده' : gap >= 0 ? `+${gap} بالاتر از هدف` : `${gap} شکاف مهارت`;
                    const gapBadge = actual === 0 
                      ? 'bg-slate-100 text-slate-500' 
                      : gap >= 0 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-rose-50 text-rose-800 border-rose-200';

                    return (
                      <div 
                        key={comp.id} 
                        className={`bg-white border rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 ${
                          lastUpdatedCompId === comp.id ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-extrabold text-xs md:text-sm text-slate-900 leading-snug">
                              {comp.title}
                            </h4>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border shrink-0 ${gapBadge}`}>
                              {gapText}
                            </span>
                          </div>

                          {comp.description && (
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                              {comp.description}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-[10px] font-black">
                            <span className="text-slate-400">نمره هدف: {expected}٪</span>
                            <span className={actual >= expected ? 'text-emerald-700 font-extrabold' : 'text-slate-700 font-extrabold'}>
                              امتیاز کسب‌شده: {actual > 0 ? `${actual}٪` : '-'}
                            </span>
                          </div>

                          <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                            <div className={`h-full ${getBarColor(actual, expected)} transition-all duration-500`} style={{ width: `${actual}%` }}></div>
                          </div>

                          {evalData?.notes && (
                            <div className="bg-slate-50 p-2 rounded-xl text-[10px] text-slate-700 font-medium border border-slate-100">
                              <span className="font-bold text-slate-900">بازخورد ارزیاب: </span>
                              {evalData.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: 5x4 Impact & Function Matrix */}
      {viewMode === 'matrix' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-sm md:text-base text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" /> ماتریس تطابق ۵ سطح اثرگذاری و ۴ لایه کارکرد سازمانی
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                توزیع نمرات ارزیابی شده کارمند ({employee?.name}) در برابر مقادیر هدف
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> بالاتر از هدف
              </span>
              <span className="flex items-center gap-1.5 text-rose-800">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> نیازمند تقویت
              </span>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full min-w-[950px] border-collapse bg-white rounded-2xl overflow-hidden border border-slate-200">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-3.5 text-right text-xs font-black text-slate-800 w-40 border-l border-slate-200">
                    سطح اثرگذاری / کارکرد
                  </th>
                  {FUNCTIONAL_LEVELS.map(fLevel => (
                    <th key={fLevel.id} className="p-3 text-center text-xs font-black border-l border-slate-200 last:border-l-0 text-slate-800">
                      <span>{fLevel.label}</span>
                      <span className="text-[10px] font-medium text-slate-500 block mt-0.5">{fLevel.desc}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {IMPACT_LEVELS.map(impact => (
                  <tr key={impact.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Impact Level Row Header */}
                    <td className="p-3.5 border-l border-slate-200 bg-slate-50/60 align-top">
                      <span className="text-xs font-black text-slate-900 block">{impact.label}</span>
                      <span className="text-[10px] font-medium text-slate-500 block mt-1">{impact.desc}</span>
                    </td>

                    {/* 4 Functional columns */}
                    {FUNCTIONAL_LEVELS.map(fLevel => {
                      const matched = competencies.filter(c => c.impact === impact.id && c.level === fLevel.id);
                      return (
                        <td key={fLevel.id} className="p-2.5 border-l border-slate-200 last:border-l-0 align-top min-w-[220px]">
                          {matched.length === 0 ? (
                            <div className="h-16 flex items-center justify-center text-slate-300 text-xs font-bold border border-dashed border-slate-100 rounded-xl">
                              -
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {matched.map(comp => {
                                const ev = employeeEvals.find(e => e.competencyId === comp.id);
                                const actual = ev?.score || 0;
                                const expected = comp.expectedScore;
                                const isPassed = actual >= expected;

                                return (
                                  <div 
                                    key={comp.id} 
                                    className={`p-3 rounded-2xl border bg-white shadow-2xs space-y-2 ${
                                      actual === 0 ? 'border-slate-200' : isPassed ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-rose-300 ring-1 ring-rose-100'
                                    }`}
                                  >
                                    <h5 className="font-black text-xs text-slate-800 leading-snug">{comp.title}</h5>
                                    
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                      <span className="text-slate-400">هدف: {expected}٪</span>
                                      <span className={actual >= expected ? 'text-emerald-700 font-black' : 'text-rose-700 font-black'}>
                                        کسب‌شده: {actual > 0 ? `${actual}٪` : 'ثبت‌نشده'}
                                      </span>
                                    </div>

                                    <div className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden">
                                      <div className={`h-full ${getBarColor(actual, expected)}`} style={{ width: `${actual}%` }}></div>
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
        </div>
      )}

      {/* VIEW 3: Duties & Productivity Formula Calculation */}
      {viewMode === 'productivity' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              سنجش شاخص‌های عملکرد وظایف و فرمول‌های بهره‌وری
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              فرمول‌های محاسبه عملکرد برای شغل سازمانی {job?.title}
            </p>
          </div>

          <div className="space-y-4">
            {duties.map((duty, idx) => {
              const dutyComps = competencies.filter(c => c.dutyId === duty.id);
              const evaluatedDutyComps = dutyComps.filter(c => employeeEvals.some(e => e.competencyId === c.id));
              const dutyAvg = dutyComps.length > 0 
                ? Math.round(dutyComps.reduce((acc, c) => acc + (employeeEvals.find(e => e.competencyId === c.id)?.score || 0), 0) / dutyComps.length) 
                : 0;

              return (
                <div key={duty.id} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-black text-sm text-slate-900">{duty.title}</h4>
                    </div>
                    <span className="bg-slate-200 text-slate-800 text-xs font-black px-3 py-1 rounded-xl">
                      میانگین عملکرد وظیفه: {dutyAvg}٪
                    </span>
                  </div>

                  {duty.description && (
                    <p className="text-xs text-slate-600 font-medium pr-8 leading-relaxed">
                      {duty.description}
                    </p>
                  )}

                  {duty.formula && (
                    <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl mr-8">
                      <span className="text-[10px] font-black text-emerald-800 block mb-1">
                        فرمول و نحوه محاسبه شاخص کلیدی عملکرد (KPI):
                      </span>
                      <span className="text-xs text-emerald-950 font-black">{duty.formula}</span>
                    </div>
                  )}

                  {/* Connected Competencies */}
                  <div className="mr-8 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 block mb-2">شایستگی‌های متصل به این وظیفه:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {dutyComps.map(c => {
                        const ev = employeeEvals.find(e => e.competencyId === c.id);
                        return (
                          <span key={c.id} className="bg-white border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                            {c.title}
                            <strong className="text-indigo-600">({ev?.score || 0}٪)</strong>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: AI Individual Development Plan (IDP) */}
      {viewMode === 'idp' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                برنامه توسعه فردی هوشمند (IDP) مبتنی بر هوش مصنوعی
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                تحلیل شکاف‌های عملکردی {employee?.name} و پیشنهاد دوره‌های آموزشی و منتورینگ
              </p>
            </div>
            <span className="bg-indigo-50 text-indigo-800 text-xs font-black px-3.5 py-1.5 rounded-2xl border border-indigo-100">
              تحلیل با هوش مصنوعی
            </span>
          </div>

          {loadingAi ? (
            <div className="py-16 text-center text-slate-400 text-xs font-bold flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
              در حال تولید و تحلیل برنامه توسعه فردی هوشمند...
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-6">
              
              {/* Productivity Overview Box */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">سطح شایستگی و آمادگی ارتقا:</span>
                  <span className="bg-white text-indigo-900 font-black text-xs px-3 py-1 rounded-xl shadow-2xs border border-slate-200">
                    {aiAnalysis.competencyLevelText}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed pt-1">
                  {aiAnalysis.productivityAnalysis}
                </p>
              </div>

              {/* Strengths and Gaps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 p-5 rounded-3xl border border-emerald-200 space-y-3">
                  <h4 className="font-black text-xs md:text-sm text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> نقاط قوت و شایستگی‌های برجسته
                  </h4>
                  <ul className="space-y-2">
                    {aiAnalysis.strengths?.map((str: string, i: number) => (
                      <li key={i} className="text-xs text-emerald-950 font-bold flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/60 p-5 rounded-3xl border border-amber-200 space-y-3">
                  <h4 className="font-black text-xs md:text-sm text-amber-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700" /> شکاف‌های مهارتی نیازمند تقویت
                  </h4>
                  <ul className="space-y-2">
                    {aiAnalysis.improvementGaps?.map((gap: string, i: number) => (
                      <li key={i} className="text-xs text-amber-950 font-bold flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* IDP Course Recommendations */}
              <div className="space-y-3">
                <h4 className="font-black text-xs md:text-sm text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  دوره‌های آموزشی و اقدامات پیشنهادی مربی‌گری (IDP):
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiAnalysis.idpRecommendations?.map((rec: any, idx: number) => (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-2xs hover:border-indigo-300 transition-all">
                      <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {rec.type}
                      </span>
                      <h5 className="font-black text-xs text-slate-900 leading-snug">{rec.title}</h5>
                      <div className="text-[10px] font-medium text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                        <div>مهارت هدف: <strong className="text-slate-800">{rec.targetSkill}</strong></div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" /> مدت دوره: {rec.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs font-bold">
              اطلاعات برنامه توسعه فردی بارگذاری نشد.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
