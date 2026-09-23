import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Compass,
  Calendar,
  Plus,
  Minus,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function DestinationDetails({
  destination,
  onBack,
  isSaved,
  onToggleSave,
  onBookNow,
  onShowToast
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [guestsCount, setGuestsCount] = useState(2);
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 11);
    return nextWeek.toISOString().split('T')[0];
  });

  if (!destination) return null;

  // Calculate nights
  const dIn = new Date(checkInDate);
  const dOut = new Date(checkOutDate);
  const diffTime = Math.max(1, Math.round((dOut - dIn) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffTime) || diffTime <= 0 ? 1 : diffTime;
  const pricePerDay = destination.discountPrice || destination.price || 50;
  const totalPrice = pricePerDay * nights;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination.title,
        text: `Look at this incredible place on Travella: ${destination.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast("Link copied to clipboard!");
    }
  };

  const gallery = destination.gallery || [destination.imageUrl];

  return (
    <div className="relative min-h-screen bg-white pb-32 text-[#1A1C1E]">
      {/* Top Hero Image Card with rounded bottom */}
      <div className="relative w-full aspect-[4/4] sm:aspect-[4/3] rounded-b-[2.5rem] overflow-hidden bg-black shadow-sm">
        <img
          src={gallery[0]}
          alt={destination.title}
          className="w-full h-full object-cover"
        />

        {/* Floating Top Controls matching Screen 3 */}
        <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20">
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-[#1A1C1E] flex items-center justify-center shadow-md hover:bg-white active:scale-90 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Right Heart Button */}
          <button
            type="button"
            onClick={() => onToggleSave(destination.id)}
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white active:scale-90 transition-all duration-200"
            aria-label={isSaved ? "Remove from saved" : "Save destination"}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'fill-rose-500 text-rose-500'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pt-5">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
          {destination.title}
        </h1>

        {/* Location & Distance Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mt-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2F6F4] text-xs font-medium text-[#1A1C1E]">
            <MapPin className="w-3.5 h-3.5 text-[#037c66]" />
            <span>{destination.location}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2F6F4] text-xs font-medium text-[#1A1C1E]">
            <Compass className="w-3.5 h-3.5 text-[#037c66]" />
            <span>{destination.distance || "37 Km from you"}</span>
          </div>
        </div>

        {/* Rating and Attendees Row */}
        <div className="flex items-center justify-between mt-5 py-2">
          <div>
            <span className="text-sm font-bold text-[#1A1C1E] block">
              {destination.rating || 5.0} Review
            </span>
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Social Proof Avatars Stack */}
          <div className="flex items-center">
            <img
              src="/ayodele_avatar.png"
              alt="Visitor"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Visitor"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs -ml-2.5"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Visitor"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs -ml-2.5"
            />
            <div className="w-8 h-8 rounded-full bg-[#037c66] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white -ml-2.5 shadow-xs">
              +{destination.reviewsCount || 37}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-5">
          <h2 className="text-sm font-bold text-[#1A1C1E] mb-2">
            Description
          </h2>
          <p className="text-xs text-[#6A717A] leading-relaxed">
            {isExpanded
              ? (destination.description || "Is a mountain king Christion Ix Land, Sermersooq Municipality, Greenland. It is part of the Schweizerland, an extraordinary coastal lagoon paradise featuring turquoise waters, private wooden longtail boats, and lush tropical limestone formations.")
              : ((destination.description?.slice(0, 140) || "Is a mountain king Christion Ix Land, Sermersooq Municipality, Greenland. It is part of the Schweizerland") + "...")}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 text-xs font-bold text-[#037c66] hover:underline"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          </p>
        </div>

        {/* Date Selector & Guest Counter */}
        <div className="mt-6 p-4 rounded-3xl bg-[#F8FAF9] border border-[#EAEFEC] space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1A1C1E]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#037c66]" />
              <span>Travel Dates</span>
            </span>
            <span className="text-[#037c66]">{nights} {nights === 1 ? 'day' : 'days'}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-[#8E95A0] block mb-1">Check-in</span>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-white p-2.5 rounded-xl border border-[#EAEFEC] text-xs font-medium text-[#1A1C1E] focus:outline-none focus:border-[#037c66]"
              />
            </div>
            <div>
              <span className="text-[10px] text-[#8E95A0] block mb-1">Check-out</span>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-white p-2.5 rounded-xl border border-[#EAEFEC] text-xs font-medium text-[#1A1C1E] focus:outline-none focus:border-[#037c66]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#EAEFEC]">
            <span className="text-xs font-semibold text-[#1A1C1E]">Guests</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                className="w-7 h-7 rounded-full bg-white border border-[#EAEFEC] flex items-center justify-center text-[#1A1C1E] active:scale-95"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#1A1C1E] w-4 text-center">{guestsCount}</span>
              <button
                type="button"
                onClick={() => setGuestsCount(guestsCount + 1)}
                className="w-7 h-7 rounded-full bg-white border border-[#EAEFEC] flex items-center justify-center text-[#1A1C1E] active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar matching Screen 3 */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEFEC] px-6 py-4 shadow-travella">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#8E95A0] block">
              Total Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#1A1C1E]">
                ${pricePerDay}.00
              </span>
              <span className="text-xs text-[#8E95A0] font-normal">
                per day
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookNow({
              destination,
              nights,
              guestsCount,
              checkInDate,
              checkOutDate,
              totalPrice
            })}
            className="px-8 py-3.5 bg-[#037c66] hover:bg-[#026352] active:scale-95 text-white text-sm font-bold rounded-full shadow-md transition-all duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
