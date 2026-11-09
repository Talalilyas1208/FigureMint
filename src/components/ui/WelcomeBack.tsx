"use client";

import React from "react";

interface WelcomeBackProps {
  variant?: "hero" | "compact";
  className?: string;
  defaultName?: string;
}

export function WelcomeBack({
  variant = "hero",
  className = "",
}: WelcomeBackProps) {
  return (
    <div className={`welcome-back-pill welcome-back-${variant} ${className}`}>
      <span className="wave-emoji" aria-hidden="true">👋</span>
      <span className="welcome-name-text">Welcome</span>
    </div>
  );
}
