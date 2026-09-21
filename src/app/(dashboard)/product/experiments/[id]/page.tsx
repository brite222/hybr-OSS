import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { prisma } from "@/lib/prisma";
import { mapExperiment } from "@/lib/db-mappers";

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.experiment.findUnique({ where: { id } });
  if (!row) notFound();
  const experiment = mapExperiment(row);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Experiment workspace"
        title={`Experiment: ${experiment.title}`}
        description="Evidence gates before build and deployment."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Hypothesis</h2>
          <p className="mt-2 text-sm text-muted-foreground">{experiment.hypothesis}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Evidence</h2>
          <p className="mt-2 text-sm text-muted-foreground">{experiment.evidence}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Success criteria</h2>
          <p className="mt-2 text-sm text-muted-foreground">{experiment.successCriteria}</p>
        </div>
        <div className="rounded-lg bg-brand-ink p-4 text-white">
          <h2 className="text-sm font-semibold text-white/70">Decision</h2>
          <Badge className="mt-2 bg-brand-green text-white">{experiment.decision}</Badge>
        </div>
      </div>
    </div>
  );
}
