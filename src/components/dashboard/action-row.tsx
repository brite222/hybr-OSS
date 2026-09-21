import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActionItem } from "@/lib/types";

const PRIORITY_DOT = {
  High: "bg-status-danger",
  Medium: "bg-status-warning",
  Low: "bg-status-info",
} as const;

export function ActionRow({ action }: { action: ActionItem }) {
  const isOverdue = action.status === "Overdue";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border p-3",
        isOverdue && "border-status-danger/40 bg-status-danger/5",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn("size-2 shrink-0 rounded-full", PRIORITY_DOT[action.priority])} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{action.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {action.source} · {action.dueLabel}
            {action.blocked && " · Blocked"}
          </p>
        </div>
      </div>
      <Button
        size="sm"
        variant={isOverdue ? "destructive" : "outline"}
        className="shrink-0"
        nativeButton={false}
        render={<Link href={`/my-work/${action.id}`} />}
      >
        {isOverdue ? "Late" : "Open"}
      </Button>
    </div>
  );
}
