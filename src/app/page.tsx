import Countdown from "./components/Countdown";
import Crossed from "./components/Crossed";
import Footer from "./components/Footer";
import HeroCanvas from "./components/HeroCanvas";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import Waitlist from "./components/Waitlist";
import {
  conversations,
  idea,
  junctionWords,
  literaryEvent,
  site,
  studio,
} from "./content";

export default function Home() {
  const author = literaryEvent.featuredAuthor;

  return (
    <>
      <Reveal />
      <Nav />

      <main id="top">
        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="hero">
          <HeroCanvas words={junctionWords} />
          <div className="hero-inner">
            <p className="eyebrow mono">
              <span className="node" /> {site.expansion}
            </p>
            <h1 className="hero-title">
              The junction where technology <em>meets</em> art.
            </h1>
            <p className="hero-lede">
              Spatial prototypes for innovation labs and organisations — and
              conversations that bring Lagos together around ideas.
            </p>
            <div className="hero-actions">
              <a href="#studio" className="button button-signal">
                work with the studio
              </a>
              <a href="#literary" className="button button-ghost">
                {literaryEvent.name} / {literaryEvent.dateLabel.toLowerCase()}
              </a>
            </div>
          </div>
          <div className="hero-meta mono">
            <span>6.45°N 3.39°E</span>
            <span>lagos / nigeria</span>
          </div>
          <a href="#idea" className="scroll-cue mono" aria-label="Scroll to the idea">
            scroll <span>↓</span>
          </a>
        </header>

        {/* ── Idea ──────────────────────────────────────── */}
        <section id="idea" className="section section-paper">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">the idea</span>
          </div>

          <div className="definition" data-reveal>
            <p className="definition-word">
              {idea.word}
              <span className="mono">{idea.pronunciation} · n.</span>
            </p>
            <ol className="definition-list">
              {idea.definitions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </div>

          <div className="principles">
            {idea.principles.map((p) => (
              <article key={p.title} className="principle" data-reveal>
                <h3>
                  <Crossed text={p.title} />
                </h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Studio ────────────────────────────────────── */}
        <section id="studio" className="section section-ink">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">studio / spatial prototyping</span>
          </div>

          <div className="split" data-reveal>
            <h2 className="section-title">
              <Crossed text={studio.headline} />
            </h2>
            <p className="section-intro">{studio.intro}</p>
          </div>

          <div className="cards">
            {studio.services.map((service) => (
              <article key={service.title} className="card" data-reveal>
                <div className="card-top">
                  <span className="card-cross" aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>

          <ol className="process" data-reveal aria-label="How we work">
            {studio.process.map((step, i) => (
              <li key={step}>
                <span className="mono">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="section-cta" data-reveal>
            <p>
              Have a future you need to <em>stand inside</em>?
            </p>
            {site.contactEmail ? (
              <a
                href={`mailto:${site.contactEmail}?subject=Spatial%20prototype%20enquiry`}
                className="button button-signal"
              >
                start a project
              </a>
            ) : (
              <a href="#join" className="button button-signal">
                get in touch
              </a>
            )}
          </div>
        </section>

        {/* ── Conversations ─────────────────────────────── */}
        <section id="conversations" className="section section-paper">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">ita conversations / public programme</span>
          </div>

          <div className="split" data-reveal>
            <h2 className="section-title">
              <Crossed text={conversations.headline} />
            </h2>
            <p className="section-intro">{conversations.intro}</p>
          </div>

          {/* Featured event */}
          <article id="literary" className="event" data-reveal>
            <div className="event-main">
              <p className="mono event-label">
                <span className="node" /> next edition / literary
              </p>
              <h3 className="event-name">
                literary <em>conversations</em>
              </h3>
              <p className="event-title">{literaryEvent.subtitle}</p>

              <dl className="event-facts mono">
                <div>
                  <dt>date</dt>
                  <dd>{literaryEvent.dateLabel}</dd>
                </div>
                <div>
                  <dt>venue</dt>
                  <dd>
                    {literaryEvent.showVenue
                      ? `${literaryEvent.venue}, ${literaryEvent.city}`
                      : `${literaryEvent.city}, announced soon`}
                  </dd>
                </div>
                <div>
                  <dt>entry</dt>
                  <dd>waitlist open</dd>
                </div>
              </dl>

              <Countdown target={literaryEvent.date} />
            </div>

            <div className="event-side">
              <div className="author">
                <p className="mono author-label">featured author</p>
                {author.confirmed ? (
                  <>
                    <p className="author-name">{author.name}</p>
                    <p className="author-bio">{author.bio}</p>
                  </>
                ) : (
                  <>
                    <p className="author-name">
                      to be <em>announced</em>
                    </p>
                    <p className="author-bio">
                      A celebrated voice in Nigerian fiction. Join the list to
                      hear first.
                    </p>
                  </>
                )}
              </div>

              <ol className="programme">
                {literaryEvent.programme.map((item, i) => (
                  <li key={item}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>

              <a href="#join" className="button button-signal">
                save your seat
              </a>
            </div>
          </article>
        </section>

        {/* ── Join ──────────────────────────────────────── */}
        <section id="join" className="section section-field">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">the list</span>
          </div>
          <div className="join-body" data-reveal>
            <h2 className="section-title">
              Meet us at the <em>junction</em>.
            </h2>
            <div>
              <p className="join-lede">
                Be first to hear about literary conversations this December,
                where it&apos;s happening, who&apos;s reading, and new work from
                the studio.
              </p>
              <Waitlist />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
