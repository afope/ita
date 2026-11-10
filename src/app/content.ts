// Site copy and event details live here so they can be updated without
// touching layout code.

export const site = {
  name: "ita",
  expansion: "intersection of technology and art",
  reach: "Amsterdam & Lagos",
  // Enquiry links open an email to this address; waitlist sign-ups are
  // delivered here too (see README: Formspree).
  contactEmail: "hello@ita.ng",
};

export const idea = {
  word: "ìta",
  pronunciation: "/ee·tah/",
  definitions: [
    "In Lagos, the open square outside, where streets meet and people gather: Ita Faji, Ita Balogun.",
    "The intersection of technology and art.",
    "A studio between Amsterdam and Lagos that builds spatial prototypes, and a stage for conversations.",
  ],
};

export const studio = {
  headline: "Prototypes you can *stand inside*.",
  short:
    "We build spatial prototypes for innovation labs and organisations: rooms, objects and installations people can walk into before anything is built, tested with the people who will actually use them.",
  // What clients can buy. Durations are starting points; adjust freely.
  offers: [
    {
      title: "Test it in *Lagos*",
      body: "Send us an idea, product or service. We build a spatial prototype in Lagos and test it with the people who will actually use it, then deliver film, findings and recommendations. You never need to travel.",
      meta: "remote · 3–4 weeks",
    },
    {
      title: "Prototype *sprint*",
      body: "One idea turned into a walk-through prototype and tested with real people. Physical in Amsterdam or Lagos, or as a filmed digital walk-through, with a short report at the end.",
      meta: "amsterdam, lagos or remote · 2–3 weeks",
    },
    {
      title: "Installations & *commissions*",
      body: "Interactive installations for festivals, museums, brands and biennales, built with you in Amsterdam, Lagos or on site.",
      meta: "by commission",
    },
  ],
  process: ["Listen", "Sketch in space", "Prototype", "Test with people", "Hand over"],
};

export const conversations = {
  headline: "Ideas need a *square* to meet in.",
  short:
    "Gatherings in Lagos for writers, artists, technologists and anyone who loves ideas.",
};

// ìwé is the way: the literary series within ita conversations.
export const iweIsTheWay = {
  name: "*ìwé* is the way",
  description:
    "Literary conversations in Lagos: an author, their books and an audience, then music and drinks.",
};

export type Conversation = {
  // The page lives at /conversations/<slug>.
  slug: string;
  // The series this evening belongs to, and its number in the series.
  series: string;
  number: number;
  // Optional title for this evening, shown under the guest's name.
  title?: string;
  // Announcement switch. While false, the guest, venue and date stay
  // private everywhere and people are invited to join the list. On
  // announcement day set it to true: the strip at the top of every page,
  // the homepage block and the full event with tickets all appear.
  announced: boolean;
  // ISO date (YYYY-MM-DD). The day after, the conversation moves from
  // "upcoming" to "past" by itself.
  date: string;
  displayDate: string;
  shortDate: string;
  time: string;
  venue: string;
  showVenue: boolean;
  city: string;
  guest: {
    name: string;
    // Until confirmed, the site only says a guest will be announced.
    confirmed: boolean;
    role: string;
    bio: string;
    // Put photos in public/conversations/ and give the path from there.
    photo?: string;
    photoCredit?: string;
  };
  books: string[];
  description: string;
  tagline: string;
  programme: string[];
  host: { name: string; bio: string };
  // Paste the ticket widget code from Tix Africa (Marketing > Custom
  // Widget) between the backticks. While it is empty, the ticket area says
  // tickets go on sale soon and points to the list.
  ticketWidget: string;
  // After the event: a few lines on how it went, photos and a recording.
  recap?: string;
  gallery?: { src: string; alt: string }[];
  recordingUrl?: string;
};

// Every conversation, upcoming and past. Add the next one to the top.
export const conversationList: Conversation[] = [
  {
    slug: "damilare-kuku",
    series: iweIsTheWay.name,
    number: 1,
    announced: false,
    date: "2026-12-13",
    displayDate: "Sunday 13 December 2026",
    shortDate: "13 Dec",
    time: "5:00 pm",
    venue: "MILIKI",
    showVenue: false,
    city: "Lagos",
    guest: {
      name: "Damilare Kuku",
      confirmed: false,
      role: "the author",
      bio: "Damilare Kuku is a Nigerian author, writer and creative artist whose work spans literature, film and broadcasting. Her debut collection, Nearly All the Men in Lagos Are Mad, became a runaway bestseller, and her debut novel, Only Big Bumbum Matters Tomorrow, was a number-one fiction bestseller published internationally by Picador, Simon & Schuster and HarperCollins. She is known for her sharp wit, fierce honesty and fearless writing about modern relationships and women's lives in Nigeria.",
      photo: "/conversations/damilare-kuku.jpg",
    },
    books: [
      "Nearly All the Men in Lagos Are Mad",
      "Only Big Bumbum Matters Tomorrow",
      "Women Rent Men and Secrets Here",
    ],
    description:
      "Lagos, men, money, love and the things women say out loud: an evening with the writer who said them first, and said them funnier than anyone.",
    tagline: "come for the conversation, stay for the music",
    programme: [
      "A short introduction, then a conversation with Damilare and questions from the audience",
      "Book signing with the author",
      "Music and drinks in the garden",
    ],
    host: {
      name: "Afopefoluwa Ojo",
      bio: "Writer and creative technologist, based between Lagos and Amsterdam, and founder of ita.",
    },
    ticketWidget: ``,
  },
];

// A conversation counts as upcoming until the end of its day in Lagos.
const endsAt = (c: Conversation) => new Date(`${c.date}T23:59:59+01:00`);

export function upcomingConversations(now = new Date()) {
  return conversationList
    .filter((c) => endsAt(c) >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function pastConversations(now = new Date()) {
  return conversationList
    .filter((c) => endsAt(c) < now)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getConversation(slug: string) {
  return conversationList.find((c) => c.slug === slug);
}

export const plain = (text: string) => text.replace(/\*/g, "");

// "no. 01"
export const issue = (c: Conversation) => `no. ${String(c.number).padStart(2, "0")}`;

// "ìwé is the way no. 01: Damilare Kuku"
export const conversationName = (c: Conversation) =>
  `${plain(c.series)} ${issue(c)}: ${c.guest.name}`;

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
