import type { Metadata } from "next";
import Footer from "../components/Footer";
import { Mark, Wordmark } from "../components/Logo";
import Nav from "../components/Nav";
import { idea, palette } from "../content";
import "./brand.css";

export const metadata: Metadata = {
  title: "ita — brand guidelines",
  description: "The ita identity system: name, mark, colour, type and voice.",
};

const voices = [
  {
    role: "Technology",
    family: "Space Grotesk",
    use: "Headlines and body. Engineered, precise, slightly quirky — the measured horizontal.",
    className: "spec-grotesk",
    sample: "Spatial prototypes",
  },
  {
    role: "Art",
    family: "Instrument Serif Italic",
    use: "The crossing. One or two words per headline switch into the serif — never a whole sentence.",
    className: "spec-serif",
    sample: "stand inside",
  },
  {
    role: "System",
    family: "JetBrains Mono",
    use: "Labels, coordinates, dates, data. Always uppercase, tracked out, small.",
    className: "spec-mono",
    sample: "AMSTERDAM / LAGOS",
  },
];

const rules = [
  ["Cross two voices", "Every headline crosses the grotesk with a serif-italic word. That crossing is the brand."],
  ["One signal per view", "Lagoon aqua marks the single most important thing on screen: the node, the live state, the next action."],
  ["Square, never round", "Corners stay sharp. The only rotation is 45° — the node."],
  ["Lowercase name", "Always ita, never ITA or Ita. In Yoruba context, ìta."],
  ["Show the grid", "Lines, rules and junctions are visible. We show our working, like a city plan."],
];

export default function Brand() {
  return (
    <>
      <Nav />
      <main className="brand">
        <header className="brand-hero">
          <p className="mono brand-eyebrow">
            <span className="node" /> brand guidelines / v1.0
          </p>
          <h1>
            The <em>junction</em>, as a system.
          </h1>
          <p className="brand-lede">
            ita builds spatial prototypes and hosts public conversations. The
            identity is built on a single idea: the place where two lines cross
            and people gather.
          </p>
        </header>

        <section className="brand-section">
          <h2 className="mono">01 / name</h2>
          <div className="brand-grid">
            <p className="brand-big">
              <em>{idea.word}</em>
            </p>
            <div className="brand-copy">
              <p>
                In Lagos, <strong>ìta</strong> names the junction — the open
                square where streets meet. Ita Faji, Ita Balogun, Ita Elewa.
                It is also an acronym hidden in plain sight: the{" "}
                <strong>i</strong>ntersection of <strong>t</strong>echnology and{" "}
                <strong>a</strong>rt.
              </p>
              <p>
                One word holds both businesses. The studio builds the junction;
                conversations are the people who gather there.
              </p>
            </div>
          </div>
        </section>

        <section className="brand-section">
          <h2 className="mono">02 / logo</h2>
          <div className="logo-tiles">
            <div className="logo-tile tile-ink">
              <Wordmark />
              <span className="mono">wordmark / on ink</span>
            </div>
            <div className="logo-tile tile-paper">
              <Wordmark />
              <span className="mono">wordmark / on paper</span>
            </div>
            <div className="logo-tile tile-field">
              <Wordmark />
              <span className="mono">wordmark / on laterite</span>
            </div>
            <div className="logo-tile tile-mark">
              <Mark />
              <span className="mono">junction mark</span>
            </div>
          </div>
          <div className="brand-copy brand-copy-wide">
            <p>
              The wordmark is drawn, not typeset: three geometric letters at a
              single stroke weight. The crossbar of the <strong>t</strong> runs
              wide — it is the street — and a Lagoon node sits where it meets
              the stem. The junction mark isolates that moment: a measured
              horizontal crossed by a hand-drawn vertical. Use the mark for
              avatars, favicons and stamps; use the wordmark everywhere else.
              Keep clear space equal to the height of the node on all sides.
            </p>
          </div>
        </section>

        <section className="brand-section">
          <h2 className="mono">03 / colour</h2>
          <div className="swatches">
            {palette.map((c) => (
              <div key={c.name} className="swatch">
                <div className="swatch-chip" style={{ background: c.hex }} />
                <p className="swatch-name">{c.name}</p>
                <p className="mono">{c.hex}</p>
                <p className="swatch-role">{c.role}</p>
              </div>
            ))}
          </div>
          <div className="proportion" aria-label="Colour proportions">
            <span style={{ flex: 55, background: "#0D0D0E" }}>ink 55%</span>
            <span style={{ flex: 25, background: "#F2EFE6", color: "#0D0D0E" }}>
              paper 25%
            </span>
            <span style={{ flex: 14, background: "#FF5A1F", color: "#0D0D0E" }}>
              laterite 14%
            </span>
            <span style={{ flex: 6, background: "#5CE6D2", color: "#0D0D0E" }}>
              6%
            </span>
          </div>
        </section>

        <section className="brand-section">
          <h2 className="mono">04 / type</h2>
          <div className="specimens">
            {voices.map((v) => (
              <div key={v.role} className="specimen">
                <p className={`specimen-sample ${v.className}`}>{v.sample}</p>
                <div>
                  <p className="mono specimen-role">{v.role} voice</p>
                  <p className="specimen-family">{v.family}</p>
                  <p className="specimen-use">{v.use}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="crossing-demo">
            Prototypes you can <em>stand inside</em>.
          </p>
        </section>

        <section className="brand-section">
          <h2 className="mono">05 / rules</h2>
          <ol className="rules">
            {rules.map(([title, body], i) => (
              <li key={title}>
                <span className="mono">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
