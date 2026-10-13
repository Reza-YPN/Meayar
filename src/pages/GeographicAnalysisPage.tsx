import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  PROVINCES_GIS_DATA, 
  NATIONAL_GIS_SUMMARY, 
  ProvinceGISData, 
  GISMapLayer 
} from '../data/geographicAnalyticsData';
import { IranInteractiveMap } from '../components/gis/IranInteractiveMap';
import { ProvinceDashboard } from '../components/gis/ProvinceDashboard';
import { RegionalComparisonMatrix } from '../components/gis/RegionalComparisonMatrix';
import { StrategicGISAlerts } from '../components/gis/StrategicGISAlerts';
import { 
  Compass, 
  Search, 
  Filter, 
  ShieldCheck, 
  Printer, 
  FileSpreadsheet, 
  Layers, 
  Scale, 
  AlertTriangle, 
  Users, 
  Award, 
  Target, 
  Home, 
  GraduationCap, 
  Activity,
  CheckCircle2
} from 'lucide-react';

export const GeographicAnalysisPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceGISData>(PROVINCES_GIS_DATA[0]); // Default to Tehran
  const [activeLayer, setActiveLayer] = useState<GISMapLayer>('headcount');
  const [activeMainTab, setActiveMainTab] = useState<'map_dashboard' | 'comparison' | 'alerts'>('map_dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [exportNotification, setExportNotification] = useState<string | null>(null);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'map_dashboard' || tabParam === 'comparison' || tabParam === 'alerts') {
      setActiveMainTab(tabParam);
    }
  }, [searchParams]);

  // Filtered provinces list based on search and region filter
  const filteredProvinces = useMemo(() => {
    return PROVINCES_GIS_DATA.filter(p => {
      const matchSearch = p.persianName.includes(searchQuery) || p.centerCity.includes(searchQuery);
      if (regionFilter === 'all') return matchSearch;
      if (regionFilter === 'border_alpha') return matchSearch && p.operationalTier.includes('رده الف');
      return matchSearch && p.region.includes(regionFilter);
    });
  }, [searchQuery, regionFilter]);

  const handleExportNationalReport = () => {
    setExportNotification('گزارش جامع آمایش سرزمینی و توزیع سرمایه انسانی فراجا صادر شد.');
    setTimeout(() => setExportNotification(null), 4000);
    window.print();
  };

  const handleSelectProvinceForCompare = (prov: ProvinceGISData) => {
    setSelectedProvince(prov);
    setActiveMainTab('comparison');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Security & System Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight text-white">
                  سامانه تحلیل جغرافیایی سرمایه انسانی فراجا (GIS)
                </h1>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  بند ۳-۷ مصوب ستاد کل
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  سطح دسترسی: مدیریت ارشد
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
                پایش یکپارچه توزیع استانی نیروی انسانی، عملکرد سازمانی، ماتریس شایستگی‌ها، ظرفیت‌های جذب، موازنه جابجایی و نیازهای مسکن در سطح فرماندهی انتظامی استان‌ها.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportNationalReport}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              صدور گزارش آمایشی کشوری
            </button>
          </div>
        </div>

        {exportNotification && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {exportNotification}
          </div>
        )}
      </div>

      {/* Strategic National KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>کل پرسنل فراجا</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1.5">
            {NATIONAL_GIS_SUMMARY.totalPersonnelFaraja.toLocaleString('fa-IR')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            مصوب: {NATIONAL_GIS_SUMMARY.sanctionedPostsTotal.toLocaleString('fa-IR')}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>پرشدگی چارت ملی</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-700 font-mono mt-1.5">
            {NATIONAL_GIS_SUMMARY.nationalFillRate}٪
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">
            تراز مطلوب کشوری
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>میانگین عملکرد استان‌ها</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1.5">
            {NATIONAL_GIS_SUMMARY.nationalAvgPerformance} / ۱۰۰
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            رضایت ۱۹۷: {NATIONAL_GIS_SUMMARY.nationalPublicSatisfaction}٪
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>میانگین شایستگی ملی</span>
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-700 font-mono mt-1.5">
            {NATIONAL_GIS_SUMMARY.nationalCompetencyAvg} / ۱۰۰
          </div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">
            مهارت تیراندازی و رزم
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>استان‌های مرزی الف</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-black text-rose-600 font-mono mt-1.5">
            {NATIONAL_GIS_SUMMARY.highHardshipBorderProvinces} استان
          </div>
          <div className="text-[11px] text-rose-600 mt-1 font-medium">
            پایش ویژه و چرخش نیرو
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>پوشش مسکن سازمانی</span>
            <Home className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-blue-700 font-mono mt-1.5">
            {NATIONAL_GIS_SUMMARY.housingCoverageAvg}٪
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            نیاز فوری: ۲۴,۸۰۰ واحد
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-3">
          {[
            { id: 'map_dashboard', label: 'نقشه تعاملی و داشبورد استانی', icon: Compass },
            { id: 'comparison', label: 'تحلیل منطقه‌ای و مقایسه تطبیقی', icon: Scale },
            { id: 'alerts', label: 'هشدارهای سرزمینی و پایش مرزها', icon: AlertTriangle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeMainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          استان انتخاب‌شده فعلی: <strong className="text-indigo-600 font-bold">{selectedProvince.persianName}</strong>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE MAP & PROVINCIAL DRILL-DOWN DASHBOARD */}
      {activeMainTab === 'map_dashboard' && (
        <div className="space-y-6">
          {/* Filter and Province Search Ribbon */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="جستجوی استان یا مرکز استان..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Region Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {[
                  { id: 'all', label: 'همه استان‌ها' },
                  { id: 'منطقه ۱', label: 'منطقه ۱ (شمال)' },
                  { id: 'منطقه ۲', label: 'منطقه ۲ (مرکز)' },
                  { id: 'منطقه ۳', label: 'منطقه ۳ (غرب)' },
                  { id: 'منطقه ۴', label: 'منطقه ۴ (شرق)' },
                  { id: 'منطقه ۵', label: 'منطقه ۵ (جنوب)' },
                  { id: 'border_alpha', label: 'فقط مرزی ویژه (الف)' },
                ].map(rf => (
                  <button
                    key={rf.id}
                    onClick={() => setRegionFilter(rf.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      regionFilter === rf.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Province Dropdown Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">پرش سریع به استان:</span>
              <select
                value={selectedProvince.id}
                onChange={e => {
                  const target = PROVINCES_GIS_DATA.find(p => p.id === e.target.value);
                  if (target) setSelectedProvince(target);
                }}
                className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {PROVINCES_GIS_DATA.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.persianName} ({p.operationalTier})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Map & Province Quick Card Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left/Center: Interactive Iran Map (Takes 7 cols on XL) */}
            <div className="xl:col-span-7 space-y-4">
              <IranInteractiveMap
                provinces={filteredProvinces}
                selectedProvince={selectedProvince}
                onSelectProvince={setSelectedProvince}
                activeLayer={activeLayer}
                onChangeLayer={setActiveLayer}
              />
            </div>

            {/* Right: Province Drill-down Summary & Quick Inspector (Takes 5 cols on XL) */}
            <div className="xl:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      خلاصه ارزیابی آمایشی: {selectedProvince.persianName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      مرکز: {selectedProvince.centerCity} | {selectedProvince.region}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectProvinceForCompare(selectedProvince)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    ارسال به مقایسه
                  </button>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-600 font-medium">نیروی انسانی مستقر:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {selectedProvince.personnel.totalPersonnel.toLocaleString('fa-IR')} نفر
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-600 font-medium">درصد پرشدگی چارت مصوب:</span>
                    <span className="font-mono font-bold text-indigo-600">
                      {selectedProvince.personnel.fillRate}٪ ({selectedProvince.personnel.balanceStatus})
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-600 font-medium">نمره عملکرد سازمانی:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {selectedProvince.performance.overallScore.toFixed(1)} / ۱۰۰
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-600 font-medium">رضایت مردمی سامانه ۱۹۷:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {selectedProvince.performance.publicSatisfaction197}٪
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-600 font-medium">تراز انتقالات و موازنه:</span>
                    <span className={`font-mono font-bold ${selectedProvince.transfers.netBalance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {selectedProvince.transfers.netBalance > 0 ? `+${selectedProvince.transfers.netBalance}` : selectedProvince.transfers.netBalance} نفر
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-600 font-medium">پوشش منازل سازمانی:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedProvince.transfers.housingCoverageRate}٪
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs leading-relaxed">
                  <strong>نکته کلیدی استان:</strong> {selectedProvince.strategicNotes}
                </div>
              </div>
            </div>
          </div>

          {/* Full Provincial Deep-Dive Dashboard Component */}
          <div className="mt-8">
            <ProvinceDashboard
              province={selectedProvince}
              onCompareWithOthers={handleSelectProvinceForCompare}
            />
          </div>
        </div>
      )}

      {/* TAB 2: REGIONAL & MULTI-PROVINCE COMPARISON */}
      {activeMainTab === 'comparison' && (
        <RegionalComparisonMatrix
          provinces={PROVINCES_GIS_DATA}
          initialSelectedIds={[selectedProvince.id, 'sistan_baluchestan', 'khuzestan'].filter((v, i, a) => a.indexOf(v) === i)}
          onSelectProvince={setSelectedProvince}
        />
      )}

      {/* TAB 3: STRATEGIC TERRITORIAL ALERTS & BORDER MONITORING */}
      {activeMainTab === 'alerts' && (
        <StrategicGISAlerts
          provinces={PROVINCES_GIS_DATA}
          onSelectProvince={(prov) => {
            setSelectedProvince(prov);
            setActiveMainTab('map_dashboard');
          }}
        />
      )}
    </div>
  );
};
