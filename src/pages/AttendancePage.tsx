import React, { useState } from "react";
import { ChevronDown, Calendar, Clock, AlertCircle, Users, BarChart as BarChartIcon, History, ArrowLeft } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const UNIT_ATTENDANCE_DATA = [
  { name: 'شنبه', حاضر: 42, غایب: 1, مرخصی: 2 },
  { name: 'یکشنبه', حاضر: 40, غایب: 0, مرخصی: 5 },
  { name: 'دوشنبه', حاضر: 43, غایب: 1, مرخصی: 1 },
  { name: 'سه‌شنبه', حاضر: 44, غایب: 0, مرخصی: 1 },
  { name: 'چهارشنبه', حاضر: 41, غایب: 2, مرخصی: 2 },
  { name: 'پنجشنبه', حاضر: 38, غایب: 1, مرخصی: 6 },
];

function EmployeeView() {
  const [selectedYear, setSelectedYear] = useState("۱۴۰۵");
  const [fromMonth, setFromMonth] = useState("فروردین");
  const [toMonth, setToMonth] = useState("اسفند");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">انتخاب سال:</span>
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm appearance-none pr-8 w-24 font-mono font-bold text-indigo-700"
              >
                <option value="۱۴۰۵">۱۴۰۵</option>
                <option value="۱۴۰۴">۱۴۰۴</option>
                <option value="۱۴۰۳">۱۴۰۳</option>
                <option value="۱۴۰۲">۱۴۰۲</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">از ماه:</span>
            <div className="relative">
              <select 
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm appearance-none pr-8 w-28 text-slate-800 font-bold"
              >
                <option>فروردین</option>
                <option>اردیبهشت</option>
                <option>خرداد</option>
                <option>تیر</option>
                <option>مرداد</option>
                <option>شهریور</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">تا ماه:</span>
            <div className="relative">
              <select 
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm appearance-none pr-8 w-28 text-slate-800 font-bold"
              >
                <option>شهریور</option>
                <option>مهر</option>
                <option>آبان</option>
                <option>آذر</option>
                <option>دی</option>
                <option>بهمن</option>
                <option>اسفند</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link
            to="/attendance/leave"
            className="bg-[#4455A5] hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            <History className="w-4 h-4" />
            <span>تاریخچه و ثبت مرخصی‌ها</span>
          </Link>
          <button className="bg-white border border-slate-300 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg hover:bg-slate-50 transition">
            دریافت گزارش
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-slate-800">۲۶۴</div>
          <div className="text-sm text-slate-500 mt-1">روزهای حضور</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-slate-800">۸</div>
          <div className="text-sm text-slate-500 mt-1">ساعات تاخیر</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-slate-800">۰</div>
          <div className="text-sm text-slate-500 mt-1">
            روزهای غیبت غیر موجه
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-slate-800">۵۸</div>
          <div className="text-sm text-slate-500 mt-1">ساعات اضافه کاری</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-x-auto">
        <h3 className="font-bold text-slate-800 mb-6">راهنمای وضعیت حضور و تردد</h3>
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2" title="حضور کامل و موجه در شیفت کاری">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div> حضور
          </div>
          <div className="flex items-center gap-2" title="ساعات اضافه بر شیفت کاری">
            <div className="w-3 h-3 bg-cyan-500 rounded"></div> اضافه کاری
          </div>
          <div className="flex items-center gap-2" title="ورود دیرتر از ساعت مقرر">
            <div className="w-3 h-3 bg-amber-500 rounded"></div> تاخیر (ورود)
          </div>
          <div className="flex items-center gap-2" title="خروج زودتر از ساعت مقرر">
            <div className="w-3 h-3 bg-fuchsia-500 rounded"></div> تعجیل (خروج)
          </div>
          <div className="flex items-center gap-2" title="ساعات غیر کاری و استراحت">
            <div className="w-3 h-3 bg-slate-200 rounded border border-slate-300"></div> خارج از شیفت
          </div>
          <div className="flex items-center gap-2" title="غیبت غیرموجه در شیفت">
            <div className="w-3 h-3 bg-rose-500 rounded"></div> غیبت غیرموجه
          </div>
          <div className="flex items-center gap-2" title="مرخصی استحقاقی، استعلاجی یا تشویقی">
            <div className="w-3 h-3 bg-indigo-400 rounded"></div> مرخصی
          </div>
        </div>

        {/* Timeline chart */}
        <div className="min-w-[800px] mt-6">
          <table className="w-full text-right text-xs border-collapse">
            <thead className="text-slate-400 border-b border-slate-200">
              <tr>
                <th className="py-3 px-2 font-bold w-12 text-center">ردیف</th>
                <th className="py-3 px-2 font-bold w-28">تاریخ</th>
                <th className="py-3 px-2 font-bold w-20">روز</th>
                {Array.from({ length: 16 }).map((_, i) => (
                  <th key={i} className="py-3 px-1 text-center font-bold font-mono">
                    {String(i + 6).padStart(2, "0")}:00
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  date: "۱۴۰۵/۰۵/۰۶",
                  day: "شنبه",
                  blocks: [{ start: 6, end: 13, type: "presence" }],
                },
                {
                  date: "۱۴۰۵/۰۵/۰۷",
                  day: "یکشنبه",
                  blocks: [
                    { start: 6, end: 12, type: "presence" },
                    { start: 13, end: 13, type: "haste" },
                  ],
                },
                {
                  date: "۱۴۰۵/۰۵/۰۸",
                  day: "دوشنبه",
                  blocks: [{ start: 6, end: 14, type: "leave" }],
                },
                {
                  date: "۱۴۰۵/۰۵/۰۹",
                  day: "سه شنبه",
                  blocks: [
                    { start: 7, end: 7, type: "delay" },
                    { start: 8, end: 14, type: "presence" },
                  ],
                },
                {
                  date: "۱۴۰۵/۰۵/۱۰",
                  day: "چهارشنبه",
                  blocks: [
                    { start: 6, end: 12, type: "presence" },
                    { start: 13, end: 14, type: "haste" },
                  ],
                },
                {
                  date: "۱۴۰۵/۰۵/۱۱",
                  day: "پنجشنبه",
                  blocks: [{ start: 6, end: 14, type: "absence" }],
                },
                {
                  date: "۱۴۰۵/۰۵/۱۲",
                  day: "جمعه",
                  blocks: [{ start: 6, end: 13, type: "presence" }],
                },
                {
                  date: "۱۴۰۵/۰۵/۱۳",
                  day: "شنبه",
                  blocks: [
                    { start: 6, end: 14, type: "presence" },
                    { start: 15, end: 15, type: "overtime" },
                  ],
                },
                {
                  date: "۱۴۰۵/۰۵/۱۴",
                  day: "یکشنبه",
                  blocks: [
                    { start: 6, end: 14, type: "presence" },
                    { start: 15, end: 16, type: "overtime" },
                  ],
                },
                {
                  date: "۱۴۰۵/۰۵/۱۵",
                  day: "دوشنبه",
                  blocks: [{ start: 6, end: 14, type: "non_working" }],
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-2 text-slate-500 font-bold text-center">{idx + 1}</td>
                  <td className="py-3 px-2 text-slate-700 font-semibold font-mono">{row.date}</td>
                  <td className="py-3 px-2 text-slate-700 font-semibold">{row.day}</td>
                  {Array.from({ length: 16 }).map((_, colIdx) => {
                    const hour = colIdx + 6;
                    const block = row.blocks.find(b => hour >= b.start && hour <= b.end);
                    let cellColor = "bg-slate-100 border-slate-200 hover:bg-slate-200/60";
                    if (block) {
                      switch (block.type) {
                        case "presence":
                          cellColor = "bg-emerald-500 border-emerald-600/20";
                          break;
                        case "overtime":
                          cellColor = "bg-cyan-500 border-cyan-600/20";
                          break;
                        case "delay":
                          cellColor = "bg-amber-500 border-amber-600/20";
                          break;
                        case "haste":
                          cellColor = "bg-fuchsia-500 border-fuchsia-600/20";
                          break;
                        case "non_working":
                          cellColor = "bg-slate-200 border-slate-300";
                          break;
                        case "absence":
                          cellColor = "bg-rose-500 border-rose-600/20";
                          break;
                        case "leave":
                          cellColor = "bg-indigo-400 border-indigo-500/20";
                          break;
                      }
                    }
                    return (
                      <td key={colIdx} className="p-1">
                        <div className={`h-7 w-full rounded border transition-all ${cellColor}`} title={block?.type} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ManagerView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="text-slate-500 text-sm font-medium">حاضرین امروز</div>
          <div className="text-3xl font-black text-emerald-600 mt-2">۴۲ <span className="text-sm font-medium text-slate-400">نفر</span></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="text-slate-500 text-sm font-medium">غایبین امروز</div>
          <div className="text-3xl font-black text-rose-600 mt-2">۱ <span className="text-sm font-medium text-slate-400">نفر</span></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="text-slate-500 text-sm font-medium">مرخصی امروز</div>
          <div className="text-3xl font-black text-amber-600 mt-2">۲ <span className="text-sm font-medium text-slate-400">نفر</span></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="text-slate-500 text-sm font-medium">میانگین تاخیر هفته</div>
          <div className="text-3xl font-black text-slate-800 mt-2">۱۵ <span className="text-sm font-medium text-slate-400">دقیقه</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <BarChartIcon className="w-5 h-5 text-indigo-500" /> روند حضور و غیاب یگان در هفته جاری
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UNIT_ATTENDANCE_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '15px' }} />
                <Bar dataKey="حاضر" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="مرخصی" stackId="a" fill="#f59e0b" />
                <Bar dataKey="غایب" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-rose-500" /> نیازمند پیگیری
          </h3>
          <div className="space-y-4">
             {[1, 2].map((i) => (
               <div key={i} className="flex flex-col p-4 bg-rose-50/50 border border-rose-100 rounded-xl">
                 <div className="flex justify-between items-start">
                   <div>
                     <h4 className="font-bold text-slate-800 text-sm">محمد حسینی</h4>
                     <p className="text-xs text-rose-600 mt-1 font-medium">غیبت غیرموجه امروز</p>
                   </div>
                   <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">کد: ۱۲۴۵</span>
                 </div>
                 <button className="mt-4 w-full bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-bold py-2 rounded-lg transition">
                   ثبت اخطار / پیگیری
                 </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AttendancePage() {
  const { role } = useRole();
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
