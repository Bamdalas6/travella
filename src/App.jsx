'use client';

import React, { useState } from 'react';
import { DESTINATIONS } from './data/destinations';
import DeviceFrame from './components/DeviceFrame';
import StatusBar from './components/StatusBar';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryChips from './components/CategoryChips';
import FeaturedCard from './components/FeaturedCard';
import DestinationCard from './components/DestinationCard';
import SpecialOffers from './components/SpecialOffers';
import DestinationDetails from './components/DestinationDetails';
import BookingModal from './components/BookingModal';
import FilterModal from './components/FilterModal';
import AuthModal from './components/AuthModal';
import BottomNav from './components/BottomNav';
import ExploreTab from './components/ExploreTab';
import SavedTab from './components/SavedTab';
import BookingsTab from './components/BookingsTab';
import ProfileTab from './components/ProfileTab';
import Toast from './components/Toast';
import { useAuth } from './context/AuthContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const { user } = useAuth();
  const [destinations] = useState(DESTINATIONS);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [savedIds, setSavedIds] = useState(['dest-1', 'dest-2']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileView, setIsMobileView] = useState(true);

  // Filters State
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    category: 'all',
    minRating: 0,
    amenities: []
  });

  // Booking State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 'TRV-74892-IT',
      destination: DESTINATIONS[0],
      nights: 4,
      guestsCount: 2,
      checkInDate: '2024-10-15',
      checkOutDate: '2024-10-19',
      total: 1395,
      paymentMethod: 'apple-pay',
      guestName: 'Alex Morgan',
      createdAt: '2024-09-18'
    }
  ]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Toggle Save / Wishlist
  const handleToggleSave = (id) => {
    const dest = destinations.find(d => d.id === id);
    const destTitle = dest ? dest.title : 'Destination';

    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(item => item !== id));
      showToast(`Removed "${destTitle}" from saved stays`);
    } else {
      setSavedIds([...savedIds, id]);
      showToast(`Saved "${destTitle}" to your wishlist ❤️`);
    }
  };

  // Filter computation
  const filteredDestinations = destinations.filter((item) => {
    // Search matching
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase());

    // Category matching (from chip or filter modal)
    const effectiveCategory = filters.category !== 'all' ? filters.category : selectedCategory;
    const matchesCategory =
      effectiveCategory === 'all' ||
      item.category.toLowerCase() === effectiveCategory.toLowerCase();

    // Price matching
    const price = item.discountPrice || item.price;
    const matchesPrice = price <= (filters.maxPrice || 1000);

    // Rating matching
    const matchesRating = !filters.minRating || item.rating >= filters.minRating;

    // Amenities matching
    const matchesAmenities =
      !filters.amenities ||
      filters.amenities.length === 0 ||
      filters.amenities.every(amenityId =>
        item.amenities?.some(a => a.id === amenityId)
      );

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesAmenities;
  });

  // Featured destination
  const featuredDestination =
    filteredDestinations.find(d => d.isFeatured) ||
    filteredDestinations[0] ||
    destinations[0];

  // Popular destinations (all other filtered items)
  const popularDestinations = filteredDestinations.filter(
    d => d.id !== (featuredDestination ? featuredDestination.id : null)
  );

  // Active filter count
  const activeFilterCount =
    (filters.maxPrice < 1000 ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.amenities.length > 0 ? 1 : 0);

  // Booking action handlers
  const handleOpenBooking = (data) => {
    setBookingData(data);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking) => {
    const bookingWithUser = {
      ...newBooking,
      guestName: newBooking.guestName || (user ? user.fullName : 'Alex Morgan')
    };
    setBookings([bookingWithUser, ...bookings]);
    showToast(`Booking ${newBooking.id} successfully reserved!`);
  };

  // Currently viewed destination for details screen (Screen 2)
  const selectedDestination = destinations.find(d => d.id === selectedDestinationId);

  return (
    <DeviceFrame isMobileView={isMobileView} onToggleView={setIsMobileView}>
      {/* Active Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Screen 2: Destination Details Screen (Full Screen View) */}
      {selectedDestination ? (
        <DestinationDetails
          destination={selectedDestination}
          onBack={() => setSelectedDestinationId(null)}
          isSaved={savedIds.includes(selectedDestination.id)}
          onToggleSave={handleToggleSave}
          onBookNow={handleOpenBooking}
          onShowToast={showToast}
        />
      ) : (
        /* Screen 1 & Tabs View */
        <div className="min-h-screen bg-[#F8F7F4] flex flex-col justify-between">
          {/* Top Mobile Status Bar */}
          <StatusBar dark={false} />

          {/* Main Tab Views */}
          <div className="flex-1 pb-24">
            {activeTab === 'home' && (
              <div className="animate-in fade-in duration-200">
                {/* Header: Greeting & Profile */}
                <Header
                  onProfileClick={() => setActiveTab('profile')}
                  onSelectDestination={(id) => setSelectedDestinationId(id)}
                />

                {/* Search & Filter Bar */}
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onOpenFilter={() => setFilterModalOpen(true)}
                  activeFilterCount={activeFilterCount}
                />

                {/* Category Filter Chips */}
                <CategoryChips
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    setFilters(prev => ({ ...prev, category: cat }));
                  }}
                />

                {/* Featured Destination Card (Large Hero Card) */}
                {featuredDestination ? (
                  <FeaturedCard
                    destination={featuredDestination}
                    onSelect={(id) => setSelectedDestinationId(id)}
                    isSaved={savedIds.includes(featuredDestination.id)}
                    onToggleSave={handleToggleSave}
                  />
                ) : null}

                {/* Special Offers Banner */}
                <SpecialOffers onShowToast={showToast} />

                {/* Popular Destinations Section */}
                <div className="px-6 pt-3 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-[#1A1C1E] tracking-tight">
                      Popular Destinations
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('explore')}
                      className="text-xs font-semibold text-[#387FAB] hover:underline flex items-center gap-1"
                    >
                      <span>See all</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {popularDestinations.length === 0 && !featuredDestination ? (
                    <div className="p-8 bg-white rounded-3xl border border-[#E8E7E2] text-center">
                      <p className="text-xs text-[#6A717A]">
                        No destinations match your search or filter.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setFilters({ maxPrice: 1000, category: 'all', minRating: 0, amenities: [] });
                        }}
                        className="mt-2 text-xs font-bold text-[#387FAB] underline"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {popularDestinations.map((dest) => (
                        <DestinationCard
                          key={dest.id}
                          destination={dest}
                          layout="horizontal"
                          onSelect={(id) => setSelectedDestinationId(id)}
                          isSaved={savedIds.includes(dest.id)}
                          onToggleSave={handleToggleSave}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'explore' && (
              <ExploreTab
                destinations={destinations}
                onSelectDestination={(id) => setSelectedDestinationId(id)}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {activeTab === 'saved' && (
              <SavedTab
                destinations={destinations}
                savedIds={savedIds}
                onSelectDestination={(id) => setSelectedDestinationId(id)}
                onToggleSave={handleToggleSave}
                onGoToExplore={() => setActiveTab('explore')}
              />
            )}

            {activeTab === 'bookings' && (
              <BookingsTab
                bookings={bookings.map((b) => ({
                  ...b,
                  guestName: user ? (b.guestName === 'Alex Morgan' ? user.fullName : b.guestName) : b.guestName
                }))}
                onSelectDestination={(id) => setSelectedDestinationId(id)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileTab onShowToast={showToast} />
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedDestinationId(null);
            }}
            savedCount={savedIds.length}
            bookingsCount={bookings.length}
          />
        </div>
      )}

      {/* Screen 3: Interactive Booking Checkout Modal */}
      {bookingModalOpen && (
        <BookingModal
          bookingData={bookingData}
          onClose={() => setBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Interactive Filter Modal / Drawer */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setSelectedCategory(newFilters.category);
          showToast('Search filters updated');
        }}
      />
      {/* Screen 4: Interactive In-App Authentication Modal */}
      <AuthModal onShowToast={showToast} />
    </DeviceFrame>
  );
}
