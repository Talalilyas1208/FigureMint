"use client";

import React, { useState } from "react";
import { CheckCircleOutlined, SendOutlined } from "@ant-design/icons";
import { AppCard } from "@/components/ui/AppCard";
import { AppInput } from "@/components/ui/AppInput";
import { AppSelect } from "@/components/ui/AppSelect";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";

const TOPIC_OPTIONS = [
  { value: "fee-update", label: "Report a 2026 Platform Fee Update" },
  { value: "calculator-request", label: "Request a New Profit Calculator" },
  { value: "bug-report", label: "Report a Formula or UI Issue" },
  { value: "partnership", label: "Editorial / Advertising Inquiry" },
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("fee-update");
  const [platformName, setPlatformName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, platformName, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Please verify all fields and try again.");
      } else {
        setTicket(data.ticketRef);
      }
    } catch {
      setError("Network error while sending message.");
    } finally {
      setLoading(false);
    }
  };

  if (ticket) {
    return (
      <AppCard>
        <AppBadge tone="emerald" icon={<CheckCircleOutlined />}>
          Received · Ref #{ticket}
        </AppBadge>
        <h2 style={{ marginTop: 12, fontSize: "1.25rem" }}>Thank you for helping keep FigureMint accurate.</h2>
        <p style={{ marginBottom: 16 }}>
          Our editorial team reviews marketplace fee updates within 1–2 business days.
        </p>
        <AppButton variant="secondary" onClick={() => setTicket("")}>
          Send Another Note
        </AppButton>
      </AppCard>
    );
  }

  return (
    <AppCard>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <AppInput
          label="Your Name"
          required
          minLength={2}
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Rivera"
        />
        <AppInput
          label="Email Address"
          type="email"
          required
          maxLength={120}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@storefront.com"
        />
        <AppSelect label="Inquiry Topic" value={topic} options={TOPIC_OPTIONS} onChange={setTopic} />
        <AppInput
          label="Marketplace or Payment Processor (Optional)"
          maxLength={80}
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
          placeholder="e.g., TikTok Shop UK, Etsy, Stripe"
        />
        <div className="ui-field">
          <label htmlFor="contact-msg" className="ui-label">Details</label>
          <textarea
            id="contact-msg"
            required
            minLength={12}
            maxLength={1200}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share the fee schedule link or calculator idea..."
            className="ui-input-wrap"
            style={{ padding: 12, resize: "vertical", minHeight: 110 }}
          />
        </div>
        {error && <div role="alert" style={{ color: "#A94520", fontWeight: 600 }}>{error}</div>}
        <AppButton type="submit" variant="primary" loading={loading} leftIcon={<SendOutlined />}>
          Submit Secure Message
        </AppButton>
      </form>
    </AppCard>
  );
}

