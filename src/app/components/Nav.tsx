import Link from "next/link";
import { plain, upcomingConversations } from "../content";
import { Wordmark } from "./Logo";

// The strip above the nav appears on every page once the next
// conversation is announced, and points to its tickets.
export default function Nav({ strip = true }: { strip?: boolean }) {
  const next = upcomingConversations()[0];
  const showStrip = strip && next?.announced;

  return (
    <div className="nav-wrap">
      {showStrip && (
        <Link href="/conversations#tickets" className="nav-strip mono">
          <span>
            <em>{plain(next.series)}</em>
            <span className="nav-strip-sep" aria-hidden="true" />
            {next.guest.name}
            <span className="nav-strip-sep" aria-hidden="true" />
            {next.shortDate}
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
      </nav>
    </div>
  );
}
