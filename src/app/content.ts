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
