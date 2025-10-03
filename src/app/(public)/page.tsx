import AboutSection from "@/components/module/Home/AboutSection";
import BestProjects from "@/components/module/Home/BestProjects";
import Contact from "@/components/module/Home/Contact";
import Faq from "@/components/module/Home/Faq";
import HeroSection from "@/components/module/Home/HeroSection";
import RecentBlogs from "@/components/module/Home/RecentBlogs";
import Skills from "@/components/module/Home/Skills";
import { Metadata } from "next";

// Detailed, keyword-rich metadata specifically for the homepage
export const metadata: Metadata = {
  title:
    "Kawser Ferdous Safi | Full-Stack Developer | Next.js & Node.js Expert",
  description:
    "Welcome to the portfolio of Kawser Ferdous Safi, a passionate full-stack developer specializing in building scalable web applications with Next.js, TypeScript, Node.js, PostgreSQL, and modern DevOps practices.",
  keywords: [
    "Full-Stack Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Kawser Ferdous Safi",
    "Portfolio",
    "Web Developer Bangladesh",
    "TypeScript",
    "PostgreSQL",
    "DevOps",
  ],
  openGraph: {
    title: "Kawser Ferdous Safi | Full-Stack Developer",
    description: "Building scalable and high-performance digital products.",
    url: "https://your-live-domain.com", // <-- IMPORTANT: Replace with your actual domain
    siteName: "Kawser Ferdous Safi Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawser Ferdous Safi | Full-Stack Developer",
    description: "Building scalable and high-performance digital products.",
    creator: "@devsafix",
    images: ["/og-image.png"], // The same Open Graph image
  },
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Skills />
      <BestProjects />
      <RecentBlogs />
      <Faq />
      <Contact />
    </div>
  );
}
