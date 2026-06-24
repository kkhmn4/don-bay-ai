const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('📦 Copying Next.js static assets to standalone directory...');
  // copy .next/static to .next/standalone/.next/static
  const srcStatic = path.join(__dirname, '../.next/static');
  const destStatic = path.join(__dirname, '../.next/standalone/.next/static');
  if (fs.existsSync(srcStatic)) {
    copyDirSync(srcStatic, destStatic);
    console.log('✓ Copied .next/static successfully.');
  } else {
    console.log('⚠️ .next/static not found.');
  }

  // copy public to .next/standalone/public
  const srcPublic = path.join(__dirname, '../public');
  const destPublic = path.join(__dirname, '../.next/standalone/public');
  if (fs.existsSync(srcPublic)) {
    copyDirSync(srcPublic, destPublic);
    console.log('✓ Copied public/ directory successfully.');
  } else {
    console.log('⚠️ public/ directory not found.');
  }
  
  console.log('✨ Build assets copied successfully!');
} catch (err) {
  console.error('❌ Failed to copy build assets:', err.message);
  process.exit(1);
}
