import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Train } from "@/lib/data/trains";

const TYPE_STYLES: Record<Train["type"], string> = {
  intercity: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  local: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  commuter: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

const DOT_STYLES: Record<Train["type"], string> = {
  intercity: "bg-blue-400",
  local: "bg-pink-400",
  commuter: "bg-orange-400",
};

export function TrainCard({ train }: { train: Train }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      {/* Type + code */}
      <div className="flex-center justify-between">
        <span
          className={cn(
            "flex-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
            TYPE_STYLES[train.type],
          )}
        >
          <span className={cn("size-1.5 rounded-full", DOT_STYLES[train.type])} />
          {train.typeBn}
        </span>
        <span className="text-xs text-muted-foreground">#{train.codeBn}</span>
      </div>

      {/* Name */}
      <h3 className="text-base font-bold">{train.nameBn}</h3>

      {/* Route */}
      <div className="flex-center justify-between gap-2 text-sm">
        <span className="flex-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          {train.fromBn}
        </span>
        <span aria-hidden className="flex min-w-16 flex-1 items-center gap-1">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="flex-center justify-center size-6 shrink-0 rounded-full bg-primary/15 text-primary shadow-[0_0_10px_var(--primary)/30]">
            <MoveRight className="size-3.5" />
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/60" />
        </span>
        <span className="font-medium">{train.toBn}</span>
      </div>

      {/* Times */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-md border border-border bg-muted px-2 py-1">
          পৌঁছায় {train.arrivalBn}
        </span>
        <span className="rounded-md border border-border bg-muted px-2 py-1">
          ছাড়ে {train.departureBn}
        </span>
      </div>
    </article>
  );
}
