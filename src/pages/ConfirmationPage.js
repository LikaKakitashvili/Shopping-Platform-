import "../styles/ConfirmationPage.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";
import CheckIcon from "../components/CheckIcon";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  
  let shippingInfo = {};
  let shippingMethod = {};
  try {
    shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
    shippingMethod = JSON.parse(localStorage.getItem('shippingMethod')) || {};
  } catch (e) {}
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = shippingMethod.price || 0;
  const total = subtotal + shipping;
  const orderNum = 2039;

  const handleBackToShopping = () => {
    clearCart();
    navigate("/");
  };

  return (
    <div className="confirmation-page">
      <CheckoutBreadcrumbs currentStep="payment" />
      <div className="confirmation-main">
        <div className="confirmation-header">
          <CheckIcon width={100} height={100} />
          <div className="confirmation-title">Payment Confirmed</div>
          <div className="confirmation-order">ORDER #{orderNum}</div>
        </div>
        <button className="confirmation-home" onClick={handleBackToShopping}>Back to shopping</button>
      </div>
      <div className="confirmation-summary">
        <div className="confirmation-summary-products">
          {cart.map(product => (
            <div className="confirmation-summary-product" key={product.id + product.size}>
              <div className="confirmation-summary-product-imgwrap">
                <img src={product.image} alt={product.name} />
                <span className="confirmation-summary-qty">{product.quantity}</span>
              </div>
              <div>
                <div className="confirmation-summary-name">{product.name.split(" ").slice(1).join(" ")}</div>
                <div className="confirmation-summary-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="confirmation-summary-table">
          <div className="confirmation-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="confirmation-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free Shipping" : `${shipping.toFixed(2)}$`}</span>
          </div>
          <div className="confirmation-summary-row confirmation-summary-row--paid">
            <span>Paid</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 