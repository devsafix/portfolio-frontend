"use client";

import ComponentHeader from "@/components/shared/ComponentHeader";
import { Button } from "@/components/ui/button";
import { TAbout } from "@/types";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 100,
    },
  },
};

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

export default function About({ aboutData }: { aboutData: TAbout | null }) {
  // Use fetched data with sensible fallbacks
  const journeyPoints = [
    { text: aboutData?.careerSummary || "Loading career summary..." },
    { text: aboutData?.interestText || "Loading interests..." },
    { text: aboutData?.goalText || "Loading professional goals..." },
  ];

  return (
    <div className="py-10" id="about">
      <ComponentHeader
        title="About My Journey"
        subTitle="Discover my path as a passionate full-stack developer, constantly evolving with modern technologies and exploring the intersection of development and AI automation."
      />

      <div className="mt-10 max-w-6xl mx-auto px-4 grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-8">
        {/* Left Side: Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 rounded-xl bg-card p-6 text-center shadow-md lg:col-span-1"
        >
          <div className="relative">
            <Image
              src="https://i.ibb.co.com/R4zPgWL9/devsafix.webp"
              alt="Kawser"
              width={120}
              height={120}
              className="rounded-full border-4 border-primary/50 object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Kawser</h2>
            <p className="text-md text-primary">Full Stack Developer</p>
            <p className="text-sm text-white/60">Dhaka, Bangladesh</p>
          </div>
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-full text-white/70 transition-colors hover:bg-accent hover:text-primary"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <Link href={"#contact"} className="w-full">
            <Button className="mt- w-full">Get In Touch</Button>
          </Link>
        </motion.div>

        {/* Right Side: Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative lg:col-span-2"
        >
          {/* The vertical timeline bar */}
          <div className="absolute left-3 top-2 h-full w-0.5 -translate-x-1/2 bg-border" />

          <div className="ml-8 flex flex-col gap-12">
            {journeyPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-primary" />
                <p className="text-md leading-relaxed text-white/60">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
