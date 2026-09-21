import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { mapStat, mapTeamCapacity, mapPersonCapacity } from "@/lib/db-mappers";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function PeoplePage() {
  const [statRows, teamRows, personRows] = await Promise.all([
    prisma.dashboardStat.findMany({ where: { page: "people" }, orderBy: { order: "asc" } }),
    prisma.teamCapacity.findMany(),
    prisma.personCapacity.findMany(),
  ]);
  const peopleStats = statRows.map(mapStat);
  const teamCapacity = teamRows.map(mapTeamCapacity);
  const peopleCapacity = personRows.map(mapPersonCapacity);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader
          eyebrow="People"
          title="Capacity, capability, engagement, performance and productivity"
        />
        <Button
          variant="outline"
          className="shrink-0"
          nativeButton={false}
          render={<Link href="/people/capacity" />}
        >
          Capacity view <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {peopleStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold">Team</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {peopleCapacity.map((p) => (
            <Link
              key={p.id}
              href={`/people/${p.id}`}
              className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:border-brand-blue"
            >
              <Avatar className="size-9">
                <AvatarFallback className="bg-brand-blue-dark text-xs text-white">
                  {initialsOf(p.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Execution</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamCapacity.map((t) => (
              <TableRow key={t.team}>
                <TableCell className="text-sm font-medium">{t.team}</TableCell>
                <TableCell className="text-sm">{t.capacity}%</TableCell>
                <TableCell className="text-sm">{t.execution}%</TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.risk}</TableCell>
                <TableCell className="text-sm">{t.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border bg-secondary/30 p-4 text-sm">
        <span className="font-medium">Good measurement:</span> commitments, outcomes, capability
        and support required.
        <br />
        <span className="font-medium">Avoid surveillance:</span> do not measure keystrokes, screen
        time or superficial online activity.
      </div>
    </div>
  );
}
