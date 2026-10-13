import { X, TrendingDown, TrendingUp } from "lucide-react";

interface ProposeTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
}

export function ProposeTrainingModal({ isOpen, onClose, employee }: ProposeTrainingModalProps) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-slate-800 mb-2">پیشنهاد و تعریف آموزش</h3>
            <p className="text-sm text-slate-500">
              میتوانید برای کارمندان خود دوره آموزشی تعریف کنید تا به پیشرفت مسیر شغلی آنها کمک کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                کد کارکنان (پرسنلی) کارمند
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option value={employee.id}>{employee.id}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                نام و نام خانوادگی کارمند
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option value={employee.name}>{employee.name}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                دسته بندی دوره آموزشی
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option>انتخاب</option>
                <option>فنی و تخصصی</option>
                <option>مهارت‌های نرم</option>
                <option>مدیریتی</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                اسم دوره آموزشی
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option>انتخاب</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                اولویت
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option>انتخاب</option>
                <option>بسیار مهم</option>
                <option>مهم</option>
                <option>عادی</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                تاریخ پیشنهادی برای شروع دوره آموزشی
              </label>
              <input 
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              شاخص یا شایستگی مرتبط
            </label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
              <option>انتخاب</option>
              <option>ارتباط موثر</option>
              <option>مدیریت زمان</option>
            </select>
          </div>

          {/* Employee Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Profile" 
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800">{employee.name}</h4>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold">
                    {employee.performance}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  فرماندهی تهران بزرگ - کلانتری ۱۰۳ گاندی
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-center sm:text-right">
              <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">نمره:</div>
                <div className="font-black text-slate-800 text-lg">{employee.score}</div>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">نتیجه فصل قبل:</div>
                <div className={`font-bold flex items-center justify-center gap-1 text-sm ${employee.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  {employee.change}
                  {employee.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-indigo-200 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors"
          >
            انصراف
          </button>
          <button 
            onClick={() => {
              // Handle saving
              onClose();
            }}
            className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
