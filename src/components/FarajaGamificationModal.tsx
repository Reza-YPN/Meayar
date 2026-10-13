import React, { useState } from "react";
import { 
  Award, 
  Star, 
  Target, 
  CheckCircle2, 
  Clock, 
  Shield, 
  ChevronLeft, 
  X, 
  FileText, 
  Medal, 
  Lock, 
  Unlock,
  BadgeCheck,
  Scale,
  Users,
  Calendar,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import farajaLogo from "../assets/images/faraja_logo.png";
import medalAttendance from "../assets/images/medal_attendance_discipline_1788934163012.jpg";
import medalRapidResponse from "../assets/images/medal_rapid_response_1788934177418.jpg";
import medalTacticalRider from "../assets/images/medal_tactical_integrity_1788934191837.jpg";
import { RankPromotionTimeline } from "./RankPromotionTimeline";

interface FarajaGamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStory?: (index: number) => void;
}

export function FarajaGamificationModal({ isOpen, onClose, onOpenStory }: FarajaGamificationModalProps) {
  const [activeTab, setActiveTab] = useState<"missions" | "badges" | "reward_chest" | "leaderboard" | "timeline">("missions");
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);
  const [claimedMissions, setClaimedMissions] = useState<number[]>([4]); // Mission 4 is already claimable
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClaimReward = (missionId: number, xpReward: number, title: string) => {
    if (!claimedMissions.includes(missionId)) {
      setClaimedMissions(prev => [...prev, missionId]);
      setToastMessage(`ثبت موفق: پاداش شایستگی و ${xpReward} امتیاز تعالی برای تکلیف "${title}" در سوابق خدمتی لحاظ گردید.`);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const handleClaimWeeklyIncentive = () => {
    setIsRewardClaimed(true);
    setToastMessage("تشویقی مصوب (واریز بن حکمت‌کارت و اولویت لوحه شیفت) در پرونده منظور شد.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-amber-600/30 flex flex-col max-h-[92vh] text-slate-100"
        >
          {/* Top Banner: Formal Police Station Aesthetic */}
          <div className="bg-gradient-to-r from-[#06180e] via-[#0c2819] to-[#091b26] border-b-2 border-amber-500/50 p-5 sm:p-6 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="flex items-start justify-between relative z-10 gap-4">
              <div className="flex items-center gap-4">
                {/* Officer Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-1 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80"
                      alt="ستوان‌دوم محمدرضا یزدان‌پناه"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-slate-950 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-500/60 flex items-center gap-1 shadow-md">
                    <Shield className="w-3 h-3 text-amber-400" />
                    پایه ۶
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-black text-amber-100 tracking-tight">
                      ستوان‌دوم محمدرضا یزدان‌پناه
                    </h2>
                    <span className="bg-amber-500/15 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Medal className="w-3 h-3 text-amber-400" />
                      کد پرسنلی: ۹۴۰۸۱۲۶ • رسته انتظامی
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-bold mt-1.5 flex items-center gap-2 flex-wrap">
                    <span>کلانتری ۱۰۳ گاندی • گشت ۱۱۰</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 hidden sm:inline-block" />
                    <span className="text-emerald-400 font-black">رتبه ۲ ارزیابی ماهانه (۲,۴۱۰ امتیاز)</span>
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveTab("timeline")}
                    className="mt-2 text-[11px] font-bold bg-slate-950/70 hover:bg-slate-950 text-amber-300 hover:text-amber-200 border border-amber-500/40 hover:border-amber-400 px-2.5 py-1 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                    title="مشاهده تایملاین ۴ ساله ارتقای درجه"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>توقف قانونی درجه: <strong className="text-white font-black">سال ۲ از ۴</strong> • موعد ترفیع: <strong className="text-white font-black">۱۴۰۶</strong></span>
                    <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-amber-500/30 p-1.5 hidden sm:flex items-center justify-center">
                  <img src={farajaLogo} alt="آرم فراجا" className="w-full h-full object-contain" />
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition cursor-pointer border border-white/10"
                  title="بستن پنجره"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* System Notification Message */}
          {toastMessage && (
            <div className="bg-amber-400 text-slate-950 text-xs font-black px-6 py-2.5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-900 shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-slate-950 font-black p-1 hover:bg-amber-500 rounded">✕</button>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="bg-[#0b1722] border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("missions")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === "missions"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                }`}
              >
                <Target className="w-4 h-4" />
                <span>شاخص‌های ارزیابی شیفت</span>
                <span className="bg-slate-950/30 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  ۴ شاخص
                </span>
              </button>

              <button
                onClick={() => setActiveTab("badges")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === "badges"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                }`}
              >
                <Medal className="w-4 h-4" />
                <span>نشان‌ها و الواح تقدیر</span>
                <span className="bg-slate-950/30 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  ۳ مورد
                </span>
              </button>

              <button
                onClick={() => setActiveTab("reward_chest")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === "reward_chest"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>تشویقی‌ها (ماده ۱۶۴)</span>
                {!isRewardClaimed && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === "leaderboard"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>جدول ارزیابی کلانتری</span>
              </button>

              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === "timeline"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>تایملاین ارتقای درجه (۴ ساله)</span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  قانون فراجا
                </span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-bold hidden lg:inline">
              دوره ارزیابی: تابستان ۱۴۰۵ • کلانتری ۱۰۳ گاندی
            </span>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-950/60 text-slate-200">

            {/* TAB 1: OPERATIONAL & DISCIPLINARY MISSIONS */}
            {activeTab === "missions" && (
              <div className="space-y-4">
                <div className="bg-[#0b2116]/80 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs text-slate-300 font-medium">
                    ثبت امتیازات بر مبنای ساعت ورود و خروج، رهیاب گشت ۱۱۰ و سامانه ۱۹۷ محاسبه می‌شود.
                  </p>
                </div>

                {/* Duty 1: Punctuality 07:00 AM */}
                <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-amber-500/70 transition space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shadow-sm shrink-0 bg-slate-950 p-0.5">
                        <img src={medalAttendance} alt="نشان انضباط" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-amber-100 text-sm">
                            حضور منظم راس ساعت ۰۷:۰۰ (۳۰ روز کاری)
                          </h4>
                          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-md">
                            انضباط فردی
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-bold mt-1">
                          حضور بدون تاخیر در صبحگاه کلانتری ۱۰۳ در ۳۰ روز کاری متوالی.
                        </p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-black px-2.5 py-1 rounded-lg">
                        +۳۵۰ امتیاز
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>۲۴ از ۳۰ روز حضور بدون تاخیر ثبت شد</span>
                      <span className="text-amber-400 font-black">۸۰٪ (۶ روز تا تکمیل سهمیه)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      ورود امروز: ساعت ۰۶:۵۴ در گیت ورودی کلانتری (منظم و بدون تاخیر)
                    </span>

                    <button
                      onClick={() => onOpenStory && onOpenStory(0)}
                      className="text-amber-300 hover:text-amber-200 font-black flex items-center gap-1 cursor-pointer bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700 transition"
                    >
                      <span>مشاهده گزارش تصویری</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Duty 2: 110 Response Speed */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-slate-700 transition space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-500/40 shadow-sm shrink-0 bg-slate-950 p-0.5">
                        <img src={medalRapidResponse} alt="نشان چابکی ۱۱۰" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-slate-100 text-sm">
                            حضور بر صحنه فوریت‌های ۱۱۰ زیر ۴.۵ دقیقه
                          </h4>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-md">
                            سرعت عمل گشت
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-bold mt-1">
                          رسیدن سریع به صحنه ماموریت‌های ۱۱۰ حوزه گاندی و ونک در ۵۰ ماموریت متوالی.
                        </p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-black px-2.5 py-1 rounded-lg">
                        +۴۰۰ امتیاز
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>۴۲ از ۵۰ ماموریت با میانگین ۴.۱ دقیقه انجام شد</span>
                      <span className="text-emerald-400 font-black">۸۴٪ (۸ ماموریت تا تکمیل)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-emerald-700 to-emerald-400 h-full rounded-full" style={{ width: "84%" }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex-wrap gap-2">
                    <span>
                      شاخص: انطباق زمان بی‌سیم ۱۱۰ با موقعیت جی‌پی‌اس خودروی گشت
                    </span>

                    <button
                      onClick={() => onOpenStory && onOpenStory(1)}
                      className="text-amber-300 hover:text-amber-200 font-black flex items-center gap-1 cursor-pointer bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700 transition"
                    >
                      <span>مشاهده گزارش تصویری</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Duty 3: Equipment Integrity & Safe Riding */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-slate-700 transition space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-blue-500/40 shadow-sm shrink-0 bg-slate-950 p-0.5">
                        <img src={medalTacticalRider} alt="نشان راکب نمونه" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-slate-100 text-sm">
                            ۱۸۰ ساعت گشت موتوری بدون سانحه ترافیکی
                          </h4>
                          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-black px-2 py-0.5 rounded-md">
                            ایمنی و نگهداری وسایل
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-bold mt-1">
                          گشت‌زنی با حفظ کامل سلامت موتورسیکلت سازمانی، سلاح کمری و بی‌سیم.
                        </p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-black px-2.5 py-1 rounded-lg">
                        +۳۰۰ امتیاز
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>۱۶۰ از ۱۸۰ ساعت گشت مصوب انجام شد</span>
                      <span className="text-blue-400 font-black">۸۹٪ (۲۰ ساعت تا اتمام دوره)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-blue-700 to-blue-400 h-full rounded-full" style={{ width: "89%" }} />
                    </div>
                  </div>
                </div>

                {/* Duty 4: Citizen Trust 197 (Completed & Claimable) */}
                <div className="bg-gradient-to-r from-[#0d281a] to-slate-900 border-2 border-emerald-500/60 rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-emerald-100 text-sm">
                            کسب رضایت ۹۸٪ در سامانه نظارت همگانی (۱۹۷)
                          </h4>
                          <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md">
                            تکمیل شد • آماده ثبت
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-bold mt-1">
                          تکریم مراجعین و صلح و سازش در ۱۸ پرونده در طول شیفت کاری.
                        </p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      {claimedMissions.includes(4) ? (
                        <span className="bg-slate-800 text-emerald-400 text-xs font-black px-3.5 py-2 rounded-xl border border-emerald-500/40 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          در پرونده ثبت شد
                        </span>
                      ) : (
                        <button
                          onClick={() => handleClaimReward(4, 300, "حسن برخورد و تکریم مراجعین در سامانه ۱۹۷")}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Award className="w-4 h-4" />
                          ثبت در سوابق (+۳۰۰ امتیاز)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OFFICIAL BADGES & COMMENDATIONS */}
            {activeTab === "badges" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Badge 1 */}
                  <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 p-1 bg-slate-950 shadow-md mb-3">
                      <img src={medalAttendance} alt="نشان انضباط" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1.5">
                      نشان انضباط
                    </span>
                    <h4 className="font-black text-amber-100 text-sm">حضور منظم راس ۰۷:۰۰</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      ۳۰ روز حضور مستمر و بدون تاخیر در صبحگاه کلانتری ۱۰۳ گاندی.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">مرجع صدور:</span>
                      <span className="text-amber-300 font-bold">کلانتری ۱۰۳ گاندی</span>
                    </div>
                    <div className="mt-2 w-full flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">وضعیت:</span>
                      <span className="text-emerald-400 font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> اعطا شد
                      </span>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-5 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/80 p-1 bg-slate-950 shadow-md mb-3">
                      <img src={medalRapidResponse} alt="نشان چابکی ۱۱۰" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1.5">
                      نشان چابکی گشت
                    </span>
                    <h4 className="font-black text-emerald-100 text-sm">واکنش سریع فوریت‌های ۱۱۰</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      حضور بر صحنه ماموریت‌ها با میانگین ۴.۱ دقیقه در حوزه گاندی و ونک.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">مرجع صدور:</span>
                      <span className="text-emerald-300 font-bold">مرکز کنترل ۱۱۰</span>
                    </div>
                    <div className="mt-2 w-full flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">وضعیت:</span>
                      <span className="text-emerald-400 font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> اعطا شد
                      </span>
                    </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-5 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-400/80 p-1 bg-slate-950 shadow-md mb-3">
                      <img src={medalTacticalRider} alt="نشان راکب نمونه" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1.5">
                      نشان نگهداری وسایل
                    </span>
                    <h4 className="font-black text-blue-100 text-sm">راکب نمونه و صیانت از تجهیزات</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      ۱۸۰ ساعت گشت بدون سانحه و حفظ سلامت کامل موتور و سلاح سازمانی.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">مرجع صدور:</span>
                      <span className="text-blue-300 font-bold">آماد و پشتیبانی</span>
                    </div>
                    <div className="mt-2 w-full flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">وضعیت:</span>
                      <span className="text-emerald-400 font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> اعطا شد
                      </span>
                    </div>
                  </div>
                </div>

                {/* Future Badges */}
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
                  <h4 className="font-black text-slate-200 text-xs flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-400" />
                    نشان‌های در دست اقدام:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-3 opacity-80">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                        <Shield className="w-5 h-5 text-amber-500/80" />
                      </div>
                      <div>
                        <span className="font-black text-xs text-slate-200">نشان مهارت تیراندازی</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">کسب نمره بالای ۹۰ در آزمون دوره‌ای تیراندازی کلانتری.</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-3 opacity-80">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                        <Award className="w-5 h-5 text-emerald-500/80" />
                      </div>
                      <div>
                        <span className="font-black text-xs text-slate-200">نشان سرپرستی گشت</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">گذراندن دوره تکمیلی سرپرستی گشت‌های انتظامی.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: INCENTIVE MEASURES (ARTICLE 164) */}
            {activeTab === "reward_chest" && (
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-amber-500/40 text-center flex flex-col items-center space-y-5">
                <div className="w-20 h-20 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 shadow-inner">
                  <Scale className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-black text-amber-100">
                    بسته تشویقی ماهانه (ماده ۱۶۴ قانون استخدام ناجا)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 max-w-lg mx-auto leading-relaxed">
                    کارکنانی که شاخص‌های ارزیابی ماهانه را کسب کنند، از تشویقات زیر بهره‌مند می‌شوند:
                  </p>
                </div>

                {!isRewardClaimed ? (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 max-w-md w-full text-right space-y-4">
                    <div className="text-xs font-black text-amber-300 border-b border-slate-800 pb-2 flex items-center justify-between">
                      <span>موارد تشویقی احراز شده:</span>
                      <span className="text-emerald-400 font-mono">وضعیت: تایید شده</span>
                    </div>

                    <ul className="text-xs text-slate-300 space-y-2 pr-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>واریز ۵۰۰,۰۰۰ تومان بن خرید به حکمت‌کارت</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>۳ روز اولویت در انتخاب نوبت شیفت کاری ماه آینده</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>درج تقدیر کتبی در پرونده کارگزینی</span>
                      </li>
                    </ul>

                    <button
                      onClick={handleClaimWeeklyIncentive}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      <span>ثبت و اعمال تشویقی در پرونده</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#0b2619] border border-emerald-500/50 rounded-2xl p-5 max-w-md w-full text-right space-y-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-black text-xs">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>تشویقی در پرونده کارگزینی منظور شد.</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pr-7">
                      واریز بن حکمت‌کارت در چرخه شارژ ماهانه انجام می‌شود و اولویت شیفت برای ماه آینده لحاظ شد.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: STATION ASHRAF RANKING */}
            {activeTab === "leaderboard" && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="p-4 bg-[#0c1f2d] border-b border-slate-800 flex items-center justify-between">
                  <span className="font-black text-xs text-amber-200 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    جدول ارزیابی ماهانه ماموران گشت - کلانتری ۱۰۳ گاندی
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">دوره: تابستان ۱۴۰۵</span>
                </div>

                <div className="divide-y divide-slate-800">
                  {/* Rank 1 */}
                  <div className="p-4 flex items-center justify-between bg-slate-950/40 hover:bg-slate-800/40 transition">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                        ۱
                      </span>
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-amber-500/40">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" alt="ستوان‌یکم کریمی" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-black text-xs text-amber-100">ستوان‌یکم علی کریمی</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">گشت خودرویی ۱۱۰ • ۳ لوح تقدیر</p>
                      </div>
                    </div>
                    <span className="font-mono font-black text-xs text-amber-300">۲,۶۸۰ امتیاز</span>
                  </div>

                  {/* Current User - Rank 2 */}
                  <div className="p-4 flex items-center justify-between bg-amber-500/10 border-r-4 border-amber-400">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                        ۲
                      </span>
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border-2 border-amber-400 shadow-md">
                        <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=150&q=80" alt="ستوان‌دوم یزدان‌پناه" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-black text-xs text-amber-200">ستوان‌دوم محمدرضا یزدان‌پناه</h5>
                          <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded">شما</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">گشت موتوری ۱۱۰ • انضباط کامل در حضور و سلامت تجهیزات</p>
                      </div>
                    </div>
                    <span className="font-mono font-black text-xs text-amber-300">۲,۴۱۰ امتیاز</span>
                  </div>

                  {/* Rank 3 */}
                  <div className="p-4 flex items-center justify-between bg-slate-950/40 hover:bg-slate-800/40 transition">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center border border-slate-700">
                        ۳
                      </span>
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" alt="استوار حسینی" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-black text-xs text-slate-200">استوار یکم رضا حسینی</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">گشت موتوری ۱۱۰ • ۲ لوح تقدیر</p>
                      </div>
                    </div>
                    <span className="font-mono font-black text-xs text-slate-300">۲,۱۹۰ امتیاز</span>
                  </div>

                  {/* Rank 4 */}
                  <div className="p-4 flex items-center justify-between bg-slate-950/40 hover:bg-slate-800/40 transition">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center border border-slate-700">
                        ۴
                      </span>
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="ستوان‌دوم رضایی" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-black text-xs text-slate-200">ستوان‌دوم مهدی رضایی</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">افسر نگهبان شیفت • ۱ لوح تقدیر</p>
                      </div>
                    </div>
                    <span className="font-mono font-black text-xs text-slate-300">۲,۰۵۰ امتیاز</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: STATUTORY 4-YEAR MILITARY RANK TIMELINE */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <RankPromotionTimeline variant="dark" showTitle={true} />
              </div>
            )}
          </div>

          {/* Footer with Formal Attestation */}
          <div className="p-4 bg-[#091520] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <span className="font-bold flex items-center gap-1.5 text-slate-300">
              <Shield className="w-4 h-4 text-amber-500" />
              ارزیابی نمرات بر اساس داده‌های سامانه‌های الکترونیک کلانتری انجام می‌شود.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer border border-slate-700"
            >
              بستن
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
