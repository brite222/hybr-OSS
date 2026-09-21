import { SectionHeader } from "@/components/dashboard/section-header";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { opportunities } from "@/lib/mock-data";

export default function PipelinePage() {
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
