"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { loginSchema } from "@/types";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message || "Invalid credentials" };
    }

    // The backend sets the cookie in the response, but we need to manually
    // set it in Next.js because Server Actions don't auto-forward cookies
    if (data.data?.accessTokenPortfolio) {
      const cookieStore = await cookies();

      cookieStore.set("accessTokenPortfolio", data.data.accessTokenPortfolio, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2592000000,
        path: "/",
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessTokenPortfolio");

    // Call backend logout with the cookie
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: `accessTokenPortfolio=${token?.value}`,
      },
      credentials: "include",
    });

    // Delete the cookie from Next.js
    cookieStore.delete("accessTokenPortfolio");

    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}

export async function checkAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");
  return !!token;
}
