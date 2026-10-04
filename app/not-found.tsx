import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-body flex min-h-[60svh] flex-col items-center justify-center gap-3 py-10 text-center">
      <p className="heading-1">৪০৪</p>
      <p className="text-sm text-muted-foreground">
        এই পেজটি পাওয়া যায়নি। ঠিকানা ভুল হতে পারে।
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        হোমে ফিরুন
      </Link>
    </main>
  );
}
