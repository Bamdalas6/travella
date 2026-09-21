import 'package:flutter/material.dart';
import '../state/app_state.dart';
import '../widgets/header.dart';
import '../widgets/search_bar_widget.dart';
import '../widgets/category_chips.dart';
import '../widgets/featured_card.dart';
import '../widgets/destination_card.dart';
import '../widgets/special_offers.dart';
import '../widgets/filter_sheet.dart';
import '../constants/colors.dart';
import 'details_screen.dart';

class HomeScreen extends StatelessWidget {
  final AppState appState;

  const HomeScreen({super.key, required this.appState});

  void _openDetails(BuildContext context, String destinationId) {
    final destination = appState.filteredDestinations.firstWhere(
      (d) => d.id == destinationId,
      orElse: () => MockDataPlaceholder.getById(appState, destinationId),
    );
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => DetailsScreen(
          destination: destination,
          appState: appState,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final featured = appState.featuredDestination;
    final popular = appState.popularDestinations;

    return Scaffold(
      backgroundColor: TravellaColors.background,
      body: SafeArea(
        bottom: false,
        child: RefreshIndicator(
          onRefresh: () async {
            appState.resetFilters();
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top Header: Greeting, Notifications, Profile
                TravellaHeader(
                  onProfileTap: () => appState.setActiveTab(4),
                  onDestinationSelect: (id) => _openDetails(context, id),
                ),

                // Search & Filter Bar
                TravellaSearchBar(
                  searchQuery: appState.searchQuery,
                  onSearchChanged: appState.setSearchQuery,
                  onFilterTap: () => FilterSheet.show(context, appState),
                  activeFilterCount: appState.activeFilterCount,
                ),
                const SizedBox(height: 12),

                // Category Filter Chips
                CategoryChips(
                  selectedCategory: appState.selectedCategory,
                  onSelectCategory: appState.setSelectedCategory,
                ),
                const SizedBox(height: 8),

                // Featured Hero Destination
                if (featured != null)
                  FeaturedCard(
                    destination: featured,
                    isSaved: appState.isSaved(featured.id),
                    onToggleSave: () {
                      final saved = appState.toggleSave(featured.id);
                      _showToast(context, saved ? 'Saved to wishlist ❤️' : 'Removed from wishlist');
                    },
                    onTap: () => _openDetails(context, featured.id),
                  ),

                // Special Offers Banner
                const SpecialOffers(),

                // Popular Destinations Section
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 10, 20, 12),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Popular Destinations',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                          color: TravellaColors.darkText,
                          letterSpacing: -0.3,
                        ),
                      ),
                      TextButton(
                        onPressed: () => appState.setActiveTab(1), // Go to Explore
                        child: Row(
                          children: const [
                            Text(
                              'See all',
                              style: TextStyle(
                                color: TravellaColors.primary,
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            SizedBox(width: 4),
                            Icon(Icons.arrow_forward_rounded, size: 14, color: TravellaColors.primary),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                // Popular Destination List
                if (popular.isEmpty && featured == null)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: TravellaColors.border),
                      ),
                      child: Column(
                        children: [
                          const Text(
                            'No destinations match your criteria.',
                            style: TextStyle(color: TravellaColors.muted, fontSize: 13),
                          ),
                          const SizedBox(height: 8),
                          TextButton(
                            onPressed: () => appState.resetFilters(),
                            child: const Text('Reset filters', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  )
                else
                  ListView.separated(
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 30),
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: popular.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final item = popular[index];
                      return DestinationCard(
                        destination: item,
                        isSaved: appState.isSaved(item.id),
                        onToggleSave: () {
                          final saved = appState.toggleSave(item.id);
                          _showToast(context, saved ? 'Saved "${item.title}" ❤️' : 'Removed from saved');
                        },
                        onTap: () => _openDetails(context, item.id),
                      );
                    },
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _showToast(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}

class MockDataPlaceholder {
  static dynamic getById(AppState state, String id) {
    return state.filteredDestinations.isNotEmpty
        ? state.filteredDestinations.first
        : state.savedDestinations.first;
  }
}
