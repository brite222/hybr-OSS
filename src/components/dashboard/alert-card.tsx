import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { cn } from "@/lib/utils";
import type { AlertItem } from "@/lib/types";

const LEVEL_BORDER = {
  red: "border-status-danger/40 bg-status-danger/5",
  amber: "border-status-warning/40 bg-status-warning/5",
  green: "border-status-success/40 bg-status-success/5",
  info: "border-status-info/40 bg-status-info/5",
} as const;

export function AlertCard({ alert, className }: { alert: AlertItem; className?: string }) {
  return (
    <div className={cn("rounded-lg border p-4", LEVEL_BORDER[alert.level], className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <StatusBadge level={alert.level} />
            <h3 className="text-sm font-semibold">{alert.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{alert.detail}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{alert.owner}</span> · {alert.action}
          </p>
        </div>
        <Button size="sm" className="shrink-0 bg-brand-green text-white hover:bg-brand-green/90">
          Assign
        </Button>
      </div>
    </div>
  );
}
