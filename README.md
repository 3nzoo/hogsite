<<<<<<< HEAD
# House of Gyoza — From Pan to Plate

A Next.js App Router homepage using Motion for a scroll-driven cooking story. It follows five gyoza from a cast iron pan onto a ceramic plate, then a hand lifts one with chopsticks for a close-up.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

To test from a phone or another computer on the same local network, stop the
local-only server and start:

```sh
npm run dev:lan
```

Open `http://<this Mac's LAN IPv4 address>:3000` on the other device. Keep this
Mac running and connected to the same network. Development asset origins are
configured from the Mac's current network addresses when the server starts.

To create a production static export:

```sh
npm run typecheck
npm run build
```

The static site is generated in `out/`.

## Editing

- `components/ScrollExperience.tsx`: scroll timing, transfer paths, flips, hand pickup, and chapter controls. Five thick white frozen gyoza start in an evenly spaced pinwheel. Their wrappers become steamed ivory between progress 0.12 and 0.25. Each piece flips during its transfer and lands in the same pinwheel with its golden cooking sole facing up. Small oil bubbles provide the sizzle. The hand grip appears at 0.74–0.79, pauses until 0.84, then lifts and zooms through 0.98. Scroll works in both directions. Shared positions and angles live in `lib/gyoza-layout.ts`.
- `components/MenuSection.tsx` and `lib/site-content.ts`: six flavors, descriptions, contact details, social links, and distributor URL. No pricing is displayed.
- `components/OurStory.tsx`: the pork-gyoza origin story and supplied stall photo.
- `components/Distributors.tsx`: nationwide distributor invitation and application link.
- `components/ContactSection.tsx`: the store in front of Fisher Mall on Quezon Avenue, map directions, pickup/delivery, Viber, phone, email, and Facebook, Instagram, and TikTok QR codes.
- `components/SiteHeader.tsx` and `components/Brand.tsx`: responsive navigation and the full red GYOZA wordmark.
- `components/HomeContent.module.css`: scoped styling for the new content; does not change the approved animation.
- `app/globals.css`: HOG colors and animation styles, including short portrait and landscape phone framing. The approved animation timing and artwork are unchanged.
- `app/page.tsx`: navigation, original HOG logo, and footer.

The palette comes from the existing HOG project's `distributor-map/dist/brand-theme.css`: cream `#faf6ee`, deep red `#b00000`, charcoal `#211e1b`, gold `#80612f`, with Oswald headings and DM Sans text. The supplied transparent logo has the entire GYOZA word in red. The owner-supplied torii favicon is `app/favicon.ico`, copied unchanged from `HOG/favicon-final/house-of-gyoza-favicon.ico`. Next.js serves it at `/favicon.ico`; the previous SVG is preserved in `docs/brand/favicon-previous-2026-10-20.svg`.

Reduced-motion preferences replace the long scroll story with a static plated scene. Chapter buttons can skip directly to each scene; a keyboard-accessible link skips the animated experience.

## Assets

The approved animation cutouts are saved in `public/assets/`. Their generation details are recorded in `docs/asset-prompts.md`. They are illustrative website imagery.

The menu and story use owner-supplied photographs, with responsive WebP files in `public/assets/menu/` and `public/assets/brand/`. The original source photos are unchanged. `scripts/prepare-content-assets.cjs` recreates these compressed copies on the owner's Mac. Source details and QR verification are in `docs/content-assets.md`.

The TikTok QR is available as `public/assets/brand/tiktok-qr.svg` for scalable display and `public/assets/brand/tiktok-qr.png` for printing. Both link to `https://www.tiktok.com/@houseofgyoza` and include the TikTok logo in the center.

This project remains local. Building produces files only; it does not upload or publish them.

## Sitemap and search launch

`app/sitemap.ts` generates `/sitemap.xml`, and `app/robots.ts` generates `/robots.txt` with a link to it. Both use the same address as page metadata, configured in `lib/site-url.ts`: the owner-confirmed `https://www.houseofgyoza.com`. The build-time `SITE_URL` variable can override it. This single-page site has one sitemap entry: its homepage. Sections such as `#menu` and `#our-story` are not separate sitemap URLs; the external distributor site is not included either.

Run `npm run build` and deploy the newly generated `out/` files to the confirmed domain when publishing is authorized. Rebuild whenever the address changes. The owner also specified `https://www.distributor.houseofgyoza.com/` for distributor links; that exact address is configured in `lib/site-content.ts`. The distributor subdomain needs its own hosting/DNS connection and sitemap in its separate project. This project does not configure either site's hosting or DNS.

After publishing, verify that `/sitemap.xml` lists the final homepage URL and `/robots.txt` links to the public sitemap. Verify the domain in Google Search Console, open its Sitemaps section, and submit `sitemap.xml`. Sitemap submission does not guarantee indexing. No Google account connection, submission, or deployment is performed automatically.

## Facebook link preview

`app/opengraph-image.jpg` is the 1200 × 630 Facebook sharing graphic. Next.js automatically emits its Open Graph image URL, dimensions, and alternative text. The full generated PNG and prompt are saved in `output/imagegen/`. The illustration uses crispy golden gyoza in a cast-iron pan, the full brand wordmark, the homemade message, and the nationwide distributor invitation.

The current revised master is `output/imagegen/facebook-preview-pan-v15.png`. It combines the slimmer gyoza from v13 with v14's brighter, cleaner pan and larger text layout. The distributor invitation remains nationwide. The exact owner-supplied horizontal logo at `public/assets/brand/house-of-gyoza-horizontal.png` is composited as one intact layer at x=40, y=104, width=790. The layout/pan source is `output/imagegen/facebook-preview-pan-v14-background.png`, and the food edit is `output/imagegen/facebook-preview-pan-v15-food.png`. The edit is blended only inside the skillet, retaining the original outer rim and left-side artwork. The selected prompt and assembly notes are in `output/imagegen/facebook-preview-pan-v15-prompt.txt`. Edit placement in `scripts/build-social-preview.cjs`, then run `node scripts/build-social-preview.cjs` to rebuild the master PNG and website JPEG. The script does not create SVG exports with embedded copies of the photos, avoiding duplicate image storage. Earlier versions are not removed by this script. This preview update does not alter the website's scroll animation.

The public image base URL, canonical URL, and `og:url` use the confirmed `https://www.houseofgyoza.com` address. Set `SITE_URL` only if overriding that address, and rebuild after any change. Facebook can fetch the image only after the website is published at that address. After deployment, check the public homepage in Facebook's Sharing Debugger. No hosting or publishing is performed by this project automatically.
