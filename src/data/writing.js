// Writing & Media.
//
// `writing` is strict reverse-date order, with undated items first pending
// confirmed years. A row with `url: null` renders as a dated-but-unlinked
// entry rather than a dead link. `pdf: true` opens a self-hosted PDF.
//
// `form` drives the small label at the end of a row — it says what the thing
// IS, which a bare title cannot.

export const writing = [
  {
    title: 'Cry Harder: On Moral Masochism',
    venue: null,
    year: null,
    url: null,
    form: 'Essay',
    todo: 'writing-link',
  },
  {
    title: 'Picasso, Bacon and The Time of Monsters',
    venue: null,
    year: null,
    url: null,
    form: 'Essay',
    // Client is sending the typeset text.
    todo: 'writing-picasso-bacon',
  },
  {
    title: 'Bacon in the Cold World: On Wagers, Wounds and Real Abstraction',
    venue: 'in Bacon Disfigured',
    year: '2026',
    url: '/pdfs/bacon-in-the-cold-world.pdf',
    pdf: true,
    form: 'Chapter',
  },
  {
    title: 'Kafka and the Politics of Despair',
    venue: 'e-flux Notes',
    year: '2024',
    url: 'https://www.e-flux.com/notes/595494/kafka-and-the-politics-of-despair',
    form: 'Essay',
  },
  {
    title: 'The Problem of Evil',
    venue: 'TANK',
    year: '2024',
    url: 'https://tank.tv/magazine/issue-100/features/the-problem-of-evil',
    form: 'Essay',
  },
  {
    title: 'The Sickness of Life: On the Problems with Anti-Natalism',
    venue: 'Lit Hub',
    year: '2024',
    url: 'https://lithub.com/the-sickness-of-life-on-the-problems-with-anti-natalism/',
    form: 'Essay',
  },
  {
    title: 'Distortion as a Path to Reality',
    venue: 'IAI',
    year: '2024',
    url: 'https://iai.tv/articles/distortion-as-a-path-to-reality-auid-2712',
    form: 'Essay',
  },
  {
    title: 'Beginning Again at the End: A Dialectics of Extinction',
    venue: 'New Formations',
    year: '2023',
    url: 'https://journals.lwbooks.co.uk/newformations/vol-2022-issue-107/abstract-9669/',
    form: 'Paper',
  },
  {
    title: 'Death Drive at the End of the World',
    venue: 'e-flux journal',
    year: '2023',
    url: 'https://www.e-flux.com/journal/134/525929/the-death-drive-at-the-end-of-the-world',
    form: 'Essay',
  },
  {
    title: 'Wittgenstein’s Apocalyptic Subjectivity',
    venue: null,
    year: '2023',
    url: '/pdfs/wittgensteins-apocalyptic-subjectivity.pdf',
    pdf: true,
    form: 'Paper',
  },
  {
    title: 'Still Life (with Maria Balaska)',
    venue: 'Los Angeles Review of Books',
    year: '2020',
    url: 'https://lareviewofbooks.org/short-takes/still-life/',
    form: 'Essay',
  },
  {
    title: 'Nothing But the End to Come? Extinction Fragments',
    venue: 'e-flux journal',
    year: '2020',
    url: 'https://www.e-flux.com/journal/111/345009/nothing-but-the-end-to-come-extinction-fragments',
    form: 'Essay',
  },
  {
    title: 'Excremental Happiness: From Neurotic Hedonism to Dialectical Pessimism',
    venue: null,
    year: '2018',
    url: '/pdfs/excremental-happiness.pdf',
    pdf: true,
    form: 'Paper',
  },
];

// Interviews carry no date in the client's source material; "n.d." is the
// bibliographic convention and is what the lists render for a missing year.
export const interviews = [
  {
    title: 'Welcome to Hell',
    with: 'in conversation with Shane Anderson',
    venue: '032C',
    year: null,
    url: 'https://magazine.032c.com/magazine/welcome-to-hell-ben-ware-on-extinction',
    todo: 'interview-dates',
  },
  {
    title: 'Philosophy, Apocalypse and Revolution',
    with: 'in conversation with Richard Marshall',
    venue: '3:16',
    year: null,
    url: 'https://www.3-16am.co.uk/articles/philosophy-apocalypse-and-revolution',
    todo: 'interview-dates',
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
    form: 'Conversation',
  },
  {
    title: 'Philosophy at the End of the World',
    venue: 'How The Light Gets In',
    year: '2024',
    url: 'https://iai.tv/video/philosophy-at-the-end-of-the-world',
    form: 'Panel',
  },
  {
    title: 'Has Human Extinction Already Started?',
    venue: 'Sunday Papers Live',
    year: '2024',
    url: 'https://www.youtube.com/watch?v=l4PL3GwGonQ&t=7s',
    form: 'Talk',
  },
  {
    title: 'The Death Drive at the End of the World',
    venue: 'BICAR with Warehouse 421',
    year: '2023',
    url: 'https://www.youtube.com/watch?v=xGCnqsDl5vs',
    form: 'Lecture',
  },
  {
    title: 'Wittgenstein’s Modernism',
    venue: '21st British Wittgenstein Society Lecture',
    year: '2019',
    url: 'https://vimeo.com/346410118?fl=pl&fe=vl',
    form: 'Lecture',
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
