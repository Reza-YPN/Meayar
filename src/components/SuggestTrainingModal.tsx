import { useState } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SuggestTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestTrainingModal({ isOpen, onClose }: SuggestTrainingModalProps) {
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
              <h2 className="text-xl font-black text-slate-800">ثبت پیشنهاد و تعریف آموزش</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Search Employee */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">نام کارمند یا کدملی</label>
                <div className="relative">
                  <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className="w-full pl-3 pr-10 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specialized Courses */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4 text-sm">لیست دوره‌های آموزشی تخصصی</h3>
                  <div className="space-y-3">
                    {["تیراندازی در حال حرکت", "اصول تعقیب و گریز", "مذاکره به وقت بحران", "استفاده از گاز اشک آور"].map((course, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                        <span className="text-sm text-slate-600">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* General Courses */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4 text-sm">لیست دوره‌های آموزشی عمومی</h3>
                  <div className="space-y-3">
                    {["مهارت گوش دادن فعال", "هوش هیجانی چیست؟", "اصول مذاکره", "مهارت توجه به جزئیات"].map((course, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                        <span className="text-sm text-slate-600">{course}</span>
                      </label>
                    ))}
                  </div>
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
              <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
                ثبت پیشنهاد و تعریف آموزش
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
