const { execSync } = require('child_process');
const path = require('path');
const root = path.join(__dirname, '..');

try {
  const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto('file://' + path.join(root, 'og-image-source.html'), { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(root, 'images', 'og-image.png'), type: 'png' });
    await browser.close();
    console.log('✅ og-image.png généré dans images/');
  })();
} catch (e) {
  console.log('⚠️  puppeteer non disponible — génération via SVG de fallback');
  // Fallback: créer un SVG valide comme og-image
  const fs = require('fs');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="60%" stop-color="#764ba2"/>
      <stop offset="100%" stop-color="#f093fb"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="48" width="52" height="52" rx="14" fill="rgba(255,255,255,0.2)"/>
  <text x="106" y="82" text-anchor="middle" font-family="system-ui" font-size="28" fill="white">🏠</text>
  <text x="148" y="84" font-family="system-ui" font-weight="800" font-size="28" fill="white">Family</text>
  <text x="268" y="84" font-family="system-ui" font-weight="800" font-size="28" fill="#a7f3d0">App</text>
  <rect x="80" y="168" width="180" height="36" rx="18" fill="rgba(255,255,255,0.2)"/>
  <text x="170" y="192" text-anchor="middle" font-family="system-ui" font-weight="600" font-size="16" fill="white">🚀 Bêta ouverte</text>
  <text x="80" y="270" font-family="system-ui" font-weight="900" font-size="68" fill="white">L'organisation</text>
  <text x="80" y="350" font-family="system-ui" font-weight="900" font-size="68" fill="white">familiale</text>
  <text x="80" y="430" font-family="system-ui" font-weight="900" font-size="68" fill="#a7f3d0">enfin fun</text>
  <text x="80" y="495" font-family="system-ui" font-size="22" fill="rgba(255,255,255,0.85)">Tâches, calendrier, Pronote — app 100% française</text>
  <text x="80" y="582" font-family="system-ui" font-size="16" fill="rgba(255,255,255,0.7)">family-app.fr · 🇫🇷 Made in France</text>
  </svg>`;
  const outPath = path.join(root, 'images', 'og-image.svg');
  fs.writeFileSync(outPath, svg);
  console.log('✅ og-image.svg généré dans images/ (convertir en PNG pour la prod)');
}
