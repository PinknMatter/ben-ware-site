// Writing & Media.
//
// `writing` is a selection of recent essays, latest first. Ben asked for the
// years and the Essay/Paper/PDF labels off the lists — "they are all essays" —
// so a row now shows its title and where it appeared, nothing else. The years
// stay in the data because they are what the order is built on, and `pdf: true`
// still marks a self-hosted PDF for the link itself.
//
// A row with `url: null` renders as an entry awaiting its reference rather
// than a dead link.

export const writing = [
  {
    title: 'Picasso, Bacon and The Time of Monsters',
    venue: 'in Picasso-Bacon: What it Feels Like to be Human (exhibition catalogue)',
    year: '2026',
    url: '/pdfs/picasso-bacon-and-the-time-of-monsters.pdf',
    pdf: true,
  },
  {
    title: 'Bacon in the Cold World: On Wagers, Wounds and Real Abstraction',
    venue: 'in Bacon Disfigured',
    year: '2026',
    url: '/pdfs/bacon-in-the-cold-world.pdf',
    pdf: true,
  },
  {
    title: 'Kafka and the Politics of Despair',
    venue: 'e-flux Notes',
    year: '2024',
    url: 'https://www.e-flux.com/notes/595494/kafka-and-the-politics-of-despair',
  },
  {
    title: 'The Problem of Evil',
    venue: 'TANK',
    year: '2024',
    url: 'https://tank.tv/magazine/issue-100/features/the-problem-of-evil',
  },
  {
    title: 'The Sickness of Life: On the Problems with Anti-Natalism',
    venue: 'Lit Hub',
    year: '2024',
    url: 'https://lithub.com/the-sickness-of-life-on-the-problems-with-anti-natalism/',
  },
  {
    title: 'Distortion as a Path to Reality',
    venue: 'IAI',
    year: '2024',
    url: 'https://iai.tv/articles/distortion-as-a-path-to-reality-auid-2712',
  },
  {
    title: 'Beginning Again at the End: A Dialectics of Extinction',
    venue: 'New Formations',
    year: '2023',
    url: 'https://journals.lwbooks.co.uk/newformations/vol-2022-issue-107/abstract-9669/',
  },
  {
    title: 'Death Drive at the End of the World',
    venue: 'e-flux journal',
    year: '2023',
    url: 'https://www.e-flux.com/journal/134/525929/the-death-drive-at-the-end-of-the-world',
  },
  {
    title: 'Wittgenstein’s Apocalyptic Subjectivity',
    venue: 'in Wittgenstein and Literary Studies',
    year: '2023',
    url: '/pdfs/wittgensteins-apocalyptic-subjectivity.pdf',
    pdf: true,
  },
  {
    title: 'Still Life (with Maria Balaska)',
    venue: 'Los Angeles Review of Books',
    year: '2020',
    url: 'https://lareviewofbooks.org/short-takes/still-life/',
  },
  {
    title: 'Nothing But the End to Come? Extinction Fragments',
    venue: 'e-flux journal',
    year: '2020',
    url: 'https://www.e-flux.com/journal/111/345009/nothing-but-the-end-to-come-extinction-fragments',
  },
  {
    title: 'Excremental Happiness: From Neurotic Hedonism to Dialectical Pessimism',
    venue: 'College Literature',
    year: '2018',
    url: '/pdfs/excremental-happiness.pdf',
    pdf: true,
  },
];

// Interviews. Ben confirmed the dates are not wanted, so none is carried.
export const interviews = [
  {
    title: 'Welcome to Hell',
    with: 'in conversation with Shane Anderson',
    venue: '032C',
    url: 'https://magazine.032c.com/magazine/welcome-to-hell-ben-ware-on-extinction',
  },
  {
    title: 'Philosophy, Apocalypse and Revolution',
    with: 'in conversation with Richard Marshall',
    venue: '3:16',
    url: 'https://www.3-16am.co.uk/articles/philosophy-apocalypse-and-revolution',
  },
];

// Recorded talks and conversations. Venue and year were carried in the title
// as a parenthetical in the client's document; they are separated here so the
// lists can set them properly.
export const videos = [
  {
    title: 'On Extinction',
    with: 'in conversation with Kate Warlow-Corcoran',
    venue: null,
    year: '2024',
    url: 'https://www.youtube.com/watch?v=_MZFQXOyk7E',
  },
  {
    title: 'Philosophy at the End of the World',
    venue: 'How The Light Gets In Festival',
    year: '2024',
    url: 'https://iai.tv/video/philosophy-at-the-end-of-the-world',
  },
  {
    title: 'Has Human Extinction Already Started?',
    venue: 'Sunday Papers Live, London',
    year: '2024',
    url: 'https://www.youtube.com/watch?v=l4PL3GwGonQ&t=7s',
  },
  {
    title: 'The Death Drive at the End of the World',
    venue: 'BICAR with Warehouse 421',
    year: '2023',
    url: 'https://www.youtube.com/watch?v=xGCnqsDl5vs',
  },
  {
    title: 'Wittgenstein’s Modernism',
    venue: '21st British Wittgenstein Society Lecture',
    year: '2019',
    url: 'https://vimeo.com/346410118?fl=pl&fe=vl',
  },
];

// Group dated items under their year, undated ones under a leading "n.d.".
// Used by /writing to give the page a spine instead of one flat run of rows.
export function groupByYear(items) {
  const groups = [];
  for (const item of items) {
    const key = item.year ?? 'n.d.';
    const last = groups[groups.length - 1];
    if (last && last.year === key) last.items.push(item);
    else groups.push({ year: key, items: [item] });
  }
  return groups;
}
