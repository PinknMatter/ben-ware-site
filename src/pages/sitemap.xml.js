// A hand-rolled sitemap. The site is five pages plus one per book, so this is
// a few lines rather than a build integration — and it stays correct because
// it is generated from the same data the pages are.
import { books } from '../data/books.js';
import { u } from '../lib/url.js';

const paths = [
  '/',
  '/books',
  '/writing',
  '/biog',
  ...books.map((book) => `/books/${book.slug}`),
];

export function GET({ site }) {
  const origin = site ?? new URL('http://localhost:4321');
  const urls = paths
    .map((path) => {
      const loc = new URL(u(path), origin).href;
      // The homepage is the entry point; the books rank next.
      const priority = path === '/' ? '1.0' : path.startsWith('/books') ? '0.8' : '0.6';
      return `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
}
