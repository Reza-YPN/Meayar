export interface RolePrerequisiteDetail {
  roleName: string;
  levelTitle: string;
  category: "عملیاتی و صفی" | "فنی و تخصصی" | "اطلاعاتی و انتظامی" | "ستادی و پشتیبانی" | "فرماندهی و ارشد";
  summary: string;
  
  // Basic Requirements
  minScore: number;
  minExperienceYears: number;
  requiredRank: string;
  currentReadinessPercent: number; // e.g. 78%
  
  // Domains/Categories of Prerequisites
  domains: {
    id: string;
    title: string;
    iconName: "book" | "shield" | "award" | "activity" | "scale" | "users" | "zap";
    description: string;
    progressPercent: number;
    items: {
      id: string;
      title: string;
      description: string;
      isPassed: boolean;
      type: "دوره الزامی" | "ارزیابی تخصصی" | "شاخص عملکردی" | "تاییدیه و گواهی" | "سابقه ماموریتی";
      hoursOrScore?: string;
    }[];
  }[];

  // Career Next Horizons & Salary Grade
  careerBenefits: {
    salaryGradeIncrease: string;
    welfareQuotaBonus: string;
    commandAuthority: string;
  };
}

export const ROLE_PREREQUISITES_DATA: Record<string, RolePrerequisiteDetail> = {
  // سطح ۱
  "کمک‌متصدی عملیات و گشت پیاده": {
    roleName: "کمک‌متصدی عملیات و گشت پیاده",
    levelTitle: "سطح ۱: مقدماتی",
    category: "عملیاتی و صفی",
    summary: "آشنایی اولیه با اصول گشت‌زنی، استقرار ایست و بازرسی و همراهی تیم‌های عملیاتی انتظامی.",
    minScore: 70,
    minExperienceYears: 0,
    requiredRank: "استوار دوم یا استوار یکم",
    currentReadinessPercent: 100,
    domains: [
      {
        id: "d-mil",
        title: "آموزش‌های پایه نظامی و انضباطی",
        iconName: "shield",
        description: "مهارت‌های پایه تیراندازی، صف‌جمع و انضباط یگانی",
        progressPercent: 100,
        items: [
          { id: "i1", title: "تیراندازی کاربردی تپانچه و سلاح سازمانی (نمره قبولی > ۷۵)", description: "کسب مهارت تیراندازی استاندارد در میادین تیر مصوب", isPassed: true, type: "تاییدیه و گواهی", hoursOrScore: "نمره ۸۸" },
          { id: "i2", title: "دوره صف‌جمع و آیین‌نامه انضباطی نیروهای مسلح", description: "تسلط بر ضوابط سلسله مراتب و پوشش نظامی", isPassed: true, type: "دوره الزامی", hoursOrScore: "۴۰ ساعت" },
        ]
      },
      {
        id: "d-law",
        title: "حقوق و آیین دادرسی مقدماتی",
        iconName: "scale",
        description: "ضوابط اولیه برخورد با جرایم مشهود و بازرسی",
        progressPercent: 100,
        items: [
          { id: "i3", title: "حقوق اساسی شهروندی و وظایف ضابطین دادگستری", description: "آشنایی با مرزهای قانونی در گشت پیاده", isPassed: true, type: "دوره الزامی", hoursOrScore: "۲۴ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "پایه ۱ شغلی",
      welfareQuotaBonus: "سهمیه استاندارد حکمت",
      commandAuthority: "اجرای دستورات تحت نظارت سرتیم",
    }
  },

  // سطح ۲
  "مامور ارشد گشت موتوری فوریت‌های ۱۱۰": {
    roleName: "مامور ارشد گشت موتوری فوریت‌های ۱۱۰",
    levelTitle: "سطح ۲: متصدی (شغل فعلی)",
    category: "عملیاتی و صفی",
    summary: "واکنش سریع به فوریت‌های پلیسی ۱۱۰، گشت‌زنی فعال موتوری و کنترل اولیه صحنه‌های انتظامی.",
    minScore: 80,
    minExperienceYears: 1,
    requiredRank: "ستوان‌دوم یا ستوان‌یکم",
    currentReadinessPercent: 100,
    domains: [
      {
        id: "d-ops",
        title: "مهارت‌های عملیاتی و واکنش سریع",
        iconName: "zap",
        description: "مهارت‌های فنی رانندگی موتورسیلکت سنگین سازمانی و ناوبری شهری",
        progressPercent: 100,
        items: [
          { id: "i4", title: "گواهی تخصصی موتورسواری تاکتیکی و مانور عملیاتی (کلاس ۲۵۰/۴۰۰)", description: "قبولی در تست‌های تعادل، تعقیب و گریز و ترمزگیری شدید", isPassed: true, type: "تاییدیه و گواهی", hoursOrScore: "۶۰ ساعت" },
          { id: "i5", title: "ناوبری شهری، کار با تبلت گشت هوشمند و سیستم ۱۱۰", description: "مسلط بر نرم‌افزار AVLS و ثبت برخط رخدادها", isPassed: true, type: "دوره الزامی", hoursOrScore: "۳۰ ساعت" },
          { id: "i6", title: "شاخص میانگین زمان رسیدن سر صحنه زیر ۷ دقیقه", description: "عملکرد ۹ ماه اخیر در محدوده کلانتری ۱۰۳", isPassed: true, type: "شاخص عملکردی", hoursOrScore: "۶.۲ دقیقه" },
        ]
      },
      {
        id: "d-beh",
        title: "مهارت‌های رفتاری و کنترل بحران",
        iconName: "users",
        description: "تعامل اجتماعی، کاهش تنش و به کارگیری تجهیزات دفاع شخصی",
        progressPercent: 100,
        items: [
          { id: "i7", title: "دوره فن بیان، مدیریت خشم و مهار شهروندان هیجان‌زده", description: "تکنیک‌های کلامی کاهش اصطکاک در صحنه نزاع", isPassed: true, type: "دوره الزامی", hoursOrScore: "۳۲ ساعت" },
          { id: "i8", title: "دفاع شخصی کاربردی و مهار متهم با دستبند استاندارد", description: "تاییدیه هیات ورزش‌های رزمی فراجا", isPassed: true, type: "ارزیابی تخصصی", hoursOrScore: "نمره ۹۰" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۲ عملیاتی (+۱۵٪ سختی خدمت)",
      welfareQuotaBonus: "سهمیه ۱۲۰ امتیازی رفاهی",
      commandAuthority: "مسئول موتور و هدایت کمک‌متصدی گشت",
    }
  },

  "متصدی گشت انتظامی و بدرقه متهم": {
    roleName: "متصدی گشت انتظامی و بدرقه متهم",
    levelTitle: "سطح ۲: متصدی",
    category: "عملیاتی و صفی",
    summary: "انتقال امن متهمین به مراجع قضایی، حفاظت از بازداشتگاه موقت و تامین امنیت خودروهای حمل متهم.",
    minScore: 80,
    minExperienceYears: 1,
    requiredRank: "ستوان‌سوم یا ستوان‌دوم",
    currentReadinessPercent: 88,
    domains: [
      {
        id: "d-sec",
        title: "حفاظت فیزیکی و استانداردهای انتقال متهم",
        iconName: "shield",
        description: "ضوابط بازرسی بدنی، دستبند و پابند و پیشگیری از فرار متهم",
        progressPercent: 90,
        items: [
          { id: "i9", title: "استانداردهای حفاظت خودروهای بدرقه و مسیرهای امن", description: "بررسی دوره‌ای ادوات امنیتی و خودروهای ون سازمانی", isPassed: true, type: "دوره الزامی", hoursOrScore: "۲۸ ساعت" },
          { id: "i10", title: "چک‌لیست عدم سوء‌پیشینه و آزمایش‌های غربالگری هوشیاری", description: "سلامت روان و تمرکز بالا در شرایط خاص بدرقه", isPassed: true, type: "ارزیابی تخصصی", hoursOrScore: "تایید بهداری" },
        ]
      },
      {
        id: "d-law",
        title: "موازین حقوقی تحت‌نظرگاه و حقوق متهم",
        iconName: "scale",
        description: "رعایت منشور حقوق متهمین در مراجع قضایی و انتظامی",
        progressPercent: 85,
        items: [
          { id: "i11", title: "آیین‌نامه مراقبت از بازداشت‌شدگان و تفتیش بدنی قانونی", description: "اجتناب از نقض حقوق قانونی متهم در زمان تحویل و تحول", isPassed: true, type: "دوره الزامی", hoursOrScore: "۲۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۲ انتظامی (+۱۰٪ فوق‌العاده بدرقه)",
      welfareQuotaBonus: "سهمیه ۱۰۰ امتیازی رفاهی",
      commandAuthority: "سرپرست تیم بدرقه متهمین تا ۲ نفر",
    }
  },

  "متصدی بررسی صحنه و گزارش اولیه": {
    roleName: "متصدی بررسی صحنه و گزارش اولیه",
    levelTitle: "سطح ۲: متصدی",
    category: "فنی و تخصصی",
    summary: "حفظ اولیه صحنه جرم، ثبت گزارش‌های دقیق میدانی و تعامل با عوامل تشخیص هویت و دایره تجسس.",
    minScore: 82,
    minExperienceYears: 1,
    requiredRank: "ستوان‌دوم",
    currentReadinessPercent: 82,
    domains: [
      {
        id: "d-rep",
        title: "مستندسازی و گزارش‌نویسی قضایی",
        iconName: "book",
        description: "تنظیم بدون نقص صورت‌جلسات کشف و اظهارات شاکیان",
        progressPercent: 75,
        items: [
          { id: "i12", title: "کارگاه نگارش صورت‌جلسه قضایی و اصطلاحات کیفری", description: "فاقد هرگونه خطای شکلی در ارجاع به دادسرا", isPassed: false, type: "دوره الزامی", hoursOrScore: "۳۶ ساعت (نیاز به تکمیل)" },
          { id: "i13", title: "عکاسی از صحنه جرم و علامت‌گذاری سرنخ‌های مشهود", description: "تجهیزات تصویربرداری و بسته‌بندی ادله مکشوفه", isPassed: true, type: "ارزیابی تخصصی", hoursOrScore: "نمره ۸۵" },
        ]
      },
      {
        id: "d-sci",
        title: "اصول حفاظت صحنه جرم",
        iconName: "shield",
        description: "نواردوزی صحنه و ممانعت از آلودگی ادله جنایی",
        progressPercent: 90,
        items: [
          { id: "i14", title: "پروتکل‌های اولیه پلیس آگاهی در سرقت و نزاع منجر به جرح", description: "هماهنگی سریع با بازپرس کشیک و سرتیم تجسس", isPassed: true, type: "دوره الزامی", hoursOrScore: "۲۴ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۲ تخصصی (+۱۲٪ حق تخصص گزارش‌نویسی)",
      welfareQuotaBonus: "سهمیه ۱۱۰ امتیازی",
      commandAuthority: "مقام مسئول مستندسازی صحنه در کلانتری",
    }
  },

  // سطح ۳
  "سرتیم گشت موتوری واکنش سریع ۱۱۰": {
    roleName: "سرتیم گشت موتوری واکنش سریع ۱۱۰",
    levelTitle: "سطح ۳: کاردان (هدف اول شما)",
    category: "عملیاتی و صفی",
    summary: "فرماندهی میدانی گروهان‌های گشت موتوری، هدایت تاکتیکی در حوادث حاد، تدوین برنامه‌های استقرار و کاهش زمان رسیدن به زیر ۵ دقیقه.",
    minScore: 90,
    minExperienceYears: 3,
    requiredRank: "ستوان‌یکم یا سروان",
    currentReadinessPercent: 74,
    domains: [
      {
        id: "d-tact",
        title: "فرماندهی میدانی و تصمیم‌گیری در شرایط بحران",
        iconName: "zap",
        description: "مدیریت تاکتیکی چندین گشت همزمان و پشتیبانی خطوط انتظامی",
        progressPercent: 70,
        items: [
          { id: "i15", title: "دوره جامع مدیریت صحنه‌های سرقت به عنف و درگیری‌های مسلحانه", description: "آموزش تصمیم‌گیری سریع زیر ۵ ثانیه در ماموریت‌های کد قرمز", isPassed: true, type: "دوره الزامی", hoursOrScore: "۴۸ ساعت" },
          { id: "i16", title: "شبیه‌ساز پیشرفته رانندگی تاکتیکی در ترافیک فشرده شهری", description: "عبور از معابر شلوغ و هدایت ستون گشت", isPassed: false, type: "ارزیابی تخصصی", hoursOrScore: "آزمون ماه بعد (نیاز به ارزیابی)" },
          { id: "i17", title: "کسب حداقل نمره ۹۰ در ارزیابی عملکرد سالانه مربی", description: "شاخص کارنامه شایستگی فصلی", isPassed: true, type: "شاخص عملکردی", hoursOrScore: "نمره ۹۱.۵" },
        ]
      },
      {
        id: "d-comm",
        title: "هماهنگی رادیویی و سامانه‌های پیشرفته C4I",
        iconName: "award",
        description: "تسلط کامل بر بی‌سیم‌های رمزکننده تترا، پهپادهای شناسایی و مانیتورینگ",
        progressPercent: 80,
        items: [
          { id: "i18", title: "دوره پروتکل‌های مخابراتی امن و رمز انتظامی", description: "انتقال امن موقعیت و پیام‌های کدگذاری شده", isPassed: true, type: "دوره الزامی", hoursOrScore: "۲۴ ساعت" },
          { id: "i19", title: "هدایت عملیات ترکیبی (موتوری + خودرویی)", description: "مانور هماهنگ محاصره مجرمین متواری", isPassed: false, type: "سابقه ماموریتی", hoursOrScore: "نیاز به ثبت حداقل ۳ مانور" },
        ]
      },
      {
        id: "d-lead",
        title: "سرپرستی و مربی‌گری ماموران جوان",
        iconName: "users",
        description: "انتقال تجربه، ارزیابی ایمنی راکبین و هدایت تیم‌های ۲ نفره",
        progressPercent: 72,
        items: [
          { id: "i20", title: "کارگاه اصول منتورینگ و بازخورد موثر در پلیس", description: "ایجاد انگیزه و تقویت شجاعت توام با احتیاط در نیروها", isPassed: true, type: "دوره الزامی", hoursOrScore: "۱۶ ساعت" },
          { id: "i21", title: "چک‌لیست ایمنی روزانه ادوات و لباس ضدگلوله و کلاه ایمنی", description: "نظارت روزانه قبل از اعزام به گشت", isPassed: false, type: "تاییدیه و گواهی", hoursOrScore: "تایید بازرسی یگان" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۳ ارشد (+۲۵٪ فوق‌العاده سرتیمی واکنش سریع)",
      welfareQuotaBonus: "سهمیه ۱۸۰ امتیازی رفاهی + سهمیه سالانه اماکن اقامتی",
      commandAuthority: "فرماندهی عملیاتی تیم‌های گشت موتوری شیفت",
    }
  },

  "سرتیم گشت خودرویی حوزه استحفاظی": {
    roleName: "سرتیم گشت خودرویی حوزه استحفاظی",
    levelTitle: "سطح ۳: کاردان",
    category: "عملیاتی و صفی",
    summary: "پوشش حفاظتی گستره حوزه استحفاظی کلانتری با خودروهای سمند/بنز امدادی، انسداد معابر و پیشگیری فعال.",
    minScore: 88,
    minExperienceYears: 3,
    requiredRank: "ستوان‌یکم",
    currentReadinessPercent: 68,
    domains: [
      {
        id: "d-car",
        title: "رانندگی تدافعی خودروهای پلیس و تعقیب جاده‌ای",
        iconName: "zap",
        description: "مهارت PIT maneuver، ترمز ضدقفل و کنترل خودرو در سرعت بالا",
        progressPercent: 65,
        items: [
          { id: "i22", title: "دوره پیست و مانور تعقیب و گریز خودرویی فراجا", description: "تاییدیه مرکز آزمون رانندگی حرفه‌ای پلیس", isPassed: false, type: "تاییدیه و گواهی", hoursOrScore: "۴۰ ساعت در دست اقدام" },
          { id: "i23", title: "نگهداری فنی و سیستم‌های برق خودروهای پلیس", description: "کار با آژیر، پروژکتور جستجو و سامانه‌های برق اضطراری", isPassed: true, type: "دوره الزامی", hoursOrScore: "۱۸ ساعت" },
        ]
      },
      {
        id: "d-geo",
        title: "جغرافیای جرم و گشت هدفمند محله‌محور",
        iconName: "book",
        description: "تحلیل نقاط داغ (Hotspots) سرقت و گشت‌زنی در ساعات بحرانی",
        progressPercent: 70,
        items: [
          { id: "i24", title: "دوره کار با سامانه GIS انتظامی و نقشه‌های حرارتی جرم", description: "تخصیص هوشمند مسیرهای گشت‌زنی", isPassed: true, type: "دوره الزامی", hoursOrScore: "۳۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۳ عملیاتی (+۲۰٪ فوق‌العاده خودرویی)",
      welfareQuotaBonus: "سهمیه ۱۶۰ امتیازی",
      commandAuthority: "فرمانده گشت خودرویی و مسئول تجهیزات امدادی",
    }
  },

  "کاردان عملیات و جمع‌آوری اطلاعات": {
    roleName: "کاردان عملیات و جمع‌آوری اطلاعات",
    levelTitle: "سطح ۳: کاردان",
    category: "اطلاعاتی و انتظامی",
    summary: "پایش محیطی منابع محلی، کشف باندهای توزیع مواد و سرقت، ارتباط با معتمدین محلی و دایره اطلاعات کلانتری.",
    minScore: 92,
    minExperienceYears: 3,
    requiredRank: "ستوان‌یکم",
    currentReadinessPercent: 62,
    domains: [
      {
        id: "d-inf",
        title: "تکنیک‌های جمع‌آوری پنهان و آشکار اطلاعات",
        iconName: "shield",
        description: "شناسایی متهمین تحت تعقیب و رصد پاتوق‌های جرم‌خیز",
        progressPercent: 60,
        items: [
          { id: "i25", title: "دوره جامع طبقه‌بندی و ارزیابی اخبار و شایعات محلی", description: "تایید صحت گزارش‌ها قبل از عملیات ضربتی", isPassed: true, type: "دوره الزامی", hoursOrScore: "۳۶ ساعت" },
          { id: "i26", title: "مصاحبه انتظامی و فنون تخلیه اطلاعاتی متهمین در صحنه", description: "رعایت ضوابط روانشناختی مصاحبه", isPassed: false, type: "ارزیابی تخصصی", hoursOrScore: "نیاز به کارگاه عملی" },
        ]
      },
      {
        id: "d-sec",
        title: "حفاظت اسناد و اطلاعات طبقه‌بندی شده",
        iconName: "book",
        description: "پیشگیری از تخلیه تلفنی و امنیت تبادل داده‌های عملیاتی",
        progressPercent: 65,
        items: [
          { id: "i27", title: "گواهی دوره حفاظت گفتار و ارتباطات سازمان حفا", description: "رعایت پروتکل‌های امنیت تماس و پرونده‌ها", isPassed: true, type: "تاییدیه و گواهی", hoursOrScore: "نمره عالی" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۳ تخصصی اطلاعاتی (+۲۲٪)",
      welfareQuotaBonus: "سهمیه ۱۷۰ امتیازی",
      commandAuthority: "مسئول هدایت تیم‌های شناسایی و جمع‌آوری خبر",
    }
  },

  // سطح ۴
  "افسر شیفت عملیات کلانتری": {
    roleName: "افسر شیفت عملیات کلانتری",
    levelTitle: "سطح ۴: کارشناسی",
    category: "فرماندهی و ارشد",
    summary: "فرماندهی کامل عملیات کلانتری در طول شیفت ۱۲ یا ۲۴ ساعته، مدیریت اعزام‌ها، پاسخگویی به بازرسی و مراجع قضایی کشیک.",
    minScore: 94,
    minExperienceYears: 5,
    requiredRank: "سروان یا سرگرد",
    currentReadinessPercent: 54,
    domains: [
      {
        id: "d-lead",
        title: "مدیریت جامع شیفت و انضباط یگانی",
        iconName: "award",
        description: "کنترل حضور و غیاب، توزیع اسلحه و مهمات و نظارت بر تحت‌نظرگاه",
        progressPercent: 55,
        items: [
          { id: "i28", title: "دوره عالی سرپرستی کلانتری و مدیریت منابع انسانی شیفت", description: "هدایت ۳۰ تا ۵۰ نفر کارکنان کادر و وظیفه", isPassed: false, type: "دوره الزامی", hoursOrScore: "۶۰ ساعت (در برنامه سال آتی)" },
          { id: "i29", title: "تسلط بر سامانه جامع رخدادهای انتظامی (سجا) و سامانه مدیریت اسلحه", description: "ثبت بی‌درنگ کلیه وقایع شیفت", isPassed: true, type: "ارزیابی تخصصی", hoursOrScore: "نمره ۹۵" },
          { id: "i30", title: "گذراندن حداقل ۳ سال سابقه در رده‌های سرتیمی گشت", description: "تایید سابقه کارگزینی", isPassed: false, type: "سابقه ماموریتی", hoursOrScore: "۲ سال سپری شده (۱ سال مانده)" },
        ]
      },
      {
        id: "d-jud",
        title: "هماهنگی‌های قضایی و بازپرس‌های ویژه",
        iconName: "scale",
        description: "اخذ دستورات تلفنی قضایی، احکام ورود به مخفیگاه در موارد فوری",
        progressPercent: 50,
        items: [
          { id: "i31", title: "کارگاه جامع ارتباط موثر با دادسرای ناحیه و قضات کشیک", description: "تسلط کامل بر حدود اختیارات ضابط عام در جرایم مهم", isPassed: false, type: "دوره الزامی", hoursOrScore: "۳۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۴ کارشناسی (+۳۵٪ فوق‌العاده مسئولیت شیفت)",
      welfareQuotaBonus: "سهمیه ۲۴۰ امتیازی + حق مسکن سازمانی اولویت ۲",
      commandAuthority: "فرمانده ارشد یگان در ساعات غیراداری و شیفت",
    }
  },

  "کارشناس مبارزه با جرایم خاص": {
    roleName: "کارشناس مبارزه با جرایم خاص",
    levelTitle: "سطح ۴: کارشناسی",
    category: "فنی و تخصصی",
    summary: "پیگیری پرونده‌های پیچیده سرقت‌های مسلحانه، زورگیری باندی و اراذل و اوباش سطح‌بندی شده.",
    minScore: 94,
    minExperienceYears: 5,
    requiredRank: "سروان",
    currentReadinessPercent: 48,
    domains: [
      {
        id: "d-inv",
        title: "تحلیل رفتار مجرمین و بازجویی‌های تخصصی",
        iconName: "book",
        description: "روانشناسی جنایی، متدهای کشف جرم علمی و بازیابی اطلاعات",
        progressPercent: 45,
        items: [
          { id: "i32", title: "دوره تخصصی کشف علمی جرم دانشگاه علوم انتظامی امین", description: "شیمی جنایی، انگشت‌نگاری و بیومتریک", isPassed: false, type: "دوره الزامی", hoursOrScore: "۸۰ ساعت" },
          { id: "i33", title: "سابقه کشف موفق حداقل ۵ پرونده جرایم باندی", description: "تاییدیه پلیس آگاهی استان", isPassed: false, type: "شاخص عملکردی", hoursOrScore: "۲ پرونده ثبت شده" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۴ تخصصی آگاهی (+۳۰٪)",
      welfareQuotaBonus: "سهمیه ۲۲۰ امتیازی",
      commandAuthority: "هدایت دایره تجسس و تیم‌های ضربت کلانتری",
    }
  },

  "کارشناس مدیریت صحنه و پیشگیری": {
    roleName: "کارشناس مدیریت صحنه و پیشگیری",
    levelTitle: "سطح ۴: کارشناسی",
    category: "اطلاعاتی و انتظامی",
    summary: "طراحی الگوهای کاهش سرقت، مهندسی روشنایی معابر با شهرداری و جلب مشارکت هیئت‌امنای محلات.",
    minScore: 94,
    minExperienceYears: 5,
    requiredRank: "سروان",
    currentReadinessPercent: 52,
    domains: [
      {
        id: "d-prev",
        title: "پیشگیری وضعی از جرم (CPTED)",
        iconName: "shield",
        description: "اصول طراحی محیطی برای پیشگیری از جرم در مجتمع‌های مسکونی و تجاری",
        progressPercent: 50,
        items: [
          { id: "i34", title: "دوره تخصصی CPTED و پایش تصویری شهری", description: "تحلیل نقاط کور شهری و نصب دوربین‌های مداربسته", isPassed: true, type: "دوره الزامی", hoursOrScore: "۳۲ ساعت" },
          { id: "i35", title: "تکمیل پروژه ارزیابی امنیتی محله‌ای با تایید سرکلانتری", description: "تدوین سند آسیب‌شناسی جرایم محله", isPassed: false, type: "ارزیابی تخصصی", hoursOrScore: "در حال تدوین" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۴ پیشگیری (+۲۸٪)",
      welfareQuotaBonus: "سهمیه ۲۱۰ امتیازی",
      commandAuthority: "رئیس دایره پیشگیری انتظامی کلانتری",
    }
  },

  // سطح ۵
  "معاون عملیات و پیشگیری کلانتری": {
    roleName: "معاون عملیات و پیشگیری کلانتری",
    levelTitle: "سطح ۵: ارشد و فرماندهی",
    category: "فرماندهی و ارشد",
    summary: "جانشین اول رئیس کلانتری، مسئول مستقیم کلیه گشت‌ها، طرح‌های ارتقای امنیت اجتماعی و هماهنگی سرکلانتری.",
    minScore: 98,
    minExperienceYears: 9,
    requiredRank: "سرگرد یا سرهنگ‌دوم",
    currentReadinessPercent: 38,
    domains: [
      {
        id: "d-strat",
        title: "طرح‌ریزی عملیات‌های گسترده انتظامی",
        iconName: "award",
        description: "تدوین طرح‌های پاکسازی نقاط آلوده، مانورهای کنترل اغتشاشات و امنیت انتخابات",
        progressPercent: 35,
        items: [
          { id: "i36", title: "دوره عالی فرماندهی و ستاد (دافوس فراجا)", description: "اصول مدیریت عملیات مشترک و پدافند غیرعامل", isPassed: false, type: "دوره الزامی", hoursOrScore: "۱۲۰ ساعت (پیشنیاز سطح ۵)" },
          { id: "i37", title: "کسب حداقل نمره ۹۵ در ارزشیابی جامع فرماندهی", description: "تاییدیه بازرسی کل و هیات ارزیابی شایستگی", isPassed: false, type: "شاخص عملکردی", hoursOrScore: "نمره هدف ۹۵+" },
          { id: "i38", title: "عضویت رسمی در مخزن استعدادهای جانشین‌پروری فراجا", description: "مصاحبه کانون ارزیابی مدیران ارشد", isPassed: true, type: "تاییدیه و گواهی", hoursOrScore: "پذیرفته شده با گرید A" },
        ]
      },
      {
        id: "d-crisis",
        title: "مدیریت بحران‌های امنیتی و تجمعات غیرقانونی",
        iconName: "shield",
        description: "تاکتیک‌های مهار بدون خشونت، استفاده متناسب از نیرو و تجهیزات ضدشورش",
        progressPercent: 40,
        items: [
          { id: "i39", title: "دوره تاکتیکی کنترل تجمعات و مذاکره در بحران", description: "شبیه‌ساز سناریوهای گروگان‌گیری و اعتراضات", isPassed: false, type: "دوره الزامی", hoursOrScore: "۵۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۵ فرماندهی ارشد (+۴۵٪ فوق‌العاده جانشین)",
      welfareQuotaBonus: "سهمیه ۳۵۰ امتیازی + خانه سازمانی ویلایی/آپارتمانی ممتاز",
      commandAuthority: "جانشین فرمانده حوزه و رئیس عملیات کلانتری",
    }
  },

  "رئیس ایستگاه و پایگاه انتظامی": {
    roleName: "رئیس ایستگاه و پایگاه انتظامی",
    levelTitle: "سطح ۵: ارشد و فرماندهی",
    category: "فرماندهی و ارشد",
    summary: "فرماندهی پایگاه‌های اقماری و پاسگاه‌های تابعه، مدیریت خدمات انتظامی و گشت‌های مرزی/شهری.",
    minScore: 98,
    minExperienceYears: 9,
    requiredRank: "سرگرد",
    currentReadinessPercent: 40,
    domains: [
      {
        id: "d-post",
        title: "مدیریت مستقل پایگاه انتظامی",
        iconName: "award",
        description: "بودجه‌بندی پایگاه، لجستیک و تامین مایحتاج ماموریت‌ها",
        progressPercent: 40,
        items: [
          { id: "i40", title: "دوره مدیریت مالی و آماد و پشتیبانی پایگاه‌های فراجا", description: "نگهداری ابنیه و تجهیزات لجستیکی", isPassed: false, type: "دوره الزامی", hoursOrScore: "۴۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۵ فرماندهی (+۴۰٪)",
      welfareQuotaBonus: "سهمیه ۳۲۰ امتیازی",
      commandAuthority: "فرمانده مستقل ایستگاه با حق تنبیه و تشویق کارکنان",
    }
  },

  "فرمانده یگان واکنش سریع گشت": {
    roleName: "فرمانده یگان واکنش سریع گشت",
    levelTitle: "سطح ۵: ارشد و فرماندهی",
    category: "عملیاتی و صفی",
    summary: "فرماندهی تمامی یگان‌های ضربت موتوری و خودرویی منطقه، اجرای ماموریت‌های فوری ویژه و پشتیبانی هوایی.",
    minScore: 98,
    minExperienceYears: 9,
    requiredRank: "سرگرد یا سرهنگ‌دوم",
    currentReadinessPercent: 42,
    domains: [
      {
        id: "d-strike",
        title: "تاکتیک‌های رزم نزدیک و عملیات‌های رهایی",
        iconName: "zap",
        description: "فرماندهی تیم‌های نوپو و ضربت در سطح سرکلانتری",
        progressPercent: 45,
        items: [
          { id: "i41", title: "دوره ویژه فرماندهی رزم نزدیک شهری و تیراندازی تاکتیکی پیشرفته", description: "تاییدیه یگان ویژه پاسداران فراجا", isPassed: true, type: "دوره الزامی", hoursOrScore: "۸۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۵ ویژه (+۵۰٪ حق ماموریت‌های ضربت)",
      welfareQuotaBonus: "سهمیه ۳۸۰ امتیازی",
      commandAuthority: "فرماندهی کلیه واحدهای ضربت و واکنش سریع منطقه",
    }
  },

  // سطح ۶
  "رئیس کلانتری (فرمانده حوزه)": {
    roleName: "رئیس کلانتری (فرمانده حوزه)",
    levelTitle: "سطح ۶: مدیریتی عالی",
    category: "فرماندهی و ارشد",
    summary: "فرمانده کلانتری، مسئولیت تام امنیت و آرامش حوزه استحفاظی، ارتباط مستقیم با فرماندار، دادستان، شورای تامین شهرستان و فرمانده انتظامی استان.",
    minScore: 104,
    minExperienceYears: 14,
    requiredRank: "سرهنگ تمام",
    currentReadinessPercent: 25,
    domains: [
      {
        id: "d-top",
        title: "حکمرانی امنیتی، مدیریت عالی و حقوق عمومی",
        iconName: "award",
        description: "سیاست‌گذاری امنیتی محله، تعامل با نهادهای دولتی و مراجع قضایی عالی",
        progressPercent: 20,
        items: [
          { id: "i42", title: "دوره عالی مدیریت راهبردی کلانتری‌ها و سرکلانتری‌ها", description: "برنامه‌ریزی استراتژیک ۵ ساله و کنترل هوشمند جرایم", isPassed: false, type: "دوره الزامی", hoursOrScore: "۱۸۰ ساعت (پیشنیاز مصاحبه انتصاب)" },
          { id: "i43", title: "تاییدیه مصاحبه تخصصی هیئت گزینش و انتصابات فرماندهی کل فراجا", description: "ارزیابی جامع صلاحیت‌های مکتبی، امنیتی و ریاستی", isPassed: false, type: "تاییدیه و گواهی", hoursOrScore: "مرحله نهایی" },
          { id: "i44", title: "حداقل ۵ سال سابقه موفق در سمت‌های معاونت کلانتری یا ریاست پاسگاه", description: "سوابق خدمتی شفاف بدون محکومیت قضایی یا انضباطی", isPassed: false, type: "سابقه ماموریتی", hoursOrScore: "نیازمند ارتقای سنواتی" },
        ]
      },
      {
        id: "d-soc",
        title: "پلیس جامعه‌محور و سرمایه اجتماعی",
        iconName: "users",
        description: "جلب اعتماد عمومی، پاسخگویی در رسانه‌ها و مدیریت افکار عمومی در حوادث حساس",
        progressPercent: 30,
        items: [
          { id: "i45", title: "کارگاه ارتباط با رسانه‌ها و سخنگویی انتظامی", description: "مدیریت بحران‌های خبری و اطلاع‌رسانی صحیح به مردم", isPassed: false, type: "دوره الزامی", hoursOrScore: "۴۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۶ فرماندهی عالی (+۶۰٪ حقوق و فوق‌العاده ریاست)",
      welfareQuotaBonus: "سهمیه کامل ۵۰۰ امتیازی + خودروی سازمانی و منزل ممتاز",
      commandAuthority: "فرماندهی ارشد حوزه انتظامی و ضابط ارشد قضایی شهرستان",
    }
  },

  "معاون هماهنگ‌کننده سرکلانتری": {
    roleName: "معاون هماهنگ‌کننده سرکلانتری",
    levelTitle: "سطح ۶: مدیریتی عالی",
    category: "ستادی و پشتیبانی",
    summary: "هماهنگی و نظارت بر چندین کلانتری در منطقه، ارزیابی عملکرد فرماندهان و مدیریت منابع لجستیکی سرکلانتری.",
    minScore: 104,
    minExperienceYears: 14,
    requiredRank: "سرهنگ تمام",
    currentReadinessPercent: 28,
    domains: [
      {
        id: "d-coord",
        title: "نظارت راهبردی و بازرسی یگان‌های تابعه",
        iconName: "shield",
        description: "پایش شاخص‌های عملکردی کلانتری‌های منطقه و ارتقای استانداردها",
        progressPercent: 25,
        items: [
          { id: "i46", title: "دوره جامع ارزیابی عملکرد و ممیزی فرآیندهای انتظامی", description: "هدایت تیم‌های بازرسی نامحسوس و رفع نواقص سازمانی", isPassed: false, type: "دوره الزامی", hoursOrScore: "۱۰۰ ساعت" },
        ]
      }
    ],
    careerBenefits: {
      salaryGradeIncrease: "گرید ۶ ستادی (+۵۵٪)",
      welfareQuotaBonus: "سهمیه ۴۸۰ امتیازی",
      commandAuthority: "نظارت عالی بر کلیه کلانتری‌های زیرمجموعه سرکلانتری",
    }
  }
};
