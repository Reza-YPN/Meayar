import React, { useState } from 'react';
import { Plus, Search, Link as LinkIcon, Trash2, Edit2, Sparkles, Filter, ChevronRight, CheckCircle2, ArrowRight, Loader2, Award, Target, HelpCircle } from 'lucide-react';
import { 
  competencyService, 
  Job, 
  Duty, 
  Competency, 
  CompetencyLevel, 
  CompetencyImpact, 
  CompetencyType, 
  CompetencyImportance,
  ProficiencyLevel
} from '../../services/competencyService';

export function CompetencyMappingTab({ readOnly = false }: { readOnly?: boolean }) {
  const [jobs, setJobs] = useState<Job[]>(competencyService.getJobs());
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  
  const currentDuties = competencyService.getDutiesByJob(selectedJobId);
  const [selectedDutyId, setSelectedDutyId] = useState<string>(currentDuties[0]?.id || '');

  const [competencies, setCompetencies] = useState<Competency[]>(
    competencyService.getCompetenciesByJob(selectedJobId)
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiCompCount, setAiCompCount] = useState<number>(4);
  const [aiCustomPrompt, setAiCustomPrompt] = useState<string>('');

  // Form State
  const [form, setForm] = useState<{
    title: string;
    description: string;
    level: CompetencyLevel;
    impact: CompetencyImpact;
    type: CompetencyType;
    importance: CompetencyImportance;
    expectedScore: number;
    proficiencyLevel: ProficiencyLevel;
    evaluationCriteria: string;
  }>({
    title: '',
    description: '',
    level: 'individual',
    impact: 'process',
    type: 'specialized',
    importance: 'critical',
    expectedScore: 85,
    proficiencyLevel: 4,
    evaluationCriteria: ''
  });

  const handleJobChange = (jobId: string) => {
    setSelectedJobId(jobId);
    const dutiesForJob = competencyService.getDutiesByJob(jobId);
    setSelectedDutyId(dutiesForJob[0]?.id || '');
    setCompetencies(competencyService.getCompetenciesByJob(jobId));
  };

  const handleDutyChange = (dutyId: string) => {
    setSelectedDutyId(dutyId);
  };

  const handleAddCompetency = () => {
    if (!selectedDutyId || !form.title.trim()) return;

    competencyService.addCompetency({
      dutyId: selectedDutyId,
      title: form.title,
      description: form.description,
      level: form.level,
      impact: form.impact,
      type: form.type,
      importance: form.importance,
      expectedScore: Number(form.expectedScore) || 80,
      proficiencyLevel: Number(form.proficiencyLevel) as ProficiencyLevel || 3,
      evaluationCriteria: form.evaluationCriteria
    });

    setCompetencies(competencyService.getCompetenciesByJob(selectedJobId));
    setForm({
      title: '',
      description: '',
      level: 'individual',
      impact: 'process',
      type: 'specialized',
      importance: 'critical',
      expectedScore: 85,
      proficiencyLevel: 4,
      evaluationCriteria: ''
    });
  };

  const handleDeleteCompetency = (id: string) => {
    competencyService.deleteCompetency(id);
    setCompetencies(competencyService.getCompetenciesByJob(selectedJobId));
  };

  const handleAIExtract = async () => {
    if (!selectedDutyId) return;
    const duty = currentDuties.find(d => d.id === selectedDutyId);
    const job = jobs.find(j => j.id === selectedJobId);

    setIsGenerating(true);
    await competencyService.generateAICompetencies({
      dutyId: selectedDutyId,
      dutyTitle: duty?.title || 'وظایف محوله',
      jobTitle: job?.title || 'شغل سازمانی',
      count: aiCompCount,
      customPrompt: aiCustomPrompt
    });

    setCompetencies(competencyService.getCompetenciesByJob(selectedJobId));
    setIsGenerating(false);
    setShowAiModal(false);
  };

  const selectedDuty = currentDuties.find(d => d.id === selectedDutyId);
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  // Impact level badge helper
  const getImpactBadge = (impact: CompetencyImpact) => {
    switch (impact) {
      case 'input':
        return <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-black px-2 py-0.5 rounded-lg">درون‌داد</span>;
      case 'process':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black px-2 py-0.5 rounded-lg">فرآیند</span>;
      case 'product':
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-black px-2 py-0.5 rounded-lg">محصول</span>;
      case 'output':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-lg">برون‌داد</span>;
      case 'outcome':
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black px-2 py-0.5 rounded-lg">پیامد و اثر</span>;
    }
  };

  // Level badge helper
  const getLevelBadge = (level: CompetencyLevel) => {
    switch (level) {
      case 'individual':
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">سطح فردی</span>;
      case 'team':
        return <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md">سطح گروهی</span>;
      case 'organizational':
        return <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md">سطح سازمانی</span>;
      case 'social':
        return <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-md">سطح اجتماعی</span>;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Filter Bar: Job and Duty Selector */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="flex-1">
            <label className="text-[11px] font-black text-slate-500 block mb-1.5">۱. انتخاب عنوان شغل:</label>
            <select
              value={selectedJobId}
              onChange={e => handleJobChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-black text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            >
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="text-[11px] font-black text-slate-500 block mb-1.5">۲. نگاشت به وظیفه مشخص:</label>
            <select
              value={selectedDutyId}
              onChange={e => handleDutyChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-black text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all truncate"
            >
              {currentDuties.length === 0 ? (
                <option value="">وظیفه‌ای برای این شغل تعریف نشده</option>
              ) : (
                currentDuties.map((d, i) => (
                  <option key={d.id} value={d.id}>{i + 1}. {d.title}</option>
                ))
              )}
            </select>
          </div>
        </div>

        {!readOnly && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAiModal(true)}
              disabled={!selectedDutyId}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              استخراج هوشمند شایستگی‌ها
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Add Form and Competency List */}
      <div className={`grid gap-6 ${readOnly ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
        
        {/* Right Form: Add Custom Competency (Only if not readOnly) */}
        {!readOnly && (
          <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 h-fit">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-xs md:text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                تعریف شایستگی جدید
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                متصل به: <span className="text-indigo-600">{selectedDuty ? selectedDuty.title.slice(0, 20) + '...' : 'عمومی'}</span>
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black text-slate-600 block mb-1">عنوان شایستگی یا مهارت:</label>
                <input
                  type="text"
                  placeholder="مثال: تسلط بر قوانین بکارگیری سلاح و کنترل تنش"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-600 block mb-1">توضیح شایستگی (رفتارها و مصادیق):</label>
                <textarea
                  placeholder="شرح رفتارهای مشاهده‌پذیر و مهارت‌های مورد انتظار..."
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all min-h-[50px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-600 block mb-1">سطح کارکرد:</label>
                  <select
                    value={form.level}
                    onChange={e => setForm({...form, level: e.target.value as CompetencyLevel})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="individual">فردی (شخصی و دانشی)</option>
                    <option value="team">گروهی (تعامل و هماهنگی)</option>
                    <option value="organizational">سازمانی (فراگیر و سیستمی)</option>
                    <option value="social">اجتماعی (خدمت به مردم)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-600 block mb-1">سطح اثرگذاری:</label>
                  <select
                    value={form.impact}
                    onChange={e => setForm({...form, impact: e.target.value as CompetencyImpact})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="input">درون‌داد (Input)</option>
                    <option value="process">فرآیند (Process)</option>
                    <option value="product">محصول (Product)</option>
                    <option value="output">برون‌داد (Output)</option>
                    <option value="outcome">پیامد و اثر (Outcome)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-600 block mb-1">نوع شایستگی:</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({...form, type: e.target.value as CompetencyType})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="specialized">تخصصی</option>
                    <option value="general">عمومی</option>
                    <option value="core">محوری و کلیدی</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-600 block mb-1">نقش و اهمیت:</label>
                  <select
                    value={form.importance}
                    onChange={e => setForm({...form, importance: e.target.value as CompetencyImportance})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="critical">حیاتی</option>
                    <option value="enabler">توانمندساز</option>
                    <option value="improver">بهبوددهنده</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-600 block mb-1">
                    سطح تسلط: <span className="text-indigo-600 font-extrabold">{form.proficiencyLevel} از ۵</span>
                  </label>
                  <select
                    value={form.proficiencyLevel}
                    onChange={e => setForm({...form, proficiencyLevel: Number(e.target.value) as ProficiencyLevel})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value={1}>۱ - مقدماتی و آشنایی</option>
                    <option value={2}>۲ - در حال توسعه</option>
                    <option value={3}>۳ - تسلط پایه و مستقل</option>
                    <option value={4}>۴ - تسلط کامل و پیشرفته</option>
                    <option value={5}>۵ - خبرگی، راهبری و الگو</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-600 block mb-1">نمره هدف (از ۱۰۰):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.expectedScore}
                    onChange={e => setForm({...form, expectedScore: Number(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-600 block mb-1">معیار ارزیابی و سنجش عملکرد (KPI):</label>
                <textarea
                  placeholder="نحوه اندازه‌گیری شایستگی، آزمون یا شاخص ارزیابی میدانی..."
                  value={form.evaluationCriteria}
                  onChange={e => setForm({...form, evaluationCriteria: e.target.value})}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all min-h-[50px]"
                />
              </div>

              <button
                onClick={handleAddCompetency}
                disabled={!selectedDutyId || !form.title.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                افزودن به ماتریس شایستگی
              </button>
            </div>
          </div>
        )}

        {/* Competencies List */}
        <div className={`${readOnly ? 'w-full' : 'lg:col-span-7'} space-y-4`}>
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <h3 className="font-black text-slate-800 text-xs md:text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              شایستگی‌های استخراج شده برای شغل ({competencies.length})
            </h3>
            <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-xl">
              {selectedJob?.title}
            </span>
          </div>

          <div className="space-y-3">
            {competencies.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold">
                هنوز شایستگی برای این شغل استخراج نشده است. از دکمه استخراج هوشمند یا فرم سمت راست استفاده کنید.
              </div>
            ) : (
              competencies.map((comp, idx) => {
                const duty = currentDuties.find(d => d.id === comp.dutyId);
                return (
                  <div key={comp.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-black text-slate-800 text-xs md:text-sm">{comp.title}</h4>
                        </div>
                        {comp.description && (
                          <p className="text-xs text-slate-600 leading-relaxed font-medium pr-7">{comp.description}</p>
                        )}
                      </div>

                      {!readOnly && (
                        <button
                          onClick={() => handleDeleteCompetency(comp.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                          title="حذف شایستگی"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex items-center gap-2 flex-wrap pr-7 pt-1 border-t border-slate-100">
                      {getLevelBadge(comp.level)}
                      {getImpactBadge(comp.impact)}
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {comp.type === 'specialized' ? 'تخصصی' : comp.type === 'core' ? 'محوری' : 'عمومی'}
                      </span>
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-md">
                        تسلط: {comp.proficiencyLevel} از ۵
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md">
                        هدف: {comp.expectedScore}٪
                      </span>
                    </div>

                    {/* KPI / Evaluation Criteria */}
                    {comp.evaluationCriteria && (
                      <div className="bg-slate-50 p-3 rounded-2xl mr-7 text-xs border border-slate-200/60">
                        <span className="text-[10px] font-black text-slate-500 block mb-1">معیار ارزیابی و سنجش عملکرد:</span>
                        <span className="text-slate-700 font-bold">{comp.evaluationCriteria}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* AI Extraction Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200" dir="rtl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" /> استخراج هوشمند شایستگی‌ها با هوش مصنوعی
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
            </div>

            <div className="space-y-4">
              <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100">
                <span className="text-[10px] font-bold text-indigo-700 block">شرح شغل انتخاب شده:</span>
                <span className="text-xs font-black text-indigo-950 mt-1 block">
                  {selectedDuty ? selectedDuty.title : 'کلیه وظایف شغل'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">
                  تعداد شایستگی مورد نیاز: <span className="text-indigo-600 font-extrabold text-sm">{aiCompCount} شایستگی</span>
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={aiCompCount} 
                    onChange={e => setAiCompCount(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input 
                    type="number" 
                    min="1" 
                    max="15" 
                    value={aiCompCount} 
                    onChange={e => setAiCompCount(Math.max(1, Number(e.target.value)))}
                    className="w-16 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-center text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">دستورالعمل تکمیلی استخراج (اختیاری):</label>
                <textarea 
                  placeholder="مثال: روی مهارت‌های رفتاری و انضباطی در مواجهه با مراجعین تاکید شود..."
                  value={aiCustomPrompt}
                  onChange={e => setAiCustomPrompt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-400 min-h-[60px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  انصراف
                </button>
                <button 
                  onClick={handleAIExtract}
                  disabled={isGenerating}
                  className="bg-indigo-600 text-white text-xs font-black px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGenerating ? 'در حال تحلیل و استخراج...' : `استخراج ${aiCompCount} شایستگی هوشمند`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
