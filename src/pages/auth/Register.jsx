import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';

import PageContainer from '../../components/layout/PageContainer';
import PageTransition from '../../components/motion/PageTransition';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...userData } = data;
    const response = await registerUser(userData);

    if (response.success) {
      toast.success('Account created successfully!');
      navigate('/profile', { replace: true });
    } else {
      toast.error(response.error || 'Registration failed');
    }
  };

  return (
    <PageTransition className="min-h-[100dvh] bg-bg-dark noise-overlay flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 py-24">
        <PageContainer className="max-w-md w-full">
          <ScrollReveal>
            <div className="bg-surface/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <Link to="/" className="inline-block mb-8">
                  <Logo variant="light" compact />
                </Link>
                <h1 className="text-heading-3 text-white mb-2">Create Account</h1>
                <p className="text-white/60">Join us for a premium dining experience.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Input
                  label="Full Name"
                  placeholder="Enter Your Name"
                  icon={FaUser}
                  error={errors.fullName?.message}
                  {...register('fullName')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your Email"
                  icon={FaEnvelope}
                  error={errors.email?.message}
                  {...register('email')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter Your Phone Number "
                  icon={FaPhone}
                  error={errors.phone?.message}
                  {...register('phone')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter  Your Password"
                  icon={FaLock}
                  error={errors.password?.message}
                  {...register('password')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm "
                  icon={FaLock}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full shadow-button py-4 mt-4"
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-8 text-center border-t border-white/10 pt-8">
                <p className="text-white/60">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:text-primary-light font-bold transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </PageContainer>
      </div>
    </PageTransition>
  );
};

export default Register;
