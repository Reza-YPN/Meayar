import * as XLSX from 'xlsx';
import { 
  PersonnelPerformanceRecord, 
  UnitPerformanceData, 
  ExcelImportSummary, 
  ExcelImportRow 
} from '../types/decisionSupport';

export type SupportedExcelSchema = 'personnel' | 'unit_kpis' | 'competencies' | 'attendance';

export class ExcelIngestionService {
  /**
   * Parse an uploaded Excel/CSV file from ArrayBuffer
   */
  public static async parseExcelFile(
    file: File, 
    schemaType: SupportedExcelSchema
  ): Promise<ExcelImportSummary> {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    
    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      throw new Error("فایل اکسل فاقد کاربرگ (Sheet) معتبر است.");
    }
    
    const worksheet = workbook.Sheets[sheetName];
    const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    if (!rawRows || rawRows.length === 0) {
      throw new Error("هیچ ردیف داده‌ای در فایل اکسل یافت نشد.");
    }

    const validatedRows: ExcelImportRow[] = rawRows.map((row, index) => {
      return this.validateRow(row, index + 2, schemaType); // index+2 considering header is row 1
    });

    const validCount = validatedRows.filter(r => r.status === 'valid').length;
    const warningCount = validatedRows.filter(r => r.status === 'warning').length;
    const errorCount = validatedRows.filter(r => r.status === 'error').length;

    return {
      fileName: file.name,
      fileSize: file.size,
      totalRows: validatedRows.length,
      validCount,
      warningCount,
      errorCount,
      dataType: schemaType,
      timestamp: new Date().toLocaleDateString('fa-IR'),
      rows: validatedRows
    };
  }

  /**
   * Validate individual row against schema
   */
  private static validateRow(
    row: Record<string, any>, 
    rowNumber: number, 
    schemaType: SupportedExcelSchema
  ): ExcelImportRow {
    const messages: string[] = [];
    let status: 'valid' | 'warning' | 'error' = 'valid';

    // Normalize keys: trim and Persian cleanup
    const normalized: Record<string, any> = {};
    for (const key of Object.keys(row)) {
      const cleanKey = key.trim();
      normalized[cleanKey] = row[key];
    }

    let parsedData: any = null;

    if (schemaType === 'personnel') {
      const personnelId = String(normalized['کد پرسنلی'] || normalized['کد_پرسنلی'] || normalized['personnelId'] || '').trim();
      const name = String(normalized['نام و نام خانوادگی'] || normalized['نام'] || normalized['name'] || '').trim();
      const unit = String(normalized['یگان'] || normalized['نام یگان'] || normalized['unit'] || '').trim();
      const rank = String(normalized['درجه'] || normalized['rank'] || 'ستوان یکم').trim();
      
      const overallScoreRaw = normalized['نمره کل'] || normalized['نمره عملکرد'] || normalized['overallScore'];
      const overallScore = Number(overallScoreRaw);
      
      const resultScore = Number(normalized['شاخص نتیجه‌ای'] || normalized['resultScore'] || overallScore || 80);
      const behavioralScore = Number(normalized['شاخص رفتاری'] || normalized['behavioralScore'] || 80);
      const competencyScore = Number(normalized['شاخص شایستگی'] || normalized['competencyScore'] || 80);
      const trainingHours = Number(normalized['ساعات آموزش'] || normalized['trainingHours'] || 20);
      const overtimeHours = Number(normalized['ساعات اضافه‌کار'] || normalized['overtimeHours'] || 30);
      const leaveDays = Number(normalized['روزهای مرخصی'] || normalized['leaveDays'] || 4);
      const citizenSatisfaction = Number(normalized['رضایت شهروندی'] || normalized['citizenSatisfaction'] || 85);
      const period = String(normalized['دوره ارزیابی'] || normalized['period'] || 'بهار ۱۴۰۳').trim();

      if (!personnelId) {
        messages.push("کد پرسنلی الزامی است.");
        status = 'error';
      } else if (!/^\d{5,8}$/.test(personnelId)) {
        messages.push("فرمت کد پرسنلی باید ۵ الی ۸ رقم عددی باشد.");
        status = 'warning';
      }

      if (!name) {
        messages.push("نام و نام خانوادگی الزامی است.");
        status = 'error';
      }

      if (isNaN(overallScore) || overallScore < 0 || overallScore > 100) {
        messages.push(`نمره عملکرد (${overallScoreRaw}) باید عددی بین ۰ تا ۱۰۰ باشد.`);
        status = 'error';
      }

      let burnoutRisk: 'پایین' | 'متوسط' | 'بالا' | 'بحرانی' = 'پایین';
      if (overtimeHours > 55) burnoutRisk = 'بحرانی';
      else if (overtimeHours > 42) burnoutRisk = 'بالا';
      else if (overtimeHours > 30) burnoutRisk = 'متوسط';

      if (status !== 'error') {
        parsedData = {
          id: `p-${personnelId}-${Date.now().toString(36)}`,
          personnelId,
          name,
          unit: unit || 'کلانتری ۱۰۳ گاندی',
          rank,
          overallScore: Math.min(100, Math.max(0, overallScore)),
          resultScore: Math.min(100, Math.max(0, resultScore)),
          behavioralScore: Math.min(100, Math.max(0, behavioralScore)),
          competencyScore: Math.min(100, Math.max(0, competencyScore)),
          trainingHours,
          overtimeHours,
          leaveDays,
          citizenSatisfaction: Math.min(100, Math.max(0, citizenSatisfaction)),
          burnoutRisk,
          period,
          updatedAt: new Date().toISOString()
        } as PersonnelPerformanceRecord;
      }
    } else if (schemaType === 'unit_kpis') {
      const unitCode = String(normalized['کد یگان'] || normalized['unitCode'] || '').trim();
      const unitName = String(normalized['نام یگان'] || normalized['unitName'] || '').trim();
      const parentCommand = String(normalized['فرماندهی بالادست'] || normalized['parentCommand'] || 'فرماندهی انتظامی تهران بزرگ').trim();
      const personnelCount = Number(normalized['تعداد پرسنل'] || normalized['personnelCount'] || 40);
      const averagePerformanceScore = Number(normalized['میانگین عملکرد'] || normalized['averagePerformanceScore'] || 75);
      const averageOvertimeHours = Number(normalized['میانگین اضافه‌کار'] || normalized['averageOvertimeHours'] || 35);
      const averageTrainingHours = Number(normalized['میانگین آموزش'] || normalized['averageTrainingHours'] || 18);
      const turnoverRate = Number(normalized['نرخ جابه‌جایی'] || normalized['turnoverRate'] || 5);
      const citizenSatisfactionRate = Number(normalized['رضایت شهروندان'] || normalized['citizenSatisfactionRate'] || 82);

      if (!unitCode || !unitName) {
        messages.push("کد و نام یگان الزامی هستند.");
        status = 'error';
      }

      if (isNaN(averagePerformanceScore) || averagePerformanceScore < 0 || averagePerformanceScore > 100) {
        messages.push("میانگین نمره عملکرد باید عددی بین ۰ تا ۱۰۰ باشد.");
        status = 'error';
      }

      let unitStatus: 'عالی' | 'مطلوب' | 'هشدار' | 'بحرانی' = 'مطلوب';
      if (averagePerformanceScore < 65 || averageOvertimeHours > 50) unitStatus = 'بحرانی';
      else if (averagePerformanceScore < 75 || averageOvertimeHours > 40) unitStatus = 'هشدار';
      else if (averagePerformanceScore >= 85) unitStatus = 'عالی';

      if (status !== 'error') {
        parsedData = {
          unitCode,
          unitName,
          parentCommand,
          personnelCount,
          averagePerformanceScore,
          averageResultScore: averagePerformanceScore - 2,
          averageCompetencyScore: averagePerformanceScore + 1,
          averageOvertimeHours,
          averageTrainingHours,
          turnoverRate,
          citizenSatisfactionRate,
          operationalReadiness: Math.min(100, Math.round(averagePerformanceScore * 0.95 + 4)),
          disciplinaryRate: averageOvertimeHours > 45 ? 4.2 : 1.2,
          status: unitStatus,
          historicalTrend: [
            { period: 'بهار', score: averagePerformanceScore - 3, overtime: averageOvertimeHours + 4, training: averageTrainingHours - 2, satisfaction: citizenSatisfactionRate - 2 },
            { period: 'تابستان', score: averagePerformanceScore - 1, overtime: averageOvertimeHours + 2, training: averageTrainingHours - 1, satisfaction: citizenSatisfactionRate - 1 },
            { period: 'پاییز', score: averagePerformanceScore, overtime: averageOvertimeHours, training: averageTrainingHours, satisfaction: citizenSatisfactionRate },
            { period: 'زمستان', score: Math.min(100, averagePerformanceScore + 2), overtime: Math.max(10, averageOvertimeHours - 3), training: averageTrainingHours + 4, satisfaction: Math.min(100, citizenSatisfactionRate + 3) },
          ]
        } as UnitPerformanceData;
      }
    } else {
      // Default fallback generic check
      if (Object.keys(normalized).length === 0) {
        messages.push("ردیف خالی است.");
        status = 'error';
      } else {
        parsedData = normalized;
      }
    }

    if (messages.length === 0) {
      messages.push("داده‌های ردیف معتبر است.");
    }

    return {
      rowNumber,
      raw: row,
      parsedData,
      status,
      messages
    };
  }

  /**
   * Generates and downloads a standard sample Excel template
   */
  public static downloadSampleTemplate(schemaType: SupportedExcelSchema) {
    let sampleData: any[] = [];
    let fileName = "";

    if (schemaType === 'personnel') {
      fileName = "قالب_اکسل_ثبت_شاخص_عملکرد_پرسنل_فراجا.xlsx";
      sampleData = [
        {
          "کد پرسنلی": "124567",
          "نام و نام خانوادگی": "سرگرد محمدرضا یزدان پناه",
          "یگان": "کلانتری ۱۰۳ گاندی",
          "درجه": "سرگرد",
          "نمره کل": 88,
          "شاخص نتیجه‌ای": 90,
          "شاخص رفتاری": 86,
          "شاخص شایستگی": 89,
          "ساعات آموزش": 28,
          "ساعات اضافه‌کار": 32,
          "روزهای مرخصی": 3,
          "رضایت شهروندی": 94,
          "دوره ارزیابی": "بهار ۱۴۰۳"
        },
        {
          "کد پرسنلی": "238914",
          "نام و نام خانوادگی": "ستوان دوم علیرضا حسینی",
          "یگان": "کلانتری ۱۱۵ رازی",
          "درجه": "ستوان دوم",
          "نمره کل": 72,
          "شاخص نتیجه‌ای": 70,
          "شاخص رفتاری": 74,
          "شاخص شایستگی": 71,
          "ساعات آموزش": 14,
          "ساعات اضافه‌کار": 52,
          "روزهای مرخصی": 1,
          "رضایت شهروندی": 78,
          "دوره ارزیابی": "بهار ۱۴۰۳"
        },
        {
          "کد پرسنلی": "319082",
          "نام و نام خانوادگی": "سروان مهدی رضایی",
          "یگان": "کلانتری ۱۲۴ قلهک",
          "درجه": "سروان",
          "نمره کل": 94,
          "شاخص نتیجه‌ای": 95,
          "شاخص رفتاری": 93,
          "شاخص شایستگی": 96,
          "ساعات آموزش": 36,
          "ساعات اضافه‌کار": 24,
          "روزهای مرخصی": 5,
          "رضایت شهروندی": 98,
          "دوره ارزیابی": "بهار ۱۴۰۳"
        }
      ];
    } else if (schemaType === 'unit_kpis') {
      fileName = "قالب_اکسل_شاخص‌های_کلان_یگان‌های_فراجا.xlsx";
      sampleData = [
        {
          "کد یگان": "YGN-103",
          "نام یگان": "کلانتری ۱۰۳ گاندی",
          "فرماندهی بالادست": "سرکلانتری سوم فاتب",
          "تعداد پرسنل": 48,
          "میانگین عملکرد": 86.5,
          "میانگین اضافه‌کار": 31,
          "میانگین آموزش": 26,
          "نرخ جابه‌جایی": 3.2,
          "رضایت شهروندان": 91
        },
        {
          "کد یگان": "YGN-115",
          "نام یگان": "کلانتری ۱۱۵ رازی",
          "فرماندهی بالادست": "سرکلانتری هشتم فاتب",
          "تعداد پرسنل": 52,
          "میانگین عملکرد": 68.2,
          "میانگین اضافه‌کار": 54,
          "میانگین آموزش": 12,
          "نرخ جابه‌جایی": 8.7,
          "رضایت شهروندان": 76
        },
        {
          "کد یگان": "YGN-124",
          "نام یگان": "کلانتری ۱۲۴ قلهک",
          "فرماندهی بالادست": "سرکلانتری سوم فاتب",
          "تعداد پرسنل": 42,
          "میانگین عملکرد": 91.0,
          "میانگین اضافه‌کار": 22,
          "میانگین آموزش": 34,
          "نرخ جابه‌جایی": 2.1,
          "رضایت شهروندان": 95
        }
      ];
    }

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "داده‌های شاخص‌ها");
    
    // Auto-fit column widths
    const colWidths = Object.keys(sampleData[0] || {}).map(key => ({
      wch: Math.max(key.length * 2, 18)
    }));
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, fileName);
  }
}
