import { useState } from "react";
import { Printer, Eye, ChevronDown, Banknote, Users, Activity, TrendingUp, Clock, ArrowRight, Download, Calendar, Info } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { motion } from "motion/react";
import { PerformanceSalarySimulator } from "../components/PerformanceSalarySimulator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

interface Payslip {
  id: number;
  month: string;
  date: string;
  amount: string;
  multiplier?: string;
  performanceScore?: number;
  earnings: { name: string; val: string }[];
  deductions: { name: string; val: string }[];
  gross: string;
  totalDeductions: string;
  net: string;
}

const PAYSLIPS_DATA: Payslip[] = [
  {
    id: 1,
    month: "مرداد ۱۴۰۵",
    date: "۱۴۰۵/۰۵/۳۰",
    amount: "۱۲۵,۵۰۳,۰۰۰",
    multiplier: "۱.۲۴ (نمره ۹۳.۵٪ - ممتاز)",
    performanceScore: 93.5,
    earnings: [
      { name: "حقوق مبنا (پایه)", val: "۴۸,۵۰۰,۰۰۰" },
      { name: "حق مسکن و بن خواروبار", val: "۱۵,۰۰۰,۰۰۰" },
      { name: "عائله‌مندی و اولاد", val: "۱۲,۵۰۰,۰۰۰" },
      { name: "فوق‌العاده سختی کار و مخاطرات گشت موتوری (ضریب ۱.۳)", val: "۱۸,۹۰۰,۰۰۰" },
      { name: "پاداش بهره‌وری عملکرد (ضریب ۱.۲۴ ارزیابی شایستگی)", val: "۱۴,۸۸۰,۰۰۰" },
      { name: "اضافه کار شایستگی (۵۸ ساعت گشت چابک)", val: "۱۵,۷۲۳,۰۰۰" },
    ],
    deductions: [
      { name: "بیمه سهم کارمند", val: "۸,۷۵۰,۰۰۰" },
      { name: "مالیات بر حقوق", val: "۲,۳۰۰,۰۰۰" },
      { name: "صندوق بازنشستگی", val: "۴,۲۰۰,۰۰۰" },
      { name: "کسر قسط وام ضروری مسکن", val: "۱۰,۰۰۰,۰۰۰" },
    ],
    gross: "۱۲۵,۵۰۳,۰۰۰",
    totalDeductions: "۲۵,۲۵۰,۰۰۰",
    net: "۱۰۰,۲۵۳,۰۰۰",
  },
  {
    id: 2,
    month: "تیر ۱۴۰۵",
    date: "۱۴۰۵/۰۴/۳۰",
    amount: "۱۲۰,۴۵۰,۰۰۰",
    earnings: [
      { name: "حقوق مبنا (پایه)", val: "۴۸,۵۰۰,۰۰۰" },
      { name: "حق مسکن و بن خواروبار", val: "۱۵,۰۰۰,۰۰۰" },
      { name: "عائله‌مندی و اولاد", val: "۱۲,۵۰۰,۰۰۰" },
      { name: "فوق العاده شغل و سختی کار", val: "۱۸,۹۰۰,۰۰۰" },
      { name: "پاداش بهره‌وری عملکرد", val: "۱۰,۰۰۰,۰۰۰" },
      { name: "اضافه کار شایستگی", val: "۱۵,۵۵۰,۰۰۰" },
    ],
    deductions: [
      { name: "بیمه سهم کارمند", val: "۸,۷۵۰,۰۰۰" },
      { name: "مالیات بر حقوق", val: "۲,۱۰۰,۰۰۰" },
      { name: "صندوق بازنشستگی", val: "۴,۲۰۰,۰۰۰" },
      { name: "کسر قسط وام ضروری مسکن", val: "۱۰,۰۰۰,۰۰۰" },
    ],
    gross: "۱۲۰,۴۵۰,۰۰۰",
    totalDeductions: "۲۵,۰۵۰,۰۰۰",
    net: "۹۵,۴۰۰,۰۰۰",
  },
  {
    id: 3,
    month: "خرداد ۱۴۰۵",
    date: "۱۴۰۵/۰۳/۳۰",
    amount: "۱۱۸,۹۰۰,۰۰۰",
    earnings: [
      { name: "حقوق مبنا (پایه)", val: "۴۸,۵۰۰,۰۰۰" },
      { name: "حق مسکن و بن خواروبار", val: "۱۵,۰۰۰,۰۰۰" },
      { name: "عائله‌مندی و اولاد", val: "۱۲,۵۰۰,۰۰۰" },
      { name: "فوق العاده شغل و سختی کار", val: "۱۸,۹۰۰,۰۰۰" },
      { name: "پاداش بهره‌وری عملکرد", val: "۹,۰۰۰,۰۰۰" },
      { name: "اضافه کار شایستگی", val: "۱۵,۰۰۰,۰۰۰" },
    ],
    deductions: [
      { name: "بیمه سهم کارمند", val: "۸,۷۵۰,۰۰۰" },
      { name: "مالیات بر حقوق", val: "۲,۰۰۰,۰۰۰" },
      { name: "صندوق بازنشستگی", val: "۴,۲۰۰,۰۰۰" },
      { name: "کسر قسط وام ضروری مسکن", val: "۱۰,۰۰۰,۰۰۰" },
    ],
    gross: "۱۱۸,۹۰۰,۰۰۰",
    totalDeductions: "۲۴,۹۵۰,۰۰۰",
    net: "۹۳,۹۵۰,۰۰۰",
  },
  {
    id: 4,
    month: "اردیبهشت ۱۴۰۵",
    date: "۱۴۰۵/۰۲/۳۰",
    amount: "۱۲۲,۱۰۰,۰۰۰",
    earnings: [
      { name: "حقوق مبنا (پایه)", val: "۴۸,۵۰۰,۰۰۰" },
      { name: "حق مسکن و بن خواروبار", val: "۱۵,۰۰۰,۰۰۰" },
      { name: "عائله‌مندی و اولاد", val: "۱۲,۵۰۰,۰۰۰" },
      { name: "فوق العاده شغل و سختی کار", val: "۱۸,۹۰۰,۰۰۰" },
      { name: "پاداش بهره‌وری عملکرد", val: "۱۲,۰۰۰,۰۰۰" },
      { name: "اضافه کار شایستگی", val: "۱۵,۲۰۰,۰۰۰" },
    ],
    deductions: [
      { name: "بیمه سهم کارمند", val: "۸,۷۵۰,۰۰۰" },
      { name: "مالیات بر حقوق", val: "۲,۲۰۰,۰۰۰" },
      { name: "صندوق بازنشستگی", val: "۴,۲۰۰,۰۰۰" },
      { name: "کسر قسط وام ضروری مسکن", val: "۱۰,۰۰۰,۰۰۰" },
    ],
    gross: "۱۲۲,۱۰۰,۰۰۰",
    totalDeductions: "۲۵,۱۵۰,۰۰۰",
    net: "۹۶,۹۵۰,۰۰۰",
  },
  {
    id: 5,
    month: "فروردین ۱۴۰۵",
    date: "۱۴۰۵/۰۱/۳۰",
    amount: "۱۱۵,۰۰۰,۰۰۰",
    earnings: [
      { name: "حقوق مبنا (پایه)", val: "۴۸,۵۰۰,۰۰۰" },
      { name: "حق مسکن و بن خواروبار", val: "۱۵,۰۰۰,۰۰۰" },
      { name: "عائله‌مندی و اولاد", val: "۱۲,۵۰۰,۰۰۰" },
      { name: "فوق العاده شغل و سختی کار", val: "۱۸,۹۰۰,۰۰۰" },
      { name: "پاداش بهره‌وری عملکرد", val: "۶,۰۰۰,۰۰۰" },
      { name: "اضافه کار شایستگی", val: "۱۴,۱۰۰,۰۰۰" },
    ],
    deductions: [
      { name: "بیمه سهم کارمند", val: "۸,۷۵۰,۰۰۰" },
      { name: "مالیات بر حقوق", val: "۱,۹۰۰,۰۰۰" },
      { name: "صندوق بازنشستگی", val: "۴,۲۰۰,۰۰۰" },
      { name: "کسر قسط وام ضروری مسکن", val: "۱۰,۰۰۰,۰۰۰" },
    ],
    gross: "۱۱۵,۰۰۰,۰۰۰",
    totalDeductions: "۲۴,۸۵۰,۰۰۰",
    net: "۹۰,۱۵۰,۰۰۰",
  },
];

const PAYROLL_TREND = [
  { name: 'فروردین', پرداخت: 420 },
  { name: 'اردیبهشت', پرداخت: 435 },
  { name: 'خرداد', پرداخت: 450 },
  { name: 'تیر', پرداخت: 440 },
  { name: 'مرداد', پرداخت: 480 },
  { name: 'شهریور', پرداخت: 495 },
];

function EmployeeView() {
  const [selectedPayslipId, setSelectedPayslipId] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const activeSlip = PAYSLIPS_DATA.find(slip => slip.id === selectedPayslipId);

  if (activeSlip) {
    // Render Detailed Payslip matching Figma Image 1
    return (
      <div className="space-y-6 animate-in fade-in duration-300" dir="rtl">
        {/* Top bar with back action and date selector */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setSelectedPayslipId(null)}
            className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold text-sm transition-colors cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-slate-500" />
            <span>مشاهده جزئیات</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">تاریخ</span>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>۱۴۰۵/۱۲/۰۴</span>
            </div>
          </div>
        </div>

        {/* User Identity Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              🏍️
            </div>
            <div className="space-y-1 text-right">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">ستوان‌دوم محمدرضا یزدان‌پناه</h2>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-3 py-1 rounded-full shadow-xs">
                  ضریب شایستگی: ۱.۲۴ (ممتاز)
                </span>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black px-2.5 py-1 rounded-full">
                  کد پرسنلی: ۹۸۴۵۱۲۰۳
                </span>
              </div>
              <p className="text-xs font-bold text-slate-600">
                شغل: <span className="text-indigo-900 font-black">متصدی عملیات انتظامی - سرتیم گشت موتوری</span> • کلانتری ۱۰۳ گاندی (واکنش سریع)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="text-slate-600 font-bold text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-right">
              <span className="text-slate-400 block text-[10px]">شماره حساب واریز:</span>
              <span className="font-mono text-slate-800 font-black">بانک سپه: ۱۵۸۹۰۵۰۰۰۳۳۹۶۷</span>
            </div>
          </div>
        </div>

        {/* Performance & Competency Multiplier Callout Card */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-5 border border-indigo-800/80 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                اتصال مستقیم ارزیابی عملکرد به فیش حقوقی
              </span>
              <span className="text-xs text-slate-300 font-bold">فرمول ضریب شایستگی دوره</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed max-w-3xl">
              بر اساس ارزیابی ماتریس ۵×۴ شایستگی و کسب نمره <strong>۹۳.۵٪</strong> در وظایف گشت موتوری و واکنش سریع ۱۱۰، ضریب افزایش کارانه <strong>۱.۲۴×</strong> اعمال گردید و مبلغ <strong>۱۴,۸۸۰,۰۰۰ ریال</strong> پاداش شایستگی به همراه فوق‌العاده مخاطرات گشت موتوری پرداخت شده است.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="text-center">
              <span className="text-[10px] text-emerald-300 block font-bold">ضریب اعمال‌شده</span>
              <span className="text-lg font-black text-white font-mono">۱.۲۴×</span>
            </div>
            <div className="w-px h-8 bg-white/20 mx-2"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-300 block font-bold">نمره شایستگی</span>
              <span className="text-lg font-black text-emerald-400 font-mono">۹۳.۵٪</span>
            </div>
          </div>
        </div>

        {/* Triple Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: خالص دریافتی */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between items-center text-center">
            <span className="text-slate-500 text-sm font-bold mb-2">خالص دریافتی (واریز شده)</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-black text-emerald-700 font-mono">۱۰۰,۲۵۳,۰۰۰</span>
              <span className="text-xs text-slate-400 font-bold">ریال</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold mt-2 bg-emerald-50 px-2 py-0.5 rounded-md">
              +۱۴,۸۸۰,۰۰۰ ریال پاداش شایستگی ضریب‌خورده
            </span>
          </div>

          {/* Card 2: ناخالص دریافتی */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between items-center text-center">
            <span className="text-slate-500 text-sm font-bold mb-2">ناخالص حقوق و مزایا</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-black text-slate-800 font-mono">۱۲۵,۵۰۳,۰۰۰</span>
              <span className="text-xs text-slate-400 font-bold">ریال</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold mt-2">
              شامل سختی کار گشت موتوری و اضافه کار
            </span>
          </div>

          {/* Card 3: کسورات */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between items-center text-center">
            <span className="text-slate-500 text-sm font-bold mb-2">کسورات قانونی و وام</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-black text-rose-600 font-mono">۲۵,۲۵۰,۰۰۰</span>
              <span className="text-xs text-slate-400 font-bold">ریال</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold mt-2">
              بیمه، مالیات، بازنشستگی و قسط مسکن
            </span>
          </div>
        </div>

        {/* Detailed Two-Column Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Column 1 (Right in RTL): مزایا */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-sm text-emerald-700">مزایا (دریافتی‌ها)</h3>
            </div>
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-bold">عنوان</th>
                  <th className="p-4 font-bold text-center">شرح / امتیاز</th>
                  <th className="p-4 font-bold text-left">مبلغ (ریال)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-bold">
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>حقوق مبنا (پایه)</span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-500">-</td>
                  <td className="p-4 text-left font-mono text-slate-800">
                    ۴۸۵,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>پایه سنوات</span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-500">۳ سال</td>
                  <td className="p-4 text-left font-mono text-slate-800">
                    ۱۵,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>اضافه کار شایستگی</span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-500">۵۸ ساعت</td>
                  <td className="p-4 text-left font-mono text-slate-800">
                    ۱۵۷,۲۳۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>عائله‌مندی و اولاد</span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-500">۲ فرزند</td>
                  <td className="p-4 text-left font-mono text-slate-800">
                    ۱۲۵,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>فوق العاده شغل و سختی کار</span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-500">رده ۳</td>
                  <td className="p-4 text-left font-mono text-slate-800">
                    ۱۸۹,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>حق مسکن و بن خواروبار</span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-500">-</td>
                  <td className="p-4 text-left font-mono text-slate-800">
                    ۱۵۰,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-emerald-50/30">
                  <td className="p-4 flex items-center gap-1.5 text-emerald-800">
                    <span>جمع مزایا</span>
                  </td>
                  <td className="p-4 text-center font-mono"></td>
                  <td className="p-4 text-left font-mono text-emerald-700">
                    ۱,۲۳۵,۲۳۲,۴۰۰
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column 2 (Left in RTL): کسورات */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-sm text-rose-700">کسورات (کسری‌ها)</h3>
            </div>
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-bold">عنوان</th>
                  <th className="p-4 font-bold text-left">مبلغ (ریال)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-bold">
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>بیمه تامین اجتماعی (سهم کارمند)</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    ۸۷,۵۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>مالیات بر درآمد (ماده ۸۶)</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    ۲۳,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-1.5">
                    <span>صندوق بازنشستگی ناجا</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    ۴۲,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition relative">
                  <td className="p-4 flex items-center gap-1.5 relative">
                    <span>کسر قسط وام ضروری مسکن</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    ۱۰۰,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition relative">
                  <td className="p-4 flex items-center gap-1.5 relative">
                    <span>بیمه تکمیلی کوثر</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    ۱۵,۰۰۰,۰۰۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition relative">
                  <td className="p-4 flex items-center gap-1.5 relative">
                    <span>جریمه غیبت غیرموجه</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-600">
                    ۰
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition bg-rose-50/30">
                  <td className="p-4 flex items-center gap-1.5 text-rose-800">
                    <span>جمع کسورات</span>
                  </td>
                  <td className="p-4 text-left font-mono text-rose-700">
                    ۶۴۹,۱۰۷,۲۶۴
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Section: ارزیابی عملکرد (Performance Evaluation in Payslip) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                کارنامه ارزیابی عملکرد و شایستگی‌های موثر بر حقوق (گشت موتوری)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                مبالغ پرداختی با اعمال ضریب ۱.۲۴ بر پایه نمره ۹۳.۵٪ مکتسبه از ارزیاب سازمانی
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-3 py-1 rounded-full border border-emerald-300">
              ضریب کل: ۱.۲۴ (ممتاز)
            </span>
          </div>
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold">عنوان ملاک عملکردی / شایستگی</th>
                <th className="p-4 font-bold text-center">نمره مکتسبه</th>
                <th className="p-4 font-bold text-center">ضریب عملکرد</th>
                <th className="p-4 font-bold text-center">سقف مصوب (ریال)</th>
                <th className="p-4 font-bold text-left">مبلغ واریزی (ریال)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-bold">
              <tr className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <span>مهارت راکبی تاکتیکی و واکنش سریع زیر ۵ دقیقه در صحنه ۱۱۰</span>
                  <span className="block text-[10px] text-slate-400 font-normal">شایستگی‌های فردی و تیمی (نمره ۹۶ از ۱۰۰)</span>
                </td>
                <td className="p-4 text-center font-mono text-emerald-700">۹۶٪</td>
                <td className="p-4 text-center font-mono text-emerald-700">۱.۲۶×</td>
                <td className="p-4 text-center font-mono text-slate-500">۸,۰۰۰,۰۰۰</td>
                <td className="p-4 text-left font-mono text-emerald-700">۱۰,۰۸۰,۰۰۰</td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <span>مهار، تعقیب چابک و دستگیری موبایل‌قاپ‌ها و سارقین متواری</span>
                  <span className="block text-[10px] text-slate-400 font-normal">شاخص نتیجه‌ای و برون‌دادی کشف جرم</span>
                </td>
                <td className="p-4 text-center font-mono text-emerald-700">۹۴٪</td>
                <td className="p-4 text-center font-mono text-emerald-700">۱.۲۲×</td>
                <td className="p-4 text-center font-mono text-slate-500">۴,۰۰۰,۰۰۰</td>
                <td className="p-4 text-left font-mono text-emerald-700">۴,۸۰۰,۰۰۰</td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <span>پایش فنی روزانه موتورسیکلت سازمانی و سلامت ادوات و سلاح</span>
                  <span className="block text-[10px] text-slate-400 font-normal">آماده‌به‌کاری ۱۰۰٪ تجهیزات و صفر بودن نقص فنی</span>
                </td>
                <td className="p-4 text-center font-mono text-indigo-700">۹۲٪</td>
                <td className="p-4 text-center font-mono text-indigo-700">۱.۱۸×</td>
                <td className="p-4 text-center font-mono text-slate-500">۳,۰۰۰,۰۰۰</td>
                <td className="p-4 text-left font-mono text-indigo-700">۳,۵۴۰,۰۰۰</td>
              </tr>
              <tr className="hover:bg-slate-50 transition bg-emerald-50/50">
                <td className="p-4 text-emerald-900 font-black">
                  جمع پاداش شایستگی و بهره‌وری ضریب‌خورده
                </td>
                <td className="p-4 text-center font-mono font-black text-emerald-900">۹۳.۵٪</td>
                <td className="p-4 text-center font-mono font-black text-emerald-900">۱.۲۴×</td>
                <td className="p-4 text-center font-mono text-slate-600">۱۵,۰۰۰,۰۰۰</td>
                <td className="p-4 text-left font-mono font-black text-emerald-800 text-sm">۱۸,۴۲۰,۰۰۰</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Pilot Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-sm border border-slate-700 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              پایلوت سیستم جامع جبران خدمات شایستگی‌محور
            </span>
            <span className="text-xs text-slate-300 font-bold">شغل: گشت موتوری کلانتری ۱۰۳ گاندی</span>
          </div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-400" /> حقوق و مزایای ستوان‌دوم محمدرضا یزدان‌پناه
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            در این سامانه، حقوق و مزایای پرسنل به صورت هوشمند بر اساس نمره ارزیابی شایستگی (۹۳.۵٪) با <strong>ضریب ۱.۲۴</strong> محاسبه شده است.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center shrink-0">
          <span className="text-[10px] text-emerald-300 block font-bold">ضریب عملکرد فعال:</span>
          <span className="text-xl font-black text-white font-mono">۱.۲۴×</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">سال:</span>
          <div className="relative">
            <select className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm appearance-none pr-8 w-24">
              <option>۱۴۰۵</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">از ماه:</span>
          <div className="relative">
            <select className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm appearance-none pr-8 w-24">
              <option>فروردین</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">تا ماه:</span>
          <div className="relative">
            <select className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm appearance-none pr-8 w-24">
              <option>اسفند</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2 top-2" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold w-16 text-center">ردیف</th>
                <th className="p-4 font-bold">ماه پرداخت</th>
                <th className="p-4 font-bold">تاریخ تسویه حساب</th>
                <th className="p-4 font-bold text-center">ضریب شایستگی</th>
                <th className="p-4 font-bold">خالص پرداختی (ریال)</th>
                <th className="p-4 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {PAYSLIPS_DATA.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-500 text-center">{idx + 1}</td>
                  <td className="p-4 text-slate-800">{row.month}</td>
                  <td className="p-4 text-slate-600 font-mono">{row.date}</td>
                  <td className="p-4 text-center">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-black font-mono">
                      {row.multiplier || '۱.۰۰ (پایه)'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-indigo-700 font-mono">
                    {row.amount}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedPayslipId(row.id)}
                      className="bg-[#4455A5] text-white text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-indigo-700 font-bold transition shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" /> مشاهده فیش و ضرایب
                    </button>
                    <button className="bg-white border border-slate-300 text-slate-600 text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-slate-50 font-bold transition">
                      <Printer className="w-3.5 h-3.5" /> چاپ فیش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Performance-to-Salary Simulator */}
      <PerformanceSalarySimulator />
    </div>
  );
}

function ManagerView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">مجموع حقوق پرداختی (ماه)</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۴۹۵<span className="text-sm font-medium text-slate-400 mr-1">میلیارد ریال</span></div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl">
            <Banknote className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">میانگین اضافه کاری یگان</div>
            <div className="text-3xl font-black text-indigo-600 mt-2">۴۸ <span className="text-sm font-medium text-slate-400 mr-1">ساعت</span></div>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
            <Clock className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">رشد پرداخت نسبت به ماه قبل</div>
            <div className="text-3xl font-black text-rose-600 mt-2">۳.۲٪</div>
          </div>
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-3xl">
            <TrendingUp className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-indigo-500" /> روند پرداختی یگان در ۶ ماه گذشته
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PAYROLL_TREND} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="پرداخت" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-indigo-500" /> پراکندگی اضافه کار (کارکنان)
          </h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                  { name: 'بیش از ۱۰۰ ساعت', value: 15 },
                  { name: '۸۰ تا ۱۰۰ ساعت', value: 35 },
                  { name: '۵۰ تا ۸۰ ساعت', value: 45 },
                  { name: 'کمتر از ۵۰ ساعت', value: 20 },
                ]} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} width={90} />
                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} fill="#6366f1" />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SalaryPage() {
  const { role } = useRole();
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
