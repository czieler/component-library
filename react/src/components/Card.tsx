import type { HTMLAttributes, ReactNode } from "react";

export type CardPadding = "default" | "compact" | "none";
export type CardElement = "div" | "section" | "article";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: CardElement;
  padding?: CardPadding;
  elevated?: boolean;
  children: ReactNode;
};

export function Card({ as = "section", padding = "default", elevated = false, className = "", children, ...props }: CardProps) {
  const Component = as;
  const classes = [
    "card",
    `card--padding-${padding}`,
    elevated ? "card--elevated" : "",
    className,
  ].filter(Boolean).join(" ");
  return <Component {...props} className={classes}>{children}</Component>;
}
