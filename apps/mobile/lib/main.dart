import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

import 'config/branding.dart';
import 'config/remote_config.dart';
import 'theme/app_theme.dart';
import 'widgets/app_shell.dart';
import 'screens/splash_screen.dart';
import 'screens/home_screen.dart';
import 'screens/catalog_screen.dart';
import 'screens/orders_screen.dart';
import 'screens/booking_screen.dart';
import 'screens/account_screen.dart';

/// Nexora mobile shell.
///
/// On launch we show a splash while we fetch `BrandingConfig` from the API
/// (theme color, app name, feature flags). The whole UI then adapts to those
/// values so a single artifact can serve any tenant.
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown, DeviceOrientation.landscapeLeft, DeviceOrientation.landscapeRight]);
  runApp(const NexoraApp());
}

class NexoraApp extends StatefulWidget {
  const NexoraApp({super.key});
  @override
  State<NexoraApp> createState() => _NexoraAppState();
}

class _NexoraAppState extends State<NexoraApp> {
  late Future<BrandingConfig> _configFuture;
  ThemeMode _themeMode = ThemeMode.system;

  @override
  void initState() {
    super.initState();
    _configFuture = RemoteConfig.load();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<BrandingConfig>(
      future: _configFuture,
      builder: (context, snap) {
        // While loading, render a tiny standalone MaterialApp showing the splash.
        if (!snap.hasData) {
          final fallback = BrandingConfig.fallback();
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            theme: AppTheme.light(fallback.primaryColor),
            darkTheme: AppTheme.dark(fallback.primaryColor),
            themeMode: _themeMode,
            home: SplashScreen(config: fallback),
          );
        }
        return _MainApp(
          config: snap.data!,
          themeMode: _themeMode,
          onThemeChanged: (m) => setState(() => _themeMode = m),
        );
      },
    );
  }
}

class _MainApp extends StatefulWidget {
  final BrandingConfig config;
  final ThemeMode themeMode;
  final ValueChanged<ThemeMode> onThemeChanged;
  const _MainApp({required this.config, required this.themeMode, required this.onThemeChanged});

  @override
  State<_MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<_MainApp> {
  late final GoRouter _router = GoRouter(
    initialLocation: '/',
    routes: [
      ShellRoute(
        builder: (_, __, child) => AppShell(config: widget.config, child: child),
        routes: [
          GoRoute(path: '/', builder: (_, __) => HomeScreen(config: widget.config)),
          if (widget.config.features.menu || widget.config.features.services || widget.config.features.cart)
            GoRoute(path: '/catalog', builder: (_, __) => CatalogScreen(config: widget.config)),
          if (widget.config.features.booking)
            GoRoute(path: '/booking', builder: (_, __) => BookingScreen(config: widget.config)),
          if (widget.config.features.orders || widget.config.features.cart)
            GoRoute(path: '/orders', builder: (_, __) => OrdersScreen(config: widget.config)),
          GoRoute(
            path: '/account',
            builder: (_, __) => AccountScreen(
              config: widget.config,
              themeMode: widget.themeMode,
              onThemeChanged: widget.onThemeChanged,
            ),
          ),
        ],
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    final seed = widget.config.primaryColor;
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: widget.config.appName,
      theme: AppTheme.light(seed),
      darkTheme: AppTheme.dark(seed),
      themeMode: widget.themeMode,
      routerConfig: _router,
    );
  }
}
