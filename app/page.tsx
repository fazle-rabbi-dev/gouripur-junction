import { TRAINS } from "@/lib/data/trains";
import { toBnDigits } from "@/lib/bn";
import { ScheduleExplorer } from "@/components/public/home/schedule-explorer";

export const metadata = {
  title: "আজকের সময়সূচি | গৌরীপুর জংশন",
  description: "গৌরীপুর জংশন থেকে ছাড়ে এমন সব ট্রেনের সময়সূচি",
};

export default function Page() {
  return (
    <main className="max-body flex flex-col gap-5 py-6">
      {/* Page head */}
      <section className="flex flex-col items-center gap-1 text-center">
        <h1 className="heading-4">আজকের সময়সূচি</h1>
        <p className="text-xs text-muted-foreground">
          {toBnDigits(TRAINS.length)}টি ট্রেন • গৌরীপুর জংশন থেকে ছাড়ে
        </p>
      </section>

      <ScheduleExplorer />
    </main>
  );
}
