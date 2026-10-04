import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { TrainDTO } from "@/lib/types/train";

export function TrainsTable({
  trains,
  onAdd,
  onEdit,
  onDelete,
}: {
  trains: TrainDTO[];
  onAdd: () => void;
  onEdit: (t: TrainDTO) => void;
  onDelete: (t: TrainDTO) => void;
}) {
  return (
    <Card className="min-w-0 overflow-hidden p-4">
      <div className="flex-center justify-between">
        <h2 className="heading-6">Trains ({trains.length})</h2>
        <Button
          onClick={onAdd}
          size="sm"
        >
          + Add train
        </Button>
      </div>

      {trains.length === 0 ? (
        <p className="mt-3 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          ডাটাবেজে কোনো ট্রেন পাওয়া যায়নি।
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Arr</TableHead>
                <TableHead>Dep</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trains.map((t) => (
                <TableRow key={t.code}>
                  <TableCell className="whitespace-nowrap">
                    {t.codeBn} ({t.code})
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{t.nameBn}</TableCell>
                  <TableCell>{t.typeBn}</TableCell>
                  <TableCell className="whitespace-nowrap">{t.routeBn}</TableCell>
                  <TableCell>{t.arrivalBn}</TableCell>
                  <TableCell>{t.departureBn}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(t)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onDelete(t)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
