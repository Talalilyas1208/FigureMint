import React from "react";
import clsx from "clsx";

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  asSection?: boolean;
  padding?: "sm" | "md" | "lg";
}

const PAD_MAP = {
  sm: "16px",
  md: "clamp(16px, 4vw, 22px)",
  lg: "clamp(16px, 4.5vw, 28px)",
};

export function AppCard({
  hoverable = false,
  asSection = false,
  padding = "md",
  className,
  style,
  children,
  ...rest
}: AppCardProps) {
  const Tag = asSection ? "section" : "div";

  return (
    <Tag
      className={clsx("ui-card", hoverable && "ui-card-hover", className)}
      style={{ padding: PAD_MAP[padding], ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

