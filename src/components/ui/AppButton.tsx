import React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva("ui-btn", {
  variants: {
    variant: {
      primary: "ui-btn-primary",
      secondary: "ui-btn-secondary",
      amber: "ui-btn-amber",
      ghost: "ui-btn-ghost",
    },
    size: {
      md: "",
      icon: "ui-btn-icon",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export function AppButton({
  variant,
  size,
  href,
  leftIcon,
  rightIcon,
  loading,
  className,
  children,
  disabled,
  style,
  ...rest
}: AppButtonProps) {
  const mergedClass = clsx(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={mergedClass} style={style}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={mergedClass}
      disabled={disabled || loading}
      style={style}
      {...rest}
    >
      {leftIcon}
      {loading ? "Working..." : children}
      {!loading && rightIcon}
    </button>
  );
}
