// Export the owner's selected artwork directly, preserving its food and layout.
// The source master stays local; only the final JPEG is needed by the website.
const sharp = require('sharp');

(async () => {
  const source = 'output/imagegen/facebook-preview-pan-v15.png';
  console.log(await sharp(source)
    .resize(1200, 630, { fit: 'contain', background: '#faf6ee' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('app/opengraph-image.jpg'));
})();
