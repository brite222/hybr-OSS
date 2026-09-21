import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { prisma } from "@/lib/prisma";
import { mapInvoice } from "@/lib/db-mappers";
import { formatCurrency } from "@/lib/format";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.invoice.findUnique({ where: { id } });
  if (!row) notFound();
  const invoice = mapInvoice(row);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Invoice detail"
        title={`${invoice.number} — ${invoice.client}`}
        description="Cash accountability starts from contract terms."
      />

      <div className="flex flex-wrap gap-2">
        {invoice.overdueDays > 0 && <Badge variant="destructive">Overdue {invoice.overdueDays}d</Badge>}
        <Badge variant="outline">Value {formatCurrency(invoice.value)}</Badge>
        <Badge variant="outline">Owner {invoice.owner}</Badge>
        {invoice.overdueDays > 14 && <Badge variant="outline">Escalation CEO</Badge>}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Collection actions</h2>
          <ul className="mt-3 space-y-2">
            {invoice.collectionActions.map((a) => (
              <li key={a.label} className="flex items-center gap-2 text-sm">
                <span
                  className={`size-1.5 shrink-0 rounded-full ${a.done ? "bg-brand-green" : "bg-status-warning"}`}
                />
                {a.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Source</h2>
          <ul className="mt-3 space-y-2">
            {invoice.source.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-blue" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <AiInsightCard title="AI note" secondaryLabel="Escalate">
          {invoice.aiNote}
        </AiInsightCard>
      </div>
    </div>
  );
}
