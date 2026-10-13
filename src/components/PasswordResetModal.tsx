import React, { useState, useEffect } from "react";
import { X, RefreshCw, CheckCircle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CAPTCHA_CODES = ["54bxm", "2p9ax", "8m3wd", "4v7kq", "9t5ey", "3r6nz", "7g2hs"];

export function PasswordResetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [personnelCode, setPersonnelCode] = useState("۱۲۳۴۵۶۷۸۹۰");
  const [captchaCode, setCaptchaCode] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaIndex, setCaptchaIndex] = useState(0);
  const [isSuccessStep, setIsSuccessStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const refreshCaptcha = () => {
    setUserCaptchaInput("");
    setErrorMessage("");
    const nextIdx = (captchaIndex + 1) % CAPTCHA_CODES.length;
    setCaptchaIndex(nextIdx);
    setCaptchaCode(CAPTCHA_CODES[nextIdx]);
  };

  useEffect(() => {
    if (isOpen) {
      setCaptchaCode(CAPTCHA_CODES[0]);
      setCaptchaIndex(0);
      setUserCaptchaInput("");
      setPersonnelCode("۱۲۳۴۵۶۷۸۹۰");
      setIsSuccessStep(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personnelCode.trim()) {
      setErrorMessage("لطفاً نام کاربری (کد کارکنان) را وارد فرمایید.");
      return;
    }

    if (userCaptchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage("کد امنیتی وارد شده اشتباه است. مجدداً تلاش کنید.");
      refreshCaptcha();
      return;
    }

    setIsSuccessStep(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col justify-between"
        >
          {/* Modal Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-extrabold text-slate-800 text-sm">تغییر کلمه عبور</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            {!isSuccessStep ? (
              /* Step 1: Input and Captcha */
              <form onSubmit={handleSubmit} className="space-y-5 text-right">
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  به منظور تغییر کلمه عبور، نام کاربری خود را وارد فرمایید.
                </p>

                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    نام کاربری (کد کارکنان) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={personnelCode}
                    onChange={(e) => setPersonnelCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-center tracking-widest"
                    placeholder="کد کارکنان ۱۰ رقمی"
                  />
                </div>

                {/* Captcha Block */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-center gap-4">
                    {/* Generates a nice styled Captcha card */}
                    <div className="relative bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg px-6 py-2.5 select-none overflow-hidden flex items-center justify-center min-w-[120px]">
                      {/* Diagonal grid lines inside captcha */}
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_10%,transparent_10%,transparent_50%,#000_50%,#000_60%,transparent_60%,transparent_100%)] bg-[length:15px_15px]"></div>
                      <span className="text-lg font-black text-emerald-800 tracking-wider italic font-mono select-none select-none blur-[0.2px]">
                        {captchaCode}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={userCaptchaInput}
                      onChange={(e) => setUserCaptchaInput(e.target.value)}
                      placeholder="کد امنیتی رو به رو را وارد کنید."
                      className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs text-center font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#4455A5] hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    ارسال
                  </button>
                </div>
              </form>
            ) : (
              /* Step 2: Success Step */
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-indigo-50 text-[#4455A5] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <h4 className="font-extrabold text-slate-800 text-sm px-4 leading-relaxed">
                  تیم پشتیبانی برای انجام فرآیند تغییر کلمه عبور، با شما در ارتباط خواهد بود.
                </h4>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="w-full bg-[#4455A5] hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    متوجه شدم!
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
