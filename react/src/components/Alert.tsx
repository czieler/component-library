import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  variant?: AlertVariant;
  title?: ReactNode;
  children: ReactNode;
};

export function Alert({ variant = "info", title, children, className = "", role, ...props }: AlertProps) {
  const classes = ["alert", `alert--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div {...props} className={classes} role={role ?? (variant === "error" ? "alert" : "status")}>
      {title ? <div className="alert__title">{title}</div> : null}
      <div className="alert__content">{children}</div>
    </div>
  );
}
