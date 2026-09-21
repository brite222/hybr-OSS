import { SectionHeader } from "@/components/dashboard/section-header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { prisma } from "@/lib/prisma";
import { mapProject } from "@/lib/db-mappers";

export default async function ProjectPortfolioPage() {
  const rows = await prisma.project.findMany();
  const projects = rows.map(mapProject);

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
