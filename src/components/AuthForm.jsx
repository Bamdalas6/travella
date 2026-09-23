'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthForm({
  initialMode = 'login',
  onSuccess,
  onModeChange,
  showTitle = true,
  isModal = false
}) {
  const { login, signup, demoLogin, socialLogin } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation & Status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTabSwitch = (newMode) => {
    setMode(newMode);
    setErrors({});
    if (onModeChange) onModeChange(newMode);
  };

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!fullName || fullName.trim().length < 2) {
        errs.fullName = 'Please enter your full name';
      }
      if (!agreedToTerms) {
        errs.terms = 'Please accept the Terms of Service';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      let loggedUser;
      if (mode === 'login') {
        loggedUser = login({ email, password, rememberMe });
      } else {
        loggedUser = signup({ fullName, email, password, rememberMe });
      }
      if (onSuccess) onSuccess(loggedUser);
    } catch (err) {
      setErrors({ form: err.message || 'Authentication failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoClick = () => {
    const demoUser = demoLogin();
    if (onSuccess) onSuccess(demoUser);
  };

  const handleSocialClick = (provider) => {
    const socialUser = socialLogin(provider);
    if (onSuccess) onSuccess(socialUser);
  };

  return (
    <div className="w-full">
      {/* Header Info */}
      {showTitle && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E8F1F8] text-[#387FAB] mb-3">
            <Sparkles className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#6A717A] mt-1 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Sign in to access your saved escapes, bookings, and rewards'
              : 'Join Travella to discover and reserve handpicked luxury stays'}
          </p>
        </div>
      )}

      {/* Pill Segmented Tab Toggle */}
      <div className="flex bg-[#F4F3EF] p-1 rounded-2xl mb-6 border border-[#E8E7E2]">
        <button
          type="button"
          onClick={() => handleTabSwitch('login')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
            mode === 'login'
              ? 'bg-[#387FAB] text-white shadow-sm'
              : 'text-[#6A717A] hover:text-[#1A1C1E]'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch('signup')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
            mode === 'signup'
              ? 'bg-[#387FAB] text-white shadow-sm'
              : 'text-[#6A717A] hover:text-[#1A1C1E]'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Quick Demo Login Pill */}
      <div className="mb-5">
        <button
          type="button"
          onClick={handleDemoClick}
          className="w-full py-2.5 px-4 bg-[#E8F1F8] hover:bg-[#d8e8f5] text-[#387FAB] border border-[#387FAB]/20 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-xs"
        >
          <span className="text-sm">⚡</span>
          <span>Quick Demo Login (Alex Morgan)</span>
        </button>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-[#E8E7E2]" />
        <span className="px-3 text-[11px] font-semibold text-[#8E95A0] uppercase tracking-wider">
          or continue with email
        </span>
        <div className="flex-1 border-t border-[#E8E7E2]" />
      </div>

      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
          {errors.form}
        </div>
      )}

      {/* Main Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-bold text-[#1A1C1E] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8E95A0]" />
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                  errors.fullName ? 'border-red-400' : 'border-[#E8E7E2]'
                } rounded-xl text-xs text-[#1A1C1E] placeholder-[#8E95A0] focus:outline-none focus:ring-2 focus:ring-[#387FAB]/30 focus:border-[#387FAB] transition-all`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.fullName}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#1A1C1E] mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8E95A0]" />
            <input
              type="email"
              placeholder="alex.morgan@travella.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                errors.email ? 'border-red-400' : 'border-[#E8E7E2]'
              } rounded-xl text-xs text-[#1A1C1E] placeholder-[#8E95A0] focus:outline-none focus:ring-2 focus:ring-[#387FAB]/30 focus:border-[#387FAB] transition-all`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-[#1A1C1E]">
              Password
            </label>
            {mode === 'login' && (
              <button
                type="button"
                onClick={() => alert('Password reset link has been dispatched to your email address.')}
                className="text-[11px] font-semibold text-[#387FAB] hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8E95A0]" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 bg-white border ${
                errors.password ? 'border-red-400' : 'border-[#E8E7E2]'
              } rounded-xl text-xs text-[#1A1C1E] placeholder-[#8E95A0] focus:outline-none focus:ring-2 focus:ring-[#387FAB]/30 focus:border-[#387FAB] transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-[#8E95A0] hover:text-[#1A1C1E]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.password}</p>
          )}
        </div>

        {mode === 'login' ? (
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#387FAB] border-[#E8E7E2] rounded focus:ring-[#387FAB]"
              />
              <span className="text-xs text-[#6A717A] font-medium">Remember me</span>
            </label>
          </div>
        ) : (
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-[#387FAB] border-[#E8E7E2] rounded focus:ring-[#387FAB]"
              />
              <span className="text-[11px] text-[#6A717A] leading-tight">
                I agree to the <span className="text-[#387FAB] underline">Terms of Service</span> and <span className="text-[#387FAB] underline">Privacy Policy</span>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.terms}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-[#387FAB] hover:bg-[#2E698D] text-white rounded-2xl text-xs font-bold transition-all duration-200 shadow-travella-float active:scale-[0.99] flex items-center justify-center gap-1.5 mt-2"
        >
          <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Social Providers */}
      <div className="mt-6">
        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-[#E8E7E2]" />
          <span className="px-3 text-[11px] font-semibold text-[#8E95A0] uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-1 border-t border-[#E8E7E2]" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialClick('google')}
            className="py-2.5 px-3 bg-white hover:bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-bold text-[#1A1C1E] flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialClick('apple')}
            className="py-2.5 px-3 bg-white hover:bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-bold text-[#1A1C1E] flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <svg className="w-4 h-4 fill-current text-[#1A1C1E]" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.83-.98 2.94 1.07.08 2.13-.46 2.79-1.28z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* Switch Mode Footer */}
      <div className="mt-6 text-center text-xs text-[#6A717A]">
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => handleTabSwitch('signup')}
              className="font-bold text-[#387FAB] hover:underline"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => handleTabSwitch('login')}
              className="font-bold text-[#387FAB] hover:underline"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
