import React, { useState, useEffect, useRef } from 'react';
import { Bell, LayoutGrid, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_PROFILE } from '../data/destinations';

export default function Header({ onMenuClick, onProfileClick, onSelectDestination }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('travella_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setNotifications(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Handle outside click & escape key to dismiss notifications
  useEffect(() => {
    if (!showNotifications) return;
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNotifications]);

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

  const displayName = user ? (user.fullName || user.name) : (USER_PROFILE.fullName || 'Ayodele Babalola');

  return (
    <div className="relative px-6 pt-5 pb-3">
      <div className="flex items-center justify-between">
        {/* Left: 4-dot Grid Menu Button */}
        <button
          type="button"
          onClick={onMenuClick || onProfileClick}
          className="w-10 h-10 rounded-full bg-white border border-[#EAEFEC] text-[#1A1C1E] flex items-center justify-center shadow-xs hover:bg-[#F2F6F4] transition-all duration-200 active:scale-95"
          aria-label="Menu"
        >
          <LayoutGrid className="w-4 h-4 text-[#1A1C1E]" />
        </button>

        {/* Center: Welcome & Name */}
        <div className="text-center">
          <p className="text-[11px] font-medium text-[#8E95A0] tracking-normal">
            Welcome
          </p>
          <h1 className="text-[15px] sm:text-base font-bold text-[#1A1C1E] tracking-tight">
            {displayName}
          </h1>
        </div>

        {/* Right: Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full bg-white border border-[#EAEFEC] text-[#1A1C1E] flex items-center justify-center shadow-xs hover:bg-[#F2F6F4] transition-all duration-200 active:scale-95"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            aria-haspopup="true"
          >
            <Bell className="w-4 h-4 text-[#1A1C1E]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#037c66] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown Modal */}
          {showNotifications && (
            <div
              role="region"
              aria-label="Notifications panel"
              className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-white rounded-2xl shadow-travella-lg border border-[#EAEFEC] p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F2F6F4]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#1A1C1E]">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-[#EBF4F1] text-[#037c66] rounded-full">
                      {unreadCount} new
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-[#F2F6F4] text-[#6A717A] rounded-full">
                      0 unread alerts
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-[#037c66] hover:underline font-medium"
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
                /* First-time user friendly empty state */
                <div className="py-8 px-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EBF4F1] text-[#037c66] flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <p className="text-xs font-bold text-[#1A1C1E]">All Caught Up</p>
                  <p className="text-[11px] text-[#6A717A] mt-1 max-w-[220px] mx-auto leading-relaxed">
                    No notifications yet — Explore destinations to receive updates
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#F2F6F4] max-h-64 overflow-y-auto no-scrollbar py-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.unread) {
                          const updated = notifications.map((n) =>
                            n.id === item.id ? { ...n, unread: false } : n
                          );
                          setNotifications(updated);
                          try {
                            localStorage.setItem('travella_notifications', JSON.stringify(updated));
                          } catch (e) {}
                        }
                        if (item.destId && onSelectDestination) {
                          onSelectDestination(item.destId);
                          setShowNotifications(false);
                        }
                      }}
                      className={`py-3 px-1.5 transition-colors cursor-pointer rounded-lg hover:bg-[#F8FAF9] ${
                        item.unread ? 'bg-[#FAFBF9]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                          {item.title}
                          {item.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#037c66]" />}
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
      </div>
    </div>
  );
}

