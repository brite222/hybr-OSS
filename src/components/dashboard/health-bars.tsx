import type { ProjectHealthBar } from "@/lib/types";

const LEVEL_COLOR = {
  red: "bg-status-danger",
  amber: "bg-status-warning",
  green: "bg-status-success",
  info: "bg-status-info",
} as const;

export function HealthBars({ bars }: { bars: ProjectHealthBar[] }) {
  return (
    <div className="space-y-2.5">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{bar.label}</span>
            <span className="font-medium">{bar.score}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full ${LEVEL_COLOR[bar.level]}`}
              style={{ width: `${bar.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
