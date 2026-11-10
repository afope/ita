// Site copy and event details live here so they can be updated without
// touching layout code.

export const site = {
  name: "ita",
  expansion: "intersection of technology and art",
  reach: "Amsterdam & Lagos, working worldwide",
  // Enquiry links open an email to this address; waitlist sign-ups are
  // delivered here too (see README: Formspree).
  contactEmail: "hello@ita.ng",
};

export const idea = {
  word: "ìta",
  pronunciation: "/ee·tah/",
  definitions: [
    "In Lagos, the junction — the open square where streets cross and people gather.",
    "The intersection of technology and art.",
    "A studio between Amsterdam and Lagos that builds spatial prototypes, and a stage for conversations.",
  ],
};

export const studio = {
  headline: "Prototypes you can *stand inside*.",
  short:
    "We build spatial prototypes for innovation labs and organisations worldwide: rooms, objects and installations people can walk into before anything is built, tested with the people who will actually use them.",
  // What clients can buy. Durations are starting points; adjust freely.
  offers: [
    {
      title: "Test it in *Lagos*",
      body: "Send us an idea, product or service. With our team in Lagos, we build a spatial prototype and test it with the people who will actually use it, then deliver film, findings and recommendations. You never need to travel.",
      meta: "remote · 3–4 weeks",
    },
    {
      title: "Prototype *sprint*",
      body: "One idea turned into a walk-through prototype and tested with real people. Physical in Amsterdam or Lagos, or as a filmed digital walk-through, with a short report at the end.",
      meta: "amsterdam, lagos or remote · 2–3 weeks",
    },
    {
      title: "Installations & *residencies*",
      body: "Interactive installations for festivals, museums, brands and biennales. We travel to build them with you.",
      meta: "worldwide · by commission",
    },
  ],
  process: ["Listen", "Sketch in space", "Prototype", "Test with people", "Hand over"],
};

export const conversations = {
  headline: "Ideas need a *square* to meet in.",
  short:
    "Gatherings where writers, artists and technologists meet Lagos over a shared love of ideas.",
};

export const literaryEvent = {
  name: "literary conversations",
  // Announcement switch. While false, the site keeps the author, venue and
  // date private and invites people to join the list. On announcement day,
  // set it to true: the strip at the top of every page, the homepage teaser
  // and the full event with tickets on /conversations all appear.
  announced: false,
  title: "*ìwé* is the way",
  date: "Sunday 13 December 2026",
  shortDate: "13 Dec",
  time: "5:00 pm",
  tagline: "come for the conversation, stay for the music",
  programme: [
    "An introduction, then a conversation with the author and questions from the audience",
    "Book signing with the author",
    "Music and drinks in the garden",
  ],
  books: [
    "Nearly All the Men in Lagos Are Mad",
    "Only Big Bumbum Matters Tomorrow",
    "Women Rent Men and Secrets Here",
  ],
  authorBio:
    "Damilare Kuku is a Nigerian author, writer and creative artist whose work spans literature, film and broadcasting. Her debut collection, Nearly All the Men in Lagos Are Mad, became a runaway bestseller, and her debut novel, Only Big Bumbum Matters Tomorrow, was a number-one fiction bestseller published internationally by Picador, Simon & Schuster and HarperCollins. She is known for her sharp wit, fierce honesty and fearless writing about modern relationships and women's lives in Nigeria.",
  host: {
    name: "Afopefoluwa Ojo",
    bio: "Writer and creative technologist, based between Lagos and Amsterdam, and founder of ita.",
  },
  // Paste the ticket widget code from Tix Africa (Marketing > Custom
  // Widget) between the backticks. While it is empty, the ticket area
  // says tickets are coming soon and points to the list.
  ticketWidget: ``,
  description:
    "An evening of reading and conversation about words: their power, their beauty, their unparalleled ability to subvert, change and redirect.",
  // The venue stays private until announced. Set `showVenue: true` to
  // print it in the event details.
  venue: "MILIKI",
  showVenue: false,
  city: "Lagos",
  // Keep `confirmed: false` until the author has agreed. While unconfirmed the
  // site only says a featured author will be announced; the name stays private.
  featuredAuthor: {
    name: "Damilare Kuku",
    confirmed: false,
  },
};

// Brand system, used by the /brand guidelines page.
export const palette = [
  {
    name: "Ink",
    hex: "#0D0D0E",
    role: "The night over the junction. Primary background for the studio side.",
  },
  {
    name: "Laterite",
    hex: "#FF5A1F",
    role: "Lagos red earth, turned up bright. The art side: warmth, craft, conversations. The drawn vertical of the mark.",
  },
  {
    name: "Lagoon",
    hex: "#5CE6D2",
    role: "Lagoon water lit like a screen. The technology side and the signal: nodes, live states, calls to action.",
  },
  {
    name: "Paper",
    hex: "#F2EFE6",
    role: "Pages, programmes, words. Light sections and primary text on dark.",
  },
];

// Word pairs that surface at junctions in the hero: a technology word
// crossed with an art word. Add or swap freely.
export const junctionWords: [string, string][] = [
  ["sensor", "verse"],
  ["prototype", "poem"],
  ["signal", "story"],
  ["code", "cloth"],
  ["grid", "gesture"],
  ["circuit", "chorus"],
  ["render", "rhythm"],
  ["interface", "margin"],
  ["data", "chapter"],
  ["system", "spirit"],
  ["danfo", "ìta"],
  ["Ita Faji", "gather"],
  ["light", "language"],
  ["model", "memory"],
];
