import Link from "next/link";
import { PIPELINE_STAGES, type Opportunity } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export function PipelineBoard({ opportunities }: { opportunities: Opportunity[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 overflow-x-auto sm:grid-cols-3 lg:grid-cols-6">
      {PIPELINE_STAGES.map((stage) => {
        const items = opportunities.filter((o) => o.stage === stage);
        return (
          <div key={stage} className="min-w-40 rounded-lg border bg-secondary/40 p-2">
            <p className="px-1 pb-2 text-xs font-semibold text-muted-foreground">
              {stage} <span className="text-muted-foreground/60">({items.length})</span>
            </p>
            <div className="space-y-2">
              {items.map((o) => (
                <Link
                  key={o.id}
                  href={`/growth/pipeline/${o.id}`}
                  className="block rounded-md border bg-card p-2.5 text-xs shadow-sm transition-colors hover:border-brand-blue"
                >
                  <p className="font-medium">{o.account}</p>
                  <p className="mt-0.5 text-muted-foreground">{formatCurrency(o.value)} · {o.probability}%</p>
                </Link>
              ))}
              {items.length === 0 && (
                <p className="px-1 py-2 text-xs text-muted-foreground/60">No opportunities</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
