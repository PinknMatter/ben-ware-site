// @ts-check
import { defineConfig } from 'astro/config';

// The site lives at benware.net, served from Cloudflare as static assets — see
// wrangler.jsonc. It is at the root of its own domain, so there is no base
// path: the GitHub Pages project-site subdirectory is gone, and with it the
// trap where an unwrapped internal path worked in dev and 404'd in production.
//
// `site` is what canonical URLs, Open Graph and the sitemap are built from, so
// it has to be the address people actually visit.
//
// `build.format: 'file'` and `trailingSlash: 'never'` exist for Google, not for
// tidiness. Cloudflare's static-asset host maps the output file layout onto
// URLs: a `books/index.html` is served at `/books/` and `/books` is 307'd to
// it, whereas a `books.html` is served at `/books` and `/books/` is 307'd back.
// The canonical tags and the sitemap both use the slash-less form, so the
// directory layout meant every inner page was fetched, redirected, and then
// found declaring a canonical that pointed back at the redirect — which
// Search Console reports as "Alternate page with proper canonical tag" and
// leaves unindexed. The file layout makes the served URL, the canonical and
// the sitemap entry the same string.
//
// src/lib/url.js still routes internal paths through u(). It is a no-op while
// the base is "/", and it stays because it is what makes the site portable: set
// a base here and every link follows, with no markup to chase.
export default defineConfig({
  output: 'static',
  site: 'https://benware.net',
  trailingSlash: 'never',
  build: { format: 'file' },
});
