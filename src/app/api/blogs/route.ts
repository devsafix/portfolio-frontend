import { NextResponse } from "next/server";

export const dynamic = "force-static";

export const blogs = [
  {
    id: 6,
    title: "Sit quasi fuga Sed ",
    content: "Elit assumenda sapi",
    thumbnail: "https://www.mutojowudena.me.uk",
    isFeatured: true,
    tags: ["Libero", "consectetur"],
    views: 0,
    authorId: 1,
    createdAt: "2025-09-23T04:22:09.076Z",
    updatedAt: "2025-09-23T04:22:09.076Z",
    author: {
      id: 1,
      name: "Ayesha Rahman",
      email: "ayesha.rahman@example.com",
      picture: null,
      status: "ACTIVE",
    },
  },
  {
    id: 5,
    title: "Regex Patterns for Bangladeshi Phone Numbers",
    content:
      "Need to validate Bangladeshi phone numbers? Here's a regex pattern that handles common formats and edge cases.",
    thumbnail: "https://example.com/thumbnails/regex-phone.png",
    isFeatured: true,
    tags: ["Regex", "Validation", "Bangladesh", "JavaScript"],
    views: 200,
    authorId: 1,
    createdAt: "2025-09-23T04:21:26.725Z",
    updatedAt: "2025-09-23T04:21:26.725Z",
    author: {
      id: 1,
      name: "Ayesha Rahman",
      email: "ayesha.rahman@example.com",
      picture: null,
      status: "ACTIVE",
    },
  },
  {
    id: 4,
    title: "Regex Patterns for Bangladeshi Phone Numbers",
    content:
      "Need to validate Bangladeshi phone numbers? Here's a regex pattern that handles common formats and edge cases.",
    thumbnail: "https://example.com/thumbnails/regex-phone.png",
    isFeatured: true,
    tags: ["Regex", "Validation", "Bangladesh", "JavaScript"],
    views: 202,
    authorId: 4,
    createdAt: "2025-09-15T04:36:02.892Z",
    updatedAt: "2025-09-23T04:21:40.914Z",
    author: {
      id: 4,
      name: "Farhan Kabir",
      email: "farhan.kabir@example.com",
      picture: null,
      status: "ACTIVE",
    },
  },
  {
    id: 3,
    title: "Using Zod for Schema Validation in Express",
    content:
      "Zod makes runtime validation elegant and type-safe. Learn how to integrate it into your Express backend for robust user input handling.",
    thumbnail: null,
    isFeatured: false,
    tags: ["Express", "Zod", "Validation", "Backend"],
    views: 62,
    authorId: 3,
    createdAt: "2025-09-15T04:35:32.227Z",
    updatedAt: "2025-09-22T18:15:56.713Z",
    author: {
      id: 3,
      name: "Nusrat Jahan",
      email: "nusrat.jahan@example.com",
      picture: null,
      status: "ACTIVE",
    },
  },
  {
    id: 2,
    title: "Tailwind CSS Grid Layout Tips",
    content:
      "Mastering grid layouts with Tailwind CSS can transform your UI. Here's how to build responsive book displays and interactive components.",
    thumbnail: "https://example.com/thumbnails/tailwind-grid.png",
    isFeatured: false,
    tags: ["Tailwind", "CSS", "Design", "Grid"],
    views: 96,
    authorId: 2,
    createdAt: "2025-09-15T04:34:58.313Z",
    updatedAt: "2025-09-22T18:15:34.720Z",
    author: {
      id: 2,
      name: "Tanvir Hasan",
      email: "tanvir.hasan@example.com",
      picture: null,
      status: "ACTIVE",
    },
  },
  {
    id: 1,
    title: "Getting Started with TypeScript in React",
    content:
      "TypeScript adds powerful type safety to your React projects. In this post, we'll walk through setting up a React + TypeScript environment using Vite.",
    thumbnail: "https://example.com/thumbnails/typescript-react.png",
    isFeatured: true,
    tags: ["React", "TypeScript", "Vite", "Frontend"],
    views: 13,
    authorId: 2,
    createdAt: "2025-09-13T04:31:56.977Z",
    updatedAt: "2025-09-23T04:21:48.034Z",
    author: {
      id: 2,
      name: "Tanvir Hasan",
      email: "tanvir.hasan@example.com",
      picture: null,
      status: "ACTIVE",
    },
  },
];

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
  const data = await res.json();

  return Response.json(data);
}

export const POST = async (request: Request) => {
  const blog = await request.json();
  const newBlog = {
    ...blog,
    id: blogs.length + 1,
  };
  blogs.push(newBlog);

  return new NextResponse(JSON.stringify(newBlog), {
    status: 201,
    headers: {
      "Content-type": "application/json",
    },
  });
};
