import * as React from "react";
import { AlertTriangle, RefreshCw, Home, Trash2 } from "lucide-react";
import { clearBrowserCacheAndRecover, autoRecoverIfCrashingRepeatedly } from "../utils/recovery";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled runtime crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleManualRecovery = () => {
    clearBrowserCacheAndRecover();
  };

  private handleResetState = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.replace("/home");
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8"
          dir="rtl"
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-8 space-y-6">
            
            {/* Header / Icon */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center shadow-inner animate-bounce">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-black text-slate-800">
                  بروز خطای غیرمنتظره در سیستم
                </h2>
                <p className="text-sm text-slate-500">
                  متأسفانه سامانه معیار با خطای زمان اجرا روبرو شد. وضعیت برنامه به حالت امن منتقل گردید.
                </p>
              </div>
            </div>

            {/* Error Details */}
            {this.state.error && (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span>جزئیات خطا (جهت گزارش به پشتیبانی):</span>
                </div>
                <div className="font-mono text-xs text-rose-700 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50 overflow-x-auto text-left whitespace-pre-wrap leading-relaxed" dir="ltr">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && (
                    <div className="mt-2 text-slate-500 border-t border-rose-200/50 pt-2 text-[10px]">
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analysis & Instructions */}
            <div className="bg-amber-50/60 border-r-4 border-amber-500 p-4 rounded-l-xl text-xs text-slate-700 leading-relaxed font-medium">
              <strong className="block mb-1 text-slate-800">راهنمای بازنشانی و رفع مشکل:</strong>
              شما می‌توانید با استفاده از کلیدهای زیر، حافظه موقت (کش) برنامه را پاک کرده و برنامه را در حالت پایدار اولیه بارگذاری کنید. این اقدام داده‌های اصلی شما را تحت تاثیر قرار نمی‌دهد.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                onClick={this.handleManualRecovery}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Trash2 className="w-4 h-4 text-slate-500" />
                <span>پاکسازی کامل کش و بارگذاری مجدد</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md shadow-indigo-100"
              >
                <Home className="w-4 h-4" />
                <span>هدایت به صفحه اصلی</span>
              </button>
            </div>

            {/* Secondary Option */}
            <div className="text-center pt-2">
              <button
                onClick={() => window.location.reload()}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1.5 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تلاش مجدد برای بارگذاری صفحه فعلی</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
