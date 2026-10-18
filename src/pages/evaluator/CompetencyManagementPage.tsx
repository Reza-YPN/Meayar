import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  Award,
  BarChart2,
  Layers,
  ChevronLeft,
  CheckCircle2,
  Building2,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { competencyService } from '../../services/competencyService';
import { SimpleJobDescriptionsStep } from '../../components/competency/SimpleJobDescriptionsStep';
import { SimpleExtractedCompetenciesStep } from '../../components/competency/SimpleExtractedCompetenciesStep';
import { SimplePerformanceIndicatorsStep } from '../../components/competency/SimplePerformanceIndicatorsStep';
import { AdvancedMatrixSection } from '../../components/competency/AdvancedMatrixSection';

export type SequentialTab = 'jobs' | 'competencies' | 'kpis' | 'advanced';

interface SequentialTabItem {
  id: SequentialTab;
  stepNumber: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const ORDERED_TABS: SequentialTabItem[] = [
  {
    id: 'jobs',
    stepNumber: 'گام ۱',
    title: 'شرح شغل‌ها',
    shortDesc: 'شناسنامه و شرح وظایف مصوب',
    icon: Briefcase,
    accentColor: 'indigo',
  },
  {
    id: 'competencies',
    stepNumber: 'گام ۲',
    title: 'شایستگی‌های استخراج‌شده',
    shortDesc: 'استخراج مستقیم از وظایف شغل',
    icon: Award,
    accentColor: 'purple',
  },
  {
    id: 'kpis',
    stepNumber: 'گام ۳',
    title: 'شاخص‌های ارزیابی عملکرد مرتبط',
    shortDesc: 'فرمول، سنجه‌های KPI و نمره عملکرد',
    icon: BarChart2,
    accentColor: 'emerald',
  },
  {
    id: 'advanced',
    stepNumber: 'تکمیلی',
    title: 'ماتریس و گزارش‌های جامع',
    shortDesc: 'ماتریس ۵×۴، ارزیاب و بهره‌وری',
    icon: Layers,
    accentColor: 'slate',
  },
];

export function CompetencyManagementPage() {
  const { role } = useRole();
  const isEmployee = role === 'employee';

  const [searchParams, setSearchParams] = useSearchParams();
  const rawParamTab = searchParams.get('tab') as string;

  // Map legacy tabs to new sequential structure
  const resolveTab = (tabParam: string | null): SequentialTab => {
    if (!tabParam) return 'jobs';
    if (tabParam === 'jobs') return 'jobs';
    if (tabParam === 'competencies' || tabParam === 'mapping') return 'competencies';
    if (tabParam === 'kpis' || tabParam === 'evaluator-matrix') return 'kpis';
    if (tabParam === 'matrix' || tabParam === 'evaluation' || tabParam === 'advanced') return 'advanced';
    return 'jobs';
  };

  const initialTab = resolveTab(rawParamTab);
  const [activeTab, setActiveTab] = useState<SequentialTab>(initialTab);

  // Synchronized selected job ID across all steps
  const initialJobs = useMemo(() => competencyService.getJobs(), []);
  const [selectedJobId, setSelectedJobId] = useState<string>(
    searchParams.get('jobId') || initialJobs[0]?.id || 'j_prev_moto_patrol_lead'
  );

  // CRITICAL FIX: Sync activeTab and selectedJobId when searchParams changes (e.g. sidebar navigation clicks)
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(resolveTab(tabFromUrl));
    }
    const jobFromUrl = searchParams.get('jobId');
    if (jobFromUrl) {
      setSelectedJobId(jobFromUrl);
    }
  }, [searchParams]);

  const handleTabSwitch = (tab: SequentialTab) => {
    setActiveTab(tab);
    setSearchParams({ tab, jobId: selectedJobId });
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setSearchParams({ tab: activeTab, jobId });
  };

  const activeIndex = ORDERED_TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header and Step Progression Stepper */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 md:p-6 shadow-2xs space-y-5">
        
        {/* Title and Purpose */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                کلانتری ۱۰۳ گاندی
              </span>
              <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                سیستم گام‌به‌گام و مرتب ارزیابی عملکرد
              </span>
            </div>
            <h1 className="text-base md:text-xl font-black text-slate-900 mt-2">
              فرآیند سه‌گانه: شرح شغل ⬅️ شایستگی‌های استخراج‌شده ⬅️ شاخص‌های ارزیابی عملکرد
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              طراحی کاملاً ساده، منطقی و به ترتیب، بدون سردرگمی و پیچیدگی جهت ارائه شفاف و ارزیابی عینی
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200/80 self-start md:self-auto shrink-0">
            <span>مرحله انتخابی:</span>
            <span className="text-slate-900 font-black">
              {ORDERED_TABS[activeIndex]?.stepNumber} - {ORDERED_TABS[activeIndex]?.title}
            </span>
          </div>
        </div>

        {/* 3-Step Clear Sequential Stepper + 1 Advanced Optional Tab */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ORDERED_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCompleted = idx < activeIndex;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSwitch(tab.id)}
                className={`text-right p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 group relative cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/90 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800 font-black'
                        : 'bg-slate-200/90 text-slate-600'
                    }`}
                  >
                    {isCompleted ? `✓ ${tab.stepNumber}` : tab.stepNumber}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-slate-600 group-hover:text-indigo-600 border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className={`text-xs md:text-sm font-black line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {tab.title}
                  </h3>
                  <p className={`text-[11px] font-medium mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tab.shortDesc}
                  </p>
                </div>

                {/* Progress bar line at the bottom of active tab */}
                {isActive && (
                  <div className="w-full h-1 bg-indigo-500 rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Sequential Step Content */}
      <div className="transition-all duration-200">
        {/* Step 1: Job Descriptions & Duties */}
        {activeTab === 'jobs' && (
          <SimpleJobDescriptionsStep
            selectedJobId={selectedJobId}
            onSelectJob={handleSelectJob}
            onNextStep={() => handleTabSwitch('competencies')}
            readOnly={isEmployee}
          />
        )}

        {/* Step 2: Extracted Competencies */}
        {activeTab === 'competencies' && (
          <SimpleExtractedCompetenciesStep
            selectedJobId={selectedJobId}
            onSelectJob={handleSelectJob}
            onNextStep={() => handleTabSwitch('kpis')}
            onPrevStep={() => handleTabSwitch('jobs')}
            readOnly={isEmployee}
          />
        )}

        {/* Step 3: Related Performance Evaluation Indicators (KPIs) */}
        {activeTab === 'kpis' && (
          <SimplePerformanceIndicatorsStep
            selectedJobId={selectedJobId}
            onSelectJob={handleSelectJob}
            onPrevStep={() => handleTabSwitch('competencies')}
            onGoToAdvanced={() => handleTabSwitch('advanced')}
            readOnly={isEmployee}
          />
        )}

        {/* Optional Advanced Matrix and Reports */}
        {activeTab === 'advanced' && (
          <AdvancedMatrixSection readOnly={isEmployee} />
        )}
      </div>

    </div>
  );
}
