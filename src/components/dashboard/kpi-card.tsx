import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";

const LEVEL_BORDER = {
  red: "border-l-status-danger",
  amber: "border-l-status-warning",
  green: "border-l-status-success",
  info: "border-l-status-info",
} as const;

const TREND_ICON = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const;

export function KpiCard({ kpi, className }: { kpi: Kpi; className?: string }) {
  const TrendIcon = kpi.trend ? TREND_ICON[kpi.trend] : null;

  return (
    <div
      className={cn(
        "rounded-lg border border-l-4 bg-card p-4 shadow-sm",
        kpi.level ? LEVEL_BORDER[kpi.level] : "border-l-border",
        className,
      )}
    >
      <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tracking-tight">{kpi.value}</span>
        {TrendIcon && <TrendIcon className="size-4 text-muted-foreground" />}
      </div>
      {kpi.sublabel && <p className="mt-1 text-xs text-muted-foreground">{kpi.sublabel}</p>}
    </div>
  );
}
