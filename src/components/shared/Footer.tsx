"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { Logo } from "@/assets/icon/logo";

// Social links data
const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="size-5" />,
    url: "https://github.com/devsafix",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="size-5" />,
    url: "https://linkedin.com/in/devsafix",
  },
  {
    name: "Twitter",
    icon: <Twitter className="size-5" />,
    url: "https://twitter.com/devsafix",
  },
  {
    name: "Facebook",
    icon: <Facebook className="size-5" />,
    url: "https://facebook.com/devsafix",
  },
];

// Navigation links data
const navLinks = [
  { name: "Home", href: "/#banner" },
  { name: "About Me", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
  { name: "All Projects", href: "/projects" },
  { name: "All Blogs", href: "/blogs" },
];

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-10 md:mt-20 border-t"
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <Link href="/" aria-label="home" className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} devsafix. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
