/* eslint-disable @typescript-eslint/no-unused-vars */
import { TProject } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github, Server } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { projectId: string };
};

// Function to generate dynamic metadata for each project page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectDetails(params.projectId);
  return {
    title: `${project?.title || "Project"} | Kawser Ferdous Safi`,
    description: project?.description,
  };
}

// Function to fetch details for a single project (with caching)
async function getProjectDetails(id: string): Promise<TProject | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

// This function pre-builds all project pages at build time for performance
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`);
  const projects = await res.json();
  return projects.data.map((project: TProject) => ({
    projectId: project.id,
  }));
}

export default async function ProjectDetailsPage({ params }: Props) {
  const project = await getProjectDetails(params?.projectId);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Project not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <div className="space-y-8">
        {/* Project Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">
          {project.title}
        </h1>

        {/* Project Image */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Button asChild>
            <Link
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="size-4" /> Live Demo
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link
              href={project.githubClient}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" /> Client Code
            </Link>
          </Button>
          {project.githubBackend && (
            <Button asChild variant="secondary">
              <Link
                href={project.githubBackend}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Server className="size-4" /> Server Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
