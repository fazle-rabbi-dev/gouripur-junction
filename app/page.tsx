import { toBnDigits } from "@/lib/bn"
import { getTrains } from "@/lib/get-trains"
import { logger } from "@/lib/logger"
import { ScheduleExplorer } from "@/components/public/home/schedule-explorer"
import { cacheLife, cacheTag } from "next/cache"

export const metadata = {
  title: "আজকের সময়সূচি | গৌরীপুর জংশন",
  description: "গৌরীপুর জংশন থেকে ছাড়ে এমন সব ট্রেনের সময়সূচি",
}

export default async function Page() {
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
      <section className="flex flex-col items-center gap-1 text-center">
        <h1 className="heading-4">আজকের সময়সূচি</h1>
        <p className="text-xs text-muted-foreground">
          {toBnDigits(trains.length)}টি ট্রেন • গৌরীপুর জংশন থেকে ছাড়ে
        </p>
      </section>

      {trains.length > 0 ? (
        <ScheduleExplorer trains={trains} />
      ) : (
        <section className="rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-sm font-semibold">
            কোনো ট্রেনের তথ্য পাওয়া যায়নি
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ডাটাবেজে এখনো কোনো ট্রেন যোগ করা হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা
            করুন।
          </p>
        </section>
      )}
    </main>
  )
}
