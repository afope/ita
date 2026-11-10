import type { Metadata } from "next";
import Crossed from "../components/Crossed";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import {
  conversations,
  pastConversations,
  conversationName,
  upcomingConversations,
} from "../content";
import "../home.css";
import "./conversations.css";
import JoinSection from "./JoinSection";
import {
  ConversationCard,
  ConversationDetails,
  ConversationFeature,
  ConversationTeaser,
} from "./parts";

// Rebuild hourly, so a conversation moves to "past" the day after.
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const next = upcomingConversations()[0];
  if (next?.announced) {
    return {
      title: `${conversationName(next)} · ita`,
      description: `${next.guest.name} in conversation, ${next.displayDate}, ${next.venue}, ${next.city}. ${next.tagline}.`,
    };
  }
  return { title: "ita conversations", description: conversations.short };
}

// ita conversations: the next conversation with its tickets, what else is
// coming up, and the archive. ita.ng/conversations is the link for posters.
export default function Conversations() {
  const [next, ...later] = upcomingConversations();
  const laterAnnounced = later.filter((c) => c.announced);
  const past = pastConversations();

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

          {next &&
            (next.announced ? (
              <>
                <p className="list-label mono" data-reveal>
                  next conversation
                </p>
                <ConversationFeature c={next} />
                <ConversationDetails c={next} />
              </>
            ) : (
              <ConversationTeaser c={next} />
            ))}

          {laterAnnounced.length > 0 && (
            <>
              <p className="list-label mono" data-reveal>
                also coming up
              </p>
              <ul className="event-cards">
                {laterAnnounced.map((c) => (
                  <ConversationCard key={c.slug} c={c} />
                ))}
              </ul>
            </>
          )}
        </section>

        {past.length > 0 && (
          <section id="past" className="section section-ink">
            <div className="section-head" data-reveal>
              <span className="section-kicker mono">past conversations</span>
            </div>
            <ul className="event-cards">
              {past.map((c) => (
                <ConversationCard key={c.slug} c={c} />
              ))}
            </ul>
          </section>
        )}

        <JoinSection />
      </main>

      <Footer />
    </div>
  );
}
