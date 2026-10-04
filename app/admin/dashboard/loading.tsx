import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-body py-6">
      <div className="grid min-w-0 gap-4" aria-busy="true" aria-label="লোড হচ্ছে">
        {/* Header skeleton */}
        <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="grid min-w-0 gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg" />
        </Card>

        {/* Stats skeleton */}
        <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-7 w-12" />
            </Card>
          ))}
        </div>

        {/* Tabs skeleton */}
        <div className="mb-4 flex gap-2 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-32 shrink-0 rounded-md" />
          ))}
        </div>

        {/* Content skeleton */}
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <div className="mt-3 grid gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
