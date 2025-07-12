import "../styles/PaymentPage.css";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";
import PaymentCardLogo from "../components/PaymentCardLogo";
import LockIcon from "../components/LockIcon";
import InfoIcon from "../components/InfoIcon";

export default function PaymentPage() {
  const { cart } = useCart();
  const navigate = useNavigate();
  let shippingInfo = {};
  let shippingMethod = {};
  try {
    shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
    shippingMethod = JSON.parse(localStorage.getItem('shippingMethod')) || {};
  } catch (e) {}
  const contact = shippingInfo.contact || "joe.spagnuolo@uxbly.com";
  const address = shippingInfo.address
    ? `${shippingInfo.address}${shippingInfo.city ? ', ' + shippingInfo.city : ''}${shippingInfo.postal ? ', ' + shippingInfo.postal : ''}${shippingInfo.province ? ', ' + shippingInfo.province : ''}${shippingInfo.country ? ', ' + shippingInfo.country : ''}`
    : "Via Firenze 23, 92023, Campobello di Licata AG, Italia";
  const method = shippingMethod.label
    ? `${shippingMethod.label} - ${shippingMethod.price === 0 ? 'FREE' : shippingMethod.price.toFixed(2) + '$'}`
    : "Standard Shipping - FREE";

  const [form, setForm] = useState({
    card: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [error, setError] = useState("");
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = shippingMethod.price || 0;
  const total = subtotal + shipping;


  const cardNumberRegex = /^\d{16}$/;

  function isValidExpiry(date) {
    if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(date)) return false;
    const [month, year] = date.split('/');
    const expMonth = parseInt(month, 10);
    let expYear = parseInt(year, 10);
    if (expYear < 100) expYear += 2000; 

    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();

    return expYear > thisYear || (expYear === thisYear && expMonth >= thisMonth);
  }

  function isValidCVV(cvv, cardNumber) {
    const isAmex = /^3[47]/.test(cardNumber.replace(/\s+/g, ''));
    return isAmex ? /^\d{4}$/.test(cvv) : /^\d{3}$/.test(cvv);
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.card || !form.name || !form.expiry || !form.cvc) {
      setError("Please fill in all fields.");
      return;
    }

    const cardNumber = form.card.replace(/\s+/g, '');
    if (!cardNumberRegex.test(cardNumber)) {
      setError("Invalid card number.");
      return;
    }

    if (!isValidExpiry(form.expiry)) {
      setError("Invalid expiry date.");
      return;
    }

    if (!isValidCVV(form.cvc, cardNumber)) {
      setError("Invalid CVV.");
      return;
    }
    setError("");
    navigate("/confirmation");
  };

  return (
    <div className="payment-page">
      <form className="payment-form" onSubmit={handleSubmit}>
        <CheckoutBreadcrumbs currentStep="payment" />
        <div className="payment-summary-card">
          <div className="payment-summary-row"><span className="payment-summary-label">Contact:</span> <span className="payment-summary-value">{contact}</span></div>
          <hr className="payment-summary-divider" />
          <div className="payment-summary-row"><span className="payment-summary-label">Ship to</span> <span className="payment-summary-value">{address}</span></div>
          <hr className="payment-summary-divider" />
          <div className="payment-summary-row"><span className="payment-summary-label">Method</span> <span className="payment-summary-value">{method}</span></div>
        </div>
        <div className="payment-label">Payment method</div>
        <div className="payment-method-card">
          <div className="payment-method-header">
            <PaymentCardLogo width={40} height={28} style={{marginRight: 12}} />
            <span className="payment-method-title">Credit Card</span>
          </div>
          <div className="payment-method-fields">
            <div className="payment-method-input-row">
              <input name="card" placeholder="Card Number" value={form.card} onChange={handleChange} />
              <span className="payment-method-input-icon">
                <LockIcon width={18} height={18} />
              </span>
            </div>
            <input name="name" placeholder="Holder Name" value={form.name} onChange={handleChange} />
            <div className="payment-method-fields-row">
              <input name="expiry" placeholder="Expiration (MM/YY)" value={form.expiry} onChange={handleChange} />
              <div className="payment-method-input-container">
                <input name="cvc" placeholder="CVV" value={form.cvc} onChange={handleChange} />
                <span className="payment-method-input-icon">
                  <InfoIcon width={18} height={18} />
                </span>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="payment-error">{error}</div>}
        <div className="payment-actions">
          <span className="payment-back" onClick={() => navigate("/shipping-method")}>Back to shipping</span>
          <button className="payment-next" type="submit">Pay now</button>
        </div>
      </form>
      <div className="payment-summary" style={{backgroundColor: '#ececec', position: 'fixed', right: 0, top: 0, width: '50vw', height: '100vh', minWidth: '570px', padding: '40px 40px 32px 64px', display: 'flex', flexDirection: 'column', gap: '32px'}}>
        <div className="payment-summary-products">
          {cart.map(product => (
            <div className="payment-summary-product" key={product.id + product.size}>
              <div className="payment-summary-product-imgwrap">
                <img src={product.image} alt={product.name} />
                <span className="payment-summary-qty">{product.quantity}</span>
              </div>
              <div>
                <div className="payment-summary-name">{product.name.split(" ").slice(1).join(" ")}</div>
                <div className="payment-summary-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="payment-summary-table">
          <div className="payment-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="payment-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free Shipping" : `${shipping.toFixed(2)}$`}</span>
          </div>
          <div className="payment-summary-row payment-summary-row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 