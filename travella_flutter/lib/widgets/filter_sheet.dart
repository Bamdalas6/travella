import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../state/app_state.dart';

class FilterSheet extends StatefulWidget {
  final AppState appState;

  const FilterSheet({super.key, required this.appState});

  static void show(BuildContext context, AppState appState) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => FilterSheet(appState: appState),
    );
  }

  @override
  State<FilterSheet> createState() => _FilterSheetState();
}

class _FilterSheetState extends State<FilterSheet> {
  late double _maxPrice;
  late String _category;
  late double _minRating;
  late Set<String> _amenities;

  final List<Map<String, String>> _availableAmenities = const [
    {'id': 'wifi', 'name': 'WiFi'},
    {'id': 'pool', 'name': 'Pool'},
    {'id': 'breakfast', 'name': 'Breakfast'},
    {'id': 'ac', 'name': 'AC'},
    {'id': 'view', 'name': 'Ocean View'},
    {'id': 'parking', 'name': 'Parking'},
    {'id': 'spa', 'name': 'Spa'},
  ];

  @override
  void initState() {
    super.initState();
    _maxPrice = widget.appState.filterMaxPrice;
    _category = widget.appState.filterCategory;
    _minRating = widget.appState.filterMinRating;
    _amenities = Set.from(widget.appState.filterAmenities);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.78,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          // Drag handle
          Center(
            child: Container(
              margin: const EdgeInsets.only(top: 10, bottom: 10),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Filters',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: TravellaColors.darkText,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    setState(() {
                      _maxPrice = 1000;
                      _category = 'all';
                      _minRating = 0;
                      _amenities.clear();
                    });
                  },
                  child: const Text(
                    'Reset all',
                    style: TextStyle(
                      color: TravellaColors.primary,
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(color: TravellaColors.border, height: 1),

          // Filter content
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: [
                // Price Range
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Max Price per Night',
                      style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                    ),
                    Text(
                      '\$${_maxPrice.toInt()}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        color: TravellaColors.primary,
                        fontSize: 15,
                      ),
                    ),
                  ],
                ),
                SliderTheme(
                  data: SliderTheme.of(context).copyWith(
                    activeTrackColor: TravellaColors.primary,
                    inactiveTrackColor: TravellaColors.badge,
                    thumbColor: TravellaColors.primary,
                    overlayColor: TravellaColors.primary.withValues(alpha: 0.15),
                  ),
                  child: Slider(
                    value: _maxPrice,
                    min: 150,
                    max: 1000,
                    divisions: 17,
                    onChanged: (val) => setState(() => _maxPrice = val),
                  ),
                ),
                const SizedBox(height: 20),

                // Category
                const Text(
                  'Category',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: ['all', 'beach', 'mountain', 'historic', 'luxury'].map((cat) {
                    final isSel = _category.toLowerCase() == cat.toLowerCase();
                    return ChoiceChip(
                      label: Text(
                        cat[0].toUpperCase() + cat.substring(1),
                        style: TextStyle(
                          color: isSel ? Colors.white : TravellaColors.darkText,
                          fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                          fontSize: 12,
                        ),
                      ),
                      selected: isSel,
                      selectedColor: TravellaColors.primary,
                      backgroundColor: TravellaColors.secondaryBg,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      onSelected: (selected) {
                        if (selected) setState(() => _category = cat);
                      },
                    );
                  }).toList(),
                ),
                const SizedBox(height: 20),

                // Rating
                const Text(
                  'Minimum Rating',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 8,
                  children: [0.0, 4.5, 4.8, 4.9].map((rating) {
                    final isSel = _minRating == rating;
                    final label = rating == 0.0 ? 'Any' : '★ $rating+';
                    return ChoiceChip(
                      label: Text(
                        label,
                        style: TextStyle(
                          color: isSel ? Colors.white : TravellaColors.darkText,
                          fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                          fontSize: 12,
                        ),
                      ),
                      selected: isSel,
                      selectedColor: TravellaColors.primary,
                      backgroundColor: TravellaColors.secondaryBg,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      onSelected: (selected) {
                        if (selected) setState(() => _minRating = rating);
                      },
                    );
                  }).toList(),
                ),
                const SizedBox(height: 20),

                // Amenities
                const Text(
                  'Amenities',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _availableAmenities.map((amenity) {
                    final id = amenity['id']!;
                    final isSel = _amenities.contains(id);
                    return FilterChip(
                      label: Text(
                        amenity['name']!,
                        style: TextStyle(
                          color: isSel ? Colors.white : TravellaColors.darkText,
                          fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                          fontSize: 12,
                        ),
                      ),
                      selected: isSel,
                      selectedColor: TravellaColors.primary,
                      backgroundColor: TravellaColors.secondaryBg,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      onSelected: (selected) {
                        setState(() {
                          if (selected) {
                            _amenities.add(id);
                          } else {
                            _amenities.remove(id);
                          }
                        });
                      },
                    );
                  }).toList(),
                ),
              ],
            ),
          ),

          // Bottom CTA
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
            child: SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                onPressed: () {
                  widget.appState.applyFilters(
                    maxPrice: _maxPrice,
                    category: _category,
                    minRating: _minRating,
                    amenities: _amenities,
                  );
                  Navigator.of(context).pop();
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: TravellaColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                  elevation: 0,
                ),
                child: const Text(
                  'Apply Filters',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
