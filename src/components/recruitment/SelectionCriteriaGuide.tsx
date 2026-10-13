import React from 'react';
import { 
  Shield, 
  HeartPulse, 
  Award, 
  BookOpen, 
  UserCheck, 
  CheckCircle2, 
  Scale,
  FileText
} from 'lucide-react';

export function SelectionCriteriaGuide() {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 border border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-black">
            مجموعه ضوابط، مقررات و معیارهای جذب و گزینش نیروی انتظامی (فراجا)
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          مستند به مواد ۱۶ الی ۲۰ قانون استخدام فرماندهی انتظامی و مصوبات ستاد کل نیروهای مسلح پیرامون احراز صلاحیت‌های عمومی، تخصصی، جسمانی و امنیتی.
        </p>
      </div>

      {/* Grid of 4 Criteria Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Pillar 1: General & Faith criteria */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-indigo-900">
            <span className="p-2 bg-indigo-50 rounded-xl">
              <Shield className="w-4 h-4 text-indigo-700" />
            </span>
            <h4 className="text-sm font-black">۱. شرایط عمومی و اعتقادی (ماده ۱۶ قانون استخدام)</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>اعتقاد و التزام عملی به دین مبین اسلام و قانون اساسی جمهوری اسلامی ایران.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>التزام عملی به ولایت مطلقه فقیه و آمادگی فداکاری در راه تحقق اهداف نظام.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>تابعیت جمهوری اسلامی ایران (عدم سابقه تابعیت مضاعف داوطلب و خانواده درجه یک).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>عدم عضویت یا هواداری از احزاب و گروه‌های سیاسی غیرقانونی.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>نداشتن سوء پیشینه کیفری موثر و تایید سلامت اخلاقی در تحقیقات محلی و حفاظت اطلاعات.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Physical & Medical Standards */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-900">
            <span className="p-2 bg-rose-50 rounded-xl">
              <HeartPulse className="w-4 h-4 text-rose-700" />
            </span>
            <h4 className="text-sm font-black">۲. ضوابط بهداری کل فراجا و استانداردهای جسمانی</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>قد و وزن:</strong> حداقل قد ۱۷۰ سانتی‌متر برای آقایان و ۱۶۵ سانتی‌متر برای بانوان؛ شاخص BMI بین ۱۸.۵ الی ۲۸.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>بینایی و دید رنگ:</strong> دید ۱۰/۱۰ بدون عینک برای رده‌های عملیاتی؛ فقدان کامل کوررنگی در تست ایشی‌هارا.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>سلامت اسکلتی:</strong> عدم وجود پای پرانتزی حاد (بیش از فاصله ۲ انگشت)، انحراف ستون فقرات و جای عمل جراحی دیسک.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>روانپزشکی و سلامت روان:</strong> احراز ثبات هیجانی، فقدان لکنت زبان، کنترل خشم و کسب نمره استاندارد در تست MMPI.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Educational and Rank limits */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-blue-900">
            <span className="p-2 bg-blue-50 rounded-xl">
              <BookOpen className="w-4 h-4 text-blue-700" />
            </span>
            <h4 className="text-sm font-black">۳. مقاطع تحصیلی و شرایط سنی پذیرش</h4>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="font-black text-slate-900 block">درجه‌داری پیمانی (۵ ساله):</span>
              <span className="text-slate-600">مدرک دیپلم کامل (کلیه رشته‌ها)، حداقل معدل ۱۴، سن بین ۱۸ تا ۲۵ سال (با سابقه نظام وظیفه تا ۲۷ سال).</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="font-black text-slate-900 block">افسری دانش‌آموخته:</span>
              <span className="text-slate-600">کارشناسی و بالاتر رشته‌های مورد نیاز (حقوق، کامپیوتر، برق، روانشناسی)، حداکثر سن ۲۶ سال (کارشناسی) و ۲۸ سال (ارشد).</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="font-black text-slate-900 block">دانشگاه علوم انتظامی امین:</span>
              <span className="text-slate-600">پذیرش از طریق کنکور سراسری یا آزمون اختصاصی فراجا، تعهد خدمت ۳۰ ساله و آموزش شبانه‌روزی ۴ ساله.</span>
            </div>
          </div>
        </div>

        {/* Pillar 4: Quotas and Legal Advantages */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-900">
            <span className="p-2 bg-amber-50 rounded-xl">
              <Award className="w-4 h-4 text-amber-700" />
            </span>
            <h4 className="text-sm font-black">۴. سهمیه‌ها و امتیازات ویژه اولویت‌دار</h4>
          </div>
          <div className="space-y-2 text-xs text-slate-700 leading-relaxed font-medium">
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-black text-[10px] shrink-0 mt-0.5">ایثارگران</span>
              <span>فرزندان شهدا، جانبازان و آزادگان از شرط معدل و آزمون ورودی طبق ماده ۲۱ قانون جامع ایثارگران معاف می‌باشند.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-black text-[10px] shrink-0 mt-0.5">قرآنی</span>
              <span>حافظان کل یا اجزای قرآن کریم از امتیاز تشویقی تا ۱۵٪ در تراز آزمون و اولویت انتخاب رده برخوردارند.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black text-[10px] shrink-0 mt-0.5">بسیج و پلیس افتخاری</span>
              <span>دارندگان سابقه بسیج فعال یا اعضای پلیس افتخاری در مصاحبه عقیدتی و امتیازات نهایی ارجحیت دارند.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-black text-[10px] shrink-0 mt-0.5">بومی‌گزینی</span>
              <span>داوطلبان بومی استان‌های مرزی (سیستان و بلوچستان، کردستان، خوزستان و...) دارای ضریب ترجیحی ۲۵٪ در پذیرش هستند.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
