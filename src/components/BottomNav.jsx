import React from 'react';
import { Home, Heart, MessageSquare, User } from 'lucide-react';

export default function BottomNav({
  activeTab,
  onTabChange,
  savedCount = 0,
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'saved', label: 'Saved', icon: Heart, badge: savedCount },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEFEC] px-6 py-2.5 shadow-travella">
      <div className="max-w-md mx-auto flex items-center justify-between px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative flex items-center justify-center transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'w-12 h-10 rounded-2xl bg-[#037c66] text-white shadow-xs'
                  : 'w-12 h-10 rounded-2xl text-[#8E95A0] hover:text-[#1A1C1E] hover:bg-[#F2F6F4]'
              }`}
              aria-label={item.label}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'stroke-[2.2] text-white' : 'stroke-[1.8]'
                }`}
              />
              {item.badge > 0 && !isActive && (
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-[#037c66] rounded-full ring-2 ring-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
