import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueFlow } from "@/components/dashboard/revenue-flow";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financeStats, revenueFlow, invoices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Finance"
        title="Separate bookings, invoices, collections, margin and cash"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {financeStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Booked → invoice → receivable → collected cash</h2>
        <RevenueFlow steps={revenueFlow} />
        <p className="text-xs text-muted-foreground">
          Definition guardrail: booked revenue, invoiced revenue, cash collected and accounting
          recognition should never be mixed in the same metric.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" nativeButton={false} render={<Link href="/finance/collections" />}>
          Collections <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/finance/forecast" />}>
          13-week forecast <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="text-sm font-medium">{inv.client}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.number}</TableCell>
                <TableCell className="text-sm">{formatCurrency(inv.value)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.due}</TableCell>
                <TableCell>
                  <StatusBadge
                    level={inv.status === "Overdue" ? "red" : inv.status === "Paid" ? "green" : "info"}
                    label={inv.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
