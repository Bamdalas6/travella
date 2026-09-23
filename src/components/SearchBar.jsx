import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onOpenFilter,
  activeFilterCount = 0
}) {
  return (
    <div className="px-6 py-2">
      <div className="flex items-center gap-3">
        {/* Search Input Container */}
        <div className="flex-1 relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-[#6A717A]">
            <Search className="w-4 h-4 text-[#8E95A0]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search your Dream place ..."
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#EAEFEC] rounded-2xl text-[14px] font-medium text-[#1A1C1E] placeholder:text-[#8E95A0] placeholder:font-normal focus:outline-none focus:border-[#037c66] focus:ring-2 focus:ring-[#037c66]/20 transition-all duration-200 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 p-1 text-[#8E95A0] hover:text-[#1A1C1E] rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Interactive Filter Button (Emerald green in Screen 2) */}
        <button
          type="button"
          onClick={onOpenFilter}
          className="relative w-12 h-12 rounded-2xl bg-[#037c66] hover:bg-[#026352] text-white transition-all duration-200 flex items-center justify-center shadow-xs active:scale-95 shrink-0"
          aria-label="Filter destinations"
        >
          <SlidersHorizontal className="w-5 h-5 text-white" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#026352] text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
