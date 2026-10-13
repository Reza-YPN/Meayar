import { X, FileText, Download, CheckCircle2, XCircle, FileQuestion } from "lucide-react";
import { cn } from "../lib/utils";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  onNeedMoreDocs: () => void;
}

export function RequestDetailsModal({ isOpen, onClose, request, onNeedMoreDocs }: RequestDetailsModalProps) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">شرح درخواست</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
          
          {/* Employee Info Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Profile" 
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800">{request.applicant}</h4>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[10px] font-bold">
                    ممتاز در شاخص نتیجه‌ای
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  فرماندهی تهران بزرگ - کلانتری ۱۰۳ گاندی
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-center md:text-right">
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">نمره:</div>
                <div className="font-black text-slate-800">۱۲۵</div>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">نتیجه فصل قبل:</div>
                <div className="font-bold text-emerald-600 flex items-center justify-center gap-1">
                  +۵۰٪
                </div>
              </div>
            </div>
          </div>

          {/* Request Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 mb-1">عنوان درخواست:</p>
              <p className="font-bold text-slate-800">{request.type}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">شماره درخواست:</p>
              <p className="font-mono font-medium text-slate-800">{request.id}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">واحد:</p>
              <p className="font-medium text-slate-800">{request.hrUnit}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">تاریخ ثبت:</p>
              <p className="font-medium text-slate-800">{request.date}</p>
            </div>
          </div>

          <div>
            <p className="text-slate-500 mb-2 text-sm">توضیحات تکمیلی درخواست:</p>
            <p className="text-slate-800 bg-slate-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-100">
              {request.description}
            </p>
          </div>

          {/* Attachments */}
          <div>
            <p className="text-slate-500 mb-3 text-sm">مستندات پیوست:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PDF Document */}
              <div className="border border-slate-200 rounded-xl p-3 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="text-xs font-medium text-slate-700 truncate" title="تصویر تجویز دکتر.pdf">
                      تصویر تجویز دکتر.pdf
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-100 text-red-600 rounded">PDF</span>
                </div>
                <div className="bg-slate-100 rounded-lg flex-1 mb-3 flex items-center justify-center p-2 h-32 overflow-hidden">
                  <div className="w-full h-full bg-white shadow-sm border border-slate-200 text-[6px] p-2 overflow-hidden text-slate-300 opacity-50">
                    <div className="h-2 bg-slate-300 rounded w-3/4 mb-1"></div>
                    <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
                    <div className="h-1 bg-slate-200 rounded w-5/6 mb-1"></div>
                    <div className="h-1 bg-slate-200 rounded w-full mb-1"></div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-colors">
                  <Download className="w-4 h-4" />
                  دانلود فایل
                </button>
              </div>

              {/* PNG Image */}
              <div className="border border-slate-200 rounded-xl p-3 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="text-xs font-medium text-slate-700 truncate" title="تصویر تجویز دکتر.png">
                      تصویر تجویز دکتر.png
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">PNG</span>
                </div>
                <div className="bg-slate-100 rounded-lg flex-1 mb-3 flex items-center justify-center h-32 overflow-hidden">
                   <div className="w-full h-full bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                      <span className="text-slate-300 font-bold text-2xl px-4 py-2 border-4 border-slate-200 rounded-lg transform rotate-[-15deg] opacity-40">دکتر</span>
                   </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-colors">
                  <Download className="w-4 h-4" />
                  دانلود عکس
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            تایید درخواست
          </button>
          <button className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
            <XCircle className="w-5 h-5" />
            رد درخواست
          </button>
          <button 
            onClick={onNeedMoreDocs}
            className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <FileQuestion className="w-5 h-5" />
            نیازمند مستندات بیشتر
          </button>
        </div>
      </div>
    </div>
  );
}
