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
import { operationsStats, departmentExecution } from "@/lib/mock-data";

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader eyebrow="Operations" title="The organization's execution layer" />
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" nativeButton={false} render={<Link href="/operations/priorities" />}>
            Strategic priorities <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/operations/meetings" />}>
            Meetings <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {operationsStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg border bg-card lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Owner</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Done</TableHead>
                <TableHead>Late</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentExecution.map((d) => (
                <TableRow key={d.owner}>
                  <TableCell className="text-sm font-medium">{d.owner}</TableCell>
                  <TableCell className="text-sm">{d.assigned}</TableCell>
                  <TableCell className="text-sm">{d.done}</TableCell>
                  <TableCell className="text-sm">{d.late}</TableCell>
                  <TableCell className="text-sm font-medium">{d.score}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="rounded-lg border bg-card p-4 text-sm">
          <h2 className="text-sm font-semibold">Roll-up logic</h2>
          <p className="mt-2 text-muted-foreground">
            Actions roll from individual → department → company. Period scores and cumulative
            backlog are shown separately.
          </p>
        </div>
      </div>
    </div>
  );
}
