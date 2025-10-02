import ComponentHeader from "@/components/shared/ComponentHeader";
import { TBlog } from "@/types";
import { Metadata } from "next";
import BlogGrid from "@/components/module/Blogs/BlogGrid";
import BlogSearch from "@/components/module/Blogs/BlogSearch";

// Dynamic metadata for SEO
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { query?: string };
}): Promise<Metadata> {
  const query = searchParams.query;
  const title = query
    ? `Search results for "${query}"`
    : "All Blogs | Kawser Ferdous Safi";
  const description =
    "Explore articles on web development, technology, and my personal journey as a developer.";

  return { title, description };
}

// Data fetching function that includes the search term
async function getAllBlogs(searchTerm?: string): Promise<TBlog[]> {
  let url = `${process.env.NEXT_PUBLIC_BASE_API}/blogs`;
  if (searchTerm) {
    url += `?searchTerm=${searchTerm}`;
  }
  try {
    const res = await fetch(url, {
      next: { tags: ["blogs"] },
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    return data?.data as TBlog[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function AllBlogsPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const blogs = await getAllBlogs(searchParams.query);

  return (
    <div className="py-20 md:py-28">
      <ComponentHeader
        title="Welcome to My Blog"
        subTitle="Exploring ideas, sharing knowledge, and documenting my journey through the world of technology."
      />
      <div className="mt-10 max-w-6xl mx-auto px-4 space-y-10">
        <BlogSearch />
        {blogs && blogs.length > 0 ? (
          <BlogGrid blogs={blogs} />
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <h3 className="text-2xl font-semibold">No Blogs Found</h3>
            <p>
              It seems there are no blogs matching your search. Try a different
              term!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
