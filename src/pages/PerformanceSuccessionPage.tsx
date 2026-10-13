import { FileText, ChevronLeft, ChevronRight, HelpCircle, ShieldCheck, Sparkles, Compass } from "lucide-react";
import { motion } from "motion/react";
import { SuccessionReadinessPanel } from "../components/SuccessionReadinessPanel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const CURRENT_COMPETENCIES = [
  { id: 1, title: "قاطعیت و اقتدار", importance: "کم", progress: "خیلی خوب", type: "محوری", indicators: ["درصد تحقق گشت زنی", "مدیریت زمان", "نظم در ورود و خروج"] },
  { id: 2, title: "استقامت و پایداری", importance: "زیاد", progress: "خوب", type: "عمومی", indicators: ["درصد تحقق گشت زنی", "دقت در ثبت گزارش", "نظم در ورود و خروج"] },
  { id: 3, title: "آگاهی اجتماعی", importance: "خیلی زیاد", progress: "قابل قبول", type: "تخصصی", indicators: ["نظم در ورود و خروج", "درصد تحقق گشت زنی", "دقت در ثبت گزارش"] },
  { id: 4, title: "مربی گری", importance: "متوسط", progress: "کسب نشده", type: "تخصصی", indicators: ["مهارت ارتباط موثر", "دقت در ثبت گزارش", "درصد تحقق گشت زنی"] },
  { id: 5, title: "نتیجه گرایی", importance: "خیلی کم", progress: "بسیار نیاز به تلاش", type: "محوری", indicators: ["درصد تحقق گشت زنی", "نظم در ورود و خروج", "دقت در ثبت گزارش"] },
  { id: 6, title: "توجه به جزییات", importance: "زیاد", progress: "نیازمند بهبود", type: "عمومی", indicators: ["دقت در ثبت گزارش", "درصد تحقق گشت زنی", "نظم در ورود و خروج"] },
  { id: 7, title: "استقلال", importance: "متوسط", progress: "خوب", type: "عمومی", indicators: ["دقت در ثبت گزارش", "نظم در ورود و خروج", "درصد تحقق گشت زنی"] },
  { id: 8, title: "گزارش کتبی", importance: "خیلی کم", progress: "قابل قبول", type: "محوری", indicators: ["درصد رضایت شاکیان", "دقت در ثبت گزارش", "درصد تحقق گشت زنی"] },
  { id: 9, title: "مدیریت تضاد", importance: "زیاد", progress: "کسب نشده", type: "محوری", indicators: ["دقت در ثبت گزارش", "درصد وقوع جرم در منطقه", "درصد تحقق گشت زنی"] },
  { id: 10, title: "مدیریت استرس", importance: "کم", progress: "خوب", type: "عمومی", indicators: ["دقت در ثبت گزارش", "درصد تحقق گشت زنی", "نظم در ورود و خروج"] },
];

const FUTURE_COMPETENCIES = [
  { id: 1, title: "انتقادپذیری و پذیرش اشتباه", importance: "کم", progress: "خیلی خوب", type: "محوری", indicators: ["درصد تحقق گشت زنی", "دقت در ثبت گزارش", "نظم در ورود و خروج"] },
  { id: 2, title: "فعال و پیگیر بودن", importance: "زیاد", progress: "کسب نشده", type: "عمومی", indicators: ["درصد تحقق گشت زنی", "دقت در ثبت گزارش", "نظم در ورود و خروج"] },
  { id: 3, title: "اعتماد به نفس", importance: "خیلی زیاد", progress: "کسب نشده", type: "تخصصی", indicators: ["نظم در ورود و خروج", "درصد تحقق گشت زنی", "دقت در ثبت گزارش"] },
  { id: 4, title: "صبر، بردباری و خویشتن داری", importance: "متوسط", progress: "کسب نشده", type: "تخصصی", indicators: ["نظم در ورود و خروج", "دقت در ثبت گزارش", "درصد تحقق گشت زنی"] },
  { id: 5, title: "اطاعت پذیری", importance: "خیلی کم", progress: "نیازمند بهبود", type: "محوری", indicators: ["درصد تحقق گشت زنی", "نظم در ورود و خروج", "دقت در ثبت گزارش"] },
  { id: 6, title: "تصمیم گیری", importance: "زیاد", progress: "بسیار نیاز به تلاش", type: "عمومی", indicators: ["دقت در ثبت گزارش", "درصد تحقق گشت زنی", "نظم در ورود و خروج"] },
  { id: 7, title: "نرم خویی و خوش اخلاقی", importance: "متوسط", progress: "کسب نشده", type: "عمومی", indicators: ["دقت در ثبت گزارش", "نظم در ورود و خروج", "درصد تحقق گشت زنی"] },
  { id: 8, title: "وقت شناسی و سرعت عمل", importance: "خیلی کم", progress: "کسب نشده", type: "محوری", indicators: ["نظم در ورود و خروج", "دقت در ثبت گزارش", "درصد تحقق گشت زنی"] },
  { id: 9, title: "نظم و انضباط", importance: "زیاد", progress: "کسب نشده", type: "محوری", indicators: ["دقت در ثبت گزارش", "نظم در ورود و خروج", "درصد تحقق گشت زنی"] },
  { id: 10, title: "توجه به جزئیات", importance: "کم", progress: "خوب", type: "عمومی", indicators: ["دقت در ثبت گزارش", "درصد تحقق گشت زنی", "نظم در ورود و خروج"] },
];

function getProgressBadgeStyle(progress: string) {
  switch (progress) {
    case "خیلی خوب":
      return "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]";
    case "خوب":
      return "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]";
    case "قابل قبول":
      return "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]";
    case "کسب نشده":
      return "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]";
    case "نیازمند بهبود":
      return "bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5]";
    case "بسیار نیاز به تلاش":
      return "bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function PerformanceSuccessionPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 text-right relative"
      dir="rtl"
    >
      {/* Sticky Job & Identity Box */}
      <div className="sticky top-2 z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shrink-0 text-xl">
            🏍️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                شغل مصوب فعلی (ثابت)
              </span>
              <span className="text-xs text-slate-300 font-bold">ستوان‌دوم محمدرضا یزدان پناه</span>
            </div>
            <h3 className="text-base font-black text-white mt-0.5">
              مامور ارشد گشت انتظامی و فوریت‌های ۱۱۰ (گشت موتوری)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">یگان خدمتی:</span>
            <span className="text-slate-200 font-bold">کلانتری ۱۰۳ گاندی (واکنش سریع)</span>
          </div>
          <div className="bg-emerald-600/30 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-center">
            <span className="text-[10px] text-emerald-300 block">جایگاه جانشین‌پروری هدف:</span>
            <span className="text-white font-black text-xs">سرتیم گشت موتوری ۱۱۰</span>
          </div>
        </div>
      </div>

      {/* Succession Readiness & Competency Match Analysis Component */}
      <motion.div variants={itemVariants}>
        <SuccessionReadinessPanel />
      </motion.div>

      {/* Top Description Box */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-extrabold text-slate-800 mb-3 text-lg border-r-4 border-indigo-600 pr-3">تحلیل شایستگی و جانشین‌پروری</h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-5xl">
          در این بخش، وضعیت شایستگی‌های مورد نیاز برای سمت فعلی (<strong className="text-indigo-950">مامور ارشد گشت موتوری ۱۱۰</strong>) و مسیر رشد شما برای دستیابی به جایگاه‌های آتی (<strong className="text-emerald-700">سرتیم گشت موتوری واکنش سریع</strong>) ترسیم شده است. برای ارتقای رتبه هر شایستگی، لازم است بر روی شاخص‌های عملکردی مرتبط تمرکز کنید.
        </p>
      </motion.div>

      {/* Table 1: Current Competency */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800">شایستگی سمت فعلی</h4>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium mr-2">
              سابقه شغلی در این سمت: ۲ سال
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-100">
              <tr>
                <th className="p-3.5 font-bold w-12 text-center">#</th>
                <th className="p-3.5 font-bold">عنوان شایستگی</th>
                <th className="p-3.5 font-bold">اهمیت شایستگی</th>
                <th className="p-3.5 font-bold">وضعیت پیشرفت</th>
                <th className="p-3.5 font-bold">نوع شایستگی</th>
                <th className="p-3.5 font-bold">شاخص‌های عملکردی مرتبط</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CURRENT_COMPETENCIES.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 text-slate-400 text-center font-mono">{row.id}</td>
                  <td className="p-3.5 font-bold text-slate-700">{row.title}</td>
                  <td className="p-3.5 text-slate-500 font-medium">{row.importance}</td>
                  <td className="p-3.5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm inline-block text-center min-w-[100px] ${getProgressBadgeStyle(row.progress)}`}>
                      {row.progress}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 font-medium">{row.type}</td>
                  <td className="p-3.5 text-slate-500 text-[10px]">
                    <div className="flex flex-wrap gap-1.5">
                      {row.indicators.map((ind, i) => (
                        <span key={i} className="bg-[#06B6D4]/10 text-[#0891B2] px-2.5 py-1 rounded-full font-bold">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 1 Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>تعداد سطرها در هر صفحه:</span>
            <select className="border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none">
              <option>۱۰</option>
            </select>
            <span className="mr-4">۱-۱۰ از ۱/۲</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 transition disabled:opacity-40" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              <span className="w-6 h-6 rounded flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">۱</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۲</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۳</span>
              <span className="px-1 flex items-center justify-center">...</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۸</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۹</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۱۰</span>
            </div>
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Career Path Promotion Banner */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-xl p-5 border border-indigo-100 space-y-2">
        <h4 className="font-extrabold text-indigo-900 text-sm">افزایش سرعت ارتقا در کارراهه شغلی</h4>
        <p className="text-xs text-indigo-700 leading-relaxed">
          در صورتی که برای سه دوره ی عملکردی مداوم عملکرد خیلی خوب یا طلایی داشته باشید میتوانید زمان دستیابی به سمت آینده رو تا ۵۰٪ کوتاه تر کنید و با سرعت بیشتری پیش بروید.
        </p>
      </motion.div>

      {/* Table 2: Future Competency */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800">شایستگی سمت آینده</h4>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium mr-2">
              سابقه خدمت مورد نیاز: ۲ سال | پیشرفت شایستگی: ۲/۱۰
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-100">
              <tr>
                <th className="p-3.5 font-bold w-12 text-center">#</th>
                <th className="p-3.5 font-bold">عنوان شایستگی</th>
                <th className="p-3.5 font-bold">اهمیت شایستگی</th>
                <th className="p-3.5 font-bold">وضعیت پیشرفت</th>
                <th className="p-3.5 font-bold">نوع شایستگی</th>
                <th className="p-3.5 font-bold">شاخص‌های عملکردی مرتبط</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FUTURE_COMPETENCIES.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 text-slate-400 text-center font-mono">{row.id}</td>
                  <td className="p-3.5 font-bold text-slate-700">{row.title}</td>
                  <td className="p-3.5 text-slate-500 font-medium">{row.importance}</td>
                  <td className="p-3.5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm inline-block text-center min-w-[100px] ${getProgressBadgeStyle(row.progress)}`}>
                      {row.progress}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 font-medium">{row.type}</td>
                  <td className="p-3.5 text-slate-500 text-[10px]">
                    <div className="flex flex-wrap gap-1.5">
                      {row.indicators.map((ind, i) => (
                        <span key={i} className="bg-[#06B6D4]/10 text-[#0891B2] px-2.5 py-1 rounded-full font-bold">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 2 Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>تعداد سطرها در هر صفحه:</span>
            <select className="border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none">
              <option>۱۰</option>
            </select>
            <span className="mr-4">۱-۱۰ از ۱/۲</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 transition disabled:opacity-40" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              <span className="w-6 h-6 rounded flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">۱</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۲</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۳</span>
              <span className="px-1 flex items-center justify-center">...</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۸</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۹</span>
              <span className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer">۱۰</span>
            </div>
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
