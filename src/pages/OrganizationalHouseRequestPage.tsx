import { useState } from "react";
import { ArrowRight, CheckCircle2, Circle, Download, Printer } from "lucide-react";
import { Link } from "react-router-dom";

interface House {
  id: number;
  name: string;
  location: string;
  area: number;
  rooms: number;
  floor: number;
  image: string;
}

const HOUSES: House[] = [
  {
    id: 1,
    name: "مجتمع مسکونی امین - ولنجک",
    location: "تهران، منطقه ۱، ولنجک",
    area: 105,
    rooms: 3,
    floor: 4,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  },
  {
    id: 2,
    name: "شهرک سازمانی غدیر - پاسداران",
    location: "تهران، منطقه ۴، پاسداران",
    area: 85,
    rooms: 2,
    floor: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    id: 3,
    name: "مجتمع مسکونی کوثر - تهرانپارس",
    location: "تهران، منطقه ۸، تهرانپارس",
    area: 95,
    rooms: 2,
    floor: 5,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  },
];

export function OrganizationalHouseRequestPage() {
  const [step, setStep] = useState(1);
  const [conditions, setConditions] = useState({
    noPreviousRequest: true,
    noPreviousResidence: false,
    tenYearsService: false,
    activeOfficer: false,
    married: false,
    noHomeLoanHistory: false,
    noPrivateHome: false,
  });
  const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);
  const [contractAccepted, setContractAccepted] = useState(false);

  const handleToggleCondition = (key: keyof typeof conditions) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllConditionsChecked = Object.values(conditions).every((val) => val);

  return (
    <div className="space-y-6">
      {/* Header with Progress Stepper */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <Link
            to="/service-desk"
            className="absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-800"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="w-full">
            <h2 className="text-xl font-bold text-slate-800 text-center flex items-center justify-center gap-2">
              درخواست خانه سازمانی
            </h2>

            {/* Stepper progress bar */}
            <div className="flex items-center justify-center w-full max-w-4xl mx-auto mt-8 relative">
              <div className="absolute top-[12px] left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
              
              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                <div className="relative flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {step > 1 ? "✓" : "۱"}
                  </div>
                </div>
                <span className={`text-xs font-bold ${step >= 1 ? 'text-indigo-600' : 'text-slate-500'}`}>۱. بررسی شرایط</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                <div className="relative flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {step > 2 ? "✓" : "۲"}
                  </div>
                </div>
                <span className={`text-xs font-bold ${step >= 2 ? 'text-indigo-600' : 'text-slate-500'}`}>۲. انتخاب مسکن</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                <div className="relative flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {step > 3 ? "✓" : "۳"}
                  </div>
                </div>
                <span className={`text-xs font-bold ${step >= 3 ? 'text-indigo-600' : 'text-slate-500'}`}>۳. قرارداد</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2 bg-white px-2">
                <div className="relative flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 4 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    ۴
                  </div>
                </div>
                <span className={`text-xs font-bold ${step >= 4 ? 'text-indigo-600' : 'text-slate-500'}`}>۴. ثبت نهایی</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on Step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Step 1: Review Conditions */}
        {step === 1 && (
          <>
            {/* Right: checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-6 text-right">
                  شرایط مورد نیاز جهت ثبت درخواست
                </h3>

                <div className="space-y-4">
                  {[
                    { key: "noPreviousRequest", label: "نداشتن سابقه درخواست منزل سازمانی" },
                    { key: "noPreviousResidence", label: "نداشتن سابقه سکونت در منزل سازمانی" },
                    { key: "tenYearsService", label: "خدمت بالای ده سال در سازمان" },
                    { key: "activeOfficer", label: "مشغول به خدمت به صورت پایور" },
                    { key: "married", label: "داشتن همسر" },
                    { key: "noHomeLoanHistory", label: "نداشتن سابقه دریافت وام مسکن" },
                    { key: "noPrivateHome", label: "نداشتن منزل شخصی به نام خود و یا همسر" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 cursor-pointer transition select-none"
                    >
                      <span className="text-sm font-semibold text-slate-700 text-right">
                        {item.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={conditions[item.key as keyof typeof conditions]}
                        onChange={() => handleToggleCondition(item.key as keyof typeof conditions)}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer ml-2"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#4455A5] hover:bg-indigo-700 text-white px-10 py-2.5 rounded-md text-sm font-medium transition flex items-center gap-2 shadow-sm"
                >
                  <span>مرحله بعدی</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>

            {/* Left: Image */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80"
                alt="منازل سازمانی"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}

        {/* Step 2: Select Housing */}
        {step === 2 && (
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-800 text-lg">
                انتخاب مسکن سازمانی مورد نظر
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                لطفاً یکی از مجتمع‌های مسکونی زیر را برای تخصیص انتخاب نمایید.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOUSES.map((house) => (
                <div
                  key={house.id}
                  onClick={() => setSelectedHouseId(house.id)}
                  className={`border-2 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col justify-between ${selectedHouseId === house.id ? 'border-indigo-600 ring-4 ring-indigo-50 bg-indigo-50/10' : 'border-slate-200 bg-white'}`}
                >
                  <div className="h-44 relative">
                    <img src={house.image} alt={house.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {house.area} متر مربع
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 text-sm">{house.name}</h4>
                      <p className="text-xs text-slate-500">{house.location}</p>
                      
                      <div className="grid grid-cols-3 gap-2 pt-3 text-center text-xs font-semibold text-slate-600">
                        <div className="bg-slate-100 rounded p-1.5">
                          <span className="block text-slate-400 text-[10px]">تعداد اتاق</span>
                          {house.rooms}
                        </div>
                        <div className="bg-slate-100 rounded p-1.5">
                          <span className="block text-slate-400 text-[10px]">طبقه</span>
                          {house.floor}
                        </div>
                        <div className="bg-slate-100 rounded p-1.5">
                          <span className="block text-slate-400 text-[10px]">متراژ</span>
                          {house.area}متر
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        className={`w-full py-2 rounded-lg text-xs font-bold transition ${selectedHouseId === house.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                      >
                        {selectedHouseId === house.id ? 'انتخاب شده' : 'انتخاب این واحد'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-2.5 rounded-md text-sm font-medium transition"
              >
                مرحله قبلی
              </button>
              <button
                disabled={selectedHouseId === null}
                onClick={() => setStep(3)}
                className={`px-10 py-2.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${selectedHouseId !== null ? 'bg-[#4455A5] hover:bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <span>مرحله بعدی</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contract */}
        {step === 3 && (
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">
                  قرارداد زیر را با دقت مطالعه کنید.
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  تایید مفاد قرارداد برای نهایی کردن درخواست الزامی است.
                </p>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-initial bg-[#4455A5] text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
                  <Download className="w-4 h-4" />
                  <span>دانلود قرارداد</span>
                </button>
                <button className="flex-1 md:flex-initial bg-[#4455A5] text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
                  <Printer className="w-4 h-4" />
                  <span>چاپ قرارداد</span>
                </button>
              </div>
            </div>

            {/* Contract PDF simulator text */}
            <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 max-h-96 overflow-y-auto text-slate-700 text-xs leading-loose text-justify space-y-4 font-sans shadow-inner" dir="rtl">
              <p className="font-bold text-slate-800 text-center text-sm mb-4">
                تعهدنامه و قرارداد تخصیص منزل مسکونی سازمانی فراجا
              </p>
              <p>
                <strong>ماده ۱ : طرفین قرارداد</strong><br />
                این قرارداد فی‌مابین فرماندهی انتظامی جمهوری اسلامی ایران (به نمایندگی کلانتری ۱۰۳ گاندی) از یک طرف و کارکنان متقاضی محترم به شرح مشخصات کاربری از طرف دیگر منعقد می‌گردد.
              </p>
              <p>
                <strong>تبصره ۱ :</strong> عدم وصول چک‌ها یا مطالبه مبلغ مندرج در بند ۱-۳ این مبایعه نامه از سوی فروشنده / فروشندگان تاثیری در صحت معامله ایجاد نخواهد کرد.
              </p>
              <p>
                <strong>تبصره ۲ :</strong> فروشنده متعهد می‌گردد مورد معامله را در تاریخ ذکر شده صحیح و سالم تخلیه کامل نموده و در قبال اخذ رسید کتبی به خریدار تحویل نماید.
              </p>
              <p>
                <strong>ماده ۴ : شرایط مربوط به تنظیم سند</strong><br />
                ۱-۴ طرفین متعهد هستند جهت تنظیم سند طبق قرارداد در تاریخ مقرر در دفتر اسناد رسمی شماره ۱۳ حضور یافته و نسبت به تشریفات قانونی اقدام نمایند. خریدار متعهد است در تاریخ فوق‌الذکر الباقی ثمن مورد معامله را نقداً آماده نموده و در قبال انتقال سند به فروشنده تسلیم نماید.
              </p>
              <p>
                <strong>ماده ۵ : شرایط تسلیم مورد معامله</strong><br />
                ۱-۵ فروشنده موظف است مورد معامله را با تمام توابع و ملحقات آن تسلیم خریدار کند و هر گونه موانع در استیفاء و بهره‌برداری کامل از مورد معامله را برطرف کند.
              </p>
              <p>
                ۲-۵ در صورتیکه معلوم گردد مورد معامله به جهت قوه قاهره قابلیت انتقال نداشته و یا با اقامه دعوی ابطال به طرفیت فروشنده مبایعه نامه باشد عقد باطل است و فروشنده موظف است ثمن دریافتی را به خریدار عودت نماید.
              </p>
              <p>
                ۳-۵ در صورتیکه معلوم گردد مورد معامله به هر علتی غیر از عامل قوه قاهره مانند رهن، مصادره، عملیات اجرایی دادگستری و یا اجرای اسناد رسمی، مستحق للغیر و غصبی بودن قانوناً قابل انتقال به خریدار نبوده فروشنده موظف است علاوه بر استرداد ثمن معامله معادل مبلغ خسارت تعیین شده را به عنوان خسارت به خریدار بپردازد.
              </p>
              <p>
                ۴-۵ کلیه هزینه‌های ناشی از تسلیم مورد معامله به عهده فروشنده است مگر اینکه به صورت دیگری توافق شده باشد.
              </p>
              <p>
                <strong>ماده ۶ : آثار قرارداد</strong><br />
                ۱-۶ این قرارداد فروشنده را از هرگونه انتقال مورد معامله به هر عنوان و دلیل به غیر از خریدار منع می‌کند. در صورت تخلف و انتقال به غیر، خریدار حق خواهد داشت درخواست فسخ قرارداد را نموده و یا با اقامه دعوی ابطال به طرفیت فروشنده و منتقل الیه، الزام فروشنده را به انتقال مورد معامله بخواهد.
              </p>
              <p>
                ۲-۶ فروشنده متعهد است قبلاً و یا حداکثر تا زمان مقرر برای تنظیم سند رسمی کلیه مجوزها و مدارک لازم از مراجع مختلف در خصوص مورد معامله از قبیل مفاصاحساب شهرداری، مالیاتی و غیره را اخذ نماید.
              </p>
              <p>
                ۳-۶ فروشنده مکلف است کلیه بدهی‌های احتمالی در خصوص توابع، اعیان، مستحدثات و امکانات موجود در معامله را حداکثر تا زمان تنظیم سند رسمی تسویه نماید.
              </p>
              <p>
                ۴-۶ هزینه انتقال اعم از دارایی، شهرداری و غیره به عهده فروشنده است و هزینه حق الثبت و حق التحریر به صورت مساوی می‌باشد.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
              <input
                type="checkbox"
                id="accept-contract"
                checked={contractAccepted}
                onChange={(e) => setContractAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="accept-contract" className="text-sm font-bold text-slate-800 cursor-pointer select-none">
                تمامی موارد فوق مورد تایید اینجانب می باشد.
              </label>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setStep(2)}
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-2.5 rounded-md text-sm font-medium transition"
              >
                مرحله قبلی
              </button>
              <button
                disabled={!contractAccepted}
                onClick={() => setStep(4)}
                className={`px-10 py-2.5 rounded-md text-sm font-medium transition ${contractAccepted ? 'bg-[#4455A5] hover:bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                مرحله بعدی
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Submit Success Screen */}
        {step === 4 && (
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-md">
              <CheckCircle2 className="w-14 h-14" />
            </div>
            
            <div className="space-y-2 max-w-lg">
              <h3 className="text-2xl font-black text-slate-800">
                درخواست شما ثبت شد.
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                در صفحه لیست درخواست‌ها می‌توانید درخواست خود را پیگیری کنید.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link
                to="/service-desk/requests"
                className="flex-1 bg-[#4455A5] hover:bg-indigo-700 text-white text-sm font-semibold py-3 px-6 rounded-lg transition shadow-sm text-center"
              >
                لیست درخواست‌ها
              </Link>
              <Link
                to="/service-desk"
                className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold py-3 px-6 rounded-lg transition text-center"
              >
                لیست خدمات قابل ارائه
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
