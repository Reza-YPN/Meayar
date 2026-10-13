import React, { useState } from "react";
import { Shield, Medal, Award, CheckCircle2, Star, ChevronLeft, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import medalAttendance from "../assets/images/medal_attendance_discipline_1788934163012.jpg";
import medalRapidResponse from "../assets/images/medal_rapid_response_1788934177418.jpg";
import medalTacticalRider from "../assets/images/medal_tactical_integrity_1788934191837.jpg";
import storyWelfareResort from "../assets/images/story_welfare_resort_1783573902576.jpg";
import storyBorderTech from "../assets/images/story_border_tech_1783573886983.jpg";
import farajaLogo from "../assets/images/faraja_logo.png";

interface FarajaStoryBarProps {
  onOpenStory?: (index: number) => void;
  onOpenGamification?: () => void;
  defaultCollapsed?: boolean;
}

export function FarajaStoryBar({ onOpenStory, onOpenGamification, defaultCollapsed = false }: FarajaStoryBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const triggerStory = (index: number) => {
    if (onOpenStory) {
      onOpenStory(index);
    } else {
      window.dispatchEvent(new CustomEvent("open-faraja-story", { detail: { index } }));
    }
  };

  const triggerGamification = () => {
    if (onOpenGamification) {
      onOpenGamification();
    } else {
      window.dispatchEvent(new CustomEvent("open-faraja-gamification"));
    }
  };

  const STORY_CIRCLES = [
    {
      id: 0,
      title: "حضور ۰۷:۰۰",
      subtitle: "۳۰ روز بدون تاخیر",
      image: medalAttendance,
      ringColor: "from-amber-500 via-amber-400 to-amber-600",
      badgeText: "+۳۵۰ امتیاز",
      isNew: true,
    },
    {
      id: 1,
      title: "گشت ۱۱۰",
      subtitle: "زمان ۴.۱ دقیقه",
      image: medalRapidResponse,
      ringColor: "from-emerald-600 via-emerald-400 to-teal-600",
      badgeText: "+۴۰۰ امتیاز",
      isNew: true,
    },
    {
      id: 2,
      title: "گشت موتوری",
      subtitle: "بدون سانحه",
      image: medalTacticalRider,
      ringColor: "from-blue-600 via-indigo-400 to-blue-700",
      badgeText: "+۳۰۰ امتیاز",
      isNew: false,
    },
    {
      id: 3,
      title: "سامانه ۱۹۷",
      subtitle: "۹۸٪ رضایت مردمی",
      image: storyWelfareResort,
      ringColor: "from-emerald-600 via-teal-400 to-emerald-800",
      badgeText: "+۳۵۰ امتیاز",
      isNew: false,
    },
    {
      id: 4,
      title: "تیراندازی",
      subtitle: "نمره ۹۶ ممتاز",
      image: storyBorderTech,
      ringColor: "from-amber-600 via-red-500 to-rose-700",
      badgeText: "+۵۰۰ امتیاز",
      isNew: false,
    },
  ];

  if (isCollapsed) {
    return (
      <div className="bg-slate-900/90 hover:bg-slate-900 rounded-2xl px-4 py-2.5 border border-amber-500/30 shadow-sm text-slate-100 flex items-center justify-between transition-all duration-200">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-200">
              افتخارات و مدال‌های گشت کلانتری ۱۰۳
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-md hidden sm:inline">
              ۵ نشان فعال
            </span>
          </div>
          <span className="text-slate-400 text-xs hidden md:inline">• آخرین نشان: «گشت ۱۱۰ - زمان ۴.۱ دقیقه»</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerGamification}
            className="text-[11px] font-black text-amber-300 hover:text-amber-100 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-amber-500/30 px-2.5 py-1 rounded-lg transition"
          >
            <Medal className="w-3.5 h-3.5 text-amber-400" />
            <span>مشاهده کارنامه تشویقی</span>
          </button>
          <button
            onClick={() => setIsCollapsed(false)}
            className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg transition border border-slate-700"
            title="گسترش نوار استوری‌ها"
          >
            <span>نمایش جزئیات</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-4 sm:p-5 border border-amber-600/30 shadow-md text-slate-100 transition-all duration-300">
      <div className="flex items-center justify-between mb-3.5 px-1 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-200">
              ارزیابی عملکرد و افتخارات گشت
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-md hidden sm:inline">
              کلانتری ۱۰۳ گاندی
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerGamification}
            className="text-xs font-black text-amber-300 hover:text-amber-100 flex items-center gap-1.5 cursor-pointer bg-slate-800 hover:bg-slate-700 border border-amber-500/30 px-3.5 py-1.5 rounded-xl transition shadow-xs"
          >
            <Medal className="w-4 h-4 text-amber-400" />
            <span>کارنامه ارزیابی و تشویقی‌ها</span>
            <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setIsCollapsed(true)}
            className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-xl transition border border-slate-700"
            title="جمع کردن نوار استوری برای خلوت شدن صفحه"
          >
            <span>بستن</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Horizontal scrolling circular medallions container */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none">
        
        {/* ROUND TAB: Official Faraja Ashraf & Honors Hub Trigger */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 group">
          <button
            onClick={triggerGamification}
            className="relative cursor-pointer transition-transform duration-300 group-hover:scale-105 active:scale-95"
            title="کارنامه ارزیابی عملکرد و تشویقی‌های کلانتری"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#081d11] rounded-full flex flex-col items-center justify-center text-amber-400 p-1 border border-amber-500/40">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
                <span className="text-[8px] font-black text-amber-200 mt-0.5 tracking-tight">ارزیابی کلانتری</span>
              </div>
            </div>
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full border-2 border-slate-900 shadow-md">
              پایه ۶
            </span>
          </button>
          <span className="text-[11px] font-black text-amber-100 text-center max-w-[76px] truncate">
            کارنامه گشت
          </span>
          <span className="text-[9px] font-bold text-emerald-400">
            ۴ شاخص فعال
          </span>
        </div>

        {/* Divider */}
        <div className="h-14 w-[1px] bg-slate-800 shrink-0 mx-0.5 hidden sm:block" />

        {/* 5 Circular Story Avatars */}
        {STORY_CIRCLES.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 group">
            <button
              onClick={() => triggerStory(story.id)}
              className="relative cursor-pointer transition-transform duration-300 group-hover:scale-105 active:scale-95"
              title={story.title}
            >
              <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] bg-gradient-to-tr ${story.ringColor} shadow-md`}>
                <div className="w-full h-full bg-slate-950 rounded-full p-[2px] overflow-hidden border border-white/10">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-300"
                  />
                </div>
              </div>

              {/* Point Badge Pill on Avatar */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-300 text-[8px] font-mono font-black px-1.5 py-0.2 rounded-full border border-amber-500/50 shadow-md whitespace-nowrap">
                {story.badgeText}
              </span>

              {story.isNew && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
            </button>

            <span className="text-[11px] font-black text-slate-200 text-center max-w-[76px] truncate">
              {story.title}
            </span>
            <span className="text-[9px] font-bold text-slate-400 text-center max-w-[76px] truncate">
              {story.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
