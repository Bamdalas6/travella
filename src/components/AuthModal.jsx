'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AuthForm from './AuthForm';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onShowToast }) {
  const { isAuthModalOpen, authModalMode, closeAuthModal } = useAuth();

  const activeOpen = isOpen !== undefined ? isOpen : isAuthModalOpen;
  const activeMode = initialMode || authModalMode || 'login';
  const handleClose = onClose || closeAuthModal;

  // Escape key handler
  useEffect(() => {
    if (!activeOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOpen, handleClose]);

  if (!activeOpen) return null;

  const handleSuccess = (user) => {
    handleClose();
    if (onShowToast) {
      onShowToast(`Welcome, ${user.name || 'Traveler'}! Logged in successfully 🎉`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E7E2] shadow-travella-lg animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6A717A] hover:text-[#1A1C1E] hover:bg-[#F4F3EF] transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AuthForm
          initialMode={activeMode}
          onSuccess={handleSuccess}
          isModal={true}
        />
      </div>
    </div>
  );
}
