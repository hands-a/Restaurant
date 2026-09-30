import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { categoryOptions, defaultOptions } from '../data/productData';

import ProductGallery from '../features/products/components/ProductGallery';
import ProductInfo from '../features/products/components/ProductInfo';
import ProductOptions from '../features/products/components/ProductOptions';
import ProductQuantity from '../features/products/components/ProductQuantity';
import ProductActions from '../features/products/components/ProductActions';
import FavoriteButton from '../features/products/components/FavoriteButton';
import RelatedProducts from '../features/products/components/RelatedProducts';

import PageContainer from '../components/layout/PageContainer';
import PageTransition from '../components/motion/PageTransition';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import Card from '../components/ui/Card';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [extras, setExtras] = useState([]);

  const product = menuItems.find(p => p.id === parseInt(id));

  // Resolve per-category options
  const options = categoryOptions[product?.category] || defaultOptions;

  // Set default size whenever product or options change
  useEffect(() => {
    if (options.sizes.length > 0) {
      setSelectedSize(options.sizes[0]);
    }
    setExtras([]);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id, options.sizes]);

  if (!product) {
    return (
      <PageTransition className="pt-40 pb-20 min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 bg-surface-elevated">
        <h1 className="text-4xl font-black text-text-primary mb-4">Product Not Found</h1>
        <p className="text-text-secondary mb-8">This dish doesn&apos;t exist or may have been removed.</p>
        <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          <FaArrowLeft /> Back to Menu
        </Link>
      </PageTransition>
    );
  }

  const relatedProducts = menuItems
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const sizePrice = options.sizes.length > 1
    ? (options.sizes.indexOf(selectedSize) * 20)  // +0 / +20 / +40 per tier
    : 0;

  const extrasPrice = extras.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = (product.price + sizePrice + extrasPrice) * quantity;

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
  };

  return (
    <PageTransition className="pt-28 pb-20 bg-surface min-h-[100dvh]">
      <PageContainer>

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
        >
          <FaArrowLeft /> Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery
            images={product.images || [product.image]}
            name={product.name}
            rating={product.rating}
          />

          <div className="flex flex-col justify-start gap-6">
            <ProductInfo
              name={product.name}
              description={product.description}
              category={product.category}
              tags={product.tags}
              rating={product.rating}
              price={product.price}
              prepTime={product.prepTime}
            />

            <ProductOptions
              sizes={options.sizes}
              addons={options.addons}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              extras={extras}
              toggleExtra={toggleExtra}
            />

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 p-4 sm:p-6 bg-surface-sunken sm:bg-transparent rounded-[2rem] sm:rounded-none border sm:border-none border-border shadow-sm sm:shadow-none relative z-10">
              <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
              <div className="flex flex-1 w-full gap-3 items-center">
                <ProductActions handleAddToCart={handleAddToCart} totalPrice={totalPrice} />
                <div className="flex-shrink-0">
                  <FavoriteButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollReveal>
          <RelatedProducts products={relatedProducts} />
        </ScrollReveal>

      </PageContainer>
    </PageTransition>
  );
};

export default ProductDetails;