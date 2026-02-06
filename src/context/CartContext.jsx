import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, extras = []) => {
    setCartItems(prev => {
      const uniqueId = `${product.id}-${extras.map(e => e.name).join('-')}`;
      
      const existingItem = prev.find(item => item.uniqueId === uniqueId);

      if (existingItem) {
        return prev.map(item => 
          item.uniqueId === uniqueId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity, extras, uniqueId }];
    });
  };

  const removeFromCart = (uniqueId) => {
    setCartItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };


  const updateQuantity = (uniqueId, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const extrasPrice = item.extras ? item.extras.reduce((sum, ex) => sum + ex.price, 0) : 0;
      return total + (item.price + extrasPrice) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};