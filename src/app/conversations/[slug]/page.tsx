import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import {
  conversationList,
  getConversation,
  pastConversations,
  conversationName,
} from "../../content";
import "../../home.css";
import "../conversations.css";
import JoinSection from "../JoinSection";
import { ConversationDetails, ConversationFeature } from "../parts";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return conversationList.filter((c) => c.announced).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getConversation((await params).slug);
  if (!c || !c.announced) return {};
  return {
    title: `${conversationName(c)} · ita`,
    description: `${c.guest.name} in conversation, ${c.displayDate}, ${c.venue}, ${c.city}. ${c.tagline}.`,
  };
}

// One conversation: tickets before it happens, the recap after.
export default async function ConversationPage({ params }: Props) {
  const c = getConversation((await params).slug);
  // Unannounced conversations stay private, even by direct link.
  if (!c || !c.announced) notFound();
  const past = pastConversations().some((p) => p.slug === c.slug);

  return (
    <div className="home conversations-page">
      <Reveal />
      <Nav strip={false} />

      <main id="top">
        <section className="section section-paper conversations-head">
          <div className="section-head" data-reveal>
            <Link href="/conversations" className="section-kicker mono back-link">
              ita conversations
            </Link>
          </div>
          <ConversationFeature c={c} past={past} />
          <ConversationDetails c={c} past={past} />
        </section>
        <JoinSection />
      </main>

      <Footer />
    </div>
  );
}
