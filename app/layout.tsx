import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Off-Label Development — Practical AI for Small Business",
  description:
    "We help small businesses harness AI in practical, human-centered ways. No jargon, no hype — just real solutions that fit your workflow.",
  openGraph: {
    title: "Off-Label Development — Practical AI for Small Business",
    description:
      "We help small businesses harness AI in practical, human-centered ways. No jargon, no hype — just real solutions that fit your workflow.",
    type: "website",
    locale: "en_US",
    siteName: "Off-Label Development",
  },
  twitter: {
    card: "summary_large_image",
    title: "Off-Label Development — Practical AI for Small Business",
    description:
      "We help small businesses harness AI in practical, human-centered ways. No jargon, no hype — just real solutions that fit your workflow.",
  },
};

export const viewport: Viewport = {
  themeColor: "#3D5A4C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} bg-background`}>
      <body className="font-sans text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
