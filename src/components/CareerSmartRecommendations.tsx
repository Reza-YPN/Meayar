import React, { useState } from "react";
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Target, 
  TrendingUp, 
  GraduationCap, 
  Calendar, 
  Award,
  Zap,
  BookmarkCheck,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SmartSkillRecommendation {
  id: string;
  skillTitle: string;
  category: "عملیاتی" | "فرماندهی و مدیریت" | "فنی و سامانه‌ای" | "حقوقی و شهروندی";
  priority: "حیاتی (فوری)" | "بالا" | "توسعه‌ای";
  currentLevel: number;
  requiredLevel: number;
  gapPercentage: number;
  rational: string;
  learningCourse: {
    title: string;
    durationHours: number;
    platform: "مرکز آموزش کلانتری" | "شبیه‌ساز میدانی" | "سامانه مجازی فراجا";
    credits: number;
  };
  impactOnCareer: string;
}

const SMART_RECOMMENDATIONS: SmartSkillRecommendation[] = [
  {
    id: "rec_1",
    skillTitle: "فرماندهی عملیاتی صحنه و مدیریت مانور گشت‌های ترکیبی (موتوری + خودرویی)",
    category: "فرماندهی و مدیریت",
    priority: "حیاتی (فوری)",
    currentLevel: 3,
    requiredLevel: 4,
    gapPercentage: 25,
    rational: "بر اساس تحلیل ماتریس شایستگی ۵×۴، برای ارتقا به «سرتیم گشت موتوری ۱۱۰» نیازمند تسلط بر هدایت اکیپ‌های مشترک در حوادث پرریسک هستید.",
    learningCourse: {
      title: "کارگاه شبیه‌سازی هدایت صحنه جرم و مانورهای ضدسرقت خیابانی",
      durationHours: 24,
      platform: "شبیه‌ساز میدانی",
      credits: 15
    },
    impactOnCareer: "تکمیل ۱۰۰٪ پیش‌نیاز سرتیمی و ارتقای ضریب حقوق از ۱.۲۴ به ۱.۲۸"
  },
  {
    id: "rec_2",
    skillTitle: "تحلیل سریع داده‌های جرم‌خیزی و بهره‌برداری از سامانه ردیابی لحظه‌ای AVL/GIS",
    category: "فنی و سامانه‌ای",
    priority: "بالا",
    currentLevel: 3,
    requiredLevel: 4,
    gapPercentage: 20,
    rational: "افسران ارشد گشت نیاز دارند پیش از گشت‌زنی، کانون‌های تمرکز سرقت و کیف‌قاپی محدوده گاندی را روی نقشه حرارتی پایش نمایند.",
    learningCourse: {
      title: "سامانه یکپارچه ناوبری گشت‌های انتظامی (GIS انتظامی)",
      durationHours: 16,
      platform: "سامانه مجازی فراجا",
      credits: 10
    },
    impactOnCareer: "افزایش نرخ کشف پیشگیرانه و کسب نمره ممتاز در شاخص سازمانی"
  },
  {
    id: "rec_3",
    skillTitle: "تیراندازی تاکتیکی در معابر پرتردد با حداقل ریسک برای شهروندان",
    category: "عملیاتی",
    priority: "حیاتی (فوری)",
    currentLevel: 4,
    requiredLevel: 5,
    gapPercentage: 15,
    rational: "مهارت فعلی شما در نمره ۹۴ است؛ تکمیل سناریوهای شبیه‌ساز تیراندازی در وضعیت متحرک روی موتور برای درجه سرتیمی الزامی است.",
    learningCourse: {
      title: "دوره عالی سناریوهای تیراندازی دقیق و تصمیم‌گیری تحت فشار شدید",
      durationHours: 18,
      platform: "شبیه‌ساز میدانی",
      credits: 12
    },
    impactOnCareer: "احراز گواهینامه مهارت راکبی ویژه و صفر شدن ضریب مخاطره"
  },
  {
    id: "rec_4",
    skillTitle: "تنظیم گزارش‌های قضایی متقن و دفاع از مستندات در مراجع قضایی دادسرا",
    category: "حقوقی و شهروندی",
    priority: "توسعه‌ای",
    currentLevel: 4,
    requiredLevel: 5,
    gapPercentage: 10,
    rational: "جهت آمادگی برای پست‌های سطوح ۴ (افسر شیفت عملیات)، تسلط بر آیین دادرسی جدید و الزامات حقوق متهم توصیه می‌شود.",
    learningCourse: {
      title: "اصول تنظیم اوراق قضایی و مستندسازی صحنه‌های جرم",
      durationHours: 12,
      platform: "مرکز آموزش کلانتری",
      credits: 8
    },
    impactOnCareer: "حذف هرگونه ایراد شکلی در دادسرا و افزایش امتیاز انضباطی"
  }
];

export function CareerSmartRecommendations() {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "حیاتی (فوری)" | "بالا">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleEnroll = (recId: string, courseTitle: string) => {
    if (enrolledCourses.includes(recId)) return;
    setEnrolledCourses([...enrolledCourses, recId]);
  };

  const filtered = SMART_RECOMMENDATIONS.filter((item) => {
    if (activeTab !== "all" && item.priority !== activeTab) return false;
    if (filterCategory !== "all" && item.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                موتور هوشمند پیشنهاد مهارت و شایستگی (AI Career Engine)
              </span>
              <span className="text-xs text-slate-300 font-bold">
                تحلیلگر پرونده ستوان‌دوم محمدرضا یزدان‌پناه
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              پیشنهادهای هوشمند جهت ارتقا به پست «سرتیم گشت موتوری واکنش سریع ۱۱۰»
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              سیستم با بررسی نمرات ماتریس شایستگی فعلی (نمره ۹۳.۵٪) و ملزومات پست هدف، شکاف‌های یادگیری کلیدی را استخراج کرده و دوره‌های مهارتی اولویت‌دار را پیشنهاد داده است.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl text-center shrink-0">
            <span className="text-[10px] text-amber-300 block font-bold">شکاف مهارتی باقی‌مانده:</span>
            <span className="text-2xl font-black text-white font-mono">۶٪</span>
            <span className="text-[10px] text-slate-300 block mt-0.5">تا آمادگی ۱۰۰٪ سرتیمی</span>
          </div>
        </div>
      </div>

      {/* Filter and Stats Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-black text-slate-700">فیلتر اولویت:</span>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === "all" ? "bg-indigo-700 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            همه مهارت‌ها ({SMART_RECOMMENDATIONS.length})
          </button>
          <button
            onClick={() => setActiveTab("حیاتی (فوری)")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === "حیاتی (فوری)" ? "bg-rose-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            حیاتی و فوری (۲)
          </button>
          <button
            onClick={() => setActiveTab("بالا")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === "بالا" ? "bg-amber-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            اولویت بالا (۱)
          </button>
        </div>

        <div className="text-slate-500 font-bold flex items-center gap-1 text-[11px]">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>دوره‌های ثبت‌نام‌شده شما: </span>
          <strong className="text-indigo-700 font-mono text-sm">{enrolledCourses.length}</strong>
          <span> از {SMART_RECOMMENDATIONS.length}</span>
        </div>
      </div>

      {/* Recommended Skill Cards Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isEnrolled = enrolledCourses.includes(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isEnrolled
                  ? "bg-emerald-50/40 border-emerald-300 shadow-sm"
                  : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        item.priority === "حیاتی (فوری)"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : item.priority === "بالا"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                      {item.category}
                    </span>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="text-[10px] text-slate-400 block font-bold">شکاف مهارتی:</span>
                    <span className="text-sm font-black text-rose-600 font-mono">
                      %{item.gapPercentage}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-black text-slate-900 leading-snug mb-2">
                  {item.skillTitle}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.rational}
                </p>

                {/* Course Proposal Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-black text-indigo-900">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>دوره پیشنهادی سیستم توانمندسازی:</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {item.learningCourse.title}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                    <span>مدت: <strong className="font-mono text-slate-700">{item.learningCourse.durationHours} ساعت</strong></span>
                    <span>محل: <strong className="text-slate-700">{item.learningCourse.platform}</strong></span>
                    <span>امتیاز IDP: <strong className="font-mono text-emerald-700">+{item.learningCourse.credits}</strong></span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-1.5 font-bold mb-4">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>اثر مستقیم بر ارتقا: {item.impactOnCareer}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isEnrolled ? (
                  <div className="w-full bg-emerald-600 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ثبت در برنامه توسعه فردی (IDP شما افزوده شد)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll(item.id, item.learningCourse.title)}
                    className="w-full bg-indigo-700 hover:bg-indigo-800 active:scale-[0.98] text-white text-xs font-black py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>ثبت‌نام در دوره و افزودن به برنامه ارتقا (IDP)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
