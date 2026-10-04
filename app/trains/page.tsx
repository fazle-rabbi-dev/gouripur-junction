import Link from "next/link";

import { TRAINS } from "@/lib/data/trains";
import { TrainInfoCard } from "@/components/public/trains/train-info-card";

export const metadata = {
  title: "ট্রেনের তথ্য | গৌরীপুর জংশন",
  description: "গৌরীপুর জংশনের সব ট্রেনের সাধারণ বিবরণ",
};

export default function TrainsPage() {
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
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TRAINS.map((t) => (
          <TrainInfoCard key={t.code} train={t} />
        ))}
      </section>
    </main>
  );
}
