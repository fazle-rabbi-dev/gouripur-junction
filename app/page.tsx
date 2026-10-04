import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gouripur Junction",
  description: "Train schedules and info for Gouripur Junction.",
};

export default function Page() {
  return (
    <main className="max-body py-6">
      <section aria-label="Home">
        <h1 className="heading-4">Gouripur Junction</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Public homepage coming soon. Admins continue to{" "}
          <Link href="/admin/dashboard" className="underline">
            dashboard
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
