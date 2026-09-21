import type { LucideIcon } from "lucide-react";
import {
  Home,
  ListChecks,
  Gauge,
  TrendingUp,
  Truck,
  Workflow,
  Wallet,
  FlaskConical,
  Users,
  Sparkles,
  Settings,
} from "lucide-react";
import type { AppRole } from "@/generated/prisma/enums";
import { ROLE_ALLOWED_PATHS } from "@/lib/permissions";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home, description: "Personal command center" },
  { label: "My Work", href: "/my-work", icon: ListChecks, description: "Actions + priorities" },
  { label: "Performance", href: "/performance", icon: Gauge, description: "Company scorecard" },
  { label: "Growth", href: "/growth", icon: TrendingUp, description: "Marketing + sales" },
  { label: "Delivery", href: "/delivery", icon: Truck, description: "Projects + clients" },
  { label: "Operations", href: "/operations", icon: Workflow, description: "Actions, meetings, priorities" },
  { label: "Finance", href: "/finance", icon: Wallet, description: "Invoices, cash, margin" },
  { label: "Product", href: "/product", icon: FlaskConical, description: "Experiments + adoption" },
  { label: "People", href: "/people", icon: Users, description: "Capacity + performance" },
  { label: "Intelligence", href: "/intelligence", icon: Sparkles, description: "AI, alerts, reports" },
  { label: "Admin", href: "/admin", icon: Settings, description: "KPIs, users, integrations" },
];

export function getNavItemsForRole(role: AppRole): NavItem[] {
  const allowed = new Set(ROLE_ALLOWED_PATHS[role]);
  return NAV_ITEMS.filter((item) => allowed.has(item.href));
}
