import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Layers,
  ChevronLeft,
  Building2,
  Hash,
  Shield,
  Target,
  Sparkles,
  Plus,
  Compass
} from 'lucide-react';
import { competencyService, Job, Duty } from '../../services/competencyService';

interface SimpleJobDescriptionsStepProps {
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onNextStep: () => void;
  readOnly?: boolean;
}

export function SimpleJobDescriptionsStep({
  selectedJobId,
  onSelectJob,
  onNextStep,
  readOnly = false,
}: SimpleJobDescriptionsStepProps) {
  const [jobs, setJobs] = useState<Job[]>(competencyService.getJobs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const departments = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.department)));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (j.category && j.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (j.code && j.code.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchDept = selectedDept === 'all' || j.department === selectedDept;
      return matchSearch && matchDept;
    });
  }, [jobs, searchQuery, selectedDept]);

  const currentJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || jobs[0] || null;
  }, [jobs, selectedJobId]);

  const currentDuties: Duty[] = useMemo(() => {
    if (!currentJob) return [];
    return competencyService.getDutiesByJob(currentJob.id);
  }, [currentJob]);

  const currentCompetenciesCount = useMemo(() => {
    if (!currentJob) return 0;
    return competencyService.getCompetenciesByJob(currentJob.id).length;
  }, [currentJob]);

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold border border-indigo-400/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>گام اول از فرآیند سه‌گانه ارزیابی عملکرد</span>
          </div>
          <h2 className="text-xl font-black">شناسنامه و شرح وظایف مصوب مشاغل سازمانی</h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            در این گام، شغل مورد نظر را انتخاب نمایید تا شناسنامه رسمی، مأموریت و شرح وظایف مصوب سازمانی آن به شکل شفاف نمایش داده شود. در گام‌های بعدی، شایستگی‌ها و شاخص‌های ارزیابی عملکرد مستقیماً بر مبنای همین وظایف بررسی خواهند شد.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[140px] shrink-0">
          <span className="text-[11px] font-bold text-slate-300 block">شغل‌های تعریف‌شده</span>
          <span className="text-2xl font-black text-white mt-1 block">{jobs.length}</span>
          <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">۴۶ شغل مصوب کلانتری ۱۰۳</span>
        </div>
      </div>

      {/* Main Two-Column Layout: Job Selector List (Right) + Job Details & Duties (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Right Column: Search & Job Directory */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                فهرست مشاغل سازمانی
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {filteredJobs.length} شغل یافت شد
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="جستجوی شغل، رده سازمانی یا کد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setSelectedDept('all')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition ${
                  selectedDept === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                همه دوایر ({jobs.length})
              </button>
              {departments.map((dept) => {
                const count = jobs.filter((j) => j.department === dept).length;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition ${
                      selectedDept === dept
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dept} ({count})
                  </button>
                );
              })}
            </div>

            {/* Jobs Scrollable List */}
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredJobs.map((job) => {
                const isSelected = currentJob?.id === job.id;
                const dutiesCount = competencyService.getDutiesByJob(job.id).length;
                const compCount = competencyService.getCompetenciesByJob(job.id).length;

                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => onSelectJob(job.id)}
                    className={`w-full text-right p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {job.code && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                            {job.code}
                          </span>
                        )}
                        <h4 className={`text-xs font-black ${isSelected ? 'text-indigo-950 font-bold' : 'text-slate-900'}`}>
                          {job.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-bold text-slate-600">{job.department}</span>
                        <span>•</span>
                        <span>{job.category || 'عملیاتی'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {job.status === 'active' ? 'مصوب فعال' : 'پیش‌بینی شده'}
                      </span>
                      <span className="text-[10px] text-indigo-600 font-bold">
                        {dutiesCount} وظیفه | {compCount} شایستگی
                      </span>
                    </div>
                  </button>
                );
              })}

              {filteredJobs.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs">
                  هیچ شغلی با مشخصات جستجو شده یافت نشد.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Left Column: Selected Job Dossier & Duties */}
        <div className="lg:col-span-7 space-y-4">
          {currentJob ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
              
              {/* Job Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200">
                      کد ردیف: {currentJob.code || currentJob.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-xl">
                      دایره: {currentJob.department}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {currentJob.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    رده تخصصی: <strong className="text-slate-700">{currentJob.category || 'عملیاتی و صیانتی فراجا'}</strong>
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${
                    currentJob.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {currentJob.status === 'active' ? 'پست مصوب فعال' : 'پست در انتظار تامین پرسنل'}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    کلانتری ۱۰۳ گاندی تهران
                  </span>
                </div>
              </div>

              {/* Job Duties (شرح وظایف مصوب) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                      {currentDuties.length}
                    </div>
                    <h4 className="text-sm font-black text-slate-900">
                      شرح وظایف مصوب سازمانی (Duties)
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    پایه استخراج شایستگی‌های شغلی
                  </span>
                </div>

                <div className="space-y-3">
                  {currentDuties.map((duty, idx) => {
                    const dutyCompetencies = competencyService.getCompetenciesByDuty(duty.id);
                    return (
                      <div
                        key={duty.id}
                        className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3 transition hover:border-indigo-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <h5 className="text-xs font-black text-slate-900 leading-snug">
                                {duty.title}
                              </h5>
                              {duty.description && (
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                  {duty.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-lg shrink-0">
                            {dutyCompetencies.length} شایستگی مرتبط
                          </span>
                        </div>

                        {/* Duty Measurement / Formula */}
                        {duty.formula && (
                          <div className="bg-white rounded-xl p-2.5 border border-slate-200 text-xs flex items-center gap-2 text-slate-700">
                            <Target className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span className="font-bold text-slate-500">شاخص سنجش وظیفه:</span>
                            <span className="font-semibold text-slate-800 line-clamp-1">{duty.formula}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {currentDuties.length === 0 && (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      برای این شغل هنوز وظیفه‌ای ثبت نشده است.
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action: Proceed Directly to Step 2 (Extracted Competencies) */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <span>آماده برای مرحله بعد: </span>
                  <strong className="text-slate-800">{currentCompetenciesCount} شایستگی</strong>
                  <span> برای این شغل استخراج شده است.</span>
                </div>

                <button
                  type="button"
                  onClick={onNextStep}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer"
                >
                  <span>رفتن به مرحله ۲: مشاهده شایستگی‌های استخراج‌شده</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              لطفاً یک شغل را از لیست سمت راست انتخاب نمایید.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
