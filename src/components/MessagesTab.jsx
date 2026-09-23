'use client';

import React from 'react';
import { MessageSquare, CheckCheck, Send } from 'lucide-react';

export default function MessagesTab({ onShowToast }) {
  const conversations = [
    {
      id: 'chat-1',
      name: 'Wayan Surya',
      place: 'Tanah Lot Sanctuary',
      avatar: '/ayodele_avatar.png',
      lastMessage: 'Your private boat transfer is confirmed for 9:00 AM!',
      time: '10:45 AM',
      unread: true,
    },
    {
      id: 'chat-2',
      name: 'Ayodele Babalola',
      place: 'Kudahuvadhoo Island',
      avatar: '/ayodele_avatar.png',
      lastMessage: 'Welcome to Travella! Let me know if you need any travel recommendations.',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-28 px-6 pt-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-extrabold text-[#1A1C1E] tracking-tight">
          Messages
        </h1>
        <span className="text-xs font-semibold text-[#037c66] bg-[#EBF4F1] px-2.5 py-1 rounded-full">
          1 Unread
        </span>
      </div>

      <div className="space-y-3">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onShowToast && onShowToast(`Chat with ${chat.name} opened`)}
            className="flex items-center gap-3.5 p-3.5 rounded-3xl bg-[#F8FAF9] border border-[#EAEFEC] hover:border-[#037c66]/40 cursor-pointer transition-all active:scale-[0.99]"
          >
            <div className="relative shrink-0">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
              />
              {chat.unread && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#037c66] rounded-full ring-2 ring-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1A1C1E] truncate">
                  {chat.name}
                </h3>
                <span className="text-[10px] text-[#8E95A0]">
                  {chat.time}
                </span>
              </div>
              <p className="text-[11px] text-[#037c66] font-medium truncate mt-0.5">
                {chat.place}
              </p>
              <p className="text-xs text-[#6A717A] truncate mt-1">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
