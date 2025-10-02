import z from "zod";

export type TProject = {
  id: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  thumbnail: string;
  liveSite: string;
  githubClient: string;
  githubBackend?: string | null;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
};

export type TBlog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string | null;
  tags: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Validation schema for the login form
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Zod schema for blog validation
export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().url("Must be a valid URL").or(z.literal("")),
  tags: z
    .string()
    .min(1, "Add at least one tag")
    .transform((val) => val.split(",").map((tag) => tag.trim())),
  metaTitle: z.string(),
  metaDescription: z.string(),
});
