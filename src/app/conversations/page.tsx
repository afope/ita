import type { Metadata } from "next";
import Crossed from "../components/Crossed";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import TicketWidget from "../components/TicketWidget";
import Waitlist from "../components/Waitlist";
import { conversations, literaryEvent, site } from "../content";
import "../home.css";
import "./conversations.css";

const plainTitle = literaryEvent.title.replace(/\*/g, "");

export const metadata: Metadata = literaryEvent.announced
  ? {
      title: `${plainTitle} — ${literaryEvent.featuredAuthor.name} in conversation · ita`,
      description: `${literaryEvent.featuredAuthor.name} in conversation, ${literaryEvent.date}, ${literaryEvent.venue}, ${literaryEvent.city}. ${literaryEvent.tagline}.`,
    }
  : {
      title: "ita conversations",
      description: conversations.short,
    };

// ita conversations: the series, with the next conversation and its
// tickets. This is the link for posters, bios and emails.
export default function Conversations() {
  const event = literaryEvent;
  const author = event.featuredAuthor;
  const announced = event.announced;
  const showVenue = announced || event.showVenue;

  return (
    <div className="home conversations-page">
      <Reveal />
      <Nav strip={false} />

      <main id="top">
        <section className="section section-paper conversations-head">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">ita conversations</span>
          </div>
          <h1 className="section-title" data-reveal>
            <Crossed text={conversations.headline} />
          </h1>
          <p className="lede" data-reveal>
            {conversations.short}
          </p>

          <article id="literary" className="quiet-event" data-reveal>
            <div>
              <p className="quiet-event-meta">
                {announced ? "next conversation" : event.name}
              </p>
              <h2 className="event-title">
                {announced ? (
                  <Crossed text={event.title} />
                ) : (
                  <>
                    literary <em>conversations</em>
                  </>
                )}
              </h2>
              {announced && (
                <p className="event-with">
                  with <em>{author.name}</em>, author of{" "}
                  {event.books.slice(0, -1).join(", ")} and{" "}
                  {event.books[event.books.length - 1]}
                </p>
              )}
            </div>
            <div className="quiet-event-side">
              {announced ? (
                <p className="quiet-event-meta event-when">
                  {event.date}
                  <br />
                  {event.time}
                  <br />
                  {event.venue}, {event.city}
                </p>
              ) : (
                <>
                  <p>
                    featured author <em>to be announced</em>
                  </p>
                  <p className="quiet-event-meta">
                    {showVenue
                      ? `${event.venue}, ${event.city}`
                      : `${event.city} · venue announced soon`}
                  </p>
                </>
              )}
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
                <p className="event-tagline">{event.tagline}</p>
                <p className="event-description">{event.description}</p>
                <ol className="event-programme">
                  {event.programme.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <div className="event-people">
                  <p className="mono">the author</p>
                  <p>{event.authorBio}</p>
                  <p className="mono">your host</p>
                  <p>
                    {event.host.name}. {event.host.bio}
                  </p>
                </div>
              </div>
              <div className="event-tickets" data-reveal>
                <p className="mono">tickets</p>
                {event.ticketWidget.trim() ? (
                  <TicketWidget html={event.ticketWidget} />
                ) : (
                  <>
                    <p className="event-soon">
                      Tickets go on sale <em>soon</em>.
                    </p>
                    <a href="#join" className="button button-ink">
                      join the list
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </section>

        <section id="join" className="section section-ink">
          <div className="section-head" data-reveal>
            <span className="section-kicker mono">the list</span>
          </div>
          <div className="quiet-join" data-reveal>
            <h2 className="section-title">
              Hear about the next <em>conversation</em>.
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
