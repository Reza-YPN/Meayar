import { X } from "lucide-react";

interface MoreDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

export function MoreDocsModal({ isOpen, onClose, request }: MoreDocsModalProps) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              نیاز به مستندات بیشتر برای درخواست {request.type}
            </h3>
            <p className="text-sm text-slate-500">
              هر نوع مستندی که نیاز هست در کادر پایین ذکر کنید تا کارمند آن را در درخواست خود ضمیمه کند.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              توضیحات
            </label>
            <textarea
              rows={5}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
              placeholder="توضیحات تکمیلی در مورد مستندات بیشتر مورد نیاز را اینجا وارد کنید."
            ></textarea>
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
