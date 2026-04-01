import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../config/branding.dart';
import '../data/sample_data.dart';
import '../widgets/responsive.dart';
import '../widgets/section_header.dart';

class HomeScreen extends StatelessWidget {
  final BrandingConfig config;
  const HomeScreen({super.key, required this.config});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final greeting = _greeting();
    return Scaffold(
      body: SafeArea(
        child: ContentWidth(
          child: RefreshIndicator(
            onRefresh: () async => await Future.delayed(const Duration(milliseconds: 600)),
            child: CustomScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              slivers: [
                SliverAppBar(
                  pinned: false, floating: true, snap: true,
                  backgroundColor: cs.surface, surfaceTintColor: Colors.transparent,
                  title: Row(children: [
                    CircleAvatar(
                      backgroundColor: cs.primaryContainer,
                      child: Text(config.appName.characters.first.toUpperCase(),
                          style: TextStyle(color: cs.onPrimaryContainer, fontWeight: FontWeight.w700)),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(greeting,
                              style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant, fontWeight: FontWeight.w500)),
                          Text(config.appName,
                              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: cs.onSurface)),
                        ],
                      ),
                    ),
                  ]),
                  actions: [
                    IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_outlined)),
                    const SizedBox(width: 4),
                  ],
                ),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
                  sliver: SliverList.list(children: [
                    _HeroCard(config: config),
                    const SizedBox(height: 24),
                    const _QuickActions(),
                    const SizedBox(height: 24),
                    const SectionHeader(title: 'Popular today', action: 'See all'),
                    SizedBox(
                      height: 220,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        itemCount: sampleCatalog.length,
                        separatorBuilder: (_, __) => const SizedBox(width: 14),
                        itemBuilder: (_, i) => SizedBox(width: 180, child: _PopularCard(item: sampleCatalog[i])),
                      ),
                    ),
                    const SizedBox(height: 24),
                    const SectionHeader(title: 'Stats this week'),
                    const _StatsRow(),
                    const SizedBox(height: 24),
                    const SectionHeader(title: 'Recent activity'),
                    ...sampleOrders.take(3).map((o) => _ActivityTile(order: o)),
                  ]),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _greeting() {
    final h = DateTime.now().hour;
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }
}

class _HeroCard extends StatelessWidget {
  final BrandingConfig config;
  const _HeroCard({required this.config});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          begin: Alignment.topLeft, end: Alignment.bottomRight,
          colors: [cs.primary, cs.tertiary],
        ),
        boxShadow: [
          BoxShadow(color: cs.primary.withOpacity(.25), blurRadius: 24, offset: const Offset(0, 12)),
        ],
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: cs.onPrimary.withOpacity(.18),
            borderRadius: BorderRadius.circular(40),
          ),
          child: Text('Member offer',
              style: TextStyle(color: cs.onPrimary, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: .3)),
        ),
        const SizedBox(height: 14),
        Text('Save 20% on your\nnext 3 orders',
            style: TextStyle(color: cs.onPrimary, fontSize: 26, fontWeight: FontWeight.w800, height: 1.15, letterSpacing: -0.5)),
        const SizedBox(height: 8),
        Text('Use code  NEXORA20  at checkout.',
            style: TextStyle(color: cs.onPrimary.withOpacity(.85), fontSize: 13.5)),
        const SizedBox(height: 18),
        Row(children: [
          FilledButton.tonal(
            onPressed: () {},
            style: FilledButton.styleFrom(
              backgroundColor: cs.onPrimary, foregroundColor: cs.primary,
              minimumSize: const Size(0, 44),
              padding: const EdgeInsets.symmetric(horizontal: 22),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
            ),
            child: const Text('Claim now'),
          ),
          const SizedBox(width: 10),
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(foregroundColor: cs.onPrimary),
            child: const Text('Learn more  →'),
          ),
        ]),
      ]),
    );
  }
}

class _QuickActions extends StatelessWidget {
  const _QuickActions();

  @override
  Widget build(BuildContext context) {
    final items = const [
      (Icons.search_rounded, 'Search'),
      (Icons.local_offer_outlined, 'Offers'),
      (Icons.favorite_outline, 'Saved'),
      (Icons.support_agent_outlined, 'Support'),
    ];
    return Row(
      children: items
          .map((e) => Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: _QuickAction(icon: e.$1, label: e.$2),
                ),
              ))
          .toList(),
    );
  }
}

class _QuickAction extends StatelessWidget {
  final IconData icon;
  final String label;
  const _QuickAction({required this.icon, required this.label});
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: () {},
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 14),
        child: Column(children: [
          Container(
            width: 54, height: 54,
            decoration: BoxDecoration(color: cs.primaryContainer, borderRadius: BorderRadius.circular(18)),
            child: Icon(icon, color: cs.onPrimaryContainer),
          ),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
        ]),
      ),
    );
  }
}

class _PopularCard extends StatelessWidget {
  final CatalogItem item;
  const _PopularCard({required this.item});

  static const _palette = [
    [Color(0xFFFCE7F3), Color(0xFFFBCFE8)],
    [Color(0xFFE0E7FF), Color(0xFFC7D2FE)],
    [Color(0xFFDCFCE7), Color(0xFFBBF7D0)],
    [Color(0xFFFEF3C7), Color(0xFFFDE68A)],
    [Color(0xFFE0F2FE), Color(0xFFBAE6FD)],
    [Color(0xFFFFE4E6), Color(0xFFFECDD3)],
  ];

  @override
  Widget build(BuildContext context) {
    final c = _palette[item.colorSeed % _palette.length];
    return Card(
      child: InkWell(
        onTap: () {},
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            height: 110,
            decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: c),
            ),
            child: Center(
              child: Icon(Icons.local_dining_rounded, size: 44, color: Colors.black.withOpacity(.35)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14), maxLines: 1, overflow: TextOverflow.ellipsis),
              const SizedBox(height: 4),
              Text(item.category,
                  style: TextStyle(fontSize: 11.5, color: Theme.of(context).colorScheme.onSurfaceVariant)),
              const SizedBox(height: 8),
              Row(children: [
                Text('\$${item.priceUsd.toStringAsFixed(2)}',
                    style: TextStyle(fontWeight: FontWeight.w700, color: Theme.of(context).colorScheme.primary)),
                const Spacer(),
                Icon(Icons.add_circle, color: Theme.of(context).colorScheme.primary),
              ]),
            ]),
          ),
        ]),
      ),
    );
  }
}

class _StatsRow extends StatelessWidget {
  const _StatsRow();
  @override
  Widget build(BuildContext context) {
    final stats = const [('128', 'Visits'), ('12', 'Orders'), ('\$284', 'Revenue')];
    return Row(
      children: stats
          .map((e) => Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: _StatCard(value: e.$1, label: e.$2),
                ),
              ))
          .toList(),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String value, label;
  const _StatCard({required this.value, required this.label});
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Icon(Icons.trending_up_rounded, color: cs.primary, size: 22),
          const SizedBox(height: 12),
          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, letterSpacing: -0.4)),
          const SizedBox(height: 2),
          Text(label, style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant, fontWeight: FontWeight.w500)),
        ]),
      ),
    );
  }
}

class _ActivityTile extends StatelessWidget {
  final OrderRecord order;
  const _ActivityTile({required this.order});
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Card(
        child: ListTile(
          leading: CircleAvatar(
            backgroundColor: cs.primaryContainer,
            child: Icon(Icons.shopping_bag_outlined, color: cs.onPrimaryContainer),
          ),
          title: Text(order.label, maxLines: 1, overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontWeight: FontWeight.w600)),
          subtitle: Text('${order.id}  ·  ${_relative(order.placedAt)}'),
          trailing: Text('\$${order.totalUsd.toStringAsFixed(2)}',
              style: TextStyle(fontWeight: FontWeight.w700, color: cs.primary)),
          onTap: () => context.go('/orders'),
        ),
      ),
    );
  }

  static String _relative(DateTime d) {
    final delta = DateTime.now().difference(d);
    if (delta.inMinutes < 60) return '${delta.inMinutes}m ago';
    if (delta.inHours < 24) return '${delta.inHours}h ago';
    return '${delta.inDays}d ago';
  }
}
