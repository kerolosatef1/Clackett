import type { Metadata } from "next";
import {Almarai} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Suspense } from "react";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-almarai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "كلاكيت",
  description: " افضل قناة لعرض الافلام الاجنبية و المصرية ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" >
      <body  className={`${almarai.variable}  bg-black`}>
        <Suspense fallback={<div className="h-16 bg-gray-900 animate-pulse" />}>
          <Navbar />
        </Suspense>

        <main>{children}</main>
      </body>
    </html>
  );
}
