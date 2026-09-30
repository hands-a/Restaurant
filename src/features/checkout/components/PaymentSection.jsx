import React from 'react';
import { FaMoneyBillWave, FaCreditCard, FaLock } from 'react-icons/fa';
import Input from '../../../components/ui/Input';
import Card from '../../../components/ui/Card';

const PaymentSection = ({ register, errors, watch, setValue }) => {
  const paymentMethod = watch('paymentMethod');

  return (
    <Card variant="default">
      <h3 className="text-heading-3 mb-6">Payment Method</h3>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div 
          onClick={() => setValue('paymentMethod', 'cash')}
          role="radio"
          aria-checked={paymentMethod === 'cash'}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setValue('paymentMethod', 'cash')}
          className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            paymentMethod === 'cash' ? 'border-primary bg-primary-lightest' : 'border-border-strong hover:border-border hover:bg-surface-sunken'
          }`}
        >
          <FaMoneyBillWave className="text-success text-xl" />
          <span className="text-body font-bold text-text-primary">Cash on Delivery</span>
        </div>

        <div 
          onClick={() => setValue('paymentMethod', 'card')}
          role="radio"
          aria-checked={paymentMethod === 'card'}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setValue('paymentMethod', 'card')}
          className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            paymentMethod === 'card' ? 'border-primary bg-primary-lightest' : 'border-border-strong hover:border-border hover:bg-surface-sunken'
          }`}
        >
          <FaCreditCard className="text-info text-xl" />
          <span className="text-body font-bold text-text-primary">Credit Card</span>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-6 border-t border-border-strong pt-6 animate-fade-in">
          <div className="flex items-center gap-2 text-body-sm text-text-muted mb-4 font-bold">
            <FaLock /> Secure SSL Payment
          </div>
          <Input 
            required 
            label="Card Number" 
            type="text" 
            placeholder="0000 0000 0000 0000" 
            error={errors.cardNumber?.message}
            {...register('cardNumber')}
          />
          <div className="grid grid-cols-2 gap-6">
            <Input 
              required 
              label="Expiry Date" 
              type="text" 
              placeholder="MM / YY" 
              error={errors.expiryDate?.message}
              {...register('expiryDate')}
            />
            <Input 
              required 
              label="CVC" 
              type="text" 
              placeholder="123" 
              error={errors.cvc?.message}
              {...register('cvc')}
            />
          </div>
          <Input 
            required 
            label="Card Holder Name" 
            type="text" 
            placeholder="John Doe" 
            error={errors.cardName?.message}
            {...register('cardName')}
          />
        </div>
      )}
    </Card>
  );
};

export default PaymentSection;
