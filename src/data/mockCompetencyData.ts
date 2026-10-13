import { Competency, Job, KPI, KPIMapping, Department } from '../types';

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'dep1', title: 'فرماندهی تهران بزرگ - کلانتری ۱۰۳ گاندی (یگان گشت موتوری ۱۱۰)', coreCompetencyIds: ['c1', 'c2'] }
];

export const MOCK_KPIS: KPI[] = [
  { id: 'kpi1', title: 'کاهش زمان حضور سر صحنه ۱۱۰ به کمتر از ۳ دقیقه' },
  { id: 'kpi2', title: 'گشت‌زنی هدفمند و کشف پیشگیرانه جرایم در حوزه استحفاظی' },
  { id: 'kpi3', title: 'بهبود رضایت‌مندی شهروندان و امدادخواهان در صحنه' }
];

export const MOCK_JOBS: Job[] = [
  { 
    id: 'job1', 
    title: 'مامور ارشد گشت انتظامی و فوریت‌های ۱۱۰ (گشت موتوری)', 
    icon: '🏍️', 
    departmentId: 'dep1',
    kpis: MOCK_KPIS
  }
];

export const MOCK_COMPETENCIES: Competency[] = [
  { id: 'c1', title: 'موتورسواری عملیاتی و مانور', description: 'توانایی هدایت ایمن و سریع موتور در معابر پرترافیک و تعقیب هدفمند', functionLevel: 'Individual', impactLevel: 'Outcome', type: 'محوری', icon: '🏍️' },
  { id: 'c2', title: 'مهار صحنه و مدیریت بحران', description: 'تثبیت صحنه جرم، کنترل تنش و گزارش‌نویسی دقیق رخداد ۱۱۰', functionLevel: 'Team', impactLevel: 'Outcome', type: 'تخصصی', icon: '🚨' },
  { id: 'c3', title: 'ارتباط موثر با امدادخواه', description: 'رفتار حرفه‌ای و آرام‌سازی شاکیان و امدادخواهان در بدو ورود به صحنه', functionLevel: 'Social', impactLevel: 'Process', type: 'عمومی', icon: '💬' },
  { id: 'c4', title: 'تیراندازی و تجهیزات انتظامی', description: 'تسلط بر تجهیزات انتظامی، آمادگی جسمانی و به‌کارگیری قانونمند سلاح', functionLevel: 'Individual', impactLevel: 'Input', type: 'تخصصی', icon: '🎯' },
  { id: 'c5', title: 'گزارش‌نویسی و سامانه ۱۱۰', description: 'ثبت دقیق رخدادها، کروکی مقدماتی و ارسال به موقع گزارش‌های گشت', functionLevel: 'Organizational', impactLevel: 'Output', type: 'عمومی', icon: '📋' },
];

export const MOCK_MAPPINGS: KPIMapping[] = [
  { id: 'm1', kpiId: 'kpi1', competencyId: 'c1', roleType: 'Critical', importance: 'Very High' },
  { id: 'm2', kpiId: 'kpi2', competencyId: 'c2', roleType: 'Enhancer', importance: 'High' },
  { id: 'm3', kpiId: 'kpi3', competencyId: 'c3', roleType: 'Enabler', importance: 'High' },
  { id: 'm4', kpiId: 'kpi2', competencyId: 'c4', roleType: 'Critical', importance: 'Very High' },
  { id: 'm5', kpiId: 'kpi1', competencyId: 'c5', roleType: 'Enhancer', importance: 'High' },
];

