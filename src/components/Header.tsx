import React, { useState } from 'react';
import { Phone, Menu, X, Calendar, Globe, ChevronDown } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface HeaderProps {
  currentPage: 'home' | 'rooms' | 'gallery' | 'contact';
  onNavigate: (page: 'home' | 'rooms' | 'gallery' | 'contact') => void;
  currency: 'MYR' | 'SGD' | 'USD';
  onCurrencyChange: (c: 'MYR' | 'SGD' | 'USD') => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks: { id: 'home' | 'rooms' | 'gallery' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: 'home' | 'rooms' | 'gallery' | 'contact') => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md text-white border-b border-neutral-800 transition-all">
      {/* Top Notification / Contact Strip */}
      <div className="hidden sm:block bg-neutral-950 border-b border-neutral-800/80 py-1.5 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              24/7 Front Desk Reception
            </span>
            <span className="text-neutral-600">|</span>
            <span>📍 {HOTEL_INFO.addressShort}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="hover:text-white transition-colors flex items-center gap-1 text-orange-300 font-medium"
            >
              <Phone className="w-3 h-3 text-orange-400" /> {HOTEL_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-serif font-extrabold text-2xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            T
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
              T HOTEL
            </span>
            <span className="text-[10px] tracking-widest text-orange-400 font-sans uppercase block mt-1">
              Johor Bahru · Malaysia
            </span>
          </div>
        </button>

        {/* Zone 2: 4 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-orange-400 font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Currency Switcher & Book Now CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl py-1 z-50 text-xs">
                {(['MYR', 'SGD', 'USD'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left transition-colors flex items-center justify-between ${
                      currency === c
                        ? 'bg-orange-500/20 text-orange-400 font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <span>{c}</span>
                    {currency === c && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Now Button */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold tracking-wide uppercase rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" /> Book Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white bg-neutral-800 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-3 text-left rounded-xl text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Select Currency</span>
            <div className="flex gap-2">
              {(['MYR', 'SGD', 'USD'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-3 py-1 text-xs rounded-md ${
                    currency === c ? 'bg-orange-500 text-white font-bold' : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-neutral-400 space-y-1">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-orange-400 font-semibold">
                {HOTEL_INFO.phone}
              </a>
            </p>
            <p>📍 {HOTEL_INFO.address}</p>
          </div>
        </div>
      )}
    </header>
  );
};
