import Link from "next/link";
import { site } from "../content";
import { Wordmark } from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <Wordmark className="footer-logo" />
      <span className="mono">{site.expansion}</span>
      <Link href="/brand" className="mono footer-link">
        brand guidelines
      </Link>
      <span className="mono">{site.reach.toLowerCase()}</span>
    </footer>
  );
}
