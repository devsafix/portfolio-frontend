import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TBlog, TProject } from "@/types";
import { cookies } from "next/headers";
import { LayoutGrid, Newspaper, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This type is for the user profile data from your /auth/me endpoint
type TUser = {
  id: string;
  email: string;
};

// Updated fetcher function to get stats and recent items
async function getDashboardData(cookie: string | undefined) {
  const headers = { cookie: cookie || "" };

  // Fetch all data in parallel for performance
  const [projectsRes, blogsRes, userRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      headers,
      cache: "no-store",
      next: { tags: ["projects"] },
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      headers,
      cache: "no-store",
      next: { tags: ["blogs"] },
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/me`, {
      headers,
      cache: "no-store",
    }),
  ]);

  const projectsData = await projectsRes.json();
  const blogsData = await blogsRes.json();
  const userData = await userRes.json();

  const projects: TProject[] = projectsData?.data || [];
  const blogs: TBlog[] = blogsData?.data || [];

  return {
    totalProjects: projects.length,
    totalBlogs: blogs.length,
    recentProject: projects[0] || null, // The first item is the most recent
    recentBlog: blogs[0] || null,
    user: (userData?.data as TUser) || null,
  };
}

const DashboardHomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");
  const data = await getDashboardData(
    token ? `accessTokenPortfolio=${token.value}` : undefined
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back,{" "}
          {data.user?.email ? data.user.email.split("@")[0] : "Kawser"}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a quick overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalProjects}</div>
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
            <div className="text-2xl font-bold">{data.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Articles you have published.
            </p>
          </CardContent>
        </Card>
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage</div>
            <p className="text-xs text-muted-foreground">
              Update your personal info.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-3 bg-card/40">
          <CardHeader>
            <CardTitle>Recent Project</CardTitle>
            <CardDescription>
              Your latest addition to your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex md:flex-row flex-col gap-2 items-center justify-between">
            {data.recentProject ? (
              <p className="font-semibold w-[250px] truncate">
                {data.recentProject.title}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No projects found.
              </p>
            )}
            <Button asChild variant="secondary">
              <Link href="/dashboard/all-projects">
                Manage Projects <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="p-3 bg-card/40">
          <CardHeader>
            <CardTitle>Recent Blog</CardTitle>
            <CardDescription>
              Your most recently published article.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex md:flex-row flex-col gap-2 items-center justify-between">
            {data.recentBlog ? (
              <p className="font-semibold w-[250px] truncate">
                {data.recentBlog.title}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">No blogs found.</p>
            )}
            <Button asChild variant="secondary">
              <Link href="/dashboard/all-blogs">
                Manage Blogs <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHomePage;
