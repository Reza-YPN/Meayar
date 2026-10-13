import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, FileText, Upload, Calendar } from "lucide-react";

interface GenericServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    subtitle?: string;
    category: string;
    icon: any;
  } | null;
}

export function GenericServiceModal({ isOpen, onClose, service }: GenericServiceModalProps) {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");

  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <service.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{service.title}</h3>
                <p className="text-xs text-slate-500">{service.category} {service.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    برای ثبت این درخواست، لطفا مستندات لازم را پیوست نموده و توضیحات تکمیلی را وارد نمایید. پس از ثبت، درخواست شما توسط کارشناس مربوطه بررسی خواهد شد.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      توضیحات درخواست
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-32 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                      placeholder="لطفا توضیحات لازم را در این قسمت وارد کنید..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      پیوست مدارک
                    </label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                      <div className="text-sm font-medium text-slate-700 mb-1">
                        برای آپلود فایل کلیک کنید
                      </div>
                      <div className="text-xs text-slate-500">
                        فرمت‌های مجاز: PDF, JPG, PNG (حداکثر ۵ مگابایت)
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!description.trim()}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-sm hover:bg-indigo-700 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ثبت درخواست
                </button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">درخواست با موفقیت ثبت شد</h3>
                <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
                  کد رهگیری: {Math.floor(100000 + Math.random() * 900000)}<br />
                  شما می‌توانید وضعیت درخواست خود را از بخش «تاریخچه درخواست‌ها» پیگیری کنید.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
                >
                  بستن
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
