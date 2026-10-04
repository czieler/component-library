import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { TextInput } from "../components/TextInput";
import { ImplementationDetails } from "./ImplementationDetails";
import { PasswordInput } from "../components/PasswordInput";
import { PhoneInput } from "../components/PhoneInput";
import { Select } from "../components/Select";
import { CountryCombobox } from "../components/CountryCombobox";
import { Textarea } from "../components/Textarea";
export const countryOptions = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
];
export const frameworkOptions = [
  { label: "React + TypeScript", value: "react" },
  { label: "Vanilla JavaScript", value: "vanilla" },
  { label: "Svelte (planned)", value: "svelte" },
];
export function InputsDemo() {
  const [clearableValue, setClearableValue] = useState("A reusable value");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [optionalPhone, setOptionalPhone] = useState("");
  const [country, setCountry] = useState("US");
  const dropdownIcon = <ChevronDown size={18} strokeWidth={2} />;
  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Form controls</p>
        <h2>Inputs that keep the native web underneath.</h2>
        <p className="lede">
          Each control adds a floating label and clear state model without
          hiding normal HTML behavior.
        </p>
      </div>
      <div className="component-showcase">
        <section className="demo-section">
          <h3>Text input</h3>
          <p className="component-description">
            A labeled input that supports populated, required, error, disabled,
            and clearable states.
          </p>
          <div className="state-grid">
            <TextInput label="Default" name="default-name" />
            <TextInput
              label="Populated"
              value="Ada Lovelace"
              name="populated-name"
              readOnly
            />
            <TextInput
              label="Required - bottom accent"
              requiredIndicatorPosition="bottom"
              required
              helperText="This value is shown on your profile."
            />
            <TextInput
              label="Required - left accent"
              required
              requiredIndicatorPosition="left"
              helperText="Required-field emphasis can be positioned to suit different form designs."
            />
            <TextInput
              label="Error"
              value="Needs review"
              error="Use a different display name."
              readOnly
            />
            <TextInput
              label="Disabled"
              value="Unavailable"
              disabled
              readOnly />
            <TextInput
              label="Clearable"
              value={clearableValue}
              onChange={(event) => setClearableValue(event.target.value)}
              clearable
              onClear={() => setClearableValue("")}
              clearIcon={<X size={18} strokeWidth={2} />}
            />
          </div>
          <ImplementationDetails>
            <p>
              Native input attributes and events pass through, labels are
              associated with generated IDs, and helper/error text is linked
              with <code>aria-describedby</code>. State stays
              consumer-controlled, while visual values come from shared design
              tokens.
            </p>
            <p>
              <code>requiredIndicatorPosition</code> supports bottom or left
              accents, allowing required-field emphasis to adapt to different
              form designs.
            </p>
          </ImplementationDetails>
        </section>
        <section className="demo-section">
          <h3>Password input</h3>
          <p className="component-description">
            A password variant built on the standard input with a consistent accessible show/hide control.
          </p>
          <div className="state-grid">
            <PasswordInput
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <ImplementationDetails>
            <p>
              PasswordInput builds on TextInput so required, error, helper text, accessibility, and styling remain consistent.
            </p>
          </ImplementationDetails>
        </section>
        <section className="demo-section">
          <h3>Phone input</h3>
          <p className="component-description">
            A U.S. phone variant that accepts digits, formats the value, and validates on blur.
          </p>
          <div className="state-grid">
            <PhoneInput
              label="Phone"
              value={phone}
              onChange={setPhone}
              required />
            <PhoneInput label="Backup phone" value={optionalPhone} onChange={setOptionalPhone} />
          </div>
          <ImplementationDetails>
            <p>
              Blank optional values are valid. Entered values must contain 10 digits and display as <code>(317) 555-1234</code>.
            </p>
          </ImplementationDetails>
        </section>
        <section className="demo-section">
          <h3>Select</h3>
          <p className="component-description">
            A native select with a floating label, consumer-provided icon,
            option configuration, and validation messaging.
          </p>
          <div className="state-grid">
            <Select
              label="Default"
              options={frameworkOptions}
              dropdownIcon={dropdownIcon}
            />
            <Select
              label="Required - bottom accent"
              value="vanilla"
              options={frameworkOptions}
              required
              helperText="Choose the implementation you are exploring."
              dropdownIcon={dropdownIcon}
              onChange={() => undefined}
            />
            <Select
              label="Required - left accent"
              value="vanilla"
              options={frameworkOptions}
              required
              requiredIndicatorPosition="left"
              dropdownIcon={dropdownIcon}
              onChange={() => undefined}
            />
            <Select
              label="Error"
              options={frameworkOptions}
              error="Please choose an implementation."
              dropdownIcon={dropdownIcon}
            />
            <Select
              label="Disabled"
              value="react"
              options={frameworkOptions}
              disabled
              dropdownIcon={dropdownIcon}
              onChange={() => undefined}
            />
            <CountryCombobox
              label="Searchable country"
              value={country}
              onChange={setCountry}
              options={countryOptions}
            />
          </div>
          <ImplementationDetails>
            <p>
              Consumers provide options and native select attributes. Label
              association, validation state, and a consumer-provided dropdown
              icon are layered over the browser control without replacing its
              native keyboard behavior.
            </p>
            <p>
              <code>requiredIndicatorPosition</code> changes the required accent
              edge. <code>CountryCombobox</code> extends the same Select visual
              foundation with searchable country options.
            </p>
          </ImplementationDetails>
        </section>
        <section className="demo-section">
          <h3>Textarea</h3>
          <p className="component-description">
            A resizable multiline field with the same floating-label,
            validation, helper-text, required, and disabled states.
          </p>
          <div className="state-grid">
            <Textarea label="Default" rows={3} />
            <Textarea
              label="Required - bottom accent"
              value="A controlled textarea keeps application state in charge."
              required
              helperText="Keep the project context concise."
              rows={3}
              readOnly
            />
            <Textarea
              label="Required - left accent"
              value="A controlled textarea keeps application state in charge."
              required
              requiredIndicatorPosition="left"
              rows={3}
              readOnly
            />
            <Textarea
              label="Error"
              value="Needs review"
              error="Add a little more context."
              rows={3}
              readOnly
            />
            <Textarea
              label="Disabled"
              value="Unavailable"
              disabled
              rows={3}
              readOnly
            />
          </div>
          <ImplementationDetails>
            <p>
              Native textarea attributes remain available, including{" "}
              <code>rows</code>, <code>maxLength</code>, <code>aria-*</code>,
              and <code>data-*</code> values.
            </p>
            <p>
              State remains consumer-controlled, visual values come from shared
              design tokens, and <code>requiredIndicatorPosition</code> supports
              bottom or left required accents.
            </p>
          </ImplementationDetails>
        </section>
      </div>
    </>
  );
}
