import { useState, useRef, useEffect } from "react";
import { useCurrency } from "../../contexts/CurrencyContext";
import "./CurrencySwitcher.css";

export default function CurrencySwitcher() {
  const { currency, currencies, switchCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="currency-switcher" ref={ref}>
      <button className="currency-switcher__btn" onClick={() => setOpen((v) => !v)}>
        {currency.symbol} <span className="currency-switcher__arrow">▾</span>
      </button>
      {open && (
        <div className="currency-switcher__dropdown">
          {currencies.map((c) => (
            <button
              key={c.label}
              className={`currency-switcher__option${c.label === currency.label ? " currency-switcher__option--active" : ""}`}
              onClick={() => { switchCurrency(c.label); setOpen(false); }}
            >
              {c.symbol} {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 