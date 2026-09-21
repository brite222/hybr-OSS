import { HybrLogo } from "@/components/layout/hybr-logo";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">Login</p>
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">
          First impression: secure, calm and unmistakably HYBR
        </h1>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="rounded-xl border bg-card p-6 shadow-sm sm:max-w-sm">
            <HybrLogo />
            <h2 className="mt-4 text-lg font-semibold">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to manage execution, performance and intelligence.
            </p>
            <div className="mt-5">
              <LoginForm />
            </div>
          </div>
          <div className="rounded-xl bg-brand-ink p-5 text-white sm:w-64">
            <p className="text-sm font-semibold">Secure by design</p>
            <p className="mt-2 text-xs text-white/70">
              Role-based access keeps finance, HR and confidential project data restricted by
              default.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
