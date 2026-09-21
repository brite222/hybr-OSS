import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Topbar() {
  const today = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4 md:px-6">
      <MobileNav />
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search HYBR OS" className="pl-8" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="hidden rounded-md border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
          {today}
        </span>
        <Button size="sm" className="gap-1.5 bg-brand-green text-white hover:bg-brand-green/90">
          <Sparkles className="size-3.5" />
          AI Brief
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-brand-blue-dark text-xs text-white">CQ</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
