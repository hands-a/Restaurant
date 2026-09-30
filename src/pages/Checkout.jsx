import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';

import PageContainer from '../components/layout/PageContainer';
import Button from '../components/ui/Button';
import PageTransition from '../components/motion/PageTransition';
import { ScrollReveal } from '../components/motion/ScrollReveal';

import CustomerInformation from '../features/checkout/components/CustomerInformation';
import PaymentSection from '../features/checkout/components/PaymentSection';
import OrderSummary from '../features/checkout/components/OrderSummary';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(2, 'City is required'),
  street: z.string().min(5, 'Street address is required'),
  instructions: z.string().optional(),
  paymentMethod: z.enum(['cash', 'card']),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  cardName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber || data.cardNumber.length < 16) {
      ctx.addIssue({ path: ['cardNumber'], message: 'Valid card number is required', code: z.ZodIssueCode.custom });
    }
    if (!data.expiryDate || data.expiryDate.length < 5) {
      ctx.addIssue({ path: ['expiryDate'], message: 'Valid expiry date (MM/YY) is required', code: z.ZodIssueCode.custom });
    }
    if (!data.cvc || data.cvc.length < 3) {
      ctx.addIssue({ path: ['cvc'], message: 'Valid CVC is required', code: z.ZodIssueCode.custom });
    }
    if (!data.cardName || data.cardName.length < 2) {
      ctx.addIssue({ path: ['cardName'], message: 'Card holder name is required', code: z.ZodIssueCode.custom });
    }
  }
});

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = getCartTotal();
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cash',
      fullName: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
      city: currentUser?.city || '',
      street: currentUser?.street || '',
    }
  });

  const onSubmit = async (data) => {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Order Placed Successfully!\nWe will call you shortly.", { icon: <FaCheckCircle className="text-success" /> });
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <PageTransition className="pt-32 pb-24 bg-surface text-center min-h-[100dvh]">
        <PageContainer>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-24 bg-surface rounded-3xl border border-border-strong/50 shadow-sm mt-12 max-w-4xl mx-auto"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <FaShoppingBag className="text-primary text-4xl" />
            </div>
            <h3 className="text-heading-2 mb-4">No items to checkout</h3>
            <p className="text-body-lg text-text-secondary mb-10 max-w-md">
              Your cart is empty. Please add items to your cart before proceeding to checkout.
            </p>
            <Link to="/menu">
              <Button variant="primary" className="!px-10 !py-4">Browse Menu</Button>
            </Link>
          </motion.div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="bg-surface min-h-[100dvh]">
      {/* Cinematic checkout header */}
      <div className="pt-40 pb-12 bg-bg-dark noise-overlay border-b border-white/10">
        <PageContainer>
          <p className="text-overline mb-3">Secure Checkout</p>
          <h1 className="text-heading-2 text-text-on-dark mb-8">Complete Your <em className="italic text-primary not-italic">Order</em></h1>
          {/* Step progress */}
          <div className="flex items-center gap-0 max-w-sm">
            {["Your Info", "Payment", "Confirm"].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    i === 2 ? "border-white/30 text-white/40" : "border-primary bg-primary text-white"
                  }`}>{String(i + 1).padStart(2, "0")}</div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${i === 2 ? "text-white/30" : "text-primary"}`}>{step}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px mx-2 mb-4 ${i === 0 ? "bg-primary" : "bg-white/15"}`} aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-16">
        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8 lg:gap-12" noValidate>
          <div className="lg:col-span-2 space-y-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-button">01</span>
                <h2 className="text-heading-3">Customer Details</h2>
              </div>
              <CustomerInformation register={register} errors={errors} />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-button">02</span>
                <h2 className="text-heading-3">Payment</h2>
              </div>
              <PaymentSection register={register} errors={errors} watch={watch} setValue={setValue} />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2} className="sticky top-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-button">03</span>
                <h2 className="text-heading-3">Order Summary</h2>
              </div>
              <OrderSummary cartItems={cartItems} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
              <div className="mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-button"
                  loading={isSubmitting}
                >
                  {isSubmitting ? "Processing Order..." : "Place Order"}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </form>
      </PageContainer>
    </PageTransition>
  );
};

export default Checkout;