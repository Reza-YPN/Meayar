import { X } from "lucide-react";

interface FeedbackMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
}

export function FeedbackMissionModal({ isOpen, onClose, employee }: FeedbackMissionModalProps) {
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">ثبت بازخورد و تعریف ماموریت</h3>
            <p className="text-sm text-slate-500">
              با ثبت بازخورد و تعریف ماموریت برای نیروهای خود به بهبود عملکرد ایشان را راهبری کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                کد کارکنان (پرسنلی) نیرو
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option value={employee.id}>{employee.id}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                نام و نام خانوادگی نیرو
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                <option value={employee.name}>{employee.name}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              توضیحات تکمیلی بازخورد و یا ماموریت محوله
            </label>
            <textarea
              rows={4}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
              placeholder="توضیحات تکمیلی خود برای علت بازخورد و جزئیات ماموریت محوله به نیرو را در اینجا وارد کنید."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                اولویت
              </label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <option>عادی</option>
                <option>بالا</option>
                <option>فوری</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                مهلت انجام
              </label>
              <input 
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
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
