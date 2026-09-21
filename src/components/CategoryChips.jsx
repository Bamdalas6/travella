import React from 'react';
import { Compass, Flame, Palmtree, Mountain, Landmark, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/destinations';

const iconMap = {
  Compass,
  Flame,
  Palmtree,
  Mountain,
  Landmark,
  Sparkles,
};

export default function CategoryChips({ selectedCategory, onSelectCategory }) {
  return (
    <div className="py-2.5">
      <div className="flex items-center gap-2.5 overflow-x-auto px-6 no-scrollbar scroll-smooth">
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon] || Compass;
          const isSelected = selectedCategory.toLowerCase() === category.id.toLowerCase();

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                isSelected
                  ? 'bg-[#387FAB] text-white shadow-travella-float scale-[1.02]'
                  : 'bg-white text-[#6A717A] hover:text-[#1A1C1E] border border-[#E8E7E2] hover:bg-[#F8F7F4]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#8E95A0]'}`} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
