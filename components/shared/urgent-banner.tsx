"use client";

import { useState } from "react";
import { Siren, X } from "lucide-react";

export function UrgentBanner({ message, until }: { message: string; until: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="max-body pt-4">
      <div
        role="alert"
        className="relative overflow-hidden rounded-xl border border-red-500/40 bg-card"
      >
        {/* Left accent */}
        <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-red-500" />

        <div className="flex items-center gap-3 py-3 pr-3 pl-5">
          <span className="flex-center size-10 shrink-0 self-center rounded-full bg-red-500/15 text-red-500">
            <Siren className="size-5" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-red-600 px-2.5 py-0.5 font-bold text-white">
                URGENT
              </span>
              <span className="text-muted-foreground">• {until}</span>
            </p>
            <p className="mt-1 font-semibold">{message}</p>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="ব্যানার বন্ধ করুন"
            className="flex-center size-8 shrink-0 self-center rounded-full border border-border text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
