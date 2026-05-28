import "@mantine/core/styles.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_BASE_URL || "http://localhost:3000"),
  title: "MirrorRun",
  description: "Launch readiness for AI retail try-on journeys.",
  openGraph: {
    title: "MirrorRun",
    description: "Try-on media, agent trace, recovery event, and replay evidence in one receipt.",
    images: ["/brand/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="site-header">
            <Link className="brand-lockup" href="/" aria-label="MirrorRun home">
              <Image src="/brand/wordmark.svg" alt="MirrorRun" width={180} height={48} priority />
            </Link>
            <nav aria-label="Primary navigation">
              <Link href="/app">Launch room</Link>
              <Link href="/app/replays">Replays</Link>
              <Link href="/about">Architecture</Link>
            </nav>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
