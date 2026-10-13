import { useState } from "react";
import { Search, Filter, AlertTriangle, Users, BookOpen, UserMinus, MessageSquare } from "lucide-react";
import { FeedbackHistoryModal } from "../components/FeedbackHistoryModal";
import { ProposeTrainingModal } from "../components/ProposeTrainingModal";

const MOCK_EMPLOYEES = [
  { id: "150025811", name: "محمد رمضانی", role: "مامور گشت", unit: "فاتب", score: 45, change: "-15%", performance: "نیازمند بهبود", previous: "قابل قبول" },
  { id: "150023222", name: "حسین کاظمی", role: "کارشناس رتبه دو", unit: "فاوا", score: 55, change: "-5%", performance: "نیازمند بهبود", previous: "قابل قبول" },
  { id: "150002533", name: "امیر علیپور", role: "مامور گشت", unit: "فاتب", score: 30, change: "-25%", performance: "نیازمند بهبود جدی", previous: "نیازمند بهبود" },
];

export function ManagerNeedsImprovementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  const handleFeedback = (employee: any) => {
    setSelectedEmployee(employee);
    setIsFeedbackModalOpen(true);
  };

  const handleTraining = (employee: any) => {
    setSelectedEmployee(employee);
    setIsTrainingModalOpen(true);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">نیروها با عملکرد نیازمند بهبود</h2>
          <p className="text-sm text-slate-500 mt-1">مدیریت، آموزش و راهبری نیروهایی که نیاز به ارتقاء دارند</p>
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
            <p className="text-sm font-medium text-slate-500">نیروهای نیازمند بهبود</p>
            <p className="text-3xl font-black text-amber-600 mt-1">۳</p>
          </div>
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <UserMinus className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">دوره‌های معرفی شده</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۵</p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
        <h4 className="font-bold text-amber-900 mb-1">تحلیل عملکرد نیروهای نیازمند بهبود</h4>
        <p className="text-sm text-amber-800 leading-relaxed">
          تنها ۳ نفر از نیروهای تحت امر شما در ارزیابی فصل گذشته نمره پایین‌تر از حد انتظار (۶۰) کسب کرده‌اند. با تعریف ماموریت‌های دقیق، بازخوردهای سازنده و معرفی دوره‌های آموزشی متناسب، می‌توانید به پیشرفت مسیر شغلی ایشان کمک کنید.
        </p>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800">لیست نیروها با عملکرد نیازمند بهبود</h3>
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
                <th className="px-4 py-3">نمره</th>
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
                  <td className="px-4 py-3 font-bold text-slate-800">
                    <div className="bg-red-100 text-red-700 py-1 px-3 rounded text-center inline-block min-w-[3rem]">
                      {emp.score}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-amber-500 text-white rounded text-xs font-bold whitespace-nowrap">
                      {emp.performance}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button 
                        onClick={() => handleFeedback(emp)}
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors text-xs font-bold inline-flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        بازخورد و ماموریت
                      </button>
                      <button 
                        onClick={() => handleTraining(emp)}
                        className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded hover:bg-indigo-50 transition-colors text-xs font-bold inline-flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        معرفی آموزش
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FeedbackHistoryModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        employee={selectedEmployee}
      />
      <ProposeTrainingModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
}
