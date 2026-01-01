import type { Metadata } from "next";
import { Geist, Geist_Mono, } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "كلاكيت",
  description: "افضل قناة لعرض الافلام الاجنبية والمصرية ",
  keywords: ["films", "movies", "cinema", "افلام مصرية", "كلاكيت فيلم", "rotana"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div className="bg-gray-900 h-16" />}>
          <Navbar />
        </Suspense>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
