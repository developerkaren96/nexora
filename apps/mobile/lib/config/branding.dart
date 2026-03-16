import 'package:flutter/material.dart';

class FeatureFlags {
  final bool push, auth, orders, cart, booking, services, menu, tracking;
  const FeatureFlags({
    this.push = true, this.auth = true, this.orders = false, this.cart = false,
    this.booking = false, this.services = false, this.menu = false, this.tracking = false,
  });
  factory FeatureFlags.fromJson(Map<String, dynamic> json) => FeatureFlags(
    push:     json['push']     ?? true,
    auth:     json['auth']     ?? true,
    orders:   json['orders']   ?? false,
    cart:     json['cart']     ?? false,
    booking:  json['booking']  ?? false,
    services: json['services'] ?? false,
    menu:     json['menu']     ?? false,
    tracking: json['tracking'] ?? false,
  );
}

class BrandingConfig {
  final String appName;
  final String tenantSlug;
  final Color primaryColor;
  final String? iconUrl;
  final String? splashUrl;
  final FeatureFlags features;
  final String apiBaseUrl;

  BrandingConfig({
    required this.appName, required this.tenantSlug, required this.primaryColor,
    required this.features, required this.apiBaseUrl, this.iconUrl, this.splashUrl,
  });

  factory BrandingConfig.fallback() => BrandingConfig(
    appName: 'Nexora', tenantSlug: 'demo', primaryColor: const Color(0xFF6366F1),
    features: const FeatureFlags(orders: true, cart: true, booking: true, menu: true, services: true),
    apiBaseUrl: 'https://api.nexora.app',
  );

  factory BrandingConfig.fromJson(Map<String, dynamic> json, {required String slug, required String apiBase}) {
    final hex = (json['themeJson']?['primary'] as String?) ?? '#6366F1';
    return BrandingConfig(
      appName: json['appName'] ?? slug,
      tenantSlug: slug,
      primaryColor: _hexToColor(hex),
      iconUrl: json['iconUrl'],
      splashUrl: json['splashUrl'],
      features: FeatureFlags.fromJson((json['features'] as Map?)?.cast<String, dynamic>() ?? {}),
      apiBaseUrl: apiBase,
    );
  }
}

Color _hexToColor(String hex) {
  final h = hex.replaceFirst('#', '');
  return Color(int.parse('FF$h', radix: 16));
}
