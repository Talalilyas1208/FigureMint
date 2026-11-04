"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchOutlined, StarFilled } from "@ant-design/icons";
import { GUIDES_AND_TRUST } from "@/data/guidesAndTrust";
import { SEO_CATEGORY_HUBS } from "@/data/seoCategories";
import { useAppSelector } from "@/store/hooks";
import { AppModal } from "@/components/ui/AppModal";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";

interface SearchResultItem {
  title: string;
  href: string;
  summary: string;
  badge: string;
  tone: "emerald" | "amber" | "stone";
  haystack: string;
}

const STATIC_DOCS: SearchResultItem[] = [
  ...SEO_CATEGORY_HUBS.map((h) => ({
    title: h.h1,
    href: `/${h.slug}`,
    summary: h.description,
    badge: "Category",
    tone: "emerald" as const,
    haystack: `${h.title} ${h.description} ${h.slug}`.toLowerCase(),
  })),
  ...GUIDES_AND_TRUST.map((d) => ({
    title: d.title,
    href: d.href,
    summary: d.summary,
    badge: d.kind,
    tone: "stone" as const,
    haystack: `${d.title} ${d.summary} ${d.keywords.join(" ")}`.toLowerCase(),
  })),
];

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const catalog = useAppSelector((s) => s.catalog.items);
  const bookmarks = useAppSelector((s) => s.ui.bookmarks);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const calcItems: SearchResultItem[] = catalog.map((c) => ({
      title: c.title,
      href: `/${c.slug}`,
      summary: c.summary,
      badge: bookmarks.includes(c.slug) ? "Saved" : c.badge,
      tone: bookmarks.includes(c.slug) ? "emerald" : "amber",
      haystack: `${c.title} ${c.summary} ${c.keywords.join(" ")}`.toLowerCase(),
    }));
    const all = [...calcItems, ...STATIC_DOCS];
    return q ? all.filter((item) => item.haystack.includes(q)) : all.slice(0, 8);
  }, [query, catalog, bookmarks]);

  const navigateTo = (href: string) => {
    onClose();
    setQuery("");
    router.push(href);
  };

  return (
    <AppModal open={open} title="Search calculators and guides" onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--border-warm)" }}>
        <SearchOutlined style={{ color: "var(--color-primary)", fontSize: 18 }} />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIdx(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIdx((i) => Math.min(results.length - 1, i + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIdx((i) => Math.max(0, i - 1));
            } else if (e.key === "Enter" && results[activeIdx]) {
              navigateTo(results[activeIdx].href);
            }
          }}
          placeholder="Search TikTok Shop, Etsy, ROAS, Stripe, Privacy..."
          className="ui-input-el"
          aria-label="Search tools and guides"
        />
        <AppButton variant="ghost" onClick={onClose}>Esc</AppButton>
      </div>

      <div style={{ maxHeight: "65dvh", overflowY: "auto", padding: 10 }}>
        {results.length === 0 ? (
          <p style={{ padding: 16, textAlign: "center", color: "var(--text-muted)" }}>
            No matching tools or guides for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          results.map((item, idx) => (
            <button
              key={item.href + item.title}
              type="button"
              onClick={() => navigateTo(item.href)}
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid transparent",
                background: idx === activeIdx ? "var(--bg-section)" : "transparent",
                cursor: "pointer",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-heading)" }}>{item.title}</div>
                <div style={{ fontSize: "0.86rem", color: "var(--text-body)" }}>{item.summary}</div>
              </div>
              <AppBadge tone={item.tone} icon={item.badge === "Saved" ? <StarFilled /> : undefined}>
                {item.badge}
              </AppBadge>
            </button>
          ))
        )}
      </div>
    </AppModal>
  );
}
