const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\v5';

  // Test Game page
  console.log('1/5 Game page (desktop)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/game', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v5-desktop-game.png`, fullPage: true });

  // Test Video page
  console.log('2/5 Video page (desktop)...');
  await page.goto('http://localhost:3000/video', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v5-desktop-video.png`, fullPage: true });

  // Test Lesson detail page
  console.log('3/5 Lesson detail (desktop)...');
  await page.goto('http://localhost:3000/khoa-hoc/bai-1', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v5-desktop-bai1.png`, fullPage: true });

  // Test Lesson detail (mobile)
  console.log('4/5 Lesson detail (mobile)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/khoa-hoc/bai-1', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v5-mobile-bai1.png`, fullPage: true });

  // Test Video page (mobile)
  console.log('5/5 Video page (mobile)...');
  await page.goto('http://localhost:3000/video', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v5-mobile-video.png`, fullPage: true });

  await browser.close();
  console.log('Done!');
})();
