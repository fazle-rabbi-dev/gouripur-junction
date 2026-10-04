"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "লাইট থিমে বদলান" : "ডার্ক থিমে বদলান"}
      className={cn(
        "flex-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      <span>{isDark ? "লাইট মোড" : "ডার্ক মোড"}</span>
    </button>
  );
}
