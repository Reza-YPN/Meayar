import { useState, useEffect } from "react";
import { X, Heart, Medal, Award, Sparkles, Star, ChevronLeft, Shield, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import medalAttendance from "../assets/images/medal_attendance_discipline_1788934163012.jpg";
import medalRapidResponse from "../assets/images/medal_rapid_response_1788934177418.jpg";
import medalTacticalRider from "../assets/images/medal_tactical_integrity_1788934191837.jpg";
import storyWelfareResort from "../assets/images/story_welfare_resort_1783573902576.jpg";
import storyBorderTech from "../assets/images/story_border_tech_1783573886983.jpg";
import farajaLogo from "../assets/images/faraja_logo.png";

interface GamifiedStory {
  id: number;
  image: string;
  badgeName: string;
  badgeCategory: string;
  officer: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  xpReward: string;
}

const GAMIFIED_STORIES: GamifiedStory[] = [
  {
    id: 1,
    image: medalAttendance,
    badgeName: "نشان انضباط و وقت‌شناسی",
    badgeCategory: "لوح انضباطی کلانتری ۱۰۳",
    officer: "ستوان‌دوم محمدرضا یزدان‌پناه",
    title: "۳۰ روز حضور منظم راس ساعت ۰۷:۰۰",
    description: "ثبت ورود بدون تاخیر در گیت کلانتری و حضور به‌موقع در صبحگاه در ۳۰ روز متوالی کاری.",
    stats: [
      { label: "ثبت ورود", value: "راس ۰۷:۰۰" },
      { label: "میزان تاخیر", value: "۰ دقیقه" },
      { label: "امتیاز ارزیابی", value: "+۳۵۰ امتیاز" }
    ],
    xpReward: "+۳۵۰ امتیاز"
  },
  {
    id: 2,
    image: medalRapidResponse,
    badgeName: "نشان چابکی گشت ۱۱۰",
    badgeCategory: "فوریت‌های پلیسی ۱۱۰",
    officer: "ستوان‌دوم محمدرضا یزدان‌پناه",
    title: "حضور بر صحنه ۱۱۰ با میانگین ۴.۱ دقیقه",
    description: "رسیدن سریع به صحنه ماموریت‌های ۱۱۰ در محدوده ونک و گاندی در ۴۲ ماموریت متوالی.",
    stats: [
      { label: "میانگین زمان", value: "۴.۱ دقیقه" },
      { label: "ماموریت موفق", value: "۴۲ مورد" },
      { label: "امتیاز ارزیابی", value: "+۴۰۰ امتیاز" }
    ],
    xpReward: "+۴۰۰ امتیاز"
  },
  {
    id: 3,
    image: medalTacticalRider,
    badgeName: "نشان گشت موتوری نمونه",
    badgeCategory: "یگان گشت انتظامی",
    officer: "ستوان‌دوم محمدرضا یزدان‌پناه",
    title: "۱۸۰ ساعت گشت بدون سانحه ترافیکی",
    description: "اجرای گشت‌های موتوری با حفظ کامل سلامت موتورسیکلت، بی‌سیم و سلاح کمری.",
    stats: [
      { label: "ساعات گشت", value: "۱۸۰ ساعت" },
      { label: "سلامت تجهیزات", value: "۱۰۰٪ کامل" },
      { label: "امتیاز ارزیابی", value: "+۳۰۰ امتیاز" }
    ],
    xpReward: "+۳۰۰ امتیاز"
  },
  {
    id: 4,
    image: storyWelfareResort,
    badgeName: "نشان تکریم مراجعین (۱۹۷)",
    badgeCategory: "نظارت همگانی و بازرسی",
    officer: "ستوان‌دوم محمدرضا یزدان‌پناه",
    title: "کسب رضایت ۹۸٪ مراجعین کلانتری",
    description: "سعه صدر در برخورد با شهروندان و صلح و سازش در ۱۸ پرونده در طول شیفت.",
    stats: [
      { label: "رضایت مردمی", value: "۹۸٪" },
      { label: "صلح و سازش", value: "۱۸ پرونده" },
      { label: "امتیاز ارزیابی", value: "+۳۵۰ امتیاز" }
    ],
    xpReward: "+۳۵۰ امتیاز"
  },
  {
    id: 5,
    image: storyBorderTech,
    badgeName: "نشان مهارت تیراندازی",
    badgeCategory: "آمادگی رزم و آموزش",
    officer: "ستوان‌دوم محمدرضا یزدان‌پناه",
    title: "کسب نمره ۹۶ در آزمون تیراندازی",
    description: "دقت بالا و سرعت عمل مناسب در آزمون تیراندازی دوره‌ای با سلاح سازمانی.",
    stats: [
      { label: "نمره تیراندازی", value: "۹۶ از ۱۰۰" },
      { label: "نتیجه آزمون", value: "سطح ممتاز" },
      { label: "امتیاز ارزیابی", value: "+۵۰۰ امتیاز" }
    ],
    xpReward: "+۵۰۰ امتیاز"
  }
];

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  onOpenGamificationHub?: () => void;
}

export function StoryModal({ isOpen, onClose, initialIndex = 0, onOpenGamificationHub }: StoryModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setProgress(0);
      setIsLiked(false);
    }
  }, [isOpen, initialIndex]);

  // Auto-progress bar timer (6 seconds per story)
  useEffect(() => {
    if (!isOpen) return;

    const interval = 60; // ms
    const step = (interval / 6000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (activeIndex < GAMIFIED_STORIES.length - 1) {
            setActiveIndex((idx) => idx + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, activeIndex, onClose]);

  if (!isOpen) return null;

  const currentStory = GAMIFIED_STORIES[activeIndex];

  const handleNext = () => {
    if (activeIndex < GAMIFIED_STORIES.length - 1) {
      setActiveIndex(activeIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setProgress(0);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-2 sm:p-4 overflow-hidden" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-sm sm:max-w-md bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-amber-600/40 flex flex-col h-[650px] max-h-[92vh]"
        >
          {/* Top Progress Indicators */}
          <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5 px-1">
            {GAMIFIED_STORIES.map((story, i) => (
              <div key={story.id} className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-xs">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-75"
                  style={{
                    width: i < activeIndex ? "100%" : i === activeIndex ? `${progress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Info Bar */}
          <div className="absolute top-7 left-3 right-3 z-30 flex items-center justify-between px-2 pt-1 text-white drop-shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-600 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden flex items-center justify-center p-0.5">
                  <img src={farajaLogo} alt="آرم فراجا" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs text-white">{currentStory.officer}</span>
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-[10px] text-amber-200/90 font-bold block">{currentStory.badgeCategory}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-slate-950/80 border border-amber-400/50 text-amber-300 text-[10px] font-mono font-black px-2 py-0.5 rounded-full shadow-xs">
                {currentStory.xpReward}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white/90 hover:text-white transition cursor-pointer"
                title="بستن"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Story Main Image with Click Navigators */}
          <div className="relative flex-1 bg-slate-950 overflow-hidden flex items-center justify-center select-none">
            <img
              src={currentStory.image}
              alt={currentStory.badgeName}
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

            {/* Left/Right Tap/Click zones */}
            <div
              onClick={handlePrev}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
              title="قبلی"
            />
            <div
              onClick={handleNext}
              className="absolute right-0 top-0 bottom-0 w-2/3 z-20 cursor-pointer"
              title="بعدی"
            />
          </div>

          {/* Bottom Card Overlay: Official Police Honors Detail */}
          <div className="relative z-30 p-4 bg-slate-950/95 border-t border-amber-600/40 space-y-2.5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Medal className="w-3.5 h-3.5 text-amber-400" />
                {currentStory.badgeName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeIndex + 1} از {GAMIFIED_STORIES.length}
              </span>
            </div>

            <div>
              <p className="text-white font-black text-xs leading-relaxed">
                {currentStory.title}
              </p>
              <p className="text-slate-300 text-[11px] leading-relaxed pt-0.5 font-medium">
                {currentStory.description}
              </p>
            </div>

            {/* Achievement Mini-Stats Pills */}
            <div className="grid grid-cols-3 gap-1.5 py-1">
              {currentStory.stats.map((stat, i) => (
                <div key={i} className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-1.5 text-center">
                  <span className="text-[9px] text-slate-400 block">{stat.label}</span>
                  <strong className="text-[11px] text-amber-300 font-mono font-black">{stat.value}</strong>
                </div>
              ))}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {onOpenGamificationHub && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenGamificationHub();
                  }}
                  className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Medal className="w-4 h-4 text-slate-950" />
                  <span>مشاهده کارنامه ارزیابی و تشویقی‌ها</span>
                </button>
              )}

              {/* Congratulate / Commend Comrade Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-white cursor-pointer hover:bg-slate-800 transition shrink-0 shadow-sm"
                title="ثبت تایید همکار"
              >
                <Heart
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isLiked ? "fill-rose-500 stroke-rose-500 scale-125" : "text-amber-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
