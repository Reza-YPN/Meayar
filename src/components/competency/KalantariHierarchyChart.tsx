import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronLeft,
  Building2,
  Eye,
  Filter,
  Search,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { competencyService, Job, JobStatus } from '../../services/competencyService';

interface KalantariHierarchyChartProps {
  onSelectJob?: (job: Job) => void;
  selectedJobId?: string;
}

export function KalantariHierarchyChart({ onSelectJob, selectedJobId }: KalantariHierarchyChartProps) {
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'planned'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Default to collapsed for all circles/departments ("حالت جمع کردن دوایر") to avoid long scrolling
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    'ریاست کلانتری': false,
    'دایره اجتماعی': false,
    'دایره اداری و پشتیبانی': false,
    'دایره خدمات قضایی': false,
    'معاونت تجسس': false,
    'معاونت اطلاعات': false,
    'معاونت پیشگیری': false
  });

  const jobs = competencyService.getJobs();
  const stats = competencyService.getStationStructureStats();
  const departments = competencyService.getDepartments();

  // Auto-expand department if a job inside it is selected
  useEffect(() => {
    if (selectedJobId) {
      const targetJob = jobs.find(j => j.id === selectedJobId);
      if (targetJob?.department) {
        setExpandedDepts(prev => ({ ...prev, [targetJob.department]: true }));
      }
    }
  }, [selectedJobId]);

  // Auto-expand when a specific department is chosen in the dropdown filter
  useEffect(() => {
    if (departmentFilter !== 'all') {
      setExpandedDepts(prev => ({ ...prev, [departmentFilter]: true }));
    }
  }, [departmentFilter]);

  // Auto-expand matching departments when user searches
  useEffect(() => {
    if (searchQuery.trim()) {
      const exp: Record<string, boolean> = {};
      departments.forEach(d => {
        const hasMatch = filteredJobs.some(j => j.department === d);
        if (hasMatch) exp[d] = true;
      });
      setExpandedDepts(prev => ({ ...prev, ...exp }));
    }
  }, [searchQuery]);

  const toggleDept = (dept: string) => {
    setExpandedDepts(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  const expandAll = () => {
    const allExp: Record<string, boolean> = {};
    departments.forEach(d => { allExp[d] = true; });
    setExpandedDepts(allExp);
  };

  const collapseAll = () => {
    const allCol: Record<string, boolean> = {};
    departments.forEach(d => { allCol[d] = false; });
    setExpandedDepts(allCol);
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchDept = departmentFilter === 'all' || job.department === departmentFilter;
    const matchStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchSearch = !searchQuery.trim() || 
      job.title.includes(searchQuery.trim()) || 
      (job.category && job.category.includes(searchQuery.trim())) ||
      job.department.includes(searchQuery.trim());
    return matchDept && matchStatus && matchSearch;
  });

  // Group by department
  const deptsInOrder = [
    'ریاست کلانتری',
    'دایره اجتماعی',
    'دایره اداری و پشتیبانی',
    'دایره خدمات قضایی',
    'معاونت تجسس',
    'معاونت اطلاعات',
    'معاونت پیشگیری'
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner: Kalantari 103 Official Structure Header */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-800 to-indigo-950 text-white p-6 rounded-3xl border border-slate-700/80 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                ساختار مصوب و سازمان تفصیلی
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black px-3 py-1 rounded-lg">
                فرماندهی انتظامی تهران بزرگ (فاتب)
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              سلسله‌مراتب و ساختار مشاغل کلانتری ۱۰۳ گاندی
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
              پس از بررسی ساختار مصوب کلانتری ۱۰۳ گاندی، کلیه ۴۶ شغل در نظر گرفته شده در ۷ دایره و معاونت تخصصی سازماندهی گردیده‌اند. مشاغل فعال با رنگ <strong className="text-emerald-400">سبز</strong> (۲۷ شغل - ۵۹٪ تکمیل) و مشاغل پیش‌بینی‌شده در انتظار انتصاب با رنگ <strong className="text-amber-400">نارنجی</strong> (۱۹ شغل) نمایش داده می‌شوند.
            </p>
          </div>

          {/* Progress & Stat Widget */}
          <div className="bg-slate-800/80 border border-slate-700/90 p-4 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 block">درصد تکمیل سازمان:</span>
              <span className="text-2xl font-black text-emerald-400 tabular-nums">۵۹٪</span>
              <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">۲۷ از ۴۶ شغل فعال</span>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-right space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
                <span className="text-slate-200 font-bold">۲۷ شغل فعال (موجود)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs" />
                <span className="text-slate-300 font-medium">۱۹ شغل پیش‌بینی‌شده</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-700/60">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-black shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">کل مشاغل مصوب:</span>
              <span className="text-base font-black text-white tabular-nums">۴۶ عنوان</span>
            </div>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">مشاغل فعال (سبز):</span>
              <span className="text-base font-black text-emerald-400 tabular-nums">۲۷ ردیف</span>
            </div>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">پیش‌بینی شده (نارنجی):</span>
              <span className="text-base font-black text-amber-400 tabular-nums">۱۹ ردیف</span>
            </div>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-black shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">دوایر و معاونت‌ها:</span>
              <span className="text-base font-black text-white tabular-nums">۷ بخش تخصصی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجو در عناوین شغلی کلانتری..."
              className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
            aria-label="فیلتر بر اساس دایره و معاونت سازمانی"
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">همه دوایر و معاونت‌ها (۷ دایره)</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg transition ${statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              همه ({jobs.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${statusFilter === 'active' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              فعال (۲۷)
            </button>
            <button
              onClick={() => setStatusFilter('planned')}
              className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${statusFilter === 'planned' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-700 hover:bg-amber-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              پیش‌بینی شده (۱۹)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition cursor-pointer"
          >
            گسترش همه دوایر
          </button>
          <button
            onClick={collapseAll}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>جمع کردن همه دوایر</span>
            <span className="text-[10px] bg-indigo-200/80 text-indigo-800 px-1.5 py-0.2 rounded font-black">پیش‌فرض</span>
          </button>
        </div>
      </div>

      {/* Visual Organizational Hierarchy Branches */}
      <div className="space-y-4">
        {deptsInOrder.map(deptName => {
          const deptJobs = filteredJobs.filter(j => j.department === deptName);
          if (deptJobs.length === 0) return null;

          const headJob = deptJobs.find(j => !j.parentId || j.id === 'j_head' || j.id.endsWith('_head'));
          const subJobs = deptJobs.filter(j => j.id !== headJob?.id);
          const isExpanded = !!expandedDepts[deptName];

          const activeCount = deptJobs.filter(j => j.status === 'active').length;
          const plannedCount = deptJobs.filter(j => j.status === 'planned').length;

          return (
            <div
              key={deptName}
              className={`bg-white rounded-3xl border transition-all duration-200 ${
                isExpanded 
                  ? 'border-indigo-300 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Department Header Bar */}
              <div
                onClick={() => toggleDept(deptName)}
                className={`p-4 bg-slate-50/80 hover:bg-slate-100/90 flex items-center justify-between cursor-pointer select-none transition rounded-3xl ${
                  isExpanded ? 'border-b border-slate-200/80 rounded-b-none' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black shadow-xs transition-colors ${
                    isExpanded ? 'bg-indigo-950 text-white' : 'bg-slate-800 text-slate-200'
                  }`}>
                    <Building2 className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm md:text-base text-slate-900">{deptName}</h3>
                      <span className="text-xs font-bold bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded-md">
                        {deptJobs.length} ردیف شغلی
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 mt-0.5 flex-wrap">
                      <span className="text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                        {activeCount} شغل فعال
                      </span>
                      {plannedCount > 0 && (
                        <span className="text-amber-700 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                          {plannedCount} شغل پیش‌بینی شده
                        </span>
                      )}
                      {headJob && (
                        <span className="text-slate-400 hidden md:inline">
                          • مسئول: <strong className="text-slate-700 font-bold">{headJob.title}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                    {isExpanded ? 'بستن ردیف‌ها' : 'مشاهده ردیف‌های شغلی'}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 transition-transform duration-200 shadow-2xs ${isExpanded ? 'rotate-180 bg-indigo-50 border-indigo-200 text-indigo-700' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Department Job Nodes */}
              {isExpanded && (
                <div className="p-5 space-y-4 bg-slate-50/30">
                  {/* Top Level of this department (e.g. معاون یا رئیس دایره) */}
                  {headJob && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 block px-1">
                        سطح اول (فرماندهی / سرپرستی دایره):
                      </span>
                      <JobCard
                        job={headJob}
                        isSelected={selectedJobId === headJob.id}
                        onSelect={() => onSelectJob && onSelectJob(headJob)}
                        isHead={true}
                      />
                    </div>
                  )}

                  {/* Subordinate Positions */}
                  {subJobs.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-black text-slate-400 block px-1">
                        مشاغل تحت امر و رده‌های عملیاتی:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {subJobs.map(job => (
                          <JobCard
                            key={job.id}
                            job={job}
                            isSelected={selectedJobId === job.id}
                            onSelect={() => onSelectJob && onSelectJob(job)}
                            isHead={false}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: () => void;
  isHead: boolean;
}

function JobCard({ job, isSelected, onSelect, isHead }: JobCardProps) {
  const duties = competencyService.getDutiesByJob(job.id);
  const competencies = competencyService.getCompetenciesByJob(job.id);
  const isActive = job.status === 'active';

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-2xl border transition-all cursor-pointer select-none relative ${
        isSelected
          ? 'bg-indigo-50/90 border-indigo-600 ring-2 ring-indigo-500/30 shadow-sm'
          : isActive
            ? 'bg-emerald-50/40 hover:bg-emerald-50/70 border-emerald-200/90 hover:border-emerald-300'
            : 'bg-amber-50/40 hover:bg-amber-50/70 border-amber-200/90 hover:border-amber-300'
      }`}
    >
      {/* Status Badge Tag */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`text-[10px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1 border ${
            isActive
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
              : 'bg-amber-500 text-white border-amber-600 shadow-2xs'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {isActive ? 'فعال (موجود در کلانتری)' : 'پیش‌بینی شده'}
        </span>

        {job.code && (
          <span className="text-[10px] font-extrabold text-slate-400 font-mono">
            {job.code}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h4 className={`text-xs md:text-sm font-black leading-snug ${isHead ? 'text-indigo-950 font-black' : 'text-slate-900'}`}>
          {job.title}
        </h4>
        {job.category && (
          <span className="text-[10px] font-bold text-slate-500 block">
            رسته / رده: {job.category}
          </span>
        )}
      </div>

      {/* Metrics & Count */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/60 text-[10px] font-bold text-slate-500">
        <div className="flex items-center gap-2">
          <span>{duties.length} وظیفه</span>
          <span>•</span>
          <span className="text-indigo-600 font-extrabold">{competencies.length} شایستگی</span>
        </div>

        <div className="flex items-center gap-1 text-slate-600 font-black">
          <span>ظرفیت:</span>
          <span className="tabular-nums">{job.actualCount || 0} از {job.plannedCount || 1}</span>
        </div>
      </div>
    </div>
  );
}
