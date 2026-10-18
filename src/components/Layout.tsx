import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BarChart2,
  Gift,
  GraduationCap,
  Banknote,
  Clock,
  Laptop,
  HeartPulse,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  Info,
  Bell,
  Menu,
  Shield,
  X,
  HelpCircle,
  User,
  Building2,
  Award,
  Compass,
  Trophy,
  ArrowLeftRight,
  UserPlus,
  Map,
  BookOpen,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useRole, Role } from "../context/RoleContext";
import { HeaderQuickSearch } from "./HeaderQuickSearch";
import { ProfileNotificationDropdown } from "./ProfileNotificationDropdown";
import { StoryModal } from "./StoryModal";
import { FarajaGamificationModal } from "./FarajaGamificationModal";
import { PasswordResetModal } from "./PasswordResetModal";
import { SystemWalkthroughModal } from "./SystemWalkthroughModal";

interface NavItem {
  name: string;
  path: string;
  icon: any;
  roles: Role[];
  description?: string;
  badge?: string;
  subItems?: { name: string; path: string; roles: Role[] }[];
}

interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: "core",
    title: "خدمات محوری و عملکرد",
    items: [
      {
        name: "خانه (پیشخوان)",
        path: "/home",
        icon: Home,
        roles: ["employee", "evaluator", "manager"],
        description: "پیشخوان اصلی سامانه معیار فراجا با دسترسی سریع و حالت متمرکز.",
      },
      {
        name: "مشاغل و ماتریس شایستگی‌ها",
        path: "/evaluator/competency-management",
        icon: Award,
        roles: ["employee", "evaluator", "manager"],
        description: "شناسنامه مشاغل فراجا، استخراج سطوح تسلط مهارتی و ماتریس ۵×۴.",
        subItems: [
          { name: "۱. شرح شغل‌ها و وظایف مصوب (گام اول)", path: "/evaluator/competency-management?tab=jobs", roles: ["employee", "evaluator", "manager"] },
          { name: "۲. شایستگی‌های استخراج‌شده (گام دوم)", path: "/evaluator/competency-management?tab=competencies", roles: ["employee", "evaluator", "manager"] },
          { name: "۳. شاخص‌های ارزیابی عملکرد مرتبط (گام سوم)", path: "/evaluator/competency-management?tab=kpis", roles: ["employee", "evaluator", "manager"] },
          { name: "ماتریس ۵×۴ و گزارش‌های جامع (پیشرفته)", path: "/evaluator/competency-management?tab=advanced", roles: ["evaluator", "manager"] },
          { name: "ماتریس و کارنامه شایستگی‌های من", path: "/employee/competency-matrix", roles: ["employee"] },
        ]
      },
      {
        name: "ارزیابی عملکرد و بهره‌وری",
        path: "/performance",
        icon: BarChart2,
        roles: ["employee", "evaluator", "manager"],
        description: "خوداظهاری فصلی، ارزیابی مستقیم، شاخص‌های کلیدی عملکرد (KPI) و رسیدگی به اعتراضات.",
        subItems: [
          { name: "۱. کارنامه عملکردی فصلی و شاخص‌ها", path: "/performance?tab=scorecard", roles: ["employee", "evaluator", "manager"] },
          { name: "۲. داشبورد تحلیلی رشد بهره‌وری", path: "/performance?tab=productivity_growth", roles: ["employee", "evaluator", "manager"] },
          { name: "۳. کارتابل خوداظهاری و رسیدگی به اعتراضات", path: "/performance?tab=objections", roles: ["employee", "evaluator", "manager"] },
          { name: "۴. سوابق ارزیابی و مقایسه فصول", path: "/performance?tab=history", roles: ["employee", "evaluator", "manager"] },
          { name: "گزارش جامع بهره‌وری کارکنان (ارزیاب/مدیر)", path: "/evaluator/employee-evaluation", roles: ["evaluator", "manager"] },
        ],
      },
      {
        name: "آموزش و توسعه فردی",
        path: "/training",
        icon: GraduationCap,
        roles: ["employee", "evaluator", "manager"],
        description: "شناسایی شکاف شایستگی، دوره‌های پیشنهادی هوشمند و آزمون‌های مهارت‌افزایی.",
      },
    ],
  },
  {
    id: "personnel",
    title: "امور پرسنلی و رفاه",
    items: [
      {
        name: "حقوق و دستمزد",
        path: "/salary",
        icon: Banknote,
        roles: ["employee", "manager"],
        description: "فیش حقوقی الکترونیک، کسورات قانونی، ساعات اضافه‌کار و پاداش‌های فصلی.",
      },
      {
        name: "حضور، غیاب و مرخصی",
        path: "/attendance",
        icon: Clock,
        roles: ["employee", "manager"],
        description: "تردد و کارکرد شیفت‌ها و ثبت درخواست مرخصی استحقاقی و استعلاجی.",
        subItems: [
          { name: "وضعیت حضور و غیاب", path: "/attendance", roles: ["employee", "manager"] },
          { name: "درخواست مرخصی", path: "/attendance/leave", roles: ["employee"] },
        ],
      },
      {
        name: "جبران خدمات و حکمت",
        path: "/benefits",
        icon: Gift,
        roles: ["employee", "manager"],
        description: "خدمات رفاهی، سهمیه اماکن اقامتی، حکمت‌کارت و امتیازات فصلی.",
        subItems: [
          { name: "خدمات رفاهی و اقامتگاه‌ها", path: "/benefits", roles: ["employee", "manager"] },
          { name: "کسب امتیاز رفاهی", path: "/benefits/earn", roles: ["employee"] },
          { name: "تاریخچه امتیازات", path: "/benefits/history", roles: ["employee", "manager"] },
        ],
      },
      {
        name: "طب کار و سلامت",
        path: "/health",
        icon: HeartPulse,
        roles: ["employee", "manager"],
        description: "پرونده سلامت، معاینات دوره‌ای و توصیه‌های بهداری فراجا.",
        subItems: [
          { name: "پرونده سلامت و توصیه‌ها", path: "/health", roles: ["employee", "manager"] },
          { name: "درخواست‌های چک‌آپ بهداری", path: "/health/requests", roles: ["employee"] },
        ],
      },
    ],
  },
  {
    id: "service_admin",
    title: "میز خدمت و اداری",
    items: [
      {
        name: "میز خدمت الکترونیک",
        path: "/service-desk",
        icon: Laptop,
        roles: ["employee", "manager"],
        description: "ثبت درخواست‌های اداری، گواهی کسر از حقوق و منزل سازمانی.",
        subItems: [
          { name: "لیست خدمات قابل ارائه", path: "/service-desk", roles: ["employee", "manager"] },
          { name: "لیست درخواست‌های من", path: "/service-desk/requests", roles: ["employee", "manager"] },
        ],
      },
      {
        name: "فرهنگ سازمانی (CULTURAI)",
        path: "/culture",
        icon: Compass,
        roles: ["employee", "evaluator", "manager"],
        description: "پایش فرهنگ سازمانی فراجا بر مبنای مدل ادگار شاین و CULTURAI.",
      },
      {
        name: "مشارکت اجتماعی و رویدادها",
        path: "/social",
        icon: Users,
        roles: ["employee"],
        description: "طرح‌های مشارکتی، نظرسنجی‌ها و پیشنهادات پرسنلی.",
      },
    ],
  },
  {
    id: "specialized",
    title: "سامانه‌های تخصصی و آمایش",
    items: [
      /*
      // سامانه انتقالات موقتاً طبق درخواست هاید شد (کدها در پروژه باقی مانده است)
      {
        name: "سامانه انتقالات فراجا (DSS)",
        path: "/transfers",
        icon: ArrowLeftRight,
        roles: ["employee", "evaluator", "manager"],
        badge: "هوشمند",
        description: "نظام تحول انتقالات، مدل تحلیلی ۵ گانه و پیش‌بینی ریسک ترک خدمت.",
        subItems: [
          { name: "میز متقاضی انتقال (ثبت و پیگیری)", path: "/transfers?tab=employee", roles: ["employee"] },
          { name: "کارتابل ارزیابی و غربالگری ریسک EWS", path: "/transfers?tab=evaluator", roles: ["evaluator"] },
          { name: "داشبورد تصمیم‌سازی هوشمند DSS", path: "/transfers?tab=manager", roles: ["manager"] },
        ]
      },
      */
      {
        name: "جذب و گزینش فراجا",
        path: "/recruitment",
        icon: UserPlus,
        roles: ["manager", "evaluator"],
        description: "کارتابل داوطلبان، آزمون‌ها، استعلامات و کمیسیون نهایی اعزام.",
        subItems: [
          { name: "کارتابل داوطلبان و پرونده‌ها", path: "/recruitment?tab=dossiers", roles: ["manager", "evaluator"] },
          { name: "داشبورد آمار و تحلیل جذب", path: "/recruitment?tab=analytics", roles: ["manager", "evaluator"] },
          { name: "کمیسیون نهایی و صدور امریه", path: "/recruitment?tab=commission", roles: ["manager"] },
          { name: "معیارها و ضوابط استخدامی", path: "/recruitment?tab=criteria", roles: ["manager", "evaluator"] },
        ]
      },
      {
        name: "تحلیل جغرافیایی فراجا (GIS)",
        path: "/geographic-analysis",
        icon: Map,
        roles: ["manager", "evaluator"],
        badge: "بند ۳-۷",
        description: "نقشه تعاملی ۳۱ استان کشور، توزیع آمایشی نیروها و مقایسه تطبیقی.",
        subItems: [
          { name: "نقشه تعاملی و داشبورد استانی", path: "/geographic-analysis?tab=map_dashboard", roles: ["manager", "evaluator"] },
          { name: "تحلیل منطقه‌ای و مقایسه تطبیقی", path: "/geographic-analysis?tab=comparison", roles: ["manager", "evaluator"] },
          { name: "پایش سرزمینی و هشدارهای مرزی", path: "/geographic-analysis?tab=alerts", roles: ["manager"] },
        ]
      },
      {
        name: "مسیر شغلی و جانشین‌پروری",
        path: "/performance/career-path",
        icon: Compass,
        roles: ["employee", "evaluator", "manager"],
        description: "برنامه‌ریزی ارتقای رتبه و جایگاه، شناسایی استعدادهای فرماندهی.",
        subItems: [
          { name: "۱. نقشه کارراهه و اهداف شغلی", path: "/performance/career-path?tab=roadmap", roles: ["employee", "evaluator", "manager"] },
          { name: "۲. پیش‌نیازها و گواهی‌های ارتقا", path: "/performance/career-path?tab=prerequisites", roles: ["employee", "evaluator", "manager"] },
          { name: "۳. تایملاین ۴ ساله درجات نظامی", path: "/performance/career-path?tab=timeline", roles: ["employee", "evaluator", "manager"] },
          { name: "۴. طرح جانشین‌پروری و استعدادها", path: "/performance/career-path?tab=succession", roles: ["employee", "evaluator", "manager"] },
          { name: "۵. توصیه‌های شتاب‌دهی هوشمند", path: "/performance/career-path?tab=ai-insights", roles: ["employee", "evaluator", "manager"] },
        ],
      },
    ],
  },
  {
    id: "general",
    title: "عمومی و ارتباطات",
    items: [
      {
        name: "مرکز پیام‌ها و اعلان‌ها",
        path: "/notifications",
        icon: Bell,
        roles: ["employee", "evaluator", "manager"],
        description: "اطلاع‌رسانی‌های سیستمی، رفاهی، آموزشی، مدیریتی و عملیاتی.",
      },
      {
        name: "پشتیبانی و بازخورد",
        path: "/support",
        icon: MessageSquare,
        roles: ["employee", "evaluator", "manager"],
        description: "پیگیری ابهامات، سوالات و ارتباط مستقیم با کمیسیون پشتیبانی.",
      },
      {
        name: "پروفایل من",
        path: "/profile",
        icon: User,
        roles: ["employee", "evaluator", "manager"],
        description: "مشاهده سوابق پرسنلی، مشخصات سازمانی و مدارک.",
      },
    ],
  },
];

const MANAGER_NAV_ITEMS: NavItem[] = [
  {
    name: "مرکز فرماندهی و تصمیمیار هوشمند",
    path: "/manager/command-center",
    icon: Building2,
    roles: ["manager"]
  },
  {
    name: "مدیریت عملکرد نیروها",
    path: "/manager/performance",
    icon: BarChart2,
    roles: ["manager", "evaluator"],
    subItems: [
      { name: "کارنامه عملکردی نیروها", path: "/manager/performance", roles: ["manager", "evaluator"] },
      { name: "نیروها با عملکرد خوب", path: "/manager/performance/good", roles: ["manager", "evaluator"] },
      { name: "نیروها با عملکرد نیازمند بهبود", path: "/manager/performance/needs-improvement", roles: ["manager", "evaluator"] },
    ]
  },
  {
    name: "ماتریس شایستگی‌های سازمانی",
    path: "/manager/matrix",
    icon: Building2,
    roles: ["manager"]
  },
  {
    name: "مدیریت درخواست نیروها",
    path: "/manager/requests",
    icon: Users,
    roles: ["manager", "evaluator"]
  },
  {
    name: "مدیریت آموزش و ارجاع دوره‌ها",
    path: "/manager/training",
    icon: GraduationCap,
    roles: ["manager", "evaluator"]
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const [currentDate, setCurrentDate] = useState("");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Desktop sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("faraja_sidebar_collapsed") === "true";
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("faraja_sidebar_collapsed", String(next));
      return next;
    });
  };

  // Modals
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isGamificationModalOpen, setIsGamificationModalOpen] = useState(false);
  const [isWalkthroughModalOpen, setIsWalkthroughModalOpen] = useState(false);
  const [storyInitialIndex, setStoryInitialIndex] = useState(0);

  useEffect(() => {
    const handleOpenStoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ index?: number }>;
      setStoryInitialIndex(customEvent.detail?.index ?? 0);
      setIsStoryModalOpen(true);
    };
    const handleOpenGamificationEvent = () => {
      setIsGamificationModalOpen(true);
    };
    const handleOpenWalkthroughEvent = () => {
      setIsWalkthroughModalOpen(true);
    };
    window.addEventListener("open-faraja-story", handleOpenStoryEvent);
    window.addEventListener("open-faraja-gamification", handleOpenGamificationEvent);
    window.addEventListener("open-system-walkthrough", handleOpenWalkthroughEvent);
    return () => {
      window.removeEventListener("open-faraja-story", handleOpenStoryEvent);
      window.removeEventListener("open-faraja-gamification", handleOpenGamificationEvent);
      window.removeEventListener("open-system-walkthrough", handleOpenWalkthroughEvent);
    };
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formatter.format(new Date()));
  }, []);

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderSidebarContent = (isMobile = false, onCloseMobile?: () => void) => {
    const isCollapsed = !isMobile && isSidebarCollapsed;

    return (
      <div className="flex flex-col h-full bg-white text-right select-none">
        {/* Logo and Brand Header */}
        <div className={cn(
          "border-b border-slate-200/90 flex flex-col items-center justify-center relative bg-slate-50/60 transition-all",
          isCollapsed ? "p-3 gap-1" : "p-4 gap-2"
        )}>
          {isMobile && onCloseMobile && (
            <button 
              onClick={onCloseMobile} 
              className="absolute left-3 top-3 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/80 transition"
              title="بستن منو"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="relative p-1 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <img
              src="/src/assets/images/faraja_logo.png"
              alt="نشان فراجا"
              className={cn("object-contain transition-all", isCollapsed ? "w-9 h-9" : "w-12 h-12")}
            />
          </div>

          {!isCollapsed && (
            <div className="text-center space-y-0.5">
              <h1 className="font-black text-slate-900 text-sm tracking-tight">
                سامانه معیار فراجا
              </h1>
              <p className="text-[9px] text-slate-500 font-bold leading-tight">
                مدیریت عملکرد و استاندارد رفتاری
              </p>
            </div>
          )}
        </div>

        {/* Navigation Items (Grouped) */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 custom-scrollbar space-y-4">
          {NAV_GROUPS.map((group) => {
            const allowedItems = group.items
              .filter((item) => item.roles.includes(role))
              .map((item) => ({
                ...item,
                subItems: item.subItems?.filter((sub) => sub.roles.includes(role)),
              }));

            if (allowedItems.length === 0) return null;

            return (
              <div key={group.id} className="space-y-1">
                {/* Group Title or subtle divider */}
                {!isCollapsed ? (
                  <div className="px-2.5 py-1 text-[10px] font-black text-slate-400 flex items-center justify-between">
                    <span>{group.title}</span>
                    <div className="h-px bg-slate-200 flex-1 mr-2"></div>
                  </div>
                ) : (
                  <div className="h-px bg-slate-200 mx-2 my-2"></div>
                )}

                <ul className="space-y-1">
                  {allowedItems.map((item) => {
                    const isActive =
                      location.pathname === item.path ||
                      (item.path !== "/home" && location.pathname.startsWith(item.path));
                    const isOpen = openMenus[item.path] || isActive;
                    const hasSub = item.subItems && item.subItems.length > 0;
                    const Icon = item.icon;

                    return (
                      <li key={item.path} className="relative group">
                        <div
                          className={cn(
                            "flex items-center rounded-xl text-xs font-bold transition-all cursor-pointer",
                            isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                            isActive && !hasSub
                              ? "bg-slate-900 text-white shadow-xs font-black"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          )}
                          onClick={() => {
                            if (hasSub && !isCollapsed) {
                              toggleMenu(item.path);
                            } else {
                              navigate(item.path);
                              if (onCloseMobile) onCloseMobile();
                            }
                          }}
                          title={isCollapsed ? item.name : undefined}
                        >
                          <div className={cn("flex items-center gap-2.5", isCollapsed && "justify-center")}>
                            {Icon && (
                              <Icon
                                className={cn(
                                  "w-4 h-4 transition-colors shrink-0",
                                  isActive && !hasSub
                                    ? "text-emerald-400"
                                    : "text-slate-500 group-hover:text-slate-900"
                                )}
                              />
                            )}
                            {!isCollapsed && <span className="leading-normal truncate">{item.name}</span>}
                          </div>

                          {!isCollapsed && (
                            <div className="flex items-center gap-1">
                              {item.badge && (
                                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 rounded font-mono font-bold">
                                  {item.badge}
                                </span>
                              )}
                              {hasSub && (
                                <span className="p-0.5 text-slate-400 group-hover:text-slate-700">
                                  {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Collapsed Tooltip on Hover */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                            <span className="font-bold">{item.name}</span>
                            {item.description && (
                              <span className="text-[10px] text-slate-400 block max-w-xs whitespace-normal mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Sub menu items (Expanded mode) */}
                        {!isCollapsed && hasSub && isOpen && (
                          <ul className="mt-1 space-y-0.5 pr-6 border-r-2 border-slate-200 mr-3">
                            {item.subItems!.map((subItem) => {
                              const isSubActive = (() => {
                                if (subItem.path.includes("?")) {
                                  const [targetBase, targetQuery] = subItem.path.split("?");
                                  if (location.pathname !== targetBase) return false;
                                  const targetParams = new URLSearchParams(targetQuery);
                                  const currentParams = new URLSearchParams(location.search);
                                  for (const [key, val] of targetParams.entries()) {
                                    if (currentParams.get(key) !== val) return false;
                                  }
                                  return true;
                                }
                                return location.pathname === subItem.path && (!location.search || !location.search.includes("tab="));
                              })();
                              return (
                                <li key={`${item.path}-${subItem.name}`}>
                                  <Link
                                    to={subItem.path}
                                    onClick={() => {
                                      if (onCloseMobile) onCloseMobile();
                                    }}
                                    className={cn(
                                      "block px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors truncate",
                                      isSubActive
                                        ? "bg-slate-900 text-white font-black"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* Manager / Evaluator Specific Group */}
          {MANAGER_NAV_ITEMS.some((item) => item.roles.includes(role)) && (
            <div className="space-y-1 pt-2">
              {!isCollapsed ? (
                <div className="px-2.5 py-1 text-[10px] font-black text-amber-700 flex items-center justify-between">
                  <span>فرماندهی و ارزیابی یگان</span>
                  <div className="h-px bg-amber-200 flex-1 mr-2"></div>
                </div>
              ) : (
                <div className="h-px bg-amber-300 mx-2 my-2"></div>
              )}

              <ul className="space-y-1">
                {MANAGER_NAV_ITEMS.filter((item) => item.roles.includes(role)).map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/home" && location.pathname.startsWith(item.path));
                  const isOpen = openMenus[item.path] || isActive;
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const Icon = item.icon;

                  return (
                    <li key={item.path} className="relative group">
                      <div
                        className={cn(
                          "flex items-center rounded-xl text-xs font-bold transition-all cursor-pointer",
                          isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                          isActive && !hasSub
                            ? "bg-slate-900 text-white shadow-xs font-black"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        )}
                        onClick={() => {
                          if (hasSub && !isCollapsed) {
                            toggleMenu(item.path);
                          } else {
                            navigate(item.path);
                            if (onCloseMobile) onCloseMobile();
                          }
                        }}
                      >
                        <div className={cn("flex items-center gap-2.5", isCollapsed && "justify-center")}>
                          {Icon && (
                            <Icon
                              className={cn(
                                "w-4 h-4 transition-colors shrink-0",
                                isActive && !hasSub ? "text-amber-400" : "text-amber-600 group-hover:text-amber-800"
                              )}
                            />
                          )}
                          {!isCollapsed && <span className="leading-normal truncate">{item.name}</span>}
                        </div>

                        {!isCollapsed && hasSub && (
                          <span className="p-0.5 text-slate-400 group-hover:text-slate-700">
                            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </span>
                        )}
                      </div>

                      {/* Sub items */}
                      {!isCollapsed && hasSub && isOpen && (
                        <ul className="mt-1 space-y-0.5 pr-6 border-r-2 border-amber-200 mr-3">
                          {item.subItems!.map((subItem) => {
                            const isSubActive = location.pathname === subItem.path;
                            return (
                              <li key={`${item.path}-${subItem.name}`}>
                                <Link
                                  to={subItem.path}
                                  onClick={() => {
                                    if (onCloseMobile) onCloseMobile();
                                  }}
                                  className={cn(
                                    "block px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors truncate",
                                    isSubActive
                                      ? "bg-slate-900 text-white font-black"
                                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                  )}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>

        {/* Desktop Sidebar Collapse Toggle Footer */}
        {!isMobile && (
          <div className="p-2 border-t border-slate-200/90 bg-slate-50/70">
            <button
              onClick={toggleSidebarCollapse}
              className={cn(
                "w-full flex items-center gap-2 py-2 px-2.5 rounded-xl text-xs font-black text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-all",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? "گسترش منو" : "جمع کردن منو (حالت فشرده)"}
            >
              {isCollapsed ? (
                <PanelRightOpen className="w-4 h-4 text-emerald-700" />
              ) : (
                <>
                  <PanelRightClose className="w-4 h-4 text-slate-500" />
                  <span className="text-[11px]">جمع کردن منو (فضای بیشتر)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  const getSectionTabs = () => {
    const path = location.pathname;
    
    if (path.startsWith("/performance") || path.startsWith("/evaluator") || path.startsWith("/employee/competency")) {
      return {
        title: "ارزیابی عملکرد و شایستگی",
        tabs: [
          { name: "کارنامه عملکردی", path: "/performance", roles: ["employee", "evaluator", "manager"] },
          { name: "ماتریس و کارنامه شایستگی‌های من", path: "/employee/competency-matrix", roles: ["employee"] },
          { name: "نقاط نیازمند بهبود و خوداظهاری", path: "/performance/improvements", roles: ["employee"] },
          { name: "مدیریت شایستگی‌ها و مشاغل", path: "/evaluator/competency-management", roles: ["evaluator", "manager"] },
          { name: "ارزیابی شایستگی کارکنان", path: "/evaluator/employee-evaluation", roles: ["evaluator", "manager"] },
          { name: "مسیر شغلی", path: "/performance/career-path", roles: ["employee", "manager"] },
          { name: "جانشین‌پروری", path: "/performance/succession", roles: ["manager"] },
        ]
      };
    }
    
    if (path.startsWith("/benefits")) {
      return {
        title: "خدمات رفاهی و امتیازات",
        tabs: [
          { name: "فرصت‌های رفاهی", path: "/benefits", roles: ["employee", "manager"] },
          { name: "کسب امتیاز", path: "/benefits/earn", roles: ["employee"] },
          { name: "تاریخچه امتیازات", path: "/benefits/history", roles: ["employee", "manager"] },
        ]
      };
    }
    
    if (path.startsWith("/attendance")) {
      return {
        title: "حضور و غیاب الکترونیک",
        tabs: [
          { name: "وضعیت حضور و غیاب", path: "/attendance", roles: ["employee", "manager"] },
          { name: "درخواست مرخصی", path: "/attendance/leave", roles: ["employee"] },
        ]
      };
    }
    
    if (path.startsWith("/service-desk") || path === "/service-desk/requests" || path.includes("/service-desk/")) {
      return {
        title: "میز خدمت الکترونیک فراجا",
        tabs: [
          { name: "خدمات قابل ارائه", path: "/service-desk", roles: ["employee", "manager"] },
          { name: "درخواست‌های ثبت‌شده", path: "/service-desk/requests", roles: ["employee", "manager"] },
        ]
      };
    }
    
    if (path.startsWith("/health")) {
      return {
        title: "پرونده سلامت و طب کار",
        tabs: [
          { name: "وضعیت سلامت", path: "/health", roles: ["employee", "manager"] },
          { name: "درخواست‌های طب کار", path: "/health/requests", roles: ["employee"] },
        ]
      };
    }

    if (path.startsWith("/culture")) {
      return {
        title: "سامانه پایش هوشمند فرهنگ سازمانی فراجا (CULTURAI)",
        tabs: [
          { name: "واکاوی و داشبورد فرهنگ", path: "/culture", roles: ["employee", "evaluator", "manager"] },
        ]
      };
    }
    
    return null;
  };

  const sectionTabsInfo = getSectionTabs();
  const visibleTabs = sectionTabsInfo 
    ? sectionTabsInfo.tabs.filter(tab => !tab.roles || tab.roles.includes(role))
    : [];

  return (
    <div
      className="flex h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden"
      dir="rtl"
    >
      {/* Sidebar for Desktop */}
      <aside className={cn(
        "bg-white border-l border-slate-200 flex flex-col hidden md:flex shrink-0 transition-all duration-300",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Slide-over Drawer */}
      <aside 
        className={cn(
          "fixed top-0 bottom-0 right-0 w-72 bg-white z-50 md:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-out border-l border-slate-200",
          isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {renderSidebarContent(true, () => setIsMobileSidebarOpen(false))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-3 md:px-6 shrink-0 gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden text-slate-600 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-xl transition"
              title="بازکردن منو"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 rounded-lg bg-slate-900 text-white text-xs font-black shadow-2xs">
                معیار
              </span>
              <div className="hidden sm:flex flex-col">
                <h1 className="text-xs sm:text-sm font-black text-slate-900 whitespace-nowrap leading-none">
                  سامانه معیار
                </h1>
                <span className="text-[9px] text-slate-500 font-bold leading-none mt-1">
                  مدیریت عملکرد و استاندارد رفتاری
                </span>
              </div>
            </div>
          </div>

          {/* Quick Search Bar (Prominent & Accessible) */}
          <div className="flex-1 flex justify-center max-w-md mx-2">
            <HeaderQuickSearch />
          </div>

          {/* Top Actions & Profile Tray */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Role Selector */}
            <div className="relative flex items-center bg-slate-100 border border-slate-200/80 rounded-xl px-2 py-1 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-slate-700 ml-1.5 hidden sm:inline" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="bg-transparent text-slate-900 text-xs font-black focus:outline-none appearance-none pr-1 pl-4 cursor-pointer"
              >
                <option value="manager" className="text-slate-900">فرمانده / مدیر یگان</option>
                <option value="evaluator" className="text-slate-900">ارزیاب شایستگی (مدیر)</option>
                <option value="employee" className="text-slate-900">پرسنل و کادر</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-1.5 pointer-events-none" />
            </div>

            <span className="text-[11px] font-bold text-slate-500 hidden xl:block tabular-nums bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/60">
              {currentDate}
            </span>

            {/* Notification Bell */}
            <div className="flex items-center gap-1.5 text-slate-500 border-r border-slate-200 pr-2 relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:text-slate-900 relative cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 transition"
                title="اعلانات سازمانی"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-600 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                  ۳
                </span>
              </button>
              
              <ProfileNotificationDropdown 
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
              
              <button 
                onClick={() => setIsPasswordResetOpen(true)}
                className="hover:text-slate-900 cursor-pointer transition p-1.5 rounded-lg hover:bg-slate-100 hidden sm:block"
                title="تنظیمات امنیتی و رمز عبور"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Stories Button */}
              <button 
                onClick={() => {
                  setStoryInitialIndex(0);
                  setIsStoryModalOpen(true);
                }} 
                className="relative cursor-pointer transition-transform hover:scale-105 p-1"
                title="افتخارات و مدال‌های گشت کلانتری ۱۰۳"
              >
                <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-2xs">
                  <div className="w-full h-full bg-slate-900 rounded-full p-[1px] overflow-hidden flex items-center justify-center">
                    <img src="/src/assets/images/faraja_logo.png" alt="افتخارات فراجا" className="w-full h-full object-contain" />
                  </div>
                </div>
              </button>

              {/* Comprehensive Guide Modal Trigger */}
              <button 
                onClick={() => setIsWalkthroughModalOpen(true)}
                className="hover:text-slate-900 cursor-pointer transition p-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200/80 px-2"
                title="شناسنامه و سند راهنمای جامع کل سامانه (Walkthrough & PDF Export)"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden lg:inline text-[11px]">سند PDF</span>
              </button>

              <button className="hover:text-rose-600 cursor-pointer p-1.5 rounded-lg hover:bg-rose-50 transition" title="خروج">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content & Sub-navigation bar */}
        <div className="flex-1 overflow-auto flex flex-col bg-slate-50/50">
          {visibleTabs.length > 0 && (
            <div className="bg-white border-b border-slate-200/90 px-4 md:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                {sectionTabsInfo?.title}
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {visibleTabs.map((tab) => {
                  const isTabActive = location.pathname === tab.path;
                  return (
                    <Link
                      key={tab.path}
                      to={tab.path}
                      className={cn(
                        "text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all",
                        isTabActive 
                          ? "bg-slate-900 text-white shadow-2xs font-black" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {tab.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-4 md:p-6 lg:p-8 flex-1 min-h-0">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </div>
        </div>

        {/* Interactive Overlays */}
        <PasswordResetModal isOpen={isPasswordResetOpen} onClose={() => setIsPasswordResetOpen(false)} />
        <StoryModal 
          isOpen={isStoryModalOpen} 
          onClose={() => setIsStoryModalOpen(false)} 
          initialIndex={storyInitialIndex}
          onOpenGamificationHub={() => {
            setIsStoryModalOpen(false);
            setIsGamificationModalOpen(true);
          }}
        />
        <FarajaGamificationModal
          isOpen={isGamificationModalOpen}
          onClose={() => setIsGamificationModalOpen(false)}
          onOpenStory={(idx) => {
            setIsGamificationModalOpen(false);
            setStoryInitialIndex(idx);
            setIsStoryModalOpen(true);
          }}
        />
        <SystemWalkthroughModal
          isOpen={isWalkthroughModalOpen}
          onClose={() => setIsWalkthroughModalOpen(false)}
        />
      </main>
    </div>
  );
}
