"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "./navConfig";

interface MobileNavDrawerProps {
  open: boolean;
  activeHref: string;
  onClose: () => void;
}

export function MobileNavDrawer({ open, activeHref, onClose }: MobileNavDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <nav aria-label="Mobile navigation" className="mobile-drawer">
      <div className="mobile-drawer-grid">
        {NAV_LINKS.map((item) => {
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`drawer-tile${active ? " drawer-tile-active" : ""}`}
            >
              <span className="drawer-tile-icon">{item.icon}</span>
              <span>
                <span className="drawer-tile-label">{item.label}</span>
                <span className="drawer-tile-hint">{item.hint}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
