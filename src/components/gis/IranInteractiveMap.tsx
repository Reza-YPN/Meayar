import React, { useState } from 'react';
import { ProvinceGISData, MapLayerConfig, MAP_LAYERS, GISMapLayer } from '../../data/geographicAnalyticsData';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Compass, 
  Info, 
  CheckCircle2, 
  ShieldAlert, 
  Crosshair, 
  Maximize2 
} from 'lucide-react';

interface IranInteractiveMapProps {
  provinces: ProvinceGISData[];
  selectedProvince: ProvinceGISData;
  onSelectProvince: (province: ProvinceGISData) => void;
  activeLayer: GISMapLayer;
  onChangeLayer: (layer: GISMapLayer) => void;
}

// Custom simplified polygon boundaries for Iran's key provincial commands
// Positioned within a 900x700 viewBox, accurately depicting geographic positions
const PROVINCE_POLYGONS: Record<string, string> = {
  tehran: "M 460 240 L 510 245 L 515 285 L 470 285 L 450 260 Z",
  alborz: "M 435 230 L 460 235 L 455 255 L 430 250 Z",
  mazandaran: "M 430 180 L 530 190 L 525 235 L 435 225 Z",
  gilan: "M 370 160 L 430 175 L 425 220 L 380 205 Z",
  azarbaijan_sharghi: "M 250 120 L 320 130 L 315 190 L 255 175 Z",
  azarbaijan_gharbi: "M 190 130 L 245 135 L 245 240 L 205 240 Z",
  kurdistan: "M 245 245 L 320 245 L 315 295 L 250 295 Z",
  kermanshah: "M 245 300 L 320 300 L 315 355 L 250 355 Z",
  ilam: "M 250 360 L 315 360 L 310 425 L 260 425 Z",
  khuzestan: "M 315 410 L 390 410 L 380 495 L 310 475 Z",
  isfahan: "M 425 320 L 520 320 L 520 420 L 420 410 Z",
  fars: "M 460 450 L 550 450 L 540 560 L 450 550 Z",
  khorasan_razavi: "M 660 180 L 760 190 L 750 300 L 650 290 Z",
  khorasan_jonoubi: "M 650 310 L 750 315 L 740 430 L 640 420 Z",
  kerman: "M 560 400 L 670 410 L 660 520 L 550 510 Z",
  sistan_baluchestan: "M 690 450 L 820 460 L 800 640 L 690 620 Z",
  hormozgan: "M 560 550 L 680 550 L 670 640 L 550 610 Z",
  bushehr: "M 395 490 L 450 490 L 440 580 L 390 565 Z"
};

export const IranInteractiveMap: React.FC<IranInteractiveMapProps> = ({
  provinces,
  selectedProvince,
  onSelectProvince,
  activeLayer,
  onChangeLayer
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceGISData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentLayerConfig = MAP_LAYERS.find(l => l.id === activeLayer) || MAP_LAYERS[0];

  // Calculate min and max for active metric to compute dynamic choropleth colors
  const values = provinces.map(p => currentLayerConfig.getMetricValue(p));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getChoroplethColor = (province: ProvinceGISData) => {
    const val = currentLayerConfig.getMetricValue(province);
    const range = maxValue - minValue || 1;
    const ratio = Math.max(0, Math.min(1, (val - minValue) / range));
    
    // For net transfers: if negative (outflow), highlight rose/red
    if (activeLayer === 'transfers') {
      if (val < -1500) return '#e11d48'; // Critical outflow
      if (val < 0) return '#fb7185';      // Moderate outflow
      if (val === 0) return '#e2e8f0';     // Balanced
      return '#10b981';                  // Positive inflow
    }

    if (activeLayer === 'hardship') {
      if (province.hardshipCoefficient >= 1.8) return '#991b1b'; // Red tier
      if (province.hardshipCoefficient >= 1.5) return '#ea580c'; // Orange tier
      if (province.hardshipCoefficient >= 1.25) return '#d97706'; // Amber tier
      return '#3b82f6'; // Blue
    }

    // High performance / fill rate: blue to emerald shades
    if (ratio > 0.8) return '#047857';
    if (ratio > 0.6) return '#059669';
    if (ratio > 0.4) return '#2563eb';
    if (ratio > 0.2) return '#60a5fa';
    return '#94a3b8';
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(prev + 0.25, 2.2);
      return Math.max(prev - 0.25, 0.8);
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white relative shadow-2xl overflow-hidden flex flex-col">
      {/* Top Map Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              نقشه تعاملی آمایش سرزمینی فراجا
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                برخط و پایش لحظه‌ای
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              نمایش داده‌های تحلیلی ۳۱ فرماندهی انتظامی استان‌ها بر پایه لایه‌های راهبردی
            </p>
          </div>
        </div>

        {/* Map View Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/70 p-1.5 rounded-xl border border-slate-700/60">
          <button
            onClick={() => handleZoom('in')}
            title="بزرگ‌نمایی"
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            title="کوچک‌نمایی"
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            title="بازنشانی زاویه دید"
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <span className="text-xs px-2 py-0.5 text-slate-400 font-mono">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
      </div>

      {/* Layer Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none z-10">
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap flex items-center gap-1 pl-1">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          انتخاب لایه تحلیلی:
        </span>
        {MAP_LAYERS.map(layer => {
          const isActive = layer.id === activeLayer;
          return (
            <button
              key={layer.id}
              onClick={() => onChangeLayer(layer.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-500'}`} />
              {layer.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Main Map Stage Container */}
      <div className="relative flex-1 min-h-[460px] bg-slate-950/60 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
        
        {/* Subtle Background Tactical Radar Grids */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0, transparent 70%),
                              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* Geographic Labels for Seas */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none text-slate-500/80 font-bold text-xs tracking-widest bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800/60">
          دریای خزر (مازندران)
        </div>
        <div className="absolute bottom-6 left-1/3 pointer-events-none text-slate-500/80 font-bold text-xs tracking-widest bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800/60">
          خلیج همیشه فارس
        </div>
        <div className="absolute bottom-6 right-16 pointer-events-none text-slate-500/80 font-bold text-xs tracking-widest bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800/60">
          دریای عمان
        </div>

        {/* Interactive SVG of Iran */}
        <svg
          viewBox="150 100 700 560"
          className="w-full h-full max-h-[500px] transition-transform duration-300 ease-out select-none"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
          }}
        >
          <defs>
            {/* Glow filters for selected province */}
            <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Pattern for tactical grid lines */}
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Iran General National Boundary Outline (Stylized polygon base) */}
          <polygon
            points="
              230,120 330,130 380,165 440,175 540,195 620,185 665,175 770,190 770,320 
              745,430 830,460 810,645 680,630 635,595 560,560 450,560 380,510 320,430 
              245,365 240,240 185,140
            "
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="3"
            strokeDasharray="4 2"
            opacity="0.85"
          />

          {/* Lines connecting Tehran Headquarters (FATEB) to Operational Provincial Commands */}
          {provinces.map(p => {
            if (p.id === 'tehran') return null;
            return (
              <line
                key={`link-${p.id}`}
                x1={480}
                y1={260}
                x2={p.svgCoord.cx}
                y2={p.svgCoord.cy}
                stroke={selectedProvince.id === p.id ? "#38bdf8" : "#1e293b"}
                strokeWidth={selectedProvince.id === p.id ? "2" : "1"}
                strokeDasharray={selectedProvince.id === p.id ? "none" : "3 3"}
                opacity={selectedProvince.id === p.id ? "0.9" : "0.35"}
              />
            );
          })}

          {/* Render Province Polygons */}
          {provinces.map(p => {
            const polygonD = PROVINCE_POLYGONS[p.id];
            if (!polygonD) return null;

            const isSelected = selectedProvince.id === p.id;
            const isHovered = hoveredProvince?.id === p.id;
            const fillColor = getChoroplethColor(p);

            return (
              <path
                key={`poly-${p.id}`}
                d={polygonD}
                fill={fillColor}
                stroke={isSelected ? "#ffffff" : isHovered ? "#38bdf8" : "#1e293b"}
                strokeWidth={isSelected ? "3" : isHovered ? "2.5" : "1.5"}
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isSelected ? "drop-shadow(0px 0px 8px rgba(56, 189, 248, 0.8))" : "none",
                  opacity: isSelected ? 1 : isHovered ? 0.95 : 0.82
                }}
                onClick={() => onSelectProvince(p)}
                onMouseEnter={() => setHoveredProvince(p)}
                onMouseLeave={() => setHoveredProvince(null)}
              />
            );
          })}

          {/* Render Tactical Command Centroid Markers */}
          {provinces.map(p => {
            const isSelected = selectedProvince.id === p.id;
            const isHovered = hoveredProvince?.id === p.id;
            const isBorderCritical = p.operationalTier.includes('رده الف');

            return (
              <g
                key={`marker-${p.id}`}
                transform={`translate(${p.svgCoord.cx}, ${p.svgCoord.cy})`}
                className="cursor-pointer"
                onClick={() => onSelectProvince(p)}
                onMouseEnter={() => setHoveredProvince(p)}
                onMouseLeave={() => setHoveredProvince(null)}
              >
                {/* Radar pulse for selected or hovered */}
                {(isSelected || isHovered) && (
                  <circle
                    r="18"
                    fill="none"
                    stroke={isSelected ? "#38bdf8" : "#818cf8"}
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Outer tactical ring */}
                <circle
                  r={isSelected ? "11" : "8"}
                  fill={isSelected ? "#0284c7" : "#0f172a"}
                  stroke={isSelected ? "#ffffff" : isBorderCritical ? "#f87171" : "#94a3b8"}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                />

                {/* Center dot */}
                <circle
                  r={isSelected ? "5" : "3.5"}
                  fill={isSelected ? "#ffffff" : isBorderCritical ? "#ef4444" : "#38bdf8"}
                />

                {/* Province Name Label */}
                <text
                  x="0"
                  y={isSelected ? "24" : "19"}
                  textAnchor="middle"
                  fill={isSelected ? "#ffffff" : isHovered ? "#38bdf8" : "#cbd5e1"}
                  fontSize={isSelected ? "11" : "9.5"}
                  fontWeight={isSelected ? "bold" : "600"}
                  className="pointer-events-none drop-shadow-md select-none font-sans"
                >
                  {p.persianName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip upon hover */}
        {hoveredProvince && (
          <div 
            className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-2xl z-20 text-right w-72 pointer-events-none animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-sm text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                {hoveredProvince.persianName}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                مرکز: {hoveredProvince.centerCity}
              </span>
            </div>

            <div className="mt-2.5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">شاخص انتخابی ({currentLayerConfig.shortTitle}):</span>
                <span className="font-bold font-mono text-emerald-400">
                  {currentLayerConfig.formatValue(currentLayerConfig.getMetricValue(hoveredProvince))}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">تعداد کل پرسنل:</span>
                <span className="font-medium font-mono text-slate-200">
                  {hoveredProvince.personnel.totalPersonnel.toLocaleString('fa-IR')} نفر
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">درصد پرشدگی چارت:</span>
                <span className="font-medium font-mono text-indigo-300">
                  {hoveredProvince.personnel.fillRate}٪
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">رضایت مردمی ۱۹۷:</span>
                <span className="font-medium font-mono text-emerald-300">
                  {hoveredProvince.performance.publicSatisfaction197}٪
                </span>
              </div>

              <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">رده عملیاتی:</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  hoveredProvince.operationalTier.includes('رده الف')
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {hoveredProvince.operationalTier}
                </span>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-center text-indigo-400 bg-indigo-950/40 py-1 rounded border border-indigo-900/40">
              برای ورود به داشبورد اختصاصی استان کلیک کنید
            </div>
          </div>
        )}

        {/* Legend Panel (Bottom Left) */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 p-2.5 rounded-xl shadow-lg z-10 text-xs">
          <div className="flex items-center justify-between gap-4 mb-1.5">
            <span className="text-slate-300 font-semibold text-[11px] flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              راهنمای لایه: {currentLayerConfig.shortTitle}
            </span>
            <span className="text-[10px] text-slate-400">({currentLayerConfig.unit})</span>
          </div>

          {activeLayer === 'hardship' ? (
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-red-700" /> مرزی ویژه (الف)
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-orange-600" /> مرزی حساس (ب)
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-blue-600" /> صنعتی/عادی
              </span>
            </div>
          ) : (
            <div>
              <div className="h-2 w-48 rounded-full bg-gradient-to-l from-emerald-600 via-blue-500 to-slate-400" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>حداکثر: {currentLayerConfig.formatValue(maxValue)}</span>
                <span>حداقل: {currentLayerConfig.formatValue(minValue)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Selected Province Indicator Pill (Top Left) */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur border border-indigo-500/50 px-3 py-2 rounded-xl flex items-center gap-2.5 shadow-xl z-10">
          <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          <div className="text-right">
            <div className="text-[10px] text-slate-400">استان انتخاب شده:</div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              {selectedProvince.persianName}
              <span className="text-[10px] font-normal text-indigo-300">({selectedProvince.region})</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
