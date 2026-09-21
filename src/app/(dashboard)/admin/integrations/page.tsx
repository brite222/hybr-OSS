import { SectionHeader } from "@/components/dashboard/section-header";
import { StatusDot } from "@/components/dashboard/status-badge";
import { integrationSources } from "@/lib/mock-data";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Admin — Integrations"
        title="Source systems, sync status and controls"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {integrationSources.map((s) => (
          <div key={s.name} className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{s.name}</p>
              <StatusDot level={s.status} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{s.method}</p>
            <p className="mt-2 text-xs text-muted-foreground">{s.lastSync}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
