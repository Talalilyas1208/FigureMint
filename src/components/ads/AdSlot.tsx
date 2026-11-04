"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotVariant = "leaderboard" | "in-article" | "sidebar";

interface AdSlotProps {
  id: string;
  slotId?: string;
  variant: AdSlotVariant;
}

const VARIANT_META: Record<AdSlotVariant, { className: string; format: string }> = {
  leaderboard: { className: "ad-slot-leaderboard", format: "horizontal" },
  "in-article": { className: "ad-slot-in-article", format: "fluid" },
  sidebar: { className: "ad-slot-sidebar", format: "rectangle" },
};

export function AdSlot({ id, slotId = "0000000000", variant }: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const [previewForced, setPreviewForced] = useState(false);
  const meta = VARIANT_META[variant];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setPreviewForced(params.get("adpreview") === "1");
    }
  }, []);

  useEffect(() => {
    if (!publisherId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* Safe no-op if blocked by client extension */
    }
  }, [publisherId, id]);

  // Hide empty ad boxes before publisher approval unless ?adpreview=1 is active
  if (!publisherId && !previewForced) {
    return null;
  }

  return (
    <aside
      aria-label="Sponsored advertisement"
      className={variant === "sidebar" ? "ad-well-outer-sidebar" : "ad-well-outer"}
    >
      <div className="ad-well">
        <span className="ad-well-label">Advertisement</span>
        <div className={meta.className}>
          {publisherId ? (
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "100%" }}
              data-ad-client={publisherId}
              data-ad-slot={slotId}
              data-ad-format={meta.format}
              data-full-width-responsive="true"
            />
          ) : (
            <div
              style={{
                width: "100%",
                minHeight: "inherit",
                border: "1px dashed var(--border-warm-strong)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}
            >
              Ad Slot Preview ({variant})
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
