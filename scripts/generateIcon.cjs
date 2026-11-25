const fs = require('fs');
const path = require('path');
const sharp = require('../../backend/node_modules/sharp');

const dir = path.join(__dirname, '../electron/assets');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svg = `
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111F3D"/>
      <stop offset="100%" stop-color="#1B3157"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5D77F"/>
      <stop offset="100%" stop-color="#C5A45A"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="52" fill="url(#bg)"/>
  <path d="M128 36 L200 74 V138 C200 182 168 218 128 230 C88 218 56 182 56 138 V74 Z" fill="url(#gold)"/>
  <path d="M128 54 L184 84 V138 C184 172 160 202 128 212 C96 202 72 172 72 138 V84 Z" fill="#111F3D"/>
  <path d="M108 134 L122 148 L152 114" stroke="url(#gold)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
`;

sharp(Buffer.from(svg))
  .resize(256, 256)
  .png()
  .toFile(path.join(dir, 'icon.png'))
  .then(() => {
    console.log('✅ Generated AnchorID icon.png');
  })
  .catch((err) => {
    console.error('Icon generation failed:', err);
  });
