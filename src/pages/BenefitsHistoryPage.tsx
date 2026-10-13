import { History, Search, Filter } from "lucide-react";

const HISTORY = [
  {
    id: 1,
    title: "آموزش آداب همسر داری",
    category: "آموزش توسعه محور",
    date: "۱۴۰۵/۱۲/۰۸",
    points: "+۵۰",
    status: "سیستمی",
    user: "-",
  },
  {
    id: 2,
    title: "دریافت بن خرید دو میلیون تومانی",
    category: "رفاهی (کمک هزینه)",
    date: "۱۴۰۵/۱۱/۰۶",
    points: "-۱۰",
    status: "مهدی احمدی",
    user: "-",
  },
  {
    id: 3,
    title: "کد امتیاز تشویقی پاداش مدیر",
    category: "تشویقات",
    date: "۱۴۰۵/۱۱/۰۵",
    points: "+۲۰",
    status: "مدیر واحد",
    user: "-",
  },
  {
    id: 4,
    title: "تور سه روزه سفر به شمال ایران",
    category: "رفاهی (سفر)",
    date: "۱۴۰۵/۱۱/۰۴",
    points: "-۲۰۰",
    status: "مهدی احمدی",
    user: "-",
  },
];

export function BenefitsHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center items-center text-center">
          <div className="text-3xl font-bold text-slate-800 mb-1">۵۴۱</div>
          <div className="text-slate-500 text-sm">امتیازهای دریافت شده</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center items-center text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">۵</div>
          <div className="text-slate-500 text-sm">مزیت‌های استفاده شده</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" /> تاریخچه امتیازات
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
            <button className="bg-white border border-slate-300 text-slate-600 p-1.5 rounded hover:bg-slate-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4 font-medium w-12 text-center">ردیف</th>
                <th className="p-4 font-medium">شرح</th>
                <th className="p-4 font-medium">دسته بندی</th>
                <th className="p-4 font-medium">تاریخ ثبت</th>
                <th className="p-4 font-medium">کاربر ثبت کننده</th>
                <th className="p-4 font-medium text-center">امتیاز</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORY.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-500 text-center">{row.id}</td>
                  <td className="p-4 font-medium text-slate-700">
                    {row.title}
                  </td>
                  <td className="p-4 text-slate-500">{row.category}</td>
                  <td className="p-4 text-slate-500">{row.date}</td>
                  <td className="p-4 text-slate-500">{row.status}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        row.points.startsWith("+")
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {row.points}
                    </span>
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
