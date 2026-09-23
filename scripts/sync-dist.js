import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('out');
const distDir = path.resolve('dist');

if (fs.existsSync(outDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(outDir, distDir, { recursive: true });
  console.log('✅ Successfully mirrored out/ to dist/');
} else {
  console.warn('⚠️  out/ directory not found, skipping mirror.');
}
