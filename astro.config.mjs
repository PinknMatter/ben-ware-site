// @ts-check
import { defineConfig } from 'astro/config';

// The site is built for two homes, and they disagree about where the root is.
//
// GitHub Pages serves it as a PROJECT site, so everything lives under
// /ben-ware-site/. Cloudflare serves it at the root of its own domain. `base`
// has to match, or every internal path is wrong: on Cloudflare a
// /ben-ware-site base would 404 the homepage and every asset with it.
//
// Cloudflare Workers Builds sets WORKERS_CI=1, which is what we key off. If
// that ever stops being true the site would build with the wrong root, so
// SITE_BASE and SITE_ORIGIN override it explicitly — set SITE_BASE=/ in the
// Cloudflare build variables and this stops depending on autodetection.
//
// `base` makes Astro emit its own URLs correctly; hardcoded paths in our markup
// go through the u() helper in src/lib/url.js, which reads
// import.meta.env.BASE_URL, so the same source works locally and on both hosts.
const onCloudflare = process.env.WORKERS_CI === '1' || process.env.CF_PAGES === '1';

// Used for canonical URLs, Open Graph and the sitemap — so it wants to be the
// address people actually visit. Set SITE_ORIGIN on Cloudflare once the final
// domain is known; until then the deployed pages carry GitHub Pages canonicals.
const site = process.env.SITE_ORIGIN ?? 'https://pinknmatter.github.io';
const base = process.env.SITE_BASE ?? (onCloudflare ? '/' : '/ben-ware-site');

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'ignore',
});
