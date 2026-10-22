# Website image delivery

The scroll scene serves transparent WebP derivatives of the approved PNG artwork.
The original PNGs are retained for editing; the homepage does not request them.
Menu and story photos already use lazy-loaded WebP images.

Run `npm run optimize:assets` after editing a source PNG. This regenerates the
scene's WebP sizes and the logo without changing the sources. Sharp is supplied
by the installed Next.js dependencies.

## Sizes

The six unique scene images and logo originally totaled 8,983,741 bytes (8.57 MiB).
The largest responsive set now totals 1,099,114 bytes (1.05 MiB), a reduction of
87.8%. The smallest set totals 485,912 bytes (0.46 MiB), a reduction of 94.6%.
These are image file totals, not measured page load times. Each browser chooses
the appropriate candidates for its viewport and pixel density.

- Pan and plate: 768px and 1254px square.
- Frozen, cooked, and golden gyoza: 384px and 768px square.
- Hand-held gyoza: 768px and 1254px square for the final close-up.
- Logo: 768 × 622px, encoded losslessly after resizing the full canvas.

The complete transparent canvases are preserved so the pinwheel positions, flip,
hand grip, and CSS logo crops stay aligned. WebP alpha uses lossless compression.

## Loading behavior

All scene images are mounted eagerly, with pan and frozen gyoza given high fetch
priority. Their shared sources are reused across all five dumplings. Responsive
sources and sizes are defined in `lib/experience-assets.ts`.

Only the artwork is hidden until every scene image has decoded. The title,
navigation, scrolling, and menu links remain available. Animation controls enable
when the artwork is ready. A failed request or a 15-second wait presents a retry
button and menu link without revealing an incomplete scene. Retry remounts the
images and ignores results from the previous attempt. A slow request that later
finishes can still reveal the complete scene.

The loading indicator and reveal transition respect reduced-motion preferences.
Without JavaScript, a noscript style reveals the static starting scene and hides
the loading indicator and animation controls.
