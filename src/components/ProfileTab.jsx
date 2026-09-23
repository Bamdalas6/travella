'use client';

import React, { useState } from 'react';
import { User, Award, Shield, Bell, CreditCard, Globe, LogOut, ChevronRight, Check, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_PROFILE } from '../data/destinations';

export default function ProfileTab({ onShowToast }) {
  const { user, openAuthModal, logout, demoLogin } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (onShowToast) {
      onShowToast(`Notifications ${!notificationsEnabled ? 'enabled' : 'muted'}`);
    }
  };

  const handleLogout = () => {
    logout();
    if (onShowToast) {
      onShowToast('Signed out of Travella successfully');
    }
  };

  const handleDemoClick = () => {
    demoLogin();
    if (onShowToast) {
      onShowToast('Welcome back, Alex! Demo profile activated');
    }
  };

  const activeProfile = user || {
    fullName: 'Guest Explorer',
    email: 'guest@travella.app',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    membershipTier: 'Explorer Guest',
    savedTripsCount: 0,
    completedTripsCount: 0,
    points: '0 pts',
    preferences: ['Scenic Views', 'Fast WiFi']
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-28 px-6 pt-5">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8E7E2] shadow-travella text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-r from-[#387FAB] to-[#5B94BF]" />

        <div className="relative pt-6">
          <img
            src={activeProfile.avatar}
            alt={activeProfile.fullName}
            className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-white shadow-md"
          />
          <h2 className="text-lg font-bold text-[#1A1C1E] mt-3">
            {activeProfile.fullName}
          </h2>
          <p className="text-xs text-[#6A717A]">{activeProfile.email}</p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F1F8] text-[#387FAB] rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>{activeProfile.membershipTier}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#F4F3EF]">
          <div>
            <span className="text-base font-extrabold text-[#1A1C1E]">
              {activeProfile.savedTripsCount}
            </span>
            <span className="text-[10px] text-[#8E95A0] block">Saved Places</span>
          </div>
          <div>
            <span className="text-base font-extrabold text-[#1A1C1E]">
              {activeProfile.completedTripsCount}
            </span>
            <span className="text-[10px] text-[#8E95A0] block">Trips Taken</span>
          </div>
          <div>
            <span className="text-base font-extrabold text-[#387FAB]">
              {activeProfile.points}
            </span>
            <span className="text-[10px] text-[#8E95A0] block">Reward Balance</span>
          </div>
        </div>
      </div>

      {/* Guest Sign-In Callout (when not logged in) */}
      {!user ? (
        <div className="mt-5 bg-white rounded-3xl p-5 border border-[#E8E7E2] shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F1F8] text-[#387FAB] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1C1E]">Sign in to Travella</h3>
              <p className="text-[11px] text-[#6A717A]">Access your full bookings and cloud favorites</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="w-full py-2.5 px-3 bg-[#387FAB] hover:bg-[#2E698D] text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className="w-full py-2.5 px-3 bg-[#E8F1F8] hover:bg-[#d8e8f5] text-[#387FAB] rounded-xl text-xs font-bold transition-all active:scale-95 text-center"
            >
              Create Account
            </button>
          </div>
          <button
            type="button"
            onClick={handleDemoClick}
            className="w-full mt-2.5 py-2 px-3 bg-[#F8F7F4] hover:bg-[#F4F3EF] border border-[#E8E7E2] text-[#1A1C1E] rounded-xl text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>⚡ Quick Demo Login (Alex Morgan)</span>
          </button>
        </div>
      ) : (
        /* Logged In Account Actions */
        <div className="mt-5 bg-white rounded-3xl p-4 border border-[#E8E7E2] shadow-xs flex items-center justify-between">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="text-xs font-bold text-[#387FAB] hover:underline flex items-center gap-1"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In as different user</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Preferences Section */}
      <div className="mt-5 bg-white rounded-3xl p-5 border border-[#E8E7E2] shadow-xs">
        <h3 className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider text-[#8E95A0] mb-3">
          Travel Preferences
        </h3>
        <div className="flex flex-wrap gap-2">
          {activeProfile.preferences.map((pref, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-[#F8F7F4] text-[#1A1C1E] border border-[#E8E7E2] rounded-full text-xs font-semibold"
            >
              ✓ {pref}
            </span>
          ))}
        </div>
      </div>

      {/* Settings Menu List */}
      <div className="mt-5 bg-white rounded-3xl border border-[#E8E7E2] shadow-xs overflow-hidden divide-y divide-[#F4F3EF]">
        <div
          onClick={handleToggleNotifications}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F8F7F4] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#387FAB]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A1C1E] block">Push Notifications</span>
              <span className="text-[10px] text-[#8E95A0]">Price drops and booking alerts</span>
            </div>
          </div>
          <div
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              notificationsEnabled ? 'bg-[#387FAB]' : 'bg-[#E8E7E2]'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F8F7F4] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#387FAB]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A1C1E] block">Currency</span>
              <span className="text-[10px] text-[#8E95A0]">Selected: {currency}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0]" />
        </div>

        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F8F7F4] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#387FAB]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A1C1E] block">Security & Privacy</span>
              <span className="text-[10px] text-[#8E95A0]">Two-factor authentication & data</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E95A0]" />
        </div>
      </div>
    </div>
  );
}
