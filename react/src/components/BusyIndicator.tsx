import type { HTMLAttributes, ReactNode } from "react";

export interface BusyIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  message: ReactNode;
}

export function BusyIndicator({ message, className = "", ...props }: BusyIndicatorProps) {
  const classes = ["busy-indicator", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="status" aria-live="polite" {...props}>
      <span className="busy-indicator__spinner" aria-hidden="true" />
      <span className="busy-indicator__message">{message}</span>
    </div>
  );
}
