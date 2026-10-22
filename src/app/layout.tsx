import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import PaletteToggle from "./components/PaletteToggle";
import { site } from "./content";
import "./globals.css";

// Technology voice.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-grotesk",
});

// Art voice.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// System voice: labels, coordinates, data.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ita — intersection of technology and art",
  description:
    "ita builds spatial prototypes for innovation labs and organisations, and hosts ita conversations — a public programme of literary and cultural gatherings in Lagos.",
};

export const viewport: Viewport = {
  themeColor: "#0D0D0E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      data-palette={site.defaultPalette === "ink" ? "ink" : undefined}
      suppressHydrationWarning
    >
      <body>
        {children}
        {site.showPaletteToggle && (
          <PaletteToggle initial={site.defaultPalette} />
        )}
      </body>
    </html>
  );
}
