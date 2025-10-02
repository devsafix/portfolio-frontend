/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

// Zod schema for robust validation
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Must be a valid URL"),
  liveSite: z.string().url("Must be a valid URL"),
  githubClient: z.string().url("Must be a valid URL"),
  githubBackend: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  technologies: z
    .string()
    .min(1, "Add at least one technology")
    .transform((val) => val.split(",").map((tech) => tech.trim())),
  features: z
    .string()
    .min(1, "Add at least one feature")
    .transform((val) => val.split(",").map((feat) => feat.trim())),
  tags: z
    .string()
    .min(1, "Add at least one tag")
    .transform((val) => val.split(",").map((tag) => tag.trim())),
});

// CREATE action
export async function createProjectAction(
  values: z.infer<typeof projectSchema>
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token?.value}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Failed to create project.",
      };
    }

    revalidateTag("projects");
    return {
      success: true,
      message: "Project created successfully!",
      data: data.data,
    };
  } catch (error) {
    return { success: false, message: "Something went wrong." };
  }
}

// UPDATE action
export async function updateProjectAction(
  id: string,
  values: z.infer<typeof projectSchema>
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${token?.value}`,
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Failed to update project.",
      };
    }

    revalidateTag("projects");
    return { success: true, message: "Project updated successfully!" };
  } catch (error) {
    return { success: false, message: "Something went wrong." };
  }
}


