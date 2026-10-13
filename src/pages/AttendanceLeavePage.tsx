import React, { useState, useMemo } from "react";
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Upload, 
  Plus, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  History,
  BarChart2,
  Filter,
  Check,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface LeaveRecord {
  id: number;
  year: string; // e.g. "۱۴۰۵", "۱۴۰۴", "۱۴۰۳", "۱۴۰۲"
  month: number; // 1 to 12
  monthName: string;
  type: "استحقاقی" | "استعلاجی" | "تشویقی" | "بدون حقوق" | "ساعتی";
  days: string;
  daysCount: number;
  from: string;
  to: string;
  fromDay: number;
  toDay: number;
  substitute: string;
  status: "تایید شده" | "در حال بررسی" | "رد شده" | "خاتمه یافته";
  approver: string;
  description?: string;
}

interface YearLeaveSummary {
  year: string;
  entitledQuota: number; // سهمیه مصوب سال (روز)
  savedFromPrevious: number; // ذخیره سنواتی از سال قبل (روز)
  totalAvailable: number; // کل مرخصی قابل استفاده
  usedEntitled: number; // استفاده شده استحقاقی
  usedSick: number; // استفاده شده استعلاجی
  usedIncentive: number; // استفاده شده تشویقی
  transferredToNext: number; // مانده انتقال به سال بعد
  remaining: number; // باقیمانده فعلی
}

const PERSIAN_MONTHS = [
  { id: 1, name: "فروردین", days: 31 },
  { id: 2, name: "اردیبهشت", days: 31 },
  { id: 3, name: "خرداد", days: 31 },
  { id: 4, name: "تیر", days: 31 },
  { id: 5, name: "مرداد", days: 31 },
  { id: 6, name: "شهریور", days: 31 },
  { id: 7, name: "مهر", days: 30 },
  { id: 8, name: "آبان", days: 30 },
  { id: 9, name: "آذر", days: 30 },
  { id: 10, name: "دی", days: 30 },
  { id: 11, name: "بهمن", days: 30 },
  { id: 12, name: "اسفند", days: 29 },
];

const YEARS_LIST = ["۱۴۰۵", "۱۴۰۴", "۱۴۰۳", "۱۴۰۲"];

const YEAR_SUMMARIES: Record<string, YearLeaveSummary> = {
  "۱۴۰۵": {
    year: "۱۴۰۵",
    entitledQuota: 28,
    savedFromPrevious: 15,
    totalAvailable: 43,
    usedEntitled: 7,
    usedSick: 2,
    usedIncentive: 2,
    transferredToNext: 0,
    remaining: 36,
  },
  "۱۴۰۴": {
    year: "۱۴۰۴",
    entitledQuota: 28,
    savedFromPrevious: 10,
    totalAvailable: 38,
    usedEntitled: 23,
    usedSick: 5,
    usedIncentive: 4,
    transferredToNext: 15,
    remaining: 0,
  },
  "۱۴۰۳": {
    year: "۱۴۰۳",
    entitledQuota: 28,
    savedFromPrevious: 8,
    totalAvailable: 36,
    usedEntitled: 26,
    usedSick: 3,
    usedIncentive: 2,
    transferredToNext: 10,
    remaining: 0,
  },
  "۱۴۰۲": {
    year: "۱۴۰۲",
    entitledQuota: 28,
    savedFromPrevious: 6,
    totalAvailable: 34,
    usedEntitled: 26,
    usedSick: 0,
    usedIncentive: 3,
    transferredToNext: 8,
    remaining: 0,
  },
};

const ALL_LEAVE_RECORDS: LeaveRecord[] = [
  // 1405 (Current year)
  {
    id: 101,
    year: "۱۴۰۵",
    month: 5,
    monthName: "مرداد",
    type: "استحقاقی",
    days: "۴ روز",
    daysCount: 4,
    from: "۱۴۰۵/۰۵/۱۶",
    to: "۱۴۰۵/۰۵/۲۰",
    fromDay: 16,
    toDay: 20,
    substitute: "رضا علی‌نژاد",
    status: "در حال بررسی",
    approver: "سرهنگ احمد رضایی",
    description: "مرخصی جهت انجام امور شخصی و خانوادگی.",
  },
  {
    id: 102,
    year: "۱۴۰۵",
    month: 5,
    monthName: "مرداد",
    type: "تشویقی",
    days: "۲ روز",
    daysCount: 2,
    from: "۱۴۰۵/۰۵/۰۴",
    to: "۱۴۰۵/۰۵/۰۶",
    fromDay: 4,
    toDay: 6,
    substitute: "سهراب سپهری",
    status: "تایید شده",
    approver: "سرهنگ احمد رضایی",
    description: "تشویقی بابت عملکرد برتر در طرح امنیت تابستانه.",
  },
  {
    id: 103,
    year: "۱۴۰۵",
    month: 2,
    monthName: "اردیبهشت",
    type: "استحقاقی",
    days: "۳ روز",
    daysCount: 3,
    from: "۱۴۰۵/۰۲/۱۵",
    to: "۱۴۰۵/۰۲/۱۸",
    fromDay: 15,
    toDay: 18,
    substitute: "علیرضا بیرانوند",
    status: "تایید شده",
    approver: "سرهنگ احمد رضایی",
    description: "مرخصی بین‌التعطیلی مصوب.",
  },
  {
    id: 104,
    year: "۱۴۰۵",
    month: 1,
    monthName: "فروردین",
    type: "استعلاجی",
    days: "۲ روز",
    daysCount: 2,
    from: "۱۴۰۵/۰۱/۱۴",
    to: "۱۴۰۵/۰۱/۱۶",
    fromDay: 14,
    toDay: 16,
    substitute: "رضا علی‌نژاد",
    status: "تایید شده",
    approver: "بهداری فراجا (دکتر زمانی)",
    description: "استراحت پزشکی تایید شده توسط پزشک معتمد بهداری.",
  },

  // 1404 (Previous year)
  {
    id: 201,
    year: "۱۴۰۴",
    month: 11,
    monthName: "بهمن",
    type: "استحقاقی",
    days: "۵ روز",
    daysCount: 5,
    from: "۱۴۰۴/۱۱/۱۰",
    to: "۱۴۰۴/۱۱/۱۵",
    fromDay: 10,
    toDay: 15,
    substitute: "رضا علی‌نژاد",
    status: "خاتمه یافته",
    approver: "سرهنگ احمد رضایی",
    description: "مرخصی زمستانه خانوادگی.",
  },
  {
    id: 202,
    year: "۱۴۰۴",
    month: 8,
    monthName: "آبان",
    type: "تشویقی",
    days: "۳ روز",
    daysCount: 3,
    from: "۱۴۰۴/۰۸/۲۲",
    to: "۱۴۰۴/۰۸/۲۵",
    fromDay: 22,
    toDay: 25,
    substitute: "سهراب سپهری",
    status: "خاتمه یافته",
    approver: "سرهنگ احمد رضایی",
    description: "پاداش موفقیت در آزمون تیراندازی و تاکتیک انتظامی.",
  },
  {
    id: 203,
    year: "۱۴۰۴",
    month: 6,
    monthName: "شهریور",
    type: "استحقاقی",
    days: "۶ روز",
    daysCount: 6,
    from: "۱۴۰۴/۰۶/۰۵",
    to: "۱۴۰۴/۰۶/۱۱",
    fromDay: 5,
    toDay: 11,
    substitute: "علیرضا بیرانوند",
    status: "خاتمه یافته",
    approver: "سرهنگ احمد رضایی",
    description: "مرخصی تابستانه.",
  },
  {
    id: 204,
    year: "۱۴۰۴",
    month: 4,
    monthName: "تیر",
    type: "استعلاجی",
    days: "۵ روز",
    daysCount: 5,
    from: "۱۴۰۴/۰۴/۱۸",
    to: "۱۴۰۴/۰۴/۲۳",
    fromDay: 18,
    toDay: 23,
    substitute: "رضا علی‌نژاد",
    status: "خاتمه یافته",
    approver: "بهداری فراجا",
    description: "آسیب‌دیدگی زانو در رزمایش و استراحت پزشکی.",
  },
  {
    id: 205,
    year: "۱۴۰۴",
    month: 2,
    monthName: "اردیبهشت",
    type: "استحقاقی",
    days: "۴ روز",
    daysCount: 4,
    from: "۱۴۰۴/۰۲/۰۷",
    to: "۱۴۰۴/۰۲/۱۱",
    fromDay: 7,
    toDay: 11,
    substitute: "سهراب سپهری",
    status: "خاتمه یافته",
    approver: "سرهنگ احمد رضایی",
    description: "امور اداری و حقوقی شخصی.",
  },
  {
    id: 206,
    year: "۱۴۰۴",
    month: 1,
    monthName: "فروردین",
    type: "استحقاقی",
    days: "۸ روز",
    daysCount: 8,
    from: "۱۴۰۴/۰۱/۰۲",
    to: "۱۴۰۴/۰۱/۱۰",
    fromDay: 2,
    toDay: 10,
    substitute: "علیرضا بیرانوند",
    status: "خاتمه یافته",
    approver: "سرهنگ احمد رضایی",
    description: "شیفت دوم تعطیلات نوروزی.",
  },

  // 1403
  {
    id: 301,
    year: "۱۴۰۳",
    month: 12,
    monthName: "اسفند",
    type: "استحقاقی",
    days: "۴ روز",
    daysCount: 4,
    from: "۱۴۰۳/۱۲/۲۴",
    to: "۱۴۰۳/۱۲/۲۸",
    fromDay: 24,
    toDay: 28,
    substitute: "رضا علی‌نژاد",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },
  {
    id: 302,
    year: "۱۴۰۳",
    month: 10,
    monthName: "دی",
    type: "استعلاجی",
    days: "۳ روز",
    daysCount: 3,
    from: "۱۴۰۳/۱۰/۱۵",
    to: "۱۴۰۳/۱۰/۱۸",
    fromDay: 15,
    toDay: 18,
    substitute: "سهراب سپهری",
    status: "خاتمه یافته",
    approver: "بهداری فراجا",
  },
  {
    id: 303,
    year: "۱۴۰۳",
    month: 5,
    monthName: "مرداد",
    type: "استحقاقی",
    days: "۸ روز",
    daysCount: 8,
    from: "۱۴۰۳/۰۵/۱۰",
    to: "۱۴۰۳/۰۵/۱۸",
    fromDay: 10,
    toDay: 18,
    substitute: "علیرضا بیرانوند",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },
  {
    id: 304,
    year: "۱۴۰۳",
    month: 3,
    monthName: "خرداد",
    type: "تشویقی",
    days: "۲ روز",
    daysCount: 2,
    from: "۱۴۰۳/۰۳/۱۴",
    to: "۱۴۰۳/۰۳/۱۶",
    fromDay: 14,
    toDay: 16,
    substitute: "رضا علی‌نژاد",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },
  {
    id: 305,
    year: "۱۴۰۳",
    month: 1,
    monthName: "فروردین",
    type: "استحقاقی",
    days: "۷ روز",
    daysCount: 7,
    from: "۱۴۰۳/۰۱/۰۷",
    to: "۱۴۰۳/۰۱/۱۴",
    fromDay: 7,
    toDay: 14,
    substitute: "سهراب سپهری",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },

  // 1402
  {
    id: 401,
    year: "۱۴۰۲",
    month: 8,
    monthName: "آبان",
    type: "استحقاقی",
    days: "۱۰ روز",
    daysCount: 10,
    from: "۱۴۰۲/۰۸/۱۰",
    to: "۱۴۰۲/۰۸/۲۰",
    fromDay: 10,
    toDay: 20,
    substitute: "رضا علی‌نژاد",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },
  {
    id: 402,
    year: "۱۴۰۲",
    month: 4,
    monthName: "تیر",
    type: "تشویقی",
    days: "۳ روز",
    daysCount: 3,
    from: "۱۴۰۲/۰۴/۱۵",
    to: "۱۴۰۲/۰۴/۱۸",
    fromDay: 15,
    toDay: 18,
    substitute: "سهراب سپهری",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },
  {
    id: 403,
    year: "۱۴۰۲",
    month: 1,
    monthName: "فروردین",
    type: "استحقاقی",
    days: "۸ روز",
    daysCount: 8,
    from: "۱۴۰۲/۰۱/۰۳",
    to: "۱۴۰۲/۰۱/۱۱",
    fromDay: 3,
    toDay: 11,
    substitute: "علیرضا بیرانوند",
    status: "خاتمه یافته",
    approver: "سرهنگ اکبری",
  },
];

export function AttendanceLeavePage() {
  const [records, setRecords] = useState<LeaveRecord[]>(ALL_LEAVE_RECORDS);
  const [selectedYear, setSelectedYear] = useState<string>("۱۴۰۵");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // null = all months
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "overview">("history");

  // Form states for new leave request
  const [leaveType, setLeaveType] = useState<"استحقاقی" | "استعلاجی" | "تشویقی" | "بدون حقوق" | "ساعتی">("استحقاقی");
  const [startDate, setStartDate] = useState("۱۴۰۵/۰۵/۲۲");
  const [endDate, setEndDate] = useState("۱۴۰۵/۰۵/۲۵");
  const [substitute, setSubstitute] = useState("رضا علی‌نژاد");
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Year Summary data
  const currentYearSummary = YEAR_SUMMARIES[selectedYear] || {
    year: selectedYear,
    entitledQuota: 28,
    savedFromPrevious: 0,
    totalAvailable: 28,
    usedEntitled: 0,
    usedSick: 0,
    usedIncentive: 0,
    transferredToNext: 0,
    remaining: 28,
  };

  // Filter records for selected year and optional selected month
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (r.year !== selectedYear) return false;
      if (selectedMonth !== null && r.month !== selectedMonth) return false;
      return true;
    });
  }, [records, selectedYear, selectedMonth]);

  // Calculate monthly stats for the chart
  const monthlyChartData = useMemo(() => {
    return PERSIAN_MONTHS.map((m) => {
      const monthRecords = records.filter((r) => r.year === selectedYear && r.month === m.id);
      const totalDays = monthRecords.reduce((sum, r) => sum + r.daysCount, 0);
      const entitled = monthRecords.filter(r => r.type === "استحقاقی").reduce((sum, r) => sum + r.daysCount, 0);
      const sick = monthRecords.filter(r => r.type === "استعلاجی").reduce((sum, r) => sum + r.daysCount, 0);
      const incentive = monthRecords.filter(r => r.type === "تشویقی").reduce((sum, r) => sum + r.daysCount, 0);
      return {
        id: m.id,
        name: m.name,
        totalDays,
        entitled,
        sick,
        incentive,
      };
    });
  }, [records, selectedYear]);

  // Days in selected month for calendar
  const calendarMonthInfo = useMemo(() => {
    const activeMonthId = selectedMonth || 5; // Default to Mordad (5) if "all" selected
    return PERSIAN_MONTHS.find(m => m.id === activeMonthId) || PERSIAN_MONTHS[4];
  }, [selectedMonth]);

  // Calendar leave days map
  const calendarLeaveDaysMap = useMemo(() => {
    const map = new Map<number, LeaveRecord>();
    const monthRecs = records.filter(r => r.year === selectedYear && r.month === calendarMonthInfo.id);
    monthRecs.forEach(r => {
      for (let day = r.fromDay; day <= r.toDay; day++) {
        map.set(day, r);
      }
    });
    return map;
  }, [records, selectedYear, calendarMonthInfo.id]);

  const handleCancelRequest = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: LeaveRecord = {
      id: Date.now(),
      year: "۱۴۰۵",
      month: 5,
      monthName: "مرداد",
      type: leaveType,
      days: "۳ روز",
      daysCount: 3,
      from: startDate,
      to: endDate,
      fromDay: 22,
      toDay: 25,
      substitute: substitute,
      status: "در حال بررسی",
      approver: "سرهنگ احمد رضایی",
      description: description || "درخواست مرخصی جدید",
    };
    setRecords([newReq, ...records]);
    setIsModalOpen(false);
    setDescription("");
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black text-slate-800">
              مدیریت و تاریخچه مرخصی‌ها
            </h2>
            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
              سال {selectedYear}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            مشاهده سوابق و میزان مرخصی‌های استفاده شده به تفکیک سال و ماه، و ثبت درخواست جدید.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Year selector dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
            <History className="w-4 h-4 text-indigo-600" />
            <span>انتخاب سال:</span>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedMonth(null); // reset month on year switch
              }}
              aria-label="انتخاب سال"
              className="bg-transparent font-black font-mono text-indigo-700 text-sm focus:outline-none cursor-pointer pr-1"
            >
              {YEARS_LIST.map((yr) => (
                <option key={yr} value={yr}>
                  سال {yr} {yr === "۱۴۰۵" ? "(جاری)" : "(سوابق)"}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#4455A5] hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ثبت مرخصی جدید</span>
          </button>

          <Link
            to="/attendance"
            className="text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>تقویم حضور</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Year Overview Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Entitled Available */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-extrabold text-slate-500 mb-1">
            کل سهمیه قابل استفاده در {selectedYear}
          </div>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black font-mono text-slate-800">
              {currentYearSummary.totalAvailable}
            </span>
            <span className="text-xs font-bold text-slate-500">روز</span>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold mt-1">
            ({currentYearSummary.entitledQuota} روز سهمیه سال + {currentYearSummary.savedFromPrevious} روز سنوات)
          </div>
        </div>

        {/* Used Entitled */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-extrabold text-slate-500 mb-1">
            مرخصی استفاده شده (استحقاقی)
          </div>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black font-mono text-amber-600">
              {currentYearSummary.usedEntitled}
            </span>
            <span className="text-xs font-bold text-slate-500">روز</span>
          </div>
          <div className="text-[10px] text-amber-600/80 font-semibold mt-1">
            {Math.round((currentYearSummary.usedEntitled / currentYearSummary.totalAvailable) * 100)}٪ از کل سهمیه
          </div>
        </div>

        {/* Other Leaves (Sick & Incentive) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-extrabold text-slate-500 mb-1">
            استعلاجی و تشویقی در {selectedYear}
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black font-mono text-blue-600">
                {currentYearSummary.usedSick}
              </span>
              <span className="text-[10px] font-bold text-slate-500">استعلاجی</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black font-mono text-purple-600">
                {currentYearSummary.usedIncentive}
              </span>
              <span className="text-[10px] font-bold text-slate-500">تشویقی</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold mt-1">
            بدون کسر از ذخیره استحقاقی
          </div>
        </div>

        {/* Remaining / Transferred */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 p-4 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="text-[11px] font-extrabold text-emerald-800 mb-1">
            {selectedYear === "۱۴۰۵" ? "مانده استحقاقی سال جاری" : "انتقال یافته به سال بعد"}
          </div>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-black font-mono text-emerald-700">
              {selectedYear === "۱۴۰۵" ? currentYearSummary.remaining : currentYearSummary.transferredToNext}
            </span>
            <span className="text-xs font-bold text-emerald-800">روز</span>
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">
            {selectedYear === "۱۴۰۵" ? "آماده برای استفاده" : "ذخیره قانونی سنواتی"}
          </div>
        </div>
      </div>

      {/* Month Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-slate-800 text-xs">
              پیمایش و بررسی مرخصی‌ها بر اساس ماه (سال {selectedYear}):
            </h3>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {selectedMonth === null ? (
              <span className="text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg">
                نمایش کل ماه‌های سال {selectedYear} ({filteredRecords.length} فقره مرخصی)
              </span>
            ) : (
              <span>
                ماه انتخاب شده:{" "}
                <strong className="text-slate-800">
                  {PERSIAN_MONTHS.find((m) => m.id === selectedMonth)?.name} {selectedYear}
                </strong>
              </span>
            )}
          </div>
        </div>

        {/* Horizontal month selector pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {/* All Months button */}
          <button
            onClick={() => setSelectedMonth(null)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedMonth === null
                ? "bg-[#4455A5] text-white shadow-sm ring-2 ring-indigo-200"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            <span>کل سال</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded-full">
              {records.filter((r) => r.year === selectedYear).reduce((s, r) => s + r.daysCount, 0)} روز
            </span>
          </button>

          {PERSIAN_MONTHS.map((month) => {
            const isSelected = selectedMonth === month.id;
            const monthRecords = records.filter(
              (r) => r.year === selectedYear && r.month === month.id
            );
            const totalDaysInMonth = monthRecords.reduce((sum, r) => sum + r.daysCount, 0);

            return (
              <button
                key={month.id}
                onClick={() => setSelectedMonth(month.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#4455A5] text-white shadow-sm ring-2 ring-indigo-200"
                    : totalDaysInMonth > 0
                    ? "bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-900 border border-indigo-100"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                <span>{month.name}</span>
                {totalDaysInMonth > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected
                        ? "bg-white text-indigo-700"
                        : "bg-indigo-200/60 text-indigo-900"
                    }`}
                  >
                    {totalDaysInMonth} روز
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Left = Detailed Records Table, Right = Calendar & Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Records Table (2 Columns in desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>
                    سوابق مرخصی‌های {selectedMonth ? `ماه ${PERSIAN_MONTHS.find(m => m.id === selectedMonth)?.name}` : "ثبت شده در"} سال {selectedYear}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  تعداد کل موارد یافته شده: {filteredRecords.length} فقره مرخصی
                </p>
              </div>

              {selectedMonth !== null && (
                <button
                  onClick={() => setSelectedMonth(null)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors"
                >
                  نمایش همه ماه‌ها
                </button>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/50">
                    <th className="py-3 px-3 font-bold text-center w-12 rounded-r-lg">ردیف</th>
                    <th className="py-3 px-3 font-bold">نوع مرخصی</th>
                    <th className="py-3 px-3 font-bold text-center">مدت زمان</th>
                    <th className="py-3 px-3 font-bold">از تاریخ</th>
                    <th className="py-3 px-3 font-bold">تا تاریخ</th>
                    <th className="py-3 px-3 font-bold">جانشین</th>
                    <th className="py-3 px-3 font-bold text-center">وضعیت</th>
                    <th className="py-3 px-3 font-bold text-center rounded-l-lg">اقدام</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {filteredRecords.map((req, idx) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 text-slate-500 font-bold text-center font-mono">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              req.type === "استحقاقی"
                                ? "bg-amber-500"
                                : req.type === "استعلاجی"
                                ? "bg-blue-500"
                                : req.type === "تشویقی"
                                ? "bg-purple-500"
                                : "bg-slate-400"
                            }`}
                          />
                          <span className="font-extrabold text-slate-800">{req.type}</span>
                        </div>
                        {req.description && (
                          <div className="text-[10px] text-slate-400 font-normal truncate max-w-[160px] mt-0.5">
                            {req.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md font-mono text-[11px]">
                          {req.days}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 font-mono text-[11px]">{req.from}</td>
                      <td className="py-3.5 px-3 text-slate-700 font-mono text-[11px]">{req.to}</td>
                      <td className="py-3.5 px-3 text-slate-600 text-[11px]">{req.substitute}</td>
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            req.status === "تایید شده" || req.status === "خاتمه یافته"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : req.status === "رد شده"
                              ? "bg-rose-50 text-rose-700 border border-rose-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {(req.status === "تایید شده" || req.status === "خاتمه یافته") && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {req.status === "رد شده" && <XCircle className="w-3 h-3" />}
                          {req.status === "در حال بررسی" && <Clock className="w-3 h-3" />}
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {req.status === "در حال بررسی" && req.year === "۱۴۰۵" ? (
                          <button
                            onClick={() => handleCancelRequest(req.id)}
                            className="text-rose-600 hover:text-white border border-rose-200 hover:bg-rose-600 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer"
                          >
                            انصراف
                          </button>
                        ) : (
                          <span className="text-slate-400 font-normal text-[11px]">مختومه</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <CalendarIcon className="w-8 h-8 text-slate-300" />
                          <span className="text-xs font-bold">
                            در {selectedMonth ? `ماه ${PERSIAN_MONTHS.find(m => m.id === selectedMonth)?.name}` : "این دوره"} هیچ مرخصی ثبت نشده است.
                          </span>
                          {selectedMonth !== null && (
                            <button
                              onClick={() => setSelectedMonth(null)}
                              className="text-xs font-bold text-indigo-600 hover:underline mt-1"
                            >
                              مشاهده سایر ماه‌های سال {selectedYear}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Distribution Bar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-indigo-600" />
                  <span>توزیع مرخصی‌ها در ماه‌های سال {selectedYear}</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  برای مشاهده جزئیات هر ماه، می‌توانید روی ستون مربوطه کلیک فرمایید.
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-bold">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-indigo-500"></div>
                  <span className="text-slate-600">استحقاقی</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-blue-400"></div>
                  <span className="text-slate-600">استعلاجی</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-purple-400"></div>
                  <span className="text-slate-600">تشویقی</span>
                </div>
              </div>
            </div>

            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    formatter={(value: any) => [`${value} روز`, ""]}
                    labelFormatter={(label) => `ماه ${label} سال ${selectedYear}`}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px',
                      border: 'none',
                      direction: 'rtl'
                    }}
                  />
                  <Bar 
                    dataKey="entitled" 
                    name="استحقاقی" 
                    stackId="a" 
                    fill="#6366f1" 
                    radius={[0, 0, 0, 0]}
                    onClick={(entry: any) => {
                      if (entry && typeof entry.id === 'number') {
                        setSelectedMonth(entry.id);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <Bar 
                    dataKey="sick" 
                    name="استعلاجی" 
                    stackId="a" 
                    fill="#60a5fa" 
                    radius={[0, 0, 0, 0]}
                    onClick={(entry: any) => {
                      if (entry && typeof entry.id === 'number') {
                        setSelectedMonth(entry.id);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <Bar 
                    dataKey="incentive" 
                    name="تشویقی" 
                    stackId="a" 
                    fill="#c084fc" 
                    radius={[4, 4, 0, 0]}
                    onClick={(entry: any) => {
                      if (entry && typeof entry.id === 'number') {
                        setSelectedMonth(entry.id);
                      }
                    }}
                    className="cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Dynamic Calendar & Annual Rule Info */}
        <div className="space-y-6">
          
          {/* Dynamic Month Calendar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-indigo-600" />
                <h4 className="font-extrabold text-slate-800 text-xs">
                  تقویم مرخصی
                </h4>
              </div>

              {/* Month Navigation Prev / Next */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => {
                    const cur = selectedMonth || 5;
                    const prev = cur > 1 ? cur - 1 : 12;
                    setSelectedMonth(prev);
                  }}
                  title="ماه قبل"
                  className="p-1 hover:bg-white rounded text-slate-600 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-black text-indigo-700 px-2 font-mono">
                  {calendarMonthInfo.name} {selectedYear}
                </span>
                <button
                  onClick={() => {
                    const cur = selectedMonth || 5;
                    const next = cur < 12 ? cur + 1 : 1;
                    setSelectedMonth(next);
                  }}
                  title="ماه بعد"
                  className="p-1 hover:bg-white rounded text-slate-600 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold mb-1">
              {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((d, i) => (
                <div key={i} className="text-slate-400 py-1">{d}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold">
              {/* Padding offset */}
              {Array.from({ length: (calendarMonthInfo.id * 2) % 7 }).map((_, i) => (
                <div key={`pad-${i}`} className="py-2 text-transparent">-</div>
              ))}

              {Array.from({ length: calendarMonthInfo.days }).map((_, i) => {
                const dayNum = i + 1;
                const record = calendarLeaveDaysMap.get(dayNum);

                let cellStyle = "text-slate-700 hover:bg-slate-50 border border-transparent";
                let tooltipText = "";

                if (record) {
                  if (record.status === "تایید شده" || record.status === "خاتمه یافته") {
                    if (record.type === "استحقاقی") {
                      cellStyle = "bg-amber-500 text-white shadow-sm ring-2 ring-amber-100 font-black";
                      tooltipText = `استحقاقی: ${record.from} تا ${record.to}`;
                    } else if (record.type === "استعلاجی") {
                      cellStyle = "bg-blue-500 text-white shadow-sm ring-2 ring-blue-100 font-black";
                      tooltipText = `استعلاجی: ${record.from} تا ${record.to}`;
                    } else if (record.type === "تشویقی") {
                      cellStyle = "bg-purple-500 text-white shadow-sm ring-2 ring-purple-100 font-black";
                      tooltipText = `تشویقی: ${record.from} تا ${record.to}`;
                    }
                  } else if (record.status === "در حال بررسی") {
                    cellStyle = "bg-amber-400 text-white shadow-sm ring-2 ring-amber-100 font-black animate-pulse";
                    tooltipText = `در حال بررسی: ${record.from} تا ${record.to}`;
                  }
                }

                return (
                  <div
                    key={dayNum}
                    title={tooltipText || `روز ${dayNum} ${calendarMonthInfo.name}`}
                    className={`py-2 rounded-lg font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${cellStyle}`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded"></div>
                <span className="text-slate-600">استحقاقی تایید شده</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded"></div>
                <span className="text-slate-600">استعلاجی پزشکی</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-purple-500 rounded"></div>
                <span className="text-slate-600">تشویقی مصوب</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-amber-400 rounded"></div>
                <span className="text-slate-600">در حال بررسی</span>
              </div>
            </div>
          </div>

          {/* Leave Regulations & Quotas Info Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>مقررات مرخصی کارکنان فراجا</span>
            </h4>
            
            <ul className="text-[11px] text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>
                <strong>سهمیه سالانه استحقاقی:</strong> ۲۸ روز کاری در هر سال شمسی.
              </li>
              <li>
                <strong>حداکثر ذخیره سنواتی:</strong> تا سقف ۱۵ روز از مرخصی استفاده نشده به سال بعد منتقل می‌گردد.
              </li>
              <li>
                <strong>مرخصی استعلاجی:</strong> منوط به تایید پزشک معتمد بهداری فرماندهی انتظامی استان.
              </li>
              <li>
                <strong>مرخصی تشویقی:</strong> بر اساس ارزیابی شایستگی و دستور مستقیم فرماندهی یگان اعطا می‌گردد.
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Leave Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>درخواست مرخصی جدید (سال ۱۴۰۵)</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نوع مرخصی *
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="استحقاقی">استحقاقی (کسر از سهمیه سال)</option>
                    <option value="استعلاجی">استعلاجی (درمانی و بهداری)</option>
                    <option value="تشویقی">تشویقی (مصوب فرماندهی)</option>
                    <option value="ساعتی">ساعتی (حداکثر ۴ ساعت)</option>
                    <option value="بدون حقوق">بدون حقوق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تاریخ شروع *
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-bold font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="۱۴۰۵/۰۵/۲۲"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تاریخ پایان *
                  </label>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-bold font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="۱۴۰۵/۰۵/۲۵"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    جانشین شما در دوره مرخصی *
                  </label>
                  <select
                    value={substitute}
                    onChange={(e) => setSubstitute(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="رضا علی‌نژاد">ستوان یکم رضا علی‌نژاد</option>
                    <option value="سهراب سپهری">ستوان دوم سهراب سپهری</option>
                    <option value="علیرضا بیرانوند">استوار یکم علیرضا بیرانوند</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    بارگذاری مدرک یا گواهی پزشک (اختیاری)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 text-center cursor-pointer transition">
                    <input
                      type="file"
                      id="leave-file-modal"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0].name);
                        }
                      }}
                    />
                    <label htmlFor="leave-file-modal" className="cursor-pointer space-y-2 block">
                      <Upload className="w-7 h-7 text-slate-400 mx-auto" />
                      <span className="block text-xs font-bold text-slate-600">
                        {uploadedFile ? `فایل انتخاب شد: ${uploadedFile}` : "جهت بارگذاری کلیک کنید یا فایل را بکشید"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    توضیحات و علت مرخصی
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="شرح علت درخواست..."
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  ثبت نهایی درخواست
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
