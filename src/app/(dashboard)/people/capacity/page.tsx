import Link from "next/link";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { mapPersonCapacity } from "@/lib/db-mappers";
import type { AlertLevel, PersonCapacity } from "@/lib/types";

const STATUS_LEVEL: Record<PersonCapacity["status"], AlertLevel> = {
  Good: "green",
  Overloaded: "red",
  Available: "info",
  Watch: "amber",
};

export default async function CapacityPage() {
  const rows = await prisma.personCapacity.findMany();
  const peopleCapacity = rows.map(mapPersonCapacity);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Capacity view"
        title="Resourcing risks visible before work quality declines"
      />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Current Load</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peopleCapacity.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-sm font-medium">
                  <Link href={`/people/${p.id}`} className="hover:text-brand-blue hover:underline">
                    {p.name}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.role}</TableCell>
                <TableCell className="text-sm">{p.capacity}%</TableCell>
                <TableCell className="text-sm">{p.currentLoad}%</TableCell>
                <TableCell>
                  <StatusBadge level={STATUS_LEVEL[p.status]} label={p.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border border-brand-green/30 bg-brand-green/5 p-4 text-sm">
        The system supports workload balancing, coaching and prioritization — not surveillance.
      </div>
    </div>
  );
}
