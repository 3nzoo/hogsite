// Reapply the original logo as a native layer over the selected photo/layout.
// Keep only the PNG master and website JPEG; do not duplicate photos in SVG exports.
const fs = require('node:fs/promises');
const sharp = require('sharp');

(async () => {
  const folder = 'output/imagegen';
  const version = 'facebook-preview-pan-v15';
  const background = await fs.readFile(`${folder}/facebook-preview-pan-v14-background.png`);
  const food = await fs.readFile(`${folder}/facebook-preview-pan-v15-food.png`);
  const logo = await fs.readFile('public/assets/brand/house-of-gyoza-horizontal.png');
  // Limit the food edit to the skillet interior, preserving the layout and outer rim.
  const foodMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1734" height="907">
    <defs><filter id="feather"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <ellipse cx="1270" cy="440" rx="445" ry="385" fill="white" filter="url(#feather)"/>
  </svg>`);
  const foodLayer = await sharp(food).ensureAlpha()
    .composite([{ input: foodMask, blend: 'dest-in' }])
    .png().toBuffer();
  // This blank strip is above the generated logo and uses the same paper colors.
  const paper = await sharp(background)
    .extract({ left: 0, top: 0, width: 830, height: 120 })
    .resize(830, 140, { fit: 'fill' })
    .png()
    .toBuffer();
  const paperUrl = `data:image/png;base64,${paper.toString('base64')}`;
  const logoUrl = `data:image/png;base64,${logo.toString('base64')}`;
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1734" height="907" viewBox="0 0 1734 907">
    <title>Original House of Gyoza logo overlay</title>
    <defs>
      <linearGradient id="paper-right" x1="810" y1="0" x2="830" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="white"/><stop offset="1" stop-color="black"/>
      </linearGradient>
      <linearGradient id="paper-bottom" x1="0" y1="120" x2="0" y2="260" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="black"/><stop offset=".0714" stop-color="white"/>
        <stop offset=".8928" stop-color="white"/><stop offset="1" stop-color="black"/>
      </linearGradient>
      <mask id="paper-right-mask"><rect width="830" height="280" fill="url(#paper-right)"/></mask>
      <mask id="paper-bottom-mask"><rect width="830" height="280" fill="url(#paper-bottom)"/></mask>
      <!-- Remove only the solid cream backdrop from the supplied logo artwork. -->
      <filter id="logo-ink" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 -1.036585366 0 0 1"/>
        <feComposite in2="SourceAlpha" operator="in"/>
      </filter>
    </defs>
    <g mask="url(#paper-right-mask)">
      <image href="${paperUrl}" y="120" width="830" height="140" mask="url(#paper-bottom-mask)"/>
    </g>
    <image href="${logoUrl}" x="40" y="104" width="790" height="163.015873" preserveAspectRatio="xMidYMid meet" filter="url(#logo-ink)"/>
  </svg>`;
  const master = await sharp(background)
    .composite([{ input: foodLayer }, { input: Buffer.from(overlay) }])
    .png()
    .toBuffer();
  await fs.writeFile(`${folder}/${version}.png`, master);
  console.log(await sharp(master)
    .resize(1200, 630, { fit: 'contain', background: '#faf6ee' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('app/opengraph-image.jpg'));
})();
