// Site copy and event details live here so they can be updated without
// touching layout code.

export const site = {
  name: "ita",
  expansion: "intersection of technology and art",
  city: "Lagos",
  reach: "based in Lagos, working worldwide",
  // Leave empty to hide the direct email link; the waitlist form still works.
  contactEmail: "",
  // Shows a small switch for comparing the colour and ink & paper palettes.
  // Set to false (and pick a default below) before launch.
  showPaletteToggle: true,
  defaultPalette: "colour" as "colour" | "ink",
};

export const idea = {
  word: "ìta",
  pronunciation: "/ee·tah/",
  definitions: [
    "In Lagos, the junction — the open square where streets cross and people gather. Ita Faji. Ita Balogun.",
    "The intersection of technology and art.",
    "A studio that builds spatial prototypes, and a stage for conversations.",
  ],
  principles: [
    {
      title: "Build to *feel*",
      body: "Decks describe the future. Prototypes let you stand inside it. We make ideas physical early, so people can react with their bodies, not just their opinions.",
    },
    {
      title: "Gather in the *open*",
      body: "Every ìta is public ground. Our work is designed to be walked through, argued over and shared — never sealed off in a lab.",
    },
    {
      title: "Lagos is the *laboratory*",
      body: "The most inventive city we know is our testing ground. We design from here, for everywhere.",
    },
  ],
};

export const studio = {
  intro:
    "ita is a spatial prototyping studio, based in Lagos and working worldwide. We help innovation labs and organisations test ideas in physical space before they are built — rooms that respond, objects that listen, and environments that let people feel the future instead of reading about it — with the people who will actually live in it.",
  headline: "Prototypes you can *stand inside*.",
  // One-sentence version for the pared-back layout.
  short:
    "We build spatial prototypes for innovation labs and organisations worldwide: rooms, objects and installations people can walk into before anything is built, tested with the people who will actually use them.",
  // What clients can buy. Durations are starting points; adjust freely.
  offers: [
    {
      title: "Test it in *Lagos*",
      body: "Send us an idea, product or service. We build a spatial prototype and test it with the people who will actually use it in Lagos, then deliver film, findings and recommendations. You never need to travel.",
      meta: "remote · 3–4 weeks",
    },
    {
      title: "Prototype *sprint*",
      body: "One idea turned into a walk-through prototype and tested with real people. Physical in our Lagos studio or as a filmed digital walk-through, with a short report at the end.",
      meta: "remote or on site · 2–3 weeks",
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
  intro:
    "ita conversations is our public programme — gatherings where writers, artists and technologists meet audiences over a shared love of ideas. The best way for people to connect and commune is over shared interest. Lagos, the creative whirlpool that it is, is the most unassuming place to gather over a love of words: their power, their beauty, their unparalleled ability to subvert, change and redirect.",
};

export const literaryEvent = {
  name: "literary conversations",
  subtitle: "ita conversations, edition 01",
  // The venue stays private until announced. Set `showVenue: true` to
  // print it in the event details.
  venue: "MILIKI",
  showVenue: false,
  city: "Lagos",
  // ISO date used for the countdown. Update once the date is final.
  date: "2026-12-07T18:00:00+01:00",
  dateLabel: "07 December 2026",
  // Keep `confirmed: false` until the author has agreed. While unconfirmed the
  // site only says a featured author will be announced; the name stays private.
  featuredAuthor: {
    name: "Damilare Kuku",
    confirmed: false,
    bio: "Author of Nearly All the Men in Lagos Are Mad.",
  },
  programme: [
    "Reading by the featured author",
    "In conversation: words, Lagos and the future",
    "Audience Q&A",
    "Book signing and gathering",
  ],
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
