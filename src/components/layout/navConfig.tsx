import React from "react";
import {
  AppstoreOutlined,
  CreditCardOutlined,
  HomeOutlined,
  RiseOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CALCULATORS, TOP_NAV_ITEMS } from "@/data/calculators";

interface NavLinkItem {
  label: string;
  href: string;
  hint: string;
  icon: React.ReactNode;
}

const CATEGORY_META: Record<string, { icon: React.ReactNode; hint: string }> = {
  ecommerce: { icon: <ShopOutlined />, hint: "TikTok Shop, Etsy & Shopify fees" },
  "ads-roas": { icon: <RiseOutlined />, hint: "Break-even ROAS & target CPA" },
  payments: { icon: <CreditCardOutlined />, hint: "Stripe vs. PayPal & FX fees" },
  freelance: { icon: <UserOutlined />, hint: "Upwork fees & take-home pay" },
  all: { icon: <AppstoreOutlined />, hint: "Browse every calculator" },
};

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/", hint: "Quick profit estimator", icon: <HomeOutlined /> },
  ...TOP_NAV_ITEMS.map((item) => ({
    label: item.label,
    href: item.href,
    hint: CATEGORY_META[item.category].hint,
    icon: CATEGORY_META[item.category].icon,
  })),
];

/** Returns the nav href to highlight, including the parent category on calculator pages. */
export function getActiveNavHref(pathname: string): string {
  const direct = NAV_LINKS.find((link) => link.href === pathname);
  if (direct) return direct.href;
  const calc = CALCULATORS.find((c) => `/${c.slug}` === pathname);
  if (!calc) return "";
  return TOP_NAV_ITEMS.find((n) => n.category === calc.category)?.href ?? "";
}

