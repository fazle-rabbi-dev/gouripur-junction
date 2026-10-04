import { Skeleton } from "@/components/ui/skeleton";

function TrainInfoCardSkeleton() {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-1.5 py-1 pl-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <Skeleton className="h-6 w-36 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </article>
  );
}

export default function Loading() {
  return (
    <main className="max-body flex animate-in flex-col gap-5 py-6 fade-in">
      {/* Page head */}
      <section className="flex-center justify-between gap-3">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-8 w-32 rounded-lg" />
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TrainInfoCardSkeleton key={i} />
        ))}
      </section>
    </main>
  );
}
