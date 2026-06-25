import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhijith Lenin | Senior Frontend Developer & Geospatial Architect",
  description: "Portfolio of Abhijith Lenin, a Senior Frontend Developer with 5 years of experience specializing in React, Next.js, Redux, and custom geospatial mapping solutions (Leaflet, MapLibre GL).",
  keywords: [
    "Abhijith Lenin",
    "Senior Frontend Developer",
    "Geospatial Developer",
    "React Developer",
    "Next.js Developer",
    "Leaflet Map Engineer",
    "Kochi Frontend Developer",
    "Kerala Web Developer",
    "Dynamic Form Builder Developer"
  ],
  authors: [{ name: "Abhijith Lenin" }],
  creator: "Abhijith Lenin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhijithlenin.dev",
    title: "Abhijith Lenin | Senior Frontend Developer",
    description: "Senior Frontend Developer specialized in React, Next.js, and advanced geospatial integrations using Leaflet and MapLibre GL.",
    siteName: "Abhijith Lenin Portfolio"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full dark antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col font-geist">
        {children}
      </body>
    </html>
  );
}
