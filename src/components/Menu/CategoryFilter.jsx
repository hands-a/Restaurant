import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
            activeCategory === cat
              ? 'bg-amber-600 text-white border-amber-600 shadow-lg scale-105'
              : 'bg-white text-gray-600 border-gray-200 hover:border-amber-600 hover:text-amber-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;