import React, { useState, useEffect } from 'react';
import { 
  Award, 
  AlertTriangle, 
  GraduationCap, 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  FileText, 
  ShieldAlert, 
  Sparkles, 
  Send,
  User
} from 'lucide-react';
import { competencyService, Employee, Competency, ManagerActionType } from '../../services/competencyService';

interface ManagerActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmployeeId?: string;
  defaultCompetencyId?: string;
  defaultActionType?: ManagerActionType;
  onActionSuccess?: () => void;
}

const REWARD_OPTIONS = [
  { id: 'leave', title: 'مرخصی تشویقی', defaultDuration: '۳ روز مرخصی تشویقی', icon: '🌴', desc: 'اعطای ۱ تا ۵ روز مرخصی تشویقی با تایید فرمانده یگان' },
  { id: 'cash', title: 'پاداش نقدی و افزایش مزایا', defaultDuration: 'پاداش نقدی فصلی و ۵۰ امتیاز حکمت', icon: '💳', desc: 'واریز پاداش ریالی ویژه و ارتقای سهمیه حکمت' },
  { id: 'commendation', title: 'لوح تقدیر و تشویق در دستور یگانی', defaultDuration: 'درج تقدیر در دستور هفتگی یگان', icon: '📜', desc: 'قرائت در صبحگاه مشترک و ثبت در سوابق خدمتی' },
  { id: 'promotion', title: 'پیشنهاد ارشدیت درجه / تسریع در ترفیع', defaultDuration: '۶ ماه ارشدیت درجه', icon: '⭐', desc: 'ارسال پرونده به کمیسیون ارتقا جهت تسریع در اخذ درجه بعدی' },
  { id: 'welfare', title: 'اولویت در اماکن اقامتی و تسهیلات رفاهی', defaultDuration: 'سهمیه مجتمع اقامتی خزرآباد', icon: '🏨', desc: 'واگذاری فوری نوبت هتل و اماکن تفریحی فراجا' },
];

const PENALTY_OPTIONS = [
  { id: 'mandatory_overtime', title: 'اضافه کار اجباری و شیفت نگهبانی', defaultDuration: '۴ ساعت اضافه کار اجباری / شیفت مضاعف', icon: '⏱️', desc: 'تخصیص شیفت مازاد و خدمت نگهبانی خارج از نوبت موظف' },
  { id: 'written_reprimand', title: 'توبیخ کتبی با درج در پرونده خدمتی', defaultDuration: 'توبیخ کتبی درجه یک با درج در سابقه', icon: '⚠️', desc: 'ابلاغ رسمی نامه انضباطی با بازتاب در ارزیابی سالانه' },
  { id: 'points_deduction', title: 'کسر امتیاز عملکردی و کاهش پاداش', defaultDuration: 'کسر ۱۵ امتیاز عملکرد و ۵۰٪ پاداش فصلی', icon: '📉', desc: 'تنزل نمره شاخص بهره‌وری و کسر از فوق‌العاده ماموریت' },
  { id: 'leave_suspension', title: 'تعویق یا لغو موقت مرخصی استحقاقی', defaultDuration: 'تعویق مرخصی تا جبران شاخص عملکردی', icon: '🚫', desc: 'منوط شدن تایید مرخصی به بهبود نمره ارزیابی' },
  { id: 'disciplinary_board', title: 'احضار به کمیسیون انضباطی یگان', defaultDuration: 'ارجاع پرونده به کمیسیون رسیدگی تخلفات', icon: '⚖️', desc: 'بررسی حضوری عملکرد و اتخاذ تصمیمات تنبیهی شدیدتر' },
];

const TRAINING_COURSES = [
  { id: 'tr1', title: 'دوره تخصصی گشت و عملیات واکنش سریع ۱۱۰', hours: '۱۶ ساعت', type: 'عملیاتی / میدانی', targetComp: 'واکنش سریع و گشت‌زنی', icon: '🚨' },
  { id: 'tr2', title: 'مدیریت صحنه جرم و کشف علمی جرایم', hours: '۲۴ ساعت', type: 'کارگاهی / تخصصی', targetComp: 'تنظیم صورتجلسه و مهار متهم', icon: '🔍' },
  { id: 'tr3', title: 'رانندگی تدافعی، تعقیب و گریز و اسکورت', hours: '۲۰ ساعت', type: 'مهارتی و میدانی', targetComp: 'مسیریابی تاکتیکی و مانور', icon: '🏍️' },
  { id: 'tr4', title: 'حقوق شهروندی، موازین شرعی و ضابطیت قضایی', hours: '۱۲ ساعت', type: 'الکترونیکی / آنلاین', targetComp: 'تکریم ارباب‌رجوع و انطباق قانونی', icon: '⚖️' },
  { id: 'tr5', title: 'کنترل استرس، تاب‌آوری و مهارت مذاکره در بحران', hours: '۱۶ ساعت', type: 'صوتی و تصویری', targetComp: 'هوشیاری محیطی و روابط عمومی', icon: '🧠' },
  { id: 'tr6', title: 'کار با سامانه‌های هوشمند پلیسی و پهپادی', hours: '۱۸ ساعت', type: 'فنی و سامانه‌ای', targetComp: 'تحلیل داده و ثبت هوشمند', icon: '📡' },
  { id: 'tr7', title: 'سلاح‌شناسی تاکتیکی و تیراندازی دقیق', hours: '۳۰ ساعت', type: 'میدان تیر / عملیاتی', targetComp: 'آمادگی رزمی و بازدارندگی', icon: '🎯' },
  { id: 'tr8', title: 'آمادگی جسمانی، چابکی و فنون دفاع شخصی', hours: '۲۴ ساعت', type: 'باشگاهی و آمادگی بدنی', targetComp: 'آمادگی جسمانی و چابکی', icon: '🥋' },
];

export function ManagerActionModal({
  isOpen,
  onClose,
  defaultEmployeeId,
  defaultCompetencyId,
  defaultActionType = 'reward',
  onActionSuccess
}: ManagerActionModalProps) {
  const employees = competencyService.getEmployees();
  const [actionType, setActionType] = useState<ManagerActionType>(defaultActionType);
  const [selectedEmpId, setSelectedEmpId] = useState<string>(defaultEmployeeId || employees[0]?.id || '');
  const [selectedCompId, setSelectedCompId] = useState<string>(defaultCompetencyId || '');
  
  // Specific Form states
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [customAmountOrDuration, setCustomAmountOrDuration] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(TRAINING_COURSES[0].id);
  const [actionDetails, setActionDetails] = useState<string>('');
  const [commanderName, setCommanderName] = useState<string>('سرهنگ رضایی - فرمانده یگان');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const selectedEmployee = employees.find(e => e.id === selectedEmpId);
  const employeeJob = selectedEmployee ? competencyService.getJobById(selectedEmployee.jobId) : null;
  const competencies = selectedEmployee ? competencyService.getCompetenciesByJob(selectedEmployee.jobId) : [];

  // Sync props
  useEffect(() => {
    if (defaultActionType) setActionType(defaultActionType);
    if (defaultEmployeeId) setSelectedEmpId(defaultEmployeeId);
    if (defaultCompetencyId) setSelectedCompId(defaultCompetencyId);
  }, [defaultActionType, defaultEmployeeId, defaultCompetencyId]);

  // Set default category when actionType changes
  useEffect(() => {
    if (actionType === 'reward') {
      setSelectedSubCategory(REWARD_OPTIONS[0].title);
      setCustomAmountOrDuration(REWARD_OPTIONS[0].defaultDuration);
    } else if (actionType === 'penalty') {
      setSelectedSubCategory(PENALTY_OPTIONS[0].title);
      setCustomAmountOrDuration(PENALTY_OPTIONS[0].defaultDuration);
    } else if (actionType === 'training') {
      const course = TRAINING_COURSES[0];
      setSelectedSubCategory(course.title);
      setCustomAmountOrDuration(course.hours);
    }
  }, [actionType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setIsSubmitting(true);

    let title = '';
    let category = selectedSubCategory;
    let details = actionDetails;
    let amountOrDuration = customAmountOrDuration;

    if (actionType === 'reward') {
      title = `تشویق: ${selectedSubCategory}`;
      if (!details) {
        details = `اعطای ${amountOrDuration} به پاس کسب عملکرد برجسته و اهتمام ویژه در شایستگی‌های یگانی.`;
      }
    } else if (actionType === 'penalty') {
      title = `اقدام انضباطی: ${selectedSubCategory}`;
      if (!details) {
        details = `ابلاغ ${amountOrDuration} به علت بروز عدم انطباق عملکردی و ضرورت اصلاح شاخص‌های مهارتی.`;
      }
    } else if (actionType === 'training') {
      const course = TRAINING_COURSES.find(c => c.id === selectedCourseId);
      title = `ارجاع به دوره: ${course?.title || selectedSubCategory}`;
      category = 'دوره آموزشی مصوب';
      amountOrDuration = course?.hours || '۱۶ ساعت';
      if (!details) {
        details = `لینک و ثبت‌نام در ${course?.title} به منظور پوشش شکاف مهارتی و ارتقای نمره به حد نصاب استاندارد.`;
      }
    }

    competencyService.addManagerAction({
      employeeId: selectedEmployee.id,
      type: actionType,
      title,
      category,
      details,
      competencyId: selectedCompId || undefined,
      amountOrDuration,
      commanderName,
      status: 'applied'
    });

    setIsSubmitting(false);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
      if (onActionSuccess) onActionSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${
              actionType === 'reward' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
              actionType === 'penalty' ? 'bg-rose-950 text-rose-300 border border-rose-700' :
              'bg-sky-950 text-sky-300 border border-sky-700'
            }`}>
              {actionType === 'reward' ? <Award className="w-5 h-5" /> :
               actionType === 'penalty' ? <AlertTriangle className="w-5 h-5" /> :
               <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-black">
                {actionType === 'reward' ? 'ثبت تشویق و اعطای مرخصی / پاداش سازمانی' :
                 actionType === 'penalty' ? 'ثبت اقدام انضباطی و اضافه کار اجباری' :
                 'ارجاع و لینک مستقیم به دوره‌های آموزشی فراجا'}
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                پنل صدور دستور و تصمیمات فرماندهی بر اساس ماتریس شایستگی‌ها
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Type Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={() => setActionType('reward')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
              actionType === 'reward'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/80'
            }`}
          >
            <Award className="w-4 h-4" />
            ۱. تشویق (مرخصی، پاداش، تقدیر)
          </button>

          <button
            type="button"
            onClick={() => setActionType('penalty')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
              actionType === 'penalty'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/80'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            ۲. تنبیه (اضافه کار اجباری، توبیخ)
          </button>

          <button
            type="button"
            onClick={() => setActionType('training')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
              actionType === 'training'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white/80'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            ۳. ارجاع به آموزش مهارتی
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Employee & Competency Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" /> پرسنل مورد نظر:
              </label>
              <select
                value={selectedEmpId}
                onChange={e => {
                  setSelectedEmpId(e.target.value);
                  setSelectedCompId('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-black text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 transition"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.rank}) - کد: {emp.personnelCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" /> شایستگی مرتبط در ماتریس:
              </label>
              <select
                value={selectedCompId}
                onChange={e => setSelectedCompId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 transition"
              >
                <option value="">عملکرد عمومی و جامع پرسنل</option>
                {competencies.map(comp => (
                  <option key={comp.id} value={comp.id}>
                    {comp.title} (هدف: {comp.expectedScore})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action-Specific Options */}
          {actionType === 'reward' && (
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 block">
                نوع تشویق سازمانی:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {REWARD_OPTIONS.map(opt => {
                  const isSelected = selectedSubCategory === opt.title;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setSelectedSubCategory(opt.title);
                        setCustomAmountOrDuration(opt.defaultDuration);
                      }}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-600 ring-1 ring-emerald-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{opt.icon}</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">{opt.title}</h4>
                          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{opt.desc}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <label className="text-xs font-black text-slate-800 block mb-1">
                  میزان / تعداد روز / شرح سرفصل تشویقی:
                </label>
                <input
                  type="text"
                  value={customAmountOrDuration}
                  onChange={e => setCustomAmountOrDuration(e.target.value)}
                  placeholder="مثلاً: ۳ روز مرخصی تشویقی یا ۲۰۰,۰۰۰ ریال پاداش"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                  required
                />
              </div>
            </div>
          )}

          {actionType === 'penalty' && (
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 block">
                نوع اقدام انضباطی و تنبیه:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PENALTY_OPTIONS.map(opt => {
                  const isSelected = selectedSubCategory === opt.title;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setSelectedSubCategory(opt.title);
                        setCustomAmountOrDuration(opt.defaultDuration);
                      }}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-50/70 border-rose-600 ring-1 ring-rose-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{opt.icon}</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">{opt.title}</h4>
                          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{opt.desc}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <label className="text-xs font-black text-slate-800 block mb-1">
                  مدت زمان اضافه کار اجباری / شیفت / میزان کسر امتیاز:
                </label>
                <input
                  type="text"
                  value={customAmountOrDuration}
                  onChange={e => setCustomAmountOrDuration(e.target.value)}
                  placeholder="مثلاً: ۴ ساعت اضافه کار اجباری در شیفت شب"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 transition"
                  required
                />
              </div>
            </div>
          )}

          {actionType === 'training' && (
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 block">
                انتخاب دوره آموزشی متناسب از فهرست آموزش‌های فعال فراجا:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 custom-scrollbar">
                {TRAINING_COURSES.map(course => {
                  const isSelected = selectedCourseId === course.id;
                  return (
                    <div
                      key={course.id}
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setSelectedSubCategory(course.title);
                        setCustomAmountOrDuration(course.hours);
                      }}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-sky-50/80 border-sky-600 ring-1 ring-sky-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl">{course.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-900 leading-snug truncate">{course.title}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold mt-1">
                            <span className="bg-slate-100 px-2 py-0.5 rounded">{course.hours}</span>
                            <span>{course.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Details / Commander notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-800 flex items-center justify-between">
              <span>شرح دستور و مستندات ارزیابی:</span>
              <span className="text-[10px] text-slate-400 font-medium">قابل مشاهده در کارنامه پرسنل</span>
            </label>
            <textarea
              rows={2}
              value={actionDetails}
              onChange={e => setActionDetails(e.target.value)}
              placeholder="توضیحات تکمیلی، شماره دستور یا علت تصمیم‌گیری بر مبنای کارنامه..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 transition"
            />
          </div>

          {/* Commander signature field */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-800 block">
              مقام صادرکننده دستور:
            </label>
            <input
              type="text"
              value={commanderName}
              onChange={e => setCommanderName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-slate-800 transition"
            />
          </div>

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="bg-emerald-950 border border-emerald-700 text-emerald-200 p-3 rounded-xl text-xs font-black flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              دستور با موفقیت ثبت، در کارنامه پرسنل درج و ابلاغ الکترونیکی صادر گردید.
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-black transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-xl text-white text-xs font-black flex items-center gap-2 shadow-xs transition ${
                actionType === 'reward' ? 'bg-emerald-700 hover:bg-emerald-800' :
                actionType === 'penalty' ? 'bg-rose-700 hover:bg-rose-800' :
                'bg-sky-700 hover:bg-sky-800'
              }`}
            >
              <Send className="w-4 h-4" />
              {actionType === 'reward' ? 'ثبت و ابلاغ تشویق' :
               actionType === 'penalty' ? 'ثبت و ابلاغ اقدام انضباطی' :
               'لینک و ثبت‌نام در دوره آموزشی'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
