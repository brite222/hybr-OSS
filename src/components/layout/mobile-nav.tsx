"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getNavItemsForRole } from "@/lib/nav";
import { HybrLogo } from "@/components/layout/hybr-logo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { AppRole } from "@/generated/prisma/enums";

export function MobileNav({ role }: { role: AppRole }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = getNavItemsForRole(role);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <HybrLogo />
        </SheetHeader>
        <nav className="space-y-0.5 p-3">
          {items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
