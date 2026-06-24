const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\v5';

  await page.setViewport({ width: 390, height: 844 });

  // Mobile Homepage - scroll to bottom to trigger all reveals
  console.log('Mobile homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(2000);
  
  // Scroll to bottom to trigger IntersectionObserver reveals
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve(null);
        }
      }, 100);
    });
  });
  await delay(1500);

  // Go back to top and take full page screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);
  await page.screenshot({ path: `${outDir}/v5-mobile-home-full.png`, fullPage: true });

  // Take mobile screenshot of middle section
  await page.evaluate(() => window.scrollTo(0, 500));
  await delay(500);
  await page.screenshot({ path: `${outDir}/v5-mobile-home-mid.png`, fullPage: false });

  // Mobile About
  console.log('Mobile about...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let h = 0;
      const t = setInterval(() => { window.scrollBy(0, 300); h += 300; if (h >= document.body.scrollHeight) { clearInterval(t); resolve(null); } }, 100);
    });
  });
  await delay(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);
  await page.screenshot({ path: `${outDir}/v5-mobile-about.png`, fullPage: true });

  // Desktop homepage (also scroll)
  console.log('Desktop homepage...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let h = 0;
      const t = setInterval(() => { window.scrollBy(0, 400); h += 400; if (h >= document.body.scrollHeight) { clearInterval(t); resolve(null); } }, 100);
    });
  });
  await delay(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);
  await page.screenshot({ path: `${outDir}/v5-desktop-home.png`, fullPage: true });

  await browser.close();
  console.log('Done!');
})();
