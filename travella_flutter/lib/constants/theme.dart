import 'package:flutter/material.dart';
import 'colors.dart';

class TravellaTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: TravellaColors.background,
      fontFamily: 'Roboto', // Fallback cleanly to system sans
      colorScheme: ColorScheme.light(
        primary: TravellaColors.primary,
        secondary: TravellaColors.primaryLight,
        surface: TravellaColors.cardBg,
        error: TravellaColors.heart,
        onPrimary: Colors.white,
        onSurface: TravellaColors.darkText,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: TravellaColors.darkText),
        titleTextStyle: TextStyle(
          color: TravellaColors.darkText,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      cardTheme: CardTheme(
        color: TravellaColors.cardBg,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: TravellaColors.border, width: 1),
        ),
      ),
    );
  }

  static const List<BoxShadow> cardShadow = [
    BoxShadow(
      color: Color.fromRGBO(12, 16, 20, 0.06),
      blurRadius: 24,
      offset: Offset(0, 8),
    ),
  ];

  static const List<BoxShadow> buttonShadow = [
    BoxShadow(
      color: Color.fromRGBO(56, 127, 171, 0.25),
      blurRadius: 18,
      offset: Offset(0, 8),
    ),
  ];
}
