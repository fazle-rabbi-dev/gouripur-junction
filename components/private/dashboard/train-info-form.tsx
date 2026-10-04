"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Train } from "@/@types/admin";

export function TrainInfoForm({
  trains,
  onSave,
}: {
  trains: Train[];
  onSave: (code: string, description: string) => void;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savedCode, setSavedCode] = useState<string | null>(null);

  return (
    <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
      <h2 className="heading-6">Static train information (rendered in Train Info view)</h2>

      <div className="mt-4 grid gap-5">
        {trains.slice(0, 11).map((t) => {
          const val = drafts[t.code] ?? t.description ?? "";
          const dirty = (drafts[t.code] ?? null) !== null && drafts[t.code] !== (t.description ?? "");
          return (
            <div key={t.code} className="grid gap-2">
              <Label htmlFor={`info-${t.code}`} className="text-muted-foreground">
                {t.code} — {t.name}
              </Label>
              <Textarea
                id={`info-${t.code}`}
                value={val}
                onChange={(e) => setDrafts({ ...drafts, [t.code]: e.target.value })}
              />
              {dirty && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-green-800 text-white hover:bg-green-700"
                    onClick={() => {
                      onSave(t.code, val);
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
