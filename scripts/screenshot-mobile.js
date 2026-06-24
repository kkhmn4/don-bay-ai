const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\v3';

  // Mobile viewport
  await page.setViewport({ width: 390, height: 844 });

  console.log('1/3 Mobile Homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(2000);
  await page.screenshot({ path: `${outDir}/v3-mobile-01-home.png`, fullPage: true });

  console.log('2/3 Mobile About...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: `${outDir}/v3-mobile-02-about.png`, fullPage: true });

  console.log('3/3 Mobile Khoa-hoc...');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: `${outDir}/v3-mobile-03-khoa-hoc.png`, fullPage: true });

  await browser.close();
  console.log('Done!');
})();
