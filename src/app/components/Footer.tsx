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
      <span className="mono">{site.city.toLowerCase()} / 6.45°N 3.39°E</span>
    </footer>
  );
}
