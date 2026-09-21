import { SectionHeader } from "@/components/dashboard/section-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roleAccess } from "@/lib/mock-data";

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Admin — Users and roles"
        title="Role-based access for confidentiality and usability"
      />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Finance</TableHead>
              <TableHead>People</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Default View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roleAccess.map((r) => (
              <TableRow key={r.role}>
                <TableCell className="text-sm font-medium">{r.role}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.performance}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.finance}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.people}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.admin}</TableCell>
                <TableCell className="text-sm">{r.defaultView}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
