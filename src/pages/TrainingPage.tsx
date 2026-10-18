import React, { useState, useMemo } from 'react';
import {
  PlayCircle,
  BookOpen,
  Headphones,
  Clock,
  Star,
  CheckCircle2,
  Search,
  Filter,
  Users,
  Target,
  BarChart as BarChartIcon,
  Award,
  BookOpenCheck,
  CheckSquare,
  ShieldAlert,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  SlidersHorizontal,
  Bookmark,
  Eye,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRole } from '../context/RoleContext';
import { QuizModal } from '../components/QuizModal';
import { ReferCourseModal } from '../components/ReferCourseModal';
import { PerformanceTrainingRecommendations } from '../components/PerformanceTrainingRecommendations';
import { CourseDetailModal, DetailedCourse } from '../components/training/CourseDetailModal';
import { FARAJA_COURSES_DATA } from '../data/farajaTrainingCoursesData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type TrainingTab = 'video' | 'text' | 'audio' | 'remediation' | 'analytics';

const TEAM_TRAINING_DATA = [
  { name: 'کلانتری ۱۰۳ گاندی', تکمیل: 88, درحال: 8, انجام_نشده: 4 },
  { name: 'کلانتری ۱۲۴ قلهک', تکمیل: 74, درحال: 18, انجام_نشده: 8 },
  { name: 'کلانتری ۱۴۵ ونک', تکمیل: 91, درحال: 5, انجام_نشده: 4 },
  { name: 'پلیس راهور منطقه ۳', تکمیل: 80, درحال: 14, انجام_نشده: 6 },
];

export function TrainingPage() {
  const { role } = useRole();
  const isManagerOrEvaluator = role === 'manager' || role === 'evaluator';

  // Manager perspective toggle
  const [managerMode, setManagerMode] = useState<'my_courses' | 'team_oversight'>('my_courses');

  // Main Category Tab
  const [activeTab, setActiveTab] = useState<TrainingTab>('video');

  // Dynamic Courses State
  const [courses, setCourses] = useState<DetailedCourse[]>(FARAJA_COURSES_DATA);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  // Interactive Detail Modal
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<DetailedCourse | null>(null);

  // Quiz Modal
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizCourseTitle, setQuizCourseTitle] = useState('');

  // Manager Refer Modal
  const [referModalCourse, setReferModalCourse] = useState<{ id: number; name: string } | null>(null);
  const [referredCourses, setReferredCourses] = useState<number[]>([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Stats calculation
  const completedCount = useMemo(() => courses.filter((c) => c.status === 'completed').length, [courses]);
  const inProgressCount = useMemo(() => courses.filter((c) => c.status === 'in_progress').length, [courses]);
  const totalPointsEarned = useMemo(
    () => courses.filter((c) => c.status === 'completed').reduce((acc, c) => acc + c.pointsNum, 0),
    [courses]
  );

  // Filtering for active tab
  const tabCourses = useMemo(() => {
    if (activeTab === 'remediation' || activeTab === 'analytics') return [];
    return courses.filter((c) => c.category === activeTab);
  }, [courses, activeTab]);

  const departments = useMemo(() => {
    const set = new Set(tabCourses.map((c) => c.department));
    return ['all', ...Array.from(set)];
  }, [tabCourses]);

  const filteredCourses = useMemo(() => {
    return tabCourses.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = selectedStatusFilter === 'all' || course.status === selectedStatusFilter;
      const matchDept = selectedDeptFilter === 'all' || course.department === selectedDeptFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [tabCourses, searchTerm, selectedStatusFilter, selectedDeptFilter]);

  // Handle Complete Course
  const handleCompleteCourse = (courseId: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: 'completed', progress: 100 } : c))
    );
    if (selectedCourseForDetail?.id === courseId) {
      setSelectedCourseForDetail((prev) => (prev ? { ...prev, status: 'completed', progress: 100 } : null));
    }
  };

  // Handle Open Quiz
  const handleOpenQuiz = (title: string) => {
    setQuizCourseTitle(title);
    setIsQuizOpen(true);
  };

  // Manager refer confirm
  const handleConfirmRefer = (employeeIds: number[]) => {
    if (!referModalCourse) return;
    setReferredCourses((prev) => [...prev, referModalCourse.id]);
    showToast(`دوره «${referModalCourse.name}» با موفقیت به ${employeeIds.length} نفر از کارکنان زیرمجموعه ارجاع گردید.`);
    setReferModalCourse(null);
  };

  return (
    <div className="space-y-6 text-right animate-in fade-in duration-300" dir="rtl">
      {/* Dynamic Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 md:left-auto md:right-8 md:w-[460px] bg-slate-900 text-white rounded-2xl shadow-2xl p-4 z-60 flex items-center gap-3 border border-slate-700"
          >
            <div className="w-9 h-9 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black block">عملیات موفق</span>
              <span className="text-xs text-slate-300 font-medium leading-relaxed mt-0.5">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Mode Toggle */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 md:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                سامانه آموزش و توسعه فردی فراجا
              </span>
              <span className="text-xs text-slate-500 font-bold">
                مرکز آموزش‌های تخصصی و مهارتی پلیس
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-slate-900 mt-2">
              یادگیری مهارت‌محور، متصل به کارنامه عملکرد و ارتقای شایستگی شغلی
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1 max-w-3xl leading-relaxed">
              محتواها به تفکیک ساختار قالب آموزشی (ویدیویی، متنی و صوتی) دسته‌بندی شده‌اند. برای مشاهده سرفصل‌ها و شروع تمرین، روی هر دوره کلیک کنید.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0 flex-wrap">
            <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-emerald-800 font-bold block">دوره‌های گذرانده</span>
              <span className="text-sm font-black text-emerald-700">{completedCount} دوره</span>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-indigo-800 font-bold block">امتیاز رفاهی مکتسبه</span>
              <span className="text-sm font-black text-indigo-700">{totalPointsEarned} امتیاز</span>
            </div>

            {/* Manager Perspective Toggle */}
            {isManagerOrEvaluator && (
              <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
                <button
                  onClick={() => setManagerMode('my_courses')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    managerMode === 'my_courses'
                      ? 'bg-white text-slate-900 font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  آموزش‌های من
                </button>
                <button
                  onClick={() => setManagerMode('team_oversight')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    managerMode === 'team_oversight'
                      ? 'bg-indigo-600 text-white font-black shadow-2xs'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  نظارت و ارجاع پرسنل
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MANAGER OVERSIGHT VIEW */}
      {isManagerOrEvaluator && managerMode === 'team_oversight' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl shadow-2xs border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold">سرانه آموزش یگان (ساعت)</span>
                <div className="text-2xl font-black text-slate-900 mt-1">۴۶.۵ ساعت</div>
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xs border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold">کارکنان نیازمند آموزش جبرانی</span>
                <div className="text-2xl font-black text-amber-600 mt-1">۹ نفر</div>
              </div>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xs border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold">تحقق برنامه آموزشی کلانتری</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">۸۸٪</div>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-2xs border border-slate-200 p-6 space-y-4">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-indigo-600" />
                وضعیت پیشرفت دوره‌های آموزشی در رده‌های زیرمجموعه
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TEAM_TRAINING_DATA} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="تکمیل" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="درحال" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="انجام_نشده" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xs border border-slate-200 p-6 space-y-4">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                دوره‌های اولویت‌دار جهت ارجاع به کارکنان کلانتری
              </h3>
              <div className="space-y-3">
                {[
                  { id: 1, name: 'فنون گشت‌زنی خودرویی و واکنش سریع ۱۱۰', target: 'رفع تاخیر رسیدن به صحنه (۷ نفر از ماموران گشت)' },
                  { id: 2, name: 'اصول ارتباط بدون خشونت و مدیریت تنش با شهروندان', target: 'بهبود شاخص رضایت مراجعین (۱۱ نفر)' },
                  { id: 3, name: 'کتابچه استاندارد نگارش صورتجلسه قضایی بدون نقص', target: 'کاهش موارد نقص پرونده در دادیاری (۶ نفر)' },
                  { id: 4, name: 'شیوه‌نامه صیانت از اسناد طبقه‌بندی‌شده و حفاظت اطلاعات', target: 'ارتقای چک‌لیست امنیتی (۵ نفر)' },
                ].map((item) => {
                  const isReferred = referredCourses.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{item.name}</h4>
                        <p className="text-[11px] text-indigo-700 font-bold mt-0.5">{item.target}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (isReferred) {
                            showToast(`دوره «${item.name}» قبلاً ارجاع شده است.`);
                          } else {
                            setReferModalCourse({ id: item.id, name: item.name });
                          }
                        }}
                        className={`text-xs font-black px-3.5 py-2 rounded-xl transition cursor-pointer shrink-0 ${
                          isReferred
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                        }`}
                      >
                        {isReferred ? 'ارجاع داده شد' : 'ارجاع به پرسنل'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PERSONAL LEARNING VIEW (TAB-BY-TAB SEPARATION) */
        <div className="space-y-6">
          {/* Main Format Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200 p-2 shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              <button
                onClick={() => {
                  setActiveTab('video');
                  setSelectedDeptFilter('all');
                }}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <PlayCircle className="w-4 h-4 shrink-0" />
                <span>۱. آموزش‌های ویدیویی</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${activeTab === 'video' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {courses.filter((c) => c.category === 'video').length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('text');
                  setSelectedDeptFilter('all');
                }}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>۲. آموزش‌های متنی</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${activeTab === 'text' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {courses.filter((c) => c.category === 'text').length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('audio');
                  setSelectedDeptFilter('all');
                }}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'audio'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Headphones className="w-4 h-4 shrink-0" />
                <span>۳. آموزش‌های صوتی</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${activeTab === 'audio' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {courses.filter((c) => c.category === 'audio').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('remediation')}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'remediation'
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-300'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Target className="w-4 h-4 shrink-0" />
                <span>جبران عملکرد (پیشنهاد هوش)</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpenCheck className="w-4 h-4 shrink-0" />
                <span>کارنامه و آزمون‌ها</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT 1, 2, 3: MEDIA FORMATS (CONCISE CARDS + CLICK TO EXPAND) */}
          {(activeTab === 'video' || activeTab === 'text' || activeTab === 'audio') && (
            <div className="space-y-4">
              {/* Search & Department Filters Bar */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 flex-1 scrollbar-none">
                  {/* Status Filters */}
                  <button
                    onClick={() => setSelectedStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      selectedStatusFilter === 'all'
                        ? 'bg-slate-900 text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    همه ({tabCourses.length})
                  </button>
                  <button
                    onClick={() => setSelectedStatusFilter('in_progress')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      selectedStatusFilter === 'in_progress'
                        ? 'bg-indigo-600 text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    در حال گذراندن ({tabCourses.filter((c) => c.status === 'in_progress').length})
                  </button>
                  <button
                    onClick={() => setSelectedStatusFilter('completed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      selectedStatusFilter === 'completed'
                        ? 'bg-emerald-600 text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    تکمیل‌شده ({tabCourses.filter((c) => c.status === 'completed').length})
                  </button>
                  <button
                    onClick={() => setSelectedStatusFilter('not_started')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      selectedStatusFilter === 'not_started'
                        ? 'bg-amber-600 text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    شروع‌نشده ({tabCourses.filter((c) => c.status === 'not_started').length})
                  </button>

                  {/* Department select */}
                  {departments.length > 2 && (
                    <select
                      value={selectedDeptFilter}
                      onChange={(e) => setSelectedDeptFilter(e.target.value)}
                      className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none"
                    >
                      <option value="all">همه رده‌ها/معاونت‌ها</option>
                      {departments.filter((d) => d !== 'all').map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64 shrink-0">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="جستجو در این بخش..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Concise Cards Grid */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-14 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold space-y-2">
                  <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                  <p>دوره‌ای با شرایط انتخاب‌شده در این تب یافت نشد.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCourses.map((course) => {
                    const isCompleted = course.status === 'completed';
                    const isInProgress = course.status === 'in_progress';

                    return (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourseForDetail(course)}
                        className={`bg-white rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between group shadow-2xs hover:shadow-md cursor-pointer ${
                          isCompleted
                            ? 'border-emerald-200/90 hover:border-emerald-400'
                            : isInProgress
                            ? 'border-indigo-200/90 hover:border-indigo-400'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {/* Card Top: Badges */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border flex items-center gap-1 ${
                              course.category === 'video'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : course.category === 'text'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {course.category === 'video' && <PlayCircle className="w-3 h-3" />}
                              {course.category === 'text' && <FileText className="w-3 h-3" />}
                              {course.category === 'audio' && <Headphones className="w-3 h-3" />}
                              <span>
                                {course.category === 'video' && 'ویدئو آموزشی'}
                                {course.category === 'text' && 'متن و شیوه‌نامه'}
                                {course.category === 'audio' && 'پادکست صوتی'}
                              </span>
                            </span>

                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : isInProgress
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {isCompleted && 'تکمیل شده'}
                              {isInProgress && 'در حال گذراندن'}
                              {!isCompleted && !isInProgress && 'شروع نشده'}
                            </span>
                          </div>

                          {/* Department & Title */}
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">
                              {course.department}
                            </span>
                            <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mt-0.5 line-clamp-1">
                              {course.title}
                            </h3>
                          </div>

                          {/* Concise Teaser */}
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            {course.shortDesc}
                          </p>
                        </div>

                        {/* Card Bottom Meta & Button */}
                        <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                            <div className="flex items-center gap-1 text-amber-700 font-black bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>{course.points}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                              <Clock className="w-3 h-3" />
                              <span>{course.time}</span>
                            </div>
                          </div>

                          {/* Progress bar if started */}
                          {course.progress > 0 && (
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCourseForDetail(course);
                            }}
                            className={`w-full py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                              isCompleted
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                : isInProgress
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isCompleted ? 'مرور مجدد و یادداشت‌ها' : 'مشاهده جزئیات و شروع'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT 4: REMEDIATION COURSES (AI DRIVEN FROM PERFORMANCE GAPS) */}
          {activeTab === 'remediation' && (
            <div className="space-y-4">
              <PerformanceTrainingRecommendations
                onStartCourse={(c) => {
                  showToast(`دوره جبرانی «${c.title}» فعال گردید.`);
                }}
                showToast={showToast}
              />
            </div>
          )}

          {/* TAB CONTENT 5: ANALYTICS & SKILLS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-indigo-600" />
                    کارنامه پیشرفت مهارتی و آزمون‌های گذرانده‌شده
                  </h3>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    معدل قبولی آزمون‌ها: ۹۲٪
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-bold block">مجموع ساعات آموزش گذرانده</span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">۴۲ ساعت</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-bold block">تعداد آزمون‌های قبول‌شده</span>
                    <span className="text-xl font-black text-emerald-600 mt-1 block">۷ آزمون</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-bold block">گواهی‌نامه‌های الکترونیکی صادرشده</span>
                    <span className="text-xl font-black text-indigo-600 mt-1 block">۵ گواهی</span>
                  </div>
                </div>

                {/* Exam logs */}
                <div className="pt-4 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800">ریز آزمون‌های اخیر:</h4>
                  {[
                    { title: 'آزمون مهارتی قانون به‌کارگیری سلاح و حقوق ضابطین', date: '۱۴۰۵/۰۲/۱۲', score: 95, status: 'قبول - نمره عالی' },
                    { title: 'کوییز تخصصی مهارت‌های ارتباط بدون خشونت و آرام‌سازی', date: '۱۴۰۵/۰۲/۰۱', score: 88, status: 'قبول' },
                    { title: 'سنجش درک مطلب شیوه‌نامه صیانت از اسناد محرمانه', date: '۱۴۰۴/۱۲/۲۰', score: 92, status: 'قبول' },
                  ].map((exam, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-black text-slate-900">{exam.title}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">تاریخ ثبت: {exam.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-700">{exam.score} از ۱۰۰</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-lg border border-emerald-300">
                          {exam.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course Detail Modal (Interactive Player, Reader, Syllabus, KPI impact) */}
      <CourseDetailModal
        course={selectedCourseForDetail}
        isOpen={!!selectedCourseForDetail}
        onClose={() => setSelectedCourseForDetail(null)}
        onComplete={handleCompleteCourse}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        courseTitle={quizCourseTitle}
        onComplete={(score, passed) => {
          setIsQuizOpen(false);
          if (passed) {
            showToast(`تبریک! با نمره ${score} در آزمون «${quizCourseTitle}» قبول شدید و امتیاز ثبت شد.`);
          }
        }}
      />

      {/* Manager Refer Modal */}
      <ReferCourseModal
        isOpen={!!referModalCourse}
        onClose={() => setReferModalCourse(null)}
        courseTitle={referModalCourse?.name || ''}
        onConfirm={handleConfirmRefer}
      />
    </div>
  );
}
