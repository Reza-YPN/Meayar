import React from 'react';
import { useRole } from '../../context/RoleContext';
import { EmployeeEvaluationTab } from '../../components/competency/EmployeeEvaluationTab';
import { ShieldAlert, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmployeeCompetencyEvalPage() {
  const { role } = useRole();

  if (role === 'employee') {
    return (
      <div className="p-8 md:p-12 bg-white rounded-3xl border border-rose-200/90 shadow-sm text-center space-y-4 max-w-2xl mx-auto my-12" dir="rtl">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-2xs">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-lg md:text-xl font-black text-slate-900">
          عدم دسترسی پرسنل به گام ۵ (گزارش جامع بهره‌وری و ارزیابی شایستگی)
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          این بخش مختص ارزیابان شایستگی و فرماندهان یگان جهت ارزیابی نهایی، رتبه‌بندی و تحلیل نمرات سازمانی می‌باشد.
          پرسنل گرامی می‌توانند شناسنامه مشاغل و شایستگی‌ها (گام‌های ۱ تا ۳) و همچنین کارنامه فردی خود را از بخش‌های مجاز مشاهده نمایند.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/employee/competency-matrix"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            مشاهده کارنامه شایستگی‌های من
          </Link>
          <Link
            to="/evaluator/competency-management"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-xl transition flex items-center gap-1.5"
          >
            <ArrowRight className="w-4 h-4" />
            شناسنامه مشاغل و شایستگی‌ها (گام ۱ تا ۳)
          </Link>
        </div>
      </div>
    );
  }

  return <EmployeeEvaluationTab />;
}

