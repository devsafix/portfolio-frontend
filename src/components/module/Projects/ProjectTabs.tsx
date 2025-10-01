"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProject } from "@/types";
import AllProjectsGrid from "./AllProjectsGrid";

const projectTabs = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "Full-Stack" },
  { label: "Next.js", value: "Next.js" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
];

export default function ProjectTabs({ projects }: { projects: TProject[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag") || "all";

  const handleTabChange = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag === "all") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }

    // Use router.replace for a cleaner browser history
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      defaultValue={activeTag}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <div className="flex justify-center mb-10">
        <TabsList className="h-auto p-2 bg-card border flex-wrap">
          {projectTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-6 py-2 rounded-full text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md text-white/70 hover:text-white/80"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Render the new, dedicated grid for this page */}
      <AllProjectsGrid projects={projects} />
    </Tabs>
  );
}
