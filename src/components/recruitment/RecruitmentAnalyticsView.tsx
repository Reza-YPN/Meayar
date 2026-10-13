import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell, 
  PieChart, 
  Pie, 
  Legend, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  FARAJA_FUNNEL_DATA, 
  UNIT_CAPACITIES, 
  MEDICAL_FAILURE_CAUSES,
  Candidate 
} from '../../data/recruitmentData';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  HeartPulse, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  Award
} from 'lucide-react';

interface RecruitmentAnalyticsViewProps {
  candidates: Candidate[];
}

export function RecruitmentAnalyticsView({ candidates }: RecruitmentAnalyticsViewProps) {
  // Chart data for funnel
  const funnelChartData = FARAJA_FUNNEL_DATA.map(f => ({
    name: f.stage.replace(' و ', '\n'),
    count: f.count,
    rate: f.passRate
  }));

  // Target unit capacities vs filled
  const unitChartData = UNIT_CAPACITIES.map(u => ({
    name: u.name,
    ظرفیت_ابلاغی: u.targetCapacity,
    جذب_شده: u.filledCount,
    درصد: Math.round((u.filledCount / u.targetCapacity) * 100)
  }));

  // Medical causes chart
  const medicalData = MEDICAL_FAILURE_CAUSES.map(m => ({
    name: m.cause.split('(')[0],
    درصد: m.percentage
  }));

  const COLORS = ['#dc2626', '#ea580c', '#d97706', '#2563eb', '#64748b'];

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Banner with Analytical KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">نرخ غربالگری نهایی فراجا</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">۱۸.۴٪</span>
            <span className="text-[11px] text-emerald-600 font-bold">گزینش کیفی ممتاز</span>
          </div>
          <p className="text-[11px] text-slate-500">از هر ۵.۴ داوطلب، ۱ نفر موفق به احراز صلاحیت نهایی می‌شود.</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">پوشش سهمیه مناطق مرزی</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-900 font-mono">۷۴٪</span>
            <span className="text-[11px] text-indigo-600 font-bold">۱۸۵ از ۲۵۰ نفر</span>
          </div>
          <p className="text-[11px] text-slate-500">اولویت ویژه فرماندهی فراجا در تأمین کادر مرزبانی شرق و غرب کشور.</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">ریزش در فیلتر بهداری</span>
            <HeartPulse className="w-4 h-4 text-rose-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-700 font-mono">۳۴٪</span>
            <span className="text-[11px] text-rose-600 font-bold">سخت‌گیرانه‌ترین مرحله</span>
          </div>
          <p className="text-[11px] text-slate-500">بینایی و نقص اسکلتی عمده‌ترین دلایل عدم انطباق با ضوابط بهداری فراجا هستند.</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">سهمیه‌داران ممتاز و قرآنی</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-700 font-mono">۲۸٪</span>
            <span className="text-[11px] text-amber-600 font-bold">ایثارگر و حافظان</span>
          </div>
          <p className="text-[11px] text-slate-500">اعمال حداکثری تسهیلات قانونی ماده ۳۶ قانون استخدام فراجا.</p>
        </div>
      </div>

      {/* Row 1: Funnel & Capacities Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-slate-900">نمودار ریزش داوطلبان در مراحل هفت‌گانه گزینش</h4>
              <p className="text-xs text-slate-500">پایش خط سیر ۳,۴۸۰ داوطلب از ورودی تا پذیرش نهایی</p>
            </div>
            <span className="text-xs font-black bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-lg">دوره ۱۴۰۴</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelChartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value: any) => [`${Number(value).toLocaleString('fa-IR')} نفر`, 'تعداد داوطلب']}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="count" fill="#3730a3" radius={[8, 8, 0, 0]}>
                  {funnelChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#312e81' : index === 6 ? '#059669' : '#4338ca'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-500 text-center font-medium bg-slate-50 p-2 rounded-xl">
            بیشترین ریزش داوطلبان به ترتیب در مراحل <strong className="text-slate-800">معاینات بهداری فراجا</strong> و <strong className="text-slate-800">آزمون علمی ورودی</strong> رخ داده است.
          </div>
        </div>

        {/* Unit target capacity vs filled */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-slate-900">توزیع سهمیه جذب بر اساس رده‌های نیازمند فراجا</h4>
              <p className="text-xs text-slate-500">مقایسه سهمیه مصوب ستاد کل با تعداد پذیرفته‌شدگان قطعی</p>
            </div>
            <span className="text-xs font-black bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg">سهمیه‌ها</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value: any, name: any) => [`${value} نفر`, name === 'ظرفیت_ابلاغی' ? 'ظرفیت ابلاغی' : 'جذب‌شده']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="ظرفیت_ابلاغی" fill="#94a3b8" radius={[6, 6, 0, 0]} name="ظرفیت ابلاغی ستاد کل" />
                <Bar dataKey="جذب_شده" fill="#2563eb" radius={[6, 6, 0, 0]} name="گزینش‌شده قطعی" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-500 text-center font-medium bg-slate-50 p-2 rounded-xl">
            رده <strong className="text-slate-800">فرماندهی مرزبانی</strong> با ۱۸۵ نفر بیشترین سهم از جذب نیروهای جدیدالورود را به خود اختصاص داده است.
          </div>
        </div>
      </div>

      {/* Row 2: Medical Failures & Policy Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical Causes Pie */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-slate-900">تحلیل ریشه‌ای علل عدم انطباق پزشکی (بهداری کل فراجا)</h4>
              <p className="text-xs text-slate-500">پراکندگی عوامل رد صلاحیت در معاینات تخصصی</p>
            </div>
            <HeartPulse className="w-5 h-5 text-rose-600" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={medicalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="درصد"
                  nameKey="name"
                >
                  {medicalData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val}٪`, 'درصد فراوانی']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Managerial Policy Directive Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-black text-emerald-300">دستورالعمل نظارتی فرماندهی جذب و گزینش فراجا</span>
            </div>
            <h3 className="text-base font-black leading-snug">
              سیاست‌های ۵ گانه مصوب هیئت رئیسه در فرآیند استخدام سال ۱۴۰۴
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              جهت پیشگیری از ترک خدمت در سال‌های اولیه و ارتقای شایسته‌سالاری، اصول زیر باید در ارزیابی تمامی داوطلبان رعایت شود:
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-white/10 p-3 rounded-2xl flex items-start gap-2.5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>بومی‌گزینی هدفمند:</strong> حداقل ۶۵٪ داوطلبان مرزبانی و یگان‌های عملیاتی باید از میان متولدین استان‌های مقصد پذیرش شوند.</span>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl flex items-start gap-2.5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>سخت‌گیری سلامت روان:</strong> آزمون MMPI و مصاحبه بالینی روانشناسی برای یگان ویژه و مرزبانی غیرقابل اغماض است.</span>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl flex items-start gap-2.5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>تسهیلات نخبگان و حافظان قرآن:</strong> برخورداری از ۱۰٪ امتیاز تشویقی در تراز علمی و آزمون آمادگی جسمانی.</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-white/10">
            <span>مرکز گزینش و استخدام معاونت نیروی انسانی فراجا</span>
            <span className="font-mono text-emerald-400">سند محرمانه گزینش</span>
          </div>
        </div>
      </div>
    </div>
  );
}
