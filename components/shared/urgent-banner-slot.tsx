import { cacheLife, cacheTag } from "next/cache"

import { getBanner } from "@/lib/get-banner"
import { logger } from "@/lib/logger"
import { UrgentBanner } from "./urgent-banner"
import { connection } from "next/server"

// Server slot: reads the admin-controlled banner from DB.
// Renders nothing when switched off, unsaved, or past expiry.
export async function UrgentBannerSlot() {
  await connection()
  await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate network latency

  const banner = await getBanner().catch((err) => {
    logger.error("Failed to load banner from DB:", err)
    return null
  })

  if (!banner) return null

  const until = `until ${new Date(banner.expiresAt).toLocaleString()}`

  return (
    <UrgentBanner
      id={`${banner._id}-${banner.updatedAt}`}
      message={banner.message}
      until={until}
    />
  )
}
