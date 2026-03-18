import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'branding.dart';

class RemoteConfig {
  static const _slug   = String.fromEnvironment('TENANT_SLUG', defaultValue: 'demo');
  static const _apiBase = String.fromEnvironment('API_BASE',   defaultValue: 'https://api.nexora.app');

  static Future<BrandingConfig> load() async {
    final prefs = await SharedPreferences.getInstance();
    final cached = prefs.getString('branding');
    BrandingConfig? cfg;

    try {
      final res = await http.get(
        Uri.parse('$_apiBase/v1/site/mobile-config'),
        headers: {'X-Tenant-Slug': _slug},
      ).timeout(const Duration(seconds: 4));
      if (res.statusCode == 200) {
        await prefs.setString('branding', res.body);
        cfg = BrandingConfig.fromJson(json.decode(res.body), slug: _slug, apiBase: _apiBase);
      }
    } catch (_) {/* fall through to cache */}

    if (cfg == null && cached != null) {
      cfg = BrandingConfig.fromJson(json.decode(cached), slug: _slug, apiBase: _apiBase);
    }
    return cfg ?? BrandingConfig.fallback();
  }
}
