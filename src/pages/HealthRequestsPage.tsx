import { ClipboardList, Search, Filter, Eye } from "lucide-react";

const REQUESTS = [
  {
    id: "۱۵۰۰۲۵۸۹۶",
    date: "۱۴۰۵/۱۲/۰۸",
    subject: "ارزیابی‌های سلامت کارکنان",
    unit: "طب کار",
    status: "تایید شده",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "۱۵۰۰۲۲۳۵۸",
    date: "۱۴۰۵/۱۱/۰۶",
    subject: "سلامت روان کارکنان",
    unit: "روانشناسی",
    status: "در حال پیگیری",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

export function HealthRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-indigo-500" /> لیست
            درخواست‌های پزشکی
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو"
                className="bg-white border border-slate-200 rounded px-3 py-1.5 text-sm pl-8 w-64"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
            </div>
            <button className="bg-white border border-slate-300 text-slate-600 p-1.5 rounded hover:bg-slate-50 flex items-center gap-1 text-sm">
              <Filter className="w-4 h-4" /> فیلتر
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4 font-medium">شماره درخواست</th>
                <th className="p-4 font-medium">تاریخ ثبت</th>
                <th className="p-4 font-medium">موضوع درخواست</th>
                <th className="p-4 font-medium">بخش ارجاع شده</th>
                <th className="p-4 font-medium">وضعیت</th>
                <th className="p-4 font-medium text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REQUESTS.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-600">{row.id}</td>
                  <td className="p-4 text-slate-500">{row.date}</td>
                  <td className="p-4 font-medium text-slate-700">
                    {row.subject}
                  </td>
                  <td className="p-4 text-slate-500">{row.unit}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${row.statusColor}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-slate-400 hover:text-indigo-600 p-1 rounded transition">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
