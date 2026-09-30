import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      // Migrate from old key if present
      const oldData = localStorage.getItem('cart');
      const newData = localStorage.getItem('restaurantly_cart');
      if (oldData && !newData) {
        localStorage.setItem('restaurantly_cart', oldData);
        localStorage.removeItem('cart');
        return JSON.parse(oldData);
      }
      return newData ? JSON.parse(newData) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('restaurantly_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1, extras = []) => {
    const uniqueId = `${product.id}-${product.selectedSize || 'default'}-${extras.map(e => e.name).join('-')}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.uniqueId === uniqueId);
      if (existing) {
        return prev.map(item =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, extras, uniqueId }];
    });
    toast.success(`${quantity}× ${product.name} added to cart`, {
      icon: <FaShoppingCart className="text-primary" />,
    });
  }, []);

  const removeFromCart = useCallback((uniqueId) => {
    setCartItems(prev => {
      const item = prev.find(i => i.uniqueId === uniqueId);
      if (item) {
        toast(`${item.name} removed`, { icon: <FaTrash className="text-error" /> });
      }
      return prev.filter(i => i.uniqueId !== uniqueId);
    });
  }, []);

  const updateQuantity = useCallback((uniqueId, change) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const extrasPrice = item.extras
        ? item.extras.reduce((sum, ex) => sum + (ex.price || 0), 0)
        : 0;
      return total + (item.price + extrasPrice) * item.quantity;
    }, 0);
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};