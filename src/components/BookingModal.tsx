import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Check, Phone, Send, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import { ROOMS, HOTEL_INFO, EXCHANGE_RATES, CURRENCY_SYMBOLS, Room } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoomId?: string;
  currency: 'MYR' | 'SGD' | 'USD';
  onSuccessToast: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoomId,
  currency,
  onSuccessToast,
}) => {
  const [roomId, setRoomId] = useState<string>(selectedRoomId || ROOMS[0].id);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    if (!checkIn) setCheckIn(formatDate(today));
    if (!checkOut) setCheckOut(formatDate(tomorrow));
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (selectedRoomId) {
      setRoomId(selectedRoomId);
    }
  }, [selectedRoomId]);

  if (!isOpen) return null;

  const currentRoom: Room = ROOMS.find(r => r.id === roomId) || ROOMS[0];

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.max(0, end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const pricePerNightConverted = Math.round(currentRoom.priceMYR * EXCHANGE_RATES[currency]);
  const totalPriceConverted = pricePerNightConverted * nights;
  const currencySymbol = CURRENCY_SYMBOLS[currency];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const ref = 'THJB-' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(ref);
    setIsSubmitted(true);
    onSuccessToast(`Reservation request #${ref} submitted successfully!`);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello T Hotel JB! I would like to confirm my booking request:
📌 *Ref*: ${bookingRef}
🏨 *Room*: ${currentRoom.name}
📅 *Check-In*: ${checkIn}
📅 *Check-Out*: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})
👤 *Guest Name*: ${guestName}
📞 *Phone*: ${guestPhone}
💰 *Estimated Total*: ${currencySymbol} ${totalPriceConverted} (${currency})
${specialRequests ? `📝 *Notes*: ${specialRequests}` : ''}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${HOTEL_INFO.phoneClean}?text=${encoded}`, '_blank');
  };

  const copyRefToClipboard = () => {
    navigator.clipboard.writeText(bookingRef);
    onSuccessToast('Reference code copied to clipboard!');
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-neutral-900 text-white px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white text-lg">
              T
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                {isSubmitted ? 'Booking Requested' : 'Book Your Stay'}
              </h3>
              <p className="text-xs text-neutral-400">T Hotel Johor Bahru · Skudai</p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Select Room Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROOMS.map((room) => {
                    const price = Math.round(room.priceMYR * EXCHANGE_RATES[currency]);
                    const isSelected = room.id === roomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setRoomId(room.id)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/50 shadow-sm ring-1 ring-orange-500'
                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-neutral-900">{room.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-orange-600" />}
                        </div>
                        <div className="text-xs text-neutral-500 flex items-center justify-between">
                          <span>{room.bedType}</span>
                          <span className="font-semibold text-orange-600">
                            {currencySymbol} {price} / night
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" /> Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" /> Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-500" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Guest Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Tan Wei Ming"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +60 12-345 6789"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. guest@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Special Requests or ETA</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Late check-in after 8 PM, extra pillow..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>
              </div>

              {/* Pricing Summary Box */}
              <div className="bg-orange-50 border border-orange-200/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-xs text-neutral-600 block">Total Estimated Cost ({nights} night{nights > 1 ? 's' : ''})</span>
                  <div className="text-2xl font-bold text-orange-600 font-sans tabular-nums">
                    {currencySymbol} {totalPriceConverted} <span className="text-xs font-normal text-neutral-500">({currency})</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">No payment required now · Pay upon arrival</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Confirm Reservation Request <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation View */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-neutral-900 mb-1">
                  Reservation Received!
                </h4>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-neutral-800">{guestName}</span>. Your room request has been created and held for you.
                </p>
              </div>

              {/* Reservation Receipt Card */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Reference Number</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-orange-600">
                    <span>{bookingRef}</span>
                    <button
                      onClick={copyRefToClipboard}
                      className="p-1 hover:bg-neutral-200 rounded text-neutral-500"
                      title="Copy code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-neutral-700">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Room</span>
                    <span className="font-semibold">{currentRoom.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Guests</span>
                    <span className="font-semibold">{guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Dates</span>
                    <span className="font-semibold">{checkIn} to {checkOut} ({nights} nts)</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Estimated Price</span>
                    <span className="font-semibold text-orange-600">{currencySymbol} {totalPriceConverted} ({currency})</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free cancellation up to 24 hours prior to check-in.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Request to WhatsApp (+60 16-772 4772)
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-medium rounded-xl transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
