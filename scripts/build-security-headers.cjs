const { createHash } = require('node:crypto');
const { readFileSync, readdirSync, writeFileSync } = require('node:fs');
const { join, resolve } = require('node:path');

const output = resolve(__dirname, '../out');
const pages = readdirSync(output, { recursive: true })
  .filter((file) => file.endsWith('.html'))
  .sort();

if (!pages.includes('index.html')) {
  throw new Error('Build the Next.js static export before generating security headers.');
}

// Static exports cannot use a fresh request nonce. Authorize the exact Next.js
// inline bootstrap scripts from this build, including its not-found pages.
const hashes = new Set();
for (const page of pages) {
  const html = readFileSync(join(output, page), 'utf8');
  for (const [, attributes, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (!/(?:^|\s)src\s*=/i.test(attributes) && content) {
      hashes.add(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
    }
  }
}

const policy = [
  "default-src 'self'",
  "base-uri 'none'",
  `script-src 'self' ${[...hashes].sort().join(' ')}`,
  "script-src-attr 'none'",
  // Motion updates element styles; Google Fonts supplies the existing typefaces.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

const baseline = readFileSync(resolve(__dirname, '../public/_headers'), 'utf8').trimEnd();
const headers = `${baseline}\n  Content-Security-Policy: ${policy}\n`;

// Workers rejects header rules longer than 2,000 characters per line.
if (headers.split('\n').some((line) => line.length > 2000)) {
  throw new Error('Security headers exceed the Cloudflare line limit; split CSP rules by HTML route.');
}

writeFileSync(join(output, '_headers'), headers);
console.log(`Generated six security headers; authorized ${hashes.size} inline script hashes from ${pages.length} HTML files.`);
