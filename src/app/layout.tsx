import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create NED Stack",
  description: "A modern full-stack setup with Next.js, Elysia.js, and Drizzle ORM for performant and type-safe web applications.",
  openGraph: {
    title: "Create NED Stack",
    description: "A modern full-stack setup with Next.js, Elysia.js, and Drizzle ORM for performant and type-safe web applications.",
    url: "https://ned-tech-web.pages.dev/",
    siteName: "NED Stack",
    images: [
      {
        url: "https://ned-tech-web.pages.dev/img/logo.png",
        alt: "NED Stack Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
