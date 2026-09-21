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
import { meetings } from "@/lib/mock-data";
import type { AlertLevel, MeetingStatus } from "@/lib/types";

const STATUS_LEVEL: Record<MeetingStatus, AlertLevel> = {
  Ready: "green",
  Draft: "amber",
  Published: "info",
  Upcoming: "info",
};

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Meetings" title="Workspace for agendas, decisions, notes and actions" />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meeting</TableHead>
              <TableHead>When</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="text-sm font-medium">
                  <Link href={`/operations/meetings/${m.id}`} className="hover:text-brand-blue hover:underline">
                    {m.title}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{m.when}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{m.owner}</TableCell>
                <TableCell className="text-sm">{m.actionsCount}</TableCell>
                <TableCell>
                  <StatusBadge level={STATUS_LEVEL[m.status]} label={m.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
