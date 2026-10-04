import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { logoutAction } from "./actions";

export const metadata = {
  title: "Admin Dashboard - Gouripur Junction",
};

export default function AdminDashboardPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="heading-2">Dashboard</CardTitle>
          <CardDescription>You are signed in as admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="w-full">
              Logout
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
