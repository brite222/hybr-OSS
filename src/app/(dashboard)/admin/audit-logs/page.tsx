import { SectionHeader } from "@/components/dashboard/section-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auditLog } from "@/lib/mock-data";

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Admin — Audit logs" title="Trace who changed what, when and why" />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Object</TableHead>
              <TableHead>Original</TableHead>
              <TableHead>New</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLog.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-sm text-muted-foreground">{entry.timestamp}</TableCell>
                <TableCell className="text-sm">{entry.user}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{entry.object}</TableCell>
                <TableCell className="text-sm">{entry.original}</TableCell>
                <TableCell className="text-sm font-medium">{entry.updated}</TableCell>
                <TableCell className="max-w-56 truncate text-sm text-muted-foreground">{entry.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
