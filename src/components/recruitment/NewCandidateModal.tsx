import React, { useState } from 'react';
import { 
  Candidate, 
  CandidateRank, 
  TargetUnit, 
  SelectionStage 
} from '../../data/recruitmentData';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';

interface NewCandidateModalProps {
  onClose: () => void;
  onAddCandidate: (candidate: Candidate) => void;
}

export function NewCandidateModal({ onClose, onAddCandidate }: NewCandidateModalProps) {
  const [fullName, setFullName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState<number>(21);
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [rankTarget, setRankTarget] = useState<CandidateRank>('درجه‌داری پیمانی');
  const [targetUnit, setTargetUnit] = useState<TargetUnit>('فرماندهی مرزبانی');
  const [education, setEducation] = useState('دیپلم ریاضی');
  const [gpa, setGpa] = useState<number>(17.5);
  const [height, setHeight] = useState<number>(180);
  const [weight, setWeight] = useState<number>(75);
  const [selectedQuotas, setSelectedQuotas] = useState<string[]>(['بسیج فعال']);

  const quotaOptions = [
    'فرزند ایثارگر / شهید',
    'حافظ قرآن کریم',
    'بسیج فعال',
    'پلیس افتخاری',
    'قهرمان ورزشی کشوری',
    'بومی مناطق مرزی درجه یک'
  ];

  const handleToggleQuota = (quota: string) => {
    setSelectedQuotas(prev => 
      prev.includes(quota) ? prev.filter(q => q !== quota) : [...prev, quota]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !nationalCode.trim()) {
      alert('لطفاً نام و کدملی داوطلب را وارد فرمایید.');
      return;
    }

    const calculatedBmi = Number((weight / ((height / 100) * (height / 100))).toFixed(1));
    const trackingCode = `GOZ-1404-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      trackingCode,
      fullName,
      nationalCode,
      fatherName,
      birthDate: '۱۳۸۳/۰۶/۱۵',
      age,
      province,
      city,
      rankTarget,
      targetUnit,
      education,
      gpa,
      height,
      weight,
      bmi: calculatedBmi,
      quotas: selectedQuotas,
      currentStage: 'ثبت‌نام و بررسی مدارک',
      status: 'در حال بررسی',
      scores: {
        scientificExam: 75,
        sportsExam: 82,
        interviewScore: 80,
        psychologicalScore: 84,
        overallScore: 80.2,
      },
      medicalReport: {
        generalStatus: 'سالم و بلامانع',
        vision: '۱۰/۱۰ کامل',
        colorBlindness: 'سالم',
        items: [
          { name: 'چشم‌پزشکی و دید', doctor: 'دکتر ابراهیمی', status: 'تایید' },
          { name: 'ارتوپدی و ساختار بدنی', doctor: 'دکتر نامداری', status: 'تایید' },
          { name: 'روانپزشکی', doctor: 'دکتر شمس', status: 'تایید' }
        ]
      },
      sportsReport: [
        { testName: 'دو ۳۲۰۰ متر', record: '۱۳ دقیقه', score: 82, status: 'قبول' },
        { testName: 'شنای سوئدی', record: '۵۵ حرکت', score: 84, status: 'قبول' }
      ],
      interviewReport: {
        ideologicalScore: 80,
        psychologicalFitness: 'مطلوب',
        evaluatorNotes: 'ثبت پرونده اولیه متقاضی جدید توسط کارشناس گزینش.'
      },
      securityClearance: {
        status: 'در دست استعلام',
        localInvestigation: 'در دست اقدام',
        inquiryDate: '۱۴۰۴/۱۰/۲۰'
      }
    };

    onAddCandidate(newCandidate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" dir="rtl">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-700" />
            <h4 className="text-base font-black text-slate-900">
              ثبت داوطلب جدید در سامانه گزینش فراجا
            </h4>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-black text-slate-700 block mb-1">نام و نام خانوادگی *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="مثال: علی صادقی"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="font-black text-slate-700 block mb-1">کد ملی داوطلب *</label>
              <input
                type="text"
                required
                value={nationalCode}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="۱۰ رقمی"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-black text-slate-700 block mb-1">نام پدر</label>
              <input
                type="text"
                value={fatherName}
                onChange={e => setFatherName(e.target.value)}
                placeholder="مثال: حسین"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="font-black text-slate-700 block mb-1">سن (سال)</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="font-black text-slate-700 block mb-1">معدل تحصیلی</label>
              <input
                type="number"
                step="0.1"
                value={gpa}
                onChange={e => setGpa(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-black text-slate-700 block mb-1">مقطع استخدامی هدف</label>
              <select
                value={rankTarget}
                onChange={e => setRankTarget(e.target.value as CandidateRank)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
              >
                <option value="درجه‌داری پیمانی">درجه‌داری پیمانی (۵ ساله)</option>
                <option value="دانشجوی دانشگاه امین">دانشجوی دانشگاه علوم انتظامی امین</option>
                <option value="افسری دانش‌آموخته">افسری دانش‌آموخته تخصصی</option>
                <option value="بانوان (دانشکده کوثر)">بانوان (دانشکده پلیس کوثر)</option>
              </select>
            </div>
            <div>
              <label className="font-black text-slate-700 block mb-1">رده خدمتی اولویت‌دار</label>
              <select
                value={targetUnit}
                onChange={e => setTargetUnit(e.target.value as TargetUnit)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
              >
                <option value="فرماندهی مرزبانی">فرماندهی مرزبانی</option>
                <option value="پلیس پیشگیری (کلانتری و پاسگاه‌ها)">پلیس پیشگیری (کلانتری و پاسگاه‌ها)</option>
                <option value="یگان ویژه">یگان ویژه</option>
                <option value="پلیس آگاهی">پلیس آگاهی</option>
                <option value="پلیس راهور">پلیس راهور</option>
                <option value="پلیس فتا">پلیس فتا</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-black text-slate-700 block mb-1">استان بومی</label>
              <input
                type="text"
                value={province}
                onChange={e => setProvince(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="font-black text-slate-700 block mb-1">قد (سانتی‌متر)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="font-black text-slate-700 block mb-1">وزن (کیلوگرم)</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          {/* Quotas checklist */}
          <div>
            <label className="font-black text-slate-700 block mb-2">سهمیه‌ها و امتیازات ویژه:</label>
            <div className="grid grid-cols-2 gap-2">
              {quotaOptions.map((q, idx) => (
                <label key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={selectedQuotas.includes(q)}
                    onChange={() => handleToggleQuota(q)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-[11px] font-bold text-slate-700">{q}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-black transition cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl font-black transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              تشکیل پرونده و ثبت اولیه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
