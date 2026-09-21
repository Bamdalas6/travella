import 'package:flutter/material.dart';
import '../constants/colors.dart';

class TravellaSearchBar extends StatefulWidget {
  final String searchQuery;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onFilterTap;
  final int activeFilterCount;

  const TravellaSearchBar({
    super.key,
    required this.searchQuery,
    required this.onSearchChanged,
    required this.onFilterTap,
    required this.activeFilterCount,
  });

  @override
  State<TravellaSearchBar> createState() => _TravellaSearchBarState();
}

class _TravellaSearchBarState extends State<TravellaSearchBar> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.searchQuery);
  }

  @override
  void didUpdateWidget(covariant TravellaSearchBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.searchQuery != widget.searchQuery && _controller.text != widget.searchQuery) {
      _controller.text = widget.searchQuery;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      child: Row(
        children: [
          // Search input field
          Expanded(
            child: Container(
              height: 50,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: TravellaColors.border, width: 1),
                boxShadow: const [
                  BoxShadow(
                    color: Color.fromRGBO(12, 16, 20, 0.03),
                    blurRadius: 10,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Row(
                children: [
                  const Padding(
                    padding: EdgeInsets.only(left: 14, right: 10),
                    child: Icon(
                      Icons.search,
                      color: TravellaColors.muted,
                      size: 20,
                    ),
                  ),
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      onChanged: widget.onSearchChanged,
                      decoration: const InputDecoration(
                        hintText: 'Search destinations, countries...',
                        hintStyle: TextStyle(
                          color: TravellaColors.subtle,
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                        ),
                        border: InputBorder.none,
                        isDense: true,
                        contentPadding: EdgeInsets.symmetric(vertical: 14),
                      ),
                      style: const TextStyle(
                        fontSize: 14,
                        color: TravellaColors.darkText,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  if (_controller.text.isNotEmpty)
                    IconButton(
                      icon: const Icon(Icons.clear, size: 18, color: TravellaColors.muted),
                      onPressed: () {
                        _controller.clear();
                        widget.onSearchChanged('');
                      },
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(width: 10),

          // Filter Button
          Stack(
            clipBehavior: Clip.none,
            children: [
              Material(
                color: widget.activeFilterCount > 0 ? TravellaColors.primary : Colors.white,
                borderRadius: BorderRadius.circular(16),
                child: InkWell(
                  borderRadius: BorderRadius.circular(16),
                  onTap: widget.onFilterTap,
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: widget.activeFilterCount > 0 ? TravellaColors.primary : TravellaColors.border,
                        width: 1,
                      ),
                    ),
                    child: Icon(
                      Icons.tune,
                      size: 20,
                      color: widget.activeFilterCount > 0 ? Colors.white : TravellaColors.darkText,
                    ),
                  ),
                ),
              ),
              if (widget.activeFilterCount > 0)
                Positioned(
                  top: -4,
                  right: -4,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
                      color: TravellaColors.heart,
                      shape: BoxShape.circle,
                    ),
                    constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
                    child: Center(
                      child: Text(
                        '${widget.activeFilterCount}',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          height: 1,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
