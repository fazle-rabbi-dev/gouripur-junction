import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { Train } from "@/@types/admin";

export function TrainsTable({
  trains,
  onAdd,
  onEdit,
  onDelete,
}: {
  trains: Train[];
  onAdd: () => void;
  onEdit: (t: Train) => void;
  onDelete: (t: Train) => void;
}) {
  return (
    <Card className="min-w-0 overflow-hidden p-4">
      <div className="flex-center justify-between">
        <h2 className="heading-6">Trains ({trains.length})</h2>
        <Button
          onClick={onAdd}
          className="bg-green-800 text-white hover:bg-green-700"
          size="sm"
        >
          + Add train
        </Button>
      </div>

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
                <TableCell className="whitespace-nowrap">{t.code}</TableCell>
                <TableCell className="whitespace-nowrap">{t.name}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell className="whitespace-nowrap">{t.route}</TableCell>
                <TableCell>{t.arrival}</TableCell>
                <TableCell>{t.departure}</TableCell>
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
    </Card>
  );
}
