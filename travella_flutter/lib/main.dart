import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'constants/colors.dart';
import 'constants/theme.dart';
import 'state/app_state.dart';
import 'widgets/bottom_nav.dart';
import 'screens/home_screen.dart';
import 'screens/explore_screen.dart';
import 'screens/saved_screen.dart';
import 'screens/bookings_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const TravellaApp());
}

class TravellaApp extends StatefulWidget {
  const TravellaApp({super.key});

  @override
  State<TravellaApp> createState() => _TravellaAppState();
}

class _TravellaAppState extends State<TravellaApp> {
  final AppState _appState = AppState();

  @override
  void dispose() {
    _appState.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Travella',
      debugShowCheckedModeBanner: false,
      theme: TravellaTheme.lightTheme,
      home: ListenableBuilder(
        listenable: _appState,
        builder: (context, _) {
          return Scaffold(
            backgroundColor: TravellaColors.background,
            body: IndexedStack(
              index: _appState.activeTab,
              children: [
                HomeScreen(appState: _appState),
                ExploreScreen(appState: _appState),
                SavedScreen(appState: _appState),
                BookingsScreen(appState: _appState),
                ProfileScreen(appState: _appState),
              ],
            ),
            bottomNavigationBar: TravellaBottomNav(
              activeIndex: _appState.activeTab,
              onTabSelected: _appState.setActiveTab,
              savedCount: _appState.savedCount,
              bookingsCount: _appState.bookingsCount,
            ),
          );
        },
      ),
    );
  }
}
