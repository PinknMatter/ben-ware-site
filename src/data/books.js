// Source of truth for the books, used by /books, /books/[slug], the homepage
// and the biog. Copy is the client's and is still being revised — treat the
// prose fields as placeholders for the final copy-edit.
//
// Fields
//   title        the title as this site sets it
//   publishedAs  set only where the publisher's title differs from Ben's own
//   hook         one sentence, for the catalogue and the homepage
//   blurb        the full description, for the book's own page, as an array of
//                paragraphs — publishers supply a jacket blurb as one block of
//                text, which at page measure reads as a wall
//   buy          ordered list of places to buy; the first is the publisher
//   praiseShort  trimmed quotes for the homepage carousel (client-supplied)
//   endorsements the full praise, longest-standing first
//
// Covers vary in width and are laid out to a common HEIGHT rather than a
// common width, which is how a shelf actually works: books share a shelf line,
// not a width. Dialectic of the Ladder really is the narrowest of them — the
// publisher's own product image has the same proportions — so it reads as
// narrower on the shelf because it is. Higher-resolution scans can be dropped
// in without a markup change.

export const books = [
  {
    slug: 'on-extinction',
    title: 'On Extinction: Beginning Again at the End',
    shortTitle: 'On Extinction',
    publisher: 'Verso',
    year: '2024',
    role: null,
    cover: '/covers/on-extinction.avif',
    publisherUrl: 'https://www.versobooks.com/en-gb/products/2604-on-extinction',
    buy: [
      { label: 'Publisher', url: 'https://www.versobooks.com/en-gb/products/2604-on-extinction' },
      { label: 'Amazon', url: 'https://www.amazon.co.uk/Extinction-Beginning-Again-At-End/dp/178873999X' },
    ],
    hook: 'Extinction as the very lens through which to examine our current reality – and beginning again at the end as a necessary form of liberation.',
    blurb: [
      'On Extinction takes us on a breathtaking philosophical journey through desperate territory. As we face ‘the end of all things’, Ben Ware argues we must face our apocalyptic future without flinching. In fact, extinction is the very lens through which we should examine our current reality.',
      'Radical politics today should not be concerned with merely averting the worst but rather with beginning again at the end. To think about the future in this way is itself a form of liberation that might incubate the necessary radical solutions we need.',
      'Combining lessons from Kant, Hegel, Adorno, and Lacan, as well as drawing on popular culture and ecology, Ware recasts the most urgent issue of our times and resolves that we can only consider our collective end by treating it as a starting point.',
    ],
    // The three the client chose for the homepage carousel, in his wording.
    praiseShort: [
      {
        quote: 'Exposes the diabolical evil of the cult of capitalism in its limitless assault on life in all its forms',
        source: 'Richard Seymour',
      },
      {
        quote: 'On Extinction is a formidable intervention',
        source: 'Alenka Zupančič',
      },
      {
        quote: 'Subversive and indispensable…this path-breaking book by one of the sharpest minds in contemporary philosophy will live on for a very long time',
        source: 'Dany Nobus',
      },
    ],
    endorsements: [
      { quote: 'On Extinction is a formidable intervention. The end is too serious a matter to be treated as tragedy or heroic sacrifice; rather, as Ben Ware shows, thinking it requires the materialist dialectic and its predilection for comedy: stubbornly beginning again, and again.', source: 'Alenka Zupančič, author of <em>What IS Sex?</em>' },
      { quote: 'A sweeping tour of our crisis present…Ben Ware offers a series of incisive and unforgiving readings that guide and impel us through the wreckage of contemporary capitalism.', source: 'Benjamin Noys, author of <em>Malign Velocities</em>' },
      { quote: 'An important book for our time. On Extinction follows what the late Gustav Metzger always told me: it is not enough to talk about climate change, we have to talk about extinction.', source: 'Hans Ulrich Obrist, Artistic Director, Serpentine Galleries, London' },
      { quote: 'Ben Ware’s wonderfully lucid new book exposes the diabolical evil of the cult of capitalism in its limitless assault on life in all its forms. It is by going through the disaster that we will find the path to planetary liberation. An essentially, urgently necessary intervention.', source: 'Richard Seymour, author of <em>Disaster Nationalism</em>' },
      { quote: 'Carefully researched, tightly constructed, and broadly accessible, Ware’s argument is both subversive and indispensable. Whatever happens next, one thing is sure: this path-breaking book by one of the sharpest minds in contemporary philosophy will live on for a very long time.', source: 'Dany Nobus, author of <em>Critique of Psychoanalytic Reason</em>' },
      { quote: 'How should critical theory address the multiple catastrophes raging through the planet — war, pandemic, climate chaos, and the like — and the threat of human extinction that they pose? Ben Ware offers a lucid, illuminating, and erudite response of great value in recalibrating our thinking to address the terrifying world we now inhabit.', source: 'Alex Callinicos, author of <em>The New Age of Catastrophe</em>' },
      { quote: 'What philosopher Ben Ware is asking, then, is for us to imagine — to internalize — the reality of human finitude, the end of us. Only then, he suggests, will we be able to take in the full horizon of what we’ve wrought and, perhaps, move forward into a new and radical version of our shared future.', source: 'Lit Hub' },
      { quote: 'In this bold, fast-moving philosophical essay, which is as elegant and erudite as it is forcefully argued, Ben Ware develops not simply an aesthetics or ethics of extinction but a politics capable of responding to its almost unthinkable existential challenge. This is a brilliant book, bristling with both provocative ideas and perceptive, often unexpected readings.', source: 'Matt Beaumont, author of <em>How We Walk</em>' },
      { quote: 'A seminal contribution….On Extinction demands the attention of anyone who dares to imagine life after capitalism.', source: 'Jeffrey R. Di Leo, author of <em>Dark Academe</em>' },
      { quote: 'In On Extinction, Ben Ware writes towards a collective time liberated from the paradoxical, narcissistic apocalypse narratives of the 21st century: that it is both too late for the planet and that we must urgently act now to save it.', source: 'Autumn Wright, Bullet Points' },
      { quote: 'Deftly combining insights from philosophy, psychoanalysis and critical theory, On Extinction dialectically rethinks the end for an era in which the end cannot be thought.', source: 'Thomas Waller, Marx &amp; Philosophy' },
      { quote: 'On Extinction is rooted in modes of resituating, recapitulating, and redefining… establishing a ‘dialectics of extinction’ — a way of addressing the realities of our catastrophic present by coming to terms with extinctions, and extinction-level anxieties, of the past.', source: 'Paul D’Agostino, Art Spiel' },
    ],
  },
  {
    // The client's own title. Palgrave inverted it on the jacket, and Ben
    // always uses his original in descriptions of the book — so the site sets
    // his, and records the publisher's in the imprint line.
    slug: 'living-wrong-life-rightly',
    title: 'Living Wrong Life Rightly: Modernism, Ethics, and the Political Imagination',
    publishedAs: 'Modernism, Ethics and the Political Imagination: Living Wrong Life Rightly',
    shortTitle: 'Living Wrong Life Rightly',
    publisher: 'Palgrave Macmillan',
    year: '2017',
    role: null,
    cover: '/covers/living-wrong-life.avif',
    // The foot of this jacket is white, so on white paper its bottom edge
    // dissolves and the cover looks like it is floating. A hairline gives it
    // back its edge. No other jacket needs one.
    coverEdge: true,
    publisherUrl: 'https://link.springer.com/book/10.1057/978-1-137-55503-8',
    buy: [
      { label: 'Publisher', url: 'https://link.springer.com/book/10.1057/978-1-137-55503-8' },
      { label: 'Amazon', url: 'https://www.amazon.co.uk/Modernism-Ethics-Political-Imagination-Discourse/dp/134971710X' },
    ],
    hook: 'How can ‘wrong life’ be negated? How can philosophy, psychoanalysis, and modernism serve as crucial points of reference for today’s emancipatory struggles?',
    // The line the catalogue pulls out. Ben chose it and cut it himself; left
    // to itself the page takes the shortest endorsement, which was the Key
    // Words one. The full Lecercle quote is still below in `endorsements`.
    pullQuote: {
      quote: 'Ben Ware applies his vast philosophical and literary culture to the task, and the resulting analyses are superb',
      source: 'Jean-Jacques Lecercle, author of <em>A Marxist Philosophy of Language</em>',
    },
    blurb: [
      'In this groundbreaking new study, Ben Ware carries out a bold reassessment of the relationship between modernism and ethics, arguing that modernist literature and philosophy offer more than simply a snapshot of the moral conflicts of the past: they provide a crucial point of reference for today’s emancipatory struggles.',
      'Investigating ethical ideas in Wittgenstein, Beckett, Kierkegaard, Kant, Cavell, Marx, Henry James and Lacan, Ware demonstrates how these thinkers can bring us to a new understanding of a constellation of issues which contemporary radical thought must re-visit: utopia, repetition, perfectionism, subtraction, negativity, critique, absence, duty, revolution and political love.',
      'The result is a timely and provocative intervention, which re-draws the boundaries for future debates on the ethics and politics of modernism.',
    ],
    endorsements: [
      { quote: 'The aim of this book is of extreme importance: nothing short of a new ethics, based on the modernist slogan, ‘See it new!’ Ben Ware applies his vast philosophical and literary culture to the task, and the resulting analyses are superb…It will be difficult to talk about contemporary ethics without taking [Ware’s] work into account.', source: 'Jean-Jacques Lecercle, author of <em>A Marxist Philosophy of Language</em>' },
      { quote: 'Ware’s sketches of an endangered ethical landscape are urgent and timely reminders of the importance of ethical reasoning as much for politics as for personal conduct but above all for the difficult terrain that lies between them.', source: 'Howard Caygill, author of <em>On Resistance</em>' },
      { quote: 'Restores to ethics its political dimension as a challenge to the damaged lives we live under capitalism. In a series of admirably elegant readings, ranging across literature and philosophy, from Kierkegaard to Marx, Henry James to Samuel Beckett, Ben Ware reveals the ethical moment of negativity: the possibility of thinking the collective dimension of life. Resisting the narcissism of our times, this book powerfully restates the necessity of critique as a means to repair our damaged language and so to start to repair our damaged world.', source: 'Benjamin Noys, author of <em>The Persistence of the Negative</em>' },
      { quote: 'Identifies in compelling ways the outlines of positive political possibility in the most unlikely places.', source: 'Key Words: A Journal of Cultural Materialism' },
    ],
  },
  {
    slug: 'dialectic-of-the-ladder',
    title: 'Dialectic of the Ladder: Wittgenstein, the ‘Tractatus’ and Modernism',
    shortTitle: 'Dialectic of the Ladder',
    publisher: 'Bloomsbury',
    year: '2015',
    role: null,
    cover: '/covers/dialectic-ladder.avif',
    publisherUrl: 'https://www.bloomsbury.com/uk/dialectic-of-the-ladder-9781472591425/',
    buy: [
      { label: 'Publisher', url: 'https://www.bloomsbury.com/uk/dialectic-of-the-ladder-9781472591425/' },
      // Die Dialektik der Leiter (Turia + Kant). The client's link carried
      // Amazon's search-tracking query string; this is the same product page
      // without it. Listed straight after the publisher at the client's ask.
      { label: 'German edition', url: 'https://www.amazon.co.uk/Die-Dialektik-Leiter-Wittgensteins-Modernismus/dp/3896658379', note: 'Die Dialektik der Leiter' },
      { label: 'Amazon', url: 'https://www.amazon.co.uk/Dialectic-Ladder-Wittgenstein-Tractatus-Modernism/dp/1472591402' },
    ],
    hook: 'Wittgenstein’s enigmatic early masterpiece re-read as a dialectical, modernist work — its anti-philosophical ambition tied to its radical aesthetic character.',
    blurb: [
      'Ludwig Wittgenstein’s Tractatus Logico-Philosophicus (1922) remains one of the most enigmatic works of twentieth century thought. In this bold and original new study, Ben Ware argues that Wittgenstein’s early masterpiece is neither an analytic treatise on language and logic, nor a quasi-mystical work seeking to communicate ‘ineffable’ truths.',
      'Instead, we come to understand the Tractatus by grasping it in a twofold sense: first, as a dialectical work which invites the reader to overcome certain ‘illusions of thought’; and second as a modernist work whose anti-philosophical ambition is intimately tied to its radical aesthetic character.',
      'By placing the Tractatus in the force field of modernism, Dialectic of the Ladder clears the ground for a new and challenging exploration of the work’s ethical dimension. It also casts new light upon the cultural, aesthetic and political significances of Wittgenstein’s writing, revealing hitherto unacknowledged affinities with a host of philosophical and literary authors, including Hegel, Kierkegaard, Marx, Nietzsche, Adorno, Benjamin, and Kafka.',
    ],
    endorsements: [
      { quote: 'Ben Ware’s superb study not only offers a lucid and original reading of Wittgenstein’s Tractatus; it also situates it with admirable skill in the context of literary modernism and in doing so casts radical new light on this notoriously difficult philosophical text.', source: 'Terry Eagleton, author of <em>Why Marx Was Right</em>' },
      { quote: 'Departing from Wittgenstein’s claim that the Tractatus is ‘strictly philosophical and at the same time literary’ Ben Ware succeeds in showing not only how it works as a contribution to literary modernism but also how this is inseparable from its philosophical achievement. He restores the strangeness to a text that we thought had become familiar and places it in the company of Kierkegaard, Nietzsche, Hofmannsthal and Kafka. It is sure to send readers back to the Tractatus with renewed wonder and curiosity.', source: 'Howard Caygill, author of <em>Walter Benjamin: The Colour of Experience</em>' },
      { quote: 'With a majestic authorial voice Ware leads his readers to appreciate Wittgenstein’s short text as a vital part of modern literary history. In a challenging reading of Kafka, Ware further shows how Wittgenstein’s book carries within itself a singular way of reading and experiencing literature, as well as oneself. There is little more one can expect from a scholar’s work. A formidable achievement.', source: 'Sascha Bru, author of <em>The European Avant-Gardes</em>' },
      { quote: 'A thought-provoking reading of the Tractatus in which its philosophical, literary and ethical dimensions are seen as internally related elements of a modernist critique of modernity. Anyone interested in the text will benefit from engaging with this stimulating work.', source: 'Stephen Mulhall, author of <em>Philosophical Myths of the Fall</em>' },
      { quote: 'With Ware’s help, we can use the Tractatus to stay light on our feet philosophically, and dance on those ladders that lie to us.', source: 'Andrew Winer, Notre Dame Philosophical Review' },
    ],
  },
  {
    slug: 'bacon-disfigured',
    title: 'Bacon Disfigured',
    shortTitle: 'Bacon Disfigured',
    publisher: 'Thames & Hudson',
    year: '2026',
    role: 'editor',
    cover: '/covers/bacon-disfigured.avif',
    publisherUrl: 'https://www.thamesandhudson.com/products/bacon-disfigured',
    buy: [
      { label: 'Publisher', url: 'https://www.thamesandhudson.com/products/bacon-disfigured' },
      { label: 'Amazon', url: 'https://www.amazon.co.uk/Bacon-Disfigured-Ben-Ware/dp/0500966656' },
    ],
    hook: 'Leading philosophers and psychoanalytic theorists do to Bacon what Bacon does to his own figures: disfigure and distort him into something new and previously unseen.',
    blurb: [
      'Francis Bacon is undoubtedly one of the most important artists of the twentieth century. In his paintings, Bacon radically disfigures his subjects, making them all but unrecognizable. This is no mere stylistic quirk, but the expression of a deeply held aesthetic vision.',
      'For Bacon, the essence of a subject can only be captured in the distorted recording of its appearance. His disfigurations are therefore, as he himself says, attempts to bring back the intensity of reality, to paint images that are ‘truer than the literal truth’.',
      'In this groundbreaking collection of essays, some of today’s leading philosophers and psychoanalytic theorists go to work on Bacon. They do to the artist what the artist does to his own figures: they disfigure and distort him, twisting and turning him into something new and previously unseen.',
      'This strategy of disfiguration blasts Bacon out of his traditional contexts, opening up new connections between his art and the ideas of key thinkers, including Kant, Marx, Nietzsche, Baudelaire, Freud, Canguilhem, Genet, Lacan, Adorno and Althusser. The results are revelatory, allowing us to transform our understanding not only of Bacon but also of modernism itself.',
    ],
    endorsements: [],
  },
  {
    slug: 'bacon-painting-philosophy-psychoanalysis',
    title: 'Francis Bacon: Painting, Philosophy, Psychoanalysis',
    shortTitle: 'Francis Bacon',
    publisher: 'Thames & Hudson',
    year: '2019',
    role: 'editor',
    cover: '/covers/bacon-ppp.avif',
    publisherUrl:
      'https://www.thamesandhudson.com/products/francis-bacon-painting-philosophy-psychoanalysis-francis-bacon-studies',
    buy: [
      {
        label: 'Publisher',
        url: 'https://www.thamesandhudson.com/products/francis-bacon-painting-philosophy-psychoanalysis-francis-bacon-studies',
      },
      { label: 'Amazon', url: 'https://www.amazon.co.uk/Francis-Bacon-Painting-Philosophy-Psychoanalysis/dp/050097098X' },
    ],
    hook: 'Today’s leading philosophers and psychoanalytic critics go beyond established readings of Bacon, opening up radically new ways of thinking about his art.',
    blurb: [
      'Francis Bacon is one of the most important artists of the 20th century. His works continue to puzzle and unnerve viewers, raising complex questions about their meaning.',
      'Over recent decades, two theoretical approaches to Bacon’s work have come to hold sway: firstly, that Bacon is an existentialist painter, depicting an absurd and godless world; and secondly, that he is an anti-representational painter, whose primary aim is to bring his work directly onto the spectator’s ‘nervous system’.',
      'Francis Bacon: Painting, Philosophy, Psychoanalysis brings together some of today’s leading philosophers and psychoanalytic critics to go beyond established readings of Bacon and to open up radically new ways of thinking about his art. The essays bring Bacon into dialogue with figures such as Aristotle, Hegel, Freud, Lacan, Adorno and Heidegger, as well as situating his work in the broader contexts of modernism and modernity.',
      'The result is a timely and thought-provoking collection that will be essential reading for anyone interested in Bacon, modern art and contemporary aesthetics.',
    ],
    endorsements: [],
  },
];

export const bookBySlug = Object.fromEntries(books.map((b) => [b.slug, b]));

// Newest first — the order a list of works is normally given in.
export const booksByYear = [...books].sort((a, b) => Number(b.year) - Number(a.year));

// The description as one string, for the meta description and the schema —
// structured data wants the blurb, not our paragraphing of it.
export function blurbText(book) {
  return book.blurb.join(' ');
}

// A title set for reading: the subtitle drops to its own line at a smaller
// size, the way a title page sets it.
export function splitTitle(title) {
  const at = title.indexOf(': ');
  if (at === -1) return { main: title, sub: null };
  return { main: title.slice(0, at), sub: title.slice(at + 2) };
}
