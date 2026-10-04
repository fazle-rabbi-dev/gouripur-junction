"use client";

import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md md:hidden">
      <div className="flex-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex-center min-w-0 gap-2.5" aria-label="গৌরীপুর জংশন - হোম">
          <Image
            src="/logo.png"
            alt="গৌরীপুর জংশন লোগো"
            width={48}
            height={48}
            priority
            className="size-12 shrink-0 rounded-xl object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate text-base leading-tight font-bold">
              গৌরীপুর জংশন
            </span>
            <span className="block text-xs text-muted-foreground">
              Gouripur Junction
            </span>
          </span>
        </Link>

        <ThemeToggle iconOnly />
      </div>
    </header>
  );
}
