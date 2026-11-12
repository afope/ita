import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../home.css";

export const metadata: Metadata = {
  title: "You're outside · ita",
  description: "Your subscription to ita is confirmed.",
  // Only reached from the confirmation email: keep it out of search results.
  robots: { index: false, follow: false },
};

// Where Kit sends people after they confirm their email address.
export default function Welcome() {
  return (
    <div className="home">
      <Nav />
      <main id="top">
        <section className="hero welcome">
          <div className="hero-inner">
            <p className="mono welcome-kicker">subscription confirmed</p>
            <h1 className="hero-title">
              You&apos;re <em>outside</em>.
            </h1>
            <p className="welcome-lede">
              Thank you for confirming. We&apos;ll write when tickets for{" "}
              <em>ìwé is the way</em> go on sale, and before every conversation
              after that.
            </p>
            <div className="hero-actions">
              <Link href="/conversations" className="button button-signal">
                see the conversations
              </Link>
              <Link href="/" className="text-link">
                back to ita
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
