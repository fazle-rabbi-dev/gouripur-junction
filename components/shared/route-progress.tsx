"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start bar on internal link click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="/"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("//")) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      setNavigating(true);
      setProgress(15);
    };
    const onPopState = () => {
      setNavigating(true);
      setProgress(15);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Creep toward 85% while navigating
  useEffect(() => {
    if (!navigating) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 85 ? p : p + Math.max(1, (85 - p) / 8)));
    }, 120);
    return () => clearInterval(id);
  }, [navigating]);

  // Complete when route actually changes
  const query = searchParams.toString();
  useEffect(() => {
    if (!navigating) return;
    setProgress(100);
    if (doneTimer.current) clearTimeout(doneTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    doneTimer.current = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, query]);

  // Safety: never stuck
  useEffect(() => {
    if (!navigating) return;
    const id = setTimeout(() => {
      setNavigating(false);
      setProgress(0);
    }, 4000);
    return () => clearTimeout(id);
  }, [navigating]);

  if (!navigating && progress === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
    >
      <div
        className="route-bar h-full rounded-r-full bg-primary shadow-[0_0_12px_var(--primary)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
