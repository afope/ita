import Waitlist from "../components/Waitlist";
import { site } from "../content";

export default function JoinSection() {
  return (
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
  );
}
