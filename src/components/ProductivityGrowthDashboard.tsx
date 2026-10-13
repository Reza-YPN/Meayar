import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import {
  TrendingUp,
  Award,
  Activity,
  Clock,
  ShieldCheck,
  Target,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronDown
} from "lucide-react";

interface HistoricalPeriod {
  period: string;
  season: string;
  employeeScore: number;
  stationAvg: number;
  farajaTarget: number;
  responseTimeMinutes: number;
  theftDiscoveredCount: number;
  satisfactionRate: number;
  multiplier: number;
}

const HISTORICAL_PRODUCTIVITY_DATA: HistoricalPeriod[] = [
  {
    period: "تابستان ۱۴۰۴",
    season: "Q2 1404",
    employeeScore: 78.5,
    stationAvg: 76.0,
    farajaTarget: 80.0,
    responseTimeMinutes: 6.8,
    theftDiscoveredCount: 8,
    satisfactionRate: 84,
    multiplier: 1.05
  },
  {
    period: "پاییز ۱۴۰۴",
    season: "Q3 1404",
    employeeScore: 82.0,
    stationAvg: 77.2,
    farajaTarget: 80.0,
    responseTimeMinutes: 5.9,
    theftDiscoveredCount: 11,
    satisfactionRate: 87,
    multiplier: 1.10
  },
  {
    period: "زمستان ۱۴۰۴",
    season: "Q4 1404",
    employeeScore: 86.8,
    stationAvg: 79.1,
    farajaTarget: 82.0,
    responseTimeMinutes: 4.8,
    theftDiscoveredCount: 15,
    satisfactionRate: 90,
    multiplier: 1.15
  },
  {
    period: "بهار ۱۴۰۵",
    season: "Q1 1405",
    employeeScore: 90.2,
    stationAvg: 80.5,
    farajaTarget: 82.0,
    responseTimeMinutes: 4.1,
    theftDiscoveredCount: 19,
    satisfactionRate: 94,
    multiplier: 1.20
  },
  {
    period: "تابستان ۱۴۰۵ (فعلی)",
    season: "Q2 1405",
    employeeScore: 93.5,
    stationAvg: 81.8,
    farajaTarget: 85.0,
    responseTimeMinutes: 3.6,
    theftDiscoveredCount: 24,
    satisfactionRate: 97,
    multiplier: 1.24
  }
];

const COMPETENCY_GROWTH_BREAKDOWN = [
  { name: "واکنش سریع ۱۱۰ (دقیقه)", baseline: 60, current: 96, growth: "+۳۶٪" },
  { name: "مهار و تعقیب سارقین", baseline: 68, current: 94, growth: "+۲۶٪" },
  { name: "راکبی و مانور تاکتیکی", baseline: 75, current: 95, growth: "+۲۰٪" },
  { name: "پایش فنی موتورسیکلت و سلاح", baseline: 80, current: 92, growth: "+۱۲٪" },
  { name: "تکریم مراجعین و رضایت ۱۹۷", baseline: 79, current: 97, growth: "+۱۸٪" },
  { name: "تنظیم اوراق قضایی", baseline: 74, current: 91, growth: "+۱۷٪" }
];

export function ProductivityGrowthDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<"score" | "response" | "thefts">("score");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                تحلیل جامع رشد بهره‌وری سالیانه
              </span>
              <span className="text-xs text-slate-300 font-bold">
                یگان: گشت واکنش سریع موتوری کلانتری ۱۰۳ گاندی
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              کارنامه رشد تاریخی بهره‌وری و شایستگی‌های ستوان‌دوم محمدرضا یزدان‌پناه
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              بررسی روند عملکردی ۵ دوره متوالی نشان‌دهنده رشد چشمگیر <strong>+۱۹.۱٪</strong> در نمره کل شایستگی‌ها و کاهش <strong>۴۷٪</strong> در زمان حضور در صحنه‌های فوریت‌های پلیسی ۱۱۰ می‌باشد.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-[10px] text-emerald-300 block font-bold">رشد بهره‌وری ۱ ساله:</span>
              <span className="text-2xl font-black text-white font-mono">+۱۹.۱٪</span>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-300 block font-bold">رتبه یگانی:</span>
              <span className="text-base font-black text-emerald-400">
                نفر اول گشت‌های ۱۰۳
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-100 bg-slate-50/50">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">نمره کل شایستگی دوره اخیر</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +۳.۳ نمره
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">۹۳.۵</span>
            <span className="text-xs text-slate-400 font-bold">از ۱۰۰ (سطح A+)</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">
            میانگین کلانتری: ۸۱.۸ | حد نصاب فراجا: ۸۵.۰
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">سرعت حضور در صحنه ۱۱۰</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> ۳.۲ دقیقه بهبود
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-700 font-mono">۳.۶</span>
            <span className="text-xs text-slate-500 font-bold">دقیقه (زیر سقف ۵ دقیقه)</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">
            کاهش زمان از ۶.۸ دقیقه در تابستان ۱۴۰۴ به ۳.۶ دقیقه
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">کشف سرقت و توقیف در شیفت</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> ۳ برابر رشد
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700 font-mono">۲۴</span>
            <span className="text-xs text-slate-500 font-bold">فقره کشف و توقیف</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">
            کشف ۲۴ فقره موتورسیکلت مسروقه و گوشی در تابستان ۱۴۰۵
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">رضایتمندی مردمی (سامانه ۱۹۷)</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
              <Award className="w-3 h-3" /> رتبه ممتاز
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">۹۷٪</span>
            <span className="text-xs text-slate-500 font-bold">رضایت شهروندان</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">
            دریافت ۳ فقره تقدیرنامه کتبی از بازرسی فراجا
          </span>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              نمودار تحلیلی مقایسه بهره‌وری ۵ دوره متوالی (۱۴۰۴ الی ۱۴۰۵)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              روند رشد شاخص‌های کلیدی نسبت به میانگین کلانتری ۱۰۳ گاندی و استانداردهای فراجا
            </p>
          </div>

          {/* Metric Toggle Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setSelectedMetric("score")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedMetric === "score"
                  ? "bg-white text-indigo-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              نمره کل شایستگی
            </button>
            <button
              onClick={() => setSelectedMetric("response")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedMetric === "response"
                  ? "bg-white text-indigo-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              سرعت واکنش ۱۱۰ (دقیقه)
            </button>
            <button
              onClick={() => setSelectedMetric("thefts")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedMetric === "thefts"
                  ? "bg-white text-indigo-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              کشف سرقت و توقیف
            </button>
          </div>
        </div>

        {/* Dynamic Recharts Chart */}
        <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === "score" ? (
              <AreaChart data={HISTORICAL_PRODUCTIVITY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmployee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorStation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis domain={[65, 100]} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: any, name: any) => [
                    `${value} امتیاز`,
                    name === "employeeScore" ? "نمره محمدرضا یزدان‌پناه" : name === "stationAvg" ? "میانگین کلانتری ۱۰۳" : "حد نصاب فراجا"
                  ]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", direction: "rtl", textAlign: "right" }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs font-bold text-slate-700 mx-2">
                      {value === "employeeScore" ? "نمره ستوان‌دوم یزدان‌پناه" : value === "stationAvg" ? "میانگین کلانتری ۱۰۳ گاندی" : "حد نصاب مطلوب فراجا"}
                    </span>
                  )}
                />
                <Area 
                  type="monotone" 
                  dataKey="employeeScore" 
                  stroke="#4338ca" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEmployee)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="stationAvg" 
                  stroke="#059669" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#colorStation)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="farajaTarget" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={false}
                />
              </AreaChart>
            ) : selectedMetric === "response" ? (
              <LineChart data={HISTORICAL_PRODUCTIVITY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: any) => [`${value} دقیقه`, "میانگین زمان رسیدن به صحنه"]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", direction: "rtl", textAlign: "right" }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={() => (
                    <span className="text-xs font-bold text-slate-700">
                      زمان رسیدن به صحنه ماموریت ۱۱۰ (دقیقه - نمودار کاهشی نشان‌دهنده چابکی بیشتر است)
                    </span>
                  )}
                />
                <ReferenceLine y={5} label="سقف مجاز واکنش (۵ دقیقه)" stroke="#ef4444" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="responseTimeMinutes" 
                  stroke="#0891b2" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#0891b2" }}
                />
              </LineChart>
            ) : (
              <BarChart data={HISTORICAL_PRODUCTIVITY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: any) => [`${value} فقره`, "تعداد کشف و توقیف شیفت"]}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", direction: "rtl", textAlign: "right" }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={() => (
                    <span className="text-xs font-bold text-slate-700">
                      تعداد سرقت‌های کشف‌شده و موتورسیکلت‌های مخدوش توقیف‌شده
                    </span>
                  )}
                />
                <Bar 
                  dataKey="theftDiscoveredCount" 
                  fill="#059669" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Detailed Competency Evolution List */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              رشد شایستگی‌ها به تفکیک مهارت‌های تخصصی گشت موتوری (مقایسه سال ۱۴۰۴ با ۱۴۰۵)
            </span>
            <span className="text-[11px] text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded">
              همه شاخص‌ها مثبت و فزاینده
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPETENCY_GROWTH_BREAKDOWN.map((comp, idx) => (
              <div key={idx} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{comp.name}</span>
                  <span className="text-xs font-black font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {comp.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>سال گذشته: {comp.baseline}</span>
                  <span className="font-bold text-indigo-700">اکنون: {comp.current}٪</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${comp.current}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
