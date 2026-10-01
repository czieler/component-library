import { useEffect, useId, useMemo, useRef, useState } from "react";


export type CountryComboboxOption = { code: string; name: string };

export type CountryComboboxProps = {
  label?: string;
  value: string;
  onChange: (countryCode: string) => void;
  options: CountryComboboxOption[];
  required?: boolean;
  disabled?: boolean;
};

export function CountryCombobox({ label = "Country", value, onChange, options, required = false, disabled = false }: CountryComboboxProps) {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;
  const sorted = useMemo(() => [...options].sort((a,b)=>a.code==="US"?-1:b.code==="US"?1:a.name.localeCompare(b.name)), [options]);
  const selected = sorted.find(country => country.code === value);
  const [query, setQuery] = useState(selected?.name || "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const blurTimer = useRef<number | null>(null);

  useEffect(() => { setQuery(selected?.name || ""); }, [value, selected?.name]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized || normalized === selected?.name.toLowerCase()) return sorted;
    return sorted.filter(country => country.name.toLowerCase().includes(normalized) || country.code.toLowerCase().startsWith(normalized));
  }, [query, selected?.name, sorted]);

  useEffect(() => {
    if (!open || !filtered.length) setActiveIndex(-1);
    else setActiveIndex(current => current >= 0 && current < filtered.length ? current : 0);
  }, [open, filtered]);

  function choose(code: string) {
    const country = sorted.find(item => item.code === code);
    if (!country) return;
    setQuery(country.name); onChange(country.code); setOpen(false); setActiveIndex(-1);
  }
  function handleInput(next: string) {
    setQuery(next); setOpen(true); setActiveIndex(0);
    const normalized = next.trim().toLowerCase();
    const exact = sorted.find(country => country.name.toLowerCase() === normalized || country.code.toLowerCase() === normalized);
    onChange(exact?.code || "");
  }

  const activeOptionId = open && activeIndex >= 0 && filtered[activeIndex] ? `${inputId}-option-${filtered[activeIndex].code}` : undefined;

  return <div className={`field country-combobox ${required ? "field--required field--required-left" : ""} ${disabled ? "field--disabled" : ""}`}>
    <div className={`field__control field__control--select country-combobox__control ${value ? "field__control--has-value" : ""}`}>
      <input aria-label={label} id={inputId} type="text" value={query} placeholder={label} required={required} disabled={disabled} autoComplete="off" data-bwignore="true" data-1p-ignore="true" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={listboxId} aria-activedescendant={activeOptionId}
        onFocus={()=>{if(blurTimer.current)window.clearTimeout(blurTimer.current);setOpen(true)}}
        onBlur={()=>{blurTimer.current=window.setTimeout(()=>{setOpen(false);setActiveIndex(-1);if(!value)setQuery("")},120)}}
        onChange={event=>handleInput(event.target.value)}
        onKeyDown={event=>{
          if(event.key==="Escape"){setOpen(false);setActiveIndex(-1);return}
          if(event.key==="ArrowDown"){event.preventDefault();setOpen(true);setActiveIndex(current=>filtered.length?Math.min((current<0?-1:current)+1,filtered.length-1):-1);return}
          if(event.key==="ArrowUp"){event.preventDefault();setOpen(true);setActiveIndex(current=>filtered.length?Math.max((current<0?filtered.length:current)-1,0):-1);return}
          if(event.key==="Enter"&&open&&filtered.length){event.preventDefault();choose(filtered[Math.max(activeIndex,0)].code)}
        }} />
      <label id={`${inputId}-label`} htmlFor={inputId}>{label}</label>
      <button type="button" className="country-combobox__toggle" aria-label={`Show ${label.toLowerCase()} options`} aria-controls={listboxId} aria-expanded={open} onMouseDown={event=>event.preventDefault()} onClick={()=>setOpen(current=>!current)} disabled={disabled}><span className="sr-only">Toggle options</span></button>
      {open&&!disabled&&<div id={listboxId} className="country-combobox__menu" role="listbox" aria-label={`${label} options`}>{filtered.length?filtered.map((country,index)=><button id={`${inputId}-option-${country.code}`} type="button" role="option" aria-selected={country.code===value} className={`country-combobox__option ${country.code===value?'is-selected':''} ${index===activeIndex?'is-active':''}`} key={country.code} onMouseEnter={()=>setActiveIndex(index)} onMouseDown={event=>event.preventDefault()} onClick={()=>choose(country.code)}><span>{country.name}</span><small>{country.code}</small></button>):<div className="country-combobox__empty" role="status">No countries found.</div>}</div>}
    </div>
  </div>;
}
