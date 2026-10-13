import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  X,
  UserCheck,
  Building2
} from 'lucide-react';
import { competencyService } from '../../services/competencyService';

interface CommanderPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionUpdated: () => void;
}

export function CommanderPermissionModal({ isOpen, onClose, onPermissionUpdated }: CommanderPermissionModalProps) {
  const currentPerm = competencyService.getEvaluatorJobManagementPermission();
  const [commanderName, setCommanderName] = useState<string>(
    currentPerm.granted ? currentPerm.grantedBy : 'سرهنگ دوم علیرضا صادقی (رئیس کلانتری ۱۰۳ گاندی)'
  );
  const [role, setRole] = useState<'commander' | 'supervisor'>('commander');
  const [reason, setReason] = useState<string>(
    currentPerm.reason || 'اصلاح و به‌روزرسانی چارت تفصیلی و وظایف عملیاتی کلانتری ۱۰۳ گاندی'
  );
  const [passcode, setPasscode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commanderName.trim()) {
      setErrorMsg('لطفاً نام و سمت فرمانده یا ناظر صادرکننده را وارد نمایید.');
      return;
    }

    // Grant permission
    competencyService.setEvaluatorJobManagementPermission(
      true,
      `${commanderName} (${role === 'commander' ? 'فرمانده کلانتری' : 'ناظر عالی بازرسی'})`,
      reason
    );
    onPermissionUpdated();
    onClose();
  };

  const handleRevoke = () => {
    competencyService.setEvaluatorJobManagementPermission(false, '', '');
    onPermissionUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in" dir="rtl">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-amber-400 flex items-center justify-center font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm md:text-base text-white">
                کنترل مجوز تعریف و ویرایش مشاغل
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                تاییدیه و مجوز رسمی فرمانده کلانتری یا ناظر عالی
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleGrant} className="p-6 space-y-4 text-xs font-bold text-slate-700">
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-black">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>قانون امنیتی ساختار سازمانی کلانتری ۱۰۳ گاندی:</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed font-medium">
              به‌منظور صیانت از چارت مصوب ۴۶ شغل و جلوگیری از تغییرات سلیقه‌ای، ارزیاب شایستگی به‌صورت پیش‌فرض مجاز به تعریف، ویرایش یا حذف مشاغل نیست. تنها با ثبت مشخصات فرمانده یا ناظر، این قفل موقتاً باز خواهد شد.
            </p>
          </div>

          {/* Current Status */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-500 font-bold">وضعیت دسترسی فعلی ارزیاب:</span>
            {currentPerm.granted ? (
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                مجوز صادر شده توسط: {currentPerm.grantedBy}
              </span>
            ) : (
              <span className="bg-rose-100 text-rose-900 border border-rose-300 text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-rose-700" />
                غیرفعال و قفل (پیش‌فرض امنیتی)
              </span>
            )}
          </div>

          {/* Commander Selection */}
          <div className="space-y-1.5">
            <label className="block text-slate-700 font-black">
              مقام صادرکننده مجوز:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('commander');
                  setCommanderName('سرهنگ دوم علیرضا صادقی (رئیس کلانتری ۱۰۳ گاندی)');
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  role === 'commander'
                    ? 'bg-indigo-900 text-white border-indigo-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>فرمانده کلانتری ۱۰۳</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('supervisor');
                  setCommanderName('سرهنگ بازرسی حمید موسوی (ناظر عالی فاتب)');
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  role === 'supervisor'
                    ? 'bg-indigo-900 text-white border-indigo-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ناظر عالی / بازرسی</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-700 font-black">
              نام و مشخصات مقام صادرکننده:
            </label>
            <input
              type="text"
              value={commanderName}
              onChange={e => setCommanderName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-700 font-black">
              علت و ضرورت تغییر در ساختار مشاغل:
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="مثال: بازنگری وظایف دایره تجسس بر اساس دستورالعمل جدید..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          {errorMsg && (
            <div className="bg-rose-50 text-rose-700 p-2.5 rounded-xl border border-rose-200 text-[11px] font-bold">
              {errorMsg}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            {currentPerm.granted && (
              <button
                type="button"
                onClick={handleRevoke}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>لغو مجوز و قفل مجدد</span>
              </button>
            )}

            <div className="flex items-center gap-2 mr-auto">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
              >
                انصراف
              </button>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-black transition shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تایید و اعطای مجوز دسترسی</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
