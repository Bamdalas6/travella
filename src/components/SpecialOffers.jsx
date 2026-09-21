import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export default function SpecialOffers({ onShowToast }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('TRAVELLA20');
    setCopied(true);
    if (onShowToast) {
      onShowToast('Promo code "TRAVELLA20" copied to clipboard! (20% OFF)');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="px-6 py-3">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2D72D2] via-[#387FAB] to-[#5B94BF] p-5 text-white shadow-travella">
        {/* Background decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-12 top-2 w-16 h-16 bg-white/15 rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Special Promo
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white mb-1">
            20% Off Luxury Escapes
          </h3>
          <p className="text-xs text-white/80 max-w-[280px] leading-relaxed mb-4">
            Book any verified villa or sanctuary this season and get instant 20% cashback credits.
          </p>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-black/20 border border-white/25 rounded-xl font-mono text-xs font-bold tracking-wider text-white">
              TRAVELLA20
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#1A1C1E] text-xs font-bold shadow-sm hover:bg-[#F4F3EF] transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#387FAB]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
