import { icons } from "./icons.js";

export function createCountryCombobox({
  label = "Country",
  options = [],
  value = "",
  required = false,
  disabled = false,
  onChange,
}) {
  const sorted = [...options].sort((a, b) =>
    a.code === "US" ? -1 : b.code === "US" ? 1 : a.name.localeCompare(b.name),
  );
  const wrapper = document.createElement("div");
  wrapper.className = `field country-combobox ${required ? "field--required field--required-left" : ""} ${disabled ? "field--disabled" : ""}`;
  const control = document.createElement("div");
  control.className = `field__control field__control--select country-combobox__control ${value ? "field__control--has-value" : ""}`;
  const input = document.createElement("input");
  const inputId = `country-${crypto.randomUUID()}`;
  input.id = inputId;
  input.type = "text";
  input.placeholder = " ";
  input.required = required;
  input.disabled = disabled;
  input.autocomplete = "country-name";
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");
  const labelElement = document.createElement("label");
  labelElement.htmlFor = inputId;
  labelElement.textContent = label;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "country-combobox__toggle";
  toggle.tabIndex = -1;
  toggle.disabled = disabled;
  toggle.setAttribute("aria-label", `Show ${label.toLowerCase()} options`);
  toggle.innerHTML = icons.chevronDown;
  const menu = document.createElement("div");
  menu.className = "country-combobox__menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;
  let currentValue = value;
  const selectedName = () => sorted.find((item) => item.code === currentValue)?.name ?? "";
  input.value = selectedName();
  const setOpen = (open) => { menu.hidden = !open; input.setAttribute("aria-expanded", String(open)); };
  const render = () => {
    const normalized = input.value.trim().toLowerCase();
    const selected = selectedName().toLowerCase();
    const filtered = !normalized || normalized === selected ? sorted : sorted.filter((item) => item.name.toLowerCase().includes(normalized) || item.code.toLowerCase().startsWith(normalized));
    menu.replaceChildren();
    if (!filtered.length) { const empty=document.createElement("div"); empty.className="country-combobox__empty"; empty.textContent="No countries found."; menu.append(empty); return; }
    filtered.forEach((country) => {
      const option = document.createElement("button"); option.type="button"; option.className=`country-combobox__option ${country.code===currentValue?"is-selected":""}`; option.setAttribute("role","option"); option.setAttribute("aria-selected",String(country.code===currentValue));
      const name=document.createElement("span"); name.textContent=country.name; const code=document.createElement("small"); code.textContent=country.code; option.append(name,code);
      option.addEventListener("mousedown",(event)=>event.preventDefault()); option.addEventListener("click",()=>{ currentValue=country.code; input.value=country.name; control.classList.add("field__control--has-value"); setOpen(false); onChange?.(currentValue); }); menu.append(option);
    });
  };
  input.addEventListener("focus",()=>{render();setOpen(true)});
  input.addEventListener("blur",()=>window.setTimeout(()=>{setOpen(false); if(!currentValue) input.value="";},120));
  input.addEventListener("input",()=>{ const normalized=input.value.trim().toLowerCase(); const exact=sorted.find((item)=>item.name.toLowerCase()===normalized||item.code.toLowerCase()===normalized); currentValue=exact?.code??""; control.classList.toggle("field__control--has-value",Boolean(currentValue)); onChange?.(currentValue); render(); setOpen(true); });
  toggle.addEventListener("mousedown",(event)=>event.preventDefault()); toggle.addEventListener("click",()=>{render();setOpen(menu.hidden)});
  control.append(input,labelElement,toggle,menu); wrapper.append(control); return wrapper;
}
