import React from 'react';
import { Star, MapPin, Bookmark, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedCard({
  destination,
  onSelect,
  isSaved,
  onToggleSave
}) {
  if (!destination) return null;

  return (
    <div className="px-6 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#1A1C1E] tracking-tight flex items-center gap-1.5">
          <span>Featured Stay</span>
          <Sparkles className="w-4 h-4 text-[#387FAB]" />
        </h2>
        <span className="text-xs font-semibold text-[#387FAB] hover:underline cursor-pointer" onClick={() => onSelect(destination.id)}>
          Explore details
        </span>
      </div>

      <div
        onClick={() => onSelect(destination.id)}
        className="group relative w-full h-[360px] sm:h-[390px] rounded-[2rem] overflow-hidden cursor-pointer shadow-travella transition-all duration-300 hover:shadow-travella-lg hover:-translate-y-0.5"
      >
        {/* Background Image */}
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay for high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014]/90 via-[#0C1014]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          {/* Rating Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-xs font-bold text-[#1A1C1E]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{destination.rating}</span>
            <span className="text-[10px] font-normal text-[#6A717A]">({destination.reviewsCount})</span>
          </div>

          {/* Bookmark / Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(destination.id);
            }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1C1E] hover:bg-white shadow-sm transition-all duration-200 active:scale-90"
            aria-label={isSaved ? "Remove from saved" : "Save destination"}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#1A1C1E]'
              }`}
            />
          </button>
        </div>

        {/* Bottom Destination Info */}
        <div className="absolute bottom-4 inset-x-4 z-10 text-white">
          <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#5B94BF]" />
            <span>{destination.location}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 line-clamp-1">
            {destination.title}
          </h3>

          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            <div>
              <span className="text-xs text-white/70 block">From</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-white">
                  ${destination.discountPrice || destination.price}
                </span>
                {destination.discountPrice && (
                  <span className="text-xs text-white/60 line-through">
                    ${destination.price}
                  </span>
                )}
                <span className="text-xs text-white/75 font-medium">/ night</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#387FAB] hover:bg-[#2E698D] text-white text-xs font-semibold shadow-travella-float transition-all duration-200 group-hover:px-5">
              <span>View Stay</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
