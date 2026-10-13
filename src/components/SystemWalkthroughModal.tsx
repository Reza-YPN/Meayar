import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Users, 
  Award, 
  Compass, 
  Shield, 
  Sparkles, 
  FileText, 
  Bot,
  MapPin,
  ListOrdered,
  FileCheck,
  ChevronLeft
} from 'lucide-react';
import { 
  FARAJA_FULL_24_PAGES, 
  WALKTHROUGH_PAGES_META, 
  MASTER_GEMINI_PROMPT, 
  FULL_COMBINED_MARKDOWN,
  WalkthroughPageItem
} from '../data/farajaFullWalkthroughPages';
import { generateWalkthroughPrintableHtml } from '../utils/generateWalkthroughPrintableHtml';

interface SystemWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemWalkthroughModal: React.FC<SystemWalkthroughModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeChapter, setActiveChapter] = useState<'all' | 'pages_plan' | 'gemini_protocol' | 'intro' | 'employee' | 'evaluator' | 'manager' | 'gis' | 'synergy'>('all');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter pages for view
  const visiblePages = activeChapter === 'all'
    ? FARAJA_FULL_24_PAGES
    : activeChapter === 'pages_plan' || activeChapter === 'gemini_protocol'
    ? []
    : FARAJA_FULL_24_PAGES.filter(p => p.chapterId === activeChapter);

  // Robust printing mechanism: Dedicated Clean Printable Iframe ensuring 100% of all 24 pages print
  const handlePrint = (chapterId?: string) => {
    setIsPrinting(true);

    try {
      let printFrame = document.getElementById('faraja-print-frame') as HTMLIFrameElement;
      if (!printFrame) {
        printFrame = document.createElement('iframe');
        printFrame.id = 'faraja-print-frame';
        printFrame.style.position = 'fixed';
        printFrame.style.right = '-9999px';
        printFrame.style.bottom = '-9999px';
        printFrame.style.width = '1024px';
        printFrame.style.height = '768px';
        printFrame.style.border = 'none';
        document.body.appendChild(printFrame);
      }

      const doc = printFrame.contentWindow?.document || printFrame.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generateWalkthroughPrintableHtml(chapterId || 'all'));
        doc.close();

        setTimeout(() => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
            setIsPrinting(false);
          } catch (iframeErr) {
            console.warn('Iframe print fallback to window print', iframeErr);
            window.print();
            setIsPrinting(false);
          }
        }, 600);
      } else {
        window.print();
        setIsPrinting(false);
      }
    } catch (err) {
      console.error('Print error:', err);
      window.print();
      setIsPrinting(false);
    }
  };

  // Standalone Printable Document Download (HTML / PDF) - ALL 24 PAGES
  const handleDownloadFullPrintableHtml = () => {
    const htmlContent = generateWalkthroughPrintableHtml('all');
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'FARAJA_SYSTEM_WALKTHROUGH_FULL_24_PAGES.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopiedNotification('فایل کامل و ۲۴ صفحه‌ای سند معیار با موفقیت دانلود شد. با باز کردن این فایل، می‌توانید به صورت مستقیم با Ctrl+P به عنوان PDF کامل با صفحه‌بندی استاندارد A4 ذخیره فرمایید.');
    setTimeout(() => setCopiedNotification(null), 7000);
  };

  // Download only the active chapter if selected
  const handleDownloadActiveChapterHtml = () => {
    const targetChapter = activeChapter === 'all' ? 'all' : activeChapter;
    const htmlContent = generateWalkthroughPrintableHtml(targetChapter);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FARAJA_WALKTHROUGH_${targetChapter.toUpperCase()}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopiedNotification(`فایل بخش «${targetChapter}» دانلود شد.`);
    setTimeout(() => setCopiedNotification(null), 5000);
  };

  const handleCopyForGemini = () => {
    navigator.clipboard.writeText(FULL_COMBINED_MARKDOWN);
    setCopiedNotification('متن کامل سند ۲۴ صفحه‌ای و مسترپرامپت پیام‌به‌پیام در حافظه کپی شد! اکنون می‌توانید آن را در چت جمنای قرار دهید.');
    setTimeout(() => setCopiedNotification(null), 5000);
  };

  const handleCopySinglePrompt = (promptText: string, label: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedNotification(`دستور «${label}» در حافظه کپی شد. اکنون می‌توانید آن را به جمنای بفرستید.`);
    setTimeout(() => setCopiedNotification(null), 4000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([FULL_COMBINED_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'FARAJA_SYSTEM_WALKTHROUGH_GUIDE.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopiedNotification('فایل کامل ۲۴ صفحه‌ای مارک‌داون (.md) با تمام پیام‌ها و جداول دانلود شد.');
    setTimeout(() => setCopiedNotification(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      <div 
        id="walkthrough-printable-document"
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:shadow-none print:border-none print:rounded-none print:overflow-visible print:w-full"
      >
        
        {/* Modal Top Header (Screen Only) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-4 shrink-0 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-white">
                  سند راهنما و شناسنامه جامع ۲۴ صفحه‌ای سامانه معیار فراجا
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  نسخه ۳.۲.۰ نهایی ستاد کل
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                شامل کلیه ۲۴ صفحه اداری تفکیک‌شده در ۷ پیام مجزا برای هوش مصنوعی Gemini و چاپ مستقیم PDF
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handlePrint('all')}
              disabled={isPrinting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="چاپ مستقیم و ذخیره PDF کل ۲۴ صفحه سند با صفحه‌بندی منظم"
            >
              <Printer className="w-4 h-4" />
              <span>{isPrinting ? 'در حال آماده‌سازی PDF...' : 'چاپ مستقیم / ذخیره PDF (کل ۲۴ صفحه)'}</span>
            </button>

            <button
              onClick={handleDownloadFullPrintableHtml}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="دانلود فایل HTML/PDF مستقل شامل کل ۲۴ صفحه و کلیه فصول"
            >
              <Download className="w-4 h-4" />
              <span>دانلود کل ۲۴ صفحه (PDF / HTML)</span>
            </button>

            {activeChapter !== 'all' && activeChapter !== 'pages_plan' && activeChapter !== 'gemini_protocol' && (
              <button
                onClick={handleDownloadActiveChapterHtml}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                title="دانلود فقط فصل جاری"
              >
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>دانلود همین فصل</span>
              </button>
            )}

            <button
              onClick={handleCopyForGemini}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="کپی مسترپرامپت و کل متن ۲۴ صفحه‌ای برای جمنای"
            >
              <Bot className="w-4 h-4" />
              <span>کپی مسترپرامپت جمنای</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 cursor-pointer"
              title="دانلود فایل مارک‌داون (.md) کل ۲۴ صفحه"
            >
              <FileText className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-xs bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white transition-colors border border-slate-700 mr-1 cursor-pointer"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copy / Action Notification Toast */}
        {copiedNotification && (
          <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between px-6 print:hidden">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{copiedNotification}</span>
            </div>
            <button 
              onClick={() => setCopiedNotification(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
            >
              بستن
            </button>
          </div>
        )}

        {/* Chapter Selection Bar (Screen Only) */}
        <div className="px-4 sm:px-6 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 print:hidden text-xs">
          {[
            { id: 'all', label: 'نمای کامل سند (کل ۲۴ صفحه و چاپ PDF)', icon: FileText },
            { id: 'pages_plan', label: 'طرح تفکیک ۲۴ صفحه', icon: ListOrdered },
            { id: 'gemini_protocol', label: 'پروتکل پیام‌به‌پیام جمنای', icon: Bot },
            { id: 'intro', label: '۱. معماری کلان (ص ۱-۲)', icon: Layers },
            { id: 'employee', label: '۲. سطح پرسنل و کادر (ص ۳-۱۱)', icon: Users },
            { id: 'evaluator', label: '۳. سطح ارزیاب شایستگی (ص ۱۲-۱۷)', icon: Award },
            { id: 'manager', label: '۴. سطح فرماندهی (ص ۱۸-۲۰)', icon: Compass },
            { id: 'gis', label: '۵. سامانه تحلیل جغرافیایی GIS (ص ۲۱-۲۲)', icon: MapPin },
            { id: 'synergy', label: '۶. چرخه هم‌افزایی داده‌ها (ص ۲۳-۲۴)', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeChapter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChapter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Document Body (Scrollable Screen, Fully Expanded on Print) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 text-slate-800 leading-relaxed font-sans print:p-0 print:overflow-visible print:h-auto">
          
          {/* Official Letterhead (Always Printed) */}
          <div className="border-b-2 border-slate-900 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#081d11] text-amber-400 border-2 border-amber-400/40 flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-950">
                  فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)
                </h1>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  ستاد کل فراجا - معاونت نیروی انسانی | سامانه جامع «معیار»
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  شماره سند: فراجا/معیار/۱۴۰۵/۳۲۰-ن | سطح دسترسی: سازمانی اداری | نسخه نهایی ۳.۲.۰ جامع
                </p>
              </div>
            </div>

            <div className="text-left text-xs text-slate-600 space-y-1">
              <div>تاریخ صدور: <span className="font-bold font-mono">شهریور ۱۴۰۵</span></div>
              <div>حجم سند: <span className="font-bold text-emerald-800">۲۴ صفحه رسمی مصوب</span></div>
              <div>پوشش: <span className="font-bold">۳۱ استان و کلیه رسته‌ها</span></div>
            </div>
          </div>

          {/* User Information Alert */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start gap-3 print:hidden">
            <Bot className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 leading-relaxed space-y-1">
              <strong>راهنمای خروجی جامع و استفاده پیام‌به‌پیام در جمنای:</strong>
              <p>
                تمامی <strong>۲۴ صفحه اداری</strong> سند با متن کامل، آیین‌نامه‌ها، جداول ضرایب، فرمول‌های ریاضی و سناریوهای کاربری در این سند درج شده‌اند. با کلیک بر روی <strong>«چاپ مستقیم / ذخیره PDF (کل ۲۴ صفحه)»</strong> یا <strong>«دانلود کل ۲۴ صفحه (PDF / HTML)»</strong>، یک خروجی بدون نقص با استاندارد A4 دریافت خواهید کرد. همچنین فایل مارک‌داون را می‌توانید مستقیماً در جمنای آپلود نمایید.
              </p>
            </div>
          </div>

          {/* SECTION: 24 PAGES PLAN */}
          {(activeChapter === 'all' || activeChapter === 'pages_plan') && (
            <section className="space-y-4 pt-2 border-b border-slate-200 pb-6 avoid-break-inside">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                  طرح
                </span>
                <h3 className="text-base font-black text-slate-900">
                  جدول ساختار مستندات و تفکیک صفحات متنی (۲۴ صفحه اداری در ۷ بسته پیام)
                </h3>
              </div>
              <p className="text-xs text-slate-700">
                جهت تولید دقیق و تضمین عدم قطع شدن پاسخ در هوش مصنوعی Gemini، محتوای سند در ۷ بخش متوالی طبق جدول زیر سازماندهی شده است:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold">
                      <th className="p-2 border border-slate-300">شماره پیام</th>
                      <th className="p-2 border border-slate-300">سرفصل و موضوع محتوایی</th>
                      <th className="p-2 border border-slate-300">تعداد صفحات</th>
                      <th className="p-2 border border-slate-300">دستور ارسالی کاربر به جمنای (Trigger Prompt)</th>
                      <th className="p-2 border border-slate-300 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {WALKTHROUGH_PAGES_META.map(item => (
                      <tr key={item.message}>
                        <td className="p-2 border border-slate-300 font-bold font-mono">پیام {item.message}</td>
                        <td className="p-2 border border-slate-300">{item.chapter}</td>
                        <td className="p-2 border border-slate-300 font-bold text-emerald-800">صفحات {item.pages} ({item.count} صفحه)</td>
                        <td className="p-2 border border-slate-300 font-mono text-[11px]">{item.trigger}</td>
                        <td className="p-2 border border-slate-300 text-center">
                          <button 
                            onClick={() => handleCopySinglePrompt(item.trigger, `پیام ${item.message}`)}
                            className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold cursor-pointer"
                          >
                            کپی دستور
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-100 font-black text-slate-950">
                      <td colSpan={2} className="p-2 border border-slate-300 text-center">مجموع حجم صفحات متنی مصوب سامانه معیار فراجا</td>
                      <td className="p-2 border border-slate-300 font-bold text-emerald-900">۲۴ صفحه رسمی</td>
                      <td colSpan={2} className="p-2 border border-slate-300 text-slate-600">قابل چاپ یا دانلود یکپارچه</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* SECTION: GEMINI PROTOCOL */}
          {(activeChapter === 'all' || activeChapter === 'gemini_protocol') && (
            <section className="space-y-4 pt-2 border-b border-slate-200 pb-6 avoid-break-inside">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-800 text-white text-xs font-bold flex items-center justify-center font-mono">
                  AI
                </span>
                <h3 className="text-base font-black text-slate-900">
                  پروتکل اجرایی و مسترپرامپت هوش مصنوعی Gemini (دریافت پیام‌به‌پیام)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                این مسترپرامپت را در چت Gemini همراه با فایل متنی آپلود کنید تا هوش مصنوعی نقش مشاور ارشد تحول سرمایه انسانی فراجا را بر عهده بگیرد:
              </p>

              <div className="relative p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800">
                <button
                  onClick={handleCopyForGemini}
                  className="absolute left-3 top-3 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-sans font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  کپی مسترپرامپت
                </button>
                <pre className="whitespace-pre-wrap font-sans text-slate-200 text-xs leading-relaxed pr-1 pt-1">
                  {MASTER_GEMINI_PROMPT}
                </pre>
              </div>
            </section>
          )}

          {/* RENDER PAGES CARDS */}
          {visiblePages.length > 0 && (
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>صفحات مستند ({visiblePages.length} صفحه در این بخش)</span>
                </h3>
                <span className="text-xs text-slate-500">
                  فرمت استاندارد A4 - آماده چاپ و خروجی مستقیم
                </span>
              </div>

              {visiblePages.map(page => (
                <div 
                  key={page.pageNumber} 
                  id={`screen-page-${page.pageNumber}`}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white text-xs font-bold flex items-center justify-center font-mono shrink-0">
                        {page.pageNumber}
                      </span>
                      <div>
                        <span className="text-[11px] text-emerald-800 font-bold block">{page.chapterTitle}</span>
                        <h4 className="text-sm font-black text-slate-900">{page.pageTitle}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        پیام شماره {page.messageNumber}
                      </span>
                      <button
                        onClick={() => handleCopySinglePrompt(page.markdownContent, `صفحه ${page.pageNumber}`)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="کپی محتوای این صفحه برای جمنای"
                      >
                        <Copy className="w-3 h-3" />
                        <span>کپی صفحه</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 italic font-medium">
                    {page.pageSubtitle}
                  </p>

                  <div 
                    className="text-xs text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: page.contentHtml }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer Note (Print & Screen) */}
          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
            سامانه جامع مدیریت عملکرد، شایستگی و آمایش سرزمینی سرمایه انسانی فراجا (معیار) | ستاد کل فراجا - تمامی حقوق محفوظ است.
          </div>

        </div>

      </div>
    </div>
  );
};
