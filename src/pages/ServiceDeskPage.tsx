import {
  Stethoscope,
  FileText,
  Settings,
  HeartPulse,
  Shield,
  FileCheck,
  HelpCircle,
  Users,
  Gift,
  Clipboard,
  Heart,
  Calendar,
  Droplets,
  FileSignature,
  TestTube,
  FileClock,
  GraduationCap,
  Clock,
  MapPin,
  Shuffle,
  RefreshCw,
  ShieldAlert,
  LogOut,
  ArrowRightLeft,
  Banknote,
  FileBadge,
  Mail,
  Gavel,
  Home,
  Wallet,
  Activity,
  BarChart as BarChartIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { motion } from "motion/react";
import { useState } from "react";
import { GenericServiceModal } from "../components/GenericServiceModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const SERVICES = [
  {
    category: "پزشکی",
    icon: Stethoscope,
    items: [
      { id: 1, title: "ارزیابی‌های سلامت کارکنان", subtitle: "(طب کار)", bg: "bg-emerald-500", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80" },
      { id: 2, title: "سلامت روان کارکنان", bg: "bg-teal-500", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80" },
      { id: 3, title: "دریافت نوبت درمانگاه", bg: "bg-cyan-500", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80" },
      { id: 4, title: "مشاهده تعرفه‌های درمانی", bg: "bg-sky-500", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80" },
      { id: 5, title: "دریافت نوبت اهدای خون", bg: "bg-blue-500", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80" },
      { id: 6, title: "مشاهده نسخه پزشک", bg: "bg-indigo-500", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" },
      { id: 7, title: "مشاهده جواب آزمایشات", bg: "bg-violet-500", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80" },
      { id: 8, title: "مشاهده سوابق پزشکی", bg: "bg-purple-500", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80" },
    ],
  },
  {
    category: "نیروی انسانی",
    icon: Users,
    items: [
      { id: 9, title: "درخواست درج مدرک تحصیلی", bg: "bg-rose-500", image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&q=80" },
      { id: 10, title: "بازنشستگی پیش از موعد", bg: "bg-pink-500", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
      { id: 11, title: "مشخص کردن محل اولیه خدمت", bg: "bg-fuchsia-500", image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80" },
      { id: 12, title: "تغییر رسته", bg: "bg-orange-500", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" },
      { id: 13, title: "درخواست ابقا / تمدید خدمت", bg: "bg-amber-500", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" },
      { id: 14, title: "درخواست بخشش تخلفات", bg: "bg-yellow-500", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80" },
      { id: 15, title: "درخواست استعفا", bg: "bg-lime-500", image: "https://images.unsplash.com/photo-1628100589332-95f2d0186175?w=400&q=80" },
      { id: 16, title: "درخواست انتقال", bg: "bg-green-500", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&q=80" },
      { id: 17, title: "درخواست نامه کسر از حقوق", bg: "bg-emerald-600", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
      { id: 18, title: "درخواست گواهی‌های شغلی", bg: "bg-teal-600", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80" },
      { id: 19, title: "ارتباط با دبیرخانه", bg: "bg-cyan-600", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80" },
      { id: 20, title: "اعتراض به رای کمیسیون", bg: "bg-sky-600", image: "https://images.unsplash.com/photo-1520697960323-9ee8fc2f2ecb?w=400&q=80" },
    ],
  },
  {
    category: "مزایای رفاهی",
    icon: Gift,
    items: [
      { id: 21, title: "منازل سازمانی", bg: "bg-indigo-600", image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&q=80" },
      { id: 22, title: "وام و تسهیلات", bg: "bg-violet-600", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80" },
    ],
  },
];

const REQUESTS_TREND_DATA = [
  { name: 'فروردین', موفق: 120, در_انتظار: 25, رد_شده: 10 },
  { name: 'اردیبهشت', موفق: 135, در_انتظار: 20, رد_شده: 12 },
  { name: 'خرداد', موفق: 150, در_انتظار: 30, رد_شده: 15 },
  { name: 'تیر', موفق: 180, در_انتظار: 15, رد_شده: 8 },
];

function EmployeeView() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {SERVICES.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <section.icon className="w-5 h-5 text-indigo-600" />
            {section.category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.items.map((item) => {
              return (
                <div
                  onClick={() => {
                    if (item.id === 17) {
                      navigate("/service-desk/salary-deduction");
                    } else if (item.id === 21) {
                      navigate("/service-desk/organizational-house");
                    } else {
                      setSelectedService({
                        title: item.title,
                        subtitle: item.subtitle,
                        category: section.category,
                        icon: section.icon
                      });
                    }
                  }}
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden cursor-pointer h-40 hover:shadow-lg transition-all duration-300 block"
                >
                  {item.image ? (
                     <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                     <div className={`absolute inset-0 ${item.bg}`}></div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:from-slate-900/80 transition duration-300"></div>
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end pointer-events-none">
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight drop-shadow-md">
                        {item.title}
                      </h4>
                      {item.subtitle && (
                        <span className="text-white/80 text-xs mt-1 block">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <GenericServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </div>
  );
}

function ManagerView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">کل درخواست‌های یگان (ماه جاری)</div>
            <div className="text-3xl font-black text-slate-800 mt-2">۲۰۳</div>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
            <FileText className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">درخواست‌های در انتظار تایید</div>
            <div className="text-3xl font-black text-amber-600 mt-2">۱۵</div>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl">
            <Clock className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium">درخواست‌های انجام شده</div>
            <div className="text-3xl font-black text-emerald-600 mt-2">۱۸۰</div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl">
            <FileCheck className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <BarChartIcon className="w-5 h-5 text-indigo-500" /> روند درخواست‌های ثبت شده در ماه‌های اخیر
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REQUESTS_TREND_DATA} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '15px' }} />
                <Bar dataKey="موفق" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="در_انتظار" stackId="a" fill="#f59e0b" />
                <Bar dataKey="رد_شده" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-indigo-500" /> دسته‌بندی درخواست‌های یگان
          </h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                  { name: 'نیروی انسانی', value: 45 },
                  { name: 'پزشکی (طب کار)', value: 35 },
                  { name: 'مزایای رفاهی', value: 20 },
                ]} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} width={90} />
                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} fill="#6366f1" />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceDeskPage() {
  const { role } = useRole();
  if (role === 'manager') return <ManagerView />;
  return <EmployeeView />;
}
