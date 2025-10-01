"use client";

import { TProject } from "@/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Globe, Server } from "lucide-react";

// Animation variants for the container to orchestrate staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for each individual card
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

type ProjectGridProps = {
  projects: TProject[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {projects?.slice(0, 4)?.map((project) => (
        <motion.div
          key={project.id}
          variants={cardVariants as Variants}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="group flex flex-col overflow-hidden transition-all duration-300 h-full">
            <CardHeader className="p-0">
              <div className="overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-[200px] md:h-[300px] aspect-[3/2] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="text-2xl font-bold text-card-foreground mb-3 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-3 grid grid-cols-3 md:grid-cols-4 gap-3">
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={project.liveSite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="size-4" /> Live
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={project.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-4" /> Client
                </Link>
              </Button>
              {project.githubBackend && (
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={project.githubBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Server className="size-4" /> Server
                  </Link>
                </Button>
              )}
              <Button asChild className="w-full col-span-3 md:col-span-1 md:col-start-4">
                <Link href={`/projects/${project.id}`}>
                  Details <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
