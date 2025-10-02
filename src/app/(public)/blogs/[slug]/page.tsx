/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TBlog } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-10 md:pt-28">
      <article className="space-y-8">
        <Link
          href="/blogs"
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

        {/* Styled blog content */}
        <div className="mt-8 space-y-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-4xl font-bold mt-8 mb-4 text-white"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-3xl font-bold mt-6 mb-3 text-white"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-2xl font-semibold mt-5 mb-2 text-white"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-300 leading-relaxed mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside space-y-2 mb-4 text-gray-300"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside space-y-2 mb-4 text-gray-300"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-300 ml-4" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-white" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-gray-200" {...props} />
              ),
              code: ({
                node,
                inline,
                className,
                children,
                ...props
              }: {
                node?: unknown;
                inline?: boolean;
                className?: string;
                children?: React.ReactNode;
                [key: string]: any;
              }) => {
                return inline ? (
                  <code
                    className="px-1.5 py-0.5 rounded bg-gray-800 text-pink-400 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className={`block p-4 rounded-lg bg-gray-900 text-sm overflow-x-auto ${
                      className || ""
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4 border border-gray-700"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4"
                  {...props}
                />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
