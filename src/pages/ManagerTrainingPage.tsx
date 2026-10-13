import { useState } from "react";
import { GraduationCap, BarChart3, CheckCircle, Clock, BookOpen, Filter, Search, Plus } from "lucide-react";
import { motion } from "motion/react";
import { SuggestTrainingModal } from "../components/SuggestTrainingModal";

export function ManagerTrainingPage() {
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  const trainingList = [
    { id: 1, name: "بهار رستمی", role: "کارشناس رتبه یک", course: "مهارت گوش دادن فعال", startDate: "۱۴۰۵/۰۷/۰۶", endDate: "۱۴۰۵/۰۷/۰۶", priority: "بسیار زیاد", progress: 100, status: "آزمون پایان یافته" },
    { id: 2, name: "سید علی رحمتی عنبرآبادی", role: "مامور گشت", course: "هوش هیجانی چیست؟", startDate: "۱۴۰۵/۰۷/۰۴", endDate: "-", priority: "متوسط", progress: 0, status: "آزمون رد شده" },
    { id: 3, name: "علیرضا محمدی", role: "رئیس کلانتری", course: "اصول مذاکره", startDate: "۱۴۰۵/۰۷/۰۵", endDate: "-", priority: "کم", progress: 60, status: "در حال آموزش" },
    { id: 4, name: "محمد آشوری", role: "کارمند رتبه سه", course: "مذاکره به وقت بحران", startDate: "۱۴۰۵/۰۶/۰۶", endDate: "-", priority: "بسیار زیاد", progress: 0, status: "آغاز نشده" },
    { id: 5, name: "مریم حیدرزاده گیلانی", role: "مامور گشت", course: "رجوع به لوح گشت", startDate: "۱۴۰۵/۰۶/۰۴", endDate: "-", priority: "زیاد", progress: 90, status: "در انتظار آزمون" },
    { id: 6, name: "سید مجتبی علیزاده", role: "کارمند رتبه دو", course: "مهارت توجه به جزئیات", startDate: "۱۴۰۵/۰۵/۲۰", endDate: "-", priority: "کم", progress: 90, status: "در انتظار آزمون" },
    { id: 7, name: "رضا میرآبادانی", role: "کارشناس رتبه یک", course: "مدیریت زمان", startDate: "۱۴۰۵/۰۵/۱۲", endDate: "۱۴۰۵/۰۵/۱۲", priority: "بسیار زیاد", progress: 100, status: "آزمون پایان یافته" },
    { id: 8, name: "شاهین اکبری", role: "مامور گشت", course: "مذاکره به وقت بحران", startDate: "۱۴۰۵/۰۵/۰۶", endDate: "۱۴۰۵/۰۵/۰۶", priority: "متوسط", progress: 100, status: "آزمون پایان یافته" },
    { id: 9, name: "سجاد فرج پور", role: "مامور گشت", course: "رجوع به لوح گشت", startDate: "۱۴۰۵/۰۵/۰۱", endDate: "-", priority: "زیاد", progress: 80, status: "آزمون رد شده" },
    { id: 10, name: "آزاده اکبری", role: "کارشناس رتبه یک", course: "مهارت توجه به جزئیات", startDate: "۱۴۰۵/۰۴/۲۸", endDate: "-", priority: "کم", progress: 0, status: "آغاز نشده" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "آزمون پایان یافته": return "bg-emerald-500 text-white";
      case "آزمون رد شده": return "bg-rose-500 text-white";
      case "در حال آموزش": return "bg-indigo-500 text-white";
      case "در انتظار آزمون": return "bg-cyan-500 text-white";
      case "آغاز نشده": return "bg-amber-400 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-2xl font-black text-indigo-600">%۶۰</div>
            <div className="text-xs text-slate-500 font-bold mt-1">متوسط پیشرفت دوره‌های آموزشی</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-2xl font-black text-slate-800">۲۱۰</div>
            <div className="text-xs text-slate-500 font-bold mt-1">دوره‌های تکمیل شده</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-2xl font-black text-slate-800">۱۰۰</div>
            <div className="text-xs text-slate-500 font-bold mt-1">دوره هایی که شروع نشده</div>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-2xl font-black text-slate-800">۵۰</div>
            <div className="text-xs text-slate-500 font-bold mt-1">دوره های در حال انجام</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="bg-white border-r-4 border-r-cyan-500 p-4 rounded-l-xl shadow-sm text-sm text-slate-700 leading-relaxed font-medium">
        <strong className="block mb-2 text-slate-800">تحلیل پیشرفت آموزش و توسعه مهارت‌های نیروها</strong>
        در حال حاضر وضعیت آموزشی ۴۸ نفر از کارکنان نشان‌دهنده گذراندن ۲۱۰ دوره آموزشی در فصل گذشته است که معادل ۵۸٪ از کل برنامه‌های تعریف شده است. همچنین ۱۵۰ دوره (شامل دو بخش ۱۰۰ و ۵۰ تایی) معادل ۴۲٪ از ظرفیت آموزشی کل، به ترتیب در وضعیت آغاز نشده و در حال پیشرفت قرار دارند.
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsSuggestModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm shadow-emerald-200"
        >
          پیشنهاد و تعریف آموزش
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm">مدیریت آموزش و توسعه مهارت‌های نیروها</h3>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              فیلتر
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="p-4 whitespace-nowrap">کارمند</th>
                <th className="p-4 whitespace-nowrap">سمت</th>
                <th className="p-4 whitespace-nowrap">عنوان آموزش</th>
                <th className="p-4 whitespace-nowrap">تاریخ شروع</th>
                <th className="p-4 whitespace-nowrap">تاریخ پایان</th>
                <th className="p-4 whitespace-nowrap">اولویت</th>
                <th className="p-4 whitespace-nowrap text-center">درصد پیشرفت آموزش</th>
                <th className="p-4 whitespace-nowrap text-center">وضعیت</th>
                <th className="p-4 whitespace-nowrap text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainingList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-800 font-bold whitespace-nowrap">{item.id}  {item.name}</td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">{item.role}</td>
                  <td className="p-4 text-slate-700 font-medium whitespace-nowrap">{item.course}</td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">{item.startDate}</td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">{item.endDate}</td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">{item.priority}</td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className="font-bold text-slate-700 font-mono">٪{item.progress}</span>
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm">
                      ثبت پیگیری
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>تعداد سطرهای در هر صفحه:</span>
            <select className="border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500">
              <option>۱۰</option>
              <option>۲۰</option>
              <option>۵۰</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">&gt;</button>
            <span className="px-2">۱/۲</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">&lt;</button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-sm">دورنمای پیشرفت دوره‌های آموزشی نیروها</h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-8">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="15" />
              {/* Fake donut chart segments based on screenshot */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="145 251" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="15" strokeDasharray="5 251" strokeDashoffset="-145" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="15" strokeDasharray="27 251" strokeDashoffset="-150" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="15" strokeDasharray="68 251" strokeDashoffset="-177" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="15" strokeDasharray="6 251" strokeDashoffset="-245" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-black text-slate-800">۳۶۰</div>
              <div className="text-xs text-slate-500 font-bold mt-1">کل آموزش‌ها</div>
            </div>
          </div>
          
          <div className="space-y-4 min-w-[200px]">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="font-bold text-slate-700">آزمون پایان یافته</span>
              </div>
              <div className="flex gap-4 font-mono font-bold">
                <span className="text-slate-800 w-8">۲۱۰</span>
                <span className="text-slate-400">۵۸٪</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="font-bold text-slate-700">آزمون رد شده</span>
              </div>
              <div className="flex gap-4 font-mono font-bold">
                <span className="text-slate-800 w-8">۵</span>
                <span className="text-slate-400">۲٪</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="font-bold text-slate-700">در حال آموزش</span>
              </div>
              <div className="flex gap-4 font-mono font-bold">
                <span className="text-slate-800 w-8">۴۰</span>
                <span className="text-slate-400">۱۱٪</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="font-bold text-slate-700">آغاز نشده</span>
              </div>
              <div className="flex gap-4 font-mono font-bold">
                <span className="text-slate-800 w-8">۱۰۰</span>
                <span className="text-slate-400">۲۷٪</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="font-bold text-slate-700">در انتظار آزمون</span>
              </div>
              <div className="flex gap-4 font-mono font-bold">
                <span className="text-slate-800 w-8">۵</span>
                <span className="text-slate-400">۲٪</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-emerald-100 bg-emerald-50/50 rounded-xl text-xs text-emerald-800 font-medium">
          در حال حاضر وضعیت آموزشی کارمندان نشان‌دهنده گذراندن ۲۱۰ دوره آموزشی در فصل گذشته است که معادل ۵۸٪ از کل دوره‌های تعریف شده است.
        </div>
      </div>

      <SuggestTrainingModal 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
      />
    </div>
  );
}
