import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { Zap, Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await authApi.login(data);
      setAuth(result.user, result.token);
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate('/dashboard');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* ── Background orbs ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(88,28,135,0.7) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 60% 50% at 100% 80%, rgba(139,92,246,0.3) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 50% 40% at -5% 60%, rgba(168,85,247,0.25) 0%, transparent 55%), ' +
            '#0d0a1a',
        }}
      />
      <div
        className="absolute top-[10%] right-[5%] w-[45%] h-[45%] rounded-full pointer-events-none z-0 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute bottom-[5%] left-[5%] w-[35%] h-[40%] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-6 lg:px-16 gap-16 py-12">

        {/* Left — hero copy */}
        <div className="flex-1 text-center lg:text-left max-w-xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ background: 'var(--border-glow)' }}
          >
            <Zap size={12} />
            Next-Gen CRM Platform
          </div>

          <h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            style={{ color: '#f0eaff', letterSpacing: '-0.02em' }}
          >
            Gig<span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >Flow</span>
            <br />
            <span style={{ color: 'var(--accent-purple)' }}>Smart Leads</span>
          </h1>

          <p className="text-base lg:text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            Experience lead management like never before. A perfectly optimised
            workflow tailored for ambitious sales teams, wrapped in a stunning
            spatial interface.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {['Real-time Analytics', 'Smart Filtering', 'Role-based Access'].map(f => (
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

        {/* Right — login card */}
        <div
          className="w-full max-w-md rounded-3xl p-8 sm:p-10 animate-slide-up"
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
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
                }}
              >
                <Zap size={22} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Welcome back
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                Sign in to your GigFlow account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="label">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    id="login-email"
                    type="email"
                    className="input-field pl-10"
                    placeholder="admin@gigflow.com"
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
                <label htmlFor="login-password" className="label">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    id="login-password"
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
                {isLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold transition-colors"
                style={{ color: 'var(--accent-violet)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
                onMouseLeave={e => (e.currentTarget.style.color = '#a78bfa')}
              >
                Create one free
              </Link>
            </p>

            {/* Demo credentials */}
            <div
              className="mt-6 rounded-2xl p-4"
              style={{
                background: 'rgba(139,92,246,0.06)',
                border: '1px solid rgba(139,92,246,0.15)',
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                Demo Credentials
              </p>
              <div className="space-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <p><span className="font-semibold" style={{ color: 'var(--accent-purple)' }}>Admin:</span> admin@gigflow.com / admin123</p>
                <p><span className="font-semibold" style={{ color: 'var(--accent-purple)' }}>Sales:</span> sales@gigflow.com / sales123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
