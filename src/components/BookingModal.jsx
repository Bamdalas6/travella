import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Users, ShieldCheck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({
  bookingData,
  onClose,
  onBookingSuccess
}) {
  const [step, setStep] = useState('review'); // 'review' | 'processing' | 'confirmed'
  const [guestName, setGuestName] = useState('Alex Morgan');
  const [guestEmail, setGuestEmail] = useState('alex.morgan@travella.app');
  const [paymentMethod, setPaymentMethod] = useState('apple-pay');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!bookingData) return null;

  const { destination, nights, guestsCount, checkInDate, checkOutDate } = bookingData;
  const baseRate = destination.discountPrice || destination.price;
  const staySubtotal = baseRate * nights;
  const cleaningFee = 60;
  const serviceFee = 45;
  const discountAmount = promoApplied ? Math.round(staySubtotal * 0.20) : 0;
  const grandTotal = staySubtotal + cleaningFee + serviceFee - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'TRAVELLA20') {
      setPromoApplied(true);
    }
  };

  const handleConfirmBooking = () => {
    setStep('processing');

    setTimeout(() => {
      const generatedRef = `TRV-${Math.floor(10000 + Math.random() * 90000)}-${destination.country ? destination.country.substring(0, 2).toUpperCase() : 'EU'}`;
      setBookingRef(generatedRef);
      setStep('confirmed');

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#387FAB', '#5B94BF', '#2D72D2', '#F8F7F4', '#FFD700']
        });
      } catch (err) {
        console.error("Confetti error:", err);
      }

      const newBooking = {
        id: generatedRef,
        destination,
        nights,
        guestsCount,
        checkInDate,
        checkOutDate,
        total: grandTotal,
        paymentMethod,
        guestName,
        createdAt: new Date().toLocaleDateString()
      };

      if (onBookingSuccess) {
        onBookingSuccess(newBooking);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-travella-lg border border-[#E8E7E2]">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F4F3EF] flex items-center justify-between z-10">
          <div>
            <h3 className="text-base font-bold text-[#1A1C1E]">
              {step === 'confirmed' ? 'Booking Confirmed! 🎉' : 'Confirm & Reserve'}
            </h3>
            <p className="text-[11px] text-[#6A717A]">
              {step === 'confirmed' ? 'Your itinerary is ready' : 'Review details before finalizing'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F4F3EF] text-[#6A717A] hover:text-[#1A1C1E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Review & Checkout */}
        {step !== 'confirmed' && (
          <div className="p-6 space-y-5">
            {/* Stay Mini-Card */}
            <div className="flex items-center gap-3.5 p-3 bg-[#F8F7F4] rounded-2xl border border-[#E8E7E2]">
              <img
                src={destination.imageUrl}
                alt={destination.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#387FAB] uppercase tracking-wider block">
                  {destination.location}
                </span>
                <h4 className="text-sm font-bold text-[#1A1C1E] truncate">
                  {destination.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#6A717A]">
                  <span>${baseRate}/night</span>
                  <span>•</span>
                  <span>{nights} nights</span>
                </div>
              </div>
            </div>

            {/* Dates & Guests Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#E8E7E2]">
                <div className="flex items-center gap-1.5 text-[#8E95A0] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#387FAB]" />
                  <span>Dates</span>
                </div>
                <p className="font-bold text-[#1A1C1E] truncate">
                  {checkInDate} → {checkOutDate}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8E7E2]">
                <div className="flex items-center gap-1.5 text-[#8E95A0] mb-1">
                  <Users className="w-3.5 h-3.5 text-[#387FAB]" />
                  <span>Guests</span>
                </div>
                <p className="font-bold text-[#1A1C1E]">
                  {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
            </div>

            {/* Guest Info Input */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#1A1C1E] block">Guest Information</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Full Name"
                  className="px-3 py-2.5 bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-medium text-[#1A1C1E] focus:outline-none focus:border-[#387FAB]"
                />
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Email"
                  className="px-3 py-2.5 bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-medium text-[#1A1C1E] focus:outline-none focus:border-[#387FAB]"
                />
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#1A1C1E] block">Have a promo code?</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try 'TRAVELLA20'"
                  className="flex-1 px-3 py-2 bg-[#F8F7F4] border border-[#E8E7E2] rounded-xl text-xs font-mono uppercase text-[#1A1C1E] focus:outline-none focus:border-[#387FAB]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#1A1C1E] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 20% discount applied successfully!
                </p>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1A1C1E] block">Payment Method</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'apple-pay'
                      ? 'border-[#387FAB] bg-[#E8F1F8] text-[#387FAB]'
                      : 'border-[#E8E7E2] bg-white text-[#6A717A] hover:bg-[#F8F7F4]'
                  }`}
                >
                  <span>🍎 Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#387FAB] bg-[#E8F1F8] text-[#387FAB]'
                      : 'border-[#E8E7E2] bg-white text-[#6A717A] hover:bg-[#F8F7F4]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-[#F8F7F4] rounded-2xl border border-[#E8E7E2] space-y-2 text-xs">
              <div className="flex justify-between text-[#6A717A]">
                <span>${baseRate} × {nights} nights</span>
                <span>${staySubtotal}</span>
              </div>
              <div className="flex justify-between text-[#6A717A]">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between text-[#6A717A]">
                <span>Travella service fee</span>
                <span>${serviceFee}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo discount (20%)</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E8E7E2] flex justify-between text-sm font-extrabold text-[#1A1C1E]">
                <span>Total (USD)</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-[11px] text-[#6A717A]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full refund up to 48 hours before check-in. Instant booking protection.</span>
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              disabled={step === 'processing'}
              onClick={handleConfirmBooking}
              className="w-full py-4 bg-[#387FAB] hover:bg-[#2E698D] active:scale-98 text-white text-sm font-bold rounded-2xl shadow-travella-float transition-all duration-200 flex items-center justify-center gap-2"
            >
              {step === 'processing' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing reservation...</span>
                </>
              ) : (
                <>
                  <span>Confirm and Pay ${grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Confirmed Celebration Dialog */}
        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 bg-[#E8F1F8] text-[#387FAB] rounded-full text-xs font-bold uppercase tracking-wider">
                Confirmed & Paid
              </span>
              <h3 className="text-2xl font-extrabold text-[#1A1C1E] mt-3">
                Pack Your Bags, Alex!
              </h3>
              <p className="text-xs text-[#6A717A] max-w-xs mx-auto mt-1">
                Your reservation at <span className="font-bold text-[#1A1C1E]">{destination.title}</span> has been confirmed.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="p-4 bg-[#F8F7F4] rounded-2xl border border-[#E8E7E2] inline-block text-left w-full">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#8E95A0]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#1A1C1E] bg-white px-2 py-0.5 rounded border border-[#E8E7E2]">
                  {bookingRef}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#8E95A0]">Check-in Date:</span>
                <span className="font-semibold text-[#1A1C1E]">{checkInDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8E95A0]">Amount Paid:</span>
                <span className="font-bold text-emerald-600">${grandTotal}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8E95A0]">
              A confirmation receipt and check-in instructions have been sent to {guestEmail}.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-[#387FAB] hover:bg-[#2E698D] text-white text-xs font-bold rounded-2xl shadow-travella-float transition-all active:scale-95"
            >
              Done & View My Stays
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
