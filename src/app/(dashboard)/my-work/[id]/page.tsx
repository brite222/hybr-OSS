import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/dashboard/section-header";
import { myActions } from "@/lib/mock-data";

export default async function ActionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const action = myActions.find((a) => a.id === id);
  if (!action) notFound();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Action detail"
        title={action.title}
        description="Every commitment has context, outcome and evidence."
      />

      <div className="flex flex-wrap gap-2">
        <Badge variant={action.status === "Overdue" ? "destructive" : "outline"}>{action.status}</Badge>
        <Badge variant="outline">Owner {action.owner}</Badge>
        <Badge variant="outline">Due {action.dueLabel}</Badge>
        <Badge variant="outline">Priority {action.priority}</Badge>
        <Badge variant="outline">Source {action.source}</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Expected outcome</h2>
          <p className="mt-2 text-sm text-muted-foreground">{action.expectedOutcome}</p>
          {action.linkedKpi && (
            <p className="mt-2 text-xs text-muted-foreground">Linked KPI: {action.linkedKpi}</p>
          )}
          {action.blocked && (
            <div className="mt-3 rounded-md border border-status-warning/40 bg-status-warning/5 p-2.5 text-xs">
              <span className="font-medium">Blocked:</span> {action.blockedReason}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Completion evidence</h2>
          {action.completionEvidence ? (
            <p className="mt-2 text-sm text-muted-foreground">{action.completionEvidence}</p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Required before this action can be marked complete.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
