import Link from "next/link"

import { getTrains } from "@/lib/get-trains"
import { logger } from "@/lib/logger"
import { TrainInfoCard } from "@/components/public/trains/train-info-card"
import { cacheLife, cacheTag } from "next/cache"

export const metadata = {
  title: "ট্রেনের তথ্য | গৌরীপুর জংশন",
  description: "গৌরীপুর জংশনের সব ট্রেনের সাধারণ বিবরণ",
}

export default async function TrainsPage() {
  "use cache"
  cacheLife("weeks")
  cacheTag("trains")

  const trains = await getTrains().catch((err) => {
    logger.error("Failed to load trains from DB:", err)
    return []
  })

  return (
    <main className="max-body flex flex-col gap-5 py-6">
      {/* Page head */}
      <section className="flex-center justify-between gap-3">
        <h1 className="heading-4">ট্রেনের তথ্য — সাধারণ বিবরণ</h1>
        <Link
          href="/"
          className="shrink-0 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          ← সময়সূচিতে ফিরুন
        </Link>
      </section>

      {/* Cards */}
      {trains.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trains.map((t) => (
            <TrainInfoCard key={t.code} train={t} />
          ))}
        </section>
      ) : (
        <section className="rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-sm font-semibold">
            কোনো ট্রেনের তথ্য পাওয়া যায়নি
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ডাটাবেজে এখনো কোনো ট্রেনের বিবরণ যোগ করা হয়নি। অনুগ্রহ করে পরে আবার
            চেষ্টা করুন।
          </p>
        </section>
      )}
    </main>
  )
}
