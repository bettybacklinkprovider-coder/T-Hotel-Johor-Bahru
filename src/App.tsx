import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ToastContainer, ToastMessage } from './components/NotificationToast';

import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

type PageType = 'home' | 'rooms' | 'gallery' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currency, setCurrency] = useState<'MYR' | 'SGD' | 'USD'>('MYR');
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string | undefined>(undefined);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast notification trigger
  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state with URL pathname / hash
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '') as PageType;
      if (['home', 'rooms', 'gallery', 'contact'].includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (roomId?: string) => {
    setSelectedRoomForBooking(roomId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-neutral-50 text-neutral-800 selection:bg-orange-500 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            currency={currency}
            onOpenBooking={handleOpenBooking}
            onSuccessToast={addToast}
          />
        )}

        {currentPage === 'rooms' && (
          <RoomsPage
            currency={currency}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'gallery' && <GalleryPage />}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenBooking={() => handleOpenBooking()}
            onSuccessToast={addToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Drawer Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoomId={selectedRoomForBooking}
        currency={currency}
        onSuccessToast={addToast}
      />

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
