import type { Metadata } from "next";
import { Manufacturing_Consent, Syne, Inter, Fraunces } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
});

/** Hero "Queenellie" wordmark — Gothic blackletter */
const queenellieDisplay = Manufacturing_Consent({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-queenellie-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Queenellie — Portfolio",
  description:
    "Elisa Carrillo — Engineer who thinks like a PM. At Snap, I scoped and built what I needed as a user.",
  openGraph: {
    title: "Queenellie — Portfolio",
    description:
      "Engineer who thinks like a PM. Shipped to 375M+ users at Snap.",
    url: "https://queenellie.com",
    siteName: "Queenellie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queenellie — Portfolio",
    description: "Engineer who thinks like a PM. Shipped to 375M+ users at Snap.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${queenellieDisplay.variable} ${fraunces.variable}`}
    >
      <body className="bg-[#f5f5f5] text-[#111] font-inter antialiased">
        <Nav />
        <main className="min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
