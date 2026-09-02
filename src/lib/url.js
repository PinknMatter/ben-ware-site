// Every internal path on this site is written root-absolute ("/books",
// "/covers/on-extinction.avif"), and u() prefixes the deployment base to it.
//
// The site is at the root of benware.net, so BASE_URL is "/" and u() currently
// returns the path unchanged. It stays wrapped around every internal path
// anyway: it is what makes the site portable. It was carrying a
// /ben-ware-site/ subdirectory until the move to Cloudflare, and Astro does not
// rewrite hardcoded paths for you — only asset imports and BASE_URL — so
// without it, moving the site again means chasing every href in the markup.
//
// Safe to wrap around ANY url, including values from the data files that may be
// either a local PDF or an external link: anything that is not a site-root path
// is returned untouched.
const BASE = import.meta.env.BASE_URL;

export function u(path) {
  if (!path) return path;
  if (!path.startsWith('/')) return path; // http(s):, mailto:, #anchor, relative
  return `${BASE.replace(/\/$/, '')}${path}`;
}

// The public path of the page being rendered — "/books", never "/books/" and
// never "/books.html".
//
// Astro.url.pathname is the path of the OUTPUT FILE at build time, and the
// site builds with `build.format: 'file'` (see astro.config.mjs), so a page
// sees itself as "/books.html". That suffix is a fact about the file on disk,
// not the address: Cloudflare serves "books.html" at "/books". Anything that
// wants the page's address — the canonical tag, the nav's current-page
// comparison — should go through this rather than read the pathname raw.
export function pagePath(pathname) {
  return (
    pathname
      .replace(/\.html$/, '')
      .replace(/\/index$/, '')
      .replace(/\/$/, '') || '/'
  );
}
