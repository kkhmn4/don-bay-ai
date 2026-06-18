#!/usr/bin/env bun
/**
 * Generate visual assets for Đòn Bẩy AI website.
 * Outputs PNG files to /home/z/my-project/public/images/
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/images';

const STYLE_SUFFIX = 'modern minimalist illustration, vibrant gradient colors (amber #ff8a00 to crimson #fa3a19 with deep navy accents), clean geometric shapes, soft glow, high quality, professional digital art, no text, no watermark';

const ASSETS: { name: string; prompt: string; size: string }[] = [
  // Logo
  {
    name: 'logo.png',
    prompt: `Abstract logo combining a physics lever (triangle fulcrum with a horizontal bar) and AI circuit nodes, golden amber gradient on dark background, geometric minimal design, centered composition, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  // Hero background
  {
    name: 'hero-bg.png',
    prompt: `Cinematic dark scene with floating geometric shapes representing AI nodes and physics equations, warm amber to crimson gradient glow in center, deep black background with subtle grid pattern, particles of light, depth and atmosphere, ${STYLE_SUFFIX}`,
    size: '1344x768',
  },
  // Module 1 thumbnail - Soạn giảng AI
  {
    name: 'module-1.png',
    prompt: `Abstract illustration of AI writing assistant generating documents, glowing document icon with sparkles, warm amber gradient, dark navy background, geometric minimalist, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  // Module 2 thumbnail - Thí nghiệm ảo
  {
    name: 'module-2.png',
    prompt: `Abstract illustration of virtual physics laboratory, floating molecules and heat waves, scientific instruments rendered as geometric shapes, teal and amber gradient on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  // Module 3 thumbnail - Trò chơi tương tác
  {
    name: 'module-3.png',
    prompt: `Abstract illustration of interactive educational game, floating colorful blocks and QR code patterns, playful geometric design, warm crimson gradient on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  // 11 Lesson thumbnails
  {
    name: 'lesson-01.png',
    prompt: `AI chatbot interface with custom gem crystal, sparkles of light, document generation, warm amber glow on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-02.png',
    prompt: `Open book with PDF pages floating, AI brain icon, knowledge graph connections, shield against hallucination, amber gradient on dark navy, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-03.png',
    prompt: `Podcast microphone with sound waves and AI dialogue bubbles, two chatbot characters talking, warm orange glow, dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-04.png',
    prompt: `Document with two-column layout, ruler measuring margins, printer paper stack, grayscale optimized, minimalist design on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-05.png',
    prompt: `Heat transfer visualization, wavy heat lines flowing from hot to cold, thermometer with rising temperature, SVG vector style, amber red gradient on dark, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-06.png',
    prompt: `Spring thermometer bouncing with liquid inertia, cubic bezier motion lines, Celsius and Kelvin scales, scientific illustration on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-07.png',
    prompt: `Gas molecules bouncing in a container, kinetic theory visualization, particles colliding with walls, HTML5 canvas style, vibrant on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-08.png',
    prompt: `Quiz game with question marks and timer, leaderboard with ranking, QR code for joining, vibrant amber gradient on dark navy, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-09.png',
    prompt: `Colorful balloons floating and popping, stress relief game, playful design with crimson and amber gradient on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-10.png',
    prompt: `True/False quiz with checkmark and X mark, brain with lightbulb, myth busting concept, scientific diagnosis, warm gradient on dark, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
  {
    name: 'lesson-11.png',
    prompt: `QR code with rotating arrows around it, five learning stations in circular layout, classroom stations concept, geometric on dark background, ${STYLE_SUFFIX}`,
    size: '1024x1024',
  },
];

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`🎨 Generating ${ASSETS.length} visual assets...`);
  const zai = await ZAI.create();

  let success = 0;
  let failed = 0;

  for (const asset of ASSETS) {
    const outputPath = path.join(OUTPUT_DIR, asset.name);
    if (fs.existsSync(outputPath)) {
      console.log(`✓ Skip (exists): ${asset.name}`);
      success++;
      continue;
    }
    try {
      console.log(`🎨 Generating: ${asset.name} (${asset.size})`);
      const response = await zai.images.generations.create({
        prompt: asset.prompt,
        size: asset.size as any,
      });
      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`  ✓ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)}KB)`);
      success++;
    } catch (err: any) {
      console.error(`  ✗ Failed: ${asset.name} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✨ Done: ${success} success, ${failed} failed`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
