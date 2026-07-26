// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site, so the whole thing is served from
// a subdirectory. `base` makes Astro emit its own URLs correctly; hardcoded
// paths in our markup go through the u() helper in src/lib/url.js, which reads
// import.meta.env.BASE_URL so the same source works locally and deployed.
export default defineConfig({
  output: 'static',
  site: 'https://pinknmatter.github.io',
  base: '/ben-ware-site',
  trailingSlash: 'ignore',
});
