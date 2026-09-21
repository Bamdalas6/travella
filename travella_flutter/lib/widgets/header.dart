import 'package:flutter/material.dart';
import '../constants/colors.dart';

class TravellaHeader extends StatelessWidget {
  final VoidCallback onProfileTap;
  final Function(String) onDestinationSelect;

  const TravellaHeader({
    super.key,
    required this.onProfileTap,
    required this.onDestinationSelect,
  });

  void _showNotificationsDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        backgroundColor: Colors.white,
        title: Row(
          children: const [
            Icon(Icons.notifications_active, color: TravellaColors.primary, size: 22),
            SKeyWidth(8),
            Text(
              'Notifications',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: TravellaColors.darkText,
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _notificationTile(
              context,
              icon: Icons.local_offer,
              iconColor: TravellaColors.primary,
              title: '20% Promo Applied',
              subtitle: 'Use TRAVELLA20 on your next booking.',
              destId: 'dest-1',
            ),
            const Divider(color: TravellaColors.border, height: 16),
            _notificationTile(
              context,
              icon: Icons.hotel,
              iconColor: Colors.orange,
              title: 'Villa Bellissima Updated',
              subtitle: 'New dates opened up for next week.',
              destId: 'dest-1',
            ),
            const Divider(color: TravellaColors.border, height: 16),
            _notificationTile(
              context,
              icon: Icons.check_circle,
              iconColor: TravellaColors.online,
              title: 'Reservation Confirmed',
              subtitle: 'Your Lake Como stay is coming up soon.',
              destId: 'dest-2',
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Close', style: TextStyle(color: TravellaColors.primary, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _notificationTile(
    BuildContext context, {
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required String destId,
  }) {
    return InkWell(
      onTap: () {
        Navigator.of(context).pop();
        onDestinationSelect(destId);
      },
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: iconColor.withValues(alpha: 0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, size: 18, color: iconColor),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: TravellaColors.darkText,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: TravellaColors.muted,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Greeting text
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                'Good morning,',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                  color: TravellaColors.muted,
                  letterSpacing: -0.2,
                ),
              ),
              SizedBox(height: 2),
              Text(
                'Alex 👋',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: TravellaColors.darkText,
                  letterSpacing: -0.5,
                ),
              ),
            ],
          ),

          // Actions: Notification bell + Avatar
          Row(
            children: [
              // Notification Bell
              Stack(
                clipBehavior: Clip.none,
                children: [
                  Material(
                    color: Colors.white,
                    shape: const CircleBorder(),
                    elevation: 0,
                    child: InkWell(
                      customBorder: const CircleBorder(),
                      onTap: () => _showNotificationsDialog(context),
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: TravellaColors.border, width: 1),
                        ),
                        child: const Icon(
                          Icons.notifications_outlined,
                          size: 20,
                          color: TravellaColors.darkText,
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 2,
                    right: 2,
                    child: Container(
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: TravellaColors.primary,
                        shape: BoxShape.circle,
                        border: Border.fromBorderSide(
                          BorderSide(color: Colors.white, width: 2),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 12),

              // Profile Avatar
              GestureDetector(
                onTap: onProfileTap,
                child: Stack(
                  clipBehavior: Clip.none,
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: TravellaColors.primary.withValues(alpha: 0.3), width: 2),
                        image: const DecorationImage(
                          image: NetworkImage(
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                          ),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        width: 12,
                        height: 12,
                        decoration: BoxDecoration(
                          color: TravellaColors.online,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 2),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class SKeyWidth extends StatelessWidget {
  final double width;
  const SKeyWidth(this.width, {super.key});
  @override
  Widget build(BuildContext context) => SizedBox(width: width);
}
