import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { Zap, Loader2, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const result = await authApi.register(data);
      setAuth(result.user, result.token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* ── Deep-space background orbs ── */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300"
        style={{ background: 'var(--app-bg-gradient)' }}
      />
      {/* Orb 1 */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none z-0 animate-float transition-all duration-300"
        style={{
          background: 'var(--orb-1)',
          filter: 'blur(80px)',
        }}
      />
      {/* Orb 2 */}
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[60%] h-[60%] rounded-full pointer-events-none z-0 transition-all duration-300"
        style={{
          background: 'var(--orb-2)',
          filter: 'blur(100px)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-6 lg:px-16 gap-16 py-12">

        {/* Left — hero copy */}
        <div className="flex-1 text-center lg:text-left max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ background: 'var(--border-glow)' }}
          >
            <Zap size={12} />
            Join the Platform
          </div>

          <h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            style={{ color: '#f0eaff', letterSpacing: '-0.02em' }}
          >
            Start Your
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Journey
            </span>
            <br />
            <span style={{ color: 'var(--accent-purple)' }}>Today</span>
          </h1>

          <p className="text-base lg:text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            Start managing your leads today. Get real-time insights, track your
            pipeline progress, and close deals effortlessly in a stunning
            spatial environment.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {['Free Forever Tier', 'Instant Setup', 'No Credit Card Needed'].map(f => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#a89cc8',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Right — register card */}
        <div
          className="w-full max-w-md rounded-3xl p-8 sm:p-10 animate-slide-up relative"
          className="card"
        >
          {/* Card inner glow */}
          <div
            className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <div className="mb-8">
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
                }}
              >
                <Zap size={22} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Create an account
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                Get started with GigFlow for free
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="register-name" className="label">
                  Full name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    id="register-name"
                    type="text"
                    className="input-field pl-10"
                    placeholder="John Doe"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="register-email" className="label">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    id="register-email"
                    type="email"
                    className="input-field pl-10"
                    placeholder="john@example.com"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="register-password" className="label">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field pl-10 pr-10"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b5f87')}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary w-full mt-2 py-3 text-base"
                disabled={isLoading}
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                {isLoading ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold transition-colors"
                style={{ color: 'var(--accent-violet)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
                onMouseLeave={e => (e.currentTarget.style.color = '#a78bfa')}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
