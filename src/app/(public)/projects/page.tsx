import ComponentHeader from "@/components/shared/ComponentHeader";
import { TProject } from "@/types";
import { Metadata } from "next";
import ProjectTabs from "@/components/module/Projects/ProjectTabs";

// This function can now generate dynamic metadata based on the tag
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { tag?: string };
}): Promise<Metadata> {
  const tag = searchParams.tag;
  const title = tag
    ? `${tag.replace("-", " ")} Projects | Kawser Ferdous Safi`
    : "All Projects | Kawser Ferdous Safi";
  const description = `Explore my collection of ${
    tag ? tag.replace("-", " ") : "web development"
  } projects.`;

  return { title, description };
}

async function getProjects(tag?: string): Promise<TProject[]> {
  let url = `${process.env.NEXT_PUBLIC_BASE_API}/projects`;
  // Important: only add the query param if a tag exists and is not 'all'
  if (tag && tag !== "all") {
    url += `?tag=${tag}`;
  }

  try {
    const res = await fetch(url, {
      next: { tags: ["projects"] },
    });

    if (!res.ok) throw new Error("Failed to fetch projects");

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
