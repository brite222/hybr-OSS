import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ExecutionScoreCard } from "@/components/dashboard/execution-score-card";
import { ActionRow } from "@/components/dashboard/action-row";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ACTION_STATUSES } from "@/lib/types";
import { myActions } from "@/lib/mock-data";

export default function MyWorkPage() {
  const dueToday = myActions.filter((a) => a.status === "Today").length;
  const overdue = myActions.filter((a) => a.status === "Overdue").length;
  const blocked = myActions.filter((a) => a.blocked).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader eyebrow="My Work" title="The everyday execution screen" />
        <Button
          variant="outline"
          className="shrink-0"
          nativeButton={false}
          render={<Link href="/my-work/weekly" />}
        >
          Weekly priorities <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="Today">
            <TabsList>
              {ACTION_STATUSES.map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
            {ACTION_STATUSES.map((status) => {
              const items = myActions.filter((a) => a.status === status);
              return (
                <TabsContent key={status} value={status} className="mt-4 space-y-2">
                  {items.length === 0 && (
                    <p className="text-sm text-muted-foreground">No actions in this view.</p>
                  )}
                  {items.map((a) => (
                    <ActionRow key={a.id} action={a} />
                  ))}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        <ExecutionScoreCard score={92} dueToday={dueToday} overdue={overdue} blocked={blocked} />
      </div>
    </div>
  );
}
