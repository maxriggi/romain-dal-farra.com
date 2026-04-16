import sharp from 'sharp';
import { readdir, mkdir, copyFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const RAW_ASSETS = join(ROOT, 'assets');
const OUT = join(ROOT, 'src', 'assets');

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

async function processImage(inputPath, outputDir, opts = {}) {
  const { maxWidth = 1600, quality = 80, keepFormat = false } = opts;
  const ext = extname(inputPath).toLowerCase();
  const name = slugify(basename(inputPath, extname(inputPath)));

  if (['.ds_store', '.pdf'].includes(ext)) return;

  await mkdir(outputDir, { recursive: true });

  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.heic', '.heif'];
  if (!supportedFormats.includes(ext)) {
    console.log(`  ⏭ Skipping unsupported format: ${basename(inputPath)}`);
    return;
  }

  try {
    const img = sharp(inputPath);
    const meta = await img.metadata();

    const needsResize = meta.width > maxWidth;
    let pipeline = needsResize ? img.resize({ width: maxWidth, withoutEnlargement: true }) : img;

    if (keepFormat && ['.png'].includes(ext)) {
      // Keep PNG for logos (transparency)
      const outPath = join(outputDir, `${name}.png`);
      await pipeline.png({ quality }).toFile(outPath);
      console.log(`  ✓ ${basename(inputPath)} → ${name}.png`);
    } else {
      // Convert to WebP
      const outPath = join(outputDir, `${name}.webp`);
      await pipeline.webp({ quality }).toFile(outPath);

      // Also produce JPG fallback for portraits/tournages
      if (!keepFormat) {
        const jpgPath = join(outputDir, `${name}.jpg`);
        pipeline = needsResize
          ? sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true })
          : sharp(inputPath);
        await pipeline.jpeg({ quality: 75 }).toFile(jpgPath);
      }

      const origSize = (await stat(inputPath)).size;
      const newSize = (await stat(join(outputDir, `${name}.webp`))).size;
      const ratio = ((1 - newSize / origSize) * 100).toFixed(0);
      console.log(`  ✓ ${basename(inputPath)} → ${name}.webp (${ratio}% smaller)`);
    }
  } catch (err) {
    console.error(`  ✗ Error processing ${basename(inputPath)}: ${err.message}`);
  }
}

async function processDirectory(inputDir, outputDir, opts = {}) {
  let entries;
  try {
    entries = await readdir(inputDir, { withFileTypes: true });
  } catch {
    console.log(`  Directory not found: ${inputDir}`);
    return;
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = join(inputDir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, join(outputDir, slugify(entry.name)), opts);
    } else {
      await processImage(fullPath, outputDir, opts);
    }
  }
}

console.log('🎬 Optimisation des images pour romain-dal-farra.com\n');

console.log('📸 Portraits (assets/Moi/ → src/assets/portraits/)');
await processDirectory(join(RAW_ASSETS, 'Moi'), join(OUT, 'portraits'), { maxWidth: 1600 });

console.log('\n🎥 Tournages (assets/Tournages/ → src/assets/tournages/)');
await processDirectory(join(RAW_ASSETS, 'Tournages'), join(OUT, 'tournages'), { maxWidth: 1600 });

console.log('\n🏢 Logos partenaires (assets/Logos partenaires/ → src/assets/partners/)');
await processDirectory(join(RAW_ASSETS, 'Logos partenaires'), join(OUT, 'partners'), {
  maxWidth: 400,
  keepFormat: true,
  quality: 90,
});

console.log('\n🎯 Logo site (assets/Logo/ → src/assets/logos/)');
await processDirectory(join(RAW_ASSETS, 'Logo'), join(OUT, 'logos'), {
  maxWidth: 600,
  keepFormat: true,
  quality: 90,
});

console.log('\n🎬 DOP (assets/DOP/ → src/assets/dop/)');
await processDirectory(join(RAW_ASSETS, 'DOP'), join(OUT, 'dop'), { maxWidth: 1200 });

console.log('\n📷 Photos Divers – À propos');
await processDirectory(join(RAW_ASSETS, 'Photos Divers : Autres réalisations', 'À propos'), join(OUT, 'portraits'), { maxWidth: 1600 });

console.log('\n📷 Photos Divers – DOP');
await processDirectory(join(RAW_ASSETS, 'Photos Divers : Autres réalisations', 'DOP'), join(OUT, 'dop'), { maxWidth: 1200 });

console.log('\n📷 Photos Divers – Tournages');
await processDirectory(join(RAW_ASSETS, 'Photos Divers : Autres réalisations', 'Tournages'), join(OUT, 'tournages'), { maxWidth: 1600 });

console.log('\n✅ Optimisation terminée !');
