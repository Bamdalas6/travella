'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Compass, ShieldCheck } from 'lucide-react';
import AuthForm from '../../components/AuthForm';

export default function SignupPage() {
  const router = useRouter();

  const handleSuccess = (user) => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col justify-between p-4 sm:p-6 text-[#1A1C1E]">
      {/* Top Header / Back Navigation */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#387FAB] hover:text-[#2E698D] bg-white px-3.5 py-2 rounded-full border border-[#E8E7E2] shadow-xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

        <div className="flex items-center gap-1.5 font-extrabold text-base tracking-tight text-[#1A1C1E]">
          <div className="w-7 h-7 rounded-xl bg-[#387FAB] text-white flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <span>Travella</span>
        </div>
      </header>

      {/* Main Centered Sign Up Card */}
      <main className="max-w-md mx-auto w-full my-auto py-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E7E2] shadow-travella">
          <AuthForm
            initialMode="signup"
            onSuccess={handleSuccess}
            onModeChange={(newMode) => {
              if (newMode === 'login') {
                router.push('/login');
              }
            }}
          />
        </div>

        {/* Security & Trust Footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-center text-[11px] text-[#8E95A0]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#387FAB]" />
          <span>Instant booking confirmation · No hidden fees</span>
        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="max-w-md mx-auto w-full text-center py-4 text-[11px] text-[#8E95A0]">
        © {new Date().getFullYear()} Travella Inc. All rights reserved.
      </footer>
    </div>
  );
}
