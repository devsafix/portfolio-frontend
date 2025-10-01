"use client";

import { TProject } from "@/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function AllProjectsGrid({
  projects,
}: {
  projects: TProject[];
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.length > 0 ? (
        projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants as Variants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={`/projects/${project.id}`} className="block h-full">
              <Card className="group flex flex-col overflow-hidden h-full transition-all duration-300 hover:border-primary/60 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="overflow-hidden relative aspect-video">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-primary font-semibold flex items-center">
                    View Details <ArrowUpRight className="ml-1 size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          <p>No projects found for this category.</p>
        </div>
      )}
    </motion.div>
  );
}
