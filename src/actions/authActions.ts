"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

// Define the validation schema for the login form
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

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
    }
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // If login is successful, redirect to the dashboard
  redirect("/dashboard");
}
