import { cn } from "@/lib/utils";

export function HybrLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="var(--brand-green)" strokeWidth="2" />
        <circle cx="14" cy="12" r="7" stroke="var(--brand-blue)" strokeWidth="2" />
        <circle cx="16" cy="16" r="4.5" stroke="var(--brand-grey)" strokeWidth="2" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-brand-blue-dark">HYBR</span>
    </div>
  );
}
