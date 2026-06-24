const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\variants';
  const baseDir = 'C:\\Users\\Admin\\.antigravity-ide\\app tao video\\don-bay-ai\\sketches';

  const variants = [
    ['001-stripe-editorial/index.html', 'variant-1-stripe-editorial.png'],
    ['002-vercel-precision/index.html', 'variant-2-vercel-precision.png'],
    ['003-linear-dark/index.html', 'variant-3-linear-dark.png'],
  ];

  await page.setViewport({ width: 1440, height: 900 });
  
  for (const [htmlPath, screenshotName] of variants) {
    const filePath = path.join(baseDir, htmlPath).replace(/\\/g, '/');
    console.log(`Capturing ${screenshotName}...`);
    
    try {
      await page.goto(`file:///${filePath}`, { waitUntil: 'networkidle2' });
      await delay(1000);
      await page.screenshot({ path: `${outDir}/${screenshotName}`, fullPage: true });
      console.log(`  ✅ Done: ${screenshotName}`);
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
    }
  }

  await browser.close();
  console.log('All variant screenshots done!');
})();
