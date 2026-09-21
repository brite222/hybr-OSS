import { SectionHeader } from "@/components/dashboard/section-header";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { prisma } from "@/lib/prisma";
import { mapOpportunity } from "@/lib/db-mappers";

export default async function PipelinePage() {
  const rows = await prisma.opportunity.findMany();
  const opportunities = rows.map(mapOpportunity);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Sales pipeline"
        title="Stage-based view with owner, value, aging and next action"
      />
      <PipelineBoard opportunities={opportunities} />
    </div>
  );
}
