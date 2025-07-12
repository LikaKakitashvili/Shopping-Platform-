import "./CartOverlay.css";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../contexts/CurrencyContext";

export default function CartOverlay() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, changeItemSize } = useCart();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id, item.size);
    } else {
      updateQuantity(item.id, item.size, newQuantity);
    }
  };

  if (!isCartOpen) return null;
  return (
    <>
      <div className="cart-overlay__backdrop" onClick={closeCart} />
      <aside className="cart-overlay">
        <h2 className="cart-overlay__title"><span style={{fontWeight: 700}}>My Bag</span>, <span style={{fontWeight: 400}}>{cart.length} items</span></h2>
        <div className="cart-overlay__items">
          {cart.length === 0 && <div className="cart-overlay__empty">Cart is empty</div>}
          {cart.map((item, i) => (
            <div className="cart-overlay__item" key={i}>
              <div className="cart-overlay__item-details">
                <div className="cart-overlay__item-name">{item.name}</div>
                <div className="cart-overlay__item-price">{currency.symbol}{(item.price * currency.rate).toFixed(2)}</div>
                <div className="cart-overlay__item-sizes-row">
                  <span className="cart-overlay__item-size-label">Size:</span>
                  <div className="cart-overlay__item-size-btns">
                    {item.sizes && item.sizes.map((size) => (
                      <span
                        key={size}
                        className={`cart-overlay__item-size-btn${item.size === size ? " cart-overlay__item-size-btn--active" : ""}`}
                        onClick={() => changeItemSize(item.id, item.size, size)}
                        style={{ cursor: "pointer" }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="cart-overlay__item-controls">
                <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                <span>{item.quantity}</span>
                <button onClick={() => {
                  if (item.quantity <= 1) {
                    removeFromCart(item.id, item.size);
                  } else {
                    updateQuantity(item.id, item.size, item.quantity - 1);
                  }
                }}>-</button>
              </div>
              <div className="cart-overlay__item-image-wrap">
                <img src={item.image} alt={item.name} className="cart-overlay__item-img" />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-overlay__bottom">
          <div className="cart-overlay__total-row">
            <span>Total</span>
            <span>{currency.symbol}{(total * currency.rate).toFixed(2)}</span>
          </div>
          <div className="cart-overlay__actions">
            <button className="cart-overlay__view" onClick={() => { closeCart(); navigate("/cart"); }}>VIEW BAG</button>
            <button className="cart-overlay__checkout" onClick={() => { closeCart(); navigate("/shipping-info"); }}>CHECK OUT</button>
          </div>
        </div>
      </aside>
    </>
  );
} 