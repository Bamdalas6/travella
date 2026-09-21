import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/booking.dart';
import '../state/app_state.dart';
import '../constants/colors.dart';

class BookingsScreen extends StatelessWidget {
  final AppState appState;

  const BookingsScreen({super.key, required this.appState});

  void _showBoardingPass(BuildContext context, BookingRecord booking) {
    final dateFormat = DateFormat('MMM dd, yyyy');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(Icons.flight_takeoff_rounded, color: TravellaColors.primary, size: 22),
                SizedBox(width: 8),
                Text(
                  'Digital Stay Voucher',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: TravellaColors.darkText),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: TravellaColors.badgeSoft,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: TravellaColors.primary.withValues(alpha: 0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        booking.id,
                        style: const TextStyle(fontWeight: FontWeight.w800, color: TravellaColors.primary, fontSize: 14),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: TravellaColors.online.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text(
                          'CONFIRMED',
                          style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: TravellaColors.online),
                        ),
                      ),
                    ],
                  ),
                  const Divider(color: TravellaColors.border, height: 20),
                  Text(
                    booking.destination.title,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    booking.destination.location,
                    style: const TextStyle(color: TravellaColors.muted, fontSize: 12),
                  ),
                  const SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _voucherInfo('CHECK-IN', dateFormat.format(booking.checkInDate)),
                      _voucherInfo('CHECK-OUT', dateFormat.format(booking.checkOutDate)),
                      _voucherInfo('GUESTS', '${booking.guestsCount} Persons'),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _voucherInfo('PRIMARY GUEST', booking.guestName),
                      _voucherInfo('PAYMENT', booking.paymentMethod == 'apple-pay' ? 'Apple Pay' : 'Card'),
                      _voucherInfo('TOTAL', '\$${booking.total}'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.of(ctx).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Voucher downloaded & saved to device!'),
                      backgroundColor: TravellaColors.primary,
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: TravellaColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: const Text('Download Pass / Voucher', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _voucherInfo(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: TravellaColors.muted)),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: TravellaColors.darkText)),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final bookings = appState.bookings;
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Scaffold(
      backgroundColor: TravellaColors.background,
      appBar: AppBar(
        title: Text(
          'My Bookings (${bookings.length})',
          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 20, color: TravellaColors.darkText),
        ),
      ),
      body: bookings.isEmpty
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.luggage_outlined, size: 48, color: TravellaColors.muted),
                    const SizedBox(height: 16),
                    const Text('No bookings yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 6),
                    const Text(
                      'Your upcoming trips and reservations will appear here.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: TravellaColors.muted, fontSize: 13),
                    ),
                  ],
                ),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
              itemCount: bookings.length,
              separatorBuilder: (_, __) => const SizedBox(height: 14),
              itemBuilder: (context, index) {
                final item = bookings[index];

                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(22),
                    border: Border.all(color: TravellaColors.border),
                    boxShadow: const [
                      BoxShadow(
                        color: Color.fromRGBO(12, 16, 20, 0.04),
                        blurRadius: 16,
                        offset: Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(14),
                            child: Image.network(
                              item.destination.imageUrl,
                              width: 72,
                              height: 72,
                              fit: BoxFit.cover,
                            ),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: TravellaColors.badge,
                                        borderRadius: BorderRadius.circular(6),
                                      ),
                                      child: Text(
                                        item.id,
                                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: TravellaColors.primary),
                                      ),
                                    ),
                                    Text(
                                      '\$${item.total}',
                                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: TravellaColors.darkText),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  item.destination.title,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  '${dateFormat.format(item.checkInDate)} – ${dateFormat.format(item.checkOutDate)}',
                                  style: const TextStyle(fontSize: 12, color: TravellaColors.muted),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const Divider(color: TravellaColors.border, height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            '${item.nights} nights · ${item.guestsCount} guests',
                            style: const TextStyle(fontSize: 12, color: TravellaColors.muted, fontWeight: FontWeight.w600),
                          ),
                          TextButton(
                            onPressed: () => _showBoardingPass(context, item),
                            child: const Text(
                              'View Voucher →',
                              style: TextStyle(fontWeight: FontWeight.bold, color: TravellaColors.primary, fontSize: 13),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
