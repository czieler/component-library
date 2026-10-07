import type { HTMLAttributes, ReactNode } from "react";
export interface BusyIndicatorProps extends HTMLAttributes<HTMLElement> {
  message: ReactNode;
  inline?: boolean;
}
export function BusySpinner({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  const classes = ["busy-indicator__spinner", className].filter(Boolean).join(" ");
  return <span className={classes} aria-hidden="true" {...props} />;
}
export function BusyIndicator({ message, inline = false, className = "", ...props }: BusyIndicatorProps) {
  const classes = ["busy-indicator", inline ? "busy-indicator--inline" : "", className].filter(Boolean).join(" ");
  const content = (<>
    <BusySpinner />
    <span className="busy-indicator__message">{message}</span>
  </>);
  return inline
    ? <span
      className={classes}
      role="status"
      aria-live="polite"
      {...props}>{content}</span>
    : <div
      className={classes}
      role="status"
      aria-live="polite"
      {...props}>{content}</div>;
}
