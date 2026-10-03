import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/hotelData';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'exterior', label: 'Exterior & Facade' },
    { id: 'rooms', label: 'Rooms & Beds' },
    { id: 'bathrooms', label: 'Bathrooms' },
    { id: 'lobby', label: 'Lobby & Reception' },
    { id: 'nearby', label: 'Nearby Attractions' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-neutral-800 text-center sm:text-left">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-md mb-3 inline-block">
              Visual Tour
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
              Hotel Photo Gallery
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Explore T Hotel Johor Bahru through our curated photograph gallery showcasing clean guest rooms, sleek lobby, modern amenities, and nearby hotspots in Skudai.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 shadow-md hover:shadow-2xl transition-all duration-300 border border-neutral-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Hover Lightbox Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200">
            <p className="text-neutral-500 text-sm">No photos found in this category.</p>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Lightbox Top Control Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
                {activeLightboxItem.categoryLabel}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {activeLightboxItem.title}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-400 font-mono">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image Frame */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Caption */}
          <div className="text-center text-xs text-neutral-300 max-w-xl mx-auto z-10">
            <p>{activeLightboxItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
