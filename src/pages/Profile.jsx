import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

import PageContainer from '../components/layout/PageContainer';
import PageTransition from '../components/motion/PageTransition';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().optional(),
  street: z.string().optional(),
});

const Profile = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
      city: currentUser?.city || '',
      street: currentUser?.street || '',
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const onSubmit = async (data) => {
    const response = await updateProfile(data);
    if (response.success) {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } else {
      toast.error('Failed to update profile');
    }
  };

  if (!currentUser) {
    return null; // Will be handled by ProtectedRoute
  }

  return (
    <PageTransition className="bg-surface min-h-[100dvh]">
      {/* Cinematic Header */}
      <div className="pt-40 pb-12 bg-bg-dark noise-overlay border-b border-white/10">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-overline mb-3">Your Account</p>
              <h1 className="text-heading-2 text-text-on-dark mb-2">My <em className="italic text-primary not-italic">Profile</em></h1>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" /> Sign Out
            </Button>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="bg-surface-elevated rounded-3xl p-8 border border-border shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-heading-3">Personal Information</h2>
                  {!isEditing && (
                    <Button variant="ghost" onClick={() => setIsEditing(true)}>
                      <FaEdit className="mr-2" /> Edit
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        icon={FaUser}
                        error={errors.fullName?.message}
                        {...register('fullName')}
                      />
                      <Input
                        label="Phone Number"
                        icon={FaPhone}
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                    </div>
                    
                    <div className="border-t border-border pt-6 mt-6">
                      <h3 className="text-body-lg font-bold mb-4">Delivery Address</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="City"
                          icon={FaMapMarkerAlt}
                          error={errors.city?.message}
                          {...register('city')}
                        />
                        <Input
                          label="Street Address"
                          icon={FaMapMarkerAlt}
                          error={errors.street?.message}
                          {...register('street')}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" loading={isSubmitting}>
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-sm text-text-muted mb-1">Full Name</p>
                        <p className="text-body-lg font-medium">{currentUser.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted mb-1">Email Address</p>
                        <p className="text-body-lg font-medium">{currentUser.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted mb-1">Phone Number</p>
                        <p className="text-body-lg font-medium">{currentUser.phone}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6 mt-6">
                      <h3 className="text-body-lg font-bold mb-4">Delivery Address</h3>
                      {currentUser.city || currentUser.street ? (
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-sm text-text-muted mb-1">City</p>
                            <p className="text-body-lg font-medium">{currentUser.city || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-text-muted mb-1">Street Address</p>
                            <p className="text-body-lg font-medium">{currentUser.street || 'Not provided'}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-surface-sunken p-6 rounded-2xl text-center">
                          <p className="text-text-muted mb-4">No address saved yet. Adding an address will make checkout faster.</p>
                          <Button variant="outline" onClick={() => setIsEditing(true)}>
                            Add Address
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar / Quick Stats */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2} className="sticky top-32">
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-primary">
                    {currentUser.fullName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-heading-3 mb-1">Hello, {currentUser.fullName?.split(' ')[0]}</h3>
                <p className="text-text-muted mb-6">Member since {new Date(currentUser.createdAt || Date.now()).getFullYear()}</p>
                
                <div className="space-y-4">
                  <div className="bg-surface rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-primary">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Saved Address</p>
                      <p className="text-xs text-text-muted">{currentUser.city ? 'Added' : 'Not added'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
};

export default Profile;
