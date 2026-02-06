import React, { useState, useEffect } from 'react';
import MenuCard from '../components/Menu/MenuCard';
import CategoryFilter from '../components/Menu/CategoryFilter';
import { AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { menuItems } from '../data/menuData'; 

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  

  const categories = ['All', 'Burgers', 'Pizza', 'Desserts', 'Drinks'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Our Delicious Menu</h2>
          <p className="text-gray-500">Explore our wide range of freshly prepared dishes.</p>
        </div>

        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode='wait'>
            {currentItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-lg bg-white border border-gray-200 hover:bg-amber-600 hover:text-white hover:border-amber-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-colors"
            >
              <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === i + 1
                    ? 'bg-amber-600 text-white shadow-lg scale-110'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-600 hover:text-amber-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-lg bg-white border border-gray-200 hover:bg-amber-600 hover:text-white hover:border-amber-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;