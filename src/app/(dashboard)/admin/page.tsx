import { PlaceholderSection } from "@/components/dashboard/placeholder-section";

export default function AdminPage() {
  return (
    <PlaceholderSection
      eyebrow="Admin"
      title="Control center for system configuration"
      description="Profile, notifications, departments, users, roles, KPI definitions, targets, integrations, alerts, data, audit logs."
      note="Next up: KPI dictionary editor (name, definition, formula, owner, source, frequency, target, thresholds, priority, effective date, version history), role-based access matrix, integrations status, and audit log."
    />
  );
}
