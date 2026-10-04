import { cn } from "@/lib/utils";
import type { Train } from "@/lib/data/trains";

const TYPE_BADGE: Record<Train["type"], string> = {
  intercity: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  local: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  commuter: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

const TYPE_DOT: Record<Train["type"], string> = {
  intercity: "bg-blue-400",
  local: "bg-pink-400",
  commuter: "bg-orange-400",
};

const TYPE_EN: Record<Train["type"], string> = {
  intercity: "INTERCITY",
  local: "LOCAL",
  commuter: "COMMUTER",
};

export function TrainInfoCard({ train }: { train: Train }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      {/* Name + type */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-bold">{train.nameBn}</h2>
        <span
          className={cn(
            "flex-center shrink-0 gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            TYPE_BADGE[train.type],
          )}
        >
          <span className={cn("size-1.5 rounded-full", TYPE_DOT[train.type])} />
          {TYPE_EN[train.type]}
        </span>
      </div>

      {/* Code + route */}
      <p className="text-xs text-muted-foreground">
        #{train.codeBn} • {train.routeBn}
      </p>

      {/* Bullet details */}
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {train.detailsBn.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      {/* Schedule chips */}
      <div className="mt-auto flex flex-wrap gap-2 pt-1 text-xs">
        <span className="rounded-md border border-border bg-muted px-2 py-1">
          {train.fromBn} {train.arrivalBn} → {train.departureBn}
        </span>
        <span className="rounded-md border border-border bg-muted px-2 py-1">
          বন্ধ: {train.offDayBn}
        </span>
      </div>
    </article>
  );
}
