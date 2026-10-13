import React, { useState } from "react";
import { 
  Bell, 
  Settings, 
  Gift, 
  GraduationCap, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  Trash2, 
  CheckCheck, 
  ExternalLink,
  Sparkles,
  AlertTriangle,
  FileText,
  Building2,
  ChevronRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

interface NotificationItem {
  id: string;
  category: "all" | "system" | "welfare" | "manager" | "training" | "operational";
  title: string;
  sender: string;
  description: string;
  date: string;
  time: string;
  isRead: boolean;
  priority: "urgent" | "important" | "normal";
  actionLabel?: string;
  actionPath?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    category: "operational",
    title: "ابلاغ ماموریت راهبردی جدید یگانی",
    sender: "فرماندهی انتظامی کل / قرارگاه عملیات",
    description: "یک ماموریت جدید با عنوان «تحقق ۲۰ گشت زنی هدفمند شبانه در مناطق مستعد جرم» با اولویت بالا برای شما تعیین شده است.",
    date: "۱۴۰۵/۰۲/۱۸",
    time: "۰۹:۴۵",
    isRead: false,
    priority: "urgent",
    actionLabel: "مشاهده جزئیات ماموریت",
    actionPath: "/performance"
  },
  {
    id: "notif-2",
    category: "training",
    title: "پیشنهاد دوره هوشمند: ارتقای مهارت ارتباط موثر",
    sender: "مرکز آموزش و توسعه مهارت‌های هوشمند فراجا",
    description: "بر اساس تحلیل ماتریس شایستگی و شناسایی شکاف مهارتی در شاخص ارتباطی، دوره ۱۶ ساعته «مهارت گوش دادن فعال و مذاکره در صحنه» به شما پیشنهاد شده است.",
    date: "۱۴۰۵/۰۲/۱۷",
    time: "۱۴:۲۰",
    isRead: false,
    priority: "important",
    actionLabel: "مشاهده و ثبت‌نام در دوره",
    actionPath: "/training"
  },
  {
    id: "notif-3",
    category: "welfare",
    title: "واریز امتیاز عملکردی و بازگشایی ظرفیت زائرسرا",
    sender: "معاونت خدمات رفاهی و معیشتی",
    description: "با توجه به کسب نمره ۸۸ در ارزیابی فصل پاییز، ۳۲ امتیاز رفاهی به موجودی شما افزوده شد و دسترسی به ویلاهای ساحلی خزرآباد و زائرسرای مشهد فعال گردید.",
    date: "۱۴۰۵/۰۲/۱۵",
    time: "۱۱:۱۰",
    isRead: false,
    priority: "normal",
    actionLabel: "رزرو اقامتگاه رفاهی",
    actionPath: "/benefits"
  },
  {
    id: "notif-4",
    category: "manager",
    title: "پاسخ کمیسیون رسیدگی به اعتراض عملکرد",
    sender: "کمیسیون تخصصی ارزیابی عملکرد فراجا",
    description: "اعتراض شما به شاخص «میانگین مدت زمان رسیدن سر صحنه» بررسی و با ثبت مستندات ترافیکی، نمره شاخص از ۵۰ به ۷۲ اصلاح گردید.",
    date: "۱۴۰۵/۰۲/۱۲",
    time: "۱۶:۳۰",
    isRead: true,
    priority: "important",
    actionLabel: "مشاهده کارنامه اصلاح‌شده",
    actionPath: "/performance/improvements"
  },
  {
    id: "notif-5",
    category: "system",
    title: "تایید صدور گواهی کسر از حقوق در میز خدمت",
    sender: "میز خدمت الکترونیک / دبیرخانه مرکزی",
    description: "درخواست شماره ۱۵۰۰۲۵۸۹۶ مبنی بر صدور گواهی کسر از حقوق برای بانک سپه توسط کارشناس تایید و امضای الکترونیک صادر شد.",
    date: "۱۴۰۵/۰۲/۱۰",
    time: "۰۸:۱۵",
    isRead: true,
    priority: "normal",
    actionLabel: "دانلود گواهی مهر شده",
    actionPath: "/service-desk/requests"
  },
  {
    id: "notif-6",
    category: "system",
    title: "به‌روزرسانی امنیتی رمز عبور سامانه",
    sender: "مرکز فاوا و امنیت سایبری فراجا",
    description: "رمز عبور سازمانی شما با موفقیت تغییر یافت. در صورت عدم اقدام از جانب شما، فورا به پشتیبانی اطلاع دهید.",
    date: "۱۴۰۵/۰۲/۰۸",
    time: "۱۹:۰۲",
    isRead: true,
    priority: "normal",
    actionLabel: "بررسی تنظیمات امنیتی",
    actionPath: "/profile"
  },
  {
    id: "notif-7",
    category: "operational",
    title: "ارزیابی دوره‌ای سلامت و طب کار",
    sender: "بهداری کل فراجا / اداره بهداشت و روان",
    description: "نوبت چک‌آپ دوره‌ای قلب و بینایی‌سنجی شما برای تاریخ ۲۵ اسفند در درمانگاه مرکزی ثبت شده است.",
    date: "۱۴۰۵/۰۲/۰۵",
    time: "۱۰:۰۰",
    isRead: true,
    priority: "important",
    actionLabel: "مشاهده پرونده سلامت",
    actionPath: "/health"
  }
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterReadStatus, setFilterReadStatus] = useState<"all" | "unread" | "urgent">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredNotifications = notifications.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.includes(searchTerm) || item.description.includes(searchTerm) || item.sender.includes(searchTerm);
    
    let matchesStatus = true;
    if (filterReadStatus === "unread") matchesStatus = !item.isRead;
    if (filterReadStatus === "urgent") matchesStatus = item.priority === "urgent";

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(item => item.id === id ? { ...item, isRead: !item.isRead } : item));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "system": return <Settings className="w-5 h-5 text-slate-600" />;
      case "welfare": return <Gift className="w-5 h-5 text-emerald-600" />;
      case "manager": return <Building2 className="w-5 h-5 text-indigo-600" />;
      case "training": return <GraduationCap className="w-5 h-5 text-amber-600" />;
      case "operational": return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      default: return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "system": return <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full">سیستمی</span>;
      case "welfare": return <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">رفاهی</span>;
      case "manager": return <span className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">مدیریتی</span>;
      case "training": return <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200">آموزشی</span>;
      case "operational": return <span className="bg-rose-50 text-rose-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-rose-200">عملیاتی</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                مرکز پیام‌ها و اطلاع‌رسانی‌ها
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold">
                  گام ۱۱ معماری
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                اطلاع‌رسانی‌های یکپارچه سیستمی، رفاهی، مدیریتی، آموزشی و عملیاتی فراجا
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold rounded-xl text-xs transition border border-indigo-100 shadow-sm"
            >
              <CheckCheck className="w-4 h-4" />
              علامت‌گذاری همه به عنوان خوانده شده ({unreadCount})
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 custom-scrollbar">
          {[
            { id: "all", label: "همه پیام‌ها" },
            { id: "operational", label: "عملیاتی و یگانی" },
            { id: "training", label: "آموزشی و مهارت" },
            { id: "welfare", label: "رفاهی و امتیازات" },
            { id: "manager", label: "مدیریتی و کمیسیون" },
            { id: "system", label: "سیستمی و میز خدمت" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو در عنوان، متن یا فرستنده..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-bold ml-1">نمایش:</span>
            {[
              { id: "all", label: "همه" },
              { id: "unread", label: "خوانده نشده" },
              { id: "urgent", label: "فوری و مهم" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterReadStatus(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterReadStatus === f.id
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-700 text-sm">هیچ پیامی یافت نشد</h3>
              <p className="text-xs text-slate-400 mt-1">با معیارهای جستجوی فعلی پیامی وجود ندارد.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-sm hover:shadow-md ${
                  notif.isRead 
                    ? "border-slate-100 opacity-90" 
                    : "border-indigo-100 bg-gradient-to-r from-indigo-50/20 to-white"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon Box */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                      notif.isRead ? "bg-slate-50" : "bg-white border border-slate-200"
                    }`}>
                      {getCategoryIcon(notif.category)}
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {!notif.isRead && (
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                        )}
                        <h3 className={`text-sm font-bold ${notif.isRead ? "text-slate-700" : "text-slate-900"}`}>
                          {notif.title}
                        </h3>
                        {getCategoryBadge(notif.category)}
                        {notif.priority === "urgent" && (
                          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            فوری
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <span>فرستنده: <strong className="text-slate-600">{notif.sender}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5" /> {notif.date} - ساعت {notif.time}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1 text-justify">
                        {notif.description}
                      </p>

                      {notif.actionLabel && notif.actionPath && (
                        <div className="pt-2">
                          <button
                            onClick={() => navigate(notif.actionPath!)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition border border-indigo-100"
                          >
                            <span>{notif.actionLabel}</span>
                            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions on Item */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                    <button
                      onClick={() => toggleReadStatus(notif.id)}
                      className={`p-2 rounded-xl text-xs font-medium transition ${
                        notif.isRead 
                          ? "text-slate-400 hover:text-indigo-600 hover:bg-slate-50" 
                          : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                      }`}
                      title={notif.isRead ? "علامت‌گذاری به عنوان خوانده نشده" : "علامت‌گذاری به عنوان خوانده شده"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="حذف پیام"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
