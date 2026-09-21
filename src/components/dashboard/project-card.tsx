import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { AlertLevel, Project } from "@/lib/types";

const STATUS_LEVEL: Record<Project["status"], AlertLevel> = {
  Healthy: "green",
  Watch: "amber",
  "At Risk": "red",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/delivery/projects/${project.id}`}
      className="block rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-brand-blue"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{project.name}</p>
          <p className="text-xs text-muted-foreground">{project.client}</p>
        </div>
        <StatusBadge level={STATUS_LEVEL[project.status]} label={project.status} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Margin {project.margin !== null ? `${project.margin}%` : "N/A"}
      </p>
    </Link>
  );
}
