import { cn } from "@/lib/utils";
import type { AlertLevel } from "@/lib/types";

const LEVEL_STYLES: Record<AlertLevel, string> = {
  red: "bg-status-danger/10 text-status-danger border-status-danger/30",
  amber: "bg-status-warning/10 text-status-warning border-status-warning/30",
  green: "bg-status-success/10 text-status-success border-status-success/30",
  info: "bg-status-info/10 text-status-info border-status-info/30",
};

const LEVEL_LABEL: Record<AlertLevel, string> = {
  red: "Critical",
  amber: "Attention",
  green: "On track",
  info: "Info",
};

export function StatusBadge({
  level,
  label,
  className,
}: {
  level: AlertLevel;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        LEVEL_STYLES[level],
        className,
      )}
    >
      {label ?? LEVEL_LABEL[level]}
    </span>
  );
}

export function StatusDot({ level, className }: { level: AlertLevel; className?: string }) {
  const dot: Record<AlertLevel, string> = {
    red: "bg-status-danger",
    amber: "bg-status-warning",
    green: "bg-status-success",
    info: "bg-status-info",
  };
  return <span className={cn("inline-block size-2 rounded-full", dot[level], className)} />;
}
