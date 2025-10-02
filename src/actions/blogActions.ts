/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { blogSchema } from "@/types";

// CREATE action
export async function createBlogAction(values: z.infer<typeof blogSchema>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessTokenPortfolio=${token?.value}`,
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create blog.");

    revalidateTag("blogs");
    return {
      success: true,
      message: "Blog created successfully!",
      data: data.data,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// UPDATE action
export async function updateBlogAction(
  id: string,
  values: z.infer<typeof blogSchema>
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessTokenPortfolio=${token?.value}`,
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update blog.");

    revalidateTag("blogs");
    return { success: true, message: "Blog updated successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


