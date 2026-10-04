import { Skeleton } from "@/components/ui/skeleton";

function TrainCardSkeleton() {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex-center justify-between">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-2/3" />
      <div className="flex-center justify-between gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-28 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </article>
  );
}

export default function Loading() {
  return (
    <main className="max-body flex animate-in flex-col gap-5 py-6 fade-in">
      {/* Page head */}
      <section className="flex flex-col items-center gap-1 text-center">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-56" />
      </section>

      {/* Search bar */}
      <Skeleton className="h-12 w-full rounded-xl" />

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TrainCardSkeleton key={i} />
        ))}
      </section>
    </main>
  );
}
