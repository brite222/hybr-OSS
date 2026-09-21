import { AlertCard } from "@/components/dashboard/alert-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attentionAlerts } from "@/lib/mock-data";

export default function IntelligencePage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Alert center" title="Actionable exception management" />

      <Tabs defaultValue="mine">
        <TabsList>
          <TabsTrigger value="mine">My Alerts</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        <TabsContent value="mine" className="mt-4 space-y-3">
          {attentionAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>
        <TabsContent value="department" className="mt-4">
          <p className="text-sm text-muted-foreground">No department-level alerts assigned to you yet.</p>
        </TabsContent>
        <TabsContent value="company" className="mt-4">
          <p className="text-sm text-muted-foreground">Company-wide alert feed coming online with source integrations.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
