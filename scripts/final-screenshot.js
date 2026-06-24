const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots';
  
  await page.setViewport({ width: 1440, height: 900 });

  const pages = [
    ['http://localhost:3000', 'final-01-homepage.png', false],
    ['http://localhost:3000/about', 'final-02-about.png', false],
    ['http://localhost:3000/khoa-hoc', 'final-03-khoa-hoc.png', false],
    ['http://localhost:3000/khoa-hoc/bai-1', 'final-04-bai-1-detail.png', false],
    ['http://localhost:3000/game', 'final-05-game.png', false],
    ['http://localhost:3000/video', 'final-06-video.png', false],
  ];

  for (const [url, file, full] of pages) {
    console.log(`Capturing ${file}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
    await delay(2000);
    await page.screenshot({ path: `${outDir}/${file}`, fullPage: full });
  }

  // Mobile homepage
  await page.setViewport({ width: 390, height: 844 });
  console.log('Capturing mobile...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: `${outDir}/final-07-mobile.png`, fullPage: false });

  await browser.close();
  console.log('All 7 final screenshots done!');
})();
