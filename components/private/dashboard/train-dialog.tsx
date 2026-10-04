"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import type { TrainDTO, TrainType } from "@/lib/types/train";

interface Props {
  open: boolean;
  editing: TrainDTO | null;
  saving?: boolean;
  onClose: () => void;
  onSave: (t: TrainDTO, isNew: boolean) => void;
}

const TRAIN_TYPES: { value: TrainType; label: string }[] = [
  { value: "intercity", label: "আন্তঃনগর" },
  { value: "local", label: "লোকাল" },
  { value: "commuter", label: "কমিউটার" },
];

const empty: TrainDTO = {
  _id: "",
  code: "",
  codeBn: "",
  nameBn: "",
  type: "local",
  typeBn: "লোকাল",
  routeBn: "",
  fromBn: "",
  toBn: "",
  arrivalBn: "",
  departureBn: "",
  offDayBn: "বন্ধ নেই",
  infoBn: "",
  detailsBn: [],
  createdAt: "",
  updatedAt: "",
};

export function TrainDialog({ open, editing, saving, onClose, onSave }: Props) {
  const [form, setForm] = useState<TrainDTO>(empty);

  useEffect(() => {
    if (open) setForm(editing ?? empty);
  }, [open, editing]);

  const updateForm = (patch: Partial<TrainDTO>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 sm:max-w-xl">
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
              <Label htmlFor="t-codebn">Code (Bn)</Label>
              <Input
                id="t-codebn"
                value={form.codeBn}
                onChange={(e) => updateForm({ codeBn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="t-name">Name (Bn)</Label>
            <Input id="t-name" value={form.nameBn} onChange={(e) => updateForm({ nameBn: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="t-type">Type</Label>
              <NativeSelect
                id="t-type"
                value={form.type}
                onChange={(e) => {
                  const type = e.target.value as TrainType;
                  updateForm({
                    type,
                    typeBn: TRAIN_TYPES.find((t) => t.value === type)?.label ?? type,
                  });
                }}
              >
                {TRAIN_TYPES.map((t) => (
                  <NativeSelectOption key={t.value} value={t.value}>
                    {t.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-route">Route (Bn)</Label>
              <Input
                id="t-route"
                value={form.routeBn}
                onChange={(e) => updateForm({ routeBn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="t-arr">Arrival at Gouripur</Label>
              <Input
                id="t-arr"
                value={form.arrivalBn}
                onChange={(e) => updateForm({ arrivalBn: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-dep">Departure</Label>
              <Input
                id="t-dep"
                value={form.departureBn}
                onChange={(e) => updateForm({ departureBn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="t-off">Off day</Label>
            <Input id="t-off" value={form.offDayBn ?? ""} onChange={(e) => updateForm({ offDayBn: e.target.value })} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="t-desc">Description (for Train info)</Label>
            <Textarea
              id="t-desc"
              value={form.infoBn ?? ""}
              onChange={(e) => updateForm({ infoBn: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="border-t p-4 pb-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={saving}
            onClick={() => onSave(form, !editing)}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
