import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdminHeader() {
  return (
    <Card className="min-w-0 flex flex-col gap-3 overflow-hidden p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0">
        <h1 className="heading-5 flex-center gap-2">
          <LayoutDashboard className="size-5 shrink-0" aria-hidden />
          Admin Panel
        </h1>
        <p className="mt-1 text-sm break-words text-muted-foreground">
          Manage banner, trains, schedules and post approvals
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="destructive">Logout</Button>
      </div>
    </Card>
  );
}
