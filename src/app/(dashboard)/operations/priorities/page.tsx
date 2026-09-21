import { SectionHeader } from "@/components/dashboard/section-header";
import { prisma } from "@/lib/prisma";

export default async function StrategicPrioritiesPage() {
  const strategicPriorities = await prisma.strategicPriority.findMany();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Strategic priorities"
        title="Quarterly focus connected to actions, risks and KPIs"
      />

      <div className="space-y-3">
        {strategicPriorities.map((p) => (
          <div key={p.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.owner}</p>
              </div>
              <span className="text-sm font-medium">{p.progress}%</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-brand-green" style={{ width: `${p.progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
