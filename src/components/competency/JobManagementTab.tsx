import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Link as LinkIcon,
  Trash2,
  Briefcase,
  Loader2,
  Sparkles,
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  ChevronLeft,
  Shield,
  Lock,
  Unlock,
  Building2,
  Eye,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { competencyService, Job, Duty, JobStatus } from '../../services/competencyService';
import { downloadCompetencyExcelTemplate, importCompetencyDataFromExcel } from '../../utils/exportUtils';
import { KalantariHierarchyChart } from './KalantariHierarchyChart';
import { CommanderPermissionModal } from './CommanderPermissionModal';

export function JobManagementTab({ readOnly = false }: { readOnly?: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<'hierarchy' | 'duties'>('hierarchy');
  const [jobs, setJobs] = useState<Job[]>(competencyService.getJobs());
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);
  const [duties, setDuties] = useState<Duty[]>(selectedJob ? competencyService.getDutiesByJob(selectedJob.id) : []);
  
  // Permission State (if readOnly, permission is always false)
  const [permission, setPermission] = useState(competencyService.getEvaluatorJobManagementPermission());
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCategory, setNewJobCategory] = useState('انتظامی و عملیاتی');
  const [newJobDepartment, setNewJobDepartment] = useState('معاونت پیشگیری');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiJobModal, setShowAiJobModal] = useState(false);
  const [showAiDutyModal, setShowAiDutyModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStatus, setImportStatus] = useState<{ loading: boolean; message?: string; success?: boolean } | null>(null);
  
  // AI generation controls for Jobs
  const [aiJobCount, setAiJobCount] = useState<number>(4);
  const [aiJobCategory, setAiJobCategory] = useState<string>('انتظامی و عملیاتی');
  const [aiJobFocus, setAiJobFocus] = useState<string>('');

  // AI generation controls for Duties ONLY
  const [aiDutyCount, setAiDutyCount] = useState<number>(4);
  const [aiDutyFocus, setAiDutyFocus] = useState<string>('');

  const [newDuty, setNewDuty] = useState({ title: '', description: '', formula: '' });

  const refreshData = (targetJobId?: string) => {
    const updatedJobs = competencyService.getJobs();
    setJobs(updatedJobs);
    const target = targetJobId ? updatedJobs.find(j => j.id === targetJobId) : selectedJob ? updatedJobs.find(j => j.id === selectedJob.id) : updatedJobs[0];
    setSelectedJob(target || null);
    setDuties(target ? competencyService.getDutiesByJob(target.id) : []);
    setPermission(competencyService.getEvaluatorJobManagementPermission());
  };

  useEffect(() => {
    const unsubscribe = competencyService.subscribe(() => {
      refreshData();
    });
    return () => unsubscribe();
  }, []);

  const handleAddJob = () => {
    if (!permission.granted) {
      alert('دسترسی تعریف شغل مسدود است. لطفاً ابتدا از طریق دکمه «درخواست مجوز فرماندهی»، تاییدیه لازم را ثبت نمایید.');
      return;
    }
    if (!newJobTitle.trim()) return;
    const added = competencyService.addJob({ 
      title: newJobTitle.trim(), 
      category: newJobCategory,
      department: newJobDepartment,
      status: 'active'
    });
    setNewJobTitle('');
    refreshData(added.id);
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setDuties(competencyService.getDutiesByJob(job.id));
    setActiveSubTab('duties');
  };

  const handleDeleteJob = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!permission.granted) {
      alert('حذف شغل مجاز نیست. ابتدا باید مجوز فرماندهی ثبت شود.');
      return;
    }
    if (confirm('آیا از حذف این ردیف شغلی و تمامی وظایف و شایستگی‌های متصل به آن اطمینان دارید؟')) {
      competencyService.deleteJob(jobId);
      const updated = competencyService.getJobs();
      setJobs(updated);
      if (selectedJob?.id === jobId) {
        setSelectedJob(updated[0] || null);
        setDuties(updated[0] ? competencyService.getDutiesByJob(updated[0].id) : []);
      }
    }
  };

  const handleAddDuty = () => {
    if (!selectedJob || !newDuty.title.trim()) return;
    competencyService.addDuty({
      jobId: selectedJob.id,
      title: newDuty.title.trim(),
      description: newDuty.description.trim(),
      formula: newDuty.formula.trim()
    });
    setDuties(competencyService.getDutiesByJob(selectedJob.id));
    setNewDuty({ title: '', description: '', formula: '' });
  };

  const handleDeleteDuty = (id: string) => {
    competencyService.deleteDuty(id);
    if (selectedJob) {
      setDuties(competencyService.getDutiesByJob(selectedJob.id));
    }
  };

  const handleAIJobSubmit = async () => {
    if (!permission.granted) return;
    setIsGenerating(true);
    await competencyService.generateAIJobs({
      count: aiJobCount,
      category: aiJobCategory,
      focus: aiJobFocus
    });
    refreshData();
    setIsGenerating(false);
    setShowAiJobModal(false);
  };

  const handleAIDutySubmit = async () => {
    if (!selectedJob) return;
    setIsGenerating(true);
    await competencyService.generateAIDutiesForJob({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      jobCategory: selectedJob.category,
      count: aiDutyCount,
      focus: aiDutyFocus
    });
    setDuties(competencyService.getDutiesByJob(selectedJob.id));
    setIsGenerating(false);
    setShowAiDutyModal(false);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.includes(searchTerm) || (job.category && job.category.includes(searchTerm)) || job.department.includes(searchTerm)
  );

  return (
    <div className="space-y-6" dir="rtl">

      {/* Top Security & Permission Banner */}
      {readOnly ? (
        <div className="p-4 md:p-5 rounded-2xl border bg-slate-900 text-white border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black shrink-0 bg-slate-800 text-emerald-400 border border-slate-700">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md border bg-emerald-900 text-emerald-200 border-emerald-700">
                  شناسنامه مصوب مشاغل کلانتری ۱۰۳ گاندی (۴۶ شغل مصوب)
                </span>
                <span className="text-xs text-slate-300 font-bold">
                  سطح دسترسی پرسنل (مطالعه و آگاهی مأموریتی)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                مشاهده چارت سازمانی، شرح وظایف مصوب و فرمول‌های عملکردی پست‌های خدمتی کلانتری ۱۰۳ گاندی فراجا.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`p-4 md:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition shadow-xs ${
          permission.granted
            ? 'bg-emerald-950 text-white border-emerald-800'
            : 'bg-slate-900 text-white border-slate-800'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black shrink-0 ${
              permission.granted
                ? 'bg-emerald-800/80 text-emerald-300 border border-emerald-700'
                : 'bg-slate-800 text-amber-400 border border-slate-700'
            }`}>
              {permission.granted ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-md border ${
                  permission.granted
                    ? 'bg-emerald-900 text-emerald-200 border-emerald-700'
                    : 'bg-rose-950 text-rose-300 border-rose-800'
                }`}>
                  {permission.granted ? 'دسترسی ویرایش ساختار: فعال شده' : 'قفل امنیتی: ارزیاب فاقد دسترسی تعریف شغل است'}
                </span>
                <span className="text-xs text-slate-300 font-bold">
                  (ساختار مصوب کلانتری ۱۰۳ گاندی - ۴۶ شغل مصوب)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                {permission.granted
                  ? `مجوز تغییرات سازمانی توسط «${permission.grantedBy}» صادر گردیده است.`
                  : 'به‌صورت پیش‌فرض ارزیاب شایستگی مجاز به تعریف، ویرایش یا حذف ساختار مشاغل نیست و صرفاً وظایف و شایستگی‌ها را ارزیابی می‌نماید. اعطای دسترسی مستلزم تایید فرمانده یا ناظر است.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPermissionModal(true)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 shadow-xs cursor-pointer ${
              permission.granted
                ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>{permission.granted ? 'مدیریت / لغو مجوز دسترسی' : 'درخواست / صدور مجوز توسط فرمانده'}</span>
          </button>
        </div>
      )}

      {/* Sub-Tabs Navigator */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('hierarchy')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
            activeSubTab === 'hierarchy'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span>چارت و سلسله‌مراتب مشاغل کلانتری ۱۰۳ گاندی (۴۶ شغل)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('duties')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
            activeSubTab === 'duties'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <span>بررسی و تدوین شرح وظایف شغلی (دایره‌ها و پست‌ها)</span>
          {selectedJob && (
            <span className="bg-indigo-950 text-indigo-200 text-[10px] px-2 py-0.5 rounded-md mr-1">
              {selectedJob.title}
            </span>
          )}
        </button>
      </div>

      {/* VIEW 1: Full Organizational Hierarchy Tree & Statistics */}
      {activeSubTab === 'hierarchy' && (
        <KalantariHierarchyChart
          selectedJobId={selectedJob?.id}
          onSelectJob={handleSelectJob}
        />
      )}

      {/* VIEW 2: Job Duties and Functional Definitions */}
      {activeSubTab === 'duties' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Right Column: Approved Jobs Directory (46 Jobs) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-sm md:text-base flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  عناوین شغلی کلانتری ۱۰۳ گاندی
                </h3>
                <span className="text-[11px] font-bold text-slate-500 block mt-0.5">
                  انتخاب شغل جهت مشاهده شرح وظایف مصوب
                </span>
              </div>

              {/* Add Job Trigger (Only unlocked if Permission Granted and not readOnly) */}
              {!readOnly && (
                permission.granted ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowAiJobModal(true)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-black px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>تولید با هوش مصنوعی</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    تعریف شغل قفل است
                  </span>
                )
              )}
            </div>

            {/* If Permission is granted and not readOnly, show Job Creation Input */}
            {!readOnly && permission.granted && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-black text-slate-700 block">افزودن ردیف شغلی جدید (با مجوز فرماندهی):</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newJobTitle}
                    onChange={e => setNewJobTitle(e.target.value)}
                    placeholder="عنوان شغل جدید..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={newJobDepartment}
                    onChange={e => setNewJobDepartment(e.target.value)}
                    aria-label="دایره یا معاونت سازمانی"
                    className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="ریاست کلانتری">ریاست کلانتری</option>
                    <option value="دایره اجتماعی">دایره اجتماعی</option>
                    <option value="دایره اداری و پشتیبانی">دایره اداری و پشتیبانی</option>
                    <option value="دایره خدمات قضایی">دایره خدمات قضایی</option>
                    <option value="معاونت تجسس">معاونت تجسس</option>
                    <option value="معاونت اطلاعات">معاونت اطلاعات</option>
                    <option value="معاونت پیشگیری">معاونت پیشگیری</option>
                  </select>
                </div>
                <button
                  onClick={handleAddJob}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black py-2 rounded-xl transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ثبت شغل در ساختار کلانتری</span>
                </button>
              </div>
            )}

            {/* Search Jobs */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="جستجو در ۴۶ ردیف شغلی کلانتری ۱۰۳..."
                className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Job List Directory */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredJobs.map(job => {
                const isSelected = selectedJob?.id === job.id;
                const isActive = job.status === 'active';
                const jobDuties = competencyService.getDutiesByJob(job.id);

                return (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setDuties(competencyService.getDutiesByJob(job.id));
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-900 text-white border-indigo-950 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-800'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-indigo-800 text-indigo-200'
                            : isActive
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {isActive ? 'فعال' : 'پیش‌بینی'}
                        </span>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                          {job.department}
                        </span>
                      </div>
                      <h4 className="text-xs md:text-sm font-black leading-snug">
                        {job.title}
                      </h4>
                      <span className={`text-[10px] font-bold block ${isSelected ? 'text-indigo-300' : 'text-slate-500'}`}>
                        {jobDuties.length} وظیفه سازمانی تدوین‌شده
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!readOnly && permission.granted && (
                        <button
                          onClick={e => handleDeleteJob(job.id, e)}
                          title="حذف شغل"
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            isSelected ? 'text-rose-300 hover:bg-indigo-800' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <ChevronLeft className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left Column: Job Details & Operational Duties (وظایف شغلی) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedJob ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
                
                {/* Header for Selected Job */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                        {selectedJob.department}
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${
                        selectedJob.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}>
                        {selectedJob.status === 'active' ? 'وضعیت: شغل فعال در کلانتری ۱۰۳' : 'وضعیت: شغل پیش‌بینی شده'}
                      </span>
                    </div>
                    <h3 className="font-black text-base md:text-lg text-slate-900 mt-1">
                      {selectedJob.title}
                    </h3>
                  </div>

                  {!readOnly && (
                    <button
                      onClick={() => setShowAiDutyModal(true)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-black px-3 py-2 rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>تولید وظایف با هوش مصنوعی</span>
                    </button>
                  )}
                </div>

                {/* Add Duty Form (Only if not readOnly) */}
                {!readOnly && (
                  <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-black text-slate-900 block flex items-center gap-2">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      تعریف شرح وظیفه جدید برای این ردیف شغلی:
                    </span>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newDuty.title}
                        onChange={e => setNewDuty({ ...newDuty, title: e.target.value })}
                        placeholder="عنوان وظیفه موظف سازمانی..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <textarea
                        rows={2}
                        value={newDuty.description}
                        onChange={e => setNewDuty({ ...newDuty, description: e.target.value })}
                        placeholder="شرح جزئیات عملکردی و ماموریتی..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <input
                        type="text"
                        value={newDuty.formula}
                        onChange={e => setNewDuty({ ...newDuty, formula: e.target.value })}
                        placeholder="فرمول یا فرمول سنجش اثربخشی وظیفه..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      onClick={handleAddDuty}
                      disabled={!newDuty.title.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>افزودن وظیفه به شغل</span>
                    </button>
                  </div>
                )}

                {/* List of Duties */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      وظایف سازمانی ثبت‌شده ({duties.length} مورد)
                    </h4>
                  </div>

                  {duties.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 space-y-2">
                      <FileText className="w-8 h-8 mx-auto opacity-40" />
                      <p className="text-xs font-bold">هنوز شرح وظیفه‌ای برای این ردیف شغلی تدوین نشده است.</p>
                      {!readOnly && (
                        <button
                          onClick={() => setShowAiDutyModal(true)}
                          className="text-xs font-black text-indigo-600 hover:underline cursor-pointer"
                        >
                          پیشنهاد وظایف استاندارد با هوش مصنوعی
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {duties.map((duty, idx) => {
                        const comps = competencyService.getCompetenciesByDuty(duty.id);
                        return (
                          <div key={duty.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-2 relative group hover:border-slate-300 transition">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1 flex-1">
                                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                  وظیفه شماره {idx + 1}
                                </span>
                                <h5 className="font-black text-xs md:text-sm text-slate-900 leading-snug">
                                  {duty.title}
                                </h5>
                              </div>
                              {!readOnly && (
                                <button
                                  onClick={() => handleDeleteDuty(duty.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                                  title="حذف وظیفه"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            {duty.description && (
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                {duty.description}
                              </p>
                            )}

                            {duty.formula && (
                              <div className="bg-white p-2 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700 font-mono">
                                📐 {duty.formula}
                              </div>
                            )}

                            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
                              <span className="text-indigo-600 font-black">
                                {comps.length} شایستگی مرتبط در ماتریس
                              </span>
                              <span className="text-slate-400">کد وظیفه: {duty.id}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400">
                <Briefcase className="w-10 h-10 mx-auto opacity-40 mb-2" />
                <p className="text-xs font-bold">لطفاً یک شغل را از فهرست سمت راست انتخاب کنید.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Commander Permission Authorization Modal */}
      <CommanderPermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onPermissionUpdated={() => {
          refreshData();
        }}
      />

      {/* AI Duties Modal */}
      {showAiDutyModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" dir="rtl">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm md:text-base text-slate-900">
                  تولید هوشمند وظایف شغلی
                </h3>
                <p className="text-xs text-slate-500 font-bold">{selectedJob.title}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-slate-700">تعداد وظایف پیشنهادی:</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={aiDutyCount}
                  onChange={e => setAiDutyCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">تاکید خاص یا شرایط ویژه کلانتری:</label>
                <input
                  type="text"
                  value={aiDutyFocus}
                  onChange={e => setAiDutyFocus(e.target.value)}
                  placeholder="مثال: تمرکز بر محدوده تجاری گاندی، پیشگیری از سرقت..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowAiDutyModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                انصراف
              </button>
              <button
                onClick={handleAIDutySubmit}
                disabled={isGenerating}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isGenerating ? 'در حال پردازش...' : 'تولید هوشمند وظایف'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
