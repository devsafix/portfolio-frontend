import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TBlog, TProject } from "@/types";
import { cookies } from "next/headers";
import { LayoutGrid, Newspaper } from "lucide-react";

// Fetcher functions to get counts from your backend
async function getStats(cookie: string | undefined) {
  const headers = { cookie: cookie || "" };
  const projectsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects`,
    { headers }
  );
  const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    headers,
  });

  const projectsData = await projectsRes.json();
  const blogsData = await blogsRes.json();

  return {
    projects: (projectsData?.data as TProject[])?.length || 0,
    blogs: (blogsData?.data as TBlog[])?.length || 0,
  };
}

const DashboardHomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  const stats = await getStats(
    token ? `accessToken=${token.value}` : undefined
  );

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">
              Projects currently showcased.
            </p>
          </CardContent>
        </Card>
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogs}</div>
            <p className="text-xs text-muted-foreground">
              Articles you have published.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardHomePage;
