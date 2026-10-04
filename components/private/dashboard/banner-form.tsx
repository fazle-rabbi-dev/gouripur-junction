"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import type { Banner } from "@/@types/admin";

export function BannerForm({
  banner,
  onSave,
}: {
  banner: Banner;
  onSave: (b: Banner) => void;
}) {
  const [form, setForm] = useState(banner);

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
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
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
            onClick={() => onSave(form)}
            className="bg-green-800 text-white hover:bg-green-700"
          >
            Save banner
          </Button>
        </div>
      </div>
    </Card>
  );
}
