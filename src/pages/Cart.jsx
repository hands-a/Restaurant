import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLongArrowAltLeft, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import PageContainer from "../components/layout/PageContainer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/motion/PageTransition";
import CartItemCard from "../features/cart/components/CartItemCard";
import CartSummary from "../features/cart/components/CartSummary";
import FloatingElement from "../components/interactive/FloatingElement";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!currentUser) {
      // Save intended destination so login can redirect back
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <PageTransition className="pt-32 pb-24 bg-surface min-h-[100dvh]">
        <PageContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col items-center justify-center text-center py-28 rounded-3xl overflow-hidden mt-8 max-w-2xl mx-auto"
          >
            <div className="absolute inset-0 bg-surface-sunken rounded-3xl border border-border" />
            <FloatingElement speed="slow" className="absolute top-8 right-12 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
            <FloatingElement speed="medium" delay={1.5} className="absolute bottom-8 left-12 w-16 h-16 rounded-full bg-primary/5 blur-xl" />

            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto"
              >
                <FaShoppingBag className="text-primary text-4xl" aria-hidden="true" />
              </motion.div>
              <h1 className="text-heading-3 text-text-primary mb-4">Your order is empty</h1>
              <p className="text-body-lg text-text-secondary mb-10 max-w-sm">
                Looks like you haven't added anything yet. Let us find you something delicious.
              </p>
              <Link to="/menu">
                <Button variant="primary" size="lg">Explore the Menu</Button>
              </Link>
            </div>
          </motion.div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-24 bg-surface min-h-[100dvh]">
      <PageContainer>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-10 text-sm font-medium transition-colors"
        >
          <FaLongArrowAltLeft aria-hidden="true" /> Continue Shopping
        </Link>

        <div className="flex items-end justify-between mb-10 pb-6 border-b border-border/60">
          <div>
            <p className="text-overline mb-2">Review Your Selection</p>
            <h1 className="text-heading-2 text-text-primary">
              Your{" "}
              <em className="italic text-primary not-italic">Order</em>
            </h1>
          </div>
          <span className="text-text-muted text-sm font-medium">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.uniqueId}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <CartSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                onCheckout={handleCheckout}
                isLoggedIn={!!currentUser}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
};

export default Cart;
