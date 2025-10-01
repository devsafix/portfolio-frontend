"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProject } from "@/types";
import ProjectGrid from "./ProjectGrid";

// Define the tabs
const projectTabs = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Next.js", value: "next-js" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
];

export default function ProjectTabs({ projects }: { projects: TProject[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag") || "all";

  const handleTabChange = (tag: string) => {
    const newTag = tag === "all" ? "" : tag;
    const params = new URLSearchParams(searchParams);

    if (newTag) {
      params.set("tag", newTag);
    } else {
      params.delete("tag");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      defaultValue={activeTag}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <div className="flex justify-center mb-8">
        <TabsList className="h-auto p-2 bg-card border flex-wrap">
          {projectTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-6 py-2 rounded-full text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* The ProjectGrid now displays all filtered projects in a 3-col layout */}
      <ProjectGrid projects={projects} columns={3} />
    </Tabs>
  );
}
