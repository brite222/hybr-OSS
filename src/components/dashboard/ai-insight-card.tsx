import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AiInsightCard({
  title = "AI brief",
  children,
  primaryLabel = "View evidence",
  secondaryLabel = "Create action",
  className,
}: {
  title?: string;
  children: React.ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg bg-brand-ink p-4 text-white", className)}>
      <div className="flex items-center gap-2 text-xs font-medium text-white/70">
        <Sparkles className="size-3.5" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/90">{children}</p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
          {primaryLabel}
        </Button>
        <Button size="sm" className="bg-brand-green text-white hover:bg-brand-green/90">
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );
}
