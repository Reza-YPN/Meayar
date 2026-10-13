import React, { useState, useMemo } from 'react';
import {
  GitBranch,
  ChevronDown,
  ChevronLeft,
  Search,
  Maximize2,
  Minimize2,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Briefcase,
  Shield,
  Zap,
  Info,
  Radio,
  FileText,
  Target
} from 'lucide-react';
import {
  Employee,
  Job,
  Duty,
  Competency,
  CompetencyEvaluation,
  ProficiencyLevel,
  CompetencyLevel,
  CompetencyImpact
} from '../../services/competencyService';
import { getPersianImpact, getPersianLevel, getPersianType } from '../../utils/exportUtils';

interface DynamicCompetencyTreeProps {
  employee: Employee;
  job?: Job;
  duties: Duty[];
  competencies: Competency[];
  evaluations: CompetencyEvaluation[];
  lastUpdatedCompId?: string | null;
}

type TreeGrouping = 'duty' | 'functional' | 'proficiency';
type FilterStatus = 'all' | 'strength' | 'gap';

const PROFICIENCY_NAMES: Record<number, { title: string; color: string; bg: string }> = {
  5: { title: 'سطح ۵: خبرگی و الگوی سازمانی', color: 'text-indigo-900', bg: 'bg-indigo-50 border-indigo-200' },
  4: { title: 'سطح ۴: تسلط کامل و پیشرفته', color: 'text-blue-900', bg: 'bg-blue-50 border-blue-200' },
  3: { title: 'سطح ۳: تسلط پایه و استاندارد', color: 'text-teal-900', bg: 'bg-teal-50 border-teal-200' },
  2: { title: 'سطح ۲: در حال توسعه و بهبود', color: 'text-amber-900', bg: 'bg-amber-50 border-amber-200' },
  1: { title: 'سطح ۱: مقدماتی و آشنایی', color: 'text-slate-800', bg: 'bg-slate-50 border-slate-200' },
};

export function DynamicCompetencyTree({
  employee,
  job,
  duties,
  competencies,
  evaluations,
  lastUpdatedCompId
}: DynamicCompetencyTreeProps) {
  const [grouping, setGrouping] = useState<TreeGrouping>('duty');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track open/collapsed state of nodes
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [selectedCompForDetail, setSelectedCompForDetail] = useState<Competency | null>(null);

  const toggleNode = (nodeId: string) => {
    setCollapsedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const expandAll = () => setCollapsedNodes({});
  const collapseAll = () => {
    const map: Record<string, boolean> = {};
    duties.forEach(d => { map[`duty_${d.id}`] = true; });
    [5, 4, 3, 2, 1].forEach(l => { map[`prof_${l}`] = true; });
    ['individual', 'team', 'organizational', 'social'].forEach(f => { map[`func_${f}`] = true; });
    ['input', 'process', 'product', 'output', 'outcome'].forEach(imp => { map[`imp_${imp}`] = true; });
    setCollapsedNodes(map);
  };

  // Helper to get evaluation score for a competency
  const getEval = (compId: string) => evaluations.find(e => e.competencyId === compId);

  // Filter competencies based on search and status
  const filteredCompetencies = useMemo(() => {
    return competencies.filter(c => {
      const ev = getEval(c.id);
      const score = ev?.score ?? 0;
      const gap = score - c.expectedScore;
      const isStrength = gap >= 0;

      // Status filter
      if (filterStatus === 'strength' && !isStrength) return false;
      if (filterStatus === 'gap' && isStrength) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(query);
        const matchDesc = c.description?.toLowerCase().includes(query);
        const matchDuty = duties.find(d => d.id === c.dutyId)?.title.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchDuty) return false;
      }

      return true;
    });
  }, [competencies, evaluations, filterStatus, searchQuery, duties]);

  // Calculate overall metrics for display in root
  const totalEvaluated = competencies.filter(c => getEval(c.id) !== undefined).length;
  const strengthCount = competencies.filter(c => {
    const ev = getEval(c.id);
    return ev && ev.score >= c.expectedScore;
  }).length;
  const gapCount = totalEvaluated - strengthCount;
  const avgScore = totalEvaluated > 0 
    ? Math.round(competencies.reduce((acc, c) => acc + (getEval(c.id)?.score || 0), 0) / totalEvaluated)
    : 0;

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Controls & Filter Bar */}
      <div className="bg-white p-4 md:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Structure Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setGrouping('duty')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              grouping === 'duty' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            درخت شرح وظایف شغلی
          </button>
          
          <button
            onClick={() => setGrouping('functional')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              grouping === 'functional' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            درخت لایه‌های کارکردی (۴ لایه)
          </button>

          <button
            onClick={() => setGrouping('proficiency')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              grouping === 'proficiency' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            درخت سطوح تسلط (۱ تا ۵)
          </button>
        </div>

        {/* Search & Expansion Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در شاخه‌های درخت..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-44 md:w-56 bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as FilterStatus)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 transition"
          >
            <option value="all">همه شایستگی‌ها</option>
            <option value="strength">فقط نقاط قوت (+)</option>
            <option value="gap">فقط شکاف‌های عملکردی (-)</option>
          </select>

          {/* Expand/Collapse All */}
          <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-1">
            <button
              onClick={expandAll}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1 transition"
              title="باز کردن همه شاخه‌ها"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">گسترش همه</span>
            </button>
            <button
              onClick={collapseAll}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1 transition"
              title="بستن همه شاخه‌ها"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">جمع‌کردن</span>
            </button>
          </div>

        </div>

      </div>

      {/* Root Node: Employee & Overall Standing */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 md:p-6 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-inner shrink-0">
              {employee.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-indigo-800/80 text-indigo-200 px-2 py-0.5 rounded-md font-extrabold">
                  ریشه اصلی ساختار شایستگی
                </span>
                <span className="text-xs text-slate-400 font-medium">کد پرسنلی: {employee.personnelCode}</span>
              </div>
              <h2 className="text-base md:text-lg font-black text-white mt-0.5">
                {employee.rank} {employee.name}
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                {job?.title || 'عنوان شغلی'} • {employee.unit}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-2xl text-center min-w-[90px]">
              <span className="text-[10px] text-slate-400 font-bold block">میانگین امتیاز</span>
              <span className="text-base font-black text-emerald-400">{avgScore}٪</span>
            </div>

            <div className="bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-2xl text-center min-w-[90px]">
              <span className="text-[10px] text-slate-400 font-bold block">نقاط قوت مهارتی</span>
              <span className="text-base font-black text-teal-300">{strengthCount} مورد</span>
            </div>

            <div className="bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-2xl text-center min-w-[90px]">
              <span className="text-[10px] text-slate-400 font-bold block">شکاف عملکردی</span>
              <span className="text-base font-black text-rose-300">{gapCount} مورد</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Visualization Canvas */}
      <div className="space-y-6">
        
        {/* GROUPING 1: Job Duties Tree Hierarchy */}
        {grouping === 'duty' && (
          <div className="space-y-6">
            {duties.map((duty, dIdx) => {
              const dutyComps = filteredCompetencies.filter(c => c.dutyId === duty.id);
              if (dutyComps.length === 0 && searchQuery) return null;

              const isCollapsed = !!collapsedNodes[`duty_${duty.id}`];
              const evaluatedDutyComps = dutyComps.filter(c => getEval(c.id) !== undefined);
              const dutyAvg = evaluatedDutyComps.length > 0
                ? Math.round(evaluatedDutyComps.reduce((acc, c) => acc + (getEval(c.id)?.score || 0), 0) / evaluatedDutyComps.length)
                : 0;

              return (
                <div key={duty.id} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                  
                  {/* Branch Level 1 Header: Duty Node */}
                  <div
                    onClick={() => toggleNode(`duty_${duty.id}`)}
                    className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-200/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                        {dIdx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md">
                            شاخه وظیفه سازمانی
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {dutyComps.length} شایستگی مرتبط
                          </span>
                        </div>
                        <h3 className="text-xs md:text-sm font-black text-slate-900 mt-0.5">
                          {duty.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {dutyAvg > 0 && (
                        <div className="text-left hidden sm:block">
                          <span className="text-[10px] font-bold text-slate-400 block">میانگین نمرات</span>
                          <span className={`text-xs font-black ${dutyAvg >= 85 ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {dutyAvg}٪
                          </span>
                        </div>
                      )}
                      <div className={`p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Branch Level 1 Content */}
                  {!isCollapsed && (
                    <div className="p-5 space-y-5 bg-white">
                      {duty.formula && (
                        <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-xs text-emerald-950 font-bold flex items-center gap-2">
                          <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>فرمول سنجش شاخص عملکرد (KPI): {duty.formula}</span>
                        </div>
                      )}

                      {/* Leaf Level: Competency Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dutyComps.map(comp => (
                          <CompetencyTreeNodeCard
                            key={comp.id}
                            comp={comp}
                            evalData={getEval(comp.id)}
                            isRecentlyUpdated={lastUpdatedCompId === comp.id}
                            onSelect={() => setSelectedCompForDetail(comp)}
                          />
                        ))}
                      </div>

                      {dutyComps.length === 0 && (
                        <p className="text-xs text-slate-400 font-medium py-3 text-center">
                          هیچ شایستگی منطبق با فیلتر در این شاخه یافت نشد.
                        </p>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* GROUPING 2: Functional Layers Hierarchy */}
        {grouping === 'functional' && (
          <div className="space-y-6">
            {(['individual', 'team', 'organizational', 'social'] as CompetencyLevel[]).map((funcLevel) => {
              const layerComps = filteredCompetencies.filter(c => c.level === funcLevel);
              if (layerComps.length === 0 && searchQuery) return null;

              const isCollapsed = !!collapsedNodes[`func_${funcLevel}`];

              return (
                <div key={funcLevel} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                  
                  <div
                    onClick={() => toggleNode(`func_${funcLevel}`)}
                    className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-200/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                        <Layers className="w-4 h-4 text-sky-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">
                          لایه کارکردی
                        </span>
                        <h3 className="text-xs md:text-sm font-black text-slate-900 mt-0.5">
                          {getPersianLevel(funcLevel)} ({layerComps.length} شایستگی)
                        </h3>
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {layerComps.map(comp => (
                          <CompetencyTreeNodeCard
                            key={comp.id}
                            comp={comp}
                            evalData={getEval(comp.id)}
                            isRecentlyUpdated={lastUpdatedCompId === comp.id}
                            onSelect={() => setSelectedCompForDetail(comp)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* GROUPING 3: Proficiency Levels (1-5) */}
        {grouping === 'proficiency' && (
          <div className="space-y-6">
            {([5, 4, 3, 2, 1] as ProficiencyLevel[]).map((profLevel) => {
              const profComps = filteredCompetencies.filter(c => c.proficiencyLevel === profLevel);
              if (profComps.length === 0 && searchQuery) return null;

              const isCollapsed = !!collapsedNodes[`prof_${profLevel}`];
              const conf = PROFICIENCY_NAMES[profLevel];

              return (
                <div key={profLevel} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                  
                  <div
                    onClick={() => toggleNode(`prof_${profLevel}`)}
                    className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-200/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                        {profLevel}
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-black text-slate-900">
                          {conf.title} ({profComps.length} شایستگی)
                        </h3>
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profComps.map(comp => (
                          <CompetencyTreeNodeCard
                            key={comp.id}
                            comp={comp}
                            evalData={getEval(comp.id)}
                            isRecentlyUpdated={lastUpdatedCompId === comp.id}
                            onSelect={() => setSelectedCompForDetail(comp)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Competency Detail Modal / Drawer */}
      {selectedCompForDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded-md">
                  شناسنامه تفصیلی برگ شایستگی
                </span>
                <h3 className="text-sm md:text-base font-black text-slate-900 mt-1">
                  {selectedCompForDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCompForDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-black transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center text-slate-600">
                  <span>سطح کارکرد:</span>
                  <strong className="text-slate-900">{getPersianLevel(selectedCompForDetail.level)}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>سطح اثرگذاری:</span>
                  <strong className="text-slate-900">{getPersianImpact(selectedCompForDetail.impact)}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>سطح تسلط مورد انتظار:</span>
                  <strong className="text-slate-900">سطح {selectedCompForDetail.proficiencyLevel} از ۵</strong>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>نمره هدف فراجا:</span>
                  <strong className="text-emerald-700 font-black">{selectedCompForDetail.expectedScore}٪</strong>
                </div>
              </div>

              {selectedCompForDetail.description && (
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">شرح و تعاریف رفتاری:</span>
                  <p className="text-slate-800 font-medium leading-relaxed">{selectedCompForDetail.description}</p>
                </div>
              )}

              {selectedCompForDetail.evaluationCriteria && (
                <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/70">
                  <span className="text-[10px] font-black text-emerald-700 block mb-1">معیار ارزیابی و شواهد سنجش (KPI):</span>
                  <p className="text-emerald-950 font-bold leading-relaxed">{selectedCompForDetail.evaluationCriteria}</p>
                </div>
              )}

              {/* Evaluator notes if any */}
              {(() => {
                const ev = getEval(selectedCompForDetail.id);
                return ev ? (
                  <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-200/70">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-indigo-700">نمره ثبت‌شده توسط ارزیاب:</span>
                      <span className="text-xs font-black text-indigo-950">{ev.score} از ۱۰۰</span>
                    </div>
                    {ev.notes && (
                      <p className="text-indigo-900 text-xs font-medium">{ev.notes}</p>
                    )}
                  </div>
                ) : null;
              })()}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCompForDetail(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-5 py-2.5 rounded-xl transition"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Sub-component: Individual Competency Card Node in Tree
function CompetencyTreeNodeCard({
  comp,
  evalData,
  isRecentlyUpdated,
  onSelect
}: {
  comp: Competency;
  evalData?: CompetencyEvaluation;
  isRecentlyUpdated?: boolean;
  onSelect: () => void;
}) {
  const actualScore = evalData?.score ?? 0;
  const isEvaluated = evalData !== undefined;
  const gap = actualScore - comp.expectedScore;
  const isStrength = gap >= 0;

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative overflow-hidden ${
        isRecentlyUpdated 
          ? 'ring-2 ring-emerald-500 bg-emerald-50/70 shadow-lg scale-[1.02]' 
          : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
      }`}
    >
      {/* Real-time sync pulse badge */}
      {isRecentlyUpdated && (
        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
          <Radio className="w-2.5 h-2.5" />
          <span>تغییر برخط</span>
        </div>
      )}

      {/* Header tags */}
      <div className="flex items-center justify-between gap-1.5">
        <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
          {getPersianImpact(comp.impact)}
        </span>
        <span className="text-[10px] font-bold text-slate-500">
          سطح {comp.proficiencyLevel} از ۵
        </span>
      </div>

      {/* Title */}
      <h4 className="font-black text-xs text-slate-900 leading-snug line-clamp-2">
        {comp.title}
      </h4>

      {/* Target vs Actual Progress */}
      <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-500">هدف: {comp.expectedScore}٪</span>
          <span className={`font-black ${
            !isEvaluated ? 'text-slate-400' : isStrength ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            {isEvaluated ? `${actualScore}٪` : 'ارزیابی نشده'}
          </span>
        </div>

        {/* Linear score bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
          <div
            className={`h-full transition-all duration-500 ${
              !isEvaluated ? 'bg-slate-300' : isStrength ? 'bg-emerald-600' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, actualScore))}%` }}
          />
        </div>
      </div>

      {/* Gap / Status Badge & Quick Footnote */}
      <div className="flex items-center justify-between pt-0.5 text-[10px] font-bold">
        {isEvaluated ? (
          <span className={`px-2 py-0.5 rounded-md font-extrabold flex items-center gap-1 ${
            isStrength ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {isStrength ? <CheckCircle2 className="w-3 h-3 text-emerald-700" /> : <AlertTriangle className="w-3 h-3 text-rose-700" />}
            {gap >= 0 ? `+${gap} مطلوب` : `${gap} شکاف عملکردی`}
          </span>
        ) : (
          <span className="text-slate-400">در انتظار ارزیابی</span>
        )}

        <span className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5">
          جزئیات
          <ChevronLeft className="w-3 h-3" />
        </span>
      </div>

    </div>
  );
}
