import React from 'react';
import { Smartphone, Monitor, Sparkles, ExternalLink } from 'lucide-react';

export default function DeviceFrame({
  isMobileView,
  onToggleView,
  children
}) {
  return (
    <div className="min-h-screen bg-[#ECEAE4] flex flex-col items-center justify-start antialiased transition-colors">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E0DED7] px-4 py-2.5 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#387FAB] to-[#5B94BF] flex items-center justify-center text-white font-black text-base shadow-sm">
              T
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-[#1A1C1E] block">
                Travella
              </span>
              <span className="text-[10px] text-[#6A717A]">
                UI/UX by @uiux.build
              </span>
            </div>
          </div>

          {/* View Switcher Toggle */}
          <div className="flex items-center gap-1 bg-[#F4F3EF] p-1 rounded-2xl border border-[#E8E7E2]">
            <button
              type="button"
              onClick={() => onToggleView(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isMobileView
                  ? 'bg-white text-[#1A1C1E] shadow-sm'
                  : 'text-[#6A717A] hover:text-[#1A1C1E]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#387FAB]" />
              <span className="hidden sm:inline">Mobile Frame</span>
              <span className="sm:hidden">Mobile</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleView(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                !isMobileView
                  ? 'bg-white text-[#1A1C1E] shadow-sm'
                  : 'text-[#6A717A] hover:text-[#1A1C1E]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-[#387FAB]" />
              <span className="hidden sm:inline">Full Responsive</span>
              <span className="sm:hidden">Full</span>
            </button>
          </div>
        </div>
      </header>

      {/* Presentation Stage */}
      <main className="w-full flex-1 flex items-center justify-center py-4 sm:py-8 px-2 sm:px-4">
        {isMobileView ? (
          /* Realistic iPhone 15 Frame matching the Instagram presentation */
          <div className="relative my-auto">
            {/* Phone Outer Chassis with realistic metallic rim & soft shadow */}
            <div className="relative w-[390px] max-w-[95vw] h-[844px] max-h-[92vh] bg-[#0C1014] rounded-[52px] p-[11px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.2)] ring-1 ring-black/30">
              
              {/* Left Side Buttons (Volume & Action) */}
              <div className="absolute -left-[14px] top-[115px] w-[3px] h-[26px] bg-[#3A3D40] rounded-l-sm" />
              <div className="absolute -left-[14px] top-[160px] w-[3px] h-[50px] bg-[#3A3D40] rounded-l-sm" />
              <div className="absolute -left-[14px] top-[225px] w-[3px] h-[50px] bg-[#3A3D40] rounded-l-sm" />

              {/* Right Side Power Button */}
              <div className="absolute -right-[14px] top-[170px] w-[3px] h-[75px] bg-[#3A3D40] rounded-r-sm" />

              {/* Inner Display Area */}
              <div className="relative w-full h-full bg-[#F8F7F4] rounded-[42px] overflow-hidden flex flex-col select-text shadow-inner">
                {/* Dynamic Island Pill */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-3 pointer-events-none shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A1C1E] border border-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#081528] ring-1 ring-blue-500/20" />
                </div>

                {/* Inner Content Scroll Container */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                  {children}
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none z-50">
                  <div className="w-32 h-1 bg-black/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Responsive Web Layout */
          <div className="w-full max-w-4xl bg-[#F8F7F4] rounded-3xl border border-[#E8E7E2] shadow-travella-lg overflow-hidden min-h-[85vh] relative">
            <div className="w-full overflow-y-auto">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
