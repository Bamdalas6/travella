import React from 'react';
import { Home, Compass, Heart, CalendarCheck, User } from 'lucide-react';

export default function BottomNav({
  activeTab,
  onTabChange,
  savedCount = 0,
  bookingsCount = 0
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Heart, badge: savedCount },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: bookingsCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E7E2] px-4 py-2 sm:py-3 shadow-travella-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive ? 'text-[#387FAB]' : 'text-[#8E95A0] hover:text-[#1A1C1E]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[15px] h-[15px] bg-[#387FAB] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-[#387FAB] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
