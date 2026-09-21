import { KpiCard } from "@/components/dashboard/kpi-card";
import { AlertCard } from "@/components/dashboard/alert-card";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { prisma } from "@/lib/prisma";
import { mapStat, mapAlert } from "@/lib/db-mappers";

export default async function PerformancePage() {
  const [stats, alerts, brief] = await Promise.all([
    prisma.dashboardStat.findMany({ where: { page: "performance" }, orderBy: { order: "asc" } }),
    prisma.alertItem.findMany(),
    prisma.aiBrief.findUnique({ where: { scope: "performance" } }),
  ]);
  const ceoScorecard = stats.map(mapStat);
  const attentionAlerts = alerts.map(mapAlert);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="CEO command center"
        title="Enterprise health in five minutes or less"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ceoScorecard.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="text-sm font-semibold">Needs your attention</h2>
          {attentionAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
        {brief && (
          <AiInsightCard title="AI executive brief" secondaryLabel="Create actions">
            {brief.content}
          </AiInsightCard>
        )}
      </div>
    </div>
  );
}
