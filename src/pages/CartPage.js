import "../styles/CartPage.css";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../contexts/CurrencyContext";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, changeItemSize, removeFromCart } = useCart();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [imageIndexes, setImageIndexes] = useState(cart.map(() => 0));

  const handlePrevImage = (i, images) => {
    setImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[i] = (newIndexes[i] - 1 + images.length) % images.length;
      return newIndexes;
    });
  };
  const handleNextImage = (i, images) => {
    setImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[i] = (newIndexes[i] + 1) % images.length;
      return newIndexes;
    });
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">CART</h1>
      <div className="cart-page__items">
        {cart.map((item, i) => {
          const images = Array.isArray(item.image) ? item.image : [item.image];
          const currentImage = images[imageIndexes[i]] || images[0];
          return (
            <div className="cart-page__item" key={i}>
              <div className="cart-page__item-details">
                <div className="cart-page__item-name">{item.name.split(" ")[0]}</div>
                <div className="cart-page__item-subname">{item.name.split(" ").slice(1).join(" ")}</div>
                <div className="cart-page__item-price">{currency.symbol}{(item.price * currency.rate).toFixed(2)}</div>
                <div className="cart-page__item-sizes-row">
                  <span className="cart-page__item-size-label">SIZE:</span>
                  <div className="cart-page__item-size-btns">
                    {item.sizes && item.sizes.map((size) => (
                      <span
                        key={size}
                        className={`cart-page__item-size-btn${item.size === size ? " cart-page__item-size-btn--active" : ""}`}
                        onClick={() => changeItemSize(item.id, item.size, size)}
                        style={{ cursor: "pointer" }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="cart-page__item-controls-vertical">
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => {
                    if (item.quantity <= 1) {
                      removeFromCart(item.id, item.size);
                    } else {
                      updateQuantity(item.id, item.size, item.quantity - 1);
                    }
                  }}>-</button>
                </div>
                <div className="cart-page__item-image-wrap" style={{ position: 'relative' }}>
                  <img src={currentImage} alt={item.name} className="cart-page__item-img" />
                  {images.length > 1 && (
                    <div className="cart-page__img-arrows">
                      <button className="cart-page__img-arrow" onClick={() => handlePrevImage(i, images)} aria-label="Previous image">
                        <svg width="13.5" height="13.5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 15L6.5 9L11.5 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button className="cart-page__img-arrow" onClick={() => handleNextImage(i, images)} aria-label="Next image">
                        <svg width="13.5" height="13.5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 15L11.5 9L6.5 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-page__summary">
        <div>Quantity {quantity}</div>
        <div>Total: <span className="cart-page__total">{currency.symbol}{(total * currency.rate).toFixed(2)}</span></div>
        <button className="cart-page__continue" onClick={() => navigate("/shipping-info")}>CONTINUE</button>
      </div>
    </div>
  );
} 