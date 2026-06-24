const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\v3';
  
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1/6 Homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(3000);
  await page.screenshot({ path: `${outDir}/v3-01-homepage.png`, fullPage: true });

  // Scroll for stats
  console.log('2/6 Homepage stats...');
  await page.evaluate(() => window.scrollTo(0, 1200));
  await delay(1000);
  await page.screenshot({ path: `${outDir}/v3-02-homepage-stats.png`, fullPage: false });

  // Scroll for modules
  console.log('3/6 Homepage modules...');
  await page.evaluate(() => window.scrollTo(0, 2200));
  await delay(1000);
  await page.screenshot({ path: `${outDir}/v3-03-homepage-modules.png`, fullPage: false });

  console.log('4/6 About page...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: `${outDir}/v3-04-about.png`, fullPage: true });

  console.log('5/6 Khoa-hoc...');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: `${outDir}/v3-05-khoa-hoc.png`, fullPage: true });

  console.log('6/6 Bai-1 detail...');
  await page.goto('http://localhost:3000/khoa-hoc/bai-1', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: `${outDir}/v3-06-bai1.png`, fullPage: true });

  await browser.close();
  console.log('Done!');
})();
