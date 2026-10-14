import Link from "next/link";
import { Wordmark } from "./Logo";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <Link href="/#top" className="nav-logo" aria-label="ita home">
        <Wordmark />
      </Link>
      <div className="nav-links">
        <Link href="/#idea">idea</Link>
        <Link href="/#studio">studio</Link>
        <Link href="/#conversations">conversations</Link>
        <Link href="/brand">brand</Link>
      </div>
      <Link href="/#join" className="button button-signal nav-cta">
        join
      </Link>
    </nav>
  );
}
