// Injects partials/header.html (the shared urgency-bar + <header> block) into
// every page's <!-- HEADER:START/END --> region, so the header is edited once
// and propagated everywhere instead of drifting per-page.
//
// Usage: node scripts/build-headers.js
// After editing partials/header.html, re-run this and commit the result —
// the site is deployed as plain static files (manual WebFTP upload), so the
// expanded HTML must be what's committed, not a runtime include.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const partial = fs.readFileSync(path.join(root, 'partials', 'header.html'), 'utf8').replace(/\s+$/, '');

const START = '<!-- HEADER:START -->';
const END = '<!-- HEADER:END -->';

function findHtmlFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'partials' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(full, out);
    } else if (entry.name === 'index.html') {
      out.push(full);
    }
  }
  return out;
}

let updated = 0;
let skipped = 0;

for (const file of findHtmlFiles(root)) {
  const content = fs.readFileSync(file, 'utf8');
  const startIdx = content.indexOf(START);
  const endIdx = content.indexOf(END);
  if (startIdx === -1 || endIdx === -1) {
    skipped++;
    continue;
  }
  const before = content.slice(0, startIdx + START.length);
  const after = content.slice(endIdx);
  const next = `${before}\n${partial}\n  ${after}`;
  if (next !== content) {
    fs.writeFileSync(file, next);
    console.log(`updated: ${path.relative(root, file)}`);
  }
  updated++;
}

console.log(`\n${updated} page(s) with a header marker processed, ${skipped} page(s) skipped (no marker found).`);
if (skipped > 0) {
  console.log('Pages without a marker keep their own header — wrap it in <!-- HEADER:START --> / <!-- HEADER:END --> to bring it under this build step.');
}
