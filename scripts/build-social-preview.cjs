// Reapply the original brand artwork without redrawing its lettering.
// The AI-edited food/background remains separate from the original logo layer.
const fs = require('node:fs/promises');
const sharp = require('sharp');

(async () => {
  const folder = 'output/imagegen';
  const version = 'facebook-preview-pan-v8';
  const background = await fs.readFile(`${folder}/${version}-background.png`);
  const logo = await fs.readFile('public/assets/logo.png');
  const photoUrl = `data:image/png;base64,${background.toString('base64')}`;
  const logoUrl = `data:image/png;base64,${logo.toString('base64')}`;
  // Crops match the website's Brand component, preserving all original red GYOZA letters.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1734" height="907" viewBox="0 0 1734 907">
  <title>House of Gyoza Facebook preview</title>
  <image href="${photoUrl}" width="1734" height="907"/>
  <g id="original-house-of-gyoza-logo">
    <svg x="65" y="110" width="175" height="117" viewBox="152 40 1084 722" overflow="hidden">
      <image href="${logoUrl}" width="1393" height="1129"/>
    </svg>
    <svg x="260" y="112" width="550" height="113" viewBox="27 781 1338 274" overflow="hidden">
      <image href="${logoUrl}" width="1393" height="1129"/>
    </svg>
  </g>
</svg>`;
  await fs.writeFile(`${folder}/${version}.svg`, svg);
  await sharp(Buffer.from(svg)).png().toFile(`${folder}/${version}.png`);
  console.log(await sharp(Buffer.from(svg))
    .resize(1200, 630, { fit: 'contain', background: '#faf6ee' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('app/opengraph-image.jpg'));
})();
