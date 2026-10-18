import React, { useState } from 'react';
import { Layers, Sliders, BarChart2, Info } from 'lucide-react';
import { CompetencyMatrixTab } from './CompetencyMatrixTab';
import { EvaluatorCompetencyMatrixTab } from './EvaluatorCompetencyMatrixTab';
import { EmployeeEvaluationTab } from './EmployeeEvaluationTab';

interface AdvancedMatrixSectionProps {
  readOnly?: boolean;
}

export function AdvancedMatrixSection({ readOnly = false }: AdvancedMatrixSectionProps) {
  const [subTab, setSubTab] = useState<'matrix' | 'evaluator' | 'report'>('matrix');

  return (
    <div className="space-y-6">
      {/* Informative Sub-header */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              نمای تکمیلی و تحلیلی
            </span>
            <h3 className="text-sm font-black">ماتریس پیشرفته ۵×۴ و گزارش‌های جامع بهره‌وری</h3>
          </div>
          <p className="text-xs text-slate-300">
            این بخش شامل ماتریس تفصیلی سطوح اثرگذاری، پایش تحلیلی ارزیاب و گزارش نهایی بهره‌وری پرسنل است.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setSubTab('matrix')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              subTab === 'matrix' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ماتریس ابعاد (۵×۴)</span>
          </button>
          {!readOnly && (
            <button
              type="button"
              onClick={() => setSubTab('evaluator')}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                subTab === 'evaluator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>ماتریس جامع ارزیاب</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setSubTab('report')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              subTab === 'report' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>گزارش بهره‌وری پرسنل</span>
          </button>
        </div>
      </div>

      {/* Render selected subtab */}
      <div className="transition-all duration-200">
        {subTab === 'matrix' && <CompetencyMatrixTab readOnly={readOnly} />}
        {!readOnly && subTab === 'evaluator' && <EvaluatorCompetencyMatrixTab />}
        {subTab === 'report' && <EmployeeEvaluationTab />}
      </div>
    </div>
  );
}
