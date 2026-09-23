import React, { useState, useEffect } from 'react';
import { Bell, Sparkles, CheckCheck, X, LogIn, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ onProfileClick, onSelectDestination }) {
  const { user, openAuthModal } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('travella_notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, unread: false }));
    setNotifications(updated);
    try {
      localStorage.setItem('travella_notifications', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const displayName = user?.name || 'Explorer';
  const displayAvatar = user?.avatar;

  return (
    <div className="relative px-6 pt-3 pb-4">
      <div className="flex items-center justify-between">
        {/* Greeting & Name */}
        <div>
          <p className="text-[13px] font-medium text-[#6A717A] tracking-normal">
            {user ? 'Good morning,' : 'Welcome to Travella,'}
          </p>
          <h1 className="text-2xl sm:text-[26px] font-bold text-[#1A1C1E] tracking-tight flex items-center gap-1.5 mt-0.5">
            <span>{displayName}</span>
            <span className="inline-block animate-bounce text-xl">
              {user ? '👋' : '✈️'}
            </span>
          </h1>
        </div>

        {/* Action icons & Profile Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full bg-white border border-[#E8E7E2] text-[#1A1C1E] hover:bg-[#F4F3EF] transition-all duration-200 shadow-sm active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[#1A1C1E]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#387FAB] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown Modal */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-white rounded-2xl shadow-travella-lg border border-[#E8E7E2] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#F4F3EF]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#1A1C1E]">Notifications</span>
                    {unreadCount > 0 ? (
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-[#E8F1F8] text-[#387FAB] rounded-full">
                        {unreadCount} new
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-[#F4F3EF] text-[#6A717A] rounded-full">
                        0 unread alerts
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] text-[#387FAB] hover:underline font-medium"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 text-[#6A717A] hover:text-[#1A1C1E] rounded-md"
                      aria-label="Close notifications"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  /* R2: First-time user friendly empty state */
                  <div className="py-8 px-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#E8F1F8] text-[#387FAB] flex items-center justify-center mx-auto mb-3">
                      <Bell className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <p className="text-xs font-bold text-[#1A1C1E]">No notifications yet</p>
                    <p className="text-[11px] text-[#6A717A] mt-1 max-w-[220px] mx-auto leading-relaxed">
                      No notifications yet — Explore destinations to receive updates
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#F4F3EF] max-h-64 overflow-y-auto no-scrollbar py-1">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.destId && onSelectDestination) {
                            onSelectDestination(item.destId);
                            setShowNotifications(false);
                          }
                        }}
                        className={`py-3 px-1.5 transition-colors cursor-pointer rounded-lg hover:bg-[#F8F7F4] ${
                          item.unread ? 'bg-[#FAF9F6]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                            {item.title}
                            {item.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#387FAB]" />}
                          </p>
                          <span className="text-[10px] text-[#8E95A0] whitespace-nowrap">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-[#6A717A] mt-1 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth Trigger Button & Profile Avatar */}
          {!user ? (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="px-3 py-1.5 bg-[#387FAB] hover:bg-[#2E698D] text-white rounded-full text-xs font-bold transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1"
              title="Sign In to your account"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          ) : null}

          {/* Profile Avatar Button */}
          <button
            type="button"
            onClick={user ? onProfileClick : () => openAuthModal('login')}
            className="relative rounded-full p-0.5 ring-2 ring-[#387FAB]/20 hover:ring-[#387FAB] transition-all duration-200 active:scale-95"
            title={user ? 'Open Profile' : 'Sign In'}
          >
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={user?.fullName || 'User avatar'}
                className="w-9 h-9 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#E8F1F8] text-[#387FAB] flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
              </div>
            )}
            {user && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

