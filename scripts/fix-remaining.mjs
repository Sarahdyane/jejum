import { removeBackground } from '@imgly/background-removal-node';
import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const REMAINING = [
  'src/assets/age-woman-50-plus.jpg',
  'src/assets/age-woman-18-29-young.jpg',
  'src/assets/fitness-woman-dumbbell.png',
];

async function removeDarkBgAI(relPath) {
  const fullPath = path.resolve(ROOT, relPath);
  const fileBuffer = fs.readFileSync(fullPath);
  const ext = path.extname(relPath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
  const inputBlob = new Blob([fileBuffer], { type: mimeType });
  const resultBlob = await removeBackground(inputBlob, {
    output: { type: 'foreground', format: 'image/png' },
  });
  const arrayBuffer = await resultBlob.arrayBuffer();
  const pngBuffer = Buffer.from(arrayBuffer);
  const fg = await Jimp.read(pngBuffer);
  const { width, height } = fg.bitmap;
  const bg = new Jimp({ width, height, color: 0xffffffff });
  bg.composite(fg, 0, 0);
  await bg.write(fullPath);
}

for (const relPath of REMAINING) {
  console.log(`Processing ${path.basename(relPath)}...`);
  await removeDarkBgAI(relPath);
  console.log('  ✓');
}
console.log('Done!');
