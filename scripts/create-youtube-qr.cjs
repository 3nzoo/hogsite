// Run after installing qrcode in tmp/qr-tools, as for create-tiktok-qr.cjs.
// Generate a compact website SVG and a print PNG from the owner's exact URL.
const QRCode = require('../tmp/qr-tools/node_modules/qrcode');
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const url = 'https://www.youtube.com/@houseofgyoza';
const qrBackground = '#f1d6a6'; // Match the owner's Instagram QR background.
const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
const border = 4;
const size = qr.modules.size;
const total = size + border * 2;
const center = total / 2;
const modules = [];
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (qr.modules.get(y, x)) modules.push(`M${x + border} ${y + border}h1v1h-1z`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="540" height="540" role="img" aria-label="House of Gyoza YouTube QR code">
<title>House of Gyoza on YouTube</title>
<rect width="${total}" height="${total}" fill="${qrBackground}"/>
<path d="${modules.join('')}" fill="#171717" shape-rendering="crispEdges"/>
<rect x="${center - 4.5}" y="${center - 4.5}" width="9" height="9" rx="1.4" fill="${qrBackground}"/>
<rect x="${center - 3.5}" y="${center - 2.5}" width="7" height="5" rx="1.1" fill="#f00"/>
<path d="M${center - 1} ${center - 1.5}l2.6 1.5-2.6 1.5z" fill="#fff"/>
</svg>`;

(async () => {
  const folder = path.resolve(__dirname, '../public/assets/brand');
  await fs.mkdir(folder, { recursive: true });
  await fs.writeFile(path.join(folder, 'youtube-qr.svg'), svg);
  await sharp(Buffer.from(svg)).resize(1080, 1080).png()
    .toFile(path.join(folder, 'youtube-qr.png'));
  console.log(JSON.stringify({ url, modules: size, quietZone: border, svg: 'public/assets/brand/youtube-qr.svg', png: 'public/assets/brand/youtube-qr.png' }));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
