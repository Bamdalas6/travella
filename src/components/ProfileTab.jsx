import React, { useState } from 'react';
import { User, Award, Shield, Bell, CreditCard, Globe, LogOut, ChevronRight, Check } from 'lucide-react';
import { USER_PROFILE } from '../data/destinations';

export default function ProfileTab({ onShowToast }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (onShowToast) {
      onShowToast(`Notifications ${!notificationsEnabled ? 'enabled' : 'muted'}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-28 px-6 pt-5">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8E7E2] shadow-travella text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-r from-[#387FAB] to-[#5B94BF]" />

        <div className="relative pt-6">
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.fullName}
            className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-white shadow-md"
          />
          <h2 className="text-lg font-bold text-[#1A1C1E] mt-3">
            {USER_PROFILE.fullName}
          </h2>
          <p className="text-xs text-[#6A717A]">{USER_PROFILE.email}</p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F1F8] text-[#387FAB] rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>{USER_PROFILE.membershipTier}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#F4F3EF]">
          <div>
            <span className="text-base font-extrabold text-[#1A1C1E]">
              {USER_PROFILE.savedTripsCount}
            </span>
            <span className="text-[10px] text-[#8E95A0] block">Saved Places</span>
          </div>
          <div>
            <span className="text-base font-extrabold text-[#1A1C1E]">
              {USER_PROFILE.completedTripsCount}
            </span>
            <span className="text-[10px] text-[#8E95A0] block">Trips Taken</span>
          </div>
          <div>
            <span className="text-base font-extrabold text-[#387FAB]">
              {USER_PROFILE.points}
            </span>
            <span className="text-[10px] text-[#8E95A0] block">Reward Balance</span>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="mt-5 bg-white rounded-3xl p-5 border border-[#E8E7E2] shadow-xs">
        <h3 className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider text-[#8E95A0] mb-3">
          Travel Preferences
        </h3>
        <div className="flex flex-wrap gap-2">
          {USER_PROFILE.preferences.map((pref, i) => (
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
