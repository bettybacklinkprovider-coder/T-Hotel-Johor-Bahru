import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  ArrowRight,
  Wifi,
  Car,
  Clock,
  Wind,
  Sparkles,
  ShieldCheck,
  Tv,
  Check,
  Star,
  ExternalLink,
  ChevronRight,
  Coffee,
  Building,
  Bed,
  Layers,
  Award
} from 'lucide-react';
import {
  HOTEL_INFO,
  ROOMS,
  FACILITIES,
  GALLERY_ITEMS,
  EXCHANGE_RATES,
  CURRENCY_SYMBOLS,
  HOTEL_IMAGES,
  NEARBY_ATTRACTIONS,
  Room
} from '../data/hotelData';

interface HomePageProps {
  onNavigate: (page: 'home' | 'rooms' | 'gallery' | 'contact') => void;
  currency: 'MYR' | 'SGD' | 'USD';
  onOpenBooking: (roomId?: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currency,
  onOpenBooking,
  onSuccessToast,
}) => {
  const currencySymbol = CURRENCY_SYMBOLS[currency];
  const [heroCheckIn, setHeroCheckIn] = useState('');
  const [heroCheckOut, setHeroCheckOut] = useState('');
  const [heroGuests, setHeroGuests] = useState('2');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking();
  };

  // Icon map for facility icons
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-6 h-6 text-orange-500" />;
      case 'Car': return <Car className="w-6 h-6 text-orange-500" />;
      case 'Clock': return <Clock className="w-6 h-6 text-orange-500" />;
      case 'Wind': return <Wind className="w-6 h-6 text-orange-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-orange-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-orange-500" />;
      case 'Tv': return <Tv className="w-6 h-6 text-orange-500" />;
      case 'Coffee': return <Coffee className="w-6 h-6 text-orange-500" />;
      default: return <MapPin className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-0">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
        {/* Background Image with Scrim Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOTEL_IMAGES.hero}
            alt="T Hotel Johor Bahru Facade"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col items-center text-center">
          {/* Welcome Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            <span>Welcome to Skudai's Premier Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white text-wrap balance max-w-4xl leading-[1.1] mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200">T Hotel Johor Bahru</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-200 max-w-2xl font-light leading-relaxed mb-8">
            Experience exceptional comfort, modern guest rooms, and warm Malaysian hospitality in the heart of Taman Nusa Bestari, Skudai. Minutes from Legoland & Aeon Bukit Indah.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
            >
              <Calendar className="w-4 h-4" /> Book Now
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center gap-2.5"
            >
              <Phone className="w-4 h-4 text-orange-400" /> Contact Us
            </button>
          </div>

          {/* Quick Search Widget */}
          <div className="w-full max-w-4xl bg-neutral-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-neutral-800 shadow-2xl text-left">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" /> Check-In
                </label>
                <input
                  type="date"
                  value={heroCheckIn}
                  onChange={(e) => setHeroCheckIn(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-neutral-800 text-white rounded-xl border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" /> Check-Out
                </label>
                <input
                  type="date"
                  value={heroCheckOut}
                  onChange={(e) => setHeroCheckOut(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-neutral-800 text-white rounded-xl border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-orange-400" /> Guests
                </label>
                <select
                  value={heroGuests}
                  onChange={(e) => setHeroGuests(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-neutral-800 text-white rounded-xl border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests (Family)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 h-[42px]"
              >
                Check Availability <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE HOTEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image Mosaic */}
            <div className="relative space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-100">
                <img
                  src={HOTEL_IMAGES.lobby}
                  alt="T Hotel Reception Lobby"
                  className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img
                    src={HOTEL_IMAGES.deluxe}
                    alt="T Hotel Deluxe Room"
                    className="w-full h-40 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-orange-500 text-white p-6 rounded-xl flex flex-col justify-center">
                  <span className="text-3xl font-serif font-bold mb-1">24/7</span>
                  <p className="text-xs text-orange-100 font-medium">
                    Round-the-clock front desk reception & guest assistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
                About T Hotel Johor Bahru
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                Modern Comfort & Warm Hospitality in Skudai, Johor
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Situated in the thriving commercial hub of <strong className="text-neutral-800">Taman Nusa Bestari, Skudai</strong>, T Hotel Johor Bahru offers clean, thoughtfully designed accommodation suited for business professionals, vacationing families, and weekend travelers from Singapore and beyond.
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Whether you are visiting <strong className="text-neutral-800">Legoland Malaysia</strong>, shopping at <strong className="text-neutral-800">Aeon Bukit Indah</strong>, or exploring local authentic Johor eateries right on our doorstep, T Hotel guarantees a restful night's sleep in an pristine, air-conditioned sanctuary.
              </p>

              {/* Key Selling Points Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Strategic location in Taman Nusa Bestari',
                  '12 Minutes drive to Legoland Malaysia',
                  'Free high-speed fiber Wi-Fi throughout',
                  'Complimentary on-site guest parking',
                  'Surrounded by food stalls & shopping',
                  'Affordable direct rates guaranteed'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('rooms')}
                  className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
                >
                  Explore Rooms <ChevronRight className="w-4 h-4 text-orange-400" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Find Us On Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ROOMS & ACCOMMODATION */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100/80 px-3 py-1 rounded-md mb-3 inline-block">
              Accommodation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
              Rooms & Accommodation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Clean, sanitized, and fully equipped with modern amenities for an effortless stay.
            </p>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.slice(0, 3).map((room) => {
              const priceConverted = Math.round(room.priceMYR * EXCHANGE_RATES[currency]);
              return (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Room Card Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {room.popular && (
                      <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md">
                        Most Popular
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-neutral-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-700">
                      {currencySymbol} {priceConverted} <span className="text-[10px] font-normal text-neutral-300">/ night</span>
                    </div>
                  </div>

                  {/* Room Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                        <span>{room.bedType}</span>
                        <span>·</span>
                        <span>{room.capacity} Guests</span>
                        <span>·</span>
                        <span>{room.sizeSqM} m²</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                        {room.description}
                      </p>
                    </div>

                    {/* Room Highlights Badges (Clean unboxed style) */}
                    <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-500">
                      <span>✓ Free Wi-Fi</span>
                      <span>✓ Hot Shower</span>
                      <span>✓ Air Con</span>
                      <span>✓ Smart TV</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => onNavigate('rooms')}
                        className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors text-center"
                      >
                        View Rooms
                      </button>
                      <button
                        onClick={() => onOpenBooking(room.id)}
                        className="py-2.5 px-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('rooms')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              See All Room Categories & Rates <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOTEL FACILITIES */}
      <section className="py-20 bg-white border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-3 inline-block">
              Amenities & Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
              Hotel Facilities
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Everything you need for a comfortable, stress-free stay at T Hotel Johor Bahru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="rounded-2xl bg-white border border-neutral-200/80 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Header */}
                  {facility.image ? (
                    <div className="relative h-44 overflow-hidden bg-neutral-100">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center border border-white/40">
                        {getFacilityIcon(facility.icon)}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                        {getFacilityIcon(facility.icon)}
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-orange-600 transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: GALLERY */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-md mb-3 inline-block">
                Visual Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Photo Gallery
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Take a look inside T Hotel Johor Bahru — rooms, reception, and hospitality atmosphere.
              </p>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              Explore Full Gallery <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Gallery Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-neutral-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-serif font-bold text-base text-white">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: LOCATION & CONTACT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-3 inline-block">
                  Find & Reach Us
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                  Location & Contact
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                  Conveniently situated in Skudai, Johor Bahru with seamless access from Tuas Second Link & JB Sentral.
                </p>
              </div>

              <div className="space-y-4 bg-neutral-50 p-6 rounded-2xl border border-neutral-200/80">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">Hotel Address</span>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {HOTEL_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-200/60">
                  <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">Phone / WhatsApp</span>
                    <a
                      href={`tel:${HOTEL_INFO.phoneClean}`}
                      className="text-sm font-bold text-orange-600 hover:underline block mt-0.5"
                    >
                      {HOTEL_INFO.phone}
                    </a>
                    <span className="text-[11px] text-neutral-500">Available 24 hours daily</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-200/60">
                  <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">Check-in / Check-out</span>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Check-In: 2:00 PM onwards · Check-Out: 12:00 PM (Noon)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Room Now
                </button>
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
                >
                  Open Google Maps <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Interactive Mock Container */}
            <div className="lg:col-span-7 bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-200 shadow-md relative min-h-[380px] flex flex-col justify-between p-6">
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
              
              {/* Map Pin Header Card */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-neutral-200 max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-serif font-bold text-xl shrink-0">
                    T
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-neutral-900 text-sm">
                      T Hotel Johor Bahru
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      Taman Nusa Bestari, Skudai, Johor
                    </p>
                  </div>
                </div>
              </div>

              {/* Distance Badges Grid */}
              <div className="relative z-10 bg-neutral-900/90 text-white p-5 rounded-2xl border border-neutral-800 space-y-3 backdrop-blur-md mt-auto">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Nearby Driving Distance
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {NEARBY_ATTRACTIONS.slice(0, 6).map((att, i) => (
                    <div key={i} className="p-2 rounded-lg bg-neutral-800/80">
                      <span className="font-semibold block text-white text-[11px] truncate">{att.name}</span>
                      <span className="text-[10px] text-orange-300">{att.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
