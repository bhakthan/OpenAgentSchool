#!/usr/bin/env node

/**
 * Deployment Verification Script
 * This script checks if the SPA routing is configured correctly for Netlify
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying SPA routing configuration...\n');

// Check if dist folder exists
const distPath = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist folder not found. Run `npm run build` first.');
  process.exit(1);
}

// Check if index.html exists in dist
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in dist folder.');
  process.exit(1);
}

// Check if _redirects file exists in dist
const redirectsPath = path.join(distPath, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.error('❌ _redirects file not found in dist folder.');
  console.log('💡 This file should be copied from public/_redirects during build.');
  process.exit(1);
}

// Verify _redirects content
const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
if (!redirectsContent.includes('/*') || !redirectsContent.includes('/index.html')) {
  console.error('❌ _redirects file does not contain proper SPA redirect rule.');
  console.log('Expected: /*    /index.html   200');
  process.exit(1);
}

// Check if netlify.toml exists
const netlifyTomlPath = path.join(__dirname, '..', 'netlify.toml');
if (!fs.existsSync(netlifyTomlPath)) {
  console.error('❌ netlify.toml not found in project root.');
  process.exit(1);
}

// Verify netlify.toml content
const netlifyContent = fs.readFileSync(netlifyTomlPath, 'utf8');
if (!netlifyContent.includes('publish = "dist"')) {
  console.error('❌ netlify.toml does not specify correct publish directory.');
  process.exit(1);
}

if (!netlifyContent.includes('/*') || !netlifyContent.includes('/index.html')) {
  console.error('❌ netlify.toml does not contain proper SPA redirect rule.');
  process.exit(1);
}

console.log('✅ dist folder exists');
console.log('✅ index.html found in dist');
console.log('✅ _redirects file configured correctly');
console.log('✅ netlify.toml configured correctly');
console.log('\n🎉 SPA routing configuration looks good!');
console.log('\n📝 If you still get 404 errors on refresh after deployment:');
console.log('   1. Clear Netlify deploy cache');
console.log('   2. Trigger a new deployment');
console.log('   3. Check browser cache (try incognito mode)');
