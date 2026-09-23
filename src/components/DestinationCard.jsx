import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';

export default function DestinationCard({
  destination,
  onSelect,
  isSaved,
  onToggleSave,
  layout = "carousel" // "carousel", "vertical", "horizontal"
}) {
  if (!destination) return null;

  if (layout === "horizontal") {
    return (
      <div
        onClick={() => onSelect(destination.id)}
        className="group relative flex items-center gap-3.5 p-2.5 bg-white rounded-3xl border border-[#EAEFEC] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.99]"
      >
        {/* Thumbnail Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0">
          <img
            src={destination.imageUrl}
            alt={destination.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md flex items-center gap-1 text-[10px] font-bold text-white">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{destination.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1 text-[11px] text-[#8E95A0] font-medium mb-1">
            <MapPin className="w-3 h-3 text-[#037c66] shrink-0" />
            <span className="truncate">{destination.location}</span>
          </div>

          <h4 className="text-sm font-bold text-[#1A1C1E] leading-snug truncate group-hover:text-[#037c66] transition-colors">
            {destination.title}
          </h4>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-[#1A1C1E]">
                ${destination.discountPrice || destination.price}
              </span>
              <span className="text-[11px] text-[#8E95A0]">/ day</span>
            </div>

            {/* Favorite button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(destination.id);
              }}
              className="p-2 rounded-full hover:bg-[#F2F6F4] text-[#8E95A0] transition-transform active:scale-90"
              aria-label="Save"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#8E95A0]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Carousel card matching Screen 2 in user's mockup
  return (
    <div
      onClick={() => onSelect(destination.id)}
      className="group w-52 shrink-0 bg-white rounded-3xl p-2.5 border border-[#EAEFEC] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col active:scale-[0.98]"
    >
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Right Heart Outline Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(destination.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs hover:bg-white active:scale-90 transition-all"
          aria-label="Save"
        >
          <Heart
            className={`w-4 h-4 ${
              isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#1A1C1E]'
            }`}
          />
        </button>
      </div>

      <div className="pt-2 px-1 pb-1">
        <h4 className="text-sm font-bold text-[#1A1C1E] leading-snug truncate group-hover:text-[#037c66] transition-colors">
          {destination.title}
        </h4>

        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-[#8E95A0] font-medium truncate max-w-[130px]">
            <MapPin className="w-3 h-3 text-[#037c66] shrink-0" />
            <span className="truncate">{destination.location}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-[#1A1C1E] shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{destination.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
