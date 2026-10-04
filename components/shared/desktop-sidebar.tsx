"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Info, MessageCircle, UserCog } from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "সময়সূচি", Icon: Calendar },
  { href: "/trains", label: "ট্রেনের তথ্য", Icon: Info },
  { href: "/posts", label: "পোস্ট", Icon: MessageCircle },
  { href: "/admin/login", label: "অ্যাডমিন", Icon: UserCog },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col border-r border-border bg-card md:flex">
      {/* Brand */}
      <div className="flex-center gap-3 border-b border-border px-4 py-5">
        <Image
          src="/logo.png"
          alt="গৌরীপুর জংশন লোগো"
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-lg leading-tight font-bold">গৌরীপুর জংশন</p>
          <p className="text-xs text-muted-foreground">স্থাপিত ১৯১২</p>
        </div>
      </div>

      {/* Nav */}
      <nav aria-label="ডেস্কটপ নেভিগেশন" className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {ITEMS.map(({ href, label, Icon }) => {
            const active =
              pathname === href ||
              (href.startsWith("/admin") && pathname.startsWith("/admin"));
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">Gouripur Junction •</p>
      </div>
    </aside>
  );
}
