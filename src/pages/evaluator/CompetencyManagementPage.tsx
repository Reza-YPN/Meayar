import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layers, Briefcase, Network, Sliders, BarChart2, CheckCircle2, ChevronLeft, Shield } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { JobManagementTab } from '../../components/competency/JobManagementTab';
import { CompetencyMappingTab } from '../../components/competency/CompetencyMappingTab';
import { CompetencyMatrixTab } from '../../components/competency/CompetencyMatrixTab';
import { EvaluatorCompetencyMatrixTab } from '../../components/competency/EvaluatorCompetencyMatrixTab';
import { EmployeeEvaluationTab } from '../../components/competency/EmployeeEvaluationTab';

type Tab = 'jobs' | 'mapping' | 'matrix' | 'evaluator-matrix' | 'evaluation';

interface TabItem {
  id: Tab;
  step: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
}

const TABS: TabItem[] = [
  {
    id: 'jobs',
    step: 'گام ۱',
    title: 'شرح شغل',
    shortDesc: '۴۶ شغل و شرح وظایف مصوب',
    icon: Briefcase,
    badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'mapping',
    step: 'گام ۲',
    title: 'نگاشت و استخراج شایستگی‌ها',
    shortDesc: 'استخراج ۵ سطح اثرگذاری',
    icon: Network,
    badgeColor: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'matrix',
    step: 'گام ۳',
    title: 'ماتریس شایستگی‌ها',
    shortDesc: 'ماتریس تطابق ابعاد (۵×۴)',
    icon: Layers,
    badgeColor: 'text-sky-600 bg-sky-50 border-sky-200'
  },
  {
    id: 'evaluator-matrix',
    step: 'گام ۴',
    title: 'ماتریس ارزیاب',
    shortDesc: 'ارزیابی برخط و ثبت سطوح ۱ تا ۵',
    icon: Sliders,
    badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    id: 'evaluation',
    step: 'گام ۵',
    title: 'گزارش جامع بهره‌وری',
    shortDesc: 'تحلیل نهایی، رتبه‌بندی و گزارشات',
    icon: BarChart2,
    badgeColor: 'text-amber-600 bg-amber-50 border-amber-200'
  }
];

export function CompetencyManagementPage() {
  const { role } = useRole();
  const isEmployee = role === 'employee';

  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = (searchParams.get('tab') as Tab) || 'jobs';
  // If employee requested step 4 or 5 via URL, force back to jobs
  const initialTab = (isEmployee && (rawTab === 'evaluator-matrix' || rawTab === 'evaluation')) ? 'jobs' : rawTab;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  // Filter tabs: Personnel must NOT see Step 4 and Step 5
  const visibleTabs = useMemo(() => {
    if (isEmployee) {
      return TABS.filter(t => t.id !== 'evaluator-matrix' && t.id !== 'evaluation');
    }
    return TABS;
  }, [isEmployee]);

  // Guard against direct URL access to Step 4 and Step 5 for employee
  useEffect(() => {
    if (isEmployee && (activeTab === 'evaluator-matrix' || activeTab === 'evaluation')) {
      setActiveTab('jobs');
      setSearchParams({ tab: 'jobs' });
    }
  }, [isEmployee, activeTab, setSearchParams]);

  const handleTabSwitch = (tab: Tab) => {
    if (isEmployee && (tab === 'evaluator-matrix' || tab === 'evaluation')) {
      return;
    }
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const activeIndex = visibleTabs.findIndex(t => t.id === activeTab);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header & Clean Navigation */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 md:p-6 shadow-2xs space-y-5">
        
        {/* Title and High-Level Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                کلانتری ۱۰۳ گاندی
              </span>
              <span className="text-xs text-slate-400 font-bold">
                {isEmployee ? 'فرآیند ۳ مرحله‌ای شناسنامه و ماتریس شایستگی' : 'فرآیند ۵ مرحله‌ای استاندارد ارزیابی و شایستگی'}
              </span>
            </div>
            <h1 className="text-base md:text-lg font-black text-slate-900 mt-1.5">
              سامانه جامع مدیریت مشاغل، ماتریس شایستگی و ارزیابی عملکرد فراجا
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200/80 self-start md:self-auto">
            <span>مرحله فعلی:</span>
            <span className="text-slate-900 font-black">
              {visibleTabs[activeIndex]?.step} - {visibleTabs[activeIndex]?.title}
            </span>
          </div>
        </div>

        {/* Clean Workflow Stepper / Tabs (3 tabs for Employee, 5 for Evaluator/Manager) */}
        <div className={`grid gap-2.5 ${isEmployee ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
          {visibleTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCompleted = idx < activeIndex;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`text-right p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 group relative cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/80 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200/80 text-slate-600'
                  }`}>
                    {tab.step}
                  </span>

                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-slate-500 group-hover:text-indigo-600 border border-slate-200'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className={`text-xs font-black line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {tab.title}
                  </h3>
                  <p className={`text-[10px] font-medium mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tab.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Tab Content Container */}
      <div className="transition-all duration-200">
        {activeTab === 'jobs' && <JobManagementTab readOnly={isEmployee} />}
        {activeTab === 'mapping' && <CompetencyMappingTab readOnly={isEmployee} />}
        {activeTab === 'matrix' && <CompetencyMatrixTab readOnly={isEmployee} />}
        {!isEmployee && activeTab === 'evaluator-matrix' && <EvaluatorCompetencyMatrixTab />}
        {!isEmployee && activeTab === 'evaluation' && <EmployeeEvaluationTab />}
      </div>
      
    </div>
  );
}

