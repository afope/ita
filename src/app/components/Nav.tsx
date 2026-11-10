import Link from "next/link";
import { literaryEvent } from "../content";
import { Wordmark } from "./Logo";

// The strip above the nav appears on every page once the next
// conversation is announced, and points to its tickets.
export default function Nav({ strip = true }: { strip?: boolean }) {
  const showStrip = strip && literaryEvent.announced;

  return (
    <div className="nav-wrap">
      {showStrip && (
        <Link href="/conversations#tickets" className="nav-strip mono">
          <span>
            <em>{literaryEvent.title.replace(/\*/g, "")}</em>
            <span className="nav-strip-sep" aria-hidden="true" />
            {literaryEvent.featuredAuthor.name}
            <span className="nav-strip-sep" aria-hidden="true" />
            {literaryEvent.shortDate}
          </span>
          <span className="nav-strip-cta">get tickets</span>
        </Link>
      )}
      <nav className="nav" aria-label="Main">
        <Link href="/#top" className="nav-logo" aria-label="ita home">
          <Wordmark />
        </Link>
        <div className="nav-links">
          <Link href="/#about">about</Link>
          <Link href="/#studio">studio</Link>
          <Link href="/conversations">conversations</Link>
        </div>
        <Link href="/#join" className="button button-signal nav-cta">
          join
        </Link>
      </nav>
    </div>
  );
}
