import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type AmbientGlowProps = HTMLAttributes<HTMLDivElement>;

export default function AmbientGlow({ className, ...props }: AmbientGlowProps) {
  return (
    <div
      className={cn(
        // BASE: Positioning and animation
        "absolute -z-10 rounded-[2rem] blur-2xl transition-all duration-1000 pointer-events-none",
        
        // LIGHT MODE: Subtle mist (low opacity, light colors)
        "bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 opacity-25",
        
        // DARK MODE: Neon glow (high opacity, saturated colors)
        "dark:from-primary/60 dark:via-purple-500/50 dark:to-primary/60 dark:opacity-50 dark:blur-[60px]",
        
        // HOVER: Reaction to hover (requires 'group' class on the parent)
        "group-hover:opacity-50 group-hover:duration-500 dark:group-hover:opacity-80",
        
        // Classes passed from outside (e.g., positioning inset)
        className
      )}
      // 2. Pass the rest of the props (spread operator)
      {...props}
    />
  );
}