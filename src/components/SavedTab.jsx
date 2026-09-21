import React from 'react';
import { Heart, Compass, ArrowRight } from 'lucide-react';
import DestinationCard from './DestinationCard';

export default function SavedTab({
  destinations,
  savedIds,
  onSelectDestination,
  onToggleSave,
  onGoToExplore
}) {
  const savedDestinations = destinations.filter(d => savedIds.includes(d.id));

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-28 px-6 pt-5">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#1A1C1E] tracking-tight">Saved Stays</h1>
        <p className="text-xs text-[#6A717A] mt-0.5">
          {savedDestinations.length} {savedDestinations.length === 1 ? 'place' : 'places'} bookmarked for your next getaway
        </p>
      </div>

      {savedDestinations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E7E2] p-8 shadow-xs">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-7 h-7 stroke-[1.8]" />
          </div>
          <h3 className="text-base font-bold text-[#1A1C1E]">No saved stays yet</h3>
          <p className="text-xs text-[#6A717A] max-w-xs mx-auto mt-1 mb-5">
            Click the heart icon on any villa or resort card to save it for easy access later.
          </p>
          <button
            type="button"
            onClick={onGoToExplore}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#387FAB] text-white text-xs font-bold rounded-2xl shadow-travella-float hover:bg-[#2E698D] active:scale-95 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Destinations</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {savedDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              layout="horizontal"
              onSelect={onSelectDestination}
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
