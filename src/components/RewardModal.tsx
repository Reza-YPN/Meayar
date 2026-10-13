import { X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
}

export function RewardModal({ isOpen, onClose, employee }: RewardModalProps) {
  if (!isOpen || !employee) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800">ثبت پاداش جدید</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">نام و نام خانوادگی / شماره کارکنان (پرسنلی) کارمند</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none">
                    <option value={employee.id}>{employee.name}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">مبلغ پاداش (ریال)</label>
                  <input
                    type="text"
                    placeholder="مثال: ۱۰,۰۰۰,۰۰۰"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">توضیحات و دلایل تخصیص پاداش</label>
                <textarea
                  rows={4}
                  placeholder="دلایل خود را برای تخصیص این پاداش بنویسید..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 text-sm">معیارهای ارزیابی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "انجام به موقع و دقیق ماموریت‌ها",
                    "خلاقیت و نوآوری در انجام وظایف",
                    "برخورد مناسب و حفظ کرامت ارباب رجوع",
                    "حضور منظم و بدون غیبت در شیفت‌ها"
                  ].map((criteria, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                      <span className="text-sm text-slate-600">{criteria}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 border border-slate-200 hover:bg-white transition-colors"
              >
                بازگشت
              </button>
              <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors">
                ثبت و تخصیص پاداش
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
