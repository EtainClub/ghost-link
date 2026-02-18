import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "Ghost Link — Human Precision, Robotic Scale",
  description: "The world's first decentralized human-robot labor relay platform. Remotely control high-fidelity robotic avatars and earn real-time crypto yields from anywhere on Earth.",
  keywords: "robot, teleoperator, remote labor, humanoid, ghost link, CRED, LABR",
  openGraph: {
    title: "Ghost Link — Human Precision, Robotic Scale",
    description: "The world's first decentralized human-robot labor relay platform. Remotely control high-fidelity robotic avatars and earn real-time crypto yields from anywhere on Earth.",
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
    title: "Ghost Link — Human Precision, Robotic Scale",
    description: "The world's first decentralized human-robot labor relay platform.",
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
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
