import 'destination.dart';

class BookingRecord {
  final String id;
  final Destination destination;
  final int nights;
  final int guestsCount;
  final DateTime checkInDate;
  final DateTime checkOutDate;
  final int total;
  final String paymentMethod;
  final String guestName;
  final String guestEmail;
  final DateTime createdAt;

  const BookingRecord({
    required this.id,
    required this.destination,
    required this.nights,
    required this.guestsCount,
    required this.checkInDate,
    required this.checkOutDate,
    required this.total,
    required this.paymentMethod,
    required this.guestName,
    required this.guestEmail,
    required this.createdAt,
  });
}
