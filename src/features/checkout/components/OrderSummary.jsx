import React from 'react';
import Card from '../../../components/ui/Card';

const OrderSummary = ({ cartItems, subtotal, deliveryFee, total }) => {
  return (
    <Card variant="elevated" padding="none" className="sticky top-32 overflow-hidden border border-border-strong/50 shadow-lg">
      <div className="bg-surface-sunken p-6 border-b border-border-strong/50">
        <h3 className="text-heading-3 text-text-primary">Order Summary</h3>
      </div>
      
      <div className="p-6 space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
        {cartItems.map((item) => (
          <div key={item.uniqueId} className="flex justify-between text-text-secondary items-start gap-4">
            <span className="font-medium text-text-primary">
              <span className="text-primary font-bold mr-2">{item.quantity}x</span> 
              {item.name}
            </span>
            <span className="whitespace-nowrap font-bold text-text-primary">{(item.price + (item.extras?.reduce((s,e)=>s+e.price,0)||0)) * item.quantity} EGP</span>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-surface-sunken border-t border-border-strong/50 space-y-4 text-text-secondary">
        <div className="flex justify-between items-center text-body-lg">
          <span>Subtotal</span>
          <span className="text-text-primary font-bold">{subtotal} EGP</span>
        </div>
        <div className="flex justify-between items-center text-body-lg">
          <span>Delivery</span>
          <span className="text-text-primary font-bold">{deliveryFee} EGP</span>
        </div>
        
        <div className="h-px bg-border-strong/50 w-full my-4"></div>
        
        <div className="flex justify-between items-end">
          <span className="text-heading-3 text-text-primary">Total</span>
          <span className="text-heading-1 text-primary">{total} <span className="text-body-lg">EGP</span></span>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;
