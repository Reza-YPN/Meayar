import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Heart, Coins, TrendingUp } from "lucide-react";

export function SocialPage() {
  const [amount, setAmount] = useState("");
  const [cause, setCause] = useState("mosques");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalDonated, setTotalDonated] = useState(1500000); // 1.5M tomans

  const handleDonate = () => {
    if (!amount) return;
    setIsModalOpen(true);
  };

  const confirmDonation = () => {
    setIsModalOpen(false);
    setTotalDonated(prev => prev + (parseInt(amount.replace(/,/g, "")) / 10)); // converting rial to toman roughly
    setAmount("");
  };

  const pointsEarned = amount ? Math.floor(parseInt(amount.replace(/,/g, "") || "0") / 1000000) : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" dir="rtl">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
          <Heart className="absolute -left-6 -bottom-6 w-32 h-32 text-indigo-400/20" />
          <div className="relative z-10">
            <span className="text-indigo-100 text-sm font-bold block mb-1">مجموع کمک‌های شما</span>
            <div className="text-3xl font-black">{totalDonated.toLocaleString()} <span className="text-sm font-medium">تومان</span></div>
          </div>
          <div className="relative z-10 mt-4 text-xs font-medium text-indigo-100 bg-indigo-800/30 p-2 rounded-lg inline-block">
            معادل {(totalDonated / 100000).toFixed(0)} امتیاز رفاهی کسب شده
          </div>
        </div>
        
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center">
           <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                 <Coins className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="font-black text-slate-800 text-lg mb-2">مشارکت‌های اجتماعی (مسئولیت اجتماعی)</h3>
                 <p className="text-slate-500 text-sm leading-relaxed font-medium">
                   به پاس اقدام خیرخواهانه شما، به ازای هر <strong className="text-slate-800">۱۰۰ هزار تومان</strong> مشارکت اجتماعی در طرح‌های مصوب، <strong className="text-emerald-600">۱ امتیاز</strong> به مجموع امتیازات رفاهی شما اضافه خواهد شد.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            ثبت مشارکت جدید
          </h3>
          
          <div className="flex flex-col md:flex-row items-end gap-6 max-w-4xl mb-8">
            <div className="flex-1 w-full text-right">
              <label className="text-sm font-bold text-slate-700 block mb-3">
                محل مصرف هزینه خیرانه شما
              </label>
              <div className="relative">
                <select 
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-700 appearance-none text-right focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer" 
                  dir="rtl"
                >
                  <option value="mosques">مشارکت درساخت، تجهیز و توسعه مساجد و نمازخانه‌های فراجا</option>
                  <option value="orphans">کمک به خانواده‌های ایتام و نیازمند فراجا</option>
                  <option value="health">حمایت از بیماران صعب‌العلاج ناجا</option>
                  <option value="school">مشارکت در ساخت مدارس در مناطق محروم مرزی</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full text-right">
              <label className="text-sm font-bold text-slate-700 block mb-3">
                مبلغ مشارکت (ریال)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setAmount(val ? parseInt(val).toLocaleString() : "");
                }}
                placeholder="مثال: ۱,۰۰۰,۰۰۰"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left dir-ltr"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-800 text-sm font-medium mb-4 sm:mb-0">
               <Coins className="w-4 h-4 text-indigo-500" />
               امتیاز دریافتی تقریبی: <span className="font-black text-lg">{pointsEarned}</span> امتیاز
            </div>
            <button 
              onClick={handleDonate}
              disabled={!amount}
              className="w-full sm:w-auto bg-[#4455A5] text-white px-10 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              پرداخت و ثبت مشارکت
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">تایید پرداخت</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
                مبلغ <span className="font-black text-slate-800">{amount} ریال</span> جهت مشارکت اجتماعی کسر خواهد شد. آیا تایید می‌کنید؟
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
                >
                  انصراف
                </button>
                <button 
                  onClick={confirmDonation}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition shadow-sm"
                >
                  بله، پرداخت
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
