import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brownstown Minutes",
  description:
    "Official meeting records and recap podcasts for Brownstown Charter Township.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <header className="border-b border-mist bg-paper-raised">
          <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-harbor text-paper-raised font-serif text-sm font-semibold">
                BT
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight text-harbor-deep group-hover:text-harbor transition-colors">
                Brownstown Minutes
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-ink-soft">
              <Link href="/meetings" className="hover:text-harbor transition-colors">
                Meeting Archive
              </Link>
              <Link href="/about" className="hover:text-harbor transition-colors">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-mist bg-paper-raised">
          <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-ink-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>
              Brownstown Minutes is an independent civic resource for
              Brownstown Charter Township residents.
            </p>
            <p className="text-ink-soft/70">
              Published by KillianMedia
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
