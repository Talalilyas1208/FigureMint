import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const badgeVariants = cva("ui-badge", {
  variants: {
    tone: {
      emerald: "ui-badge-emerald",
      amber: "ui-badge-amber",
      stone: "ui-badge-stone",
    },
  },
  defaultVariants: {
    tone: "emerald",
  },
});

interface AppBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function AppBadge({
  tone,
  icon,
  className,
  children,
  ...rest
}: AppBadgeProps) {
  return (
    <span className={clsx(badgeVariants({ tone }), className)} {...rest}>
      {icon}
      {children}
    </span>
  );
}

