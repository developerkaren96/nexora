import 'package:flutter/widgets.dart';

/// Two layout breakpoints. We treat anything >= 720dp as "tablet" (NavigationRail
/// + wider content); below that as "phone" (bottom NavigationBar).
class Breakpoints {
  static const tablet = 720.0;
  static const desktop = 1200.0;
}

bool isTablet(BuildContext ctx) => MediaQuery.sizeOf(ctx).width >= Breakpoints.tablet;
bool isDesktop(BuildContext ctx) => MediaQuery.sizeOf(ctx).width >= Breakpoints.desktop;

/// Constrains body content on tablets/desktops so lines aren't kilometre-long.
class ContentWidth extends StatelessWidget {
  final Widget child;
  final double max;
  const ContentWidth({super.key, required this.child, this.max = 880});
  @override
  Widget build(BuildContext context) =>
      Center(child: ConstrainedBox(constraints: BoxConstraints(maxWidth: max), child: child));
}
