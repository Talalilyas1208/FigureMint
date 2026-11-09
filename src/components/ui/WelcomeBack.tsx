"use client";

import React, { useEffect, useState } from "react";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

interface WelcomeBackProps {
  defaultName?: string;
  variant?: "hero" | "compact";
  className?: string;
}

export function WelcomeBack({
  defaultName = "Talal",
  variant = "hero",
  className = "",
}: WelcomeBackProps) {
  const [userName, setUserName] = useState<string>(defaultName);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(defaultName);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("fm_user_name");
    if (saved && saved.trim()) {
      setUserName(saved.trim());
      setTempName(saved.trim());
    } else {
      localStorage.setItem("fm_user_name", defaultName);
    }
  }, [defaultName]);

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = tempName.trim() || defaultName;
    setUserName(clean);
    setTempName(clean);
    localStorage.setItem("fm_user_name", clean);
    setIsEditing(false);
  };

  if (!mounted) {
    return (
      <div className={`welcome-back-pill welcome-back-${variant} ${className}`}>
        <span className="wave-emoji" aria-hidden="true">👋</span>
        <span>Welcome back, <strong>{defaultName}</strong></span>
      </div>
    );
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSaveName} className={`welcome-back-pill welcome-back-editing ${className}`}>
        <span className="wave-emoji" aria-hidden="true">👋</span>
        <label htmlFor="user-name-input" className="sr-only">Your Name</label>
        <input
          id="user-name-input"
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          autoFocus
          maxLength={24}
          className="welcome-name-input"
          placeholder="Your name"
        />
        <button type="submit" className="welcome-save-btn" aria-label="Save name">
          <CheckOutlined />
        </button>
      </form>
    );
  }

  return (
    <div className={`welcome-back-pill welcome-back-${variant} ${className}`}>
      <span className="wave-emoji" aria-hidden="true">👋</span>
      <span>
        Welcome back, <strong className="welcome-name-text">{userName}</strong>
      </span>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="welcome-edit-btn"
        aria-label="Edit your display name"
        title="Click to personalize name"
      >
        <EditOutlined />
      </button>
    </div>
  );
}
