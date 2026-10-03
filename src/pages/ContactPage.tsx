import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Copy,
  ChevronDown,
  Navigation,
  Car,
  Plane
} from 'lucide-react';
import { HOTEL_INFO, FAQS } from '../data/hotelData';

interface ContactPageProps {
  onOpenBooking: () => void;
  onSuccessToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onSuccessToast }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [subject, setSubject] = useState('Room Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !message) {
      alert('Please fill in required fields (Name, Phone, Message).');
      return;
    }

    setIsSubmitted(true);
    onSuccessToast('Message sent! Our reception desk will contact you shortly.');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(HOTEL_INFO.address);
    onSuccessToast('Address copied to clipboard!');
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(HOTEL_INFO.phone);
    onSuccessToast('Phone number copied to clipboard!');
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-neutral-800">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-md mb-3 inline-block">
              We Are Here To Help
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
              Contact Us & Location
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Have questions about room availability, group bookings, or directions? Reach out to our 24-hour reception desk via phone, WhatsApp, or contact form.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Quick Contact Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={`tel:${HOTEL_INFO.phoneClean}`}
            className="p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:border-orange-500 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-medium block">Call Reception Direct</span>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                {HOTEL_INFO.phone}
              </span>
            </div>
          </a>

          <a
            href={HOTEL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-medium block">WhatsApp Chat</span>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                Send Direct Message
              </span>
            </div>
          </a>

          <button
            onClick={onOpenBooking}
            className="p-6 bg-orange-500 text-white rounded-2xl shadow-md hover:bg-orange-600 transition-all flex items-center gap-4 text-left"
          >
            <div className="p-3 bg-white/20 text-white rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-orange-100 font-medium block">Online Reservation</span>
              <span className="text-sm font-bold">Book Room Now</span>
            </div>
          </button>

          <a
            href={HOTEL_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:border-orange-500 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-medium block">Google Maps GPS</span>
              <span className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                Open Directions <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>

        {/* Contact Form & Hotel Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-md">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-2 inline-block">
                    Send Inquiry
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                    Get in Touch
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Fill out the form below and our front desk will get back to you right away.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Tan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      className="w-full px-4 py-3 text-sm bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +60 16-123 4567"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 text-sm bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Room Inquiry">Room & Rate Inquiry</option>
                      <option value="Group Booking">Group / Tour Booking</option>
                      <option value="Long Stay">Long-Stay Rates</option>
                      <option value="Transport Assistance">Transport & Directions</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your message or inquiry here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-sm bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-neutral-800">{formName}</span>. Our reception desk at T Hotel Johor Bahru has received your inquiry and will respond shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Hotel Details Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Complete Business Info Card */}
            <div className="bg-neutral-900 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-neutral-800">
              <h3 className="font-serif text-2xl font-bold border-b border-neutral-800 pb-4">
                Hotel Business Information
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[11px] font-medium uppercase tracking-wider">
                    Official Hotel Name
                  </span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {HOTEL_INFO.name}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">
                      Complete Address
                    </span>
                    <button
                      onClick={copyAddress}
                      className="text-orange-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <p className="text-neutral-200 leading-relaxed font-light">
                    {HOTEL_INFO.address}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider">
                      Reception Telephone / WhatsApp
                    </span>
                    <button
                      onClick={copyPhone}
                      className="text-orange-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    className="text-base font-bold text-orange-400 hover:underline block"
                  >
                    {HOTEL_INFO.phone}
                  </a>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px] font-medium uppercase tracking-wider">
                    Reception Hours
                  </span>
                  <span className="text-white font-medium block mt-0.5">
                    {HOTEL_INFO.receptionHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Directions Card */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
              <h4 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-orange-500" /> Driving Directions
              </h4>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50">
                  <Car className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">From Tuas Second Link</span>
                    <span>22 km via Second Link Expressway / Exit 312 Skudai (~20 mins).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50">
                  <Car className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">From Woodlands CIQ / JB Sentral</span>
                    <span>16.5 km via Jalan Tun Abdul Razak / Skudai Highway (~20 mins).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50">
                  <Plane className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">From Senai Airport (JHB)</span>
                    <span>24 km via Senai Highway (~25 mins). Grab & Taxi readily available.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200/80 shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-2 inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-neutral-900">
              Need Quick Answers?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left font-serif font-semibold text-sm sm:text-base text-neutral-900 flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-orange-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
