import { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FeedbackMissionModal } from "./FeedbackMissionModal";

interface FeedbackHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
}

export function FeedbackHistoryModal({ isOpen, onClose, employee }: FeedbackHistoryModalProps) {
  const [isNewFeedbackOpen, setIsNewFeedbackOpen] = useState(false);

  if (!isOpen || !employee) return null;

  const history = [
    { id: 1, text: "حضور با تاخیر در محل خدمت در شیفت صبح", priority: "بسیار زیاد", date: "۱۴۰۵/۰۷/۰۶", status: "در حال بررسی" },
    { id: 2, text: "عدم رعایت کامل دستورالعمل‌های ایمنی", priority: "زیاد", date: "۱۴۰۵/۰۷/۰۴", status: "بسته شده" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "در حال بررسی": return "bg-amber-400 text-white";
      case "بسته شده": return "bg-emerald-500 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-800">لیست تاریخچه بازخورد و ماموریت اخیر</h2>
                <p className="text-sm text-slate-500 mt-1">
                  کارمند: <span className="font-bold text-slate-700">{employee.name}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsNewFeedbackOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  ثبت بازخورد جدید
                </button>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-4 whitespace-nowrap">متن بازخورد / ماموریت</th>
                        <th className="p-4 whitespace-nowrap text-center">اولویت</th>
                        <th className="p-4 whitespace-nowrap text-center">تاریخ ثبت</th>
                        <th className="p-4 whitespace-nowrap text-center">وضعیت</th>
                        <th className="p-4 whitespace-nowrap text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {history.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 text-slate-700 font-medium max-w-xs truncate" title={item.text}>{item.text}</td>
                          <td className="p-4 text-center whitespace-nowrap text-slate-600">{item.priority}</td>
                          <td className="p-4 text-center whitespace-nowrap text-slate-500">{item.date}</td>
                          <td className="p-4 text-center whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 text-center whitespace-nowrap">
                            <button className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                              مشاهده
                            </button>
                          </td>
                        </tr>
                      ))}
                      {history.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500">
                            موردی برای نمایش وجود ندارد
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* New Feedback Modal */}
      {isNewFeedbackOpen && (
        <FeedbackMissionModal
          isOpen={isNewFeedbackOpen}
          onClose={() => setIsNewFeedbackOpen(false)}
          employee={employee}
        />
      )}
    </AnimatePresence>
  );
}
