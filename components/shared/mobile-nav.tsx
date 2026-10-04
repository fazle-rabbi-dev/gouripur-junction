"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Calendar, Info, MessageCircle, Moon, Sun, UserCog } from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "সময়সূচি", Icon: Calendar },
  { href: "/trains", label: "ট্রেনের তথ্য", Icon: Info },
  { href: "/posts", label: "পোস্ট", Icon: MessageCircle },
  { href: "/admin/login", label: "অ্যাডমিন", Icon: UserCog },
];

export function MobileNav() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/80 backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-xs",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "লাইট থিমে বদলান" : "ডার্ক থিমে বদলান"}
            className="flex w-full flex-col items-center justify-center gap-1 py-2.5 text-xs text-muted-foreground"
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            <span>থিম</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
