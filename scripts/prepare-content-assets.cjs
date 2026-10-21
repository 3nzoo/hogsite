// Encode responsive copies of menu photos; preserve their complete compositions.
// Run from the project root. Source files remain untouched.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const assets = [
  ['crispy-pork-enhanced', 'output/imagegen/crispy-pork-enhanced.png'],
  ['pizza-beef', '/Users/biboyrenz/Downloads/pzza.png'],
  ['takoyaki', '/Users/biboyrenz/Downloads/tako.png'],
  ['shrimp-cajun', '/Users/biboyrenz/Downloads/shrp.png'],
  ['creamy-garlic-spinach', '/Users/biboyrenz/Downloads/spin.png'],
  ['vegetable', '/Users/biboyrenz/Desktop/business/2026/vege.png'],
];
(async () => {
  await fs.mkdir('public/assets/menu', { recursive: true });
  let bytes = 0;
  for (const [name, source] of assets) {
    for (const width of [600, 1200]) {
      const output = path.join('public/assets/menu', `${name}${width === 600 ? '-600' : ''}.webp`);
      const info = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toFile(output);
      bytes += info.size;
      console.log(`${output}: ${Math.round(info.size / 1024)} KB`);
    }
  }
  const story = await sharp('/Users/biboyrenz/Downloads/ateee.png').resize({ width: 1600 }).webp({ quality: 86, effort: 6 }).toFile('public/assets/brand/our-story.webp');
  console.log(`All menu sizes plus story: ${Math.round((bytes + story.size) / 1024)} KB`);
})();
