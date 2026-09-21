import React, { useState } from 'react';
import { CalendarCheck, Calendar, MapPin, Users, Ticket, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BookingsTab({
  bookings,
  onSelectDestination,
  onShowToast
}) {
  const [selectedBookingForPass, setSelectedBookingForPass] = useState(null);

  const handleDownloadPass = (booking) => {
    setSelectedBookingForPass(booking);
    if (onShowToast) {
      onShowToast(`Boarding voucher #${booking.id} generated!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-28 px-6 pt-5">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#1A1C1E] tracking-tight">My Bookings</h1>
        <p className="text-xs text-[#6A717A] mt-0.5">
          {bookings.length} upcoming and completed trips
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E7E2] p-8 shadow-xs">
          <div className="w-14 h-14 bg-[#E8F1F8] text-[#387FAB] rounded-full flex items-center justify-center mx-auto mb-3">
            <CalendarCheck className="w-7 h-7 stroke-[1.8]" />
          </div>
          <h3 className="text-base font-bold text-[#1A1C1E]">No active bookings</h3>
          <p className="text-xs text-[#6A717A] max-w-xs mx-auto mt-1">
            Pick your favorite destination, select your dates, and confirm to view your active reservations here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl border border-[#E8E7E2] p-4 shadow-travella overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F4F3EF]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[11px] rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
                  </span>
                  <span className="font-mono text-[11px] text-[#8E95A0]">
                    #{booking.id}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#1A1C1E]">
                  ${booking.total}
                </span>
              </div>

              <div className="flex items-center gap-3.5 py-3">
                <img
                  src={booking.destination.imageUrl}
                  alt={booking.destination.title}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#1A1C1E] truncate">
                    {booking.destination.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#6A717A] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#387FAB]" />
                    <span className="truncate">{booking.destination.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-[#F8F7F4] rounded-2xl p-3 border border-[#E8E7E2]/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#387FAB]" />
                  <span className="text-[#6A717A] truncate font-medium">
                    {booking.checkInDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#387FAB]" />
                  <span className="text-[#6A717A] font-medium">
                    {booking.guestsCount} {booking.guestsCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectDestination(booking.destination.id)}
                  className="text-xs font-bold text-[#387FAB] hover:underline"
                >
                  View Stay Details
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPass(booking)}
                  className="px-3.5 py-2 rounded-xl bg-[#E8F1F8] text-[#387FAB] hover:bg-[#387FAB] hover:text-white transition-all text-xs font-bold flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Digital Pass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Digital Pass Modal */}
      {selectedBookingForPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-travella-lg border border-[#E8E7E2]">
            <div className="w-12 h-12 bg-[#E8F1F8] text-[#387FAB] rounded-full flex items-center justify-center mx-auto mb-3">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A1C1E]">
              Travella Mobile Boarding Pass
            </h3>
            <p className="text-xs text-[#6A717A] mt-1">
              Show this pass at check-in desk or key lockbox
            </p>

            <div className="my-5 p-4 bg-[#F8F7F4] rounded-2xl border border-dashed border-[#8E95A0] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8E95A0]">Guest</span>
                <span className="font-bold text-[#1A1C1E]">{selectedBookingForPass.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E95A0]">Pass ID</span>
                <span className="font-mono font-bold text-[#387FAB]">{selectedBookingForPass.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E95A0]">Check-in</span>
                <span className="font-bold text-[#1A1C1E]">{selectedBookingForPass.checkInDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E95A0]">Check-out</span>
                <span className="font-bold text-[#1A1C1E]">{selectedBookingForPass.checkOutDate}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBookingForPass(null)}
              className="w-full py-3 bg-[#387FAB] text-white text-xs font-bold rounded-xl shadow-travella-float"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
