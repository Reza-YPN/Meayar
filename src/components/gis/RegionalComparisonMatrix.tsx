import React, { useState } from 'react';
import { 
  ProvinceGISData, 
  REGIONAL_PERFORMANCE_METRICS 
} from '../../data/geographicAnalyticsData';
import { 
  Scale, 
  Check, 
  ArrowLeftRight, 
  Users, 
  Award, 
  Target, 
  Home, 
  GraduationCap, 
  ShieldAlert, 
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface RegionalComparisonMatrixProps {
  provinces: ProvinceGISData[];
  initialSelectedIds?: string[];
  onSelectProvince?: (province: ProvinceGISData) => void;
}

export const RegionalComparisonMatrix: React.FC<RegionalComparisonMatrixProps> = ({
  provinces,
  initialSelectedIds = ['tehran', 'sistan_baluchestan', 'isfahan'],
  onSelectProvince
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [comparisonMode, setComparisonMode] = useState<'provinces' | 'regions'>('provinces');

  const selectedProvinces = provinces.filter(p => selectedIds.includes(p.id));

  const toggleProvinceSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(prev => prev.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds(prev => [...prev, id]);
      } else {
        // replace the last one
        setSelectedIds(prev => [prev[0], prev[1], id]);
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
      {/* Header & Toggle Mode */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              تحلیل منطقه‌ای و مقایسه تطبیقی استان‌های فراجا
            </h3>
            <p className="text-xs text-slate-500">
              ارزیابی همزمان شاخص‌های سرمایه انسانی، عملکرد، شایستگی، جذب و انتقالات در سطح استان‌ها و مناطق پنج‌گانه
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setComparisonMode('provinces')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              comparisonMode === 'provinces'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            مقایسه استانی (تا ۳ استان)
          </button>
          <button
            onClick={() => setComparisonMode('regions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              comparisonMode === 'regions'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            مقایسه مناطق پنج‌گانه فراجا
          </button>
        </div>
      </div>

      {comparisonMode === 'provinces' ? (
        <div className="space-y-6">
          {/* Province Selector Pills */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center justify-between">
              <span>استان‌های مورد نظر برای مقایسه تطبیقی (حداکثر ۳ استان انتخاب نمایید):</span>
              <span className="text-[11px] text-slate-500">انتخاب شده: {selectedIds.length} از ۳</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {provinces.map(p => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProvinceSelection(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-600 ring-offset-1'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {p.persianName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparative Matrix Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <th className="p-3.5 font-bold w-1/4">محور و شاخص ارزیابی</th>
                  {selectedProvinces.map(p => (
                    <th key={p.id} className="p-3.5 font-bold text-center border-r border-slate-200 bg-indigo-50/40">
                      <div className="font-extrabold text-sm text-indigo-950">{p.persianName}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">{p.region}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {/* Personnel */}
                <tr className="bg-slate-50/50">
                  <td colSpan={selectedProvinces.length + 1} className="p-2 font-bold text-slate-800 text-[11px] bg-slate-100/70">
                    ۱. سرمایه انسانی و سازمان
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">کل پرسنل انتظامی مستقر</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-bold text-slate-900">
                      {p.personnel.totalPersonnel.toLocaleString('fa-IR')} نفر
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">پست‌های مصوب چارت سازمانی</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono text-slate-700">
                      {p.personnel.sanctionedPosts.toLocaleString('fa-IR')} پست
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">درصد پرشدگی چارت سازمانی</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-bold text-indigo-700">
                      {p.personnel.fillRate}٪
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">رده عملیاتی و ضریب سختی</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-800">{p.operationalTier}</span>
                      <div className="text-[10px] text-amber-700 font-mono mt-0.5">ضریب: {p.hardshipCoefficient.toFixed(2)}</div>
                    </td>
                  ))}
                </tr>

                {/* Performance */}
                <tr className="bg-slate-50/50">
                  <td colSpan={selectedProvinces.length + 1} className="p-2 font-bold text-slate-800 text-[11px] bg-slate-100/70">
                    ۲. عملکرد سازمانی و رضایت مردمی
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">نمره کل عملکرد استانی</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-black text-emerald-700 text-sm">
                      {p.performance.overallScore.toFixed(1)} / ۱۰۰
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">نرخ کشف جرائم آگاهی</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-semibold text-slate-800">
                      {p.performance.crimeDetectionRate}٪
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">زمان رسیدن گشت‌های ۱۱۰ به صحنه</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-semibold text-indigo-600">
                      {p.performance.responseSpeedMinutes} دقیقه
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">رضایت مردمی سامانه ۱۹۷</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-bold text-emerald-600">
                      {p.performance.publicSatisfaction197}٪
                    </td>
                  ))}
                </tr>

                {/* Competency & Shooting */}
                <tr className="bg-slate-50/50">
                  <td colSpan={selectedProvinces.length + 1} className="p-2 font-bold text-slate-800 text-[11px] bg-slate-100/70">
                    ۳. ماتریس شایستگی و مهارت رزم
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">نمره تیراندازی تاکتیکی ادواری</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-bold text-amber-700">
                      {p.competency.tacticalShootingScore} / ۱۰۰
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">آمادگی جسمانی پرسنل</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono text-slate-800">
                      {p.competency.physicalFitnessScore} / ۱۰۰
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">مدیریت صحنه و بحران</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono text-slate-800">
                      {p.competency.crisisManagementScore} / ۱۰۰
                    </td>
                  ))}
                </tr>

                {/* Recruitment & Mobility */}
                <tr className="bg-slate-50/50">
                  <td colSpan={selectedProvinces.length + 1} className="p-2 font-bold text-slate-800 text-[11px] bg-slate-100/70">
                    ۴. جذب، انتقالات و مسکن
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">نرخ بومی‌گزینی داوطلبان</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono font-semibold text-slate-800">
                      {p.recruitment.localRecruitmentRate}٪
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">تراز خالص جابجایی (ورود - خروج)</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className={`p-3 text-center border-r border-slate-200 font-mono font-bold ${
                      p.transfers.netBalance < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      {p.transfers.netBalance > 0 ? `+${p.transfers.netBalance}` : p.transfers.netBalance} نفر
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">پرسنل دور از خانواده (غیربومی)</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono text-rose-700">
                      {p.transfers.familySeparationCount.toLocaleString('fa-IR')} نفر
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-slate-600 font-medium">پوشش خانه‌های سازمانی</td>
                  {selectedProvinces.map(p => (
                    <td key={p.id} className="p-3 text-center border-r border-slate-200 font-mono text-slate-700">
                      {p.transfers.housingCoverageRate}٪
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Regions Mode */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_PERFORMANCE_METRICS.map((reg, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900">{reg.regionName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">
                      {reg.provincesIncluded.length} استان
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>کل پرسنل منطقه:</span>
                      <span className="font-bold font-mono text-slate-900">{reg.totalPersonnel.toLocaleString('fa-IR')} نفر</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>میانگین عملکرد منطقه:</span>
                      <span className="font-bold font-mono text-emerald-600">{reg.avgPerformance} / ۱۰۰</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>پرشدگی چارت سازمانی:</span>
                      <span className="font-bold font-mono text-indigo-600">{reg.avgFillRate}٪</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>تراز انتقال منطقه‌ای:</span>
                      <span className={`font-bold font-mono ${reg.netTransferBalance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {reg.netTransferBalance > 0 ? `+${reg.netTransferBalance}` : reg.netTransferBalance} نفر
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 text-[11px]">
                    <div className="text-emerald-800 font-medium">نقطه قوت محوری: {reg.leadStrength}</div>
                    <div className="text-amber-800 font-medium mt-1">نیاز فوری ستادی: {reg.criticalNeed}</div>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[10px] text-slate-500 font-mono">
                  استان‌های تابعه: {reg.provincesIncluded.join('، ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
