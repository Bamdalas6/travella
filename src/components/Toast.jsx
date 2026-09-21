import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex items-center justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="pointer-events-auto max-w-sm w-full bg-[#1A1C1E] text-white px-4 py-3 rounded-2xl shadow-travella-lg flex items-center justify-between gap-3 border border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#387FAB] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold truncate">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-white/60 hover:text-white rounded-md shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
