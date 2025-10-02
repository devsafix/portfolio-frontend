/* eslint-disable @typescript-eslint/no-unused-vars */
import { TBlog } from "@/types";
import { cookies } from "next/headers";
import BlogsDataTable from "@/components/module/Dashboard/BlogsDataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Fetcher function to get all blogs for the dashboard
async function getAllBlogs() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      headers: { Cookie: `accessTokenPortfolio=${token?.value}` },
      cache: "no-store",
      next: { tags: ["blogs"] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data as TBlog[];
  } catch (error) {
    return [];
  }
}

const AllBlogs = async () => {
  const blogs = await getAllBlogs();

  return (
    <Card className="p-3 bg-card/40">
      <CardHeader>
        <CardTitle>Manage Blogs</CardTitle>
        <CardDescription>
          Here you can create, edit, and delete your blog posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BlogsDataTable blogs={blogs} />
      </CardContent>
    </Card>
  );
};

export default AllBlogs;
