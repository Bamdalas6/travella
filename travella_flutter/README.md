# 📱 Travella — Flutter Mobile Application

A cross-platform Flutter mobile application replicating the exact UI/UX design and interaction flow of the **Travella** travel app from [@uiux.build](https://www.instagram.com/p/DdYJB42DRnx/?img_index=1).

---

## 🎨 Color System & Palette
- **Canvas Background:** `#F8F7F4` / `#F4F3EF`
- **Surface / Card Background:** `#FFFFFF`
- **Primary Brand Blue:** `#387FAB` (Hover: `#2E698D`, Light: `#5B94BF`, Deep: `#2D72D2`)
- **Primary Text:** `#1A1C1E` / `#0C1014`
- **Muted Text:** `#6A717A` / `#8E95A0`
- **Badges & Soft Accents:** `#E8F1F8`, `#EBF3FA`
- **Dividers & Borders:** `#E8E7E2`
- **Star Yellow:** `#EAB308`
- **Wishlist Red:** `#EF4444`
- **Online Green:** `#10B981`

---

## 📱 Screens & Features

### 1. Home / Discovery Screen (`screens/home_screen.dart`)
- **Header:**
  - "Good morning," greeting with bold "Alex 👋"
  - Interactive notification bell with unread badge and dropdown dialog
  - Alex Morgan avatar with active online green indicator dot
- **Search & Filter Bar:**
  - Real-time search by title, location, or country with instant clear button
  - Filter button with dynamic active filters counter badge
- **Interactive Filter Sheet:**
  - Max price per night slider ($150 - $1,000)
  - Category selector chips (All, Beach, Mountain, Historic, Luxury)
  - Minimum rating filter chips (Any, 4.5+, 4.8+, 4.9+)
  - Amenities filter chips (WiFi, Pool, Breakfast, AC, Ocean View, Parking, Spa)
  - "Reset all" and "Apply Filters" actions
- **Category Filter Chips:**
  - Horizontal pill strip with icons (✨ All, 🔥 Trending, 🏖️ Beach, ⛰️ Mountain, 🏛️ Historic, 👑 Luxury)
- **Hero Featured Card:**
  - "Villa Bellissima Cliffside" with rating badge (★ 4.94), animated heart wishlist toggle, price per night with strikethrough discount, and "View Stay" CTA
- **Special Offers Promo Banner:**
  - "20% OFF Stays" with promo code `TRAVELLA20` and instant clipboard copy
- **Popular Destinations:**
  - Horizontal cards with photo, location, rating, price, and wishlist toggle

### 2. Destination Details Screen (`screens/details_screen.dart`)
- **Hero Image Gallery:**
  - Horizontal PageView gallery with smooth animated indicator dots
  - Floating back button and floating wishlist toggle
- **Stay Meta:**
  - Category badge, title, location pin, rating and reviews count
- **Specifications Box:**
  - 4 Guests · 2 Bedrooms · 2 Beds · 2 Baths
- **Amenities Offered:**
  - High-speed WiFi, Infinity Pool, Artisan Breakfast, Climate Control, Ocean Panorama, Valet Parking, Private Spa
- **About Section:**
  - Rich narrative description with expandable "Read more / Show less" toggle
- **Interactive Trip Planner:**
  - Dynamic Check-in & Check-out date pickers with automatic night count calculation
  - Interactive Guest Counter: `[-] N Guests [+]` with min/max safety limits
- **Host Profile Card:**
  - Host avatar, name ("Matteo Rossi"), role ("Superhost · 7 yrs hosting"), response rate & time
  - Interactive "Message Host" chat modal sheet
- **Sticky Bottom Action Bar:**
  - Calculated total price for selected nights and bold "Book Now" CTA

### 3. Interactive Booking Flow (`screens/booking_sheet.dart`)
- **Checkout Modal Sheet:**
  - Stay thumbnail, dates, nights count, and guest count recap
  - Guest contact fields (Pre-filled for Alex Morgan)
  - Promo code field with `TRAVELLA20` instant 20% discount calculation
  - Payment method toggle (Apple Pay vs Credit Card)
  - Itemized price breakdown:
    - Nights × rate subtotal
    - Cleaning fee ($60)
    - Service fee ($45)
    - Promo code deduction (-$256)
    - Final total
  - Security guarantee: 256-bit SSL encrypted
  - "Confirm and Pay" button with loading state
- **Celebration Confirmation Dialog:**
  - Success badge with booking reference ID (e.g. `TRV-89421-IT`)
  - Confirmed dates
  - Instant addition to "My Bookings" tab

### 4. Navigation & Additional Views
- **Bottom Navigation Bar:**
  - 5 tabs: **Home**, **Explore**, **Saved** (with badge count), **Bookings** (with badge count), **Profile**
- **Explore Screen:**
  - Catalog search, category chips, and Grid vs List view toggle
- **Saved Screen:**
  - Wishlist of saved places with quick details link and removal
- **Bookings Screen:**
  - List of reserved trips with downloadable **Digital Stay Voucher / Boarding Pass** modal sheet
- **Profile Screen:**
  - Alex Morgan's account stats (Saved Stays, Trips Booked, Travella Pts)
  - Push notifications toggle
  - Currency switcher (USD, EUR, GBP)
  - Payment methods and help center

---

## 🛠️ Project Structure
```text
travella_flutter/
├── lib/
│   ├── main.dart
│   ├── constants/
│   │   ├── colors.dart
│   │   └── theme.dart
│   ├── data/
│   │   └── mock_data.dart
│   ├── models/
│   │   ├── booking.dart
│   │   ├── category.dart
│   │   └── destination.dart
│   ├── screens/
│   │   ├── booking_sheet.dart
│   │   ├── bookings_screen.dart
│   │   ├── details_screen.dart
│   │   ├── explore_screen.dart
│   │   ├── home_screen.dart
│   │   ├── profile_screen.dart
│   │   └── saved_screen.dart
│   ├── state/
│   │   └── app_state.dart
│   └── widgets/
│       ├── bottom_nav.dart
│       ├── category_chips.dart
│       ├── destination_card.dart
│       ├── featured_card.dart
│       ├── filter_sheet.dart
│       ├── header.dart
│       ├── search_bar_widget.dart
│       └── special_offers.dart
├── test/
│   └── destination_test.dart
└── pubspec.yaml
```

---

## 🚀 Running the Flutter App

Ensure you have Flutter SDK installed:
```bash
flutter pub get
flutter run
```

Run automated tests:
```bash
flutter test
```
