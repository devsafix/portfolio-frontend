"use client";

import { TBlog } from "@/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Animation variants for the container to orchestrate the stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation variants for each blog card
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

type BlogGridProps = {
  blogs: TBlog[];
};

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {blogs.map((blog) => (
        <motion.div
          key={blog.id}
          variants={cardVariants as Variants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* The entire card is a clickable link for better UX */}
          <Link href={`/blogs/${blog.slug}`} className="block h-full">
            <Card className="group flex flex-col overflow-hidden h-full transition-all duration-300 hover:border-primary/60 hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="overflow-hidden">
                  <Image
                    src={blog.thumbnail || "/placeholder-image.jpg"}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="object-cover w-full aspect-video transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-1">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {blog.metaDescription}
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
