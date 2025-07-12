import "../styles/ShippingMethodPage.css";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";

const shippingOptions = [
  { id: "standard", label: "Standard Shipping", desc: "3-5 business days", price: 0 },
  { id: "express", label: "Express Shipping", desc: "1-2 business days", price: 4.99 },
];

export default function ShippingMethodPage() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(shippingOptions[0].id);
  let shippingInfo = {};
  try {
    shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
  } catch (e) {}
  const contact = shippingInfo.contact || "joe.spagnuolo@uxbly.com";
  const address = shippingInfo.address
    ? `${shippingInfo.address}${shippingInfo.city ? ', ' + shippingInfo.city : ''}${shippingInfo.postal ? ', ' + shippingInfo.postal : ''}${shippingInfo.province ? ', ' + shippingInfo.province : ''}${shippingInfo.country ? ', ' + shippingInfo.country : ''}`
    : "Via Firenze 23, 92023, Campobello di Licata AG, Italia";
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = shippingOptions.find(opt => opt.id === selected)?.price || 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingMethod', JSON.stringify(shippingOptions.find(opt => opt.id === selected)));
    navigate("/payment");
  };

  return (
    <div className="shipping-method-page">
      <form className="shipping-method-form" onSubmit={handleSubmit}>
        <CheckoutBreadcrumbs currentStep="shipping" />
        <div className="shipping-method-card shipping-method-contact-card">
          <div className="shipping-method-contact-row">
            <span className="shipping-method-contact-label">Contact:</span>
            <span className="shipping-method-contact-value">{contact}</span>
          </div>
          <hr className="shipping-method-contact-divider" />
          <div className="shipping-method-contact-row">
            <span className="shipping-method-contact-label">Ship to</span>
            <span className="shipping-method-contact-value">{address}</span>
          </div>
        </div>
        <div className="shipping-method-label">Shipping method</div>
        <div className="shipping-method-card shipping-method-options">
          {shippingOptions.map(opt => (
            <label key={opt.id} className={`shipping-method-option${selected === opt.id ? " shipping-method-option--active" : ""}`}>
              <input
                type="radio"
                name="shipping"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => setSelected(opt.id)}
              />
              <span className="shipping-method-option-title">{opt.label}</span>
              <span className="shipping-method-option-desc">{opt.desc}</span>
              <span className="shipping-method-option-price">{opt.price === 0 ? "Free" : `${opt.price.toFixed(2)}$`}</span>
            </label>
          ))}
        </div>
        <div className="shipping-method-actions">
          <span className="shipping-method-back" onClick={() => navigate("/shipping-info")}>Back to details</span>
          <button className="shipping-method-next" type="submit">Go to payment</button>
        </div>
      </form>
      <div className="shipping-method-summary">
        <div className="shipping-method-summary-products">
          {cart.map(product => (
            <div className="shipping-method-summary-product" key={product.id + product.size}>
              <div className="shipping-method-summary-product-imgwrap">
                <img src={product.image} alt={product.name} />
                <span className="shipping-method-summary-qty">{product.quantity}</span>
              </div>
              <div>
                <div className="shipping-method-summary-name">{product.name.split(" ").slice(1).join(" ")}</div>
                <div className="shipping-method-summary-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="shipping-method-summary-table">
          <div className="shipping-method-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="shipping-method-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free Shipping" : `${shipping.toFixed(2)}$`}</span>
          </div>
          <div className="shipping-method-summary-row shipping-method-summary-row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 