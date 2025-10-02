import ComponentHeader from "@/components/shared/ComponentHeader";
import { TBlog } from "@/types";
import BlogGrid from "../Blogs/BlogGrid"; // Corrected path assuming this structure
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getRecentBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      next: {
        // Tagging this fetch for on-demand revalidation via server actions
        tags: ["blogs"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    return data?.data as TBlog[];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function RecentBlogs() {
  const blogs = await getRecentBlogs();

  return (
    <div className="py-10" id="blogs">
      <ComponentHeader
        title="My Latest Blogs"
        subTitle="Exploring ideas, sharing knowledge, and documenting my journey through the world of technology and development."
      />
      <div className="mt-10 max-w-6xl mx-auto px-4">
        {blogs && blogs?.length > 0 ? (
          <>
            <BlogGrid blogs={blogs.slice(0, 3)} />

            <div className="mt-10 flex items-center justify-center">
              <Button asChild className="px-20 py-5 w-44">
                <Link href="/blogs">
                  See All Blogs <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Could not load blogs at this time. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
