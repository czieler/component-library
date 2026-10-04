import { trackDemoElement } from "./lifecycle.js";
import { text, implementationDetails } from "./content.js";
import { createTextInput } from "../components/text-input.js";
import { createPasswordInput } from "../components/password-input.js";
import { createPhoneInput } from "../components/phone-input.js";
import { createSelect } from "../components/select.js";
import { createCountryCombobox } from "../components/country-combobox.js";
import { createTextarea } from "../components/textarea.js";
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
export const inputsDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Form controls", "eyebrow"),
    text("h2", "Inputs that keep the native web underneath."),
    text(
      "p",
      "Each control adds a floating label and clear state model without hiding normal HTML behavior.",
      "lede",
    ),
  );
  fragment.append(heading);
  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  const inputSection = document.createElement("section");
  inputSection.className = "demo-section";
  inputSection.append(
    text("h3", "Text input"),
    text(
      "p",
      "A labeled input that supports populated, required, error, disabled, and clearable states.",
      "component-description",
    ),
  );
  const inputStates = document.createElement("div");
  inputStates.className = "state-grid";
  inputStates.append(
    createTextInput({
      label: "Default",
      attributes: { name: "default-name" },
    }),
    createTextInput({
      label: "Populated",
      value: "Ada Lovelace",
      attributes: { name: "populated-name" },
    }),
    createTextInput({
      label: "Required - bottom accent",
      required: true,
      helperText: "This value is shown on your profile.",
    }),
    createTextInput({
      label: "Required - left accent",
      required: true,
      requiredIndicatorPosition: "left",
      helperText:
        "Required-field emphasis can be positioned to suit different form designs.",
    }),
    createTextInput({
      label: "Error",
      value: "Needs review",
      error: "Use a different display name.",
    }),
    createTextInput({
      label: "Disabled",
      value: "Unavailable",
      disabled: true,
    }),
    createTextInput({
      label: "Clearable",
      value: "A reusable value",
      clearable: true,
    }),
  );
  inputSection.append(
    inputStates,
    implementationDetails(
      [
        "Native input attributes and events pass through, labels are associated with generated IDs, and helper/error text is linked with ",
        { code: "aria-describedby" },
        ". State stays consumer-controlled, while visual values come from shared design tokens.",
      ],
      [
        { code: "requiredIndicatorPosition" },
        " supports bottom or left accents, allowing required-field emphasis to adapt to different form designs.",
      ],
    ),
  );
  showcase.append(inputSection);
  const passwordSection = document.createElement("section");
  passwordSection.className = "demo-section";
  passwordSection.append(
    text("h3", "Password input"),
    text("p", "A password variant built on the standard input with a consistent accessible show/hide control.", "component-description"),
  );
  const passwordStates = document.createElement("div");
  passwordStates.className = "state-grid";
  passwordStates.append(createPasswordInput({
    label: "Password",
    required: true,
    attributes: { name: "demo-password" }
  }));
  passwordSection.append(
    passwordStates,
    implementationDetails(["Password input builds on the shared text input so required, error, helper text, accessibility, and styling remain consistent."]),
  );
  showcase.append(passwordSection);
  const phoneSection = document.createElement("section");
  phoneSection.className = "demo-section";
  phoneSection.append(
    text("h3", "Phone input"),
    text("p", "A U.S. phone variant that accepts digits, formats the value, and validates on blur.", "component-description"),
  );
  const phoneStates = document.createElement("div");
  phoneStates.className = "state-grid";
  phoneStates.append(createPhoneInput({ label: "Phone", required: true }), createPhoneInput({ label: "Backup phone" }));
  phoneSection.append(
    phoneStates,
    implementationDetails(["Blank optional values are valid. Entered values must contain 10 digits and display as (317) 555-1234."]),
  );
  showcase.append(phoneSection);
  const selectSection = document.createElement("section");
  selectSection.className = "demo-section";
  selectSection.append(
    text("h3", "Select"),
    text(
      "p",
      "A native select with a floating label, consumer-provided icon, option configuration, and validation messaging.",
      "component-description",
    ),
  );
  const selectStates = document.createElement("div");
  selectStates.className = "state-grid";
  selectStates.append(
    createSelect({
      label: "Default",
      options: frameworkOptions,
    }),
    createSelect({
      label: "Required - bottom accent",
      value: "vanilla",
      options: frameworkOptions,
      required: true,
      helperText: "Choose the implementation you are exploring.",
    }),
    createSelect({
      label: "Required - left accent",
      value: "vanilla",
      options: frameworkOptions,
      required: true,
      requiredIndicatorPosition: "left",
    }),
    createSelect({
      label: "Error",
      options: frameworkOptions,
      error: "Please choose an implementation.",
    }),
    createSelect({
      label: "Disabled",
      value: "react",
      options: frameworkOptions,
      disabled: true,
    }),
    trackDemoElement(createCountryCombobox({
      label: "Searchable country",
      value: "US",
      options: countryOptions,
    })),
  );
  selectSection.append(
    selectStates,
    implementationDetails(
      [
        "Consumers provide options and native select attributes. Label association, validation state, and a lightweight SVG dropdown icon are layered over the browser control without replacing its native keyboard behavior. CountryCombobox extends the same Select visual foundation with searchable country options.",
      ],
      [
        { code: "requiredIndicatorPosition" },
        " changes the required accent edge.",
      ],
    ),
  );
  showcase.append(selectSection);
  const textareaSection = document.createElement("section");
  textareaSection.className = "demo-section";
  textareaSection.append(
    text("h3", "Textarea"),
    text(
      "p",
      "A resizable multiline field with the same floating-label, validation, helper-text, required, and disabled states.",
      "component-description",
    ),
  );
  const textareaStates = document.createElement("div");
  textareaStates.className = "state-grid";
  textareaStates.append(
    createTextarea({
      label: "Default",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Required - bottom accent",
      value: "A controlled textarea keeps application state in charge.",
      required: true,
      helperText: "Keep the project context concise.",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Required - left accent",
      value: "A controlled textarea keeps application state in charge.",
      required: true,
      requiredIndicatorPosition: "left",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Error",
      value: "Needs review",
      error: "Add a little more context.",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Disabled",
      value: "Unavailable",
      disabled: true,
      attributes: { rows: 3 },
    }),
  );
  textareaSection.append(
    textareaStates,
    implementationDetails(
      [
        "Native textarea attributes remain available through ",
        { code: "attributes" },
        ", including ",
        { code: "rows" },
        ", ",
        { code: "maxLength" },
        ", ",
        { code: "aria-*" },
        ", and ",
        { code: "data-*" },
        " values.",
      ],
      [
        "State remains consumer-controlled, visual values come from shared design tokens, and ",
        { code: "requiredIndicatorPosition" },
        " supports bottom or left required accents.",
      ],
    ),
  );
  showcase.append(textareaSection);
  fragment.append(showcase);
  return fragment;
};
