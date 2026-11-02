import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorEffect } from "@/components/CursorEffect";

export const metadata: Metadata = {
  title: "James Babarinde — Principal Product Designer",
  description:
    "Design systems, spatial interfaces, and platform architecture. A cinematic portfolio experience.",
  openGraph: {
    title: "James Babarinde — Principal Product Designer",
    description:
      "Design systems, spatial interfaces, and platform architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <CursorEffect />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
