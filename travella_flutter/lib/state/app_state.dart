import 'package:flutter/foundation.dart';
import '../models/destination.dart';
import '../models/booking.dart';
import '../data/mock_data.dart';

class AppState extends ChangeNotifier {
  final List<Destination> _allDestinations = List.from(MockData.destinations);
  final Set<String> _savedIds = {'dest-1', 'dest-2'};
  final List<BookingRecord> _bookings = List.from(MockData.initialBookings);

  int _activeTab = 0;
  String _searchQuery = '';
  String _selectedCategory = 'all';

  // Filters
  double _filterMaxPrice = 1000;
  String _filterCategory = 'all';
  double _filterMinRating = 0;
  final Set<String> _filterAmenities = {};

  // Getters
  int get activeTab => _activeTab;
  String get searchQuery => _searchQuery;
  String get selectedCategory => _selectedCategory;
  Set<String> get savedIds => _savedIds;
  List<BookingRecord> get bookings => List.unmodifiable(_bookings);
  double get filterMaxPrice => _filterMaxPrice;
  String get filterCategory => _filterCategory;
  double get filterMinRating => _filterMinRating;
  Set<String> get filterAmenities => _filterAmenities;

  int get savedCount => _savedIds.length;
  int get bookingsCount => _bookings.length;

  int get activeFilterCount {
    int count = 0;
    if (_filterMaxPrice < 1000) count++;
    if (_filterCategory != 'all') count++;
    if (_filterMinRating > 0) count++;
    if (_filterAmenities.isNotEmpty) count++;
    return count;
  }

  void setActiveTab(int index) {
    if (_activeTab != index) {
      _activeTab = index;
      notifyListeners();
    }
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setSelectedCategory(String category) {
    _selectedCategory = category;
    _filterCategory = category;
    notifyListeners();
  }

  bool isSaved(String id) => _savedIds.contains(id);

  bool toggleSave(String id) {
    bool saved;
    if (_savedIds.contains(id)) {
      _savedIds.remove(id);
      saved = false;
    } else {
      _savedIds.add(id);
      saved = true;
    }
    notifyListeners();
    return saved;
  }

  void applyFilters({
    required double maxPrice,
    required String category,
    required double minRating,
    required Set<String> amenities,
  }) {
    _filterMaxPrice = maxPrice;
    _filterCategory = category;
    _selectedCategory = category;
    _filterMinRating = minRating;
    _filterAmenities.clear();
    _filterAmenities.addAll(amenities);
    notifyListeners();
  }

  void resetFilters() {
    _filterMaxPrice = 1000;
    _filterCategory = 'all';
    _selectedCategory = 'all';
    _filterMinRating = 0;
    _filterAmenities.clear();
    _searchQuery = '';
    notifyListeners();
  }

  void addBooking(BookingRecord booking) {
    _bookings.insert(0, booking);
    notifyListeners();
  }

  List<Destination> get filteredDestinations {
    return _allDestinations.filterWith(
      query: _searchQuery,
      category: _filterCategory != 'all' ? _filterCategory : _selectedCategory,
      maxPrice: _filterMaxPrice,
      minRating: _filterMinRating,
      amenities: _filterAmenities,
    );
  }

  Destination? get featuredDestination {
    final list = filteredDestinations;
    try {
      return list.firstWhere((d) => d.isFeatured);
    } catch (_) {
      return list.isNotEmpty ? list.first : null;
    }
  }

  List<Destination> get popularDestinations {
    final featured = featuredDestination;
    final list = filteredDestinations;
    if (featured == null) return list;
    return list.where((d) => d.id != featured.id).toList();
  }

  List<Destination> get savedDestinations {
    return _allDestinations.where((d) => _savedIds.contains(d.id)).toList();
  }
}

extension DestinationFiltering on List<Destination> {
  List<Destination> filterWith({
    required String query,
    required String category,
    required double maxPrice,
    required double minRating,
    required Set<String> amenities,
  }) {
    return where((item) {
      // Search text match
      if (query.isNotEmpty) {
        final q = query.toLowerCase();
        final matchTitle = item.title.toLowerCase().contains(q);
        final matchLocation = item.location.toLowerCase().contains(q);
        final matchCountry = item.country.toLowerCase().contains(q);
        if (!matchTitle && !matchLocation && !matchCountry) return false;
      }

      // Category match
      if (category != 'all') {
        if (item.category.toLowerCase() != category.toLowerCase()) return false;
      }

      // Price match
      final effectivePrice = item.discountPrice ?? item.price;
      if (effectivePrice > maxPrice) return false;

      // Rating match
      if (minRating > 0 && item.rating < minRating) return false;

      // Amenities match
      if (amenities.isNotEmpty) {
        final itemAmenityIds = item.amenities.map((a) => a.id).toSet();
        for (final req in amenities) {
          if (!itemAmenityIds.contains(req)) return false;
        }
      }

      return true;
    }).toList();
  }
}
