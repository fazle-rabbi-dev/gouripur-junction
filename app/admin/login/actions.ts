"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  signAccessToken,
  signRefreshToken,
} from "@/lib/auth";
import { env } from "@/lib/env";

export type LoginState = {
  ok: boolean;
  message: string;
};

function validate(username: string, password: string): string | null {
  if (!username.trim()) return "Username is required.";
  if (!password) return "Password is required.";
  if (password.length < 4) return "Password must be at least 4 characters.";
  return null;
}

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const error = validate(username, password);
  if (error) return { ok: false, message: error };

  if (username.trim() !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return { ok: false, message: "Invalid credentials." };
  }

  const name = username.trim();
  const access = await signAccessToken(name);
  const refresh = await signRefreshToken(name);

  const store = await cookies();
  const secure = process.env.NODE_ENV === "production";
  store.set(ACCESS_COOKIE, access, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  store.set(REFRESH_COOKIE, refresh, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_MAX_AGE,
  });

  redirect("/admin/dashboard");
}
