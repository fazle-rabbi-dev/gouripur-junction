import type { Metadata } from "next";

import { Dashboard } from "@/components/private/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard - Gouripur Junction",
  description: "Manage banner, trains, schedules and post approvals.",
};

export default function AdminDashboardPage() {
  return (
    <main className="max-body py-6">
      <section aria-label="Admin dashboard">
        <Dashboard />
      </section>
    </main>
  );
}
