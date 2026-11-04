"use client";

import React from "react";
import { Collapse } from "antd";
import { FaqItem } from "@/data/guides/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FaqAccordionProps {
  faqs: FaqItem[];
  shortTitle: string;
}

export function FaqAccordion({ faqs, shortTitle }: FaqAccordionProps) {
  const items = faqs.map((faq, idx) => ({
    key: String(idx),
    label: (
      <span style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "1rem" }}>
        {faq.question}
      </span>
    ),
    children: (
      <p style={{ marginBottom: 0, color: "var(--text-body)" }}>{faq.answer}</p>
    ),
  }));

  return (
    <section style={{ marginBlock: 28 }}>
      <SectionHeading
        badge="Frequently Asked Questions"
        badgeTone="amber"
        title={`${shortTitle} — Common Seller Questions`}
      />
      <Collapse
        accordion
        defaultActiveKey={["0"]}
        items={items}
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-warm)",
          borderRadius: 12,
        }}
      />
    </section>
  );
}

