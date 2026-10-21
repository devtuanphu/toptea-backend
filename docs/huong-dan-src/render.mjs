// Renders guide.html to ../Huong-dan-quan-tri-noi-dung-TOP-WELL-TEA.pdf (A4).
// Run from this folder: node render.mjs  (uses the Playwright install of the top-well-1 frontend)
import { chromium } from '/Users/rowan/Documents/rowan-works/top-well-1/frontend/node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(new URL('./guide.html', import.meta.url).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: new URL('../Huong-dan-quan-tri-noi-dung-TOP-WELL-TEA.pdf', import.meta.url).pathname,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate:
    '<div style="width:100%;font-size:8px;color:#9ca3af;padding:0 15mm;display:flex;justify-content:space-between;font-family:Arial"><span>Hướng dẫn quản trị nội dung · TOP WELL TEA</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
});
await browser.close();
console.log('PDF written');
