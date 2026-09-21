import 'package:flutter_test/flutter_test.dart';
import 'package:travella_flutter/data/mock_data.dart';
import 'package:travella_flutter/state/app_state.dart';
import 'package:travella_flutter/models/booking.dart';

void main() {
  group('Travella Mock Data & Filtering Tests', () {
    test('MockData contains expected destinations', () {
      expect(MockData.destinations.length, greaterThanOrEqualTo(8));
      final villa = MockData.destinations.firstWhere((d) => d.id == 'dest-1');
      expect(villa.title, 'Villa Bellissima Cliffside');
      expect(villa.price, 380);
      expect(villa.discountPrice, 320);
      expect(villa.effectivePrice, 320);
      expect(villa.rating, 4.94);
    });

    test('AppState search filter works correctly', () {
      final state = AppState();
      state.setSearchQuery('Amalfi');
      final results = state.filteredDestinations;
      expect(results.length, greaterThanOrEqualTo(1));
      expect(results.first.id, 'dest-1');
    });

    test('AppState category filter works correctly', () {
      final state = AppState();
      state.setSelectedCategory('beach');
      final results = state.filteredDestinations;
      expect(results.length, greaterThanOrEqualTo(2));
      for (final item in results) {
        expect(item.category.toLowerCase(), 'beach');
      }
    });

    test('AppState wishlist toggle works correctly', () {
      final state = AppState();
      expect(state.isSaved('dest-3'), false);
      final saved = state.toggleSave('dest-3');
      expect(saved, true);
      expect(state.isSaved('dest-3'), true);
      expect(state.savedCount, 3); // starts with dest-1 and dest-2

      final removed = state.toggleSave('dest-3');
      expect(removed, false);
      expect(state.isSaved('dest-3'), false);
    });

    test('AppState booking creation and discount math', () {
      final state = AppState();
      final initialCount = state.bookingsCount;
      final dest = MockData.destinations.first;

      const nights = 4;
      final subtotal = dest.effectivePrice * nights; // 320 * 4 = 1280
      const cleaningFee = 60;
      const serviceFee = 45;
      final discount = (subtotal * 0.20).round(); // 256
      final total = subtotal + cleaningFee + serviceFee - discount; // 1280 + 60 + 45 - 256 = 1129

      expect(total, 1129);

      final booking = BookingRecord(
        id: 'TRV-TEST-01',
        destination: dest,
        nights: nights,
        guestsCount: 2,
        checkInDate: DateTime(2024, 11, 1),
        checkOutDate: DateTime(2024, 11, 5),
        total: total,
        paymentMethod: 'apple-pay',
        guestName: 'Alex Morgan',
        guestEmail: 'alex@example.com',
        createdAt: DateTime.now(),
      );

      state.addBooking(booking);
      expect(state.bookingsCount, initialCount + 1);
      expect(state.bookings.first.id, 'TRV-TEST-01');
    });
  });
}
