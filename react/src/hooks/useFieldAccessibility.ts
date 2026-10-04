import { useId } from "react";
export function useFieldAccessibility(providedId?: string, describedBy?: string, error?: string, helperText?: string) {
  const id = useId();
  return {
    controlId: providedId ?? id,
    messageId: `${id}-message`,
    describedBy: [describedBy, error || helperText ? `${id}-message` : ""].filter(Boolean).join(" ") || undefined,
  };
}
