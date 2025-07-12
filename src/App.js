import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import AppRoutes from "./AppRoutes";
import Loader from "./Loader/Loader";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname !== "/women") {
      localStorage.clear();
      window.location.replace("/women");
    } else {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <CurrencyProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
