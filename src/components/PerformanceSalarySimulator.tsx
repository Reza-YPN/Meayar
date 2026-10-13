import React, { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  Sparkles,
  Banknote,
  ShieldAlert,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Zap,
  DollarSign,
  ArrowRight,
  Info
} from "lucide-react";

interface CompetencySlider {
  id: string;
  name: string;
  category: string;
  weight: number;
  min: number;
  max: number;
  defaultValue: number;
  currentRealValue: number;
  unit: string;
  description: string;
}

const SLIDERS_CONFIG: CompetencySlider[] = [
  {
    id: "response_time",
    name: "سرعت واکنش ۱۱۰ و راکبی تاکتیکی",
    category: "عملیاتی و چابکی",
    weight: 30,
    min: 70,
    max: 100,
    defaultValue: 95,
    currentRealValue: 95,
    unit: "نمره از ۱۰۰",
    description: "میانگین حضور در صحنه زیر ۴ دقیقه و مانور ترافیکی موفق"
  },
  {
    id: "theft_catch",
    name: "کشف جرم، تعقیب چابک و مهار سارقین",
    category: "نتیجه‌ای و خروجی",
    weight: 30,
    min: 70,
    max: 100,
    defaultValue: 94,
    currentRealValue: 94,
    unit: "نمره از ۱۰۰",
    description: "توقیف وسایل نقلیه مسروقه و بازداشت بدون خسارت"
  },
  {
    id: "gear_maintenance",
    name: "آماده‌به‌کاری موتورسیکلت سازمانی و سلاح",
    category: "پشتیبانی و تجهیزات",
    weight: 20,
    min: 70,
    max: 100,
    defaultValue: 92,
    currentRealValue: 92,
    unit: "نمره از ۱۰۰",
    description: "صفر بودن نقص فنی و نگهداری استاندارد تجهیزات انفرادی"
  },
  {
    id: "discipline_public",
    name: "انضباط خدمتی و رضایتمندی سامانه ۱۹۷",
    category: "رفتاری و شهروندی",
    weight: 20,
    min: 70,
    max: 100,
    defaultValue: 93,
    currentRealValue: 93,
    unit: "نمره از ۱۰۰",
    description: "عدم شکایت مردمی، صورتجلسه دقیق و ثبت به‌موقع گزارش"
  }
];

export function PerformanceSalarySimulator() {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    response_time: 95,
    theft_catch: 94,
    gear_maintenance: 92,
    discipline_public: 93
  });

  const handleSliderChange = (id: string, val: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleResetToCurrent = () => {
    setSliderValues({
      response_time: 95,
      theft_catch: 94,
      gear_maintenance: 92,
      discipline_public: 93
    });
  };

  const handleSetTargetAimed = () => {
    setSliderValues({
      response_time: 98,
      theft_catch: 97,
      gear_maintenance: 96,
      discipline_public: 96
    });
  };

  const handleSetEliteTarget = () => {
    setSliderValues({
      response_time: 100,
      theft_catch: 99,
      gear_maintenance: 98,
      discipline_public: 99
    });
  };

  // Calculations
  const calculatedStats = useMemo(() => {
    // Weighted average score
    let weightedSum = 0;
    SLIDERS_CONFIG.forEach((slider) => {
      const val = sliderValues[slider.id] || slider.defaultValue;
      weightedSum += val * (slider.weight / 100);
    });

    const totalScore = parseFloat(weightedSum.toFixed(1));

    // Determine multiplier
    let multiplier = 1.0;
    let tierTitle = "پایه (بدون پاداش شایستگی)";
    let tierColor = "text-slate-600";

    if (totalScore >= 98) {
      multiplier = 1.40;
      tierTitle = "سطح نخبه عملیاتی (حداکثر سقف مجاز فراجا)";
      tierColor = "text-emerald-700 font-black";
    } else if (totalScore >= 95) {
      multiplier = 1.32;
      tierTitle = "سطح ممتاز ارشد (نامزد ترفیع ویژه)";
      tierColor = "text-emerald-600 font-black";
    } else if (totalScore >= 90) {
      multiplier = 1.24;
      tierTitle = "سطح ممتاز (وضعیت جاری شما - ۱.۲۴×)";
      tierColor = "text-indigo-700 font-black";
    } else if (totalScore >= 85) {
      multiplier = 1.16;
      tierTitle = "سطح خیلی خوب";
      tierColor = "text-indigo-600 font-bold";
    } else if (totalScore >= 80) {
      multiplier = 1.08;
      tierTitle = "سطح خوب";
      tierColor = "text-slate-700 font-bold";
    } else {
      multiplier = 1.00;
      tierTitle = "سطح متوسط و پایه";
      tierColor = "text-amber-700 font-bold";
    }

    // Base salary numbers for motorcycle patrol officer
    const baseMeritBonus = 12000000; // 12,000,000 Rials base bonus pool
    const simulatedBonus = Math.round(baseMeritBonus * multiplier);
    const currentActualBonus = 14880000; // Current bonus with 1.24x multiplier
    const bonusDiff = simulatedBonus - currentActualBonus;

    // Monthly Net salary estimation
    const fixedEarnings = 85623000; // other fixed salary items
    const deductions = 25250000; // standard insurance/taxes/loans
    const grossTotal = fixedEarnings + simulatedBonus;
    const netTotal = grossTotal - deductions;

    const currentNetTotal = 100253000; // current actual net salary in Rials
    const netDiff = netTotal - currentNetTotal;
    const annualNetGain = netDiff * 12;

    return {
      totalScore,
      multiplier,
      tierTitle,
      tierColor,
      simulatedBonus,
      currentActualBonus,
      bonusDiff,
      grossTotal,
      netTotal,
      currentNetTotal,
      netDiff,
      annualNetGain
    };
  }, [sliderValues]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                ابزار محاسباتی و تصمیم‌یار شایستگی‌محور
              </span>
              <span className="text-xs text-slate-300 font-bold">
                فرمول مصوب حقوق و دستمزد فراجا
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
              <Banknote className="w-6 h-6 text-emerald-400" />
              شبیه‌ساز اثر بهبود نمرات شایستگی بر ضریب حقوق و پاداش کارانه ماهانه
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              با جابجایی اسلایدرهای زیر ببینید که هر ۱ نمره بهبود در عملکرد گشت موتوری چگونه ضریب کارانه و حقوق واریزی شما را به صورت مستقیم و شفاف افزایش می‌دهد.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetToCurrent}
              className="bg-white/10 hover:bg-white/20 text-xs font-bold text-white px-3 py-2 rounded-xl border border-white/10 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              وضعیت فعلی (۹۳.۵٪)
            </button>
            <button
              onClick={handleSetTargetAimed}
              className="bg-emerald-600 hover:bg-emerald-700 text-xs font-black text-white px-3.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              تارگت سرتیمی (۹۶.۸٪)
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side (7 cols): Interactive Sliders */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              شاخص‌های اصلی موثر بر ضریب کارانه گشت موتوری
            </h4>
            <span className="text-[11px] text-slate-400 font-bold">مجموع اوزان: ۱۰۰٪</span>
          </div>

          {SLIDERS_CONFIG.map((slider) => {
            const val = sliderValues[slider.id] || slider.defaultValue;
            return (
              <div
                key={slider.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 hover:border-indigo-300 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900">{slider.name}</span>
                    <span className="text-[10px] text-slate-500 block">
                      وزن در فرمول: {slider.weight}٪ • {slider.category}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-black font-mono text-indigo-800">{val}</span>
                    <span className="text-[10px] text-slate-400 font-bold block">از ۱۰۰</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={1}
                  value={val}
                  onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1">
                  <span>حداقل مجاز ({slider.min})</span>
                  <span className="text-slate-600">{slider.description}</span>
                  <span>حداکثر ({slider.max})</span>
                </div>
              </div>
            );
          })}

          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              فرمول محاسباتی: پاداش شایستگی = (پایه پاداش سازمانی) × (ضریب مکتسبه از ماتریس شایستگی‌های ۵×۴). ارزیابی به صورت خودکار در انتهای هر دوره در سامانه مالی یگان اعمال می‌شود.
            </span>
          </div>
        </div>

        {/* Right Side (5 cols): Live Calculation Results & Comparison */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Simulated Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-lg border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400 font-bold">نتیجه شبیه‌سازی زنده:</span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                نمره موزون: {calculatedStats.totalScore}٪
              </span>
            </div>

            {/* Multiplier Big Display */}
            <div className="text-center py-2">
              <span className="text-xs text-slate-400 block font-bold">ضریب کارانه حاصله:</span>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="text-4xl font-black text-emerald-400 font-mono">
                  {calculatedStats.multiplier.toFixed(2)}×
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300 block mt-1">
                {calculatedStats.tierTitle}
              </span>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl">
                <span className="text-slate-300">مبلغ پاداش شایستگی شبیه‌سازی‌شده:</span>
                <span className="font-mono font-black text-white">
                  {calculatedStats.simulatedBonus.toLocaleString("fa-IR")} ریال
                </span>
              </div>

              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl">
                <span className="text-slate-300">پاداش شایستگی فعلی شما:</span>
                <span className="font-mono font-bold text-slate-400">
                  {calculatedStats.currentActualBonus.toLocaleString("fa-IR")} ریال
                </span>
              </div>

              <div className="flex items-center justify-between bg-emerald-900/30 border border-emerald-700/50 p-3 rounded-xl">
                <span className="text-emerald-300 font-bold">تغییر ماهانه در خالص دریافتی:</span>
                <div className="text-left">
                  <span
                    className={`font-mono font-black text-sm ${
                      calculatedStats.netDiff >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {calculatedStats.netDiff >= 0 ? "+" : ""}
                    {calculatedStats.netDiff.toLocaleString("fa-IR")} ریال
                  </span>
                  <span className="text-[10px] text-slate-400 block">در هر ماه</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl">
                <span className="text-slate-300">تأثیر سالانه در کل دریافتی:</span>
                <span className="font-mono font-black text-amber-400">
                  {calculatedStats.annualNetGain >= 0 ? "+" : ""}
                  {calculatedStats.annualNetGain.toLocaleString("fa-IR")} ریال
                </span>
              </div>
            </div>

            {/* Simulated Net Salary */}
            <div className="pt-3 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">خالص حقوق جدید شبیه‌سازی‌شده:</span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {calculatedStats.netTotal.toLocaleString("fa-IR")}{" "}
                <span className="text-xs text-slate-400 font-bold">ریال</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2">
            <span className="text-[11px] font-black text-slate-700 block">
              سناریوهای از پیش‌تنظیم‌شده:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSetTargetAimed}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-2 px-2.5 rounded-lg text-center transition"
              >
                ارتقا به سرتیم (ضریب ۱.۳۲×)
              </button>
              <button
                onClick={handleSetEliteTarget}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-emerald-800 text-xs font-black py-2 px-2.5 rounded-lg text-center transition"
              >
                سطح ممتاز فراجا (ضریب ۱.۴۰×)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
