import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();
const currencies = [
  { symbol: "$", label: "USD", rate: 1 },
  { symbol: "€", label: "EUR", rate: 0.92 },
  { symbol: "¥", label: "JPY", rate: 155 },
];

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(currencies[0]);
  const switchCurrency = (label) => {
    const found = currencies.find((c) => c.label === label);
    if (found) setCurrency(found);
  };
  return (
    <CurrencyContext.Provider value={{ currency, currencies, switchCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
} 