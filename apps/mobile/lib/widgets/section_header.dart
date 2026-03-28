import 'package:flutter/material.dart';

class SectionHeader extends StatelessWidget {
  final String title;
  final String? action;
  final VoidCallback? onAction;
  const SectionHeader({super.key, required this.title, this.action, this.onAction});

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 8, 4, 12),
      child: Row(children: [
        Expanded(child: Text(title, style: t.textTheme.titleLarge)),
        if (action != null)
          TextButton(
            onPressed: onAction,
            style: TextButton.styleFrom(foregroundColor: t.colorScheme.primary),
            child: Text(action!),
          ),
      ]),
    );
  }
}
