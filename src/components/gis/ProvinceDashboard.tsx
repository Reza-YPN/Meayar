import React, { useState } from 'react';
import { ProvinceGISData } from '../../data/geographicAnalyticsData';
import { 
  Users, 
  Award, 
  Target, 
  UserPlus, 
  ArrowLeftRight, 
  GraduationCap, 
  Home, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Crosshair, 
  Shield, 
  Printer, 
  ChevronLeft, 
  CheckCircle2, 
  FileText,
  Activity,
  Layers,
  PhoneCall,
  Scale
} from 'lucide-react';

interface ProvinceDashboardProps {
  province: ProvinceGISData;
  onCompareWithOthers?: (province: ProvinceGISData) => void;
  onBackToNationalMap?: () => void;
}

export const ProvinceDashboard: React.FC<ProvinceDashboardProps> = ({
  province,
  onCompareWithOthers,
  onBackToNationalMap
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'personnel' | 'performance' | 'competency' | 'recruitment' | 'transfers' | 'training'>('overview');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handlePrintDossier = () => {
    setExportNotice(`گزارش آمایشی و شناسنامه سرمایه انسانی «${province.persianName}» آماده چاپ/صدور PDF شد.`);
    setTimeout(() => setExportNotice(null), 4000);
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Top Province Header Banner */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-white shadow-inner">
              <Shield className="w-7 h-7 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  فرماندهی انتظامی {province.persianName}
                </h2>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                  province.operationalTier.includes('رده الف')
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : province.operationalTier.includes('رده ب')
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {province.operationalTier}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  ضریب سختی: {province.hardshipCoefficient.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
                <span>مرکز استان: <strong className="text-white">{province.centerCity}</strong></span>
                <span>•</span>
                <span>حوزه سرزمینی: <strong className="text-white">{province.region}</strong></span>
                {province.borderLengthKm > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300 font-medium">طول نوار مرزی: {province.borderLengthKm.toLocaleString('fa-IR')} کیلومتر</span>
                  </>
                )}
                <span>•</span>
                <span>وضعیت تراز انسانی: 
                  <strong className={`mr-1 ${
                    province.personnel.balanceStatus === 'کمبود بحرانی' ? 'text-rose-400' :
                    province.personnel.balanceStatus === 'کمبود متوسط' ? 'text-amber-300' : 'text-emerald-400'
                  }`}>
                    {province.personnel.balanceStatus}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            {onCompareWithOthers && (
              <button
                onClick={() => onCompareWithOthers(province)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600/60 hover:bg-indigo-600 text-white border border-indigo-400/40 transition-all flex items-center gap-1.5"
              >
                <Scale className="w-4 h-4" />
                مقایسه با سایر استان‌ها
              </button>
            )}
            <button
              onClick={handlePrintDossier}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              چاپ شناسنامه آمایشی
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {exportNotice}
          </div>
        )}
      </div>

      {/* Navigation Sub-tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'نمای کلی و داشبورد کلان', icon: Activity },
          { id: 'personnel', label: 'سرمایه انسانی و چارت', icon: Users },
          { id: 'performance', label: 'عملکرد سازمانی و ۱۹۷', icon: Award },
          { id: 'competency', label: 'ماتریس شایستگی و تیراندازی', icon: Target },
          { id: 'recruitment', label: 'جذب و بومی‌گزینی', icon: UserPlus },
          { id: 'transfers', label: 'انتقالات و مسکن سازمانی', icon: ArrowLeftRight },
          { id: 'training', label: 'آموزش و آمادگی رزم', icon: GraduationCap },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">

        {/* TAB 1: OVERVIEW */}
        {(activeTab === 'overview') && (
          <div className="space-y-6">
            {/* Top 4 Essential KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>کل پرسنل انتظامی</span>
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                  {province.personnel.totalPersonnel.toLocaleString('fa-IR')}
                  <span className="text-xs font-normal text-slate-500 mr-1">نفر</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                  <span>پست‌های مصوب چارت:</span>
                  <span className="font-semibold text-slate-700 font-mono">
                    {province.personnel.sanctionedPosts.toLocaleString('fa-IR')}
                  </span>
                </div>
                <div className="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${province.personnel.fillRate}%` }}
                  />
                </div>
                <div className="text-[11px] text-indigo-600 font-bold mt-1 text-left font-mono">
                  {province.personnel.fillRate}٪ پرشدگی چارت
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>شاخص عملکرد استانی</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700 mt-2 font-mono">
                  {province.performance.overallScore.toFixed(1)}
                  <span className="text-xs font-normal text-slate-500 mr-1">از ۱۰۰</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                  <span>رضایت مردمی سامانه ۱۹۷:</span>
                  <span className="font-semibold text-emerald-600 font-mono">
                    {province.performance.publicSatisfaction197}٪
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>نرخ کشف جرائم:</span>
                  <span className="font-semibold text-slate-700 font-mono">
                    {province.performance.crimeDetectionRate}٪
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>زمان حضور ۱۱۰:</span>
                  <span className="font-semibold text-indigo-600 font-mono">
                    {province.performance.responseSpeedMinutes} دقیقه
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>میانگین شایستگی و مهارت رزم</span>
                  <Target className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-amber-700 mt-2 font-mono">
                  {province.competency.overallCompetencyScore.toFixed(1)}
                  <span className="text-xs font-normal text-slate-500 mr-1">امتیاز</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                  <span>مهارت تیراندازی عملیاتی:</span>
                  <span className="font-semibold text-amber-700 font-mono">
                    {province.competency.tacticalShootingScore} / ۱۰۰
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>آمادگی جسمانی پرسنل:</span>
                  <span className="font-semibold text-slate-700 font-mono">
                    {province.competency.physicalFitnessScore} / ۱۰۰
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>مدیریت صحنه و بحران:</span>
                  <span className="font-semibold text-indigo-700 font-mono">
                    {province.competency.crisisManagementScore} / ۱۰۰
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>تراز انتقالات و مسکن سازمانی</span>
                  <Home className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl font-black mt-2 font-mono flex items-center gap-2">
                  <span className={province.transfers.netBalance < 0 ? 'text-rose-600' : 'text-emerald-600'}>
                    {province.transfers.netBalance > 0 ? `+${province.transfers.netBalance.toLocaleString('fa-IR')}` : province.transfers.netBalance.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs font-normal text-slate-500">نفر موازنه</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                  <span>پرسنل دور از خانواده:</span>
                  <span className="font-semibold text-rose-600 font-mono">
                    {province.transfers.familySeparationCount.toLocaleString('fa-IR')} نفر
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>پوشش خانه سازمانی:</span>
                  <span className="font-semibold text-slate-700 font-mono">
                    {province.transfers.housingCoverageRate}٪
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>میانگین انتظار مسکن:</span>
                  <span className="font-semibold text-amber-700 font-mono">
                    {province.transfers.avgWaitYearsForHouse} سال
                  </span>
                </div>
              </div>
            </div>

            {/* Strategic Directive Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-indigo-950">
                    تدابیر ستاد کل و جمع‌بندی راهبردی فرماندهی انتظامی استان:
                  </h4>
                  <p className="text-xs text-indigo-900/90 mt-1.5 leading-relaxed">
                    {province.strategicNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Two-Column Deep-dive in Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Unit Distribution Breakdown */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  توزیع ساختار سازمانی در رده‌های تخصصی استان
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'پلیس پیشگیری و کلانتری‌ها', count: province.personnel.unitDistribution.preventionKalantari, color: 'bg-blue-600' },
                    { label: 'مرزبانی و دریابانی', count: province.personnel.unitDistribution.borderGuard, color: 'bg-emerald-600' },
                    { label: 'یگان ویژه پاسداران', count: province.personnel.unitDistribution.specialUnit, color: 'bg-purple-600' },
                    { label: 'پلیس آگاهی (کشف جرم)', count: province.personnel.unitDistribution.criminalInvestigation, color: 'bg-rose-600' },
                    { label: 'پلیس راهور و ترافیک', count: province.personnel.unitDistribution.trafficPolice, color: 'bg-amber-600' },
                    { label: 'پلیس فتا (فضای مجازی)', count: province.personnel.unitDistribution.cyberPolice, color: 'bg-cyan-600' },
                    { label: 'اطلاعات و امنیت عمومی', count: province.personnel.unitDistribution.securityIntelligence, color: 'bg-slate-700' },
                  ].map((unit, idx) => {
                    const percentage = Math.round((unit.count / province.personnel.totalPersonnel) * 100) || 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span className="font-medium text-slate-800">{unit.label}</span>
                          <span className="font-mono text-slate-500">
                            {unit.count.toLocaleString('fa-IR')} نفر ({percentage}٪)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${unit.color}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recruitment & Priority Vacancies */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-indigo-600" />
                    وضعیت جذب و رده‌های اولویت‌دار نیازمند سهمیه فوری
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-500">سهمیه مصوب سالانه</div>
                      <div className="text-lg font-bold text-slate-900 font-mono mt-1">
                        {province.recruitment.annualQuota.toLocaleString('fa-IR')} نفر
                      </div>
                      <div className="text-[11px] text-emerald-600 mt-1 font-mono">
                        جذب قطعی: {province.recruitment.recruitedCount.toLocaleString('fa-IR')} نفر
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-500">درصد بومی‌گزینی</div>
                      <div className="text-lg font-bold text-indigo-700 font-mono mt-1">
                        {province.recruitment.localRecruitmentRate}٪
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        ماندگاری ۵ ساله: {province.recruitment.retentionRateAfter5Years}٪
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 mb-2">
                    رسته‌ها و تخصص‌های دارای کسری حاد در این استان:
                  </div>
                  <div className="space-y-2">
                    {province.recruitment.criticalVacancies.map((vacancy, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-rose-50/70 border border-rose-200/80 text-rose-900">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span className="font-medium">{vacancy}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>سرانه ساعت آموزش سالانه: <strong className="text-slate-800 font-mono">{province.training.perCapitaHours} ساعت</strong></span>
                  <span>رزمایش‌های برگزار شده: <strong className="text-slate-800 font-mono">{province.training.tacticalExercisesCount} مرحله</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONNEL DETAILS */}
        {activeTab === 'personnel' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-xs text-indigo-700 font-medium">افسران ارشد (سرهنگ و بالاتر)</span>
                <div className="text-xl font-black text-indigo-950 font-mono mt-1">
                  {province.personnel.seniorOfficers.toLocaleString('fa-IR')}
                </div>
                <div className="text-[11px] text-indigo-600 mt-1">
                  {Math.round((province.personnel.seniorOfficers / province.personnel.totalPersonnel) * 100)}٪ کل پرسنل
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="text-xs text-blue-700 font-medium">افسران جزء (ستوان تا سرگرد)</span>
                <div className="text-xl font-black text-blue-950 font-mono mt-1">
                  {province.personnel.juniorOfficers.toLocaleString('fa-IR')}
                </div>
                <div className="text-[11px] text-blue-600 mt-1">
                  {Math.round((province.personnel.juniorOfficers / province.personnel.totalPersonnel) * 100)}٪ کل پرسنل
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-xs text-emerald-700 font-medium">درجه‌داران (گروهبان تا استوار)</span>
                <div className="text-xl font-black text-emerald-950 font-mono mt-1">
                  {province.personnel.sergeants.toLocaleString('fa-IR')}
                </div>
                <div className="text-[11px] text-emerald-600 mt-1">
                  {Math.round((province.personnel.sergeants / province.personnel.totalPersonnel) * 100)}٪ کل پرسنل (بدنه اجرایی)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="text-xs text-amber-700 font-medium">سربازان وظیفه عمومی</span>
                <div className="text-xl font-black text-amber-950 font-mono mt-1">
                  {province.personnel.conscripts.toLocaleString('fa-IR')}
                </div>
                <div className="text-[11px] text-amber-600 mt-1">
                  {Math.round((province.personnel.conscripts / province.personnel.totalPersonnel) * 100)}٪ کل پرسنل
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-3">
                تطبیق چارت سازمانی ابلاغی ستاد کل فراجا با ظرفیت فعلی
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                تعداد پست‌های مصوب چارت: {province.personnel.sanctionedPosts.toLocaleString('fa-IR')} پست سازمانی | نیروهای مستقر: {province.personnel.totalPersonnel.toLocaleString('fa-IR')} نفر | کسری: {(province.personnel.sanctionedPosts - province.personnel.totalPersonnel).toLocaleString('fa-IR')} نفر
              </p>
              
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full text-[10px] text-white font-bold flex items-center justify-center font-mono"
                  style={{ width: `${province.personnel.fillRate}%` }}
                >
                  {province.personnel.fillRate}٪ پر شده
                </div>
                <div 
                  className="bg-rose-400 h-full text-[10px] text-white font-bold flex items-center justify-center font-mono"
                  style={{ width: `${100 - province.personnel.fillRate}%` }}
                >
                  {(100 - province.personnel.fillRate).toFixed(1)}٪ کسری
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PERFORMANCE DETAILS */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-500">میانگین زمان رسیدن فوریت‌های ۱۱۰</div>
                <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                  {province.performance.responseSpeedMinutes}
                  <span className="text-xs font-normal text-slate-500 mr-1">دقیقه</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">استاندارد ملی: زیر ۸ دقیقه</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-500">نرخ کشف جرائم پلیس آگاهی</div>
                <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                  {province.performance.crimeDetectionRate}٪
                </div>
                <p className="text-[11px] text-indigo-600 font-medium mt-1">میانگین کشوری: ۸۱.۵٪</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-500">رضایت مردمی از کلانتری‌ها (۱۹۷)</div>
                <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                  {province.performance.publicSatisfaction197}٪
                </div>
                <p className="text-[11px] text-slate-500 mt-1">تعداد شکایات بازرسی: {province.performance.complaintCount} فقره</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPETENCY MATRIX */}
        {activeTab === 'competency' && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-900 mb-2">
              شاخص‌های پنج‌گانه ماتریس شایستگی و مهارتی کارکنان استان
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'تیراندازی تاکتیکی و دقت سلاح', score: province.competency.tacticalShootingScore, max: 100, desc: 'نتایج میدان تیر فصلی با سلاح کلاشینکف و کلت کمری' },
                { label: 'آمادگی جسمانی و دفاع شخصی', score: province.competency.physicalFitnessScore, max: 100, desc: 'تست دو، درازنشست، شنا و فنون مهار متهمان' },
                { label: 'مدیریت صحنه جرم و بحران', score: province.competency.crisisManagementScore, max: 100, desc: 'تصمیم‌گیری در شرایط غافلگیری، اغتشاش و درگیری مسلحانه' },
                { label: 'اشراف حقوقی و ضابطیت قضایی', score: province.competency.legalComplianceScore, max: 100, desc: 'رعایت آیین دادرسی کیفری، حقوق شهروندی و مستندسازی پرونده' },
                { label: 'سعه صدر و تکریم ارباب رجوع', score: province.competency.publicDeescalationScore, max: 100, desc: 'کنترل خشم، ارتباط کلامی موثر و رفتار سازمانی شایسته در مراجعات' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-slate-800">{item.label}</span>
                    <span className="font-bold font-mono text-indigo-600 text-sm">{item.score} / ۱۰۰</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">{item.desc}</p>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.score >= 90 ? 'bg-emerald-600' :
                        item.score >= 80 ? 'bg-indigo-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RECRUITMENT */}
        {activeTab === 'recruitment' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <h4 className="font-bold text-xs text-indigo-950 mb-1">
                سیاست بومی‌گزینی و انطباق سهمیه‌های جذب
              </h4>
              <p className="text-xs text-indigo-900/80 leading-relaxed">
                طبق آیین‌نامه استخدامی فراجا، سهمیه بومی‌گزینی در این استان روی {province.recruitment.localRecruitmentRate}٪ تنظیم گردیده است تا پایداری خدمتی و کاهش فشار انتقالات تضمین شود.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">سهمیه جذب مصوب</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                  {province.recruitment.annualQuota.toLocaleString('fa-IR')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">پذیرفته‌شدگان قطعی</span>
                <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                  {province.recruitment.recruitedCount.toLocaleString('fa-IR')}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {Math.round((province.recruitment.recruitedCount / province.recruitment.annualQuota) * 100)}٪ سهمیه محقق شد
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">نرخ ماندگاری پس از ۵ سال</span>
                <div className="text-2xl font-black text-indigo-600 font-mono mt-1">
                  {province.recruitment.retentionRateAfter5Years}٪
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TRANSFERS & WELFARE */}
        {activeTab === 'transfers' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">تقاضای انتقال به این استان (ورودی)</span>
                <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                  {province.transfers.inboundRequests.toLocaleString('fa-IR')} نفر
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">تقاضای خروج از این استان (خروجی)</span>
                <div className="text-2xl font-black text-rose-600 font-mono mt-1">
                  {province.transfers.outboundRequests.toLocaleString('fa-IR')} نفر
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">تراز خالص جابجایی</span>
                <div className={`text-2xl font-black font-mono mt-1 ${province.transfers.netBalance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {province.transfers.netBalance > 0 ? `+${province.transfers.netBalance}` : province.transfers.netBalance} نفر
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-xs text-slate-800 mb-2 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-indigo-600" />
                وضعیت مسکن سازمانی و معیشت پرسنل غیربومی
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">درصد پرسنل دارای مسکن سازمانی:</div>
                  <div className="text-lg font-bold text-slate-900 font-mono mt-1">{province.transfers.housingCoverageRate}٪</div>
                  <div className="text-[11px] text-slate-400 mt-1">میانگین سال انتظار: {province.transfers.avgWaitYearsForHouse} سال</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">پرسنل ساکن در آسایشگاه (دور از خانواده):</div>
                  <div className="text-lg font-bold text-rose-600 font-mono mt-1">
                    {province.transfers.familySeparationCount.toLocaleString('fa-IR')} نفر
                  </div>
                  <div className="text-[11px] text-rose-500 mt-1">اولویت اول تخصیص مسکن و تسهیلات ودیعه مسکن</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: TRAINING & READINESS */}
        {activeTab === 'training' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">سرانه ساعت آموزش در سال</span>
                <div className="text-2xl font-black text-indigo-600 font-mono mt-1">
                  {province.training.perCapitaHours}
                  <span className="text-xs font-normal text-slate-500 mr-1">ساعت / پرسنل</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">قبولی در آزمون میدان تیر</span>
                <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                  {province.training.shootingRangePassRate}٪
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500">گواهینامه‌های تخصصی کسب شده</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                  {province.training.specializedCertRate}٪
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
