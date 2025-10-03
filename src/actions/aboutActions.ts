/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { aboutSchema } from "@/types";

// The server action to update the 'singleton' about entry
export async function updateAboutAction(values: z.infer<typeof aboutSchema>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      method: "POST", // The backend upserts, so POST is correct for create/update
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessTokenPortfolio=${token?.value}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update information.");
    }

    // Revalidate the 'about' tag to instantly update the public site
    revalidateTag("about");

    return {
      success: true,
      message: "About information updated successfully!",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
