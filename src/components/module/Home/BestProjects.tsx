import ComponentHeader from "@/components/shared/ComponentHeader";
import { TProject } from "@/types";
import ProjectGrid from "../Projects/ProjectGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getBestProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects?tag=top`,
      {
        next: {
          tags: ["projects"],
        },
      }
    );

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

export default async function BestProjects() {
  const projects = await getBestProjects();

  return (
    <div className="py-10" id="projects">
      <ComponentHeader
        title="Featured Projects"
        subTitle="Check out some of my development projects, that I'm most proud of, showcasing my skills and creativity."
      />
      <div className="mt-10 max-w-6xl mx-auto px-4">
        {projects && projects?.length > 0 ? (
          <>
            <ProjectGrid projects={projects.slice(0, 4)} />

            <div className="mt-10 flex items-center justify-center">
              <Button asChild className="px-20 py-5 w-44">
                <Link href="/projects">
                  See All Projects <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>
              Could not load featured projects at this time. Please check back
              later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
