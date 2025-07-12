import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (product, size) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, size, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => item.id !== id || item.size !== size));
  };
  const updateQuantity = (id, size, qty) => {
    setCart((prev) => prev.map((item) => item.id === id && item.size === size ? { ...item, quantity: qty } : item));
  };
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const changeItemSize = (id, oldSize, newSize) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id && item.size === newSize);
      if (existing) {
        return prev
          .filter((item) => !(item.id === id && item.size === oldSize))
          .map((item) =>
            item.id === id && item.size === newSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
      } else {
        return prev.map((item) =>
          item.id === id && item.size === oldSize
            ? { ...item, size: newSize }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, openCart, closeCart, changeItemSize, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 