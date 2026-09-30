import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegHeart, FaTrash } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import MenuCard from "../features/products/components/MenuCard";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import PageTransition from "../components/motion/PageTransition";
import FloatingElement from "../components/interactive/FloatingElement";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(20% 0 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { type: "spring", stiffness: 260, damping: 22 }
  },
  exit: { opacity: 0, scale: 0.85, y: -10, transition: { duration: 0.25 } }
};

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <PageTransition className="pt-32 pb-24 bg-surface min-h-[100dvh]">
      <PageContainer>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-8 border-b border-border/60">
          <div>
            <p className="text-overline mb-3">Personal Collection</p>
            <h1 className="text-heading-1 text-text-primary">
              My{" "}
              <em className="italic text-primary not-italic">Table</em>
            </h1>
            {favorites.length > 0 && (
              <p className="text-body text-text-secondary mt-2">
                {favorites.length} saved {favorites.length === 1 ? "dish" : "dishes"}
              </p>
            )}
          </div>
          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={clearFavorites}
              icon={FaTrash}
              className="mt-6 md:mt-0 self-start text-error border-error/25 hover:bg-error hover:text-white hover:border-error transition-all"
            >
              Clear All
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center text-center py-28 rounded-3xl overflow-hidden"
          >
            {/* Ambient background */}
            <div className="absolute inset-0 bg-surface-sunken rounded-3xl border border-border" />
            <FloatingElement speed="slow" className="absolute top-8 left-12 w-20 h-20 rounded-full bg-error/5 blur-2xl" />
            <FloatingElement speed="medium" delay={1} className="absolute bottom-8 right-12 w-16 h-16 rounded-full bg-primary/5 blur-xl" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 mb-6 rounded-full bg-error/10 flex items-center justify-center border border-error/20"
              >
                <FaRegHeart className="text-error text-4xl" aria-hidden="true" />
              </motion.div>

              <h2 className="text-heading-3 text-text-primary mb-3">Your table is empty.</h2>
              <p className="text-body-lg text-text-secondary mb-10 max-w-md">
                Save dishes you love to build your personal culinary collection.
              </p>
              <Link to="/menu">
                <Button variant="primary" size="lg">Explore the Menu</Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {favorites.map((item) => (
                <motion.div key={item.id} variants={itemVariants} layout exit="exit">
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </PageContainer>
    </PageTransition>
  );
};

export default Favorites;
