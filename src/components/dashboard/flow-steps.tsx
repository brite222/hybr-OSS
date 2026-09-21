import { ChevronRight } from "lucide-react";

export function FlowSteps({ steps }: { steps: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="rounded-md border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {step}
          </div>
          {i < steps.length - 1 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" />}
        </div>
      ))}
    </div>
  );
}
