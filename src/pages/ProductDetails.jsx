import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Button from '../components/Common/Button';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData'; 

const ProductDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [quantity, setQuantity] = useState(1);
        const [selectedSize, setSelectedSize] = useState('Medium');
    const [extras, setExtras] = useState([]);
  
    const product = menuItems.find(p => p.id === parseInt(id));


    useEffect(() => {
    if (!product) {
        navigate('/menu');
    }
    window.scrollTo(0, 0);
  }, [id, product, navigate]);

  
  if (!product) return null;


  const addons = [
      { name: 'Extra Cheese', price: 25 },
      { name: 'Mushroom Sauce', price: 30 },
      { name: 'Spicy Jalapenos', price: 15 },
  ];
  
  const sizes = ['Small', 'Medium', 'Large'];

 
  const relatedProducts = menuItems
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const totalPrice = (product.price + extras.reduce((sum, item) => sum + item.price, 0)) * quantity;

  const toggleExtra = (item) => {
    if (extras.find(e => e.name === item.name)) {
      setExtras(extras.filter(e => e.name !== item.name));
    } else {
      setExtras([...extras, item]);
    }
  };

  const handleAddToCart = () => {
    
    const productWithOptions = { ...product, selectedSize }; 
    addToCart(productWithOptions, quantity, extras);
    navigate('/menu'); 
  };

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <Link to="/menu" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 mb-8 font-medium transition-colors">
          <FaArrowLeft /> Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                <FaStar className="text-amber-500" />
                <span>{product.rating}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Select Size</h3>
              <div className="flex gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-xl border-2 font-bold transition-all ${
                      selectedSize === size 
                      ? 'border-amber-600 text-amber-600 bg-amber-50' 
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Extras & Add-ons</h3>
              <div className="space-y-2">
                {addons.map(addon => (
                  <div 
                    key={addon.name}
                    onClick={() => toggleExtra(addon)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      extras.find(e => e.name === addon.name)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        extras.find(e => e.name === addon.name) ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'
                      }`}>
                        {extras.find(e => e.name === addon.name) && <FaCheck size={12} />}
                      </div>
                      <span className="font-medium text-gray-700">{addon.name}</span>
                    </div>
                    <span className="text-gray-500 text-sm">+{addon.price} EGP</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col sm:flex-row items-center gap-6 sticky bottom-4 z-10">
              <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-2 w-full sm:w-auto justify-center">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-amber-600 font-bold text-lg">-</button>
                <span className="font-black text-xl w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-amber-600 font-bold text-lg">+</button>
              </div>

              <div className="flex-1 w-full">
                <Button onClick={handleAddToCart} className="w-full flex items-center justify-between py-4 text-lg">
                  <span className="flex items-center gap-2"><FaShoppingCart /> Add to Order</span>
                  <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">{totalPrice} EGP</span>
                </Button>
              </div>
            </div>

          </motion.div>
        </div>

        
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-black text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map(item => (
              <Link to={`/menu/${item.id}`} key={item.id} className="group">
                <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                  <div className="h-48 overflow-hidden rounded-xl mb-4">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">{item.name}</h3>
                    <span className="font-bold text-amber-600">{item.price} EGP</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;