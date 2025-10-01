import ComponentHeader from "@/components/shared/ComponentHeader";
import { TProject } from "@/types";
import { Metadata } from "next";
import ProjectTabs from "@/components/module/Projects/ProjectTabs";

// SEO Metadata for the main projects page
export const metadata: Metadata = {
  title: "All Projects | Kawser Ferdous Safi",
  description:
    "Explore a collection of my projects, showcasing my skills in full-stack development, Next.js, and modern web technologies.",
};

async function getProjects(tag?: string) {
  let url = `${process.env.NEXT_PUBLIC_BASE_API}/projects`;
  if (tag) {
    url += `?tag=${tag}`;
  }

  console.log(tag);

  try {
    const res = await fetch(url, {
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

export default async function AllProjectsPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const activeTag = searchParams?.tag;
  const projects = await getProjects(activeTag);

  return (
    <div className="py-20 md:py-28">
      <ComponentHeader
        title="My Creative Portfolio"
        subTitle="A curated collection of my work. Use the tabs to filter projects by category and explore what I've built."
      />
      <div className="mt-10 max-w-6xl mx-auto px-4">
        <ProjectTabs projects={projects} />
      </div>
    </div>
  );
}
