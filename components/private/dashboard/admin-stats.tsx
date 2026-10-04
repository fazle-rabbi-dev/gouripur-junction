import { Card } from "@/components/ui/card";

interface Props {
  totalTrains: number;
  pending: number;
  approved: number;
  bannerActive: boolean;
}

export function AdminStats({ totalTrains, pending, approved, bannerActive }: Props) {
  const items = [
    { label: "Trains", value: String(totalTrains) },
    { label: "Pending posts", value: String(pending) },
    { label: "Approved", value: String(approved) },
    { label: "Banner active?", value: bannerActive ? "Active" : "Off" },
  ];

  return (
    <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="min-w-0 overflow-hidden p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="heading-4 mt-1">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
