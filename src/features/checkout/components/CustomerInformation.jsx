import React from 'react';
import Input from '../../../components/ui/Input';
import Card from '../../../components/ui/Card';
import Textarea from '../../../components/ui/Textarea';

const CustomerInformation = ({ register, errors }) => {
  return (
    <Card variant="default">
      <h3 className="text-heading-3 mb-6">Delivery Information</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <Input 
          required 
          label="Full Name" 
          type="text" 
          placeholder="John Doe" 
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input 
          required 
          label="Phone Number" 
          type="tel" 
          placeholder="e.g. 01000000000" 
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input 
          required 
          label="City / Area" 
          type="text" 
          placeholder="e.g. Maadi, Cairo" 
          error={errors.city?.message}
          {...register('city')}
        />
        <Input 
          required 
          label="Street Name & Building" 
          type="text" 
          placeholder="e.g. 15 Street, Building 5" 
          error={errors.street?.message}
          {...register('street')}
        />
        <div className="md:col-span-2">
          <Textarea 
            label="Special Delivery Instructions (Optional)" 
            placeholder="Leave at the door, call upon arrival..." 
            rows={3} 
            error={errors.instructions?.message}
            {...register('instructions')}
          />
        </div>
      </div>
    </Card>
  );
};

export default CustomerInformation;
