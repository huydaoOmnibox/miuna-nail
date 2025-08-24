const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'client', 'public');
const destRoot = path.resolve(__dirname, '..', 'dist');
const destPublic = path.resolve(destRoot, 'public');

function copyRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyRecursive(src, destRoot);
  copyRecursive(src, destPublic);
  console.log(`Copied static public files from ${src} to ${destRoot} and ${destPublic}`);
} catch (err) {
  console.error('Error copying public files:', err);
  process.exit(1);
}
