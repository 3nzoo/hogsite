// Keep these in step with .experience-art's short-phone and landscape rules.
// The stage also bounds the hand-held close-up; gyoza allow 25% for their arc.
const stageSizes = [
  "(max-width: 760px) and (max-height: 500px) min(45vw, calc(100svh - 120px))",
  "(max-width: 1000px) and (max-height: 500px) min(45vw, calc(100svh - 128px))",
  "(max-width: 760px) and (max-height: 650px) min(88vw, 300px, calc(100svh - 375px))",
  "(max-width: 760px) and (max-height: 760px) min(88vw, 340px, calc(100svh - 410px))",
  "(max-width: 420px) 94vw",
  "(max-width: 760px) min(91vw, 440px)",
  "(max-height: 740px) min(57vw, 81svh)",
  "(min-width: 1600px) min(56vw, 850px, 86svh)",
  "min(57vw, 780px, 75svh)",
].join(", ");
const gyozaSizes = [
  "(max-width: 760px) and (max-height: 500px) min(11.25vw, calc(25svh - 30px))",
  "(max-width: 1000px) and (max-height: 500px) min(11.25vw, calc(25svh - 32px))",
  "(max-width: 760px) and (max-height: 650px) min(22vw, 75px, calc(25svh - 93.75px))",
  "(max-width: 760px) and (max-height: 760px) min(22vw, 85px, calc(25svh - 102.5px))",
  "(max-width: 420px) 23.5vw",
  "(max-width: 760px) min(22.75vw, 110px)",
  "(max-height: 740px) min(14.25vw, 20.25svh)",
  "(min-width: 1600px) min(14vw, 212.5px, 21.5svh)",
  "min(14.25vw, 195px, 18.75svh)",
].join(", ");

function image(name: string, width: number, smallerWidth: number, sizes: string) {
  return {
    src: `/assets/${name}.webp`,
    srcSet: `/assets/${name}-${smallerWidth}.webp ${smallerWidth}w, /assets/${name}.webp ${width}w`,
    sizes,
    width,
    height: width,
  };
}

export const experienceAssets = {
  pan: image("pan", 1254, 768, stageSizes),
  plate: image("plate", 1254, 768, stageSizes),
  frozen: image("gyoza-plump-frozen", 768, 384, gyozaSizes),
  cooked: image("gyoza-plump-cooked", 768, 384, gyozaSizes),
  golden: image("gyoza-golden-side-up", 768, 384, gyozaSizes),
  grip: image("gyoza-golden-soft-fold-grip", 1254, 768, stageSizes),
};

// Decode the actual DOM images so srcSet selection and browser caching agree.
export async function decodeExperienceImages(images: readonly HTMLImageElement[]) {
  if (!images.length) throw new Error("The cooking scene has no images.");
  await Promise.all(images.map(async (element) => {
    await element.decode();
    if (!element.naturalWidth) throw new Error("A cooking scene image could not load.");
  }));
}
