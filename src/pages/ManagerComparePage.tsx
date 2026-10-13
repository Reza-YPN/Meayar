import { useState } from "react";
import { Users, TrendingUp, TrendingDown, Calendar, Target, Clock, ShieldAlert, Heart, Activity } from "lucide-react";

export function ManagerComparePage() {
  const [emp1, setEmp1] = useState("سجاد فرج پور");
  const [emp2, setEmp2] = useState("محمدرضا یزدان پناه");

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">مقایسه دو نیرو</h2>
          <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
            <span>مدیریت عملکرد نیروها</span>
            <span className="text-slate-300">&gt;</span>
            <span>مقایسه دو نیرو</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              نام و نام خانوادگی / شماره کارکنان (پرسنلی)
            </label>
            <select 
              value={emp1}
              onChange={(e) => setEmp1(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="سجاد فرج پور">سجاد فرج پور</option>
              <option value="بهار رستمی">بهار رستمی</option>
            </select>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              نام و نام خانوادگی / شماره کارکنان (پرسنلی)
            </label>
            <select 
              value={emp2}
              onChange={(e) => setEmp2(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="محمدرضا یزدان پناه">محمدرضا یزدان پناه</option>
              <option value="محمد رمضانی">محمد رمضانی</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <h4 className="font-bold text-slate-800 mb-1">
          تحلیل عملکرد فصل گذشته {emp1} و {emp2}
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          {emp1} عملکرد بالاتری از متوسط نسبت به سایر شاغلین در این موقعیت شغلی در فراجا نشان داده است. اگرچه در شاخص هایی مانند مهارت ارتباط موثر، درصد تحقق گشت زنی و دقت پایین تر از حد انتظار بوده است، اما در شاخص هایی مانند درصد وقوع جرم در منطقه و درصد پشتیبانی و بازخورد عملکرد چشمگیری داشته است.
        </p>
      </div>

      {/* Table Headers */}
      <div className="flex text-xs font-bold text-slate-500 px-4">
        <div className="flex-1">کارنامه عملکردی</div>
      </div>

      {/* Comparison Sections */}
      <div className="space-y-4">
        <ComparisonSection 
          title="حضور و غیاب سیستمی" 
          type="ملاک شاخص: نتیجه‌ای"
          unit="واحد سنجش: ساعت"
          emp1Name={emp1}
          emp2Name={emp2}
          emp1Data={{ priority: 1, weight: "2%", score: 900, change: "+50%", orgAvg: 1000, effect: "+10%", finalScore: 125, level: 5 }}
          emp2Data={{ priority: 2, weight: "2%", score: 800, change: "+50%", orgAvg: 1000, effect: "+10%", finalScore: 125, level: 4 }}
        />
        
        <ComparisonSection 
          title="تعداد هدف‌های انجام شده" 
          type="ملاک شاخص: عملکردی"
          unit="واحد سنجش: تعداد"
          emp1Name={emp1}
          emp2Name={emp2}
          emp1Data={{ priority: 1, weight: "2%", score: 900, change: "+50%", orgAvg: 1000, effect: "+10%", finalScore: 125, level: 4, bg: "bg-red-100", text: "text-red-700" }}
          emp2Data={{ priority: 2, weight: "2%", score: 800, change: "+50%", orgAvg: 1000, effect: "+10%", finalScore: 125, level: 5, bg: "bg-green-100", text: "text-green-700" }}
        />

        <ComparisonSection 
          title="میانگین مدت زمان رسیدن سر صحنه از زمان تایید هدف" 
          type="ملاک شاخص: رفتاری"
          unit="واحد سنجش: دقیقه"
          emp1Name={emp1}
          emp2Name={emp2}
          emp1Data={{ priority: 1, weight: "2%", score: 900, change: "+50%", orgAvg: 1000, effect: "+10%", finalScore: 125, level: 5, bg: "bg-green-100", text: "text-green-700" }}
          emp2Data={{ priority: 2, weight: "2%", score: 800, change: "+50%", orgAvg: 1000, effect: "+10%", finalScore: 125, level: 4, bg: "bg-white", text: "text-slate-800" }}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
          <span>نمودار بهره وری ادوار گذشته</span>
          <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> صعودی
          </span>
        </h3>
        
        <div className="h-64 flex items-end gap-2 sm:gap-6 justify-center mt-8 px-2 sm:px-8">
          <div className="flex flex-col items-center gap-2 w-16 sm:w-24">
            <div className="w-full bg-green-400 rounded-t-sm relative group" style={{ height: '38%' }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">۳۸</span>
            </div>
            <span className="text-[10px] text-slate-500 text-center">{emp1} بهار 1405</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-16 sm:w-24">
            <div className="w-full bg-red-400 rounded-t-sm relative group" style={{ height: '82%' }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">۸۲</span>
            </div>
            <span className="text-[10px] text-slate-500 text-center">{emp2} بهار 1405</span>
          </div>
          
          <div className="w-px h-full bg-slate-100 mx-2"></div>
          
          <div className="flex flex-col items-center gap-2 w-16 sm:w-24">
            <div className="w-full bg-amber-400 rounded-t-sm relative group" style={{ height: '58%' }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">۵۸</span>
            </div>
            <span className="text-[10px] text-slate-500 text-center">{emp1} تابستان 1405</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-16 sm:w-24">
            <div className="w-full bg-yellow-400 rounded-t-sm relative group" style={{ height: '95%' }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">۹۵</span>
            </div>
            <span className="text-[10px] text-slate-500 text-center">{emp2} تابستان 1405</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function ComparisonSection({ title, type, unit, emp1Name, emp2Name, emp1Data, emp2Data }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-700 text-white flex justify-between px-4 py-2 text-xs font-bold">
        <span>{title}</span>
        <div className="flex gap-4">
          <span>{type}</span>
          <span>{unit}</span>
        </div>
      </div>
      <div className="flex text-sm">
        {/* Right side (Emp 2 in screenshot is right visually but we're RTL) */}
        {/* Looking at the image: Left side is emp1 (سجاد), Right side is emp2 (علیرضا) */}
        <div className="flex-1 border-l border-slate-100 p-4">
          <div className="text-center font-bold text-slate-700 mb-4">{emp1Name}</div>
          <div className="grid grid-cols-2 gap-y-3 text-xs">
            <div className="text-slate-500">اولویت:</div><div className="font-bold">{emp1Data.priority}</div>
            <div className="text-slate-500">وزن شاخص:</div><div className="font-bold">{emp1Data.weight}</div>
            <div className="text-slate-500">نتیجه:</div><div className="font-bold">{emp1Data.score}</div>
            <div className="text-slate-500">نتیجه فصل قبل:</div>
            <div className="font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {emp1Data.change}
            </div>
            <div className="text-slate-500">حد معمول:</div><div className="font-bold">۱.۲۰۰</div>
            <div className="text-slate-500">متوسط سازمان:</div><div className="font-bold">۱.۰۰۰</div>
            <div className="text-slate-500">اثرگذاری:</div>
            <div className="font-bold text-red-500 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> -۱۰٪
            </div>
            <div className="text-slate-500">نمره:</div>
            <div className={`font-bold ${emp1Data.bg || 'bg-slate-100'} ${emp1Data.text || 'text-slate-800'} px-2 py-1 rounded w-fit`}>{emp1Data.finalScore}</div>
            <div className="text-slate-500">امتیاز رفاهی:</div><div className="font-bold">{emp1Data.level}</div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="text-center font-bold text-slate-700 mb-4">{emp2Name}</div>
          <div className="grid grid-cols-2 gap-y-3 text-xs">
            <div className="text-slate-500">اولویت:</div><div className="font-bold">{emp2Data.priority}</div>
            <div className="text-slate-500">وزن شاخص:</div><div className="font-bold">{emp2Data.weight}</div>
            <div className="text-slate-500">نتیجه:</div><div className="font-bold">{emp2Data.score}</div>
            <div className="text-slate-500">نتیجه فصل قبل:</div>
            <div className="font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {emp2Data.change}
            </div>
            <div className="text-slate-500">حد معمول:</div><div className="font-bold">۱.۲۰۰</div>
            <div className="text-slate-500">متوسط سازمان:</div><div className="font-bold">۱.۰۰۰</div>
            <div className="text-slate-500">اثرگذاری:</div>
            <div className="font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +۵۰٪
            </div>
            <div className="text-slate-500">نمره:</div>
            <div className={`font-bold ${emp2Data.bg || 'bg-green-100'} ${emp2Data.text || 'text-green-700'} px-2 py-1 rounded w-fit`}>{emp2Data.finalScore}</div>
            <div className="text-slate-500">امتیاز رفاهی:</div><div className="font-bold">{emp2Data.level}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
