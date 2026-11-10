import Image from "next/image";
import Link from "next/link";
import Crossed from "../components/Crossed";
import TicketWidget from "../components/TicketWidget";
import { issue, type Conversation } from "../content";

const joinList = (items: string[]) =>
  items.length > 1
    ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
    : items[0] ?? "";

// The orange block: one conversation at a glance.
export function ConversationFeature({
  c,
  past = false,
  ticketsHref = "#tickets",
}: {
  c: Conversation;
  past?: boolean;
  ticketsHref?: string;
}) {
  return (
    <article className={`event-feature${c.guest.photo ? " has-photo" : ""}`} data-reveal>
      {c.guest.photo && (
        <figure className="event-photo">
          <Image
            src={c.guest.photo}
            alt={c.guest.name}
            width={600}
            height={800}
            sizes="(max-width: 860px) 100vw, 260px"
            priority
          />
          {c.guest.photoCredit && (
            <figcaption className="mono">photo: {c.guest.photoCredit}</figcaption>
          )}
        </figure>
      )}
      <div className="event-feature-main">
        <p className="event-series">
          <Crossed text={c.series} />
          <span className="mono">{issue(c)}</span>
        </p>
        <h2 className="event-title">{c.guest.name}</h2>
        {c.title && (
          <p className="event-own-title">
            <Crossed text={c.title} />
          </p>
        )}
        {c.books.length > 0 && (
          <p className="event-with">author of {joinList(c.books)}</p>
        )}
      </div>
      <div className="quiet-event-side">
        <p className="quiet-event-meta event-when">
          {c.displayDate}
          {!past && (
            <>
              <br />
              {c.time}
            </>
          )}
          <br />
          {c.venue}, {c.city}
        </p>
        {!past && (
          <a href={ticketsHref} className="button button-ink">
            get tickets
          </a>
        )}
      </div>
    </article>
  );
}

// Before the announcement: the series, with the guest kept private.
export function ConversationTeaser({ c }: { c: Conversation }) {
  return (
    <article className="quiet-event" data-reveal>
      <div>
        <p className="quiet-event-meta">next conversation</p>
        <h2 className="event-title event-title-crossed">
          literary <em>conversations</em>
        </h2>
      </div>
      <div className="quiet-event-side">
        <p>
          featured guest <em>to be announced</em>
        </p>
        <p className="quiet-event-meta">
          {c.showVenue ? `${c.venue}, ${c.city}` : `${c.city} · venue announced soon`}
        </p>
        <a href="#join" className="button button-ink">
          save your seat
        </a>
      </div>
    </article>
  );
}

// Programme, people and tickets; or, once it has happened, the recap.
export function ConversationDetails({ c, past = false }: { c: Conversation; past?: boolean }) {
  const people = (
    <div className="event-people">
      <p className="mono">{c.guest.role}</p>
      <p>{c.guest.bio}</p>
      <p className="mono">{past ? "the host" : "your host"}</p>
      <p>
        {c.host.name}. {c.host.bio}
      </p>
    </div>
  );

  if (past) {
    return (
      <div className="event-details event-details-past">
        <div className="event-about" data-reveal>
          <p className="event-tagline">{c.tagline}</p>
          <p className="event-description">{c.recap ?? c.description}</p>
          {c.recordingUrl && (
            <a href={c.recordingUrl} className="text-link event-recording" target="_blank" rel="noopener noreferrer">
              watch the conversation
            </a>
          )}
          {people}
        </div>
        {c.gallery && c.gallery.length > 0 && (
          <div className="event-gallery" data-reveal>
            {c.gallery.map((g) => (
              <Image key={g.src} src={g.src} alt={g.alt} width={800} height={1000} sizes="(max-width: 860px) 100vw, 40vw" />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="tickets" className="event-details">
      <div className="event-about" data-reveal>
        <p className="event-tagline">{c.tagline}</p>
        <p className="event-description">{c.description}</p>
        <ol className="event-programme">
          {c.programme.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        {people}
      </div>
      <div className="event-tickets" data-reveal>
        <p className="mono">tickets</p>
        {c.ticketWidget.trim() ? (
          <TicketWidget html={c.ticketWidget} />
        ) : (
          <>
            <p className="event-soon">
              tickets go on sale <em>soon</em>.
            </p>
            <a href="#join" className="button button-ink">
              join the list
            </a>
          </>
        )}
      </div>
    </div>
  );
}

// A small card for the lists of upcoming and past conversations.
export function ConversationCard({ c }: { c: Conversation }) {
  const image = c.gallery?.[0]?.src ?? c.guest.photo;
  return (
    <li className="event-card" data-reveal>
      <Link href={`/conversations/${c.slug}`}>
        {image && (
          <Image src={image} alt={c.guest.name} width={600} height={750} sizes="(max-width: 700px) 100vw, 33vw" />
        )}
        <p className="mono">
          {issue(c)} · {c.displayDate}
        </p>
        <h3>{c.guest.name}</h3>
        <p>
          <Crossed text={c.series} />
        </p>
      </Link>
    </li>
  );
}
