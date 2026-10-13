import React, { useState } from "react";
import {
  HeartPulse,
  Activity,
  UserCheck,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  PieChart as PieChartIcon,
  Plus,
  Calendar,
  Clock,
  User,
  ShieldAlert,
  FileText,
  ChevronRight,
  Search,
  Filter,
  Check,
  X,
  Sparkles,
  Timer,
  AlertCircle
} from "lucide-react";
import { useRole } from "../context/RoleContext";
import { motion, AnimatePresence } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

// Shared Animation Presets
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Mock Initial Data
const INITIAL_HEALTH_REQUESTS = [
  { id: 1, type: "معاینات ادواری سالانه", date: "۱۴۰۵/۰۵/۲۵", time: "۰۹:۳۰", status: "approved", statusText: "تایید شده", doctor: "دکتر مهدوی (پزشک یگان)" },
  { id: 2, type: "کمیسیون عالی پزشکی (ارزیابی محدودیت خدمت)", date: "۱۴۰۵/۰۶/۱۰", time: "۱۱:۰۰", status: "pending", statusText: "در انتظار بررسی مدارک", doctor: "-" }
];

const HEALTH_STATUS_DATA = [
  { name: 'سلامت کامل', value: 65, color: '#10b981' },
  { name: 'نیازمند مراقبت دوره‌ای', value: 25, color: '#f59e0b' },
  { name: 'نیازمند اقدام درمانی', value: 10, color: '#ef4444' },
];

const HEALTH_ISSUES_DATA = [
  { name: 'اسکلتی عضلانی', تعداد: 15 },
  { name: 'قلبی عروقی', تعداد: 8 },
  { name: 'بینایی', تعداد: 12 },
  { name: 'شنوایی', تعداد: 5 },
  { name: 'تنفسی', تعداد: 3 },
];

// Survey Questions
const SURVEY_QUESTIONS = [
  { id: "q1", category: "جسمانی", text: "در طول هفته چقدر احساس درد در ناحیه گردن، کمر یا مچ دست دارید؟", options: [{ text: "اصلاً یا خیلی کم", score: 5 }, { text: "گاهی اوقات به صورت خفیف", score: 3 }, { text: "بسیار زیاد و آزاردهنده", score: 1 }] },
  { id: "q2", category: "روانی", text: "میزان استرس و فشار روانی ناشی از محیط و حجم کار چقدر است؟", options: [{ text: "کاملاً قابل مدیریت و مناسب", score: 5 }, { text: "متوسط و گاهی آزاردهنده", score: 3 }, { text: "بسیار شدید و فرساینده", score: 1 }] },
  { id: "q3", category: "ارگونومی", text: "وضعیت نشستن، صندلی و ارگونومی میز کار خود را چگونه ارزیابی می‌کنید؟", options: [{ text: "کاملاً استاندارد و راحت", score: 5 }, { text: "نسبتاً مناسب ولی نیاز به بهبود", score: 3 }, { text: "غیراستاندارد و آسیب‌رسان", score: 1 }] },
  { id: "q4", category: "بینایی/شنوایی", text: "آیا علائمی نظیر خشکی چشم، تاری دید یا سنگینی شنوایی بعد از شیفت کاری دارید؟", options: [{ text: "خیر، اصلاً علائمی ندارم", score: 5 }, { text: "بله، گاهی خشکی یا خستگی خفیف", score: 3 }, { text: "بله، علائم مداوم و آزاردهنده", score: 1 }] }
];

// Drills Data
const OFFICE_DRILLS = [
  { id: 1, title: "کشش گردن و رهاسازی شانه", issue: "درد گردن و شانه", duration: "۳۰ ثانیه", steps: ["سر را به آرامی به سمت راست خم کنید تا گوش به شانه نزدیک شود.", "پنج ثانیه نگه دارید، سپس برای سمت چپ تکرار کنید.", "شانه ها را به صورت دایره ای به سمت عقب بچرخانید."] },
  { id: 2, title: "ورزش مچ دست (سندرم تونل کارپال)", issue: "پیشگیری از درد مچ دست", duration: "۴۰ ثانیه", steps: ["دست خود را به جلو بکشید، انگشتان را به سمت بالا نگه دارید.", "با دست دیگر انگشتان را به آرامی به عقب بکشید تا کشش را حس کنید.", "سپس انگشتان را رو به پایین قرار داده و تمرین را تکرار کنید."] },
  { id: 3, title: "قاعده ۲۰-۲۰-۲۰ (استراحت چشم)", issue: "خستگی و تاری دید", duration: "۲۰ ثانیه", steps: ["هر ۲۰ دقیقه کار با مانیتور را متوقف کنید.", "به مدت ۲۰ ثانیه به نقطه ای در فاصله ۲۰ فوتی (۶ متری) نگاه کنید.", "چند بار به آرامی پلک بزنید تا خشکی چشم برطرف شود."] }
];

function EmployeeView() {
  // Survey State
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, number>>({});
  const [surveyResult, setSurveyResult] = useState<{ score: number; level: string; color: string; desc: string } | null>(null);
  const [lastSurveyText, setLastSurveyText] = useState("۳ ماه پیش");

  // Drills State
  const [activeDrill, setActiveDrill] = useState<typeof OFFICE_DRILLS[0] | null>(null);
  const [drillTimer, setDrillTimer] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<any>(null);

  // Requests State
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestsList, setRequestsList] = useState(INITIAL_HEALTH_REQUESTS);
  const [newRequestType, setNewRequestType] = useState("معاینات ادواری سالانه");
  const [newRequestDate, setNewRequestDate] = useState("");
  const [newRequestTime, setNewRequestTime] = useState("");
  const [newRequestDesc, setNewRequestDesc] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Survey Handler
  const handleAnswerSurvey = (score: number) => {
    const qId = SURVEY_QUESTIONS[surveyStep].id;
    const newAnswers = { ...surveyAnswers, [qId]: score };
    setSurveyAnswers(newAnswers);

    if (surveyStep < SURVEY_QUESTIONS.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      // Calculate Result
      const totalScore = Object.values(newAnswers).reduce((a, b) => a + b, 0);
      const maxScore = SURVEY_QUESTIONS.length * 5;
      const pct = Math.round((totalScore / maxScore) * 100);

      let level = "عالی و ایده آل";
      let color = "text-emerald-600 bg-emerald-50 border-emerald-100";
      let desc = "وضعیت شاخص سلامت جسمانی و روانی شما در رده عالی قرار دارد. به همین روند خودمراقبتی ادامه دهید.";

      if (pct < 60) {
        level = "نیازمند اقدام درمانی فوری";
        color = "text-rose-600 bg-rose-50 border-rose-100";
        desc = "نتایج نشان‌دهنده فشارهای بالای ارگونومیک یا استرس شغلی است. توصیه می‌شود یک نوبت معاینه حضوری طب کار در کادر درمان یگان ثبت کنید.";
      } else if (pct < 85) {
        level = "مراقبت دوره‌ای و تمرینات اصلاحی";
        color = "text-amber-600 bg-amber-50 border-amber-100";
        desc = "سلامت عمومی شما در وضعیت متوسط قرار دارد. انجام تمرینات کششی روزانه و رعایت ارگونومی نشستن توصیه می‌شود.";
      }

      setSurveyResult({ score: pct, level, color, desc });
      setLastSurveyText("امروز (کمی قبل)");
    }
  };

  const resetSurvey = () => {
    setSurveyStep(0);
    setSurveyAnswers({});
    setSurveyResult(null);
    setShowSurvey(false);
  };

  // Drills Timer Handler
  const startDrillTimer = (drill: typeof OFFICE_DRILLS[0]) => {
    if (intervalId) clearInterval(intervalId);
    setActiveDrill(drill);
    
    const secs = drill.duration.includes("۳۰") ? 30 : drill.duration.includes("۴۰") ? 40 : 20;
    setDrillTimer(secs);

    const id = setInterval(() => {
      setDrillTimer((prev) => {
        if (prev !== null && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(id);
          triggerToast(`تمرین "${drill.title}" با موفقیت به پایان رسید. خسته نباشید!`);
          return 0;
        }
      });
    }, 1000);
    setIntervalId(id);
  };

  const stopDrillTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setDrillTimer(null);
    setActiveDrill(null);
  };

  // Submit Request Handler
  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestDate || !newRequestTime) {
      triggerToast("لطفاً تاریخ و ساعت مراجعه را به دقت انتخاب کنید.");
      return;
    }

    const newReq = {
      id: Date.now(),
      type: newRequestType,
      date: newRequestDate.replace(/-/g, "/"),
      time: newRequestTime,
      status: "pending",
      statusText: "در انتظار بررسی مدارک",
      doctor: "-"
    };

    setRequestsList([newReq, ...requestsList]);
    setShowRequestModal(false);
    setNewRequestDate("");
    setNewRequestTime("");
    setNewRequestDesc("");
    triggerToast(`درخواست نوبت ${newRequestType} شما با موفقیت در سامانه طب کار ثبت شد.`);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6" dir="rtl">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 text-white py-3.5 px-6 rounded-xl shadow-xl border border-slate-700/50 flex items-center gap-3 text-xs font-black min-w-[320px] max-w-md justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-[#4455A5] to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-indigo-200" /> سلامت و طب کار کارکنان
          </h1>
          <p className="text-indigo-100/80 text-xs mt-2 font-medium">
            پایش هوشمند خوداظهاری سلامت جسمانی، روان‌شناختی و تمرینات پیشگیری اصلاحی ارگونومی یگانی
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> ثبت درخواست کمیسیون / نوبت معاینه
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Self Assessment & Exercises */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Survey Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-50">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">نظرسنجی خوداظهاری دوره‌ای سلامت</h3>
                  <p className="text-xs text-slate-400 mt-1">آخرین شرکت شما در طرح غربالگری: <span className="font-bold text-indigo-600">{lastSurveyText}</span></p>
                </div>
              </div>
              {!showSurvey && (
                <button 
                  onClick={() => { setShowSurvey(true); setSurveyStep(0); setSurveyResult(null); }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-sm"
                >
                  شروع ارزیابی جدید
                </button>
              )}
            </div>

            {/* Active Survey Progress */}
            {showSurvey && !surveyResult && (
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-black">
                     بخش: {SURVEY_QUESTIONS[surveyStep].category}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                     سوال {surveyStep + 1} از {SURVEY_QUESTIONS.length}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((surveyStep + 1) / SURVEY_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <p className="text-sm font-bold text-slate-800 mb-6 leading-relaxed">
                  {SURVEY_QUESTIONS[surveyStep].text}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {SURVEY_QUESTIONS[surveyStep].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerSurvey(opt.score)}
                      className="w-full bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 p-4 rounded-xl text-right text-xs font-bold text-slate-700 transition-all flex justify-between items-center group cursor-pointer"
                    >
                      <span>{opt.text}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transform rotate-180 transition-transform" />
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <button onClick={resetSurvey} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
                    انصراف و بستن
                  </button>
                </div>
              </div>
            )}

            {/* Survey Completed Score Result */}
            {surveyResult && (
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h4 className="font-black text-slate-800 text-sm">شاخص سلامت خوداظهاری شما نهایی شد</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 font-bold mb-1">امتیاز کل سلامت</span>
                    <span className="text-3xl font-black text-indigo-600 font-mono">{surveyResult.score}%</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center md:col-span-2 text-center px-4">
                    <span className="text-xs text-slate-400 font-bold mb-1">طبقه بندی وضعیت شما</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${surveyResult.color}`}>
                      {surveyResult.level}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 text-justify mb-4">
                  {surveyResult.desc}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-emerald-600 font-black flex items-center gap-1">
                    <Check className="w-4 h-4" /> ذخیره شده در سوابق پزشکی الکترونیک یگان
                  </span>
                  <button 
                    onClick={resetSurvey}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    تایید و بستن سوابق
                  </button>
                </div>
              </div>
            )}

            {!showSurvey && !surveyResult && (
              <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4 flex gap-3 text-xs text-indigo-800 leading-relaxed">
                <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <strong>درباره خوداظهاری سلامت:</strong> این ارزیابی با هماهنگی بهداری ناجا طراحی شده است. به اشتراک‌گذاری وضعیت فیزیکی و استرسی به سیستم هوشمند فرماندهی اجازه می‌دهد وظایف سنگین‌تر را متناسب با شاخص توانمندی جسمانی و محدودیت‌ها توزیع کند.
                </div>
              </div>
            )}
          </motion.div>

          {/* Interactive Office Corrective Drills */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">حرکات اصلاحی و نرمش‌های ارگونومیک اداری</h3>
                <p className="text-xs text-slate-400 mt-0.5">تمرینات سریع ۳۰ ثانیه‌ای به موازات انجام ماموریت‌های پشت‌میز برای رهایش تنش</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OFFICE_DRILLS.map((drill) => {
                const isSelected = activeDrill?.id === drill.id;
                return (
                  <div 
                    key={drill.id} 
                    className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-100' 
                        : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100/30'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-bold">
                          {drill.issue}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold font-mono flex items-center gap-1">
                          <Timer className="w-3 h-3 text-emerald-500" /> {drill.duration}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-xs mb-3 leading-relaxed">{drill.title}</h4>
                    </div>

                    {isSelected && drillTimer !== null ? (
                      <div className="mt-4 bg-white rounded-xl border border-emerald-100 p-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-emerald-700 animate-pulse">در حال انجام...</span>
                          <span className="text-lg font-black text-emerald-600 font-mono">{drillTimer}s</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-1 rounded-full transition-all" 
                            style={{ width: `${(drillTimer / (drill.duration.includes("۳۰") ? 30 : drill.duration.includes("۴۰") ? 40 : 20)) * 100}%` }}
                          />
                        </div>
                        <button 
                          onClick={stopDrillTimer}
                          className="w-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-[10px] font-black py-1.5 rounded-lg transition"
                        >
                          توقف تمرین
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => startDrillTimer(drill)}
                        className="w-full bg-white border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-[10px] font-black py-2 rounded-xl transition shadow-sm mt-4 cursor-pointer"
                      >
                        شروع مربی هوشمند
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {activeDrill && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 bg-emerald-50/40 border border-emerald-100/50 p-4 rounded-2xl"
              >
                <h5 className="font-black text-emerald-800 text-xs mb-3 flex items-center gap-1.5">
                   <CheckCircle2 className="w-4 h-4" /> راهنمای گام‌به‌گام تمرین فعال:
                </h5>
                <ul className="space-y-2 text-right">
                  {activeDrill.steps.map((step, sIdx) => (
                    <li key={sIdx} className="text-xs text-slate-600 flex gap-2 items-start">
                      <span className="bg-emerald-100 text-emerald-700 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Submitted Appointments & Medical Board Status */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
             <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5 mb-4">
               <UserCheck className="w-4 h-4 text-emerald-500" /> مشخصات فیزیکی و بیومتریک
             </h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">گروه خونی</span>
                  <span className="text-sm font-black text-slate-800 font-mono">O+</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">قد و وزن</span>
                  <span className="text-sm font-black text-slate-800 font-mono">182cm / 78kg</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">شاخص توده بدنی (BMI)</span>
                    <span className="text-sm font-black text-slate-800 font-mono">23.5 <span className="text-emerald-500 text-[10px] font-medium">(نرمال)</span></span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-base mb-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" /> نوبت‌ها و سوابق کمیسیون پزشکی
            </h3>
            <p className="text-xs text-slate-400 mb-6">لیست مراجعات حضوری ثبت شده شما در بهداری یگان</p>

            <div className="space-y-4">
              {requestsList.map((req) => (
                <div key={req.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-slate-800 text-xs leading-relaxed max-w-[150px]">{req.type}</h4>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold border ${
                      req.status === 'approved' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {req.statusText}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-bold font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {req.date}
                    </div>
                    <div className="flex items-center gap-1.5 font-bold font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {req.time}
                    </div>
                  </div>

                  {req.doctor !== "-" && (
                    <div className="bg-white px-3 py-2 rounded-xl border border-slate-100 text-[10px] text-slate-600 flex items-center justify-between">
                      <span className="font-bold">پزشک مسئول:</span>
                      <span className="font-black text-indigo-600">{req.doctor}</span>
                    </div>
                  )}
                </div>
              ))}

              {requestsList.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">
                   هیچ نوبت فعالی ثبت نشده است.
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
             <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
               <ShieldAlert className="w-4 h-4 text-amber-500" /> راهنمای کمیسیون بهداشت و درمان
             </h4>
             <div className="text-slate-500 text-[11px] leading-relaxed space-y-2.5 text-justify">
                <p>
                  کارکنانی که به دلیل صدمات خدمتی یا بیماری مزمن دارای محدودیت خدمتی موقت هستند، موظف به ثبت درخواست ارزیابی مجدد سلامت در سامانه طب کار می‌باشند.
                </p>
                <p>
                  <strong>مدارک مورد نیاز:</strong> اسناد بیمارستانی ناجا، کپی خلاصه پرونده و نامه معرفی فرماندهی مستقیم به پزشک بهداری.
                </p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Appointment Creation Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden"
          >
            <div className="bg-[#4455A5] p-5 text-white flex justify-between items-center">
              <h3 className="font-black text-sm flex items-center gap-2">
                <HeartPulse className="w-5 h-5" /> ثبت درخواست نوبت طب کار / کمیسیون
              </h3>
              <button onClick={() => setShowRequestModal(false)} className="text-white/80 hover:text-white font-bold text-xl cursor-pointer">
                ×
              </button>
            </div>

            <form onSubmit={handleAddRequest} className="p-6 space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">نوع معاینه / خدمت درمانی</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500 appearance-none text-right"
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value)}
                >
                  <option value="معاینات ادواری سالانه">معاینات ادواری سالانه</option>
                  <option value="کمیسیون عالی پزشکی (ارزیابی محدودیت خدمت)">کمیسیون عالی پزشکی (ارزیابی محدودیت خدمت)</option>
                  <option value="تایید استعلاجی پزشک بیمارستان ناجا">تایید استعلاجی پزشک بیمارستان ناجا</option>
                  <option value="بررسی بینایی سنجی و دندانپزشکی تخصصی">بررسی بینایی سنجی و دندانپزشکی تخصصی</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">تاریخ ترجیحی مراجعه</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500 font-mono"
                    value={newRequestDate}
                    onChange={(e) => setNewRequestDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ساعت ترجیحی</label>
                  <input 
                    type="time" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500 font-mono"
                    value={newRequestTime}
                    onChange={(e) => setNewRequestTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">توضیحات و شرح حال اولیه (اختیاری)</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none resize-none min-h-[90px]" 
                  placeholder="در صورت داشتن صدمات خدمتی یا بیماری خاص، خلاصه آن را شرح دهید..."
                  value={newRequestDesc}
                  onChange={(e) => setNewRequestDesc(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  ثبت نهایی درخواست
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function ManagerView() {
  // Search and Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Dynamic Manager Actions
  const [personnelList, setPersonnelList] = useState([
    { id: 1, name: "سرگرد علی مرادی", code: "۱۲۴۵۸۹", squad: "دسته یکم عملیاتی", healthScore: "۷۲%", status: "needs_care", statusText: "نیاز به مراقبت دوره‌ای", issue: "فشارخون و عارضه قلبی خفیف", lastCheck: "۱ ماه پیش" },
    { id: 2, name: "ستوان دوم حسین احمدی", code: "۴۵۶۷۸۹", squad: "دسته دوم تدارکات", healthScore: "۴۵%", status: "needs_action", statusText: "نیازمند اقدام درمانی فوری", issue: "دیسک کمر شدید و محدودیت خدمتی", lastCheck: "۲ هفته پیش" },
    { id: 3, name: "استوار یکم مهدی کریمی", code: "۹۸۷۶۵۴", squad: "دسته سوم گشت", healthScore: "۹۵%", status: "healthy", statusText: "سلامت کامل", issue: "ندارد", lastCheck: "۳ ماه پیش" },
    { id: 4, name: "گروهبان یکم رضا عابدینی", code: "۳۴۵۶۷۸", squad: "دسته یکم عملیاتی", healthScore: "۸۸%", status: "healthy", statusText: "سلامت کامل", issue: "ندارد", lastCheck: "۴ ماه پیش" },
    { id: 5, name: "ستوان سوم علیرضا رضایی", code: "۵۶۷۸۹۰", squad: "پشتیبانی ستاد", healthScore: "۵۸%", status: "needs_action", statusText: "نیازمند اقدام درمانی فوری", issue: "عارضه شنوایی گوش چپ", lastCheck: "۱ هفته پیش" }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedEmpForAction, setSelectedEmpForAction] = useState<typeof personnelList[0] | null>(null);
  const [referralHospital, setReferralHospital] = useState("بیمارستان ولیعصر ناجا");
  const [referralReason, setReferralReason] = useState("جهت درمان ارتوپدی تخصصی و ارزیابی کمیسیون عالی");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleSendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpForAction) return;

    // Simulate sending medical referral
    triggerToast(`برگه ارجاع الکترونیک برای جناب "${selectedEmpForAction.name}" به "${referralHospital}" با موفقیت صادر شد.`);
    
    // Update local employee status optionally
    setPersonnelList(prev => prev.map(p => {
      if (p.id === selectedEmpForAction.id) {
        return {
          ...p,
          statusText: "ارجاع شده به بیمارستان",
          lastCheck: "امروز (ارجاع)"
        };
      }
      return p;
    }));

    setSelectedEmpForAction(null);
  };

  const handleApproveSickLeave = (emp: typeof personnelList[0]) => {
    triggerToast(`استعلاجی پزشکی ۷ روزه برای جناب "${emp.name}" بر مبنای توصیه طب کار تایید و در کارتکس کارگزینی ثبت شد.`);
  };

  const filteredPersonnel = personnelList.filter(item => {
    const matchesSearch = item.name.includes(searchTerm) || item.code.includes(searchTerm) || item.issue.includes(searchTerm);
    const matchesFilter = filterCategory === "all" || item.status === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" dir="rtl">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 text-white py-3.5 px-6 rounded-xl shadow-xl border border-slate-700/50 flex items-center gap-3 text-xs font-black min-w-[320px] max-w-md justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-emerald-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <HeartPulse className="w-8 h-8 text-emerald-200" /> پنل پایش و بهداشت سلامت یگان
        </h1>
        <p className="text-indigo-100/80 text-xs mt-2 font-medium">
          میز خدمت فرماندهی و پزشک یگان: مانیتورینگ نرخ غیبت استعلاجی، موارد پرخطر ارگونومیک و ارجاعات تخصصی ناجا
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs font-medium">مجموع کارکنان ارزیابی شده</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۱۴۵ نفر</div>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
            <UserCheck className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs font-medium">نیازمند معاینات دوره‌ای سالانه</div>
            <div className="text-3xl font-black text-amber-600 mt-2">۳۶ نفر</div>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl">
            <Activity className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs font-medium">موارد پرخطر (نیازمند مداخله درمان)</div>
            <div className="text-3xl font-black text-rose-600 mt-2">۱۴ نفر</div>
          </div>
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-3xl">
            <AlertTriangle className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:col-span-1">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6 text-sm">
            <PieChartIcon className="w-5 h-5 text-indigo-500" /> تفکیک شاخص کلی سلامت یگان
          </h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HEALTH_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {HEALTH_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {HEALTH_STATUS_DATA.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6 text-sm">
            <Activity className="w-5 h-5 text-indigo-500" /> فراوانی عمده علائم گزارش‌شده (طب کار)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HEALTH_ISSUES_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} width={80} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="تعداد" radius={[0, 4, 4, 0]} barSize={20} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Personnel Health Tracking List */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b border-slate-50 pb-6">
          <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-indigo-500" /> فهرست سلامت ارگونومیک و خوداظهاری کارکنان
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
             <div className="relative w-full sm:w-64">
               <input 
                 type="text" 
                 placeholder="جستجو نام یا موضوع بیماری..." 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pr-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-right"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
               <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
             </div>
             
             <div className="relative w-full sm:w-auto">
                 <select 
                   className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-right"
                   value={filterCategory}
                   onChange={(e) => setFilterCategory(e.target.value)}
                 >
                    <option value="all">همه دسته‌ها</option>
                    <option value="healthy">سلامت کامل</option>
                    <option value="needs_care">نیازمند مراقبت دوره‌ای</option>
                    <option value="needs_action">نیازمند اقدام درمانی</option>
                 </select>
                 <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="p-4 font-bold">نام کارکنان</th>
                <th className="p-4 font-bold">کد کارکنان</th>
                <th className="p-4 font-bold">دسته بندی</th>
                <th className="p-4 font-bold">عارضه گزارش شده</th>
                <th className="p-4 font-bold">آخرین غربالگری</th>
                <th className="p-4 font-bold">شاخص فیزیکی</th>
                <th className="p-4 font-bold text-center">عملیات درمانی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPersonnel.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-black text-slate-800">{emp.name}</td>
                  <td className="p-4 text-slate-500 font-mono">{emp.code}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                      emp.status === 'healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      emp.status === 'needs_care' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {emp.statusText}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-600">{emp.issue}</td>
                  <td className="p-4 text-slate-500 font-bold">{emp.lastCheck}</td>
                  <td className="p-4">
                    <span className="font-bold text-indigo-600 font-mono">{emp.healthScore}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => setSelectedEmpForAction(emp)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[10px] px-3 py-1.5 rounded-lg transition"
                      >
                        صدور برگه ارجاع
                      </button>
                      {emp.status === "needs_action" && (
                        <button 
                          onClick={() => handleApproveSickLeave(emp)}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[10px] px-3 py-1.5 rounded-lg transition"
                        >
                          تایید استعلاجی
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPersonnel.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-bold">
                     هیچ موردی با این مشخصات یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Hospital Referral Modal */}
      {selectedEmpForAction && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden"
          >
            <div className="bg-[#4455A5] p-5 text-white flex justify-between items-center">
              <h3 className="font-black text-sm flex items-center gap-2">
                <FileText className="w-5 h-5" /> صدور برگه ارجاع پزشکی الکترونیکی
              </h3>
              <button onClick={() => setSelectedEmpForAction(null)} className="text-white/80 hover:text-white font-bold text-xl cursor-pointer">
                ×
              </button>
            </div>

            <form onSubmit={handleSendReferral} className="p-6 space-y-4 text-right">
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-xs space-y-1">
                <div><span className="text-slate-400 font-bold">نام کارکنان:</span> <span className="font-black text-slate-800">{selectedEmpForAction.name}</span></div>
                <div><span className="text-slate-400 font-bold">کد کارکنان (پرسنلی):</span> <span className="font-mono text-slate-800">{selectedEmpForAction.code}</span></div>
                <div><span className="text-slate-400 font-bold">عارضه اصلی:</span> <span className="font-bold text-rose-600">{selectedEmpForAction.issue}</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">بیمارستان مقصد ناجا</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500 appearance-none text-right"
                  value={referralHospital}
                  onChange={(e) => setReferralHospital(e.target.value)}
                >
                  <option value="بیمارستان ولیعصر ناجا">بیمارستان ولیعصر ناجا (بخش قلب و عروق)</option>
                  <option value="بیمارستان الغدیر ناجا">بیمارستان الغدیر ناجا (بخش ارتوپدی و ستون فقرات)</option>
                  <option value="بیمارستان خانواده ناجا">بیمارستان خانواده ناجا (کلینیک گوش و حلق و بینی)</option>
                  <option value="کلینیک بهداری یگان امام علی (ع)">کلینیک بهداری یگان امام علی (ع)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">علت ارجاع و دستورات تشخیصی</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none resize-none min-h-[90px]" 
                  value={referralReason}
                  onChange={(e) => setReferralReason(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEmpForAction(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  تایید و صدور ارجاع
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export function HealthPage() {
  const { role } = useRole();
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
