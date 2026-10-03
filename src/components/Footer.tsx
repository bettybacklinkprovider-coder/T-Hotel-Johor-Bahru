import React from 'react';
import { Phone, MapPin, Mail, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onNavigate: (page: 'home' | 'rooms' | 'gallery' | 'contact') => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      {/* Upper Footer CTA Strip */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
              Ready to Stay at T Hotel Johor Bahru?
            </h3>
            <p className="text-orange-100 text-sm max-w-xl">
              Experience modern comfort, free Wi-Fi, and prime access to Skudai & Legoland at the best direct rate.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Book Direct Now
            </button>
            <a
              href={HOTEL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white hover:bg-neutral-100 text-emerald-700 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" /> WhatsApp Direct
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Hotel Brand & Brief */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-serif font-extrabold text-xl">
              T
            </div>
            <span className="font-serif text-xl font-bold text-white tracking-wide">
              T Hotel JB
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            A boutique hospitality destination in Skudai, Johor Bahru. Offering clean, modern accommodation with top-tier amenities for business and family leisure stayovers.
          </p>
          <div className="pt-2 text-xs text-orange-400 flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-orange-500" />
            <span>24/7 Front Desk & Security</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 border-b border-neutral-800 pb-2">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li>
              <button
                onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-orange-400 transition-colors"
              >
                Home Page
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('rooms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-orange-400 transition-colors"
              >
                Rooms & Rates
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-orange-400 transition-colors"
              >
                Photo Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-orange-400 transition-colors"
              >
                Contact & Location
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Key Nearby Spots */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 border-b border-neutral-800 pb-2">
            Nearby Highlights
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li>Legoland Malaysia Resort (12 mins)</li>
            <li>Aeon Mall Bukit Indah (5 mins)</li>
            <li>TF Value-Mart Nusa Bestari (2 mins)</li>
            <li>Paradigm Mall Johor Bahru (8 mins)</li>
            <li>Tuas 2nd Link Checkpoint (22 mins)</li>
          </ul>
        </div>

        {/* Col 4: Address & Direct Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 border-b border-neutral-800 pb-2">
            Contact & Address
          </h4>
          <ul className="space-y-3 text-xs text-neutral-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>{HOTEL_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-orange-400 font-semibold hover:underline">
                {HOTEL_INFO.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{HOTEL_INFO.email}</span>
            </li>
            <li className="pt-2">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-orange-500 text-neutral-300 hover:text-orange-400 rounded-lg transition-all text-xs"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="border-t border-neutral-900 py-6 px-4 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} T Hotel Johor Bahru. All rights reserved.</p>
          <p className="text-[11px] text-neutral-600">
            Skudai · Taman Nusa Bestari · Johor Darul Ta'zim, Malaysia
          </p>
        </div>
      </div>
    </footer>
  );
};
