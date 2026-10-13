// Full 24-Page Specification Data for Faraja Meyar System
// Includes all 7 Messages / 24 Administrative Pages with comprehensive details,
// formulas, tables, operational scenarios, and step-by-step guides.

export interface WalkthroughPageItem {
  pageNumber: number;
  messageNumber: number;
  chapterId: 'intro' | 'employee' | 'evaluator' | 'manager' | 'gis' | 'synergy';
  chapterTitle: string;
  pageTitle: string;
  pageSubtitle: string;
  contentHtml: string;
  markdownContent: string;
}

export const WALKTHROUGH_PAGES_META = [
  { message: 1, chapter: 'معماری کلان و هویت بصری', pages: '۱ و ۲', count: 2, trigger: 'پیام شماره ۱ (فصل اول: معماری و هویت بصری) را کامل تدوین کن.' },
  { message: 2, chapter: 'راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر', pages: '۳ تا ۸', count: 6, trigger: 'پیام شماره ۲ (فصل دوم: راهنمای ۱۲ خدمت پرسنل) را کامل تدوین کن.' },
  { message: 3, chapter: 'آیین‌نامه اتصال نمره عملکرد به حقوق و فرمول مسکن', pages: '۹ تا ۱۱', count: 3, trigger: 'پیام شماره ۳ (آیین‌نامه حقوق، پاداش و فرمول مسکن) را تدوین کن.' },
  { message: 4, chapter: 'راهنمای ارزیاب شایستگی، ۱۰۰ شغل و گزینش فراجا', pages: '۱۲ تا ۱۵', count: 4, trigger: 'پیام شماره ۴ (فصل سوم: راهنمای ارزیاب و گزینش) را تدوین کن.' },
  { message: 5, chapter: 'راهنمای فرماندهی، مرکز کنترل، جانشین‌پروری و DSS', pages: '۱۶ تا ۱۹', count: 4, trigger: 'پیام شماره ۵ (فصل چهارم: راهنمای فرماندهی و DSS) را تدوین کن.' },
  { message: 6, chapter: 'سند آمایش سرزمینی فراجا بر اساس GIS و نقشه ۳۱ استان', pages: '۲۰ تا ۲۲', count: 3, trigger: 'پیام شماره ۶ (فصل پنجم: سند آمایش سرزمینی GIS) را تدوین کن.' },
  { message: 7, chapter: 'کمیسیون نهایی جذب و چرخه ۵ مرحله‌ای هم‌افزایی داده‌ها', pages: '۲۳ و ۲۴', count: 2, trigger: 'پیام شماره ۷ (آیین‌نامه کمیسیون نهایی و چرخه داده) را تدوین کن.' },
];

export const MASTER_GEMINI_PROMPT = `نقش شما: مشاور ارشد سیستم‌های مدیریت سرمایه انسانی، آیین‌نامه‌نویسی نظامی و آمایش سرزمینی در نیروهای مسلح (فرماندهی انتظامی جمهوری اسلامی ایران - فراجا).
ورودی: سند جامع شناسنامه کارکردی و راهنمای تفصیلی سامانه معیار فراجا (نسخه ۳.۲.۰ نهایی).

دستورالعمل اجرایی:
۱. شما باید خروجی را دقیقاً مطابق با ۲۴ صفحه پیش‌بینی‌شده در ۷ پیام مجزا و تفکیک‌شده ارائه دهید.
۲. از هرگونه خلاصه‌سازی، کلی‌گویی و تقلیل مطالب خودداری کنید. متن‌ها باید با لحن رسمی، اداری، متقن، ماده‌بندی‌شده، دارای جدول‌های ماتریسی و قابل ابلاغ مستقیم به یگان‌های فراجا تدوین شوند.
۳. در هر مرحله منتظر دستور کاربر برای شماره پیام بعدی بمانید و دقیقاً سرفصل‌های همان پیام را با حداکثر جزئیات بنویسید.
۴. فرمول‌های ریاضی محاسبه پاداش فیش حقوقی، امتیاز شفاف نوبت مسکن سازمانی و مدل غربالگری فرسودگی شغلی EWS را با تمام متغیرها و جداول ضرایب درج فرمایید.
۵. لایه‌های هفت‌گانه نقشه تعاملی ۳۱ استان سامانه GIS و مدل ۵ مرحله‌ای هم‌افزایی داده‌ها را به طور کامل تشریح نمایید.`;

export const FARAJA_FULL_24_PAGES: WalkthroughPageItem[] = [
  // PAGE 1
  {
    pageNumber: 1,
    messageNumber: 1,
    chapterId: 'intro',
    chapterTitle: 'فصل اول: معماری کلان، هویت بصری و اهداف راهبردی',
    pageTitle: 'شناسنامه رسمی، ابلاغیه ستادی و اهداف راهبردی سامانه معیار فراجا',
    pageSubtitle: 'تحول بنیادین از مدیریت سنتی به ارزیابی داده‌محور و شایسته‌سالاری در نیروهای مسلح',
    contentHtml: `
      <div class="space-y-4">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-300">
          <table class="w-full text-xs">
            <tbody>
              <tr><td class="font-bold py-1 w-36">سازمان متبوع:</td><td>ستاد کل نیروهای مسلح - فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)</td></tr>
              <tr><td class="font-bold py-1">معاونت متولی:</td><td>معاونت نیروی انسانی - اداره کل تحول و ارزیابی شایستگی</td></tr>
              <tr><td class="font-bold py-1">عنوان سامانه:</td><td>سامانه یکپارچه «معیار» (مدیریت عملکرد و یکپارچگی استاندارد رفتاری)</td></tr>
              <tr><td class="font-bold py-1">شماره سند مصوب:</td><td>فراجا/معیار/۱۴۰۵/۳۲۰-ن | سطح دسترسی: اداری سازمانی</td></tr>
              <tr><td class="font-bold py-1">نسخه و تاریخ:</td><td>نسخه ۳.۲.۰ جامع - شهریور ماه ۱۴۰۵</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. مقدمه و فلسفه بنیادین سامانه</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          فرماندهی انتظامی جمهوری اسلامی ایران (فراجا) با ماموریت‌های متنوع و پراکندگی جغرافیایی از مرزهای شرقی و غربی تا کلان‌شهرها و جاده‌های مواصلاتی کشور، نیازمند سازوکاری نوین، هوشمند و یکپارچه در حوزه سرمایه انسانی است. سامانه «معیار» پاسخی راهبردی به ضرورت گذر از شیوه‌های سنتی، سلیقه‌ای و مبتنی بر کاغذ به سوی ارزیابی‌های رفتاری استاندارد، شفافیت شایستگی و آمایش عادلانه سرزمینی است.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. پنج هدف راهبردی کلان سامانه معیار</h3>
        <ol class="list-decimal list-inside space-y-2 text-xs text-slate-700">
          <li><strong>استقرار نظام شایسته‌سالاری عادلانه در انتصابات:</strong> کشف استعدادهای نهفته در رده‌های صفی و کلانتری‌ها بدون واسطه، جایگزینی سنجه‌های عینی رفتاری به جای روابط سلیقه‌ای.</li>
          <li><strong>اتصال مستقیم کارنامه عملکرد فصلی به پاداش و فیش حقوقی:</strong> ایجاد انگیزه ملموس اقتصادی از طریق آیین‌نامه رسمی و فرمول ریاضی پاداش کارایی متصل به نتایج مأموریت‌های واقعی.</li>
          <li><strong>شفافیت مطلق در تخصیص مسکن و تسهیلات حکمت:</strong> حذف هرگونه رانت در نوبت‌بندی منازل سازمانی با فرمول ریاضی ۶ متغیره و جدول امتیازات قابل مشاهده توسط پرسنل.</li>
          <li><strong>پیشگیری از فرسودگی شغلی و ساماندهی انتقالات (EWS Transfers):</strong> پایش خودکار ریسک ماندگاری در مناطق سخت، دوری از خانواده و بیماری‌های حاد پرسنل با الگوریتم هشدار زودهنگام.</li>
          <li><strong>آمایش سرزمینی هوشمند سرمایه انسانی (مصوبه بند ۳-۷ GIS):</strong> رصد برخط هرم درجات، تراکم پرسنل و تعادل منابع انسانی در ۳۱ استان بر روی نقشه چوروپلت حرارتی کشور.</li>
        </ol>
      </div>
    `,
    markdownContent: `### صفحه ۱: شناسنامه رسمی، ابلاغیه ستادی و اهداف راهبردی سامانه معیار فراجا
**سازمان متبوع:** ستاد کل نیروهای مسلح - فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)
**معاونت متولی:** معاونت نیروی انسانی - اداره کل تحول، تعالی سازمانی و ارزیابی شایستگی
**شماره سند:** فراجا/معیار/۱۴۰۵/۳۲۰-ن | سطح دسترسی: اداری سازمانی | نسخه: ۳.۲.۰ جامع

#### ۱. مقدمه و فلسفه بنیادین:
فرماندهی انتظامی جمهوری اسلامی ایران (فراجا) با گستره عملیاتی در سراسر کشور، سامانه «معیار» را به عنوان بستری یکپارچه برای تحقق شایسته‌سالاری، شفافیت حقوقی، رفاه هدفمند و آمایش داده‌محور مستقر نموده است.

#### ۲. اهداف راهبردی کلان پنج‌گانه:
۱. **استقرار شایسته‌سالاری عادلانه:** رصد استعدادها و انتصابات بر پایه سنجه‌های رفتاری عینی.
۲. **اتصال مستقیم عملکرد فصلی به پاداش فیش حقوقی:** پاداش‌دهی شفاف مبتنی بر کارنامه عینی مأموریت‌ها.
۳. **شفافیت کامل در تخصیص مسکن سازمانی:** فرمول ریاضی ۶ شاخصه بدون دخالت سلیقه‌ای.
۴. **کاهش فرسودگی شغلی و ساماندهی انتقالات (EWS):** پایش دوری از خانواده و سختی مأموریت.
۵. **آمایش سرزمینی هوشمند (GIS بند ۳-۷):** مدیریت توزیع عادلانه کادر در ۳۱ استان و پایش مناطق مرزی رده الف.`
  },

  // PAGE 2
  {
    pageNumber: 2,
    messageNumber: 1,
    chapterId: 'intro',
    chapterTitle: 'فصل اول: معماری کلان، هویت بصری و اهداف راهبردی',
    pageTitle: 'معماری کلان، هویت بصری، ارگونومی نظامی و ساختار ناوبری',
    pageSubtitle: 'تحلیل روانشناسی رنگ، ارگونومی شیفت‌های طولانی و نوار سراسری هدر سامانه',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. روانشناسی پالت رنگی انتظامی و ارگونومی دیداری</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          رابط کاربری سامانه معیار با در نظر گرفتن فعالیت مداوم افسران کشیک، اپراتورهای فوریت‌های ۱۱۰ و کارشناسان منابع انسانی در شیفت‌های شبانه‌روزی طراحی شده است. پالت رنگی از خستگی چشم ممانعت ورزیده و بر استانداردهای کنتراست WCAG AAA منطبق است:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-950 text-white border border-emerald-800 space-y-1">
            <span class="font-bold text-emerald-300">سبز تیره انتظامی (#081d11)</span>
            <p class="text-[11px] text-slate-200">نماد هویت پلیس جمهوری اسلامی ایران، امنیت، استواری و انضباط نظامی پایدار در کلیه ارکان.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 text-white border border-slate-700 space-y-1">
            <span class="font-bold text-slate-200">سرمه‌ای ستادی (#0f172a)</span>
            <p class="text-[11px] text-slate-300">فضای پس‌زمینه ستادی و کارت‌های مدیریتی جهت ارتقای تمرکز تحلیلی و عدم بازتاب نور در مانیتورها.</p>
          </div>
          <div class="p-3 rounded-xl bg-amber-600 text-white border border-amber-500 space-y-1">
            <span class="font-bold text-amber-100">طلایی کهربایی (#f59e0b)</span>
            <p class="text-[11px] text-amber-100">بازتاب‌دهنده سردوشی‌ها، درجات نظامی، نشان‌های افتخار هاب اشرف و مدال‌های تیراندازی و ایثارگری.</p>
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. سوییچر نقش‌های ۳ سطحی (Instant Role Switcher)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          سامانه بر پایه یک معماری ماژولار با تب‌های پایدار (Persistent Tab Outlet) عمل می‌کند که امکان جابجایی بلادرنگ میان سه افق کاربری را بدون خروج از حساب کاربری یا از دست رفتن اطلاعات ورودی فرم‌ها مهیا می‌سازد:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li><strong>سطح ۱ - پرسنل و کادر (Employee):</strong> دسترسی به کارنامه‌های فردی، حقوق، مرخصی و میز خدمت.</li>
          <li><strong>سطح ۲ - ارزیاب شایستگی (Evaluator):</strong> دسترسی به شناسنامه مشاغل، ثبت نمرات میدانی و کارتابل گزینش.</li>
          <li><strong>سطح ۳ - فرماندهی و مدیر یگان (Manager):</strong> دسترسی به مرکز مانیتورینگ ۳۶۰ درجه، DSS انتقالات و GIS.</li>
        </ul>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. ارکان شش‌گانه هدر سراسری (Master Global Header)</h3>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
          <div>• <strong>نشان رسمی و آرم مصوب فراجا:</strong> همراه با عنوان یکپارچه سامانه معیار و شماره نسخه ۳.۲.۰.</div>
          <div>• <strong>گاه‌شمار شمسی و ساعت عملیاتی:</strong> هماهنگ با سرور مرکزی ستاد کل نیروهای مسلح.</div>
          <div>• <strong>جستجوگر هوشمند سراسری:</strong> فراخوانی آنی پرسنل بر اساس کد پرسنلی، کد ملی یا عنوان آیین‌نامه‌ها.</div>
          <div>• <strong>استوری‌های افتخارات گشت (Patrol Stories):</strong> بازتاب چندرسانه‌ای کشفیات شاخص روزانه و رزمایش‌ها.</div>
          <div>• <strong>هاب شایستگی اشرف (Ashraf Competency Hub):</strong> وضعیت نشان‌های پرسنل، مدال‌ها و رتبه‌بندی عمومی.</div>
          <div>• <strong>دکمه خروجی جامع سند (PDF/HTML):</strong> چاپ فوری و دانلود سند تفصیلی ۲۴ صفحه‌ای در تمامی لحظات.</div>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۲: معماری کلان، هویت بصری، ارگونومی نظامی و ساختار ناوبری
#### ۱. فلسفه پالت رنگی و ارگونومی:
- **سبز تیره انتظامی (\`#081d11\`):** نماد اقتدار، هویت و انضباط سازمانی پلیس.
- **سرمه‌ای ستادی (\`#0f172a\`):** تمرکز ذهنی بالا و کاهش خستگی چشم در شیفت‌های شبانه‌روزی مانیتورینگ.
- **طلایی کهربایی (\`#f59e0b\`):** بازتاب نشان‌ها، سردوشی‌ها، درجات و رتبه‌های عالی هاب شایستگی اشرف.

#### ۲. ساختار ۳ سطحی نقش‌ها (Persistent Tabs):
- **سطح پرسنل:** شفاف‌سازی کارنامه، حقوق، مرخصی و میز خدمات رفاهی.
- **سطح ارزیاب شایستگی:** بانک مشاغل، ماتریس ۵×۴، ثبت ارزیابی میدانی و کارتابل گزینش.
- **سطح فرماندهی:** داشبورد ۳۶۰ درجه، رتبه‌بندی کلانتری‌ها، سامانه DSS انتقالات و نقشه آمایش GIS.

#### ۳. ارکان هدر سراسری سامانه:
گاه‌شمار شمسی، ساعت هماهنگ، نوار جستجوی هوشمند، استوری‌های افتخارات گشت، هاب شایستگی اشرف و ابزار چاپ ۲۴ صفحه‌ای سند.`
  },

  // PAGE 3
  {
    pageNumber: 3,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'صفحه اصلی پرسنل (Home) و کارت شناسایی پاسداری',
    pageSubtitle: 'راهنمای میز کار فردی، شناسنامه هویتی، استوری‌های افتخارات و هاب شایستگی اشرف',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. معماری میز کار پرسنل (مسیر /home)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          صفحه اصلی پرسنل به عنوان «پایگاه داده هویتی و عملیاتی مأمور» عمل می‌کند. در این صفحه، هر مأمور انتظامی به محض ورود، تصویری شفاف، آنی و بدون واسطه از وضعیت شغلی، شایستگی، افتخارات و حقوق خود دریافت می‌نماید.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. شناسنامه و کارت هویتی پاسداری (Guard ID Card)</h3>
        <div class="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white border border-emerald-700 space-y-2 text-xs">
          <div class="flex items-center justify-between border-b border-emerald-800/60 pb-2">
            <span class="font-bold text-amber-300">کارت پاسداری هوشمند فراجا</span>
            <span class="font-mono text-[11px] text-slate-300">کد پرسنلی: ۹۸۴۵۱۲۰۳</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <div>نام: <strong class="text-white">سرگرد علی‌اصغر رضایی</strong></div>
            <div>درجه: <strong class="text-white">سرگرد انتظامی</strong></div>
            <div>یگان: <strong class="text-white">فاتب - کلانتری ۱۰۳ گاندی</strong></div>
            <div>رسته: <strong class="text-white">انتظامی و تجسس</strong></div>
            <div>سابقه: <strong class="text-white">۱۴ سال خدمت رسمی</strong></div>
            <div>وضعیت: <strong class="text-emerald-400">حاضر به خدمت / کشیک الف</strong></div>
            <div>رتبه عملکرد: <strong class="text-amber-300">الف (نخبه عملیاتی)</strong></div>
            <div>امتیاز فصلی: <strong class="text-white">۹۱.۵ از ۱۰۰</strong></div>
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. استوری‌های افتخارات گشت (Patrol Stories)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          نوار تعاملی استوری‌ها در بالای صفحه اصلی، دستاوردهای میدانی گشت‌های ۱۱۰، کشفیات سلاح و مواد مخدر، دستگیری سارقان خشن و تقدیرنامه‌های یگانی ۲۴ ساعت گذشته را به صورت تصویری به نمایش می‌گذارد. این فیچر روحیه همبستگی و افتخار سازمانی را تقویت می‌کند.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۴. هاب شایستگی اشرف فراجا (Ashraf Competency Hub)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          نماد افتخار و شایستگی افسران که بر اساس سه سنجه محاسبه می‌شود:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li><strong>مدال‌های مأموریتی:</strong> نشان شجاعت در صحنه درگیری، نشان تیرانداز برتر، نشان ایثار و امداد به شهروندان.</li>
          <li><strong>ضریب رضایت مردمی در ۱۹۷:</strong> ثبت تشویق‌های شهروندان از برخورد محترمانه مأمور در مأموریت‌های گشت.</li>
          <li><strong>سوابق صیانت و حفاظت:</strong> ضریب سلامت اخلاقی، حفظ اسرار اداری و سابقه پاک انضباطی.</li>
        </ul>
      </div>
    `,
    markdownContent: `### صفحه ۳: صفحه اصلی پرسنل (Home) و کارت شناسایی پاسداری
#### ۱. میز کار فردی مأمور (/home):
درگاه جامع یکپارچه جهت دریافت اطلاعات شناسنامه‌ای، احکام حقوقی و سوابق عملیاتی.

#### ۲. کارت هویتی پاسداری (Guard ID Card):
نمایش کد پرسنلی، درجه نظامی، یگان خدمتی، رسته، سنوات خدمت، رتبه فصلی و وضعیت استقرار شیفت.

#### ۳. استوری‌های افتخارات گشت (Patrol Stories):
انعکاس چندرسانه‌ای اقدامات شجاعانه گشت‌های ۱۱۰، تقدیرنامه‌های فرماندهی کل و کشفیات شاخص روزانه.

#### ۴. هاب شایستگی اشرف:
نشان‌های مهارت تیراندازی، لوح تقدیر سامانه ۱۹۷، سابقه انضباطی پاک و امتیازات اخلاق حرفه‌ای مأمور.`
  },

  // PAGE 4
  {
    pageNumber: 4,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'کارنامه عملکرد فصلی، شاخص‌های ارزیابی و تحلیل روندهای تاریخی',
    pageSubtitle: 'محاسبه نمره کل کارنامه، شاخص‌های چهارگانه عملیاتی و جدول مقایسه فصول',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. ساختار کارنامه عملکرد فصلی (مسیر /performance)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          کارنامه عملکرد فصلی در سامانه معیار، حاصل تجمیع داده‌های میدانی، گزارش‌های روزانه گشت، بازرسی‌های محسوس و نامحسوس و بازخورد مافوق مستقیم است. نمره نهایی از ۱۰۰ محاسبه شده و به ۴ محور اصلی تفکیک می‌گردد:
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr class="bg-slate-100 text-slate-900 font-bold">
                <th class="p-2 border border-slate-300">محور عملکردی</th>
                <th class="p-2 border border-slate-300">وزن در نمره</th>
                <th class="p-2 border border-slate-300">سنجه‌های اندازه‌گیری ملموس</th>
                <th class="p-2 border border-slate-300">حد استاندارد</th>
              </tr>
            </thead>
            <tbody class="text-slate-700">
              <tr>
                <td class="p-2 border border-slate-300 font-bold">۱. کشف و مقابله با جرم</td>
                <td class="p-2 border border-slate-300 font-bold text-emerald-800">۳۵٪</td>
                <td class="p-2 border border-slate-300">تعداد کشفیات، دستگیری سارقین در صحنه، مهار سرقت‌های به عنف، اجرای احکام قضایی</td>
                <td class="p-2 border border-slate-300">حداقل ۸ فقره در ماه</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">۲. سرعت عمل فوریت‌های ۱۱۰</td>
                <td class="p-2 border border-slate-300 font-bold text-emerald-800">۲۵٪</td>
                <td class="p-2 border border-slate-300">زمان حضور در محل از لحظه ابلاغ پیام، مهار بحران، ثبت دقیق صورتجلسه اولیه</td>
                <td class="p-2 border border-slate-300">زیر ۹ دقیقه در کلان‌شهرها</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">۳. تکریم ارباب‌رجوع و سامانه ۱۹۷</td>
                <td class="p-2 border border-slate-300 font-bold text-emerald-800">۲۰٪</td>
                <td class="p-2 border border-slate-300">عدم گزارش تخلف در بازرسی ۱۹۷، ثبت پیام‌های رضایت مردمی، سعه صدر در درگیری</td>
                <td class="p-2 border border-slate-300">نمره رضایت بالای ۸۵٪</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">۴. انضباط ظاهری و آمادگی نظامی</td>
                <td class="p-2 border border-slate-300 font-bold text-emerald-800">۲۰٪</td>
                <td class="p-2 border border-slate-300">حضور به‌موقع در صبحگاه، وضعیت آراستگی یونیفرم و تجهیزات، نگهداری خودرو و سلاح سازمانی</td>
                <td class="p-2 border border-slate-300">بدون کسری انضباطی</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. تحلیل تاریخی و مقایسه روند ۴ فصل</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          نمودار روند تاریخی به مأمور اجازه می‌دهد رشد عملکرد خود را در بهار، تابستان، پاییز و زمستان مشاهده نموده و عوامل افت یا صعود امتیاز خود را در جلسات فصلی بررسی نماید. ارتقاء نمره بیش از ۵ نمره نسبت به فصل قبل مشمول «پاداش بهبود مستمر» در فیش حقوقی می‌گردد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۴: کارنامه عملکرد فصلی، شاخص‌های ارزیابی و تحلیل روندهای تاریخی
#### ۱. محورهای چهارگانه کارنامه عملکرد فصلی:
- **کشف و مهار جرم (وزن ۳۵٪):** نرخ کشف، اجرای احکام جلب، دستگیری سارقان و کنترل حوزه استحفاظی.
- **سرعت عمل ۱۱۰ (وزن ۲۵٪):** زمان حضور در محل، میانگین زمان زیر ۹ دقیقه و مدیریت صحنه حادثه.
- **تکریم شهروندان و سامانه ۱۹۷ (وزن ۲۰٪):** نسبت تقدیر به شکایات مردمی و سعه صدر در مأموریت‌ها.
- **انضباط و آمادگی نظامی (وزن ۲۰٪):** وضعیت تجهیزات، نگهداری سلاح، حضور به‌موقع و آراستگی ظاهری.

#### ۲. جدول مقایسه فصول و روند تاریخی:
بررسی فصول بهار، تابستان، پاییز و زمستان و اعطای پاداش تشویقی برای مأمورانی که روند صعودی مستمر دارند.`
  },

  // PAGE 5
  {
    pageNumber: 5,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'نقاط قوت برجسته، خوداظهاری و تقاضای آموزش‌های جبرانی',
    pageSubtitle: 'سازوکار دیالوگ سازنده میان پرسنل و فرمانده و جبران ضعف‌های مهارتی',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. ثبت رسمی نقاط قوت برجسته (/performance/strengths)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          در سامانه معیار، ثبت تشویق‌ها و نقاط قوت دیگر صرفاً به صورت شفاهی یا لوح کاغذی نیست. هر فرمانده کلانتری یا سرپرست دایره تجسس می‌تواند اقدامات شاخص مأمور را به عنوان «نقطه قوت تثبیت‌شده» در پرونده الکترونیک ثبت کند. این نقاط قوت در ماتریس جانشین‌پروری و امتیاز ترفیع درجه وزن مثبت دارند.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. سازوکار نقاط نیازمند بهبود و فضای خوداظهاری (/performance/improvements)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          بر خلاف سیستم‌های سنتی تنبیهی، در سامانه معیار «نقطه نیازمند بهبود» به عنوان یک فرصت آموزشی تلقی می‌شود. در صورتی که مأمور در حوزه‌ای (مثلاً کار با سامانه‌های دیجیتال ثبت واقعه یا فنون دفاع شخصی) نمره پایینی دریافت کند:
        </p>
        <ol class="list-decimal list-inside space-y-1.5 text-xs text-slate-700">
          <li><strong>ثبت بازخورد تحلیلی فرمانده:</strong> شرح دقیق رفتاری که نیاز به اصلاح دارد.</li>
          <li><strong>فرم خوداظهاری پرسنل:</strong> مأمور می‌تواند ادله، موانع عملیاتی (مانند خرابی تجهیزات یا کمبود نیرو) را ثبت کند.</li>
          <li><strong>توافق اهداف فصلی:</strong> توافق دوطرفه روی حداقل ۲ هدف بهبود برای سه ماهه آینده.</li>
        </ol>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. سامانه هوشمند تقاضای دوره‌های آموزش جبرانی</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          با کلیک بر روی دکمه «درخواست آموزش جبرانی»، سامانه به طور خودکار دوره‌های مرتبط دانشگاه افسری امین یا مراکز آموزش استانی (مانند دوره مدیریت خشم در صحنه، قوانین ضابطیت قضایی، شبیه‌ساز رانندگی تدافعی) را به مأمور پیشنهاد داده و پس از تایید فرمانده، سهمیه آموزشی صادر می‌گردد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۵: نقاط قوت برجسته، خوداظهاری و تقاضای آموزش‌های جبرانی
#### ۱. ثبت نقاط قوت برجسته (/performance/strengths):
ثبت سیستمی رفتارهای برجسته و تشویق‌های فرمانده با اثر مستقیم در ارشدیت و نشان‌های شایستگی.

#### ۲. فضای خوداظهاری و نقاط بهبود (/performance/improvements):
دیالوگ دوسویه مأمور و مافوق؛ بیان ادله و موانع میدانی و تعیین اهداف رشد برای فصل آتی به جای تنبیه اداری.

#### ۳. اتصال به سامانه آموزش‌های جبرانی فراجا:
ارائه بسته‌های آموزشی تخصصی (تیراندازی فاتح، حقوق شهروندی، مهار خشم، رانندگی عملیاتی) متناسب با نقاط ضعف شناسایی‌شده.`
  },

  // PAGE 6
  {
    pageNumber: 6,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'گانت‌چارت مسیر شغلی و پیش‌نیازهای ترفیع درجه',
    pageSubtitle: 'نقشه راه ارتقاء از ستوان سومی تا سرتیپی و ماتریس سنوات توقف قانونی',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. معماری گانت‌چارت رشد شغلی (/performance/career-path)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          هر کادر فراجا نیازمند چشم‌اندازی روشن از آینده خدمتی خود است. گانت‌چارت مسیر شغلی، مسیر تصدی رده‌های بالاتر را بر روی یک خط زمان‌بندی تعاملی به نمایش درمی‌آورد و پیش‌نیازهای دقیق ترفیع درجه بعدی را برمی‌شمارد.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. جدول سنوات توقف قانونی و پیش‌نیازهای ترفیع درجات افسران</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr class="bg-slate-100 text-slate-900 font-bold">
                <th class="p-2 border border-slate-300">درجه مبدا</th>
                <th class="p-2 border border-slate-300">درجه مقصد</th>
                <th class="p-2 border border-slate-300">سنوات توقف</th>
                <th class="p-2 border border-slate-300">دوره‌های آموزشی اجباری</th>
                <th class="p-2 border border-slate-300">حدنصاب کارنامه</th>
              </tr>
            </thead>
            <tbody class="text-slate-700">
              <tr>
                <td class="p-2 border border-slate-300">ستوان سوم</td>
                <td class="p-2 border border-slate-300 font-bold">ستوان دوم</td>
                <td class="p-2 border border-slate-300">۳ سال</td>
                <td class="p-2 border border-slate-300">دوره تکمیلی عمومی، آزمون آمادگی جسمانی</td>
                <td class="p-2 border border-slate-300">حداقل ۷۵</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300">ستوان دوم</td>
                <td class="p-2 border border-slate-300 font-bold">ستوان یکم</td>
                <td class="p-2 border border-slate-300">۳ سال</td>
                <td class="p-2 border border-slate-300">دوره تخصصی رسته، تیراندازی نمره ب</td>
                <td class="p-2 border border-slate-300">حداقل ۷۸</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300">ستوان یکم</td>
                <td class="p-2 border border-slate-300 font-bold">سروان</td>
                <td class="p-2 border border-slate-300">۴ سال</td>
                <td class="p-2 border border-slate-300">دوره سرپرستی کلانتری و پاسگاه، بصیرت</td>
                <td class="p-2 border border-slate-300">حداقل ۸۰</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300">سروان</td>
                <td class="p-2 border border-slate-300 font-bold">سرگرد</td>
                <td class="p-2 border border-slate-300">۴ سال</td>
                <td class="p-2 border border-slate-300">دوره عالی رسته، فرماندهی میانی، آزمون جامع</td>
                <td class="p-2 border border-slate-300">حداقل ۸۲</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300">سرگرد</td>
                <td class="p-2 border border-slate-300 font-bold">سرهنگ دوم</td>
                <td class="p-2 border border-slate-300">۴ سال</td>
                <td class="p-2 border border-slate-300">دوره دافوس (دانشگاه فرماندهی و ستاد)</td>
                <td class="p-2 border border-slate-300">حداقل ۸۵</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300">سرهنگ دوم</td>
                <td class="p-2 border border-slate-300 font-bold">سرهنگ تمام</td>
                <td class="p-2 border border-slate-300">۳ سال</td>
                <td class="p-2 border border-slate-300">طرح پژوهشی کاربردی فراجا، مصاحبه عالی کمیسیون</td>
                <td class="p-2 border border-slate-300">حداقل ۸۸</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۶: گانت‌چارت مسیر شغلی و پیش‌نیازهای ترفیع درجه
#### ۱. گانت‌چارت زمان‌بندی ارتقاء (/performance/career-path):
ترسیم بصری مسیر حرفه‌ای از ستوان سومی تا درجات ارشد سرهنگی و سرتیپی.

#### ۲. جدول سنوات و الزامات ترفیع درجه:
- **ستوان سوم به دوم:** ۳ سال توقف + دوره تکمیلی + نمره ۷۵.
- **ستوان دوم به یکم:** ۳ سال توقف + دوره رسته + نمره ۷۸.
- **ستوان یکم به سروانی:** ۴ سال توقف + دوره سرپرستی کلانتری + نمره ۸۰.
- **سروانی به سرگردی:** ۴ سال توقف + دوره عالی رسته + نمره ۸۲.
- **سرگردی به سرهنگ دومی:** ۴ سال توقف + قبولی دافوس + نمره ۸۵.
- **سرهنگ دومی به تمام:** ۳ سال توقف + پایان‌نامه کاربردی انتظامی + نمره ۸۸.`
  },

  // PAGE 7
  {
    pageNumber: 7,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'کارنامه رادار شایستگی ۵‌بعدی پرسنل فراجا',
    pageSubtitle: 'تبیین ابعاد پنج‌گانه شایستگی، نحوه محاسبه امتیازات و نمودار عنکبوتی',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. پنج بعد بنیادین شایستگی در فراجا (/employee/competency-matrix)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          بر خلاف کارنامه عملکرد که نتایج فصلی را می‌سنجد، رادار شایستگی توانمندی‌های ریشه‌ای، دانشی و روان‌شناختی مأمور را در ۵ بعد مستقل تحلیل می‌نماید:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۱. مهارت تاکتیکی و تیراندازی</span>
            <p class="text-slate-600 text-[11px]">مهارت کار با سلاح سازمانی (کلاشینکف، کلت زعاف)، امتیازات میدان تیر، شبیه‌ساز فاتح، سرعت عمل در مسلح‌سازی و استقرار در موضع دفاعی.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۲. مدیریت صحنه و کنترل بحران</span>
            <p class="text-slate-600 text-[11px]">مهارت تصمیم‌گیری سریع در صحنه‌های نزاع دسته‌جمعی، تصادفات زنجیره‌ای، سرقت مسلحانه و آرام‌سازی تجمعات با حداقل استفاده از قوه قاهره.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۳. اشراف حقوقی و ضابطیت قضایی</span>
            <p class="text-slate-600 text-[11px]">تسلط بر آیین دادرسی کیفری، حقوق متهم در حین بازداشت، نحوه صحیح تنظیم صورتجلسه و عدم ابطال پرونده در مراجع قضایی.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۴. سعه صدر و تکریم ارباب‌رجوع</span>
            <p class="text-slate-600 text-[11px]">کنترل هیجان و خشم در مقابل پرخاشگری افراد، رعایت اخلاق اسلامی، همدلی با مالباختگان و شاکیان و انعکاس مثبت در ۱۹۷.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-1 md:col-span-2 space-y-1">
            <span class="font-bold text-slate-900">۵. انضباط نظامی و حفاظت اطلاعات</span>
            <p class="text-slate-600 text-[11px]">رازداری اطلاعات عملیاتی، عدم افشای هویت همکاران در فضای مجازی، رعایت سلسله‌مراتب فرماندهی و صیانت سازمانی.</p>
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. مقایسه تطبیقی با میانگین رسته در استان</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          نمودار رادار به صورت خودکار نمره فرد را در کنار خط‌چین میانگین استان و استاندارد مصوب شغل قرار می‌دهد. به عنوان مثال، اگر میانگین تیراندازی استان ۷۲ باشد و نمره فرد ۸۹، نقطه قوت استراتژیک در رادار ثبت می‌گردد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۷: کارنامه رادار شایستگی ۵‌بعدی پرسنل فراجا
#### ۱. ابعاد پنج‌گانه رادار شایستگی (/employee/competency-matrix):
۱. **مهارت تاکتیکی و تیراندازی:** تیراندازی عملیاتی، واکنش سریع و شبیه‌ساز فاتح.
۲. **مدیریت صحنه و کنترل بحران:** خونسردی، تصمیم‌گیری در شرایط ابهام و مهار درگیری‌ها.
۳. **اشراف حقوقی و ضابطیت:** آیین دادرسی، تنظیم صورتجلسه قضایی و حقوق شهروندی.
۴. **سعه صدر و تکریم ارباب‌رجوع:** اخلاق حرفه‌ای، مهار خشم و بازخورد در سامانه ۱۹۷.
۵. **انضباط نظامی و حفاظت:** رازداری، صیانت، امنیت اطلاعات و اطاعت‌پذیری سازمانی.

#### ۲. مقایسه با میانگین استانی و شغلی:
نمایش فاصله شایستگی فرد از میانگین هم‌رده‌ها در استان جهت اولویت‌دهی به برنامه‌های ارتقاء.`
  },

  // PAGE 8
  {
    pageNumber: 8,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'فیش حقوقی الکترونیک، شفافیت پاداش و گواهی کسر از حقوق اداری',
    pageSubtitle: 'اقلام حکمی، حق رزم و شیفت، اتصال عملکرد و صدور آنی ضمانت‌نامه بانکی',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. ساختار فیش حقوقی الکترونیک (/salary)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          فیش حقوقی ماهانه در سامانه معیار به گونه‌ای طراحی شده که هر ریال پرداختی یا کسری به طور شفاف برای مأمور قابل پیگیری باشد. اجزای فیش به سه ستون تفکیک می‌شود:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۱. اقلام حکمی و ثابت</span>
            <ul class="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
              <li>حقوق پایه درجه</li>
              <li>فوق‌العاده شغل و مدیریت</li>
              <li>حق سنوات خدمت</li>
              <li>حق عائله‌مندی و اولاد</li>
            </ul>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span class="font-bold text-emerald-950">۲. مزایای متغیر و عملیاتی</span>
            <ul class="list-disc list-inside text-[11px] text-emerald-800 space-y-0.5">
              <li>فوق‌العاده حق رزم و پاسداری</li>
              <li>فوق‌العاده سختی معیشت و بدی آب‌وهوا</li>
              <li>فوق‌العاده شیفت و کشیک شبانه</li>
              <li><strong>پاداش کارایی متصل به عملکرد</strong></li>
            </ul>
          </div>
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <span class="font-bold text-rose-950">۳. کسورات قانونی و رفاهی</span>
            <ul class="list-disc list-inside text-[11px] text-rose-800 space-y-0.5">
              <li>بیمه خدمات درمانی ساحد</li>
              <li>صندوق بازنشستگی نیروهای مسلح</li>
              <li>صندوق مسکن حبیب فراجا</li>
              <li>اقساط وام‌های حکمت و سازمان</li>
            </ul>
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. صدور آنی گواهی کسر از حقوق آنلاین (/service-desk/salary-deduction)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          پرسنل برای دریافت وام‌های بانکی دیگر نیازی به مراجعه حضوری به کارگزینی ندارند. مأمور با ورود به صفحه میز خدمت، نام بانک مقصد، مبلغ وام و اقساط را وارد کرده و سامانه بلافاصله گواهی رسمی کسر از حقوق را با امضای دیجیتال و بارکد دو‌بعدی (QR Code) صادر می‌نماید.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۸: فیش حقوقی الکترونیک، شفافیت پاداش و گواهی کسر از حقوق اداری
#### ۱. اقلام فیش حقوقی الکترونیک (/salary):
- **اقلام حکمی:** حقوق درجه، حق سنوات، فوق‌العاده شغل و عائله‌مندی.
- **مزایای عملیاتی:** حق رزم، سختی منطقه، حق کشیک شیفت و پاداش عملکرد فصلی.
- **کسورات:** بیمه ساحد، صندوق بازنشستگی، پس‌انداز مسکن حبیب و اقساط رفاهی حکمت.

#### ۲. صدور آنی گواهی کسر از حقوق (/service-desk/salary-deduction):
صدور غیرحضوری ضمانت‌نامه بانکی با شناسه رهگیری دیجیتال و بارکد دو‌بعدی استعلام معتبر.`
  },

  // PAGE 9
  {
    pageNumber: 9,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'تقویم حضور و غیاب، الگوهای شیفت و درخواست مرخصی الکترونیک',
    pageSubtitle: 'شیفت‌های ۲۴-۴۸ و ۱۲-۲۴، استحقاقی و استعلاجی با بارگذاری گواهی بهداری',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. تقویم شیفت و الگوهای پاسداری در فراجا (/attendance/leave)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          تقویم حضور و غیاب سامانه معیار به گونه‌ای برنامه‌ریزی شده که الگوهای متغیر خدمتی نیروهای مسلح را پشتیبانی کند:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li><strong>الگوی پاسگاهی و مرزبانی:</strong> ۲۴ ساعت خدمت - ۴۸ ساعت استراحت، یا ۱۵ روز مأموریت - ۱۵ روز مرخصی پیوسته.</li>
          <li><strong>الگوی گشت ۱۱۰ و راهور:</strong> شیفت‌های چرخشی ۱۲ ساعته (روز/شب) با استراحت‌های ۲۴ ساعته متناظر.</li>
          <li><strong>الگوی ستادی و اداری:</strong> ساعات اداری از ۶:۳۰ الی ۱۴:۳۰ همراه با آماده‌باش‌های مناسبتی تقویمی.</li>
        </ul>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. گردش کار مرخصی الکترونیک و تاییدیه مافوق</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          مأمور از طریق گوشی هوشمند سازمانی یا دسکپوت یگان، تاریخ شروع، مدت و نوع مرخصی (استحقاقی، تشویقی، استعلاجی، یا اضطراری) را انتخاب می‌کند. در صورت مرخصی استعلاجی، امکان تصویربرداری و پیوست آنلاین نسخه پزشک بهداری یگان وجود دارد. درخواست بلافاصله به کارتابل رئیس کلانتری ارسال و نتیجه از طریق اعلان به مأمور اطلاع داده می‌شود.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۹: تقویم حضور و غیاب، الگوهای شیفت و درخواست مرخصی الکترونیک
#### ۱. تقویم الگوهای شیفت (/attendance/leave):
پوشش شیفت‌های ۲۴-۴۸ در پاسگاه‌ها، ۱۲-۲۴ در گشت‌های ۱۱۰ و ساعات ستادی با ثبت برخط تردد.

#### ۲. فرآیند مرخصی الکترونیک:
درخواست استحقاقی/استعلاجی، پیوست آنلاین گواهی بهداری، ارسال به کارتابل فرمانده و ثبت خودکار در کارت پاسداری.`
  },

  // PAGE 10
  {
    pageNumber: 10,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'پورتال خدمات رفاهی حکمت، سلامت و طب کار، و میز خدمت مسکن',
    pageSubtitle: 'رزرو هتل‌ها، سهمیه سفر، پرونده سلامت روان و فرم شفاف تقاضای مسکن',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. خدمات رفاهی و گردشگری حکمت فراجا</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          اتصال برخط به شرکت حکمت صبا: مشاهده مانده اعتبار کارت حکمت، یارانه اتکا، رزرو آنلاین مجتمع‌های اقامتی فراجا در مشهد مقدس، خزرآباد ساری، شیراز و کیش بر اساس سهمیه سالیانه و اولویت سنوات خدمت.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. پرونده سلامت و پایش طب کار</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          سلامت جسمی و روانی کادر فراجا ضامن موفقیت در مأموریت‌هاست. در این بخش، نتایج معاینات دوره‌ای سالانه بهداری ثبت می‌شود:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li><strong>پایش روانی و کنترل استرس:</strong> آزمون‌های روان‌سنجی بهداری جهت تایید صلاحیت حمل سلاح.</li>
          <li><strong>آمادگی جسمانی و BMI:</strong> رکورد دو ۳۲۰۰ متر، درازنشست، بارفیکس و شنای سوئدی.</li>
          <li><strong>سوابق درمانی و واکسیناسیون:</strong> پرونده پزشکی تخصصی بهداری فراجا.</li>
        </ul>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. میز خدمت تقاضای مسکن سازمانی (/service-desk/organizational-house)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          پرسنل فاقد مسکن می‌توانند تقاضای خود را ثبت کنند. فرم به طور خودکار امتیاز شفاف متقاضی را با استناد به ۶ متغیر رسمی محاسبه نموده و رتبه دقیق فرد را در صف نوبت شهر محل خدمت نمایش می‌دهد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۱۰: پورتال خدمات رفاهی حکمت، سلامت و طب کار، و میز خدمت مسکن
#### ۱. خدمات حکمت و رفاهی:
رزرو آنلاین اماکن زیارتی/سیاحتی، اعتبار کارت حکمت و سهمیه دوره‌ای پرسنل و خانواده‌ها.

#### ۲. پرونده طب کار و سلامت:
پایش شاخص‌های جسمانی، آزمون روان‌سنجی سلامت روان، آمادگی جسمانی و صلاحیت حمل سلاح سازمانی.

#### ۳. میز خدمت مسکن سازمانی (/service-desk/organizational-house):
ثبت تقاضای مسکن و محاسبه لحظه‌ای امتیاز در صف نوبت‌بندی بدون دخالت دست.`
  },

  // PAGE 11
  {
    pageNumber: 11,
    messageNumber: 2,
    chapterId: 'employee',
    chapterTitle: 'فصل دوم: راهنمای تفصیلی ۱۲ خدمت سطح پرسنل و کادر',
    pageTitle: 'میز متقاضی انتقالات فراجا (ثبت درخواست، مدارک و رهگیری)',
    pageSubtitle: 'انتخاب مقاصد سه‌گانه، بارگذاری مدارک تکفل و درمان، و پیگیری گردش کار',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. ساختار میز متقاضی انتقالات فراجا (/transfers)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          میز متقاضی انتقال، بستری عادلانه برای ثبت جابجایی‌های درون‌استانی و بین‌استانی است. هر متقاضی می‌تواند تا ۳ اولویت استانی و یگانی را مشخص نموده و دلایل موجه خود را اعلام نماید.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. بارگذاری اسناد و مدارک قانونی تکفل و درمان</h3>
        <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-700">
          <li><strong>مدارک تکفل والدین:</strong> حکم قضایی تکفل، فوت سرپرست، یا گواهی سکونت والدین کهنسال در استان مقصد.</li>
          <li><strong>پرونده‌های پزشکی خاص:</strong> مدارک بیماری حاد همسر یا فرزند که نیازمند درمان تخصصی در بیمارستان‌های مراکز استان‌هاست.</li>
          <li><strong>اشتغال همسر:</strong> مدارک اشتغال رسمی همسر در سازمان‌های دولتی استان مقصد جهت اتحاد خانواده.</li>
        </ul>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. نمودار رهگیری پنج‌مرحله‌ای وضعیت تقاضا</h3>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-700">
          <div>۱. <strong>ثبت و تایید یگان مبدا:</strong> بررسی عدم افت کشیک‌های کلانتری یا پاسگاه مبدا.</div>
          <div>۲. <strong>اعتبارسنجی ارزیاب و بهداری:</strong> راستی‌آزمایی مدارک پزشکی و محاسبه شاخص فرسودگی EWS.</div>
          <div>۳. <strong>موافزقت یگان مقصد:</strong> بررسی ظرفیت چارت سازمانی رسته مربوطه در استان مقصد.</div>
          <div>۴. <strong>تطابق در موتور DSS فرماندهی:</strong> جایابی جفتی و متناظر یا تایید سهمیه جابجایی.</div>
          <div>۵. <strong>صدور امریه ستاد کل فراجا:</strong> صدور حکم انتقالی نهایی با مهلت ۳۰ روزه اسکان.</div>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۱۱: میز متقاضی انتقالات فراجا (ثبت درخواست، مدارک و رهگیری)
#### ۱. میز متقاضی انتقال (/transfers):
ثبت تقاضای جابجایی با انتخاب ۳ اولویت استان و یگان مقصد بر اساس سال‌های ماندگاری در منطقه.

#### ۲. بارگذاری اسناد و مدارک:
پیوست مدارک تکفل والدین، اشتغال رسمی همسر یا پرونده‌های بیماری‌های خاص بهداری.

#### ۳. نمودار رهگیری ۵ مرحله‌ای وضعیت:
از ثبت اولیه تا تایید یگان مبدا، غربالگری ارزیاب، شبیه‌سازی DSS و صدور امریه نهایی ستادی.`
  },

  // PAGE 12
  {
    pageNumber: 12,
    messageNumber: 3,
    chapterId: 'employee',
    chapterTitle: 'فصل سوم: آیین‌نامه پاداش عملکرد و فرمول مسکن',
    pageTitle: 'آیین‌نامه رسمی مصوب اتصال عملکرد فصلی به پاداش فیش حقوقی',
    pageSubtitle: 'مواد قانونی، ضرایب درجات، ضرایب رسته‌های عملیاتی و فرمول دقیق پاداش کارایی',
    contentHtml: `
      <div class="space-y-4">
        <div class="p-3 rounded-xl bg-emerald-950 text-emerald-300 font-mono text-xs border border-emerald-800">
          فرمول رسمی مصوب پاداش کارایی فصلی:
          <br>
          <strong class="text-white text-sm">پاداش کارایی = (نمره کارنامه فصلی از ۱۰۰ - ۷۰) × ضریب پایه درجه × ضریب رسته عملیاتی</strong>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. مواد قانونی آیین‌نامه مصوب ستاد کل</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          <strong>ماده ۱:</strong> نمره کف جهت استحقاق دریافت پاداش کارایی عدد ۷۰ می‌باشد. پرسنلی که نمره کمتر از ۷۰ اخذ نمایند، مشمول پاداش نخواهند شد و باید در دوره‌های آموزش جبرانی شرکت کنند.
          <br>
          <strong>ماده ۲:</strong> مازاد نمره از ۷۰ به عنوان «مازاد کارایی» مستقیماً در ضرایب مالی ضرب می‌گردد.
          <br>
          <strong>ماده ۳:</strong> برای نمرات بالای ۹۰، علاوه بر پاداش مالی، امتیاز ارشدیت تشویقی (۳ تا ۶ ماه) در سوابق ترفیع درجه منظور می‌شود.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. جدول ضرایب پایه درجات و ضرایب رسته‌های عملیاتی</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead><tr class="bg-slate-100 font-bold"><th class="p-1.5 border border-slate-300">درجه نظامی</th><th class="p-1.5 border border-slate-300">ضریب پایه (ریال)</th></tr></thead>
              <tbody class="text-slate-700">
                <tr><td class="p-1.5 border">گروهبان و استوار</td><td class="p-1.5 border font-bold">۱۵۰,۰۰۰ ریال</td></tr>
                <tr><td class="p-1.5 border">ستوان سوم و دوم</td><td class="p-1.5 border font-bold">۲۰۰,۰۰۰ ریال</td></tr>
                <tr><td class="p-1.5 border">ستوان یکم و سروان</td><td class="p-1.5 border font-bold">۲۶۰,۰۰۰ ریال</td></tr>
                <tr><td class="p-1.5 border">سرگرد و سرهنگ دوم</td><td class="p-1.5 border font-bold">۳۴۰,۰۰۰ ریال</td></tr>
                <tr><td class="p-1.5 border">سرهنگ تمام و سرتیپ</td><td class="p-1.5 border font-bold">۴۲۰,۰۰۰ ریال</td></tr>
              </tbody>
            </table>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-300">
              <thead><tr class="bg-slate-100 font-bold"><th class="p-1.5 border border-slate-300">رسته عملیاتی</th><th class="p-1.5 border border-slate-300">ضریب رسته</th></tr></thead>
              <tbody class="text-slate-700">
                <tr><td class="p-1.5 border">مرزبانی و دریابانی</td><td class="p-1.5 border font-bold text-emerald-800">۱.۴۰ (حداکثر)</td></tr>
                <tr><td class="p-1.5 border">یگان ویژه و نوپو</td><td class="p-1.5 border font-bold text-emerald-800">۱.۳۵</td></tr>
                <tr><td class="p-1.5 border">پلیس آگاهی و مبارزه با مواد مخدر</td><td class="p-1.5 border font-bold text-emerald-800">۱.۳۰</td></tr>
                <tr><td class="p-1.5 border">کلانتری، پاسگاه و راهور</td><td class="p-1.5 border font-bold text-emerald-800">۱.۲۰</td></tr>
                <tr><td class="p-1.5 border">رسته‌های پشتیبانی و ستادی</td><td class="p-1.5 border font-bold text-slate-600">۱.۰۰</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۱۲: آیین‌نامه رسمی مصوب اتصال عملکرد فصلی به پاداش فیش حقوقی
#### ۱. فرمول مصوب پاداش کارایی:
\`پاداش کارایی = (نمره کارنامه فصلی از ۱۰۰ - ۷۰) × ضریب پایه درجه × ضریب رسته عملیاتی\`

#### ۲. مواد قانونی:
- **ماده ۱:** نمره کف دریافت پاداش ۷۰ است؛ نمرات کمتر مشمول آموزش جبرانی می‌شوند.
- **ماده ۲:** نمرات بالای ۹۰ علاوه بر پاداش مشمول ارشدیت تشویقی ۳ تا ۶ ماهه هستند.

#### ۳. جداول ضرایب:
- **ضرایب درجات:** از ۱۵۰,۰۰۰ ریال برای درجه‌داران تا ۴۲۰,۰۰۰ ریال برای امراء.
- **ضرایب رسته:** مرزبانی ۱.۴، یگان ویژه ۱.۳۵، آگاهی ۱.۳، کلانتری ۱.۲ و ستاد ۱.۰.`
  },

  // PAGE 13
  {
    pageNumber: 13,
    messageNumber: 3,
    chapterId: 'employee',
    chapterTitle: 'فصل سوم: آیین‌نامه پاداش عملکرد و فرمول مسکن',
    pageTitle: 'آیین‌نامه رسمی و فرمول ریاضی امتیاز شفاف نوبت مسکن سازمانی',
    pageSubtitle: 'محاسبه شفاف ۶ متغیره، جدول ضرایب مناطق و سازوکار عادلانه واگذاری و تخلیه',
    contentHtml: `
      <div class="space-y-4">
        <div class="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs border border-slate-800">
          فرمول ریاضی محاسبه امتیاز مسکن سازمانی:
          <br>
          <strong class="text-white text-sm">امتیاز مسکن = (سال‌های خدمت × ۳) + (تاهل × ۱۰) + (تعداد اولاد × ۵) + (ضریب سختی منطقه × ۸) + (سابقه انتظار × ۴) - (امتیاز ملک شخصی)</strong>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. جدول تفکیک متغیرهای فرمول و ضرایب سنجش</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr class="bg-slate-100 text-slate-900 font-bold">
                <th class="p-2 border border-slate-300">شاخص فرمول</th>
                <th class="p-2 border border-slate-300">ضریب</th>
                <th class="p-2 border border-slate-300">دامنه مقادیر و توضیحات قانونی</th>
              </tr>
            </thead>
            <tbody class="text-slate-700">
              <tr>
                <td class="p-2 border border-slate-300 font-bold">سنوات خدمت رسمی</td>
                <td class="p-2 border border-slate-300 font-bold">۳</td>
                <td class="p-2 border border-slate-300">هر سال خدمت رسمی معادل ۳ امتیاز مثبت (تا سقف ۹۰ امتیاز).</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">وضعیت تاهل</td>
                <td class="p-2 border border-slate-300 font-bold">۱۰</td>
                <td class="p-2 border border-slate-300">متاهلین ۱۰ امتیاز پایه دریافت می‌کنند؛ مجردین فاقد امتیاز این بخش هستند.</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">تعداد فرزندان</td>
                <td class="p-2 border border-slate-300 font-bold">۵</td>
                <td class="p-2 border border-slate-300">هر فرزند تحت تکفل ۵ امتیاز (تا سقف ۲۵ امتیاز به منظور حمایت از جوانی جمعیت).</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">ضریب سختی منطقه خدمت</td>
                <td class="p-2 border border-slate-300 font-bold">۸</td>
                <td class="p-2 border border-slate-300">مناطق رده الف (مرزهای سیستان و کردستان) ضریب ۱۰؛ رده ب ضریب ۷؛ رده ج ضریب ۵؛ رده د ضریب ۲.</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold">سابقه انتظار در صف مسکن</td>
                <td class="p-2 border border-slate-300 font-bold">۴</td>
                <td class="p-2 border border-slate-300">هر سال ثبت‌نام متوالی و عدم تحویل مسکن، ۴ امتیاز جبرانی دارد.</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold text-rose-700">کسورات ملک شخصی</td>
                <td class="p-2 border border-slate-300 font-bold text-rose-700">کسر ۵۰</td>
                <td class="p-2 border border-slate-300 text-rose-700">در صورت احراز دارا بودن ملک مسکونی شخصی در شهر محل خدمت، ۵۰ امتیاز کسر می‌گردد.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. قوانین سکونت و تخلیه</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          مدت زمان قانونی استفاده از منازل سازمانی در مناطق مرزی و محروم تا زمان پایان دوره مأموریت و در مراکز استان‌ها حداکثر ۵ سال می‌باشد. پس از انقضای مهلت، با اخطار ۶ ماهه واحد تخلیه و به نفر بعدی صف واگذار می‌گردد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۱۳: آیین‌نامه رسمی و فرمول ریاضی امتیاز نوبت مسکن سازمانی
#### ۱. فرمول ریاضی امتیاز نوبت مسکن:
\`امتیاز مسکن = (سال‌های خدمت × ۳) + (تاهل × ۱۰) + (تعداد اولاد × ۵) + (ضریب سختی منطقه × ۸) + (سابقه انتظار × ۴) - (امتیاز ملک شخصی)\`

#### ۲. ضرایب مناطق:
مناطق مرزی رده الف ضریب ۱۰، مناطق سخت رده ب ضریب ۷ و مناطق عادی ضریب ۲. کسر ۵۰ امتیاز برای افراد دارای ملک شخصی.

#### ۳. قانون واگذاری و تخلیه:
حداکثر سقف بهره‌برداری در مراکز استان‌ها ۵ سال بوده و با انقضای مهلت به نفر بعدی صف تحویل می‌گردد.`
  },

  // PAGE 14
  {
    pageNumber: 14,
    messageNumber: 4,
    chapterId: 'evaluator',
    chapterTitle: 'فصل چهارم: راهنمای ارزیاب، شناسنامه مشاغل و گزینش',
    pageTitle: 'بانک جامع مشاغل فراجا و ماتریس ۵×۴ تطابق کارکردی',
    pageSubtitle: 'شناسنامه بیش از ۱۰۰ شغل در رسته‌های انتظامی، آگاهی، مرزبانی، راهور و یگان ویژه',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. معماری شناسنامه مشاغل فراجا (/evaluator/competency-management)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          در این زیرسامانه، بیش از ۱۰۰ عنوان شغلی انتظامی با دقت استانداردسازی شده است. شناسنامه هر شغل مشتمل بر: ۱) عنوان رسمی و کد شغل، ۲) رسته و رده سازمانی، ۳) شرح مأموریت و وظایف اصلی، ۴) شرایط و الزامات احراز (تحصیلات، درجه مجاز، سابقه خدمت)، ۵) تجهیزات و سلاح مصوب، و ۶) ریسک‌ها و مخاطرات شغلی است.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. ماتریس ۵×۴ تطابق کارکردی شایستگی‌ها</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          هر شغل بر اساس ۵ بعد شایستگی در ۴ سطح تسلط نگاشت می‌گردد:
        </p>
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr class="bg-slate-100 text-slate-900 font-bold">
                <th class="p-2 border border-slate-300">سطح تسلط</th>
                <th class="p-2 border border-slate-300">محدوده درجه</th>
                <th class="p-2 border border-slate-300">رفتار مورد انتظار در صحنه مأموریت</th>
              </tr>
            </thead>
            <tbody class="text-slate-700">
              <tr>
                <td class="p-2 border border-slate-300 font-bold text-slate-900">سطح ۱: مقدماتی (Basic)</td>
                <td class="p-2 border border-slate-300">گروهبان و ستوان سوم</td>
                <td class="p-2 border border-slate-300">اجرای دقیق دستورات مافوق، رعایت اصول حفاظتی اولیه، تیراندازی دقیق ثابت.</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold text-slate-900">سطح ۲: کاربردی (Applied)</td>
                <td class="p-2 border border-slate-300">ستوان دوم و ستوان یکم</td>
                <td class="p-2 border border-slate-300">سرپرستی گشت، نگارش گزارش قضایی استاندارد، تیراندازی در حال حرکت، کنترل پرخاشگری.</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold text-slate-900">سطح ۳: پیشرفته (Advanced)</td>
                <td class="p-2 border border-slate-300">سروان و سرگرد</td>
                <td class="p-2 border border-slate-300">فرماندهی گروهان و کلانتری، مدیریت صحنه‌های بحرانی، هماهنگی با مقام قضایی، آموزش کادر.</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-300 font-bold text-slate-900">سطح ۴: راهبردی (Strategic)</td>
                <td class="p-2 border border-slate-300">سرهنگ و سرتیپ</td>
                <td class="p-2 border border-slate-300">برنامه‌ریزی عملیات انتظامی در سطح شهرستان و استان، هدایت پدافند غیرعامل، ارتقای انضباط عمومی.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۱۴: بانک جامع مشاغل فراجا و ماتریس ۵×۴ تطابق کارکردی
#### ۱. شناسنامه مشاغل فراجا (/evaluator/competency-management):
تدوین مشخصات بیش از ۱۰۰ شغل در رسته‌های تخصصی با شرح وظایف، الزامات احراز و تجهیزات مصوب.

#### ۲. ماتریس ۵×۴ سطوح تسلط:
- **مقدماتی (درجه‌داران):** اطاعت‌پذیری، انضباط ظاهری و مهارت پایه سلاح.
- **کاربردی (افسران جزء):** سرپرستی گشت، آیین دادرسی و واکنش سریع.
- **پیشرفته (افسران ارشد):** فرماندهی کلانتری، مهار بحران و هدایت عملیات.
- **راهبردی (امراء):** سیاست‌گذاری امنیتی، آمایش انتظامی و مدیریت کلان یگان‌ها.`
  },

  // PAGE 15
  {
    pageNumber: 15,
    messageNumber: 4,
    chapterId: 'evaluator',
    chapterTitle: 'فصل چهارم: راهنمای ارزیاب، شناسنامه مشاغل و گزینش',
    pageTitle: 'کارتابل ارزیابی میدانی شایستگی و شبیه‌ساز تیراندازی فاتح',
    pageSubtitle: 'ثبت آزمون‌های عملیاتی، کنترل خشم و بازخورد بازرسی‌های نامحسوس',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. کارتابل ارزیابی میدانی کارکنان (/evaluator/employee-evaluation)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          ارزیابان رسمی فراجا که دارای گواهینامه معتبر کانون ارزیابی هستند، با ورود به این کارتابل، مأموران را در آزمون‌های ادواری مورد سنجش قرار می‌دهند. فرآیند ارزیابی شامل ۴ مولفه است:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۱. شبیه‌ساز تیراندازی فاتح</span>
            <p class="text-slate-600 text-[11px]">ارزیابی رایانه‌ای در سناریوهای گروگان‌گیری، مواجهه با اراذل و شلیک در تاریکی. ثبت خودکار زمان واکنش به میلی‌ثانیه، درصد اصابت به هدف و رعایت قانون بکارگیری سلاح.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۲. تست‌های روان‌سنجی کنترل خشم</span>
            <p class="text-slate-600 text-[11px]">سنجش میزان تاب‌آوری عصبی مأمور در شرایط توهین و تحریک در صحنه، توانایی تفکیک هیجان از تصمیم‌گیری عقلانی و گزارش کارشناس بهداری.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۳. آزمون سناریومحور مدیریت صحنه</span>
            <p class="text-slate-600 text-[11px]">ایفای نقش در شبیه‌سازی صحنه تصادف منجر به فوت یا کشف جسد؛ نحوه حفظ صحنه جرم، ممانعت از امحای آثار و هماهنگی با بازپرس کشیک.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۴. گزارش‌های بازرسی نامحسوس</span>
            <p class="text-slate-600 text-[11px]">ثبت یافته‌های تیم‌های نظارتی نامحسوس بازرسی کل فراجا پیرامون سلامت مالی، رعایت ضوابط گشت و عدم دریافت وجوه غیرقانونی.</p>
          </div>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۱۵: کارتابل ارزیابی میدانی شایستگی و شبیه‌ساز تیراندازی فاتح
#### ۱. کارتابل ارزیابی کارکنان (/evaluator/employee-evaluation):
ثبت سیستمی نمرات میدانی توسط ارزیابان رسمی مراکز شایستگی فراجا.

#### ۲. اجزای ارزیابی ملموس:
- **شبیه‌ساز تیراندازی فاتح:** ثبت خودکار سرعت واکنش، دقت هدف‌گیری و رعایت قانون بکارگیری سلاح.
- **تست‌های روان‌سنجی کنترل خشم:** اندازه‌گیری تاب‌آوری در صحنه‌های درگیری و تحریکات کلامی.
- **سناریوی عملیاتی مدیریت صحنه جرم:** شبیه‌سازی حفظ صحنه و تنظیم دقیق صورتجلسه اولیه.
- **تلفیق با گزارش‌های بازرسی نامحسوس:** ثبت سوابق صیانت اخلاقی و سلامت مالی مأمور.`
  },

  // PAGE 16
  {
    pageNumber: 16,
    messageNumber: 4,
    chapterId: 'evaluator',
    chapterTitle: 'فصل چهارم: راهنمای ارزیاب، شناسنامه مشاغل و گزینش',
    pageTitle: 'مدل غربالگری ریسک فرسودگی انتقالات (EWS Transfers)',
    pageSubtitle: 'محاسبه شاخص هشدار زودهنگام، اعتبارسنجی مدارک پزشکی و سطح‌بندی ریسک',
    contentHtml: `
      <div class="space-y-4">
        <div class="p-3 rounded-xl bg-rose-950 text-rose-200 font-mono text-xs border border-rose-800">
          فرمول محاسبه شاخص هشدار زودهنگام فرسودگی شغلی (EWS Score):
          <br>
          <strong class="text-white text-sm">EWS Score = (فاصله از خانواده / ۵۰) + (ضریب سختی خدمت × ۱۰) + (سال‌های ماندگاری × ۴) + (بار تکفل و درمان)</strong>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. فلسفه مدل هشدار زودهنگام (Early Warning System)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          خدمت در نقاط مرزی و رده‌های سخت عملیاتی در صورت تداوم بیش از حد، به فرسودگی روانی، افت دقت در مأموریت و مشکلات حاد خانوادگی می‌انجامد. مدل EWS به صورت الگوریتمی، مأمورانی که در آستانه بحران فرسودگی قرار دارند را غربالگری و با چراغ قرمز به کارتابل فرماندهی معرفی می‌کند.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. طبقه‌بندی سطوح ریسک فرسودگی</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span class="font-bold">ریسک کم (سبز: زیر ۵۰)</span>
            <p class="text-[11px] mt-1">وضعیت پایدار عملیاتی؛ نیازی به مداخله فوری جابجایی نیست.</p>
          </div>
          <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
            <span class="font-bold">ریسک متوسط (زرد: ۵۰ تا ۷۵)</span>
            <p class="text-[11px] mt-1">هشدار اولیه فرسودگی؛ لزوم اعطای مرخصی تشویقی یا آماده‌سازی برای جابجایی در دوره آتی.</p>
          </div>
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
            <span class="font-bold">ریسک بحرانی (قرمز: بالای ۷۵)</span>
            <p class="text-[11px] mt-1">اولویت اول و قطعی جابجایی در کارتابل DSS فرماندهی؛ ممانعت از حوادث ناشی از خستگی مفرط.</p>
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. فرآیند اعتبارسنجی مدارک توسط ارزیاب</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          ارزیاب با استعلام آنلاین از ثبت احوال، سامانه بهداری فراجا و سامانه اسناد کشور، اصالت مدارک تکفل والدین و پرونده‌های درمانی را تایید یا رد می‌نماید تا هیچ‌گونه سوءاستفاده‌ای رخ ندهد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۱۶: مدل غربالگری ریسک فرسودگی انتقالات (EWS Transfers)
#### ۱. فرمول شاخص ریسک فرسودگی (EWS Score):
\`EWS Score = (فاصله از خانواده / ۵۰) + (ضریب سختی خدمت × ۱۰) + (سال‌های ماندگاری × ۴) + (بار تکفل و درمان)\`

#### ۲. سطوح سه‌گانه ریسک:
- **سبز (زیر ۵۰):** وضعیت پایدار.
- **زرد (۵۰ تا ۷۵):** هشدار فرسودگی و نیاز به مرخصی تشویقی.
- **قرمز (بالای ۷۵):** اولویت اول و بحرانی جابجایی در سامانه تصمیم‌یار DSS فرماندهی.

#### ۳. اعتبارسنجی مدارک پزشکی و تکفل:
راستی‌آزمایی مدارک متقاضیان توسط ارزیابان با استعلام آنلاین از سامانه‌های رسمی بهداری و ثبت احوال.`
  },

  // PAGE 17
  {
    pageNumber: 17,
    messageNumber: 4,
    chapterId: 'evaluator',
    chapterTitle: 'فصل چهارم: راهنمای ارزیاب، شناسنامه مشاغل و گزینش',
    pageTitle: 'سامانه جذب و گزینش فراجا و قیف پنج‌مرحله‌ای داوطلبان',
    pageSubtitle: 'ثبت‌نام، بهداری تخصصی، آزمون ورزشی، مصاحبه عقیدتی و کمیسیون نهایی',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. معماری سامانه گزینش و استخدام فراجا (/recruitment)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          ورود نیروی باانگیزه، متعهد و سالم زیربنای امنیت پایدار کشور است. سامانه گزینش فراجا داوطلبان مقاطع افسری (دانشگاه امین) و درجه‌داری را در یک قیف ۵ مرحله‌ای پایش و فیلتر می‌نماید:
        </p>

        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
          <div><strong>مرحله ۱ - ثبت‌نام و راستی‌آزمایی شرایط عمومی:</strong> تطبیق معدل دیپلم، سن، قد، عدم سوءپیشینه و استعلامات الکترونیک ثبت احوال و نظام وظیفه.</div>
          <div><strong>مرحله ۲ - بهداری تخصصی و معاینات پزشکی:</strong> معاینات چشم‌پزشکی، شنوایی‌سنجی، قلب و عروق، ارتوپدی (کف پای صاف، پرانتزی زانو)، روانپزشکی و عدم اعتیاد.</div>
          <div><strong>مرحله ۳ - آزمون‌های آمادگی جسمانی و آزمون علمی:</strong> تست دو ۱۰۰۰ متر، درازنشست، شنا و آزمون سنجش هوش و درک عمومی انتظامی.</div>
          <div><strong>مرحله ۴ - مصاحبه‌های عقیدتی، سیاسی و حفاظت اطلاعات:</strong> ارزیابی اعتقادی، شناخت احکام اسلامی، بینش سیاسی و تحقیقات جامع محلی و خانوادگی.</div>
          <div><strong>مرحله ۵ - کمیسیون نهایی جذب و صدور امریه:</strong> تصویب نهایی پرونده داوطلبان، تعیین رسته و صدور امریه اعزام به پادگان‌های آموزشی.</div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. داشبورد آمار و تحلیل قیف استخدام</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          ارزیابان ارشد در این داشبورد، نرخ ریزش و قبولی داوطلبان را در هر استان و در هر یک از مراحل ۵ گانه رصد می‌کنند تا علل ردصلاحیت‌های پزشکی یا علمی مشخص شده و ظرفیت‌های منطقه‌ای بهینه‌سازی گردد.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۱۷: سامانه جذب و گزینش فراجا و قیف پنج‌مرحله‌ای داوطلبان
#### ۱. مراحل پنج‌گانه گزینش فراجا (/recruitment):
۱. **ثبت‌نام و شرایط اولیه:** تطابق سن، قد، معدل و سوابق انتظامی.
۲. **معاینات بهداری تخصصی:** بررسی ارتوپدی، بینایی، قلب و تست‌های جامع روانپزشکی.
۳. **تست‌های آمادگی جسمانی و آزمون علمی:** دو، شنا، استقامت و هوش انتظامی.
۴. **مصاحبه‌های عقیدتی و حفاظتی:** پایبندی دینی، سلامت اعتقادی و تحقیقات میدانی محلی.
۵. **کمیسیون نهایی و صدور امریه:** تصویب گزینش و اعزام به مراکز آموزش و دانشگاه افسری امین.

#### ۲. داشبورد تحلیل قیف گزینش:
پایش نرخ قبولی در هر مرحله به تفکیک استان‌ها و رفع گلوگاه‌های گزینش.`
  },

  // PAGE 18
  {
    pageNumber: 18,
    messageNumber: 5,
    chapterId: 'manager',
    chapterTitle: 'فصل پنجم: راهنمای سطح فرماندهی، مرکز کنترل و DSS',
    pageTitle: 'مرکز فرماندهی و تصمیم‌یار ۳۶۰ درجه یگان (Command Center)',
    pageSubtitle: 'دیدبان آمادگی لحظه‌ای رده‌ها، مانیتورینگ فوریت‌های ۱۱۰ و نمرات رضایت ۱۹۷',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. داشبورد مرکز فرماندهی و تصمیم‌یار (/manager/command-center)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          این سطح به فرماندهان انتظامی استان‌ها، روسای پلیس‌های تخصصی و فرماندهان شهرستان‌ها اختصاص دارد تا بدون غرق شدن در جزئیات اداری، نبض زنده حوزه استحفاظی را در دست داشته باشند.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. ارکان سه‌گانه مانیتورینگ لحظه‌ای مرکز کنترل</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۱. آمادگی رزمی و پرسنلی رده‌ها</span>
            <p class="text-slate-600 text-[11px]">نمایش برخط تعداد کلانتری‌ها، گشت‌های خودرویی و موتوری فعال در خیابان، نیروهای شیفت، نیروهای در حال استراحت و نرخ حضور در یگان.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۲. پایش عملیاتی فوریت‌های ۱۱۰</span>
            <p class="text-slate-600 text-[11px]">مانیتورینگ تماس‌های ورودی شهروندان، میانگین زمان حضور مأمور در صحنه (هدف: زیر ۸ دقیقه)، و شمار مأموریت‌های موفق در ۲۴ ساعت گذشته.</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span class="font-bold text-slate-900">۳. سنجش نبض رضایت در سامانه ۱۹۷</span>
            <p class="text-slate-600 text-[11px]">تحلیل بلادرنگ بازخورد شهروندان از برخورد پلیس؛ نمودار تفکیکی تقدیر، شکایت و انتقاد به تفکیک کلانتری‌ها و اخطار فوری به یگان‌های پرشکایت.</p>
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. هشدارهای راهبردی و فرماندهی مداخله</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          در صورت وقوع هرگونه ناهماهنگی (مانند تاخیر غیرعادی گشت در ماموریت‌های قرمز یا افت ناگهانی نمره رضایت یک پاسگاه)، سیستم به صورت آلارم تصویری به فرمانده هشدار داده و پیشنهاد اعزام تیم بازرسی صادر می‌کند.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۱۸: مرکز فرماندهی و تصمیم‌یار ۳۶۰ درجه یگان (Command Center)
#### ۱. داشبورد مرکز فرماندهی (/manager/command-center):
دیدبان زنده فرماندهان استان و شهرستان پیرامون وضعیت رده‌ها و منابع انسانی.

#### ۲. پایش بلادرنگ سه شاخص کلیدی:
- **آمادگی رزمی رده‌ها:** تعداد گشت‌های خودرویی/موتوری فعال و درصد کادر حاضر.
- **فوریت‌های ۱۱۰:** میانگین زمان حضور در صحنه مأموریت و تعداد تماس‌های مدیریت‌شده.
- **سامانه نظارت همگانی ۱۹۷:** نسبت تقدیرها و شکایات مردمی و هشدار به یگان‌های ضعیف.

#### ۳. آلارم‌های مداخله فوری:
ارسال اخطار خودکار به فرمانده هنگام تاخیر عملیاتی یا افزایش تخلفات در یک حوزه استحفاظی.`
  },

  // PAGE 19
  {
    pageNumber: 19,
    messageNumber: 5,
    chapterId: 'manager',
    chapterTitle: 'فصل پنجم: راهنمای سطح فرماندهی، مرکز کنترل و DSS',
    pageTitle: 'مقایسه یگانی، رتبه‌بندی کلانتری‌ها و سامانه جانشین‌پروری',
    pageSubtitle: 'ماتریس ۹‌بخشی استعدادها، تفکیک سبز/زرد/قرمز و بانک افسران آینده',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. مقایسه و رتبه‌بندی عملکرد کلانتری‌ها (/manager/performance)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          سامانه معیار کلانتری‌ها و پاسگاه‌های تابعه یک استان را در جدولی شفاف با کدهای رنگی سبز (پیشرو)، زرد (نیازمند توجه) و قرمز (بحرانی) طبقه‌بندی می‌کند. سنجه‌های رتبه‌بندی شامل: نرخ کشف جرائم، رضایت ۱۹۷، سرعت عمل ۱۱۰ و انضباط سازمانی است.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. ماتریس ۹‌بخشی استعدادها (9-Box Talent Matrix)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          نگاشت افسران بر اساس دو محور «عملکرد فعلی» (محور افقی) و «پتانسیل رشد و استعداد فرماندهی» (محور عمودی). افسرانی که در خانه بالا-راست (ستارگان/نخبگان) قرار می‌گیرند، مستقیماً وارد مسیر جانشین‌پروری می‌گردند.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. سامانه استعدادیابی و جانشین‌پروری (/performance/succession)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          پایش پست‌های حساس فرماندهی (مانند رئیس کلانتری درجه یک، سرپرست آگاهی شهرستان، فرمانده یگان امداد): برای هر پست حساس، ۳ افسر جوان مستعد با درصد آمادگی (آماده تصدی فوری، آماده پس از یک سال، آماده پس از آموزش دافوس) ثبت گردیده تا در صورت انتقال یا بازنشستگی فرمانده، خلاء مدیریتی ایجاد نشود.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۱۹: مقایسه یگانی، رتبه‌بندی کلانتری‌ها و سامانه جانشین‌پروری
#### ۱. رتبه‌بندی کلانتری‌ها و یگان‌ها (/manager/performance):
طبقه‌بندی عملکرد رده‌ها با رنگ‌های سبز (پیشرو)، زرد (متوسط) و قرمز (بحرانی).

#### ۲. ماتریس ۹‌بخشی استعدادها (9-Box Grid):
تحلیل توامان نمره عملکرد فعلی و پتانسیل رهبری و شناسایی استعدادهای برتر افسران.

#### ۳. سامانه جانشین‌پروری (/performance/succession):
بانک استعداد تصدی سمت‌های حساس کلانتری و فرماندهی و آماده‌سازی کاندیداهای جانشین.`
  },

  // PAGE 20
  {
    pageNumber: 20,
    messageNumber: 5,
    chapterId: 'manager',
    chapterTitle: 'فصل پنجم: راهنمای سطح فرماندهی، مرکز کنترل و DSS',
    pageTitle: 'سامانه تصمیم‌سازی هوشمند انتقالات (DSS Transfers)',
    pageSubtitle: 'شبیه‌سازی جابجایی جفتی هم‌تراز، کنترل تراز استانی و تخصیص هوشمند مسکن خالی',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. موتور تصمیم‌یار انتقالات (Decision Support System)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          بزرگ‌ترین چالش ستادی فراجا، جابجایی سالیانه هزاران مأمور بدون ایجاد کسری چارت در کلانتری‌ها و پاسگاه‌های مبدا است. کارتابل DSS فرماندهی با الگوریتم‌های بهینه‌سازی، این فرآیند را هوشمند ساخته است:
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. مکانیزم شبیه‌سازی جابجایی هم‌تراز جفتی (Pair-Matching)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          الگوریتم سامانه متقاضیان انتقالی را به صورت جفت‌های هم‌تراز (هم‌رتبه و هم‌رسته) که مقصد متقابل دارند (مثلاً سرگرد کلانتری متقاضی انتقال از زاهدان به اصفهان و سرگرد کلانتری متقاضی جابجایی از اصفهان به زاهدان) شناسایی کرده و پیشنهاد جابجایی همزمان بدون افت ۱ درصدی چارت سازمانی ارائه می‌دهد.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. کنترل تراز ورودی و خروجی ۳۱ استان</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          داشبورد موازنه پرسنلی: ممانعت خودکار از تایید درخواست‌های خروجی استان‌های با کمبود کادر تا زمانی که نیروی جایگزین از طریق جذب جدید یا جابجایی متناظر تامین نشده باشد.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۴. تخصیص هوشمند خانه‌های سازمانی خالی</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          هنگامی که مأموری از استانی منتقل می‌شود، خانه سازمانی تخلیه‌شده به طور خودکار به بالاترین امتیاز در صف نوبت مسکن همان شهر تخصیص می‌یابد و از معطل ماندن واحدها جلوگیری به عمل می‌آید.
        </p>
      </div>
    `,
    markdownContent: `### صفحه ۲۰: سامانه تصمیم‌سازی هوشمند انتقالات (DSS Transfers)
#### ۱. مکانیزم جابجایی جفتی و هم‌تراز (Pair Matching):
تطابق خودکار افسران هم‌رتبه با مقاصد معکوس و جابجایی متناظر بدون خالی ماندن پست‌های کلانتری.

#### ۲. پایش تراز ورودی و خروجی ۳۱ استان:
کنترل برخط موازنه نیروی انسانی و جلوگیری از تضعیف رده‌های انتظامی در مناطق مرزی و حساس.

#### ۳. تخصیص هوشمند منازل سازمانی خالی:
اتصال سامانه انتقالات به بانک مسکن و واگذاری آنی منازل تخلیه‌شده به واجدین بالاترین امتیاز در صف.`
  },

  // PAGE 21
  {
    pageNumber: 21,
    messageNumber: 6,
    chapterId: 'gis',
    chapterTitle: 'فصل ششم: سند راهبرد آمایش سرزمینی فراجا (GIS)',
    pageTitle: 'سامانه تحلیل جغرافیایی سرمایه انسانی فراجا (مصوبه بند ۳-۷ GIS)',
    pageSubtitle: 'فلسفه سند تحول، نقشه تعاملی ۳۱ استان و هفت لایه حرارتی چوروپلت',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. فلسفه مصوبه بند ۳-۷ سند تحول سرمایه انسانی فراجا</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          بر اساس مصوبه بند ۳-۷ سند راهبردی فراجا، توزیع سرمایه انسانی در جغرافیای کشور باید بر مبنای «تراکم جمعیت، نرخ جرم، موقعیت ژئوپلیتیک و وسعت سرزمینی» صورت پذیرد. سامانه GIS ابزار تحقق این مصوبه قانونی است.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. هفت لایه اطلاعاتی حرارتی نقشه تعاملی کشور (/geographic-analysis)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="font-bold text-slate-900">لایه ۱: تراکم پرسنل و درصد پرشدگی چارت</span>
            <p class="text-[11px] text-slate-600 mt-0.5">درصد تکمیل ظرفیت مصوب پرسنلی استان نسبت به سقف سازمانی ابلاغی ستاد کل.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="font-bold text-slate-900">لایه ۲: عملکرد پلیسی و رضایت ۱۹۷</span>
            <p class="text-[11px] text-slate-600 mt-0.5">نقشه حرارتی میانگین نمرات عملکرد کلانتری‌ها و بازخورد شهروندان در سراسر استان‌ها.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="font-bold text-slate-900">لایه ۳: شایستگی و مهارت تیراندازی</span>
            <p class="text-[11px] text-slate-600 mt-0.5">رصد سطح مهارت تاکتیکی و نمرات میدان تیر کادر در گستره ۳۱ استان کشور.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="font-bold text-slate-900">لایه ۴: سهم بومی‌گزینی</span>
            <p class="text-[11px] text-slate-600 mt-0.5">نسبت مأموران بومی به غیربومی در استان به منظور حفظ تعادل فرهنگی و انگیزش خدمتی.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="font-bold text-slate-900">لایه ۵: تراز جابجایی سرزمینی</span>
            <p class="text-[11px] text-slate-600 mt-0.5">نمایش تراز خالص ورودی و خروجی استان‌ها و شناسایی استان‌های با مهاجرت منفی کادر.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="font-bold text-slate-900">لایه ۶: سرانه آموزش و بصیرت</span>
            <p class="text-[11px] text-slate-600 mt-0.5">میانگین ساعات دوره‌های آموزشی ضمن خدمت گذرانده‌شده به ازای هر پرسنل در سال.</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 col-span-1 md:col-span-2">
            <span class="font-bold text-slate-900">لایه ۷: ضریب سختی و رده‌بندی مناطق (الف تا د)</span>
            <p class="text-[11px] text-slate-600 mt-0.5">طبقه‌بندی مناطق مرزی، کویری و شرایط سخت معیشتی جهت تخصیص فوق‌العاده‌های مالی و امتیاز مسکن.</p>
          </div>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۲۱: سامانه تحلیل جغرافیایی سرمایه انسانی فراجا (مصوبه بند ۳-۷ GIS)
#### ۱. فلسفه مصوبه بند ۳-۷:
توزیع متوازن و علمی منابع انسانی فراجا بر مبنای اطلس جرم، جمعیت و وسعت جغرافیایی ۳۱ استان.

#### ۲. لایه‌های هفت‌گانه نقشه تعاملی چوروپلت:
۱. **تراکم پرسنل و پرشدگی چارت:** نسبت کادر حاضر به ظرفیت مصوب.
۲. **عملکرد پلیسی و ۱۹۷:** سنجش برخط رضایت عمومی و توان عملیاتی.
۳. **مهارت و تیراندازی:** شاخص شایستگی تاکتیکی استان‌ها.
۴. **سهم بومی‌گزینی:** درصد جذب نیروهای بومی در کلانتری‌ها.
۵. **تراز جابجایی سرزمینی:** پایش جریان مهاجرت پرسنلی بین استان‌ها.
۶. **سرانه آموزش:** ساعات دوره‌های مهارتی و ضمن خدمت به ازای هر مأمور.
۷. **ضریب سختی خدمت (الف تا د):** رده‌بندی شرایط اقلیمی و مرزی کشور.`
  },

  // PAGE 22
  {
    pageNumber: 22,
    messageNumber: 6,
    chapterId: 'gis',
    chapterTitle: 'فصل ششم: سند راهبرد آمایش سرزمینی فراجا (GIS)',
    pageTitle: 'داشبورد عمیق استانی، هرم درجات و پایش مرزهای رده الف',
    pageSubtitle: 'تحلیل ساختار کادر، مقایسه مناطق پنج‌گانه و پروتکل هشدارهای امنیتی مرز',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. داشبورد عمیق استانی (Provincial Deep-Dive)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          با کلیک بر روی هر استان، فرمانده به شناسنامه کامل امنیتی-پرسنلی استان دست می‌یابد:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li><strong>هرم درجات استان:</strong> توزیع امراء، افسران ارشد (سرهنگ/سرگرد)، افسران جزء و درجه‌داران و اعلام ناترازی هرم.</li>
          <li><strong>سهم رسته‌های تخصصی:</strong> تفکیک سهم کلانتری، مرزبانی، آگاهی، راهور، یگان ویژه و پلیس فتا در استان.</li>
          <li><strong>سرعت عمل و کشف:</strong> میانگین زمان حضور ۱۱۰ و درصد کشف به وقوع جرائم استان.</li>
          <li><strong>وضعیت مسکن سازمانی:</strong> درصد پوشش مسکن، تعداد متقاضیان در صف و پروژه‌های در دست ساخت.</li>
        </ul>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. تحلیل مناطق پنج‌گانه فراجا و مقایسه تطبیقی</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          تقسیم کشور به ۵ منطقه راهبردی (شمال، مرکز، غرب، شرق، جنوب): مقایسه شاخص‌ها میان استان‌های همجوار و بهینه‌سازی توزیع امکانات و تسلیحات سازمانی.
        </p>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۳. پروتکل هشدارهای سرزمینی و پایش مرزهای رده الف</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          در صورتی که درصد پرشدگی چارت پاسگاه‌های مرزی رده الف (نظیر هنگ‌های مرزی سراوان، جکیگور یا مریوان) به زیر ۸۵٪ افت کند:
        </p>
        <ol class="list-decimal list-inside space-y-1 text-xs text-slate-700">
          <li>صدور هشدار قرمز ستادی بر روی نقشه GIS برای معاونت نیروی انسانی ستاد کل.</li>
          <li>تخصیص سهمیه اضطراری اعزام از فارغ‌التحصیلان جدید دانشگاه امین و مراکز آموزش درجه‌داری.</li>
          <li>فعال‌سازی بسته تشویقی ویژه (ودیعه مسکن، ضریب حق رزم حداکثری و ارشدیت مضاعف).</li>
        </ol>
      </div>
    `,
    markdownContent: `### صفحه ۲۲: داشبورد عمیق استانی، هرم درجات و پایش مرزهای رده الف
#### ۱. داشبورد عمیق استانی (Deep-Dive):
تحلیل هرم درجه‌ای، سهم رسته‌های تخصصی، نرخ کشف جرم، وضعیت مسکن سازمانی و شناسایی کمبودهای کادر.

#### ۲. ارزیابی مناطق پنج‌گانه کشور:
مقایسه شاخص‌های امنیتی و انسانی در مناطق شمال، مرکز، غرب، شرق و جنوب کشور.

#### ۳. پروتکل هشدارهای مرزی رده الف:
هشدار خودکار در صورت افت پرشدگی پاسگاه‌های مرزی به زیر ۸۵٪، اعزام فوری کادر و فعال‌سازی بسته‌های حمایتی.`
  },

  // PAGE 23
  {
    pageNumber: 23,
    messageNumber: 7,
    chapterId: 'synergy',
    chapterTitle: 'فصل هفتم: چرخه هم‌افزایی داده‌ها، کمیسیون نهایی و جمع‌بندی',
    pageTitle: 'چرخه یکپارچگی داده‌ها (Data Synergy Loop) و کمیسیون نهایی جذب',
    pageSubtitle: 'زنجیره بسته پنج‌مرحله‌ای ارزش داده‌ها و سازوکار صدور امریه الکترونیک',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. زنجیره بسته پنج‌مرحله‌ای هم‌افزایی داده‌ها (Data Synergy Loop)</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          در سامane معیار، داده‌ها هرگز جزیره‌ای یا راکد نیستند. اطلاعات در یک مدار بسته خوداصلاح‌گر به گردش درمی‌آیند:
        </p>

        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
          <div><strong>گام ۱ (از جذب به شایستگی):</strong> نتایج آزمون‌های ورودی داوطلبان مستقیماً به شناسنامه اولیه شایستگی پرسنلی تبدیل می‌شود.</div>
          <div><strong>گام ۲ (از شایستگی به عملکرد میدانی):</strong> نمرات آزمون‌ها و مهارت‌های تاکتیکی در مأموریت‌های گشت و کلانتری راستی‌آزمایی و نمره کارنامه فصلی را شکل می‌دهند.</div>
          <div><strong>گام ۳ (از عملکرد به پاداش و رفاه):</strong> کارنامه فصلی مستقیماً پاداش کارایی فیش حقوقی، اولویت مسکن و سهمیه‌های رفاهی حکمت را تعیین می‌کند.</div>
          <div><strong>گام ۴ (از عملکرد به جانشین‌پروری و انتقالات):</strong> مأموران برتر کاندیدای ارتقاء و پست‌های حساس شده و افراد فرسوده در اولویت جابجایی قرار می‌گیرند.</div>
          <div><strong>گام ۵ (از انتقالات به آمایش سرزمینی GIS):</strong> هر انتقال پرسنلی، لایه‌های نقشه ۳۱ استان را برخط به‌روز کرده و موازنه سرزمینی را تثبیت می‌نماید.</div>
        </div>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. آیین‌نامه اجرایی کمیسیون نهایی جذب و گزینش</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          جلسه کمیسیون نهایی جذب با حضور معاون نیروی انسانی، رئیس بهداری، رئیس حفاظت اطلاعات و ارزیاب ارشد برگزار می‌گردد. با تصویب پرونده، سامانه به طور خودکار:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li>کد پرسنلی یکتای فراجا را صادر می‌نماید.</li>
          <li>امریه اعزام به پادگان آموزشی یا دانشگاه افسری امین را با امضای دیجیتال ابلاغ می‌کند.</li>
          <li>کارت پاسداری هوشمند اولیه را در سامانه فعال می‌سازد.</li>
        </ul>
      </div>
    `,
    markdownContent: `### صفحه ۲۳: چرخه یکپارچگی داده‌ها (Data Synergy Loop) و کمیسیون نهایی جذب
#### ۱. چرخه پنج‌مرحله‌ای هم‌افزایی داده‌ها:
۱. **جذب به شایستگی:** ورود نمرات گزینش به شناسنامه اولیه پرسنلی.
۲. **شایستگی به عملکرد:** آزمودن مهارت‌ها در مأموریت‌های واقعی پلیس.
۳. **عملکرد به پاداش و مسکن:** اثر مستقیم در فیش حقوقی و رتبه نوبت مسکن.
۴. **عملکرد به جانشین‌پروری و انتقالات:** انتخاب کاندیداهای فرماندهی و غربالگری EWS.
۵. **انتقالات به آمایش GIS:** به‌روزرسانی برخط درصد پرشدگی چارت ۳۱ استان.

#### ۲. آیین‌نامه کمیسیون نهایی گزینش:
برگزاری جلسه نهایی، صدور کد یکتای پرسنلی و صدور الکترونیک امریه اعزام.`
  },

  // PAGE 24
  {
    pageNumber: 24,
    messageNumber: 7,
    chapterId: 'synergy',
    chapterTitle: 'فصل هفتم: چرخه هم‌افزایی داده‌ها، کمیسیون نهایی و جمع‌بندی',
    pageTitle: 'ماتریس امنیت و سطوح دسترسی، و افق ۱۴۱۰ سامانه معیار',
    pageSubtitle: 'استانداردهای پدافند غیرعامل، کنترل دسترسی RBAC و سند چشم‌انداز پلیس هوشمند',
    contentHtml: `
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۱. معماری امنیت، محرمانگی و پدافند غیرعامل</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          با توجه به حساسیت اطلاعات پرسنلی و نظامی نیروهای مسلح، سامane معیار بر پایه استانداردهای سخت‌گیرانه پدافند غیرعامل توسعه یافته است:
        </p>
        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700">
          <li><strong>رمزنگاری پایانه‌به‌پایانه (End-to-End Encryption):</strong> رمزگذاری پایگاه داده‌ها بر پایه پروتکل‌های بومی امنیتی.</li>
          <li><strong>کنترل دسترسی مبتنی بر نقش (RBAC):</strong> پرسنل صرفاً به داده‌های خود، ارزیاب به حوزه مأموریتی خود و فرمانده به رده‌های تابعه دسترسی دارند.</li>
          <li><strong>ثبت کامل لاگ‌های امنیتی (Audit Trails):</strong> ضبط غیرقابل‌تغییر هرگونه مشاهده، تغییر یا چاپ اطلاعات با ثبت IP، زمان و کد کاربری.</li>
        </ul>

        <h3 class="text-sm font-black text-slate-900 border-r-4 border-emerald-800 pr-2">۲. سند چشم‌انداز و افق ۱۴۱۰ فراجا در مدیریت سرمایه انسانی</h3>
        <p class="text-xs text-slate-700 leading-relaxed text-justify">
          در افق ۱۴۱۰، سامانه معیار فراجا به یک سامانه هوش مصنوعی پیش‌بینانه تبدیل خواهد شد که قادر است:
        </p>
        <ol class="list-decimal list-inside space-y-1 text-xs text-slate-700">
          <li>نقاط بحرانی وقوع جرائم را ۳ ماه قبل پیش‌بینی نموده و نیروهای متخصص را پیشاپیش بازآرایی نماید.</li>
          <li>مسیر ارتقاء هر مأمور را از روز استخدام به صورت شخصی‌سازی‌شده هدایت کند.</li>
          <li>رضایت همگانی شهروندان از عملکرد پلیس را به بالاترین سطح در منطقه برساند.</li>
        </ol>

        <div class="mt-6 pt-4 border-t-2 border-slate-900 flex justify-between items-end text-xs text-slate-800">
          <div>
            <p class="font-bold">معاونت نیروی انسانی فراجا</p>
            <p class="text-[11px] text-slate-600 mt-1">اداره کل تحول و تعالی سازمانی</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-10 border border-dashed border-slate-400 rounded flex items-center justify-center text-[10px] text-slate-500 font-serif">
              [مهر ستاد کل فراجا]
            </div>
          </div>
          <div class="text-left">
            <p class="font-bold font-mono">شماره ثبت: ۳۲۰-۱۴۰۵-م</p>
            <p class="text-[11px] text-slate-600 mt-1">شهریور ماه ۱۴۰۵</p>
          </div>
        </div>
      </div>
    `,
    markdownContent: `### صفحه ۲۴: ماتریس امنیت و سطوح دسترسی، و افق ۱۴۱۰ سامانه معیار
#### ۱. امنیت و پدافند غیرعامل:
رمزنگاری پایگاه داده‌ها، کنترل دسترسی سخت‌گیرانه مبتنی بر نقش (RBAC)، ثبت لاگ غیرقابل‌تغییر فعالیت‌ها.

#### ۲. افق ۱۴۱۰ فراجا در مدیریت هوشمند سرمایه انسانی:
پیش‌بینی الگوریتمی بحران‌های امنیتی، چینش هوشمند کادر در جغرافیا و تحقق بالاترین سطح عدالت و رضایت‌مندی.

**تاییدیه نهایی:** معاونت نیروی انسانی ستاد کل فراجا - نسخه ۳.۲.۰ نهایی.`
  }
];

export const FULL_COMBINED_MARKDOWN = `# سند راهنما و شناسنامه جامع ۲۴ صفحه‌ای سامانه معیار فراجا (System Walkthrough & Specification)

**عنوان سند:** شناسنامه جامع کاربری، راهنمای گام‌به‌گام (Walkthrough)، آیین‌نامه‌های اجرایی و پروتکل تولید پیام‌به‌پیام هوش مصنوعی سامانه معیار فراجا  
**سازمان متبوع:** ستاد کل نیروهای مسلح - فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)  
**معاونت مجری:** معاونت نیروی انسانی - اداره کل تحول، تعالی سازمانی و ارزیابی شایستگی  
**نسخه سند:** ۳.۲.۰ نهایی جامع  
**حجم متنی مستند:** ۲۴ صفحه رسمی ستاد کل (تفکیک‌شده در ۷ بسته پیام)  
**تاریخ نگارش:** شهریور ۱۴۰۵  

---

## جدول تفکیک ۲۴ صفحه در ۷ پیام هوش مصنوعی Gemini:
${WALKTHROUGH_PAGES_META.map(item => `- **پیام ${item.message} (${item.chapter})**: صفحات ${item.pages} (${item.count} صفحه) | دستور ارسالی: \`${item.trigger}\``).join('\n')}

---

## مسترپرامپت مهندسی‌شده سیستمی Gemini:
\`\`\`text
${MASTER_GEMINI_PROMPT}
\`\`\`

---

${FARAJA_FULL_24_PAGES.map(page => `## [صفحه ${page.pageNumber} از ۲۴] ${page.chapterTitle}\n### ${page.pageTitle}\n*${page.pageSubtitle}*\n\n${page.markdownContent}\n\n---`).join('\n\n')}
`;
