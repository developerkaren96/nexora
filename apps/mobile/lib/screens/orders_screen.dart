import 'package:flutter/material.dart';

import '../config/branding.dart';
import '../data/sample_data.dart';
import '../widgets/empty_state.dart';
import '../widgets/responsive.dart';

class OrdersScreen extends StatefulWidget {
  final BrandingConfig config;
  const OrdersScreen({super.key, required this.config});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> with SingleTickerProviderStateMixin {
  late final _tab = TabController(length: 3, vsync: this);
  final _all = sampleOrders;

  List<OrderRecord> get _active =>
      _all.where((o) => o.status == 'pending' || o.status == 'paid' || o.status == 'shipped').toList();
  List<OrderRecord> get _past => _all.where((o) => o.status == 'delivered' || o.status == 'cancelled').toList();

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      body: SafeArea(
        child: ContentWidth(
          child: NestedScrollView(
            headerSliverBuilder: (_, __) => [
              SliverAppBar(
                pinned: true,
                expandedHeight: 110,
                backgroundColor: cs.surface,
                surfaceTintColor: Colors.transparent,
                flexibleSpace: FlexibleSpaceBar(
                  titlePadding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
                  title: Text('Orders',
                      style: TextStyle(color: cs.onSurface, fontWeight: FontWeight.w800, fontSize: 26, letterSpacing: -0.5)),
                ),
                bottom: PreferredSize(
                  preferredSize: const Size.fromHeight(50),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: TabBar(
                      controller: _tab,
                      isScrollable: false,
                      indicator: BoxDecoration(
                        color: cs.primaryContainer,
                        borderRadius: BorderRadius.circular(40),
                      ),
                      indicatorSize: TabBarIndicatorSize.tab,
                      indicatorPadding: const EdgeInsets.symmetric(vertical: 6),
                      dividerColor: Colors.transparent,
                      labelColor: cs.onPrimaryContainer,
                      unselectedLabelColor: cs.onSurfaceVariant,
                      labelStyle: const TextStyle(fontWeight: FontWeight.w600),
                      tabs: const [Tab(text: 'All'), Tab(text: 'Active'), Tab(text: 'Past')],
                    ),
                  ),
                ),
              ),
            ],
            body: TabBarView(controller: _tab, children: [
              _list(_all),
              _list(_active),
              _list(_past),
            ]),
          ),
        ),
      ),
    );
  }

  Widget _list(List<OrderRecord> rows) {
    if (rows.isEmpty) {
      return const EmptyState(
        icon: Icons.receipt_long_outlined,
        title: 'No orders yet',
        subtitle: 'Your orders will appear here once you check out.',
        ctaLabel: 'Browse catalog',
      );
    }
    return RefreshIndicator(
      onRefresh: () async => await Future.delayed(const Duration(milliseconds: 600)),
      child: ListView.separated(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
        itemCount: rows.length,
        separatorBuilder: (_, __) => const SizedBox(height: 10),
        itemBuilder: (_, i) => _OrderCard(order: rows[i]),
      ),
    );
  }
}

class _OrderCard extends StatelessWidget {
  final OrderRecord order;
  const _OrderCard({required this.order});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final (chipBg, chipFg, chipText) = _statusStyle(order.status, cs);
    return Card(
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Container(
                width: 44, height: 44,
                decoration: BoxDecoration(color: cs.primaryContainer, borderRadius: BorderRadius.circular(14)),
                child: Icon(Icons.shopping_bag_rounded, color: cs.onPrimaryContainer),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(order.id, style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant, fontWeight: FontWeight.w500)),
                  const SizedBox(height: 2),
                  Text(order.label,
                      maxLines: 1, overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15.5, letterSpacing: -0.2)),
                ]),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(color: chipBg, borderRadius: BorderRadius.circular(40)),
                child: Text(chipText, style: TextStyle(color: chipFg, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: .3)),
              ),
            ]),
            const SizedBox(height: 14),
            Divider(color: cs.outlineVariant.withOpacity(.4)),
            const SizedBox(height: 10),
            Row(children: [
              Icon(Icons.schedule_rounded, size: 16, color: cs.onSurfaceVariant),
              const SizedBox(width: 6),
              Text(_relative(order.placedAt), style: TextStyle(color: cs.onSurfaceVariant, fontSize: 12.5)),
              const Spacer(),
              Text('\$${order.totalUsd.toStringAsFixed(2)}',
                  style: TextStyle(fontWeight: FontWeight.w800, color: cs.primary, fontSize: 16, letterSpacing: -0.3)),
            ]),
          ]),
        ),
      ),
    );
  }

  static (Color, Color, String) _statusStyle(String s, ColorScheme cs) {
    switch (s) {
      case 'delivered':
        return (const Color(0xFFDCFCE7), const Color(0xFF166534), 'DELIVERED');
      case 'shipped':
        return (const Color(0xFFE0F2FE), const Color(0xFF075985), 'SHIPPED');
      case 'paid':
        return (cs.primaryContainer, cs.onPrimaryContainer, 'PAID');
      case 'pending':
        return (const Color(0xFFFEF3C7), const Color(0xFF92400E), 'PENDING');
      case 'cancelled':
        return (const Color(0xFFFEE2E2), const Color(0xFF991B1B), 'CANCELLED');
      default:
        return (cs.surfaceContainerHighest, cs.onSurface, s.toUpperCase());
    }
  }

  static String _relative(DateTime d) {
    final delta = DateTime.now().difference(d);
    if (delta.inMinutes < 60) return '${delta.inMinutes} min ago';
    if (delta.inHours < 24) return '${delta.inHours} h ago';
    if (delta.inDays < 7) return '${delta.inDays} d ago';
    return '${d.day}.${d.month.toString().padLeft(2, '0')}.${d.year}';
  }
}
