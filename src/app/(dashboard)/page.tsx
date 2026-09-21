import { KpiCard } from "@/components/dashboard/kpi-card";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { homeStats, myPriorities, aiBrief, myActions } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Personal home"
        title="Good afternoon, Charles"
        description="Here's what needs your attention today."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {homeStats.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 lg:col-span-1">
          <h2 className="text-sm font-semibold">My priorities</h2>
          <ul className="mt-3 space-y-2">
            {myPriorities.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-blue" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <AiInsightCard className="lg:col-span-1">{aiBrief}</AiInsightCard>

        <div className="overflow-hidden rounded-lg border bg-card lg:col-span-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myActions.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="max-w-40 truncate text-sm">{a.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.due}</TableCell>
                  <TableCell className="text-sm">{a.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
