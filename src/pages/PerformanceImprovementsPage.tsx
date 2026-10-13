import { useState } from "react";
import { Target, ArrowDownRight, ArrowUpRight, TrendingDown, BookOpen, Info, Edit3, ShieldAlert, UserCheck, X, PlayCircle, Headphones } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { motion } from "motion/react";

const IMPROVEMENTS_DATA = [
  { name: "کاهش وقوع جرم در حوزه استحفاظی در زمان هدف", بهار: 57, تابستان: 70, پاییز: 30 },
  { name: "درصد رضایت شاکیان از مامور گشت", بهار: 18, تابستان: 55, پاییز: 85 },
  { name: "تماس های خبری پاسخ داده شده", بهار: 65, تابستان: 50, پاییز: 22 },
  { name: "میانگین مدت زمان رسیدن سر صحنه", بهار: 38, تابستان: 78, پاییز: 68 },
  { name: "صحت گزارش های اولیه", بهار: 21, تابستان: 57, پاییز: 85 },
];

const METRICS = [
  {
    id: 1,
    title: "میانگین مدت زمان رسیدن سر صحنه از زمان تایید هدف",
    priority: "۳",
    unit: "دقیقه",
    weight: "۲۰٪",
    result: "۵۰",
    lastSeason: "۰٪",
    normal: "۱۰۰",
    orgAvg: "۱۸",
    effect: "کاهشی",
    effectDir: "down",
    score: "۵۰",
    welfarePoints: "۳",
    criteria: "نتیجه‌ای",
    action: "خود اظهاری"
  },
  {
    id: 2,
    title: "تعداد جرایم ثبت شده در محدوده",
    priority: "۴",
    unit: "تعداد",
    weight: "۳۵٪",
    result: "۵",
    lastSeason: "+۴۰٪",
    normal: "۵۰",
    orgAvg: "۱۵",
    effect: "کاهشی",
    effectDir: "down",
    score: "۴۷",
    welfarePoints: "۱",
    criteria: "عملکردی",
    action: "خود اظهاری"
  },
  {
    id: 3,
    title: "درصد وقوع جرم در منطقه",
    priority: "۴",
    unit: "درصد",
    weight: "۱۲٪",
    result: "۲۰",
    lastSeason: "-۱۰٪",
    normal: "۵۰",
    orgAvg: "۴۰",
    effect: "افزایشی",
    effectDir: "up",
    score: "۲۵",
    welfarePoints: "۰",
    criteria: "نتیجه‌ای",
    action: "کمیسیون"
  },
  {
    id: 4,
    title: "مهارت ارتباط موثر",
    priority: "۱",
    unit: "تعداد",
    weight: "۱۰٪",
    result: "۱۵",
    lastSeason: "۰٪",
    normal: "۲۴",
    orgAvg: "۱۸",
    effect: "افزایشی",
    effectDir: "up",
    score: "۱۲",
    welfarePoints: "۰",
    criteria: "رفتاری",
    action: "کمیسیون"
  },
  {
    id: 5,
    title: "درصد صحت گزارش اولیه",
    priority: "۲",
    unit: "درصد",
    weight: "۳۵٪",
    result: "۱۸",
    lastSeason: "-۲۰٪",
    normal: "۳۰",
    orgAvg: "۲۵",
    effect: "کاهشی",
    effectDir: "down",
    score: "۱۴",
    welfarePoints: "۰",
    criteria: "رفتاری",
    action: "کمیسیون"
  },
];

const COURSES = [
  {
    id: 1,
    title: "مهارت گوش دادن فعال",
    points: "۳۲ امتیاز",
    time: "۱۶ ساعت",
    type: "ویدئو",
    typeIcon: PlayCircle
  },
  {
    id: 2,
    title: "هوش هیجانی چیست؟",
    points: "۳۲ امتیاز",
    time: "۲ ساعت در هفته",
    type: "حضوری",
    typeIcon: BookOpen
  },
  {
    id: 3,
    title: "اصول مذاکره",
    points: "۳۲ امتیاز",
    time: "۲۰ ساعت",
    type: "ویدئو",
    typeIcon: PlayCircle
  },
  {
    id: 4,
    title: "مذاکره به وقت بحران",
    points: "۳۲ امتیاز",
    time: "۱۲ ساعت",
    type: "پادکست",
    typeIcon: Headphones
  },
];

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

export function PerformanceImprovementsPage() {
  const [selectedMetricForFeedback, setSelectedMetricForFeedback] = useState<any>(null);
  const [isObjectionOpen, setIsObjectionOpen] = useState(false);
  const [objectionToast, setObjectionToast] = useState(false);
  const [objectionScope, setObjectionScope] = useState("کل عملکرد");
  const [objectionReason, setObjectionReason] = useState("کمبود یا خرابی تجهیزات");
  const [objectionDetails, setObjectionDetails] = useState("");
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {objectionToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between gap-3 font-bold text-xs animate-in fade-in duration-300 shadow-sm" dir="rtl">
          <div className="flex items-center gap-3">
            <span className="text-[#69b736] font-bold text-lg">✓</span>
            <span>اعتراض شما با موفقیت ثبت شد.</span>
          </div>
          <button onClick={() => setObjectionToast(false)} className="text-slate-400 hover:text-slate-600 font-bold px-2">×</button>
        </div>
      )}

      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
        <h3 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6 text-lg">
          تحلیل نقاط نیازمند بهبود فصل گذشته
        </h3>
        <div className="bg-slate-50 border-r-4 border-slate-300 p-4 rounded-l-xl mb-8">
          <p className="text-slate-700 font-medium text-sm leading-relaxed">
            در فصل گذشته در شاخص هایی مثل مهارت ارتباط موثر، درصد تحقق گشت زنی و دقت پایینتر از حد انتظار بوده اید و لازم است با انجام اهداف تعیین شده و دریافت آموزش های مرتبط به بهبود این شاخص ها بپردازید.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-md"><BookOpen className="w-4 h-4" /></span> کارنامه عملکردی - نقاط نیازمند بهبود
          </h4>
          <button 
            onClick={() => setIsObjectionOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>ثبت اعتراض</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100 mb-10">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 text-xs">
              <tr>
                <th className="p-4 font-semibold whitespace-nowrap">شرح ارزیابی</th>
                <th className="p-4 font-semibold whitespace-nowrap">واحد سنجش</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">اولویت</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1">وزن شاخص <Info className="w-3.5 h-3.5 text-slate-400" /></div>
                </th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">نتیجه</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">نتیجه فصل قبل</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1">حد معمول <Info className="w-3.5 h-3.5 text-slate-400" /></div>
                </th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">متوسط سازمان</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1">اثرگذاری <Info className="w-3.5 h-3.5 text-slate-400" /></div>
                </th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">نمره</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1">امتیاز رفاهی <Info className="w-3.5 h-3.5 text-slate-400" /></div>
                </th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">ملاک شاخص</th>
                <th className="p-4 font-semibold whitespace-nowrap text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {METRICS.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-slate-700 whitespace-nowrap">{row.title}</td>
                  <td className="p-4 text-slate-500">{row.unit}</td>
                  <td className="p-4 text-slate-500 text-center">{row.priority}</td>
                  <td className="p-4 font-medium text-slate-700 text-center">{row.weight}</td>
                  <td className="p-4 text-slate-700 text-center">{row.result}</td>
                  <td className="p-4 font-medium text-center">
                    <span className={`flex items-center justify-center gap-1 ${row.lastSeason.includes('+') ? 'text-emerald-600' : row.lastSeason === '۰٪' ? 'text-slate-500' : 'text-rose-600'}`}>
                      {row.lastSeason.includes('+') ? <ArrowUpRight className="w-4 h-4" /> : row.lastSeason !== '۰٪' ? <ArrowDownRight className="w-4 h-4" /> : null} {row.lastSeason}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-center">{row.normal}</td>
                  <td className="p-4 text-slate-500 text-center">{row.orgAvg}</td>
                  <td className="p-4 font-medium text-center">
                    <span className={`flex items-center justify-center gap-1 ${row.effectDir === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {row.effectDir === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />} {row.effect}
                    </span>
                  </td>
                  <td className="p-4">
                     <span className={`font-black px-3 py-1 rounded-sm block text-center ${Number(row.score.replace(/[۰-۹]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])) >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                        {row.score}
                     </span>
                  </td>
                  <td className="p-4 text-slate-700 text-center font-medium">{row.welfarePoints}</td>
                  <td className="p-4 text-slate-500 text-xs text-center">{row.criteria}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded-md transition-colors">آموزش</button>
                       <button 
                         onClick={() => setSelectedMetricForFeedback(row)}
                         className={`${row.action === 'خود اظهاری' ? 'bg-[#5B6BB0] hover:bg-indigo-700' : row.action === 'کمیسیون' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white text-xs px-3 py-1 rounded-md flex items-center gap-1 transition-colors min-w-[80px] justify-center font-medium`}
                       >
                         {row.action}
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mb-6">
           <h3 className="font-extrabold text-slate-800 flex items-center gap-2 text-lg">
             <BookOpen className="w-6 h-6 text-indigo-500" /> نمودار نقاط نیازمند بهبود عملکردی
           </h3>
        </div>
        
        <div className="h-96 mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={IMPROVEMENTS_DATA}
              margin={{ top: 20, right: 0, left: -20, bottom: 20 }}
              barGap={0}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'right'}}
              />
              <Bar dataKey="بهار" fill="#fbbf24" name="بهار">
                 {IMPROVEMENTS_DATA.map((entry, index) => (
                    <Cell key={`cell-spring-${index}`} fill="#fbbf24" />
                  ))}
              </Bar>
              <Bar dataKey="تابستان" fill="#5eead4" name="تابستان">
                 {IMPROVEMENTS_DATA.map((entry, index) => (
                    <Cell key={`cell-summer-${index}`} fill="#5eead4" />
                  ))}
              </Bar>
              <Bar dataKey="پاییز" fill="#fca5a5" name="پاییز">
                 {IMPROVEMENTS_DATA.map((entry, index) => (
                    <Cell key={`cell-autumn-${index}`} fill="#fca5a5" />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 mb-8">
           <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm bg-[#fbbf24]"></span>
              <span className="text-sm text-slate-600 font-medium">تابستان</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm bg-[#5eead4]"></span>
              <span className="text-sm text-slate-600 font-medium">پاییز</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm bg-[#fca5a5]"></span>
              <span className="text-sm text-slate-600 font-medium">زمستان</span>
           </div>
        </div>

        <div className="flex items-center justify-between mb-6 pt-6 border-t border-slate-100">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            بسته آموزشی بهبود شاخص مهارت ارتباط موثر <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs mr-2">با اولویت بالا</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => (
            <motion.div
              variants={itemVariants}
              key={course.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="h-36 bg-gradient-to-br from-slate-100 to-slate-200/50 flex items-center justify-center relative overflow-hidden">
                 <course.typeIcon className="w-12 h-12 text-slate-300 group-hover:text-indigo-200 transition-colors duration-300" />
                 
                 {/* Category Label */}
                 <span className="absolute top-3 right-3 bg-slate-900/70 text-white text-[10px] font-black px-2 py-1 rounded-full backdrop-blur-sm">
                   {course.type}
                 </span>
              </div>
              <div className="p-5 flex flex-col flex-1 bg-white">
                <h4 className="font-bold text-slate-800 mb-2 text-sm">{course.title}</h4>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mb-4 bg-amber-50 px-2 py-1 rounded-md self-start">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                   {course.points}
                </div>
                
                <div className="space-y-2 mb-6 mt-auto">
                   <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> نوع آموزش:</span>
                      <span className="font-medium text-slate-700">{course.type}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5" /> مدت زمان:</span>
                      <span className="font-medium text-slate-700">{course.time}</span>
                   </div>
                </div>

                <button className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 mt-auto">
                   مشاهده آموزش <ArrowDownRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feedback Modal */}
      {selectedMetricForFeedback && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <span className="text-slate-500">{selectedMetricForFeedback.action} - </span>
                {selectedMetricForFeedback.title}
              </h3>
              <button 
                onClick={() => setSelectedMetricForFeedback(null)}
                className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <p className="text-slate-700 text-sm font-medium leading-relaxed">
                پس از بررسی کارشناسی و ارزیابی مستقیم، علت افت این شاخص مشخص شده و به استحضار می‌رسد:
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="bg-rose-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm">عدم طراحی مسیر گشت براساس جرم خیزی</span>
                <span className="bg-rose-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm">نگرش صرفاً واکنشی به مأموریت</span>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">نتیجه کمیسیون عالی ماده ۱۴۳</h4>
                <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-700 leading-relaxed text-justify border-r-4 border-slate-300">
                  کمیسیون پس از تطبیق گزارش‌های سامانه با عملکرد واقعی، تاخیرهای مکرر در حضور به موقع بر صحنه جرم را تأیید می‌نماید. ریشه این نقیصه در عدم اشراف کافی بر جغرافیای جرم و ضعف در مدیریت زمان مأموریت‌ها تشخیص داده شد. از نظر این کمیسیون، تغییر نگرش از حالت واکنشی به حالت عملیاتی-پیشگیرانه و طراحی هوشمندانه مسیرهای گشت بر مبنای تحلیل داده‌ها، پیش‌شرط اساسی برای بهبود امتیازات در دوره ارزیابی آتی است. لذا بازنگری در نظم کاری و ارتقای سرعت واکنش الزامی تلقی می‌گردد.
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">نظر ارزیاب مستقیم</h4>
                <div className="border border-slate-200 p-4 rounded-lg text-sm text-slate-700 leading-relaxed text-justify">
                  تأخیر مکرر در حضور به موقع در محل مأموریت از زمان تأیید، حاکی از نیاز به بازنگری در نظم کاری و بهبود سرعت واکنش ایشان است.
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">دفاعیات و توضیحات شما <span className="text-rose-500">*</span></h4>
                <textarea 
                  rows={4}
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                  placeholder="توضیحات و ادله خود را جهت طرح در کمیسیون رسیدگی به اعتراضات بنویسید."
                ></textarea>
              </div>
              
              <div className="space-y-4 border border-[#5B6BB0] rounded-xl p-5 relative mt-8">
                 <div className="absolute -top-3 right-4 bg-white px-2 font-bold text-slate-800 text-sm">خود اظهاری</div>
                 <div className="absolute top-4 left-4 text-xs text-slate-500 font-medium font-mono" dir="ltr">۱۴۰۵/۷/۱۵ - ۱۲:۰۲</div>
                 
                 <div className="flex flex-wrap gap-2 mt-4">
                   <span className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-medium">تعامل ضعیف بهبود با سایر تیم ها</span>
                   <span className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-medium">ضعف در تحلیل داده‌های جرایم گذشته</span>
                 </div>
                 
                 <p className="text-sm text-slate-700 leading-relaxed text-justify mt-4">
                   علت اصلی افت شاخص زمان رسیدن، ضعف در شناسایی مسیرهای جایگزین و عدم هماهنگی کامل با تیم‌های پشتیبان در ساعات پیک ترافیک بوده است. بنده ضمن پذیرش لزوم بازنگری در نظم کاری، برنامه‌ای برای بهبود تعاملات تیمی و تحلیل بهتر داده‌های جغرافیایی جرم در دست دارم تا سرعت واکنش عملیاتی خود را ارتقا دهم
                 </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-3">
              <button 
                onClick={() => setSelectedMetricForFeedback(null)}
                className="bg-[#6B78C2] hover:bg-indigo-600 text-white px-10 py-2.5 rounded-lg text-sm font-medium transition"
              >
                ذخیره
              </button>
              <button 
                onClick={() => setSelectedMetricForFeedback(null)}
                className="border border-[#6B78C2] text-[#6B78C2] hover:bg-slate-50 px-10 py-2.5 rounded-lg text-sm font-medium transition"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Objection Modal (Figma Image 2) */}
      {isObjectionOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 text-base">ثبت اعتراض</h3>
              <button
                onClick={() => setIsObjectionOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <p className="text-xs text-slate-500 leading-relaxed text-justify bg-amber-50 border border-amber-200 rounded-lg p-3">
                شما می‌توانید اعتراض خود را بر روی یک شاخص عملکردی یا کل امتیاز عملکردی یا هر فصل، تنها ثبت یک اعتراض مجاز است و اعتراضات بعدی در کمیسیون‌ها بررسی خواهد شد.
              </p>

              {/* Scope Dropdown */}
              <div className="space-y-2 text-right">
                <label className="block text-xs font-bold text-slate-700">محل اعتراض عملکردی</label>
                <select 
                  value={objectionScope}
                  onChange={(e) => setObjectionScope(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="کل عملکرد">کل عملکرد</option>
                  <option value="شاخص‌های رفتاری">شاخص‌های رفتاری</option>
                  <option value="شاخص‌های عملکردی">شاخص‌های عملکردی</option>
                  <option value="شاخص‌های نتیجه‌ای">شاخص‌های نتیجه‌ای</option>
                  <option value="میانگین مدت زمان رسیدن سر صحنه">میانگین مدت زمان رسیدن سر صحنه</option>
                </select>
              </div>

              {/* Reason Dropdown */}
              <div className="space-y-2 text-right">
                <label className="block text-xs font-bold text-slate-700">علت اعتراض</label>
                <select 
                  value={objectionReason}
                  onChange={(e) => setObjectionReason(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="کمبود یا خرابی تجهیزات">کمبود یا خرابی تجهیزات</option>
                  <option value="ترافیک سنگین منطقه">ترافیک سنگین منطقه</option>
                  <option value="نقص در سامانه هوشمند GPS">نقص در سامانه هوشمند GPS</option>
                  <option value="دلایل شخصی و خانوادگی">دلایل شخصی و خانوادگی</option>
                </select>
              </div>

              {/* Details Textarea */}
              <div className="space-y-2 text-right">
                <label className="block text-xs font-bold text-slate-700">جزئیات اعتراض</label>
                <textarea
                  rows={4}
                  value={objectionDetails}
                  onChange={(e) => setObjectionDetails(e.target.value)}
                  placeholder="جزئیات اعتراض خود را وارد نمایید."
                  className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  onClick={() => setIsObjectionOpen(false)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-lg text-xs font-bold transition"
                >
                  انصراف
                </button>
                <button
                  onClick={() => {
                    setIsObjectionOpen(false);
                    setObjectionToast(true);
                  }}
                  className="bg-[#4a55a2] hover:bg-indigo-700 text-white px-8 py-2 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  ذخیره
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </motion.div>
  );
}
