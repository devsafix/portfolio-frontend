import ComponentHeader from "@/components/shared/ComponentHeader";
import { TProject } from "@/types";
import ProjectGrid from "../Projects/ProjectGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getRecentProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      next: {
        tags: ["projects"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    return data?.data as TProject[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function RecentProjects() {
  const projects = await getRecentProjects();

  return (
    // The id="projects" allows for anchor linking to this section
    <div className="py-10 md:py-16" id="projects">
      <ComponentHeader
        title="Recent Projects"
        subTitle="A showcase of my passion for development, where each project tells a story of dedication and creativity."
      />
      <div className="mt-10 max-w-6xl mx-auto px-4">
        {projects && projects?.length > 0 ? (
          <>
            <ProjectGrid projects={projects.slice(0, 4)} />

            <div className="mt-12 text-center">
              <Button asChild>
                <Link href="/all-projects">
                  See All Projects <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>
              Could not load projects at this time. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
