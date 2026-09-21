import 'package:flutter/material.dart';
import '../state/app_state.dart';
import '../constants/colors.dart';

class ProfileScreen extends StatefulWidget {
  final AppState appState;

  const ProfileScreen({super.key, required this.appState});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _pushNotifications = true;
  String _selectedCurrency = 'USD (\$)';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: TravellaColors.background,
      appBar: AppBar(
        title: const Text(
          'Profile',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 20, color: TravellaColors.darkText),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
        child: Column(
          children: [
            // User Header
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: TravellaColors.border),
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: TravellaColors.primary, width: 3),
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
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(
                            color: TravellaColors.online,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.check, size: 12, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Alex Morgan',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: TravellaColors.darkText),
                  ),
                  const SizedBox(height: 2),
                  const Text(
                    'alex.morgan@travella.app',
                    style: TextStyle(color: TravellaColors.muted, fontSize: 13),
                  ),
                  const SizedBox(height: 14),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: TravellaColors.badge,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'Travella Explorer Member',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: TravellaColors.primary),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Stats row
            Container(
              padding: const EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
                border: Border.all(color: TravellaColors.border),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _statItem('${widget.appState.savedCount}', 'Saved Stays'),
                  _statItem('${widget.appState.bookingsCount}', 'Trips Booked'),
                  _statItem('1,240', 'Travella Pts'),
                ],
              ),
            ),
            const SizedBox(height: 18),

            // Settings list
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
                border: Border.all(color: TravellaColors.border),
              ),
              child: Column(
                children: [
                  SwitchListTile(
                    title: const Text('Push Notifications', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    subtitle: const Text('Deal alerts and trip updates', style: TextStyle(fontSize: 12, color: TravellaColors.muted)),
                    value: _pushNotifications,
                    activeTrackColor: TravellaColors.primary,
                    onChanged: (val) {
                      setState(() => _pushNotifications = val);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(val ? 'Notifications enabled' : 'Notifications muted'),
                          duration: const Duration(seconds: 1),
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    },
                  ),
                  const Divider(color: TravellaColors.border, height: 1),
                  ListTile(
                    title: const Text('Currency', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    trailing: DropdownButton<String>(
                      value: _selectedCurrency,
                      underline: const SizedBox(),
                      items: ['USD (\$)', 'EUR (€)', 'GBP (£)'].map((curr) {
                        return DropdownMenuItem(value: curr, child: Text(curr, style: const TextStyle(fontSize: 13)));
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedCurrency = val);
                      },
                    ),
                  ),
                  const Divider(color: TravellaColors.border, height: 1),
                  ListTile(
                    title: const Text('Payment Methods', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    subtitle: const Text('Apple Pay · Visa ending 4242', style: TextStyle(fontSize: 12, color: TravellaColors.muted)),
                    trailing: const Icon(Icons.chevron_right, color: TravellaColors.muted),
                    onTap: () {},
                  ),
                  const Divider(color: TravellaColors.border, height: 1),
                  ListTile(
                    title: const Text('Support & Help Center', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    trailing: const Icon(Icons.chevron_right, color: TravellaColors.muted),
                    onTap: () {},
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Sign out button
            TextButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Signed out of demo session.'),
                    duration: Duration(seconds: 1),
                    behavior: SnackBarBehavior.floating,
                  ),
                );
              },
              child: const Text(
                'Log Out',
                style: TextStyle(color: TravellaColors.heart, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _statItem(String count, String label) {
    return Column(
      children: [
        Text(count, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: TravellaColors.darkText)),
        const SizedBox(height: 2),
        Text(label, style: const TextStyle(fontSize: 11, color: TravellaColors.muted)),
      ],
    );
  }
}
