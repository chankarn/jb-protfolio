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
    <span className="group/shiny relative inline-flex overflow-hidden rounded-lg p-[2px] shadow-[0_4px_20px_-4px_var(--primary)] transition-shadow duration-300 hover:shadow-[0_6px_28px_-4px_var(--primary)] motion-reduce:p-0 motion-reduce:shadow-none">
      <span
        aria-hidden="true"
        className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,white_50%,var(--primary)_100%)] motion-reduce:hidden"
      />
      <Comp
        className={cn(
          "relative inline-flex h-11 items-center justify-center gap-2 rounded-[calc(0.5rem-2px)] bg-background px-6 text-sm font-semibold text-foreground transition-transform duration-200 group-hover/shiny:-translate-y-0.5 group-active/shiny:translate-y-0",
          "motion-reduce:border-2 motion-reduce:border-primary motion-reduce:transition-colors motion-reduce:hover:bg-muted",
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
