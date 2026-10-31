import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "store-cart";
const STOCK_STORAGE_KEY = "store-stock";

function readStorage(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [stockChanges, setStockChanges] = useState(() => readStorage(STOCK_STORAGE_KEY, {}));

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(stockChanges));
  }, [stockChanges]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  function addToCart(product) {
    const currentStock = stockChanges[product.id] ?? product.stock;

    if (currentStock <= 0) {
      alert("Product is out of stock!");
      return;
    }

    setStockChanges((previous) => ({
      ...previous,
      [product.id]: Math.max((previous[product.id] ?? product.stock) - 1, 0),
    }));

    setCart((previous) => {
      const existingProduct = previous.find((item) => item.id === product.id);

      if (existingProduct) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, change) {
    setCart((previous) => {
      const item = previous.find((cartItem) => cartItem.id === productId);

      if (!item) {
        return previous;
      }

      const nextQuantity = item.quantity + change;

      if (nextQuantity <= 0) {
        setStockChanges((stockPrevious) => ({
          ...stockPrevious,
          [productId]: Math.max((stockPrevious[productId] ?? item.stock) + 1, 0),
        }));

        return previous.filter((cartItem) => cartItem.id !== productId);
      }

      setStockChanges((stockPrevious) => ({
        ...stockPrevious,
        [productId]: Math.max((stockPrevious[productId] ?? item.stock) - change, 0),
      }));

      return previous.map((cartItem) =>
        cartItem.id === productId ? { ...cartItem, quantity: nextQuantity } : cartItem
      );
    });
  }

  function removeFromCart(productId) {
    setCart((previous) => previous.filter((item) => item.id !== productId));
    setStockChanges((previous) => {
      const nextState = { ...previous };
      delete nextState[productId];
      return nextState;
    });
  }

  function clearCart() {
    setCart([]);
    setStockChanges({});
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        stockChanges,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}