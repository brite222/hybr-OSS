import { SectionHeader } from "@/components/dashboard/section-header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { projects } from "@/lib/mock-data";

export default function ProjectPortfolioPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Project portfolio"
        title="Active projects as health cards with clear risk states"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
