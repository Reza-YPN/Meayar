import React, { useState } from 'react';
import { ProvinceGISData } from '../../data/geographicAnalyticsData';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Home, 
  ArrowUpRight, 
  CheckCircle2, 
  Flame, 
  Send, 
  UserCheck, 
  Clock 
} from 'lucide-react';

interface StrategicGISAlertsProps {
  provinces: ProvinceGISData[];
  onSelectProvince: (province: ProvinceGISData) => void;
}

export const StrategicGISAlerts: React.FC<StrategicGISAlertsProps> = ({
  provinces,
  onSelectProvince
}) => {
  const [issuedDirective, setIssuedDirective] = useState<string | null>(null);

  // Critical Shortage Provinces
  const criticalShortage = provinces.filter(p => p.personnel.balanceStatus === 'کمبود بحرانی' || p.personnel.fillRate < 84);
  
  // Severe Housing / Family Separation
  const housingDeficit = provinces.filter(p => p.transfers.familySeparationCount > 3000 || p.transfers.housingCoverageRate < 45);

  // High Hardship Border Provinces
  const borderSpecialTier = provinces.filter(p => p.operationalTier.includes('رده الف'));

  // Top Performing Benchmark Provinces
  const topPerformers = [...provinces].sort((a, b) => b.performance.overallScore - a.performance.overallScore).slice(0, 4);

  const handleIssueDirective = (title: string) => {
    setIssuedDirective(`ابلاغیه ستادی «${title}» با شماره عطف فراجا/۱۴۰۳/۸۸ با موفقیت در سامانه اتوماسیون ثبت و به فرماندهی استان ارسال شد.`);
    setTimeout(() => setIssuedDirective(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Alert Header Notification */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-amber-950">
              سامانه هشدار زودهنگام توزیع جغرافیایی سرمایه انسانی (GIS Early Warning)
            </h4>
            <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
              این پایشگاه به صورت هوشمند کسری نیرو، مهاجرت معکوس پرسنل از استان‌های عملیاتی و فشار معیشتی مسکن را تحلیل کرده و برای اتخاذ تدابیر فوری به فرماندهی کل فراجا گزارش می‌دهد.
            </p>
          </div>
        </div>
      </div>

      {issuedDirective && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {issuedDirective}
        </div>
      )}

      {/* Grid of Alert Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Panel 1: Critical Personnel Deficit */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              استان‌های دارای کسری حاد پرسنل نسبت به چارت
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
              {criticalShortage.length} استان بحرانی
            </span>
          </div>

          <div className="space-y-3">
            {criticalShortage.map(p => {
              const vacancyCount = p.personnel.sanctionedPosts - p.personnel.totalPersonnel;
              return (
                <div 
                  key={p.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onSelectProvince(p)}
                      className="font-bold text-xs text-slate-900 hover:text-indigo-600 flex items-center gap-1.5"
                    >
                      <span>{p.persianName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <span className="text-xs font-mono font-bold text-rose-600">
                      کسری: {vacancyCount.toLocaleString('fa-IR')} پست
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>درصد پرشدگی چارت: <strong className="text-slate-800 font-mono">{p.personnel.fillRate}٪</strong></span>
                    <span>سهمیه جذب سالانه: <strong className="text-slate-800 font-mono">{p.recruitment.annualQuota.toLocaleString('fa-IR')} نفر</strong></span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] text-slate-400">رسته نیازمند: {p.recruitment.criticalVacancies[0]}</span>
                    <button
                      onClick={() => handleIssueDirective(`تخصیص سهمیه اضطراری به ${p.persianName}`)}
                      className="text-[10px] px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      تخصیص سهمیه اضطراری
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel 2: Housing Shortage & Family Separation */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Home className="w-4 h-4 text-amber-600" />
              بحران مسکن سازمانی و پرسنل غیربومی دور از خانواده
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">
              فشار معیشتی
            </span>
          </div>

          <div className="space-y-3">
            {housingDeficit.slice(0, 4).map(p => (
              <div 
                key={p.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onSelectProvince(p)}
                    className="font-bold text-xs text-slate-900 hover:text-indigo-600 flex items-center gap-1.5"
                  >
                    <span>{p.persianName}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <span className="text-xs font-mono font-bold text-amber-700">
                    {p.transfers.familySeparationCount.toLocaleString('fa-IR')} نفر دور از خانواده
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>پوشش خانه سازمانی: <strong className="text-slate-800 font-mono">{p.transfers.housingCoverageRate}٪</strong></span>
                  <span>میانگین سال انتظار: <strong className="text-rose-600 font-mono">{p.transfers.avgWaitYearsForHouse} سال</strong></span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">تراز جابجایی خالص: {p.transfers.netBalance} نفر</span>
                  <button
                    onClick={() => handleIssueDirective(`تسهیلات ودیعه مسکن و احداث در ${p.persianName}`)}
                    className="text-[10px] px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Home className="w-3 h-3" />
                    ابلاغ ودیعه مسکن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: High Hardship Border Readiness */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Flame className="w-4 h-4 text-rose-600" />
              پایش آمادگی رزمی استان‌های رده الف (مرزی و عملیاتی ویژه)
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
              ضریب سختی ۱.۶۵+
            </span>
          </div>

          <div className="space-y-3">
            {borderSpecialTier.map(p => (
              <div 
                key={p.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {p.persianName}
                    <span className="text-[10px] font-mono text-amber-700 font-bold">
                      (ضریب: {p.hardshipCoefficient.toFixed(2)})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    نمره تیراندازی: <strong className="text-emerald-700 font-mono">{p.competency.tacticalShootingScore}</strong> | آموزش: <strong className="text-indigo-700 font-mono">{p.training.perCapitaHours} ساعت</strong>
                  </div>
                </div>

                <div className="text-left">
                  <button
                    onClick={() => onSelectProvince(p)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-indigo-600 hover:text-white text-slate-700 transition-colors font-medium"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 4: Best-Practice Benchmarks */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              فرماندهی‌های پیشرو در رضایت مردمی و بهره‌وری سازمانی
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
              الگوهای موفق فراجا
            </span>
          </div>

          <div className="space-y-3">
            {topPerformers.map(p => (
              <div 
                key={p.id}
                className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {p.persianName}
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono">
                      نمره: {p.performance.overallScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    رضایت ۱۹۷: <strong className="text-emerald-700 font-mono">{p.performance.publicSatisfaction197}٪</strong> | زمان ۱۱۰: <strong className="text-indigo-700 font-mono">{p.performance.responseSpeedMinutes} دقیقه</strong>
                  </div>
                </div>

                <button
                  onClick={() => onSelectProvince(p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium"
                >
                  داشبورد استان
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
