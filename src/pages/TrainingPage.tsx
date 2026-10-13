import {
  BookOpen,
  Headphones,
  PlayCircle,
  Clock,
  Search,
  ChevronDown,
  CheckCircle2,
  Users,
  Target,
  BarChart as BarChartIcon,
  X,
  AlertCircle,
  Star,
  Play,
  Pause,
  Award,
  BookOpenCheck,
  CheckSquare
} from "lucide-react";
import { useRole } from "../context/RoleContext";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { QuizModal } from "../components/QuizModal";
import { ReferCourseModal } from "../components/ReferCourseModal";
import { PerformanceTrainingRecommendations } from "../components/PerformanceTrainingRecommendations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TEAM_TRAINING_DATA = [
  { name: 'کلانتری ۱', تکمیل: 85, درحال: 10, انجام_نشده: 5 },
  { name: 'کلانتری ۲', تکمیل: 60, درحال: 30, انجام_نشده: 10 },
  { name: 'کلانتری ۳', تکمیل: 90, درحال: 5, انجام_نشده: 5 },
  { name: 'پلیس راهور', تکمیل: 75, درحال: 15, انجام_نشده: 10 },
];

interface Course {
  id: number;
  title: string;
  points: string;
  pointsNum: number;
  type: string;
  typeIcon: any;
  time: string;
  status: string;
  description: string;
  progress: number;
  isAction?: boolean;
  department?: string; // e.g., حفاظت اطلاعات, عقیدتی سیاسی
  availableFormats?: string[]; // e.g., ['ویدئو', 'پادکست', 'متن']
  goals?: string[];
}

const INITIAL_COURSES: Record<string, Course[]> = {
  performance: [
    {
      id: 1,
      title: "مهارت گوش دادن فعال",
      points: "۳۲ امتیاز",
      pointsNum: 32,
      type: "ویدئو",
      typeIcon: PlayCircle,
      time: "۱۶ ساعت",
      status: "ادامه آموزش",
      description: "آموزش اصول و تکنیک‌های گوش دادن فعال جهت برقراری ارتباط موثر و حل مسائل شهروندان در ماموریت‌های انتظامی.",
      progress: 45,
      department: "معاونت آموزش",
      availableFormats: ["ویدئو", "پادکست", "متن (PDF)"],
      goals: ["کاهش تنش در ماموریت‌ها", "افزایش رضایت شهروندان", "مدیریت بهتر صحنه جرم"]
    },
    {
      id: 2,
      title: "آشنایی با اصول حفاظت اسناد",
      points: "۳۲ امتیاز",
      pointsNum: 32,
      type: "متن",
      typeIcon: BookOpen,
      time: "۲ ساعت در هفته",
      status: "مشاهده آموزش",
      description: "شناخت روش‌های صحیح طبقه‌بندی و نگهداری اسناد و پیشگیری از افشای اطلاعات محرمانه.",
      progress: 0,
      department: "حفاظت اطلاعات",
      availableFormats: ["متن (PDF)"],
      goals: ["جلوگیری از درز اطلاعات", "حفظ اسرار سازمانی"]
    },
    {
      id: 3,
      title: "اصول عقیدتی و اخلاق اسلامی",
      points: "۳۲ امتیاز",
      pointsNum: 32,
      type: "ویدئو",
      typeIcon: PlayCircle,
      time: "۲۰ ساعت",
      status: "مشاهده آموزش",
      description: "آشنایی با مبانی اخلاق اسلامی در برخورد با شهروندان و همکاران، و تقویت روحیه جهادی.",
      progress: 0,
      department: "عقیدتی سیاسی",
      availableFormats: ["ویدئو", "پادکست"],
      goals: ["تقویت باورهای دینی", "بهبود برخورد اسلامی با مراجعین"]
    },
    {
      id: 4,
      title: "مذاکره به وقت بحران",
      points: "۳۲ امتیاز",
      pointsNum: 32,
      type: "پادکست",
      typeIcon: Headphones,
      time: "۱۲ ساعت",
      status: "شرکت در آزمون",
      isAction: true,
      description: "بسته تخصصی مذاکره تلفنی و حضوری در شرایط گروگان‌گیری، اغتشاش یا خودکشی پرخطر.",
      progress: 100,
      department: "یگان ویژه",
      availableFormats: ["پادکست", "ویدئو"],
      goals: ["نجات جان افراد در بحران", "پایان دادن به گروگان‌گیری با حداقل آسیب"]
    },
  ],
  prerequisites: [
    {
      id: 5,
      title: "قوانین و آیین‌نامه‌های انضباطی فراجا",
      points: "۱۵ امتیاز",
      pointsNum: 15,
      type: "پی‌دی‌اف",
      typeIcon: BookOpen,
      time: "۶ ساعت",
      status: "شروع آموزش",
      description: "بررسی کامل اصول رفتار حرفه‌ای، حقوق متهمین، مرخصی‌ها و سلسله مراتب در نیروهای مسلح.",
      progress: 0,
      department: "بازرسی کل",
      availableFormats: ["متن (PDF)", "پادکست"],
      goals: ["آشنایی با حقوق شهروندی", "کاهش تخلفات سازمانی"]
    },
    {
      id: 6,
      title: "پروتکل‌های گشت و عملیات پیشرفته",
      points: "۲۵ امتیاز",
      pointsNum: 25,
      type: "ویدئو",
      typeIcon: PlayCircle,
      time: "۱۰ ساعت",
      status: "شروع آموزش",
      description: "راهنمای گام‌به‌گام ایمن‌سازی محیط، مواجهه با خودروهای مشکوک و تکنیک‌های تعقیب و گریز.",
      progress: 0,
      department: "پلیس پیشگیری",
      availableFormats: ["ویدئو", "حضوری"],
      goals: ["افزایش امنیت گشت‌ها", "دستگیری موفق مجرمین"]
    },
    {
      id: 7,
      title: "اصول گزارش‌نویسی انتظامی",
      points: "۲۰ امتیاز",
      pointsNum: 20,
      type: "حضوری",
      typeIcon: BookOpen,
      time: "۸ ساعت",
      status: "شروع آموزش",
      description: "کارگاه عملی نگارش صورت‌جلسه، مستندسازی دقیق جرائم و گزارش‌نویسی به مقامات قضایی.",
      progress: 0,
      department: "معاونت آموزش",
      availableFormats: ["حضوری", "متن (PDF)"],
      goals: ["کاهش نقص پرونده‌ها", "تسریع رسیدگی قضایی"]
    }
  ],
  career: [
    {
      id: 8,
      title: "مدیریت و رهبری در کلانتری",
      points: "۵۰ امتیاز",
      pointsNum: 50,
      type: "حضوری",
      typeIcon: BookOpen,
      time: "۳۰ ساعت",
      status: "شروع آموزش",
      description: "ویژه افسران ارشد جهت مدیریت شیفت‌ها، تقسیم مسئولیت‌ها و انگیزه بخشی به کارکنان زیرمجموعه.",
      progress: 0,
      department: "پلیس پیشگیری",
      availableFormats: ["حضوری"],
      goals: ["جانشین‌پروری", "ارتقای سطح مدیریتی کلانتری‌ها"]
    },
    {
      id: 9,
      title: "جامعه‌شناسی جنایی و تحلیل جرم",
      points: "۴۰ امتیاز",
      pointsNum: 40,
      type: "ویدئو",
      typeIcon: PlayCircle,
      time: "۱۸ ساعت",
      status: "شروع آموزش",
      description: "تحلیل رفتار مجرمانه، جغرافیای جرم و راهکارهای پیشگیری محله‌محور.",
      progress: 0,
      department: "پلیس آگاهی",
      availableFormats: ["ویدئو", "متن (PDF)", "پادکست"],
      goals: ["پیش‌بینی وقوع جرم", "شناسایی کانون‌های جرم‌خیز"]
    },
    {
      id: 10,
      title: "مهارت‌های روانشناختی در برخورد با شهروندان",
      points: "۳۰ امتیاز",
      pointsNum: 30,
      type: "ویدئو",
      typeIcon: PlayCircle,
      time: "۱۲ ساعت",
      status: "شروع آموزش",
      description: "آرام‌سازی مصدومین و بزه دیدگان و نحوه مهار خشم افراد عصبانی در کلانتری.",
      progress: 0,
      department: "معاونت اجتماعی",
      availableFormats: ["ویدئو", "پادکست"],
      goals: ["کاهش درگیری در کلانتری", "افزایش سرمایه اجتماعی پلیس"]
    }
  ],
  development: [
    {
      id: 11,
      title: "مبانی امنیت سایبری و داده",
      points: "۳۵ امتیاز",
      pointsNum: 35,
      type: "ویدئو",
      typeIcon: PlayCircle,
      time: "۱۵ ساعت",
      status: "شروع آموزش",
      description: "حفاظت اطلاعات کاربری، امنیت شبکه‌های داخلی فراجا و پیشگیری از حملات مهندسی اجتماعی.",
      progress: 0,
      department: "پلیس فتا",
      availableFormats: ["ویدئو", "تعاملی"],
      goals: ["جلوگیری از هک شدن سامانه‌ها", "آگاهی از ترفندهای مهندسی اجتماعی"]
    },
    {
      id: 12,
      title: "آمادگی جسمانی و دفاع شخصی کاربردی",
      points: "۴۵ امتیاز",
      pointsNum: 45,
      type: "حضوری",
      typeIcon: BookOpen,
      time: "۲۴ ساعت",
      status: "شروع آموزش",
      description: "تمرینات استقامتی و یادگیری فنون خلع سلاح و مهار مهاجم بدون سلاح گرم.",
      progress: 0,
      department: "تربیت بدنی",
      availableFormats: ["حضوری", "ویدئو کوتاه"],
      goals: ["افزایش آمادگی رزمی", "کاهش آسیب‌دیدگی کارکنان"]
    },
    {
      id: 13,
      title: "مکالمه انگلیسی انتظامی پایه",
      points: "۵۰ امتیاز",
      pointsNum: 50,
      type: "پادکست",
      typeIcon: Headphones,
      time: "۳۰ ساعت",
      status: "شروع آموزش",
      description: "آموزش لغات کلیدی، پرسیدن آدرس و مدارک هویتی از اتباع خارجی در شرایط ماموریتی.",
      progress: 0,
      department: "معاونت آموزش",
      availableFormats: ["پادکست", "متن (PDF)"],
      goals: ["ارتباط با توریست‌ها", "کنترل اتباع خارجی"]
    }
  ]
};

function EmployeeView() {
  const [activeCategory, setActiveCategory] = useState<"performance" | "prerequisites" | "career" | "development">("performance");
  const [courses, setCourses] = useState<Record<string, Course[]>>(INITIAL_COURSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [playerPlaying, setPlayerPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stats calculation
  const completedCount = Object.values(courses).flat().filter(c => c.progress === 100).length;
  const inProgressCount = Object.values(courses).flat().filter(c => c.progress > 0 && c.progress < 100).length;
  const availableCount = Object.values(courses).flat().filter(c => c.progress === 0).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleStartOrContinue = (course: Course) => {
    if (course.isAction) {
      setSelectedCourse(course);
      setIsQuizOpen(true);
    } else {
      setSelectedCourse(course);
      setPlayerPlaying(true);
      setPlayerProgress(course.progress);
    }
  };

  const handleStartRecommendedCourse = (courseData: {
    id: number;
    title: string;
    description: string;
    points: string;
    pointsNum: number;
    type: string;
    department: string;
    goals: string[];
    progress: number;
  }) => {
    setSelectedCourse({
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      points: courseData.points,
      pointsNum: courseData.pointsNum,
      type: courseData.type,
      typeIcon: PlayCircle,
      time: "۶-۱۰ ساعت",
      status: courseData.progress === 100 ? "گذرانده شده" : courseData.progress > 0 ? "ادامه آموزش" : "شروع آموزش",
      progress: courseData.progress,
      department: courseData.department,
      availableFormats: ["ویدئو", "پادکست", "متن (PDF)"],
      goals: courseData.goals,
    });
    setPlayerPlaying(true);
    setPlayerProgress(courseData.progress);
  };

  const handleCompleteTraining = () => {
    if (!selectedCourse) return;
    
    // Update local courses state
    const updated = { ...courses };
    Object.keys(updated).forEach(cat => {
      updated[cat] = updated[cat].map(c => {
        if (c.id === selectedCourse.id) {
          return { ...c, progress: 100, status: "گذرانده شده" };
        }
        return c;
      });
    });
    
    setCourses(updated);
    showToast(`آموزش "${selectedCourse.title}" با موفقیت پایان یافت! +${selectedCourse.pointsNum} امتیاز کسب شد.`);
    setSelectedCourse(null);
    setPlayerPlaying(false);
  };

  // Filter based on search
  const filteredCourses = courses[activeCategory].filter(c => 
    c.title.includes(searchTerm) || c.description.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right" dir="rtl">
      {/* Dynamic Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 md:w-[450px] bg-emerald-50 border-r-8 border-emerald-500 rounded-xl shadow-2xl p-4 z-50 flex items-start gap-3"
          >
            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-800 block">انجام موفقیت‌آمیز</span>
              <span className="text-xs text-slate-600 mt-1 block font-medium leading-relaxed">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalized Learning & Competency Gap Banner */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-indigo-50/80 rounded-3xl p-6 text-slate-800 shadow-sm border border-emerald-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              آموزش و توسعه شخصی کارکنان
            </span>
            <span className="text-xs text-slate-700 font-extrabold">
              شکاف شایستگی شغلی و مدل یادگیری فردی مبتنی بر عملکرد
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl font-medium">
            دوره‌ها و محتواهای آموزشی این بخش بر اساس تحلیل شکاف‌های مهارتی کارنامه عملکرد، شایستگی‌های محوری فراجا و نیازهای ارتقای شغلی شما به صورت هوشمند شخصی‌سازی شده‌اند.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-black text-emerald-800 bg-white shadow-xs px-3.5 py-2 rounded-2xl border border-emerald-200">
            {completedCount} دوره تکمیل شده • {inProgressCount} دوره فعال
          </span>
        </div>
      </div>

      {/* Top Cards (Figma Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl shadow-sm border border-emerald-100/90 p-5 flex items-center justify-between hover:shadow-md hover:border-emerald-300 transition-all">
          <div>
            <div className="text-3xl font-black text-emerald-700">{completedCount}</div>
            <div className="text-xs font-bold text-slate-500 mt-1">آموزش‌های پایان یافته</div>
          </div>
          <div className="w-13 h-13 bg-emerald-100/80 text-emerald-700 border border-emerald-200 rounded-2xl flex items-center justify-center">
            <BookOpenCheck className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl shadow-sm border border-indigo-100/90 p-5 flex items-center justify-between border-b-4 border-b-indigo-600 hover:shadow-md hover:border-indigo-300 transition-all">
          <div>
            <div className="text-3xl font-black text-indigo-700">{inProgressCount}</div>
            <div className="text-xs font-bold text-indigo-600 mt-1">آموزش‌های در حال گذراندن</div>
          </div>
          <div className="w-13 h-13 bg-indigo-100/80 text-indigo-700 border border-indigo-200 rounded-2xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-sky-50/30 rounded-2xl shadow-sm border border-sky-100/90 p-5 flex items-center justify-between hover:shadow-md hover:border-sky-300 transition-all">
          <div>
            <div className="text-3xl font-black text-sky-800">{availableCount}</div>
            <div className="text-xs font-bold text-slate-500 mt-1">آموزش‌های قابل شروع</div>
          </div>
          <div className="w-13 h-13 bg-sky-100/80 text-sky-700 border border-sky-200 rounded-2xl flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Performance Improvement Recommendations Section */}
      <PerformanceTrainingRecommendations 
        onStartCourse={handleStartRecommendedCourse} 
        showToast={showToast} 
      />

      {/* Search and Category Filter Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {/* Custom Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-200 pb-px hide-scrollbar gap-1.5 flex-1">
            <button 
              onClick={() => setActiveCategory("performance")}
              className={`px-4 py-2.5 text-xs font-black whitespace-nowrap transition-all rounded-xl ${
                activeCategory === "performance" 
                  ? "bg-indigo-50 text-indigo-700 font-black shadow-xs border border-indigo-200" 
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              ارزیابی عملکرد
            </button>
            <button 
              onClick={() => setActiveCategory("prerequisites")}
              className={`px-4 py-2.5 text-xs font-black whitespace-nowrap transition-all rounded-xl ${
                activeCategory === "prerequisites" 
                  ? "bg-indigo-50 text-indigo-700 font-black shadow-xs border border-indigo-200" 
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              پیش نیازها
            </button>
            <button 
              onClick={() => setActiveCategory("career")}
              className={`px-4 py-2.5 text-xs font-black whitespace-nowrap transition-all rounded-xl ${
                activeCategory === "career" 
                  ? "bg-indigo-50 text-indigo-700 font-black shadow-xs border border-indigo-200" 
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              مرتبط با مسیر شغلی
            </button>
            <button 
              onClick={() => setActiveCategory("development")}
              className={`px-4 py-2.5 text-xs font-black whitespace-nowrap transition-all rounded-xl ${
                activeCategory === "development" 
                  ? "bg-indigo-50 text-indigo-700 font-black shadow-xs border border-indigo-200" 
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              توسعه محور
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="جستجو در دوره‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-9 py-2.5 bg-slate-50/90 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Dynamic Courses Grid */}
        <div>
          <h3 className="font-extrabold text-slate-900 mb-5 flex items-center gap-2 text-sm">
            <BookOpen className="w-5 h-5 text-indigo-600" /> 
            {activeCategory === "performance" && "بسته آموزشی بهبود شاخص مهارت ارتباط موثر"}
            {activeCategory === "prerequisites" && "آموزش‌های پیش‌نیاز خدمت و انضباطی"}
            {activeCategory === "career" && "دوره‌های ارتقاء شغلی و مسیر ارشدیت"}
            {activeCategory === "development" && "دوره‌های مهارت‌افزایی شخصی و فنی"}
          </h3>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-bold bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              دوره‌ای یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course) => {
                const isCompleted = course.progress === 100;
                
                // Color spectrum per course format
                const getHeaderStyle = () => {
                  if (course.type.includes("ویدئو")) {
                    return "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 text-indigo-600";
                  } else if (course.type.includes("پادکست")) {
                    return "bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 text-amber-600";
                  } else if (course.type.includes("متن") || course.type.includes("پی‌دی‌اف")) {
                    return "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-emerald-600";
                  } else {
                    return "bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50 text-rose-600";
                  }
                };

                return (
                  <div
                    key={course.id}
                    className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col group shadow-sm"
                  >
                    {/* Course Card Header Icon */}
                    <div className={`h-36 ${getHeaderStyle()} flex items-center justify-center relative overflow-hidden transition-all duration-300`}>
                      <course.typeIcon className="w-14 h-14 opacity-75 group-hover:scale-110 transition-transform duration-300" />
                      
                      {/* Category Label */}
                      <span className="absolute top-3 right-3 bg-white/90 shadow-sm border border-slate-200/80 text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-xs">
                        {course.type}
                      </span>

                      {/* Progress Bar overlay */}
                      {course.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-200/80">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      )}
                    </div>

                    {/* Course Body Info */}
                    <div className="p-5 flex flex-col flex-1 text-right">
                      <h4 className="font-extrabold text-slate-900 text-sm mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4 font-medium">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between mb-4 mt-auto">
                        <div className="text-amber-700 text-xs font-black flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{course.points}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.time}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleStartOrContinue(course)}
                        className={`w-full py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                            : course.progress > 0
                              ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                              : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-100"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>گذرانده شده</span>
                          </>
                        ) : (
                          <span>{course.status}</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Media Player Simulation Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-black text-indigo-300 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full">پخش کلاس مجازی فراجا</span>
                  <h3 className="font-extrabold text-sm sm:text-base mt-2">{selectedCourse.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 text-slate-300 hover:text-white bg-white/10 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player Body (Simulated Player UI) */}
              <div className="p-6 space-y-6">
                <div className="h-64 bg-slate-900 rounded-3xl relative flex flex-col items-center justify-center border border-slate-800 overflow-hidden shadow-inner group">
                  {/* Visualizer animation when playing */}
                  {playerPlaying ? (
                    <div className="flex gap-1.5 items-end h-16 mb-4">
                      <div className="w-1.5 bg-indigo-400 rounded-full h-12 animate-bounce"></div>
                      <div className="w-1.5 bg-cyan-400 rounded-full h-16 animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 bg-emerald-400 rounded-full h-8 animate-bounce [animation-delay:0.4s]"></div>
                      <div className="w-1.5 bg-indigo-300 rounded-full h-14 animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-1.5 bg-blue-400 rounded-full h-10 animate-bounce [animation-delay:0.3s]"></div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-white/15 backdrop-blur-xs rounded-full flex items-center justify-center text-white mb-4">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                  )}

                  <span className="text-xs text-slate-300 font-bold bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">محتوای این کلاس به صورت {selectedCourse.type} شبیه‌سازی شده است</span>

                  {/* Player controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent flex items-center justify-between gap-4">
                    <button 
                      onClick={() => setPlayerPlaying(!playerPlaying)}
                      className="w-10 h-10 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-105 transition shadow-md"
                    >
                      {playerPlaying ? <Pause className="w-5 h-5 text-slate-900 fill-slate-900" /> : <Play className="w-5 h-5 text-slate-900 fill-slate-900 ml-0.5" />}
                    </button>

                    {/* Progress Slider */}
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-[10px] text-slate-300 font-mono">{(playerProgress * 0.1).toFixed(1)}</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full cursor-pointer relative" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                        setPlayerProgress(Math.min(100, Math.max(0, Math.round(percentage))));
                      }}>
                        <div className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full" style={{ width: `${playerProgress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-slate-300 font-mono">10.0</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800">خلاصه توضیحات:</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mt-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 font-medium">
                          {selectedCourse.description}
                        </p>
                      </div>
                      
                      {selectedCourse.goals && (
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-800 mb-2">اهداف دوره:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 font-medium">
                            {selectedCourse.goals.map((goal, idx) => (
                              <li key={idx}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full md:w-48 space-y-3">
                      {selectedCourse.department && (
                        <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-2xl">
                          <span className="text-[10px] text-indigo-600 font-bold block mb-1">معاونت/پلیس مربوطه</span>
                          <span className="text-xs font-black text-indigo-900">{selectedCourse.department}</span>
                        </div>
                      )}
                      
                      {selectedCourse.availableFormats && (
                        <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                          <span className="text-[10px] text-slate-500 font-bold block mb-1">فرمت‌های موجود</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedCourse.availableFormats.map((fmt, idx) => (
                              <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-lg font-bold shadow-2xs">
                                {fmt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 bg-white border border-slate-200 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  onClick={handleCompleteTraining}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-2xl text-xs font-black shadow-md shadow-indigo-200 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>پایان آموزش و کسب امتیاز</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      {selectedCourse && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          courseTitle={selectedCourse.title}
          onComplete={(score, passed) => {
            setIsQuizOpen(false);
            if (passed) {
              handleCompleteTraining();
            }
          }}
        />
      )}
    </div>
  );
}

function ManagerView() {
  const [referredCourses, setReferredCourses] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [referModalCourse, setReferModalCourse] = useState<{ id: number, name: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openReferModal = (id: number, name: string) => {
    if (referredCourses.includes(id)) {
      showToast(`آموزش "${name}" قبلاً ارجاع داده شده است.`);
      return;
    }
    setReferModalCourse({ id, name });
  };

  const handleConfirmRefer = (employeeIds: number[]) => {
    if (!referModalCourse) return;
    setReferredCourses(prev => [...prev, referModalCourse.id]);
    showToast(`آموزش "${referModalCourse.name}" با موفقیت به ${employeeIds.length} نفر از کارکنان ارجاع گردید.`);
    setReferModalCourse(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right" dir="rtl">
      {/* Dynamic Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 md:w-[450px] bg-indigo-50 border-r-8 border-indigo-500 rounded-2xl shadow-2xl p-4 z-50 flex items-start gap-3"
          >
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-slate-800 block">ارجاع موفق</span>
              <span className="text-xs text-slate-600 mt-1 block font-medium leading-relaxed">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-3xl shadow-sm border border-indigo-100 p-6 flex items-center justify-between hover:shadow-md hover:border-indigo-300 transition-all">
          <div>
            <div className="text-slate-500 text-xs font-bold">سرانه آموزش یگان (ساعت)</div>
            <div className="text-3xl font-black text-indigo-900 mt-2">۴۵</div>
          </div>
          <div className="w-14 h-14 bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-2xl flex items-center justify-center">
            <Clock className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-3xl shadow-sm border border-amber-100 p-6 flex items-center justify-between hover:shadow-md hover:border-amber-300 transition-all">
          <div>
            <div className="text-slate-500 text-xs font-bold">کارکنان نیازمند آموزش</div>
            <div className="text-3xl font-black text-amber-700 mt-2">۱۲</div>
          </div>
          <div className="w-14 h-14 bg-amber-100 text-amber-700 border border-amber-200 rounded-2xl flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl shadow-sm border border-emerald-100 p-6 flex items-center justify-between hover:shadow-md hover:border-emerald-300 transition-all">
          <div>
            <div className="text-slate-500 text-xs font-bold">درصد تحقق برنامه آموزشی</div>
            <div className="text-3xl font-black text-emerald-700 mt-2">۸۲٪</div>
          </div>
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-2xl flex items-center justify-center">
            <Target className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-6">
          <h3 className="font-black text-slate-800 flex items-center gap-2 mb-6 text-sm">
            <BarChartIcon className="w-5 h-5 text-indigo-600" /> وضعیت گذراندن دوره‌های آموزشی در زیرمجموعه
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TEAM_TRAINING_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)'}} />
                <Bar dataKey="تکمیل" stackId="a" fill="#10b981" radius={[0, 0, 6, 6]} />
                <Bar dataKey="درحال" stackId="a" fill="#f59e0b" />
                <Bar dataKey="انجام_نشده" stackId="a" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-6">
          <h3 className="font-black text-slate-800 flex items-center gap-2 mb-6 text-sm">
            <Users className="w-5 h-5 text-indigo-600" /> لیست دوره‌های پیشنهادی جهت رفع شکاف عملکردی کارکنان
          </h3>
          <div className="space-y-4">
             {[
               { id: 1, name: "اصول ارتباط بدون خشونت و مدیریت تنش با شهروندان", target: "رفع افت شاخص رفتاری و ارتباطی (۱۱ نفر از کارکنان)" },
               { id: 2, name: "کارگاه تخصصی نگارش صورت‌جلسه و گزارش‌نویسی بدون نقص قضایی", target: "ارتقای صحت گزارش‌های اولیه و رفع نقص پرونده‌ها (۷ نفر)" },
               { id: 3, name: "ناوبری تاکتیکی و مدیریت زمان واکنش در فوریت‌های ۱۱۰", target: "کاهش میانگین زمان رسیدن سر صحنه (۹ نفر از کارکنان)" },
               { id: 4, name: "حفاظت فیزیکی و امنیت داده‌ها در سامانه‌های کلانتری", target: "ارتقای چک‌لیست امنیتی و حفاظت اسناد (۶ نفر از کارکنان)" },
             ].map((item) => {
               const courseName = item.name;
               const isReferred = referredCourses.includes(item.id);
               return (
                 <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center shrink-0">
                       <BookOpen className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-800 text-sm">{courseName}</h4>
                       <p className="text-xs text-indigo-700 font-semibold mt-1">{item.target}</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => openReferModal(item.id, courseName)}
                    className={`text-xs font-black px-4 py-2.5 rounded-xl transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer ${
                      isReferred 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    }`}
                   >
                     {isReferred ? "ارجاع داده شد" : "ارجاع به کارکنان"}
                   </button>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
      <ReferCourseModal
        isOpen={!!referModalCourse}
        onClose={() => setReferModalCourse(null)}
        courseTitle={referModalCourse?.name || ""}
        onConfirm={handleConfirmRefer}
      />
    </div>
  );
}

export function TrainingPage() {
  const { role } = useRole();
  
  if (role === 'manager' || role === 'evaluator') return <ManagerView />;
  return <EmployeeView />;
}
