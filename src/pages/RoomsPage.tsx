import React, { useState } from 'react';
import { Users, BedDouble, Maximize2, Check, ArrowRight, ShieldCheck, Sparkles, Filter, Search } from 'lucide-react';
import { ROOMS, HOTEL_INFO, EXCHANGE_RATES, CURRENCY_SYMBOLS, Room } from '../data/hotelData';

interface RoomsPageProps {
  currency: 'MYR' | 'SGD' | 'USD';
  onOpenBooking: (roomId?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ currency, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [guestFilter, setGuestFilter] = useState<number>(0);
  const [activeModalRoom, setActiveModalRoom] = useState<Room | null>(null);

  const currencySymbol = CURRENCY_SYMBOLS[currency];

  const categories = ['All', 'Standard', 'Deluxe', 'Executive', 'Family'];

  const filteredRooms = ROOMS.filter((room) => {
    const categoryMatch = selectedCategory === 'All' || room.category === selectedCategory;
    const guestMatch = guestFilter === 0 || room.capacity >= guestFilter;
    return categoryMatch && guestMatch;
  });

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-neutral-800">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-md mb-3 inline-block">
              Accommodation & Rates
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
              Rooms & Accommodations
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Explore our selection of clean, contemporary guest rooms at T Hotel Johor Bahru. Whether traveling solo, as a couple, or with family, we have the ideal space for your stay in Skudai.
            </p>
          </div>
          {/* Subtle background decorative element */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200/80 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat === 'All' ? 'All Rooms' : `${cat} Suites`}
              </button>
            ))}
          </div>

          {/* Guest Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-neutral-500 flex items-center gap-1 whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 text-orange-500" /> Minimum Guests:
            </span>
            <select
              value={guestFilter}
              onChange={(e) => setGuestFilter(Number(e.target.value))}
              className="px-3 py-1.5 text-xs bg-neutral-100 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-800"
            >
              <option value={0}>Any Occupancy</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4+ Guests (Family)</option>
            </select>
          </div>
        </div>

        {/* Room Cards List */}
        <div className="space-y-8">
          {filteredRooms.map((room) => {
            const priceConverted = Math.round(room.priceMYR * EXCHANGE_RATES[currency]);
            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 group"
              >
                {/* Left Image Section */}
                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {room.popular && (
                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                      Guest Choice
                    </span>
                  )}
                </div>

                {/* Right Details Section */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                        {room.category} Class
                      </span>
                      <div className="text-right">
                        <span className="text-xs text-neutral-400 block">Starting from</span>
                        <span className="font-serif text-2xl font-bold text-orange-600 tabular-nums">
                          {currencySymbol} {priceConverted}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-normal"> / night ({currency})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                      {room.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                      {room.description}
                    </p>

                    {/* Room Key Specs */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-700 py-3 border-y border-neutral-100">
                      <div className="flex items-center gap-1.5 font-medium">
                        <BedDouble className="w-4 h-4 text-orange-500" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>Up to {room.capacity} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Maximize2 className="w-4 h-4 text-orange-500" />
                        <span>{room.sizeSqM} m² Room Size</span>
                      </div>
                    </div>

                    {/* Amenities List */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                        Included Amenities:
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-neutral-600">
                        {room.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setActiveModalRoom(room)}
                      className="text-xs font-semibold text-neutral-600 hover:text-orange-600 underline transition-colors"
                    >
                      View Photo Gallery ({room.gallery.length} photos)
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => onOpenBooking(room.id)}
                        className="w-full sm:w-auto px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        Book {room.name} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200">
            <p className="text-neutral-500 text-sm">No room categories found matching your selected filters.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setGuestFilter(0); }}
              className="mt-4 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Room Quick Photo Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-neutral-900">{activeModalRoom.name}</h3>
                <p className="text-xs text-neutral-500">{activeModalRoom.bedType} · {activeModalRoom.capacity} Guests</p>
              </div>
              <button
                onClick={() => setActiveModalRoom(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeModalRoom.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${activeModalRoom.name} view ${i + 1}`}
                  className="w-full h-48 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => {
                  const roomToBook = activeModalRoom.id;
                  setActiveModalRoom(null);
                  onOpenBooking(roomToBook);
                }}
                className="px-6 py-2.5 bg-orange-500 text-white text-xs font-bold uppercase rounded-xl"
              >
                Book This Room Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
