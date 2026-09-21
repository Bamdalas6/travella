# ✈️ Travella — Modern Travel & Stay Discovery Web App

A pixel-perfect, highly interactive replication and extension of the **Travella** travel app UI/UX design by [@uiux.build (Darpan)](https://www.instagram.com/p/DdYJB42DRnx/?img_index=1).

Built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🎨 Design System & Color Palette

- **Background Canvas:** `#F8F7F4`, `#F4F3EF`, `#FFFFFF`
- **Primary Accent:** Ocean / Sky Blue (`#387FAB`, `#5B94BF`, `#2D72D2`)
- **Primary Dark Text:** `#1A1C1E` / `#0C1014`
- **Secondary Text & Muted Icons:** `#6A717A` / `#8E95A0`
- **Soft Badges & Highlights:** `#E8F1F8`, `#EBF3FA`
- **Card Shadow:** `0 8px 24px rgba(12, 16, 20, 0.06)`
- **Typography:** `Plus Jakarta Sans`

---

## ✨ Features & Screen Arrangement

### 1. Screen 1: Home / Discovery Screen
- **Status Bar:** iOS time (9:41 dynamic), cellular bars, WiFi, battery indicator.
- **Top Header:** "Good morning," greeting, bold "Alex 👋", unread notifications bell with interactive dropdown panel, profile avatar with online indicator.
- **Search & Filter Bar:** Search destinations by title/country with clear action and filter toggle with active count badge.
- **Category Chips:** Horizontal scrolling pills (*All*, *Trending*, *Beach*, *Mountain*, *Historic*, *Luxury*) with active states.
- **Featured Destination Hero Card:** Large rounded card showcasing "Villa Bellissima Cliffside", rating badge (★ 4.94), animated wishlist heart toggle, price per night with discount, and "View Stay" button.
- **Special Promo Banner:** 20% off luxury stays with instant "Copy Code" action for `TRAVELLA20`.
- **Popular Destinations:** Compact horizontal cards with thumbnails, location pin, price, and favorite toggle.

### 2. Screen 2: Destination Details Screen
- **Hero Image Gallery:** Multi-image preview with pagination indicator.
- **Floating Controls:** Floating back button `←` and wishlist heart toggle.
- **Stay Meta:** Title, location, category tag, rating & review badges.
- **Specifications:** Guests capacity, bedrooms count, beds, and baths.
- **Featured Amenities:** High-speed WiFi, Infinity Pool, Artisan Breakfast, Climate Control, Ocean Panorama, Valet Parking.
- **About Section:** Rich description with expandable "Read more / Show less" toggle.
- **Interactive Trip Planner:** Dynamic check-in and check-out date selector with night calculation.
- **Interactive Guest Counter:** `[-] N Guests [+]` with min/max safety limits.
- **Host Profile Card:** Host info, Superhost status, response time, and an interactive "Message Host" chat modal.
- **Guest Testimonials:** Real traveler reviews with star ratings and avatars.
- **Sticky Bottom Action Bar:** Price per night, calculated total for selected nights, and bold "Book Now" CTA.

### 3. Screen 3: Interactive Booking & Confirmation
- **Checkout Slide-Over Modal:**
  - Stay thumbnail & dates review
  - Guest contact input fields
  - Promo code field with instant 20% discount calculation
  - Payment method selector (Apple Pay vs Credit Card)
  - Full itemized price breakdown (nights × rate + cleaning fee + service fee - discount)
  - Security guarantee badge
  - Interactive "Confirm and Pay" button with loading spinner state
- **Celebration Confirmation Dialog:**
  - Multi-colored confetti burst (`canvas-confetti`)
  - Booking confirmation reference ID (e.g. `TRV-89421-IT`)
  - Check-in dates badge
  - Instant addition to "My Bookings" tab

### 4. Comprehensive Navigation & View Switcher
- **Bottom Navigation Bar:** Switch between **Home**, **Explore**, **Saved** (with live count badge), **Bookings** (with active badge), and **Profile**.
- **Explore Tab:** Switch between grid and list layouts with search and category filters.
- **Saved Tab:** Wishlist view with quick booking links.
- **Bookings Tab:** List of confirmed trips with downloadable **Digital Boarding Pass** modal.
- **Profile Tab:** Alex Morgan's stats (Saved places, trips taken, reward points), travel preferences, push notifications toggle, currency selector.
- **Dual Presentation Mode:** Floating top toggle allows switching between:
  - 📱 **Mobile Frame:** Realistic iPhone 15 Pro mockup frame with dynamic island and metallic rim.
  - 💻 **Full Responsive:** Expanded desktop / tablet layout.
- **Interactive Toasts:** Real-time feedback for saving items, applying filters, copying promo codes, and messaging hosts.

---

## ⚡ Frameworks & Platforms

1. **Next.js Web App (Cloudflare Ready):**
   - Built with **Next.js 16 (Turbopack)**, **React 19**, and **Tailwind CSS**.
   - Cloudflare Pages static export configuration (`output: 'export'`) with unoptimized images and trailing slashes for zero-latency edge distribution.
   - Includes `wrangler.toml`, `public/_headers` (security headers & static asset caching), and `public/_routes.json`.
   - Output directory: `out/`.

2. **Flutter Mobile Application (`travella_flutter/`):**
   - Complete native Flutter codebase for iOS and Android.
   - Models, state management, components, screens (Home, Details, Booking, Explore, Saved, Bookings, Profile).
   - Automated unit test suite.

---

## 🚀 Getting Started

### Web App (Next.js)

#### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Cloudflare Pages Production Build
```bash
npm run build
```
Generates the static export in `./out` ready to be served by Cloudflare Pages or Wrangler CLI.

#### Deploy with Wrangler
```bash
npx wrangler pages deploy out
```

#### Run Web Automated Tests
```bash
npm test
```

---

### Flutter Mobile App (`travella_flutter/`)

```bash
cd travella_flutter
flutter pub get
flutter run
```

Run Flutter tests:
```bash
cd travella_flutter
flutter test
```

