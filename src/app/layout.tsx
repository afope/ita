import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "ita",
  description: "everything is a typo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.variable}>{children}</body>
    </html>
  );
}
