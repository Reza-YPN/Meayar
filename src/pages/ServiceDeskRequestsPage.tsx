import { ClipboardList, Search, Filter, Eye, MoreHorizontal, X, FileText, CheckCircle2, Circle, Clock, Check, Download, RefreshCw, Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const REQUESTS = [
  {
    id: "۱۵۰۰۲۵۸۹۶",
    date: "۱۴۰۵/۱۲/۰۸",
    subject: "نامه اشتغال به کار",
    unit: "دبیرخانه",
    status: "درخواست شده",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "۱۵۰۰۲۳۲۵۸",
    date: "۱۴۰۵/۱۱/۰۶",
    subject: "درخواست وام ضروری",
    unit: "خدمات رفاهی",
    status: "در حال پیگیری",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "۱۵۰۰۰۲۵۸۶",
    date: "۱۴۰۵/۱۱/۰۵",
    subject: "تغییر شماره حساب واریز حقوق",
    unit: "پشتیبان پیشخوان",
    status: "رد شده",
    statusColor: "bg-rose-100 text-rose-700",
  },
  {
    id: "۱۵۰۰۰۱۲۵۸",
    date: "۱۴۰۵/۱۱/۰۴",
    subject: "تغییر کلمه عبور",
    unit: "پشتیبان پیشخوان",
    status: "تایید شده",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];

export function ServiceDeskRequestsPage() {
  const [modalState, setModalState] = useState<'none' | 'history' | 'attachments'>('none');
  const [showFilters, setShowFilters] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600 flex items-center justify-center gap-2">
            ۵
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="text-sm text-slate-500 mt-1">تایید شده</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-2">
            ۶
            <Clock className="w-6 h-6" />
          </div>
          <div className="text-sm text-slate-500 mt-1">در حال پیگیری</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-rose-500 flex items-center justify-center gap-2">
            ۲
            <X className="w-6 h-6" />
          </div>
          <div className="text-sm text-slate-500 mt-1">رد شده</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible relative z-10">
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-end">
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو"
                className="bg-white border border-slate-200 rounded-md px-3 py-2 text-sm pl-8 w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            
            <div className="flex items-center gap-2 bg-[#4a55a2] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition" onClick={() => setShowFilters(!showFilters)}>
               <Filter className="w-4 h-4" /> 
               <span className="text-sm">فیلتر</span>
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 left-0 w-[500px] bg-white rounded-xl shadow-xl border border-slate-200 p-6 z-50 origin-top-left"
                >
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-emerald-600 text-xs font-semibold hover:text-emerald-700 cursor-pointer">برو به امروز</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4 bg-slate-50 rounded-lg p-1 border border-slate-100">
                        <span className="px-4 py-1.5 bg-white shadow-sm rounded-md text-slate-800 text-sm font-semibold">از</span>
                        <span className="px-4 py-1.5 text-slate-500 text-sm">تا</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-700 font-bold">
                           <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
                           فروردین
                           <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 font-bold">
                           <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
                           ۱۴۰۵
                           <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm mb-6">
                     <div className="text-slate-400 font-medium py-1">ش</div>
                     <div className="text-slate-400 font-medium py-1">ی</div>
                     <div className="text-slate-400 font-medium py-1">د</div>
                     <div className="text-slate-400 font-medium py-1">س</div>
                     <div className="text-slate-400 font-medium py-1">چ</div>
                     <div className="text-slate-400 font-medium py-1">پ</div>
                     <div className="text-slate-400 font-medium py-1">ج</div>
                     
                     <div className="py-1"></div><div className="py-1"></div><div className="py-1"></div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۳</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۴</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۵</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۶</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۷</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۸</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۹</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۰</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۱</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۲</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۳</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۴</div>
                     <div className="py-1 bg-green-700 text-white rounded-md font-bold cursor-pointer relative">۱۵
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-800 text-white text-[10px] px-1 rounded shadow-sm">از</div>
                     </div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۶</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۷</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۸</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۱۹</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۰</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۱</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۲</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۳</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۴</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۵</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۶</div>
                     <div className="py-1 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer">۲۷</div>
                     <div className="py-1 bg-green-700 text-white rounded-md font-bold cursor-pointer">۲۸</div>
                     <div className="py-1 bg-emerald-50 text-emerald-800 rounded-md cursor-pointer">۲۹</div>
                     <div className="py-1 bg-emerald-50 text-emerald-800 rounded-md cursor-pointer">۳۰</div>
                     <div className="py-1 bg-emerald-50 text-emerald-800 rounded-md cursor-pointer">۳۱</div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                     <span className="text-slate-500 text-xs font-medium">از ۲۸ فروردین - تا ۴ اردیبهشت</span>
                     <div className="flex gap-4 items-center">
                        <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">انصراف</button>
                        <button className="bg-green-700 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-800 transition shadow-sm">تایید</button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="overflow-visible min-h-[400px]">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold w-16 text-center"></th>
                <th className="p-4 font-semibold">شماره درخواست</th>
                <th className="p-4 font-semibold flex items-center gap-1 cursor-pointer hover:text-slate-800"><Filter className="w-3.5 h-3.5"/> تاریخ ثبت</th>
                <th className="p-4 font-semibold">موضوع درخواست</th>
                <th className="p-4 font-semibold flex items-center gap-1 cursor-pointer hover:text-slate-800"><Filter className="w-3.5 h-3.5"/> واحد ارجاع شده</th>
                <th className="p-4 font-semibold flex items-center gap-1 cursor-pointer hover:text-slate-800"><Filter className="w-3.5 h-3.5"/> وضعیت</th>
                <th className="p-4 font-semibold text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REQUESTS.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50 transition relative">
                  <td className="p-4 text-center text-slate-400 font-mono text-xs">{idx + 1}</td>
                  <td className="p-4 text-slate-700 font-medium">{row.id}</td>
                  <td className="p-4 text-slate-600">{row.date}</td>
                  <td className="p-4 text-slate-700">{row.subject}</td>
                  <td className="p-4 text-slate-600">{row.unit}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1.5 ${
                         row.status === 'تایید شده' ? 'bg-[#84cc16] text-white' :
                         row.status === 'رد شده' ? 'bg-[#ef4444] text-white' :
                         row.status === 'در حال پیگیری' ? 'bg-[#f59e0b] text-white' :
                         'bg-[#f59e0b] text-white'
                      }`}
                    >
                      {row.status === 'تایید شده' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {row.status === 'رد شده' && <X className="w-3.5 h-3.5" />}
                      {(row.status === 'در حال پیگیری' || row.status === 'درخواست شده') && <Clock className="w-3.5 h-3.5" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-center relative">
                    <button 
                       onClick={() => setShowActionMenu(showActionMenu === row.id ? null : row.id)}
                       className="text-slate-400 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition focus:outline-none"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    
                    <AnimatePresence>
                       {showActionMenu === row.id && (
                          <>
                             <div className="fixed inset-0 z-30" onClick={() => setShowActionMenu(null)}></div>
                             <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute left-10 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-40 overflow-hidden py-2 origin-top-left"
                             >
                                <button 
                                   onClick={() => { setModalState('history'); setShowActionMenu(null); }}
                                   className="w-full text-right px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                                >
                                   تاریخچه
                                </button>
                                <button 
                                   className="w-full text-right px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                                >
                                   ویرایش
                                </button>
                                <button 
                                   onClick={() => { setModalState('attachments'); setShowActionMenu(null); }}
                                   className="w-full text-right px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                                >
                                   پیوست‌ها
                                </button>
                             </motion.div>
                          </>
                       )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 flex items-center justify-between border-t border-slate-100 bg-white rounded-b-xl">
             <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span>تعداد سطرهای در هر صفحه:</span>
                <select className="border border-slate-200 rounded p-1 text-slate-700 bg-transparent outline-none">
                   <option>۱۰</option>
                   <option>۲۰</option>
                   <option>۵۰</option>
                </select>
             </div>
             
             <div className="flex items-center gap-1 text-sm">
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition"><ChevronRight className="w-4 h-4"/></button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold">۱</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-700 transition">۲</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-700 transition">۳</button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-700 transition">۸</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-700 transition">۹</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-700 transition">۱۰</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition"><ChevronLeft className="w-4 h-4"/></button>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
         {modalState === 'history' && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={() => setModalState('none')}
            >
               <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
               >
                  <button 
                     onClick={() => setModalState('none')}
                     className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                  >
                     <X className="w-5 h-5" />
                  </button>
                  
                  <div className="p-8 text-center border-b border-slate-100">
                     <h2 className="text-xl font-bold text-slate-800 mt-2">تاریخچه درخواست</h2>
                     <p className="text-slate-500 text-sm mt-2">در اینجا می‌توانید تاریخچه پیگیری درخواست خود را مشاهده کنید.</p>
                  </div>
                  
                  <div className="p-8">
                     <div className="relative border-r-2 border-indigo-100 pr-8 space-y-8 mr-4">
                        <div className="relative">
                           <div className="absolute -right-[41px] top-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                              <Check className="w-3 h-3 text-white" />
                           </div>
                           <div className="flex justify-between items-start">
                              <h4 className="font-bold text-slate-800 text-sm">۱. ثبت درخواست کارمند</h4>
                              <span className="text-slate-500 text-xs font-mono">۱۴۰۵/۰۵/۱۰</span>
                           </div>
                        </div>
                        
                        <div className="relative">
                           <div className="absolute -right-[41px] top-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                              <Check className="w-3 h-3 text-white" />
                           </div>
                           <div className="flex justify-between items-start">
                              <h4 className="font-bold text-slate-800 text-sm">۲. تایید واحد منابع انسانی</h4>
                              <span className="text-slate-500 text-xs font-mono">۱۴۰۵/۰۶/۱۰</span>
                           </div>
                        </div>
                        
                        <div className="relative">
                           <div className="absolute -right-[41px] top-0 w-6 h-6 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                           </div>
                           <div className="flex justify-between items-start">
                              <h4 className="font-bold text-slate-800 text-sm">۳. تایید فرماندهی کل</h4>
                              <span className="text-slate-500 text-xs font-mono">۱۴۰۵/۰۶/۲۶</span>
                           </div>
                        </div>
                        
                        <div className="relative">
                           <div className="absolute -right-[41px] top-0 w-6 h-6 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center">
                           </div>
                           <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-slate-500 text-sm">۴. ارجاع به واحد خدمات رفاهی برای اجرا</h4>
                           </div>
                        </div>
                        
                        <div className="relative">
                           <div className="absolute -right-[41px] top-0 w-6 h-6 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center">
                           </div>
                           <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-slate-500 text-sm">۵. تکمیل درخواست و ارجاع به بایگانی</h4>
                           </div>
                        </div>
                     </div>
                     
                     <button 
                        onClick={() => setModalState('none')} 
                        className="w-full bg-[#4a55a2] text-white py-3.5 rounded-xl font-bold mt-10 hover:bg-indigo-700 transition-colors shadow-sm"
                     >
                        بستن
                     </button>
                  </div>
               </motion.div>
            </motion.div>
         )}

         {modalState === 'attachments' && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={() => setModalState('none')}
            >
               <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative"
               >
                  <button 
                     onClick={() => setModalState('none')}
                     className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                  >
                     <X className="w-5 h-5" />
                  </button>
                  
                  <div className="p-8 text-center border-b border-slate-100">
                     <h2 className="text-xl font-bold text-slate-800 mt-2">فایل‌های پیوست</h2>
                     <p className="text-slate-500 text-sm mt-2">در اینجا می‌توانید فایل‌های پیوست شده به درخواست خود را مشاهده کنید.</p>
                  </div>
                  
                  <div className="p-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Mock PDF file */}
                        <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center">
                           <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-rose-500 font-bold text-xl relative">
                              PDF
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs">!</div>
                           </div>
                           <h4 className="font-bold text-slate-800 mb-6">{"{اسم فایل}.png"}</h4>
                           <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden mb-6 relative">
                              <div className="absolute inset-4 text-[6px] text-slate-400 leading-tight blur-[1px]">
                                 1- عدم وصول چکها با مطالبه مبلغ مندرج در بند 1-3 ماده 3 این مبایعه نامه از سوی فروشنده، فروشندگان تاثیری در صحت معامله ایجاد نخواهد کرد.<br/>
                                 1-4- طرفین متعهد شدند جهت تنظیم سند طبق قرارداد در تاریخ / / 13 در دفتر اسناد رسمی شماره<br/>
                                 ماده 4: شرایط مربوط به تنظیم سند<br/>
                                 و یا دفترخانه ای که بانک یا سازمان متبوع وام گیرنده<br/>
                                 مقرر می نماید حاضر شوند و با انجام کلیه تعهدات و شرایط مندرج در مبایعه نامه نسبت به تنظیم سند رسمی انتقال قطعی اقدام نمایند و در صورت عدم حضور هر یک از طرفین در دفتر اسناد رسمی گواهی عدم حضور در دفترخانه باید به امضای<br/>
                                 نماینده قانونی دفترخانه برسد مگر اینکه در روز مذکور سند به نام خریدار یا خریداران منتقل گردد و در هر صورت عدم<br/>
                                 حضور هر یک از طرفین در دفترخانه اسناد رسمی برای تنظیم سند، گواهی سر دفتر مثبت تخلف نامبرده می باشد.<br/>
                                 2-4- عدم ارائه مستندات و مدارک لازم جهت تنظیم سند از طرف فروشنده و عدم پرداخت ثمن توسط خریدار در حکم عدم<br/>
                                 حضور است و سر دفتر در موارد مذکور مجاز به صدور گواهی عدم حضور می باشد.<br/>
                                 ماده 5: شرایط تسلیم مورد معامله<br/>
                                 1-5- فروشنده موظف است مورد معامله را در تاریخ / / 13 با تمام توابع و ملحقات و منضمات آن تسلیم خریدار<br/>
                                 کند و هر گونه موانع در استیفاء و بهره برداری کامل از مورد معامله را برطرف کند.<br/>
                                 2-5- در صورتیکه معلوم گردد مورد معامله به جهت قوه قاهره قابلیت انتقال نداشته و این عامل مربوط به زمان انعقاد<br/>
                                 مبایعه نامه باشد معامله باطل است و فروشنده موظف است ثمن دریافتی را به خریدار عودت نماید.
                              </div>
                           </div>
                           <div className="flex w-full gap-3">
                              <button className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                                 <Download className="w-4 h-4" /> دانلود فایل
                              </button>
                              <button className="flex-1 bg-white border border-green-600 text-green-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
                                 <RefreshCw className="w-4 h-4" /> تغییر فایل
                              </button>
                           </div>
                        </div>
                        
                        {/* Mock Image file */}
                        <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center">
                           <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 text-purple-500 relative">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                           </div>
                           <h4 className="font-bold text-slate-800 mb-6">{"{اسم فایل}.png"}</h4>
                           <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden mb-6 relative">
                              <div className="absolute inset-4 text-[6px] text-slate-400 leading-tight blur-[1px]">
                                 1- عدم وصول چکها با مطالبه مبلغ مندرج در بند 1-3 ماده 3 این مبایعه نامه از سوی فروشنده، فروشندگان تاثیری در صحت معامله ایجاد نخواهد کرد.<br/>
                                 1-4- طرفین متعهد شدند جهت تنظیم سند طبق قرارداد در تاریخ / / 13 در دفتر اسناد رسمی شماره<br/>
                                 ماده 4: شرایط مربوط به تنظیم سند<br/>
                                 و یا دفترخانه ای که بانک یا سازمان متبوع وام گیرنده<br/>
                                 مقرر می نماید حاضر شوند و با انجام کلیه تعهدات و شرایط مندرج در مبایعه نامه نسبت به تنظیم سند رسمی انتقال قطعی اقدام نمایند و در صورت عدم حضور هر یک از طرفین در دفتر اسناد رسمی گواهی عدم حضور در دفترخانه باید به امضای<br/>
                                 نماینده قانونی دفترخانه برسد مگر اینکه در روز مذکور سند به نام خریدار یا خریداران منتقل گردد و در هر صورت عدم<br/>
                                 حضور هر یک از طرفین در دفترخانه اسناد رسمی برای تنظیم سند، گواهی سر دفتر مثبت تخلف نامبرده می باشد.<br/>
                                 2-4- عدم ارائه مستندات و مدارک لازم جهت تنظیم سند از طرف فروشنده و عدم پرداخت ثمن توسط خریدار در حکم عدم<br/>
                                 حضور است و سر دفتر در موارد مذکور مجاز به صدور گواهی عدم حضور می باشد.<br/>
                                 ماده 5: شرایط تسلیم مورد معامله<br/>
                                 1-5- فروشنده موظف است مورد معامله را در تاریخ / / 13 با تمام توابع و ملحقات و منضمات آن تسلیم خریدار<br/>
                                 کند و هر گونه موانع در استیفاء و بهره برداری کامل از مورد معامله را برطرف کند.<br/>
                                 2-5- در صورتیکه معلوم گردد مورد معامله به جهت قوه قاهره قابلیت انتقال نداشته و این عامل مربوط به زمان انعقاد<br/>
                                 مبایعه نامه باشد معامله باطل است و فروشنده موظف است ثمن دریافتی را به خریدار عودت نماید.
                              </div>
                           </div>
                           <div className="flex w-full gap-3">
                              <button className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                                 <Download className="w-4 h-4" /> دانلود عکس
                              </button>
                              <button className="flex-1 bg-white border border-green-600 text-green-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
                                 <RefreshCw className="w-4 h-4" /> تغییر عکس
                              </button>
                           </div>
                        </div>
                     </div>
                     
                     <button 
                        onClick={() => setModalState('none')} 
                        className="w-full bg-[#4a55a2] text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                     >
                        بستن
                     </button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
