import type { ComponentProps } from "react";
import { TextInput } from "./TextInput";

type PasswordInputProps = Omit<ComponentProps<typeof TextInput>, "type" | "passwordToggle">;

export function PasswordInput(props: PasswordInputProps) {
  return <TextInput {...props} type="password" passwordToggle />;
}
