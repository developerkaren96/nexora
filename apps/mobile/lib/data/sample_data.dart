/// Tenant-agnostic sample content. Used to render screens before/instead of
/// real backend data — so the app never looks empty in dev or for new tenants.

class CatalogItem {
  final String id, name, description, category;
  final double priceUsd;
  final int colorSeed; // index into a palette for placeholder thumbnails
  const CatalogItem(this.id, this.name, this.description, this.priceUsd, this.category, this.colorSeed);
}

class OrderRecord {
  final String id, label, status; // status: paid, pending, shipped, delivered, cancelled
  final double totalUsd;
  final DateTime placedAt;
  const OrderRecord(this.id, this.label, this.status, this.totalUsd, this.placedAt);
}

const sampleCatalog = <CatalogItem>[
  CatalogItem('p1', 'Signature Espresso', 'Single-origin, bright citrus notes',     4.5,  'Drinks',    0),
  CatalogItem('p2', 'Avocado Toast',      'Sourdough, lime, chili flakes',           9.0,  'Brunch',    1),
  CatalogItem('p3', 'Truffle Pasta',      'Hand-rolled tagliatelle, black truffle', 21.0, 'Mains',     2),
  CatalogItem('p4', 'Garden Salad',       'Heirloom greens, citrus vinaigrette',     11.0, 'Healthy',   3),
  CatalogItem('p5', 'Salmon Bowl',        'Sashimi-grade salmon, sushi rice',        16.5, 'Healthy',   4),
  CatalogItem('p6', 'Chocolate Babka',    'House-baked, dark Valrhona swirl',         7.5,  'Bakery',    5),
];

final sampleOrders = <OrderRecord>[
  OrderRecord('#A-1042', 'Signature Espresso ×2',        'delivered', 9.0,  DateTime.now().subtract(const Duration(days: 1, hours: 4))),
  OrderRecord('#A-1041', 'Truffle Pasta, Garden Salad',  'shipped',   32.0, DateTime.now().subtract(const Duration(days: 2))),
  OrderRecord('#A-1037', 'Salmon Bowl ×1',               'paid',      16.5, DateTime.now().subtract(const Duration(days: 5))),
  OrderRecord('#A-1030', 'Brunch Combo',                 'cancelled', 24.0, DateTime.now().subtract(const Duration(days: 12))),
];

const categories = <String>['All', 'Drinks', 'Brunch', 'Mains', 'Healthy', 'Bakery'];
