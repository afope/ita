"use client";

import { useEffect, useRef } from "react";

// Renders the embed code from the ticketing platform. Scripts inserted with
// innerHTML do not run, so each one is recreated to let the widget load.
export default function TicketWidget({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = html;
    el.querySelectorAll("script").forEach((old) => {
      const script = document.createElement("script");
      for (const attr of Array.from(old.attributes)) {
        script.setAttribute(attr.name, attr.value);
      }
      script.text = old.text;
      old.replaceWith(script);
    });
  }, [html]);

  return <div ref={ref} className="ticket-widget" />;
}
