import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaStar, FaShoppingCart, FaFire,
  FaLeaf, FaTag, FaClock
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";
import PageContainer from "../layout/PageContainer";
import { menuItems } from "../../data/menuData";

// ─── Offers data ──────────────────────────────────────────────────────────────
const OFFERS = [
  {
    id: "promo1",
    badge: "🔥 Today Only",
    title: "50% OFF",
    subtitle: "Your First Order",
    code: "TASTY50",
    bg: "from-primary/90 to-amber-700/80",
    img: "/Double Smash Burger 1.jpg",
  },
  {
    id: "promo2",
    badge: "⚡ Free Delivery",
    title: "Orders Over",
    subtitle: "300 EGP",
    code: "FREEDEL",
    bg: "from-emerald-700/90 to-teal-900/80",
    img: "/Pepperoni 1.jpg",
  },
  {
    id: "promo3",
    badge: "🍰 Weekend Special",
    title: "Dessert + Drink",
    subtitle: "Only 99 EGP",
    code: "SWEETHOUR",
    bg: "from-violet-700/90 to-purple-900/80",
    img: "/Molten Cake 1.jpg",
  },
];

// ─── Top 3 products ───────────────────────────────────────────────────────────
const TOP_IDS = [2, 8, 13]; // Double Smash, Pepperoni, Molten Cake

// ─── Sub-components ───────────────────────────────────────────────────────────
const OfferCard = memo(({ offer, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[180px] flex flex-col justify-end"
  >
    <img
      src={offer.img}
      alt={offer.title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className={`absolute inset-0 bg-gradient-to-t ${offer.bg} opacity-90`} />
    <div className="relative p-5 z-10">
      <span className="inline-block text-xs font-bold text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2">
        {offer.badge}
      </span>
      <h3 className="text-white font-display font-black text-2xl leading-tight">
        {offer.title}
      </h3>
      <p className="text-white/80 text-sm font-medium">{offer.subtitle}</p>
      <div className="mt-3 flex items-center gap-2">
        <FaTag className="text-white/60 text-xs" />
        <span className="font-mono text-xs font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded tracking-widest border border-white/20">
          {offer.code}
        </span>
      </div>
    </div>
  </motion.div>
));

const ProductCard = memo(({ item, index, addToCart }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12, duration: 0.5 }}
    className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow duration-500 flex flex-col"
  >
    <Link
      to={`/menu/${item.id}`}
      className="relative block h-52 overflow-hidden flex-shrink-0"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {item.isNew && (
        <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
          NEW
        </span>
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
        <FaStar className="text-yellow-400 text-[10px]" />
        {item.rating}
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/70 text-xs">
        <FaClock className="text-[10px]" />
        {item.prepTime}
      </div>
    </Link>
    <div className="p-5 flex flex-col flex-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
        {item.category}
      </span>
      <Link to={`/menu/${item.id}`}>
        <h3 className="font-display font-bold text-text-primary text-lg leading-snug mb-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
      </Link>
      <p className="text-text-secondary text-sm line-clamp-2 flex-1 mb-4 leading-relaxed">
        {item.description}
      </p>
      <div className="flex items-center justify-between mt-auto gap-3">
        <span className="text-2xl font-black text-primary leading-none">
          {item.price}<span className="text-xs font-semibold text-text-muted ml-1">EGP</span>
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); addToCart(item, 1, []); }}
          aria-label={`Add ${item.name} to cart`}
          className="w-11 h-11 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <FaShoppingCart className="text-sm" />
        </motion.button>
      </div>
    </div>
  </motion.div>
));

// ─── Main Section ─────────────────────────────────────────────────────────────
const PopularDishes = () => {
  const { addToCart } = useCart();
  const topItems = TOP_IDS.map(id => menuItems.find(m => m.id === id)).filter(Boolean);

  return (
    <section className="py-16 md:py-24 bg-surface-elevated">
      <PageContainer>

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-overline mb-2">This Week's Picks</p>
            <h2 className="text-heading-1 text-text-primary">
              Most Popular <em className="not-italic text-primary">Dishes</em>
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            View Full Menu <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* ── Top 3 products grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {topItems.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} addToCart={addToCart} />
          ))}
        </div>

        {/* ── Offers banner ── */}
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-5">
            <FaFire className="text-primary text-lg" />
            <h2 className="text-heading-3 text-text-primary">Exclusive Offers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFERS.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} index={i} />
            ))}
          </div>
        </div>

        {/* ── Mobile CTA ── */}
        <div className="mt-10 text-center sm:hidden">
          <Link to="/menu">
            <Button variant="primary" className="w-full">View Full Menu</Button>
          </Link>
        </div>

      </PageContainer>
    </section>
  );
};

export default memo(PopularDishes);