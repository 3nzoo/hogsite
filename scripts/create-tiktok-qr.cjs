// Deterministic, high-error-correction QR. Run after installing qrcode in tmp/qr-tools.
// TikTok icon path: https://github.com/simple-icons/simple-icons/blob/develop/icons/tiktok.svg (CC0).
const QRCode = require('../tmp/qr-tools/node_modules/qrcode');
const fs = require('node:fs');
const sharp = require('sharp');
const url = 'https://www.tiktok.com/@houseofgyoza';
const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
const border = 4;
const size = qr.modules.size;
const total = size + border * 2;
const iconPath = fs.readFileSync('docs/brand/tiktok-mark.svg', 'utf8').match(/<path d="([^"]+)"/)[1];
const modules = [];
for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
  if(qr.modules.get(y,x)) modules.push(`M${x+border} ${y+border}h1v1h-1z`);
}
// Nine center modules are covered; all finder/alignment patterns and quiet zones remain intact.
const center = total / 2;
const badge = 9;
const logoScale = 6 / 24;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="540" height="540" role="img" aria-label="House of Gyoza TikTok QR code">
<title>House of Gyoza on TikTok</title>
<rect width="${total}" height="${total}" fill="#fff"/>
<path d="${modules.join('')}" fill="#171717" shape-rendering="crispEdges"/>
<rect x="${center-badge/2}" y="${center-badge/2}" width="${badge}" height="${badge}" rx="1.4" fill="#fff"/>
<rect x="${center-3.8}" y="${center-3.8}" width="7.6" height="7.6" rx="1.25" fill="#171717"/>
<g transform="translate(${center-3} ${center-3}) scale(${logoScale})">
<path d="${iconPath}" fill="#25f4ee" transform="translate(-.8 -.4)"/>
<path d="${iconPath}" fill="#fe2c55" transform="translate(.8 .4)"/>
<path d="${iconPath}" fill="#fff"/>
</g></svg>`;
fs.writeFileSync('public/assets/brand/tiktok-qr.svg',svg);
(async()=>{
 // Render the code-native SVG for printing and decoder verification.
 await sharp(Buffer.from(svg)).resize(1080,1080).png().toFile('public/assets/brand/tiktok-qr.png');
 for(const width of [256,144,128])await sharp(Buffer.from(svg)).resize(width,width).png().toFile(`tmp/tiktok-qr-${width}.png`);
 console.log(JSON.stringify({url,modules:size,coveredModules:badge,svg:'public/assets/brand/tiktok-qr.svg',png:'public/assets/brand/tiktok-qr.png'}));
})();
