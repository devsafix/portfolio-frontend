import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "highlight.js/styles/github-dark.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase is crucial for resolving absolute URLs for social sharing
  metadataBase: new URL("https://your-live-domain.com"), // <-- IMPORTANT: Replace with your actual domain
  title: {
    default: "Kawser Ferdous Safi | Full-Stack Developer",
    template: `%s | Kawser Ferdous Safi`,
  },
  description:
    "The official portfolio of Kawser Ferdous Safi, a full-stack developer specializing in Next.js, Node.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="min-h-screen w-full relative bg-black">
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
            }}
          />

          <main className="relative">{children}</main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
