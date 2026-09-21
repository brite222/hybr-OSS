import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";
import { prisma } from "@/lib/prisma";

export default async function WeeklyPrioritiesPage() {
  const weeklyPriorities = await prisma.weeklyPriority.findMany();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Weekly priorities"
        title="A simple planning screen that connects work to outcomes"
      />

      <div className="rounded-lg bg-brand-ink p-5 text-white">
        <p className="text-sm font-semibold">Week of September 21</p>
        <div className="mt-4 space-y-3">
          {weeklyPriorities.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 rounded-md border border-white/15 p-3"
            >
              <div>
                <p className="text-sm font-medium">
                  <span className="mr-2 text-white/40">{i + 1}</span>
                  {p.title}
                </p>
                <p className="text-xs text-white/60">{p.description}</p>
              </div>
              <Button size="sm" variant="secondary" className="shrink-0 bg-white/10 text-white hover:bg-white/20">
                Connect actions ({p.connectedActions})
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
