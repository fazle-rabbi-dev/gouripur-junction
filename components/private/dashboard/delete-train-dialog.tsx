import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import type { Train } from "@/@types/admin";

export function DeleteTrainDialog({
  train,
  onClose,
  onConfirm,
}: {
  train: Train | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={!!train} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xs text-center">
        <div className="flex flex-col items-center gap-3 py-2">
          <span className="flex-center justify-center size-12 rounded-full bg-destructive/15 text-destructive">
            <Trash2 className="size-5" aria-hidden />
          </span>
          <div>
            <p className="heading-5">ট্রেন মুছবেন?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              কোড {train?.code} স্থায়ীভাবে মুছে যাবে।
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <Button variant="outline" onClick={onClose}>
              বাতিল
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              হ্যাঁ, মুছুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
