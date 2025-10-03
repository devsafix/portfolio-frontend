import z from "zod";

export type TProject = {
  id: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  thumbnail: string;
  liveSite: string;
  githubClient?: string | null;
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

export type TAbout = {
  id: "singleton";
  heroText: string;
  careerSummary: string;
  interestText: string;
  goalText: string;
  resumeLink: string;
  createdAt: string;
  updatedAt: string;
};

// Zod schema for validation
export const aboutSchema = z.object({
  heroText: z.string().min(1, "Hero text cannot be empty."),
  careerSummary: z.string().min(1, "Career summary cannot be empty."),
  interestText: z.string().min(1, "Interest text cannot be empty."),
  goalText: z.string().min(1, "Goal text cannot be empty."),
  resumeLink: z.string().url("Must be a valid URL."),
});
