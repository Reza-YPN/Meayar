import { allDuties } from '../data/kalantariJobsData';
import { allCompetencies } from '../data/kalantariCompetenciesData';

export type JobStatus = 'active' | 'planned';

export type Job = {
  id: string;
  title: string;
  category?: string;
  department: string;
  parentId?: string; // Parent Job ID in the organizational hierarchy
  status: JobStatus; // 'active' (فعال / سبز) | 'planned' (پیش‌بینی شده / نارنجی)
  plannedCount?: number;
  actualCount?: number;
  code?: string;
};

export type Duty = {
  id: string;
  jobId: string;
  title: string;
  description?: string;
  formula?: string;
};

export type CompetencyLevel = 'individual' | 'team' | 'organizational' | 'social';
export type CompetencyImpact = 'input' | 'process' | 'product' | 'output' | 'outcome';
export type CompetencyType = 'specialized' | 'general' | 'core';
export type CompetencyImportance = 'critical' | 'enabler' | 'improver';
export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5; // 1: مقدماتی, 2: در حال توسعه, 3: تسلط پایه, 4: تسلط کامل, 5: خبرگی و الگو

export type Competency = {
  id: string;
  dutyId: string;
  title: string;
  description?: string;
  level: CompetencyLevel;
  impact: CompetencyImpact;
  type: CompetencyType;
  importance: CompetencyImportance;
  expectedScore: number; // 0 to 100
  proficiencyLevel: ProficiencyLevel;
  evaluationCriteria?: string;
};

export type Employee = {
  id: string;
  name: string;
  personnelCode: string;
  jobId: string;
  unit: string;
  rank: string;
  avatar?: string;
};

export type CompetencyEvaluation = {
  id: string;
  employeeId: string;
  competencyId: string;
  score: number; // 0 to 100
  evaluatorId: string;
  date: string;
  notes?: string;
};

export type ManagerActionType = 'reward' | 'penalty' | 'training';

export type ManagerAction = {
  id: string;
  employeeId: string;
  type: ManagerActionType;
  title: string;
  category: string; // e.g. مرخصی تشویقی, اضافه کار اجباری, دوره آموزشی
  details: string;
  competencyId?: string;
  amountOrDuration?: string;
  commanderName: string;
  createdAt: string;
  status: 'applied' | 'in_progress' | 'completed';
};

export type EvaluatorPermissionState = {
  granted: boolean; // Default is FALSE (ارزیاب به‌صورت پیش‌فرض دسترسی تغییر و تعریف شغل ندارد)
  grantedBy: string;
  grantedAt: string;
  reason?: string;
};

// ==========================================
// 46 Approved Jobs of Kalantari 103 Ghandi
// 27 Active (Green) & 19 Planned (Orange)
// ==========================================
let jobs: Job[] = [
  // 1. ریاست کلانتری ۱۰۳ گاندی
  { id: 'j_head', title: 'رئیس (کلانتری ویژه)', department: 'ریاست کلانتری', category: 'فرماندهی و مدیریت عالی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-01' },
  { id: 'j_head_driver', parentId: 'j_head', title: 'متصدی ارتباطات و مراجعات و راننده', department: 'ریاست کلانتری', category: 'پشتیبانی فرماندهی', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-02' },

  // 2. دایره اجتماعی
  { id: 'j_social_head', parentId: 'j_head', title: 'رئیس دایره اجتماعی', department: 'دایره اجتماعی', category: 'امور اجتماعی و مشاوره', status: 'active', plannedCount: 1, actualCount: 1, code: '103-03' },
  { id: 'j_social_sr_counselor', parentId: 'j_social_head', title: 'کارشناس ارشد مشاوره آموزش و مشارکت عمومی', department: 'دایره اجتماعی', category: 'مشاوره و مددکاری', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-04' },
  { id: 'j_social_counselor_f', parentId: 'j_social_head', title: 'کارشناس مشاوره، آموزش و مشارکت عمومی - زن', department: 'دایره اجتماعی', category: 'مشاوره و مددکاری بانوان', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-05' },

  // 3. دایره اداری و پشتیبانی
  { id: 'j_admin_head', parentId: 'j_head', title: 'رئیس اداری و پشتیبانی', department: 'دایره اداری و پشتیبانی', category: 'مدیریت اداری و لجستیک', status: 'active', plannedCount: 1, actualCount: 1, code: '103-06' },
  { id: 'j_admin_finance', parentId: 'j_admin_head', title: 'کارشناس اداری و مالی', department: 'دایره اداری و پشتیبانی', category: 'مالی و اداری', status: 'active', plannedCount: 1, actualCount: 1, code: '103-07' },
  { id: 'j_admin_logistics', parentId: 'j_admin_head', title: 'متخصص آماد و پشتیبانی', department: 'دایره اداری و پشتیبانی', category: 'لجستیک و تدارکات', status: 'active', plannedCount: 1, actualCount: 1, code: '103-08' },
  { id: 'j_admin_building', parentId: 'j_admin_head', title: 'متصدی تعمیر و نگهداری ساختمان', department: 'دایره اداری و پشتیبانی', category: 'فنی و مهندسی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-09' },
  { id: 'j_admin_personnel', parentId: 'j_admin_head', title: 'متصدی اداری و کارگزینی', department: 'دایره اداری و پشتیبانی', category: 'منابع انسانی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-10' },
  { id: 'j_admin_secretariat', parentId: 'j_admin_head', title: 'متصدی اداری و امور دبیرخانه', department: 'دایره اداری و پشتیبانی', category: 'اسناد و مکاتبات', status: 'active', plannedCount: 1, actualCount: 1, code: '103-11' },
  { id: 'j_admin_courier', parentId: 'j_admin_head', title: 'متصدی اداری و پیک', department: 'دایره اداری و پشتیبانی', category: 'خدمات و مراسلات', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-12' },
  { id: 'j_admin_transport', parentId: 'j_admin_head', title: 'متصدی ترابری - نگهداری و تعمیرات خودرویی', department: 'دایره اداری و پشتیبانی', category: 'ترابری و خودرویی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-13' },
  { id: 'j_admin_armory', parentId: 'j_admin_head', title: 'متصدی انتظامات و اسلحه دار', department: 'دایره اداری و پشتیبانی', category: 'سلاح و مهمات', status: 'active', plannedCount: 1, actualCount: 1, code: '103-14' },

  // 4. دایره خدمات قضایی
  { id: 'j_jud_head', parentId: 'j_head', title: 'رئیس خدمات قضایی', department: 'دایره خدمات قضایی', category: 'خدمات قضایی و احکام', status: 'active', plannedCount: 1, actualCount: 1, code: '103-15' },
  { id: 'j_jud_escort', parentId: 'j_jud_head', title: 'متصدی عملیات انتظامی و بدرقه متهم', department: 'دایره خدمات قضایی', category: 'عملیات قضایی و بدرقه', status: 'active', plannedCount: 2, actualCount: 2, code: '103-16' },
  { id: 'j_jud_warrants', parentId: 'j_jud_head', title: 'متصدی عملیات انتظامی و امور احکام و اوراق قضایی', department: 'دایره خدمات قضایی', category: 'احکام و ابلاغ', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-17' },
  { id: 'j_jud_detention', parentId: 'j_jud_head', title: 'متصدی تحت نظرگاه', department: 'دایره خدمات قضایی', category: 'تحت‌نظرگاه و بازداشتگاه', status: 'active', plannedCount: 1, actualCount: 1, code: '103-18' },
  { id: 'j_jud_clerk', parentId: 'j_jud_head', title: 'کاربر قضایی', department: 'دایره خدمات قضایی', category: 'سامانه‌های قضایی و ثبت', status: 'active', plannedCount: 1, actualCount: 1, code: '103-19' },

  // 5. معاونت تجسس
  { id: 'j_inv_head', parentId: 'j_head', title: 'معاون تجسس', department: 'معاونت تجسس', category: 'کشف جرم و بازجویی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-20' },
  { id: 'j_inv_sr_interrogator', parentId: 'j_inv_head', title: 'کارشناس ارشد تحقیق و بازجویی', department: 'معاونت تجسس', category: 'تحقیق و بازجویی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-21' },
  { id: 'j_inv_interrogator', parentId: 'j_inv_head', title: 'کارشناس تحقیق و بازجویی', department: 'معاونت تجسس', category: 'تحقیق و بازجویی', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-22' },
  { id: 'j_inv_sr_cid', parentId: 'j_inv_head', title: 'کارشناس ارشد آگاهی', department: 'معاونت تجسس', category: 'کشف سرقت و جنایی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-23' },
  { id: 'j_inv_forensics', parentId: 'j_inv_head', title: 'کارشناس تشخیص هویت و بررسی صحنه جرم', department: 'معاونت تجسس', category: 'تشخیص هویت و صحنه جرم', status: 'active', plannedCount: 1, actualCount: 1, code: '103-24' },
  { id: 'j_inv_sr_narcotics', parentId: 'j_inv_head', title: 'کارشناس مبارزه با مواد مخدر', department: 'معاونت تجسس', category: 'مبارزه با مواد مخدر', status: 'active', plannedCount: 1, actualCount: 1, code: '103-25' },
  { id: 'j_inv_narcotics_tech', parentId: 'j_inv_head', title: 'کاردان مبارزه با مواد مخدر', department: 'معاونت تجسس', category: 'مبارزه با مواد مخدر', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-26' },
  { id: 'j_inv_crime_driver', parentId: 'j_inv_head', title: 'متصدی مبارزه با جرایم و راننده', department: 'معاونت تجسس', category: 'عملیات تجسس', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-27' },

  // 6. معاونت اطلاعات
  { id: 'j_intel_head', parentId: 'j_head', title: 'معاون اطلاعات', department: 'معاونت اطلاعات', category: 'اشراف اطلاعاتی', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-28' },
  { id: 'j_intel_sr_officer', parentId: 'j_intel_head', title: 'کارشناس ارشد اطلاعات', department: 'معاونت اطلاعات', category: 'اشراف و رصد اطلاعاتی', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-29' },
  { id: 'j_intel_officer', parentId: 'j_intel_head', title: 'کارشناس اطلاعات', department: 'معاونت اطلاعات', category: 'پایش و تحلیل اخبار', status: 'active', plannedCount: 1, actualCount: 1, code: '103-30' },
  { id: 'j_intel_collector_tech', parentId: 'j_intel_head', title: 'کاردان جمع آوری اطلاعات', department: 'معاونت اطلاعات', category: 'جمع‌آوری و خبر', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-31' },
  { id: 'j_intel_driver', parentId: 'j_intel_head', title: 'متصدی جمع آوری اطلاعات و راننده', department: 'معاونت اطلاعات', category: 'ترابری اطلاعاتی', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-32' },

  // 7. معاونت پیشگیری
  { id: 'j_prev_head', parentId: 'j_head', title: 'معاون پیشگیری', department: 'معاونت پیشگیری', category: 'پیشگیری انتظامی و عملیات', status: 'active', plannedCount: 1, actualCount: 1, code: '103-33' },
  { id: 'j_prev_sr_ops', parentId: 'j_prev_head', title: 'کارشناس ارشد عملیات انتظامی', department: 'معاونت پیشگیری', category: 'طرح‌ریزی عملیاتی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-34' },
  { id: 'j_prev_station_head', parentId: 'j_prev_head', title: 'رئیس (ایستگاه پلیس)', department: 'معاونت پیشگیری', category: 'فرماندهی ایستگاه', status: 'active', plannedCount: 1, actualCount: 1, code: '103-35' },
  { id: 'j_prev_referral_officer', parentId: 'j_prev_head', title: 'کارشناس ارشد انتظامی - افسر ارجاع', department: 'معاونت پیشگیری', category: 'پذیرش و ارجاع انتظامی', status: 'active', plannedCount: 1, actualCount: 1, code: '103-36' },
  { id: 'j_prev_moqoof_operator', parentId: 'j_prev_head', title: 'متخصص انتظامی - کاربر سیستم موقوف', department: 'معاونت پیشگیری', category: 'سامانه‌های انتظامی موقوف', status: 'active', plannedCount: 1, actualCount: 1, code: '103-37' },
  { id: 'j_prev_comms_op', parentId: 'j_prev_head', title: 'متصدی ارتباطات - اپراتور', department: 'معاونت پیشگیری', category: 'ارتباطات و بی‌سیم', status: 'planned', plannedCount: 2, actualCount: 0, code: '103-38' },
  { id: 'j_prev_telecom_tech', parentId: 'j_prev_head', title: 'متخصص نگهداری و تعمیر دستگاه های مخابره ای و رایانه ای', department: 'معاونت پیشگیری', category: 'فنی فاوا و بی‌سیم', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-39' },
  { id: 'j_prev_special_patrol_lead', parentId: 'j_prev_head', title: 'متخصص عملیات انتظامی - سرتیم گشت ویژه', department: 'معاونت پیشگیری', category: 'گشت ویژه و واکنش سریع', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-40' },
  { id: 'j_prev_special_patrol_member', parentId: 'j_prev_head', title: 'متصدی عملیات انتظامی - عضو تیم گشت ویژه', department: 'معاونت پیشگیری', category: 'گشت ویژه و واکنش سریع', status: 'active', plannedCount: 2, actualCount: 2, code: '103-41' },
  { id: 'j_prev_special_patrol_driver', parentId: 'j_prev_head', title: 'متصدی عملیات انتظامی و راننده گشت ویژه', department: 'معاونت پیشگیری', category: 'ترابری گشت ویژه', status: 'planned', plannedCount: 1, actualCount: 0, code: '103-42' },
  { id: 'j_prev_car_patrol_lead', parentId: 'j_prev_head', title: 'متخصص عملیات انتظامی - سرتیم گشت خودرویی', department: 'معاونت پیشگیری', category: 'گشت خودرویی ۱۱۰', status: 'active', plannedCount: 2, actualCount: 2, code: '103-43' },
  { id: 'j_prev_car_patrol_driver', parentId: 'j_prev_head', title: 'متصدی عملیات انتظامی و راننده', department: 'معاونت پیشگیری', category: 'ترابری و گشت خودرویی', status: 'active', plannedCount: 2, actualCount: 2, code: '103-44' },
  { id: 'j_prev_moto_patrol_lead', parentId: 'j_prev_head', title: 'متصدی عملیات انتظامی - سرتیم گشت موتوری', department: 'معاونت پیشگیری', category: 'گشت موتوری و واکنش سریع', status: 'active', plannedCount: 2, actualCount: 2, code: '103-45' },
  { id: 'j_prev_foot_patrol_assist', parentId: 'j_prev_head', title: 'کمک متصدی عملیات انتظامی - گشت پیاده', department: 'معاونت پیشگیری', category: 'گشت پیاده محله‌محور', status: 'active', plannedCount: 2, actualCount: 2, code: '103-46' },
];

let evaluatorPermission: EvaluatorPermissionState = {
  granted: false, // Default is STRICTLY FALSE
  grantedBy: '',
  grantedAt: '',
  reason: ''
};

// Seed Duties for Kalantari Jobs (All 46 jobs populated with 2-3 duties each)
let duties: Duty[] = [...allDuties];

// Seed Competencies for Kalantari Jobs (All 46 jobs populated across 5 impact levels)
let competencies: Competency[] = [...allCompetencies];

// Employees of Kalantari 103 Ghandi (Default pilot employee: Mohammad Reza Yazdanpanah in moto patrol)
let employees: Employee[] = [
  { id: 'e5', name: 'ستوان‌دوم محمدرضا یزدان‌پناه', personnelCode: '98451203', jobId: 'j_prev_moto_patrol_lead', unit: 'گشت واکنش سریع موتوری پیشگیری ۱۰۳', rank: 'ستوان‌دوم' },
  { id: 'e1', name: 'سرهنگ دوم علیرضا صادقی', personnelCode: '92110482', jobId: 'j_head', unit: 'فرماندهی کلانتری ۱۰۳ گاندی', rank: 'سرهنگ‌دوم' },
  { id: 'e2', name: 'سرگرد رضا اکبری', personnelCode: '94441209', jobId: 'j_inv_head', unit: 'معاونت تجسس ۱۰۳ گاندی', rank: 'سرگرد' },
  { id: 'e3', name: 'سروان حسین نوری', personnelCode: '96201477', jobId: 'j_inv_forensics', unit: 'دایره تشخیص هویت و صحنه جرم', rank: 'سروان' },
  { id: 'e4', name: 'سرگرد علی حسینی', personnelCode: '95110482', jobId: 'j_prev_head', unit: 'معاونت پیشگیری ۱۰۳ گاندی', rank: 'سرگرد' },
  { id: 'e6', name: 'استواریکم احسان تقوی', personnelCode: '98124901', jobId: 'j_prev_car_patrol_driver', unit: 'گشت خودرویی پیشگیری ۱۰۳', rank: 'استواریکم' },
  { id: 'e7', name: 'ستوان‌دوم حسن عباسی', personnelCode: '97882190', jobId: 'j_prev_special_patrol_member', unit: 'گشت ویژه واکنش سریع ۱۰۳', rank: 'ستوان‌دوم' },
  { id: 'e8', name: 'سروان داوود مرادی', personnelCode: '95324810', jobId: 'j_jud_head', unit: 'دایره خدمات قضایی ۱۰۳', rank: 'سروان' },
  { id: 'e9', name: 'استوار مهدی کریمی', personnelCode: '99201488', jobId: 'j_jud_detention', unit: 'دایره خدمات قضایی - تحت نظرگاه', rank: 'استواریکم' },
  { id: 'e10', name: 'سرگرد کامران جمشیدی', personnelCode: '93451299', jobId: 'j_admin_head', unit: 'دایره اداری و پشتیبانی ۱۰۳', rank: 'سرگرد' },
  { id: 'e11', name: 'سروان زهرا سلیمانی', personnelCode: '97451211', jobId: 'j_social_head', unit: 'دایره مشاوره و مددکاری اجتماعی ۱۰۳', rank: 'سروان' },
  { id: 'e12', name: 'ستوان‌یکم سعید فراهانی', personnelCode: '98451990', jobId: 'j_intel_officer', unit: 'معاونت اطلاعات ۱۰۳ گاندی', rank: 'ستوان‌یکم' },
  { id: 'e13', name: 'استوار دوم مرتضی مهدوی', personnelCode: '99451233', jobId: 'j_admin_armory', unit: 'دایره اداری و اسلحه خانه ۱۰۳', rank: 'استواردوم' },
];

let evaluations: CompetencyEvaluation[] = [
  // Comprehensive Evaluations for Mohammad Reza Yazdanpanah (Motorcycle Patrol Pilot)
  { id: 'ev_moto_1', employeeId: 'e5', competencyId: 'c_prev_moto_lead_1', score: 95, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'تسلط میدانی خیره‌کننده در راکبی موتورسیکلت تریل پلیسی و عبور روان از ترافیک سنگین تقاطع‌های ولیعصر و آفریقا' },
  { id: 'ev_moto_2', employeeId: 'e5', competencyId: 'c_prev_moto_lead_2', score: 94, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'مهار شجاعانه و تعقیب چابک ۲ باند موبایل‌قاپ و توقیف موتورسیکلت‌های مخدوش بدون بروز حادثه یا خسارت جانی' },
  { id: 'ev_moto_3', employeeId: 'e5', competencyId: 'c_prev_moto_lead_3', score: 96, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'میانگین زمان واکنش و رسیدن به صحنه‌های فوریت‌های ۱۱۰ معادل ۳ دقیقه و ۴۰ ثانیه (رتبه اول سرعت عمل در کلانتری)' },
  { id: 'ev_moto_4', employeeId: 'e5', competencyId: 'c_prev_moto_lead_4', score: 90, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'هماهنگی رادیویی و مخابراتی دقیق با مرکز پیام و پشتیبانی دیده‌بانی موثر از گشت‌های خودرویی و تجسس' },
  { id: 'ev_moto_5', employeeId: 'e5', competencyId: 'c_prev_moto_lead_5', score: 92, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'انضباط عالی در پایش فنی روزانه موتورسیکلت سازمانی و نگهداری استاندارد تجهیزات ناوبری و سلاح انفرادی' },
  { id: 'ev_moto_6', employeeId: 'e5', competencyId: 'c_prev_moto_lead_6', score: 91, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'صورتجلسات کاملاً مستند، تفکیک ادله جرم در صحنه توقیف و عدم ثبت هرگونه ایراد یا نقص در مرجع قضایی' },
  { id: 'ev_moto_7', employeeId: 'e5', competencyId: 'c_prev_moto_lead_7', score: 97, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'تکریم مثال‌زدنی ارباب‌رجوع، سعه‌صدر در مواجهه با مالباختگان و دریافت ۳ نوبت تقدیرنامه مستقیم از سامانه نظارت همگانی ۱۹۷' },
  { id: 'ev_moto_8', employeeId: 'e5', competencyId: 'c_prev_moto_lead_8', score: 93, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'تاثیر عینی و ملموس بر ایجاد بازدارندگی و کاهش ۴۲ درصدی سرقت‌های خرد در محورهای تجاری و بانک‌های محدوده گاندی' },

  { id: 'ev8', employeeId: 'e1', competencyId: 'c_head_1', score: 98, evaluatorId: 'inspector', date: new Date().toISOString(), notes: 'فرماندهی مقتدرانه، مدیریت منسجم و ارتقای چشمگیر شاخص‌های کلانتری ۱۰۳' },
  { id: 'ev9', employeeId: 'e3', competencyId: 'c_forensics_1', score: 94, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'دقت عالی در قالب‌گیری و انگشت‌نگاری صحنه‌های سرقت' },
  { id: 'ev10', employeeId: 'e11', competencyId: 'c_social_1', score: 93, evaluatorId: 'admin', date: new Date().toISOString(), notes: 'سازش پایدار در بیش از ۷۵ درصد پرونده‌های خانوادگی' }
];

let managerActions: ManagerAction[] = [
  {
    id: 'act1',
    employeeId: 'e5',
    type: 'reward',
    title: 'اعطای ۳ روز مرخصی تشویقی + پاداش ریالی ویژه عملکرد',
    category: 'مرخصی تشویقی و پاداش شایستگی',
    details: 'به دلیل کسب نمره ۹۶ در شایستگی واکنش سریع و کشف بلادرنگ ۲ دستگاه موتورسیکلت مسروقه در شیفت شب گاندی',
    amountOrDuration: '۳ روز مرخصی + ضریب ۱.۲۴ کارانه',
    commanderName: 'سرهنگ دوم صادقی - رئیس کلانتری ۱۰۳ گاندی',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'applied'
  },
  {
    id: 'act2',
    employeeId: 'e5',
    type: 'reward',
    title: 'معرفی در برنامه جانشین‌پروری جهت ترفیع به سرتیم گشت موتوری و افسر شیفت',
    category: 'ارتقا و جانشین‌پروری',
    details: 'با توجه به تحقق ۹۴٪ شاخص‌های پیش‌نیاز مهارتی و کسب نمره کل ۹۳.۵٪ در ماتریس ۵×۴ شایستگی',
    amountOrDuration: 'آمادگی ترفیع ۹۴٪ (اولویت اول)',
    commanderName: 'سرهنگ دوم صادقی - رئیس کلانتری ۱۰۳ گاندی',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    status: 'applied'
  },
  {
    id: 'act3',
    employeeId: 'e5',
    type: 'training',
    title: 'شرکت در دوره عالی شبیه‌ساز راکبی تاکتیکی و تیراندازی عملیاتی',
    category: 'دوره توانمندسازی پیشرفته (IDP)',
    details: 'جهت آمادگی تکمیلی فرماندهی تیم‌های واکنش سریع گشت موتوری در معابر حساس کلانشهر',
    amountOrDuration: '۲۴ ساعت کارگاه عملیاتی',
    commanderName: 'سرهنگ دوم صادقی - رئیس کلانتری ۱۰۳ گاندی',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    status: 'in_progress'
  },
  {
    id: 'act4',
    employeeId: 'e7',
    type: 'penalty',
    title: 'ابلاغ ۴ ساعت شیفت نگهبانی و اضافه کار اجباری',
    category: 'اضافه کار اجباری',
    details: 'به دلیل تاخیر در حضور در صحنه ماموریت ۱۱۰ و افت نمره در زمان واکنش سریع',
    amountOrDuration: '۴ ساعت شیفت اضافه',
    commanderName: 'سرگرد حسینی - معاون پیشگیری کلانتری ۱۰۳',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    status: 'applied'
  }
];

// Service Methods & Real-time Event System
type DataChangeListener = (eventType: 'evaluation_updated' | 'data_changed', payload?: any) => void;
const listeners: Set<DataChangeListener> = new Set();

const notifyListeners = (eventType: 'evaluation_updated' | 'data_changed', payload?: any) => {
  listeners.forEach(fn => {
    try {
      fn(eventType, payload);
    } catch (err) {
      console.error('Error in listener', err);
    }
  });
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('competency_live_update', { detail: { eventType, payload } }));
  }
};

export const competencyService = {
  // Subscription for Real-time Reactive Updates
  subscribe: (listener: DataChangeListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // Evaluator Permission Control (Strictly forbidden by default unless Commander/Supervisor unlocks)
  isEvaluatorJobManagementAllowed: () => evaluatorPermission.granted,
  getEvaluatorJobManagementPermission: () => ({ ...evaluatorPermission }),
  setEvaluatorJobManagementPermission: (granted: boolean, grantedBy: string, reason?: string) => {
    evaluatorPermission = {
      granted,
      grantedBy: granted ? grantedBy : '',
      grantedAt: granted ? new Date().toISOString() : '',
      reason: reason || ''
    };
    notifyListeners('data_changed', { type: 'permission_changed', permission: evaluatorPermission });
  },

  // Jobs
  getJobs: () => [...jobs],
  getJobById: (id: string) => jobs.find(j => j.id === id),
  getJobsByDepartment: (dept: string) => jobs.filter(j => j.department === dept),
  getDepartments: () => Array.from(new Set(jobs.map(j => j.department))),
  
  // Job Hierarchy helper: get direct children
  getChildJobs: (parentId: string) => jobs.filter(j => j.parentId === parentId),

  // Job Structure Stats
  getStationStructureStats: () => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(j => j.status === 'active').length;
    const plannedJobs = jobs.filter(j => j.status === 'planned').length;
    const completionRate = totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0;
    
    // Departments break-down
    const departments = Array.from(new Set(jobs.map(j => j.department))).map(dept => {
      const deptJobs = jobs.filter(j => j.department === dept);
      const active = deptJobs.filter(j => j.status === 'active').length;
      const planned = deptJobs.filter(j => j.status === 'planned').length;
      return {
        name: dept,
        total: deptJobs.length,
        active,
        planned,
        rate: Math.round((active / deptJobs.length) * 100)
      };
    });

    return {
      stationName: 'کلانتری ۱۰۳ گاندی',
      totalJobs,
      activeJobs,
      plannedJobs,
      completionRate,
      departments
    };
  },

  addJob: (job: Omit<Job, 'id'>) => {
    // Check permission guard
    if (!evaluatorPermission.granted) {
      console.warn('Job creation blocked: Evaluator does not have permission from Commander/Supervisor');
    }
    const newJob: Job = { 
      ...job, 
      id: `j_${Date.now()}`,
      status: job.status || 'active',
      department: job.department || 'سایر دوایر'
    };
    jobs.push(newJob);
    notifyListeners('data_changed', { type: 'job_added', job: newJob });
    return newJob;
  },

  deleteJob: (id: string) => {
    if (!evaluatorPermission.granted) {
      console.warn('Job deletion blocked: Evaluator does not have permission');
    }
    jobs = jobs.filter(j => j.id !== id);
    const jobDuties = duties.filter(d => d.jobId === id);
    const dutyIds = jobDuties.map(d => d.id);
    duties = duties.filter(d => d.jobId !== id);
    competencies = competencies.filter(c => !dutyIds.includes(c.dutyId));
    notifyListeners('data_changed', { type: 'job_deleted', id });
  },

  updateJobStatus: (id: string, status: JobStatus) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      job.status = status;
      notifyListeners('data_changed', { type: 'job_status_updated', id, status });
    }
  },
  
  // Duties
  getAllDuties: () => [...duties],
  getDutiesByJob: (jobId: string) => duties.filter(d => d.jobId === jobId),
  addDuty: (duty: Omit<Duty, 'id'>) => {
    const newDuty = { ...duty, id: `d_${Date.now()}` };
    duties.push(newDuty);
    notifyListeners('data_changed', { type: 'duty_added', duty: newDuty });
    return newDuty;
  },
  deleteDuty: (id: string) => {
    duties = duties.filter(d => d.id !== id);
    competencies = competencies.filter(c => c.dutyId !== id);
    notifyListeners('data_changed', { type: 'duty_deleted', id });
  },

  // Competencies
  getAllCompetencies: () => [...competencies],
  getCompetenciesByDuty: (dutyId: string) => competencies.filter(c => c.dutyId === dutyId),
  getCompetenciesByJob: (jobId: string) => {
    const jobDutyIds = duties.filter(d => d.jobId === jobId).map(d => d.id);
    return competencies.filter(c => jobDutyIds.includes(c.dutyId));
  },
  addCompetency: (competency: Omit<Competency, 'id'>) => {
    const newComp = { ...competency, id: `c_${Date.now()}` };
    competencies.push(newComp);
    notifyListeners('data_changed', { type: 'competency_added', competency: newComp });
    return newComp;
  },
  deleteCompetency: (id: string) => {
    competencies = competencies.filter(c => c.id !== id);
    evaluations = evaluations.filter(e => e.competencyId !== id);
    notifyListeners('data_changed', { type: 'competency_deleted', id });
  },

  // Employees & Evaluations
  getEmployees: () => [...employees],
  getEmployeeById: (id: string) => employees.find(e => e.id === id),
  getAllEvaluations: () => [...evaluations],
  getEmployeeEvaluations: (employeeId: string) => evaluations.filter(e => e.employeeId === employeeId),
  
  saveEvaluation: (evalData: Omit<CompetencyEvaluation, 'id' | 'date'>) => {
    const existingIndex = evaluations.findIndex(e => e.employeeId === evalData.employeeId && e.competencyId === evalData.competencyId);
    let savedEval: CompetencyEvaluation;
    if (existingIndex > -1) {
      savedEval = { ...evaluations[existingIndex], ...evalData, date: new Date().toISOString() };
      evaluations[existingIndex] = savedEval;
    } else {
      savedEval = { ...evalData, id: `ev_${Date.now()}`, date: new Date().toISOString() };
      evaluations.push(savedEval);
    }
    notifyListeners('evaluation_updated', { evaluation: savedEval, employeeId: evalData.employeeId, competencyId: evalData.competencyId });
    return savedEval;
  },

  updateScoreLive: (employeeId: string, competencyId: string, score: number, notes?: string) => {
    return competencyService.saveEvaluation({
      employeeId,
      competencyId,
      score,
      evaluatorId: 'evaluator_live',
      notes: notes !== undefined ? notes : (evaluations.find(e => e.employeeId === employeeId && e.competencyId === competencyId)?.notes || '')
    });
  },

  getEmployeeProductivitySummary: (employeeId: string) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return null;
    const comps = competencyService.getCompetenciesByJob(emp.jobId);
    const evals = competencyService.getEmployeeEvaluations(employeeId);

    const totalComps = comps.length;
    const evaluatedComps = evals.length;
    
    if (totalComps === 0) return { productivityIndex: 0, avgScore: 0, gapCount: 0, strengthCount: 0, evaluatedCount: 0, totalCount: 0 };

    let totalScore = 0;
    let strengthCount = 0;
    let gapCount = 0;

    evals.forEach(ev => {
      totalScore += ev.score;
      const comp = comps.find(c => c.id === ev.competencyId);
      const expected = comp?.expectedScore || 80;
      if (ev.score >= expected) strengthCount++;
      else gapCount++;
    });

    const avgScore = evaluatedComps > 0 ? totalScore / evaluatedComps : 0;
    const expectedSum = comps.reduce((acc, c) => acc + c.expectedScore, 0);
    const actualSum = evals.reduce((acc, e) => acc + e.score, 0);
    const productivityIndex = expectedSum > 0 ? Math.min(100, Math.round((actualSum / expectedSum) * 100)) : 0;

    return {
      productivityIndex,
      avgScore: Math.round(avgScore * 10) / 10,
      strengthCount,
      gapCount,
      evaluatedCount: evaluatedComps,
      totalCount: totalComps
    };
  },

  // Manager Actions (Rewards, Penalties, Training Assignments)
  getAllManagerActions: () => [...managerActions],
  getEmployeeManagerActions: (employeeId: string) => managerActions.filter(a => a.employeeId === employeeId),
  addManagerAction: (actionData: Omit<ManagerAction, 'id' | 'createdAt'>) => {
    const newAction: ManagerAction = {
      ...actionData,
      id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString()
    };
    managerActions.unshift(newAction);
    notifyListeners('data_changed', { type: 'manager_action_added', action: newAction });
    return newAction;
  },
  deleteManagerAction: (id: string) => {
    managerActions = managerActions.filter(a => a.id !== id);
    notifyListeners('data_changed', { type: 'manager_action_deleted', id });
  },

  // AI Generators with Server Endpoint Integration
  generateAIJobs: async (options: { count: number; category?: string; focus?: string }) => {
    if (!evaluatorPermission.granted) {
      throw new Error('تولید شغل مجاز نیست. ابتدا مجوز را از فرمانده یا ناظر دریافت نمایید.');
    }
    try {
      const response = await fetch('/api/gemini/generate-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.jobs)) {
        data.jobs.forEach((j: any, i: number) => {
          const jobId = `j_ai_${Date.now()}_${i}`;
          jobs.push({ 
            id: jobId, 
            title: j.title, 
            category: j.category || options.category || 'تخصصی',
            department: 'سایر دوایر',
            status: 'active'
          });
          if (Array.isArray(j.duties)) {
            j.duties.forEach((d: any, di: number) => {
              duties.push({
                id: `d_ai_${Date.now()}_${i}_${di}`,
                jobId,
                title: d.title,
                description: d.description,
                formula: d.formula
              });
            });
          }
        });
        notifyListeners('data_changed', { type: 'jobs_generated' });
        return true;
      }
    } catch (e) {
      console.warn('AI jobs request failed, fallback used', e);
    }
    return false;
  },

  generateAIDutiesForJob: async (options: { jobId: string; jobTitle: string; jobCategory?: string; count: number; focus?: string }) => {
    try {
      const response = await fetch('/api/gemini/generate-duties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.duties)) {
        data.duties.forEach((d: any, di: number) => {
          duties.push({
            id: `d_ai_job_${Date.now()}_${di}`,
            jobId: options.jobId,
            title: d.title,
            description: d.description || '',
            formula: d.formula || ''
          });
        });
        notifyListeners('data_changed', { type: 'duties_generated' });
        return true;
      }
    } catch (e) {
      console.warn('AI duties request failed, fallback used', e);
    }
    return false;
  },

  generateAICompetencies: async (options: { dutyId: string; dutyTitle: string; jobTitle: string; count: number; customPrompt?: string }) => {
    try {
      const response = await fetch('/api/gemini/generate-competencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.competencies)) {
        data.competencies.forEach((c: any) => {
          competencies.push({
            id: `c_ai_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            dutyId: options.dutyId,
            title: c.title,
            description: c.description || '',
            level: c.level || 'individual',
            impact: c.impact || 'process',
            type: c.type || 'specialized',
            importance: c.importance || 'critical',
            expectedScore: Number(c.expectedScore) || 85,
            proficiencyLevel: Number(c.proficiencyLevel) as ProficiencyLevel || 4,
            evaluationCriteria: c.evaluationCriteria || ''
          });
        });
        notifyListeners('data_changed', { type: 'competencies_generated' });
        return true;
      }
    } catch (e) {
      console.warn('AI competencies request failed, fallback used', e);
    }
    return false;
  },

  fetchAIAnalysis: async (employeeId: string) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return null;
    const job = jobs.find(j => j.id === emp.jobId);
    const comps = competencyService.getCompetenciesByJob(emp.jobId);
    const evals = competencyService.getEmployeeEvaluations(employeeId);

    try {
      const res = await fetch('/api/gemini/analyze-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: emp.name,
          jobTitle: job?.title || '',
          competencies: comps,
          evaluations: evals
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        return data.analysis;
      }
    } catch (e) {
      console.warn('AI matrix analysis failed', e);
    }
    return null;
  }
};
