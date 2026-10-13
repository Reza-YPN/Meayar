import { Award, Target, Star, Gift, CheckCircle2, Flag, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

const EARN_METHODS = [
  { id: 1, title: "آموزش آداب همسر داری", category: "آموزشی", points: "۱۶ امتیاز", status: "جدید", action: "دریافت" },
  { id: 2, title: "آموزش گشت شبانه همراه با نکات ایمنی", category: "ماموریتی", points: "۱۲ امتیاز", status: "جدید", action: "دریافت" },
  { id: 3, title: "بازدید حداقل ۳ بار در هفته از پیشخوان ارزیابی عملکرد", category: "ماموریتی", points: "۸ امتیاز", status: "در حال انجام", action: "دریافت" },
  { id: 4, title: "حضور در رویداد اربعین حسینی", category: "عقیدتی", points: "۱۰ امتیاز", status: "در حال انجام", action: "دریافت" },
  { id: 5, title: "دیدن راهنمای استفاده داشبورد ارزیابی عملکرد", category: "آموزشی", points: "۴ امتیاز", status: "در حال انجام", action: "دریافت" },
  { id: 6, title: "مشارکت اجتماعی به مبلغ ۱۰۰ هزار تومان", category: "سیستمی", points: "۲ امتیاز", status: "در حال انجام", action: "دریافت" },
  { id: 7, title: "شارژ دو میلیون تومانی حکمت کارت", category: "رفاهی", points: "۲۶ امتیاز", status: "دریافت شده", action: "دریافت" },
  { id: 8, title: "آموزش گشت شبانه همراه با نکات تکمیلی", category: "آموزشی", points: "۳۲ امتیاز", status: "دریافت شده", action: "دریافت" },
  { id: 9, title: "کد هدیه پاداش فصل بهار (نوروز)", category: "تشویقی", points: "۲۰ امتیاز", status: "دریافت شده", action: "دریافت" },
  { id: 10, title: "ثبت بازخورد بهبود سیستم", category: "سیستمی", points: "۱ امتیاز", status: "دریافت شده", action: "دریافت" },
];

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case "جدید":
      return "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]";
    case "در حال انجام":
      return "bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]";
    case "دریافت شده":
      return "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function BenefitsEarnPage() {
  const [claimedRows, setClaimedRows] = useState<number[]>([]);

  const handleClaim = (id: number) => {
    if (claimedRows.includes(id)) return;
    setClaimedRows((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      
      {/* User Header Stats Block */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/images/https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80"
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-indigo-100 object-cover"
          />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-800">
                محمدرضا یزدان پناه
              </h2>
              <span className="bg-[#4F46E5] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                ممتاز در شاخص نتیجه‌ای
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              فرماندهی تهران بزرگ - کلانتری ۱۰۳ گاندی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#FFFBEB] border border-[#FEF3C7] px-4 py-2.5 rounded-xl">
          <div className="w-9 h-9 bg-[#FEF3C7] text-[#D97706] rounded-full flex items-center justify-center text-xl shadow-inner">
            ☀️
          </div>
          <div>
            <div className="text-[10px] text-amber-800 font-bold">امتیاز شما:</div>
            <div className="font-extrabold text-amber-600 text-lg leading-none mt-0.5">۵۶</div>
          </div>
        </div>
      </div>

      {/* Triple Metrics Cards (Image 11 style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-slate-800 leading-tight">۵۴۱</div>
            <div className="text-slate-500 text-xs mt-1 font-bold">امتیازهای دریافت شده</div>
          </div>
          <div className="w-12 h-12 bg-[#FEF3C7] text-[#D97706] rounded-xl flex items-center justify-center text-xl shadow-sm">
            ☀️
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-slate-800 leading-tight">۶</div>
            <div className="text-slate-500 text-xs mt-1 font-bold">هدف‌های انجام شده</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <Flag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-slate-800 leading-tight">۶</div>
            <div className="text-slate-500 text-xs mt-1 font-bold">هدف‌های در حال انجام</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <Flag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table & Filtering */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">دریافت امتیاز</h3>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span>نوع امتیاز:</span>
              <div className="relative">
                <select className="bg-white border border-slate-200 rounded px-3 py-1.5 appearance-none pl-8 font-medium">
                  <option>انتخاب</option>
                  <option>آموزشی</option>
                  <option>ماموریتی</option>
                  <option>عقیدتی</option>
                  <option>سیستمی</option>
                </select>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 rotate-90" />
              </div>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition flex items-center gap-2 shadow-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ثبت کد امتیاز</span>
            </button>
          </div>
        </div>

        {/* 10-Row Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold w-12 text-center">ردیف</th>
                <th className="p-3.5 font-bold">شرح</th>
                <th className="p-3.5 font-bold">نوع امتیاز</th>
                <th className="p-3.5 font-bold">امتیاز</th>
                <th className="p-3.5 font-bold">وضعیت</th>
                <th className="p-3.5 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {EARN_METHODS.map((row) => {
                const isClaimed = row.status === "دریافت شده" || claimedRows.includes(row.id);
                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 text-slate-400 text-center font-mono">{row.id}</td>
                    <td className="p-3.5 font-bold text-slate-700">{row.title}</td>
                    <td className="p-3.5 text-slate-500 font-medium">{row.category}</td>
                    <td className="p-3.5 text-[#D97706] font-bold">
                      <div className="flex items-center gap-1">
                        <span>☀️</span>
                        <span>{row.points}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${getStatusBadgeStyle(isClaimed ? "دریافت شده" : row.status)}`}>
                        {isClaimed ? "دریافت شده" : row.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      {isClaimed ? (
                        <button className="bg-slate-100 text-slate-400 text-[11px] font-bold px-4 py-1.5 rounded-lg border border-slate-200 cursor-not-allowed" disabled>
                          دریافت شده
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClaim(row.id)}
                          className="bg-[#4455A5] hover:bg-indigo-700 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1 mx-auto"
                        >
                          <span>دریافت</span>
                          <span className="text-[9px] opacity-70">←</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 text-xs text-slate-500 gap-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span>تعداد سطرها در هر صفحه:</span>
            <select className="border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none">
              <option>۱۰</option>
            </select>
            <span className="mr-4">۱-۱۰ از ۲۷</span>
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
      </div>
    </div>
  );
}
