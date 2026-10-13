import { FARAJA_FULL_24_PAGES, WALKTHROUGH_PAGES_META, MASTER_GEMINI_PROMPT, WalkthroughPageItem } from '../data/farajaFullWalkthroughPages';

export function generateWalkthroughPrintableHtml(selectedChapterId?: string): string {
  const pagesToRender: WalkthroughPageItem[] = selectedChapterId && selectedChapterId !== 'all' && selectedChapterId !== 'pages_plan' && selectedChapterId !== 'gemini_protocol'
    ? FARAJA_FULL_24_PAGES.filter(p => p.chapterId === selectedChapterId)
    : FARAJA_FULL_24_PAGES;

  const isFullDocument = !selectedChapterId || selectedChapterId === 'all';

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سند جامع و شناسنامه ۲۴ صفحه‌ای سامانه معیار فراجا</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-military: #081d11;
      --primary-navy: #0f172a;
      --accent-gold: #b45309;
      --accent-emerald: #047857;
      --border-color: #cbd5e1;
      --text-main: #0f172a;
      --text-muted: #475569;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f1f5f9;
      color: var(--text-main);
      line-height: 1.6;
      font-size: 13px;
      -webkit-font-smoothing: antialiased;
    }

    /* Screen UI Action Bar */
    .screen-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: linear-gradient(135deg, #081d11, #0f172a);
      color: #fff;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .toolbar-title {
      font-size: 14px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar-badge {
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 9999px;
      font-weight: 700;
    }

    .toolbar-actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }

    .btn-primary {
      background-color: #059669;
      color: #fff;
    }
    .btn-primary:hover {
      background-color: #10b981;
    }

    .btn-secondary {
      background-color: #334155;
      color: #f8fafc;
    }
    .btn-secondary:hover {
      background-color: #475569;
    }

    /* Document Container */
    .document-container {
      max-width: 960px;
      margin: 24px auto;
      background: #fff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      border-radius: 12px;
      overflow: hidden;
    }

    /* Individual A4 Page */
    .a4-page {
      padding: 30px 40px;
      background: #fff;
      min-height: 297mm;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-bottom: 1px dashed #cbd5e1;
    }

    .a4-page:last-child {
      border-bottom: none;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--primary-military);
      padding-bottom: 10px;
      margin-bottom: 18px;
      font-size: 10px;
      color: var(--text-muted);
    }

    .page-header-title {
      font-weight: 800;
      color: var(--primary-military);
      font-size: 11px;
    }

    .page-body {
      flex: 1;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      font-size: 9.5px;
      color: #64748b;
    }

    .chapter-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 800;
      margin-bottom: 6px;
    }

    .badge-military { background: #e6f4ea; color: #081d11; border: 1px solid #a7d7b5; }
    .badge-navy { background: #e2e8f0; color: #0f172a; border: 1px solid #94a3b8; }
    .badge-amber { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .badge-teal { background: #ccfbf1; color: #115e59; border: 1px solid #99f6e4; }

    h1.page-title {
      font-size: 18px;
      font-weight: 900;
      color: #0f172a;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    h2.page-subtitle {
      font-size: 12px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 16px;
    }

    /* Print Styles */
    @page {
      size: A4 portrait;
      margin: 15mm 12mm 15mm 12mm;
    }

    @media print {
      body {
        background: #fff;
        color: #000;
        font-size: 10.5pt;
        line-height: 1.5;
      }

      .screen-toolbar {
        display: none !important;
      }

      .document-container {
        max-width: 100% !important;
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      .a4-page {
        page-break-after: always !important;
        break-after: page !important;
        min-height: 265mm !important;
        height: auto !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
      }

      .page-break {
        page-break-after: always !important;
        break-after: page !important;
      }

      .avoid-break {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      table {
        page-break-inside: avoid;
      }
    }

    /* Common Utility Styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 11px;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: right;
    }

    th {
      background-color: #f8fafc;
      font-weight: 700;
      color: #0f172a;
    }

    .code-box {
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 16px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 11px;
      direction: ltr;
      text-align: left;
      margin: 10px 0;
    }

    ul, ol {
      padding-right: 20px;
      margin: 8px 0;
    }

    li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>

  <!-- Screen Toolbar -->
  <div class="screen-toolbar">
    <div class="toolbar-title">
      <span>فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)</span>
      <span class="toolbar-badge">سند جامع ۲۴ صفحه‌ای معیار (نسخه ۳.۲.۰)</span>
    </div>
    <div class="toolbar-actions">
      <button onclick="window.print()" class="btn btn-primary" title="چاپ مستقیم یا ذخیره به صورت PDF کامل">
        🖨️ چاپ مستقیم / ذخیره PDF (کل سند)
      </button>
      <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="btn btn-secondary">
        ⬆️ ابتدای سند
      </button>
    </div>
  </div>

  <div class="document-container">

    ${isFullDocument ? `
      <!-- COVER / PLAN PAGE -->
      <div class="a4-page">
        <div class="page-header">
          <span class="page-header-title">ستاد کل نیروهای مسلح - فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)</span>
          <span>معاونت نیروی انسانی | سامانه جامع معیار</span>
        </div>

        <div class="page-body" style="text-align: center; padding: 20px 0;">
          <div style="font-size: 14px; font-weight: 800; color: #081d11; margin-bottom: 8px;">
            جمهوری اسلامی ایران
          </div>
          <div style="width: 70px; height: 70px; border-radius: 16px; background: #081d11; color: #f59e0b; margin: 0 auto 16px auto; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; border: 2px solid #b45309;">
            ⚖️
          </div>
          <h1 style="font-size: 24px; font-weight: 900; color: #0f172a; margin-bottom: 6px;">
            شناسنامه کارکردی و سند راهنمای جامع سامانه معیار فراجا
          </h1>
          <p style="font-size: 13px; font-weight: 700; color: #047857; margin-bottom: 24px;">
            نسخه ۳.۲.۰ مصوب ستاد کل - ۲۴ صفحه اداری تفکیک‌شده در ۷ بسته پیام
          </p>

          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; text-align: right; margin-bottom: 20px; font-size: 11.5px; line-height: 1.8;">
            <p><strong>سازمان متبوع:</strong> ستاد کل نیروهای مسلح - فرماندهی انتظامی جمهوری اسلامی ایران (فراجا)</p>
            <p><strong>معاونت مجری:</strong> معاونت نیروی انسانی - اداره کل تحول و تعالی سازمانی و ارزیابی شایستگی</p>
            <p><strong>شماره ابلاغیه:</strong> فراجا/معیار/۱۴۰۵/۳۲۰-ن | سطح طبقه‌بندی: سازمانی - آزاد اداری</p>
            <p><strong>پوشش جغرافیایی و رده‌ای:</strong> ۳۱ استان کشور، کلیه کلانتری‌ها، پاسگاه‌ها، مرزبانی، آگاهی، راهور، یگان ویژه و فتا</p>
          </div>

          <h3 style="font-size: 13px; font-weight: 800; text-align: right; margin-bottom: 8px; color: #0f172a;">
            جدول ساختار ۲۴ صفحه سند در ۷ پیام هوش مصنوعی Gemini:
          </h3>

          <table>
            <thead>
              <tr>
                <th>پیام</th>
                <th>سرفصل و موضوع محتوایی</th>
                <th>صفحات</th>
                <th>دستور ارسالی به جمنای (Trigger Prompt)</th>
              </tr>
            </thead>
            <tbody>
              ${WALKTHROUGH_PAGES_META.map(m => `
                <tr>
                  <td style="font-weight: bold;">پیام ${m.message}</td>
                  <td>${m.chapter}</td>
                  <td style="font-weight: bold; color: #047857;">${m.pages} (${m.count} صفحه)</td>
                  <td style="font-family: monospace; font-size: 10px;">${m.trigger}</td>
                </tr>
              `).join('')}
              <tr style="background: #f1f5f9; font-weight: bold;">
                <td colspan="2" style="text-align: center;">مجموع صفحات مصوب سند معیار</td>
                <td style="color: #065f46;">۲۴ صفحه اداری</td>
                <td>آماده چاپ یکپارچه یا استفاده پیام‌به‌پیام</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #0f172a; color: #f8fafc; border-radius: 8px; padding: 12px; text-align: right; margin-top: 14px; font-size: 10.5px;">
            <strong style="color: #fbbf24;">مسترپرامپت سیستمی هوش مصنوعی Gemini:</strong>
            <p style="margin-top: 4px; color: #cbd5e1; line-height: 1.5;">
              «شما مشاور ارشد تحول سیستم‌های سرمایه انسانی و آیین‌نامه‌نویسی در نیروهای مسلح (فراجا) هستید. بر اساس سند ۲۴ صفحه‌ای معیار، پیام‌ها را یک به یک با حداکثر جزئیات رسمی، ماده‌بندی‌شده، بدون خلاصه‌سازی و با جداول ضرایب تدوین نمایید.»
            </p>
          </div>
        </div>

        <div class="page-footer">
          <span>سامانه جامع مدیریت عملکرد، شایستگی و آمایش سرزمینی فراجا (معیار)</span>
          <span>صفحه مقدمه و طرح تفکیک سند</span>
        </div>
      </div>
    ` : ''}

    <!-- RENDER ALL 24 PAGES -->
    ${pagesToRender.map(page => `
      <div class="a4-page" id="page-${page.pageNumber}">
        <div class="page-header">
          <span class="page-header-title">فرماندهی انتظامی جمهوری اسلامی ایران | سامانه معیار (نسخه ۳.۲.۰)</span>
          <span>صفحه ${page.pageNumber} از ۲۴ | پیام ${page.messageNumber}</span>
        </div>

        <div class="page-body">
          <span class="chapter-badge badge-military">${page.chapterTitle}</span>
          <h1 class="page-title">${page.pageTitle}</h1>
          <h2 class="page-subtitle">${page.pageSubtitle}</h2>

          ${page.contentHtml}
        </div>

        <div class="page-footer">
          <span>ستاد کل فراجا - معاونت نیروی انسانی | سامانه جامع معیار</span>
          <span style="font-weight: bold;">صفحه ${page.pageNumber} از ۲۴</span>
        </div>
      </div>
    `).join('')}

  </div>

  <script>
    // Auto-trigger print if requested via query param
    if (window.location.search.includes('print=true')) {
      window.onload = function() {
        setTimeout(function() {
          window.print();
        }, 500);
      };
    }
  </script>
</body>
</html>`;
}
