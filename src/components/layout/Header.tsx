"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseOutlined, MenuOutlined, ReadOutlined, SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWarmPaper } from "@/store/uiSlice";
import dynamic from "next/dynamic";
import { AppButton } from "@/components/ui/AppButton";
import { WelcomeBack } from "@/components/ui/WelcomeBack";
import { NAV_LINKS, getActiveNavHref } from "./navConfig";

// Lazy-load modal and drawer dialogs until requested
const SearchModal = dynamic(
  () => import("./SearchModal").then((mod) => mod.SearchModal),
  { ssr: false }
);

const MobileNavDrawer = dynamic(
  () => import("./MobileNavDrawer").then((mod) => mod.MobileNavDrawer),
  { ssr: false }
);

export function Header() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const activeHref = getActiveNavHref(pathname);
  const warmPaper = useAppSelector((s) => s.ui.warmPaper);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand-anchor" aria-label="FigureMint home">
            <span className="brand-monogram" aria-hidden="true">F</span>
            <span>FigureMint</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {NAV_LINKS.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.hint}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link${active ? " nav-link-active" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="header-controls">
            <WelcomeBack defaultName="Talal" variant="compact" className="desktop-only" />
            <AppButton
              variant="secondary"
              onClick={() => setSearchOpen(true)}
              leftIcon={<SearchOutlined />}
              aria-label="Search calculators and guides"
              style={{ paddingInline: 14 }}
            >
              <span className="search-label-desktop">Search</span>
              <kbd className="kbd-chip">⌘K</kbd>
            </AppButton>

            <AppButton
              variant={warmPaper ? "amber" : "ghost"}
              size="icon"
              onClick={() => dispatch(toggleWarmPaper())}
              title={warmPaper ? "Switch to Ivory Light Mode" : "Switch to Warm Paper Reading Mode"}
              aria-label="Toggle reading comfort theme"
            >
              <ReadOutlined />
            </AppButton>

            <AppButton
              variant="secondary"
              size="icon"
              className="mobile-only"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-label="Toggle navigation menu"
            >
              {drawerOpen ? <CloseOutlined /> : <MenuOutlined />}
            </AppButton>
          </div>
        </div>

        <MobileNavDrawer open={drawerOpen} activeHref={activeHref} onClose={closeDrawer} />
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
