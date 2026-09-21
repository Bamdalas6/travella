import 'package:flutter/material.dart';
import '../constants/colors.dart';

class TravellaBottomNav extends StatelessWidget {
  final int activeIndex;
  final ValueChanged<int> onTabSelected;
  final int savedCount;
  final int bookingsCount;

  const TravellaBottomNav({
    super.key,
    required this.activeIndex,
    required this.onTabSelected,
    required this.savedCount,
    required this.bookingsCount,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: const Border(top: BorderSide(color: TravellaColors.border, width: 1)),
        boxShadow: const [
          BoxShadow(
            color: Color.fromRGBO(12, 16, 20, 0.05),
            blurRadius: 16,
            offset: Offset(0, -4),
          ),
        ],
      ),
      padding: EdgeInsets.only(
        top: 10,
        bottom: MediaQuery.of(context).padding.bottom > 0 ? MediaQuery.of(context).padding.bottom : 12,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _navItem(0, Icons.home_rounded, 'Home'),
          _navItem(1, Icons.explore_rounded, 'Explore'),
          _navItem(2, Icons.favorite_rounded, 'Saved', badgeCount: savedCount),
          _navItem(3, Icons.confirmation_number_rounded, 'Bookings', badgeCount: bookingsCount),
          _navItem(4, Icons.person_rounded, 'Profile'),
        ],
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label, {int badgeCount = 0}) {
    final isSelected = activeIndex == index;

    return GestureDetector(
      onTap: () => onTabSelected(index),
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Icon(
                  icon,
                  size: 24,
                  color: isSelected ? TravellaColors.primary : TravellaColors.muted,
                ),
                if (badgeCount > 0)
                  Positioned(
                    top: -4,
                    right: -6,
                    child: Container(
                      padding: const EdgeInsets.all(3),
                      decoration: const BoxDecoration(
                        color: TravellaColors.heart,
                        shape: BoxShape.circle,
                      ),
                      constraints: const BoxConstraints(minWidth: 14, minHeight: 14),
                      child: Center(
                        child: Text(
                          '$badgeCount',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 9,
                            fontWeight: FontWeight.bold,
                            height: 1,
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? TravellaColors.primary : TravellaColors.muted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
