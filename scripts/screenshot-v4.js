const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\v4';

  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  console.log('Desktop homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(3000);
  await page.screenshot({ path: `${outDir}/v4-desktop-home.png`, fullPage: true });

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  console.log('Mobile homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(3000);
  await page.screenshot({ path: `${outDir}/v4-mobile-home.png`, fullPage: true });

  // Mobile About
  console.log('Mobile about...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v4-mobile-about.png`, fullPage: true });

  // Mobile Khoa-hoc
  console.log('Mobile khoa-hoc...');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v4-mobile-khoa-hoc.png`, fullPage: true });

  // Desktop About
  await page.setViewport({ width: 1440, height: 900 });
  console.log('Desktop about...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v4-desktop-about.png`, fullPage: true });

  // Desktop Khoa-hoc
  console.log('Desktop khoa-hoc...');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v4-desktop-khoa-hoc.png`, fullPage: true });

  await browser.close();
  console.log('Done!');
})();
