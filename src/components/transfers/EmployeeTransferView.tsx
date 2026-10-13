import React, { useState } from 'react';
import {
  Send,
  Home,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronLeft,
  Sparkles,
  Heart,
  TrendingUp,
  FileText,
  Building,
  HelpCircle,
  Truck
} from 'lucide-react';
import { TransferApplication, FARAJA_PROVINCES_DATA, STATISTICAL_INSIGHTS } from '../../data/transfersData';

interface Props {
  applications: TransferApplication[];
  onSubmitApplication: (app: Omit<TransferApplication, 'id' | 'trackingCode' | 'requestDate' | 'status' | 'riskScore' | 'riskLevel'>) => void;
}

export function EmployeeTransferView({ applications, onSubmitApplication }: Props) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [targetProvince, setTargetProvince] = useState('اصفهان');
  const [targetUnitType, setTargetUnitType] = useState('یگان انتظامی / کلانتری');
  const [primaryReason, setPrimaryReason] = useState<'family_separation' | 'housing_shortage' | 'medical' | 'career_growth'>('family_separation');
  const [housingRequested, setHousingRequested] = useState(true);
  const [notes, setNotes] = useState('');
  const [hasSimulated, setHasSimulated] = useState(false);

  // Selected province stats
  const selectedProvinceData = FARAJA_PROVINCES_DATA.find(p => p.name.includes(targetProvince)) || FARAJA_PROVINCES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitApplication({
      personnelId: '۱۲۳۴۵',
      fullName: 'احمد حسینی',
      rank: 'استواریکم',
      currentProvince: 'سیستان و بلوچستان',
      currentUnit: 'هنگ مرزی سراوان',
      targetProvince,
      targetUnitType,
      primaryReason,
      housingRequested,
      notes: notes || 'درخواست رسیدگی در چارچوب ماده ۶ قانون انتقالات فراجا'
    });
    setShowNewModal(false);
    setNotes('');
  };

  const getReasonLabel = (reason: TransferApplication['primaryReason']) => {
    switch (reason) {
      case 'family_separation': return 'دوری از کانون خانواده (۴۲٪ فراوانی)';
      case 'housing_shortage': return 'کمبود یا فقدان مسکن سازمانی (۴۶٪ فراوانی)';
      case 'medical': return 'درمان و وضعیت پزشکی خاص عائله';
      case 'career_growth': return 'توسعه شایستگی و ارتقای رده خدمتی';
      default: return reason;
    }
  };

  const getStatusBadge = (status: TransferApplication['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-200">ثبت اولیه - در انتظار ارزیابی</span>;
      case 'evaluator_review':
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-200">در حال ارزیابی کارشناسی و تطابق رده</span>;
      case 'dss_prescribed':
        return <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> تجویز بسته حمایتی DSS</span>;
      case 'commission_approved':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> موافقت کمیسیون عالی</span>;
      case 'rejected':
        return <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-rose-200">عدم موافقت کمیسیون</span>;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner for Employee */}
      <div className="bg-gradient-to-l from-indigo-950 via-slate-900 to-slate-800 text-white p-6 rounded-3xl border border-slate-700 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                میز هوشمند انتقالات پرسنلی
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-lg">
                فرماندهی انتظامی جمهوری اسلامی ایران
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              ثبت و رهگیری هوشمند درخواست انتقال و جابجایی
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
              سامانه معیار بر اساس تحلیل داده‌های آماری و هوش مصنوعی، فرایند بررسی درخواست شما را بر پایه شاخص‌های عدالت سازمانی، وضعیت مسکن، مسافت خانوادگی و سوابق عملیاتی تسریع می‌کند.
            </p>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-black px-5 py-3 rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>ثبت درخواست انتقال جدید</span>
          </button>
        </div>
      </div>

      {/* Statistical Guidance Alert based on Document findings */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4.5 flex items-start gap-3.5 text-amber-900">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs leading-relaxed">
          <h4 className="font-black text-amber-950 text-sm">
            یافته کلیدی مرکز تحقیقات نیروی انسانی فراجا:
          </h4>
          <p className="font-medium text-amber-800">
            بر اساس تحلیل داده‌های تجربی، <strong className="font-black text-amber-950">۴۶٪ چالش‌های پرسنل ناشی از کمبود مسکن سازمانی</strong> و <strong className="font-black text-amber-950">۴۲٪ ناشی از دوری از خانواده</strong> است. با تخصیص منزل سازمانی، میانگین رضایت شغلی از <span className="font-bold underline">۲.۹ به ۴.۲ از ۵</span> افزایش می‌یابد. بنابراین، انتخاب گزینه «تقاضای مسکن سازمانی در مقصد» اولویت بررسی سامانه را بالا می‌برد.
          </p>
        </div>
      </div>

      {/* Grid: 1. Active User Applications Tracking, 2. Quality of Life & Satisfaction Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Main Column: Tracking Existing Applications */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black text-base text-slate-900">درخواست‌های ثبت‌شده شما</h3>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {applications.length} مورد فعال در سامانه
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                <Truck className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-500">تاکنون درخواستی برای انتقال ثبت نکرده‌اید.</p>
                <button
                  onClick={() => setShowNewModal(true)}
                  className="text-xs font-black text-indigo-600 hover:text-indigo-800 underline"
                >
                  ثبت اولین درخواست انتقال هوشمند
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 bg-white hover:bg-slate-50/40 transition shadow-2xs space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">{app.fullName} ({app.rank})</span>
                          <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                            کد رهگیری: {app.trackingCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span>مبدأ: <strong>{app.currentProvince}</strong> ({app.currentUnit})</span>
                          <span>←</span>
                          <span>مقصد درخواستی: <strong className="text-indigo-700">{app.targetProvince}</strong></span>
                        </div>
                      </div>

                      <div>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    {/* Progress Pipeline (۵ مرحله شفاف سازمانی) */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                      <span className="text-[11px] font-black text-slate-500 block">
                        مراحل گردش کار الکترونیک:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-bold">
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ۱. ثبت دیجیتال ✓
                        </div>
                        <div className={`p-1.5 rounded-lg border ${
                          app.status !== 'submitted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-indigo-600 text-white font-black'
                        }`}>
                          ۲. ارزیابی اولیه EWS
                        </div>
                        <div className={`p-1.5 rounded-lg border ${
                          ['dss_prescribed', 'commission_approved'].includes(app.status)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : app.status === 'evaluator_review'
                            ? 'bg-indigo-600 text-white font-black animate-pulse'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}>
                          ۳. کارشناسی تطابق رده
                        </div>
                        <div className={`p-1.5 rounded-lg border ${
                          app.status === 'commission_approved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : app.status === 'dss_prescribed'
                            ? 'bg-indigo-600 text-white font-black'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}>
                          ۴. نسخه تجویزی DSS
                        </div>
                        <div className={`p-1.5 rounded-lg border ${
                          app.status === 'commission_approved'
                            ? 'bg-emerald-600 text-white font-black'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}>
                          ۵. ابلاغ کمیسیون
                        </div>
                      </div>
                    </div>

                    {/* DSS Prescriptive Feedback if available */}
                    {app.recommendedPrescription && (
                      <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-indigo-900 font-black">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>بسته پیشنهادی موتور هوشمند (DSS Recommendation):</span>
                        </div>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          {app.recommendedPrescription}
                        </p>
                      </div>
                    )}

                    {/* Footer Details */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span>علت اصلی: <strong className="text-slate-800">{getReasonLabel(app.primaryReason)}</strong></span>
                        <span>مسکن درخواستی: <strong className={app.housingRequested ? 'text-emerald-700' : 'text-slate-600'}>{app.housingRequested ? 'بله' : 'خیر'}</strong></span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">تاریخ ثبت: {app.requestDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Predictive Simulator & Province Housing Stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quality of Life & Satisfaction Predictor */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h4 className="font-black text-sm text-slate-900">شبیه‌ساز پیش‌بینی ارتقای رضایت شما</h4>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              بر مبنای معادلات هوش مصنوعی مرکز تحقیقات فراجا، با جابجایی موفق به استان مطلوب همراه با سهمیه مسکن سازمانی:
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">افزایش پیش‌بینی‌شده رضایت شغلی:</span>
                <span className="text-emerald-700 font-black">+۳۱٪ (از ۲.۹ به ۴.۲)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '84%' }} />
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-2">
                <span className="text-slate-600">کاهش ریسک خستگی و حوادث جاده‌ای:</span>
                <span className="text-indigo-700 font-black">-۶۵٪</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '65%' }} />
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-2">
                <span className="text-slate-600">پایداری حضور در کنار خانواده:</span>
                <span className="text-amber-700 font-black">+۹۰٪</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '90%' }} />
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl text-[11px] text-indigo-900 font-medium leading-relaxed">
              💡 <strong>نکته:</strong> پرسنلی که سابقه بیش از ۲۴ ماه در مناطق مرزی و صعب‌المعیشه دارند، ضریب تقدم ۱.۴ در نوبت‌بندی کمیسیون دریافت می‌نمایند.
            </div>
          </div>

          {/* Target Provinces Capacity & Housing Monitor */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-indigo-600" />
                <h4 className="font-black text-sm text-slate-900">وضعیت سهمیه مسکن استان‌ها</h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400">بروزرسانی دی ۱۴۰۴</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {FARAJA_PROVINCES_DATA.slice(0, 4).map(prov => (
                <div key={prov.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-black text-slate-800 block">{prov.name}</span>
                    <span className="text-[10px] text-slate-400">میانگین زمان رسیدگی: {prov.avgTransferDays} روز</span>
                  </div>
                  <div className="text-left">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                      prov.housingAvailabilityRate >= 50
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {prov.housingAvailabilityRate}٪ ظرفیت مسکن
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* New Transfer Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black text-base text-slate-900">فرم هوشمند ثبت درخواست انتقال پرسنلی</h3>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
              {/* Target Province */}
              <div className="space-y-1.5">
                <label className="text-slate-700 block">استان مقصد درخواستی:</label>
                <select
                  value={targetProvince}
                  onChange={(e) => setTargetProvince(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value="اصفهان">فرماندهی انتظامی استان اصفهان</option>
                  <option value="تهران (فاتب)">فرماندهی انتظامی تهران بزرگ (فاتب)</option>
                  <option value="فارس">فرماندهی انتظامی استان فارس</option>
                  <option value="خراسان رضوی">فرماندهی انتظامی استان خراسان رضوی</option>
                  <option value="کرمانشاه">فرماندهی انتظامی استان کرمانشاه</option>
                  <option value="مرکزی">فرماندهی انتظامی استان مرکزی (پایلوت)</option>
                  <option value="قم">فرماندهی انتظامی استان قم</option>
                  <option value="همدان">فرماندهی انتظامی استان همدان</option>
                </select>
              </div>

              {/* Target Unit Type */}
              <div className="space-y-1.5">
                <label className="text-slate-700 block">رده یا یگان پیشنهادی در مقصد:</label>
                <select
                  value={targetUnitType}
                  onChange={(e) => setTargetUnitType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value="یگان انتظامی / کلانتری">پلیس پیشگیری و کلانتری‌ها</option>
                  <option value="پلیس راهور">پلیس راهنمایی و رانندگی (راهور)</option>
                  <option value="پلیس آگاهی و تجسس">پلیس آگاهی و دوایر جنایی/کشف سرقت</option>
                  <option value="ستاد فرماندهی و اداری">رده‌های ستادی، اداری و پشتیبانی</option>
                  <option value="یگان امداد">یگان امداد و عملیات واکنش سریع</option>
                </select>
              </div>

              {/* Primary Reason */}
              <div className="space-y-1.5">
                <label className="text-slate-700 block">دلیل و اولویت اصلی تقاضا:</label>
                <select
                  value={primaryReason}
                  onChange={(e) => setPrimaryReason(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value="family_separation">دوری مفرط از خانواده و همسر/فرزندان (۴۲٪ فراوانی)</option>
                  <option value="housing_shortage">کمبود شدید یا فقدان مسکن سازمانی در یگان مبدأ (۴۶٪ فراوانی)</option>
                  <option value="medical">مشکلات خاص حاد پزشکی و لزوم دسترسی به مراکز درمانی تخصصی</option>
                  <option value="career_growth">تکمیل سقف خدمت مرزی و آمادگی ارتقای جایگاه سازمانی</option>
                </select>
              </div>

              {/* Housing Checkbox */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="housingCheck"
                  checked={housingRequested}
                  onChange={(e) => setHousingRequested(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
                <label htmlFor="housingCheck" className="text-slate-800 text-xs font-bold cursor-pointer">
                  متقاضی تخصیص مسکن سازمانی یا سوئیت اداری در استان مقصد هستم (توصیه مدل هوشمند)
                </label>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-slate-700 block">شرح توضیحات و مستندات تکمیلی:</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ذکر سوابق، فاصله خانوادگی، شماره پرونده پزشکی یا نیاز خاص..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ثبت نهایی و ارسال به ارزیاب</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
