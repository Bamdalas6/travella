import 'package:flutter/material.dart';
import '../state/app_state.dart';
import '../constants/colors.dart';
import '../widgets/destination_card.dart';
import 'details_screen.dart';

class SavedScreen extends StatelessWidget {
  final AppState appState;

  const SavedScreen({super.key, required this.appState});

  void _openDetails(BuildContext context, String id) {
    final dest = appState.savedDestinations.firstWhere((d) => d.id == id);
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => DetailsScreen(
          destination: dest,
          appState: appState,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final savedList = appState.savedDestinations;

    return Scaffold(
      backgroundColor: TravellaColors.background,
      appBar: AppBar(
        title: Text(
          'Saved Places (${savedList.length})',
          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 20, color: TravellaColors.darkText),
        ),
      ),
      body: savedList.isEmpty
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: TravellaColors.badge,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.favorite_border, size: 48, color: TravellaColors.primary),
                    ),
                    const SizedBox(height: 18),
                    const Text(
                      'No saved places yet',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: TravellaColors.darkText),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Tap the heart on any destination to save it to your wishlist.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: TravellaColors.muted, fontSize: 13),
                    ),
                    const SizedBox(height: 18),
                    ElevatedButton(
                      onPressed: () => appState.setActiveTab(1), // Go to explore
                      style: ElevatedButton.styleFrom(
                        backgroundColor: TravellaColors.primary,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      child: const Text('Explore Stays', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
              itemCount: savedList.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final item = savedList[index];
                return DestinationCard(
                  destination: item,
                  isSaved: true,
                  onToggleSave: () {
                    appState.toggleSave(item.id);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Removed "${item.title}" from saved'),
                        duration: const Duration(seconds: 1),
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
                  onTap: () => _openDetails(context, item.id),
                );
              },
            ),
    );
  }
}
