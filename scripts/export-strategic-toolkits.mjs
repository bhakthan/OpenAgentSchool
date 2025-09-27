#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import XLSX from 'xlsx';
import strategicToolkits from '../src/lib/data/studyMode/strategic-toolkits.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { utils, writeFileXLSX } = XLSX;

const rows = strategicToolkits.map((toolkit) => ({
  ID: toolkit.id,
  Title: toolkit.title,
  Description: toolkit.description,
  'Download Path': toolkit.href,
  'Source File Name': toolkit.downloadName,
}));

const workbook = utils.book_new();
const worksheet = utils.json_to_sheet(rows, {
  header: ['ID', 'Title', 'Description', 'Download Path', 'Source File Name'],
});

worksheet['!cols'] = [
  { wch: 26 },
  { wch: 36 },
  { wch: 80 },
  { wch: 48 },
  { wch: 28 },
];

utils.book_append_sheet(workbook, worksheet, 'Toolkits');

const outputDir = resolve(__dirname, '../public/toolkits');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const outputPath = resolve(outputDir, 'strategic-toolkit-library.xlsx');
writeFileXLSX(workbook, outputPath);

console.log(`✅ Exported ${rows.length} strategy toolkits -> ${outputPath}`);
