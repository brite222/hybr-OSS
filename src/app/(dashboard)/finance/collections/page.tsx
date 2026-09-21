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
import { mapInvoice } from "@/lib/db-mappers";
import { formatCurrency } from "@/lib/format";

export default async function CollectionsPage() {
  const rows = await prisma.invoice.findMany();
  const invoices = rows.map(mapInvoice);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Accounts receivable"
        title="Collections screen with owner and escalation logic"
      />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Issued</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Overdue</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="text-sm font-medium">
                  <Link href={`/finance/collections/${inv.id}`} className="hover:text-brand-blue hover:underline">
                    {inv.client}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.number}</TableCell>
                <TableCell className="text-sm">{formatCurrency(inv.value)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.issued}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.due}</TableCell>
                <TableCell className="text-sm">{inv.overdueDays > 0 ? `${inv.overdueDays}d` : "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.owner}</TableCell>
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
