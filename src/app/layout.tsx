import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INTERIO | Luxury Interior Design Studio",
  description: "Curating silent stages for life to unfold with architectural precision and quiet luxury.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1A1816] text-[#F8F1E6] font-manrope">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
