import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../config/branding.dart';
import 'responsive.dart';

/// Adaptive shell: bottom NavigationBar on phones, NavigationRail on tablets.
/// Items adapt to the tenant's feature flags.
class AppShell extends StatelessWidget {
  final BrandingConfig config;
  final Widget child;
  const AppShell({super.key, required this.config, required this.child});

  List<_NavItem> _items() {
    final f = config.features;
    return [
      const _NavItem('/', Icons.home_outlined, Icons.home_rounded, 'Home'),
      if (f.menu || f.services || f.cart)
        const _NavItem('/catalog', Icons.grid_view_outlined, Icons.grid_view_rounded, 'Catalog'),
      if (f.booking)
        const _NavItem('/booking', Icons.event_outlined, Icons.event_rounded, 'Book'),
      if (f.orders || f.cart)
        const _NavItem('/orders', Icons.receipt_long_outlined, Icons.receipt_long_rounded, 'Orders'),
      const _NavItem('/account', Icons.person_outline_rounded, Icons.person_rounded, 'Profile'),
    ];
  }

  int _currentIndex(BuildContext context, List<_NavItem> items) {
    final loc = GoRouterState.of(context).matchedLocation;
    final idx = items.indexWhere((i) => i.path == loc || (i.path != '/' && loc.startsWith(i.path)));
    return idx < 0 ? 0 : idx;
  }

  @override
  Widget build(BuildContext context) {
    final items = _items();
    final idx = _currentIndex(context, items);
    final tablet = isTablet(context);

    if (tablet) {
      return Scaffold(
        body: SafeArea(
          child: Row(children: [
            NavigationRail(
              extended: MediaQuery.sizeOf(context).width >= 1100,
              selectedIndex: idx,
              onDestinationSelected: (i) => context.go(items[i].path),
              destinations: items
                  .map((i) => NavigationRailDestination(
                        icon: Icon(i.icon),
                        selectedIcon: Icon(i.iconActive),
                        label: Text(i.label),
                      ))
                  .toList(),
            ),
            const VerticalDivider(width: 1),
            Expanded(child: child),
          ]),
        ),
      );
    }

    return Scaffold(
      body: child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: idx,
        onDestinationSelected: (i) => context.go(items[i].path),
        destinations: items
            .map((i) => NavigationDestination(
                  icon: Icon(i.icon),
                  selectedIcon: Icon(i.iconActive),
                  label: i.label,
                ))
            .toList(),
      ),
    );
  }
}

class _NavItem {
  final String path;
  final IconData icon;
  final IconData iconActive;
  final String label;
  const _NavItem(this.path, this.icon, this.iconActive, this.label);
}
