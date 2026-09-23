'use client';

import React, { useState } from 'react';
import {
  User,
  Globe,
  Star,
  Shield,
  FileText,
  Sparkles,
  Trash2,
  LogOut,
  ChevronRight,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_PROFILE } from '../data/destinations';

export default function ProfileTab({ onShowToast }) {
  const { user, openAuthModal, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onShowToast) {
      onShowToast('Signed out successfully');
    }
  };

  const activeProfile = user || {
    fullName: USER_PROFILE.fullName || 'Ayodele Babalola',
    email: USER_PROFILE.email || 'hello@bamdalas.com',
    avatar: USER_PROFILE.avatar || '/ayodele_avatar.png',
  };

  return (
    <div className="min-h-screen bg-white pb-28 px-6 pt-5 animate-in fade-in duration-200">
      {/* Top Header: Title and Get Premium badge */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-[#1A1C1E] tracking-tight">
          Profile
        </h1>
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Premium membership activated!')}
          className="px-2.5 py-1 rounded-full bg-[#037c66] text-white text-[10px] font-bold shadow-xs active:scale-95 transition-all"
        >
          Get Premium
        </button>
      </div>

      {/* User Info Header matching Screen 4 */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {activeProfile.avatar ? (
            <img
              src={activeProfile.avatar}
              alt={activeProfile.fullName}
              className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-[#037c66]/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#EBF4F1] text-[#037c66] flex items-center justify-center shadow-sm">
              <User className="w-8 h-8" />
            </div>
          )}
          <div>
            <h2 className="text-base font-bold text-[#1A1C1E]">
              {activeProfile.fullName}
            </h2>
            <p className="text-xs text-[#8E95A0] mt-0.5">
              {activeProfile.email}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          type="button"
          onClick={() => openAuthModal && openAuthModal('login')}
          className="w-full py-3 bg-[#037c66] hover:bg-[#026352] text-white text-xs font-bold rounded-2xl shadow-xs transition-all active:scale-[0.98]"
        >
          Edit Profile
        </button>
      </div>

      {/* Settings Navigation List matching Screen 4 */}
      <div className="space-y-1 border-t border-[#EAEFEC] pt-3">
        {/* Personal Details */}
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Personal details settings')}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-[#037c66] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-[#037c66]" />
            <span>Personal Details</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Language */}
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Language is set to English')}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-[#037c66] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-[#037c66]" />
            <span>Language</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8E95A0]">
            <span className="text-[11px] font-normal">English</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Rate Us */}
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Thank you for rating Travella 5 stars! ⭐')}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-[#037c66] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-[#037c66]" />
            <span>Rate Us</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Privacy Policy */}
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Privacy policy: Your data is secure with end-to-end encryption.')}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-[#037c66] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#037c66]" />
            <span>Privacy Policy</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Terms of Use */}
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Terms of use loaded.')}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-[#037c66] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#037c66]" />
            <span>Terms of Use</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Get Premium Banner matching Screen 4 */}
      <div className="my-5 p-4 rounded-3xl bg-gradient-to-r from-[#037c66] via-[#04947b] to-[#24b197] text-white shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold flex items-center gap-1.5">
              <span>Get Premium</span>
              <Sparkles className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            </h3>
            <p className="text-[11px] text-white/85 mt-1 font-medium">
              Enjoy all the benefits of the app
            </p>
          </div>
          <button
            type="button"
            onClick={() => onShowToast && onShowToast('Upgraded to Travella Premium!')}
            className="px-3.5 py-1.5 bg-white text-[#037c66] text-xs font-bold rounded-full shadow-xs active:scale-95 transition-transform"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Danger / Session Management matching Screen 4 */}
      <div className="space-y-1 border-t border-[#EAEFEC] pt-2">
        {/* Delete Account */}
        <button
          type="button"
          onClick={() => onShowToast && onShowToast('Account deletion request registered.')}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-rose-600 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-4 h-4 text-[#037c66]" />
            <span>Delete Account</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between py-3 px-1 text-left text-xs font-semibold text-[#1A1C1E] hover:text-[#037c66] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-[#037c66]" />
            <span>Logout</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
