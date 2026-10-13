import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, BookOpen, Star, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "اولین اقدام در مواجهه با یک صحنه جرم چیست؟",
    options: ["دستگیری متهم", "حفظ صحنه و جلوگیری از ورود افراد غیرمجاز", "تماس با اورژانس", "تهیه گزارش کتبی"],
    correct: 1,
  },
  {
    id: 2,
    text: "در مذاکره با فرد گروگان‌گیر، مهم‌ترین عامل چیست؟",
    options: ["تطمیع فرد", "تهدید فرد", "حفظ خونسردی و ایجاد ارتباط موثر", "پاسخ به خواسته‌های فرد"],
    correct: 2,
  },
  {
    id: 3,
    text: "کدام مورد از اصول گزارش‌نویسی انتظامی نمی‌باشد؟",
    options: ["صحت و دقت", "خلاصه نویسی مفرط", "خوانایی", "بی‌طرفی"],
    correct: 1,
  },
  {
    id: 4,
    text: "بهترین روش برای کنترل خشم مراجعین در کلانتری چیست؟",
    options: ["برخورد متقابل", "گوش دادن فعال و همدلی", "بی‌توجهی", "دستور به سکوت"],
    correct: 1,
  },
  {
    id: 5,
    text: "در قانون به‌کارگیری سلاح، اولویت با کدام مورد است؟",
    options: ["شلیک به پا", "شلیک هوایی", "شلیک به بالاتنه", "استفاده از اسپری"],
    correct: 1,
  }
];

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  onComplete: (score: number, passed: boolean) => void;
}

export function QuizModal({ isOpen, onClose, courseTitle, onComplete }: QuizModalProps) {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result' | 'feedback'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleSelectOption = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optIdx }));
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return correct;
  };

  const score = calculateScore();
  const passed = score >= 3; // 3 out of 5

  const renderIntro = () => (
    <div className="p-8 w-full flex flex-col items-center text-center" dir="rtl">
      <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-[#4a55a2] mb-6">
        <BookOpen className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-extrabold text-slate-800 mb-2">مشخصات آزمون</h2>
      <p className="text-slate-500 text-xs mb-6 font-medium">لطفاً پیش از شروع آزمون، به مشخصات زیر دقت نمایید:</p>
      
      <div className="w-full space-y-3.5 mb-8 text-right bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
          <span className="text-slate-600 text-xs font-bold">عنوان آموزش:</span>
          <span className="font-extrabold text-slate-800 text-xs">{courseTitle}</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
          <span className="text-slate-600 text-xs font-bold">تعداد سوالات:</span>
          <span className="font-extrabold text-slate-800 text-xs font-mono">{QUIZ_QUESTIONS.length} سوال</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
          <span className="text-slate-600 text-xs font-bold">حد نصاب قبولی:</span>
          <span className="font-extrabold text-slate-800 text-xs font-mono">۳ سوال</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600 text-xs font-bold">مدت زمان مجاز:</span>
          <span className="font-extrabold text-slate-800 text-xs font-mono">۱۰ دقیقه</span>
        </div>
      </div>
      
      <div className="w-full flex gap-3">
        <button 
          onClick={onClose} 
          className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
        >
          انصراف
        </button>
        <button 
          onClick={handleStart} 
          className="flex-1 bg-[#4a55a2] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
        >
          شروع آزمون
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const q = QUIZ_QUESTIONS[currentQuestion];
    const isAnswered = answers[currentQuestion] !== undefined;

    return (
      <div className="p-8 w-full flex flex-col" dir="rtl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">سوال {currentQuestion + 1} از {QUIZ_QUESTIONS.length}</h2>
          <div className="text-sm font-mono text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
            زمان: ۰۹:۵۹
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-base font-bold text-slate-800 mb-4 leading-relaxed">{q.text}</h3>
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const selected = answers[currentQuestion] === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selected 
                    ? 'border-indigo-600 bg-indigo-50/50' 
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`text-sm font-medium ${selected ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {opt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4" /> قبلی
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1"
          >
            {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'پایان آزمون' : 'بعدی'} <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="p-8 w-full flex flex-col items-center text-center" dir="rtl">
      {passed ? (
        <div className="w-20 h-20 bg-[#69b736] rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      ) : (
        <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-rose-200">
          <span className="text-4xl font-bold">!</span>
        </div>
      )}
      
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        {passed ? 'تبریک، با موفقیت آزمون را گذراندید!' : 'متاسفانه در آزمون نمره کافی را کسب نکردید!'}
      </h2>
      <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-sm">
        {passed 
          ? 'نتیجه آزمون شما با موفقیت ثبت شد.' 
          : 'می‌توانید دوباره در این آموزش شرکت کرده و آزمون را تکرار کنید.'}
      </p>
      
      <div className="w-full space-y-4 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600 text-sm font-bold">تعداد سوالات درست:</span>
          <span className="font-bold text-emerald-600">{score}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600 text-sm font-bold">تعداد سوالات نادرست:</span>
          <span className="font-bold text-rose-600">{QUIZ_QUESTIONS.length - score}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-slate-600 text-sm font-bold">نمره نهایی:</span>
          <span className={`font-black text-lg ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {(score / QUIZ_QUESTIONS.length) * 100}٪
          </span>
        </div>
      </div>
      
      <div className="w-full flex gap-3">
        {!passed && (
          <button 
            onClick={() => setStep('intro')} 
            className="flex-1 bg-white border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            تلاش مجدد
          </button>
        )}
        <button 
          onClick={() => passed ? setStep('feedback') : onClose()} 
          className="flex-1 bg-[#4a55a2] text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          {passed ? 'نظرسنجی آزمون' : 'بستن'}
        </button>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="p-10 w-full flex flex-col items-center text-center" dir="rtl">
      <h2 className="text-xl font-bold text-slate-800 mb-2 mt-4">میزان رضایت از آموزش</h2>
      <p className="text-slate-600 text-sm mb-8">
        به محتوای آموزش و اثر گذاری آن چه امتیازی می‌دهید؟
      </p>
      
      <div className="flex items-center justify-center gap-3 mb-12 flex-row-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star}
            onClick={() => setRating(star)}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <Star 
              className={`w-10 h-10 transition-colors ${
                star <= rating 
                ? 'fill-amber-400 text-amber-400' 
                : 'text-slate-300 group-hover:text-slate-400'
              }`} 
            />
            <span className="text-slate-800 font-bold font-sans">{[5,4,3,2,1][star-1]}</span>
          </button>
        ))}
      </div>
      
      <div className="w-full flex gap-3">
        <button 
          onClick={() => {
            onComplete(score, passed);
          }} 
          className="flex-1 bg-[#4a55a2] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          ثبت و پایان
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative flex flex-col items-center min-h-[400px]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {step === 'intro' && renderIntro()}
        {step === 'quiz' && renderQuiz()}
        {step === 'result' && renderResult()}
        {step === 'feedback' && renderFeedback()}
      </motion.div>
    </div>
  );
}
