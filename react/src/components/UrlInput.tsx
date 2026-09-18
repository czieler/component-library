import { type ComponentProps } from "react";
import { TextInput } from "./TextInput";

export function isValidHttpUrl(value: string) {
  const candidate = value.trim();
  if (!candidate) return true;
  try {
    const url = new URL(candidate);
    return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}

type UrlInputProps = Omit<ComponentProps<typeof TextInput>, "type"> & {
  invalidMessage?: string;
};

export function UrlInput({ value, error, invalidMessage = "Enter a valid URL starting with http:// or https://.", ...props }: UrlInputProps) {
  const textValue = value == null ? "" : String(value);
  const validationError = textValue.trim() && !isValidHttpUrl(textValue) ? invalidMessage : "";
  return <TextInput {...props} type="url" inputMode="url" autoCapitalize="none" spellCheck={false} value={value} error={error || validationError} />;
}
