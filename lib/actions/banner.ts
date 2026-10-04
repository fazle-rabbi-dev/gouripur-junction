"use server"

import { revalidatePath, updateTag } from "next/cache"
import { cookies } from "next/headers"

import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth"
import { dbConnect } from "@/lib/db/connect"
import { logger } from "@/lib/logger"
import { BannerModel, type BannerDoc } from "@/lib/models/Banner"

import type { BannerDTO, BannerInput } from "@/lib/types/banner"

type Result = { ok: true; banner: BannerDTO } | { ok: false; error: string }

// Only admin (valid access or refresh JWT cookie) may mutate the banner.
async function requireAdmin(): Promise<boolean> {
  const jar = await cookies()
  const access = jar.get(ACCESS_COOKIE)?.value
  if (access) {
    try {
      await verifyAccessToken(access)
      return true
    } catch {
      // fall through to refresh token
    }
  }
  const refresh = jar.get(REFRESH_COOKIE)?.value
  if (!refresh) return false
  try {
    await verifyRefreshToken(refresh)
    return true
  } catch {
    return false
  }
}

function toDTO(d: BannerDoc): BannerDTO {
  return {
    _id: String(d._id),
    message: d.message,
    active: d.active,
    expiresAt: new Date(d.expiresAt).toISOString(),
    createdAt: d.createdAt?.toISOString() ?? "",
    updatedAt: d.updatedAt?.toISOString() ?? "",
  }
}

export async function saveBanner(input: BannerInput): Promise<Result> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" }
  if (!input.message?.trim())
    return { ok: false, error: "Message খালি রাখা যাবে না" }
  const expires = new Date(input.expiresAt)
  if (Number.isNaN(expires.getTime()))
    return { ok: false, error: "ভুল expiry তারিখ" }

  try {
    await dbConnect()
    const doc = await BannerModel.findOneAndUpdate(
      { key: "urgent" },
      {
        $set: {
          key: "urgent",
          message: input.message.trim(),
          active: input.active,
          expiresAt: expires,
        },
      },
      { new: true, upsert: true, runValidators: true }
    )
    updateTag("banner")
    return { ok: true, banner: toDTO(doc) }
  } catch (e) {
    logger.error("saveBanner failed:", e)
    return { ok: false, error: "ব্যানার সংরক্ষণ করা যায়নি" }
  }
}
