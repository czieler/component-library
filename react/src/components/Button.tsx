import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "default" | "small";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "default",
  loading = false,
  loadingLabel,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    "button",
    `button--${variant}`,
    size === "small" ? "button--small" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      {...props}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <>
          <span className="button__spinner" aria-hidden="true" />
          {loadingLabel ? <span>{loadingLabel}</span> : null}
        </>
      ) : (
        <>
          {leftIcon ? <span className="button__icon" aria-hidden="true">{leftIcon}</span> : null}
          <span className="button__label">{children}</span>
          {rightIcon ? <span className="button__icon" aria-hidden="true">{rightIcon}</span> : null}
        </>
      )}
    </button>
  );
}
