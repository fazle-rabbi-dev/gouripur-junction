import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth";

const LOGIN = "/admin/login";
const DASHBOARD = "/admin/dashboard";

async function validAccess(req: NextRequest) {
  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return false;
  try {
    await verifyAccessToken(token);
    return true;
  } catch {
    return false;
  }
}

async function refreshUsername(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get(REFRESH_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = await verifyRefreshToken(token);
    return String(payload.sub ?? "");
  } catch {
    return null;
  }
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already on login page: send authenticated users to dashboard.
  if (pathname === LOGIN || pathname.startsWith(`${LOGIN}/`)) {
    if (await validAccess(req)) {
      return NextResponse.redirect(new URL(DASHBOARD, req.url));
    }
    const username = await refreshUsername(req);
    if (username) {
      const res = NextResponse.redirect(new URL(DASHBOARD, req.url));
      res.cookies.set(ACCESS_COOKIE, await signAccessToken(username), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_MAX_AGE,
      });
      return res;
    }
    return NextResponse.next();
  }

  // Protected admin pages.
  if (await validAccess(req)) return NextResponse.next();

  const username = await refreshUsername(req);
  if (username) {
    const res = NextResponse.next();
    res.cookies.set(ACCESS_COOKIE, await signAccessToken(username), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_MAX_AGE,
    });
    return res;
  }

  return NextResponse.redirect(new URL(LOGIN, req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
