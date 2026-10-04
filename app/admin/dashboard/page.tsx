import type { Metadata } from "next"
import { cacheLife, cacheTag } from "next/cache"

import { getBanner } from "@/lib/get-banner"
import { getTrains } from "@/lib/get-trains"
import { logger } from "@/lib/logger"
import { Dashboard } from "@/components/private/dashboard/dashboard"
import { connection } from "next/server"

export const metadata: Metadata = {
  title: "Admin Dashboard - Gouripur Junction",
  description: "Manage banner, trains, schedules and post approvals.",
}

export default async function AdminDashboardPage() {
  await connection()

  const [trains, banner] = await Promise.all([
    getTrains().catch((err) => {
      logger.error("Failed to load trains from DB:", err)
      return []
    }),
    getBanner().catch((err) => {
      logger.error("Failed to load banner from DB:", err)
      return null
    }),
  ])

  return (
    <main className="max-body py-6">
      <section aria-label="Admin dashboard">
        <Dashboard initialTrains={trains} initialBanner={banner} />
      </section>
    </main>
  )
}
