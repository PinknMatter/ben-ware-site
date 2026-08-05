// Site-wide constants. Anything the client is likely to want changed — a URL,
// a piece of standing copy, the signature file — lives here rather than being
// buried in a page, so a change is one edit in one place.

export const site = {
  name: 'Ben Ware',
  role: 'Philosopher and social theorist',
  place: 'London, UK',

  // Absolute origin + base, used for canonical URLs, Open Graph and the
  // sitemap. Must match astro.config.mjs.
  origin: 'https://pinknmatter.github.io',

  description:
    'Ben Ware is a philosopher and social theorist based in London. Author of On Extinction: Beginning Again at the End (Verso) and Co-Director of the Centre for Philosophy and Art at King’s College London.',

  // Shown in the running head and the colophon.
  nav: [
    { href: '/books', label: 'Books' },
    { href: '/writing', label: 'Writing & Media' },
    { href: '/biog', label: 'Biog' },
  ],
};

// Institutions. Kept together because two of the three still want confirming
// with the client, and it is easier to check a list than to hunt the markup.
export const affiliations = [
  {
    label: 'Centre for Philosophy & Art',
    role: 'Co-Director; Senior Research Fellow in Philosophy',
    org: 'King’s College London',
    url: 'https://www.kcl.ac.uk/research/centre-for-philosophy-and-visual-arts',
    todo: 'verify-kcl-url',
  },
  {
    label: 'BICAR',
    role: 'Faculty',
    org: 'Beirut Institute for Critical Analysis and Research',
    url: 'https://www.bicar.org',
    todo: 'verify-bicar-url',
  },
];

// Representation. The old markup pointed at the apex domain, which is what Ben
// reported as broken; www.cwagency.co.uk is the address that actually answers.
// C&W do not publish a stable per-agent URL we could verify, so Clare's name is
// set as text and the link goes to the agency.
export const representation = {
  agent: 'Clare Conville',
  agency: 'C&W Agency',
  agencyUrl: 'https://www.cwagency.co.uk/',
  // A direct enquiries address is still to come from the client.
  email: null,
  todo: 'enquiries-email',
};

// The signature under the title block.
//
// Ben's own autograph is now set as vector curves inside Signature.astro,
// centreline-traced from the photograph he sent, so it draws on like
// handwriting. Leave src null to use it.
//
// src is only for a raster scan, if a flatbed one ever supersedes the photo:
// drop the file into public/images/, put its path and pixel size here, and
// every <Signature /> switches over — but a raster signature is a flat image
// and does NOT animate.
export const signature = {
  src: null, // e.g. '/images/ben-ware-signature.png'
  width: 0,
  height: 0,
};

// Fallback social/preview image until artwork is supplied.
export const ogImage = '/images/ben-ware-portrait.jpg';
