import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';

import PageContainer from '../../components/layout/PageContainer';
import PageTransition from '../../components/motion/PageTransition';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const response = await login(data.email, data.password);
    if (response.success) {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } else {
      toast.error(response.error || 'Login failed');
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
                <h1 className="text-heading-3 text-white mb-2">Welcome Back</h1>
                <p className="text-white/60">Sign in to continue your dining experience.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter Your Email"
                  icon={FaEnvelope}
                  error={errors.email?.message}
                  {...register('email')}
                  className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                />

                <div className="space-y-1.5">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter Your Password"
                    icon={FaLock}
                    error={errors.password?.message}
                    {...register('password')}
                    className="[&>label]:text-white/80 [&>div>input]:bg-white/5 [&>div>input]:border-white/10 [&>div>input]:text-white"
                  />
                  <div className="flex justify-end pt-1">
                    <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-light transition-colors font-medium">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full shadow-button py-4 mt-2"
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-8 text-center border-t border-white/10 pt-8">
                <p className="text-white/60">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:text-primary-light font-bold transition-colors">
                    Create one
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

export default Login;
