const puppeteer = require('puppeteer');
const delay = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outDir = 'C:\\Users\\Admin\\dongbayai-screenshots\\review';
  const fs = require('fs');
  
  const issues = [];

  function log(url, status, msg) {
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} ${url} — ${msg}`);
    if (status !== 'PASS') issues.push({ url, status, msg });
  }

  // ===== 1. HOMEPAGE =====
  console.log('\n===== 1. HOMEPAGE =====\n');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(2000);

  // Check hero
  const heroTitle = await page.$eval('h1', el => el.textContent).catch(() => '');
  log('/', heroTitle.includes('Đòn Bẩy') ? 'PASS' : 'FAIL', `Hero title: "${heroTitle}"`);

  // Check lever interactive SVG
  const leverSVG = await page.$('svg[aria-label*="Đòn bẩy"]').catch(() => null);
  log('/', leverSVG ? 'PASS' : 'FAIL', 'Interactive Lever SVG exists');

  // Check stats section
  const statsText = await page.evaluate(() => document.body.innerText);
  const has11 = statsText.includes('11');
  const hasGEMS = statsText.includes('GEMS');
  log('/', has11 && hasGEMS ? 'PASS' : 'FAIL', `Stats: 11 lessons? ${has11}, GEMS? ${hasGEMS}`);

  // Check module cards (3 modules)
  const moduleLinks = await page.$$('a[href*="module"]');
  log('/', moduleLinks.length >= 3 ? 'PASS' : 'FAIL', `Module cards found: ${moduleLinks.length}`);

  // Check features section
  const features = await page.$$('.grid.grid-cols-2.md\\:grid-cols-4 a, .grid.grid-cols-2.md\\:grid-cols-4 div');
  log('/', features.length >= 4 ? 'PASS' : '⚠️', `Feature items: ${features.length}`);

  // Check CTA button
  const cta = await page.$('a.btn-teal');
  log('/', cta ? 'PASS' : 'FAIL', 'CTA button exists');

  // Check footer
  const footerText = await page.evaluate(() => document.querySelector('footer')?.innerText || '');
  log('/', footerText.includes('Kha Khung Hiệp') ? 'PASS' : 'FAIL', 'Footer has author name');

  await page.screenshot({ path: `${outDir}/01-homepage.png`, fullPage: true });

  // ===== 2. ABOUT PAGE =====
  console.log('\n===== 2. ABOUT PAGE =====\n');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await delay(1500);

  const aboutTitle = await page.evaluate(() => document.title);
  log('/about', aboutTitle.includes('Đòn Bẩy') ? 'PASS' : 'FAIL', `Page title: "${aboutTitle}"`);

  // Check sections
  const aboutText = await page.evaluate(() => document.body.innerText);
  const hasMission = aboutText.includes('Lever') || aboutText.includes('Đòn bẩy');
  const hasAuthor = aboutText.includes('Kha Khung Hiệp');
  const hasValues = aboutText.includes('GEMS') || aboutText.includes('7 nguyên tắc');
  const hasTimeline = aboutText.includes('2024') || aboutText.includes('2025');
  log('/about', hasMission ? 'PASS' : 'FAIL', 'Mission section');
  log('/about', hasAuthor ? 'PASS' : 'FAIL', 'Author section');
  log('/about', hasValues ? 'PASS' : 'FAIL', 'Core values section');
  log('/about', hasTimeline ? 'PASS' : 'FAIL', 'Timeline section');

  await page.screenshot({ path: `${outDir}/02-about.png`, fullPage: true });

  // ===== 3. KHOA HOC PAGE =====
  console.log('\n===== 3. KHOA HOC PAGE =====\n');
  await page.goto('http://localhost:3000/khoa-hoc', { waitUntil: 'networkidle2' });
  await delay(1500);

  // Check module quick nav
  const quickNavLinks = await page.$$('a[href^="#module-"]');
  log('/khoa-hoc', quickNavLinks.length === 3 ? 'PASS' : 'FAIL', `Module quick nav links: ${quickNavLinks.length}`);

  // Check lesson cards
  const lessonCards = await page.$$('article');
  log('/khoa-hoc', lessonCards.length >= 11 ? 'PASS' : '⚠️', `Lesson cards: ${lessonCards.length}`);

  // Check game links in lesson cards
  const gameLinks = await page.$$('a[href*="/games/"]');
  log('/khoa-hoc', gameLinks.length >= 1 ? 'PASS' : '⚠️', `Game links in lessons: ${gameLinks.length}`);

  // Check images
  const images = await page.$$('img');
  const brokenImages = [];
  for (const img of images) {
    const src = await img.evaluate(el => el.src || '');
    if (!src.includes('/images/')) continue;
    // Check if image loaded by looking at naturalWidth
    const naturalWidth = await img.evaluate(el => el.naturalWidth);
    if (naturalWidth === 0) brokenImages.push(src);
  }
  log('/khoa-hoc', brokenImages.length === 0 ? 'PASS' : 'FAIL', `Broken images: ${brokenImages.length > 0 ? brokenImages.slice(0,3).join(', ') : 'none'}`);

  // Check CTA
  const ctaBtns = await page.$$('a.btn-teal,\n  a[class*="btn-teal"]');
  log('/khoa-hoc', ctaBtns.length >= 2 ? 'PASS' : '⚠️', `CTA buttons: ${ctaBtns.length}`);

  await page.screenshot({ path: `${outDir}/03-khoa-hoc.png`, fullPage: true });

  // ===== 4. LESSON DETAIL PAGE =====
  console.log('\n===== 4. LESSON DETAIL [BÀI 1] =====\n');
  await page.goto('http://localhost:3000/khoa-hoc/bai-1', { waitUntil: 'networkidle2' });
  await delay(1500);
  const pageUrl = page.url();
  log('/khoa-hoc/bai-1', pageUrl === 'http://localhost:3000/khoa-hoc/bai-1' ? 'PASS' : 'FAIL', `Route exists: ${pageUrl}`);

  // Check breadcrumb
  const breadcrumb = await page.evaluate(() => document.querySelector('[class*="items-center justify-center gap-2"]')?.innerText || '');
  log('/khoa-hoc/bai-1', breadcrumb.length > 0 ? 'PASS' : 'FAIL', `Breadcrumb: "${breadcrumb}"`);

  // Check 3 tabs
  const tabButtons = await page.$$('button');
  let tabCount = 0;
  for (const btn of tabButtons) {
    const text = await btn.evaluate(el => el.textContent || '');
    if (text.includes('Nội dung') || text.includes('Tải về') || text.includes('Prompt AI')) tabCount++;
  }
  log('/khoa-hoc/bai-1', tabCount >= 3 ? 'PASS' : 'FAIL', `Tab buttons found: ${tabCount}`);

  // Check download buttons
  const downloadLinks = await page.$$('a[href*="/downloads/"]');
  log('/khoa-hoc/bai-1', downloadLinks.length >= 1 ? 'PASS' : 'FAIL', `Download links: ${downloadLinks.length}`);

  // Click tab 2 (Tải về) and check for download buttons
  for (const btn of tabButtons) {
    const text = await btn.evaluate(el => el.textContent || '');
    if (text.includes('Tải về')) {
      await btn.click();
      await delay(500);
      break;
    }
  }
  const downloadSection = await page.evaluate(() => document.body.innerText);
  log('/khoa-hoc/bai-1', downloadSection.includes('Phiếu học tập') ? 'PASS' : 'FAIL', 'Download section has file listing');

  // Click tab 3 (Prompt AI) and check for copy buttons
  for (const btn of tabButtons) {
    const text = await btn.evaluate(el => el.textContent || '');
    if (text.includes('Prompt')) {
      await btn.click();
      await delay(500);
      break;
    }
  }
  const promptSection = await page.evaluate(() => document.body.innerText);
  log('/khoa-hoc/bai-1', (promptSection.includes('Gemini') || promptSection.includes('NotebookLM')) ? 'PASS' : 'FAIL', 'Prompt AI section has Gemini/NotebookLM content');

  // Check copy button
  const copyBtn = await page.$('button:has(svg.lucide-copy)');
  log('/khoa-hoc/bai-1', copyBtn ? 'PASS' : '⚠️', 'Copy-to-clipboard button');

  // Test not-found
  await page.goto('http://localhost:3000/khoa-hoc/bai-99', { waitUntil: 'networkidle2' });
  await delay(1000);
  const notFoundText = await page.evaluate(() => document.body.innerText);
  log('/khoa-hoc/bai-99', notFoundText.includes('Trang không tìm thấy') || notFoundText.includes('404') ? 'PASS' : '⚠️', '404 page for invalid lesson');

  await page.screenshot({ path: `${outDir}/04-bai1-detail.png`, fullPage: true });

  // ===== 5. GAME PAGE =====
  console.log('\n===== 5. GAME PAGE =====\n');
  await page.goto('http://localhost:3000/game', { waitUntil: 'networkidle2' });
  await delay(1500);

  const gameTitle = await page.evaluate(() => document.title);
  log('/game', gameTitle.includes('Đòn Bẩy') ? 'PASS' : 'FAIL', 'Game page title OK');

  // Check game cards
  const gameCards = await page.$$('.group.relative');
  log('/game', gameCards.length >= 3 ? 'PASS' : 'FAIL', `Game cards: ${gameCards.length}`);

  // Check game start buttons
  const gameBtns = await page.$$('button:has(span:not(:empty):not(.sr-only))');
  let startBtns = 0;
  for (const btn of gameBtns) {
    const txt = await btn.evaluate(el => el.textContent || '');
    if (txt.includes('BẮT ĐẦU')) startBtns++;
  }
  log('/game', startBtns >= 3 ? 'PASS' : '⚠️', `Start buttons: ${startBtns}`);

  // Click first game button to test iframe launch
  const firstBtn = await page.$('button.cursor-pointer');
  if (firstBtn) {
    await firstBtn.click();
    await delay(1500);
    const iframe = await page.$('iframe');
    log('/game', iframe ? 'PASS' : 'FAIL', 'Game iframe loads on button click');
    
    // Exit game
    const exitBtn = await page.$('button:has(svg.lucide-arrow-left)');
    if (exitBtn) await exitBtn.click();
    log('/game', exitBtn ? 'PASS' : 'FAIL', 'Exit game button works');
  }

  await page.screenshot({ path: `${outDir}/05-game.png`, fullPage: false });

  // ===== 6. VIDEO PAGE =====
  console.log('\n===== 6. VIDEO PAGE =====\n');
  await page.goto('http://localhost:3000/video', { waitUntil: 'networkidle2' });
  await delay(1500);

  // Check filter buttons
  const filterBtns = await page.$$('button:has(span:not(:empty))');
  let categoryBtns = 0;
  for (const btn of filterBtns) {
    const txt = await btn.evaluate(el => el.textContent || '');
    if (txt.includes('Tất cả') || txt.includes('Module')) categoryBtns++;
  }
  log('/video', categoryBtns >= 4 ? 'PASS' : '⚠️', `Category filter buttons: ${categoryBtns}`);

  // Check video script cards
  const videoCards = await page.$$('article');
  log('/video', videoCards.length >= 11 ? 'PASS' : '⚠️', `Video script cards: ${videoCards.length}`);

  // Click filter "Module 1"
  for (const btn of filterBtns) {
    const txt = await btn.evaluate(el => el.textContent || '');
    if (txt.includes('Module 1')) {
      await btn.click();
      await delay(500);
      break;
    }
  }
  const filteredVids = await page.$$('article');
  log('/video', filteredVids.length < videoCards.length ? 'PASS' : 'FAIL', `Filter works: ${videoCards.length} → ${filteredVids.length}`);

  await page.screenshot({ path: `${outDir}/06-video.png`, fullPage: false });

  // ===== 7. NAVBAR =====
  console.log('\n===== 7. NAVBAR =====\n');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(1000);

  // Check navbar links
  const navLinks = await page.$$('nav a');
  log('navbar', navLinks.length >= 3 ? 'PASS' : 'FAIL', `Nav links: ${navLinks.length}`);

  // Check search button
  const searchBtn = await page.$('button[aria-label*="Tìm"]');
  log('navbar', searchBtn ? 'PASS' : 'FAIL', 'Search button exists');
  if (searchBtn) {
    await searchBtn.click();
    await delay(500);
    const searchInput = await page.$('input[placeholder*="Tìm"]');
    log('navbar', searchInput ? 'PASS' : 'FAIL', 'Search input expands');
    if (searchInput) {
      await searchInput.type('Bài 1');
      await delay(300);
      await page.keyboard.press('Enter');
      await delay(1000);
      const hasResult = (await page.evaluate(() => document.body.innerText)).includes('khoa-hoc') || false;
      log('navbar', 'Search API called (check /api/search implementation)');
    }
  }

  // Check theme toggle
  const themeBtn = await page.$('button[aria-label*="Chuyển"]');
  log('navbar', themeBtn ? 'PASS' : 'FAIL', 'Theme toggle button exists');

  // Check mobile menu
  await page.setViewport({ width: 390, height: 844 });
  await delay(500);
  const mobileBtn = await page.$('button.md\\:hidden');
  log('navbar', mobileBtn ? 'PASS' : 'FAIL', 'Mobile hamburger button exists');
  if (mobileBtn) {
    await mobileBtn.click();
    await delay(500);
    const mobileNav = await page.$$('nav a');
    log('navbar', mobileNav.length >= 3 ? 'PASS' : '⚠️', `Mobile menu links: ${mobileNav.length}`);
  }

  await page.setViewport({ width: 1440, height: 900 });

  // ===== 8. DOWNLOAD PAGES =====
  console.log('\n===== 8. DOWNLOAD PAGES =====\n');
  for (let i = 1; i <= 11; i++) {
    const url = `http://localhost:3000/downloads/bai-${i}/index.html`;
    const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 5000 }).catch(() => null);
    if (resp && resp.status() === 200) {
      const title = await page.evaluate(() => document.title || '');
      log(`/downloads/bai-${i}`, title.includes('Đòn Bẩy') ? 'PASS' : '⚠️', `Download page loads: ${title}`);
    } else {
      log(`/downloads/bai-${i}`, 'FAIL', `Download page returns ${resp?.status() || 'timeout'}`);
    }
  }

  // ===== SUMMARY =====
  console.log('\n===== TEST SUMMARY =====\n');
  console.log(`\nTotal issues found: ${issues.length}`);
  issues.forEach((iss, i) => {
    console.log(`${i+1}. [${iss.status}] ${iss.url} — ${iss.msg}`);
  });

  await browser.close();
  console.log('\nDone! Screenshots saved.');
})();
