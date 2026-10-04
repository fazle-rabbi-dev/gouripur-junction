"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import type { BannerDTO, BannerInput } from "@/lib/types/banner";

export function BannerForm({
  banner,
  saving,
  onSave,
}: {
  banner: BannerDTO;
  saving?: boolean;
  onSave: (b: BannerInput) => Promise<boolean>;
}) {
  const [form, setForm] = useState<BannerInput>({
    message: banner.message,
    active: banner.active,
    expiresAt: banner.expiresAt,
  });
  const [saved, setSaved] = useState(false);

  // datetime-local needs "YYYY-MM-DDTHH:mm", DB stores ISO.
  const toLocal = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
      <h2 className="heading-6">Homepage urgent banner</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Shown only when active and before expiry. Auto-hidden after expiry time.
      </p>

      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="banner-msg">Message</Label>
          <Input
            id="banner-msg"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="banner-expiry">Expiry (datetime)</Label>
            <Input
              id="banner-expiry"
              type="datetime-local"
              value={toLocal(form.expiresAt)}
              onChange={(e) =>
                setForm({
                  ...form,
                  expiresAt: new Date(e.target.value).toISOString(),
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="banner-active">Active</Label>
            <NativeSelect
              id="banner-active"
              value={form.active ? "on" : "off"}
              onChange={(e) => setForm({ ...form, active: e.target.value === "on" })}
            >
              <NativeSelectOption value="on">Active — show banner</NativeSelectOption>
              <NativeSelectOption value="off">Off — hide banner</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>

        <div>
          <Button
            onClick={async () => {
              const ok = await onSave(form);
              if (!ok) return;
              setSaved(true);
              setTimeout(() => setSaved(false), 1500);
            }}
            disabled={saving}
            className="bg-green-800 text-white hover:bg-green-700"
          >
            {saving ? "Saving..." : saved ? "Saved" : "Save banner"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
