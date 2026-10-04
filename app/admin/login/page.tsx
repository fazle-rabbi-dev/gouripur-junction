import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login - Gouripur Junction",
};

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-6">
      {/* grid effect */}
      <div aria-hidden className="hero-grid hero-mask absolute inset-0" />
      {/* subtle gradients: top-right + bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-accent-foreground/15 blur-3xl"
      />
      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
