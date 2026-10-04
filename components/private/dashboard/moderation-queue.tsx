import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { AdminPost } from "@/@types/admin";

export function ModerationQueue({
  posts,
  onApprove,
  onReject,
  onDelete,
}: {
  posts: AdminPost[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
      <h2 className="heading-6">Moderation queue</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Approve → shows in public feed. Reject → permanently deleted (image removed from
        storage).
      </p>

      <div className="mt-4 grid gap-3">
        {posts.map((p) => (
          <div key={p.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="flex-center gap-2 text-sm font-semibold">
                {p.author}
                <Badge variant={p.status === "approved" ? "default" : "secondary"}>
                  {p.status}
                </Badge>
              </p>
              {p.status === "approved" ? (
                <Button variant="outline" size="sm" onClick={() => onDelete(p.id)}>
                  Delete
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => onApprove(p.id)}
                >
                  Approve
                </Button>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            {p.status === "pending" && (
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => onReject(p.id)}>
                  Reject and delete
                </Button>
              </div>
            )}
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-sm text-muted-foreground">No posts in queue.</p>
        )}
      </div>
    </Card>
  );
}
