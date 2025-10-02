/* eslint-disable @typescript-eslint/no-unused-vars */
import { TBlog } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: { slug: string };
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogDetails(params.slug);
  return {
    title: blog?.metaTitle || blog?.title || "Blog Post",
    description: blog?.metaDescription,
    openGraph: {
      title: blog?.metaTitle || blog?.title || "Blog Post",
      description: blog?.metaDescription || "",
      images: [blog?.thumbnail || ""],
    },
  };
}

// Fetch a single blog's details
async function getBlogDetails(slug: string): Promise<TBlog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

// Pre-build all blog pages at build time for instant loads
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`);
  const blogs = await res.json();
  return blogs.data.map((blog: TBlog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailsPage({ params }: Props) {
  const blog = await getBlogDetails(params?.slug);

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Blog post not found.</h2>
        <Link href="/all-blogs" className="text-primary hover:underline">
          Return to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <article className="space-y-8">
        <Link
          href="/all-blogs"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to All Blogs
        </Link>

        {blog.thumbnail && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/70">
            <span>
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
}
