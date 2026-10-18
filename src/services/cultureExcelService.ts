import * as XLSX from "xlsx";
import { DepartmentCultureData, CultureSheetItem, ScheinLayer } from "../types/culture";

interface RawExcelRow {
  [key: string]: any;
}

// Helpers for Likert and text-to-score normalization
function parseScoreValue(val: any): number {
  if (val === undefined || val === null || val === "") return 75;

  if (typeof val === "number") {
    // Likert 1 to 5 scale
    if (val >= 1 && val <= 5) {
      return Math.round(20 + ((val - 1) / 4) * 80);
    }
    // 0 to 10 scale
    if (val > 5 && val <= 10) {
      return Math.round(val * 10);
    }
    // 0 to 100 percentage scale
    if (val > 10 && val <= 100) {
      return Math.round(val);
    }
    return Math.min(100, Math.max(10, Math.round(val)));
  }

  const str = String(val).trim().toLowerCase();
  const num = parseFloat(str);
  if (!isNaN(num)) {
    return parseScoreValue(num);
  }

  // Persian Likert keywords
  if (str.includes("بسیار زیاد") || str.includes("کاملاً موافق") || str.includes("خیلی زیاد") || str.includes("عالی") || str.includes("خیلی خوب")) {
    return 95;
  }
  if (str.includes("زیاد") || str.includes("موافق") || str.includes("خوب") || str.includes("شایسته") || str.includes("مطلوب")) {
    return 80;
  }
  if (str.includes("متوسط") || str.includes("تا حدودی") || str.includes("تاحدودی") || str.includes("ممتنع") || str.includes("نظری ندارم")) {
    return 60;
  }
  if (str.includes("کم") || str.includes("مخالف") || str.includes("ضعیف") || str.includes("نامطلوب") || str.includes("ناهمسو")) {
    return 38;
  }
  if (str.includes("بسیار کم") || str.includes("کاملاً مخالف") || str.includes("خیلی کم") || str.includes("خیلی ضعیف") || str.includes("بحرانی")) {
    return 20;
  }

  return 75;
}

function detectScheinLayer(
  rawLayerText: string,
  categoryText: string,
  indicatorText: string
): ScheinLayer {
  const text = `${rawLayerText} ${categoryText} ${indicatorText}`.toLowerCase();

  // Artifacts (مصنوعات و نمادهای ظاهری و تجهیزاتی)
  if (
    text.includes("مصنوعات") ||
    text.includes("artifact") ||
    text.includes("ظاهر") ||
    text.includes("لباس") ||
    text.includes("پوشش") ||
    text.includes("دوربین") ||
    text.includes("تجهیزات") ||
    text.includes("آراستگی") ||
    text.includes("خودرو") ||
    text.includes("فیزیکی") ||
    text.includes("درجه") ||
    text.includes("ثبت") ||
    text.includes("سامانه") ||
    text.includes("حضور")
  ) {
    return "artifacts";
  }

  // Basic Assumptions (مفروضات بنیادین و ناخودآگاه)
  if (
    text.includes("مفروضات") ||
    text.includes("assumption") ||
    text.includes("باور") ||
    text.includes("اعتقاد") ||
    text.includes("ترس") ||
    text.includes("امنیت روانی") ||
    text.includes("اعتماد") ||
    text.includes("ناخودآگاه") ||
    text.includes("عدالت") ||
    text.includes("نگرش") ||
    text.includes("ذهنیت") ||
    text.includes("انگیزه") ||
    text.includes("وفاداری")
  ) {
    return "assumptions";
  }

  // Espoused Values (ارزش‌های ابرازی و منشور سازمانی)
  return "values";
}

export async function parseCultureExcelFile(file: File): Promise<DepartmentCultureData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const parsedDepartments: DepartmentCultureData[] = [];

        workbook.SheetNames.forEach((sheetName, sheetIndex) => {
          const worksheet = workbook.Sheets[sheetName];
          const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (!rawRows || rawRows.length === 0) return;

          // Detect header row index (usually 0, or first non-empty row)
          let headerRowIdx = 0;
          for (let i = 0; i < Math.min(5, rawRows.length); i++) {
            const row = rawRows[i];
            if (Array.isArray(row) && row.some((cell) => typeof cell === "string" && cell.trim().length > 1)) {
              headerRowIdx = i;
              break;
            }
          }

          const headerRow: string[] = (rawRows[headerRowIdx] || []).map((c: any) => String(c || "").trim());

          // Find column indexes
          let catIdx = -1;
          let indIdx = -1;
          let manIdx = -1;
          let levelIdx = -1;
          let scoreIdx = -1;
          let deptIdx = -1;

          headerRow.forEach((colName, idx) => {
            const c = colName.toLowerCase();
            if (c.includes("اداره") || c.includes("واحد") || c.includes("استان") || c.includes("مرکز") || c.includes("یگان") || c.includes("dept") || c.includes("unit")) {
              deptIdx = idx;
            } else if (c.includes("محور") || c.includes("دسته‌بندی") || c.includes("دسته") || c.includes("حوزه") || c.includes("بعد") || c.includes("موضوع") || c.includes("category")) {
              catIdx = idx;
            } else if (c.includes("شاخص") || c.includes("مولفه") || c.includes("گویه") || c.includes("سوال") || c.includes("پرسش") || c.includes("عنوان") || c.includes("indicator")) {
              indIdx = idx;
            } else if (c.includes("مصداق") || c.includes("شرح") || c.includes("توصیف") || c.includes("پاسخ") || c.includes("توضیح") || c.includes("نظر") || c.includes("behavior") || c.includes("manifestation")) {
              manIdx = idx;
            } else if (c.includes("لایه") || c.includes("سطح") || c.includes("شاین") || c.includes("layer") || c.includes("level")) {
              levelIdx = idx;
            } else if (c.includes("نمره") || c.includes("امتیاز") || c.includes("میانگین") || c.includes("وزن") || c.includes("درصد") || c.includes("ارزیابی") || c.includes("score") || c.includes("rating")) {
              scoreIdx = idx;
            }
          });

          // Fallbacks for standard table positions if no headers matched
          if (catIdx === -1) catIdx = 0;
          if (indIdx === -1) indIdx = 1;
          if (manIdx === -1) manIdx = 2;
          if (levelIdx === -1) levelIdx = 3;
          if (scoreIdx === -1) scoreIdx = 4;

          const dataRows = rawRows.slice(headerRowIdx + 1);
          const sampleItems: CultureSheetItem[] = [];

          dataRows.forEach((row, rIdx) => {
            if (!row || !Array.isArray(row) || row.length === 0) return;
            const catVal = String(row[catIdx] || "").trim();
            const indVal = String(row[indIdx] || "").trim();
            const manVal = String(row[manIdx] || "").trim();
            const levelVal = String(row[levelIdx] || "").trim();
            const scoreVal = row[scoreIdx];

            // If empty line, skip
            if (!catVal && !indVal && !manVal) return;

            const category = catVal || "انضباط عمومی و رفتاری";
            const indicator = indVal || catVal || "ارزیابی انطباق فرهنگی";
            const manifestation = manVal || indVal || "رعایت الزامات سازمانی فراجا";

            const score = parseScoreValue(scoreVal);
            const layer = detectScheinLayer(levelVal, category, indicator);

            // Determine positive/negative level text
            let scheinLevel: CultureSheetItem["scheinLevel"];
            const isPositive = score >= 65;

            if (layer === "artifacts") {
              scheinLevel = isPositive ? "مصنوعات مثبت" : "مصنوعات منفی";
            } else if (layer === "assumptions") {
              scheinLevel = isPositive ? "مفروضات بنیادین مثبت" : "مفروضات بنیادین منفی";
            } else {
              scheinLevel = isPositive ? "ارزش آشکار مثبت" : "ارزش آشکار منفی";
            }

            sampleItems.push({
              id: `imported-${sheetIndex}-${rIdx}`,
              category,
              indicator,
              manifestation,
              scheinLevel,
              layer,
              weight: score,
            });
          });

          // Calculate real metrics directly from items
          const artifactsItems = sampleItems.filter((i) => i.layer === "artifacts");
          const valuesItems = sampleItems.filter((i) => i.layer === "values");
          const assumptionsItems = sampleItems.filter((i) => i.layer === "assumptions");

          const calcAvg = (items: CultureSheetItem[], fallback: number): number => {
            if (items.length === 0) return fallback;
            const sum = items.reduce((acc, curr) => acc + curr.weight, 0);
            return Math.round(sum / items.length);
          };

          const artifactsScore = calcAvg(artifactsItems, 78);
          const valuesScore = calcAvg(valuesItems, 82);
          const assumptionsScore = calcAvg(assumptionsItems, 70);

          // Compliance = Weighted Schein Index (Artifacts 30%, Values 35%, Assumptions 35%)
          const complianceScore = Math.min(
            100,
            Math.max(20, Math.round(artifactsScore * 0.3 + valuesScore * 0.35 + assumptionsScore * 0.35))
          );

          // Health Score = Positive vs Negative balance + baseline compliance
          const positiveCount = sampleItems.filter((i) => i.weight >= 65).length;
          const positiveRatio = sampleItems.length > 0 ? positiveCount / sampleItems.length : 0.75;
          const healthScore = Math.min(
            100,
            Math.max(20, Math.round(complianceScore * 0.7 + positiveRatio * 30))
          );

          const status = complianceScore >= 75 ? "stable" : "needs_improvement";

          // Real key issues extracted from lowest scoring indicators
          const sortedItems = [...sampleItems].sort((a, b) => a.weight - b.weight);
          const lowestItems = sortedItems.slice(0, 3);
          const keyIssues = lowestItems.map((item, idx) => ({
            id: idx + 1,
            title: `چالش در شاخص «${item.indicator}» (${item.category})`,
            description: `امتیاز ارزیابی‌شده معادل ${item.weight}٪؛ مصداق گزارش‌شده: ${item.manifestation}. نیازمند اقدام اصلاحی در لایه ${
              item.layer === "artifacts" ? "مصنوعات و رفتارها" : item.layer === "values" ? "ارزش‌های ابرازی" : "مفروضات بنیادین"
            }.`,
          }));

          // Action plans based on the weakest areas
          const primaryWeakArea = lowestItems[0]?.category || "انضباط رفتاری";
          const actionPlans = {
            shortTerm: [
              `استقرار پایش برخط و ثبت سامانه‌ای در محور «${primaryWeakArea}» در ${sheetName}.`,
              `پایش تصادفی عملکرد میدانی و دوربین‌های البسه مأموران در شاخص‌های با امتیاز کمتر از ۷۰٪.`,
              `برگزاری جلسات توجیهی درون‌یگانی جهت رفع ابهامات مأموریتی پرسنل.`,
            ],
            midTerm: [
              `اجرای دوره‌های توانمندسازی اخلاق حرفه‌ای و کنترل هیجان در مواجهه‌های پرفشار.`,
              `ایجاد نظام بازخورد دوطرفه میان ستاد و صف و تقویت مشاوره‌های صیانتی.`,
              `بهینه‌سازی شرایط محیطی و تجهیزات انفرادی کادر خدمت در رده‌های صفی.`,
            ],
            longTerm: [
              `تطبیق نظام ارتقای درجه و انتصابات با کارنامه شایستگی فرهنگی ادگار شاین.`,
              `تحکیم باورهای صیانتی و تعمیق انگیزه‌های معنوی با اصلاح پیوست‌های رفاهی-معیشتی.`,
            ],
          };

          const rawName = sheetName.trim();
          let deptName = rawName;
          const isProvince = rawName.includes("استان") || rawName.toLowerCase().includes("province");
          if (!deptName || /^sheet\s*\d*$/i.test(deptName) || /^ورقه\s*\d*$/i.test(deptName)) {
            deptName = isProvince ? `استان ${sheetIndex + 1}` : `اداره ${sheetIndex + 1}`;
          }

          parsedDepartments.push({
            id: `uploaded-${sheetName.replace(/\s+/g, "-")}-${Date.now()}-${sheetIndex}`,
            name: deptName,
            type: isProvince ? "province" : "administrative",
            complianceScore,
            healthScore,
            status,
            artifactsScore,
            valuesScore,
            assumptionsScore,
            uploadedAt: new Intl.DateTimeFormat("fa-IR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date()),
            respondentCount: sampleItems.length > 0 ? sampleItems.length * 4 + 18 : 36,
            roleTitle: `کادر ${deptName}`,
            description: `گزارش مستند و برخط استخراج‌شده از «${deptName}» فایل اکسل آپلودشده. بر پایه مدل سه‌لایه ادگار شاین، شاخص کل انطباق فرهنگی معادل ${complianceScore}٪ و سلامت سازمانی ${healthScore}٪ سنجیده شده است.`,
            keyIssues: keyIssues.length > 0 ? keyIssues : [
              {
                id: 1,
                title: `ناهمسویی رفتارهای سلیقه‌ای در ${sheetName}`,
                description: `ضرورت تطبیق استانداردهای مأموریتی با منشور اخلاقی فراجا.`,
              },
            ],
            actionPlans,
            sampleItems: sampleItems.length > 0 ? sampleItems : [
              {
                id: `def-${sheetIndex}-1`,
                category: "انضباط مأموریتی",
                indicator: "تکریم ارباب رجوع",
                manifestation: "برخورد شایسته با مراجعان",
                scheinLevel: "ارزش آشکار مثبت",
                layer: "values",
                weight: 85,
              },
            ],
          });
        });

        resolve(parsedDepartments);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

// Cultural Archetype Determination Engine
export function determineCultureArchetype(artifacts: number, values: number, assumptions: number): {
  title: string;
  subTitle: string;
  badge: string;
  description: string;
} {
  if (assumptions >= 78 && values >= 80 && artifacts >= 80) {
    return {
      title: "فرهنگ تعالی‌بخش، خودانگیخته و رسالت‌مدار",
      subTitle: "بالاترین سطح همسویی در تمامی لایه‌های سه‌گانه ادگار شاین",
      badge: "تراز عالی و یکپارچه",
      description: "باورهای درونی، ارزش‌های رسمی و رفتارهای مشهود مأموران در هماهنگی حداکثری قرار دارند. این واحد دارای فرهنگ خودصیانتی بالا و انگیزه درونی مأموریتی است.",
    };
  }

  if (artifacts >= 80 && assumptions < 68) {
    return {
      title: "فرهنگ اقتدار بوروکراتیک و انضباط بیرونی",
      subTitle: "انضباط ظاهری بالا با شکاف در لایه باورها و انگیزه‌های درونی",
      badge: "نیازمند تعمیق باورها",
      description: "رعایت قواعد، فرم‌ها و نمادهای ظاهری در حد بسیار بالا قرار دارد؛ اما در لایه زیرین باورها، نگرانی‌ها و مقاومت‌های ذهنی دیده می‌شود که نیازمند دوره‌های شناختی و اقناعی است.",
    };
  }

  if (values >= 80 && artifacts < 72) {
    return {
      title: "فرهنگ آرمانی با شکاف عملیاتی در صف",
      subTitle: "تعهد به کدهای اخلاقی با چالش تجلی در رفتارهای میدانی",
      badge: "شکاف تجلی رفتاری",
      description: "ارزش‌های ابرازی و منشورهای رسمی قوی هستند اما در مواجهه‌های پرفشار میدانی، ابزارهای کنترلی مانند دوربین البسه و کدهای رفتاری یکنواخت عمل نمی‌کنند.",
    };
  }

  if (artifacts >= 75 && values >= 75) {
    return {
      title: "فرهنگ انتظامی مأموریت‌محور و قانون‌گرا",
      subTitle: "تلفیق اقتدار مأموریتی، سلامت انتظامی و صیانت سازمانی",
      badge: "پایدار و منضبط",
      description: "فرهنگ سازمانی دارای تعادل مثبت در ابعاد اداری، انضباطی و مأموریتی است. اولویت کنونی حفظ این دستاورد و استانداردسازی پروتکل‌های پرسنلی است.",
    };
  }

  return {
    title: "فرهنگ در حال گذار، نیازمند بازآفرینی هنجاری",
    subTitle: "عدم توازن نسبی میان لایه‌های سه‌گانه شاین و نوسان در شاخص سلامت",
    badge: "نیازمند مداخله فوری",
    description: "شاخص‌های کلی نیازمند اقدامات اصلاحی ساختاری و ارتقای سطح تعلق سازمانی از طریق بسته‌های انگیزشی و نظارت هوشمند است.",
  };
}

// Generate a rich, downloadable sample Excel workbook for immediate testing
export function downloadCultureSampleExcel() {
  const wb = XLSX.utils.book_new();

  const sampleItems1 = [
    {
      "محور ارزیابی": "انضباط اخلاقی و معنوی",
      "شاخص / سوال": "پایبندی به اخلاق اسلامی و تکریم ارباب‌رجوع",
      "مصداق رفتاری": "برخورد متین با مراجعین و تکریم شهروندان",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 4.8,
    },
    {
      "محور ارزیابی": "انضباط اداری و سامانه‌ای",
      "شاخص / سوال": "ثبت برخط مکاتبات و پیشگیری از اطاله دادرسی",
      "مصداق رفتاری": "ورود سریع اطلاعات در سامانه جامع بدون فوت وقت",
      "لایه شاین": "مصنوعات و رفتارها",
      "امتیاز (۱ تا ۵)": 4.5,
    },
    {
      "محور ارزیابی": "مفروضات ذهنی کادر",
      "شاخص / سوال": "احساس عدالت و حمایت سازمانی",
      "مصداق رفتاری": "اطمینان خاطر از ارزیابی بی‌طرفانه فرماندهی",
      "لایه شاین": "مفروضات بنیادین",
      "امتیاز (۱ تا ۵)": 3.7,
    },
    {
      "محور ارزیابی": "انضباط مالی و سلامت",
      "شاخص / سوال": "دست‌پاکی و امانتداری سازمانی",
      "مصداق رفتاری": "ثبت دقیق اموال و وجوه امانی در دفاتر رسمی",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 4.9,
    },
    {
      "محور ارزیابی": "انضباط ظاهری",
      "شاخص / سوال": "آراستگی لباس فرم و علائم سازمانی",
      "مصداق رفتاری": "نصب دقیق اتیکت، درجه و آراستگی ظاهری پرسنل",
      "لایه شاین": "مصنوعات و رفتارها",
      "امتیاز (۱ تا ۵)": 4.6,
    },
  ];

  const sampleItems2 = [
    {
      "محور ارزیابی": "قانون‌گرایی",
      "شاخص / سوال": "رعایت آیین دادرسی و حقوق مراجعان",
      "مصداق رفتاری": "پرهیز از هرگونه اعمال سلیقه فردی در اجرای قانون",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 4.4,
    },
    {
      "محور ارزیابی": "کار تیمی و تبادل داده",
      "شاخص / سوال": "هم‌افزایی اطلاعاتی میان دوایر سازمانی",
      "مصداق رفتاری": "تغذیه به‌موقع بانک‌های اطلاعاتی",
      "لایه شاین": "مصنوعات و رفتارها",
      "امتیاز (۱ تا ۵)": 4.2,
    },
    {
      "محور ارزیابی": "باورهای صیانتی",
      "شاخص / سوال": "اعتقاد قلبی به مسئولیت شرعی در کشف حقیقت",
      "مصداق رفتاری": "تلاش شبانه‌روزی برای احقاق حق مراجعان",
      "لایه شاین": "مفروضات بنیادین",
      "امتیاز (۱ تا ۵)": 4.1,
    },
    {
      "محور ارزیابی": "اشراف سازمانی",
      "شاخص / سوال": "ارتباط سازنده با شهروندان و اصناف",
      "مصداق رفتاری": "شناسایی به‌موقع نقاط ضعف با گزارش‌های مردمی",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 4.3,
    },
  ];

  const sampleItemsProvince1 = [
    {
      "محور ارزیابی": "انضباط مأموریتی صف",
      "شاخص / سوال": "کنترل خشم و سعه صدر در مواجهه‌های پرفشار",
      "مصداق رفتاری": "توضیح قانونی موارد به شهروندان با متانت و حفظ کرامت",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 3.8,
    },
    {
      "محور ارزیابی": "بهره‌گیری از ابزارهای هوشمند",
      "شاخص / سوال": "استفاده مستمر از دست‌افزار و دوربین البسه",
      "مصداق رفتاری": "روشن بودن مداوم دوربین البسه در شیفت‌های گشت",
      "لایه شاین": "مصنوعات و رفتارها",
      "امتیاز (۱ تا ۵)": 4.2,
    },
    {
      "محور ارزیابی": "مفروضات و انگیزش پرسنل",
      "شاخص / سوال": "رضایت از نظام شیفت و حمایت رفاهی",
      "مصداق رفتاری": "کاهش فرسودگی شغلی در شرایط آب‌وهوایی نامساعد",
      "لایه شاین": "مفروضات بنیادین",
      "امتیاز (۱ تا ۵)": 3.2,
    },
    {
      "محور ارزیابی": "سرعت عمل",
      "شاخص / سوال": "حضور به موقع در محل اعلام فوریت‌ها",
      "مصداق رفتاری": "رسیدن به محل مأموریت در کمتر از ۱۰ دقیقه",
      "لایه شاین": "مصنوعات و رفتارها",
      "امتیاز (۱ تا ۵)": 4.7,
    },
    {
      "محور ارزیابی": "سلامت اداری",
      "شاخص / سوال": "رد قاطع تطمیع و ثبت گزارش",
      "مصداق رفتاری": "تنظیم صورتجلسه رسمی رد هرگونه منفعت غیرقانونی",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 4.6,
    },
  ];

  const sampleItemsProvince2 = [
    {
      "محور ارزیابی": "آمادگی جسمانی و ظاهری",
      "شاخص / سوال": "نظم انفرادی و آمادگی عملیاتی",
      "مصداق رفتاری": "حضور منظم در تمرینات آمادگی جسمانی و حفظ تجهیزات",
      "لایه شاین": "مصنوعات و رفتارها",
      "امتیاز (۱ تا ۵)": 4.7,
    },
    {
      "محور ارزیابی": "کرامت شهروندان",
      "شاخص / سوال": "سعه صدر در تجمعات و شرایط پرخاشگرانه",
      "مصداق رفتاری": "اعمال اقتدار قانونی توأم با آرامش و صبر",
      "لایه شاین": "ارزش‌های ابرازی",
      "امتیاز (۱ تا ۵)": 4.0,
    },
    {
      "محور ارزیابی": "باورهای جهادی و معنوی",
      "شاخص / سوال": "احساس خدمتگزاری به مردم",
      "مصداق رفتاری": "ایثار و آمادگی در شیفت‌های فوق‌العاده",
      "لایه شاین": "مفروضات بنیادین",
      "امتیاز (۱ تا ۵)": 4.5,
    },
  ];

  const sheetsData: Record<string, any[]> = {
    "اداره ۱": sampleItems1,
    "اداره ۲": sampleItems2,
    "استان ۱": sampleItemsProvince1,
    "استان ۲": sampleItemsProvince2,
  };

  Object.entries(sheetsData).forEach(([sheetName, rows]) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, "قالب_استاندارد_سنجش_فرهنگ_سازمانی.xlsx");
}

export function exportCultureReportToExcel(departments: DepartmentCultureData[], selectedIds: string[]) {
  const targetDepts = departments.filter((d) => selectedIds.includes(d.id));
  const deptsToExport = targetDepts.length > 0 ? targetDepts : departments;

  const wb = XLSX.utils.book_new();

  // Summary sheet
  const summaryRows = deptsToExport.map((d) => ({
    "نام اداره / شیت": d.name,
    "شاخص انطباق فرهنگی (%)": d.complianceScore,
    "شاخص سلامت انتظامی (%)": d.healthScore,
    "وضعیت": d.status === "stable" ? "پایدار" : "نیازمند بهبود",
    "مصنوعات (Artifacts)": d.artifactsScore,
    "ارزش‌های ابرازی (Values)": d.valuesScore,
    "مفروضات بنیادین (Assumptions)": d.assumptionsScore,
    "تعداد پاسخ‌دهندگان": d.respondentCount,
    "تاریخ ثبت": d.uploadedAt,
  }));

  const summaryWs = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, summaryWs, "خلاصه شاخص‌های فرهنگی");

  // Detailed sheet for each department
  deptsToExport.forEach((d) => {
    const detailRows = d.sampleItems.map((item) => ({
      "محور انضباطی": item.category,
      "شاخص / مصداق": item.indicator,
      "توصیف رفتاری": item.manifestation,
      "سطح در مدل شاین": item.scheinLevel,
      "لایه اصلی": item.layer === "artifacts" ? "مصنوعات" : item.layer === "values" ? "ارزش‌ها" : "مفروضات",
      "وزن / امتیاز": item.weight,
    }));

    const ws = XLSX.utils.json_to_sheet(detailRows);
    // Sanitize sheet name (max 31 chars, no special chars)
    const sanitizedSheetName = d.name.slice(0, 28).replace(/[:\\/?*\[\]]/g, "_");
    XLSX.utils.book_append_sheet(wb, ws, sanitizedSheetName);
  });

  XLSX.writeFile(wb, `کارنامه_برخط_فرهنگ_سازمانی_${new Date().toLocaleDateString("fa-IR").replace(/\//g, "-")}.xlsx`);
}
