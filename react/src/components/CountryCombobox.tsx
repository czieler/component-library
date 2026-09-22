import { useEffect, useMemo, useRef, useState } from "react";

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
  const sorted = useMemo(() => [...options].sort((a,b)=>a.code==="US"?-1:b.code==="US"?1:a.name.localeCompare(b.name)), [options]);
  const selected = sorted.find(country => country.code === value);
  const [query, setQuery] = useState(selected?.name || "");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<number | null>(null);

  useEffect(() => { setQuery(selected?.name || ""); }, [value, selected?.name]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized || normalized === selected?.name.toLowerCase()) return sorted;
    return sorted.filter(country => country.name.toLowerCase().includes(normalized) || country.code.toLowerCase().startsWith(normalized));
  }, [query, selected?.name, sorted]);

  function choose(code: string) {
    const country = sorted.find(item => item.code === code);
    if (!country) return;
    setQuery(country.name); onChange(country.code); setOpen(false);
  }
  function handleInput(next: string) {
    setQuery(next); setOpen(true);
    const normalized = next.trim().toLowerCase();
    const exact = sorted.find(country => country.name.toLowerCase() === normalized || country.code.toLowerCase() === normalized);
    onChange(exact?.code || "");
  }

  return <div className={`field country-combobox ${required ? "field--required field--required-left" : ""} ${disabled ? "field--disabled" : ""}`}>
    <div className={`field__control field__control--select country-combobox__control ${value ? "field__control--has-value" : ""}`}>
      <input type="text" value={query} placeholder=" " required={required} disabled={disabled} autoComplete="country-name" role="combobox" aria-autocomplete="list" aria-expanded={open}
        onFocus={()=>{if(blurTimer.current)window.clearTimeout(blurTimer.current);setOpen(true)}}
        onBlur={()=>{blurTimer.current=window.setTimeout(()=>{setOpen(false);if(!value)setQuery("")},120)}}
        onChange={event=>handleInput(event.target.value)}
        onKeyDown={event=>{if(event.key==="Escape")setOpen(false);if(event.key==="Enter"&&open&&filtered.length){event.preventDefault();choose(filtered[0].code)}}} />
      <label>{label}</label>
      <button type="button" className="country-combobox__toggle" tabIndex={-1} aria-label={`Show ${label.toLowerCase()} options`} onMouseDown={event=>event.preventDefault()} onClick={()=>setOpen(current=>!current)} disabled={disabled}><span className="sr-only">Toggle options</span></button>
      {open&&!disabled&&<div className="country-combobox__menu" role="listbox">{filtered.length?filtered.map(country=><button type="button" role="option" aria-selected={country.code===value} className={`country-combobox__option ${country.code===value?"is-selected":""}`} key={country.code} onMouseDown={event=>event.preventDefault()} onClick={()=>choose(country.code)}><span>{country.name}</span><small>{country.code}</small></button>):<div className="country-combobox__empty">No countries found.</div>}</div>}
    </div>
  </div>;
}
