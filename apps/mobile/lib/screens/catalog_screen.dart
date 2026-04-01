import 'package:flutter/material.dart';

import '../config/branding.dart';
import '../data/sample_data.dart';
import '../widgets/responsive.dart';

class CatalogScreen extends StatefulWidget {
  final BrandingConfig config;
  const CatalogScreen({super.key, required this.config});

  @override
  State<CatalogScreen> createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  String _category = 'All';
  String _query = '';

  List<CatalogItem> get _filtered {
    return sampleCatalog.where((i) {
      final byCat = _category == 'All' || i.category == _category;
      final byQ = _query.isEmpty || i.name.toLowerCase().contains(_query.toLowerCase());
      return byCat && byQ;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      body: SafeArea(
        child: ContentWidth(
          child: CustomScrollView(
            slivers: [
              SliverAppBar(
                pinned: true,
                expandedHeight: 130,
                backgroundColor: cs.surface,
                surfaceTintColor: Colors.transparent,
                flexibleSpace: FlexibleSpaceBar(
                  titlePadding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
                  title: Text('Catalog',
                      style: TextStyle(color: cs.onSurface, fontWeight: FontWeight.w800, fontSize: 26, letterSpacing: -0.5)),
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 12),
                sliver: SliverToBoxAdapter(
                  child: TextField(
                    onChanged: (v) => setState(() => _query = v),
                    decoration: InputDecoration(
                      hintText: 'Search the menu…',
                      prefixIcon: const Icon(Icons.search_rounded),
                      suffixIcon: _query.isEmpty
                          ? null
                          : IconButton(
                              icon: const Icon(Icons.close_rounded),
                              onPressed: () => setState(() => _query = ''),
                            ),
                    ),
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: SizedBox(
                  height: 46,
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    scrollDirection: Axis.horizontal,
                    itemCount: categories.length,
                    separatorBuilder: (_, __) => const SizedBox(width: 8),
                    itemBuilder: (_, i) {
                      final c = categories[i];
                      final selected = c == _category;
                      return ChoiceChip(
                        label: Text(c),
                        selected: selected,
                        onSelected: (_) => setState(() => _category = c),
                      );
                    },
                  ),
                ),
              ),
              const SliverToBoxAdapter(child: SizedBox(height: 12)),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
                sliver: SliverGrid.builder(
                  itemCount: _filtered.length,
                  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                    maxCrossAxisExtent: isTablet(context) ? 260 : 200,
                    crossAxisSpacing: 14, mainAxisSpacing: 14,
                    childAspectRatio: .78,
                  ),
                  itemBuilder: (_, i) => _CatalogTile(item: _filtered[i]),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CatalogTile extends StatelessWidget {
  final CatalogItem item;
  const _CatalogTile({required this.item});

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
    final cs = Theme.of(context).colorScheme;
    final c = _palette[item.colorSeed % _palette.length];
    return Card(
      child: InkWell(
        onTap: () => _showSheet(context, item),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Expanded(
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: c),
              ),
              child: Stack(children: [
                Center(child: Icon(Icons.restaurant_rounded, size: 54, color: Colors.black.withOpacity(.35))),
                Positioned(
                  top: 10, right: 10,
                  child: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(color: Colors.white.withOpacity(.9), shape: BoxShape.circle),
                    child: const Icon(Icons.favorite_border_rounded, size: 18, color: Colors.black87),
                  ),
                ),
              ]),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item.name,
                  maxLines: 1, overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14.5, letterSpacing: -0.2)),
              const SizedBox(height: 4),
              Text(item.description,
                  maxLines: 2, overflow: TextOverflow.ellipsis,
                  style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant)),
              const SizedBox(height: 10),
              Row(children: [
                Text('\$${item.priceUsd.toStringAsFixed(2)}',
                    style: TextStyle(fontWeight: FontWeight.w800, color: cs.primary)),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(color: cs.primary, borderRadius: BorderRadius.circular(10)),
                  child: Icon(Icons.add_rounded, color: cs.onPrimary, size: 18),
                ),
              ]),
            ]),
          ),
        ]),
      ),
    );
  }

  void _showSheet(BuildContext ctx, CatalogItem item) {
    showModalBottomSheet(
      context: ctx,
      isScrollControlled: true,
      backgroundColor: Theme.of(ctx).colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (_) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: .6, maxChildSize: .9, minChildSize: .4,
        builder: (_, controller) => SingleChildScrollView(
          controller: controller,
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(
              child: Container(
                width: 44, height: 4,
                decoration: BoxDecoration(
                  color: Theme.of(ctx).colorScheme.outlineVariant,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 18),
            Text(item.name, style: Theme.of(ctx).textTheme.headlineSmall),
            const SizedBox(height: 6),
            Text(item.description,
                style: TextStyle(color: Theme.of(ctx).colorScheme.onSurfaceVariant)),
            const SizedBox(height: 20),
            Row(children: [
              Text('\$${item.priceUsd.toStringAsFixed(2)}',
                  style: Theme.of(ctx).textTheme.displaySmall?.copyWith(color: Theme.of(ctx).colorScheme.primary)),
              const Spacer(),
              Chip(label: Text(item.category)),
            ]),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: () {
                Navigator.pop(ctx);
                ScaffoldMessenger.of(ctx).showSnackBar(SnackBar(content: Text('Added: ${item.name}')));
              },
              icon: const Icon(Icons.shopping_bag_outlined),
              label: const Text('Add to cart'),
            ),
          ]),
        ),
      ),
    );
  }
}
