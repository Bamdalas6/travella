'use client';

import React, { useState } from 'react';
import { DESTINATIONS } from './data/destinations';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import DestinationDetails from './components/DestinationDetails';
import ExploreCountries from './components/ExploreCountries';
import OnboardingScreen from './components/OnboardingScreen';
import MessagesTab from './components/MessagesTab';
import SavedTab from './components/SavedTab';
import ProfileTab from './components/ProfileTab';
import ExploreTab from './components/ExploreTab';
import BookingModal from './components/BookingModal';
import FilterModal from './components/FilterModal';
import AuthModal from './components/AuthModal';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import { useAuth } from './context/AuthContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const { user, openAuthModal } = useAuth();
  const [destinations] = useState(DESTINATIONS);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [savedIds, setSavedIds] = useState(['dest-tanah-lot', 'dest-kudahuvadhoo', 'dest-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState(null);

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
      guestName: 'Ayodele Babalola',
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

    // Category matching (from filter modal)
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

  // Reorder for carousel: Tanah Lot and Kudahuvadhoo first as in Screen 2 mockup
  const carouselDestinations = [
    ...filteredDestinations.filter(d => d.id === 'dest-tanah-lot' || d.id === 'dest-kudahuvadhoo'),
    ...filteredDestinations.filter(d => d.id !== 'dest-tanah-lot' && d.id !== 'dest-kudahuvadhoo')
  ];

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
      guestName: newBooking.guestName || (user ? (user.fullName || user.name) : 'Ayodele Babalola')
    };
    setBookings([bookingWithUser, ...bookings]);
    showToast(`Booking ${newBooking.id} successfully reserved!`);
  };

  // Currently viewed destination for details screen (Screen 3)
  const selectedDestination = destinations.find(d => d.id === selectedDestinationId);

  return (
    <div className="min-h-screen bg-[#F0F4F2] flex justify-center text-[#1A1C1E] antialiased">
      <div className="w-full max-w-md min-h-screen bg-white shadow-2xl flex flex-col relative sm:my-6 sm:rounded-[36px] sm:border sm:border-[#E8E7E2] overflow-hidden">
        {/* Active Toast Notification */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

        {/* Screen 1: Onboarding View (Toggled via Grid Menu or first-time explore) */}
        {showOnboarding ? (
          <OnboardingScreen
            onStartExploring={() => setShowOnboarding(false)}
            onSignIn={() => {
              setShowOnboarding(false);
              if (openAuthModal) openAuthModal('login');
            }}
            onRegister={() => {
              setShowOnboarding(false);
              if (openAuthModal) openAuthModal('signup');
            }}
          />
        ) : selectedDestination ? (
          /* Screen 3: Destination Details Screen (Full Screen View) */
          <DestinationDetails
            destination={selectedDestination}
            onBack={() => setSelectedDestinationId(null)}
            isSaved={savedIds.includes(selectedDestination.id)}
            onToggleSave={handleToggleSave}
            onBookNow={handleOpenBooking}
            onShowToast={showToast}
          />
        ) : (
          /* Main Tab Views (Screen 2 Home, Screen 4 Profile, Messages, Saved) */
          <div className="min-h-screen bg-white flex flex-col justify-between">
            <div className="flex-1 pb-24">
              {activeTab === 'home' && (
                <div className="animate-in fade-in duration-200">
                  {/* Screen 2 Top Bar: 4-dot menu, Welcome Ayodele Babalola, Bell */}
                  <Header
                    onMenuClick={() => setShowOnboarding(true)}
                    onProfileClick={() => setActiveTab('profile')}
                    onSelectDestination={(id) => setSelectedDestinationId(id)}
                  />

                  {/* Search & Filter Bar */}
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={(query) => {
                      setSearchQuery(query);
                      if (!query) setSelectedCountry(null);
                    }}
                    onOpenFilter={() => setFilterModalOpen(true)}
                    activeFilterCount={activeFilterCount}
                  />

                  {/* Best Place for you Carousel (Screen 2 Mockup) */}
                  <div className="pt-2 pb-1">
                    <div className="px-6 flex items-center justify-between mb-2">
                      <h2 className="text-base font-bold text-[#1A1C1E] tracking-tight">
                        Best Place for you
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSelectedCountry(null);
                        }}
                        className="text-xs font-semibold text-[#8E95A0] hover:text-[#037c66] transition-colors"
                      >
                        View All
                      </button>
                    </div>

                    {carouselDestinations.length === 0 ? (
                      <div className="mx-6 p-6 bg-[#F8FAF9] rounded-3xl border border-[#EAEFEC] text-center">
                        <p className="text-xs text-[#6A717A]">
                          No stays match your search "{searchQuery}".
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSelectedCountry(null);
                            setFilters({ maxPrice: 1000, category: 'all', minRating: 0, amenities: [] });
                          }}
                          className="mt-2 text-xs font-bold text-[#037c66] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-6 pb-2 pt-1">
                        {carouselDestinations.map((dest) => (
                          <DestinationCard
                            key={dest.id}
                            destination={dest}
                            layout="carousel"
                            onSelect={(id) => setSelectedDestinationId(id)}
                            isSaved={savedIds.includes(dest.id)}
                            onToggleSave={handleToggleSave}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Explore Section (Country Avatars) */}
                  <ExploreCountries
                    selectedCountry={selectedCountry}
                    onSelectCountry={(countryName) => {
                      setSelectedCountry(countryName);
                      if (countryName) {
                        setSearchQuery(countryName);
                      } else {
                        setSearchQuery('');
                      }
                    }}
                    onViewAll={() => setActiveTab('explore')}
                  />

                  {/* Popular Stays Section */}
                  <div className="px-6 pt-1 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-[#1A1C1E] tracking-tight">
                        {searchQuery ? `Places in "${searchQuery}"` : "Popular Escapes"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('explore')}
                        className="text-xs font-semibold text-[#037c66] hover:underline flex items-center gap-1"
                      >
                        <span>See all</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {carouselDestinations.slice(0, 4).map((dest) => (
                        <DestinationCard
                          key={`list-${dest.id}`}
                          destination={dest}
                          layout="horizontal"
                          onSelect={(id) => setSelectedDestinationId(id)}
                          isSaved={savedIds.includes(dest.id)}
                          onToggleSave={handleToggleSave}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Explore Tab */}
              {activeTab === 'explore' && (
                <ExploreTab
                  destinations={destinations}
                  onSelectDestination={(id) => setSelectedDestinationId(id)}
                  savedIds={savedIds}
                  onToggleSave={handleToggleSave}
                />
              )}

              {/* Saved Tab */}
              {activeTab === 'saved' && (
                <SavedTab
                  destinations={destinations}
                  savedIds={savedIds}
                  onSelectDestination={(id) => setSelectedDestinationId(id)}
                  onToggleSave={handleToggleSave}
                  onGoToExplore={() => setActiveTab('home')}
                />
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <MessagesTab onShowToast={showToast} />
              )}

              {/* Screen 4: Profile Tab */}
              {activeTab === 'profile' && (
                <ProfileTab onShowToast={showToast} />
              )}
            </div>

            {/* Screen 2: Bottom Navigation Bar with 4 items & Emerald Active Pill */}
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setSelectedDestinationId(null);
                setShowOnboarding(false);
              }}
              savedCount={savedIds.length}
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

        {/* Interactive In-App Authentication Modal */}
        <AuthModal onShowToast={showToast} />
      </div>
    </div>
  );
}
