// Site-wide constants. Anything the client is likely to want changed — a URL,
// a piece of standing copy, the signature file — lives here rather than being
// buried in a page, so a change is one edit in one place.

export const site = {
  name: 'Ben Ware',
  role: 'Philosopher and social theorist',
  // The second role line on the homepage. Ben asked for both set upright,
  // with the statement below them in italics — role, then voice, then hand.
  appointment: 'Co-Director of the Centre for Philosophy and Art at King’s College London',
  // His own line, from On Extinction. Deliberately unattributed here: on his
  // own page it reads as him speaking rather than as a citation.
  statement:
    'It is only by seeing our crisis-ridden present from sideways on – through the ‘distorting’ lens of philosophy and culture – that we come to discover new openings for political thought and action',
  place: 'London, UK',

  description:
    'Ben Ware is a philosopher and social theorist based in London. Author of numerous books, including On Extinction: Beginning Again at the End (Verso) and Co-Director of the Centre for Philosophy and Art at King’s College London.',

  // Shown in the running head and the colophon.
  nav: [
    { href: '/books', label: 'Books' },
    { href: '/writing', label: 'Writing & Media' },
    { href: '/biog', label: 'Biog' },
  ],
};

// Institutions.
//
// `org` leads and `role` sits under it, which is how Ben asked for the
// appointments to read: the institution first, then what he does there.
// `label` is the shorter form the colophon uses, where there is no room to set
// both lines.
//
// The links are Ben's own: the Centre keeps its own site rather than living on
// kcl.ac.uk, and BICAR's faculty page is where he actually appears.
export const affiliations = [
  {
    label: 'KCL Centre for Philosophy & Art',
    role: 'Co-Director of the Centre for Philosophy & Art; Senior Research Fellow in Philosophy',
    org: 'King’s College London',
    url: 'https://philosophyarts.co.uk/about',
  },
  {
    label: 'BICAR',
    role: 'Faculty',
    org: 'Bombay Institute for Critical Analysis and Research',
    url: 'https://www.bicar.org/faculty',
  },
];

// Representation.
//
// Ben gave two C&W addresses and asked which to use where. The agent page is
// the one linked, in both Enquiries and the Representation panel: it is the
// route to a person — enquiries reach Clare's PA through the agency office —
// and no private address is published. The clients page is only an
// alphabetical list of her authors; it evidences the relationship but takes
// a visitor nowhere useful, so it is recorded here and not linked.
//
// `email` is his KCL address, already in the public domain, for direct
// academic contact. Rights, press and speaking still go through the agency.
export const representation = {
  agent: 'Clare Conville',
  agency: 'C&W Agency',
  agencyUrl: 'https://cwagency.co.uk/agent/clare-conville',
  clientsUrl: 'https://cwagency.co.uk/agent/clare-conville/clients',
  email: 'Benjamin.ware@kcl.ac.uk',
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

// The default social card: the portrait composed onto a 1200×630 white
// canvas, in public/og/ alongside one card per book cover. The cards are
// JPEGs because the covers themselves are AVIF, which the link-preview
// scrapers (WhatsApp, Slack, iMessage, Facebook) mostly cannot decode — and
// 1200×630 is the one size every card renderer takes without cropping.
export const ogImage = '/og/ben-ware.jpg';
