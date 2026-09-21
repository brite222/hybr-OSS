import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminCard({ title, href }: { title: string; href?: string }) {
  const classes = cn(
    "rounded-lg border p-4 text-center text-sm font-medium transition-colors",
    href ? "bg-card hover:border-brand-blue hover:text-brand-blue" : "bg-secondary/40 text-muted-foreground",
  );

  if (!href) {
    return <div className={classes}>{title}</div>;
  }

  return (
    <Link href={href} className={classes}>
      {title}
    </Link>
  );
}
