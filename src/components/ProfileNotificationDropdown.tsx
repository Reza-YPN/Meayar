import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, MessageSquare, Shield, BookOpen, Settings, Gift, ChevronLeft, Bell, MoreHorizontal, Edit2 } from "lucide-react";

interface ProfileNotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileNotificationDropdown({ isOpen, onClose }: ProfileNotificationDropdownProps) {
  const [activeTab, setActiveTab] = useState<"messages" | "profile">("messages");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-16 left-6 w-[450px] bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 flex flex-col max-h-[80vh]"
    >
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-4 text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === "profile" ? "text-slate-800 border-b-2 border-indigo-600 bg-slate-50" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <User className="w-4 h-4" /> حساب کاربری
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex-1 py-4 text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === "messages" ? "text-slate-800 border-b-2 border-indigo-600 bg-slate-50" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> پیام‌های اخیر
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {activeTab === "messages" && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500 border-b border-slate-100 pb-2">
              <span className="text-green-600 border-b-2 border-green-600 pb-2 -mb-[9px]">همه</span>
              <span>پیام‌های سیستمی</span>
              <span>پیام‌های رفاهی</span>
              <span>پیام‌های آموزشی</span>
              <span>پیام‌های مدیریتی</span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 mb-1">پیام مدیریتی</div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    یک ماموریت جدید با عنوان "تحقق ۲۰ گشت زنی موفق در هفته جاری" برای شما تعریف شد.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 mb-1">پیام آموزشی</div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    شما با موفقیت آزمون مرتبط با دوره آموزشی "مهارت ارتباطی موثر" را گذراندید، ۱۲ امتیاز رفاهی به مجموع امتیازات شما افزوده شد.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 mb-1">پیام سیستمی</div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    درخواست شما برای تغییر کلمه عبور با موفقیت تایید شد.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 mb-1">پیام رفاهی</div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    درخواست شما برای دریافت مزیت رفاهی "وام مسکن" تایید شد، برای تکمیل مدارک به میز خدمت مراجعه کنید.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 mb-1">پیام آموزشی</div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    یک آموزش جدید توسط مدیر شما پیشنهاد شد، برای شروع آموزش به صفحه "آموزش و توسعه مهارت‌ها" مراجعه کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center pb-2">
              <button 
                onClick={() => {
                  navigate("/notifications");
                  onClose();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-indigo-100 w-full"
              >
                مشاهده همه پیام‌ها و اعلان‌ها
              </button>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6 pt-2 pb-4 px-2">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-indigo-100 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80" alt="محمدرضا یزدان پناه" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">محمدرضا یزدان پناه</h3>
                <p className="text-slate-500 text-sm mt-1">فرماندهی تهران بزرگ - کلانتری...</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">نام و نام خانوادگی</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-800 font-bold text-sm">محمدرضا یزدان پناه</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">تاریخ تولد</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-800 font-bold text-sm">۱۳۷۶/۱۲/۰۶</span>
                  <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">وضعیت تاهل</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-800 font-bold text-sm">متاهل</span>
                  <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">آدرس</span>
                <div className="flex items-center gap-3 max-w-[200px] text-left">
                  <span className="text-slate-800 font-bold text-sm truncate block" dir="rtl">تهران، خیابان گاندی، پلاک ۱۲</span>
                  <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 shrink-0" />
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-medium">کلمه عبور</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-800 font-bold text-sm">**********</span>
                  <Edit2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-center pb-2">
              <button 
                onClick={() => {
                   navigate("/profile");
                   onClose();
                }}
                className="bg-indigo-100 text-indigo-700 w-full px-6 py-2 rounded-md text-xs font-bold hover:bg-indigo-200 transition">
                مشاهده پروفایل کامل
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
