import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        completionist:
          "border-transparent bg-completionist text-black/80 hover:bg-completionist/80",
        fighting:
          "border-transparent bg-fighting text-fighting-foreground hover:bg-fighting/80",
        action:
          "border-transparent bg-action text-action-foreground hover:bg-action/80",
        adventure:
          "border-transparent bg-adventure text-adventure-foreground hover:bg-adventure/80",
        rpg:
          "border-transparent bg-rpg text-rpg-foreground hover:bg-rpg/80",
        strategy:
          "border-transparent bg-strategy text-strategy-foreground hover:bg-strategy/80",
        simulation:
          "border-transparent bg-simulation text-simulation-foreground hover:bg-simulation/80",
        sports:
          "border-transparent bg-sports text-black/80 hover:bg-sports/80",
        racing:
          "border-transparent bg-racing text-racing-foreground hover:bg-racing/80",
        puzzle:
          "border-transparent bg-puzzle text-puzzle-foreground hover:bg-puzzle/80",
        shooter:
          "border-transparent bg-shooter text-shooter-foreground hover:bg-shooter/80",
        horror:
          "border-transparent bg-horror text-horror-foreground hover:bg-horror/80",
        roguelike:
          "border-transparent bg-roguelike text-black/80 hover:bg-roguelike/80",
        mmorpg:
          "border-transparent bg-mmorpg text-mmorpg-foreground hover:bg-mmorpg/80",
        battleroyale:
          "border-transparent bg-battleroyale text-battleroyale-foreground hover:bg-battleroyale/80",
        survival:
          "border-transparent bg-survival text-survival-foreground hover:bg-survival/80",
        stealth:
          "border-transparent bg-stealth text-stealth-foreground hover:bg-stealth/80",
        indie:
          "border-transparent bg-indie text-indie-foreground hover:bg-indie/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
