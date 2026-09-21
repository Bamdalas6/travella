import React, { useState } from 'react';
import { Bell, Sparkles, CheckCheck, X } from 'lucide-react';
import { USER_PROFILE } from '../data/destinations';

export default function Header({ onProfileClick, onSelectDestination }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Exclusive 20% Discount",
      desc: "Amalfi Coast villa has special weekend rates available!",
      time: "10m ago",
      unread: true,
      destId: "dest-1"
    },
    {
      id: 2,
      title: "Weather Alert for Santorini",
      desc: "Sunny 27°C expected all week for your saved destination.",
      time: "1h ago",
      unread: true,
      destId: "dest-2"
    },
    {
      id: 3,
      title: "Passport Reminder",
      desc: "Ensure passport is valid for upcoming European travel.",
      time: "1d ago",
      unread: false
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  return (
    <div className="relative px-6 pt-3 pb-4">
      <div className="flex items-center justify-between">
        {/* Greeting & Name */}
        <div>
          <p className="text-[13px] font-medium text-[#6A717A] tracking-normal">
            Good morning,
          </p>
          <h1 className="text-2xl sm:text-[26px] font-bold text-[#1A1C1E] tracking-tight flex items-center gap-1.5 mt-0.5">
            <span>{USER_PROFILE.name}</span>
            <span className="inline-block animate-bounce text-xl">👋</span>
          </h1>
        </div>

        {/* Action icons & Profile Avatar */}
        <div className="flex items-center gap-3">
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
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[11px] font-medium bg-[#E8F1F8] text-[#387FAB] rounded-full">
                        {unreadCount} new
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
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

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
                      className={`py-3 px-1.5 transition-colors cursor-pointer rounded-lg hover:bg-[#F8F7F4] ${item.unread ? 'bg-[#FAF9F6]' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                          {item.title}
                          {item.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#387FAB]"></span>}
                        </p>
                        <span className="text-[10px] text-[#8E95A0] whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#6A717A] mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar Button */}
          <button
            type="button"
            onClick={onProfileClick}
            className="relative rounded-full p-0.5 ring-2 ring-[#387FAB]/20 hover:ring-[#387FAB] transition-all duration-200 active:scale-95"
            title="Open Profile"
          >
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.fullName}
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
