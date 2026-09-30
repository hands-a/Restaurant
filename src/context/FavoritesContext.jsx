import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { menuItems } from '../data/menuData';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Store only IDs in localStorage — lightweight, no stale data
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurantly_favorites');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Handle migration from old format (array of full objects) to new format (array of IDs)
      if (parsed.length > 0 && typeof parsed[0] === 'object') {
        return parsed.map(p => p.id);
      }
      return parsed;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('restaurantly_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Derive full product objects from IDs on-demand
  const favorites = favoriteIds
    .map(id => menuItems.find(item => item.id === id))
    .filter(Boolean);

  const toggleFavorite = useCallback((product) => {
    const exists = favoriteIds.includes(product.id);
    if (exists) {
      setFavoriteIds(prev => prev.filter(id => id !== product.id));
      toast(`Removed from favorites`, { icon: <FaHeartBroken className="text-text-muted" /> });
    } else {
      setFavoriteIds(prev => [...prev, product.id]);
      toast.success(`${product.name} added to favorites`, { icon: <FaHeart className="text-error" /> });
    }
  }, [favoriteIds]);

  const isFavorite = useCallback((productId) => {
    return favoriteIds.includes(productId);
  }, [favoriteIds]);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
    toast('All favorites cleared');
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
