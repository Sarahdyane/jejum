import { removeBackground } from '@imgly/background-removal-node';
import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DARK_BG_IMAGES = [
  'src/assets/body-thin-female-real-new.jpg',
  'src/assets/body-average-female-real-new.jpg',
  'src/assets/body-fuller-female-real-new.jpg',
  'src/assets/body-obese-female-real-new.jpg',
  'src/assets/goal-athlete-female-real.jpg',
  'src/assets/goal-slim-female-real.jpg',
  'src/assets/age-woman-30-39.jpg',
  'src/assets/age-woman-40-49.jpg',
  'src/assets/age-woman-50-plus.jpg',
  'src/assets/age-woman-18-29-young.jpg',
  'src/assets/fitness-woman-dumbbell.png',
];

const LOGO = 'src/assets/nutria-logo.png';

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

  // Load the transparent PNG from AI
  const fg = await Jimp.read(pngBuffer);
  const { width, height } = fg.bitmap;
  const data = fg.bitmap.data;

  // Fix dark halos: for semi-transparent edge pixels, decontaminate the dark
  // background color that bled into them during the original photo shoot.
  // Formula: since original bg was near-black, brighten edge pixels proportionally.
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const a = data[idx + 3]; // alpha 0-255

    if (a === 0) continue; // fully transparent, skip

    if (a < 240) {
      // Edge pixel — dark background contamination removal.
      // Push the foreground color away from black proportionally to how
      // semi-transparent the pixel is. This lightens residual dark halos.
      const t = 1 - a / 255; // 0 = opaque, 1 = transparent
      const boost = 1 + t * 1.2; // up to 2.2x brighter at fully transparent edges
      data[idx]     = Math.min(255, Math.round(data[idx]     * boost));
      data[idx + 1] = Math.min(255, Math.round(data[idx + 1] * boost));
      data[idx + 2] = Math.min(255, Math.round(data[idx + 2] * boost));

      // Also sharpen the alpha: push soft edges towards opaque or transparent
      // so the halo ring becomes crisper / smaller.
      if (a < 40) {
        data[idx + 3] = 0; // nearly transparent → fully transparent
      } else if (a < 180) {
        // linear ramp: 40→0, 180→255
        data[idx + 3] = Math.min(255, Math.round((a - 40) * (255 / 140)));
      }
      // a >= 180 stays as-is (will composite as mostly opaque)
    }
  }

  // Composite the corrected foreground on a clean white background
  const bg = new Jimp({ width, height, color: 0xffffffff });
  bg.composite(fg, 0, 0);

  await bg.write(fullPath);
}

async function removeWhiteBg(relPath) {
  const fullPath = path.resolve(ROOT, relPath);
  const img = await Jimp.read(fullPath);
  const { width, height } = img.bitmap;
  const data = img.bitmap.data;
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    if (data[idx] > 230 && data[idx + 1] > 230 && data[idx + 2] > 230) {
      data[idx + 3] = 0;
    }
  }
  await img.write(fullPath);
}

async function main() {
  console.log('=== Nutria Image Fixer (v3 — halo correction) ===\n');

  console.log(`[Logo] ${LOGO}`);
  await removeWhiteBg(LOGO);
  console.log('  ✓\n');

  for (const relPath of DARK_BG_IMAGES) {
    console.log(`[AI + halo fix] ${path.basename(relPath)}`);
    try {
      await removeDarkBgAI(relPath);
      console.log('  ✓\n');
    } catch (err) {
      console.error(`  ✗ ${err.message}\n`);
    }
  }

  console.log('=== Done! ===');
}

main().catch((err) => { console.error(err); process.exit(1); });
