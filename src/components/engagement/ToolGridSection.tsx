"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { GUIDES_AND_TRUST } from "@/data/guidesAndTrust";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleBookmark } from "@/store/uiSlice";
import { AppCard } from "@/components/ui/AppCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STATIC_PILLS = [
  { id: "all", label: "All Tools" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "ads-roas", label: "Ads & ROAS" },
  { id: "payments", label: "Payments" },
  { id: "freelance", label: "Freelance" },
  { id: "saved", label: "Saved ★" },
] as const;

export function ToolGridSection() {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector((s) => s.catalog.items);
  const bookmarks = useAppSelector((s) => s.ui.bookmarks);
  const [filter, setFilter] = useState<string>("all");

  const visibleTools = useMemo(() => {
    if (filter === "all") return catalog;
    if (filter === "saved") return catalog.filter((tool) => bookmarks.includes(tool.slug));
    return catalog.filter((tool) => tool.category === filter);
  }, [catalog, bookmarks, filter]);

  const guides = useMemo(() => GUIDES_AND_TRUST.filter((g) => g.kind === "Guide"), []);

  return (
    <div id="all-tools">
      <SectionHeading
        badge="2026 Fee Schedules"
        title="High-Precision Profit & Fee Calculators"
        subtitle="Filter by channel or star your daily tools for instant ⌘K access."
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
        {STATIC_PILLS.map((pill) => (
          <AppButton
            key={pill.id}
            variant={filter === pill.id ? "primary" : "secondary"}
            onClick={() => setFilter(pill.id)}
            style={{ minHeight: 42, padding: "6px 14px", fontSize: "0.88rem" }}
          >
            {pill.id === "all" ? `${pill.label} (${catalog.length})` : pill.label}
          </AppButton>
        ))}
      </div>

      <div className="tools-grid">
        {visibleTools.map((tool) => {
          const saved = bookmarks.includes(tool.slug);
          return (
            <AppCard key={tool.slug} hoverable style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <AppBadge tone="amber">{tool.badge}</AppBadge>
                  <button
                    type="button"
                    onClick={() => dispatch(toggleBookmark(tool.slug))}
                    aria-label={`Bookmark ${tool.shortTitle}`}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: saved ? "#F5A524" : "var(--text-muted)", fontSize: 18 }}
                  >
                    {saved ? <StarFilled /> : <StarOutlined />}
                  </button>
                </div>
                <h3 style={{ marginBottom: 6 }}>{tool.title}</h3>
                <p style={{ fontSize: "0.93rem", marginBottom: 10 }}>{tool.summary}</p>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {tool.formulaNote}
                </div>
              </div>
              <AppButton href={`/${tool.slug}`} variant="secondary" rightIcon={<ArrowRightOutlined />}>
                Open Calculator
              </AppButton>
            </AppCard>
          );
        })}
      </div>

      <div style={{ marginTop: 40 }}>
        <SectionHeading badge="Editorial Guides" badgeTone="amber" title="Formula Walkthroughs & Methodology" />
        <div className="tools-grid">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} style={{ textDecoration: "none", color: "inherit" }}>
              <AppCard hoverable>
                <div style={{ marginBottom: 10 }}>
                  <AppBadge tone="stone">{guide.readingTime}</AppBadge>
                </div>
                <h3>{guide.title}</h3>
                <p style={{ marginBottom: 0, fontSize: "0.93rem" }}>{guide.summary}</p>
              </AppCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
