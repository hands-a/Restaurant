import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

import PageContainer from '../../components/layout/PageContainer';
import PageTransition from '../../components/motion/PageTransition';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    const response = await requestPasswordReset(data.email);
    if (response.success) {
      setIsSent(true);
      setResetEmail(data.email);
      if (response.mockCode) {
        // Automatically copying the mock code for easy testing
        navigator.clipboard.writeText(response.mockCode).catch(() => {});
        toast.success(`Mock code generated: ${response.mockCode} (Copied to clipboard!)`, { duration: 5000 });
      } else {
        toast.success('Password reset instructions sent!');
      }
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
                <h1 className="text-heading-3 text-white mb-2">Reset Password</h1>
                <p className="text-white/60">
                  {isSent 
                    ? "Check your email for the reset code." 
                    : "Enter your email and we'll send you a reset code."}
                </p>
              </div>

              {!isSent ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={FaEnvelope}
                    error={errors.email?.message}
                    {...register('email')}
                    className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                  />
                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full shadow-button py-4 mt-2"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Code'}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <Button
                    variant="primary"
                    className="w-full shadow-button py-4"
                    onClick={() => navigate('/reset-password', { state: { email: resetEmail } })}
                  >
                    Enter Reset Code
                  </Button>
                </div>
              )}

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

export default ForgotPassword;
