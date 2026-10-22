// Create the transparent WebP assets used by the scroll scene and logo.
// Run from any directory: node scripts/optimize-site-assets.cjs
// Keep the PNG sources: resizing preserves the full canvas, framing, and alpha.
// No trimming or cropping is applied because the animation uses that framing.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');

const assetDirectory = path.resolve(__dirname, '../public/assets');
const assets = [
  { name: 'pan', widths: [null, 768] },
  { name: 'plate', widths: [null, 768] },
  { name: 'gyoza-plump-frozen', widths: [768, 384] },
  { name: 'gyoza-plump-cooked', widths: [768, 384] },
  { name: 'gyoza-golden-side-up', widths: [768, 384] },
  { name: 'gyoza-golden-soft-fold-grip', widths: [null, 768] },
  // CSS crops with percentages; preserve the full canvas and encode resized pixels losslessly.
  { name: 'logo', widths: [768], lossless: true },
];

async function optimizeAssets() {
  const manifest = [];
  let originalBytes = 0;
  let desktopBytes = 0;
  let mobileBytes = 0;

  for (const asset of assets) {
    const source = path.join(assetDirectory, `${asset.name}.png`);
    const sourceMetadata = await sharp(source).metadata();
    const sourceBytes = (await fs.stat(source)).size;
    originalBytes += sourceBytes;

    for (const [index, width] of asset.widths.entries()) {
      const suffix = index === 0 ? '' : `-${width}`;
      const filename = `${asset.name}${suffix}.webp`;
      const output = path.join(assetDirectory, filename);
      let image = sharp(source);
      if (width !== null) {
        image = image.resize({ width, withoutEnlargement: true });
      }
      const result = await image.webp({
        quality: 90,
        alphaQuality: 100,
        effort: 6,
        lossless: asset.lossless === true,
      }).toFile(output);
      const metadata = await sharp(output).metadata();
      const expectedWidth = width === null ? sourceMetadata.width : Math.min(width, sourceMetadata.width);
      const expectedHeight = Math.round(sourceMetadata.height * expectedWidth / sourceMetadata.width);
      if (metadata.width !== expectedWidth || metadata.height !== expectedHeight || metadata.hasAlpha !== sourceMetadata.hasAlpha) {
        throw new Error(`Unexpected dimensions or alpha in ${filename}`);
      }
      if (index === 0) desktopBytes += result.size;
      if (index === asset.widths.length - 1) mobileBytes += result.size;
      manifest.push({
        file: `public/assets/${filename}`,
        width: result.width,
        height: result.height,
        bytes: result.size,
        hasAlpha: metadata.hasAlpha,
      });
    }
  }

  console.log(JSON.stringify({
    manifest,
    totals: { originalBytes, desktopBytes, mobileBytes },
  }, null, 2));
}

optimizeAssets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
