import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import ShippingMethodPage from "./pages/ShippingMethodPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";

export default function AppRoutes() {
  const location = useLocation();
  const hideNavbar = [
    "/shipping-info",
    "/shipping-method",
    "/payment",
    "/confirmation"
  ].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/women" element={<CategoryPage category="women" />} />
        <Route path="/men" element={<CategoryPage category="men" />} />
        <Route path="/kids" element={<CategoryPage category="kids" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shipping-info" element={<ShippingInfoPage />} />
        <Route path="/shipping-method" element={<ShippingMethodPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
} 