import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRole, Role } from '../context/RoleContext';
import {
  Truck,
  User,
  FileCheck,
  Shield,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Sliders,
  Send,
  ArrowLeftRight
} from 'lucide-react';
import {
  INITIAL_TRANSFER_APPLICATIONS,
  INITIAL_EARLY_WARNING_PERSONNEL,
  TransferApplication,
  EarlyWarningPersonnel
} from '../data/transfersData';
import { EmployeeTransferView } from '../components/transfers/EmployeeTransferView';
import { EvaluatorTransferView } from '../components/transfers/EvaluatorTransferView';
import { ManagerTransferDSSView } from '../components/transfers/ManagerTransferDSSView';

export function FarajaTransfersPage() {
  const { role } = useRole();
  const [searchParams] = useSearchParams();

  // Active view tab can follow current role or be manually toggled by user
  const [activeTabRole, setActiveTabRole] = useState<Role>(role);

  // Keep activeTabRole in sync when query param is present or when global role changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'employee' || tabParam === 'evaluator' || tabParam === 'manager') {
      setActiveTabRole(tabParam);
    } else {
      setActiveTabRole(role);
    }
  }, [role, searchParams]);

  // Persisted state for applications
  const [applications, setApplications] = useState<TransferApplication[]>(() => {
    const saved = localStorage.getItem('faraja_transfer_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing transfer applications', e);
      }
    }
    return INITIAL_TRANSFER_APPLICATIONS;
  });

  // Persisted state for Early Warning Personnel
  const [personnelEws, setPersonnelEws] = useState<EarlyWarningPersonnel[]>(() => {
    const saved = localStorage.getItem('faraja_transfer_ews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing ews personnel', e);
      }
    }
    return INITIAL_EARLY_WARNING_PERSONNEL;
  });

  useEffect(() => {
    localStorage.setItem('faraja_transfer_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('faraja_transfer_ews', JSON.stringify(personnelEws));
  }, [personnelEws]);

  // Submit new transfer from Employee view
  const handleCreateApplication = (
    newApp: Omit<TransferApplication, 'id' | 'trackingCode' | 'requestDate' | 'status' | 'riskScore' | 'riskLevel'>
  ) => {
    // Generate risk score based on document logic (Random Forest features)
    const riskScore = newApp.housingRequested ? 45 : 75;
    const riskLevel: 'high' | 'medium' | 'low' = riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low';
    const trackingCode = `TR-1404-${Math.floor(1000 + Math.random() * 9000)}`;

    const created: TransferApplication = {
      ...newApp,
      id: `tr-${Date.now()}`,
      trackingCode,
      requestDate: '۱۴۰۴/۱۰/۲۱',
      status: 'submitted',
      riskScore,
      riskLevel,
      recommendedPrescription: newApp.housingRequested
        ? `تخصیص سهمیه مسکن سازمانی در فرماندهی انتظامی ${newApp.targetProvince}`
        : `بررسی شرایط جابجایی در یگان‌های تابعه ${newApp.targetProvince}`
    };

    setApplications(prev => [created, ...prev]);
  };

  // Update application status & prescriptive recommendation by Evaluator
  const handleUpdateAppStatus = (
    appId: string,
    newStatus: TransferApplication['status'],
    prescription?: string
  ) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            recommendedPrescription: prescription || app.recommendedPrescription
          };
        }
        return app;
      })
    );
  };

  // Approve application by Commander / Commission
  const handleApproveApplication = (appId: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: 'commission_approved'
          };
        }
        return app;
      })
    );
  };

  // Update EWS status
  const handleUpdateEwsStatus = (
    personnelId: string,
    newStatus: EarlyWarningPersonnel['status']
  ) => {
    setPersonnelEws(prev =>
      prev.map(p => {
        if (p.personnelId === personnelId) {
          return {
            ...p,
            status: newStatus
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Top Header Card with Research Document Metadata */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                انتقالات هوشمند فراجا
              </span>
              <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-black px-2.5 py-0.5 rounded-lg">
                مرکز تحقیقات کاربردی معاونت نیروی انسانی (دی ماه ۱۴۰۴)
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">
              سامانه تحول نظام انتقالات: گذار از مدیریت واکنشی به تصمیم‌سازی هوشمند
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium max-w-4xl leading-relaxed">
              ارائه چارچوب تحلیلی پنج‌گانه برای بهینه‌سازی منابع انسانی، پیش‌بینی ریسک ترک خدمت و افزایش رضایت شغلی کارکنان غیور فراجا.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-2xl shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 font-bold block">پرونده‌های فعال</span>
              <span className="text-sm font-black text-indigo-700 font-mono">{applications.length}</span>
            </div>
            <div className="w-px h-7 bg-slate-200" />
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 font-bold block">هشدار EWS</span>
              <span className="text-sm font-black text-rose-600 font-mono">{personnelEws.filter(p => p.riskLevel === 'high').length}</span>
            </div>
            <div className="w-px h-7 bg-slate-200" />
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 font-bold block">دقت الگوریتم AUC</span>
              <span className="text-sm font-black text-emerald-600 font-mono">۸۵٪</span>
            </div>
          </div>
        </div>

        {/* Triple Role Tabs Switcher (کارمند، ارزیاب، مدیر) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTabRole('employee')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTabRole === 'employee'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-indigo-600" />
              <span>دیدگاه ۱: کارمند / متقاضی انتقال</span>
            </button>

            <button
              onClick={() => setActiveTabRole('evaluator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTabRole === 'evaluator'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck className="w-4 h-4 text-indigo-600" />
              <span>دیدگاه ۲: ارزیاب و کارشناس منابع انسانی</span>
            </button>

            <button
              onClick={() => setActiveTabRole('manager')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTabRole === 'manager'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>دیدگاه ۳: داشبورد تصمیم‌سازی DSS (فرماندهی)</span>
            </button>
          </div>

          <div className="text-[11px] font-bold text-slate-500">
            نقش فعال سیستمی شما: <strong className="text-indigo-700">{role === 'employee' ? 'کارمند' : role === 'evaluator' ? 'ارزیاب' : 'فرمانده / مدیر'}</strong>
          </div>
        </div>
      </div>

      {/* Render View Corresponding to Selected Role Tab */}
      {activeTabRole === 'employee' && (
        <EmployeeTransferView
          applications={applications}
          onSubmitApplication={handleCreateApplication}
        />
      )}

      {activeTabRole === 'evaluator' && (
        <EvaluatorTransferView
          applications={applications}
          personnelEws={personnelEws}
          onUpdateAppStatus={handleUpdateAppStatus}
          onUpdateEwsStatus={handleUpdateEwsStatus}
        />
      )}

      {activeTabRole === 'manager' && (
        <ManagerTransferDSSView
          applications={applications}
          personnelEws={personnelEws}
          onApproveApplication={handleApproveApplication}
        />
      )}
    </div>
  );
}
export default FarajaTransfersPage;
