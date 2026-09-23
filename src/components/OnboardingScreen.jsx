import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function OnboardingScreen({ onStartExploring, onSignIn, onRegister }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 animate-in fade-in duration-300">
      {/* Top Hero Image Card */}
      <div className="relative w-full aspect-[4/5] max-h-[420px] rounded-[2rem] overflow-hidden shadow-sm mt-2">
        <img
          src="/onboarding_hero.png"
          alt="Tropical paradise"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & Description */}
      <div className="my-auto py-6 text-center">
        <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#1A1C1E] tracking-tight leading-tight">
          Explore your Dream place
        </h1>
        <p className="text-xs text-[#8E95A0] mt-3.5 max-w-[290px] mx-auto leading-relaxed font-normal">
          Plunge into the atmosphere to the exploration of an unknown Planet. You will discover a new planet called Iceland.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-4">
        <button
          type="button"
          onClick={onSignIn}
          className="w-full py-4 bg-[#037c66] hover:bg-[#026352] text-white rounded-full font-bold text-sm shadow-md transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Sign In</span>
        </button>

        <button
          type="button"
          onClick={onRegister}
          className="w-full py-4 bg-[#e2ece9] hover:bg-[#d4e2de] text-[#1A1C1E] rounded-full font-bold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Register</span>
        </button>

        <button
          type="button"
          onClick={onStartExploring}
          className="w-full py-2 text-center text-xs font-semibold text-[#037c66] hover:underline"
        >
          Explore as Guest →
        </button>
      </div>
    </div>
  );
}
