import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { mapStat, mapProject } from "@/lib/db-mappers";
import type { AlertLevel, Project } from "@/lib/types";

const STATUS_LEVEL: Record<Project["status"], AlertLevel> = {
  Healthy: "green",
  Watch: "amber",
  "At Risk": "red",
};

export default async function DeliveryPage() {
  const [statRows, projectRows] = await Promise.all([
    prisma.dashboardStat.findMany({ where: { page: "delivery" }, orderBy: { order: "asc" } }),
    prisma.project.findMany(),
  ]);
  const deliveryStats = statRows.map(mapStat);
  const projects = projectRows.map(mapProject);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader eyebrow="Delivery" title="On time, quality, profitable and valuable" />
        <Button
          variant="outline"
          className="shrink-0"
          nativeButton={false}
          render={<Link href="/delivery/projects" />}
        >
          Project portfolio <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {deliveryStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Next Milestone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-sm font-medium">
                  <Link href={`/delivery/projects/${p.id}`} className="hover:text-brand-blue hover:underline">
                    {p.name}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.client}</TableCell>
                <TableCell>
                  <StatusBadge level={STATUS_LEVEL[p.status]} label={p.status} />
                </TableCell>
                <TableCell className="text-sm">{p.margin !== null ? `${p.margin}%` : "N/A"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.nextMilestone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
