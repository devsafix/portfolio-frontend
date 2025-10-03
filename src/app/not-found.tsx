"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-8xl md:text-9xl font-bold text-primary tracking-tighter">
          404
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Oops! It seems you&apos;ve taken a wrong turn. The page you are
          looking for does not exist, has been moved, or is temporarily
          unavailable.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <Home className="size-4" />
            Return to Homepage
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
