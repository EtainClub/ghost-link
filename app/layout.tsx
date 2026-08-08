import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import OperatorIdentity from "./components/OperatorIdentity";

const DESCRIPTION =
  "A speculative prototype of the human-robot labor marketplace: the dashboard for a job that doesn't exist yet. Open source design fiction — every number here is invented.";

export const metadata: Metadata = {
  title: "Ghost Link — The Interface for a Job That Doesn't Exist Yet",
  description: DESCRIPTION,
  keywords: "design fiction, speculative design, teleoperation, telepresence, robot, remote labor, humanoid, ghost link, open source, UI concept",
  openGraph: {
    title: "Ghost Link — The Interface for a Job That Doesn't Exist Yet",
    description: DESCRIPTION,
    url: "https://ghostlink.work",
    siteName: "Ghost Link",
    images: [
      {
        url: "https://ghostlink.work/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Ghost Link Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Link — The Interface for a Job That Doesn't Exist Yet",
    description: "Rent out your hands. A speculative prototype of the telepresence labor economy — built in the open, before the hardware arrives.",
    images: ["https://ghostlink.work/hero-bg.png"],
    creator: "@etainclub",
  },
  metadataBase: new URL("https://ghostlink.work"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <OperatorIdentity />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
