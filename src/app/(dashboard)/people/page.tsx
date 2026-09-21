import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { peopleStats, teamCapacity } from "@/lib/mock-data";

export default function PeoplePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader
          eyebrow="People"
          title="Capacity, capability, engagement, performance and productivity"
        />
        <Button variant="outline" className="shrink-0" render={<Link href="/people/capacity" />}>
          Capacity view <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {peopleStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
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
