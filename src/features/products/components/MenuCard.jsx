import React, { useRef, memo } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import Badge from "../../../components/ui/Badge";
import FavoriteButton from "./FavoriteButton";

const MenuCard = memo(({ item }) => {
  const { addToCart } = useCart();
  const cardRef = useRef(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1, []);
  };

  // Subtle 3D tilt on hover (desktop only — avoids jank on touch)
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-surface border border-border shadow-card hover:shadow-card-hover transition-shadow duration-500"
      style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
    >
      {/* Image Area */}
      <Link
        to={`/menu/${item.id}`}
        className="relative block h-60 overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-label={`View details for ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-500" />

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-sm font-bold px-2.5 py-1 rounded-full">
          <FaStar className="text-yellow-400" aria-hidden="true" />
          <span>{item.rating}</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.isNew && <Badge variant="new">NEW</Badge>}
        </div>

        {/* Favorite */}
        <FavoriteButton product={item} isAbsolute className="top-3 right-3" />
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {item.category && (
          <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-3">
            <span className="w-1 h-1 rounded-full bg-primary" />
            {item.category}
          </span>
        )}

        <Link to={`/menu/${item.id}`} tabIndex={-1} aria-hidden="true">
          <h3 className="font-display font-bold text-text-primary text-lg leading-snug line-clamp-1 mb-1 group-hover:text-primary transition-colors duration-200">
            {item.name}
          </h3>
        </Link>

        <p className="text-text-secondary text-sm line-clamp-2 flex-1 mb-4 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-2xl font-black text-primary leading-none">
              {item.price}
            </span>
            <span className="text-xs font-semibold text-text-muted ml-1">EGP</span>
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.85 }}
            aria-label={`Add ${item.name} to cart`}
            className="w-11 h-11 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center shadow-button hover:bg-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <FaShoppingCart className="text-base" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </article>
  );
});

MenuCard.displayName = 'MenuCard';

export default MenuCard;
