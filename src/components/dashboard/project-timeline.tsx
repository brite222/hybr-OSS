import { Check } from "lucide-react";
import { PROJECT_TIMELINE_STEPS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectTimeline({ currentStepIndex }: { currentStepIndex: number }) {
  return (
    <div className="flex items-center">
      {PROJECT_TIMELINE_STEPS.map((step, i) => {
        const done = i < currentStepIndex;
        const current = i === currentStepIndex;
        return (
          <div key={step} className="flex flex-1 flex-col items-center last:flex-none">
            <div className="flex w-full items-center">
              {i > 0 && (
                <div className={cn("h-0.5 flex-1", i <= currentStepIndex ? "bg-brand-green" : "bg-border")} />
              )}
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-medium",
                  done && "border-brand-green bg-brand-green text-white",
                  current && "border-brand-blue bg-brand-blue text-white",
                  !done && !current && "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </div>
            </div>
            <span className="mt-1.5 text-center text-[10px] text-muted-foreground">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
