import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/destination.dart';
import '../state/app_state.dart';
import '../constants/colors.dart';
import 'booking_sheet.dart';

class DetailsScreen extends StatefulWidget {
  final Destination destination;
  final AppState appState;

  const DetailsScreen({
    super.key,
    required this.destination,
    required this.appState,
  });

  @override
  State<DetailsScreen> createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  int _currentImageIndex = 0;
  bool _isDescriptionExpanded = false;

  // Trip Planner state
  late DateTime _checkInDate;
  late DateTime _checkOutDate;
  int _guestsCount = 2;

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _checkInDate = now.add(const Duration(days: 14));
    _checkOutDate = now.add(const Duration(days: 18));
    _guestsCount = widget.destination.specs.guests >= 2 ? 2 : 1;
  }

  int get _nightsCount {
    final diff = _checkOutDate.difference(_checkInDate).inDays;
    return diff > 0 ? diff : 1;
  }

  int get _totalPrice {
    return widget.destination.effectivePrice * _nightsCount;
  }

  void _showMessageHostDialog(BuildContext context) {
    final messageController = TextEditingController(
      text: 'Hello ${widget.destination.host.name}, is early check-in possible for our stay?',
    );

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 20,
                    backgroundImage: NetworkImage(widget.destination.host.avatar),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Message ${widget.destination.host.name}',
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                      Text(
                        widget.destination.host.role,
                        style: const TextStyle(color: TravellaColors.muted, fontSize: 12),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TextField(
                controller: messageController,
                maxLines: 3,
                decoration: InputDecoration(
                  hintText: 'Type your message to the host...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: const BorderSide(color: TravellaColors.border),
                  ),
                  filled: true,
                  fillColor: TravellaColors.background,
                ),
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.of(ctx).pop();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Message sent to ${widget.destination.host.name}!'),
                        backgroundColor: TravellaColors.primary,
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: TravellaColors.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                  child: const Text('Send Message', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _openBookingFlow() {
    BookingSheet.show(
      context: context,
      destination: widget.destination,
      appState: widget.appState,
      nights: _nightsCount,
      guestsCount: _guestsCount,
      checkInDate: _checkInDate,
      checkOutDate: _checkOutDate,
      total: _totalPrice,
    );
  }

  @override
  Widget build(BuildContext context) {
    final dest = widget.destination;
    final isSaved = widget.appState.isSaved(dest.id);
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Scaffold(
      backgroundColor: TravellaColors.background,
      body: Stack(
        children: [
          // Scrollable Content
          SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 110),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 1. Hero Image Gallery
                SizedBox(
                  height: 380,
                  child: Stack(
                    children: [
                      PageView.builder(
                        itemCount: dest.gallery.isNotEmpty ? dest.gallery.length : 1,
                        onPageChanged: (idx) => setState(() => _currentImageIndex = idx),
                        itemBuilder: (context, index) {
                          final imgUrl = dest.gallery.isNotEmpty ? dest.gallery[index] : dest.imageUrl;
                          return Image.network(
                            imgUrl,
                            fit: BoxFit.cover,
                            width: double.infinity,
                            errorBuilder: (_, __, ___) => Container(
                              color: Colors.grey.shade300,
                              child: const Icon(Icons.broken_image, size: 50),
                            ),
                          );
                        },
                      ),

                      // Gradient Bottom Overlay
                      Positioned(
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 90,
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.bottomCenter,
                              end: Alignment.topCenter,
                              colors: [
                                Colors.black.withValues(alpha: 0.5),
                                Colors.transparent,
                              ],
                            ),
                          ),
                        ),
                      ),

                      // Gallery Dots Indicator
                      if (dest.gallery.length > 1)
                        Positioned(
                          bottom: 16,
                          left: 0,
                          right: 0,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: List.generate(
                              dest.gallery.length,
                              (index) => AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: const EdgeInsets.symmetric(horizontal: 3),
                                width: _currentImageIndex == index ? 20 : 6,
                                height: 6,
                                decoration: BoxDecoration(
                                  color: _currentImageIndex == index
                                      ? Colors.white
                                      : Colors.white.withValues(alpha: 0.5),
                                  borderRadius: BorderRadius.circular(3),
                                ),
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),

                // 2. Stay Meta Details Container
                Container(
                  transform: Matrix4.translationValues(0, -20, 0),
                  decoration: const BoxDecoration(
                    color: TravellaColors.background,
                    borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                  ),
                  padding: const EdgeInsets.fromLTRB(20, 24, 20, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Category Tag & Rating
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: TravellaColors.badge,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              dest.category.toUpperCase(),
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: TravellaColors.primary,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                          Row(
                            children: [
                              const Icon(Icons.star_rounded, color: TravellaColors.star, size: 18),
                              const SizedBox(width: 4),
                              Text(
                                dest.rating.toStringAsFixed(2),
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                  color: TravellaColors.darkText,
                                ),
                              ),
                              const SizedBox(width: 4),
                              Text(
                                '(${dest.reviewsCount} reviews)',
                                style: const TextStyle(color: TravellaColors.muted, fontSize: 13),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Title
                      Text(
                        dest.title,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          color: TravellaColors.darkText,
                          letterSpacing: -0.4,
                        ),
                      ),
                      const SizedBox(height: 6),

                      // Location
                      Row(
                        children: [
                          const Icon(Icons.location_on, size: 16, color: TravellaColors.primary),
                          const SizedBox(width: 4),
                          Expanded(
                            child: Text(
                              dest.location,
                              style: const TextStyle(
                                color: TravellaColors.muted,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),

                      // Specifications Box
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: TravellaColors.border),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _specItem(Icons.group_outlined, '${dest.specs.guests} Guests'),
                            _specItem(Icons.meeting_room_outlined, '${dest.specs.bedrooms} Bedrooms'),
                            _specItem(Icons.bed_outlined, '${dest.specs.beds} Beds'),
                            _specItem(Icons.bathtub_outlined, '${dest.specs.baths} Baths'),
                          ],
                        ),
                      ),
                      const SizedBox(height: 22),

                      // Amenities Grid
                      const Text(
                        'What this place offers',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                      ),
                      const SizedBox(height: 12),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: dest.amenities.map((amenity) {
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: TravellaColors.border),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(Icons.check_circle_outline, size: 14, color: TravellaColors.primary),
                                const SizedBox(width: 6),
                                Text(
                                  amenity.name,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: TravellaColors.darkText,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 22),

                      // About / Description
                      const Text(
                        'About this stay',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        dest.description,
                        maxLines: _isDescriptionExpanded ? null : 3,
                        overflow: _isDescriptionExpanded ? TextOverflow.visible : TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 13,
                          color: TravellaColors.muted,
                          height: 1.5,
                        ),
                      ),
                      GestureDetector(
                        onTap: () => setState(() => _isDescriptionExpanded = !_isDescriptionExpanded),
                        child: Padding(
                          padding: const EdgeInsets.only(top: 4),
                          child: Text(
                            _isDescriptionExpanded ? 'Show less' : 'Read more',
                            style: const TextStyle(
                              color: TravellaColors.primary,
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Trip Planner: Dates & Guests
                      const Text(
                        'Plan your stay',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                      ),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: TravellaColors.border),
                        ),
                        child: Column(
                          children: [
                            // Date pickers row
                            Row(
                              children: [
                                Expanded(
                                  child: GestureDetector(
                                    onTap: () async {
                                      final picked = await showDatePicker(
                                        context: context,
                                        initialDate: _checkInDate,
                                        firstDate: DateTime.now(),
                                        lastDate: DateTime.now().add(const Duration(days: 365)),
                                      );
                                      if (picked != null) {
                                        setState(() {
                                          _checkInDate = picked;
                                          if (_checkOutDate.isBefore(_checkInDate)) {
                                            _checkOutDate = _checkInDate.add(const Duration(days: 1));
                                          }
                                        });
                                      }
                                    },
                                    child: _dateBox('Check-in', dateFormat.format(_checkInDate)),
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: GestureDetector(
                                    onTap: () async {
                                      final picked = await showDatePicker(
                                        context: context,
                                        initialDate: _checkOutDate,
                                        firstDate: _checkInDate.add(const Duration(days: 1)),
                                        lastDate: DateTime.now().add(const Duration(days: 365)),
                                      );
                                      if (picked != null) {
                                        setState(() => _checkOutDate = picked);
                                      }
                                    },
                                    child: _dateBox('Check-out', dateFormat.format(_checkOutDate)),
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: TravellaColors.border, height: 24),

                            // Guest Counter row
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      'Guests',
                                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                                    ),
                                    Text(
                                      'Max ${dest.specs.guests} guests',
                                      style: const TextStyle(color: TravellaColors.muted, fontSize: 12),
                                    ),
                                  ],
                                ),
                                Row(
                                  children: [
                                    _counterBtn(
                                      icon: Icons.remove,
                                      onPressed: _guestsCount > 1
                                          ? () => setState(() => _guestsCount--)
                                          : null,
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(horizontal: 14),
                                      child: Text(
                                        '$_guestsCount',
                                        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                                      ),
                                    ),
                                    _counterBtn(
                                      icon: Icons.add,
                                      onPressed: _guestsCount < dest.specs.guests
                                          ? () => setState(() => _guestsCount++)
                                          : null,
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Host Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: TravellaColors.border),
                        ),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 26,
                              backgroundImage: NetworkImage(dest.host.avatar),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Hosted by ${dest.host.name}',
                                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    dest.host.role,
                                    style: const TextStyle(color: TravellaColors.muted, fontSize: 12),
                                  ),
                                  Text(
                                    'Response time: ${dest.host.responseTime}',
                                    style: const TextStyle(color: TravellaColors.subtle, fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                            OutlinedButton(
                              onPressed: () => _showMessageHostDialog(context),
                              style: OutlinedButton.styleFrom(
                                side: const BorderSide(color: TravellaColors.primary),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                              ),
                              child: const Text(
                                'Message',
                                style: TextStyle(color: TravellaColors.primary, fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Floating Top Controls (Back Button & Wishlist Heart)
          Positioned(
            top: MediaQuery.of(context).padding.top + 8,
            left: 20,
            right: 20,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _circularControl(
                  icon: Icons.arrow_back,
                  onTap: () => Navigator.of(context).pop(),
                ),
                _circularControl(
                  icon: isSaved ? Icons.favorite : Icons.favorite_border,
                  iconColor: isSaved ? TravellaColors.heart : TravellaColors.darkText,
                  onTap: () {
                    final saved = widget.appState.toggleSave(dest.id);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(saved ? 'Saved to wishlist ❤️' : 'Removed from wishlist'),
                        duration: const Duration(seconds: 1),
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
                ),
              ],
            ),
          ),

          // Sticky Bottom Bar
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: EdgeInsets.fromLTRB(
                20,
                14,
                20,
                MediaQuery.of(context).padding.bottom > 0 ? MediaQuery.of(context).padding.bottom : 14,
              ),
              decoration: BoxDecoration(
                color: Colors.white,
                border: const Border(top: BorderSide(color: TravellaColors.border)),
                boxShadow: const [
                  BoxShadow(
                    color: Color.fromRGBO(12, 16, 20, 0.08),
                    blurRadius: 20,
                    offset: Offset(0, -6),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.baseline,
                        textBaseline: TextBaseline.alphabetic,
                        children: [
                          Text(
                            '\$${dest.effectivePrice}',
                            style: const TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w800,
                              color: TravellaColors.darkText,
                            ),
                          ),
                          const Text(
                            ' / night',
                            style: TextStyle(fontSize: 12, color: TravellaColors.muted),
                          ),
                        ],
                      ),
                      Text(
                        'Total: \$$_totalPrice for $_nightsCount ${_nightsCount == 1 ? 'night' : 'nights'}',
                        style: const TextStyle(
                          fontSize: 12,
                          color: TravellaColors.primary,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 48,
                    child: ElevatedButton(
                      onPressed: _openBookingFlow,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: TravellaColors.primary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 28),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        elevation: 0,
                      ),
                      child: const Text(
                        'Book Now',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _specItem(IconData icon, String label) {
    return Column(
      children: [
        Icon(icon, size: 20, color: TravellaColors.primary),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: TravellaColors.darkText,
          ),
        ),
      ],
    );
  }

  Widget _dateBox(String label, String value) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: TravellaColors.secondaryBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: TravellaColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: TravellaColors.muted)),
          const SizedBox(height: 2),
          Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }

  Widget _counterBtn({required IconData icon, VoidCallback? onPressed}) {
    return InkWell(
      onTap: onPressed,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: onPressed != null ? TravellaColors.badge : Colors.grey.shade200,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(
          icon,
          size: 16,
          color: onPressed != null ? TravellaColors.primary : Colors.grey.shade400,
        ),
      ),
    );
  }

  Widget _circularControl({required IconData icon, Color? iconColor, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.9),
          shape: BoxShape.circle,
          boxShadow: const [
            BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 3)),
          ],
        ),
        child: Icon(icon, size: 20, color: iconColor ?? TravellaColors.darkText),
      ),
    );
  }
}
