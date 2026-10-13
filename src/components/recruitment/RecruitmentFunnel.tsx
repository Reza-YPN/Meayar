import React from 'react';
import { SelectionStage, FARAJA_FUNNEL_DATA } from '../../data/recruitmentData';
import { 
  Users, 
  BookOpen, 
  HeartPulse, 
  Activity, 
  FileQuestion, 
  ShieldCheck, 
  Award,
  ChevronLeft,
  AlertTriangle
} from 'lucide-react';

interface RecruitmentFunnelProps {
  selectedStage: SelectionStage | 'all';
  onSelectStage: (stage: SelectionStage | 'all') => void;
}

const STAGE_ICONS: Record<SelectionStage, React.ComponentType<{ className?: string }>> = {
  'ثبت‌نام و بررسی مدارک': Users,
  'آزمون علمی ورودی': BookOpen,
  'معاینات پزشکی بهداری': HeartPulse,
  'آزمون آمادگی جسمانی': Activity,
  'مصاحبه عقیدتی و روان‌سنجی': FileQuestion,
  'تحقیقات محلی و حفاظت': ShieldCheck,
  'کمیسیون نهایی و اعزام': Award,
};

export function RecruitmentFunnel({ selectedStage, onSelectStage }: RecruitmentFunnelProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="text-base font-black text-slate-900">
              قیف هفت‌گانه غربالگری و گزینش داوطلبان فراجا (دوره اعزام ۱۴۰۴)
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            پایش خط سیر ۳,۴۸۰ داوطلب از مرحله ثبت‌نام، احراز پزشکی و بهداری تا کمیسیون نهایی و اعزام به مراکز آموزش
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectStage('all')}
            className={`px-3 py-1.5 text-xs font-black rounded-xl transition cursor-pointer ${
              selectedStage === 'all'
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            نمایش همه مراحل
          </button>
        </div>
      </div>

      {/* Horizontal Interactive Step Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {FARAJA_FUNNEL_DATA.map((item, idx) => {
          const Icon = STAGE_ICONS[item.stage];
          const isSelected = selectedStage === item.stage;
          const isFinal = idx === FARAJA_FUNNEL_DATA.length - 1;

          return (
            <button
              key={item.stage}
              onClick={() => onSelectStage(item.stage)}
              className={`text-right p-3.5 rounded-2xl border transition relative flex flex-col justify-between cursor-pointer group ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-md ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  مرحله {idx + 1}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              </div>

              <div>
                <span className="text-xs font-black text-slate-800 line-clamp-1 block mb-1">
                  {item.stage}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {item.count.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">داوطلب</span>
                </div>
              </div>

              {/* Progress bar / conversion */}
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-bold">نرخ عبور:</span>
                <span className={`font-mono font-black ${
                  item.passRate > 80 ? 'text-emerald-600' : item.passRate > 65 ? 'text-blue-600' : 'text-amber-600'
                }`}>
                  {item.passRate}٪
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected stage quick insight banner */}
      {selectedStage !== 'all' && (
        <div className="bg-indigo-50/60 border border-indigo-200 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-indigo-900 font-medium animate-fadeIn">
          <AlertTriangle className="w-4 h-4 text-indigo-700 shrink-0" />
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <span>
              <strong>مرحله جاری فیلترشده:</strong> {selectedStage} — {
                FARAJA_FUNNEL_DATA.find(f => f.stage === selectedStage)?.dropReason
              }
            </span>
            <span className="font-bold text-indigo-700 font-mono">
              تعداد پرونده‌های این مرحله: {FARAJA_FUNNEL_DATA.find(f => f.stage === selectedStage)?.count.toLocaleString('fa-IR')} نفر
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
