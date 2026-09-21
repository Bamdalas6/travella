import '../models/destination.dart';
import '../models/category.dart';
import '../models/booking.dart';

class MockData {
  static const List<CategoryItem> categories = [
    CategoryItem(id: 'all', label: 'All', icon: '✨'),
    CategoryItem(id: 'trending', label: 'Trending', icon: '🔥'),
    CategoryItem(id: 'beach', label: 'Beach', icon: '🏖️'),
    CategoryItem(id: 'mountain', label: 'Mountain', icon: '⛰️'),
    CategoryItem(id: 'historic', label: 'Historic', icon: '🏛️'),
    CategoryItem(id: 'luxury', label: 'Luxury', icon: '👑'),
  ];

  static final List<Destination> destinations = [
    Destination(
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
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "pool", name: "Infinity Pool", icon: "waves"),
        Amenity(id: "breakfast", name: "Artisan Breakfast", icon: "coffee"),
        Amenity(id: "ac", name: "Climate Control", icon: "wind"),
        Amenity(id: "view", name: "Ocean Panorama", icon: "remove_red_eye"),
        Amenity(id: "parking", name: "Valet Parking", icon: "directions_car"),
        Amenity(id: "spa", name: "Private Spa", icon: "auto_awesome")
      ],
      host: const Host(
        name: "Matteo Rossi",
        role: "Superhost · 7 yrs hosting",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        responseRate: "100%",
        responseTime: "Within 15 mins"
      ),
      specs: const Specs(
        guests: 4,
        bedrooms: 2,
        beds: 2,
        baths: 2
      ),
      reviews: const [
        Review(
          id: "rev-1",
          author: "Sophie Laurent",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
          rating: 5.0,
          date: "May 2024",
          comment: "The most magical getaway of our lives. The sunsets over Positano from the private terrace are completely unmatched!"
        ),
        Review(
          id: "rev-2",
          author: "David Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
          rating: 5.0,
          date: "April 2024",
          comment: "Matteo was an incredible host. The private boat ride to Capri arranged for us was an unforgettable highlight."
        )
      ]
    ),
    Destination(
      id: "dest-2",
      title: "Grand Hotel Tremezzo Suite",
      location: "Lake Como, Italy",
      country: "Italy",
      category: "Luxury",
      isFeatured: false,
      isPopular: true,
      isTrending: true,
      rating: 4.98,
      reviewsCount: 246,
      price: 590,
      discountPrice: 480,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Step into authentic Italian Belle Époque glamour with bespoke silk furnishings, a private panoramic balcony framing Bellagio, and exclusive access to the iconic floating pool on Lake Como.",
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "pool", name: "Floating Lake Pool", icon: "waves"),
        Amenity(id: "breakfast", name: "Champagne Breakfast", icon: "coffee"),
        Amenity(id: "ac", name: "Climate Control", icon: "wind"),
        Amenity(id: "view", name: "Lake Vista", icon: "remove_red_eye"),
        Amenity(id: "spa", name: "T Spa Access", icon: "auto_awesome")
      ],
      host: const Host(
        name: "Alessandra De Luca",
        role: "Concierge Lead · 12 yrs",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        responseRate: "99%",
        responseTime: "Within 5 mins"
      ),
      specs: const Specs(
        guests: 2,
        bedrooms: 1,
        beds: 1,
        baths: 1
      ),
      reviews: const [
        Review(
          id: "rev-3",
          author: "Marcus Vance",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
          rating: 5.0,
          date: "June 2024",
          comment: "Waking up to Lake Como right from bed is an experience beyond words. Exceptional service."
        )
      ]
    ),
    Destination(
      id: "dest-3",
      title: "Santorini Cave Villa",
      location: "Oia, Greece",
      country: "Greece",
      category: "Beach",
      isFeatured: false,
      isPopular: true,
      isTrending: false,
      rating: 4.92,
      reviewsCount: 310,
      price: 420,
      discountPrice: 350,
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Whitewashed cycladic architecture meets modern bohemian luxury. Features a private heated jacuzzi overlooking the submerged volcanic caldera and Aegean Sea sunsets.",
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "pool", name: "Caldera Jacuzzi", icon: "waves"),
        Amenity(id: "breakfast", name: "Greek Organic Breakfast", icon: "coffee"),
        Amenity(id: "view", name: "Caldera Sunset", icon: "remove_red_eye")
      ],
      host: const Host(
        name: "Nikos Papadakis",
        role: "Superhost · 5 yrs hosting",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        responseRate: "100%",
        responseTime: "Within 10 mins"
      ),
      specs: const Specs(
        guests: 3,
        bedrooms: 1,
        beds: 2,
        baths: 1
      ),
      reviews: const [
        Review(
          id: "rev-4",
          author: "Elena Rostova",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
          rating: 4.9,
          date: "July 2024",
          comment: "Best sunset views in all of Oia, far away from the crowded tourist paths."
        )
      ]
    ),
    Destination(
      id: "dest-4",
      title: "Kyoto Bamboo Machiya",
      location: "Kyoto, Japan",
      country: "Japan",
      category: "Historic",
      isFeatured: false,
      isPopular: true,
      isTrending: true,
      rating: 4.96,
      reviewsCount: 152,
      price: 290,
      discountPrice: 240,
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Restored 120-year-old traditional wooden townhouse with fragrant tatami mats, cypress wood soaking ofuro bath, and a private stone moss Zen garden.",
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "bath", name: "Hinoki Onsen Tub", icon: "waves"),
        Amenity(id: "tea", name: "Ceremonial Tea Set", icon: "coffee"),
        Amenity(id: "garden", name: "Zen Courtyard", icon: "yard")
      ],
      host: const Host(
        name: "Kenji Takahashi",
        role: "Cultural Preservationist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        responseRate: "98%",
        responseTime: "Within 30 mins"
      ),
      specs: const Specs(
        guests: 4,
        bedrooms: 2,
        beds: 3,
        baths: 1
      ),
      reviews: const []
    ),
    Destination(
      id: "dest-5",
      title: "Zermatt Alpine Chalet",
      location: "Zermatt, Switzerland",
      country: "Switzerland",
      category: "Mountain",
      isFeatured: false,
      isPopular: false,
      isTrending: true,
      rating: 4.88,
      reviewsCount: 98,
      price: 490,
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Direct ski-in / ski-out luxury chalet directly facing the iconic pyramid of the Matterhorn. Handcrafted pine interiors, roaring granite fireplace, and an outdoor cedar hot tub.",
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "fireplace", name: "Stone Fireplace", icon: "local_fire_department"),
        Amenity(id: "ski", name: "Ski Storage & Boot Dryer", icon: "downhill_skiing"),
        Amenity(id: "sauna", name: "Alpine Sauna", icon: "hot_tub")
      ],
      host: const Host(
        name: "Heidi Weber",
        role: "Ski Guide & Host",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        responseRate: "100%",
        responseTime: "Within 20 mins"
      ),
      specs: const Specs(
        guests: 6,
        bedrooms: 3,
        beds: 4,
        baths: 3
      ),
      reviews: const []
    ),
    Destination(
      id: "dest-6",
      title: "Ubud Valley Sanctuary",
      location: "Bali, Indonesia",
      country: "Indonesia",
      category: "Luxury",
      isFeatured: false,
      isPopular: true,
      isTrending: false,
      rating: 4.95,
      reviewsCount: 215,
      price: 260,
      discountPrice: 210,
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Open-concept bamboo architecture nestled in the lush tropical rainforest canopy of Ubud. Suspended infinity net bed, private river view, and daily yoga pavilion sessions.",
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "pool", name: "Canopy Pool", icon: "waves"),
        Amenity(id: "breakfast", name: "Vegan Superfood Bowls", icon: "coffee"),
        Amenity(id: "spa", name: "Holistic Spa", icon: "auto_awesome")
      ],
      host: const Host(
        name: "Wayan Sudarta",
        role: "Eco Architect",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        responseRate: "97%",
        responseTime: "Within 1 hour"
      ),
      specs: const Specs(
        guests: 2,
        bedrooms: 1,
        beds: 1,
        baths: 1
      ),
      reviews: const []
    ),
    Destination(
      id: "dest-7",
      title: "Reykjadalslaug Geothermal Lodge",
      location: "South Coast, Iceland",
      country: "Iceland",
      category: "Mountain",
      isFeatured: false,
      isPopular: false,
      isTrending: true,
      rating: 4.89,
      reviewsCount: 76,
      price: 340,
      discountPrice: 295,
      imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Glass-ceiling geodesic cabin designed for front-row views of the Aurora Borealis. Naturally fed geothermal hot spring pool right outside your bedroom door.",
      amenities: const [
        Amenity(id: "wifi", name: "Starlink WiFi", icon: "wifi"),
        Amenity(id: "pool", name: "Natural Hot Springs", icon: "hot_tub"),
        Amenity(id: "view", name: "Northern Lights Glass Roof", icon: "remove_red_eye"),
        Amenity(id: "parking", name: "4WD Parking", icon: "directions_car")
      ],
      host: const Host(
        name: "Gunnar Sigurdsson",
        role: "Aurora Expedition Guide",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        responseRate: "100%",
        responseTime: "Within 15 mins"
      ),
      specs: const Specs(
        guests: 2,
        bedrooms: 1,
        beds: 1,
        baths: 1
      ),
      reviews: const []
    ),
    Destination(
      id: "dest-8",
      title: "Tulum Bohemian Beach Casita",
      location: "Tulum, Mexico",
      country: "Mexico",
      category: "Beach",
      isFeatured: false,
      isPopular: true,
      isTrending: false,
      rating: 4.87,
      reviewsCount: 164,
      price: 310,
      discountPrice: 260,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Barefoot luxury steps from turquoise Caribbean waters. Chukum plaster walls, palapa thatched roofing, handmade macramé hammocks, and private plunge pool.",
      amenities: const [
        Amenity(id: "wifi", name: "High-Speed WiFi", icon: "wifi"),
        Amenity(id: "pool", name: "Private Plunge Pool", icon: "waves"),
        Amenity(id: "breakfast", name: "Tropical Breakfast", icon: "coffee"),
        Amenity(id: "ac", name: "Eco AC", icon: "wind")
      ],
      host: const Host(
        name: "Mariana Morales",
        role: "Superhost · 4 yrs hosting",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        responseRate: "99%",
        responseTime: "Within 20 mins"
      ),
      specs: const Specs(
        guests: 3,
        bedrooms: 1,
        beds: 2,
        baths: 1
      ),
      reviews: const []
    ),
  ];

  static final List<BookingRecord> initialBookings = [
    BookingRecord(
      id: 'TRV-74892-IT',
      destination: destinations[0],
      nights: 4,
      guestsCount: 2,
      checkInDate: DateTime(2024, 10, 15),
      checkOutDate: DateTime(2024, 10, 19),
      total: 1395,
      paymentMethod: 'apple-pay',
      guestName: 'Alex Morgan',
      guestEmail: 'alex.morgan@travella.app',
      createdAt: DateTime(2024, 9, 18),
    ),
  ];
}
