import React, { useState } from 'react';
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  User,
  MapPin,
  TrendingDown,
  Building,
  DollarSign,
  Compass,
  Send,
  Layers,
  Award
} from 'lucide-react';
import {
  TransferApplication,
  EarlyWarningPersonnel,
  RANDOM_FOREST_FEATURE_IMPORTANCE,
  STATISTICAL_INSIGHTS
} from '../../data/transfersData';

interface Props {
  applications: TransferApplication[];
  personnelEws: EarlyWarningPersonnel[];
  onUpdateAppStatus: (appId: string, newStatus: TransferApplication['status'], prescription?: string) => void;
  onUpdateEwsStatus: (personnelId: string, newStatus: EarlyWarningPersonnel['status']) => void;
}

export function EvaluatorTransferView({
  applications,
  personnelEws,
  onUpdateAppStatus,
  onUpdateEwsStatus
}: Props) {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'ews_table'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [customPrescription, setCustomPrescription] = useState('');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const filteredApps = applications.filter(a => {
    const matchSearch = a.fullName.includes(searchQuery) || a.personnelId.includes(searchQuery) || a.currentProvince.includes(searchQuery);
    const matchRisk = riskFilter === 'all' || a.riskLevel === riskFilter;
    return matchSearch && matchRisk;
  });

  const getRiskBadge = (level: 'high' | 'medium' | 'low', score?: number) => {
    switch (level) {
      case 'high':
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-200 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            ریسک بالا {score ? `(${score}٪)` : ''}
          </span>
        );
      case 'medium':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            ریسک متوسط {score ? `(${score}٪)` : ''}
          </span>
        );
      case 'low':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ریسک پایین {score ? `(${score}٪)` : ''}
          </span>
        );
    }
  };

  const handleApproveWithPrescription = () => {
    if (!selectedApp) return;
    const finalPrescription = customPrescription || selectedApp.recommendedPrescription || 'تأیید انتقال با اولویت تخصیص سهمیه مسکن سازمانی در مقصد';
    onUpdateAppStatus(selectedApp.id, 'dss_prescribed', finalPrescription);
  };

  const handleRejectApp = () => {
    if (!selectedApp) return;
    onUpdateAppStatus(selectedApp.id, 'rejected', 'عدم احراز شرایط حدنصاب سابقه خدمت در مناطق محروم');
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Evaluator Header */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" />
                کارتابل کارشناسی و ارزیابی شایستگی
              </span>
              <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold px-3 py-1 rounded-lg">
                معاونت نیروی انسانی فراجا
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              ارزیابی هوشمند و غربالگری ریسک تقاضاهای جابجایی
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
              کارشناس محترم، در این بخش تقاضاهای انتقال بر اساس مدل یادگیری ماشین Random Forest و ضرایب رگرسیونی مرکز تحقیقات فراجا اولویت‌بندی می‌شوند تا بهترین بسته تجویزی پیشگیرانه تعیین گردد.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700 shrink-0">
            <button
              onClick={() => setActiveSubTab('applications')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeSubTab === 'applications'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              کارتابل درخواست‌ها ({applications.length})
            </button>
            <button
              onClick={() => setActiveSubTab('ews_table')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeSubTab === 'ews_table'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              جدول هشدار زودهنگام (EWS)
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'applications' ? (
        /* Applications Cartable Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* List of Applications (Left / 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-sm text-slate-900">لیست درخواست‌های واصله</h3>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {filteredApps.length} مورد
                </span>
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو بر اساس نام، شناسه یا استان..."
                    className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-black text-slate-500">فیلتر ریسک:</span>
                  {(['all', 'high', 'medium', 'low'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setRiskFilter(f)}
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                        riskFilter === f
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f === 'all' ? 'همه' : f === 'high' ? 'بالا' : f === 'medium' ? 'متوسط' : 'پایین'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                {filteredApps.map(app => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedAppId(app.id);
                      setCustomPrescription(app.recommendedPrescription || '');
                    }}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer text-xs space-y-2 ${
                      selectedApp?.id === app.id
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 text-sm">{app.fullName} ({app.rank})</span>
                      {getRiskBadge(app.riskLevel, app.riskScore)}
                    </div>
                    <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
                      <span>مبدأ: <strong>{app.currentProvince}</strong></span>
                      <span>←</span>
                      <span>مقصد: <strong className="text-indigo-700">{app.targetProvince}</strong></span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>شناسه: {app.personnelId}</span>
                      <span>{app.requestDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Diagnostic & Prescriptive Evaluation (Right / 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedApp ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                {/* Header Profile */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-lg text-slate-900">{selectedApp.fullName}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-2.5 py-0.5 rounded-lg">
                        درجه: {selectedApp.rank}
                      </span>
                      <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                        شناسه: {selectedApp.personnelId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      یگان فعلی: <strong className="text-slate-800">{selectedApp.currentUnit} ({selectedApp.currentProvince})</strong>
                    </p>
                  </div>

                  <div className="text-left">
                    {getRiskBadge(selectedApp.riskLevel, selectedApp.riskScore)}
                    <span className="text-[10px] font-bold text-slate-400 block mt-1">
                      محاسبه مدل جنگل تصادفی
                    </span>
                  </div>
                </div>

                {/* Machine Learning Feature Breakdown for this applicant */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      واکاوی اوزان تشخیصی رگرسیون و یادگیری ماشین:
                    </h4>
                    <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100/60 px-2 py-0.5 rounded">
                      دقت الگو (AUC): ۸۵٪
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold block">مسکن سازمانی (۳۱٪)</span>
                      <span className={`font-black text-xs ${selectedApp.housingRequested ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {selectedApp.housingRequested ? 'فاقد مسکن (بحرانی)' : 'دارای مسکن'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold block">فاصله خانوادگی (۱۸٪)</span>
                      <span className="font-black text-xs text-amber-700">
                        {selectedApp.primaryReason === 'family_separation' ? 'دوری حاد (+۱۰۰۰ ک.م)' : 'فاصله متوسط'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold block">حقوق و مزایا (۲۲٪)</span>
                      <span className="font-black text-xs text-slate-800">
                        پایه بدون فوق‌العاده
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold block">ضریب خطر ترک خدمت</span>
                      <span className="font-black text-xs text-rose-600">
                        {selectedApp.riskScore}٪ احتمال
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prescriptive Recommendation Box (موتور تجویزی سند - اسلاید ۱۰) */}
                <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-700" />
                      <h4 className="font-black text-xs text-indigo-950">
                        بسته مداخله تجویزی سامانه تصمیم‌یار (DSS Prescriptive Action):
                      </h4>
                    </div>
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      شخصی‌سازی‌شده
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    بر اساس راهبرد «حرکت از یک نسخه برای همه به سمت مداخلات هدفمند»:
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-indigo-900">
                      <span>اقدام کارشناسی توصیه‌شده:</span>
                      <span className="text-xs font-mono font-black text-emerald-700">
                        برآورد هزینه: {selectedApp.riskLevel === 'high' ? '۸ میلیون تومان' : selectedApp.riskLevel === 'medium' ? '۵ میلیون تومان' : 'بدون هزینه'}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">
                      {selectedApp.recommendedPrescription || 'انتقال به استان درخواستی با اولویت تخصیص سوئیت سازمانی یا تسهیلات ودیعه مسکن'}
                    </p>
                  </div>

                  {/* Custom Prescriptive override by evaluator */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-black text-indigo-900 block">
                      ویرایش یا درج نظر نهایی ارزیاب جهت ارائه به کمیسیون عالی:
                    </label>
                    <textarea
                      rows={2}
                      value={customPrescription}
                      onChange={(e) => setCustomPrescription(e.target.value)}
                      placeholder="متن مصوبه پیشنهادی ارزیاب برای کمیسیون..."
                      className="w-full bg-white border border-indigo-200 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>

                {/* Actions: Endorse / Reject */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-3">
                  <div className="text-[11px] text-slate-500 font-medium">
                    وضعیت فعلی: <strong className="text-slate-800">{selectedApp.status}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRejectApp}
                      className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>رد درخواست</span>
                    </button>
                    <button
                      onClick={handleApproveWithPrescription}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تأیید کارشناسی و ارجاع به کمیسیون عالی</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                درخواستی انتخاب نشده است.
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Early Warning System (EWS) Full Table based on Slide 9 & 10 */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                نظام هشدار زودهنگام (Early Warning System - EWS) فراجا
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                شناسایی فعالانه پرسنل در معرض خطر ترک خدمت و افت رضایت پیش از وقوع بحران، مبتنی بر مدل جنگل تصادفی (Random Forest)
              </p>
            </div>
            <span className="bg-slate-100 text-slate-700 font-black text-xs px-3 py-1.5 rounded-xl border border-slate-200">
              تعداد افراد پایش‌شده: {personnelEws.length} نفر
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                <tr>
                  <th className="p-3">شناسه</th>
                  <th className="p-3">نام و رتبه</th>
                  <th className="p-3">یگان فعلی</th>
                  <th className="p-3">مقصد درخواستی</th>
                  <th className="p-3">مسکن سازمانی</th>
                  <th className="p-3">دوری (ماه)</th>
                  <th className="p-3 text-center">احتمال ترک خدمت</th>
                  <th className="p-3">سطح ریسک</th>
                  <th className="p-3">اقدام تجویزی DSS</th>
                  <th className="p-3 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {personnelEws.map(p => (
                  <tr key={p.personnelId} className="hover:bg-slate-50/70 transition">
                    <td className="p-3 font-mono font-bold text-slate-700">{p.personnelId}</td>
                    <td className="p-3 font-black text-slate-900">{p.name} ({p.rank})</td>
                    <td className="p-3 text-slate-600">{p.currentProvince}</td>
                    <td className="p-3 text-indigo-700 font-bold">{p.requestedProvince}</td>
                    <td className="p-3">
                      {p.hasOrganizationalHouse ? (
                        <span className="text-emerald-700 font-bold">دارد</span>
                      ) : (
                        <span className="text-rose-600 font-black">ندارد</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-700 font-bold">{p.monthsAwayFromFamily} ماه</td>
                    <td className="p-3 text-center font-mono font-black text-sm">
                      <span className={p.quitRiskProbability > 70 ? 'text-rose-600' : p.quitRiskProbability > 35 ? 'text-amber-600' : 'text-emerald-600'}>
                        {p.quitRiskProbability}٪
                      </span>
                    </td>
                    <td className="p-3">
                      {getRiskBadge(p.riskLevel)}
                    </td>
                    <td className="p-3 max-w-xs text-[11px] text-slate-700 leading-relaxed font-bold">
                      {p.prescriptiveAction}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => onUpdateEwsStatus(p.personnelId, 'approved_by_commander')}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-black px-2.5 py-1 rounded-lg transition cursor-pointer"
                      >
                        تصویب مداخله
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
