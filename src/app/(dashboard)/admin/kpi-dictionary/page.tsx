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
import { kpiDictionary } from "@/lib/mock-data";
import type { AlertLevel, KpiDefinition } from "@/lib/types";

const STATUS_LEVEL: Record<KpiDefinition["status"], AlertLevel> = {
  Active: "green",
  Draft: "amber",
  Deprecated: "info",
};

export default function KpiDictionaryPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Admin — KPI Dictionary" title="One interface to define every metric" />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KPI</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kpiDictionary.map((k) => (
              <TableRow key={k.id}>
                <TableCell className="text-sm font-medium">{k.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{k.owner}</TableCell>
                <TableCell className="max-w-72 truncate text-sm text-muted-foreground">{k.formula}</TableCell>
                <TableCell className="text-sm">{k.priority}</TableCell>
                <TableCell>
                  <StatusBadge level={STATUS_LEVEL[k.status]} label={k.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border bg-secondary/30 p-4">
        <h2 className="text-sm font-semibold">KPI editor fields</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Name · Definition · Formula · Owner · Source · Frequency · Target · Amber/Red Threshold ·
          Priority · Effective date · Version history
        </p>
      </div>

      <div className="rounded-lg bg-brand-ink p-4 text-sm text-white">
        <span className="font-medium">Governance rule:</span> No metric enters HYBR OS without all
        seven fields — Source, Owner, Formula, Target, Threshold, Cadence, Escalation.
      </div>
    </div>
  );
}
