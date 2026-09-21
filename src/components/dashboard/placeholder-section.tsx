import { SectionHeader } from "@/components/dashboard/section-header";

export function PlaceholderSection({
  eyebrow,
  title,
  description,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
}) {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">{note}</div>
    </div>
  );
}
