import React from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaLock, FaHashtag } from 'react-icons/fa';
import toast from 'react-hot-toast';

import PageContainer from '../../components/layout/PageContainer';
import PageTransition from '../../components/motion/PageTransition';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';

const resetPasswordSchema = z.object({
  code: z.string().min(6, 'Reset code must be 6 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onSubmit = async (data) => {
    const response = await resetPassword(email, data.code, data.password);
    if (response.success) {
      toast.success('Password reset successful! You can now login.');
      navigate('/login', { replace: true });
    } else {
      toast.error(response.error || 'Failed to reset password');
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
                <h1 className="text-heading-3 text-white mb-2">New Password</h1>
                <p className="text-white/60">Enter the reset code sent to your email and choose a new password.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <Input
                  label="Reset Code"
                  placeholder="123456"
                  icon={FaHashtag}
                  error={errors.code?.message}
                  {...register('code')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />
                
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  icon={FaLock}
                  error={errors.password?.message}
                  {...register('password')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  icon={FaLock}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full shadow-button py-4 mt-2"
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>

              <div className="mt-8 text-center border-t border-white/10 pt-8">
                <Link to="/login" className="text-primary hover:text-primary-light font-bold transition-colors">
                  Return to Login
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </PageContainer>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;
