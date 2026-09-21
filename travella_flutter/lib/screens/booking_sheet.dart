import 'dart:math';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/destination.dart';
import '../models/booking.dart';
import '../state/app_state.dart';
import '../constants/colors.dart';

class BookingSheet extends StatefulWidget {
  final Destination destination;
  final AppState appState;
  final int nights;
  final int guestsCount;
  final DateTime checkInDate;
  final DateTime checkOutDate;
  final int total;

  const BookingSheet({
    super.key,
    required this.destination,
    required this.appState,
    required this.nights,
    required this.guestsCount,
    required this.checkInDate,
    required this.checkOutDate,
    required this.total,
  });

  static void show({
    required BuildContext context,
    required Destination destination,
    required AppState appState,
    required int nights,
    required int guestsCount,
    required DateTime checkInDate,
    required DateTime checkOutDate,
    required int total,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => BookingSheet(
        destination: destination,
        appState: appState,
        nights: nights,
        guestsCount: guestsCount,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        total: total,
      ),
    );
  }

  @override
  State<BookingSheet> createState() => _BookingSheetState();
}

class _BookingSheetState extends State<BookingSheet> {
  late final TextEditingController _nameController;
  late final TextEditingController _emailController;
  late final TextEditingController _promoController;

  String _paymentMethod = 'apple-pay';
  bool _isSubmitting = false;
  bool _promoApplied = false;
  String? _promoError;

  static const int cleaningFee = 60;
  static const int serviceFee = 45;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: 'Alex Morgan');
    _emailController = TextEditingController(text: 'alex.morgan@travella.app');
    _promoController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _promoController.dispose();
    super.dispose();
  }

  int get _staySubtotal => widget.destination.effectivePrice * widget.nights;

  int get _promoDiscount => _promoApplied ? (_staySubtotal * 0.20).round() : 0;

  int get _finalTotal => _staySubtotal + cleaningFee + serviceFee - _promoDiscount;

  void _applyPromo() {
    final code = _promoController.text.trim().toUpperCase();
    if (code == 'TRAVELLA20') {
      setState(() {
        _promoApplied = true;
        _promoError = null;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('🎉 20% discount applied successfully!'),
          backgroundColor: TravellaColors.primary,
          duration: Duration(seconds: 2),
        ),
      );
    } else {
      setState(() {
        _promoError = 'Invalid promo code. Try "TRAVELLA20"';
      });
    }
  }

  Future<void> _handleConfirmPayment() async {
    setState(() => _isSubmitting = true);

    await Future.delayed(const Duration(milliseconds: 1200));

    if (!mounted) return;

    final randomId = 'TRV-${Random().nextInt(89999) + 10000}-${widget.destination.country.substring(0, min(2, widget.destination.country.length)).toUpperCase()}';

    final newBooking = BookingRecord(
      id: randomId,
      destination: widget.destination,
      nights: widget.nights,
      guestsCount: widget.guestsCount,
      checkInDate: widget.checkInDate,
      checkOutDate: widget.checkOutDate,
      total: _finalTotal,
      paymentMethod: _paymentMethod,
      guestName: _nameController.text.trim(),
      guestEmail: _emailController.text.trim(),
      createdAt: DateTime.now(),
    );

    widget.appState.addBooking(newBooking);

    setState(() => _isSubmitting = false);

    Navigator.of(context).pop(); // Close sheet

    _showCelebrationDialog(newBooking);
  }

  void _showCelebrationDialog(BookingRecord booking) {
    final dateFormat = DateFormat('MMM dd, yyyy');

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        backgroundColor: Colors.white,
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 10),
            Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(
                color: TravellaColors.badge,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.check_circle_rounded,
                color: TravellaColors.primary,
                size: 48,
              ),
            ),
            const SizedBox(height: 18),
            const Text(
              'Trip Confirmed!',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: TravellaColors.darkText,
                letterSpacing: -0.4,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Your reservation at ${widget.destination.title} has been booked.',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 13, color: TravellaColors.muted),
            ),
            const SizedBox(height: 16),

            // Confirmation Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: TravellaColors.secondaryBg,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: TravellaColors.border),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Reference ID:', style: TextStyle(fontSize: 12, color: TravellaColors.muted)),
                      Text(
                        booking.id,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          color: TravellaColors.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Dates:', style: TextStyle(fontSize: 12, color: TravellaColors.muted)),
                      Text(
                        '${dateFormat.format(booking.checkInDate)} - ${dateFormat.format(booking.checkOutDate)}',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Total Paid:', style: TextStyle(fontSize: 12, color: TravellaColors.muted)),
                      Text(
                        '\$${booking.total}',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: TravellaColors.darkText),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Actions
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.of(ctx).pop();
                  Navigator.of(context).pop(); // Back to main screen
                  widget.appState.setActiveTab(3); // Switch to Bookings tab
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: TravellaColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  elevation: 0,
                ),
                child: const Text('View in My Bookings', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 8),
            TextButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                Navigator.of(context).pop();
              },
              child: const Text('Done', style: TextStyle(color: TravellaColors.muted, fontWeight: FontWeight.w600)),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Container(
      height: MediaQuery.of(context).size.height * 0.90,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          // Drag handle
          Center(
            child: Container(
              margin: const EdgeInsets.only(top: 10, bottom: 8),
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
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Confirm and Pay',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                ),
                IconButton(
                  icon: const Icon(Icons.close, size: 20),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),
          const Divider(color: TravellaColors.border, height: 1),

          // Content
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: [
                // 1. Stay Summary Card
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: TravellaColors.secondaryBg,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: TravellaColors.border),
                  ),
                  child: Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.network(
                          widget.destination.imageUrl,
                          width: 64,
                          height: 64,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              widget.destination.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${dateFormat.format(widget.checkInDate)} – ${dateFormat.format(widget.checkOutDate)}',
                              style: const TextStyle(color: TravellaColors.muted, fontSize: 12),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${widget.nights} nights · ${widget.guestsCount} guests',
                              style: const TextStyle(color: TravellaColors.primary, fontSize: 12, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // 2. Guest Info
                const Text('Guest Details', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
                const SizedBox(height: 10),
                TextField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    labelText: 'Full Name',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                    isDense: true,
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'Email Address',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                    isDense: true,
                  ),
                ),
                const SizedBox(height: 20),

                // 3. Promo Code
                const Text('Promo Code', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _promoController,
                        textCapitalization: TextCapitalization.characters,
                        decoration: InputDecoration(
                          hintText: 'e.g. TRAVELLA20',
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                          isDense: true,
                          errorText: _promoError,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    ElevatedButton(
                      onPressed: _promoApplied ? null : _applyPromo,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: TravellaColors.primary,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                      ),
                      child: Text(_promoApplied ? 'Applied ✓' : 'Apply'),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // 4. Payment Method
                const Text('Payment Method', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: _paymentOption(
                        id: 'apple-pay',
                        title: 'Apple Pay',
                        icon: Icons.apple,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _paymentOption(
                        id: 'card',
                        title: 'Credit Card',
                        icon: Icons.credit_card,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // 5. Price Breakdown
                const Text('Price Breakdown', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
                const SizedBox(height: 10),
                _priceRow('\$${widget.destination.effectivePrice} × ${widget.nights} nights', '\$$_staySubtotal'),
                _priceRow('Cleaning fee', '\$$cleaningFee'),
                _priceRow('Service fee', '\$$serviceFee'),
                if (_promoApplied)
                  _priceRow('Promo discount (20%)', '-\$$_promoDiscount', isDiscount: true),
                const Divider(color: TravellaColors.border, height: 20),
                _priceRow('Total (USD)', '\$$_finalTotal', isBold: true),
                const SizedBox(height: 16),

                // Security guarantee
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(Icons.lock_outline, size: 14, color: TravellaColors.muted),
                    SizedBox(width: 6),
                    Text(
                      '256-bit SSL encrypted & protected',
                      style: TextStyle(fontSize: 11, color: TravellaColors.muted),
                    ),
                  ],
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
                onPressed: _isSubmitting ? null : _handleConfirmPayment,
                style: ElevatedButton.styleFrom(
                  backgroundColor: TravellaColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 0,
                ),
                child: _isSubmitting
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2.5),
                      )
                    : Text(
                        'Confirm and Pay \$$_finalTotal',
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _paymentOption({required String id, required String title, required IconData icon}) {
    final isSel = _paymentMethod == id;
    return GestureDetector(
      onTap: () => setState(() => _paymentMethod = id),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
        decoration: BoxDecoration(
          color: isSel ? TravellaColors.badge : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSel ? TravellaColors.primary : TravellaColors.border,
            width: isSel ? 1.5 : 1,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 20, color: isSel ? TravellaColors.primary : TravellaColors.darkText),
            const SizedBox(width: 8),
            Text(
              title,
              style: TextStyle(
                fontSize: 13,
                fontWeight: isSel ? FontWeight.bold : FontWeight.w500,
                color: isSel ? TravellaColors.primary : TravellaColors.darkText,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _priceRow(String label, String value, {bool isDiscount = false, bool isBold = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: isBold ? 14 : 13,
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
              color: isBold ? TravellaColors.darkText : TravellaColors.muted,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: isBold ? 16 : 13,
              fontWeight: isBold ? FontWeight.w800 : FontWeight.w600,
              color: isDiscount
                  ? TravellaColors.online
                  : (isBold ? TravellaColors.darkText : TravellaColors.darkText),
            ),
          ),
        ],
      ),
    );
  }
}
