"use client";

import React from "react";
import dynamic from "next/dynamic";

const ProfitBotWidget = dynamic(
  () => import("./ProfitBotWidget").then((mod) => mod.ProfitBotWidget),
  { ssr: false }
);

export function ProfitBotLoader() {
  return <ProfitBotWidget />;
}
