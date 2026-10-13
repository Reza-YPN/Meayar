import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Layers,
  PieChart as PieIcon,
  Activity,
  Compass,
  Sparkles,
  TrendingUp,
  MapPin,
  Building,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Shield,
  Sliders,
  DollarSign,
  Users,
  Award,
  Calendar,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import {
  FARAJA_PROVINCES_DATA,
  RANDOM_FOREST_FEATURE_IMPORTANCE,
  STATISTICAL_INSIGHTS,
  PILOT_ROADMAP_PHASES,
  TransferApplication,
  EarlyWarningPersonnel
} from '../../data/transfersData';

interface Props {
  applications: TransferApplication[];
  personnelEws: EarlyWarningPersonnel[];
  onApproveApplication: (appId: string) => void;
}

export function ManagerTransferDSSView({
  applications,
  personnelEws,
  onApproveApplication
}: Props) {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [budgetAllocationHousing, setBudgetAllocationHousing] = useState(65); // percentage to housing vs mission allowance
  const [activePilotTab, setActivePilotTab] = useState<'levels' | 'roadmap' | 'commission'>('levels');

  // Chart data for Descriptive (Level 1)
  const satisfactionComparisonData = [
    { category: 'دارای مسکن سازمانی', score: 4.2, color: '#10b981', note: 'رضایت مطلوب' },
    { category: 'فاقد مسکن سازمانی', score: 2.9, color: '#f43f5e', note: 'افت بحرانی ۳۱٪' },
  ];

  // Chart data for Regression / Diagnostic (Level 2)
  const regressionFactorsData = [
    { factor: 'نداشتن مسکن سازمانی', beta: -0.37, fill: '#ef4444', desc: 'اثر منفی شدید بر رضایت' },
    { factor: 'فاصله جغرافیایی از خانواده', beta: -0.28, fill: '#f59e0b', desc: 'خستگی و آسیب به کانون خانواده' },
    { factor: 'افزایش مزایای نقدی و مأموریت', beta: 0.21, fill: '#3b82f6', desc: 'اثر مثبت کمتر نسبت به مسکن' },
    { factor: 'شفافیت فرآیند و سامانه یکپارچه', beta: 0.19, fill: '#10b981', desc: 'افزایش احساس عدالت سازمانی' },
  ];

  // Simulated quit rate reduction based on budget allocation (Level 5)
  const simulatedQuitRateReduction = Math.round(20 + (budgetAllocationHousing * 0.15));
  const simulatedSatisfactionBoost = Math.round(18 + (budgetAllocationHousing * 0.2));

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-l from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-3xl border border-slate-700 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                مرکز تحقیقات کاربردی معاونت نیروی انسانی فراجا
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black px-3 py-1 rounded-lg">
                سامانه پشتیبان تصمیم‌گیری (DSS)
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              تحول نظام انتقالات فراجا: گذار از مدیریت واکنشی به تصمیم‌سازی هوشمند
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-4xl leading-relaxed font-medium">
              «هوش مصنوعی جایگزین تصمیم انسانی نیست، بلکه یار تصمیم‌ساز فرماندهان برای بهینه‌سازی منابع و صیانت از باارزش‌ترین دارایی فراجا یعنی سرمایه انسانی است.»
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700 shrink-0">
            <button
              onClick={() => setActivePilotTab('levels')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activePilotTab === 'levels'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              مدل تحلیلی پنج‌گانه
            </button>
            <button
              onClick={() => setActivePilotTab('roadmap')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activePilotTab === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              نقشه راه ۲۴ ماهه پایلوت
            </button>
            <button
              onClick={() => setActivePilotTab('commission')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activePilotTab === 'commission'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              مصوبات کمیسیون عالی ({applications.filter(a => a.status === 'dss_prescribed').length})
            </button>
          </div>
        </div>
      </div>

      {activePilotTab === 'levels' && (
        <div className="space-y-6">
          {/* Level Switcher (Pyramid Navigation from Slide 6) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold">
              <button
                onClick={() => setActiveLevel(1)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col items-center gap-1 ${
                  activeLevel === 1
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">سطح ۱</span>
                <span className="font-black text-xs">توصیفی (Descriptive)</span>
                <span className="text-[9px] opacity-75">چه اتفاقی افتاده؟</span>
              </button>

              <button
                onClick={() => setActiveLevel(2)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col items-center gap-1 ${
                  activeLevel === 2
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">سطح ۲</span>
                <span className="font-black text-xs">تشخیصی (Diagnostic)</span>
                <span className="text-[9px] opacity-75">چرا این اتفاق افتاد؟</span>
              </button>

              <button
                onClick={() => setActiveLevel(3)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col items-center gap-1 ${
                  activeLevel === 3
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">سطح ۳</span>
                <span className="font-black text-xs">مقایسه‌ای (Comparative)</span>
                <span className="text-[9px] opacity-75">الگوهای برتر کدامند؟</span>
              </button>

              <button
                onClick={() => setActiveLevel(4)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col items-center gap-1 ${
                  activeLevel === 4
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">سطح ۴</span>
                <span className="font-black text-xs">پیش‌بینی‌کننده (Predictive)</span>
                <span className="text-[9px] opacity-75">چه خواهد شد؟ (ML)</span>
              </button>

              <button
                onClick={() => setActiveLevel(5)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col items-center gap-1 ${
                  activeLevel === 5
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">سطح ۵</span>
                <span className="font-black text-xs">تجویزی (Prescriptive)</span>
                <span className="text-[9px] opacity-75">چه باید بکنیم؟ (DSS)</span>
              </button>
            </div>
          </div>

          {/* Level 1: Descriptive (توصیفی) */}
          {activeLevel === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                      <PieIcon className="w-5 h-5 text-indigo-600" />
                      سطح ۱: تحلیل توصیفی (چه اتفاقی افتاده است؟)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      خروجی کلیدی: نقشه حرارتی متمرکز در مناطق جنوبی و مرزی + سنجش شکاف رضایت شغلی ناشی از مسکن سازمانی
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    یافته تجربی سند فراجا
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Satisfaction gap chart */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-black text-xs text-slate-800">
                      تأثیر مسکن سازمانی بر میانگین رضایت شغلی پرسنل (مقیاس ۱ تا ۵)
                    </h4>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={satisfactionComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="category" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                          <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
                          <Tooltip
                            formatter={(value: any) => [`${value} از ۵`, 'شاخص رضایت']}
                            contentStyle={{ direction: 'rtl', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                          />
                          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                            {satisfactionComparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      💡 <strong>یافته کلیدی:</strong> میانگین رضایت در کارکنانی که منزل سازمانی دریافت کرده‌اند <strong>۴.۲</strong> در مقابل <strong>۲.۹</strong> (بیش از ۳۰٪ بالاتر) است.
                    </p>
                  </div>

                  {/* Frequency of challenges distribution */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-black text-xs text-slate-800">
                      فراوانی ریشه‌ای‌ترین چالش‌های اعلام‌شده توسط پرسنل متقاضی
                    </h4>
                    <div className="space-y-2.5">
                      {STATISTICAL_INSIGHTS.challengesDistribution.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-800">{item.title}</span>
                            <span className="text-indigo-700 font-black">{item.frequency}٪</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.category === 'سازمانی' ? 'bg-indigo-600' : 'bg-amber-500'
                              }`}
                              style={{ width: `${item.frequency * 2}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-200">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> چالش‌های سازمانی (ساختار و منابع)</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> چالش‌های فردی (شرایط انسانی و دوری)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Level 2: Diagnostic (تشخیصی) */}
          {activeLevel === 2 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    سطح ۲: تحلیل تشخیصی (چرا این اتفاق افتاد؟)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    خروجی کلیدی: مدل رگرسیون چندمتغیره عوامل علّی و کشف اثر متقابل مسکن سازمانی در برابر افزایش نقدی مزایا
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl">
                  ضرایب بتای استاندارد رگرسیون
                </span>
              </div>

              {/* Regression Chart */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-black text-xs text-slate-800">
                  ضرایب اثر رگرسیون علّی بر شاخص رضایت و ماندگاری پرسنل (Beta Coefficients)
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={regressionFactorsData}
                      margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[-0.5, 0.4]} tick={{ fontSize: 11 }} />
                      <YAxis dataKey="factor" type="category" width={180} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                      <Tooltip
                        formatter={(value: any) => [`ضریب Beta: ${value}`, 'میزان تأثیر علّی']}
                        contentStyle={{ direction: 'rtl', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="beta" radius={[4, 4, 4, 4]}>
                        {regressionFactorsData.map((entry, index) => (
                          <Cell key={`cell-reg-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-4 text-xs space-y-1">
                  <h5 className="font-black text-amber-950 text-sm">
                    پیام راهبردی برای فرماندهی فراجا:
                  </h5>
                  <p className="text-amber-900 font-medium leading-relaxed">
                    مدل نشان می‌دهد که <strong>نداشتن منزل سازمانی (β = -0.37) تأثیری تقریباً دو برابر افزایش مزایای مالی (β = +0.21) بر کاهش رضایت شغلی دارد.</strong> سرمایه‌گذاری در مسکن سازمانی، بازدهی و ماندگاری بسیار بیشتری نسبت به افزایش مستقیم مزایای نقدی دارد.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Level 3: Comparative (مقایسه‌ای - الگوهای برتر) */}
          {activeLevel === 3 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-600" />
                    سطح ۳: تحلیل مقایسه‌ای (الگوهای برتر و بهترین تجارب Best Practices)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    مقایسه عملکرد استان‌های پایلوت فراجا و استخراج روش‌های موفق بومی جهت تعمیم به سراسر کشور
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                  داده‌های تجربی استان‌ها
                </span>
              </div>

              {/* Table of Provinces from Slide 8 */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900 text-white font-black">
                    <tr>
                      <th className="p-3.5 rounded-tr-2xl">استان</th>
                      <th className="p-3.5 text-center">زمان انتقال (روز)</th>
                      <th className="p-3.5 text-center">شاخص رضایت (۱-۵)</th>
                      <th className="p-3.5 text-center">نرخ شکایت (٪)</th>
                      <th className="p-3.5 text-center">نرخ ترک خدمت (٪)</th>
                      <th className="p-3.5 rounded-tl-2xl">یافته کیفی و الگوی موفق</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {FARAJA_PROVINCES_DATA.map((prov, index) => (
                      <tr
                        key={prov.id}
                        className={
                          prov.id === 'tehran'
                            ? 'bg-emerald-50/70 hover:bg-emerald-100/50'
                            : prov.id === 'kermanshah'
                            ? 'bg-amber-50/70 hover:bg-amber-100/50'
                            : prov.id === 'sistan'
                            ? 'bg-rose-50/70 hover:bg-rose-100/50'
                            : 'hover:bg-slate-50'
                        }
                      >
                        <td className="p-3.5 font-black text-slate-900">{prov.name}</td>
                        <td className="p-3.5 text-center font-mono font-black text-sm">{prov.avgTransferDays} روز</td>
                        <td className="p-3.5 text-center font-mono font-black text-sm">{prov.satisfactionScore}</td>
                        <td className="p-3.5 text-center font-mono font-black text-sm">{prov.complaintRate}٪</td>
                        <td className="p-3.5 text-center font-mono font-black text-sm">{prov.quitRate}٪</td>
                        <td className="p-3.5 text-[11px] text-slate-700 leading-relaxed font-bold">
                          {prov.bestPracticeNotes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-950 space-y-1">
                <h5 className="font-black text-sm">پیام مدیریتی سند:</h5>
                <p className="font-medium leading-relaxed">
                  به جای سیاست‌های یکسان، باید الگوهای موفق بومی را شناسایی و در سراسر کشور تکثیر کنیم. تحلیل کیفی نشان می‌دهد استان‌های موفق (مانند تهران و فارس) دارای سامانه الکترونیکی یکپارچه، حمایت مستقیم فرماندهی و بودجه خاص مسکن هستند.
                </p>
              </div>
            </div>
          )}

          {/* Level 4: Predictive (پیش‌بینی‌کننده با یادگیری ماشین) */}
          {activeLevel === 4 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    سطح ۴: تحلیل پیش‌بینی‌کننده (با یادگیری ماشین Random Forest)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    پیش‌بینی فعالانه ریسک نارضایتی یا ترک خدمت برای هر پرسنل پیش از وقوع بحران
                  </p>
                </div>
                <span className="text-xs font-black text-white bg-indigo-600 px-3 py-1 rounded-xl">
                  مدل هوش مصنوعی فراجا
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Feature Importance Chart (Slide 9) */}
                <div className="lg:col-span-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-black text-xs text-slate-900">
                    خروجی ۱: نمودار اهمیت ویژگی‌ها (Feature Importance)
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={RANDOM_FOREST_FEATURE_IMPORTANCE}
                        margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 11 }} />
                        <YAxis dataKey="feature" type="category" width={150} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                        <Tooltip
                          formatter={(val: any) => [`${val}٪`, 'وزن اهمیت']}
                          contentStyle={{ direction: 'rtl', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="importance" radius={[4, 4, 4, 4]}>
                          {RANDOM_FOREST_FEATURE_IMPORTANCE.map((entry, index) => (
                            <Cell key={`cell-feat-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    دسترسی به مسکن سازمانی با <strong>۳۱٪ وزن اهمیت</strong>، قوی‌ترین متغیر پیش‌بینی‌کننده تصمیم به ماندگاری پرسنل است.
                  </p>
                </div>

                {/* Individual Risk Scoring Table (Slide 9) */}
                <div className="lg:col-span-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-black text-xs text-slate-900">
                    خروجی ۲: جدول امتیازدهی ریسک فردی (نظام هشدار زودهنگام EWS)
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {personnelEws.map(p => (
                      <div key={p.personnelId} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900">{p.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">#{p.personnelId}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">{p.currentProvince} ← {p.requestedProvince}</span>
                        </div>

                        <div className="text-left flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-slate-800">{p.quitRiskProbability}٪</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                            p.riskLevel === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : p.riskLevel === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.riskLevel === 'high' ? 'بالا' : p.riskLevel === 'medium' ? 'متوسط' : 'پایین'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Level 5: Prescriptive (تجویزی و بهینه‌سازی بودجه) */}
          {activeLevel === 5 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-indigo-600" />
                    سطح ۵: تحلیل تجویزی (مدل‌های بهینه‌سازی، شبیه‌سازی و تخصیص هوشمند بودجه)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    حرکت از سیاست «یک نسخه برای همه» به سمت مداخلات شخصی‌سازی‌شده و هدفمند که بیشترین بازدهی را ایجاد می‌کنند
                  </p>
                </div>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
                  شبیه‌ساز تخصیص بهینه منابع
                </span>
              </div>

              {/* Prescriptive Policy Matrix (Slide 10) */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900 text-white font-black">
                    <tr>
                      <th className="p-3.5 rounded-tr-2xl">سطح ریسک فرد</th>
                      <th className="p-3.5">اقدام پیشنهادی تجویزی DSS</th>
                      <th className="p-3.5 text-center rounded-tl-2xl">هزینه مداخله (میلیون تومان)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="bg-rose-50/70">
                      <td className="p-3.5 font-black text-rose-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        ریسک بالا (۸۴٪ - ۸۵٪)
                      </td>
                      <td className="p-3.5 font-black text-slate-900">
                        اولویت فوری در اعطای منزل سازمانی در مقصد یا انتقال قطعی به زادگاه
                      </td>
                      <td className="p-3.5 text-center font-mono font-black text-sm text-slate-900">
                        ۸ میلیون تومان
                      </td>
                    </tr>
                    <tr className="bg-amber-50/70">
                      <td className="p-3.5 font-black text-amber-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        ریسک متوسط (۴۲٪ - ۵۶٪)
                      </td>
                      <td className="p-3.5 font-black text-slate-900">
                        افزایش ۱۵٪ مزایای مأموریت، پرداخت فوق‌العاده دوری و ودیعه حکمت
                      </td>
                      <td className="p-3.5 text-center font-mono font-black text-sm text-slate-900">
                        ۵ میلیون تومان
                      </td>
                    </tr>
                    <tr className="bg-emerald-50/70">
                      <td className="p-3.5 font-black text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        ریسک پایین (۱۷٪ - ۲۲٪)
                      </td>
                      <td className="p-3.5 font-medium text-slate-700">
                        بدون اقدام خاص؛ رسیدگی در روال عادی سنواتی کمیسیون
                      </td>
                      <td className="p-3.5 text-center font-mono font-black text-sm text-slate-900">
                        ۰ (بدون هزینه)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Interactive Budget Allocation Simulator (Slide 10) */}
              <div className="p-5 bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 rounded-2xl border border-indigo-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs text-indigo-950 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    شبیه‌ساز هوشمند بازدهی بودجه فراجا (تخصیص مسکن vs مزایای نقدی):
                  </h4>
                  <span className="text-xs font-mono font-black text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200">
                    سهم مسکن: {budgetAllocationHousing}٪ | سهم مزایا: {100 - budgetAllocationHousing}٪
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min={20}
                    max={90}
                    value={budgetAllocationHousing}
                    onChange={(e) => setBudgetAllocationHousing(Number(e.target.value))}
                    className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>تمرکز بیشتر بر مزایای نقدی (بازدهی کمتر)</span>
                    <span>سیاست پیشنهادی سند: تمرکز بر ساخت/تخصیص مسکن (بازدهی حداکثری)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">کاهش پیش‌بینی‌شده نرخ ترک خدمت:</span>
                    <span className="text-sm font-black text-emerald-700">-{simulatedQuitRateReduction}٪</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">ارتقای شاخص رضایت پرسنل:</span>
                    <span className="text-sm font-black text-indigo-700">+{simulatedSatisfactionBoost}٪</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 24-Month Roadmap & Pilot (Slide 13 & 14) */}
      {activePilotTab === 'roadmap' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                نقشه راه عملی و فازبندی‌شده تحول نظام انتقالات (طرح ۲۴ ماهه)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                پیشنهاد مرکز تحقیقات کاربردی برای تضمین موفقیت و مدیریت ریسک‌های اجرایی
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
              مصوب دی ماه ۱۴۰۴
            </span>
          </div>

          {/* 3 Phases Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILOT_ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.phase}
                className={`p-5 rounded-2xl border space-y-3 ${
                  phase.status === 'completed'
                    ? 'bg-slate-50 border-slate-200'
                    : phase.status === 'in_progress'
                    ? 'bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-mono">
                    فاز {phase.phase}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">{phase.duration}</span>
                </div>

                <h4 className="font-black text-sm text-slate-900">{phase.title}</h4>
                <span className="text-[11px] font-bold text-indigo-700 block">{phase.timeframe}</span>

                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {phase.metrics && (
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1.5 pt-2 text-[11px] font-bold">
                    <span className="text-indigo-900 block font-black">اهداف کلیدی و قابل اندازه‌گیری پایلوت:</span>
                    <div className="flex justify-between text-slate-700">
                      <span>کاهش زمان انتقال:</span>
                      <span className="text-emerald-700 font-black">{phase.metrics.reducedTimePercent}٪-</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>دقت مدل پیش‌بینی (AUC):</span>
                      <span className="text-indigo-700 font-black">بالای {phase.metrics.aucAccuracyPercent}٪</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>افزایش شاخص رضایت:</span>
                      <span className="text-emerald-700 font-black">{phase.metrics.satisfactionBoostPercent}٪+</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pilot 3 Provinces Showcase (Slide 14) */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-black text-xs text-slate-900">
              ویژگی‌های سه استان منتخب در برنامه پایلوت:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">استان مرکزی</span>
                <span className="text-slate-500 font-medium block">تست فرآیندهای حجیم و متمرکز صنعتی</span>
                <span className="text-[10px] text-indigo-700 font-bold">میزبانی فاز ۲ پایلوت</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">استان مرزی پرچالش (سیستان)</span>
                <span className="text-slate-500 font-medium block">تست مدل در شرایط سخت و اقلیمی نامساعد</span>
                <span className="text-[10px] text-rose-600 font-bold">آزمون سخت مدل پیش‌بینی</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="font-black text-slate-900 block">استان با شرایط متوسط</span>
                <span className="text-slate-500 font-medium block">اعتبارسنجی مدل در شرایط نرمال سازمانی</span>
                <span className="text-[10px] text-emerald-700 font-bold">تعمیم‌پذیری کشوری</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commission Approvals Tab */}
      {activePilotTab === 'commission' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                کارتابل تصویب نهایی کمیسیون عالی انتقالات فراجا
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                بررسی بسته‌های تجویزی سامانه تصمیم‌یار و صدور احکام قطعی جابجایی
              </p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-xl">
              تعداد آماده ابلاغ: {applications.filter(a => a.status === 'dss_prescribed').length} پرونده
            </span>
          </div>

          <div className="space-y-3">
            {applications.filter(a => a.status === 'dss_prescribed').map(app => (
              <div
                key={app.id}
                className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/30 flex items-center justify-between flex-wrap gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">{app.fullName} ({app.rank})</span>
                    <span className="text-xs font-mono text-slate-500">#{app.trackingCode}</span>
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded">
                      ریسک: {app.riskScore}٪
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    مسیر: <strong>{app.currentProvince}</strong> ← <strong className="text-indigo-700">{app.targetProvince}</strong>
                  </div>
                  <div className="text-xs text-indigo-900 font-bold bg-white p-2 rounded-lg border border-indigo-100">
                    💡 اقدام پیشنهادی تجویزی: {app.recommendedPrescription}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onApproveApplication(app.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأیید و ابلاغ حکم کمیسیون</span>
                  </button>
                </div>
              </div>
            ))}

            {applications.filter(a => a.status === 'dss_prescribed').length === 0 && (
              <div className="p-8 text-center text-slate-400 font-bold text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                در حال حاضر پرونده آماده ابلاغی وجود ندارد.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
