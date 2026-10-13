import { useState } from "react";
import { Search, Filter, CheckCircle2, XCircle, Clock, Eye } from "lucide-react";
import { RequestDetailsModal } from "../components/RequestDetailsModal";
import { MoreDocsModal } from "../components/MoreDocsModal";

const MOCK_REQUESTS = [
  {
    id: "150025896",
    applicant: "بهار رستمی",
    role: "کارشناس رتبه یک",
    date: "۱۴۰۵/۰۷/۰۶",
    type: "مرخصی استعلاجی",
    description: "به علت شکستگی پا و با تشخیص دکتر، درخواست ۲۰ روز مرخصی استعلاجی دارم.",
    status: "pending",
  },
  {
    id: "150023258",
    applicant: "سید علی رحمتی عنبرآبادی",
    role: "مامور گشت",
    date: "۱۴۰۵/۰۷/۰۴",
    type: "مرخصی استعلاجی",
    description: "به علت سرماخوردگی شدید و تجویز پزشک، نیاز به ۳ روز مرخصی استعلاجی دارم.",
    status: "pending",
  },
  {
    id: "150002586",
    applicant: "علیرضا محمدی",
    role: "رئیس کلانتری",
    date: "۱۴۰۵/۰۷/۰۵",
    type: "مرخصی استحقاقی",
    description: "درخواست ۵ روز مرخصی استحقاقی برای امور شخصی.",
    status: "approved",
  },
  {
    id: "150001258",
    applicant: "محمد آشوری",
    role: "کارمند رتبه سه",
    date: "۱۴۰۵/۰۶/۰۶",
    type: "وام فرزند آوری",
    description: "درخواست وام فرزندآوری طبق بخشنامه جدید.",
    status: "rejected",
  },
  {
    id: "150000256",
    applicant: "مریم حیدرزاده گیلانی",
    role: "مامور گشت",
    date: "۱۴۰۵/۰۶/۰۴",
    type: "نامه اشتغال به کار",
    description: "جهت ارائه به بانک ملی برای دریافت تسهیلات.",
    status: "pending",
  }
];

export function ManagerRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isMoreDocsModalOpen, setIsMoreDocsModalOpen] = useState(false);

  const handleReview = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const handleNeedMoreDocs = () => {
    setIsDetailsModalOpen(false);
    setIsMoreDocsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-emerald-500 text-white";
      case "rejected": return "bg-rose-500 text-white";
      case "pending": return "bg-amber-400 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved": return "تایید شده";
      case "rejected": return "رد شده";
      case "pending": return "در انتظار بررسی";
      default: return "نامشخص";
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">مدیریت درخواست نیروها</h2>
          <p className="text-sm text-slate-500 mt-1">بررسی و اقدام بر روی درخواست‌های کارکنان زیرمجموعه</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">در انتظار بررسی</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۱۰</p>
          </div>
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">تایید شده</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۸۰</p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">رد شده</p>
            <p className="text-3xl font-black text-slate-800 mt-1">۳</p>
          </div>
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm">لیست درخواست‌ها</h3>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="p-4 whitespace-nowrap">تاریخ</th>
                <th className="p-4 whitespace-nowrap">نام و نام خانوادگی</th>
                <th className="p-4 whitespace-nowrap">سمت</th>
                <th className="p-4 whitespace-nowrap">نوع درخواست</th>
                <th className="p-4 whitespace-nowrap text-center">وضعیت درخواست</th>
                <th className="p-4 whitespace-nowrap text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-500 whitespace-nowrap">{req.date}</td>
                  <td className="p-4 text-slate-800 font-bold whitespace-nowrap">{req.applicant}</td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">{req.role}</td>
                  <td className="p-4 text-slate-700 font-medium whitespace-nowrap">{req.type}</td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(req.status)}`}>
                      {getStatusLabel(req.status)}
                    </span>
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <button 
                      onClick={() => handleReview(req)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      بررسی درخواست
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

      <RequestDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)}
        request={selectedRequest}
        onNeedMoreDocs={handleNeedMoreDocs}
      />

      <MoreDocsModal
        isOpen={isMoreDocsModalOpen}
        onClose={() => setIsMoreDocsModalOpen(false)}
        request={selectedRequest}
      />
    </div>
  );
}
