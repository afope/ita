import Link from "next/link";
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
  issue,
  plain,
  site,
  studio,
  upcomingConversations,
} from "./content";
import "./home.css";

// Rebuild hourly, so the next conversation stays current.
export const revalidate = 3600;

// The homepage: the map and the words carry the character, everything
// else stays quiet.
export default function Home() {
  const next = upcomingConversations()[0];
  const announced = next?.announced ?? false;

  return (
    <div className="home">
      <Reveal />
      <Nav />

      <main id="top">
        <header className="hero">
          <HeroCanvas words={junctionWords} quiet />
          <div className="hero-inner">
            <h1 className="hero-title">
              Outside, where technology <em>meets</em> art.
            </h1>
            <div className="hero-actions">
              <a href="#studio" className="button button-signal">
                work with the studio
              </a>
              <a
                href={announced ? "/conversations" : "#literary"}
                className="text-link"
              >
                {next && announced
                  ? `${plain(next.series)} · ${next.shortDate}`
                  : "literary conversations"}
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

        <section id="about" className="section section-paper">
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
              {announced && <p className="quiet-event-meta">next conversation</p>}
              <h3>
                {next && announced ? (
                  <Crossed text={next.series} />
                ) : (
                  <>
                    literary <em>conversations</em>
                  </>
                )}
              </h3>
              <p className="quiet-event-meta">
                {!next
                  ? "Lagos · the next date announced soon"
                  : announced
                    ? `${issue(next)} · ${next.displayDate} · ${next.venue}, ${next.city}`
                    : next.showVenue
                      ? `${next.venue}, ${next.city}`
                      : `${next.city} · venue announced soon`}
              </p>
            </div>
            <div className="quiet-event-side">
              <p>
                {next && (announced || next.guest.confirmed) ? (
                  <>
                    with <em>{next.guest.name}</em>
                  </>
                ) : (
                  <>
                    featured author <em>to be announced</em>
                  </>
                )}
              </p>
              {announced ? (
                <Link href="/conversations#tickets" className="button button-signal">
                  get tickets
                </Link>
              ) : (
                <Waitlist
                  id="notify-home"
                  label="be the first to know when tickets go on sale"
                  button="notify me"
                  success="you're on the list. we'll email you when tickets go on sale."
                />
              )}
            </div>
          </article>
          <Link href="/conversations" className="text-link quiet-event-more" data-reveal>
            {announced ? "the programme, the author and tickets" : "all conversations"}
          </Link>
        </section>

        <section id="join" className="section section-ink">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">the list</span>
          </div>
          <div className="quiet-join" data-reveal>
            <h2 className="section-title">
              Meet us <em>outside</em>.
            </h2>
            <div>
              <Waitlist />
              <p className="join-note">
                Or write to us:{" "}
                <a href={`mailto:${site.contactEmail}`} className="text-link">
                  {site.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
