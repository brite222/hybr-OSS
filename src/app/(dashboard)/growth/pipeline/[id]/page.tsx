import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { opportunities } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opportunity = opportunities.find((o) => o.id === id);
  if (!opportunity) notFound();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Opportunity detail"
        title={`${opportunity.account} — ${opportunity.name}`}
        description="A deal workspace, not a detached CRM card."
      />

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Value {formatCurrency(opportunity.value)}</Badge>
        <Badge variant="outline">Stage {opportunity.stage}</Badge>
        <Badge variant="outline">Probability {opportunity.probability}%</Badge>
        <Badge variant="outline">Close {opportunity.closeDate}</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Buying group</h2>
          <ul className="mt-3 space-y-2">
            {opportunity.buyingGroup.map((m) => (
              <li key={m.name} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-green" />
                <span className="font-medium">{m.name}</span>
                <span className="text-muted-foreground">— {m.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Activity</h2>
          <ul className="mt-3 space-y-2">
            {opportunity.activity.map((a) => (
              <li key={a.label} className="flex items-center gap-2 text-sm">
                <span
                  className={`size-1.5 shrink-0 rounded-full ${a.done ? "bg-brand-green" : "bg-brand-blue"}`}
                />
                {a.label}
              </li>
            ))}
          </ul>
        </div>

        <AiInsightCard title="AI insight" secondaryLabel="Draft follow-up">
          {opportunity.aiInsight}
        </AiInsightCard>
      </div>
    </div>
  );
}
