import React from 'react';

const MenuSort = ({ sort, setSort }) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-body-sm font-bold text-text-secondary">
        Sort by:
      </label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-surface border border-border-strong text-text-primary text-body-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 transition-colors focus:outline-none"
      >
        <option value="default">Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
};

export default MenuSort;
