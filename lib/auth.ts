import { SignJWT, jwtVerify } from "jose";

import { env } from "./env";

export const ACCESS_COOKIE = "access-token";
export const REFRESH_COOKIE = "refresh-token";

export const ACCESS_MAX_AGE = 15 * 60; // 15min
export const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7days

const secret = () => new TextEncoder().encode(env.JWT_SECRET);

export function signAccessToken(username: string) {
  return new SignJWT({ sub: username, type: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret());
}

export function signRefreshToken(username: string) {
  return new SignJWT({ sub: username, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secret());
  if (payload.type !== "access") throw new Error("Not an access token");
  return payload;
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, secret());
  if (payload.type !== "refresh") throw new Error("Not a refresh token");
  return payload;
}
