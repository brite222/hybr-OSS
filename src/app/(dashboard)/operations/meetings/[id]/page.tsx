import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { meetings } from "@/lib/mock-data";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = meetings.find((m) => m.id === id);
  if (!meeting) notFound();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Meeting detail"
        title={meeting.title}
        description="The meeting becomes a structured operating record."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Agenda</h2>
          <ul className="mt-3 space-y-2">
            {meeting.agenda.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-blue" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Decisions</h2>
          {meeting.decisions.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No decisions recorded yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {meeting.decisions.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg bg-brand-ink p-4 text-white">
          <p className="text-xs font-medium text-white/70">AI detected</p>
          <p className="mt-2 text-sm text-white/90">
            {meeting.aiDetected.decisions} decisions
            <br />
            {meeting.aiDetected.actions} actions
            <br />
            {meeting.aiDetected.risks} risks
            <br />
            {meeting.aiDetected.overdueFollowUps} overdue follow-up
          </p>
          <Button size="sm" className="mt-3 bg-brand-green text-white hover:bg-brand-green/90">
            Review & publish
          </Button>
        </div>
      </div>
    </div>
  );
}
