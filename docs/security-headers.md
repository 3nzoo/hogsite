# Main website security headers

The main website is a static Next.js export served by Cloudflare Workers Static
Assets. Its response headers are configured through `out/_headers`, which
Cloudflare reads during deployment. Next.js `headers()` and request nonces are
not used because this deployment does not run a Next.js server.

Run `npm run build` to generate the site and all six headers. The build first
copies `public/_headers` to the export, then `scripts/build-security-headers.cjs`
adds a Content Security Policy with hashes of the exact inline scripts in the
generated HTML, including the 404 pages. Hashes are recalculated on every build.
Deploy the complete resulting `out` directory using the existing Wrangler setup.
Running `next build` directly skips the CSP generation step.

| Header | Protection and scope |
| --- | --- |
| Strict-Transport-Security | Remembers HTTPS for one year after a successful HTTPS visit. It applies to the responding hostname; `includeSubDomains` and `preload` are deliberately omitted. Keep Cloudflare Always Use HTTPS enabled for HTTP redirects. |
| Content-Security-Policy | Restricts scripts to this site's origin and the exact build-generated inline script hashes. Blocks inline event handlers, frames, plugins, base URL changes, and form submissions. Connections are restricted to this origin. |
| X-Frame-Options | `DENY` prevents other pages from embedding this website in a frame. Normal links and social sharing previews still work. |
| X-Content-Type-Options | `nosniff` tells browsers to respect the response's declared content type. |
| Referrer-Policy | `strict-origin-when-cross-origin` limits cross-origin referrers to the origin and omits them on HTTPS-to-HTTP requests. Modern browsers already use this default; making it explicit keeps the policy clear. |
| Permissions-Policy | Disables camera, microphone, geolocation, and payment APIs for this page, which does not use them. This does not change permissions on the external map or distributor website. |

The CSP allows the existing Google Fonts stylesheet/font origins and local or
data-URL images. Inline **styles** remain allowed for Motion and React's style
attributes. Inline **scripts** require the generated hashes; `unsafe-inline`
and `unsafe-eval` are not allowed for scripts. Revisit the policy before adding
Facebook Pixel, analytics, embedded maps, videos, forms, or new external APIs.
Cloudflare-injected JavaScript, such as analytics or Rocket Loader, also needs
to be checked against the CSP. Avoid enabling automatic HTML/script rewriting
without verifying that the generated script hashes still match.

The `_headers` file is consumed by Cloudflare; it is not applied by `next dev`
or an arbitrary file server. Validate using `npx wrangler@4 dev --local` after
building, then check the public site's response headers after deployment.
Cloudflare-generated challenges, redirects, or errors may have different
headers from the static website response.

Missing headers indicate fewer browser protections, not proof that a site was
compromised. These headers do not secure a database, hide browser API keys,
provide input validation, or replace authentication, authorization, or rate
limiting. This main website has no Supabase client or database requests. The
separate distributor application needs its own review of Supabase Row Level
Security and server-side controls.

References:

- [Cloudflare Workers Static Assets headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)
- [MDN Strict Transport Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
