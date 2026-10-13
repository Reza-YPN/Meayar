import { useState } from "react";
import {
  Gift,
  Plane,
  ShoppingBag,
  CreditCard,
  ChevronDown,
  Search,
  Users,
  Award,
  BarChart as BarChartIcon,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Zap,
} from "lucide-react";
import { useRole } from "../context/RoleContext";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Initial rewards data
const INITIAL_HIGHLIGHT_REWARDS = [
  {
    id: 101,
    title: "سفر زیارتی همراه با خانواده به مشهد مقدس",
    category: "سفر",
    points: 12,
    claimed: false,
  },
  {
    id: 102,
    title: "وام ۱۰۰ میلیون تومانی ازدواج با بازپرداخت ۶۰ ماهه",
    category: "وام",
    points: 25,
    claimed: false,
  },
  {
    id: 103,
    title: "تخفیف ۴ میلیون تومانی خرید لوازم خانگی از فروشگاه‌های طرف قرارداد",
    category: "بن خرید",
    points: 14,
    claimed: false,
  },
  {
    id: 104,
    title: "وام ۷۰ میلیون تومانی بازپرداخت ۳۶ ماهه بهره ۲ درصد",
    category: "وام",
    points: 16,
    claimed: false,
  }
];

const INITIAL_SHOPPING_REWARDS = [
  { id: 1, title: "شارژ دو میلیون تومانی حکمت کارت", category: "بن خرید", points: 10, claimed: false },
  { id: 2, title: "بن خرید دو میلیون تومانی از فروشگاه‌های زنجیره اتکا", category: "بن خرید", points: 20, claimed: false },
  { id: 3, title: "تخفیف ۴ میلیون تومانی خرید لوازم خانگی از فروشگاه‌های طرف قرارداد", category: "بن خرید", points: 14, claimed: false },
  { id: 4, title: "کد تخفیف ۳۰ درصدی در نرم‌افزار خرید اعتباری سیبچه", category: "بن خرید", points: 8, claimed: true },
];

const INITIAL_LOAN_REWARDS = [
  { id: 5, title: "وام ۳۰۰ میلیون تومانی خرید خودرو با بازپرداخت ۶۰ ماهه", category: "وام", points: 50, claimed: false },
  { id: 6, title: "وام ۱۰۰ میلیون تومانی نگین فراپویا بانک سپه", category: "وام", points: 30, claimed: false },
  { id: 7, title: "وام ۱۰۰ میلیون تومانی ازدواج با بازپرداخت ۶۰ ماهه", category: "وام", points: 25, claimed: false },
  { id: 8, title: "وام ۲۵ میلیون تومانی بازپرداخت ۱۲ ماهه بهره ۴ درصد", category: "وام", points: 10, claimed: true },
];

const INITIAL_TRAVEL_REWARDS = [
  { id: 9, title: "سفر زیارتی همراه با خانواده به مشهد مقدس", category: "سفر", points: 12, claimed: false },
  { id: 10, title: "تور سه روزه سفر به شمال ایران", category: "سفر", points: 18, claimed: false },
  { id: 11, title: "کمک هزینه سفر زیارتی به کربلا برای اربعین حسینی", category: "سفر", points: 15, claimed: false },
  { id: 12, title: "تور ۵ روزه سفر به کیش", category: "سفر", points: 24, claimed: true },
];

const UNIT_POINTS_DISTRIBUTION = [
  { name: 'عالی (بالای ۵۰)', value: 15, color: '#10b981' },
  { name: 'خوب (۳۰ تا ۵۰)', value: 25, color: '#6366f1' },
  { name: 'متوسط (۱۰ تا ۳۰)', value: 35, color: '#f59e0b' },
  { name: 'نیاز به تلاش (زیر ۱۰)', value: 25, color: '#94a3b8' },
];

const REWARDS_CLAIMED_DATA = [
  { name: 'فروردین', بن_خرید: 12, وام: 2, سفر: 5 },
  { name: 'اردیبهشت', بن_خرید: 15, وام: 3, سفر: 8 },
  { name: 'خرداد', بن_خرید: 20, وام: 5, سفر: 12 },
  { name: 'تیر', بن_خرید: 18, وام: 4, سفر: 15 },
];

// Reusable ticket-styled card component with unified theme
function TicketCard({ title, points, claimed, category, onClaim }: { title: string; points: number; claimed: boolean; category?: string; onClaim: () => void; key?: number }) {
  // Determine gradient and icon based on category
  let gradientBg = "bg-white";
  let icon = "🎯";
  if (category === "سفر") {
    gradientBg = claimed ? "bg-slate-50" : "bg-gradient-to-br from-white to-sky-50";
    icon = "✈️";
  } else if (category === "وام") {
    gradientBg = claimed ? "bg-slate-50" : "bg-gradient-to-br from-white to-emerald-50";
    icon = "💰";
  } else if (category === "بن خرید") {
    gradientBg = claimed ? "bg-slate-50" : "bg-gradient-to-br from-white to-fuchsia-50";
    icon = "🛍️";
  }

  return (
    <div
      className={`relative border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[175px] ${gradientBg}
      before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-2 before:w-4 before:h-6 before:bg-slate-100 before:border-l before:border-y before:border-slate-200/60 before:rounded-r-full before:z-10
      after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-2 after:w-4 after:h-6 after:bg-slate-100 after:border-r after:border-y after:border-slate-200/60 after:rounded-l-full after:z-10`}
    >
      {/* Category Icon Badge */}
      <div className="absolute top-0 right-0 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-bl-xl border-b border-l border-slate-100 text-xs font-bold shadow-sm">
        <span className="opacity-80">{icon} {category}</span>
      </div>

      <h4 className="font-extrabold text-slate-800 text-xs leading-relaxed mt-6 mb-4 pl-2 pr-2 text-right">
        {title}
      </h4>

      {/* Ticket perforation line & details */}
      <div className="border-t border-dashed border-slate-200 pt-3.5 flex items-center justify-between mt-auto relative z-20">
        <div className="flex items-center gap-1.5 text-amber-700 font-extrabold text-[10px] bg-amber-100/80 px-2 py-1 rounded-lg border border-amber-200/60 shadow-sm">
          <span>☀️</span>
          <span>{points} امتیاز</span>
        </div>

        {claimed ? (
          <div className="flex items-center gap-1 text-[#4455A5] text-[10px] font-bold bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>دریافت شده</span>
          </div>
        ) : (
          <button
            onClick={onClaim}
            className="bg-gradient-to-l from-[#4455A5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg transition-all shadow-md cursor-pointer hover:shadow-lg transform active:scale-95"
          >
            دریافت پاداش
          </button>
        )}
      </div>
    </div>
  );
}

function EmployeeView() {
  const [score, setScore] = useState(128); // Live user score
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");
  const [sortBy, setSortBy] = useState("default");

  // Dynamic state for rewards lists
  const [highlightRewards, setHighlightRewards] = useState(INITIAL_HIGHLIGHT_REWARDS);
  const [shoppingRewards, setShoppingRewards] = useState(INITIAL_SHOPPING_REWARDS);
  const [loanRewards, setLoanRewards] = useState(INITIAL_LOAN_REWARDS);
  const [travelRewards, setTravelRewards] = useState(INITIAL_TRAVEL_REWARDS);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Quick mission state to earn points dynamically for testing
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const handleClaimReward = (id: number, title: string, costPoints: number) => {
    // Check if already claimed
    const allRewards = [...highlightRewards, ...shoppingRewards, ...loanRewards, ...travelRewards];
    const target = allRewards.find(r => r.id === id);
    if (target?.claimed) {
      showToast("این جایزه قبلاً توسط شما دریافت شده است.", "info");
      return;
    }

    if (score < costPoints) {
      showToast(`امتیاز شما کافی نیست. برای این پاداش نیاز به ${costPoints} امتیاز دارید. (امتیاز فعلی شما: ${score})`, "error");
      return;
    }

    // Deduct points
    setScore(prev => prev - costPoints);
    
    // Update list claimed statuses
    const updateClaimed = (list: typeof INITIAL_HIGHLIGHT_REWARDS) =>
      list.map(r => (r.id === id ? { ...r, claimed: true } : r));

    setHighlightRewards(updateClaimed);
    setShoppingRewards(updateClaimed);
    setLoanRewards(updateClaimed);
    setTravelRewards(updateClaimed);

    showToast(`درخواست شما برای "${title}" ثبت شد و کدهای فعال‌سازی و حواله الکترونیکی به پرونده شما الصاق گردید.`, "success");
  };

  const handleCompleteMission = (id: number, rewardPoints: number, name: string) => {
    if (completedMissions.includes(id)) return;
    setCompletedMissions(prev => [...prev, id]);
    setScore(prev => prev + rewardPoints);
    showToast(`مأموریت رفاهی "${name}" را انجام دادید! +${rewardPoints} امتیاز کسب کردید.`, "success");
  };

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Filter & sort logic helper
  const processList = (list: typeof INITIAL_HIGHLIGHT_REWARDS) => {
    let result = list.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (statusFilter === "received") {
      result = result.filter(r => r.claimed);
    } else if (statusFilter === "not_received") {
      result = result.filter(r => !r.claimed);
    }

    if (sortBy === "points_asc") {
      result = [...result].sort((a, b) => a.points - b.points);
    } else if (sortBy === "points_desc") {
      result = [...result].sort((a, b) => b.points - a.points);
    }

    return result;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right font-sans" dir="rtl">
      {/* Dynamic Alert Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-[450px] bg-white border-r-8 rounded-xl shadow-2xl p-4 z-50 flex items-center justify-between transition-all ${
              toast.type === "success" 
                ? "border-emerald-500" 
                : toast.type === "error" 
                ? "border-rose-500" 
                : "border-indigo-500"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                toast.type === "success" 
                  ? "bg-emerald-50 text-emerald-600" 
                  : toast.type === "error" 
                  ? "bg-rose-50 text-rose-600" 
                  : "bg-indigo-50 text-indigo-600"
              }`}>
                {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "!"}
              </div>
              <p className="text-xs font-black text-slate-700 leading-relaxed pr-2">
                {toast.message}
              </p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Linked Benefits Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md border border-rose-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500/30 text-rose-200 border border-rose-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Gift className="w-3 h-3 text-rose-300" />
              جبران خدمات و امور رفاهی
            </span>
            <span className="text-[11px] text-slate-300 font-bold">
              اتصال نمره عملکرد به پاداش و فرصت‌های رفاهی
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            در این بخش امتیازات ناشی از بهبود شاخص‌های عملکردی و خوداظهاری به صورت هوشمند به بسته‌های رفاهی، سهمیه اماکن اقامتی، تسهیلات حکمت‌کارت و جوایز خانوادگی تبدیل می‌شوند.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-rose-300 bg-rose-900/50 px-3 py-1.5 rounded-xl border border-rose-500/30">
            {score} امتیاز رفاهی فعال
          </span>
        </div>
      </div>

      {/* User Header Stats Block - Polished card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border border-indigo-100 overflow-hidden shrink-0 shadow-inner bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80"
              alt="محمدرضا یزدان پناه"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-black text-slate-900">
                ستوان‌دوم محمدرضا یزدان‌پناه
              </h2>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-lg">
                شغل: متصدی عملیات انتظامی - سرتیم گشت موتوری
              </span>
              <span className="bg-indigo-50 text-[#4455A5] text-[10px] font-black px-2.5 py-1 rounded-lg border border-indigo-100">
                شاخص برجسته واکنش سریع ۱۱۰
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1 font-semibold">
              فرماندهی تهران بزرگ - کلانتری ۱۰۳ گاندی • ضریب ارزیابی عملکرد: <strong>۱.۲۴ (ممتاز)</strong>
            </p>
          </div>
        </div>

        {/* Live Score Counter with animation */}
        <div className="flex items-center gap-3 bg-amber-50/70 border border-amber-200 px-5 py-3 rounded-2xl">
          <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xl shadow-inner animate-pulse">
            ☀️
          </div>
          <div>
            <div className="text-[10px] text-amber-800 font-bold">امتیازهای در دسترس شما (ناشی از ارزیابی شایستگی):</div>
            <div className="font-black text-amber-700 text-xl leading-none mt-1">
              {score} <span className="text-xs font-bold">امتیاز رفاهی فعال</span>
            </div>
          </div>
        </div>
      </div>

      {/* Competency-to-Welfare conversion info card */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>پاداش شایستگی فعال:</strong> نمره ۹۳.۵٪ در ماتریس شایستگی‌های گشت موتوری به صورت خودکار به ۸۵ امتیاز رفاهی و حق اولویت در دریافت وام‌های کم‌بهره و سفرهای زیارتی تبدیل شده است.
          </span>
        </div>
        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg font-black text-[11px] shrink-0 border border-emerald-300">
          تایید شده توسط فرماندهی کلانتری
        </span>
      </div>

      {/* Interactive Micro Missions Panel (Earn Points) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
          <Zap className="w-5 h-5 text-indigo-600 animate-bounce" />
          <div>
            <h3 className="font-extrabold text-slate-800 text-xs">کسب امتیازهای فوری (فعالیت‌های فوق‌برنامه)</h3>
            <p className="text-[10px] text-slate-400">با انجام ماموریت‌های زیر، امتیاز رفاهی خود را برای دریافت جوایز بزرگتر افزایش دهید.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-50 rounded-xl p-4 bg-slate-50/40 flex flex-col justify-between gap-3">
            <div>
              <h4 className="font-black text-slate-700 text-xs">شرکت در نظرسنجی سلامت روان یگان</h4>
              <p className="text-[10px] text-slate-400 mt-1">مدت زمان حدودی: ۳ دقیقه</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600">+۱۵ امتیاز</span>
              <button 
                disabled={completedMissions.includes(1)}
                onClick={() => handleCompleteMission(1, 15, "نظرسنجی سلامت روان")}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  completedMissions.includes(1) 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-[#4455A5] text-white hover:bg-[#34448c]"
                }`}
              >
                {completedMissions.includes(1) ? "تکمیل شده" : "شروع نظرسنجی"}
              </button>
            </div>
          </div>

          <div className="border border-slate-50 rounded-xl p-4 bg-slate-50/40 flex flex-col justify-between gap-3">
            <div>
              <h4 className="font-black text-slate-700 text-xs">ثبت پیشنهاد برتر بهبود فرآیند گشت</h4>
              <p className="text-[10px] text-slate-400 mt-1">تایید خودکار توسط دایره فناوری فراجا</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600">+۳۰ امتیاز</span>
              <button 
                disabled={completedMissions.includes(2)}
                onClick={() => handleCompleteMission(2, 30, "پیشنهاد بهبود گشت")}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  completedMissions.includes(2) 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-[#4455A5] text-white hover:bg-[#34448c]"
                }`}
              >
                {completedMissions.includes(2) ? "تکمیل شده" : "ارسال ایده"}
              </button>
            </div>
          </div>

          <div className="border border-slate-50 rounded-xl p-4 bg-slate-50/40 flex flex-col justify-between gap-3">
            <div>
              <h4 className="font-black text-slate-700 text-xs">مطالعه آیین‌نامه انضباطی جدید</h4>
              <p className="text-[10px] text-slate-400 mt-1">آشنایی با حقوق اداری و امتیازات کارکنان</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600">+۱۰ امتیاز</span>
              <button 
                disabled={completedMissions.includes(3)}
                onClick={() => handleCompleteMission(3, 10, "مطالعه آیین‌نامه انضباطی")}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  completedMissions.includes(3) 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-[#4455A5] text-white hover:bg-[#34448c]"
                }`}
              >
                {completedMissions.includes(3) ? "تکمیل شده" : "تایید مطالعه"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar with dynamic options */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-black text-slate-600 block mb-1.5">
            دسته‌بندی جوایز
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="همه">همه دسته‌ها</option>
              <option value="سفر">سفر زیارتی و سیاحتی</option>
              <option value="وام">تسهیلات و وام‌ها</option>
              <option value="بن خرید">بن خرید و کارت معیشت</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-slate-600 block mb-1.5">وضعیت دریافت</label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="همه">همه موارد</option>
              <option value="received">دریافت شده</option>
              <option value="not_received">قابل دریافت</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-slate-600 block mb-1.5">
            مرتب‌سازی براساس
          </label>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="default">پیش‌فرض</option>
              <option value="points_asc">امتیاز (کم به زیاد)</option>
              <option value="points_desc">امتیاز (زیاد به کم)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-slate-600 block mb-1.5">
            جستجوی نام پاداش رفاهی
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="مثلا: وام، مشهد، سفر..."
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Welfare Sections */}
      <div className="space-y-8 pb-10">
        
        {/* Section 1: Rewards you can receive */}
        {(categoryFilter === "همه" || categoryFilter === "سفر" || categoryFilter === "بن خرید" || categoryFilter === "وام") && (
          <div>
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 text-xs border-r-4 border-indigo-500 pr-2">
              <Gift className="w-5 h-5 text-indigo-500 animate-pulse" /> مزایای پیشنهادی بر اساس ارزیابی فصلی
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processList(highlightRewards).length > 0 ? (
                processList(highlightRewards).map((reward) => (
                  <TicketCard category={reward.category}
                    key={reward.id}
                    title={reward.title}
                    points={reward.points}
                    claimed={reward.claimed}
                    onClaim={() => handleClaimReward(reward.id, reward.title, reward.points)}
                  />
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-xs text-slate-400 font-bold bg-slate-50 rounded-xl">
                  موردی یافت نشد.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 2: Shopping Vouchers */}
        {(categoryFilter === "همه" || categoryFilter === "بن خرید") && (
          <div>
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 text-xs border-r-4 border-emerald-500 pr-2">
              <ShoppingBag className="w-5 h-5 text-emerald-500" /> بن‌های خرید و کمک‌هزینه‌های معیشتی کارکنان
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processList(shoppingRewards).length > 0 ? (
                processList(shoppingRewards).map((reward) => (
                  <TicketCard category={reward.category}
                    key={reward.id}
                    title={reward.title}
                    points={reward.points}
                    claimed={reward.claimed}
                    onClaim={() => handleClaimReward(reward.id, reward.title, reward.points)}
                  />
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-xs text-slate-400 font-bold bg-slate-50 rounded-xl">
                  موردی در این بخش یافت نشد.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 3: Loans */}
        {(categoryFilter === "همه" || categoryFilter === "وام") && (
          <div>
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 text-xs border-r-4 border-indigo-500 pr-2">
              <CreditCard className="w-5 h-5 text-indigo-500" /> تسهیلات ویژه، وام‌های عقود اسلامی و کوثر
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processList(loanRewards).length > 0 ? (
                processList(loanRewards).map((reward) => (
                  <TicketCard category={reward.category}
                    key={reward.id}
                    title={reward.title}
                    points={reward.points}
                    claimed={reward.claimed}
                    onClaim={() => handleClaimReward(reward.id, reward.title, reward.points)}
                  />
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-xs text-slate-400 font-bold bg-slate-50 rounded-xl">
                  موردی در این بخش یافت نشد.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: Travel */}
        {(categoryFilter === "همه" || categoryFilter === "سفر") && (
          <div>
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4 text-xs border-r-4 border-cyan-500 pr-2">
              <Plane className="w-5 h-5 text-cyan-500" /> سفرهای زیارتی و مجتمع‌های تفریحی خزرآباد و ثامن‌الائمه
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processList(travelRewards).length > 0 ? (
                processList(travelRewards).map((reward) => (
                  <TicketCard category={reward.category}
                    key={reward.id}
                    title={reward.title}
                    points={reward.points}
                    claimed={reward.claimed}
                    onClaim={() => handleClaimReward(reward.id, reward.title, reward.points)}
                  />
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-xs text-slate-400 font-bold bg-slate-50 rounded-xl">
                  موردی در این بخش یافت نشد.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ManagerView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right font-sans" dir="rtl">
      {/* Dynamic Score Distribution & Total Metrics (Polished uniform cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs font-bold">مجموع امتیازات تخصیصی یگان</div>
            <div className="text-2xl font-black text-slate-800 mt-2">۲,۴۵۰</div>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl">
            ☀️
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs font-bold">پاداش‌های دریافت شده (ماه جاری)</div>
            <div className="text-2xl font-black text-indigo-600 mt-2">۳۷ مورد</div>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Gift className="w-7 h-7 text-indigo-500" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs font-bold">کارکنان ممتاز و شایسته تشویق</div>
            <div className="text-2xl font-black text-emerald-600 mt-2">۱۵ نفر</div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Award className="w-7 h-7 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-2 mb-6">
            <BarChartIcon className="w-5 h-5 text-indigo-500" /> استفاده از خدمات رفاهی در ماه‌های اخیر (توزیع موضوعی)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REWARDS_CLAIMED_DATA} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontWeight: "bold" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontWeight: "bold" }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="بن_خرید" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="سفر" stackId="a" fill="#f59e0b" />
                <Bar dataKey="وام" stackId="a" fill="#4455A5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-indigo-500" /> توزیع امتیازات کارکنان یگان تحت فرماندهی
          </h3>
          <div className="h-72 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={UNIT_POINTS_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {UNIT_POINTS_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-800">۱۰۰٪</span>
              <span className="text-[10px] font-bold text-slate-500">پوشش آماری کارکنان</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {UNIT_POINTS_DISTRIBUTION.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BenefitsPage() {
  const { role } = useRole();
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
