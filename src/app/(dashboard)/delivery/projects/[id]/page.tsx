import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { HealthBars } from "@/components/dashboard/health-bars";
import { ProjectTimeline } from "@/components/dashboard/project-timeline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { mapProject } from "@/lib/db-mappers";
import { formatCurrency } from "@/lib/format";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) notFound();
  const project = mapProject(row);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Project detail"
        title={`${project.name} — ${project.client}`}
        description="Project command center with roadmap, health and outcomes."
      />

      <div className="flex flex-wrap gap-2">
        <Badge variant={project.status === "At Risk" ? "destructive" : "outline"}>{project.status}</Badge>
        <Badge variant="outline">PM {project.pm}</Badge>
        <Badge variant="outline">Progress {project.progress}%</Badge>
        <Badge variant="outline">Margin {project.margin !== null ? `${project.margin}%` : "N/A"}</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Health</h2>
          <div className="mt-3">
            <HealthBars bars={project.health} />
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Next milestone</h2>
          <p className="mt-2 text-sm">{project.nextMilestone}</p>
          {project.risks[0] && (
            <p className="mt-1 text-xs text-muted-foreground">Risk: {project.risks[0].risk}</p>
          )}
        </div>
        <AiInsightCard title="AI risk note" secondaryLabel="Create action">
          {project.aiRiskNote}
        </AiInsightCard>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h2 className="mb-4 text-sm font-semibold">Timeline</h2>
        <ProjectTimeline currentStepIndex={project.currentStepIndex} />
      </div>

      {project.risks.length > 0 && (
        <div className="overflow-hidden rounded-lg border bg-card">
          <div className="border-b px-4 py-2.5">
            <h2 className="text-sm font-semibold">Risk register</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.risks.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="text-sm">{r.risk}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.severity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.owner}</TableCell>
                  <TableCell className="text-sm">{r.action}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.due}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {project.outcome && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold">Outcome review</h2>
            <ul className="mt-3 space-y-2">
              {project.outcome.reviewChecklist.map((c) => (
                <li key={c.label} className="flex items-center gap-2 text-sm">
                  <span className={`size-1.5 shrink-0 rounded-full ${c.done ? "bg-brand-green" : "bg-status-warning"}`} />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-brand-ink p-4 text-white">
            <p className="text-xs text-white/60">Expansion signal</p>
            <p className="mt-1 text-2xl font-semibold">{formatCurrency(project.outcome.expansionValue)}</p>
            <p className="text-sm text-white/80">{project.outcome.expansionSignal}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold">Case evidence</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.outcome.caseEvidence}</p>
          </div>
        </div>
      )}
    </div>
  );
}
