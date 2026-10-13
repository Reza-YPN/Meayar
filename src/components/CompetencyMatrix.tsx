import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Competency, Job, KPI, KPIMapping, Department } from '../types';
import { IMPACT_LEVELS, FUNCTION_LEVELS, ROLE_TYPES, IMPORTANCE_LEVELS, getCompetencyColorClass } from '../constants';
import { Info, User, Users, Building2, Globe2, ArrowRightFromLine, RefreshCw, Box, LogOut, Target, Zap, Sparkles, Loader2, BrainCircuit, Briefcase, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeCompetencyMatrix } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  jobs: Job[];
  activeJobId: string | null;
  setActiveJobId: (id: string | null) => void;
  departments?: Department[];
  activeJob: Job | null;
  competencies: Competency[];
  mappings: KPIMapping[];
  kpis: KPI[];
  empResults?: any[];
}

const getImportanceIcon = (level: string) => {
    switch (level) {
      case 'Very High': return <span className="text-[14px]">⇈</span>;
      case 'High': return <span className="text-[14px]">↑</span>;
      case 'Low': return <span className="text-[14px]">↓</span>;
      case 'Very Low': return <span className="text-[14px]">⇊</span>;
      default: return <span>-</span>;
    }
  };

  const getFunctionIcon = (level: string) => {
    switch (level) {
        case 'Individual': return <User size={20} className="mb-1 opacity-60" />;
        case 'Team': return <Users size={20} className="mb-1 opacity-60" />;
        case 'Organizational': return <Building2 size={20} className="mb-1 opacity-60" />;
        case 'Social': return <Globe2 size={20} className="mb-1 opacity-60" />;
        default: return null;
    }
  };

  const getImpactIcon = (level: string) => {
    switch (level) {
        case 'Input': return <ArrowRightFromLine size={20} className="mb-2 opacity-60" />;
        case 'Process': return <RefreshCw size={20} className="mb-2 opacity-60" />;
        case 'Product': return <Box size={20} className="mb-2 opacity-60" />;
        case 'Output': return <LogOut size={20} className="mb-2 opacity-60" />;
        case 'Outcome': return <Target size={20} className="mb-2 opacity-60" />;
        case 'Impact': return <Zap size={20} className="mb-2 opacity-60" />;
        default: return null;
    }
  };

export const JobMatrixCard = ({ 
    job, 
    competencies, 
    mappings, 
    departments, 
    rowAxis, 
    filterType, 
    filterRoles, 
    filterImportance, 
    showHeatmap = false,
    empResults = null
}: any) => {
  const navigate = useNavigate();
  const jobKpiIds = job.kpis.map((k: any) => k.id);
  const relevantMappings = mappings.filter((m: any) => jobKpiIds.includes(m.kpiId));
  const mappedCompetencyIds = relevantMappings.map((m: any) => m.competencyId);
  const jobCompetencies = competencies.filter((c: any) => mappedCompetencyIds.includes(c.id));

  const dept = (departments || []).find((d: any) => d.id === job.departmentId);
  const deptComps = dept ? (dept.coreCompetencyIds || []).map((id: string) => competencies.find((c: any) => c.id === id)).filter(Boolean) as Competency[] : [];

  const allCellItems = [
    ...jobCompetencies.map((c: any) => {
      const mapping = relevantMappings.find((m: any) => m.competencyId === c.id)!;
      return {
        comp: c,
        isDeptCore: false,
        roleType: mapping?.roleType || 'Critical',
        importance: mapping?.importance || 'High',
        mapping
      };
    }),
    ...deptComps.filter((c: any) => !mappedCompetencyIds.includes(c.id)).map((c: any) => {
      return {
        comp: c,
        isDeptCore: true,
        roleType: 'Critical' as const,
        importance: 'High' as const,
        mapping: {
          id: `dept-${c.id}`,
          kpiId: '',
          competencyId: c.id,
          reasoning: c.reasoning || 'شایستگی پایه و محوری مورد نیاز برای تمامی مشاغل تخصیص یافته به این اداره/واحد.',
          roleType: 'Critical' as const,
          importance: 'High' as const,
        }
      };
    })
  ];
  
  const rowLabels = rowAxis === 'impact' ? IMPACT_LEVELS : IMPORTANCE_LEVELS;

  const getHeatmapClass = (count: number) => {
    if (!showHeatmap) return 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/30';
    if (count === 0) return 'bg-slate-50 dark:bg-slate-800/30 opacity-70';
    if (count === 1) return 'bg-orange-100 dark:bg-orange-900/30';
    if (count === 2) return 'bg-orange-200 dark:bg-orange-900/50';
    if (count === 3) return 'bg-orange-300 dark:bg-orange-900/70';
    if (count >= 4) return 'bg-orange-400 dark:bg-orange-900/90';
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-950 h-full border border-slate-200 rounded-xl overflow-hidden`} dir="rtl">
        <div className={`w-full min-w-[800px] bg-white dark:bg-slate-950 flex flex-col`}>
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 bg-slate-100 dark:bg-slate-900 w-full">
              <div className="sticky right-0 z-30 bg-slate-100 dark:bg-slate-900 p-2 font-bold text-slate-600 dark:text-slate-400 flex flex-col items-center justify-center border-l border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-normal mb-1">{rowAxis === 'impact' ? 'اثرگذاری' : 'اهمیت'}</span>
                  <span className="text-xs">/ کارکرد</span>
              </div>
              {FUNCTION_LEVELS.map(func => (
                <div key={func.id} className={`p-2 text-center border-l border-slate-200 dark:border-slate-800 last:border-l-0 ${func.color} dark:bg-slate-800/40 flex flex-col items-center justify-center`}>
                <div className="scale-75 mb-0.5 text-slate-500">{getFunctionIcon(func.id)}</div>
                <div className="font-bold text-xs dark:text-slate-200 text-slate-700">{func.label}</div>
              </div>
            ))}
          </div>

          {rowLabels.map((rowLabel) => (
            <div key={rowLabel.id} className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] border-b border-slate-200 dark:border-slate-800 last:border-b-0 break-inside-avoid w-full">
              <div className={`sticky right-0 z-10 p-2 font-semibold text-[11px] ${rowLabel.color || 'bg-slate-50 text-slate-700'} dark:bg-slate-800 border-l border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center overflow-hidden`}>
                <div className="scale-75 text-slate-500">{rowAxis === 'impact' ? getImpactIcon(rowLabel.id) : getImportanceIcon(rowLabel.id)}</div>
                <span className="font-bold dark:text-slate-200 relative z-10 leading-tight">{rowLabel.label}</span>
              </div>

              {FUNCTION_LEVELS.map((func) => {
                const cellItems = allCellItems.filter((item: any) => {
                  const matchFunc = item.comp.functionLevel === func.id;
                  const matchRow = rowAxis === 'impact' ? item.comp.impactLevel === rowLabel.id : item.importance === rowLabel.id;
                  const matchType = filterType === 'all' || (item.comp.type || 'تخصصی') === filterType;
                  
                  return matchFunc && matchRow && filterRoles.includes(item.roleType) && filterImportance.includes(item.importance) && matchType;
                });

                return (
                  <div key={`${rowLabel.id}-${func.id}`} className={`p-1.5 border-l border-slate-200 dark:border-slate-800 last:border-l-0 min-h-[80px] transition-colors relative ${getHeatmapClass(cellItems.length)}`}>
                    <div className="flex flex-col gap-1.5 h-full z-10 relative">
                      <AnimatePresence>
                      {cellItems.map((item: any) => {
                        const comp = item.comp;
                        const type = comp.type || 'تخصصی';
                        let typeColors = getCompetencyColorClass(type);
                        
                        let empData = null;
                        if (empResults) {
                            empData = empResults.find((r: any) => r.comp?.id === comp.id);
                            if (empData) {
                                typeColors = 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';
                            }
                        }

                        return (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={comp.id} 
                            className="group/item relative w-full"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.02 }} 
                              className={`p-2 rounded-lg border shadow-sm text-[11px] cursor-pointer transition-all ${typeColors} flex flex-col gap-1.5`}
                            >
                              <div className="font-bold flex gap-1 items-start justify-between">
                                <div className="flex gap-1 items-start">
                                    <span className="text-sm scale-90">{comp.icon || '🔸'}</span>
                                    <span className="leading-tight text-right text-[10px] sm:text-[11px]">{comp.title}</span>
                                </div>
                              </div>
                              
                              {empData ? (
                                <div className="mt-0.5 space-y-1">
                                    <div className="flex justify-between items-center text-[9px]">
                                        <span className="text-slate-500">امتیاز: {empData.actualScore}/{empData.requiredScore}</span>
                                        <span className={`font-bold ${empData.gap >= 0 ? 'text-emerald-600' : empData.gap > -15 ? 'text-amber-600' : 'text-rose-600'}`}>
                                            {empData.gap > 0 ? '+' : ''}{empData.gap}
                                        </span>
                                    </div>
                                    <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex relative">
                                        <div className="h-full bg-slate-300 dark:bg-slate-600 absolute top-0 right-0 z-0" style={{ width: `${empData.requiredScore}%` }}></div>
                                        <div className={`h-full relative z-10 ${empData.gap >= 0 ? 'bg-emerald-500' : empData.gap > -15 ? 'bg-amber-400' : 'bg-rose-500'}`} style={{ width: `${empData.actualScore}%` }}></div>
                                    </div>
                                    {empData.gap < 0 && (
                                      <div className="mt-1.5 flex justify-center pt-1 border-t border-black/5 dark:border-white/5">
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); navigate('/training'); }}
                                          className="text-[9px] font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 hover:text-indigo-700 px-2 py-1 rounded w-full flex justify-center items-center gap-1 transition-colors border border-indigo-200 dark:border-indigo-800"
                                        >
                                          <BookOpen size={10} /> پیشنهاد آموزش
                                        </button>
                                      </div>
                                    )}
                                </div>
                              ) : (
                                <div className="flex items-center justify-between mt-0.5 pt-1.5 border-t border-black/10">
                                    <span className="text-[9px] font-bold uppercase tracking-wider bg-black/5 px-1 py-0.5 rounded">{type}</span>
                                    <Info size={12} className="opacity-60" />
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        );
                      })}
                      {cellItems.length === 0 && (
                          <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="text-[10px] text-slate-300 dark:text-slate-600 text-center w-full h-full min-h-[40px] flex items-center justify-center opacity-50"
                          >
                             -
                          </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
    </div>
  );
};

export const CompetencyMatrix: React.FC<Props> = ({ 
  jobs, 
  activeJobId, 
  setActiveJobId, 
  departments = [], 
  activeJob, 
  competencies, 
  mappings, 
  kpis,
  empResults
}) => {
  const matrixRef = useRef<HTMLDivElement>(null);
  const [filterRoles, setFilterRoles] = useState<string[]>(ROLE_TYPES.map(r => r.id));
  const [filterImportance, setFilterImportance] = useState<string[]>(IMPORTANCE_LEVELS.map(i => i.id));
  const [filterType, setFilterType] = useState<string>('all'); 
  const [rowAxis, setRowAxis] = useState<'impact' | 'importance'>('impact');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  if (!activeJob) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mx-auto mt-10 transition-colors duration-300" dir="rtl">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full mb-4">
          <Briefcase size={40} className="animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">ابتدا یک شغل را انتخاب کنید</h3>
        <select 
          value={activeJobId || ''}
          onChange={(e) => setActiveJobId(e.target.value || null)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
        >
          <option value="">-- انتخاب شغل --</option>
          {jobs.map(j => (
            <option key={j.id} value={j.id}>{j.icon || '💼'} {j.title}</option>
          ))}
        </select>
      </div>
    );
  }

  const handleAnalyze = async () => {
      setIsAnalyzing(true);
      if (!activeJob) return;
      const jobKpiIds = activeJob.kpis.map(k => k.id);
      const relevantMappings = mappings.filter(m => jobKpiIds.includes(m.kpiId));
      const mappedCompetencyIds = relevantMappings.map(m => m.competencyId);
      const jobCompetencies = competencies.filter(c => mappedCompetencyIds.includes(c.id));
      const dept = departments.find(d => d.id === activeJob.departmentId);
      const deptComps = dept ? (dept.coreCompetencyIds || []).map(id => competencies.find(c => c.id === id)).filter(Boolean) as Competency[] : [];

      const snapshot = {
          job: { title: activeJob.title },
          kpis: activeJob.kpis.map(k => ({ id: k.id, title: k.title })),
          mappings: relevantMappings.map(m => ({ kpiId: m.kpiId, compId: m.competencyId, role: m.roleType, imp: m.importance })),
          competencies: jobCompetencies.map(c => ({ id: c.id, title: c.title, func: c.functionLevel, impact: c.impactLevel })),
          departmentCoreCompetencies: deptComps.map(c => ({ id: c.id, title: c.title, func: c.functionLevel, impact: c.impactLevel }))
      };
      try {
          const report = await analyzeCompetencyMatrix(JSON.stringify(snapshot));
          setAiReport(report);
      } catch (err) {
          console.error(err);
          setAiReport('مشکلی در برقراری ارتباط با سرویس هوش مصنوعی رخ داده است.');
      } finally {
          setIsAnalyzing(false);
      }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" dir="rtl">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">ماتریس شایستگی‌های شغل:</h2>
                <select 
                  value={activeJobId || ''}
                  onChange={(e) => setActiveJobId(e.target.value || null)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-100 font-bold focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
                >
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>{j.icon || '💼'} {j.title}</option>
                  ))}
                </select>
            </div>
            
            <div className="flex items-center gap-3">
                <button onClick={handleAnalyze} disabled={isAnalyzing} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all text-sm font-bold disabled:opacity-50">
                    {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    <span>مشاوره هوشمند</span>
                </button>
            </div>
        </div>

        {aiReport && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <button onClick={() => setAiReport(null)} className="absolute top-4 left-4 p-1 text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-800 rounded-lg">
                    <X size={20} />
                </button>
                <h3 className="font-bold flex items-center gap-2 text-violet-700 dark:text-violet-300 mb-4"><BrainCircuit size={18} /> تحلیل ساختاری هوش مصنوعی</h3>
                <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 max-h-[300px] overflow-y-auto custom-scrollbar">
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiReport}</ReactMarkdown>
                </div>
            </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4" ref={matrixRef}>
         {activeJob && (
             <JobMatrixCard 
                job={activeJob} 
                competencies={competencies} 
                mappings={mappings} 
                departments={departments} 
                rowAxis={rowAxis} 
                filterType={filterType} 
                filterRoles={filterRoles} 
                filterImportance={filterImportance} 
                showHeatmap={showHeatmap}
                empResults={empResults}
             />
         )}
      </div>
    </div>
  );
};
