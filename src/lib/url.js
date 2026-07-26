// Every internal path on this site is written root-absolute ("/books",
// "/covers/on-extinction.avif"). GitHub Pages serves the site from a
// subdirectory, so those need the deployment base prefixed — and Astro does not
// rewrite hardcoded paths for you, only asset imports and BASE_URL.
//
// u() is safe to wrap around ANY url, including ones that come out of the data
// files where a value may be either a local PDF or an external link: anything
// that is not a site-root path is returned untouched.
//
// BASE_URL is "/" in local dev when no base is set, and "/ben-ware-site/" once
// astro.config.mjs sets one — so the same call is correct in both places.
const BASE = import.meta.env.BASE_URL;

export function u(path) {
  if (!path) return path;
  if (!path.startsWith('/')) return path; // http(s):, mailto:, #anchor, relative
  return `${BASE.replace(/\/$/, '')}${path}`;
}
