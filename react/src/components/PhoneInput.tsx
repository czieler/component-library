import { useState, type ComponentProps, type FocusEvent } from "react";
import { TextInput } from "./TextInput";

type PhoneInputProps = Omit<ComponentProps<typeof TextInput>, "type" | "inputMode" | "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  invalidMessage?: string;
};

export function phoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function formatUsPhone(value: string) {
  const digits = phoneDigits(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidUsPhone(value: string) {
  return phoneDigits(value).length === 10;
}

export function PhoneInput({ value, onChange, error, invalidMessage = "Enter a valid 10-digit phone number.", onBlur, ...props }: PhoneInputProps) {
  const [touched, setTouched] = useState(false);
  const digits = phoneDigits(value);
  const validationError = touched && digits.length > 0 && digits.length !== 10 ? invalidMessage : "";
  const requiredError = touched && props.required && digits.length === 0 ? invalidMessage : "";

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(event);
  };

  return <TextInput {...props} type="tel" inputMode="numeric" autoComplete={props.autoComplete ?? "tel"} maxLength={14} value={formatUsPhone(value)} onChange={(event) => onChange(formatUsPhone(event.target.value))} onBlur={handleBlur} error={error || requiredError || validationError} />;
}
