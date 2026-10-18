import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Clock,
  Star,
  CheckCircle2,
  BookOpen,
  Award,
  Download,
  Share2,
  Volume2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield,
  Target,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Sliders,
  CheckSquare,
  Bookmark
} from 'lucide-react';

export interface DetailedCourse {
  id: number;
  title: string;
  category: 'video' | 'text' | 'audio';
  department: string;
  time: string;
  points: string;
  pointsNum: number;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  shortDesc: string;
  fullDesc: string;
  objectives: string[];
  kpiLink: string;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته و تاکتیکی';
  instructor?: string;
  // Specific media details
  chapters?: { id: number; title: string; duration: string; completed?: boolean }[];
  textPages?: { pageNumber: number; title: string; content: string }[];
  audioEpisodes?: { id: number; title: string; duration: string; speaker: string }[];
}

interface CourseDetailModalProps {
  course: DetailedCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (courseId: number) => void;
  onOpenQuiz: (courseTitle: string) => void;
}

export function CourseDetailModal({
  course,
  isOpen,
  onClose,
  onComplete,
  onOpenQuiz,
}: CourseDetailModalProps) {
  // Player and interactive states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'content' | 'syllabus' | 'kpi'>('content');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeChapter, setActiveChapter] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [playerProgress, setPlayerProgress] = useState(35);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastNote, setToastNote] = useState<string | null>(null);

  if (!isOpen || !course) return null;

  const showToast = (msg: string) => {
    setToastNote(msg);
    setTimeout(() => setToastNote(null), 3000);
  };

  const handleSpeedToggle = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto" dir="rtl">
      <AnimatePresence>
        {toastNote && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-60 bg-emerald-900 text-white px-4 py-2 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastNote}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border ${
              course.category === 'video'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30'
                : course.category === 'text'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
            }`}>
              {course.category === 'video' && '🎥 ویدیوی چندرسانه‌ای'}
              {course.category === 'text' && '📄 شیوه‌نامه و کتابچه متنی'}
              {course.category === 'audio' && '🎙️ پادکست تخصصی و صوتی'}
            </span>
            <span className="text-xs text-slate-300 font-bold hidden sm:inline">
              {course.department}
            </span>
            <span className="text-[11px] text-slate-400 border-r border-slate-700 pr-3 hidden md:inline">
              سطح: {course.level}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                showToast(!isBookmarked ? 'به نشان‌شده‌ها اضافه شد' : 'از نشان‌شده‌ها حذف شد');
              }}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isBookmarked ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
              title="نشان کردن دوره"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Course Title & Key Meta */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {course.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
              {course.shortDesc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{course.points}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.time}</span>
            </div>
          </div>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200 bg-white shrink-0 text-xs font-black">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'content'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {course.category === 'video' && 'نمایش و پخش ویدئو'}
            {course.category === 'text' && 'متن و مطالعه شیوه‌نامه'}
            {course.category === 'audio' && 'پخش پادکست و یادداشت‌ها'}
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'syllabus'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            سرفصل‌ها و اهداف یادگیری
          </button>
          <button
            onClick={() => setActiveTab('kpi')}
            className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'kpi'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            اثرگذاری بر کارنامه و KPI
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'content' && (
            <div className="space-y-4">
              {/* VIDEO PLAYER VIEW */}
              {course.category === 'video' && (
                <div className="space-y-4">
                  <div className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800 aspect-video flex flex-col justify-between p-4 group">
                    {/* Top video bar */}
                    <div className="flex items-center justify-between text-xs text-slate-300 font-bold z-10">
                      <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-slate-700">
                        فصل {activeChapter}: {course.chapters?.[activeChapter - 1]?.title || 'جلسه اصلی'}
                      </span>
                      <span className="bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded font-black">
                        کیفیت HD 1080p
                      </span>
                    </div>

                    {/* Middle Player Simulation */}
                    <div className="flex flex-col items-center justify-center my-auto z-10">
                      {isPlaying ? (
                        <div className="flex items-end gap-1.5 h-14">
                          <div className="w-1.5 bg-indigo-400 rounded-full h-8 animate-bounce"></div>
                          <div className="w-1.5 bg-cyan-400 rounded-full h-12 animate-bounce [animation-delay:0.15s]"></div>
                          <div className="w-1.5 bg-emerald-400 rounded-full h-14 animate-bounce [animation-delay:0.3s]"></div>
                          <div className="w-1.5 bg-indigo-300 rounded-full h-10 animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-1.5 bg-blue-400 rounded-full h-6 animate-bounce [animation-delay:0.25s]"></div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center text-white transition hover:scale-105 shadow-xl cursor-pointer"
                        >
                          <Play className="w-8 h-8 fill-white text-white ml-1" />
                        </button>
                      )}
                      <span className="text-xs text-slate-300 font-bold mt-3 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                        {isPlaying ? 'در حال پخش آموزش تصویری فراجا...' : 'برای شروع پخش کلیک کنید'}
                      </span>
                    </div>

                    {/* Bottom Controls */}
                    <div className="bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent p-3 -m-4 mt-0 pt-6 rounded-b-2xl z-10 space-y-2">
                      {/* Scrubber */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-mono">03:45</span>
                        <div
                          className="flex-1 h-2 bg-slate-800 rounded-full cursor-pointer relative"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                            setPlayerProgress(Math.min(100, Math.max(0, pct)));
                          }}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all"
                            style={{ width: `${playerProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{course.chapters?.[activeChapter - 1]?.duration || '15:00'}</span>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
                          >
                            {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                          </button>
                          <button
                            onClick={() => setPlayerProgress(Math.max(0, playerProgress - 10))}
                            className="p-1.5 text-slate-400 hover:text-white transition cursor-pointer"
                            title="۱۰ ثانیه قبل"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPlayerProgress(Math.min(100, playerProgress + 10))}
                            className="p-1.5 text-slate-400 hover:text-white transition cursor-pointer"
                            title="۱۰ ثانیه بعد"
                          >
                            <RotateCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleSpeedToggle}
                            className="px-2 py-1 rounded-md bg-slate-800 text-[10px] font-black hover:bg-slate-700 transition cursor-pointer"
                          >
                            {playbackSpeed}x
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Volume2 className="w-4 h-4" />
                          <span>صدا ۱۰۰٪</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters List */}
                  {course.chapters && course.chapters.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                      <h4 className="text-xs font-black text-slate-900 flex items-center justify-between">
                        <span>جلسات و فصول ویدئو ({course.chapters.length} فصل):</span>
                        <span className="text-[11px] text-slate-500 font-medium">فصل جاری: {activeChapter}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.chapters.map((ch) => (
                          <button
                            key={ch.id}
                            onClick={() => {
                              setActiveChapter(ch.id);
                              setPlayerProgress(0);
                              setIsPlaying(true);
                            }}
                            className={`p-3 rounded-xl border text-right transition flex items-center justify-between text-xs cursor-pointer ${
                              activeChapter === ch.id
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-black'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-mono shrink-0">
                                {ch.id}
                              </span>
                              <span className="truncate">{ch.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 shrink-0 font-mono mr-2">{ch.duration}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TEXT READER VIEW */}
              {course.category === 'text' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-black text-slate-900">
                          بخش {currentPage} از {course.textPages?.length || 3}: {course.textPages?.[currentPage - 1]?.title || 'متن استاندارد و ضوابط اجرایی'}
                        </span>
                      </div>
                      <button
                        onClick={() => showToast('فایل PDF دستورالعمل آماده دانلود شد')}
                        className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود PDF رسمی</span>
                      </button>
                    </div>

                    {/* Page Content */}
                    <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 font-medium">
                      <p>
                        {course.textPages?.[currentPage - 1]?.content || course.fullDesc}
                      </p>
                      <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3 text-xs text-amber-900 font-bold space-y-1">
                        <span className="block text-[11px] font-black text-amber-950">نکته الزام‌آور فرماندهی:</span>
                        <span>رعایت کلیه بندهای این شیوه‌نامه در حین انجام ماموریت و تنظیم صورتجلسات قضایی الزامی است و در ارزیابی دوره‌ای بازرسی یگانی ثبت می‌شود.</span>
                      </div>
                    </div>

                    {/* Page Navigation */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>صفحه قبل</span>
                      </button>

                      <span className="text-xs text-slate-500 font-bold font-mono">
                        {currentPage} / {course.textPages?.length || 3}
                      </span>

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(course.textPages?.length || 3, p + 1))}
                        disabled={currentPage === (course.textPages?.length || 3)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>صفحه بعد</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AUDIO PODCAST VIEW */}
              {course.category === 'audio' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-5 border border-amber-900/40">
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full font-black">
                        رادیو پلیس • پادکست تخصصی فراجا
                      </span>
                      <span className="text-slate-300 font-bold">
                        قسمت {activeEpisode} از {course.audioEpisodes?.length || 4}
                      </span>
                    </div>

                    <div className="text-center space-y-1.5 py-2">
                      <h3 className="text-base sm:text-lg font-black text-amber-200">
                        {course.audioEpisodes?.[activeEpisode - 1]?.title || course.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium">
                        گوینده / کارشناس: {course.audioEpisodes?.[activeEpisode - 1]?.speaker || course.instructor || 'اساتید دانشگاه علوم انتظامی امین'}
                      </p>
                    </div>

                    {/* Waveform graphic */}
                    <div className="h-16 flex items-center justify-center gap-1.5 px-4 bg-slate-950/60 rounded-2xl border border-white/10">
                      {[15, 30, 60, 45, 90, 75, 40, 80, 100, 65, 85, 50, 95, 70, 30, 55, 85, 40, 60, 20, 70, 90, 50, 35].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isPlaying
                              ? 'bg-amber-400 animate-pulse'
                              : 'bg-slate-600'
                          }`}
                          style={{
                            height: isPlaying ? `${Math.max(15, (h * playerProgress) / 70)}%` : `${h * 0.4}%`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Audio Controls */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-mono">05:20</span>
                        <div
                          className="flex-1 h-2 bg-slate-800 rounded-full cursor-pointer relative"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                            setPlayerProgress(Math.min(100, Math.max(0, pct)));
                          }}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                            style={{ width: `${playerProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">22:00</span>
                      </div>

                      <div className="flex items-center justify-center gap-4 pt-2">
                        <button
                          onClick={() => setPlayerProgress(Math.max(0, playerProgress - 15))}
                          className="p-2 text-slate-300 hover:text-white transition cursor-pointer"
                          title="۱۵ ثانیه قبل"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center hover:scale-105 transition shadow-lg cursor-pointer"
                        >
                          {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
                        </button>
                        <button
                          onClick={() => setPlayerProgress(Math.min(100, playerProgress + 15))}
                          className="p-2 text-slate-300 hover:text-white transition cursor-pointer"
                          title="۱۵ ثانیه بعد"
                        >
                          <RotateCw className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleSpeedToggle}
                          className="px-2 py-1 rounded-lg bg-white/10 text-xs font-mono font-bold hover:bg-white/20 transition cursor-pointer"
                        >
                          {playbackSpeed}x
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Episodes Selector */}
                  {course.audioEpisodes && course.audioEpisodes.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                      <h4 className="text-xs font-black text-slate-900">سایر قسمت‌های این پادکست:</h4>
                      <div className="space-y-1.5">
                        {course.audioEpisodes.map((ep) => (
                          <button
                            key={ep.id}
                            onClick={() => {
                              setActiveEpisode(ep.id);
                              setPlayerProgress(0);
                              setIsPlaying(true);
                            }}
                            className={`w-full p-2.5 rounded-xl border text-right transition flex items-center justify-between text-xs cursor-pointer ${
                              activeEpisode === ep.id
                                ? 'bg-amber-50 border-amber-300 text-amber-900 font-black'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-amber-200'
                            }`}
                          >
                            <span className="truncate">قسمت {ep.id}: {ep.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono shrink-0 mr-2">{ep.duration}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span>اهداف و دستاوردهای یادگیری این دوره:</span>
                </h4>
                <ul className="space-y-2 pr-2">
                  {course.objectives.map((obj, i) => (
                    <li key={i} className="text-xs text-slate-700 font-bold flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-xs">
                <h4 className="text-xs sm:text-sm font-black text-slate-900">شرح کامل و کاربرد میدانی دوره:</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {course.fullDesc}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'kpi' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 rounded-2xl p-5 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                    ترمیم مستقیم شاخص ارزیابی
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-emerald-950">
                    نحوه اثرگذاری بر کارنامه عملکرد فراجا
                  </h4>
                </div>

                <div className="bg-white/90 rounded-xl p-4 border border-emerald-200/90 space-y-2">
                  <span className="text-xs font-bold text-slate-500 block">شاخص و شایستگی هدف:</span>
                  <p className="text-xs sm:text-sm font-black text-slate-900">{course.kpiLink}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                    با به پایان رساندن کامل این محتوا و قبولی در کوییز ارزیابی (حداقل نمره ۷۰٪)، امتیاز شایستگی مربوطه به صورت خودکار در کارنامه فصلی آینده به‌روزرسانی شده و {course.points} به حساب حکمت شما افزوده خواهد شد.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 font-bold flex items-center gap-2">
            <span>وضعیت:</span>
            <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black ${
              course.status === 'completed'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : course.status === 'in_progress'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                : 'bg-slate-200 text-slate-700'
            }`}>
              {course.status === 'completed' && '✅ پایان‌یافته و ثبت در کارنامه'}
              {course.status === 'in_progress' && '⏳ در حال گذراندن'}
              {course.status === 'not_started' && 'شروع نشده'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => onOpenQuiz(course.title)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-black bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>شرکت در آزمون مهارتی (کوییز)</span>
            </button>

            <button
              onClick={() => {
                onComplete(course.id);
                showToast(`دوره «${course.title}» پایان یافت و امتیاز رفاهی ثبت شد.`);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>پایان آموزش و ثبت {course.points}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
