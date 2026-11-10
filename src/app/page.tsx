import Crossed from "./components/Crossed";
import Footer from "./components/Footer";
import HeroCanvas from "./components/HeroCanvas";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import TicketWidget from "./components/TicketWidget";
import Waitlist from "./components/Waitlist";
import {
  conversations,
  idea,
  junctionWords,
  literaryEvent,
  site,
  studio,
} from "./content";
import "./home.css";

// The homepage leads with ita conversations, which is what is in motion;
// the studio follows, smaller, as what ita also builds for others.
export default function Home() {
  const author = literaryEvent.featuredAuthor;
  const announced = literaryEvent.announced;
  const showAuthor = announced || author.confirmed;
  const showVenue = announced || literaryEvent.showVenue;
  const headline = literaryEvent.immersive
    ? literaryEvent.immersiveHeadline
    : conversations.headline;
  const description = literaryEvent.immersive
    ? literaryEvent.immersiveDescription
    : literaryEvent.description;

  return (
    <div className="home">
      <Reveal />
      <Nav />

      <main id="top">
        <header className="hero">
          <HeroCanvas words={junctionWords} quiet />
          <div className="hero-inner">
            <h1
              className={`hero-title${headline.length > 40 ? " hero-title-long" : ""}`}
            >
              <Crossed text={headline} />
            </h1>
            <p className="hero-lede">
              {announced
                ? `${author.name} in conversation · ${literaryEvent.date} · ${literaryEvent.venue}, ${literaryEvent.city}`
                : conversations.lede}
            </p>
            <div className="hero-actions">
              <a
                href={announced ? "#tickets" : "#join"}
                className="button button-signal"
              >
                {announced ? "get tickets" : "join the list"}
              </a>
              <a href="#literary" className="text-link">
                {literaryEvent.name}
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

        <section id="conversations" className="section section-ink">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">ita conversations</span>
          </div>
          <h2 id="literary" className="section-title" data-reveal>
            {announced ? (
              <Crossed text={literaryEvent.title} />
            ) : (
              <>
                literary <em>conversations</em>
              </>
            )}
          </h2>
          <p className="lede" data-reveal>
            {description}
          </p>

          <article className="quiet-event" data-reveal>
            <div>
              <p className="quiet-event-meta">featured author</p>
              <h3>
                {showAuthor ? (
                  author.name
                ) : (
                  <>
                    to be <em>announced</em>
                  </>
                )}
              </h3>
              {announced && (
                <p className="quiet-event-books">
                  author of {literaryEvent.books.slice(0, -1).join(", ")} and{" "}
                  {literaryEvent.books[literaryEvent.books.length - 1]}
                </p>
              )}
            </div>
            <div className="quiet-event-side">
              {announced && (
                <p className="quiet-event-meta">
                  {literaryEvent.date} · {literaryEvent.time}
                </p>
              )}
              <p className="quiet-event-meta">
                {showVenue
                  ? `${literaryEvent.venue}, ${literaryEvent.city}`
                  : `${literaryEvent.city} · venue announced soon`}
              </p>
              <a
                href={announced ? "#tickets" : "#join"}
                className="button button-ink"
              >
                {announced ? "get tickets" : "save your seat"}
              </a>
            </div>
          </article>

          {announced && (
            <div id="tickets" className="event-details">
              <div className="event-about" data-reveal>
                <p className="event-tagline">{literaryEvent.tagline}</p>
                <ol className="event-programme">
                  {literaryEvent.programme.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <div className="event-people">
                  <p className="mono">the author</p>
                  <p>{literaryEvent.authorBio}</p>
                  <p className="mono">your host</p>
                  <p>
                    {literaryEvent.host.name}. {literaryEvent.host.bio}
                  </p>
                </div>
              </div>
              <div className="event-tickets" data-reveal>
                <p className="mono">tickets</p>
                {literaryEvent.ticketWidget.trim() ? (
                  <TicketWidget html={literaryEvent.ticketWidget} />
                ) : (
                  <>
                    <p className="event-soon">
                      Tickets go on sale <em>soon</em>.
                    </p>
                    <a href="#join" className="button button-signal">
                      join the list
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </section>

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

        <section id="studio" className="section section-ink studio">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">studio</span>
          </div>
          <h2 className="studio-title" data-reveal>
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
          <a
            href={`mailto:${site.contactEmail}?subject=Studio%20enquiry`}
            className="text-link studio-link"
            data-reveal
          >
            start a project
          </a>
        </section>

        <section id="join" className="section section-paper">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">the list</span>
          </div>
          <div className="quiet-join" data-reveal>
            <h2 className="section-title">
              Meet us at the <em>junction</em>.
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
