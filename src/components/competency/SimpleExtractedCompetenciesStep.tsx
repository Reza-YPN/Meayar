import React, { useState, useMemo } from 'react';
import {
  Award,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Layers,
  CheckCircle2,
  Filter,
  Search,
  Sparkles,
  Target,
  ShieldCheck,
  Star,
  Users,
  Compass,
  Building2,
  ChevronDown
} from 'lucide-react';
import {
  competencyService,
  Job,
  Duty,
  Competency,
  CompetencyLevel,
  CompetencyType,
  ProficiencyLevel
} from '../../services/competencyService';

interface SimpleExtractedCompetenciesStepProps {
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  readOnly?: boolean;
}

const PROFICIENCY_NAMES: Record<ProficiencyLevel, { label: string; desc: string; color: string }> = {
  1: { label: 'سطح ۱ (مقدماتی)', desc: 'آشنایی اولیه، تحت هدایت مستقیم', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  2: { label: 'سطح ۲ (در حال توسعه)', desc: 'اجرای روتین، نیازمند نظارت دوره‌ای', color: 'bg-amber-50 text-amber-800 border-amber-300' },
  3: { label: 'سطح ۳ (تسلط پایه)', desc: 'اجرای استاندارد و مستقل وظایف', color: 'bg-teal-50 text-teal-800 border-teal-300' },
  4: { label: 'سطح ۴ (تسلط کامل)', desc: 'عملکرد پیشرفته، حل مسائل غیرمترقبه', color: 'bg-blue-50 text-blue-800 border-blue-300' },
  5: { label: 'سطح ۵ (خبرگی و الگو)', desc: 'مرجع علمی، الگوی عملیاتی و مربی', color: 'bg-purple-50 text-purple-800 border-purple-300' },
};

const LEVEL_LABELS: Record<CompetencyLevel, { label: string; icon: string }> = {
  individual: { label: 'سطح فردی (مهارت و انگیزه)', icon: '👤' },
  team: { label: 'سطح تیمی (هماهنگی و هم‌افزایی)', icon: '👥' },
  organizational: { label: 'سطح سازمانی (قوانین و فرآیند)', icon: '🏛️' },
  social: { label: 'سطح اجتماعی (تکریم و رضایت عمومی)', icon: '🤝' },
};

export function SimpleExtractedCompetenciesStep({
  selectedJobId,
  onSelectJob,
  onNextStep,
  onPrevStep,
  readOnly = false,
}: SimpleExtractedCompetenciesStepProps) {
  const jobs = useMemo(() => competencyService.getJobs(), []);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || jobs[0] || null;
  }, [jobs, selectedJobId]);

  const duties: Duty[] = useMemo(() => {
    if (!currentJob) return [];
    return competencyService.getDutiesByJob(currentJob.id);
  }, [currentJob]);

  const rawCompetencies: Competency[] = useMemo(() => {
    if (!currentJob) return [];
    return competencyService.getCompetenciesByJob(currentJob.id);
  }, [currentJob]);

  const filteredCompetencies = useMemo(() => {
    return rawCompetencies.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.evaluationCriteria && c.evaluationCriteria.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchType = filterType === 'all' || c.type === filterType;
      return matchSearch && matchType;
    });
  }, [rawCompetencies, searchQuery, filterType]);

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-linear-to-r from-purple-950 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>گام دوم از فرآیند سه‌گانه ارزیابی عملکرد</span>
          </div>
          <h2 className="text-xl font-black">شایستگی‌های استخراج‌شده از شرح وظایف شغل</h2>
          <p className="text-xs text-purple-200/90 max-w-2xl leading-relaxed">
            در این مرحله، تمامی شایستگی‌های رفتاری، دانشی و تخصصی که مستقیماً از دل شرح وظایف مصوب شغل استخراج شده‌اند با سطح تسلط استاندارد و معیارهای سنجش شفاف ارائه گردیده‌اند.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[150px] shrink-0">
          <span className="text-[11px] font-bold text-slate-300 block">شایستگی‌های این شغل</span>
          <span className="text-2xl font-black text-white mt-1 block">{rawCompetencies.length}</span>
          <span className="text-[10px] text-purple-300 font-bold block mt-0.5">استخراج شده از {duties.length} وظیفه</span>
        </div>
      </div>

      {/* Contextual Job Switcher Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 md:p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">شغل انتخاب شده:</span>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {currentJob?.code || currentJob?.id}
              </span>
            </div>
            <h3 className="text-sm md:text-base font-black text-slate-900">
              {currentJob?.title}
            </h3>
          </div>
        </div>

        {/* Quick Job Switch Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-auto">
          <span className="text-xs text-slate-500 font-bold shrink-0">تغییر شغل:</span>
          <select
            value={currentJob?.id || ''}
            onChange={(e) => onSelectJob(e.target.value)}
            className="w-full md:w-64 bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl py-2.5 px-3 focus:outline-none focus:border-indigo-500"
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="جستجوی عنوان شایستگی یا معیار..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-10 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-bold shrink-0">نوع:</span>
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition shrink-0 ${
              filterType === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            همه ({rawCompetencies.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('core')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition shrink-0 ${
              filterType === 'core'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            محوری ({rawCompetencies.filter((c) => c.type === 'core').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('specialized')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition shrink-0 ${
              filterType === 'specialized'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            تخصصی ({rawCompetencies.filter((c) => c.type === 'specialized').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('general')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition shrink-0 ${
              filterType === 'general'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            عمومی ({rawCompetencies.filter((c) => c.type === 'general').length})
          </button>
        </div>
      </div>

      {/* Extracted Competencies Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCompetencies.map((comp, idx) => {
          const relatedDuty = duties.find((d) => d.id === comp.dutyId);
          const profInfo = PROFICIENCY_NAMES[comp.proficiencyLevel] || PROFICIENCY_NAMES[3];
          const levelInfo = LEVEL_LABELS[comp.level] || LEVEL_LABELS.individual;

          return (
            <div
              key={comp.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs hover:border-purple-300 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header: Badge & Origin Duty */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      comp.type === 'core'
                        ? 'bg-rose-100 text-rose-800'
                        : comp.type === 'specialized'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {comp.type === 'core' ? 'شایستگی محوری' : comp.type === 'specialized' ? 'شایستگی تخصصی' : 'شایستگی عمومی'}
                    </span>
                  </div>

                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border ${profInfo.color}`}>
                    {profInfo.label}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">
                    {comp.title}
                  </h4>
                  {comp.description && (
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {comp.description}
                    </p>
                  )}
                </div>

                {/* Duty Traceability */}
                {relatedDuty && (
                  <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
                    <span className="font-bold text-slate-400 shrink-0">استخراج‌شده از وظیفه:</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{relatedDuty.title}</span>
                  </div>
                )}

                {/* Evaluation Criteria */}
                {comp.evaluationCriteria && (
                  <div className="bg-purple-50/50 rounded-2xl p-3 border border-purple-200/70 text-xs space-y-1">
                    <span className="font-black text-purple-900 flex items-center gap-1.5 text-[11px]">
                      <Target className="w-3.5 h-3.5 text-purple-600" />
                      معیار سنجش و رفتار مورد انتظار:
                    </span>
                    <p className="text-purple-950 font-medium leading-relaxed">
                      {comp.evaluationCriteria}
                    </p>
                  </div>
                )}

              </div>

              {/* Footer Meta: Functional Level & Expected Benchmark Score */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-600">
                  {levelInfo.icon} {levelInfo.label}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">حد نصاب قبولی:</span>
                  <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    {comp.expectedScore}٪
                  </span>
                </div>
              </div>

            </div>
          );
        })}

        {filteredCompetencies.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs">
            هیچ شایستگی‌ای مطابق با فیلتر یافت نشد.
          </div>
        )}
      </div>

      {/* Stepper Navigation Actions */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrevStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به گام اول: شناسنامه و شرح وظایف</span>
        </button>

        <button
          type="button"
          onClick={onNextStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md shadow-purple-600/20 transition cursor-pointer"
        >
          <span>رفتن به مرحله ۳: شاخص‌های ارزیابی عملکرد مرتبط</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
