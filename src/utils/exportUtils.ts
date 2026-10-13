import * as XLSX from 'xlsx';
import { Job, Duty, Competency, Employee, CompetencyEvaluation, competencyService, ProficiencyLevel } from '../services/competencyService';

const PROFICIENCY_NAMES: Record<number, string> = {
  1: 'سطح ۱ - مقدماتی و آشنایی',
  2: 'سطح ۲ - در حال توسعه',
  3: 'سطح ۳ - تسلط پایه و مستقل',
  4: 'سطح ۴ - تسلط کامل و پیشرفته',
  5: 'سطح ۵ - خبرگی و الگوی سازمانی'
};

// Export Standard Faraja Competency Matrix & Evaluation to Excel
export function exportCompetencyMatrixToExcel({
  jobs,
  duties,
  competencies,
  employees,
  evaluations,
  selectedJobTitle,
  selectedEmployee,
}: {
  jobs: Job[];
  duties: Duty[];
  competencies: Competency[];
  employees: Employee[];
  evaluations: CompetencyEvaluation[];
  selectedJobTitle?: string;
  selectedEmployee?: Employee;
}) {
  const wb = XLSX.utils.book_new();

  // 1. Comprehensive Employee & Matrix Sheet
  const matrixData: any[] = [];
  matrixData.push(['جمهوری اسلامی ایران']);
  matrixData.push(['فرماندهی انتظامی جمهوری اسلامی ایران (فراجا) - معاونت سرمایه انسانی']);
  matrixData.push(['کارنامه جامع سنجش شایستگی، انطباق شغلی و ارزیابی عملکرد کارکنان']);
  matrixData.push([]);
  
  if (selectedEmployee) {
    const empJob = jobs.find(j => j.id === selectedEmployee.jobId);
    const prod = competencyService.getEmployeeProductivitySummary(selectedEmployee.id);
    matrixData.push([
      `نام و نشان: ${selectedEmployee.name}`,
      `کد پرسنلی: ${selectedEmployee.personnelCode}`,
      `درجه/رتبه: ${selectedEmployee.rank}`,
      `یگان خدمتی: ${selectedEmployee.unit}`,
      `ردیف شغلی: ${empJob?.title || selectedJobTitle || '-'}`,
      `شاخص کل بهره‌وری: ${prod?.productivityIndex || 0}٪`,
      `میانگین نمرات: ${prod?.avgScore || 0} از ۱۰۰`,
    ]);
  } else {
    matrixData.push([`حوزه/شغل: ${selectedJobTitle || 'کلیه مشاغل و رسته‌های انتظامی'}`]);
  }
  matrixData.push([`تاریخ صدور گزارش: ${new Date().toLocaleDateString('fa-IR')}`]);
  matrixData.push([]);

  // Header row
  matrixData.push([
    'ردیف',
    'عنوان شایستگی',
    'شرح وظیفه سازمانی مرتبط',
    'فرمول سنجش عملکرد وظیفه (KPI)',
    'سطح کارکرد سازمانی',
    'سطح اثرگذاری',
    'سطح تسلط (۱ تا ۵)',
    'نوع شایستگی',
    'اهمیت',
    'نمره هدف (معیار فراجا)',
    'نمره کسب‌شده',
    'شکاف شایستگی',
    'وضعیت انطباق',
    'معیار ارزیابی و شواهد رفتاری',
    'یادداشت و توصیه ارزیاب',
  ]);

  competencies.forEach((c, idx) => {
    const duty = duties.find((d) => d.id === c.dutyId);
    const ev = evaluations.find((e) => e.competencyId === c.id && (!selectedEmployee || e.employeeId === selectedEmployee.id));
    const score = ev?.score ?? 0;
    const gap = score > 0 ? score - c.expectedScore : 0;
    const status = score === 0 
      ? 'ارزیابی نشده' 
      : gap >= 0 
        ? 'منطبق / فراتر از انتظار' 
        : 'نیازمند آموزش و بهبود';

    matrixData.push([
      idx + 1,
      c.title,
      duty?.title || 'عمومی و مشترک',
      duty?.formula || '-',
      getPersianLevel(c.level),
      getPersianImpact(c.impact),
      PROFICIENCY_NAMES[c.proficiencyLevel] || `سطح ${c.proficiencyLevel}`,
      getPersianType(c.type),
      getPersianImportance(c.importance),
      c.expectedScore,
      score > 0 ? score : '-',
      score > 0 ? (gap >= 0 ? `+${gap}` : `${gap}`) : '-',
      status,
      c.evaluationCriteria || '-',
      ev?.notes || '-',
    ]);
  });

  const wsMatrix = XLSX.utils.aoa_to_sheet(matrixData);
  wsMatrix['!cols'] = [
    { wch: 6 },
    { wch: 38 },
    { wch: 45 },
    { wch: 45 },
    { wch: 18 },
    { wch: 18 },
    { wch: 25 },
    { wch: 14 },
    { wch: 14 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 24 },
    { wch: 50 },
    { wch: 40 },
  ];
  XLSX.utils.book_append_sheet(wb, wsMatrix, 'ماتریس و کارنامه شایستگی');

  // 2. Jobs and Duties Sheet
  const dutiesData: any[] = [];
  dutiesData.push(['شناسنامه مشاغل و استانداردهای شرح وظایف فراجا']);
  dutiesData.push([]);
  dutiesData.push(['ردیف', 'عنوان ردیف شغلی', 'رسته سازمانی', 'شرح وظیفه / مسئولیت کلیدی', 'توضیحات تکمیلی', 'فرمول سنجش شاخص عملکرد (KPI)']);
  
  duties.forEach((d, idx) => {
    const job = jobs.find((j) => j.id === d.jobId);
    dutiesData.push([
      idx + 1,
      job?.title || '-',
      job?.category || 'انتظامی',
      d.title,
      d.description || '-',
      d.formula || '-',
    ]);
  });

  const wsDuties = XLSX.utils.aoa_to_sheet(dutiesData);
  wsDuties['!cols'] = [
    { wch: 6 },
    { wch: 35 },
    { wch: 25 },
    { wch: 45 },
    { wch: 40 },
    { wch: 60 },
  ];
  XLSX.utils.book_append_sheet(wb, wsDuties, 'مشاغل و شرح وظایف');

  // 3. 5x4 Grid Matrix Pivot Sheet
  const gridData: any[] = [];
  gridData.push(['ماتریس ۵×۴ تطابق سطوح کارکردی و سطوح اثرگذاری فراجا']);
  gridData.push([]);
  gridData.push([
    'سطح کارکرد سازمانی',
    '۱. درون‌داد (Input)',
    '۲. فرآیند (Process)',
    '۳. محصول (Product)',
    '۴. برون‌داد (Output)',
    '۵. پیامد و اثر (Outcome)',
  ]);

  const funcLevels: { id: any; label: string }[] = [
    { id: 'individual', label: 'فردی (Individual)' },
    { id: 'team', label: 'گروهی (Team)' },
    { id: 'organizational', label: 'سازمانی (Organizational)' },
    { id: 'social', label: 'اجتماعی (Social)' },
  ];

  const impacts = ['input', 'process', 'product', 'output', 'outcome'];

  funcLevels.forEach(fl => {
    const row = [fl.label];
    impacts.forEach(imp => {
      const matching = competencies.filter(c => c.level === fl.id && c.impact === imp);
      const text = matching.map(m => `• ${m.title} (هدف: ${m.expectedScore}٪)`).join('\n') || '-';
      row.push(text);
    });
    gridData.push(row);
  });

  const wsGrid = XLSX.utils.aoa_to_sheet(gridData);
  wsGrid['!cols'] = [
    { wch: 25 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
  ];
  XLSX.utils.book_append_sheet(wb, wsGrid, 'ماتریس ۵×۴ تطابق');

  // Trigger download
  const empPrefix = selectedEmployee ? `_${selectedEmployee.name.replace(/\s+/g, '_')}` : '';
  const fileName = `گزارش_رسمی_شایستگی_فراجا${empPrefix}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

// Download Excel Template for Data Entry
export function downloadCompetencyExcelTemplate() {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Jobs & Duties Template
  const jobsHeaders = [
    ['قالب استاندارد ورود اطلاعات مشاغل و شرح وظایف - فراجا'],
    ['راهنما: ردیف‌های نمونه زیر را ویرایش کرده یا ردیف‌های جدید اضافه نمایید.'],
    [],
    ['عنوان شغل', 'رسته سازمانی', 'شرح وظیفه / مسئولیت', 'توضیحات تکمیلی وظیفه', 'فرمول سنجش عملکرد (KPI)'],
    ['افسر گشت واکنش سریع ۱۱۰', 'پلیس پیشگیری', 'حضور سریع در صحنه فوریت‌های پلیسی', 'اعزام فوری و برقراری امنیت اولیه صحنه', 'شاخص = (ماموریت‌های زیر ۷ دقیقه / کل) × ۱۰۰'],
    ['کارآگاه جرایم سایبری', 'پلیس فتا', 'پایش درگاه‌های فیشینگ و انسداد حساب‌ها', 'شناسایی تارنماهای جعلی بانکی', 'شاخص = (وجوه صیانت شده / کل مطالبات) × ۱۰۰'],
    ['افسر کارشناس تصادفات', 'پلیس راهور', 'ترسیم کروکی و تعیین علت تامه سوانح', 'بررسی زوایای برخورد و تعیین مقصر', 'شاخص = (کروکی‌های بدون نقص / کل) × ۱۰۰'],
  ];
  const wsJobs = XLSX.utils.aoa_to_sheet(jobsHeaders);
  wsJobs['!cols'] = [{ wch: 30 }, { wch: 20 }, { wch: 40 }, { wch: 35 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsJobs, 'مشاغل و وظایف');

  // Sheet 2: Competencies Template
  const compHeaders = [
    ['قالب استاندارد ورود اطلاعات شایستگی‌ها - فراجا'],
    ['مقادیر مجاز سطح کارکرد: فردی | گروهی | سازمانی | اجتماعی'],
    ['مقادیر مجاز سطح اثرگذاری: درون‌داد | فرآیند | محصول | برون‌داد | پیامد و اثر'],
    ['مقادیر مجاز نوع: تخصصی | عمومی | محوری   |  اهمیت: حیاتی | توانمندساز | بهبوددهنده'],
    [],
    ['عنوان شغل مرتبط', 'عنوان وظیفه مرتبط', 'عنوان شایستگی', 'سطح کارکرد', 'سطح اثرگذاری', 'نوع شایستگی', 'نقش (اهمیت)', 'سطح تسلط (۱ تا ۵)', 'نمره هدف (۰ تا ۱۰۰)', 'معیار ارزیابی (KPI)'],
    ['افسر گشت واکنش سریع ۱۱۰', 'حضور سریع در صحنه فوریت‌های پلیسی', 'جهت‌یابی، نقشه‌خوانی و مسیریابی تاکتیکی', 'فردی', 'فرآیند', 'تخصصی', 'حیاتی', 4, 90, 'رسیدن به صحنه در کمتر از زمان استاندارد با ثبت GPS'],
    ['افسر گشت واکنش سریع ۱۱۰', 'حضور سریع در صحنه فوریت‌های پلیسی', 'کنترل صحنه و رفتار مقتدرانه با شهروندان', 'اجتماعی', 'برون‌داد', 'عمومی', 'حیاتی', 4, 85, 'رضایت بیش از ۹۰ درصدی شهروندان در سامانه ۱۹۷'],
    ['کارآگاه جرایم سایبری', 'پایش درگاه‌های فیشینگ و انسداد حساب‌ها', 'ردیابی و فارنزیک تجهیزات دیجیتال', 'فردی', 'محصول', 'تخصصی', 'حیاتی', 5, 95, 'استخراج ادله معتبر مورد تایید دادسرا'],
  ];
  const wsComp = XLSX.utils.aoa_to_sheet(compHeaders);
  wsComp['!cols'] = [{ wch: 25 }, { wch: 35 }, { wch: 35 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsComp, 'شایستگی‌ها');

  // Sheet 3: Personnel & Evaluations Template
  const evalHeaders = [
    ['قالب استاندارد ورود اطلاعات کارکنان و نمرات ارزیابی'],
    ['راهنما: نمره واقعی از ۱۰۰ ثبت شود.'],
    [],
    ['نام پرسنل', 'کد پرسنلی', 'درجه', 'یگان خدمتی', 'عنوان شغل', 'عنوان شایستگی', 'نمره واقعی (۰ تا ۱۰۰)', 'یادداشت ارزیاب'],
    ['محمدرضا یزدان‌پناه', '98451203', 'ستوان‌یکم', 'یگان امداد فاتب', 'افسر گشت واکنش سریع ۱۱۰', 'جهت‌یابی، نقشه‌خوانی و مسیریابی تاکتیکی', 92, 'عملکرد برجسته در ناوبری سریع'],
    ['علی حسینی', '97110482', 'ستوان‌دوم', 'یگان امداد فاتب', 'افسر گشت واکنش سریع ۱۱۰', 'کنترل صحنه و رفتار مقتدرانه با شهروندان', 88, 'پایبندی کامل به حقوق شهروندی'],
  ];
  const wsEval = XLSX.utils.aoa_to_sheet(evalHeaders);
  wsEval['!cols'] = [{ wch: 22 }, { wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 28 }, { wch: 35 }, { wch: 20 }, { wch: 35 }];
  XLSX.utils.book_append_sheet(wb, wsEval, 'پرسنل و ارزیابی');

  XLSX.writeFile(wb, 'قالب_اکسل_ورود_اطلاعات_شایستگی_فراجا.xlsx');
}

// Import Competency Data from Excel file
export async function importCompetencyDataFromExcel(file: File): Promise<{
  success: boolean;
  message: string;
  importedJobs: number;
  importedDuties: number;
  importedCompetencies: number;
  importedEvaluations: number;
}> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        let importedJobs = 0;
        let importedDuties = 0;
        let importedCompetencies = 0;
        let importedEvaluations = 0;

        const currentJobs = competencyService.getJobs();
        const currentDuties = competencyService.getAllDuties();

        // 1. Process Jobs & Duties Sheet
        const jobsSheetName = workbook.SheetNames.find(
          (name) => name.includes('مشاغل') || name.includes('وظایف') || name.toLowerCase().includes('job')
        );

        if (jobsSheetName) {
          const sheet = workbook.Sheets[jobsSheetName];
          const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
          let headerIdx = -1;
          for (let i = 0; i < Math.min(rows.length, 10); i++) {
            const row = rows[i] || [];
            if (row.some((cell: any) => typeof cell === 'string' && (cell.includes('شغل') || cell.includes('وظیفه') || cell.includes('عنوان')))) {
              headerIdx = i;
              break;
            }
          }

          if (headerIdx !== -1) {
            for (let i = headerIdx + 1; i < rows.length; i++) {
              const row = rows[i];
              if (!row || !row[0]) continue;

              const jobTitle = String(row[0] || '').trim();
              const category = String(row[1] || 'انتظامی').trim();
              const dutyTitle = String(row[2] || '').trim();
              const dutyDesc = String(row[3] || '').trim();
              const dutyFormula = String(row[4] || '').trim();

              if (!jobTitle) continue;

              let existingJob = currentJobs.find((j) => j.title.toLowerCase() === jobTitle.toLowerCase());
              if (!existingJob) {
                existingJob = competencyService.addJob({
                  title: jobTitle,
                  category: category || 'انتظامی',
                  department: 'سایر دوایر',
                  status: 'active'
                });
                currentJobs.push(existingJob);
                importedJobs++;
              }

              if (dutyTitle && existingJob) {
                const existingDuty = currentDuties.find(
                  (d) => d.jobId === existingJob?.id && d.title.toLowerCase() === dutyTitle.toLowerCase()
                );
                if (!existingDuty) {
                  const newDuty = competencyService.addDuty({
                    jobId: existingJob.id,
                    title: dutyTitle,
                    description: dutyDesc,
                    formula: dutyFormula,
                  });
                  currentDuties.push(newDuty);
                  importedDuties++;
                }
              }
            }
          }
        }

        // 2. Process Competencies Sheet
        const compSheetName = workbook.SheetNames.find(
          (name) => name.includes('شایستگی') || name.toLowerCase().includes('comp') || name.includes('ماتریس')
        );

        if (compSheetName) {
          const sheet = workbook.Sheets[compSheetName];
          const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          let headerIdx = -1;
          for (let i = 0; i < Math.min(rows.length, 10); i++) {
            const row = rows[i] || [];
            if (row.some((cell: any) => typeof cell === 'string' && (cell.includes('شایستگی') || cell.includes('سطح')))) {
              headerIdx = i;
              break;
            }
          }

          if (headerIdx !== -1) {
            for (let i = headerIdx + 1; i < rows.length; i++) {
              const row = rows[i];
              if (!row || !row[2]) continue;

              const jobTitle = String(row[0] || '').trim();
              const dutyTitle = String(row[1] || '').trim();
              const compTitle = String(row[2] || '').trim();
              const levelStr = String(row[3] || 'فردی').trim();
              const impactStr = String(row[4] || 'فرآیند').trim();
              const typeStr = String(row[5] || 'تخصصی').trim();
              const impStr = String(row[6] || 'حیاتی').trim();
              const profLevel = Math.min(Math.max(Number(row[7]) || 4, 1), 5) as any;
              const expectedScore = Math.min(Math.max(Number(row[8]) || 85, 50), 100);
              const criteria = String(row[9] || '').trim();

              if (!compTitle) continue;

              let duty = currentDuties.find((d) => d.title.toLowerCase() === dutyTitle.toLowerCase());
              if (!duty && jobTitle) {
                const job = currentJobs.find((j) => j.title.toLowerCase() === jobTitle.toLowerCase());
                if (job) {
                  duty = currentDuties.find((d) => d.jobId === job.id);
                }
              }
              if (!duty && currentDuties.length > 0) {
                duty = currentDuties[0];
              }

              if (duty) {
                competencyService.addCompetency({
                  dutyId: duty.id,
                  title: compTitle,
                  level: parsePersianLevel(levelStr),
                  impact: parsePersianImpact(impactStr),
                  type: parsePersianType(typeStr),
                  importance: parsePersianImportance(impStr),
                  proficiencyLevel: profLevel,
                  expectedScore,
                  evaluationCriteria: criteria,
                });
                importedCompetencies++;
              }
            }
          }
        }

        // 3. Process Evaluations Sheet
        const evalSheetName = workbook.SheetNames.find(
          (name) => name.includes('ارزیابی') || name.includes('پرسنل') || name.toLowerCase().includes('eval')
        );

        if (evalSheetName) {
          const sheet = workbook.Sheets[evalSheetName];
          const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          let headerIdx = -1;
          for (let i = 0; i < Math.min(rows.length, 10); i++) {
            const row = rows[i] || [];
            if (row.some((cell: any) => typeof cell === 'string' && (cell.includes('نمره') || cell.includes('پرسنل') || cell.includes('ارزیاب')))) {
              headerIdx = i;
              break;
            }
          }

          if (headerIdx !== -1) {
            const employees = competencyService.getEmployees();
            const allComps = competencyService.getAllCompetencies();

            for (let i = headerIdx + 1; i < rows.length; i++) {
              const row = rows[i];
              if (!row || !row[0]) continue;

              const empName = String(row[0] || '').trim();
              const compTitle = String(row[5] || row[2] || '').trim();
              const score = Number(row[6] || row[5] || 85);
              const notes = String(row[7] || row[6] || '').trim();

              const emp = employees.find((e) => e.name.toLowerCase() === empName.toLowerCase());
              const comp = allComps.find((c) => c.title.toLowerCase() === compTitle.toLowerCase());

              if (emp && comp) {
                competencyService.saveEvaluation({
                  employeeId: emp.id,
                  competencyId: comp.id,
                  score: Math.min(Math.max(score, 0), 100),
                  evaluatorId: 'imported_excel',
                  notes: notes || 'ثبت‌شده از طریق فایل اکسل',
                });
                importedEvaluations++;
              }
            }
          }
        }

        resolve({
          success: true,
          message: `عملیات بارگذاری فایل اکسل با موفقیت انجام شد: ${importedJobs} شغل، ${importedDuties} شرح وظیفه، ${importedCompetencies} شایستگی و ${importedEvaluations} ارزیابی ثبت گردید.`,
          importedJobs,
          importedDuties,
          importedCompetencies,
          importedEvaluations,
        });
      } catch (err: any) {
        console.error('Error importing excel:', err);
        resolve({
          success: false,
          message: `خطا در پردازش فایل اکسل: ${err?.message || 'قالب فایل معتبر نیست.'}`,
          importedJobs: 0,
          importedDuties: 0,
          importedCompetencies: 0,
          importedEvaluations: 0,
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        message: 'خطا در خواندن فایل بارگذاری‌شده.',
        importedJobs: 0,
        importedDuties: 0,
        importedCompetencies: 0,
        importedEvaluations: 0,
      });
    };

    reader.readAsArrayBuffer(file);
  });
}

// Helpers for parsing Persian dropdown values from Excel
function parsePersianLevel(str: string): any {
  if (str.includes('گروه') || str.includes('تیم')) return 'team';
  if (str.includes('سازمان')) return 'organizational';
  if (str.includes('اجتماع') || str.includes('مردم')) return 'social';
  return 'individual';
}

function parsePersianImpact(str: string): any {
  if (str.includes('درون') || str.includes('ورودی')) return 'input';
  if (str.includes('فرآیند') || str.includes('فرایند')) return 'process';
  if (str.includes('محصول')) return 'product';
  if (str.includes('برون') || str.includes('خروجی')) return 'output';
  if (str.includes('پیامد') || str.includes('اثر')) return 'outcome';
  return 'process';
}

function parsePersianType(str: string): any {
  if (str.includes('تخصص')) return 'specialized';
  if (str.includes('محور')) return 'core';
  return 'general';
}

function parsePersianImportance(str: string): any {
  if (str.includes('حیات') || str.includes('ضرور')) return 'critical';
  if (str.includes('توانمند') || str.includes('اصلی')) return 'enabler';
  return 'improver';
}

export function getPersianLevel(level: string) {
  switch (level) {
    case 'individual':
      return 'فردی (Individual)';
    case 'team':
      return 'گروهی (Team)';
    case 'organizational':
      return 'سازمانی (Organizational)';
    case 'social':
      return 'اجتماعی (Social)';
    default:
      return level;
  }
}

export function getPersianImpact(impact: string) {
  switch (impact) {
    case 'input':
      return '۱. درون‌داد (Input)';
    case 'process':
      return '۲. فرآیند (Process)';
    case 'product':
      return '۳. محصول (Product)';
    case 'output':
      return '۴. برون‌داد (Output)';
    case 'outcome':
      return '۵. پیامد و اثر (Outcome)';
    default:
      return impact;
  }
}

export function getPersianType(type: string) {
  switch (type) {
    case 'specialized':
      return 'تخصصی';
    case 'general':
      return 'عمومی';
    case 'core':
      return 'محوری';
    default:
      return type;
  }
}

export function getPersianImportance(imp: string) {
  switch (imp) {
    case 'critical':
      return 'حیاتی';
    case 'enabler':
      return 'توانمندساز';
    case 'improver':
      return 'بهبوددهنده';
    default:
      return imp;
  }
}

// Print / PDF helper using invisible iframe for Faraja Standard Institutional Output
export function printCompetencyReport(title: string, contentHtml: string) {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        body { 
          font-family: system-ui, -apple-system, 'Segoe UI', Tahoma, sans-serif; 
          padding: 8px; 
          color: #0f172a; 
          direction: rtl; 
          background: #ffffff; 
          font-size: 11px;
          line-height: 1.5;
        }
        h1, h2, h3, h4 { color: #0f172a; margin: 0; }
        .official-header {
          border-bottom: 2.5px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .official-header .title-block {
          text-align: right;
        }
        .official-header .meta-block {
          text-align: left;
          font-size: 10px;
          color: #475569;
          line-height: 1.6;
        }
        .person-badge-box {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 14px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          font-size: 10.5px;
        }
        .person-badge-box div span {
          color: #64748b;
          font-weight: normal;
        }
        .person-badge-box div strong {
          color: #0f172a;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          font-size: 10px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 6px 8px;
          text-align: right;
          vertical-align: middle;
        }
        th {
          background-color: #0f172a;
          color: #ffffff;
          font-weight: bold;
          font-size: 10.5px;
        }
        tr:nth-child(even) {
          background-color: #f8fafc;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 9.5px;
          font-weight: bold;
        }
        .badge-success { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
        .badge-warning { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
        .badge-danger { background: #ffe4e6; color: #9f1239; border: 1px solid #fecdd3; }
        .badge-info { background: #e0f2fe; color: #075985; border: 1px solid #bae6fd; }
        .signatures {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px dashed #94a3b8;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #334155;
          page-break-inside: avoid;
        }
        .sig-col {
          width: 30%;
          text-align: center;
        }
        .sig-line {
          margin-top: 35px;
          border-top: 1px solid #64748b;
          padding-top: 4px;
          font-weight: bold;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="official-header">
        <div class="title-block">
          <div style="font-size: 10px; color: #475569; font-weight: bold;">جمهوری اسلامی ایران</div>
          <h2 style="font-size: 15px; font-weight: 900; margin: 2px 0;">فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)</h2>
          <div style="font-size: 12px; font-weight: bold; color: #1e3a8a;">مرکز ارزیابی و تعالی شایستگی کارکنان - معاونت سرمایه انسانی</div>
        </div>
        <div class="meta-block">
          <div><strong>شناسه سند:</strong> FRJ-EVAL-${Date.now().toString().slice(-6)}</div>
          <div><strong>تاریخ صدور:</strong> ${new Date().toLocaleDateString('fa-IR')}</div>
          <div><strong>طبقه‌بندی:</strong> سازمانی - محرمانه</div>
          <div><strong>وضعیت:</strong> مصوب کمیسیون ارزیابی</div>
        </div>
      </div>

      ${contentHtml}

      <div class="signatures">
        <div class="sig-col">
          <div>امضای ارزیابی‌شونده / صاحب کارنامه</div>
          <div class="sig-line">تایید و رویت کارنامه</div>
        </div>
        <div class="sig-col">
          <div>امضای ارزیاب ارشد / کانون ارزیابی</div>
          <div class="sig-line">ستوان‌یکم کارشناس سنجش شایستگی</div>
        </div>
        <div class="sig-col">
          <div>تایید معاونت سرمایه انسانی و فرماندهی یگان</div>
          <div class="sig-line">مهر و امضای رسمی یگان خدمتی</div>
        </div>
      </div>
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  }, 400);
}
