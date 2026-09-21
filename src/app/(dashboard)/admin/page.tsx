import { SectionHeader } from "@/components/dashboard/section-header";
import { AdminCard } from "@/components/dashboard/admin-card";

const ADMIN_SECTIONS: { title: string; href?: string }[] = [
  { title: "Profile" },
  { title: "Notifications" },
  { title: "Departments" },
  { title: "Users & Roles", href: "/admin/roles" },
  { title: "KPI Definitions", href: "/admin/kpi-dictionary" },
  { title: "Targets" },
  { title: "Integrations", href: "/admin/integrations" },
  { title: "Alerts" },
  { title: "Data" },
  { title: "Audit Logs", href: "/admin/audit-logs" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Admin" title="Control center for system configuration" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ADMIN_SECTIONS.map((s) => (
          <AdminCard key={s.title} title={s.title} href={s.href} />
        ))}
      </div>
    </div>
  );
}
