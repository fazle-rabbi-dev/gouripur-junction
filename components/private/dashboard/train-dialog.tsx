"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import type { Train } from "@/@types/admin";
import { ROUTES, TRAIN_TYPES } from "@/constants/admin-mock";

interface Props {
  open: boolean;
  editing: Train | null;
  onClose: () => void;
  onSave: (t: Train, isNew: boolean) => void;
}

const empty: Train = {
  code: "",
  name: "",
  type: "Local",
  route: ROUTES[0],
  arrival: "08:00",
  departure: "08:05",
  offDay: "বন্ধ নেই",
  description: "",
};

export function TrainDialog({ open, editing, onClose, onSave }: Props) {
  const [form, setForm] = useState<Train>(empty);

  useEffect(() => {
    if (open) setForm(editing ?? empty);
  }, [open, editing]);

  const updateForm = (patch: Partial<Train>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="heading-5">{editing ? "Edit train" : "Add train"}</DialogTitle>
        </DialogHeader>

        <div className="grid max-h-[65vh] gap-4 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="t-code">Code</Label>
              <Input
                id="t-code"
                value={form.code}
                disabled={!!editing}
                onChange={(e) => updateForm({ code: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-name">Name</Label>
              <Input id="t-name" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="t-type">Type</Label>
              <NativeSelect
                id="t-type"
                value={form.type}
                onChange={(e) => updateForm({ type: e.target.value as Train["type"] })}
              >
                {TRAIN_TYPES.map((t) => (
                  <NativeSelectOption key={t} value={t}>
                    {t}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-route">Route</Label>
              <NativeSelect
                id="t-route"
                value={form.route}
                onChange={(e) => updateForm({ route: e.target.value })}
              >
                {ROUTES.map((r) => (
                  <NativeSelectOption key={r} value={r}>
                    {r}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="t-arr">Arrival at Gouripur</Label>
              <Input
                id="t-arr"
                type="time"
                value={form.arrival}
                onChange={(e) => updateForm({ arrival: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-dep">Departure</Label>
              <Input
                id="t-dep"
                type="time"
                value={form.departure}
                onChange={(e) => updateForm({ departure: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="t-off">Off day</Label>
            <Input id="t-off" value={form.offDay ?? ""} onChange={(e) => updateForm({ offDay: e.target.value })} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="t-desc">Description (for Train info)</Label>
            <Textarea
              id="t-desc"
              value={form.description ?? ""}
              onChange={(e) => updateForm({ description: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="p-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-green-800 text-white hover:bg-green-700"
            onClick={() => onSave(form, !editing)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
