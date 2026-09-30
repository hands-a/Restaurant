import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../../../context/FavoritesContext';

const FavoriteButton = ({ product, className = '', isAbsolute = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [popping, setPopping] = useState(false);

  if (!product || !product.id) return null;

  const favorited = isFavorite(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    // Trigger pop animation
    setPopping(true);
    setTimeout(() => setPopping(false), 350);
  };

  const baseClasses = [
    'flex items-center justify-center transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-primary rounded-full',
    'active:scale-90',
  ].join(' ');

  const absoluteClasses = isAbsolute
    ? 'absolute z-10 w-10 h-10 shadow-lg bg-black/30 backdrop-blur-md hover:bg-black/50'
    : 'w-11 h-11 bg-surface border border-border-strong hover:border-error hover:bg-error/5';

  const heartClass = popping ? 'animate-heart-pop' : '';

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorited}
      className={`${baseClasses} ${absoluteClasses} ${className}`}
    >
      {favorited ? (
        <FaHeart className={`text-error text-xl ${heartClass}`} />
      ) : (
        <FaRegHeart className={`text-white text-xl ${isAbsolute ? '' : 'text-text-muted hover:text-error transition-colors'}`} />
      )}
    </button>
  );
};

export default FavoriteButton;
