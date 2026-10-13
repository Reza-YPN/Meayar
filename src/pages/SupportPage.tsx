import React, { useState } from "react";
import { 
  Phone, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  X, 
  BookOpen, 
  PlayCircle, 
  HelpCircle, 
  Compass, 
  FileText, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Video,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { StepsGuideModal } from "../components/StepsGuideModal";

export function SupportPage() {
  const [activeTab, setActiveTab] = useState<"ticket" | "guides" | "faq">("ticket");
  const [subject, setSubject] = useState("ارتباط با پشتیبانی");
  const [text, setText] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([
    {
      id: "TCK-8841",
      subject: "مغایرت در کارنامه پاییز - شاخص حضور در صحنه",
      date: "۱۴۰۵/۱۱/۱۵",
      status: "پاسخ داده شده توسط کمیسیون",
      statusColor: "bg-emerald-100 text-emerald-800"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: subject,
      date: "۱۴۰۵/۱۲/۱۸",
      status: "در حال بررسی توسط کارشناس پشتیبانی",
      statusColor: "bg-amber-100 text-amber-800"
    };

    setTickets(prev => [newTicket, ...prev]);
    setShowSuccessToast(true);
    setText("");
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 5000);
  };

  const FAQS = [
    {
      q: "فرآیند ارزیابی عملکرد و نحوه اعتراض چگونه است؟",
      a: "فرآیند ارزیابی صرفاً نمره‌دهی نیست؛ در صورت وجود شاخص نیازمند بهبود، ابتدا مرحله خوداظهاری، سپس بررسی مربی و ارزیابی مجدد انجام می‌شود. در صورت تداوم مشکل، پرونده در کمیسیون تخصصی بررسی می‌گردد. همچنین در هر زمان امکان ثبت اعتراض رسمی در صفحه کارنامه وجود دارد."
    },
    {
      q: "چگونه امتیازات عملکردی به خدمات رفاهی متصل می‌شوند؟",
      a: "با کسب نمرات بالا در شاخص‌های نتیجه‌محور و شرکت در دوره‌های مهارتی، امتیاز رفاهی به حساب شما منظور شده و مستقیماً اولویت رزرو اماکن اقامتی، تسهیلات بانکی و کارت حکمت را افزایش می‌دهد."
    },
    {
      q: "مسیر شغلی بر چه اساسی تعیین می‌شود؟",
      a: "مسیر شغلی یک نقشه ثابت نیست، بلکه بر اساس سمت فعلی، سمت‌های قابل دستیابی (متصدی، کاردان، کارشناس، متخصص، مدیریتی) و شایستگی‌های موردنیاز، مسیر رشد و ارتقای فردی را ترسیم می‌کند."
    },
    {
      q: "چرا برخی اطلاعات هویتی و پرسنلی در صفحه حساب کاربری قفل هستند؟",
      a: "به دلیل الزامات حقوقی و اسناد کارکنان، اطلاعات استخدامی و هویتی قفل هستند و هرگونه تغییر از طریق ثبت درخواست اصلاح اطلاعات در کارتابل میز خدمت انجام می‌شود."
    }
  ];

  const SYSTEM_GUIDES = [
    {
      step: "گام ۱",
      title: "راهنمای پیشخوان و نمای کلی وضعیت",
      type: "ویدئوی ۳ دقیقه‌ای",
      icon: Video,
      desc: "آموزش گشت‌وگذار در سامانه، کارت‌های دسترسی سریع و پایش لحظه‌ای وضعیت فردی."
    },
    {
      step: "گام ۲",
      title: "ارزیابی عملکرد، خوداظهاری و کمیسیون",
      type: "راهنمای تعاملی و متنی",
      icon: FileText,
      desc: "آشنایی با گردش کار ارتقای عملکرد: خوداظهاری، مربی، ارزیابی مجدد و اعتراض به شاخص‌ها."
    },
    {
      step: "گام ۴",
      title: "آموزش هوشمند و رفع شکاف شایستگی",
      type: "ویدئوی ۵ دقیقه‌ای",
      icon: Video,
      desc: "چگونگی اتصال عملکرد به دوره‌های پیشنهادی هوش مصنوعی و شرکت در آزمون‌های مهارتی."
    },
    {
      step: "گام ۷",
      title: "میز خدمت الکترونیک و گردش کار درخواست‌ها",
      type: "راهنمای مصور",
      icon: BookOpen,
      desc: "نحوه ثبت ۵ مرحله‌ای درخواست‌ها، استعلامات اداری و دریافت گواهی‌های مهر شده دیجیتال."
    }
  ];

  return (
    <div className="space-y-6 text-right relative" dir="rtl">
      {/* High-Fidelity Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 md:w-[480px] bg-white border-r-8 border-emerald-500 rounded-2xl shadow-2xl p-5 z-50 flex items-start gap-4 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-slate-800 text-sm leading-tight">
                پیام و تیکت شما با موفقیت ثبت شد.
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                پیام شما به کارتابل کمیسیون پشتیبانی فراجا منتقل گردید و کد پیگیری در تاریخچه ثبت شد.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Support Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                مرکز پشتیبانی و راهنمای جامع سامانه
              </h3>
              <span className="text-[11px] font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                گام ۹ معماری
              </span>
            </div>
            <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-2">
              <Clock className="w-4 h-4 text-slate-400" />
              تیم پشتیبانی و دبیرخانه کمیسیون شنبه تا چهارشنبه از ساعت ۷ الی ۱۴ پاسخگوی کارکنان گرامی می‌باشند.
            </p>
          </div>

          {/* Call Center Info */}
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center shadow-md">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-[#4338CA] font-bold">تلفن پشتیبانی ۲۴ ساعته:</div>
              <div className="text-sm font-black tracking-wider text-[#3730A3] mt-0.5 font-mono">۰۲۱ - ۹۱۰۳۰۰۰۰</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          {[
            { id: "ticket", label: "ارسال تیکت و پیام به پشتیبانی", icon: MessageSquare },
            { id: "guides", label: "راهنماهای چندرسانه‌ای و ویدئویی ۱۱ گام", icon: PlayCircle },
            { id: "faq", label: "پایگاه دانش و پرسش‌های متداول (FAQ)", icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Ticket Form */}
        {activeTab === "ticket" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    موضوع درخواست یا گزارش مغایرت <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="ارتباط با پشتیبانی">ارتباط با پشتیبانی عمومی</option>
                    <option value="مغایرت در کارنامه عملکردی">مغایرت در کارنامه عملکردی و امتیازات</option>
                    <option value="گزارش خطا در میز خدمت">گزارش خطا یا عدم دریافت گواهی در میز خدمت</option>
                    <option value="درخواست بررسی کمیسیون">درخواست بررسی مجدد کمیسیون تخصصی</option>
                    <option value="پیشنهاد و انتقاد">پیشنهاد بهبود برای سکوی هوشمند</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    متن پیام و شرح مستندات <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="متن پیام خود را با جزئیات کامل بنویسید..."
                    rows={5}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold px-8 py-3 rounded-xl shadow-md shadow-indigo-100 transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ارسال به کمیسیون پشتیبانی</span>
                  </button>
                </div>
              </form>

              {/* Ticket History */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  تاریخچه تیکت‌های ارسالی شما:
                </h4>
                <div className="space-y-2">
                  {tickets.map((t) => (
                    <div key={t.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-600">{t.id}</span>
                          <span className="font-bold text-slate-800">{t.subject}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono">{t.date}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${t.statusColor}`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/70 to-slate-50 p-6 rounded-3xl border border-indigo-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">پشتیبانی هوشمند و کمیسیون ارزیابی</h4>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                سامانه هوشمند فراجا ارتباط مستقیم میان کارکنان، مربیان ارزیابی و کمیسیون عالی را برقرار می‌سازد. کلیه تیکت‌ها حداکثر ظرف ۴۸ ساعت اداری بررسی و نتیجه در بخش اعلان‌ها (گام ۱۱) به شما اطلاع داده می‌شود.
              </p>
              <div className="pt-2 border-t border-indigo-100/80 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>پیگیری محرمانه و انضباطی کامل پیام‌ها</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600" />
                  <span>امکان ارجاع مستقیم به کمیسیون عالی</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: System Guides */}
        {activeTab === "guides" && (
          <div className="space-y-6">
            {/* Interactive Guide Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base">راهنمای فرآیندها و گام‌های سامانه</h4>
                  <p className="text-xs text-slate-300 mt-0.5">مشاهده مراحل، شایستگی‌ها، گردش کار ارزیابی با امکان ویرایش دستی و بازنویسی متون</p>
                </div>
              </div>

              <button
                onClick={() => setIsGuideModalOpen(true)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition shrink-0"
              >
                <Edit3 className="w-4 h-4" />
                <span>مشاهده و ویرایش دستی راهنما</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SYSTEM_GUIDES.map((guide, i) => {
                const Icon = guide.icon;
                return (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 transition space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                          {guide.step}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <Icon className="w-3.5 h-3.5 text-indigo-600" /> {guide.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">{guide.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{guide.desc}</p>
                    </div>

                    <button 
                      onClick={() => setIsGuideModalOpen(true)}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-white hover:bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-indigo-200 transition"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>مشاهده راهنما و ویرایش متون</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: FAQ */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isExpanded = expandedFaq === i;
              return (
                <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition">
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-right text-xs font-bold text-slate-800 hover:bg-slate-100/80 transition"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Editable Tour Guide Modal */}
      <StepsGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
