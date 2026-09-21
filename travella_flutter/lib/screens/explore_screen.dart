import 'package:flutter/material.dart';
import '../state/app_state.dart';
import '../constants/colors.dart';
import '../widgets/search_bar_widget.dart';
import '../widgets/category_chips.dart';
import '../widgets/destination_card.dart';
import '../widgets/filter_sheet.dart';
import 'details_screen.dart';

class ExploreScreen extends StatefulWidget {
  final AppState appState;

  const ExploreScreen({super.key, required this.appState});

  @override
  State<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> {
  bool _isGrid = false;

  void _openDetails(BuildContext context, String id) {
    final dest = widget.appState.filteredDestinations.firstWhere((d) => d.id == id);
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => DetailsScreen(
          destination: dest,
          appState: widget.appState,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final list = widget.appState.filteredDestinations;

    return Scaffold(
      backgroundColor: TravellaColors.background,
      appBar: AppBar(
        title: const Text(
          'Explore Stays',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 20, color: TravellaColors.darkText),
        ),
        actions: [
          IconButton(
            icon: Icon(_isGrid ? Icons.view_list_rounded : Icons.grid_view_rounded),
            onPressed: () => setState(() => _isGrid = !_isGrid),
            tooltip: _isGrid ? 'Switch to List' : 'Switch to Grid',
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          // Search & Filter Bar
          TravellaSearchBar(
            searchQuery: widget.appState.searchQuery,
            onSearchChanged: widget.appState.setSearchQuery,
            onFilterTap: () => FilterSheet.show(context, widget.appState),
            activeFilterCount: widget.appState.activeFilterCount,
          ),
          const SizedBox(height: 10),

          // Category Chips
          CategoryChips(
            selectedCategory: widget.appState.selectedCategory,
            onSelectCategory: widget.appState.setSelectedCategory,
          ),
          const SizedBox(height: 8),

          // Results count
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              children: [
                Text(
                  '${list.length} stays found',
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: TravellaColors.muted,
                  ),
                ),
              ],
            ),
          ),

          // Results List / Grid
          Expanded(
            child: list.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.travel_explore, size: 48, color: TravellaColors.muted),
                        const SizedBox(height: 12),
                        const Text(
                          'No places match your criteria',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Try clearing your search query or reset filters',
                          style: TextStyle(color: TravellaColors.muted, fontSize: 13),
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton(
                          onPressed: () => widget.appState.resetFilters(),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: TravellaColors.primary,
                            foregroundColor: Colors.white,
                          ),
                          child: const Text('Reset All Filters'),
                        ),
                      ],
                    ),
                  )
                : _isGrid
                    ? GridView.builder(
                        padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.72,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                        ),
                        itemCount: list.length,
                        itemBuilder: (context, index) {
                          final item = list[index];
                          return DestinationCard(
                            destination: item,
                            layout: DestinationCardLayout.vertical,
                            isSaved: widget.appState.isSaved(item.id),
                            onToggleSave: () => widget.appState.toggleSave(item.id),
                            onTap: () => _openDetails(context, item.id),
                          );
                        },
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                        itemCount: list.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 12),
                        itemBuilder: (context, index) {
                          final item = list[index];
                          return DestinationCard(
                            destination: item,
                            isSaved: widget.appState.isSaved(item.id),
                            onToggleSave: () => widget.appState.toggleSave(item.id),
                            onTap: () => _openDetails(context, item.id),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
