import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/dashboard/section-header";
import { peopleCapacity } from "@/lib/mock-data";

export default async function TeamMemberProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = peopleCapacity.find((p) => p.id === id);
  if (!person) notFound();

  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="bg-brand-blue-dark text-white">{initials}</AvatarFallback>
        </Avatar>
        <SectionHeader
          eyebrow="Team member profile"
          title={`${person.name} — ${person.role}`}
          description="A respectful performance and development view."
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Execution</p>
          <p className="mt-1 text-2xl font-semibold">{person.execution}%</p>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Capacity</p>
          <p className="mt-1 text-2xl font-semibold">{person.currentLoad}%</p>
          <p className="text-xs text-muted-foreground">{person.currentLoad > 100 ? "Overloaded" : "Current"}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Development</p>
          <p className="mt-1 text-2xl font-semibold">{person.developmentGoals} goals</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Current priorities</h2>
          <ul className="mt-3 space-y-2">
            {person.priorities.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-blue" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border bg-secondary/30 p-4">
          <h2 className="text-sm font-semibold">Manager note</h2>
          <p className="mt-2 text-sm text-muted-foreground">{person.managerNote}</p>
        </div>
      </div>
    </div>
  );
}
