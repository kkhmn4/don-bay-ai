const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ 
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots';

  // 1. Homepage - Hero section
  console.log('1/8 Homepage hero...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/01-homepage-hero.png', fullPage: false });
  
  // 2. Homepage - full scroll
  console.log('2/8 Homepage full...');
  await page.screenshot({ path: outDir + '/02-homepage-full.png', fullPage: true });
  
  // 3. Homepage - Stats + Modules
  await page.evaluate(() => window.scrollTo(0, 700));
  await delay(1000);
  await page.screenshot({ path: outDir + '/03-homepage-stats.png', fullPage: false });
  
  // 4. Khoa-hoc (course listing)
  console.log('3/8 Khoa hoc...');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/04-khoa-hoc-hero.png', fullPage: false });
  
  // 5. Khoa-hoc - lesson cards
  console.log('4/8 Khoa hoc cards...');
  await page.evaluate(() => window.scrollTo(0, 500));
  await delay(1000);
  await page.screenshot({ path: outDir + '/05-khoa-hoc-cards.png', fullPage: false });
  
  // 6. Game portal
  console.log('5/8 Game portal...');
  await page.goto('http://localhost:3000/game', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/06-game-portal.png', fullPage: false });
  
  // 7. Video page
  console.log('6/8 Video scripts...');
  await page.goto('http://localhost:3000/video', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/07-video-page.png', fullPage: false });
  
  // 8. Mobile homepage
  console.log('7/8 Mobile homepage...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(1500);
  await page.screenshot({ path: outDir + '/08-mobile-home.png', fullPage: false });
  
  await browser.close();
  console.log('Done! 8 screenshots captured.');
})();
