import type { CashWeek } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

const LEVEL_COLOR = {
  red: "bg-status-danger",
  amber: "bg-status-warning",
  green: "bg-status-success",
  info: "bg-status-info",
} as const;

export function CashForecastChart({ weeks }: { weeks: CashWeek[] }) {
  const max = Math.max(...weeks.map((w) => w.balance));

  return (
    <div className="flex h-40 items-end gap-2">
      {weeks.map((w) => (
        <div key={w.week} className="group flex flex-1 flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-sm ${LEVEL_COLOR[w.level]}`}
            style={{ height: `${Math.max(8, (w.balance / max) * 100)}%` }}
            title={`Week ${w.week}: ${formatCurrency(w.balance)}`}
          />
          <span className="text-[10px] text-muted-foreground">W{w.week}</span>
        </div>
      ))}
    </div>
  );
}
