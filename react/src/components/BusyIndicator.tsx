import type { HTMLAttributes, ReactNode } from "react";

export interface BusyIndicatorProps extends HTMLAttributes<HTMLElement> {
  message: ReactNode;
  inline?: boolean;
}

export function BusyIndicator({ message, inline = false, className = "", ...props }: BusyIndicatorProps) {
  const classes = ["busy-indicator", inline ? "busy-indicator--inline" : "", className].filter(Boolean).join(" ");
  const content = (<>
    <span className="busy-indicator__spinner" aria-hidden="true" />
    <span className="busy-indicator__message">{message}</span>
  </>);

  return inline
    ? <span className={classes} role="status" aria-live="polite" {...props}>{content}</span>
    : <div className={classes} role="status" aria-live="polite" {...props}>{content}</div>;
}
