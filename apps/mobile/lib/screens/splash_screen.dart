import 'package:flutter/material.dart';

import '../config/branding.dart';

class SplashScreen extends StatelessWidget {
  final BrandingConfig config;
  const SplashScreen({super.key, required this.config});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      body: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [cs.primary, cs.secondary],
          ),
        ),
        child: Center(
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Container(
              width: 96, height: 96,
              decoration: BoxDecoration(
                color: cs.onPrimary.withOpacity(.15),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Center(
                child: Text(
                  config.appName.characters.first.toUpperCase(),
                  style: TextStyle(
                    fontSize: 44, fontWeight: FontWeight.w800, color: cs.onPrimary, letterSpacing: -1,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Text(config.appName,
                style: TextStyle(
                    color: cs.onPrimary, fontSize: 22, fontWeight: FontWeight.w700, letterSpacing: -0.5)),
            const SizedBox(height: 24),
            SizedBox(
              width: 36, height: 36,
              child: CircularProgressIndicator(color: cs.onPrimary, strokeWidth: 3),
            ),
          ]),
        ),
      ),
    );
  }
}
