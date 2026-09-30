import React from 'react';
import { FaLock, FaArrowRight, FaReceipt, FaSignInAlt } from 'react-icons/fa';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const fmt = (n) => Number(n).toFixed(2);

const CartSummary = ({ subtotal, deliveryFee, total, onCheckout, isLoggedIn }) => {
  return (
    <Card variant="elevated" padding="none" className="sticky top-32 overflow-hidden border border-border-strong/50 shadow-lg">
      <div className="bg-surface-sunken p-6 border-b border-border-strong/50 flex items-center gap-3">
        <FaReceipt className="text-primary text-xl" />
        <h3 className="text-heading-3">Order Summary</h3>
      </div>

      <div className="p-6 space-y-4 text-text-secondary">
        <div className="flex justify-between items-center text-body-lg">
          <span>Subtotal</span>
          <span className="font-bold text-text-primary">{fmt(subtotal)} EGP</span>
        </div>
        <div className="flex justify-between items-center text-body-lg">
          <span>Delivery Fee</span>
          <span className="font-bold text-text-primary">{fmt(deliveryFee)} EGP</span>
        </div>

        <div className="h-px bg-border-strong/50 w-full my-4" />

        <div className="flex justify-between items-end">
          <span className="text-heading-3">Total</span>
          <span className="text-heading-1 text-primary">{fmt(total)} <span className="text-body-lg">EGP</span></span>
        </div>
      </div>

      <div className="p-6 bg-surface-sunken border-t border-border-strong/50 space-y-3">
        <Button
          onClick={onCheckout}
          className="w-full flex justify-between items-center group !py-4"
          icon={isLoggedIn ? undefined : FaSignInAlt}
        >
          <span className="text-button">
            {isLoggedIn ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          </span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
        {!isLoggedIn && (
          <p className="text-caption text-text-muted text-center">
            You need an account to place an order.
          </p>
        )}
        <p className="text-caption text-text-muted text-center flex items-center justify-center gap-1.5">
          <FaLock /> Secure checkout powered by Restaurantly
        </p>
      </div>
    </Card>
  );
};

export default CartSummary;
