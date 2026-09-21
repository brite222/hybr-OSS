import Link from "next/link";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { FlowSteps } from "@/components/dashboard/flow-steps";
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
import { productStats, experiments } from "@/lib/mock-data";
import type { AlertLevel, ExperimentStatus } from "@/lib/types";

const STATUS_LEVEL: Record<ExperimentStatus, AlertLevel> = {
  Validated: "green",
  Testing: "amber",
  Stalled: "red",
};

const PRODUCT_FLOW = ["Opportunity", "Insight", "Experiment", "Prototype", "Validation", "Adoption", "Value"] as const;

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Product"
        title="From insight to experiment to adoption and value"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {productStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <FlowSteps steps={PRODUCT_FLOW} />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Experiment</TableHead>
              <TableHead>Hypothesis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Decision</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiments.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="text-sm font-medium">
                  <Link href={`/product/experiments/${e.id}`} className="hover:text-brand-blue hover:underline">
                    {e.title}
                  </Link>
                </TableCell>
                <TableCell className="max-w-72 truncate text-sm text-muted-foreground">{e.hypothesis}</TableCell>
                <TableCell>
                  <StatusBadge level={STATUS_LEVEL[e.status]} label={e.status} />
                </TableCell>
                <TableCell className="text-sm">{e.decision}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Avoid &quot;features shipped&quot; as a default metric unless connected to adoption, user
        value or revenue.
      </p>
    </div>
  );
}
