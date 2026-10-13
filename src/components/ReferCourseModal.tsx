import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Check, Users } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: 1, name: "سرگرد علی حسینی", role: "افسر نگهبان", department: "کلانتری ۱۲", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { id: 2, name: "ستوان یکم رضا محمدی", role: "گشت انتظامی", department: "کلانتری ۱۴", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
  { id: 3, name: "سروان محمد کریمی", role: "رئیس تجسس", department: "پایگاه دوم", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { id: 4, name: "استوار دوم حسن رضایی", role: "مامور بدرقه", department: "پلیس آگاهی", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80" },
  { id: 5, name: "سرهنگ دوم احمد مرادی", role: "رئیس کلانتری", department: "کلانتری ۱۱", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" },
];

interface ReferCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  onConfirm: (employeeIds: number[]) => void;
}

export function ReferCourseModal({ isOpen, onClose, courseTitle, onConfirm }: ReferCourseModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  if (!isOpen) return null;

  const filteredEmployees = MOCK_EMPLOYEES.filter(e => 
    e.name.includes(searchTerm) || e.department.includes(searchTerm) || e.role.includes(searchTerm)
  );

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredEmployees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmployees.map(e => e.id));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col min-h-[500px] max-h-[80vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">ارجاع آموزش به کارکنان</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{courseTitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1 overflow-hidden">
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="جستجوی کارکنان (نام، یگان، سمت)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-bold text-slate-500">{filteredEmployees.length} نفر یافت شد</span>
            <button 
              onClick={handleSelectAll}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              {selectedIds.length === filteredEmployees.length && filteredEmployees.length > 0 ? "لغو انتخاب همه" : "انتخاب همه"}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-1 custom-scrollbar">
            {filteredEmployees.map(emp => {
              const isSelected = selectedIds.includes(emp.id);
              return (
                <div 
                  key={emp.id}
                  onClick={() => toggleSelect(emp.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{emp.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span>{emp.role}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{emp.department}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-slate-50 text-transparent'
                  }`}>
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
            
            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm font-medium">
                کارکنی یافت نشد.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-700">
            {selectedIds.length} نفر انتخاب شده
          </span>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition"
            >
              انصراف
            </button>
            <button 
              onClick={() => {
                onConfirm(selectedIds);
                onClose();
              }}
              disabled={selectedIds.length === 0}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              تایید و ارجاع
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
