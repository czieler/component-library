import { useFieldAccessibility } from "../hooks/useFieldAccessibility";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
  clearable?: boolean;
  onClear?: () => void;
  clearIcon?: ReactNode;
  requiredIndicatorPosition?: "bottom" | "left";
  passwordToggle?: boolean;
};
export function TextInput({
  label,
  error,
  helperText,
  clearable = false,
  onClear,
  clearIcon = "×",
  requiredIndicatorPosition = "left",
  passwordToggle = false,
  id: providedId,
  className = "",
  "aria-describedby": ariaDescribedby,
  "aria-invalid": ariaInvalid,
  ...inputProps
}: TextInputProps) {
  const { controlId: inputId, messageId, describedBy } = useFieldAccessibility(providedId, ariaDescribedby, error, helperText);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = inputProps.type === "password";
  const effectiveType = isPassword && passwordToggle && passwordVisible ? "text" : inputProps.type;
  return (
    <div
      className={`field ${inputProps.required
          ? `field--required field--required-${requiredIndicatorPosition}`
          : ""
        } ${inputProps.placeholder ? "field--has-placeholder" : ""} ${inputProps.disabled ? "field--disabled" : ""} ${clearable ? "field--clearable" : ""} ${error ? "field--error" : ""
        }`}
    >
      <div className="field__control">
        <input
          {...inputProps}
          type={effectiveType}
          id={inputId}
          className={className}
          placeholder={inputProps.placeholder || " "}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={describedBy}
        />
        <label htmlFor={inputId}>{label}</label>
        {isPassword && passwordToggle && !inputProps.disabled && (
          <button
            className="field__password-toggle"
            type="button"
            onClick={() => setPasswordVisible((value) => !value)}
            aria-label={passwordVisible ? `Hide ${label}` : `Show ${label}`}
            aria-pressed={passwordVisible}
          >
            {passwordVisible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        )}
        {clearable && inputProps.value && !inputProps.disabled && (
          <button
            className="field__clear"
            type="button"
            onClick={onClear}
            aria-label={`Clear ${label}`}
          >
            <span aria-hidden="true">{clearIcon}</span>
          </button>
        )}
      </div>
      {(error || helperText) && (
        <small id={messageId} className="field__message">
          {error || helperText}
        </small>
      )}
    </div>
  );
}
