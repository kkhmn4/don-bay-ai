const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ 
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots';

  // 1. Homepage hero (after fixes)
  console.log('1/6 Homepage...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(2000);
  await page.screenshot({ path: outDir + '/v2-01-homepage.png', fullPage: false });

  // 2. Lesson detail page (bai-1) 
  console.log('2/6 Lesson detail...');
  await page.goto('http://localhost:3000/khoa-hoc/bai-1', { waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
    console.log('bai-1 not yet created, trying...');
  });
  await delay(2000);
  const url = page.url();
  console.log('Current URL:', url);
  await page.screenshot({ path: outDir + '/v2-02-bai1-detail.png', fullPage: false });

  // 3. Download page for bai-1
  console.log('3/6 Download page...');
  await page.goto('http://localhost:3000/downloads/bai-1/index.html', { waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
    console.log('Static file route...');
  });
  await delay(1000);
  await page.screenshot({ path: outDir + '/v2-03-download-page.png', fullPage: false });

  // 4. Khoa-hoc page
  console.log('4/6 Khoa-hoc...');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/v2-04-khoa-hoc.png', fullPage: false });

  // 5. Game page
  console.log('5/6 Game portal...');
  await page.goto('http://localhost:3000/game', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/v2-05-game.png', fullPage: false });

  // 6. Video page
  console.log('6/6 Video page...');
  await page.goto('http://localhost:3000/video', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/v2-06-video.png', fullPage: false });

  await browser.close();
  console.log('Done! 6 screenshots captured.');
})();
