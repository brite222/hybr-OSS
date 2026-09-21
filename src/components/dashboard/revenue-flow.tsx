import { ChevronRight } from "lucide-react";

export function RevenueFlow({ steps }: { steps: { id: string; label: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-brand-ink p-4">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className="rounded-md border border-white/15 px-4 py-2.5 text-center">
            <p className="text-[11px] text-white/50">{step.label}</p>
            <p className="text-sm font-semibold text-white">{step.value}</p>
          </div>
          {i < steps.length - 1 && <ChevronRight className="size-4 shrink-0 text-white/30" />}
        </div>
      ))}
    </div>
  );
}
