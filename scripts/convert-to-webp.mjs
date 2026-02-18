#!/usr/bin/env node
/**
 * convert-to-webp.mjs
 * -------------------
 * Reusable harness for converting PNG/JPG images and PDF files to webp.
 *
 * Usage:
 *   # Convert a single image
 *   node scripts/convert-to-webp.mjs --input public/images/foo.png
 *
 *   # Convert a directory of images
 *   node scripts/convert-to-webp.mjs --input public/images/raw/ --out public/images/
 *
 *   # Convert a PDF (each page becomes its own webp)
 *   node scripts/convert-to-webp.mjs --pdf public/pdf/doc.pdf --out public/images/ --prefix My_Doc
 *
 *   # Extra options
 *   --quality 85       webp quality (1–100, default 85)
 *   --dpi 150          PDF render resolution (default 150)
 *   --delete-source    Remove source file(s) after successful conversion
 *
 * Requirements:
 *   - sharp (already in node_modules via Vite)
 *   - pdftoppm (Poppler) on PATH — only needed for PDF mode
 *
 * Output naming:
 *   PNG/JPG → same filename with .webp extension in --out dir (default: same dir as source)
 *   PDF     → {prefix}_p01.webp, {prefix}_p02.webp … in --out dir
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

// ── Argument parsing ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}

function hasFlag(flag) {
  return args.includes(flag);
}

const inputArg    = getArg('--input');
const pdfArg      = getArg('--pdf');
const outArg      = getArg('--out');
const prefixArg   = getArg('--prefix');
const quality     = parseInt(getArg('--quality') ?? '85', 10);
const dpi         = parseInt(getArg('--dpi') ?? '150', 10);
const deleteSource = hasFlag('--delete-source');

if (!inputArg && !pdfArg) {
  console.error('Usage: node scripts/convert-to-webp.mjs --input <path|dir> [--out <dir>] [--quality 85] [--delete-source]');
  console.error('       node scripts/convert-to-webp.mjs --pdf <file.pdf>   [--out <dir>] [--prefix Name] [--dpi 150] [--delete-source]');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function convertImage(srcPath, destDir) {
  const name = path.basename(srcPath, path.extname(srcPath)) + '.webp';
  const dest = path.join(destDir, name);
  const meta = await sharp(srcPath).metadata();
  await sharp(srcPath).webp({ quality }).toFile(dest);
  const sizeKB = Math.round(fs.statSync(dest).size / 1024);
  console.log(`  ✓  ${path.basename(dest)}  (${meta.width}×${meta.height}, ${sizeKB} KB)`);
  if (deleteSource && srcPath !== dest) {
    fs.rmSync(srcPath);
    console.log(`     deleted source: ${srcPath}`);
  }
  return dest;
}

// ── PDF mode ──────────────────────────────────────────────────────────────────
async function convertPdf(pdfPath, outDir, prefix) {
  // Verify pdftoppm is available
  const check = spawnSync('pdftoppm', ['-h'], { encoding: 'utf8' });
  if (check.error) {
    console.error('ERROR: pdftoppm not found on PATH. Install Poppler (https://poppler.freedesktop.org/).');
    process.exit(1);
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'webp-pdf-'));
  const pagePrefix = path.join(tmpDir, 'page');

  console.log(`  Rendering PDF at ${dpi} dpi → ${tmpDir}`);
  const result = spawnSync('pdftoppm', ['-r', String(dpi), '-png', pdfPath, pagePrefix], {
    encoding: 'utf8',
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    console.error('ERROR: pdftoppm failed.');
    process.exit(1);
  }

  const pages = fs.readdirSync(tmpDir).filter(f => f.endsWith('.png')).sort();
  console.log(`  ${pages.length} page(s) rendered. Converting to webp…`);

  ensureDir(outDir);
  const pdfBase = prefix || path.basename(pdfPath, path.extname(pdfPath)).replace(/\s+/g, '_');

  for (const page of pages) {
    // page-01.png → {prefix}_p01.webp
    const num = page.replace(/^page-?/, '').replace('.png', '').padStart(2, '0');
    const destName = `${pdfBase}_p${num}.webp`;
    const dest = path.join(outDir, destName);
    const meta = await sharp(path.join(tmpDir, page)).metadata();
    await sharp(path.join(tmpDir, page)).webp({ quality }).toFile(dest);
    const sizeKB = Math.round(fs.statSync(dest).size / 1024);
    console.log(`  ✓  ${destName}  (${meta.width}×${meta.height}, ${sizeKB} KB)`);
  }

  // Clean up temp dir
  fs.rmSync(tmpDir, { recursive: true, force: true });

  if (deleteSource) {
    fs.rmSync(pdfPath);
    console.log(`  deleted source: ${pdfPath}`);
  }
}

// ── Image mode ────────────────────────────────────────────────────────────────
async function convertImages(inputPath, outDir) {
  const stat = fs.statSync(inputPath);

  if (stat.isDirectory()) {
    const files = fs.readdirSync(inputPath)
      .filter(f => /\.(png|jpe?g|tiff?|avif)$/i.test(f))
      .sort();

    if (files.length === 0) {
      console.log('No convertible images found in directory.');
      return;
    }

    const dest = outDir || inputPath;
    ensureDir(dest);
    console.log(`Converting ${files.length} image(s) in ${inputPath} → ${dest}`);
    for (const f of files) {
      await convertImage(path.join(inputPath, f), dest);
    }
  } else {
    const dest = outDir || path.dirname(inputPath);
    ensureDir(dest);
    console.log(`Converting ${inputPath} → ${dest}`);
    await convertImage(inputPath, dest);
  }
}

// ── Entry point ───────────────────────────────────────────────────────────────
(async () => {
  try {
    if (pdfArg) {
      const pdfPath = path.resolve(pdfArg);
      if (!fs.existsSync(pdfPath)) { console.error(`File not found: ${pdfPath}`); process.exit(1); }
      const outDir = path.resolve(outArg || path.dirname(pdfPath));
      console.log(`\nPDF → webp  |  quality=${quality}  dpi=${dpi}`);
      console.log(`  Source : ${pdfPath}`);
      console.log(`  Output : ${outDir}\n`);
      await convertPdf(pdfPath, outDir, prefixArg);
    } else {
      const inputPath = path.resolve(inputArg);
      if (!fs.existsSync(inputPath)) { console.error(`Path not found: ${inputPath}`); process.exit(1); }
      const outDir = outArg ? path.resolve(outArg) : null;
      console.log(`\nImage → webp  |  quality=${quality}`);
      await convertImages(inputPath, outDir);
    }
    console.log('\nDone.');
  } catch (err) {
    console.error('Conversion failed:', err.message);
    process.exit(1);
  }
})();
