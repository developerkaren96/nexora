import 'package:flutter/material.dart';

/// Lightweight shimmer placeholder — no extra dependency.
class Shimmer extends StatefulWidget {
  final double height;
  final double? width;
  final double radius;
  const Shimmer({super.key, this.height = 16, this.width, this.radius = 8});

  @override
  State<Shimmer> createState() => _ShimmerState();
}

class _ShimmerState extends State<Shimmer> with SingleTickerProviderStateMixin {
  late final AnimationController _c =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 1400))..repeat();

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return AnimatedBuilder(
      animation: _c,
      builder: (_, __) {
        final t = _c.value;
        return Container(
          height: widget.height,
          width: widget.width ?? double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(widget.radius),
            gradient: LinearGradient(
              begin: Alignment(-1 + 2 * t, 0),
              end: Alignment(1 + 2 * t, 0),
              colors: [
                cs.surfaceContainerHighest,
                cs.surfaceContainerHigh,
                cs.surfaceContainerHighest,
              ],
            ),
          ),
        );
      },
    );
  }
}
