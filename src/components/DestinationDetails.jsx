import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Share2,
  Users,
  Bed,
  Bath,
  Wifi,
  Waves,
  Coffee,
  Wind,
  Eye,
  Car,
  Sparkles,
  Flame,
  Compass,
  Wine,
  CheckCircle2,
  Calendar,
  Plus,
  Minus,
  MessageSquare
} from 'lucide-react';
import StatusBar from './StatusBar';

const iconMap = {
  Wifi,
  Waves,
  Coffee,
  Wind,
  Eye,
  Car,
  Sparkles,
  Flame,
  Compass,
  Wine
};

export default function DestinationDetails({
  destination,
  onBack,
  isSaved,
  onToggleSave,
  onBookNow,
  onShowToast
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
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
  const [hostMessageOpen, setHostMessageOpen] = useState(false);
  const [hostMessageText, setHostMessageText] = useState('');

  if (!destination) return null;

  // Calculate nights
  const dIn = new Date(checkInDate);
  const dOut = new Date(checkOutDate);
  const diffTime = Math.max(1, Math.round((dOut - dIn) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffTime) || diffTime <= 0 ? 4 : diffTime;
  const pricePerNight = destination.discountPrice || destination.price;
  const totalPrice = pricePerNight * nights;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination.title,
        text: `Look at this incredible place on Travella: ${destination.title} in ${destination.location}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast("Link copied to clipboard!");
    }
  };

  const handleSendHostMessage = (e) => {
    e.preventDefault();
    if (!hostMessageText.trim()) return;
    setHostMessageOpen(false);
    setHostMessageText('');
    if (onShowToast) onShowToast(`Message sent to ${destination.host?.name || 'host'}!`);
  };

  const gallery = destination.gallery || [destination.imageUrl];

  return (
    <div className="relative min-h-screen bg-[#F8F7F4] pb-28 text-[#1A1C1E]">
      {/* Top Mobile Status Bar (over photo) */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <StatusBar dark={true} />
      </div>

      {/* Hero Cover Image & Floating Actions */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-black">
        <img
          src={gallery[activeImageIndex]}
          alt={destination.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Top Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Floating Top Controls */}
        <div className="absolute top-12 inset-x-5 flex items-center justify-between z-20">
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-[#1A1C1E] flex items-center justify-center shadow-lg hover:bg-white active:scale-90 transition-all duration-200"
            aria-label="Back to discovery"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Right Floating Actions (Share & Favorite) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-[#1A1C1E] flex items-center justify-center shadow-lg hover:bg-white active:scale-90 transition-all duration-200"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onToggleSave(destination.id)}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white active:scale-90 transition-all duration-200"
              aria-label={isSaved ? "Remove from saved" : "Save destination"}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#1A1C1E]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image Gallery Dots / Thumbnails */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-2 z-20">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeImageIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content Sheet with rounded top */}
      <div className="relative -mt-6 bg-[#F8F7F4] rounded-t-[2.25rem] px-6 pt-6 z-20">
        {/* Title, Location & Rating Row */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6A717A] font-semibold mb-1.5">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#387FAB]" />
              <span>{destination.location}</span>
            </div>
            <span>•</span>
            <span className="text-[#387FAB] bg-[#E8F1F8] px-2 py-0.5 rounded-full text-[11px] font-bold">
              {destination.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight leading-tight">
            {destination.title}
          </h1>

          {/* Rating and Reviews Badge */}
          <div className="flex items-center gap-3 mt-3 pb-4 border-b border-[#E8E7E2]">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E7E2] rounded-full shadow-xs text-xs font-bold text-[#1A1C1E]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{destination.rating}</span>
            </div>
            <span className="text-xs text-[#6A717A] font-medium">
              ({destination.reviewsCount} verified reviews)
            </span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Top 1% Pick
            </span>
          </div>
        </div>

        {/* Specifications Pill Bar (Guests, Beds, Baths) */}
        {destination.specs && (
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-white p-3 rounded-2xl border border-[#E8E7E2] flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#387FAB]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#8E95A0] block">Capacity</span>
                <span className="text-xs font-bold text-[#1A1C1E]">{destination.specs.guests} Guests</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#E8E7E2] flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#387FAB]">
                <Bed className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#8E95A0] block">Bedrooms</span>
                <span className="text-xs font-bold text-[#1A1C1E]">{destination.specs.bedrooms} Beds</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#E8E7E2] flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#387FAB]">
                <Bath className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#8E95A0] block">Bathrooms</span>
                <span className="text-xs font-bold text-[#1A1C1E]">{destination.specs.baths} Baths</span>
              </div>
            </div>
          </div>
        )}

        {/* Key Feature Pills */}
        <div className="my-5">
          <h2 className="text-sm font-bold text-[#1A1C1E] mb-3 uppercase tracking-wider text-[11px] text-[#8E95A0]">
            Featured Amenities
          </h2>
          <div className="flex flex-wrap gap-2">
            {destination.amenities?.map((amenity) => {
              const AmenityIcon = iconMap[amenity.icon] || Sparkles;
              return (
                <div
                  key={amenity.id}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8E7E2] rounded-full text-xs font-semibold text-[#1A1C1E] shadow-xs"
                >
                  <AmenityIcon className="w-3.5 h-3.5 text-[#387FAB]" />
                  <span>{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div className="my-5 bg-white p-4 rounded-3xl border border-[#E8E7E2] shadow-xs">
          <h2 className="text-sm font-bold text-[#1A1C1E] mb-2">About this stay</h2>
          <p className={`text-xs text-[#6A717A] leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {destination.description}
          </p>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-bold text-[#387FAB] hover:underline inline-flex items-center gap-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {/* Date Selector & Guest Counter Box */}
        <div className="my-5 bg-white p-4 rounded-3xl border border-[#E8E7E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F4F3EF]">
            <span className="text-xs font-bold text-[#1A1C1E] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#387FAB]" />
              Trip Dates & Guests
            </span>
            <span className="text-xs font-semibold text-[#387FAB] bg-[#E8F1F8] px-2.5 py-0.5 rounded-full">
              {nights} nights
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#8E95A0] block mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-bold text-[#1A1C1E] focus:outline-none focus:border-[#387FAB]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#8E95A0] block mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-bold text-[#1A1C1E] focus:outline-none focus:border-[#387FAB]"
              />
            </div>
          </div>

          {/* Guest Counter */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs font-bold text-[#1A1C1E] block">Guests</span>
              <span className="text-[11px] text-[#8E95A0]">Ages 13 and above</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                className="w-8 h-8 rounded-full border border-[#E8E7E2] bg-[#F8F7F4] flex items-center justify-center text-[#1A1C1E] hover:bg-[#E8E7E2] active:scale-90 transition-all"
                disabled={guestsCount <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-[#1A1C1E] w-4 text-center">
                {guestsCount}
              </span>
              <button
                type="button"
                onClick={() => setGuestsCount(Math.min(destination.specs?.guests || 6, guestsCount + 1))}
                className="w-8 h-8 rounded-full border border-[#E8E7E2] bg-[#F8F7F4] flex items-center justify-center text-[#1A1C1E] hover:bg-[#E8E7E2] active:scale-90 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Host Card */}
        {destination.host && (
          <div className="my-5 bg-white p-4 rounded-3xl border border-[#E8E7E2] shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={destination.host.avatar}
                  alt={destination.host.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#387FAB]/20"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#1A1C1E]">
                    Hosted by {destination.host.name}
                  </h3>
                  <p className="text-[11px] text-[#6A717A] mt-0.5">
                    {destination.host.role} · Response: {destination.host.responseTime}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setHostMessageOpen(true)}
                className="p-2.5 rounded-full bg-[#E8F1F8] text-[#387FAB] hover:bg-[#387FAB] hover:text-white transition-all active:scale-95"
                title="Message host"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            {/* Host Message Dialog */}
            {hostMessageOpen && (
              <form onSubmit={handleSendHostMessage} className="mt-3 pt-3 border-t border-[#F4F3EF] space-y-2">
                <textarea
                  rows="2"
                  value={hostMessageText}
                  onChange={(e) => setHostMessageText(e.target.value)}
                  placeholder={`Ask ${destination.host.name} a question about check-in or services...`}
                  className="w-full p-2.5 bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs text-[#1A1C1E] focus:outline-none focus:border-[#387FAB]"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setHostMessageOpen(false)}
                    className="px-3 py-1.5 text-xs text-[#6A717A] hover:bg-[#F4F3EF] rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-bold bg-[#387FAB] text-white rounded-lg hover:bg-[#2E698D]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Section */}
        {destination.reviews && destination.reviews.length > 0 && (
          <div className="my-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#1A1C1E]">Guest Reviews</h2>
              <span className="text-xs text-[#387FAB] font-semibold">{destination.reviews.length} written reviews</span>
            </div>
            <div className="space-y-3">
              {destination.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 bg-white rounded-2xl border border-[#E8E7E2] shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <img src={rev.avatar} alt={rev.author} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold text-[#1A1C1E] block">{rev.author}</span>
                        <span className="text-[10px] text-[#8E95A0]">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#6A717A] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar (Price & Book Now Button) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E7E2] px-6 py-4 shadow-travella-lg">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#1A1C1E]">
                ${pricePerNight}
              </span>
              <span className="text-xs font-medium text-[#6A717A]">/ night</span>
            </div>
            <span className="text-[11px] font-semibold text-[#8E95A0] block">
              Total: ${totalPrice} ({nights} nights)
            </span>
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
            className="px-8 py-3.5 bg-[#387FAB] hover:bg-[#2E698D] active:scale-95 text-white text-sm font-bold rounded-2xl shadow-travella-float transition-all duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
