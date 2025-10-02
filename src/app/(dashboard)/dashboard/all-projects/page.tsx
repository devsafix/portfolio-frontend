/* eslint-disable @typescript-eslint/no-unused-vars */
import { TProject } from "@/types";
import { cookies } from "next/headers";
import ProjectsDataTable from "@/components/module/Dashboard/ProjectsDataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Fetcher function to get all projects for the dashboard
async function getAllProjects() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      headers: { Cookie: `accessToken=${token?.value}` },
      cache: "no-store", // Ensure fresh data on every visit to the dashboard
      next: { tags: ["projects"] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data as TProject[];
  } catch (error) {
    return [];
  }
}

const AllProjects = async () => {
  const projects = await getAllProjects();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Projects</CardTitle>
        <CardDescription>
          Here you can add, edit, and delete your portfolio projects.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectsDataTable projects={projects} />
      </CardContent>
    </Card>
  );
};

export default AllProjects;
