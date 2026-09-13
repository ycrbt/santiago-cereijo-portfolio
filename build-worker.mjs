import { mkdir, readFile, writeFile } from 'node:fs/promises';

const assetConfig = [
  ['/', 'index.html', 'text/html; charset=utf-8'],
  ['/index.html', 'index.html', 'text/html; charset=utf-8'],
  ['/styles.css', 'styles.css', 'text/css; charset=utf-8'],
  ['/script.js', 'script.js', 'text/javascript; charset=utf-8'],
  ['/favicon.svg', 'favicon.svg', 'image/svg+xml'],
  ['/og-card.svg', 'og-card.svg', 'image/svg+xml'],
];

const assets = await Promise.all(assetConfig.map(async ([route, file, type]) => ({
  route,
  type,
  body: await readFile(file, 'utf8'),
})));

const source = `const assets = new Map(${JSON.stringify(assets.map(({ route, type, body }) => [route, { type, body }]))});

const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const asset = assets.get(url.pathname);
    if (!asset) {
      return new Response('Not found', { status: 404, headers: securityHeaders });
    }
    const immutable = /\\.(?:css|js|svg)$/.test(url.pathname);
    return new Response(request.method === 'HEAD' ? null : asset.body, {
      headers: {
        ...securityHeaders,
        'Content-Type': asset.type,
        'Cache-Control': immutable ? 'public, max-age=86400' : 'public, max-age=300',
      },
    });
  },
};
`;

await mkdir('dist', { recursive: true });
await writeFile('dist/worker.js', source);
console.log(`Built dist/worker.js (${Buffer.byteLength(source)} bytes)`);
