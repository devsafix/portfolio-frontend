"use server";

import { loginSchema } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// The server action to handle the login process
export async function loginAction(values: z.infer<typeof loginSchema>) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Invalid credentials" };
    } else {
      return { success: true, message: data.message || "Login Successfully" };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function logoutAction() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
    method: "POST",
  });
  redirect("/login");
}

export async function checkAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  return !!token;
}
