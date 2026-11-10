import { site } from "../content";
import { Wordmark } from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <Wordmark className="footer-logo" />
      <span className="mono">{site.expansion}</span>
      <a href={`mailto:${site.contactEmail}`} className="mono footer-link">
        {site.contactEmail}
      </a>
      <span className="mono">{site.reach.toLowerCase()}</span>
    </footer>
  );
}
