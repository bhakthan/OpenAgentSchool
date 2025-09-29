import { cn } from "@/lib/utils";

export function conceptSurface(className?: string) {
  return cn("rounded-lg border border-border/60 bg-muted/60 text-foreground", className);
}

export function conceptSurfaceSoft(className?: string) {
  return cn("rounded-lg border border-border/40 bg-muted/40 text-foreground", className);
}

export function conceptCodeBlock(className?: string) {
  return cn(
    "block rounded-md border border-border/60 bg-card/80 text-foreground font-mono text-sm leading-relaxed whitespace-pre-wrap",
    className
  );
}

export function conceptPill(className?: string) {
  return cn(
    "inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ring-1 ring-border/60 bg-muted/80 text-foreground",
    className
  );
}
