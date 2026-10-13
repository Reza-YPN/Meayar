import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Shield, 
  Award, 
  ChevronLeft, 
  Lock, 
  Edit3, 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Upload, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRole } from "../context/RoleContext";
import { Link } from "react-router-dom";

export function ProfilePage() {
  const { role } = useRole();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFieldType, setEditFieldType] = useState("اطلاعات تماس و آدرس");
  const [editValue, setEditValue] = useState("");
  const [editReason, setEditReason] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [submittedRequests, setSubmittedRequests] = useState([
    {
      id: "REQ-INF-4041",
      field: "تغییر آدرس محل سکونت",
      newValue: "تهران، سعادت آباد، بلوار پاکنژاد، کوچه مریم، پلاک ۸",
      date: "۱۴۰۵/۱۱/۲۰",
      status: "در حال بررسی در کارتابل دبیرخانه",
      statusType: "pending"
    }
  ]);

  const user = {
    name: "محمدرضا یزدان پناه",
    rank: role === "manager" ? "مدیر کل یگان" : "کارشناس ارشد امنیت و عملیات",
    department: "اداره فناوری اطلاعات و ارتباطات فراجا",
    employeeId: "۹۸۷۶۵۴۳۲",
    nationalId: "۰۰۷۱۲۳۴۵۶۷",
    phone: "۰۹۱۰۲۵۹۵۷۴۱",
    email: "m.yazdanpanah@faraja.ir",
    address: "تهران، شهرک غرب، خیابان مهستان، پلاک ۱۲",
    birthDate: "۱۳۶۵/۰۴/۱۲",
    employmentDate: "۱۳۹۰/۰۷/۰۱",
    level: "رتبه ۳",
    score: "۸,۴۵۰",
    status: "شاغل فعال",
  };

  const handleCreateCorrectionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editValue.trim()) return;

    const newReq = {
      id: `REQ-INF-${Math.floor(1000 + Math.random() * 9000)}`,
      field: editFieldType,
      newValue: editValue,
      date: "۱۴۰۵/۱۲/۱۸",
      status: "ثبت در میز خدمت (در انتظار تایید منابع انسانی)",
      statusType: "pending"
    };

    setSubmittedRequests(prev => [newReq, ...prev]);
    setIsEditModalOpen(false);
    setEditValue("");
    setEditReason("");
    setToastMessage(`درخواست اصلاح اطلاعات با کد رهگیری ${newReq.id} در میز خدمت ثبت شد.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 relative">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="text-[11px] font-bold bg-white/10 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              گام ۱۰ معماری: حساب کاربری و پرونده جامع
            </span>
          </div>
        </div>

        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
            <div className="w-32 h-32 rounded-3xl border-4 border-white bg-white shadow-xl overflow-hidden shrink-0 relative">
              <img 
                src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-800 mb-1">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-slate-600 font-medium text-xs">
                  <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl font-bold">
                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{user.rank}</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{user.department}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-indigo-100"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>ثبت درخواست اصلاح اطلاعات</span>
                </button>
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500">امتیاز کل</div>
                  <div className="text-base font-black text-indigo-600 font-mono">{user.score}</div>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500">رتبه فعلی</div>
                  <div className="text-base font-black text-emerald-600">{user.level}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notice about locked data */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl mb-8 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">سیاست امنیتی پرونده پرسنلی فراجا:</strong> به منظور حفظ صحت اسناد رسمی و سوابق خدمتی، اطلاعات شناسنامه‌ای، استخدامی و رسته به صورت مستقیم قابل ویرایش نیستند. جهت هرگونه تغییر، از دکمه «ثبت درخواست اصلاح اطلاعات» استفاده فرمایید تا موضوع در کارتابل میز خدمت بررسی و اعمال شود.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Personnel Data */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-4">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-500" />
                    اطلاعات هویتی و سازمانی
                  </h2>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> غیرقابل ویرایش مستقیم
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-xs">
                  <div>
                    <div className="text-slate-400 mb-1 flex items-center gap-1">
                      کد کارکنان (پرسنلی) <Lock className="w-3 h-3 text-slate-300" />
                    </div>
                    <div className="font-bold text-slate-800 font-mono text-sm">{user.employeeId}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1 flex items-center gap-1">
                      کد ملی <Lock className="w-3 h-3 text-slate-300" />
                    </div>
                    <div className="font-bold text-slate-800 font-mono text-sm">{user.nationalId}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1 flex items-center gap-1">
                      تاریخ تولد <Lock className="w-3 h-3 text-slate-300" />
                    </div>
                    <div className="font-bold text-slate-800">{user.birthDate}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1 flex items-center gap-1">
                      تاریخ استخدام <Lock className="w-3 h-3 text-slate-300" />
                    </div>
                    <div className="font-bold text-slate-800">{user.employmentDate}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">وضعیت اشتغال</div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      {user.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Data */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-4">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    اطلاعات تماس و محل سکونت
                  </h2>
                  <button 
                    onClick={() => { setEditFieldType("اطلاعات تماس و آدرس"); setIsEditModalOpen(true); }}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> درخواست اصلاح آدرس/تلفن
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-xs">
                  <div>
                    <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> شماره موبایل
                    </div>
                    <div className="font-bold text-slate-800 font-mono text-sm">{user.phone}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> ایمیل سازمانی
                    </div>
                    <div className="font-bold text-slate-800 font-mono text-sm">{user.email}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> آدرس محل سکونت
                    </div>
                    <div className="font-medium text-slate-800 leading-relaxed">{user.address}</div>
                  </div>
                </div>
              </div>

              {/* Submitted Correction Requests in Service Desk */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-indigo-600" />
                    تاریخچه درخواست‌های اصلاح اطلاعات در میز خدمت
                  </h3>
                  <Link to="/service-desk/requests" className="text-[11px] text-indigo-600 font-bold flex items-center gap-1 hover:underline">
                    <span>مشاهده در میز خدمت</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {submittedRequests.map((req, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-600">{req.id}</span>
                          <span className="font-bold text-slate-800">{req.field}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">مقدار جدید درخواستی: {req.newValue}</div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          <Clock className="w-3 h-3" /> {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6">
              <div className="bg-indigo-50/60 rounded-2xl p-6 border border-indigo-100 space-y-4">
                <h2 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  خلاصه وضعیت سرمایه انسانی
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-50 flex items-center justify-between">
                    <span className="text-slate-600">مانده مرخصی استحقاقی</span>
                    <span className="font-bold text-slate-800">۱۸ روز</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-50 flex items-center justify-between">
                    <span className="text-slate-600">امتیاز قابل استفاده رفاهی</span>
                    <span className="font-black text-indigo-600 font-mono">۲,۱۵۰</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-50 flex items-center justify-between">
                    <span className="text-slate-600">دوره‌های در حال گذراندن</span>
                    <span className="font-bold text-emerald-600">۲ دوره</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-50 flex items-center justify-between">
                    <span className="text-slate-600">هدف بعدی در مسیر شغلی</span>
                    <span className="font-bold text-indigo-700">کاردان اطلاعات</span>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-500" />
                  شایستگی‌های ارزیابی شده
                </h2>
                <div className="space-y-3.5">
                  {[
                    { name: "امنیت شبکه و عملیات فاوا", progress: 90 },
                    { name: "مدیریت بحران و صحنه جرم", progress: 75 },
                    { name: "گزارش‌نویسی و مستندسازی", progress: 85 },
                    { name: "مهارت‌های ارتباطی و مذاکره", progress: 80 },
                  ].map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <span className="font-bold text-slate-600 font-mono">{skill.progress}٪</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Request Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">ثبت درخواست اصلاح اطلاعات در میز خدمت</h3>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCorrectionRequest} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">انتخاب بخش مورد نظر جهت اصلاح:</label>
                  <select
                    value={editFieldType}
                    onChange={(e) => setEditFieldType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="اطلاعات تماس و آدرس">اطلاعات تماس و آدرس محل سکونت</option>
                    <option value="مدرک تحصیلی و رشته">مدرک تحصیلی و رشته جدید</option>
                    <option value="شماره حساب بانکی واریز حقوق">شماره شبا و حساب واریز حقوق</option>
                    <option value="اطلاعات هویتی و شناسنامه‌ای">اطلاعات هویتی و شناسنامه‌ای</option>
                    <option value="سایر مشخصات فردی">سایر مشخصات فردی</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">اطلاعات صحیح و جدید درخواستی:</label>
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="مقدار صحیح را دقیقاً وارد کنید..."
                    rows={3}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">دلیل اصلاح و توضیحات تکمیلی:</label>
                  <input
                    type="text"
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                    placeholder="مثال: تغییر محل سکونت و اجاره‌نامه جدید"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="border border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 space-y-1.5">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                  <div className="text-[11px] font-bold text-slate-700">پیوست مدارک مثبته (تصویر سند، کارت ملی یا مدرک)</div>
                  <div className="text-[10px] text-slate-400">حداکثر حجم: ۵ مگابایت (اختیاری)</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-100"
                  >
                    ثبت و ارسال به کارتابل
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
