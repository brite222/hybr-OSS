import type { AppRole } from "@/generated/prisma/enums";

// Which top-level nav sections (and everything nested under them) each role can reach.
// Mirrors the Admin > Roles matrix (performance/finance/people/admin columns).
export const ROLE_ALLOWED_PATHS: Record<AppRole, string[]> = {
  CEO: [
    "/",
    "/my-work",
    "/performance",
    "/growth",
    "/delivery",
    "/operations",
    "/finance",
    "/product",
    "/people",
    "/intelligence",
    "/admin",
  ],
  DEPARTMENT_LEAD: [
    "/",
    "/my-work",
    "/performance",
    "/growth",
    "/delivery",
    "/operations",
    "/product",
    "/people",
    "/intelligence",
  ],
  PROJECT_MANAGER: ["/", "/my-work", "/delivery", "/operations", "/intelligence"],
  TEAM_MEMBER: ["/", "/my-work", "/intelligence"],
  FINANCE_ADMIN: ["/", "/my-work", "/finance", "/intelligence"],
  SYSTEM_ADMIN: ["/", "/my-work", "/performance", "/finance", "/people", "/admin", "/intelligence"],
};

export const ROLE_DEFAULT_PATH: Record<AppRole, string> = {
  CEO: "/",
  DEPARTMENT_LEAD: "/performance",
  PROJECT_MANAGER: "/delivery",
  TEAM_MEMBER: "/my-work",
  FINANCE_ADMIN: "/finance",
  SYSTEM_ADMIN: "/admin",
};

export function isPathAllowedForRole(pathname: string, role: AppRole): boolean {
  const allowed = ROLE_ALLOWED_PATHS[role] ?? [];
  return allowed.some((prefix) => {
    if (prefix === "/") return pathname === "/";
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}
