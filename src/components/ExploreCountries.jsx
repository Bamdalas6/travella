import React from 'react';
import { EXPLORE_COUNTRIES } from '../data/destinations';

export default function ExploreCountries({ selectedCountry, onSelectCountry, onViewAll }) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-base font-bold text-[#1A1C1E] tracking-tight">
          Explore
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#8E95A0] hover:text-[#037c66] transition-colors"
        >
          View All
        </button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
        {EXPLORE_COUNTRIES.map((item) => {
          const isSelected = selectedCountry?.toLowerCase() === item.name.toLowerCase();

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCountry(isSelected ? null : item.name)}
              className="flex flex-col items-center gap-2 shrink-0 group active:scale-95 transition-all"
            >
              <div
                className={`relative w-14 h-14 rounded-full overflow-hidden p-0.5 transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-[#037c66] ring-offset-2 scale-105'
                    : 'ring-1 ring-[#EAEFEC] hover:ring-[#037c66]/50'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isSelected ? 'font-bold text-[#037c66]' : 'text-[#6A717A] group-hover:text-[#1A1C1E]'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
