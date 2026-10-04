"use client";

import { useState } from "react";
import { Search, TrainFront } from "lucide-react";

import type { Train } from "@/lib/types/train";
import { toBnDigits } from "@/lib/bn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrainCard } from "./train-card";

const TYPE_OPTIONS = [
  { value: "all", label: "সব ধরন" },
  { value: "intercity", label: "আন্তঃনগর" },
  { value: "local", label: "লোকাল" },
  { value: "commuter", label: "কমিউটার" },
] as const;

const ROUTE_OPTIONS = [
  { value: "all", label: "সব রুট" },
  { value: "ময়মনসিংহ", label: "গৌরীপুর → ময়মনসিংহ" },
  { value: "জারিয়া", label: "গৌরীপুর → জারিয়া" },
  { value: "মোহনগঞ্জ", label: "গৌরীপুর → মোহনগঞ্জ" },
  { value: "চট্টগ্রাম", label: "গৌরীপুর → চট্টগ্রাম" },
  { value: "ভৈরব", label: "গৌরীপুর → ভৈরব" },
] as const;

export function ScheduleExplorer({ trains }: { trains: Train[] }) {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [route, setRoute] = useState<string>("all");

  const q = query.trim();

  const filtered = trains.filter((t) => {
    if (type !== "all" && t.type !== type) return false;
    if (route !== "all" && t.toBn !== route) return false;
    if (!q) return true;
    const hay = `${t.code} ${t.codeBn} ${t.nameBn} ${t.routeBn} ${t.fromBn} ${t.toBn}`;
    return hay.includes(q);
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Search bar */}
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(input);
        }}
        className="flex-center gap-2 rounded-xl border border-border bg-card p-2 pl-4"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value === "") setQuery("");
          }}
          placeholder="কোড, নাম বা রুট লিখুন — যেমন ৭৩৫ বা চট্টগ্রাম"
          aria-label="ট্রেন খুঁজুন"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="flex-center shrink-0 gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Search className="size-4" />
          খুঁজুন
        </button>
      </form>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <span className="shrink-0 text-xs text-muted-foreground">ধরন</span>
          <Select value={type} onValueChange={(v) => setType(v ?? "all")}>
            <SelectTrigger className="w-full border-0 bg-transparent shadow-none">
              <SelectValue placeholder="সব ধরন" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="flex-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <span className="shrink-0 text-xs text-muted-foreground">রুট</span>
          <Select value={route} onValueChange={(v) => setRoute(v ?? "all")}>
            <SelectTrigger className="w-full border-0 bg-transparent shadow-none">
              <SelectValue placeholder="সব রুট" />
            </SelectTrigger>
            <SelectContent>
              {ROUTE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      {/* Section head */}
      <div className="flex-center justify-between">
        <h2 className="heading-5 flex-center gap-2">
          <TrainFront className="size-5 text-primary" />
          ট্রেনসমূহ
        </h2>
        <p className="text-xs text-muted-foreground">
          {toBnDigits(filtered.length)}টি পাওয়া গেছে
        </p>
      </div>

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <TrainCard key={t.code} train={t} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          কোনো ট্রেন পাওয়া যায়নি
        </p>
      )}
    </div>
  );
}
