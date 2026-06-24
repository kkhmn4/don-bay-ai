const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function removeBackground(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  
  const outBuffer = Buffer.alloc(width * height * 4);
  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);
  
  const getIndex = (x, y) => (y * width + x) * channels;
  const getOutIndex = (x, y) => (y * width + x) * 4;
  
  const isBgColor = (r, g, b) => {
    // Checkerboard squares can be:
    // 1. White / light grey (255 or ~200) — used in most 3D renders
    // 2. Dark grey / near-black (~50-80) — used in some renders
    // Both are always neutral (R ≈ G ≈ B with no color saturation)
    const diffRG = Math.abs(r - g);
    const diffRB = Math.abs(r - b);
    const diffGB = Math.abs(g - b);
    const isNeutral = diffRG < 20 && diffRB < 20 && diffGB < 20;
    const isLightBg = r > 130;     // white / light grey checkerboard
    const isDarkBg = r < 90;       // dark grey / near-black checkerboard
    return isNeutral && (isLightBg || isDarkBg);
  };
  
  const queue = [];
  
  // Add border pixels to queue
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    queue.push([x, height - 1]);
    visited[0 * width + x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    queue.push([width - 1, y]);
    visited[y * width + 0] = 1;
    visited[y * width + (width - 1)] = 1;
  }
  
  // BFS
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const idx = getIndex(cx, cy);
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    if (isBgColor(r, g, b)) {
      isBg[cy * width + cx] = 1;
      
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];
      
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = ny * width + nx;
          if (!visited[nIndex]) {
            visited[nIndex] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = getIndex(x, y);
      const outIdx = getOutIndex(x, y);
      
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = channels === 4 ? data[idx + 3] : 255;
      
      outBuffer[outIdx] = r;
      outBuffer[outIdx + 1] = g;
      outBuffer[outIdx + 2] = b;
      
      if (isBg[y * width + x]) {
        outBuffer[outIdx + 3] = 0;
      } else {
        outBuffer[outIdx + 3] = a;
      }
    }
  }
  
  await sharp(outBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);
  
  console.log(`✓ Processed: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
}

async function main() {
  const imagesDir = path.join(__dirname, '../public/images');
  const handPath = path.join(imagesDir, 'sculpture-hand-3d.png');
  const earthPath = path.join(imagesDir, 'realistic-earth-3d.png');
  
  console.log('🔄 Starting background removal on 3D assets...');
  
  // Backup originals first if not backed up
  const backupHand = handPath + '.bak';
  const backupEarth = earthPath + '.bak';
  
  if (!fs.existsSync(backupHand)) {
    fs.copyFileSync(handPath, backupHand);
    console.log(`✓ Backed up original hand to ${path.basename(backupHand)}`);
  }
  if (!fs.existsSync(backupEarth)) {
    fs.copyFileSync(earthPath, backupEarth);
    console.log(`✓ Backed up original earth to ${path.basename(backupEarth)}`);
  }
  
  await removeBackground(backupHand, handPath);
  await removeBackground(backupEarth, earthPath);
  
  console.log('✨ All checkerboards removed successfully!');
}

main().catch(err => {
  console.error('❌ Error during background removal:', err);
  process.exit(1);
});
