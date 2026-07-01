// ShinyButton: a CTA wrapped in an animated conic-gradient border, per
// docs/UXUI_DESIGN.md §2. Reserved for the 1-2 primary actions per view — not
// every button. Supports asChild so it can wrap an anchor (e.g. "View Work").
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

export function ShinyButton({
  className,
  children,
  asChild = false,
  ...props
}: ShinyButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <span className="relative inline-flex overflow-hidden rounded-lg p-[1.5px] motion-reduce:p-0">
      <span
        aria-hidden="true"
        className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,color-mix(in_oklch,var(--primary)_40%,white)_50%,var(--primary)_100%)] motion-reduce:hidden"
      />
      <Comp
        className={cn(
          "relative inline-flex h-11 items-center justify-center gap-2 rounded-[calc(0.5rem-1.5px)] bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
          "motion-reduce:border motion-reduce:border-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    </span>
  );
}
