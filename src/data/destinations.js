export const DESTINATIONS = [
  {
    id: "dest-1",
    title: "Villa Bellissima Cliffside",
    location: "Amalfi Coast, Italy",
    country: "Italy",
    category: "Beach",
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    rating: 4.94,
    reviewsCount: 184,
    price: 380,
    discountPrice: 320,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perched gracefully above the shimmering Tyrrhenian Sea, Villa Bellissima offers uninterrupted 180-degree Mediterranean vistas, a secluded private saltwater pool carved into natural limestone, and sun-drenched terracotta terraces lined with fragrant lemon groves. Experience authentic Italian coastal charm with curated private boat tours to Capri and sunset dinners prepared by our resident Michelin-trained chef.",
    amenities: [
      { id: "wifi", name: "High-Speed WiFi", icon: "Wifi" },
      { id: "pool", name: "Infinity Pool", icon: "Waves" },
      { id: "breakfast", name: "Artisan Breakfast", icon: "Coffee" },
      { id: "ac", name: "Climate Control", icon: "Wind" },
      { id: "view", name: "Ocean Panorama", icon: "Eye" },
      { id: "parking", name: "Valet Parking", icon: "Car" },
      { id: "spa", name: "Private Spa", icon: "Sparkles" }
    ],
    host: {
      name: "Matteo Rossi",
      role: "Superhost · 7 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "Within 15 mins"
    },
    specs: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2
    },
    reviews: [
      {
        id: "rev-1",
        author: "Sophie Laurent",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "May 2024",
        comment: "The most magical getaway of our lives. The sunsets over Positano from the private terrace are completely unmatched!"
      },
      {
        id: "rev-2",
        author: "David Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "April 2024",
        comment: "Matteo was an incredible host. The private boat ride to Capri arranged for us was an unforgettable highlight."
      }
    ]
  },
  {
    id: "dest-2",
    title: "Santorini Azure Horizon Villa",
    location: "Oia, Santorini, Greece",
    country: "Greece",
    category: "Beach",
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    rating: 4.98,
    reviewsCount: 236,
    price: 450,
    discountPrice: 410,
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Nestled high into the caldera cliffs of Oia, Azure Horizon is the quintessential Greek island sanctuary. Whitewashed walls, cobalt blue dome backdrops, and an open-air heated plunge pool facing the world-famous Aegean sunset. Wake up to fresh Greek pastries and fresh-squeezed citrus delivered right to your balcony.",
    amenities: [
      { id: "wifi", name: "Fast WiFi", icon: "Wifi" },
      { id: "pool", name: "Heated Plunge Pool", icon: "Waves" },
      { id: "breakfast", name: "Gourmet Breakfast", icon: "Coffee" },
      { id: "view", name: "Caldera Sunset View", icon: "Eye" },
      { id: "bar", name: "Wine Tasting Bar", icon: "Wine" }
    ],
    host: {
      name: "Eleni Kyriakos",
      role: "Superhost · 5 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      responseRate: "99%",
      responseTime: "Within 30 mins"
    },
    specs: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1
    },
    reviews: [
      {
        id: "rev-3",
        author: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "June 2024",
        comment: "Breathtaking views without the tourist crowd directly in front. Absolute bliss and total privacy."
      }
    ]
  },
  {
    id: "dest-3",
    title: "Matterhorn Alpine Glass Chalet",
    location: "Zermatt, Switzerland",
    country: "Switzerland",
    category: "Mountain",
    isFeatured: false,
    isPopular: true,
    isTrending: false,
    rating: 4.91,
    reviewsCount: 142,
    price: 520,
    discountPrice: 470,
    imageUrl: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Architect-designed alpine luxury with floor-to-ceiling panoramic glass panes looking directly towards the Matterhorn peak. Features a Finnish cedarwood sauna, an indoor roaring stone fireplace, heated ski equipment room, and private ski-in/ski-out trail access.",
    amenities: [
      { id: "fireplace", name: "Stone Fireplace", icon: "Flame" },
      { id: "sauna", name: "Cedar Sauna", icon: "Sparkles" },
      { id: "ski", name: "Ski-in / Ski-out", icon: "Compass" },
      { id: "wifi", name: "Gigabit Fiber", icon: "Wifi" },
      { id: "breakfast", name: "Swiss Fondue Kit", icon: "Coffee" }
    ],
    host: {
      name: "Lukas Weber",
      role: "Master Host · 9 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "Within 10 mins"
    },
    specs: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      baths: 3
    },
    reviews: [
      {
        id: "rev-4",
        author: "Emma Watson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "January 2024",
        comment: "Watching the sunrise hit the peak of the Matterhorn from bed is something I will cherish forever."
      }
    ]
  },
  {
    id: "dest-4",
    title: "Kyoto Bamboo Forest Sanctuary",
    location: "Arashiyama, Kyoto, Japan",
    country: "Japan",
    category: "Historic",
    isFeatured: false,
    isPopular: true,
    isTrending: true,
    rating: 4.96,
    reviewsCount: 165,
    price: 290,
    discountPrice: 260,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A 200-year-old traditional Sukiya-zukuri machiya restored to sublime modern comfort. Borders the Arashiyama bamboo forest with private cypress hinoki soaking onsen baths, tatami tea ceremony room, and peaceful private moss garden.",
    amenities: [
      { id: "bath", name: "Hinoki Onsen", icon: "Waves" },
      { id: "tea", name: "Tea Ceremony", icon: "Coffee" },
      { id: "garden", name: "Zen Moss Garden", icon: "Sparkles" },
      { id: "wifi", name: "Fast WiFi", icon: "Wifi" },
      { id: "ac", name: "Air Conditioning", icon: "Wind" }
    ],
    host: {
      name: "Kenji & Mai Sato",
      role: "Superhost · 8 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "Within an hour"
    },
    specs: {
      guests: 3,
      bedrooms: 2,
      beds: 3,
      baths: 1
    },
    reviews: [
      {
        id: "rev-5",
        author: "Chloe Dubois",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "March 2024",
        comment: "A tranquil paradise. Hearing the bamboo rustle in the gentle wind while soaking in the hinoki bath was divine."
      }
    ]
  },
  {
    id: "dest-5",
    title: "Ubud Rainforest Infinity Haven",
    location: "Ubud, Bali, Indonesia",
    country: "Indonesia",
    category: "Luxury",
    isFeatured: false,
    isPopular: true,
    isTrending: true,
    rating: 4.89,
    reviewsCount: 310,
    price: 240,
    discountPrice: 199,
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Suspended amidst the emerald canopy of the Ayung River valley, this multi-tier bamboo pavilion offers an open-air infinity pool hovering over lush tropical greenery, daily morning yoga pavilion sessions, and farm-to-table organic dining.",
    amenities: [
      { id: "pool", name: "Jungle Infinity Pool", icon: "Waves" },
      { id: "yoga", name: "Yoga Pavilion", icon: "Sparkles" },
      { id: "breakfast", name: "Floating Breakfast", icon: "Coffee" },
      { id: "wifi", name: "Starlink WiFi", icon: "Wifi" },
      { id: "spa", name: "Balinese Massage", icon: "Sparkles" }
    ],
    host: {
      name: "Wayan Sudarma",
      role: "Superhost · 6 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "Within 20 mins"
    },
    specs: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1
    },
    reviews: [
      {
        id: "rev-6",
        author: "Oliver Bennett",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "May 2024",
        comment: "The floating breakfast experience overlooking the jungle mist was simply extraordinary!"
      }
    ]
  },
  {
    id: "dest-6",
    title: "Bora Bora Lagoon Coral Overwater Bungalow",
    location: "Bora Bora, French Polynesia",
    country: "French Polynesia",
    category: "Luxury",
    isFeatured: false,
    isPopular: false,
    isTrending: true,
    rating: 4.99,
    reviewsCount: 92,
    price: 890,
    discountPrice: 780,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Glass floor viewing portals right under your bed to observe marine life, direct ladder access into turquoise turquoise lagoons, and private deck dining under the star-studded South Pacific skies.",
    amenities: [
      { id: "snorkeling", name: "Snorkel Gear Included", icon: "Waves" },
      { id: "roomservice", name: "Canoe Breakfast Delivery", icon: "Coffee" },
      { id: "view", name: "Direct Lagoon Access", icon: "Eye" },
      { id: "ac", name: "Full A/C", icon: "Wind" }
    ],
    host: {
      name: "Moana Teiki",
      role: "Luxury Concierge",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "Immediate"
    },
    specs: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1
    },
    reviews: [
      {
        id: "rev-7",
        author: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        rating: 5,
        date: "February 2024",
        comment: "Unreal clarity in the water and unbelievable luxury. Worth every single cent."
      }
    ]
  },
  {
    id: "dest-7",
    title: "Reykjavik Aurora Geothermal Dome",
    location: "Golden Circle, Iceland",
    country: "Iceland",
    category: "Mountain",
    isFeatured: false,
    isPopular: true,
    isTrending: false,
    rating: 4.88,
    reviewsCount: 118,
    price: 340,
    discountPrice: 295,
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sleep beneath the Northern Lights in an insulated glass dome with natural geothermal underfloor heating, an outdoor geothermal hot tub, and private telescopes for stargazing.",
    amenities: [
      { id: "hottub", name: "Geothermal Hot Tub", icon: "Waves" },
      { id: "telescope", name: "Stargazing Telescope", icon: "Eye" },
      { id: "wifi", name: "Fiber Internet", icon: "Wifi" },
      { id: "breakfast", name: "Nordic Breakfast", icon: "Coffee" }
    ],
    host: {
      name: "Jon Sigurdsson",
      role: "Superhost · 4 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      responseRate: "98%",
      responseTime: "Within 45 mins"
    },
    specs: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1
    },
    reviews: []
  },
  {
    id: "dest-8",
    title: "Marrakech Riad Secret Garden",
    location: "Medina, Marrakech, Morocco",
    country: "Morocco",
    category: "Historic",
    isFeatured: false,
    isPopular: false,
    isTrending: true,
    rating: 4.92,
    reviewsCount: 177,
    price: 210,
    discountPrice: 180,
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An authentic 17th-century riad located within Marrakech's ancient Medina walls. Intricate Moroccan zellige tilework, handcrafted cedar doors, a serene courtyard orange blossom fountain, and a rooftop plunge pool overlooking the Atlas Mountains.",
    amenities: [
      { id: "hammam", name: "Private Hammam", icon: "Sparkles" },
      { id: "pool", name: "Rooftop Plunge Pool", icon: "Waves" },
      { id: "tea", name: "Mint Tea & Pastries", icon: "Coffee" },
      { id: "wifi", name: "Fast WiFi", icon: "Wifi" }
    ],
    host: {
      name: "Nadia Benali",
      role: "Superhost · 10 yrs hosting",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "Within 15 mins"
    },
    specs: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2
    },
    reviews: []
  }
];

export const CATEGORIES = [
  { id: "all", label: "All", icon: "Compass" },
  { id: "trending", label: "Trending", icon: "Flame" },
  { id: "beach", label: "Beach", icon: "Palmtree" },
  { id: "mountain", label: "Mountain", icon: "Mountain" },
  { id: "historic", label: "Historic", icon: "Landmark" },
  { id: "luxury", label: "Luxury", icon: "Sparkles" },
];

export const USER_PROFILE = {
  name: "Alex",
  fullName: "Alex Morgan",
  email: "alex.morgan@travella.app",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  savedTripsCount: 12,
  completedTripsCount: 8,
  passportCountry: "United States",
  membershipTier: "Travella Explorer Plus",
  points: "14,850 pts",
  preferences: ["Scenic Views", "Private Pools", "Gourmet Breakfast", "Fast WiFi"]
};
