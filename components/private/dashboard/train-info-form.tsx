"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { TrainDTO } from "@/lib/types/train";

export function TrainInfoForm({
  trains,
  onSave,
}: {
  trains: TrainDTO[];
  onSave: (code: string, detailsBn: string[]) => Promise<boolean>;
}) {
  // Local bullet drafts per train - only sent to DB on Save click.
  const [drafts, setDrafts] = useState<Record<string, string[]>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [savedCode, setSavedCode] = useState<string | null>(null);

  if (trains.length === 0) {
    return (
      <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
        <h2 className="heading-6">Static train information (rendered in Train Info view)</h2>
        <p className="mt-3 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          ডাটাবেজে কোনো ট্রেন পাওয়া যায়নি।
        </p>
      </Card>
    );
  }

  const listOf = (t: TrainDTO) => drafts[t.code] ?? t.detailsBn ?? [];
  const isDirty = (t: TrainDTO) => {
    const original = t.detailsBn ?? [];
    const current = listOf(t);
    return (
      current.length !== original.length ||
      current.some((b, i) => b !== original[i])
    );
  };

  const addBullet = (t: TrainDTO) => {
    const raw = (inputs[t.code] ?? "").trim();
    if (!raw) return;
    const current = listOf(t);
    if (current.includes(raw)) return;
    setDrafts({ ...drafts, [t.code]: [...current, raw] });
    setInputs({ ...inputs, [t.code]: "" });
  };

  const removeBullet = (t: TrainDTO, index: number) => {
    const current = listOf(t);
    setDrafts({ ...drafts, [t.code]: current.filter((_, i) => i !== index) });
  };

  return (
    <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
      <h2 className="heading-6">Static train information (rendered in Train Info view)</h2>

      <div className="mt-4 grid gap-6">
        {trains.slice(0, 11).map((t) => {
          const bullets = listOf(t);
          return (
            <div key={t.code} className="grid gap-2">
              <Label htmlFor={`details-${t.code}`} className="text-muted-foreground">
                {t.codeBn} — {t.nameBn}
              </Label>

              {/* Added bullets as removable tags */}
              {bullets.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {bullets.map((b, i) => (
                    <li
                      key={`${t.code}-${i}`}
                      className="flex max-w-full items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-sm"
                    >
                      <span className="min-w-0 break-words">{b}</span>
                      <button
                        type="button"
                        aria-label="মুছুন"
                        onClick={() => removeBullet(t, i)}
                        className="shrink-0 rounded-full p-0.5 text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-3.5" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Type + Enter to add locally */}
              <Input
                id={`details-${t.code}`}
                placeholder="বুলেট লিখে Enter চাপুন..."
                value={inputs[t.code] ?? ""}
                onChange={(e) => setInputs({ ...inputs, [t.code]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBullet(t);
                  }
                }}
              />

              {isDirty(t) && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-green-800 text-white hover:bg-green-700"
                    onClick={async () => {
                      const ok = await onSave(t.code, bullets);
                      if (!ok) return;
                      setSavedCode(t.code);
                      setTimeout(() => setSavedCode(null), 1500);
                    }}
                  >
                    {savedCode === t.code ? "Saved" : "Save info"}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
