import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';
import PageContainer from '../components/layout/PageContainer';
import MenuCard from '../features/products/components/MenuCard';
import CategoryFilter from '../features/products/components/CategoryFilter';
import MenuFilters from '../features/products/components/MenuFilters';
import MenuSort from '../features/products/components/MenuSort';
import PageTransition from '../components/motion/PageTransition';
import { menuItems } from '../data/menuData';
import { useMenuFilters } from '../hooks/useMenuFilters';

const ITEMS_PER_PAGE = 6;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

const Menu = () => {
  const {
    filteredItems, filters,
    setSearch, setCategory, setSort, setPrice,
    toggleTag, clearFilters, activeFiltersCount,
  } = useMenuFilters(menuItems);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Burgers', 'Pizza', 'Desserts', 'Drinks'];

  // Reset to page 1 whenever filtered results change
  useEffect(() => { setCurrentPage(1); }, [filteredItems.length, filters.category, filters.search]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goTo = useCallback((p) => {
    setCurrentPage(Math.min(Math.max(p, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  return (
    <PageTransition className="pt-28 pb-20 bg-surface-elevated min-h-[100dvh]">
      <PageContainer>

        {/* ── Page header ── */}
        <div className="mb-8">
          <p className="text-overline mb-2">Fresh Every Day</p>
          <h1 className="text-heading-1 text-text-primary mb-1">
            Our <em className="not-italic text-primary">Menu</em>
          </h1>
          <p className="text-text-secondary text-base max-w-lg">
            {filteredItems.length} dishes — explore by category, taste, or price.
          </p>
        </div>

        {/* ── Category pills ── */}
        <CategoryFilter
          categories={categories}
          activeCategory={filters.category}
          setActiveCategory={setCategory}
        />

        {/* ── Mobile filter bar ── */}
        <div className="flex items-center justify-between mt-6 mb-4 lg:hidden">
          <span className="text-sm font-semibold text-text-secondary">
            {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'}
          </span>
          <div className="flex items-center gap-2">
            <MenuSort sort={filters.sort} setSort={setSort} />
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-border-strong text-text-secondary hover:border-primary/50'
              }`}
            >
              {showFilters ? <FaTimes /> : <FaFilter />}
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile filter drawer ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden mb-6"
            >
              <div className="bg-surface rounded-2xl p-5 border border-border-strong shadow-sm">
                <MenuFilters
                  filters={filters}
                  setSearch={setSearch}
                  setPrice={setPrice}
                  toggleTag={toggleTag}
                  clearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Layout: sidebar + grid ── */}
        <div className="grid lg:grid-cols-4 gap-8 mt-2">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 border border-border-strong sticky top-32 shadow-sm">
              <MenuFilters
                filters={filters}
                setSearch={setSearch}
                setPrice={setPrice}
                toggleTag={toggleTag}
                clearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="lg:col-span-3">

            {/* Desktop sort bar */}
            <div className="hidden lg:flex items-center justify-between mb-7 pb-5 border-b border-border/40">
              <span className="font-display font-bold text-xl text-text-primary">
                {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'}
              </span>
              <MenuSort sort={filters.sort} setSort={setSort} />
            </div>

            {/* Empty state */}
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20 bg-surface rounded-2xl border border-border/50"
              >
                <div className="w-20 h-20 mb-5 rounded-full bg-surface-elevated flex items-center justify-center">
                  <FaSearch className="text-text-muted text-3xl" />
                </div>
                <h3 className="text-heading-3 mb-2">No dishes found</h3>
                <p className="text-text-secondary text-sm mb-7 max-w-sm">
                  Try adjusting your search or filters.
                </p>
                <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  key={`${filters.category}-${currentPage}`}
                  initial="hidden"
                  animate="show"
                  transition={{ staggerChildren: 0.07 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 min-h-[300px]"
                >
                  <AnimatePresence mode="popLayout">
                    {currentItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        layout
                        exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18 } }}
                      >
                        <MenuCard item={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
                    <button
                      onClick={() => goTo(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border-strong bg-surface hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40 disabled:pointer-events-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <FaChevronLeft className="text-xs" />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i + 1)}
                        aria-label={`Page ${i + 1}`}
                        aria-current={currentPage === i + 1 ? 'page' : undefined}
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                          currentPage === i + 1
                            ? 'bg-primary text-white shadow-md scale-110 border border-primary'
                            : 'bg-surface text-text-secondary border border-border-strong hover:border-primary hover:text-primary'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => goTo(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border-strong bg-surface hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40 disabled:pointer-events-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
};

export default Menu;