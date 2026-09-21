import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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
import type { Kpi } from "@/lib/types";

export default async function HomePage() {
  const session = await auth();
  const firstName = session!.user.name?.split(" ")[0] ?? "there";

  const [stats, brief, weeklyPriorities, urgentActions] = await Promise.all([
    prisma.dashboardStat.findMany({ where: { page: "home" }, orderBy: { order: "asc" } }),
    prisma.aiBrief.findUnique({ where: { scope: "home" } }),
    prisma.weeklyPriority.findMany({ take: 3 }),
    prisma.action.findMany({
      where: { status: { in: ["Today", "Overdue"] } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const homeStats: Kpi[] = stats.map((s) => ({
    id: s.key,
    label: s.label,
    value: s.value,
    sublabel: s.sublabel ?? undefined,
    level: s.level ?? undefined,
    trend: (s.trend as Kpi["trend"]) ?? undefined,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Personal home"
        title={`Good to see you, ${firstName}`}
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
            {weeklyPriorities.map((p) => (
              <li key={p.id} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-blue" />
                {p.title}
              </li>
            ))}
          </ul>
        </div>

        {brief && <AiInsightCard className="lg:col-span-1">{brief.content}</AiInsightCard>}

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
              {urgentActions.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="max-w-40 truncate text-sm">{a.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.dueLabel}</TableCell>
                  <TableCell className="text-sm">{a.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link
            href="/my-work"
            className="block border-t bg-secondary/30 px-4 py-2 text-xs font-medium text-brand-blue hover:underline"
          >
            View all in My Work →
          </Link>
        </div>
      </div>
    </div>
  );
}
