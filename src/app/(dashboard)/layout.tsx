import { auth } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session!.user;

  return (
    <AppShell role={user.role} user={{ name: user.name ?? "", email: user.email ?? "" }}>
      {children}
    </AppShell>
  );
}
