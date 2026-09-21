import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { mapStat, mapContentItem, mapIntentAccount } from "@/lib/db-mappers";

export default async function GrowthPage() {
  const [marketingStatRows, salesStatRows, marketingBrief, contentRows, intentRows, revenueGoal] =
    await Promise.all([
      prisma.dashboardStat.findMany({ where: { page: "growth-marketing" }, orderBy: { order: "asc" } }),
      prisma.dashboardStat.findMany({ where: { page: "growth-sales" }, orderBy: { order: "asc" } }),
      prisma.aiBrief.findUnique({ where: { scope: "growth-marketing" } }),
      prisma.contentItem.findMany(),
      prisma.intentAccount.findMany(),
      prisma.revenueGoal.findUnique({ where: { scope: "default" } }),
    ]);

  const marketingStats = marketingStatRows.map(mapStat);
  const salesRevenueClock = salesStatRows.map(mapStat);
  const marketingAiSummary = marketingBrief?.content ?? "";
  const contentItems = contentRows.map(mapContentItem);
  const intentAccounts = intentRows.map(mapIntentAccount);

  if (!revenueGoal) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader
          eyebrow="Growth"
          title="Attention → intent → conversations → pipeline → booked revenue"
        />
        <Button
          variant="outline"
          className="shrink-0"
          nativeButton={false}
          render={<Link href="/growth/pipeline" />}
        >
          View pipeline <ArrowRight className="size-4" />
        </Button>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-4 space-y-4">
          <h2 className="text-sm font-semibold">Sales Revenue Clock</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {salesRevenueClock.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          <div className="rounded-lg bg-brand-blue-dark p-5 text-white">
            <p className="text-sm font-semibold">{formatCurrency(revenueGoal.goal)} Revenue Goal</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: "Booked", value: formatCurrency(revenueGoal.booked) },
                { label: "Open Pipeline", value: formatCurrency(revenueGoal.openPipeline) },
                { label: "Weighted", value: formatCurrency(revenueGoal.weighted) },
                { label: "Gap", value: formatCurrency(revenueGoal.gap) },
                { label: "Months Left", value: String(revenueGoal.monthsLeft) },
              ].map((item) => (
                <div key={item.label} className="rounded-md border border-white/15 p-3">
                  <p className="text-xs text-white/60">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/70">
              Required run-rate: {formatCurrency(revenueGoal.runRate)}/mo
            </p>
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="mt-4 space-y-4">
          <h2 className="text-sm font-semibold">From attention to qualified demand</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {marketingStats.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg border bg-card lg:col-span-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Theme</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Meetings</TableHead>
                    <TableHead>Pipeline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="max-w-40 truncate text-sm">{c.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.theme}</TableCell>
                      <TableCell className="text-sm">{c.intent}</TableCell>
                      <TableCell className="text-sm">{c.meetings}</TableCell>
                      <TableCell className="text-sm">{c.pipeline ? formatCurrency(c.pipeline) : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="border-t bg-secondary/30 px-4 py-2 text-xs text-muted-foreground">
                Design note: followers and impressions remain diagnostics. The primary view links content to
                intent, meetings and pipeline.
              </p>
            </div>
            <AiInsightCard title="AI summary" secondaryLabel="Create sales tasks">
              {marketingAiSummary}
            </AiInsightCard>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold">High-intent accounts routed to human action</h2>
            {intentAccounts.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">
                    {a.name} <span className="ml-2 text-xs font-normal text-brand-green">Score {a.score}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.signal}</p>
                </div>
                <Button size="sm" className="shrink-0 bg-brand-green text-white hover:bg-brand-green/90">
                  Create Sales Task
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
