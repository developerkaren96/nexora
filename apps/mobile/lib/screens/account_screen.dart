import 'package:flutter/material.dart';

import '../config/branding.dart';
import '../widgets/responsive.dart';

class AccountScreen extends StatelessWidget {
  final BrandingConfig config;
  final ThemeMode themeMode;
  final ValueChanged<ThemeMode> onThemeChanged;
  const AccountScreen({
    super.key,
    required this.config,
    required this.themeMode,
    required this.onThemeChanged,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      body: SafeArea(
        child: ContentWidth(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
            children: [
              _ProfileCard(config: config),
              const SizedBox(height: 16),
              _StatsRow(),
              const SizedBox(height: 24),
              _GroupCard(title: 'Account', children: [
                _MenuRow(icon: Icons.person_outline_rounded, label: 'Personal info', onTap: () {}),
                _MenuRow(icon: Icons.location_on_outlined, label: 'Addresses', onTap: () {}),
                _MenuRow(icon: Icons.payment_rounded, label: 'Payment methods', onTap: () {}),
                _MenuRow(icon: Icons.notifications_outlined, label: 'Notifications', onTap: () {}),
              ]),
              const SizedBox(height: 16),
              _GroupCard(title: 'Preferences', children: [
                _ThemeRow(themeMode: themeMode, onChanged: onThemeChanged),
                _MenuRow(icon: Icons.language_rounded, label: 'Language', trailing: const Text('English'), onTap: () {}),
                _MenuRow(icon: Icons.shield_outlined, label: 'Privacy', onTap: () {}),
              ]),
              const SizedBox(height: 16),
              _GroupCard(title: 'Support', children: [
                _MenuRow(icon: Icons.help_outline_rounded, label: 'Help center', onTap: () {}),
                _MenuRow(icon: Icons.mail_outline_rounded, label: 'Contact us', onTap: () {}),
                _MenuRow(icon: Icons.star_outline_rounded, label: 'Rate the app', onTap: () {}),
              ]),
              const SizedBox(height: 24),
              OutlinedButton.icon(
                onPressed: () {},
                icon: Icon(Icons.logout_rounded, color: cs.error),
                label: Text('Sign out', style: TextStyle(color: cs.error)),
                style: OutlinedButton.styleFrom(side: BorderSide(color: cs.error.withOpacity(.4))),
              ),
              const SizedBox(height: 16),
              Center(
                child: Text(
                  '${config.appName}  ·  v0.1.0',
                  style: TextStyle(color: cs.onSurfaceVariant, fontSize: 12),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProfileCard extends StatelessWidget {
  final BrandingConfig config;
  const _ProfileCard({required this.config});
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          begin: Alignment.topLeft, end: Alignment.bottomRight,
          colors: [cs.primary, cs.tertiary],
        ),
        boxShadow: [BoxShadow(color: cs.primary.withOpacity(.2), blurRadius: 20, offset: const Offset(0, 10))],
      ),
      child: Row(children: [
        Container(
          width: 64, height: 64,
          decoration: BoxDecoration(color: cs.onPrimary.withOpacity(.18), borderRadius: BorderRadius.circular(20)),
          child: Center(
            child: Text('KS',
                style: TextStyle(color: cs.onPrimary, fontWeight: FontWeight.w800, fontSize: 22, letterSpacing: -0.5)),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Karen Simonyan',
                style: TextStyle(color: cs.onPrimary, fontSize: 17, fontWeight: FontWeight.w700, letterSpacing: -0.3)),
            const SizedBox(height: 2),
            Text('Member of ${config.appName}',
                style: TextStyle(color: cs.onPrimary.withOpacity(.85), fontSize: 13)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
              decoration: BoxDecoration(color: cs.onPrimary.withOpacity(.18), borderRadius: BorderRadius.circular(40)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Icon(Icons.workspace_premium_outlined, size: 14, color: cs.onPrimary),
                const SizedBox(width: 4),
                Text('Gold tier',
                    style: TextStyle(color: cs.onPrimary, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: .3)),
              ]),
            ),
          ]),
        ),
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.chevron_right_rounded, color: cs.onPrimary),
        ),
      ]),
    );
  }
}

class _StatsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    Widget cell(String v, String l) => Expanded(
          child: Column(children: [
            Text(v, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, letterSpacing: -0.3)),
            const SizedBox(height: 2),
            Text(l, style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant, fontWeight: FontWeight.w500)),
          ]),
        );
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 18),
        child: Row(children: [
          cell('12', 'Orders'),
          Container(width: 1, height: 28, color: cs.outlineVariant.withOpacity(.5)),
          cell('3', 'Saved'),
          Container(width: 1, height: 28, color: cs.outlineVariant.withOpacity(.5)),
          cell('480', 'Points'),
        ]),
      ),
    );
  }
}

class _GroupCard extends StatelessWidget {
  final String title;
  final List<Widget> children;
  const _GroupCard({required this.title, required this.children});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
        padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
        child: Text(title,
            style: TextStyle(color: cs.onSurfaceVariant, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: .6)),
      ),
      Card(
        child: Column(
          children: [
            for (int i = 0; i < children.length; i++) ...[
              if (i > 0) Divider(height: 1, color: cs.outlineVariant.withOpacity(.4), indent: 56),
              children[i],
            ],
          ],
        ),
      ),
    ]);
  }
}

class _MenuRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final Widget? trailing;
  final VoidCallback? onTap;
  const _MenuRow({required this.icon, required this.label, this.trailing, this.onTap});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return ListTile(
      onTap: onTap,
      leading: Container(
        width: 36, height: 36,
        decoration: BoxDecoration(color: cs.primaryContainer.withOpacity(.6), borderRadius: BorderRadius.circular(10)),
        child: Icon(icon, color: cs.onPrimaryContainer, size: 20),
      ),
      title: Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14.5)),
      trailing: trailing ?? Icon(Icons.chevron_right_rounded, color: cs.onSurfaceVariant),
    );
  }
}

class _ThemeRow extends StatelessWidget {
  final ThemeMode themeMode;
  final ValueChanged<ThemeMode> onChanged;
  const _ThemeRow({required this.themeMode, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return ListTile(
      leading: Container(
        width: 36, height: 36,
        decoration: BoxDecoration(color: cs.primaryContainer.withOpacity(.6), borderRadius: BorderRadius.circular(10)),
        child: Icon(Icons.dark_mode_outlined, color: cs.onPrimaryContainer, size: 20),
      ),
      title: const Text('Appearance', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14.5)),
      trailing: SegmentedButton<ThemeMode>(
        segments: const [
          ButtonSegment(value: ThemeMode.light, icon: Icon(Icons.light_mode_outlined, size: 18)),
          ButtonSegment(value: ThemeMode.system, icon: Icon(Icons.auto_mode_rounded, size: 18)),
          ButtonSegment(value: ThemeMode.dark, icon: Icon(Icons.dark_mode_rounded, size: 18)),
        ],
        selected: {themeMode},
        onSelectionChanged: (s) => onChanged(s.first),
        showSelectedIcon: false,
        style: ButtonStyle(
          visualDensity: VisualDensity.compact,
          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
      ),
    );
  }
}
