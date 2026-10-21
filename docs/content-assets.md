# Homepage content refresh — October 18, 2026

Update — October 21, 2026: the owner broadened distributor recruitment to the Philippines, including Visayas and Mindanao. Current homepage copy, metadata, and the v8 Facebook preview invite distributors nationwide. Earlier references to a Luzon recruitment goal below are historical. Territory availability remains managed by the separate distributor project.

The owner approved the existing scroll animation and asked that it remain unchanged. `components/ScrollExperience.tsx`, `lib/gyoza-layout.ts`, `app/globals.css`, and all existing animation image files were preserved. New content styles are scoped in `components/HomeContent.module.css`.

## Menu and story sources

All six menu photos are free of overlaid text and prices. They were supplied in this conversation or verified as their matching originals in the owner's business files.

| Displayed asset | Source |
| --- | --- |
| Crispy Pork | `/Users/biboyrenz/Desktop/business/Gyoza/PORK GYOZA.jpg` |
| Pizza Beef | `/Users/biboyrenz/Downloads/pzza.png` |
| Takoyaki (Octobits) | `/Users/biboyrenz/Downloads/tako.png` |
| Shrimp Cajun | `/Users/biboyrenz/Downloads/shrp.png` |
| Creamy Garlic Spinach | `/Users/biboyrenz/Downloads/spin.png` |
| Vegetable Gyoza | `/Users/biboyrenz/Desktop/business/2026/vege.png` |
| Story | `/Users/biboyrenz/Downloads/ateee.png` |

`scripts/prepare-content-assets.cjs` encodes full-composition WebP copies at 600 and 1200 pixels wide for menu photos and 1600 pixels for the story photo. No food, people, branding, or backgrounds were generated or retouched. CSS controls the visible image frames. The story photo is centered on the stall and pans, leaving the side price banners outside the visible frame.

The full wordmark uses the existing transparent `/assets/logo.png`, 1393 × 1129, with HOUSE OF in black and all of GYOZA in red. The PDF's older wordmark, with only ZA red, is not used.

## Verified information

- Six flavors and single servings, platters, and frozen packs: supplied menu artwork.
- Pickup/delivery within Quezon City and phone `0977-258-5858`: supplied posters.
- Email `food@houseofgyoza.com`: supplied `sintra vertical copy 4.pdf`.
- No street address or opening hours were supplied, so no storefront pin or hours were invented.
- Story basis: the owner's statement that the business began selling pork gyoza and later added flavors for different favorite tastes. No founding year, awards, sales figures, or testimonials were invented.
- Luzon distributor recruitment: owner's current stated goal. The existing distributor URL is retained. Area-selection wording follows the existing HOG distributor project's README; no income, exclusivity, or support promises were added.

## Social QR codes

Decoded with macOS Vision from the original QR files and independently from embedded QR images in the supplied PDF. The exact payloads agree:

- `https://www.facebook.com/houseofgyoza` — `/Users/biboyrenz/Desktop/business/QR code/houseofgyoza_qr_fb_largef.png`
- `https://www.instagram.com/houseofgyoza` — `/Users/biboyrenz/Desktop/business/QR code/houseofgyoza_qr_instagram_cutstyle.png`

Both originals are copied into `public/assets/brand/`. Each has a direct clickable link as well as a scannable code. No prices are included in the site copy or menu images. The website remains local and was not uploaded or published.

## Store and TikTok update — October 18, 2026

The owner supplied the physical store location: in front of Fisher Mall, Quezon Avenue, Quezon City. The directions button uses the exact supplied short URL, `https://maps.app.goo.gl/XAWBGrGzSbsoAMJEA`, which resolves to the Google Maps listing for House Of Gyoza. No opening hours or additional street/unit number are assumed.

The owner supplied `https://www.tiktok.com/@houseofgyoza`. `scripts/create-tiktok-qr.cjs` encodes that exact URL with QR error-correction level H and a four-module quiet zone. The central TikTok badge covers a nine-module square. The musical-note vector comes from Simple Icons (CC0), retained in `docs/brand/tiktok-mark.svg`; the black, white, cyan, and red treatment matches TikTok's recognizable icon.

- Scalable website QR: `public/assets/brand/tiktok-qr.svg`
- Print/download PNG: `public/assets/brand/tiktok-qr.png`, 1080 × 1080
- macOS Vision decoded the logo-bearing QR successfully at 1080, 256, 144, and 128 pixels; every result exactly matched the supplied profile URL.
- The social cards wrap at narrow widths rather than reducing the QR codes to tiny sizes.

## Mobile animation framing

Phone landscape testing found a real clipping issue: the 580-pixel sticky scene was taller than a 390-pixel viewport, hiding the lower pan and chapter controls. Short landscape layouts now use the actual small-viewport height and a compact two-column composition. Short portrait screens use the available space for a larger scene without a fixed minimum height. The approved assets, pinwheel positions, flip, hand grip, hold, and lift timing remain unchanged.

## Continuation verification — October 19, 2026

The production build passed. SHA-256 checks confirmed `components/ScrollExperience.tsx` and `lib/gyoza-layout.ts` still match their approved snapshots. The local network development server was restarted on port 3000.

The preceding session visually checked all three landscape stages at 844 × 390 CSS pixels, including the held gyoza; the screenshot is `artifacts/mobile-landscape-gyoza.jpg`. Final short-portrait and social-panel visual checks could not be completed in this continuation because browser security denied access to the local tab. These checks should not be treated as completed physical-phone testing.

## Crispy Pork photo enhancement — October 19, 2026

At the owner's request, the built-in image generation editor enhanced the original `PORK GYOZA.jpg`: more even golden browning on the rear piece, a closer pair of chopsticks, and refined lighting and food detail. This menu image is now an AI-edited product photograph. The original source and earlier compressed copies remain untouched. No animation assets or timing changed.

- Full edited PNG: `output/imagegen/crispy-pork-enhanced.png`, 1448 × 1086.
- Responsive menu copies: `public/assets/menu/crispy-pork-enhanced.webp` and `crispy-pork-enhanced-600.webp`.
- Full editing prompt: `output/imagegen/crispy-pork-enhanced-prompt.txt`.

## Animated plate position correction — October 19, 2026

The owner's request to move the plate left referred to its entrance in the scroll animation. The served plate, all five gyoza landing positions, and garnish now share a five-percentage-point left offset within the scene. The pan arrangement, flip timing, grip timing, and final held-gyoza position remain unchanged. Reduced-motion rendering uses the same corrected plate alignment. This is an intentional position change after the earlier animation checksum verification.
