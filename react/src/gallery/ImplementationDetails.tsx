import { type ReactNode } from "react";
export function ImplementationDetails({ children }: { children: ReactNode }) {
  return (
    <div className="implementation-details">
      <strong>Implementation details</strong>
      <div>{children}</div>
    </div>
  );
}
