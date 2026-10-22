import type { Metadata } from "next";
import Crossed from "../components/Crossed";
import Footer from "../components/Footer";
import HeroCanvas from "../components/HeroCanvas";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import Waitlist from "../components/Waitlist";
import {
  conversations,
  idea,
  junctionWords,
  literaryEvent,
  site,
  studio,
} from "../content";
import "./minimal.css";

export const metadata: Metadata = {
  title: "ita — intersection of technology and art (minimal)",
};

// A pared-back version of the homepage for comparison: the map and the
// words carry the character, everything else is quieter.
export default function Minimal() {
  const author = literaryEvent.featuredAuthor;

  return (
    <div className="minimal">
      <Reveal />
      <Nav />

      <main id="top">
        <header className="hero">
          <HeroCanvas words={junctionWords} quiet />
          <div className="hero-inner">
            <h1 className="hero-title">
              The junction where technology <em>meets</em> art.
            </h1>
            <div className="hero-actions">
              <a href="#studio" className="button button-signal">
                work with the studio
              </a>
              <a href="#literary" className="text-link">
                {literaryEvent.name}, {literaryEvent.dateLabel.toLowerCase()}
              </a>
            </div>
          </div>
          <div className="hero-meta mono">
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
            >
              map © openstreetmap contributors
            </a>
          </div>
        </header>

        <section id="idea" className="section section-paper">
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
        </section>

        <section id="studio" className="section section-ink">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">studio</span>
          </div>
          <h2 className="section-title" data-reveal>
            <Crossed text={studio.headline} />
          </h2>
          <p className="lede" data-reveal>
            {studio.short}
          </p>
          <ul className="offer-list">
            {studio.offers.map((offer) => (
              <li key={offer.title} data-reveal>
                <h3>
                  <Crossed text={offer.title} />
                </h3>
                <p>{offer.body}</p>
                <span className="mono">{offer.meta}</span>
              </li>
            ))}
          </ul>
          <p className="process-line" data-reveal>
            {studio.process.map((step, i) => (
              <span key={step}>
                {i > 0 && <i className="process-node" aria-hidden="true" />}
                {step.toLowerCase()}
              </span>
            ))}
          </p>
          <a
            href={
              site.contactEmail
                ? `mailto:${site.contactEmail}?subject=Spatial%20prototype%20enquiry`
                : "#join"
            }
            className="text-link"
            data-reveal
          >
            start a project
          </a>
        </section>

        <section id="conversations" className="section section-paper">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">conversations</span>
          </div>
          <h2 className="section-title" data-reveal>
            <Crossed text={conversations.headline} />
          </h2>
          <p className="lede" data-reveal>
            {conversations.short}
          </p>

          <article id="literary" className="quiet-event" data-reveal>
            <div>
              <h3>
                literary <em>conversations</em>
              </h3>
              <p className="quiet-event-meta">
                {literaryEvent.dateLabel} · {literaryEvent.city}
              </p>
            </div>
            <div className="quiet-event-side">
              <p>
                {author.confirmed ? (
                  <>
                    with <em>{author.name}</em>
                  </>
                ) : (
                  <>
                    featured author <em>to be announced</em>
                  </>
                )}
              </p>
              <a href="#join" className="button button-signal">
                save your seat
              </a>
            </div>
          </article>
        </section>

        <section id="join" className="section section-ink">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">the list</span>
          </div>
          <div className="quiet-join" data-reveal>
            <h2 className="section-title">
              Meet us at the <em>junction</em>.
            </h2>
            <Waitlist />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
