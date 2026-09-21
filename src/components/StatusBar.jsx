import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export default function StatusBar({ dark = false }) {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const textColor = dark ? 'text-white' : 'text-[#1A1C1E]';

  return (
    <div className={`w-full px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors duration-200 ${textColor}`}>
      {/* Time */}
      <span className="tracking-tight font-medium text-[13px]">{currentTime}</span>

      {/* Dynamic Island / Camera slot for iPhone style */}
      <div className="w-24 h-4 bg-black/15 rounded-full backdrop-blur-sm mx-auto opacity-0 sm:opacity-0" />

      {/* Status Icons */}
      <div className="flex items-center gap-2 text-xs">
        {/* Cellular bars */}
        <div className="flex items-end gap-[1.5px] h-3">
          <div className="w-[3px] h-[4px] rounded-xs bg-current"></div>
          <div className="w-[3px] h-[6px] rounded-xs bg-current"></div>
          <div className="w-[3px] h-[9px] rounded-xs bg-current"></div>
          <div className="w-[3px] h-[12px] rounded-xs bg-current"></div>
        </div>

        {/* Wifi */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 border border-current rounded-sm p-[1.5px] flex items-center">
            <div className="w-full h-full bg-current rounded-2xs"></div>
          </div>
          <div className="w-0.5 h-1 bg-current rounded-r-xs"></div>
        </div>
      </div>
    </div>
  );
}
