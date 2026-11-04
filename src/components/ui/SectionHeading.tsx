import React from "react";
import { AppBadge } from "./AppBadge";

interface SectionHeadingProps {
  badge?: string;
  badgeTone?: "emerald" | "amber" | "stone";
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  badge,
  badgeTone = "emerald",
  title,
  subtitle,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div style={{ marginBottom: 22 }}>
      {badge && (
        <div style={{ marginBottom: 10 }}>
          <AppBadge tone={badgeTone}>{badge}</AppBadge>
        </div>
      )}
      <HeadingTag>{title}</HeadingTag>
      {subtitle && (
        <p style={{ color: "var(--text-body)", maxWidth: 680, marginBottom: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

