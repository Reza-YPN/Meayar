import { useState } from "react";
import { ArrowRight, CheckCircle2, Circle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import deductionIllustration from "../assets/images/salary_deduction_form_illustration_1783491869814.jpg";

export function SalaryDeductionRequestPage() {
  const [step, setStep] = useState(1);
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full relative pt-8 md:pt-0">
          <Link to="/service-desk" className="absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-800">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-slate-800 text-center">
              درخواست نامه کسر از حقوق
            </h2>
            
            {/* Progress Stepper */}
            <div className="flex items-center justify-center w-full max-w-2xl mt-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
              
              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                {step >= 1 ? <CheckCircle2 className="w-6 h-6 text-indigo-600 bg-white" /> : <Circle className="w-6 h-6 text-slate-300 bg-white" />}
                <span className={`text-sm font-medium ${step >= 1 ? 'text-indigo-600' : 'text-slate-500'}`}>۱. پرکردن فرم</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                {step >= 2 ? <CheckCircle2 className="w-6 h-6 text-indigo-600 bg-white" /> : <Circle className="w-6 h-6 text-slate-300 bg-white" />}
                <span className={`text-sm font-medium ${step >= 2 ? 'text-indigo-600' : 'text-slate-500'}`}>۲. اعلام رضایت</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                {step >= 3 ? <CheckCircle2 className="w-6 h-6 text-indigo-600 bg-white" /> : <Circle className="w-6 h-6 text-slate-300 bg-white" />}
                <span className={`text-sm font-medium ${step >= 3 ? 'text-indigo-600' : 'text-slate-500'}`}>۳. ثبت نهایی</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Right Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 min-h-[500px] flex flex-col justify-between">
          
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 text-lg mb-6">
                فرم زیر را جهت ثبت درخواست لطفا پر کنید:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-2">نام بانک</label>
                  <select className="w-full bg-white border border-slate-300 rounded-md py-3 px-3 text-sm appearance-none outline-none focus:border-indigo-500">
                    <option>انتخاب</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-2">شعبه</label>
                  <select className="w-full bg-white border border-slate-300 rounded-md py-3 px-3 text-sm appearance-none outline-none focus:border-indigo-500">
                    <option>انتخاب</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-2">نوع وام</label>
                <select className="w-full bg-white border border-slate-300 rounded-md py-3 px-3 text-sm appearance-none outline-none focus:border-indigo-500">
                  <option>انتخاب</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-2">مبلغ قسط ماهیانه</label>
                  <input
                    type="text"
                    placeholder="مبلغ قسط ماهیانه را به ریال بنویسید."
                    className="w-full bg-white border border-slate-300 rounded-md py-3 px-3 text-sm outline-none focus:border-indigo-500 placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-2">مدت بازپرداخت</label>
                  <select className="w-full bg-white border border-slate-300 rounded-md py-3 px-3 text-sm appearance-none outline-none focus:border-indigo-500">
                    <option>انتخاب</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-2">تاریخ شروع کسر از حقوق</label>
                <div className="relative">
                  <select className="w-full bg-white border border-slate-300 rounded-md py-3 px-3 pr-10 text-sm appearance-none outline-none focus:border-indigo-500">
                    <option>انتخاب</option>
                  </select>
                  <Calendar className="w-5 h-5 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div className="pt-6 flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#6B78C2] hover:bg-indigo-600 text-white px-8 py-2.5 rounded-md text-sm font-medium transition"
                >
                  مرحله بعدی
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="font-bold text-slate-800 text-lg mb-6 leading-relaxed">
                اعلام رضایت کارمند مبنی بر اجازه به کارفرما برای کسر مبلغ اقساط از حقوق ماهیانه:
              </h3>
              
              <p className="text-slate-700 text-sm leading-loose text-justify mb-8">
                بدین‌وسیله اینجانب با اطلاع و رضایت کامل، درخواست تنظیم نامه کسر از حقوق با اطلاعات ذکر شده می‌نمایم.
                بدیهی است سازمان مجاز است تا زمان تسویه کامل وام، در صورت عدم بازپرداخت و درخواست بانک، مبالغ اقساط را از حقوق اینجانب کسر و به حساب آن بانک واریز نماید.
              </p>
              
              <div className="flex items-center gap-3 mb-auto">
                <input 
                  type="checkbox" 
                  id="accept" 
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <label htmlFor="accept" className="text-sm font-bold text-slate-800 cursor-pointer select-none">
                  با موارد فوق موافق هستم.
                </label>
              </div>
              
              <div className="pt-6 flex justify-end gap-3 mt-auto">
                <button 
                  onClick={() => setStep(1)}
                  className="border border-[#6B78C2] text-[#6B78C2] hover:bg-slate-50 px-8 py-2.5 rounded-md text-sm font-medium transition flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> مرحله قبل
                </button>
                <button 
                  disabled={!accepted}
                  onClick={() => setStep(3)}
                  className={`px-8 py-2.5 rounded-md text-sm font-medium transition ${accepted ? 'bg-[#6B78C2] hover:bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  مرحله بعدی
                </button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6 h-full flex flex-col items-center justify-center text-center py-6">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center animate-bounce shadow-md mb-4">
                <CheckCircle2 className="w-14 h-14" />
              </div>
              
              <div className="space-y-2 max-w-lg mb-8">
                <h3 className="text-2xl font-black text-slate-800">
                  درخواست شما ثبت شد.
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  در صفحه لیست درخواست‌ها می‌توانید درخواست خود را پیگیری کنید.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link
                  to="/service-desk/requests"
                  className="flex-1 bg-[#4455A5] hover:bg-indigo-700 text-white text-sm font-semibold py-3 px-6 rounded-lg transition shadow-sm text-center"
                >
                  لیست درخواست‌ها
                </Link>
                <Link
                  to="/service-desk"
                  className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold py-3 px-6 rounded-lg transition text-center"
                >
                  لیست خدمات قابل ارائه
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Left Image Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[500px]">
          <img 
            src={deductionIllustration} 
            alt="کسر از حقوق" 
            className="w-full h-full object-cover grayscale-[30%] opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
