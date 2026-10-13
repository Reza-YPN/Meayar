import { useState } from "react";
import { Search, Filter, Gift, Users, Award, TrendingUp, TrendingDown } from "lucide-react";
import { RewardModal } from "../components/RewardModal";

const MOCK_EMPLOYEES = [
  { id: "150025896", name: "بهار رستمی", role: "کارشناس رتبه یک", unit: "فاتب", score: 125, change: "+50%", performance: "خیلی خوب", previous: "خیلی خوب" },
  { id: "150023258", name: "سید علی رحمتی عصرآبادی", role: "مامور گشت", unit: "فاوا", score: 200, change: "+22%", performance: "خوب", previous: "خوب" },
  { id: "150002586", name: "علیرضا محمدی", role: "رئیس کلانتری", unit: "فاتب", score: 50, change: "0%", performance: "خیلی خوب", previous: "خیلی خوب" },
  { id: "150001258", name: "محمد آشوری", role: "کارمند رتبه سه", unit: "فاتب", score: 300, change: "+11%", performance: "خوب", previous: "خوب" },
  { id: "150000256", name: "مریم حیدرزاده گیلانی", role: "مامور گشت", unit: "فاوا", score: 47, change: "+40%", performance: "خیلی خوب", previous: "خیلی خوب" },
  { id: "150000235", name: "سید مجتبی علیزاده", role: "کارمند رتبه دو", unit: "فاوا", score: 5, change: "-10%", performance: "خوب", previous: "خیلی خوب" },
  { id: "150000345", name: "رضا میرآبادانی", role: "کارشناس رتبه یک", unit: "فاتب", score: 123, change: "-5%", performance: "خوب", previous: "خیلی خوب" },
  { id: "150000367", name: "شاهین اکبری", role: "مامور گشت", unit: "فاوا", score: 12, change: "0%", performance: "خیلی خوب", previous: "خیلی خوب" },
  { id: "150000657", name: "سجاد فرج پور", role: "مامور گشت", unit: "فاتب", score: 11, change: "+36%", performance: "خوب", previous: "خوب" },
  { id: "150000689", name: "آزاده اکبری", role: "کارشناس رتبه یک", unit: "فاوا", score: 14, change: "-20%", performance: "خوب", previous: "خوب" },
];

export function ManagerGoodPerformancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const handleReward = (employee: any) => {
    setSelectedEmployee(employee);
    setIsRewardModalOpen(true);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">نیروها با عملکرد خوب</h2>
          <p className="text-sm text-slate-500 mt-1">مشاهده و تخصیص پاداش به نیروهای برتر</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">کل نیروها</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۴۸</p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">نیروها با عملکرد خوب و خیلی خوب</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۳۰</p>
          </div>
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">پاداش‌های اعطا شده</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۱۲</p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <h4 className="font-bold text-blue-900 mb-1">تحلیل عملکرد نیروها با عملکرد خیلی خوب و خوب</h4>
        <p className="text-sm text-blue-800 leading-relaxed">
          با بررسی نتایج این فصل، مشاهده می‌شود که بیش از ۶۲٪ از نیروها (۳۰ نفر) موفق به کسب رتبه «خوب» و «خیلی خوب» شده‌اند که نشان‌دهنده توانمندی بالای تیم در اجرای ماموریت‌هاست. همچنین، میانگین نمره عملکرد کل تیم ۹۵ (سطح خوب) ثبت شده است.
        </p>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800">لیست نیروها با عملکرد خوب و خیلی خوب</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4" />
              <span>فیلتر</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">کد کارکنان</th>
                <th className="px-4 py-3">نام و نام خانوادگی</th>
                <th className="px-4 py-3">سمت</th>
                <th className="px-4 py-3">واحد نیروی انسانی</th>
                <th className="px-4 py-3">نمره</th>
                <th className="px-4 py-3">نتیجه فصل قبل</th>
                <th className="px-4 py-3">عملکرد</th>
                <th className="px-4 py-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_EMPLOYEES.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-700">{emp.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{emp.name}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.role}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.unit}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">
                    <div className="bg-green-100 text-green-700 py-1 px-3 rounded text-center inline-block min-w-[3rem]">
                      {emp.score}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 font-medium ${emp.change.startsWith('+') ? 'text-emerald-600' : emp.change.startsWith('-') ? 'text-red-500' : 'text-slate-500'}`}>
                      {emp.change.startsWith('+') ? <TrendingUp className="w-3.5 h-3.5" /> : emp.change.startsWith('-') ? <TrendingDown className="w-3.5 h-3.5" /> : null}
                      <span dir="ltr">{emp.change}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-green-500 text-white rounded text-xs font-bold">
                      {emp.performance}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors text-xs font-bold whitespace-nowrap">
                        مشاهده کارنامه عملکردی
                      </button>
                      <button 
                        onClick={() => handleReward(emp)}
                        className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded hover:bg-indigo-50 transition-colors text-xs font-bold whitespace-nowrap"
                      >
                        ثبت پاداش
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>نمایش ۱ تا ۱۰ از ۴۸</div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">&lt;</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">۱</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">۲</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">۳</button>
            <span>...</span>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">۵</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">&gt;</button>
          </div>
        </div>
      </div>

      <RewardModal 
        isOpen={isRewardModalOpen} 
        onClose={() => setIsRewardModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
}
