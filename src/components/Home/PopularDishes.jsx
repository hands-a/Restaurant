import React from 'react';
import MenuCard from '../Menu/MenuCard';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const PopularDishes = () => {
  
  const popularItems = [
    { 
      id: 1, 
      name: 'Classic Beef Burger', 
      price: 180, 
      rating: 4.5, 
      isNew: false, 
      description: "Authentic beef patty with fresh lettuce and cheddar cheese.", 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 8, 
      name: 'Pepperoni Explosion', 
      price: 195, 
      rating: 4.8, 
      isNew: true, 
      description: "Thin crust loaded with double layers of crispy pepperoni.", 
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 13, 
      name: 'Choco Lava Cake', 
      price: 95, 
      rating: 4.9, 
      isNew: true, 
      description: "Warm cake filled with molten Belgian chocolate.", 
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80' 
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Our Menu</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Most Popular Dishes</h2>
            <p className="text-gray-500 mt-2">Our top selling dishes this week.</p>
          </div>
          
          
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {popularItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
           <Link to="/menu">
            <Button variant="primary" className="w-full shadow-lg shadow-amber-200">
              View Full Menu
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularDishes;